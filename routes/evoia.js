const express = require('express');
const { requireSchoolAuth, requirePermission } = require('../lib/auth-middleware');

const router = express.Router();
router.use(requireSchoolAuth);
router.use(requirePermission('evoia'));

const FAQ = [
  { words: ['inteligencia', 'artificial', 'ia'], answer: 'Inteligência Artificial é a área da tecnologia que ensina máquinas a reconhecer padrões e tomar decisões a partir de dados, em vez de seguir só regras fixas escritas por uma pessoa.' },
  { words: ['prompt', 'pedir', 'perguntar'], answer: 'Um bom prompt é claro, dá contexto e diz exatamente o formato de resposta que você espera. Quanto mais específico, melhor a resposta da IA.' },
  { words: ['agente', 'agentes'], answer: 'Agentes de IA são sistemas que não só respondem, mas também executam tarefas por conta própria, usando ferramentas e tomando decisões em etapas.' },
  { words: ['certificado', 'certificacao'], answer: 'O certificado é emitido ao concluir todos os módulos da trilha. Essa funcionalidade está em desenvolvimento nas próximas camadas da plataforma.' },
  { words: ['apostila', 'pdf'], answer: 'Você pode gerar a apostila em PDF da trilha completa direto na página do curso, clicando em "Gerar apostila (PDF)".' },
];

// POST /api/evoia/chat { message }
router.post('/chat', async (req, res) => {
  const message = (req.body && req.body.message || '').toLowerCase();
  const words = message.replace(/[^\wà-ú\s]/g, ' ').split(/\s+/).filter((w) => w.length > 3);

  let best = null, bestScore = 0;
  FAQ.forEach((f) => {
    const score = words.filter((w) => f.words.some((fw) => w.includes(fw) || fw.includes(w))).length;
    if (score > bestScore) { bestScore = score; best = f; }
  });

  const reply = best
    ? best.answer
    : 'Ainda não tenho uma resposta direta pra isso pelo backend. Tente perguntar sobre prompts, agentes de IA, certificação ou a apostila em PDF.';

  res.json({ reply, source: 'local' });
});

module.exports = router;
