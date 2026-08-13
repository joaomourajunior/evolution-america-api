const express = require('express');
const { getDb } = require('../db');

const router = express.Router();

function buscaLocal(course, pergunta) {
  const termo = (pergunta || '').toLowerCase();
  for (const nivel of course.niveis) {
    for (const a of nivel.aulas) {
      const blob = `${a.titulo} ${a.canais.visual} ${a.canais.auditivo} ${a.canais.cinestesico}`.toLowerCase();
      if (blob.includes(termo) && termo.length > 2) {
        return `Encontrei isso na aula "${a.titulo}" (nível ${nivel.nome}): ${a.canais.visual}`;
      }
    }
  }
  return 'Ainda não encontrei esse conteúdo na trilha. Tenta reformular a pergunta ou me diz em qual nível você está estudando.';
}

// POST /api/evoia/chat { pergunta }
router.post('/chat', async (req, res) => {
  const { pergunta } = req.body || {};
  if (!pergunta) return res.status(400).json({ error: 'pergunta é obrigatória' });

  const db = await getDb();
  const provider = process.env.AI_PROVIDER;

  if (!provider) {
    return res.json({ resposta: buscaLocal(db.data.course, pergunta), modo: 'local' });
  }

  // Modo com provedor externo (Gemini/Anthropic/OpenAI) — depende de chave de API
  // configurada no Railway. Mantido como stub aqui pois foge do escopo do teste local.
  return res.json({
    resposta: buscaLocal(db.data.course, pergunta),
    modo: `externo:${provider} (stub — configure a chamada real quando a chave estiver ativa)`,
  });
});

module.exports = router;
