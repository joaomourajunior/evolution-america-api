const express = require('express');
const { helpers } = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// POST /api/progress/:lessonId — marca uma aula como concluída para o usuário logado
router.post('/:lessonId', requireAuth, async (req, res) => {
  const { lessonId } = req.params;
  const lesson = helpers.getLessonById(lessonId);
  if (!lesson) return res.status(404).json({ error: 'Aula não encontrada.' });

  await helpers.markLessonComplete(req.user.userId, lessonId);
  res.json({ message: 'Progresso registrado.' });
});

// DELETE /api/progress/:lessonId — desmarca (caso o estudante queira revisar do zero)
router.delete('/:lessonId', requireAuth, async (req, res) => {
  await helpers.removeLessonProgress(req.user.userId, req.params.lessonId);
  res.json({ message: 'Progresso removido.' });
});

// GET /api/progress/summary — resumo de progresso do usuário logado, por curso
router.get('/summary', requireAuth, (req, res) => {
  const summary = helpers.getProgressSummary(req.user.userId);
  res.json(summary);
});

module.exports = router;
