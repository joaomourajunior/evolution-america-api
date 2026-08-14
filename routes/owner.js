const express = require('express');
const bcrypt = require('bcryptjs');
const { getDb } = require('../db');
const tokenLib = require('../lib/token');

const router = express.Router();

async function requireOwner(req, res, next) {
  const auth = req.header('authorization') || req.header('x-owner-token') || '';
  const t = auth.startsWith('Bearer ') ? auth.slice(7) : auth;
  const db = await getDb();
  const payload = tokenLib.verify(t);
  if (!payload || !payload.owner || !db.data.owner) {
    return res.status(401).json({ error: 'Acesso restrito ao dono da plataforma' });
  }
  req.db = db;
  next();
}

async function logVisit(db, { acao, escolaId, escolaNome, detalhe }) {
  db.data.ownerVisitLog.push({
    id: db.data.ownerVisitLog.length + 1,
    quando: new Date().toISOString(),
    acao,
    escolaId: escolaId || null,
    escolaNome: escolaNome || null,
    detalhe: detalhe || null,
  });
  await db.write();
}

// POST /api/owner/login { username, password } — sem campo "escola"
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  const db = await getDb();
  const owner = db.data.owner;
  if (!owner || owner.username !== username || !bcrypt.compareSync(password || '', owner.passwordHash)) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }
  const t = tokenLib.sign({ owner: true, username });
  await logVisit(db, { acao: 'login', detalhe: 'Login do dono na plataforma' });
  res.json({ token: t, user: { username: owner.username, role: 'owner' } });
});

// GET /api/owner/schools — lista todas as escolas (a escola nunca é notificada)
router.get('/schools', requireOwner, async (req, res) => {
  const db = req.db;
  const schools = db.data.schools.map((s) => ({
    id: s.id, slug: s.slug, name: s.name, city: s.city, state: s.state,
    totalUsers: s.users.length,
    totalClasses: s.classes.length,
    totalStudents: s.classes.reduce((a, c) => a + c.students.length, 0),
  }));
  await logVisit(db, { acao: 'listar_escolas', detalhe: `${schools.length} escolas listadas` });
  res.json({ schools });
});

// GET /api/owner/schools/:id — detalhe (gera entrada no log privado)
router.get('/schools/:id', requireOwner, async (req, res) => {
  const db = req.db;
  const school = db.data.schools.find((s) => s.id === Number(req.params.id));
  if (!school) return res.status(404).json({ error: 'Escola não encontrada' });

  await logVisit(db, {
    acao: 'ver_detalhe_escola', escolaId: school.id, escolaNome: school.name,
    detalhe: 'Dono acessou detalhe da escola',
  });

  res.json({
    school: {
      id: school.id, slug: school.slug, name: school.name, city: school.city, state: school.state,
      users: school.users.map((u) => ({ id: u.id, username: u.username, name: u.name, role: u.role })),
      classes: school.classes.map((c) => ({
        id: c.id, name: c.name,
        students: c.students.map((s) => ({ id: s.id, name: s.name, username: s.username })),
      })),
    },
  });
});

// GET /api/owner/visit-log — log privado, visível SÓ pro dono
router.get('/visit-log', requireOwner, async (req, res) => {
  res.json({ log: [...req.db.data.ownerVisitLog].reverse() });
});

// GET /api/owner/suggestions
router.get('/suggestions', requireOwner, async (req, res) => {
  res.json({ suggestions: [...req.db.data.suggestions].reverse() });
});

module.exports = { router, requireOwner };
