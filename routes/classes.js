const express = require('express');
const bcrypt = require('bcryptjs');
const { hash, nextId } = require('../db');
const { requireSchoolAuth } = require('../lib/auth-middleware');

const router = express.Router();
router.use(requireSchoolAuth);

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
  res.json({ students: klass.students.map((s) => ({ id: s.id, name: s.name, username: s.username })) });
});

// POST /api/classes/:id/students { name, username, password }
router.post('/:id/students', async (req, res) => {
  const db = req.db;
  const id = Number(req.params.id);
  const klass = req.school.classes.find((c) => c.id === id);
  if (!klass) return res.status(404).json({ error: 'Turma não encontrada' });

  const { name, username, password } = req.body || {};
  if (!name || !username || !password) {
    return res.status(400).json({ error: 'name, username e password são obrigatórios' });
  }
  const allStudents = req.school.classes.flatMap((c) => c.students);
  if (allStudents.some((s) => s.username === username)) {
    return res.status(409).json({ error: 'Já existe um estudante com esse username nesta escola' });
  }

  const student = { id: nextId(db, 'studentId'), name, username, passwordHash: hash(password), progress: {} };
  klass.students.push(student);
  await db.write();
  res.status(201).json({ student: { id: student.id, name: student.name, username: student.username } });
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
