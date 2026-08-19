const express = require('express');
const bcrypt = require('bcryptjs');
const { hash, nextId } = require('./db');
const { requireSchoolAuth, requirePermission } = require('./auth-middleware');
const { MODULES, moduleIndex } = require('./course-catalog');

const router = express.Router();
router.use(requireSchoolAuth);
router.use(requirePermission('turmas'));

const TOTAL_LESSONS = MODULES.reduce((a, m) => a + m.lessonCount, 0); // 24
const PAYMENT_STATUSES = ['em_dia', 'atrasado', 'isento'];

function moduleLabel(moduleId) {
  const m = MODULES.find((mm) => mm.id === moduleId);
  return m ? m.levelLabel : moduleId;
}

// Monta um resumo de desempenho de um estudante: progresso, notas de cada
// avaliação já feita, e se já é elegível para o certificado (passou na
// avaliação do último módulo da trilha).
function studentSummary(s) {
  const completed = Object.values(s.progress || {}).filter(Boolean).length;
  const assessments = MODULES.map((m) => {
    const a = (s.assessments || {})[m.id];
    return {
      moduleId: m.id, levelLabel: m.levelLabel,
      done: !!a, passed: a ? !!a.passed : false, score: a ? a.score : null,
      attemptedAt: a ? a.attemptedAt : null,
    };
  });
  const lastModuleId = MODULES[MODULES.length - 1].id;
  const lastAssessment = (s.assessments || {})[lastModuleId];
  const certificateEligible = !!(lastAssessment && lastAssessment.passed);

  return {
    id: s.id, name: s.name, username: s.username,
    enrolledModule: s.enrolledModule || 'm1',
    enrolledModuleLabel: moduleLabel(s.enrolledModule || 'm1'),
    completedLessons: completed, totalLessons: TOTAL_LESSONS,
    overallPercent: TOTAL_LESSONS ? Math.round((completed / TOTAL_LESSONS) * 100) : 0,
    paymentStatus: s.paymentStatus || 'em_dia',
    assessments,
    certificateEligible,
    certificateIssuedAt: s.certificateIssuedAt || null,
  };
}

// GET /api/classes
router.get('/', async (req, res) => {
  const classes = req.school.classes.map((c) => ({ id: c.id, name: c.name, studentCount: c.students.length }));
  res.json({ classes });
});

// POST /api/classes { name }
router.post('/', async (req, res) => {
  const name = (req.body && req.body.name || '').trim();
  if (!name) return res.status(400).json({ error: 'Nome da turma é obrigatório' });
  const db = req.db;
  const newClass = { id: nextId(db, 'classId'), name, students: [] };
  req.school.classes.push(newClass);
  await db.write();
  res.status(201).json({ class: { id: newClass.id, name: newClass.name, studentCount: 0 } });
});

// DELETE /api/classes/:id
router.delete('/:id', async (req, res) => {
  const db = req.db;
  const id = Number(req.params.id);
  const before = req.school.classes.length;
  req.school.classes = req.school.classes.filter((c) => c.id !== id);
  await db.write();
  res.json({ ok: true, removed: before !== req.school.classes.length });
});

// GET /api/classes/:id/students — lista resumida (usada na tela de Minhas Turmas)
router.get('/:id/students', async (req, res) => {
  const id = Number(req.params.id);
  const klass = req.school.classes.find((c) => c.id === id);
  if (!klass) return res.status(404).json({ error: 'Turma não encontrada' });
  res.json({ students: klass.students.map(studentSummary) });
});

// GET /api/classes/:id/students/:studentId — perfil completo de UM estudante
// (desempenho detalhado, notas de cada avaliação, pagamento, certificado)
router.get('/:id/students/:studentId', async (req, res) => {
  const id = Number(req.params.id);
  const studentId = Number(req.params.studentId);
  const klass = req.school.classes.find((c) => c.id === id);
  if (!klass) return res.status(404).json({ error: 'Turma não encontrada' });
  const student = klass.students.find((s) => s.id === studentId);
  if (!student) return res.status(404).json({ error: 'Estudante não encontrado' });
  res.json({ student: studentSummary(student), className: klass.name });
});

