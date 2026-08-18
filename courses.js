const express = require('express');
const { requireSchoolAuth } = require('../lib/auth-middleware');

const router = express.Router();
router.use(requireSchoolAuth);

// POST /api/progress/:lessonId — marca aula como concluída pro usuário logado
router.post('/:lessonId', async (req, res) => {
  const db = req.db;
  req.user.progress = req.user.progress || {};
  req.user.progress[req.params.lessonId] = true;
  await db.write();
  res.json({ ok: true });
});

// DELETE /api/progress/:lessonId — desmarca
router.delete('/:lessonId', async (req, res) => {
  const db = req.db;
  req.user.progress = req.user.progress || {};
  delete req.user.progress[req.params.lessonId];
  await db.write();
  res.json({ ok: true });
});

module.exports = router;
