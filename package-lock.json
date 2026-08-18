// evoia-knowledge.js — base de conhecimento compartilhada do EVO IA.
// Usada tanto no chat ao vivo (/api/evoia/chat) quanto na resposta automática
// de tickets abertos pelo estudante (/api/students/tickets). Cobre dúvidas
// sobre o conteúdo do curso E sobre assuntos administrativos da escola
// (mensalidade, secretaria, suporte técnico, prazos, certificado etc.) —
// tudo dentro do universo de ações que o estudante pode realizar na
// plataforma da escola em que está matriculado.

const FAQ = [
  // ----- Conteúdo do curso -----
  { words: ['inteligencia', 'artificial', 'ia'], answer: 'Inteligência Artificial é a área da tecnologia que ensina máquinas a reconhecer padrões e tomar decisões a partir de dados, em vez de seguir só regras fixas escritas por uma pessoa.' },
  { words: ['prompt', 'pedir', 'perguntar'], answer: 'Um bom prompt é claro, dá contexto e diz exatamente o formato de resposta que você espera. Quanto mais específico, melhor a resposta da IA.' },
  { words: ['agente', 'agentes'], answer: 'Agentes de IA são sistemas que não só respondem, mas também executam tarefas por conta própria, usando ferramentas e tomando decisões em etapas.' },
  { words: ['apostila', 'pdf'], answer: 'Você pode gerar a apostila em PDF da trilha completa direto na página do curso, clicando em "Gerar apostila (PDF)".' },
  { words: ['modulo', 'fase', 'nivel'], answer: 'A trilha é dividida em 6 fases (IA Explorer, Builder, Creator, Professional, Specialist e Master). Você avança de fase completando todas as aulas e sendo aprovado na avaliação daquele módulo.' },
  { words: ['avaliacao', 'prova', 'teste', 'quiz'], answer: 'Cada módulo tem uma avaliação de 4 perguntas ao final. É preciso acertar pelo menos 70% para desbloquear a próxima fase. Você pode tentar novamente se não passar.' },
  { words: ['aula', 'trava', 'bloqueada', 'nao', 'abre'], answer: 'As aulas são liberadas em ordem: você só consegue abrir a próxima depois de concluir a anterior do mesmo módulo. Isso garante que ninguém pule etapas importantes do aprendizado.' },
  { words: ['certificado', 'certificacao'], answer: 'O certificado é emitido ao concluir todos os módulos da trilha, incluindo todas as avaliações. Fale com sua escola para confirmar como a emissão funciona na sua instituição.' },

  // ----- Assuntos administrativos da escola -----
  { words: ['mensalidade', 'pagamento', 'boleto', 'financeiro', 'valor', 'preco'], answer: 'Questões de mensalidade e pagamento são tratadas diretamente pela secretaria da sua escola — a EVO IA não tem acesso a dados financeiros. Recomendo abrir este ticket normalmente: o professor ou a direção vai te responder com essa informação.' },
  { words: ['matricula', 'matricular', 'inscricao', 'inscrever', 'turma', 'cadastrar estudante'], answer: 'A matrícula de um estudante é feita pela escola em "Minhas Turmas" → "+ Adicionar estudante", escolhendo o nível manualmente ou pelo teste de nivelamento. Se você é estudante e quer mudar de turma ou nível, peça pra sua escola ajustar isso por lá.' },
  { words: ['senha', 'esqueci', 'login', 'acesso'], answer: 'Se você esqueceu sua senha, peça pra sua escola redefinir seu acesso — isso é feito pelo painel administrativo dela, por segurança.' },
  { words: ['horario', 'aula', 'calendario', 'quando'], answer: 'Horários de aula presencial ou ao vivo, quando existirem, são organizados pela sua escola. A trilha online em si você pode estudar no seu próprio ritmo, respeitando a ordem das aulas.' },
  { words: ['contato', 'secretaria', 'telefone', 'email', 'falar'], answer: 'Para contato direto com a secretaria, é melhor abrir um ticket como este mesmo, ou verificar o e-mail/telefone de contato divulgado pela sua escola.' },
  { words: ['suporte', 'erro', 'nao', 'funciona', 'travou', 'bug'], answer: 'Sinto muito pelo transtorno! Descreva com detalhes o que aconteceu (qual tela, o que você clicou) neste ticket — a equipe da sua escola vai te ajudar a resolver.' },
];

function answerFromFAQ(message) {
  const lower = (message || '').toLowerCase();
  const words = lower.replace(/[^\wà-ú\s]/g, ' ').split(/\s+/).filter((w) => w.length > 3);

  let best = null, bestScore = 0;
  FAQ.forEach((f) => {
    const score = words.filter((w) => f.words.some((fw) => w.includes(fw) || fw.includes(w))).length;
    if (score > bestScore) { bestScore = score; best = f; }
  });

  if (best) return best.answer;
  return 'Obrigado por perguntar! Ainda não tenho uma resposta pronta pra isso, mas já registrei sua dúvida — a equipe da sua escola vai olhar com atenção e te responder por aqui.';
}

module.exports = { FAQ, answerFromFAQ };
