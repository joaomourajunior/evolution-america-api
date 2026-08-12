const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');
const aiProvider = require('../lib/aiProvider');
const { localAnswer, findBestLessonMatch } = require('../lib/evoiaFallback');

const router = express.Router();

const SYSTEM_PROMPT = `Você é o EVO IA, o assistente de estudos do HUB Tecnológico da plataforma Evolution América.
Sua função é ajudar estudantes com dúvidas sobre a trilha "Inteligência Artificial: do Zero ao Profissional" e sobre o
funcionamento da própria plataforma (apostila em PDF, canais de aprendizagem visual/auditivo/cinestésico, certificado, login, etc).
Responda sempre em português do Brasil, de forma clara, curta (no máximo 3-4 frases) e amigável, como um professor particular atencioso.
Nunca invente informação sobre a plataforma que não esteja no contexto fornecido. Se a pergunta não tiver relação com a trilha de IA
ou com a plataforma, gentilmente redirecione o estudante para o tema da trilha.`;

// POST /api/evoia/chat  { message }
router.post('/chat', requireAuth, async (req, res) => {
  const { message } = req.body || {};
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Mensagem vazia.' });
  }

  db.prepare(`INSERT INTO evoia_conversations (user_id, role, message) VALUES (?, 'user', ?)`)
    .run(req.user.userId, message);

  let reply, lessonRef = null, source = 'local';

  if (aiProvider.isConfigured()) {
    try {
      // dá contexto (grounding) ao modelo real com o conteúdo da aula mais relevante encontrada localmente
      const match = findBestLessonMatch(message);
      let contextBlock = '';
      if (match) {
        const lessonId = `${'ia-zero-ao-profissional'}__m${match.moduleIdx + 1}__l${match.lessonIdx + 1}`;
        contextBlock = `\n\nContexto de uma aula potencialmente relevante da trilha ("${match.moduleTitle}" > "${match.lessonTitle}"): use-o se ajudar a responder, mas não é obrigatório.`;
        lessonRef = { moduleIdx: match.moduleIdx, lessonIdx: match.lessonIdx, title: match.lessonTitle, ready: match.ready };
      }
      reply = await aiProvider.generateReply(SYSTEM_PROMPT + contextBlock, message);
      source = 'ai:' + aiProvider.PROVIDER;
    } catch (err) {
      console.error('[evoia] Falha no provedor de IA, usando fallback local:', err.message);
      const fallback = localAnswer(message);
      reply = fallback.reply;
      lessonRef = fallback.lessonRef;
      source = 'local-fallback';
    }
  } else {
    const fallback = localAnswer(message);
    reply = fallback.reply;
    lessonRef = fallback.lessonRef;
  }

  db.prepare(`INSERT INTO evoia_conversations (user_id, role, message) VALUES (?, 'assistant', ?)`)
    .run(req.user.userId, reply);

  res.json({ reply, lessonRef, source });
});

// GET /api/evoia/history — histórico de conversa do usuário logado (só o dele, nunca de outro estudante)
router.get('/history', requireAuth, (req, res) => {
  const rows = db.prepare(`
    SELECT role, message, created_at FROM evoia_conversations
    WHERE user_id = ? ORDER BY created_at ASC LIMIT 200
  `).all(req.user.userId);
  res.json({ history: rows });
});

module.exports = router;
