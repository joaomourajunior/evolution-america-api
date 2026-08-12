const { EVOIA_LESSON_ANSWERS, EVOIA_INDEX, EVOIA_FAQ } = require('./evoiaKnowledge');

function tokenize(text) {
  return text.toLowerCase().replace(/[^\wà-ú\s]/g, ' ').split(/\s+/).filter(w => w.length > 3);
}

function mdBold(str) {
  return str.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/**
 * Mesma lógica de correspondência por palavra-chave usada no protótipo frontend.
 * Usada como fallback quando nenhum provedor de IA está configurado (ou quando a
 * chamada ao provedor falha), garantindo que o EVO IA sempre responda algo útil.
 */
function localAnswer(question) {
  const qWords = tokenize(question);
  if (qWords.length === 0) {
    return { reply: 'Pode reformular sua pergunta? Quero entender melhor o que você precisa saber sobre a trilha.', lessonRef: null };
  }

  let bestFaq = null, bestFaqScore = 0;
  EVOIA_FAQ.forEach(f => {
    const score = qWords.filter(w => f.words.some(fw => w.includes(fw) || fw.includes(w))).length;
    if (score > bestFaqScore) { bestFaqScore = score; bestFaq = f; }
  });

  let bestLesson = null, bestLessonScore = 0;
  EVOIA_INDEX.forEach(entry => {
    const score = qWords.filter(w => [...entry.words].some(ew => ew.includes(w) || w.includes(ew))).length;
    if (score > bestLessonScore) { bestLessonScore = score; bestLesson = entry; }
  });

  if (bestLesson && bestLessonScore >= 2 && bestLessonScore >= bestFaqScore) {
    const answer = EVOIA_LESSON_ANSWERS[bestLesson.key] || 'Essa é uma ótima pergunta para explorar na aula correspondente da trilha.';
    return {
      reply: mdBold(answer),
      lessonRef: { moduleIdx: bestLesson.moduleIdx, lessonIdx: bestLesson.lessonIdx, title: bestLesson.lessonTitle, ready: bestLesson.ready },
    };
  }

  if (bestFaq && bestFaqScore > 0) {
    return { reply: mdBold(bestFaq.answer), lessonRef: null };
  }

  if (bestLesson && bestLessonScore > 0) {
    const answer = EVOIA_LESSON_ANSWERS[bestLesson.key] || '';
    return {
      reply: `Não encontrei uma resposta exata, mas isso parece relacionado à aula "${bestLesson.lessonTitle}". ${mdBold(answer)}`,
      lessonRef: { moduleIdx: bestLesson.moduleIdx, lessonIdx: bestLesson.lessonIdx, title: bestLesson.lessonTitle, ready: bestLesson.ready },
    };
  }

  return {
    reply: 'Ainda não tenho uma resposta direta para isso no conteúdo publicado. Tente perguntar sobre um dos temas da trilha — como prompts, agentes de IA, ética ou automações — ou navegue pelo HUB Tecnológico para explorar os módulos.',
    lessonRef: null,
  };
}

/** Encontra a aula mais relevante para uma pergunta — usada para dar contexto (grounding) ao provedor de IA real. */
function findBestLessonMatch(question) {
  const qWords = tokenize(question);
  let best = null, bestScore = 0;
  EVOIA_INDEX.forEach(entry => {
    const score = qWords.filter(w => [...entry.words].some(ew => ew.includes(w) || w.includes(ew))).length;
    if (score > bestScore) { bestScore = score; best = entry; }
  });
  return bestScore > 0 ? best : null;
}

module.exports = { localAnswer, findBestLessonMatch };
