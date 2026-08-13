const express = require('express');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const { getDb } = require('../db');

const router = express.Router();

function makeOwnerToken(username) {
  return 'owner:' + Buffer.from(`${username}:${Date.now()}`).toString('base64');
}

async function requireOwner(req, res, next) {
  const token = req.header('x-owner-token');
  const db = await getDb();
  if (!token || !token.startsWith('owner:') || !db.data.owner) {
    return res.status(401).json({ error: 'Acesso restrito ao dono da plataforma' });
  }
  req.db = db;
  next();
}

async function logVisit(db, { acao, escolaId, escolaNome, detalhe }) {
  db.data.ownerVisitLog.push({
    id: nanoid(),
    quando: new Date().toISOString(),
    acao,
    escolaId: escolaId || null,
    escolaNome: escolaNome || null,
    detalhe: detalhe || null,
  });
  await db.write();
}

// POST /api/owner/login { username, password }  — sem campo "escola"
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  const db = await getDb();
  const owner = db.data.owner;
  if (!owner || owner.username !== username || !bcrypt.compareSync(password || '', owner.passwordHash)) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }
  const token = makeOwnerToken(username);
  await logVisit(db, { acao: 'login', detalhe: 'Login do dono na plataforma' });
  return res.json({ token, usuario: { username: owner.username, role: 'owner' } });
});

// GET /api/owner/escolas — lista todas as escolas (sem notificar a escola)
router.get('/escolas', requireOwner, async (req, res) => {
  const db = req.db;
  const escolas = db.data.escolas.map((e) => ({
    id: e.id,
    slug: e.slug,
    nome: e.nome,
    totalUsuarios: e.usuarios.length,
    totalTurmas: e.turmas.length,
    totalEstudantes: db.data.estudantes.filter((s) => s.escolaId === e.id).length,
  }));
  await logVisit(db, { acao: 'listar_escolas', detalhe: `${escolas.length} escolas listadas` });
  return res.json({ escolas });
});

// GET /api/owner/escolas/:id — detalhe (gera entrada no log privado, "sem deixar rastro" pra escola)
router.get('/escolas/:id', requireOwner, async (req, res) => {
  const db = req.db;
  const escola = db.data.escolas.find((e) => e.id === req.params.id);
  if (!escola) return res.status(404).json({ error: 'Escola não encontrada' });

  const estudantes = db.data.estudantes.filter((s) => s.escolaId === escola.id);
  await logVisit(db, {
    acao: 'ver_detalhe_escola',
    escolaId: escola.id,
    escolaNome: escola.nome,
    detalhe: 'Dono acessou detalhe da escola',
  });

  return res.json({
    escola: {
      id: escola.id,
      slug: escola.slug,
      nome: escola.nome,
      usuarios: escola.usuarios.map((u) => ({ id: u.id, username: u.username, role: u.role })),
      turmas: escola.turmas,
    },
    estudantes: estudantes.map((s) => ({ id: s.id, nome: s.nome, username: s.username, progresso: s.progresso })),
  });
});

// GET /api/owner/visit-log — log privado, visível SÓ pro dono
router.get('/visit-log', requireOwner, async (req, res) => {
  const db = req.db;
  return res.json({ log: [...db.data.ownerVisitLog].reverse() });
});

// GET /api/owner/suggestions — sugestões enviadas pelas escolas
router.get('/suggestions', requireOwner, async (req, res) => {
  const db = req.db;
  return res.json({ suggestions: [...db.data.suggestions].reverse() });
});

module.exports = { router, requireOwner };
