const express = require('express');
const { helpers } = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/courses — catálogo completo (mesmo conteúdo para todas as escolas)
router.get('/', requireAuth, (req, res) => {
  const courses = helpers.listCourses();
  const result = courses.map(course => {
    const modules = helpers.listModulesByCourse(course.id);
    const modulesWithLessons = modules.map(m => {
      const lessons = helpers.listLessonsByModule(m.id)
        .map(l => ({ id: l.id, idx: l.idx, title: l.title, duration: l.duration, ready: l.ready }));

      const lessonIds = lessons.map(l => l.id);
      const completedIds = helpers.getCompletedLessonIds(req.user.userId, lessonIds);

      return {
        ...m,
        lessons: lessons.map(l => ({ ...l, completed: completedIds.has(l.id) })),
      };
    });
    return { ...course, modules: modulesWithLessons };
  });
  res.json({ courses: result });
});

// GET /api/courses/:courseId/lessons/:lessonId — conteúdo completo de uma aula
router.get('/:courseId/lessons/:lessonId', requireAuth, (req, res) => {
  const { lessonId } = req.params;
  const lesson = helpers.getLessonById(lessonId);
  if (!lesson) return res.status(404).json({ error: 'Aula não encontrada.' });
  if (!lesson.ready) return res.status(200).json({ lesson: { ...lesson, ready: false } });
  res.json({ lesson: { ...lesson, ready: true } });
});

module.exports = router;
