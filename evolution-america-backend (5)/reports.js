const express = require('express');
const { requireSchoolAuth, requirePermission } = require('./auth-middleware');
const { MODULES } = require('./course-catalog');

const router = express.Router();
router.use(requireSchoolAuth);
router.use(requirePermission('relatorios'));

const TOTAL_LESSONS = MODULES.reduce((a, m) => a + m.lessonCount, 0); // 24 (6 módulos x 4 aulas)

function moduleLabel(moduleId) {
  const m = MODULES.find((mm) => mm.id === moduleId);
  return m ? m.levelLabel : moduleId;
}

// GET /api/reports/school
router.get('/school', async (req, res) => {
  const classes = req.school.classes;
  let totalCompletions = 0;

  const classReports = classes.map((c) => {
    const students = c.students.map((s) => {
      const completed = Object.values(s.progress || {}).filter(Boolean).length;
      totalCompletions += completed;
      return {
        id: s.id,
        name: s.name,
        enrolledModule: s.enrolledModule || 'm1',
        enrolledModuleLabel: moduleLabel(s.enrolledModule || 'm1'),
        completed,
        totalLessons: TOTAL_LESSONS,
        pct: TOTAL_LESSONS ? Math.round((completed / TOTAL_LESSONS) * 100) : 0,
      };
    });
    const avgPct = students.length
      ? Math.round(students.reduce((a, s) => a + s.pct, 0) / students.length)
      : 0;
    return { classId: c.id, className: c.name, studentCount: c.students.length, avgPct, students };
  });

  res.json({
    totalClasses: classes.length,
    totalLessons: TOTAL_LESSONS,
    totalCompletions,
    classReports,
  });
});

// GET /api/reports/search?q=termo — busca estudante por nome, restrita à própria escola
router.get('/search', async (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();
  const results = [];
  req.school.classes.forEach((klass) => {
    klass.students.forEach((s) => {
      if (!q || s.name.toLowerCase().includes(q) || s.username.toLowerCase().includes(q)) {
        const completed = Object.values(s.progress || {}).filter(Boolean).length;
        results.push({
          id: s.id, name: s.name, username: s.username,
          className: klass.name, classId: klass.id,
          enrolledModule: s.enrolledModule || 'm1',
          enrolledModuleLabel: moduleLabel(s.enrolledModule || 'm1'),
          completed, totalLessons: TOTAL_LESSONS,
          pct: TOTAL_LESSONS ? Math.round((completed / TOTAL_LESSONS) * 100) : 0,
          assessments: s.assessments || {},
        });
      }
    });
  });
  res.json({ results });
});

module.exports = router;
