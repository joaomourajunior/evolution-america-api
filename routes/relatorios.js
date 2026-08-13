const express = require('express');
const { getDb } = require('../db');

const router = express.Router();

function totalAulas(course) {
  return course.niveis.reduce((acc, n) => acc + n.aulas.length, 0);
}

// GET /api/escolas/:escolaId/relatorios
router.get('/:escolaId/relatorios', async (req, res) => {
  const db = await getDb();
  const escola = db.data.escolas.find((e) => e.id === req.params.escolaId);
  if (!escola) return res.status(404).json({ error: 'Escola não encontrada' });

  const total = totalAulas(db.data.course);

  const porTurma = escola.turmas.map((t) => {
    const estudantes = db.data.estudantes.filter((s) => s.escolaId === escola.id && s.turmaId === t.id);
    const porEstudante = estudantes.map((s) => {
      const concluidas = Object.values(s.progresso || {}).filter(Boolean).length;
      return {
        id: s.id,
        nome: s.nome,
        aulasConcluidas: concluidas,
        totalAulas: total,
        percentual: total ? Math.round((concluidas / total) * 100) : 0,
      };
    });
    const mediaPercentual = porEstudante.length
      ? Math.round(porEstudante.reduce((a, e) => a + e.percentual, 0) / porEstudante.length)
      : 0;
    return { turmaId: t.id, turmaNome: t.nome, mediaPercentual, estudantes: porEstudante };
  });

  return res.json({ porTurma });
});

module.exports = router;
