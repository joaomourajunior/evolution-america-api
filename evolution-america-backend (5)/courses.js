const express = require('express');
const { requireSchoolAuth } = require('./auth-middleware');

const router = express.Router();
router.use(requireSchoolAuth);

// GET /api/courses
// Retorna vazio de propósito: o frontend já tem um catálogo local rico e completo
// (6 módulos / 24 aulas) e só substitui pelos dados da API se "courses" vier
// preenchido. Isso evita duplicar conteúdo pedagógico aqui, mantendo a trilha
// que já está publicada como fonte da verdade por enquanto.
router.get('/', async (req, res) => {
  res.json({ courses: [] });
});

// GET /api/courses/:courseId/lessons/:lessonId — reservado para quando o
// conteúdo pedagógico completo for migrado pra cá.
router.get('/:courseId/lessons/:lessonId', async (req, res) => {
  res.status(404).json({ error: 'Conteúdo desta aula ainda não está disponível pela API' });
});

module.exports = router;
