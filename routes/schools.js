const express = require('express');
const bcrypt = require('bcryptjs');
const { helpers } = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

// POST /api/schools — cadastra uma nova escola + usuário admin dela
router.post('/', async (req, res) => {
  const { schoolName, city, state, adminName, adminUsername, adminEmail, adminPassword } = req.body || {};
  if (!schoolName || !adminName || !adminUsername || !adminPassword) {
    return res.status(400).json({ error: 'Nome da escola, nome do admin, usuário e senha são obrigatórios.' });
  }
  if (adminPassword.length < 6) {
    return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
  }

  const slug = slugify(schoolName) + '-' + Math.floor(1000 + Math.random() * 9000);
  const school = await helpers.createSchool({ name: schoolName, slug, city, state });

  const passwordHash = bcrypt.hashSync(adminPassword, 10);
  await helpers.createUser({
    school_id: school.id, name: adminName, username: adminUsername,
    email: adminEmail || null, password_hash: passwordHash, role: 'admin',
  });

  res.status(201).json({
    school: { id: school.id, name: schoolName, slug, city, state },
    message: 'Escola cadastrada com sucesso. O admin já pode fazer login.',
  });
});

// GET /api/schools — lista todas as escolas (uso administrativo da plataforma)
router.get('/', (req, res) => {
  const schools = helpers.listAllSchoolsWithUserCount();
  res.json({ schools });
});

// GET /api/schools/me — dados da própria escola do usuário logado (isolado por tenant)
router.get('/me', requireAuth, (req, res) => {
  const school = helpers.getSchoolById(req.user.schoolId);
  const users = helpers.listUsersBySchool(req.user.schoolId)
    .map(u => ({ id: u.id, name: u.name, username: u.username, role: u.role, active: u.active }));
  res.json({ school: { id: school.id, name: school.name, slug: school.slug, city: school.city, state: school.state }, users });
});

module.exports = router;
