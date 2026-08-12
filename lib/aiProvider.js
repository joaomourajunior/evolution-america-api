/**
 * aiProvider.js
 * Camada de abstração de provedor de IA — mesmo padrão usado no Acesso Express.
 * Troca de provedor via variável de ambiente AI_PROVIDER: 'gemini' | 'anthropic' | 'openai'.
 * Se nenhuma chave de API estiver configurada, cai automaticamente no modo de
 * demonstração local (busca por palavras-chave no conteúdo já publicado).
 */

const PROVIDER = (process.env.AI_PROVIDER || 'gemini').toLowerCase();

async function callGemini(systemPrompt, userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY não configurada');

  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

async function callAnthropic(systemPrompt, userMessage) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY não configurada');

  const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return data.content?.find(b => b.type === 'text')?.text?.trim() || '';
}

async function callOpenAI(systemPrompt, userMessage) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY não configurada');

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 500,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

/**
 * generateReply — ponto de entrada único usado pelas rotas.
 * Tenta o provedor configurado; se não houver chave de API ou a chamada falhar,
 * sinaliza para a rota usar o fallback local (respondida no chamador).
 */
async function generateReply(systemPrompt, userMessage) {
  const providers = { gemini: callGemini, anthropic: callAnthropic, openai: callOpenAI };
  const fn = providers[PROVIDER];
  if (!fn) throw new Error(`AI_PROVIDER desconhecido: ${PROVIDER}`);
  return fn(systemPrompt, userMessage);
}

function isConfigured() {
  if (PROVIDER === 'gemini') return !!process.env.GEMINI_API_KEY;
  if (PROVIDER === 'anthropic') return !!process.env.ANTHROPIC_API_KEY;
  if (PROVIDER === 'openai') return !!process.env.OPENAI_API_KEY;
  return false;
}

module.exports = { generateReply, isConfigured, PROVIDER };
