const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

// Nota: em produção, esta rota deveria exigir um papel "super-admin" da
// própria Evolution América (dona da plataforma), diferente do admin de
// uma escola específica. Por ora, qualquer usuário 'admin' autenticado
// pode listar sua própria escola; a criação de novas escolas é o ponto
// que precisa de uma trava adicional antes de ir para produção.

// POST /api/schools — cadastra uma nova escola + usuário admin dela
router.post('/', (req, res) => {
  const { schoolName, city, state, adminName, adminUsername, adminEmail, adminPassword } = req.body || {};
  if (!schoolName || !adminName || !adminUsername || !adminPassword) {
    return res.status(400).json({ error: 'Nome da escola, nome do admin, usuário e senha são obrigatórios.' });
  }
  if (adminPassword.length < 6) {
    return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
  }

  const slug = slugify(schoolName) + '-' + Math.floor(1000 + Math.random() * 9000);

  const insertSchool = db.prepare(`INSERT INTO schools (name, slug, city, state) VALUES (?, ?, ?, ?)`);
  const result = insertSchool.run(schoolName, slug, city || null, state || null);
  const schoolId = result.lastInsertRowid;

  const passwordHash = bcrypt.hashSync(adminPassword, 10);
  db.prepare(`
    INSERT INTO users (school_id, name, username, email, password_hash, role)
    VALUES (?, ?, ?, ?, ?, 'admin')
  `).run(schoolId, adminName, adminUsername, adminEmail || null, passwordHash);

  res.status(201).json({
    school: { id: schoolId, name: schoolName, slug, city, state },
    message: 'Escola cadastrada com sucesso. O admin já pode fazer login.',
  });
});

// GET /api/schools — lista todas as escolas (uso administrativo da plataforma)
router.get('/', (req, res) => {
  const schools = db.prepare(`
    SELECT s.id, s.name, s.slug, s.city, s.state, s.active, s.created_at,
           COUNT(u.id) AS total_users
    FROM schools s
    LEFT JOIN users u ON u.school_id = s.id
    GROUP BY s.id
    ORDER BY s.created_at DESC
  `).all();
  res.json({ schools });
});

// GET /api/schools/me — dados da própria escola do usuário logado (isolado por tenant)
router.get('/me', requireAuth, (req, res) => {
  const school = db.prepare(`SELECT id, name, slug, city, state FROM schools WHERE id = ?`)
    .get(req.user.schoolId);
  const students = db.prepare(`
    SELECT id, name, username, role, active FROM users WHERE school_id = ? ORDER BY name
  `).all(req.user.schoolId);
  res.json({ school, users: students });
});

module.exports = router;
