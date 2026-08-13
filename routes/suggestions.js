const express = require('express');
const { nanoid } = require('nanoid');
const { getDb } = require('../db');

const router = express.Router();

// POST /api/suggestions { escolaId, autor, mensagem }
// A escola NUNCA edita conteúdo de curso diretamente — só sugere,
// e a sugestão aparece pro dono junto com o nome da escola/pessoa.
router.post('/', async (req, res) => {
  const { escolaId, autor, mensagem } = req.body || {};
  if (!escolaId || !mensagem) {
    return res.status(400).json({ error: 'escolaId e mensagem são obrigatórios' });
  }
  const db = await getDb();
  const escola = db.data.escolas.find((e) => e.id === escolaId);
  if (!escola) return res.status(404).json({ error: 'Escola não encontrada' });

  const suggestion = {
    id: nanoid(),
    escolaId: escola.id,
    escolaNome: escola.nome,
    autor: autor || 'Não identificado',
    mensagem,
    criadoEm: new Date().toISOString(),
    status: 'pendente',
  };
  db.data.suggestions.push(suggestion);
  await db.write();
  return res.status(201).json({ suggestion });
});

module.exports = router;
