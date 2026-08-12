
/**
 * course-data.js
 * Conteúdo real da trilha "Inteligência Artificial: do Zero ao Profissional" —
 * extraído do protótipo frontend (index.html) para ser a fonte única usada no
 * seed do banco de dados. Se o conteúdo das aulas for atualizado no frontend,
 * regenere este arquivo a partir do <script> do index.html.
 */

/* ======================= DADOS ======================= */
const COURSE = {
  id: "ia-zero-ao-profissional",
  title: "Inteligência Artificial: do Zero ao Profissional",
  desc: "Uma trilha completa para sair do primeiro contato com Inteligência Artificial até aplicar IA de forma profissional — em três canais de aprendizagem em cada aula: visual, auditivo e cinestésico.",
  modules: [
    {
      id:"m1", title:"Fundamentos da IA", level:"iniciante", levelLabel:"Iniciante",
      desc:"O que é (de verdade) inteligência artificial, e as ideias que sustentam tudo o que vem depois.",
      lessons:[
        {title:"O que é Inteligência Artificial (e o que não é)", duration:"14 min", ready:true},
        {title:"Como as máquinas \"aprendem\": introdução ao Machine Learning", duration:"16 min", ready:true},
        {title:"Dados, algoritmos e modelos: as peças do quebra-cabeça", duration:"13 min", ready:true},
        {title:"IA generativa: o que são modelos como o ChatGPT e o Gemini", duration:"15 min", ready:true},
      ]
    },
    {
      id:"m2", title:"Conversando com uma IA", level:"iniciante", levelLabel:"Iniciante",
      desc:"Os primeiros passos práticos: criar conta, explorar a interface e aprender a se comunicar bem com uma IA.",
      lessons:[
        {title:"Primeiros passos: criando sua conta e explorando a interface", duration:"11 min", ready:true},
        {title:"A arte do prompt: como pedir exatamente o que você precisa", duration:"17 min", ready:true},
        {title:"Técnicas essenciais de prompt: contexto, exemplos e formato", duration:"18 min", ready:true},
        {title:"Erros comuns e como evitar respostas ruins da IA", duration:"12 min", ready:true},
      ]
    },
    {
      id:"m3", title:"IA no Dia a Dia", level:"intermediario", levelLabel:"Intermediário",
      desc:"Aplicações práticas para estudar, criar e verificar informações — com responsabilidade.",
      lessons:[
        {title:"IA para estudar: resumos, mapas mentais e revisão de conteúdo", duration:"15 min", ready:true},
        {title:"IA para criar: imagens, textos e apresentações", duration:"16 min", ready:true},
        {title:"IA e ética: vieses, direitos autorais e uso responsável", duration:"19 min", ready:true},
        {title:"Verificando informações: como não cair em alucinações da IA", duration:"14 min", ready:true},
      ]
    },
    {
      id:"m4", title:"IA para Produtividade e Negócios", level:"intermediario", levelLabel:"Intermediário",
      desc:"Da tarefa repetitiva ao atendimento ao cliente: como a IA multiplica o trabalho de uma equipe.",
      lessons:[
        {title:"Automatizando tarefas repetitivas do dia a dia", duration:"15 min", ready:true},
        {title:"IA para e-mails, planilhas e apresentações profissionais", duration:"17 min", ready:true},
        {title:"Atendimento ao cliente com IA: chatbots e assistentes", duration:"16 min", ready:true},
        {title:"Análise de dados e relatórios com apoio de IA", duration:"18 min", ready:true},
      ]
    },
    {
      id:"m5", title:"Automações e Agentes de IA", level:"avancado", levelLabel:"Avançado",
      desc:"Como sistemas de IA passam a agir sozinhos — tomando decisões e executando tarefas em várias etapas.",
      lessons:[
        {title:"O que são agentes de IA e como eles tomam decisões", duration:"18 min", ready:true},
        {title:"Conectando IA a outras ferramentas: integrações e automações", duration:"20 min", ready:true},
        {title:"Construindo seu primeiro fluxo automatizado", duration:"22 min", ready:true},
        {title:"Multi-agentes: quando várias IAs trabalham juntas", duration:"19 min", ready:true},
      ]
    },
    {
      id:"m6", title:"Trilha Profissional & Certificação", level:"profissional", levelLabel:"Profissional",
      desc:"Carreira, portfólio e um estudo de caso final — o fechamento da trilha rumo à certificação.",
      lessons:[
        {title:"Carreiras em IA: que profissões esse mercado está criando", duration:"14 min", ready:true},
        {title:"Montando um portfólio de projetos com IA", duration:"17 min", ready:true},
        {title:"Estudo de caso final: resolvendo um problema real com IA", duration:"25 min", ready:true},
        {title:"Avaliação final e emissão do certificado", duration:"20 min", ready:true},
      ]
    },
  ]
};

const SCHOOLS = {
  "colegio-atlas": "Colégio Atlas",
  "instituto-nova-era": "Instituto Nova Era",
};

/* conteúdo completo das aulas, por chave "m{módulo}-l{aula}" */
const LESSON_CONTENT = {};

