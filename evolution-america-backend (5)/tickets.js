const express = require('express');
const { requireSchoolAuth, requirePermission } = require('./auth-middleware');

const router = express.Router();
router.use(requireSchoolAuth);
router.use(requirePermission('tickets'));

// GET /api/tickets — todos os tickets da própria escola (mais recentes primeiro)
router.get('/', async (req, res) => {
  const tickets = [...(req.school.tickets || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ tickets });
});

// PUT /api/tickets/:id/reply { reply }
router.put('/:id/reply', async (req, res) => {
  const db = req.db;
  const ticket = (req.school.tickets || []).find((t) => t.id === Number(req.params.id));
  if (!ticket) return res.status(404).json({ error: 'Ticket não encontrado' });

  const { reply } = req.body || {};
  if (!reply || !reply.trim()) return res.status(400).json({ error: 'Escreva uma resposta' });

  ticket.professorReply = reply.trim();
  ticket.professorRepliedAt = new Date().toISOString();
  ticket.status = 'respondido_pelo_professor';
  await db.write();
  res.json({ ticket });
});

module.exports = router;
