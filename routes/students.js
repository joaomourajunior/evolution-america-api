const express = require('express');
const bcrypt = require('bcryptjs');
const tokenLib = require('../lib/token');
const { requireStudentAuth } = require('../lib/student-auth-middleware');
const { getDb } = require('../db');
const { MODULES, moduleIndex, lessonKeys, nextModuleId } = require('../course-catalog');
const { QUIZZES } = require('../quiz-data');

const router = express.Router();

// POST /api/students/login { schoolSlug, username, password }
router.post('/login', async (req, res) => {
  const { schoolSlug, username, password } = req.body || {};
  const db = await getDb();
  const school = db.data.schools.find((s) => s.slug === schoolSlug);
  if (!school) return res.status(401).json({ error: 'Escola não encontrada' });
  if (school.active === false) return res.status(403).json({ error: 'O acesso desta escola está suspenso.' });

  let found = null;
  for (const c of school.classes) {
    const st = c.students.find((s) => s.username === username);
    if (st) { found = st; break; }
  }
  if (!found || !bcrypt.compareSync(password || '', found.passwordHash)) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }

  const t = tokenLib.sign({ student: true, schoolId: school.id, studentId: found.id });
  res.json({
    token: t,
    student: { id: found.id, name: found.name, username: found.username, enrolledModule: found.enrolledModule },
    school: { id: school.id, name: school.name, logoDataUrl: school.logoDataUrl || null },
  });
});

function computeModuleStatus(student) {
  const currentIdx = moduleIndex(student.enrolledModule || 'm1');
  return MODULES.map((m, idx) => {
    const keys = lessonKeys(m.id);
    const completedCount = keys.filter((k) => student.progress && student.progress[k]).length;
    const assessment = (student.assessments || {})[m.id];
    let status;
    if (idx < currentIdx) status = 'concluido';
    else if (idx === currentIdx) status = 'atual';
    else status = 'bloqueado';
    return {
      id: m.id, level: m.level, levelLabel: m.levelLabel, ageRange: m.ageRange,
      status,
      totalLessons: keys.length,
      completedLessons: completedCount,
      lessonsDone: keys.map((k) => !!(student.progress && student.progress[k])),
      assessment: assessment ? { passed: !!assessment.passed, score: assessment.score } : null,
    };
  });
}

// GET /api/students/me — perfil + trilha com bloqueio calculado
router.get('/me', requireStudentAuth, async (req, res) => {
  const modules = computeModuleStatus(req.student);
  const totalLessons = MODULES.reduce((a, m) => a + m.lessonCount, 0);
  const totalDone = Object.values(req.student.progress || {}).filter(Boolean).length;
  res.json({
    student: {
      id: req.student.id, name: req.student.name, username: req.student.username,
      enrolledModule: req.student.enrolledModule,
      overallPercent: totalLessons ? Math.round((totalDone / totalLessons) * 100) : 0,
    },
    school: { id: req.school.id, name: req.school.name, logoDataUrl: req.school.logoDataUrl || null },
    modules,
  });
});

// POST /api/students/lessons/:lessonKey/complete
// Só marca como concluída se for exatamente a próxima aula pendente do módulo atual
// (não deixa "pular" aula, nem mexer em módulo ainda bloqueado).
router.post('/lessons/:lessonKey/complete', requireStudentAuth, async (req, res) => {
  const { lessonKey } = req.params;
  const [moduleId] = lessonKey.split('-l');
  const currentModule = req.student.enrolledModule || 'm1';

  if (moduleId !== currentModule) {
    return res.status(403).json({ error: 'Essa aula não pertence ao seu módulo atual.' });
  }
  const keys = lessonKeys(currentModule);
  if (!keys.includes(lessonKey)) {
    return res.status(404).json({ error: 'Aula não encontrada' });
  }
  const idxInModule = keys.indexOf(lessonKey);
  const priorKeys = keys.slice(0, idxInModule);
  const progress = req.student.progress || {};
  const missingPrior = priorKeys.find((k) => !progress[k]);
  if (missingPrior) {
    return res.status(403).json({ error: 'Termine as aulas anteriores deste módulo antes de avançar.' });
  }

  const db = req.db;
  req.student.progress = { ...progress, [lessonKey]: true };
  await db.write();
  res.json({ ok: true, modules: computeModuleStatus(req.student) });
});

// GET /api/students/assessment/:moduleId — perguntas (sem a resposta certa)
router.get('/assessment/:moduleId', requireStudentAuth, async (req, res) => {
  const { moduleId } = req.params;
  if (moduleId !== (req.student.enrolledModule || 'm1')) {
    return res.status(403).json({ error: 'Esta avaliação não é do seu módulo atual.' });
  }
  const keys = lessonKeys(moduleId);
  const progress = req.student.progress || {};
  const allDone = keys.every((k) => progress[k]);
  if (!allDone) {
    return res.status(403).json({ error: 'Termine todas as aulas do módulo antes de fazer a avaliação.' });
  }
  const quiz = QUIZZES[moduleId];
  if (!quiz) return res.status(404).json({ error: 'Avaliação não encontrada para este módulo' });
  res.json({
    title: quiz.title,
    passingScore: quiz.passingScore,
    questions: quiz.questions.map((q, i) => ({ index: i, q: q.q, options: q.options })),
  });
});

// POST /api/students/assessment/:moduleId/submit { answers: [idx, idx, ...] }
router.post('/assessment/:moduleId/submit', requireStudentAuth, async (req, res) => {
  const { moduleId } = req.params;
  if (moduleId !== (req.student.enrolledModule || 'm1')) {
    return res.status(403).json({ error: 'Esta avaliação não é do seu módulo atual.' });
  }
  const quiz = QUIZZES[moduleId];
  if (!quiz) return res.status(404).json({ error: 'Avaliação não encontrada' });

  const { answers } = req.body || {};
  if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
    return res.status(400).json({ error: 'Respostas inválidas' });
  }
  let correctCount = 0;
  quiz.questions.forEach((q, i) => { if (answers[i] === q.correct) correctCount++; });
  const score = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = score >= quiz.passingScore;

  const db = req.db;
  req.student.assessments = req.student.assessments || {};
  req.student.assessments[moduleId] = { passed, score, attemptedAt: new Date().toISOString() };

  let advanced = false;
  if (passed) {
    const next = nextModuleId(moduleId);
    if (next) {
      req.student.enrolledModule = next;
      advanced = true;
    }
  }
  await db.write();

  res.json({
    passed, score, correctCount, total: quiz.questions.length,
    advanced, nextModule: advanced ? req.student.enrolledModule : null,
    modules: computeModuleStatus(req.student),
  });
});

module.exports = router;
