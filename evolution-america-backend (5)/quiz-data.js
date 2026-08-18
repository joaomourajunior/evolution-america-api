// quiz-data.js — avaliação de cada módulo (4 perguntas de múltipla escolha).
// O estudante precisa acertar pelo menos 70% para o módulo ser considerado
// concluído e o próximo módulo ser liberado.

const QUIZZES = {
  m1: {
    title: 'Avaliação — IA Explorer',
    passingScore: 70,
    questions: [
      {
        q: 'O que é, na prática, Inteligência Artificial?',
        options: [
          'Um robô com consciência própria, como nos filmes',
          'Um sistema que reconhece padrões em dados e usa isso para prever ou decidir algo',
          'Um programa que só funciona com internet muito rápida',
          'Uma pessoa controlando o computador remotamente',
        ],
        correct: 1,
      },
      {
        q: 'Quando você recebe uma sugestão de vídeo ou música, o que realmente aconteceu?',
        options: [
          'Alguém da empresa escolheu manualmente pra você',
          'Um sistema comparou seu comportamento com o de pessoas parecidas e apostou numa sugestão',
          'Foi sorteado aleatoriamente',
          'A IA "sentiu" que você gostaria daquilo',
        ],
        correct: 1,
      },
      {
        q: 'Qual das opções abaixo NÃO é uma boa prática ao conversar com uma IA?',
        options: [
          'Dar contexto claro sobre o que você precisa',
          'Pedir exemplos de formato quando necessário',
          'Aceitar qualquer resposta sem verificar se faz sentido',
          'Reformular a pergunta se a resposta não ajudou',
        ],
        correct: 2,
      },
      {
        q: 'Por que a IA "saiu dos laboratórios" nos últimos anos?',
        options: [
          'Porque ficou proibido usar em pesquisa',
          'Porque ficou mais barato guardar dados, os computadores ficaram mais rápidos e surgiram técnicas melhores de aprendizado',
          'Porque as pessoas pararam de usar computadores',
          'Não há relação, foi coincidência',
        ],
        correct: 1,
      },
    ],
  },
  m2: {
    title: 'Avaliação — IA Builder',
    passingScore: 70,
    questions: [
      {
        q: 'O que é um "prompt"?',
        options: [
          'Um erro do sistema',
          'A instrução ou pergunta que você dá para uma IA',
          'Um tipo de vírus de computador',
          'O nome do modelo de IA',
        ],
        correct: 1,
      },
      {
        q: 'O que ajuda uma IA a dar uma resposta melhor?',
        options: [
          'Perguntas vagas, sem contexto',
          'Contexto, exemplos e o formato de resposta esperado',
          'Perguntas muito curtas, de uma palavra só',
          'Nunca explicar o que você quer',
        ],
        correct: 1,
      },
      {
        q: 'Dados são importantes pra IA porque...',
        options: [
          'Não têm nenhuma importância real',
          'São a "matéria-prima" que a IA usa para reconhecer padrões',
          'Servem só pra ocupar espaço no computador',
          'São usados apenas em jogos eletrônicos',
        ],
        correct: 1,
      },
      {
        q: 'O que é automação, no contexto de IA?',
        options: [
          'Fazer uma tarefa repetitiva ser executada automaticamente por um sistema',
          'Desligar o computador sozinho',
          'Um tipo de vírus',
          'A mesma coisa que inteligência artificial',
        ],
        correct: 0,
      },
    ],
  },
  m3: {
    title: 'Avaliação — IA Creator',
    passingScore: 70,
    questions: [
      {
        q: 'O que é IA generativa?',
        options: [
          'Uma IA que só analisa números',
          'Uma IA capaz de criar conteúdo novo, como texto, imagem ou som',
          'Uma IA que apaga arquivos',
          'Um tipo de vírus de computador',
        ],
        correct: 1,
      },
      {
        q: 'Por que é importante verificar as informações que uma IA generativa fornece?',
        options: [
          'Não é importante, a IA nunca erra',
          'Porque a IA pode "alucinar" e apresentar informações erradas com confiança',
          'Porque toda informação de IA é proibida por lei',
          'Porque a internet é lenta',
        ],
        correct: 1,
      },
      {
        q: 'O que significa usar IA de forma ética?',
        options: [
          'Usar sem se preocupar com direitos autorais ou vieses',
          'Considerar vieses, direitos autorais e o impacto do que está sendo criado',
          'Nunca usar IA generativa',
          'Copiar qualquer resultado sem citar a fonte',
        ],
        correct: 1,
      },
      {
        q: 'Um bom uso de IA para estudar é:',
        options: [
          'Pedir pra IA fazer a prova inteira por você',
          'Usar IA para gerar resumos e mapas mentais que te ajudem a entender melhor o conteúdo',
          'Nunca revisar o que a IA gerou',
          'Evitar completamente usar IA em qualquer contexto educacional',
        ],
        correct: 1,
      },
    ],
  },
  m4: {
    title: 'Avaliação — IA Professional',
    passingScore: 70,
    questions: [
      {
        q: 'Como a IA pode ajudar na produtividade de uma equipe?',
        options: [
          'Substituindo completamente todos os funcionários',
          'Automatizando tarefas repetitivas e apoiando e-mails, planilhas e apresentações',
          'Não tem nenhuma aplicação prática no trabalho',
          'Apenas em empresas de tecnologia',
        ],
        correct: 1,
      },
      {
        q: 'O que é um chatbot de atendimento com IA?',
        options: [
          'Um funcionário disfarçado de robô',
          'Um assistente automatizado que ajuda a responder clientes',
          'Um vírus de computador',
          'Um tipo de e-mail marketing',
        ],
        correct: 1,
      },
      {
        q: 'Ao usar IA para gerar relatórios, é importante:',
        options: [
          'Aceitar qualquer número sem checar a fonte dos dados',
          'Revisar e validar as informações antes de usar em uma decisão importante',
          'Nunca usar IA para isso',
          'Deletar os dados originais depois',
        ],
        correct: 1,
      },
      {
        q: 'Qual é um bom uso profissional de IA para e-mails?',
        options: [
          'Pedir pra IA redigir a partir de tópicos e depois revisar o tom antes de enviar',
          'Enviar exatamente o que a IA escrever, sem ler',
          'Nunca usar IA para comunicação profissional',
          'Usar apenas para escrever emojis',
        ],
        correct: 0,
      },
    ],
  },
  m5: {
    title: 'Avaliação — IA Specialist',
    passingScore: 70,
    questions: [
      {
        q: 'O que é um agente de IA?',
        options: [
          'Um vendedor de software',
          'Um sistema que toma decisões e executa tarefas em várias etapas, de forma mais autônoma',
          'Um tipo de vírus',
          'A mesma coisa que um chatbot simples',
        ],
        correct: 1,
      },
      {
        q: 'O que significa "integrar" uma IA a outras ferramentas?',
        options: [
          'Conectar a IA a sistemas e automações para que ela consiga agir além de só responder texto',
          'Instalar a IA em um pendrive',
          'Desconectar a IA da internet',
          'Trocar a senha da IA regularmente',
        ],
        correct: 0,
      },
      {
        q: 'O que são "multi-agentes"?',
        options: [
          'Um único robô com vários braços',
          'Várias IAs trabalhando juntas, cada uma com uma função, para resolver algo mais complexo',
          'Um erro de sistema',
          'Um tipo de vírus de computador',
        ],
        correct: 1,
      },
      {
        q: 'Por que é importante avaliar tecnicamente diferentes soluções de IA antes de adotar uma?',
        options: [
          'Não é importante, todas são iguais',
          'Para escolher a que melhor atende critérios técnicos e de negócio do seu contexto',
          'Porque é obrigatório por lei em qualquer país',
          'Porque só existe uma opção no mercado',
        ],
        correct: 1,
      },
    ],
  },
  m6: {
    title: 'Avaliação — IA Master & Trainer',
    passingScore: 70,
    questions: [
      {
        q: 'O que é fundamental ao ensinar IA para outras pessoas?',
        options: [
          'Usar só termos técnicos difíceis para parecer mais especialista',
          'Ter uma boa didática, adaptando a linguagem ao público',
          'Nunca dar exemplos práticos',
          'Evitar qualquer atividade prática',
        ],
        correct: 1,
      },
      {
        q: 'O que é avaliação formativa?',
        options: [
          'Uma prova única no final do curso, sem feedback',
          'Um acompanhamento contínuo do aprendizado, com feedback ao longo do caminho',
          'Uma avaliação que não conta nota',
          'O mesmo que um certificado',
        ],
        correct: 1,
      },
      {
        q: 'Ao construir sua própria trilha de ensino, o que deve ser considerado?',
        options: [
          'Apenas a opinião do formador, sem pensar no público',
          'O público-alvo, os objetivos de aprendizagem e uma progressão lógica de conteúdo',
          'Não é necessário planejar nada',
          'Copiar exatamente o conteúdo de outro curso, sem adaptar',
        ],
        correct: 1,
      },
      {
        q: 'Qual é um bom indicador de que uma turma está pronta para se formar?',
        options: [
          'Todos compareceram nas aulas, independente do aprendizado',
          'Os estudantes demonstram domínio prático do conteúdo, avaliado de forma consistente',
          'O curso simplesmente chegou ao fim do calendário',
          'Ninguém reclamou durante as aulas',
        ],
        correct: 1,
      },
    ],
  },
};

module.exports = { QUIZZES };
