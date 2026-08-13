const express = require('express');
const { nanoid } = require('nanoid');
const { getDb, hash } = require('../db');

const router = express.Router();

function findEscola(db, escolaId) {
  return db.data.escolas.find((e) => e.id === escolaId);
}

// POST /api/escolas/:escolaId/turmas { nome }
router.post('/:escolaId/turmas', async (req, res) => {
  const db = await getDb();
  const escola = findEscola(db, req.params.escolaId);
  if (!escola) return res.status(404).json({ error: 'Escola não encontrada' });

  const turma = { id: nanoid(), nome: req.body?.nome || 'Nova turma', criadaEm: new Date().toISOString() };
  escola.turmas.push(turma);
  await db.write();
  return res.status(201).json({ turma });
});

// DELETE /api/escolas/:escolaId/turmas/:turmaId
router.delete('/:escolaId/turmas/:turmaId', async (req, res) => {
  const db = await getDb();
  const escola = findEscola(db, req.params.escolaId);
  if (!escola) return res.status(404).json({ error: 'Escola não encontrada' });

  escola.turmas = escola.turmas.filter((t) => t.id !== req.params.turmaId);
  db.data.estudantes = db.data.estudantes.filter(
    (s) => !(s.escolaId === escola.id && s.turmaId === req.params.turmaId)
  );
  await db.write();
  return res.json({ ok: true });
});

// POST /api/escolas/:escolaId/turmas/:turmaId/estudantes
// { nome, username, password, recommended_level }
// Cria login novo pro estudante na hora.
router.post('/:escolaId/turmas/:turmaId/estudantes', async (req, res) => {
  const db = await getDb();
  const escola = findEscola(db, req.params.escolaId);
  if (!escola) return res.status(404).json({ error: 'Escola não encontrada' });
  const turma = escola.turmas.find((t) => t.id === req.params.turmaId);
  if (!turma) return res.status(404).json({ error: 'Turma não encontrada' });

  const { nome, username, password, recommended_level } = req.body || {};
  if (!nome || !username || !password) {
    return res.status(400).json({ error: 'nome, username e password são obrigatórios' });
  }

  const jaExiste = db.data.estudantes.some((s) => s.escolaId === escola.id && s.username === username);
  if (jaExiste) return res.status(409).json({ error: 'Já existe um estudante com esse username nesta escola' });

  const estudante = {
    id: nanoid(),
    escolaId: escola.id,
    turmaId: turma.id,
    nome,
    username,
    passwordHash: hash(password),
    recommended_level: recommended_level || null,
    progresso: {},
  };
  db.data.estudantes.push(estudante);
  await db.write();
  return res.status(201).json({
    estudante: { id: estudante.id, nome: estudante.nome, username: estudante.username, turmaId: turma.id },
  });
});

// DELETE /api/escolas/:escolaId/estudantes/:estudanteId
router.delete('/:escolaId/estudantes/:estudanteId', async (req, res) => {
  const db = await getDb();
  const before = db.data.estudantes.length;
  db.data.estudantes = db.data.estudantes.filter(
    (s) => !(s.escolaId === req.params.escolaId && s.id === req.params.estudanteId)
  );
  await db.write();
  return res.json({ ok: true, removido: before !== db.data.estudantes.length });
});

// GET /api/escolas/:escolaId/turmas
router.get('/:escolaId/turmas', async (req, res) => {
  const db = await getDb();
  const escola = findEscola(db, req.params.escolaId);
  if (!escola) return res.status(404).json({ error: 'Escola não encontrada' });

  const turmas = escola.turmas.map((t) => ({
    ...t,
    estudantes: db.data.estudantes
      .filter((s) => s.escolaId === escola.id && s.turmaId === t.id)
      .map((s) => ({ id: s.id, nome: s.nome, username: s.username })),
  }));
  return res.json({ turmas });
});

module.exports = router;
