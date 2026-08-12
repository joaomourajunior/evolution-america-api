const { COURSE } = require('../data/course-data.js');

const EVOIA_LESSON_ANSWERS = {
  'm1-l1': "É a capacidade de um sistema reconhecer **padrões** em grandes quantidades de dados e usar isso para prever ou decidir algo — sem ter consciência ou vontade própria, ao contrário do que os filmes sugerem.",
  'm1-l2': "É o processo de ensinar um sistema **por meio de exemplos**, em vez de regras fixas. Existem 3 estilos principais: supervisionado, não supervisionado e por reforço.",
  'm1-l3': "São as 3 peças de qualquer sistema de IA: **dados** (a matéria-prima), **algoritmo** (o método de aprendizado) e **modelo** (o resultado treinado e pronto para uso).",
  'm1-l4': "É o tipo de IA que **cria** algo novo — texto, imagem, código — em vez de só classificar ou prever. Funciona prevendo, repetidamente, a próxima palavra (ou pixel) mais provável.",
  'm2-l1': "O primeiro passo é criar uma conta (geralmente só com e-mail) em uma ferramenta de IA generativa, e se familiarizar com a caixa de mensagem e o histórico de conversas.",
  'm2-l2': "Um bom prompt combina **Tarefa** (o que você quer) + **Contexto** (para quem, com que objetivo) + **Formato** (tamanho, estilo, estrutura).",
  'm2-l3': "Três técnicas avançadas: dar um **papel/persona** para a IA assumir, fornecer um **exemplo** do resultado esperado, e pedir o **formato** explicitamente (lista, tabela, etc).",
  'm2-l4': "Os 4 erros mais comuns são: pedir demais de uma vez, não revisar a resposta, dar feedback vago, e tratar a IA como fonte final de verdade para fatos importantes.",
  'm3-l1': "Você pode usar IA para pedir resumos direcionados, estruturar mapas mentais, e — o uso mais poderoso — pedir que ela te teste com perguntas de revisão ativa.",
  'm3-l2': "A IA generativa cria imagens (a partir de descrições detalhadas), textos (com tarefa/contexto/formato) e estruturas de apresentação — sempre como ponto de partida para você refinar.",
  'm3-l3': "Os 3 pilares do uso ético são: atenção a **vieses** nos dados de treinamento, respeito a **direitos autorais**, e um uso **responsável** guiado por transparência, verificação e proporcionalidade.",
  'm3-l4': "Alucinação é quando a IA gera uma informação falsa que soa confiante. O antídoto é: desconfiar de dados muito específicos, buscar uma fonte independente, e perguntar à própria IA qual é a fonte.",
  'm4-l1': "Para saber se vale automatizar uma tarefa, pergunte: ela se repete? segue um padrão parecido? não exige julgamento humano delicado? Três 'sim' indicam uma boa candidata.",
  'm4-l2': "A IA ajuda a transformar tópicos soltos em e-mails com o tom certo, converter descrições em fórmulas de planilha, e montar estruturas de apresentação — inclusive versões resumidas.",
  'm4-l3': "Chatbots seguem um fluxo de perguntas e respostas (ou usam IA generativa para entender linguagem livre). Funcionam bem para dúvidas frequentes, mas devem transferir para um humano em situações delicadas.",
  'm4-l4': "A IA pode sugerir como interpretar dados e resumir relatórios longos, mas não deve ser a única fonte para decisões importantes — sempre valide números com uma pessoa responsável pela área.",
  'm5-l1': "Um agente de IA recebe um objetivo e decide sozinho, em várias etapas, como alcançá-lo — seguindo um ciclo de observar, decidir, executar e avaliar.",
  'm5-l2': "Integrações são pontes que conectam a IA a outros sistemas (e-mail, planilha, calendário). Uma automação combina um gatilho com uma ação que envolve IA.",
  'm5-l3': "As 4 etapas para construir um fluxo automatizado: definir o objetivo em uma frase, escolher o gatilho, escrever o prompt da IA, e testar com dados reais antes de confiar nele.",
  'm5-l4': "Multi-agentes é quando várias IAs especializadas trabalham juntas, cada uma com um papel — como um agente pesquisador, um redator, um revisor e um organizador.",
  'm6-l1': "O mercado de IA se divide em quem constrói modelos, quem aplica IA em produtos/processos, e quem usa IA como ferramenta em qualquer profissão já existente — este último é o caminho mais comum.",
  'm6-l2': "Um bom portfólio tem 3 ou 4 exemplos pequenos, bem documentados, mostrando o problema, a solução com IA, e o resultado obtido — com honestidade sobre como a IA foi usada.",
  'm6-l3': "O estudo de caso final pede que você aplique o conhecimento da trilha inteira em um problema real, estruturado em: contexto, abordagem, resultado e reflexão.",
  'm6-l4': "A avaliação final considera o conjunto das atividades práticas e o estudo de caso — não uma prova de decoreba. Com isso entregue, sua escola pode emitir seu certificado.",
};

