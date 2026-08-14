const express = require('express');
const { requireSchoolAuth } = require('../lib/auth-middleware');

const router = express.Router();
router.use(requireSchoolAuth);

const TOTAL_LESSONS = 24; // 6 módulos x 4 aulas, mesma contagem do catálogo local do frontend

// GET /api/reports/school
router.get('/school', async (req, res) => {
  const classes = req.school.classes;
  let totalCompletions = 0;

  const classReports = classes.map((c) => {
    const students = c.students.map((s) => {
      const completed = Object.values(s.progress || {}).filter(Boolean).length;
      totalCompletions += completed;
      return {
        name: s.name,
        completed,
        totalLessons: TOTAL_LESSONS,
        pct: TOTAL_LESSONS ? Math.round((completed / TOTAL_LESSONS) * 100) : 0,
      };
    });
    const avgPct = students.length
      ? Math.round(students.reduce((a, s) => a + s.pct, 0) / students.length)
      : 0;
    return { className: c.name, studentCount: c.students.length, avgPct, students };
  });

  res.json({
    totalClasses: classes.length,
    totalLessons: TOTAL_LESSONS,
    totalCompletions,
    classReports,
  });
});

module.exports = router;
