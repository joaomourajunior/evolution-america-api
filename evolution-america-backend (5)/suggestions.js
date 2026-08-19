const express = require('express');
const { requireSchoolAuth } = require('./auth-middleware');

const router = express.Router();
router.use(requireSchoolAuth);

// POST /api/suggestions { message }
// A escola NUNCA edita conteúdo de curso diretamente — só sugere,
// e a sugestão aparece pro dono junto com o nome da escola/pessoa que enviou.
router.post('/', async (req, res) => {
  const { message } = req.body || {};
  if (!message || !message.trim()) return res.status(400).json({ error: 'message é obrigatório' });

  const db = req.db;
  const suggestion = {
    id: (db.data.suggestions.reduce((max, s) => Math.max(max, s.id), 0) || 0) + 1,
    schoolId: req.school.id,
    schoolName: req.school.name,
    author: req.user.name || req.user.username,
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
  db.data.suggestions.push(suggestion);
  await db.write();
  res.status(201).json({ suggestion });
});

module.exports = router;
