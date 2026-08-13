// course-data.js
// Fonte única de verdade do conteúdo pedagógico da Trilha de IA.
// syncCourseCatalog() em db.js lê este arquivo toda vez que o servidor sobe
// e atualiza título/nível/conteúdo dos módulos e aulas SEM apagar
// escola, usuário, turma ou progresso já existente.

function aula(id, titulo, resumo) {
  return {
    id,
    titulo,
    canais: {
      visual: `Conteúdo visual da aula "${titulo}": slides, infográficos e exemplos ilustrados sobre ${resumo}.`,
      auditivo: `Conteúdo auditivo da aula "${titulo}": explicação narrada e podcast curto sobre ${resumo}.`,
      cinestesico: `Conteúdo cinestésico da aula "${titulo}": atividade prática/mão-na-massa sobre ${resumo}.`,
    },
  };
}

const NIVEIS = [
  {
    id: 1,
    key: 'explorer',
    nome: 'IA Explorer',
    accessKey: 'EXPLORER-KEY',
    faixaSugerida: '7-10 anos',
    corInicio: '#2DD4BF',
    corFim: '#A3E635',
    descricao: 'Primeiros passos: o que é Inteligência Artificial, de forma lúdica.',
    aulas: [
      aula('explorer-1', 'O que é Inteligência Artificial?', 'a diferença entre humano e máquina "pensando"'),
      aula('explorer-2', 'Máquinas que aprendem', 'exemplos do dia a dia com IA'),
      aula('explorer-3', 'Conversando com um robô', 'primeiros comandos e perguntas para uma IA'),
      aula('explorer-4', 'Meu primeiro projeto com IA', 'projeto guiado simples e divertido'),
    ],
  },
  {
    id: 2,
    key: 'builder',
    nome: 'IA Builder',
    accessKey: 'BUILDER-KEY',
    faixaSugerida: '11-14 anos',
    corInicio: '#3B82F6',
    corFim: '#22D3EE',
    descricao: 'Construindo com IA: lógica, dados e primeiras automações.',
    aulas: [
      aula('builder-1', 'Como a IA enxerga dados', 'dados como matéria-prima da IA'),
      aula('builder-2', 'Lógica e algoritmos', 'pensamento passo a passo'),
      aula('builder-3', 'Automatizando tarefas simples', 'automação do cotidiano com IA'),
      aula('builder-4', 'Projeto: meu assistente pessoal', 'projeto guiado de automação'),
    ],
  },
  {
    id: 3,
    key: 'creator',
    nome: 'IA Creator',
    accessKey: 'CREATOR-KEY',
    faixaSugerida: '15-16 anos',
    corInicio: '#D946EF',
    corFim: '#F97316',
    descricao: 'Criação com IA generativa: texto, imagem e prompt design.',
    aulas: [
      aula('creator-1', 'IA generativa na prática', 'geração de texto e imagem'),
      aula('creator-2', 'Engenharia de prompt', 'como escrever bons prompts'),
      aula('creator-3', 'Criando conteúdo com IA', 'produção criativa assistida por IA'),
      aula('creator-4', 'Projeto: campanha criativa com IA', 'projeto guiado de criação'),
    ],
  },
  {
    id: 4,
    key: 'professional',
    nome: 'IA Professional',
    accessKey: 'PROFESSIONAL-KEY',
    faixaSugerida: '17+',
    corInicio: '#06313D',
    corFim: '#D4AF37',
    descricao: 'IA aplicada ao mercado de trabalho e produtividade profissional.',
    aulas: [
      aula('professional-1', 'IA no mundo do trabalho', 'casos reais de uso profissional'),
      aula('professional-2', 'Produtividade com IA', 'ferramentas de produtividade com IA'),
      aula('professional-3', 'Ética e uso responsável', 'limites, vieses e responsabilidade'),
      aula('professional-4', 'Projeto: solução para um problema real', 'projeto aplicado ao mercado'),
    ],
  },
  {
    id: 5,
    key: 'specialist',
    nome: 'IA Specialist',
    accessKey: 'SPECIALIST-KEY',
    faixaSugerida: 'Especialização',
    corInicio: '#6D28D9',
    corFim: '#4F46E5',
    descricao: 'Aprofundamento técnico: modelos, integrações e arquitetura de soluções com IA.',
    aulas: [
      aula('specialist-1', 'Como funcionam os modelos de IA', 'arquitetura por trás dos modelos'),
      aula('specialist-2', 'Integrando IA a sistemas', 'APIs e integrações'),
      aula('specialist-3', 'Avaliando e comparando soluções de IA', 'critérios técnicos de avaliação'),
      aula('specialist-4', 'Projeto: arquitetura de uma solução com IA', 'projeto técnico avançado'),
    ],
  },
  {
    id: 6,
    key: 'master',
    nome: 'IA Master & Trainer',
    accessKey: 'MASTER-KEY',
    faixaSugerida: 'Formação de formadores',
    corInicio: '#1C1917',
    corFim: '#D4AF37',
    descricao: 'Formação de formadores: como ensinar IA para outras pessoas.',
    aulas: [
      aula('master-1', 'Metodologia para ensinar IA', 'didática aplicada a IA'),
      aula('master-2', 'Construindo sua própria trilha', 'como desenhar conteúdo pedagógico'),
      aula('master-3', 'Avaliando o aprendizado dos estudantes', 'avaliação formativa'),
      aula('master-4', 'Projeto: sua primeira turma', 'projeto final de formação de formadores'),
    ],
  },
];

const COURSE = {
  id: 'trilha-ia',
  titulo: 'Trilha de Inteligência Artificial — Evolution América',
  niveis: NIVEIS,
};

module.exports = { COURSE, NIVEIS };
