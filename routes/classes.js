const express = require('express');
const bcrypt = require('bcryptjs');
const { hash, nextId } = require('../db');
const { requireSchoolAuth, requirePermission } = require('../lib/auth-middleware');

const router = express.Router();
router.use(requireSchoolAuth);
router.use(requirePermission('turmas'));

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

// GET /api/classes/:id/students
router.get('/:id/students', async (req, res) => {
  const id = Number(req.params.id);
  const klass = req.school.classes.find((c) => c.id === id);
  if (!klass) return res.status(404).json({ error: 'Turma não encontrada' });
  res.json({
    students: klass.students.map((s) => ({
      id: s.id, name: s.name, username: s.username, enrolledModule: s.enrolledModule || 'm1',
    })),
  });
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
  };
  klass.students.push(student);
  await db.write();
  res.status(201).json({ student: { id: student.id, name: student.name, username: student.username, enrolledModule: student.enrolledModule } });
});

// PUT /api/classes/:id/students/:studentId { name?, username?, password?, enrolledModule? }
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

  const { name, username, password, enrolledModule } = req.body || {};
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

  await db.write();
  res.json({ student: { id: student.id, name: student.name, username: student.username, enrolledModule: student.enrolledModule } });
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
