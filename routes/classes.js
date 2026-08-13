const express = require('express');
const bcrypt = require('bcryptjs');
const { helpers } = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/classes — lista as turmas da escola do usuário logado
router.get('/', requireAuth, (req, res) => {
  const classes = helpers.listClassesBySchool(req.user.schoolId).map(c => ({
    ...c,
    studentCount: helpers.listStudentsInClass(c.id).length,
  }));
  res.json({ classes });
});

// POST /api/classes — cria uma turma nova na escola do usuário logado
router.post('/', requireAuth, requireRole('admin', 'professor'), async (req, res) => {
  const { name, course_id } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Nome da turma é obrigatório.' });
  const cls = await helpers.createClass({ school_id: req.user.schoolId, name, course_id });
  res.status(201).json({ class: cls });
});

// DELETE /api/classes/:classId — remove uma turma (e as matrículas dela)
router.delete('/:classId', requireAuth, requireRole('admin', 'professor'), async (req, res) => {
  const classId = Number(req.params.classId);
  const cls = helpers.getClassById(classId);
  if (!cls || cls.school_id !== req.user.schoolId) {
    return res.status(404).json({ error: 'Turma não encontrada.' });
  }
  await helpers.deleteClass(classId);
  res.json({ message: 'Turma removida.' });
});

// GET /api/classes/:classId/students — lista estudantes matriculados numa turma
router.get('/:classId/students', requireAuth, (req, res) => {
  const classId = Number(req.params.classId);
  const cls = helpers.getClassById(classId);
  if (!cls || cls.school_id !== req.user.schoolId) {
    return res.status(404).json({ error: 'Turma não encontrada.' });
  }
  res.json({ students: helpers.listStudentsInClass(classId) });
});

// POST /api/classes/:classId/students — cadastra um estudante novo e já matricula na turma
// Body: { name, username, password, email? }
router.post('/:classId/students', requireAuth, requireRole('admin', 'professor'), async (req, res) => {
  const classId = Number(req.params.classId);
  const cls = helpers.getClassById(classId);
  if (!cls || cls.school_id !== req.user.schoolId) {
    return res.status(404).json({ error: 'Turma não encontrada.' });
  }
  const { name, username, password, email } = req.body || {};
  if (!name || !username || !password) {
    return res.status(400).json({ error: 'Nome, usuário e senha do estudante são obrigatórios.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
  }

  const existing = helpers.getUserByCredentials(req.user.schoolId, username);
  let student;
  if (existing) {
    student = existing; // estudante já existe nessa escola — só matricula
  } else {
    const passwordHash = bcrypt.hashSync(password, 10);
    student = await helpers.createUser({
      school_id: req.user.schoolId, name, username, email: email || null,
      password_hash: passwordHash, role: 'student',
    });
  }

  await helpers.enrollStudent(classId, student.id);
  res.status(201).json({ student: { id: student.id, name: student.name, username: student.username } });
});

// DELETE /api/classes/:classId/students/:studentId — desmatricula um estudante da turma
router.delete('/:classId/students/:studentId', requireAuth, requireRole('admin', 'professor'), async (req, res) => {
  const classId = Number(req.params.classId);
  const studentId = Number(req.params.studentId);
  const cls = helpers.getClassById(classId);
  if (!cls || cls.school_id !== req.user.schoolId) {
    return res.status(404).json({ error: 'Turma não encontrada.' });
  }
  await helpers.unenrollStudent(classId, studentId);
  res.json({ message: 'Estudante desmatriculado.' });
});

module.exports = router;