function buildEvoiaIndex(){
  const index = [];
  COURSE.modules.forEach((m, mi)=>{
    m.lessons.forEach((l, li)=>{
      const key = `m${mi+1}-l${li+1}`;
      const text = (m.title + ' ' + l.title).toLowerCase();
      const words = text.replace(/[^\wà-ú\s]/g,' ').split(/\s+/).filter(w=>w.length>3);
      index.push({ key, moduleIdx:mi, lessonIdx:li, moduleTitle:m.title, lessonTitle:l.title, words: new Set(words), ready:l.ready });
    });
  });
  return index;
}
const EVOIA_INDEX = buildEvoiaIndex();

const EVOIA_FAQ = [
  { words:['apostila','pdf','imprimir','gráfica','baixar'], answer:'Você pode gerar a apostila completa em PDF direto na página do curso — é só clicar no botão "📘 Gerar apostila (PDF)". Ela sai pronta para imprimir em gráfica, com todos os módulos e aulas.' },
  { words:['canais','visual','auditivo','cinestésico','estilos','aprendizagem'], answer:'Toda aula da trilha é entregue em 3 canais: 👁 Visual (texto + infográfico), 🎧 Auditivo (narração + transcrição) e ✋ Cinestésico (atividade prática com checklist) — assim cada estudante aprende do jeito que funciona melhor para ele.' },
  { words:['certificado','certificação','concluir','terminar'], answer:'O certificado é emitido ao final do Módulo 6 (Trilha Profissional), depois que você completa o estudo de caso final e a avaliação. Fica no menu "Trilha Profissional & Certificação".' },
  { words:['módulos','quantos','estrutura','trilha'], answer:`A trilha "Inteligência Artificial: do Zero ao Profissional" tem ${COURSE.modules.length} módulos e ${COURSE.modules.reduce((a,m)=>a+m.lessons.length,0)} aulas ao todo, do nível Iniciante ao Profissional.` },
  { words:['senha','esqueci','login','entrar','acessar'], answer:'Se você esqueceu sua senha, use o link "Esqueci minha senha" na tela de login — é só informar sua escola e o e-mail cadastrado para receber as instruções de redefinição.' },
  { words:['escola','turma','professor','matrícula'], answer:'Cada escola tem acesso isolado à plataforma, sem visibilidade sobre dados de outras instituições. Cadastro de turmas e matrícula de estudantes chegam em uma próxima etapa, na área "Minhas Turmas".' },
  { words:['quem','você','evoia','assistente'], answer:'Eu sou o EVO IA, o assistente de estudos do HUB Tecnológico! Posso te ajudar a entender qualquer aula da trilha de Inteligência Artificial — pergunte sobre um tema específico ou peça para eu indicar por onde começar.' },
];


module.exports = { EVOIA_LESSON_ANSWERS, EVOIA_INDEX, EVOIA_FAQ };