LESSON_CONTENT['m1-l1'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Toda vez que o Netflix sugere uma série, ou que seu celular reconhece seu rosto para desbloquear a tela, alguém diz a mesma frase: <strong>"isso é inteligência artificial"</strong>. Mas o que isso realmente significa?</p>
        <p>De forma direta: <strong>Inteligência Artificial (IA)</strong> é a capacidade de um sistema computacional realizar tarefas que, até pouco tempo, exigiam raciocínio humano — reconhecer um rosto, entender uma frase, sugerir um filme, dirigir um carro. A IA não "pensa" como um ser humano. Ela identifica <strong>padrões</strong> em uma quantidade enorme de dados e usa esses padrões para prever ou decidir algo.</p>
        <h3>O que a IA NÃO é</h3>
        <p>É comum a IA ser confundida com robôs conscientes de filmes de ficção científica. Isso ainda não existe. A IA que usamos hoje não tem vontade própria, não sente emoções e não "entende" o mundo como uma pessoa — ela reconhece padrões estatísticos em dados e responde com base neles.</p>
        <div class="callout">💡 <strong>Pense assim:</strong> uma IA que sugere músicas não "gosta" de música. Ela percebeu que pessoas parecidas com você, em situações parecidas, costumavam ouvir aquela faixa — e aposta que você também vai gostar.</div>
        <h3>Por que isso importa agora</h3>
        <p>Nos últimos anos, três coisas aconteceram ao mesmo tempo: ficou muito mais barato guardar dados, os computadores ficaram muito mais rápidos, e os pesquisadores descobriram formas melhores de ensinar máquinas a reconhecer padrões. Esse encontro é o motivo pelo qual a IA saiu dos laboratórios de pesquisa e chegou no seu bolso.</p>
      </div>
      <div class="infographic">
        <h4>Linha do tempo — 3 marcos da IA</h4>
        <div class="timeline">
          <div class="tl-item">
            <b>1950</b>
            <div class="tl-title">O Teste de Turing</div>
            <div class="tl-desc">Alan Turing propõe uma pergunta simples e poderosa: como saberíamos se uma máquina "pensa"? A ideia nasce décadas antes da tecnologia para realizá-la existir.</div>
          </div>
          <div class="tl-item">
            <b>2012</b>
            <div class="tl-title">O salto do Deep Learning</div>
            <div class="tl-desc">Um sistema chamado AlexNet passa a reconhecer imagens com uma precisão nunca vista, provando que redes neurais profundas funcionam na prática — não só na teoria.</div>
          </div>
          <div class="tl-item">
            <b>2022</b>
            <div class="tl-title">A IA generativa vira mainstream</div>
            <div class="tl-desc">Ferramentas capazes de escrever, conversar e criar imagens chegam ao público em geral. Pela primeira vez, qualquer pessoa pode "conversar" com uma IA.</div>
          </div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top">
        <button class="play-btn" onclick="toggleAudio(this)">▶</button>
        <div class="audio-meta">
          <b>Narração — O que é Inteligência Artificial</b>
          <span>Aula 1 · Módulo 1 · 14 min</span>
        </div>
      </div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>14:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Oi! Antes de qualquer coisa, respira fundo — porque essa aula vai desmontar um mito. Você não precisa saber programar, nem ter formação em matemática avançada, pra entender o que é Inteligência Artificial de verdade.</p>
      <p><span class="cue">00:42</span>Pensa em três coisas que você fez hoje que envolveram IA sem você perceber: talvez o corretor do teclado do celular, talvez uma sugestão de vídeo, talvez até o caminho que o aplicativo de mapa escolheu pra você. Em todos esses casos, tem um sistema tentando prever a próxima ação mais provável, com base em padrões que ele já viu antes.</p>
      <p><span class="cue">03:10</span>É isso, basicamente: reconhecimento de padrão em escala gigante. Não tem mistério, não tem consciência, não tem uma "mente" ali dentro. E entender isso já tira metade do medo que muita gente carrega sobre o assunto.</p>
      <p><span class="cue">06:20</span>Agora, por que isso virou assunto justamente agora, e não há vinte anos? Três coisas aconteceram ao mesmo tempo: ficou barato guardar dado, ficou rápido processar dado, e a gente descobriu técnicas melhores pra ensinar computador a aprender com dado. Quando essas três curvas se encontraram, a IA saiu do laboratório e entrou no seu bolso.</p>
      <p><span class="cue">10:05</span>Guarda essa ideia com você pro resto da trilha: toda vez que alguém falar "a IA decidiu" ou "a IA pensou", troque mentalmente por "o sistema reconheceu um padrão e escolheu a resposta mais provável". Isso vai te ajudar a entender — e também a desconfiar na hora certa.</p>
      <p><span class="cue">12:50</span>Na próxima aula, a gente abre o capô e entende como, exatamente, uma máquina "aprende" um padrão. Te vejo lá.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 10 min</div>
      <h3>Caça à IA invisível</h3>
      <p>Antes de aprender a teoria a fundo, vamos provar que a IA já faz parte do seu dia — mesmo quando você não percebe. Marque cada etapa conforme for concluindo.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Abra um app que você usa todo dia (rede social, streaming, mapa ou e-mail) e identifique uma sugestão feita para você especificamente.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Pergunte-se: essa sugestão veio de alguém "pensando em você", ou de um padrão estatístico calculado a partir do seu comportamento?</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Anote, em papel ou no celular, 3 exemplos de IA que você usou hoje sem perceber.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha, entre os 3 exemplos, o que mais te surpreendeu — e escreva em uma frase por quê.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Compartilhe essa frase com um colega ou familiar antes da próxima aula.</span></div>
      </div>
      <div class="activity-progress">
        <div class="bar"><i id="activity-bar" style="width:0%"></i></div>
        <span id="activity-count">0 / 5 concluídas</span>
      </div>
    </div>
  `
};

LESSON_CONTENT['m1-l2'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Na aula passada vimos que IA é, no fundo, reconhecimento de padrão. Agora vem a pergunta natural: <strong>como, exatamente, uma máquina "aprende" um padrão?</strong> É isso que o termo <strong>Machine Learning</strong> (Aprendizado de Máquina) descreve.</p>
        <h3>A diferença entre programar e treinar</h3>
        <p>Um programa tradicional segue regras escritas por um humano: "se a temperatura passar de 30°C, ligue o ar-condicionado". Já um sistema de Machine Learning não recebe a regra pronta — ele recebe <strong>muitos exemplos</strong> e descobre a regra sozinho, ajustando-se até acertar a maior parte das vezes.</p>
        <p>É como ensinar uma criança a reconhecer cachorros: você não descreve matematicamente "quatro patas, pelo, focinho comprido". Você mostra várias fotos de cachorros e diz "isso é cachorro". Depois de ver o suficiente, a criança generaliza sozinha — e reconhece um cachorro que nunca viu antes.</p>
        <h3>Os 3 estilos mais comuns de aprendizado</h3>
        <p><strong>Aprendizado supervisionado:</strong> o sistema aprende a partir de exemplos já rotulados (foto → "gato" ou "cachorro"). É o mais comum em aplicações do dia a dia.</p>
        <p><strong>Aprendizado não supervisionado:</strong> o sistema recebe dados sem rótulo e tenta encontrar agrupamentos e padrões escondidos sozinho — por exemplo, separar clientes em perfis de consumo parecidos.</p>
        <p><strong>Aprendizado por reforço:</strong> o sistema aprende por tentativa e erro, recebendo uma "recompensa" quando acerta — é assim que IAs aprendem a jogar jogos ou controlar robôs.</p>
        <div class="callout">💡 <strong>Ponto-chave:</strong> quanto mais exemplos de qualidade um sistema recebe, melhor ele generaliza. Dado ruim ou insuficiente gera um modelo que "aprendeu errado" — e isso volta como tema em aulas mais à frente.</div>
      </div>
      <div class="infographic">
        <h4>Como o treinamento funciona, em 4 passos</h4>
        <div class="timeline">
          <div class="tl-item"><b>1</b><div class="tl-title">Coletar dados</div><div class="tl-desc">Milhares (ou milhões) de exemplos são reunidos — fotos, textos, números, o que for relevante para a tarefa.</div></div>
          <div class="tl-item"><b>2</b><div class="tl-title">Treinar o modelo</div><div class="tl-desc">O sistema testa previsões, erra, ajusta seus parâmetros internos, e repete esse ciclo milhões de vezes até melhorar.</div></div>
          <div class="tl-item"><b>3</b><div class="tl-title">Validar</div><div class="tl-desc">O modelo é testado com dados que ele nunca viu, para checar se realmente aprendeu — e não apenas "decorou" os exemplos.</div></div>
          <div class="tl-item"><b>4</b><div class="tl-title">Usar</div><div class="tl-desc">Uma vez aprovado, o modelo passa a fazer previsões reais — recomendar, classificar, gerar, decidir.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top">
        <button class="play-btn" onclick="toggleAudio(this)">▶</button>
        <div class="audio-meta"><b>Narração — Como as máquinas aprendem</b><span>Aula 2 · Módulo 1 · 16 min</span></div>
      </div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>16:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Se na aula passada a gente tirou o mistério do "o que é IA", agora vamos abrir o capô e ver como, na prática, uma máquina aprende alguma coisa.</p>
      <p><span class="cue">01:15</span>Esquece a ideia de programar regra por regra. Aprendizado de máquina é mais parecido com ensinar por exemplo. Você mostra muitos casos, e o sistema vai ajustando um "palpite interno" até esse palpite ficar bom o suficiente.</p>
      <p><span class="cue">04:30</span>Existem três jeitos principais de fazer isso acontecer. O supervisionado, quando você já entrega a resposta certa junto com o exemplo. O não supervisionado, quando você só entrega os dados e deixa o sistema achar agrupamentos sozinho. E o por reforço, quando o sistema aprende testando, errando e sendo recompensado quando acerta — tipo treinar um cachorrinho, só que com números.</p>
      <p><span class="cue">09:40</span>E tem uma coisa que eu quero que você guarde: a qualidade do exemplo importa mais do que a quantidade de código. Um sistema treinado com dado ruim aprende errado — com muita confiança. Isso vai aparecer de novo quando a gente falar de vieses, lá na frente.</p>
      <p><span class="cue">13:50</span>Na próxima aula, a gente destrincha as peças que compõem esse processo todo: dado, algoritmo e modelo. Até já.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 12 min</div>
      <h3>Treine você mesmo um "modelo humano"</h3>
      <p>Nesta atividade, você vai simular, em papel, o que uma IA faz ao treinar — para sentir na prática o que significa "aprender por exemplo".</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha uma categoria simples (ex: "frutas doces" vs "frutas azedas") e liste 5 exemplos de cada, sem explicar a regra.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça para alguém (sem contar a regra) tentar adivinhar em qual grupo entraria uma 6ª fruta, só olhando seus exemplos.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Compare o palpite da pessoa com a regra real — isso é, na prática, "validar o modelo".</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Repita com um exemplo ambíguo de propósito, e observe como o palpite fica menos confiável.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Anote, em uma frase, uma situação real da sua escola/trabalho em que "aprender por exemplo" poderia ser útil.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 5 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m1-l3'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Toda vez que você ouve alguém falar sobre IA, três palavras aparecem quase sempre juntas: <strong>dados, algoritmos e modelos</strong>. Elas são as três peças que, encaixadas, formam qualquer sistema de Inteligência Artificial.</p>
        <h3>Dados: a matéria-prima</h3>
        <p>Dados são qualquer informação que o sistema usa para aprender: fotos, textos, números, cliques, áudios. Sem dados, não existe aprendizado — é como pedir para alguém aprender a cozinhar sem nunca ter visto um ingrediente.</p>
        <h3>Algoritmo: a receita de aprendizado</h3>
        <p>O algoritmo é o método matemático que decide <em>como</em> o sistema vai ajustar seus palpites a partir dos dados. Existem dezenas de algoritmos diferentes, cada um mais adequado para um tipo de problema — alguns são ótimos para prever números, outros para reconhecer imagens, outros para gerar texto.</p>
        <h3>Modelo: o resultado do treinamento</h3>
        <p>O modelo é o que "sobra" depois que o algoritmo processou os dados: um conjunto de parâmetros ajustados, pronto para fazer previsões sobre coisas novas. Quando você usa o ChatGPT ou o Gemini, você está conversando com um <strong>modelo já treinado</strong> — o trabalho pesado de aprendizado já aconteceu antes, nos bastidores.</p>
        <div class="callout">💡 <strong>Analogia:</strong> se IA fosse uma cozinha, os dados são os ingredientes, o algoritmo é a técnica de preparo, e o modelo é o prato pronto — que agora pode ser servido (usado) repetidas vezes.</div>
      </div>
      <div class="infographic">
        <h4>As 3 peças, lado a lado</h4>
        <div class="timeline">
          <div class="tl-item"><b>①</b><div class="tl-title">Dados</div><div class="tl-desc">Exemplos brutos: imagens, textos, números, interações — a matéria-prima de qualquer sistema de IA.</div></div>
          <div class="tl-item"><b>②</b><div class="tl-title">Algoritmo</div><div class="tl-desc">O método que transforma dados em aprendizado, ajustando parâmetros até o sistema acertar mais.</div></div>
          <div class="tl-item"><b>③</b><div class="tl-title">Modelo</div><div class="tl-desc">O resultado final: pronto para prever, classificar ou gerar algo novo a partir do que aprendeu.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top">
        <button class="play-btn" onclick="toggleAudio(this)">▶</button>
        <div class="audio-meta"><b>Narração — Dados, algoritmos e modelos</b><span>Aula 3 · Módulo 1 · 13 min</span></div>
      </div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>13:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Três palavras que você vai ouvir o tempo inteiro no mundo da IA: dado, algoritmo e modelo. Elas parecem técnicas, mas a ideia por trás é bem simples.</p>
      <p><span class="cue">01:40</span>Pensa numa cozinha. O dado é o ingrediente cru. O algoritmo é a técnica de preparo — a receita que diz como transformar aquele ingrediente em outra coisa. E o modelo é o prato pronto, que já pode ser servido várias vezes depois de feito uma vez.</p>
      <p><span class="cue">05:20</span>Isso explica uma coisa importante: quando você conversa com uma ferramenta de IA generativa, você não está treinando nada na hora. Você está usando um modelo que já foi treinado antes, em um processo que levou semanas ou meses, com uma quantidade gigantesca de dado.</p>
      <p><span class="cue">08:45</span>E por que isso importa pra você? Porque entender essa separação ajuda a entender também as limitações: um modelo só é tão bom quanto o dado que ele viu, e só sabe fazer aquilo que o algoritmo foi desenhado pra fazer. Ele não improvisa fora desse escopo — só parece que sim.</p>
      <p><span class="cue">11:30</span>Na próxima aula, a gente chega enfim na parte que você provavelmente já está curioso: os modelos generativos, tipo ChatGPT e Gemini. Até lá.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 10 min</div>
      <h3>Monte sua "receita de IA"</h3>
      <p>Vamos aplicar a analogia dado → algoritmo → modelo em um exemplo real que você escolher.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha um app de IA que você usa (streaming, rede social, mapa, etc).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Liste que tipo de "dado" esse app provavelmente usa sobre você para funcionar.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Imagine (sem precisar saber o nome técnico) que tipo de "regra" o algoritmo poderia estar aplicando nesse dado.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Descreva em uma frase qual seria o "modelo pronto" — ou seja, o que o app te entrega no final.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m1-l4'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Chegou a hora de falar sobre o tipo de IA que ficou famoso nos últimos anos: a <strong>IA generativa</strong> — a tecnologia por trás de ferramentas como ChatGPT, Gemini e Claude.</p>
        <h3>O que torna ela "generativa"</h3>
        <p>Diferente de uma IA que apenas classifica ou prevê (é gato ou cachorro? vai chover ou não?), uma IA generativa <strong>cria algo novo</strong>: um texto, uma imagem, um trecho de código, uma resposta inteira — construída palavra por palavra, ou pixel por pixel, com base em tudo o que aprendeu durante o treinamento.</p>
        <h3>Como ela "escolhe" a próxima palavra</h3>
        <p>Um modelo de linguagem generativo funciona prevendo, repetidamente, qual é a palavra (ou pedaço de palavra) mais provável de vir a seguir, dado tudo que já foi escrito até ali. Ele faz isso centenas de vezes por segundo, formando frases coerentes uma peça de cada vez — sem "saber" de antemão qual vai ser o final da frase.</p>
        <div class="callout">💡 <strong>Isso explica as alucinações:</strong> como o modelo está sempre prevendo "o que soa mais provável", às vezes ele produz uma informação que parece certa, mas é inventada. Vamos aprofundar isso em uma aula futura sobre verificação de informação.</div>
        <h3>Por que isso é diferente de tudo antes</h3>
        <p>Pela primeira vez, qualquer pessoa pode simplesmente <strong>conversar</strong> com um sistema de IA usando linguagem natural — sem programar nada. Essa é a mudança que tirou a IA dos laboratórios e colocou nas mãos de estudantes, professores e empresas de qualquer tamanho.</p>
      </div>
      <div class="infographic">
        <h4>O que a IA generativa consegue criar</h4>
        <div class="timeline">
          <div class="tl-item"><b>✍</b><div class="tl-title">Texto</div><div class="tl-desc">Redações, resumos, e-mails, roteiros, respostas a perguntas — como esta própria apostila que você pode gerar em PDF.</div></div>
          <div class="tl-item"><b>🖼</b><div class="tl-title">Imagem</div><div class="tl-desc">Ilustrações, fotos realistas e artes a partir de uma simples descrição em palavras.</div></div>
          <div class="tl-item"><b>💻</b><div class="tl-title">Código</div><div class="tl-desc">Trechos de programação, sites e até aplicativos inteiros, escritos a partir de instruções em linguagem natural.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top">
        <button class="play-btn" onclick="toggleAudio(this)">▶</button>
        <div class="audio-meta"><b>Narração — IA generativa</b><span>Aula 4 · Módulo 1 · 15 min</span></div>
      </div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>15:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Chegamos na parte que provavelmente te trouxe até essa trilha: a IA generativa. O tipo de sistema que escreve, desenha e conversa com você.</p>
      <p><span class="cue">02:10</span>A diferença dela pra tudo que vimos até agora é simples de entender: em vez de só classificar ou prever um número, ela cria algo novo. Um texto inteiro, uma imagem, um trecho de código.</p>
      <p><span class="cue">05:30</span>E o "truque" por trás disso, no caso de texto, é prever a próxima palavra mais provável, repetidamente, até formar uma frase inteira. O modelo não planeja a resposta toda de uma vez — ele constrói peça por peça, em uma velocidade que engana o olho humano.</p>
      <p><span class="cue">09:15</span>Isso explica também por que, às vezes, essas ferramentas erram com muita confiança — o que a gente chama de alucinação. Elas não estão mentindo de propósito; estão prevendo o que soa mais provável, e às vezes isso não bate com a realidade. A gente aprofunda esse ponto mais pra frente na trilha, com ferramentas pra você verificar informação.</p>
      <p><span class="cue">12:40</span>Fecha os olhos um segundo e pensa: há poucos anos, isso era coisa de filme. Hoje, é uma aba aberta no seu navegador. Módulo 1 concluído — no próximo módulo, a gente coloca a mão na massa e começa a conversar de verdade com uma IA.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 12 min</div>
      <h3>Observando a IA generativa "pensar"</h3>
      <p>Se você tiver acesso a alguma ferramenta de IA generativa (ChatGPT, Gemini, Claude ou similar), esta atividade mostra na prática como ela constrói uma resposta.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Faça uma pergunta simples a uma ferramenta de IA generativa e observe se o texto aparece de uma vez ou "sendo digitado" aos poucos.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça a mesma pergunta duas vezes seguidas e compare: a resposta veio idêntica ou levemente diferente?</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça um dado bem específico (uma data, um número, uma citação) e depois verifique se ele está correto em outra fonte.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escreva, em uma frase, o que essa experiência te ensinou sobre confiar (ou desconfiar) de respostas geradas por IA.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m2-l1'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Chegou a hora de sair da teoria e abrir, de verdade, uma ferramenta de IA generativa. Esta aula assume que você vai usar uma como ChatGPT, Gemini ou Claude — o passo a passo funciona de forma parecida em qualquer uma delas.</p>
        <h3>Criando sua conta</h3>
        <p>A maioria dessas ferramentas pede apenas um e-mail (ou login com Google) para começar. Não é necessário cartão de crédito para usar as versões gratuitas — desconfie de qualquer site que peça pagamento imediato para "criar conta básica".</p>
        <h3>Conhecendo a interface</h3>
        <p>Apesar de visuais diferentes, praticamente todas seguem a mesma lógica: uma <strong>caixa de texto</strong> na parte de baixo, onde você escreve o que precisa, e um <strong>histórico de conversa</strong> acima, mostrando perguntas e respostas anteriores. Cada troca de mensagens costuma ficar salva em uma "conversa", que você pode retomar depois.</p>
        <div class="callout">💡 <strong>Dica de segurança:</strong> nunca cole senhas, dados bancários ou informações sigilosas de terceiros na caixa de conversa. Trate como se estivesse escrevendo em um documento que pode ser lido por outras pessoas.</div>
        <h3>O que esperar da primeira conversa</h3>
        <p>Não existe forma "errada" de começar. Escreva como se estivesse mandando mensagem para uma pessoa que sabe muito, mas não conhece o seu contexto — e vá ajustando a partir das respostas. Nas próximas duas aulas, você vai aprender a fazer isso de um jeito muito mais eficiente.</p>
      </div>
      <div class="infographic">
        <h4>Anatomia da tela de uma IA de conversa</h4>
        <div class="timeline">
          <div class="tl-item"><b>①</b><div class="tl-title">Caixa de mensagem</div><div class="tl-desc">Onde você digita sua pergunta ou pedido — geralmente na parte de baixo da tela.</div></div>
          <div class="tl-item"><b>②</b><div class="tl-title">Histórico da conversa</div><div class="tl-desc">Mostra tudo que já foi perguntado e respondido nessa sessão específica.</div></div>
          <div class="tl-item"><b>③</b><div class="tl-title">Lista de conversas</div><div class="tl-desc">Geralmente numa barra lateral, guarda conversas anteriores para você retomar depois.</div></div>
          <div class="tl-item"><b>④</b><div class="tl-title">Configurações / modelo</div><div class="tl-desc">Opções para trocar o "motor" da IA, ajustar preferências ou anexar arquivos.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Primeiros passos</b><span>Aula 1 · Módulo 2 · 11 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>11:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Módulo novo, mão na massa de verdade. Se você ainda não abriu nenhuma ferramenta de IA generativa, essa é a aula pra fazer isso agora, com calma.</p>
      <p><span class="cue">01:20</span>Criar conta costuma ser rápido: e-mail, ou login com uma conta que você já tem, e pronto. As versões gratuitas não pedem cartão — se pedirem, desconfie.</p>
      <p><span class="cue">03:40</span>Quando a tela abrir, procure duas coisas: uma caixa de texto embaixo, pra você escrever, e um histórico das conversas, geralmente numa lateral. É basicamente essa a estrutura em qualquer uma dessas ferramentas.</p>
      <p><span class="cue">06:15</span>Um lembrete importante antes de começar a testar: nunca cole senha, dado bancário ou informação sigilosa de outra pessoa ali dentro. Trate a caixa de conversa como um documento que pode ser lido.</p>
      <p><span class="cue">08:30</span>Não existe um jeito "errado" de começar a conversar. Escreva como se estivesse falando com alguém que sabe muito, mas não te conhece ainda. Nas próximas duas aulas, a gente refina isso — e você vai sentir a diferença.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 10 min</div>
      <h3>Sua primeira exploração guiada</h3>
      <p>Se possível, abra uma ferramenta de IA generativa agora e siga os passos abaixo.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Crie uma conta (ou entre em uma existente) em uma ferramenta de IA generativa.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Localize a caixa de mensagem e o histórico de conversas na tela.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Envie uma primeira mensagem simples: "Explique o que você consegue fazer por mim, em 3 frases."</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Renomeie essa conversa (se a ferramenta permitir) com um nome que descreva o assunto.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m2-l2'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Existe uma diferença enorme entre perguntar "me ajuda com meu trabalho" e perguntar "escreva um resumo de 5 linhas sobre a Revolução Industrial, para alunos do 8º ano, em linguagem simples". A segunda frase é um <strong>prompt bem construído</strong> — e é isso que separa respostas medianas de respostas excelentes.</p>
        <h3>O que é um prompt</h3>
        <p>Prompt é simplesmente a instrução que você dá para a IA. Como ela não lê pensamento, quanto mais clara e específica a instrução, melhor (e mais previsível) é o resultado.</p>
        <h3>A fórmula básica de um bom prompt</h3>
        <p><strong>Tarefa</strong> (o que você quer) + <strong>Contexto</strong> (para quem, com que finalidade) + <strong>Formato</strong> (tamanho, estilo, estrutura desejada).</p>
        <div class="callout">💡 <strong>Exemplo fraco:</strong> "fala sobre fotossíntese".<br><strong>Exemplo forte:</strong> "Explique fotossíntese para uma criança de 10 anos, em até 4 frases, usando uma analogia com cozinha."</div>
        <h3>Pense em camadas, não em uma frase só</h3>
        <p>Você não precisa acertar tudo na primeira mensagem. Pode começar simples e ir refinando: "deixe mais curto", "troque o exemplo", "escreva de novo em tom mais formal". A conversa é iterativa — cada mensagem nova ajusta o resultado anterior.</p>
      </div>
      <div class="infographic">
        <h4>Fórmula do prompt eficaz</h4>
        <div class="timeline">
          <div class="tl-item"><b>1</b><div class="tl-title">Tarefa</div><div class="tl-desc">O verbo de ação: resuma, liste, compare, escreva, corrija, explique.</div></div>
          <div class="tl-item"><b>2</b><div class="tl-title">Contexto</div><div class="tl-desc">Para quem é, com qual objetivo, em qual situação será usado.</div></div>
          <div class="tl-item"><b>3</b><div class="tl-title">Formato</div><div class="tl-desc">Tamanho, tom de voz, estrutura (lista, parágrafo, tabela) esperados.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — A arte do prompt</b><span>Aula 2 · Módulo 2 · 17 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>17:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Essa aula pode ser a que mais muda a qualidade do que você recebe de uma IA daqui pra frente. O nome técnico é "prompt", mas é simplesmente o pedido que você faz.</p>
      <p><span class="cue">02:00</span>Repara na diferença entre "me ajuda com meu trabalho" e um pedido específico, com objetivo, público e formato definidos. A IA não lê pensamento — ela só tem acesso ao que você escreveu.</p>
      <p><span class="cue">05:30</span>Uma fórmula simples que funciona quase sempre: tarefa, mais contexto, mais formato. O que você quer, pra quem é, e como deve vir estruturado.</p>
      <p><span class="cue">09:45</span>E não se cobre acertar tudo de primeira. Trate como uma conversa: peça, veja o resultado, e refine — "deixe mais curto", "troque esse exemplo", "fica mais informal". A cada mensagem, você guia o resultado um pouco mais perto do que precisa.</p>
      <p><span class="cue">14:10</span>Na próxima aula, a gente vai além da fórmula básica e entra em técnicas mais avançadas de prompt — coisas que profissionais usam todos os dias.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 14 min</div>
      <h3>Reescreva um pedido fraco</h3>
      <p>Vamos treinar a fórmula tarefa + contexto + formato, transformando pedidos vagos em prompts eficazes.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escreva um pedido vago que você faria normalmente a uma IA (ex: "me ajuda com uma apresentação").</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Reescreva esse mesmo pedido adicionando a tarefa específica, o contexto e o formato desejado.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Se possível, teste as duas versões em uma ferramenta de IA e compare os resultados.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Anote qual das duas respostas exigiu menos ajustes depois.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m2-l3'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Com a fórmula básica dominada, é hora de subir de nível com três técnicas que profissionais usam para conseguir respostas consistentemente melhores.</p>
        <h3>1. Dar contexto extra (papel/persona)</h3>
        <p>Pedir para a IA "assumir um papel" ajuda a calibrar o tom e o nível técnico da resposta: <em>"Aja como um professor de ensino médio explicando isso para quem nunca ouviu falar do assunto."</em></p>
        <h3>2. Fornecer exemplos (few-shot)</h3>
        <p>Mostrar um exemplo do resultado que você quer é uma das técnicas mais poderosas que existem. Em vez de descrever o estilo, mostre: <em>"Escreva no mesmo estilo deste exemplo: [cole um exemplo aqui]."</em></p>
        <h3>3. Pedir o formato explicitamente</h3>
        <p>Se você precisa de uma tabela, uma lista numerada, tópicos com marcadores ou um texto corrido, <strong>peça isso diretamente</strong>. IAs seguem instruções de formato com bastante precisão quando pedidas com clareza.</p>
        <div class="callout">💡 <strong>Combine as três:</strong> "Aja como um redator de marketing. Escreva 3 opções de manchete no mesmo estilo deste exemplo: [exemplo]. Entregue em uma lista numerada." — Isso é um prompt de nível profissional.</div>
      </div>
      <div class="infographic">
        <h4>3 técnicas avançadas</h4>
        <div class="timeline">
          <div class="tl-item"><b>🎭</b><div class="tl-title">Persona</div><div class="tl-desc">Definir "quem" está respondendo calibra tom, vocabulário e profundidade.</div></div>
          <div class="tl-item"><b>📎</b><div class="tl-title">Exemplo (few-shot)</div><div class="tl-desc">Mostrar um modelo do resultado esperado guia o estilo com muito mais precisão do que descrevê-lo.</div></div>
          <div class="tl-item"><b>📐</b><div class="tl-title">Formato explícito</div><div class="tl-desc">Pedir lista, tabela, tópicos ou texto corrido evita retrabalho de reformatação depois.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Técnicas essenciais de prompt</b><span>Aula 3 · Módulo 2 · 18 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>18:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Se a aula passada te deu a base, essa aula é o upgrade. Três técnicas que fazem diferença real no dia a dia.</p>
      <p><span class="cue">01:50</span>A primeira é pedir pra IA assumir um papel. Quando você diz "aja como um professor explicando pra um iniciante", você está calibrando o tom e o nível técnico de tudo que vem depois.</p>
      <p><span class="cue">05:30</span>A segunda, e talvez a mais poderosa: dar um exemplo do resultado que você quer, em vez de só descrever. Isso se chama "few-shot" no jargão técnico, mas a ideia é simples — mostrar em vez de explicar.</p>
      <p><span class="cue">10:00</span>E a terceira é pedir o formato de forma explícita. Precisa de lista numerada? Peça lista numerada. Precisa de tabela? Peça tabela. IAs seguem esse tipo de instrução com bastante precisão quando você é direto.</p>
      <p><span class="cue">14:30</span>Combine as três técnicas numa única mensagem e você chega perto de um prompt de nível profissional. Na próxima aula, a gente fecha o módulo falando dos erros mais comuns — pra você evitar as armadilhas mais frequentes.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 15 min</div>
      <h3>Monte um prompt combinando as 3 técnicas</h3>
      <p>Vamos construir, passo a passo, um prompt profissional usando persona, exemplo e formato juntos.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha uma tarefa real que você precisa fazer esta semana (e-mail, resumo, mensagem, post).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Defina uma persona apropriada para essa tarefa (ex: "redator", "professor", "analista").</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escreva ou cole um exemplo de estilo que a IA deveria seguir.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Especifique o formato final desejado (lista, parágrafo, tabela).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Junte tudo em um único prompt e, se possível, teste em uma ferramenta de IA.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 5 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m2-l4'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Para fechar este módulo, vamos falar dos erros mais comuns ao conversar com uma IA — e como evitá-los sem complicação.</p>
        <h3>Erro 1: pedir demais em uma única mensagem</h3>
        <p>Pedir "escreva um plano de aula, faça 10 exercícios, crie uma prova e sugira um vídeo" tudo de uma vez tende a gerar respostas rasas em cada parte. Divida tarefas grandes em pedidos menores e sequenciais.</p>
        <h3>Erro 2: aceitar a primeira resposta sem revisar</h3>
        <p>Mesmo uma resposta bem escrita pode conter erros factuais ou trechos genéricos demais. Trate a primeira resposta como um <strong>rascunho</strong> — refine, questione, peça fontes quando fizer sentido.</p>
        <h3>Erro 3: não dar feedback específico</h3>
        <p>Dizer apenas "não gostei" raramente melhora o resultado. Diga <em>o quê</em> não funcionou: "está muito longo", "o tom está informal demais", "faltou um exemplo prático".</p>
        <h3>Erro 4: tratar a IA como fonte final de verdade</h3>
        <p>Para fatos importantes — datas, números, citações — sempre confirme em uma fonte confiável. Vamos aprofundar isso especificamente em uma aula futura sobre verificação de informação.</p>
        <div class="callout">💡 <strong>Resumo do módulo:</strong> um bom prompt é específico, iterativo e revisado — nunca "primeira tentativa e pronto".</div>
      </div>
      <div class="infographic">
        <h4>4 erros comuns (e o antídoto)</h4>
        <div class="timeline">
          <div class="tl-item"><b>✕</b><div class="tl-title">Pedir tudo de uma vez</div><div class="tl-desc">Antídoto: divida em pedidos menores e sequenciais.</div></div>
          <div class="tl-item"><b>✕</b><div class="tl-title">Não revisar a resposta</div><div class="tl-desc">Antídoto: trate a primeira resposta como rascunho.</div></div>
          <div class="tl-item"><b>✕</b><div class="tl-title">Feedback vago</div><div class="tl-desc">Antídoto: aponte exatamente o que precisa mudar.</div></div>
          <div class="tl-item"><b>✕</b><div class="tl-title">Confiar cegamente em fatos</div><div class="tl-desc">Antídoto: confirme dados importantes em outra fonte.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Erros comuns</b><span>Aula 4 · Módulo 2 · 12 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>12:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Pra fechar esse módulo, vamos falar dos tropeços mais comuns — os que praticamente todo mundo comete no começo.</p>
      <p><span class="cue">01:30</span>O primeiro é pedir coisa demais de uma vez só. Quando você empilha várias tarefas numa mensagem só, cada parte tende a sair mais rasa. Divida em pedidos menores, um de cada vez.</p>
      <p><span class="cue">04:00</span>O segundo é aceitar a primeira resposta sem revisar. Trate sempre como rascunho — mesmo quando parece ótima à primeira vista.</p>
      <p><span class="cue">06:20</span>O terceiro é dar feedback vago. "Não gostei" não ajuda a IA a melhorar. Diga especificamente o que precisa mudar: tamanho, tom, exemplo, estrutura.</p>
      <p><span class="cue">08:40</span>E o quarto, talvez o mais importante: nunca trate a IA como fonte final de verdade pra fatos importantes. Data, número, citação — sempre confirme em outro lugar. A gente vai voltar nesse ponto com mais profundidade lá no Módulo 3.</p>
      <p><span class="cue">10:50</span>Com isso, você fecha o Módulo 2 sabendo conversar com uma IA de forma eficiente. No próximo módulo, a gente parte para aplicações práticas do dia a dia.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 10 min</div>
      <h3>Audite uma conversa sua</h3>
      <p>Vamos revisar uma conversa real (sua, ou uma que você lembre) à luz dos 4 erros desta aula.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Pense em uma conversa recente que você teve com uma IA (ou imagine uma situação comum).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Identifique se algum dos 4 erros apareceu nela.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Reescreva mentalmente (ou por escrito) como você faria diferente agora.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Compartilhe esse antes/depois com um colega de turma.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m3-l1'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Um dos usos mais imediatos de uma IA generativa na vida de um estudante é como <strong>parceira de estudo</strong> — não para fazer o trabalho por você, mas para acelerar tarefas repetitivas e organizar o raciocínio.</p>
        <h3>Resumos que realmente ajudam</h3>
        <p>Em vez de pedir "resuma esse texto", peça algo mais direcionado: <em>"Resuma este capítulo em 5 tópicos, destacando o que costuma cair em prova."</em> Quanto mais claro o objetivo do resumo, mais útil ele fica.</p>
        <h3>Mapas mentais com apoio de IA</h3>
        <p>Você pode pedir para a IA organizar um conteúdo em estrutura hierárquica — tema central, subtemas, detalhes — que depois você mesmo transforma em um mapa mental visual, no papel ou em um app.</p>
        <h3>Revisão ativa: o uso mais poderoso</h3>
        <p>Em vez de só pedir explicações, peça para a IA <strong>te testar</strong>: <em>"Me faça 5 perguntas sobre este assunto, uma de cada vez, e me diga se acertei antes de seguir para a próxima."</em> Isso simula um professor particular disponível a qualquer hora.</p>
        <div class="callout">💡 <strong>Cuidado importante:</strong> usar IA para estudar deve te deixar mais preparado — nunca substituir o aprendizado. Se você só copia respostas prontas, o conhecimento não fica.</div>
      </div>
      <div class="infographic">
        <h4>3 formas de estudar com IA</h4>
        <div class="timeline">
          <div class="tl-item"><b>📝</b><div class="tl-title">Resumir</div><div class="tl-desc">Condensar conteúdo longo em pontos-chave, com foco no que é mais importante.</div></div>
          <div class="tl-item"><b>🧠</b><div class="tl-title">Estruturar</div><div class="tl-desc">Organizar um tema em tópicos e subtópicos, base para um mapa mental.</div></div>
          <div class="tl-item"><b>🎯</b><div class="tl-title">Testar-se</div><div class="tl-desc">Pedir perguntas de revisão ativa, simulando uma prova ou arguição oral.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — IA para estudar</b><span>Aula 1 · Módulo 3 · 15 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>15:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Novo módulo, aplicações do dia a dia. E o primeiro uso que praticamente todo estudante testa é usar a IA pra ajudar a estudar.</p>
      <p><span class="cue">01:45</span>A diferença entre um resumo genérico e um resumo útil está no pedido. Em vez de "resume esse texto", tente "resuma em 5 tópicos, destacando o que costuma cair em prova". O resultado muda completamente.</p>
      <p><span class="cue">05:00</span>Pra mapa mental, peça uma estrutura hierárquica: tema central, subtemas, detalhes. Depois você mesmo desenha ou usa um app pra deixar visual.</p>
      <p><span class="cue">08:20</span>E o uso mais poderoso de todos, que pouca gente testa: pedir pra IA te testar, uma pergunta de cada vez, como um professor particular. Isso é revisão ativa — e funciona muito melhor do que só ler passivamente.</p>
      <p><span class="cue">11:50</span>Um cuidado importante antes de fechar: isso deve te deixar mais preparado, nunca substituir o aprendizado. Copiar resposta pronta sem entender não gera conhecimento nenhum — só a ilusão dele.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 12 min</div>
      <h3>Monte seu roteiro de revisão ativa</h3>
      <p>Escolha um conteúdo que você precisa estudar esta semana e aplique as 3 formas de uso desta aula.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha um tema ou capítulo que você precisa estudar.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça um resumo direcionado (com objetivo claro) sobre esse tema.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça uma estrutura hierárquica em tópicos e subtópicos.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça 3 perguntas de revisão, uma de cada vez, e tente responder antes de ver a próxima.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m3-l2'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Além de responder perguntas, a IA generativa também <strong>cria conteúdo original</strong> em diferentes formatos. Vamos ver como usar isso de forma prática — em imagem, texto e apresentações.</p>
        <h3>Criando imagens a partir de descrição</h3>
        <p>Ferramentas de geração de imagem transformam uma descrição em texto (o "prompt visual") em uma imagem. Quanto mais detalhes você fornece — estilo, cores, composição, iluminação — mais próximo o resultado fica do que você imaginou.</p>
        <h3>Textos com propósito definido</h3>
        <p>A mesma lógica de prompt das aulas anteriores vale aqui: definir tarefa, contexto e formato transforma um texto genérico em algo pronto para usar — um convite, uma redação, uma legenda, um roteiro.</p>
        <h3>Apresentações: uma aliada, não uma substituta</h3>
        <p>A IA pode gerar a <strong>estrutura</strong> de uma apresentação (títulos de slide, pontos-chave por slide, sugestão de imagens) muito mais rápido do que você faria do zero — mas o refinamento final, o design e a fala continuam sendo seus.</p>
        <div class="callout">💡 <strong>Boa prática:</strong> ao criar conteúdo visual ou textual com IA para uso público, sempre revise antes de publicar — e, quando fizer sentido, informe que houve apoio de IA no processo.</div>
      </div>
      <div class="infographic">
        <h4>O que criar com IA generativa</h4>
        <div class="timeline">
          <div class="tl-item"><b>🖼</b><div class="tl-title">Imagem</div><div class="tl-desc">Descreva estilo, cena, cores e composição para gerar ilustrações e artes originais.</div></div>
          <div class="tl-item"><b>✍</b><div class="tl-title">Texto</div><div class="tl-desc">Convites, redações, legendas, roteiros — sempre com tarefa, contexto e formato definidos.</div></div>
          <div class="tl-item"><b>📊</b><div class="tl-title">Apresentação</div><div class="tl-desc">Estrutura e pontos-chave de cada slide, como ponto de partida para você refinar.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — IA para criar</b><span>Aula 2 · Módulo 3 · 16 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>16:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Além de responder, a IA generativa também cria — imagem, texto, estrutura de apresentação. Vamos ver como aplicar isso na prática.</p>
      <p><span class="cue">02:15</span>Pra imagem, o princípio é descrever com riqueza de detalhe: estilo, cor, composição, iluminação. Quanto mais específico, mais próximo do que você imaginou o resultado fica.</p>
      <p><span class="cue">06:00</span>Pra texto, a mesma fórmula das aulas passadas continua valendo: tarefa, contexto, formato. Isso separa um texto genérico de um texto pronto pra usar de verdade.</p>
      <p><span class="cue">09:40</span>E pra apresentação, o grande ganho é velocidade na estrutura — títulos de slide, pontos-chave, sugestão de imagem. Mas o refinamento final, o design, a fala na hora de apresentar, isso continua sendo trabalho seu.</p>
      <p><span class="cue">13:10</span>Uma boa prática pra guardar: sempre revise antes de publicar qualquer coisa gerada por IA, e quando fizer sentido, seja transparente sobre esse apoio. Na próxima aula, a gente fala exatamente sobre os limites éticos desse uso.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 14 min</div>
      <h3>Crie os 3 formatos, na prática</h3>
      <p>Se tiver acesso a ferramentas de IA generativa, experimente criar nos 3 formatos desta aula.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Descreva uma imagem detalhadamente (estilo, cor, cena) e, se possível, gere-a.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça um texto curto com tarefa, contexto e formato bem definidos.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça a estrutura de uma apresentação de 5 slides sobre um tema à sua escolha.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Revise os 3 resultados e anote o que você mudaria antes de usar de verdade.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m3-l3'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Usar IA de forma poderosa vem junto com uma responsabilidade: entender seus limites éticos. Esta aula cobre três pontos essenciais — vieses, direitos autorais e uso responsável.</p>
        <h3>O que são vieses em IA</h3>
        <p>Como os modelos aprendem a partir de dados criados por humanos, eles podem reproduzir <strong>preconceitos presentes nesses dados</strong> — associando, por exemplo, certas profissões a um gênero específico, sem que isso reflita a realidade. Isso não é intencional, mas é real e mensurável.</p>
        <h3>Direitos autorais e criação com IA</h3>
        <p>Conteúdo gerado por IA levanta questões ainda em debate: de quem é a autoria de uma imagem gerada a partir do estilo de outro artista? Como regra prática, evite pedir explicitamente "no estilo de [artista vivo específico]" para uso comercial, e sempre confira as políticas de uso da ferramenta.</p>
        <h3>Uso responsável, na prática</h3>
        <p>Três princípios simples: <strong>transparência</strong> (avise quando usar IA em trabalhos relevantes), <strong>verificação</strong> (não publique fatos sem checar) e <strong>proporcionalidade</strong> (use IA para acelerar, não para substituir seu próprio julgamento em decisões importantes).</p>
        <div class="callout">💡 <strong>Pergunta para se fazer sempre:</strong> "Se eu contar que usei IA aqui, isso muda como as pessoas vão receber esse conteúdo?" Se a resposta for sim, provavelmente vale a pena ser transparente sobre isso.</div>
      </div>
      <div class="infographic">
        <h4>3 pilares do uso ético</h4>
        <div class="timeline">
          <div class="tl-item"><b>⚖️</b><div class="tl-title">Vieses</div><div class="tl-desc">Modelos podem reproduzir preconceitos presentes nos dados de treinamento — fique atento a respostas estereotipadas.</div></div>
          <div class="tl-item"><b>©️</b><div class="tl-title">Direitos autorais</div><div class="tl-desc">Questão ainda em debate legal — evite imitar estilos específicos de artistas vivos para uso comercial.</div></div>
          <div class="tl-item"><b>🤝</b><div class="tl-title">Uso responsável</div><div class="tl-desc">Transparência, verificação e proporcionalidade guiam um uso saudável da ferramenta.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — IA e ética</b><span>Aula 3 · Módulo 3 · 19 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>19:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Toda ferramenta poderosa exige responsabilidade. Essa aula é sobre os limites éticos de usar IA — sem meias palavras.</p>
      <p><span class="cue">02:20</span>Primeiro ponto: viés. Como esses modelos aprendem com dado criado por gente, eles podem reproduzir preconceito que já existe na sociedade. Não é maldade da máquina — é reflexo do que ela viu. E isso é mensurável, documentado, real.</p>
      <p><span class="cue">07:00</span>Segundo ponto: direitos autorais. Ainda é uma área em debate legal no mundo inteiro. Uma boa regra prática: evite pedir "no estilo de" um artista vivo específico pra uso comercial, e sempre olhe a política de uso da ferramenta que você está usando.</p>
      <p><span class="cue">12:30</span>E terceiro: uso responsável, resumido em três palavras. Transparência — avise quando usar IA em trabalho relevante. Verificação — não publique fato sem checar. E proporcionalidade — use pra acelerar, não pra substituir seu próprio julgamento em decisão importante.</p>
      <p><span class="cue">16:40</span>Guarda uma pergunta simples pra usar sempre: se eu contar que usei IA aqui, isso muda como as pessoas recebem esse conteúdo? Se a resposta for sim, vale a pena ser transparente. Na próxima aula, fechamos o módulo com uma habilidade prática: verificar informação gerada por IA.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 15 min</div>
      <h3>Teste de viés na prática</h3>
      <p>Vamos observar, de forma prática e não julgadora, como respostas de IA podem carregar padrões dignos de atenção.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça a uma IA generativa para descrever uma pessoa em uma profissão qualquer (ex: "descreva um engenheiro" e "descreva uma enfermeira").</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Observe se apareceram suposições de gênero, idade ou aparência não solicitadas.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Discuta com um colega: essa suposição reflete a realidade, ou um estereótipo?</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escreva uma frase sobre como isso muda (ou não) a forma como você vai usar IA daqui pra frente.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m3-l4'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Fechamos o módulo com uma das habilidades mais importantes desta trilha inteira: saber <strong>verificar</strong> o que uma IA te entrega, para não cair em alucinações.</p>
        <h3>O que é uma alucinação, na prática</h3>
        <p>Alucinação é quando a IA gera uma informação que <strong>soa correta e confiante, mas é falsa</strong> — uma citação que nunca existiu, uma data errada, uma fonte inventada. Como vimos no Módulo 1, isso acontece porque o modelo prevê "o que é mais provável", não porque consulta um banco de fatos verificados em tempo real.</p>
        <h3>Sinais de alerta</h3>
        <p>Desconfie especialmente de: números muito específicos sem fonte citada, nomes de estudos ou livros que você nunca ouviu falar, e qualquer resposta sobre eventos muito recentes (a IA pode não ter informação atualizada).</p>
        <h3>Como verificar, na prática</h3>
        <p>Para qualquer fato que importe — uma data, uma estatística, uma citação — busque confirmar em pelo menos <strong>uma fonte independente</strong>: um site oficial, uma reportagem confiável, um livro didático. Você também pode perguntar diretamente à IA: <em>"Você tem certeza dessa informação? Qual a fonte?"</em> — isso às vezes revela quando ela está "chutando".</p>
        <div class="callout">💡 <strong>Regra de ouro:</strong> quanto mais importante for a decisão baseada naquela informação, mais rigorosa deve ser a verificação. Uma curiosidade não precisa do mesmo cuidado que um dado usado em um trabalho ou decisão profissional.</div>
      </div>
      <div class="infographic">
        <h4>Checklist rápido anti-alucinação</h4>
        <div class="timeline">
          <div class="tl-item"><b>①</b><div class="tl-title">Desconfie do específico</div><div class="tl-desc">Números exatos, citações e nomes próprios merecem checagem extra.</div></div>
          <div class="tl-item"><b>②</b><div class="tl-title">Busque fonte independente</div><div class="tl-desc">Confirme em pelo menos um lugar fora da conversa com a IA.</div></div>
          <div class="tl-item"><b>③</b><div class="tl-title">Questione a IA</div><div class="tl-desc">Pergunte a fonte e o nível de confiança — a resposta pode revelar incerteza.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Verificando informações</b><span>Aula 4 · Módulo 3 · 14 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>14:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Última aula do módulo, e talvez a mais importante pra você usar IA com segurança pelo resto da vida: como não cair em alucinação.</p>
      <p><span class="cue">01:50</span>Alucinação é quando a resposta soa confiante e correta, mas é falsa. Uma citação que não existe, uma data errada, uma fonte inventada. E isso acontece porque, como vimos lá no Módulo 1, o modelo prevê o que é mais provável — ele não consulta um banco de fatos verificados em tempo real.</p>
      <p><span class="cue">05:30</span>Alguns sinais de alerta: número muito específico sem fonte, nome de estudo ou livro que você nunca ouviu, e qualquer coisa sobre evento muito recente, porque o modelo pode simplesmente não ter essa informação atualizada.</p>
      <p><span class="cue">08:40</span>E o antídoto é simples: pra qualquer fato que importe, confirme em pelo menos uma fonte independente. Você também pode perguntar direto pra IA se ela tem certeza e qual a fonte — às vezes isso já revela que ela estava chutando.</p>
      <p><span class="cue">11:50</span>Regra de ouro pra guardar: quanto mais importante a decisão, mais rigorosa deve ser sua checagem. Com isso, você fecha o Módulo 3 sabendo não só usar IA no dia a dia, mas usar com responsabilidade. No próximo módulo, entramos em produtividade e negócios.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 12 min</div>
      <h3>Caça-alucinação</h3>
      <p>Vamos testar, na prática, os limites de precisão de uma IA generativa.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça a uma IA um dado bem específico (uma data histórica, uma estatística, uma citação de alguém).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Busque esse mesmo dado em uma fonte independente (site oficial, livro, reportagem confiável).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Compare: a informação bateu, ou havia algum erro?</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Pergunte diretamente à IA "tem certeza? qual a fonte?" e observe a resposta.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Anote uma situação futura em que você vai lembrar de aplicar essa checagem.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 5 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m4-l1'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Toda função tem tarefas repetitivas: organizar informação, responder perguntas parecidas, preencher formulários, revisar textos. Essas tarefas são o ponto de partida ideal para começar a usar IA como aliada de produtividade.</p>
        <h3>Como identificar o que vale automatizar</h3>
        <p>Pergunte-se: essa tarefa (1) se repete com frequência, (2) segue um padrão parecido toda vez, e (3) não exige julgamento humano delicado? Se a resposta for sim para as três, ela é candidata a ganhar apoio de IA.</p>
        <h3>Criando um "prompt modelo" reutilizável</h3>
        <p>Em vez de reescrever a instrução toda vez, monte um modelo fixo, com espaços para preencher: <em>"Revise o texto abaixo corrigindo gramática, mantendo o tom [formal/informal]: [colar texto aqui]."</em> Guarde esse modelo para reutilizar sempre que precisar.</p>
        <div class="callout">💡 <strong>Pense em "assistente", não em "substituto":</strong> o objetivo é liberar seu tempo das partes mecânicas, para você dedicar mais atenção às decisões que realmente exigem julgamento humano.</div>
        <h3>Exemplos comuns no dia a dia escolar e profissional</h3>
        <p>Organizar uma lista de tarefas por prioridade, transformar anotações soltas em um texto corrido, gerar variações de uma mesma mensagem para públicos diferentes, criar rascunhos de respostas para perguntas frequentes.</p>
      </div>
      <div class="infographic">
        <h4>Teste dos 3 critérios</h4>
        <div class="timeline">
          <div class="tl-item"><b>①</b><div class="tl-title">É repetitiva?</div><div class="tl-desc">Acontece com frequência, não é algo que você faz uma vez só.</div></div>
          <div class="tl-item"><b>②</b><div class="tl-title">Segue um padrão?</div><div class="tl-desc">A estrutura da tarefa é parecida a cada vez que ela aparece.</div></div>
          <div class="tl-item"><b>③</b><div class="tl-title">Não exige julgamento delicado?</div><div class="tl-desc">Decisões sensíveis continuam precisando de uma pessoa no comando.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Automatizando tarefas repetitivas</b><span>Aula 1 · Módulo 4 · 15 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>15:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Novo módulo: produtividade e negócios. E o primeiro passo é aprender a enxergar quais tarefas do seu dia valem a pena ganhar apoio de IA.</p>
      <p><span class="cue">02:10</span>Um teste rápido de três perguntas: essa tarefa se repete? Ela segue um padrão parecido toda vez? E ela não exige um julgamento humano delicado? Três "sim" e você achou uma boa candidata.</p>
      <p><span class="cue">05:40</span>Uma técnica que economiza muito tempo: montar um prompt modelo, reutilizável, com espaço pra preencher. Em vez de reescrever a instrução toda vez, você guarda um modelo pronto e só troca o conteúdo.</p>
      <p><span class="cue">09:20</span>E um jeito de pensar que ajuda bastante: encare como assistente, não como substituto. A ideia é liberar seu tempo da parte mecânica, pra você focar energia onde realmente importa — a decisão, a criatividade, o julgamento.</p>
      <p><span class="cue">12:30</span>Na próxima aula, a gente aplica isso direto em e-mails, planilhas e apresentações — o trio mais comum do ambiente profissional.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 12 min</div>
      <h3>Mapeie suas 3 tarefas repetitivas</h3>
      <p>Vamos aplicar o teste dos 3 critérios em tarefas reais da sua rotina.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Liste 3 tarefas repetitivas da sua rotina (escolar, pessoal ou de trabalho).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Aplique o teste dos 3 critérios em cada uma.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha a melhor candidata e escreva um prompt modelo reutilizável para ela.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Se possível, teste esse prompt em uma ferramenta de IA.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m4-l2'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>E-mails, planilhas e apresentações são, provavelmente, as três ferramentas mais usadas em qualquer ambiente profissional — e as três ganham muito com apoio de IA.</p>
        <h3>E-mails com tom e objetivo certos</h3>
        <p>Peça para a IA redigir a partir de tópicos soltos: <em>"Escreva um e-mail formal pedindo prorrogação de prazo, a partir destes pontos: [lista]."</em> Depois, sempre revise o tom antes de enviar — cada relação profissional tem seu próprio nível de formalidade.</p>
        <h3>Planilhas: fórmulas e organização</h3>
        <p>Você pode descrever o que precisa em português simples e pedir a fórmula correspondente: <em>"Qual fórmula de planilha soma valores da coluna B apenas quando a coluna A diz 'Aprovado'?"</em> — a IA converte sua intenção em sintaxe técnica.</p>
        <h3>Apresentações mais rápidas</h3>
        <p>Como vimos no Módulo 3, a IA agiliza a estrutura. Para o ambiente profissional, peça também uma versão "resumo executivo" — poucos slides, direto ao ponto, para públicos com pouco tempo.</p>
        <div class="callout">💡 <strong>Dica prática:</strong> sempre revise números e fórmulas geradas por IA antes de usar em decisões reais — erros em planilhas financeiras podem ter consequências sérias.</div>
      </div>
      <div class="infographic">
        <h4>O trio da produtividade</h4>
        <div class="timeline">
          <div class="tl-item"><b>✉️</b><div class="tl-title">E-mail</div><div class="tl-desc">Da lista de tópicos para uma mensagem com tom e objetivo definidos.</div></div>
          <div class="tl-item"><b>📊</b><div class="tl-title">Planilha</div><div class="tl-desc">Descreva em português o que precisa e receba a fórmula correspondente.</div></div>
          <div class="tl-item"><b>📽️</b><div class="tl-title">Apresentação</div><div class="tl-desc">Estrutura rápida, com opção de versão resumida para públicos ocupados.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — E-mails, planilhas e apresentações</b><span>Aula 2 · Módulo 4 · 17 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>17:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>E-mail, planilha, apresentação — o trio mais usado em qualquer ambiente profissional, e os três ganham muito com IA.</p>
      <p><span class="cue">02:30</span>Pra e-mail, a técnica é simples: liste os pontos soltos que você quer comunicar, e peça pra IA transformar isso numa mensagem com o tom certo. Formal, informal, urgente, cordial — você define, ela escreve.</p>
      <p><span class="cue">06:15</span>Pra planilha, o ganho é gigante pra quem não domina fórmula. Descreve em português o que você precisa, e a IA converte isso na sintaxe técnica certa. Economiza muita busca no Google.</p>
      <p><span class="cue">10:00</span>Pra apresentação, além da estrutura que já vimos, peça também uma versão resumo executivo — poucos slides, direto ao ponto, pra quando o público tem pouco tempo.</p>
      <p><span class="cue">13:40</span>E uma dica que vale ouro: sempre revise número e fórmula antes de usar numa decisão real. Erro em planilha financeira pode custar caro — a IA ajuda a montar, mas a responsabilidade da conferência final é sua.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 14 min</div>
      <h3>Aplique nos 3 formatos</h3>
      <p>Vamos praticar com uma situação de cada tipo.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Liste tópicos soltos de um e-mail real que você precisa escrever, e peça pra IA transformar em mensagem.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Descreva em português uma necessidade de planilha e peça a fórmula correspondente.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça uma versão "resumo executivo" de uma apresentação sobre um tema à sua escolha.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Revise os 3 resultados como se fosse enviá-los de verdade.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m4-l3'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Chatbots e assistentes de IA já são a porta de entrada de atendimento em bancos, lojas, escolas e prestadores de serviço. Entender como eles funcionam ajuda tanto a criá-los quanto a usá-los melhor como cliente.</p>
        <h3>Como funciona um chatbot de atendimento</h3>
        <p>Na forma mais simples, ele segue um <strong>fluxo de perguntas e respostas</strong> pré-definido. Na forma mais avançada, usa IA generativa para entender perguntas escritas livremente e responder de forma natural, consultando uma base de informações da empresa.</p>
        <h3>Onde ele funciona bem — e onde não deveria decidir sozinho</h3>
        <p>Chatbots são ótimos para perguntas frequentes, horários, status de pedido, dúvidas repetitivas. Para situações delicadas — uma reclamação grave, uma emergência, uma negociação complexa — o ideal é que ele reconheça o limite e <strong>transfira para uma pessoa</strong>.</p>
        <h3>Montando um roteiro básico de atendimento</h3>
        <p>Um bom ponto de partida: liste as 10 perguntas mais frequentes que sua escola ou negócio recebe, escreva a resposta ideal para cada uma, e defina em quais situações o atendimento deve ser encaminhado para um humano.</p>
        <div class="callout">💡 <strong>Como cliente:</strong> se um chatbot não está resolvendo seu problema, peça diretamente para falar com uma pessoa — a maioria tem esse caminho, mesmo que não apareça em destaque.</div>
      </div>
      <div class="infographic">
        <h4>Quando usar chatbot x humano</h4>
        <div class="timeline">
          <div class="tl-item"><b>🤖</b><div class="tl-title">Chatbot</div><div class="tl-desc">Perguntas frequentes, horários, status simples, dúvidas repetitivas.</div></div>
          <div class="tl-item"><b>👤</b><div class="tl-title">Humano</div><div class="tl-desc">Reclamações graves, negociações, emergências, decisões sensíveis.</div></div>
          <div class="tl-item"><b>🔀</b><div class="tl-title">Transferência</div><div class="tl-desc">O melhor sistema reconhece seus próprios limites e passa o bastão na hora certa.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Atendimento ao cliente com IA</b><span>Aula 3 · Módulo 4 · 16 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>16:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Chatbot já é praticamente a porta de entrada de atendimento em banco, loja, escola. Vale entender como funciona por dentro.</p>
      <p><span class="cue">02:20</span>Na forma mais simples, é um fluxo de perguntas e respostas fixo. Na forma mais avançada, usa IA generativa de verdade, entendendo pergunta livre e respondendo de forma natural, consultando uma base de informação da empresa.</p>
      <p><span class="cue">06:00</span>Ele funciona muito bem pra pergunta frequente, horário, status de pedido. Mas em situação delicada — reclamação grave, emergência, negociação complexa — o ideal é que ele reconheça o limite dele e passe pra uma pessoa.</p>
      <p><span class="cue">09:40</span>Se você for montar um roteiro básico, comece simples: liste as 10 perguntas mais frequentes que você recebe, escreva a resposta ideal pra cada uma, e defina claramente quando deve ir pra um humano.</p>
      <p><span class="cue">13:00</span>E como cliente, guarda essa dica: se o chatbot não está resolvendo, peça direto pra falar com uma pessoa. Quase sempre existe esse caminho, mesmo que escondido. Próxima aula: análise de dados e relatórios com apoio de IA.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 13 min</div>
      <h3>Monte um mini-roteiro de atendimento</h3>
      <p>Vamos criar a base de um chatbot simples para um contexto real ou fictício.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha um contexto (sua escola, um negócio fictício, um clube).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Liste 5 perguntas frequentes que esse contexto provavelmente recebe.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escreva a resposta ideal para cada uma delas.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Defina uma regra clara de "quando transferir para um humano".</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m4-l4'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Encerrando o módulo, vamos ver como a IA pode ajudar a transformar números soltos em <strong>decisões mais claras</strong> — sem que você precise ser especialista em estatística.</p>
        <h3>Da planilha ao insight</h3>
        <p>Você pode descrever um conjunto de dados em palavras e pedir para a IA sugerir que tipo de análise faz sentido: <em>"Tenho vendas mensais dos últimos 12 meses. Que tipo de gráfico mostraria melhor a tendência?"</em> A IA não substitui a ferramenta de gráfico, mas orienta qual caminho seguir.</p>
        <h3>Resumindo relatórios longos</h3>
        <p>Relatórios extensos podem ser resumidos com foco no que interessa para cada público: <em>"Resuma este relatório em 5 pontos, destacando riscos e oportunidades, para uma apresentação à diretoria."</em></p>
        <h3>O limite importante desta aula</h3>
        <p>A IA pode sugerir <strong>como interpretar</strong> um dado, mas não deve ser a única fonte para decisões importantes baseadas em números. Sempre confira os cálculos originais e, quando o resultado for usado para decisões financeiras ou estratégicas, valide com uma pessoa responsável pela área.</p>
        <div class="callout">💡 <strong>Fechando o módulo:</strong> em produtividade e negócios, a IA funciona melhor como um "primeiro rascunho inteligente" — que acelera o processo, mas nunca dispensa a revisão humana final.</div>
      </div>
      <div class="infographic">
        <h4>Do dado à decisão</h4>
        <div class="timeline">
          <div class="tl-item"><b>1</b><div class="tl-title">Descrever o dado</div><div class="tl-desc">Explique em palavras simples o que você tem em mãos.</div></div>
          <div class="tl-item"><b>2</b><div class="tl-title">Pedir orientação</div><div class="tl-desc">Peça sugestão de gráfico, resumo ou destaque de pontos-chave.</div></div>
          <div class="tl-item"><b>3</b><div class="tl-title">Validar</div><div class="tl-desc">Confira números e conclusões antes de usar em uma decisão real.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Análise de dados e relatórios</b><span>Aula 4 · Módulo 4 · 18 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>18:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Última aula do módulo: como transformar número solto em decisão mais clara, sem precisar ser especialista em estatística.</p>
      <p><span class="cue">02:15</span>Você pode descrever um conjunto de dados em palavras e perguntar que tipo de análise faz sentido. A IA não faz o gráfico por você sozinha, mas orienta qual caminho seguir — isso já economiza bastante tentativa e erro.</p>
      <p><span class="cue">06:00</span>Pra relatório longo, o pedido de resumo direcionado funciona igual às aulas anteriores: destaque o que interessa pro público específico que vai ler aquilo.</p>
      <p><span class="cue">09:30</span>E aqui vai o limite mais importante da aula: a IA pode sugerir como interpretar um dado, mas não deve ser a única fonte pra decisão importante baseada em número. Sempre confira o cálculo original, e valide com quem é responsável pela área antes de uma decisão financeira ou estratégica.</p>
      <p><span class="cue">13:50</span>Com isso, fechamos o módulo de produtividade e negócios. A ideia central pra levar: IA como primeiro rascunho inteligente, que acelera, mas nunca dispensa a revisão humana final. No próximo módulo, entramos em automações e agentes de IA — um nível acima.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 12 min</div>
      <h3>Do dado à recomendação</h3>
      <p>Pratique o fluxo completo: descrever, pedir orientação e validar.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Pense em um conjunto de dados que você acompanha (notas, gastos, treinos, vendas de um projeto).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Descreva esse dado em palavras simples para uma IA e peça sugestão de como analisá-lo.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Peça um resumo de 3 pontos-chave a partir dessa descrição.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Identifique um ponto que precisaria ser validado por uma pessoa antes de virar decisão.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m5-l1'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Até aqui, você conversou com uma IA e recebeu uma resposta — uma troca de mensagens. Um <strong>agente de IA</strong> vai além: ele recebe um objetivo e decide sozinho, em várias etapas, como alcançá-lo.</p>
        <h3>A diferença entre responder e agir</h3>
        <p>Um modelo comum responde a uma pergunta. Um agente pode <strong>planejar passos</strong>, usar ferramentas (buscar na web, ler um arquivo, enviar um e-mail), avaliar o resultado de cada etapa e ajustar o próprio plano no meio do caminho — sem que um humano precise instruir cada ação.</p>
        <h3>O ciclo básico de um agente</h3>
        <p>Na maioria dos sistemas de agente, existe um ciclo repetido: <strong>observar</strong> a situação atual, <strong>decidir</strong> a próxima ação, <strong>executar</strong> essa ação usando uma ferramenta disponível, e <strong>avaliar</strong> o resultado antes de decidir o próximo passo.</p>
        <div class="callout">💡 <strong>Exemplo simples:</strong> um agente de e-mail que recebe a tarefa "responda aos e-mails de clientes pedindo status de pedido" pode sozinho: ler a caixa de entrada, identificar quais mensagens se encaixam, consultar o sistema de pedidos, e responder cada uma — sem que uma pessoa faça isso manualmente e-mail por e-mail.</div>
        <h3>Por que isso importa agora</h3>
        <p>Agentes representam o próximo passo depois da IA conversacional: sistemas que não apenas respondem, mas <strong>realizam trabalho de várias etapas</strong> de forma mais autônoma — sempre dentro de limites definidos por quem os configura.</p>
      </div>
      <div class="infographic">
        <h4>O ciclo de um agente</h4>
        <div class="timeline">
          <div class="tl-item"><b>👁</b><div class="tl-title">Observar</div><div class="tl-desc">Avalia a situação atual e a informação disponível.</div></div>
          <div class="tl-item"><b>🧭</b><div class="tl-title">Decidir</div><div class="tl-desc">Escolhe a próxima ação mais adequada para se aproximar do objetivo.</div></div>
          <div class="tl-item"><b>⚙️</b><div class="tl-title">Executar</div><div class="tl-desc">Usa uma ferramenta disponível — busca, leitura, escrita, envio.</div></div>
          <div class="tl-item"><b>✅</b><div class="tl-title">Avaliar</div><div class="tl-desc">Confere o resultado e decide se repete o ciclo ou encerra a tarefa.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — O que são agentes de IA</b><span>Aula 1 · Módulo 5 · 18 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>18:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Módulo avançado, conceito novo: agente de IA. Até aqui você conversou e recebeu resposta. Um agente vai além disso.</p>
      <p><span class="cue">02:30</span>A diferença central é: um modelo comum responde. Um agente recebe um objetivo e decide sozinho, em várias etapas, como chegar lá — usando ferramenta, avaliando resultado, ajustando o plano no meio do caminho.</p>
      <p><span class="cue">06:15</span>Existe um ciclo que se repete na maioria desses sistemas: observar a situação, decidir a próxima ação, executar usando uma ferramenta disponível, e avaliar o resultado antes do próximo passo.</p>
      <p><span class="cue">10:40</span>Pensa num exemplo prático: um agente que cuida de e-mail de cliente pedindo status de pedido. Ele lê a caixa de entrada, identifica as mensagens certas, consulta o sistema de pedido, e responde cada uma — sem uma pessoa fazendo isso manualmente, um e-mail de cada vez.</p>
      <p><span class="cue">14:50</span>Isso é o próximo passo depois da IA conversacional: sistema que não só responde, mas realiza trabalho de várias etapas com mais autonomia — sempre dentro de limites definidos por quem configura. Na próxima aula, vemos como conectar IA a outras ferramentas de verdade.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 14 min</div>
      <h3>Desenhe o ciclo de um agente</h3>
      <p>Vamos aplicar o ciclo observar → decidir → executar → avaliar em uma tarefa do seu cotidiano.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha uma tarefa de várias etapas que você faz com frequência (ex: organizar sua agenda da semana).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Descreva o que um "agente" observaria antes de agir nessa tarefa.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Liste as decisões que ele precisaria tomar em cada etapa.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Identifique em que ponto você (humano) ainda gostaria de aprovar antes dele continuar.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m5-l2'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Um agente só se torna realmente útil quando consegue <strong>agir fora da conversa</strong> — lendo uma planilha, consultando um calendário, buscando na web, enviando uma mensagem. Isso acontece por meio de <strong>integrações</strong>.</p>
        <h3>O que é uma integração, em termos simples</h3>
        <p>É uma "ponte" que permite que a IA converse com outro sistema — um e-mail, um calendário, um banco de dados, uma planilha — de forma padronizada, para poder ler ou escrever informação ali.</p>
        <h3>MCP: um padrão comum de conexão</h3>
        <p>Você pode ouvir falar de "MCP" (Model Context Protocol) — um padrão criado para que diferentes ferramentas de IA se conectem a diferentes serviços de forma parecida, sem que cada conexão precise ser construída do zero. Pense nele como uma "tomada universal" entre IA e outros sistemas.</p>
        <h3>Automação: unindo IA a um gatilho</h3>
        <p>Uma automação típica combina um <strong>gatilho</strong> (ex: "todo dia às 8h" ou "quando chega um e-mail novo") com uma <strong>ação</strong> que envolve IA (ex: "resuma o e-mail e adicione à planilha de tarefas"). É assim que tarefas passam a acontecer sem intervenção manual repetida.</p>
        <div class="callout">💡 <strong>Comece pequeno:</strong> a primeira automação que vale a pena construir é sempre a mais simples e mais repetitiva da sua rotina — não a mais ambiciosa.</div>
      </div>
      <div class="infographic">
        <h4>Anatomia de uma automação</h4>
        <div class="timeline">
          <div class="tl-item"><b>⏰</b><div class="tl-title">Gatilho</div><div class="tl-desc">O evento que inicia o processo: um horário, um e-mail, uma nova linha em planilha.</div></div>
          <div class="tl-item"><b>🔗</b><div class="tl-title">Integração</div><div class="tl-desc">A ponte que conecta a IA ao sistema onde a informação está.</div></div>
          <div class="tl-item"><b>🤖</b><div class="tl-title">Ação com IA</div><div class="tl-desc">O que a IA faz com a informação — resumir, classificar, responder, gerar.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Conectando IA a outras ferramentas</b><span>Aula 2 · Módulo 5 · 20 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>20:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Um agente só vira útil de verdade quando consegue agir fora da conversa. Isso acontece por meio de integração.</p>
      <p><span class="cue">02:40</span>Integração, em termos simples, é uma ponte que deixa a IA conversar com outro sistema — e-mail, calendário, planilha, banco de dados — de forma padronizada.</p>
      <p><span class="cue">06:20</span>Você vai ouvir falar de MCP, um padrão criado justamente pra isso: conectar diferentes ferramentas de IA a diferentes serviços sem reinventar a roda a cada conexão nova. Pensa como uma tomada universal entre IA e sistema externo.</p>
      <p><span class="cue">11:00</span>E automação de verdade nasce quando você junta um gatilho — todo dia às 8 horas, ou quando chega e-mail novo — com uma ação que envolve IA, tipo resumir e adicionar numa planilha de tarefas.</p>
      <p><span class="cue">15:30</span>Uma dica prática: comece pequeno. A primeira automação que vale a pena construir é sempre a mais simples e mais repetitiva da sua rotina, não a mais ambiciosa. Na próxima aula, a gente constrói um fluxo desses do início ao fim.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 15 min</div>
      <h3>Desenhe sua primeira automação (no papel)</h3>
      <p>Antes de construir de verdade, vamos planejar uma automação simples.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha uma tarefa repetitiva que envolve mais de um sistema (ex: e-mail + planilha).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Defina o gatilho: o que deveria iniciar essa automação?</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Defina a ação com IA: o que ela deveria fazer com a informação?</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Desenhe esse fluxo em 3 caixas simples: gatilho → IA → resultado.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m5-l3'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Hora de sair do conceito e construir, passo a passo, um fluxo automatizado simples — usando apenas ferramentas gratuitas e acessíveis, sem precisar programar.</p>
        <h3>Escolhendo uma tarefa de teste</h3>
        <p>Bons candidatos para o primeiro fluxo: transformar novas respostas de um formulário em uma mensagem resumida, ou gerar automaticamente um rascunho de resposta para mensagens recebidas em um canal específico.</p>
        <h3>As 4 etapas de construção</h3>
        <p><strong>1. Definir o objetivo em uma frase</strong> — o que exatamente deve acontecer, do início ao fim.<br>
        <strong>2. Escolher o gatilho</strong> — o evento que inicia tudo.<br>
        <strong>3. Escrever o prompt da IA</strong> — a instrução clara sobre o que fazer com a informação recebida.<br>
        <strong>4. Testar com dados reais</strong> — rodar com exemplos verdadeiros antes de confiar no fluxo no dia a dia.</p>
        <div class="callout">💡 <strong>Ferramentas comuns para começar:</strong> plataformas de automação sem código (que conectam apps por blocos visuais) combinadas com uma IA generativa são o caminho mais acessível para o primeiro projeto — sem exigir conhecimento de programação.</div>
        <h3>Testando antes de confiar</h3>
        <p>Rode o fluxo com 3 a 5 exemplos reais antes de deixá-lo funcionando sozinho. Ajuste o prompt sempre que o resultado sair fora do esperado — é normal refinar algumas vezes até o fluxo ficar confiável.</p>
      </div>
      <div class="infographic">
        <h4>4 etapas para seu primeiro fluxo</h4>
        <div class="timeline">
          <div class="tl-item"><b>1</b><div class="tl-title">Definir objetivo</div><div class="tl-desc">Uma frase clara sobre o que deve acontecer, do início ao fim.</div></div>
          <div class="tl-item"><b>2</b><div class="tl-title">Escolher gatilho</div><div class="tl-desc">O evento que dispara o processo automaticamente.</div></div>
          <div class="tl-item"><b>3</b><div class="tl-title">Escrever o prompt</div><div class="tl-desc">A instrução que a IA vai seguir sempre que o gatilho ativar.</div></div>
          <div class="tl-item"><b>4</b><div class="tl-title">Testar</div><div class="tl-desc">Rodar com exemplos reais e ajustar antes de confiar de vez.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Construindo seu primeiro fluxo automatizado</b><span>Aula 3 · Módulo 5 · 22 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>22:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Chegou a hora de sair do conceito e construir de verdade um fluxo automatizado simples, sem precisar programar.</p>
      <p><span class="cue">02:50</span>Um bom candidato pra teste: transformar resposta nova de formulário numa mensagem resumida, ou gerar rascunho automático de resposta pra mensagem recebida.</p>
      <p><span class="cue">06:30</span>Quatro etapas pra construir. Primeiro, defina o objetivo numa frase só. Segundo, escolha o gatilho — o evento que inicia tudo. Terceiro, escreva o prompt, a instrução clara do que a IA deve fazer. Quarto, teste com dado real antes de confiar de vez.</p>
      <p><span class="cue">12:20</span>Ferramenta comum pra começar: plataforma de automação sem código, que conecta aplicativo por blocos visuais, combinada com uma IA generativa. É o caminho mais acessível pro primeiro projeto, sem exigir programação.</p>
      <p><span class="cue">17:00</span>E não pule o teste. Rode com uns 3 a 5 exemplos reais antes de deixar rodando sozinho, e ajuste o prompt sempre que sair fora do esperado. É normal refinar algumas vezes até ficar confiável. Próxima aula: o que acontece quando várias IAs trabalham juntas.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 18 min</div>
      <h3>Escreva o prompt do seu fluxo</h3>
      <p>Vamos escrever, na prática, a instrução que uma IA seguiria dentro de um fluxo automatizado.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Retome a automação que você desenhou na aula anterior (gatilho → IA → resultado).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escreva o prompt completo que a IA seguiria automaticamente a cada vez que o gatilho ativasse.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Crie 3 exemplos de entrada fictícios e escreva à mão a saída esperada para cada um.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Se possível, teste esse prompt em uma ferramenta de IA real usando os exemplos.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m5-l4'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Fechando o módulo, vamos ver o que acontece quando, em vez de um único agente, <strong>várias IAs especializadas trabalham em conjunto</strong> — cada uma responsável por uma parte de uma tarefa maior.</p>
        <h3>Por que dividir em múltiplos agentes</h3>
        <p>Assim como uma equipe humana funciona melhor com papéis definidos, sistemas de multi-agentes dividem uma tarefa complexa em partes menores, cada uma tratada por um "especialista": um agente pesquisa, outro escreve, outro revisa, outro organiza o resultado final.</p>
        <h3>Um exemplo de fluxo multi-agente</h3>
        <p>Imagine a tarefa "produzir um relatório semanal de notícias do setor": um primeiro agente busca as notícias, um segundo resume cada uma, um terceiro organiza por relevância, e um quarto formata o relatório final — cada etapa validada antes de passar para a próxima.</p>
        <h3>O papel humano nesse processo</h3>
        <p>Mesmo em sistemas mais sofisticados, definir <strong>pontos de checagem</strong> — momentos em que uma pessoa revisa antes de seguir adiante — continua sendo uma prática recomendada, especialmente para decisões com impacto real.</p>
        <div class="callout">💡 <strong>Você já viu isso na prática:</strong> a apostila em PDF desta trilha, que você gerou no início do curso, é um exemplo simples de "várias etapas automatizadas" — estrutura, capa, sumário e fechamento — encadeadas em sequência.</div>
      </div>
      <div class="infographic">
        <h4>Exemplo de fluxo multi-agente</h4>
        <div class="timeline">
          <div class="tl-item"><b>🔎</b><div class="tl-title">Agente pesquisador</div><div class="tl-desc">Busca as informações brutas necessárias para a tarefa.</div></div>
          <div class="tl-item"><b>✍</b><div class="tl-title">Agente redator</div><div class="tl-desc">Transforma a informação bruta em texto organizado.</div></div>
          <div class="tl-item"><b>🔍</b><div class="tl-title">Agente revisor</div><div class="tl-desc">Confere qualidade, coerência e possíveis erros antes de finalizar.</div></div>
          <div class="tl-item"><b>📦</b><div class="tl-title">Agente organizador</div><div class="tl-desc">Formata e entrega o resultado final, pronto para uso.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Multi-agentes</b><span>Aula 4 · Módulo 5 · 19 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>19:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Fechando o módulo com o conceito mais avançado da trilha até aqui: multi-agentes, várias IAs trabalhando juntas.</p>
      <p><span class="cue">02:40</span>A lógica é parecida com uma equipe humana bem organizada: em vez de uma pessoa fazer tudo, você divide em papéis especializados. Um agente pesquisa, outro escreve, outro revisa, outro organiza o resultado final.</p>
      <p><span class="cue">07:00</span>Pensa num exemplo: produzir um relatório semanal de notícias do setor. Um agente busca as notícias, outro resume cada uma, outro organiza por relevância, e outro formata o relatório final — cada etapa validada antes de passar pra próxima.</p>
      <p><span class="cue">11:40</span>E mesmo nesses sistemas mais sofisticados, o papel humano continua importante: definir pontos de checagem, momentos em que uma pessoa revisa antes de seguir adiante, principalmente quando a decisão tem impacto real.</p>
      <p><span class="cue">15:20</span>E olha só: você já viu isso na prática. A apostila em PDF que você gerou lá no início da trilha é um exemplo simples disso — várias etapas encadeadas em sequência, cada uma fazendo sua parte. Módulo 5 concluído. Falta só o último: a trilha profissional e certificação.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 15 min</div>
      <h3>Divida uma tarefa complexa em papéis</h3>
      <p>Vamos praticar o pensamento de multi-agentes aplicado a uma tarefa real.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha uma tarefa complexa que envolve várias etapas diferentes (ex: organizar um evento, escrever um trabalho de pesquisa).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Divida essa tarefa em pelo menos 3 papéis especializados diferentes.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Defina a ordem em que esses papéis deveriam atuar.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Marque em qual etapa você (humano) faria uma checagem antes de seguir adiante.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m6-l1'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Chegamos ao módulo final. Antes do estudo de caso e da certificação, vale entender <strong>como esse mercado está se organizando profissionalmente</strong> — e onde você pode se encaixar nele.</p>
        <h3>Não existe só "trabalhar com IA"</h3>
        <p>A área se divide em caminhos bem diferentes entre si: quem <strong>constrói</strong> os modelos (pesquisa e engenharia avançada), quem <strong>aplica</strong> IA em produtos e processos de uma empresa, e quem <strong>usa</strong> IA como ferramenta de trabalho em qualquer profissão — do marketing à advocacia, da saúde à educação.</p>
        <h3>Profissões que já existem hoje</h3>
        <p><strong>Engenheiro(a) de prompt:</strong> especializa-se em desenhar instruções eficazes para sistemas de IA em produtos reais.<br>
        <strong>Especialista em automação de IA:</strong> conecta ferramentas de IA a processos de negócio, como vimos no Módulo 5.<br>
        <strong>Analista de ética em IA:</strong> avalia riscos, vieses e impactos de sistemas antes de irem ao ar.<br>
        <strong>"Power user" de IA em qualquer área:</strong> o profissional que usa IA para multiplicar sua produtividade na própria especialidade.</p>
        <div class="callout">💡 <strong>Você não precisa escolher agora:</strong> o mais comum, e mais realista, é que a IA se torne uma habilidade a mais dentro da sua área de interesse atual — não necessariamente uma troca de profissão.</div>
      </div>
      <div class="infographic">
        <h4>3 caminhos no mercado de IA</h4>
        <div class="timeline">
          <div class="tl-item"><b>🔬</b><div class="tl-title">Construir</div><div class="tl-desc">Pesquisa e engenharia avançada de modelos — exige formação técnica aprofundada.</div></div>
          <div class="tl-item"><b>🛠</b><div class="tl-title">Aplicar</div><div class="tl-desc">Integrar IA a produtos e processos dentro de uma empresa.</div></div>
          <div class="tl-item"><b>🚀</b><div class="tl-title">Usar</div><div class="tl-desc">Aplicar IA como ferramenta de produtividade em qualquer profissão já existente.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Carreiras em IA</b><span>Aula 1 · Módulo 6 · 14 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>14:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Módulo final da trilha. Antes de fechar com estudo de caso e certificação, vale entender onde você se encaixa nesse mercado.</p>
      <p><span class="cue">01:50</span>Não existe só "trabalhar com IA" como um bloco único. Tem quem constrói os modelos, pesquisa avançada. Tem quem aplica IA dentro de produto e processo de empresa. E tem quem usa IA como ferramenta na profissão que já tem — em qualquer área.</p>
      <p><span class="cue">05:30</span>Algumas profissões que já existem: engenheiro de prompt, especializado em desenhar instrução eficaz pra produto real. Especialista em automação, conectando IA a processo de negócio, como vimos no módulo passado. Analista de ética em IA, avaliando risco e viés antes de um sistema ir ao ar. E o "power user", que usa IA pra multiplicar produtividade na própria área.</p>
      <p><span class="cue">10:00</span>E o mais importante: você não precisa escolher agora. O mais comum e realista é que IA vire uma habilidade a mais dentro da área que você já tem interesse — não necessariamente uma troca de profissão. Na próxima aula, vamos falar de portfólio.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 10 min</div>
      <h3>Encontre seu caminho</h3>
      <p>Reflita sobre como IA se conecta com seus interesses atuais.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Identifique qual dos 3 caminhos (construir, aplicar, usar) mais combina com você hoje.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Pense na sua área de interesse atual (ou futura) e como IA poderia se somar a ela.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Pesquise uma vaga de emprego real que mencione IA na sua área de interesse.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Anote uma habilidade dessa vaga que você já tem, e uma que ainda quer desenvolver.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m6-l2'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Um portfólio de projetos com IA é a forma mais concreta de mostrar, para uma escola, empresa ou cliente, que você sabe aplicar tudo que aprendeu nesta trilha — não apenas descrever conceitos.</p>
        <h3>O que vale a pena incluir</h3>
        <p>Não é necessário ter projetos grandiosos. Vale mais mostrar 3 ou 4 exemplos pequenos, bem documentados, do que um projeto ambicioso e incompleto. Bons candidatos: a automação que você desenhou no Módulo 5, um exemplo de prompt bem construído com antes/depois, ou uma atividade que você aplicou de verdade no seu dia a dia.</p>
        <h3>Como documentar um projeto</h3>
        <p>Para cada item do portfólio, inclua: <strong>o problema</strong> que motivou o projeto, <strong>a solução</strong> que você construiu com apoio de IA, e <strong>o resultado</strong> — mesmo que simples, como "economizei 20 minutos por semana nesta tarefa".</p>
        <div class="callout">💡 <strong>Honestidade é parte da credibilidade:</strong> é perfeitamente aceitável (e até recomendado) explicar exatamente onde e como você usou IA em cada projeto — isso demonstra domínio da ferramenta, não falta de esforço próprio.</div>
        <h3>Onde reunir o portfólio</h3>
        <p>Não precisa ser sofisticado: um documento simples, uma pasta compartilhada, ou até uma apresentação de poucos slides já cumprem o papel. O que importa é a clareza de cada exemplo, não a plataforma usada.</p>
      </div>
      <div class="infographic">
        <h4>Estrutura de cada item do portfólio</h4>
        <div class="timeline">
          <div class="tl-item"><b>①</b><div class="tl-title">Problema</div><div class="tl-desc">O que motivou esse projeto? Que necessidade real ele resolve?</div></div>
          <div class="tl-item"><b>②</b><div class="tl-title">Solução</div><div class="tl-desc">Como a IA foi usada, especificamente, para chegar lá?</div></div>
          <div class="tl-item"><b>③</b><div class="tl-title">Resultado</div><div class="tl-desc">O que mudou, mesmo que de forma simples e mensurável?</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Montando um portfólio</b><span>Aula 2 · Módulo 6 · 17 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>17:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Portfólio é a forma mais concreta de mostrar que você sabe aplicar o que aprendeu — não só descrever conceito de cabeça.</p>
      <p><span class="cue">02:30</span>Não precisa ser grandioso. Vale mais 3 ou 4 exemplos pequenos e bem documentados do que um projeto ambicioso e incompleto. A automação do módulo passado, um exemplo de prompt bem construído com antes e depois, uma atividade que você aplicou de verdade — tudo isso conta.</p>
      <p><span class="cue">06:50</span>Pra documentar cada projeto, use uma estrutura simples: qual era o problema, qual foi a solução construída com apoio de IA, e qual foi o resultado — mesmo que simples, tipo "economizei 20 minutos por semana".</p>
      <p><span class="cue">10:40</span>E um ponto importante sobre honestidade: é perfeitamente aceitável, e até recomendado, explicar exatamente onde e como você usou IA em cada projeto. Isso mostra domínio da ferramenta, não falta de esforço.</p>
      <p><span class="cue">13:50</span>Não precisa de plataforma sofisticada pra reunir isso — documento simples, pasta compartilhada, poucos slides já resolvem. O que importa é a clareza de cada exemplo. Próxima aula: o estudo de caso final da trilha.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 16 min</div>
      <h3>Documente seu primeiro item de portfólio</h3>
      <p>Vamos transformar algo que você já fez nesta trilha em um item de portfólio real.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha uma atividade prática que você já fez em uma aula anterior desta trilha.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escreva o problema que motivou essa atividade.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Descreva a solução, explicando especificamente como você usou IA.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escreva o resultado obtido, mesmo que simples.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Salve esse texto em um documento — esse é o primeiro item do seu portfólio.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 5 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m6-l3'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Chegou o estudo de caso final: a oportunidade de aplicar, em um problema completo, tudo que você aprendeu nas cinco unidades anteriores da trilha.</p>
        <h3>O desafio</h3>
        <p>Escolha um problema real — da sua escola, do seu trabalho ou da sua vida pessoal — que envolva pelo menos três destas etapas: <strong>entender o problema</strong>, <strong>conversar com uma IA usando boas técnicas de prompt</strong> (Módulo 2), <strong>criar ou verificar conteúdo</strong> (Módulo 3), e, se possível, <strong>pensar em como automatizar</strong> parte do processo (Módulo 5).</p>
        <h3>Estrutura sugerida para o estudo de caso</h3>
        <p><strong>1. Contexto:</strong> qual é o problema e por que ele importa?<br>
        <strong>2. Abordagem:</strong> como você usou IA para resolvê-lo, passo a passo?<br>
        <strong>3. Resultado:</strong> o que foi entregue ao final?<br>
        <strong>4. Reflexão:</strong> o que você faria diferente, sabendo o que sabe agora?</p>
        <div class="callout">💡 <strong>Não existe problema "pequeno demais":</strong> um bom estudo de caso mostra raciocínio claro, não necessariamente um problema complexo. Resolver bem algo simples vale mais do que tentar (e não terminar) algo ambicioso.</div>
        <h3>Você já está mais perto do que imagina</h3>
        <p>Se você completou as atividades práticas ao longo da trilha, provavelmente já tem material suficiente para montar esse estudo de caso — é hora de organizar o que já foi feito em uma narrativa coerente.</p>
      </div>
      <div class="infographic">
        <h4>4 partes do estudo de caso</h4>
        <div class="timeline">
          <div class="tl-item"><b>1</b><div class="tl-title">Contexto</div><div class="tl-desc">O problema e por que ele importa de verdade.</div></div>
          <div class="tl-item"><b>2</b><div class="tl-title">Abordagem</div><div class="tl-desc">O passo a passo de como a IA foi usada para resolvê-lo.</div></div>
          <div class="tl-item"><b>3</b><div class="tl-title">Resultado</div><div class="tl-desc">O que foi entregue, concretamente, ao final do processo.</div></div>
          <div class="tl-item"><b>4</b><div class="tl-title">Reflexão</div><div class="tl-desc">O que faria diferente, com o conhecimento que tem agora.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Estudo de caso final</b><span>Aula 3 · Módulo 6 · 25 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>25:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Chegou o estudo de caso final. A chance de aplicar, num problema completo, tudo que você viu nas cinco unidades anteriores.</p>
      <p><span class="cue">03:00</span>Escolha um problema real, da sua escola, do trabalho, ou da vida pessoal, que envolva pelo menos três coisas: entender o problema, conversar com IA usando boa técnica de prompt, criar ou verificar conteúdo, e se der, pensar em como automatizar parte do processo.</p>
      <p><span class="cue">08:30</span>Uma estrutura simples de seguir: contexto, qual é o problema e por que importa. Abordagem, como você usou IA passo a passo. Resultado, o que foi entregue no final. E reflexão, o que você faria diferente sabendo o que sabe agora.</p>
      <p><span class="cue">15:00</span>E um lembrete importante: não existe problema pequeno demais. Um bom estudo de caso mostra raciocínio claro, não necessariamente complexidade. Resolver bem algo simples vale muito mais do que tentar algo ambicioso e não terminar.</p>
      <p><span class="cue">20:30</span>E aqui vai uma boa notícia: se você fez as atividades práticas ao longo da trilha, você provavelmente já tem material suficiente pra montar isso. Agora é hora de organizar o que já foi feito numa narrativa coerente. Última aula: avaliação final e certificado.</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 30 min</div>
      <h3>Monte seu estudo de caso</h3>
      <p>Esta é a atividade mais longa da trilha — reserve um tempo tranquilo para desenvolvê-la com calma.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escolha o problema real que será o tema do seu estudo de caso.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escreva o contexto: o que é o problema e por que ele importa.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Descreva sua abordagem passo a passo, incluindo como usou IA.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Registre o resultado final obtido.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escreva sua reflexão final: o que faria diferente agora.</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 5 concluídas</span></div>
    </div>
  `
};

