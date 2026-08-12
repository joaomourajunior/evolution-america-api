const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/courses — catálogo completo (mesmo conteúdo para todas as escolas)
router.get('/', requireAuth, (req, res) => {
  const courses = db.prepare(`SELECT * FROM courses`).all();
  const result = courses.map(course => {
    const modules = db.prepare(`SELECT * FROM modules WHERE course_id = ? ORDER BY idx`).all(course.id);
    const modulesWithLessons = modules.map(m => {
      const lessons = db.prepare(`
        SELECT id, idx, title, duration, ready FROM lessons WHERE module_id = ? ORDER BY idx
      `).all(m.id);

      // progresso do usuário logado nessa turma de aulas (isolado por user_id, que já é isolado por escola)
      const completedIds = new Set(
        db.prepare(`
          SELECT lesson_id FROM progress
          WHERE user_id = ? AND lesson_id IN (${lessons.map(() => '?').join(',') || "''"})
        `).all(req.user.userId, ...lessons.map(l => l.id)).map(r => r.lesson_id)
      );

      return {
        ...m,
        lessons: lessons.map(l => ({ ...l, ready: !!l.ready, completed: completedIds.has(l.id) })),
      };
    });
    return { ...course, modules: modulesWithLessons };
  });
  res.json({ courses: result });
});

// GET /api/courses/:courseId/lessons/:lessonId — conteúdo completo de uma aula
router.get('/:courseId/lessons/:lessonId', requireAuth, (req, res) => {
  const { lessonId } = req.params;
  const lesson = db.prepare(`SELECT * FROM lessons WHERE id = ?`).get(lessonId);
  if (!lesson) return res.status(404).json({ error: 'Aula não encontrada.' });
  if (!lesson.ready) return res.status(200).json({ lesson: { ...lesson, ready: false } });
  res.json({ lesson: { ...lesson, ready: true } });
});

module.exports = router;
