const express = require('express');
const { nextId } = require('./db');
const { requireSchoolAuth, requirePermission } = require('./auth-middleware');
const { requireStudentAuth } = require('./student-auth-middleware');
const { answerFromFAQ } = require('./evoia-knowledge');

const router = express.Router();

// ===== Lado do ESTUDANTE =====

// POST /api/students/tickets { subject, message }
// Abre um ticket de dúvida. Duas respostas chegam juntas, na hora:
// 1) uma confirmação automática ("vou avaliar sua solicitação...")
// 2) a resposta do EVO IA, já tentando ajudar de imediato.
router.post('/', requireStudentAuth, async (req, res) => {
  const { subject, message } = req.body || {};
  if (!subject || !subject.trim() || !message || !message.trim()) {
    return res.status(400).json({ error: 'Preencha o assunto e a mensagem' });
  }
  const db = req.db;
  const aiReply = answerFromFAQ(message);
  const ticket = {
    id: nextId(db, 'ticketId'),
    studentId: req.student.id,
    studentName: req.student.name,
    className: req.klass ? req.klass.name : '',
    classId: req.klass ? req.klass.id : null,
    subject: subject.trim(),
    message: message.trim(),
    status: 'respondido_pela_ia', // aguardando_professor | respondido_pela_ia | respondido_pelo_professor
    professorAckMessage: 'Vou avaliar sua solicitação e retorno em breve. Enquanto isso, aqui vai uma resposta inicial da EVO IA:',
    aiReply,
    professorReply: null,
    professorRepliedAt: null,
    createdAt: new Date().toISOString(),
  };
  req.school.tickets = req.school.tickets || [];
  req.school.tickets.push(ticket);
  await db.write();
  res.status(201).json({ ticket });
});

// GET /api/students/tickets — tickets do próprio estudante
router.get('/mine', requireStudentAuth, async (req, res) => {
  const tickets = (req.school.tickets || [])
    .filter((t) => t.studentId === req.student.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ tickets });
});

module.exports = router;