// POST /api/classes/:id/students { name, username, password, enrolledModule }
router.post('/:id/students', async (req, res) => {
  const db = req.db;
  const id = Number(req.params.id);
  const klass = req.school.classes.find((c) => c.id === id);
  if (!klass) return res.status(404).json({ error: 'Turma não encontrada' });

  const { name, username, password, enrolledModule } = req.body || {};
  if (!name || !username || !password) {
    return res.status(400).json({ error: 'name, username e password são obrigatórios' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
  }
  const allStudents = req.school.classes.flatMap((c) => c.students);
  if (allStudents.some((s) => s.username === username)) {
    return res.status(409).json({ error: 'Já existe um estudante com esse username nesta escola' });
  }

  const student = {
    id: nextId(db, 'studentId'), name, username, passwordHash: hash(password),
    enrolledModule: enrolledModule || 'm1', progress: {}, assessments: {},
    paymentStatus: 'em_dia', certificateIssuedAt: null,
  };
  klass.students.push(student);
  await db.write();
  res.status(201).json({ student: studentSummary(student) });
});

// PUT /api/classes/:id/students/:studentId { name?, username?, password?, enrolledModule?, paymentStatus? }
// Edita dados de um estudante já matriculado. Login pode ser editado por aqui
// (diferente do login de STAFF, que só o dono edita) — a escola é dona da própria
// matrícula de estudante.
router.put('/:id/students/:studentId', async (req, res) => {
  const db = req.db;
  const id = Number(req.params.id);
  const studentId = Number(req.params.studentId);
  const klass = req.school.classes.find((c) => c.id === id);
  if (!klass) return res.status(404).json({ error: 'Turma não encontrada' });
  const student = klass.students.find((s) => s.id === studentId);
  if (!student) return res.status(404).json({ error: 'Estudante não encontrado' });

  const { name, username, password, enrolledModule, paymentStatus } = req.body || {};
  if (username && username.trim() && username.trim() !== student.username) {
    const allStudents = req.school.classes.flatMap((c) => c.students);
    if (allStudents.some((s) => s.id !== student.id && s.username === username.trim())) {
      return res.status(409).json({ error: 'Já existe um estudante com esse username nesta escola' });
    }
    student.username = username.trim();
  }
  if (name && name.trim()) student.name = name.trim();
  if (password) {
    if (password.length < 6) return res.status(400).json({ error: 'A nova senha deve ter pelo menos 6 caracteres' });
    student.passwordHash = hash(password);
  }
  if (enrolledModule) student.enrolledModule = enrolledModule;
  if (paymentStatus) {
    if (!PAYMENT_STATUSES.includes(paymentStatus)) {
      return res.status(400).json({ error: 'Status de pagamento inválido' });
    }
    student.paymentStatus = paymentStatus;
  }

  await db.write();
  res.json({ student: studentSummary(student) });
});

// POST /api/classes/:id/students/:studentId/issue-certificate
// Emite (registra a data de emissão) do certificado — só permitido se o
// estudante já passou na avaliação do último módulo da trilha.
router.post('/:id/students/:studentId/issue-certificate', async (req, res) => {
  const db = req.db;
  const id = Number(req.params.id);
  const studentId = Number(req.params.studentId);
  const klass = req.school.classes.find((c) => c.id === id);
  if (!klass) return res.status(404).json({ error: 'Turma não encontrada' });
  const student = klass.students.find((s) => s.id === studentId);
  if (!student) return res.status(404).json({ error: 'Estudante não encontrado' });

  const lastModuleId = MODULES[MODULES.length - 1].id;
  const lastAssessment = (student.assessments || {})[lastModuleId];
  if (!lastAssessment || !lastAssessment.passed) {
    return res.status(400).json({ error: 'Este estudante ainda não concluiu toda a trilha (falta passar na avaliação do último módulo).' });
  }
  student.certificateIssuedAt = new Date().toISOString();
  await db.write();
  res.json({ student: studentSummary(student) });
});

// DELETE /api/classes/:id/students/:studentId
router.delete('/:id/students/:studentId', async (req, res) => {
  const db = req.db;
  const id = Number(req.params.id);
  const studentId = Number(req.params.studentId);
  const klass = req.school.classes.find((c) => c.id === id);
  if (!klass) return res.status(404).json({ error: 'Turma não encontrada' });
  const before = klass.students.length;
  klass.students = klass.students.filter((s) => s.id !== studentId);
  await db.write();
  res.json({ ok: true, removed: before !== klass.students.length });
});

module.exports = router;
