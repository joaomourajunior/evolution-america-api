const express = require('express');
const bcrypt = require('bcryptjs');
const { getDb, hash } = require('./db');
const token = require('./token');

const router = express.Router();

function findSchoolBySlug(db, slug) {
  return db.data.schools.find((s) => s.slug === slug);
}

// A direção (role "admin") sempre enxerga tudo — as permissões salvas só
// valem de fato para outros papéis (ex: "professor"), que a diretora
// restringe aos poucos pelo Painel da Escola.
function effectivePermissions(user) {
  if (user.role === 'admin') return { turmas: true, relatorios: true, evoia: true };
  return user.permissions || { turmas: true, relatorios: true, evoia: true };
}

// GET /api/auth/schools — usado para popular os <select> de escola no login
router.get('/schools', async (req, res) => {
  const db = await getDb();
  const schools = db.data.schools.map((s) => ({ slug: s.slug, name: s.name, city: s.city, state: s.state }));
  res.json({ schools });
});

// POST /api/auth/login { schoolSlug, username, password }
router.post('/login', async (req, res) => {
  const { schoolSlug, username, password } = req.body || {};
  const db = await getDb();
  const school = findSchoolBySlug(db, schoolSlug);
  if (!school) return res.status(401).json({ error: 'Escola não encontrada' });

  const user = school.users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password || '', user.passwordHash)) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }
  if (school.active === false) {
    return res.status(403).json({ error: 'O acesso desta escola está suspenso. Fale com a Evolution América.' });
  }

  const t = token.sign({ schoolId: school.id, userId: user.id });
  res.json({
    token: t,
    user: { id: user.id, username: user.username, name: user.name, role: user.role, permissions: effectivePermissions(user) },
    school: { id: school.id, slug: school.slug, name: school.name, logoDataUrl: school.logoDataUrl || null },
  });
});

// GET /api/auth/me — usado para "lembrar login" com token salvo
router.get('/me', async (req, res) => {
  const auth = req.header('authorization') || '';
  const t = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const payload = token.verify(t);
  if (!payload) return res.status(401).json({ error: 'Sessão expirada' });

  const db = await getDb();
  const school = db.data.schools.find((s) => s.id === payload.schoolId);
  const user = school && school.users.find((u) => u.id === payload.userId);
  if (!school || !user) return res.status(401).json({ error: 'Sessão inválida' });

  res.json({
    user: { id: user.id, username: user.username, name: user.name, role: user.role, permissions: effectivePermissions(user) },
    school: { id: school.id, slug: school.slug, name: school.name, logoDataUrl: school.logoDataUrl || null },
  });
});

// POST /api/auth/forgot-password { schoolSlug, email }
router.post('/forgot-password', async (req, res) => {
  // Mantido simples de propósito: nunca revela se o e-mail existe ou não.
  res.json({ ok: true });
});

// PUT /api/auth/change-password { currentPassword, newPassword }
// Autoatendimento: qualquer usuário logado troca A PRÓPRIA senha.
// Nunca aceita "username" aqui de propósito — trocar o login é ação exclusiva do dono.
router.put('/change-password', async (req, res) => {
  const auth = req.header('authorization') || '';
  const t = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const payload = token.verify(t);
  if (!payload) return res.status(401).json({ error: 'Não autenticado' });

  const db = await getDb();
  const school = db.data.schools.find((s) => s.id === payload.schoolId);
  const user = school && school.users.find((u) => u.id === payload.userId);
  if (!school || !user) return res.status(401).json({ error: 'Sessão inválida' });

  const { currentPassword, newPassword } = req.body || {};
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'A nova senha deve ter pelo menos 6 caracteres' });
  }
  if (!bcrypt.compareSync(currentPassword || '', user.passwordHash)) {
    return res.status(401).json({ error: 'Senha atual incorreta' });
  }
  user.passwordHash = hash(newPassword);
  await db.write();
  res.json({ ok: true });
});

module.exports = router;
