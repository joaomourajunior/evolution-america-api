const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// POST /api/progress/:lessonId — marca uma aula como concluída para o usuário logado
router.post('/:lessonId', requireAuth, (req, res) => {
  const { lessonId } = req.params;
  const lesson = db.prepare(`SELECT id FROM lessons WHERE id = ?`).get(lessonId);
  if (!lesson) return res.status(404).json({ error: 'Aula não encontrada.' });

  db.prepare(`
    INSERT INTO progress (user_id, lesson_id) VALUES (?, ?)
    ON CONFLICT(user_id, lesson_id) DO NOTHING
  `).run(req.user.userId, lessonId);

  res.json({ message: 'Progresso registrado.' });
});

// DELETE /api/progress/:lessonId — desmarca (caso o estudante queira revisar do zero)
router.delete('/:lessonId', requireAuth, (req, res) => {
  db.prepare(`DELETE FROM progress WHERE user_id = ? AND lesson_id = ?`)
    .run(req.user.userId, req.params.lessonId);
  res.json({ message: 'Progresso removido.' });
});

// GET /api/progress/summary — resumo de progresso do usuário logado, por curso
router.get('/summary', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT l.module_id, COUNT(*) AS completed_count
    FROM progress p
    JOIN lessons l ON l.id = p.lesson_id
    WHERE p.user_id = ?
    GROUP BY l.module_id
  `).all(req.user.userId);
  const totalCompleted = db.prepare(`SELECT COUNT(*) AS c FROM progress WHERE user_id = ?`)
    .get(req.user.userId).c;
  res.json({ totalCompleted, byModule: rows });
});

module.exports = router;