LESSON_CONTENT['m6-l4'] = {
  visual: `
    <div class="panel-grid">
      <div class="rich-text">
        <p>Você chegou à última aula da trilha "Inteligência Artificial: do Zero ao Profissional". Esta aula fecha o percurso com uma avaliação final e o caminho para a certificação.</p>
        <h3>O que a avaliação final considera</h3>
        <p>Diferente de uma prova tradicional de decoreba, a avaliação final desta trilha olha para o <strong>conjunto do que você construiu</strong>: as atividades práticas concluídas ao longo dos 6 módulos, e principalmente o estudo de caso da aula anterior — sua aplicação real do conhecimento.</p>
        <h3>O que você já deveria conseguir fazer</h3>
        <p>Ao chegar até aqui, espera-se que você seja capaz de: explicar o que é IA sem recorrer a mitos, escrever prompts eficazes usando as técnicas do Módulo 2, aplicar IA com responsabilidade e verificação (Módulo 3), reconhecer oportunidades de produtividade (Módulo 4), e entender a lógica por trás de agentes e automações (Módulo 5).</p>
        <h3>Emissão do certificado</h3>
        <p>Com o estudo de caso entregue e as atividades práticas concluídas, sua escola poderá emitir o certificado de conclusão da trilha — o registro formal de que você percorreu, do zero ao profissional, todo o caminho da Inteligência Artificial aplicada.</p>
        <div class="callout">🎉 <strong>Parabéns por chegar até aqui.</strong> O conhecimento técnico sobre IA muda rápido — mas a forma de pensar que você desenvolveu nesta trilha (questionar, verificar, testar, refinar) continua valendo, não importa quais ferramentas novas surjam depois.</div>
      </div>
      <div class="infographic">
        <h4>Sua jornada, em resumo</h4>
        <div class="timeline">
          <div class="tl-item"><b>1-2</b><div class="tl-title">Fundamentos e conversa</div><div class="tl-desc">O que é IA de verdade, e como se comunicar bem com ela.</div></div>
          <div class="tl-item"><b>3-4</b><div class="tl-title">Aplicação responsável</div><div class="tl-desc">Uso no dia a dia, ética, produtividade e negócios.</div></div>
          <div class="tl-item"><b>5-6</b><div class="tl-title">Avançado e profissional</div><div class="tl-desc">Agentes, automações, carreira e certificação final.</div></div>
        </div>
      </div>
    </div>
  `,
  audio: `
    <div class="audio-player">
      <div class="audio-top"><button class="play-btn" onclick="toggleAudio(this)">▶</button><div class="audio-meta"><b>Narração — Avaliação final e certificado</b><span>Aula 4 · Módulo 6 · 20 min</span></div></div>
      <div class="waveform" id="waveform"></div>
      <div class="audio-scrub"><span>0:00</span><span>20:00</span></div>
    </div>
    <div class="transcript">
      <p><span class="cue">00:00</span>Última aula da trilha inteira. Chegou até aqui, e essa aula fecha o percurso com avaliação final e caminho pra certificação.</p>
      <p><span class="cue">02:30</span>Diferente de prova de decoreba, essa avaliação olha pro conjunto do que você construiu: as atividades práticas dos 6 módulos, e principalmente o estudo de caso da aula passada, sua aplicação real do conhecimento.</p>
      <p><span class="cue">06:40</span>Ao chegar até aqui, você já deveria conseguir explicar o que é IA sem recorrer a mito, escrever prompt eficaz, aplicar IA com responsabilidade e verificação, reconhecer oportunidade de produtividade, e entender a lógica por trás de agente e automação.</p>
      <p><span class="cue">11:20</span>Com o estudo de caso entregue e as atividades concluídas, sua escola pode emitir o certificado de conclusão — o registro formal de que você percorreu, do zero ao profissional, todo esse caminho.</p>
      <p><span class="cue">15:00</span>E pra fechar: parabéns por chegar até aqui de verdade. O conhecimento técnico sobre IA muda rápido, mas a forma de pensar que você desenvolveu — questionar, verificar, testar, refinar — continua valendo, não importa quais ferramentas novas apareçam depois. Essa foi a trilha "Inteligência Artificial: do Zero ao Profissional".</p>
    </div>
  `,
  kin: `
    <div class="activity-card">
      <div class="badge">✋ Atividade prática · 10 min</div>
      <h3>Revisão final e próximos passos</h3>
      <p>A última atividade da trilha — um fechamento reflexivo antes da certificação.</p>
      <div class="checklist" id="checklist">
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Releia rapidamente as 5 atividades práticas que mais te marcaram na trilha.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Confirme que seu estudo de caso final está completo, com as 4 partes (contexto, abordagem, resultado, reflexão).</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Escreva uma frase sobre como pretende continuar aplicando IA depois desta trilha.</span></div>
        <div class="check-item" onclick="toggleCheck(this)"><div class="check-box">✓</div><span>Compartilhe essa frase com sua turma ou professor(a).</span></div>
      </div>
      <div class="activity-progress"><div class="bar"><i id="activity-bar" style="width:0%"></i></div><span id="activity-count">0 / 4 concluídas</span></div>
    </div>
  `
};


module.exports = { COURSE, LESSON_CONTENT };
