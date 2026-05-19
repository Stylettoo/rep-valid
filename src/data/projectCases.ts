import govBrImg from "../assets/gov-brr.png";

export type ProjectCaseSlug = "govbr-redesign" | "finance-dashboard" | "ecommerce-app" | "educacao-online";

export type ProjectCase = {
  slug: ProjectCaseSlug;
  title: string;
  eyebrow: string;
  summary: string;
  tags: string[];
  heroImageSrc?: string;
  visualVariant: "gov" | "finance" | "commerce" | "education";
  introLabel?: string;
  overview: {
    context: string;
    problem: string;
    goal: string;
  };
  role: {
    scope: string;
    tools: string[];
    timeline: string;
    team: string;
  };
  process: Array<{
    title: string;
    text: string;
  }>;
  challengePoints?: string[];
  findings?: string[];
  strategicDirections?: string[];
  solution: Array<{
    title: string;
    text: string;
  }>;
  mobile?: {
    title: string;
    text: string[];
  };
  results: string[];
  conclusion?: string[];
  nextProject: ProjectCaseSlug;
};

export const projectCases: ProjectCase[] = [
  {
    slug: "govbr-redesign",
    title: "Gov.br Redesign",
    eyebrow: "Case Study",
    summary:
      "Redesign conceitual da principal porta de entrada para servicos publicos digitais no Brasil, com foco em clareza, hierarquia da informacao e acesso mais direto aos servicos essenciais.",
    tags: ["UX/UI", "Research", "Prototype"],
    heroImageSrc: govBrImg,
    visualVariant: "gov",
    introLabel: "Projeto conceitual de estudo em UX/UI",
    overview: {
      context:
        "O Gov.br e a principal porta de entrada para autenticacao, emissao de documentos e interacao com servicos governamentais no Brasil. Por concentrar fluxos criticos em um unico ambiente, a plataforma precisa garantir clareza, eficiencia e acessibilidade para milhoes de usuarios com diferentes niveis de familiaridade digital.",
      problem:
        "A experiencia atual apresenta excesso de informacoes simultaneas, baixa hierarquia visual e uma organizacao mais centrada no sistema do que no comportamento do usuario. Isso aumenta o esforco cognitivo, dificulta a identificacao de acoes prioritarias e torna tarefas simples mais demoradas do que o necessario.",
      goal:
        "Reestruturar a jornada de uso para reduzir a carga cognitiva, melhorar a hierarquia das informacoes e tornar o acesso aos servicos mais direto, intuitivo e eficiente.",
    },
    role: {
      scope: "UX/UI Designer",
      tools: ["Figma", "Research", "Wireframe", "Prototype"],
      timeline: "4 semanas",
      team: "Projeto conceitual individual",
    },
    challengePoints: [
      "Usuarios com baixo nivel de letramento digital.",
      "Diferentes perfis e objetivos de uso.",
      "Alta variedade de servicos e categorias.",
      "Demandas criticas, como acesso a documentos e autenticacao.",
    ],
    process: [
      {
        title: "Analise da experiencia atual",
        text:
          "A analise da plataforma mostrou um padrao recorrente de friccoes: informacoes demais na mesma tela, pouca diferenciacao entre acoes principais e secundarias e uma navegacao que exige interpretacao constante do usuario.",
      },
      {
        title: "Descobertas-chave",
        text:
          "Ficou claro que o problema nao estava na falta de funcionalidade, mas na forma como ela era apresentada. A linguagem, a estrutura e a distribuicao visual nao acompanhavam a logica mental de quem queria apenas resolver uma tarefa.",
      },
      {
        title: "Direcionamento estrategico",
        text:
          "A partir da premissa de que o usuario nao quer navegar, e sim resolver, o projeto passou a priorizar acoes em vez de informacoes, organizar conteudos com base em tarefas e tornar a navegacao mais previsivel e clara em cada etapa da jornada.",
      },
    ],
    findings: [
      "Excesso de informacoes simultaneas sem hierarquia clara.",
      "Navegacao pouco progressiva, exigindo interpretacao constante.",
      "Acoes principais sem destaque suficiente.",
      "Estrutura e linguagem desalinhadas com a logica mental do usuario.",
    ],
    strategicDirections: [
      "Priorizar acoes em vez de informacoes.",
      "Organizar conteudos com base em tarefas.",
      "Reduzir a carga cognitiva.",
      "Tornar a navegacao previsivel.",
      "Garantir clareza em cada etapa da jornada.",
    ],
    solution: [
      {
        title: "Hierarquia visual mais clara",
        text:
          "A proposta de redesign reorganiza a interface para destacar acoes principais e reduzir a competicao entre elementos na tela. Com isso, o usuario consegue identificar mais rapidamente o que fazer e onde clicar.",
      },
      {
        title: "Conteudo orientado a tarefas",
        text:
          "A estrutura foi reformulada para seguir uma logica orientada a tarefas, e nao apenas a categorias internas do sistema. Isso aproxima a interface da intencao real do usuario e encurta o caminho ate a conclusao da acao.",
      },
      {
        title: "Experiencia mobile priorizada",
        text:
          "Como grande parte dos acessos acontece por dispositivos moveis, a nova experiencia tambem foi pensada para interacoes mais rapidas, diretas e acessiveis em telas menores, reduzindo etapas e melhorando a escaneabilidade.",
      },
    ],
    mobile: {
      title: "Experiencia mobile",
      text: [
        "Outro ponto central foi a priorizacao da experiencia mobile, considerando que grande parte dos acessos acontece por dispositivos moveis e exige interacoes rapidas e diretas.",
        "A nova interface prioriza acoes objetivas, reduz etapas e melhora a navegacao em telas menores.",
        "Projetado para uso real: rapido, direto e acessivel.",
      ],
    },
    results: [
      "Reducao do tempo de decisao ao destacar melhor as acoes principais.",
      "Aumento da eficiencia ao tornar a jornada mais direta e previsivel.",
      "Melhor compreensao da interface, com menos carga cognitiva e menor chance de erro.",
    ],
    conclusion: [
      "Este projeto propõe uma mudanca de perspectiva: sair de uma estrutura centrada no sistema para uma experiencia centrada no usuario.",
      "Mais do que uma atualizacao visual, trata-se de uma reestruturacao estrategica da forma como os servicos sao apresentados e consumidos.",
      "Simplificar nao e remover funcionalidades, e garantir que elas possam ser utilizadas com clareza e direcionamento.",
    ],
    nextProject: "finance-dashboard",
  },
  {
    slug: "finance-dashboard",
    title: "Finance Dashboard",
    eyebrow: "Case Study",
    summary:
      "Dashboard financeiro pensado para leitura rapida, comparacao de dados e tomada de decisao com menos ruido.",
    tags: ["UX/UI", "Dashboard"],
    visualVariant: "finance",
    overview: {
      context:
        "A proposta do dashboard era transformar dados fragmentados em uma leitura mais objetiva e acionavel para o usuario.",
      problem:
        "O excesso de informacao em interfaces financeiras costuma dificultar entendimento imediato e esconder prioridades importantes.",
      goal:
        "Organizar indicadores, graficos e blocos de apoio em uma experiencia que favorece leitura, foco e controle.",
    },
    role: {
      scope: "UX/UI Designer",
      tools: ["Figma", "Design System", "Dashboard Thinking"],
      timeline: "3 semanas",
      team: "Projeto conceitual individual",
    },
    process: [
      {
        title: "Priorizacao",
        text:
          "Separei os indicadores realmente essenciais daquilo que poderia entrar como apoio secundario.",
      },
      {
        title: "Fluxo de leitura",
        text:
          "Modelei a tela para funcionar em camadas, permitindo que o usuario entenda o panorama geral antes de aprofundar os dados.",
      },
      {
        title: "Consistencia",
        text:
          "Padronizei componentes de cards, graficos e blocos metricos para manter ritmo visual e previsibilidade.",
      },
    ],
    solution: [
      {
        title: "Resumo primeiro",
        text:
          "O dashboard abre com uma leitura sintetica, criando contexto antes da exploracao detalhada.",
      },
      {
        title: "Comparacao facilitada",
        text:
          "Os blocos foram desenhados para favorecer contraste entre periodos, valores e status sem sobrecarregar a tela.",
      },
      {
        title: "Escala visual clara",
        text:
          "Titulos, metricas e graficos seguem uma hierarquia que reduz esforco cognitivo e acelera interpretacao.",
      },
    ],
    results: [
      "Experiencia mais orientada a decisao.",
      "Leitura de dados mais rapida e menos cansativa.",
      "Maior consistencia visual entre componentes analiticos.",
    ],
    nextProject: "ecommerce-app",
  },
  {
    slug: "ecommerce-app",
    title: "E-commerce App",
    eyebrow: "Case Study",
    summary:
      "Aplicativo com navegacao simplificada e foco em usabilidade para tornar descoberta e checkout mais diretos.",
    tags: ["UX/UI", "Wireframe", "App"],
    visualVariant: "commerce",
    overview: {
      context:
        "O desafio foi organizar uma experiencia mobile capaz de equilibrar descoberta de produto e eficiencia de compra.",
      problem:
        "Muitos fluxos de e-commerce aumentam friccao no mobile por excesso de etapas, escolhas e interrupcoes no caminho.",
      goal:
        "Criar um fluxo mais fluido, com menos ruidos de interface e mais confianca durante a jornada de compra.",
    },
    role: {
      scope: "UX/UI Designer",
      tools: ["Figma", "Wireframe", "Prototype"],
      timeline: "3 semanas",
      team: "Projeto conceitual individual",
    },
    process: [
      {
        title: "Jornada",
        text:
          "Mapeei descoberta, detalhe de produto, carrinho e checkout para identificar onde a experiencia perdia ritmo.",
      },
      {
        title: "Reducao de friccao",
        text:
          "Agrupei informacoes, removi excesso de passos e busquei tornar cada decisao mais evidente para o usuario.",
      },
      {
        title: "Refino mobile",
        text:
          "Ajustei espacamentos, areas clicaveis e hierarquia de componentes para uma navegacao mais intuitiva em telas menores.",
      },
    ],
    solution: [
      {
        title: "Descoberta mais clara",
        text:
          "A navegacao ajuda o usuario a localizar categorias e produtos sem excesso de interferencia visual.",
      },
      {
        title: "Detalhe objetivo",
        text:
          "As informacoes mais importantes do produto aparecem com prioridade, favorecendo comparacao e decisao.",
      },
      {
        title: "Checkout mais direto",
        text:
          "O fluxo reduz interrupcoes e deixa a conclusao da compra mais previsivel e segura.",
      },
    ],
    results: [
      "Jornada mobile mais fluida.",
      "Menos atrito entre navegacao e compra.",
      "Maior sensacao de clareza durante o checkout.",
    ],
    nextProject: "educacao-online",
  },
  {
    slug: "educacao-online",
    title: "Educacao Online",
    eyebrow: "Case Study",
    summary:
      "Plataforma educacional pensada para consumo de conteudo, navegacao simples e boa retencao ao longo da jornada.",
    tags: ["UX/UI", "E-learning", "Web"],
    visualVariant: "education",
    overview: {
      context:
        "A proposta foi construir uma experiencia de estudo que equilibrasse clareza de conteudo, continuidade e senso de progresso.",
      problem:
        "Ambientes educacionais frequentemente perdem usuario por excesso de blocos, navegacao confusa e pouca orientacao sobre o proximo passo.",
      goal:
        "Organizar a plataforma para tornar o aprendizado mais leve, continuo e facil de acompanhar.",
    },
    role: {
      scope: "UX/UI Designer",
      tools: ["Figma", "UX Writing", "Prototype"],
      timeline: "4 semanas",
      team: "Projeto conceitual individual",
    },
    process: [
      {
        title: "Mapeamento de conteudo",
        text:
          "Estruturei modulos, aulas e trilhas de forma a facilitar leitura de progresso e continuidade.",
      },
      {
        title: "Priorizacao de interface",
        text:
          "Defini uma hierarquia mais simples entre navegacao, conteudo principal e elementos de apoio.",
      },
      {
        title: "Acompanhamento",
        text:
          "Refinei estados e componentes para que o usuario entenda onde esta, o que concluiu e qual e o proximo passo.",
      },
    ],
    solution: [
      {
        title: "Conteudo no centro",
        text:
          "A tela valoriza a aula e reduz elementos paralelos para manter foco no aprendizado.",
      },
      {
        title: "Progresso visivel",
        text:
          "A experiencia deixa clara a trilha percorrida e reforca senso de continuidade entre modulos.",
      },
      {
        title: "Navegacao simples",
        text:
          "Os caminhos principais foram simplificados para diminuir esforco e aumentar retencao.",
      },
    ],
    results: [
      "Experiencia educacional mais organizada e leve.",
      "Maior clareza sobre progresso e continuidade.",
      "Interface mais focada no conteudo e menos dispersa.",
    ],
    nextProject: "govbr-redesign",
  },
];

export const projectCaseMap = Object.fromEntries(
  projectCases.map((project) => [project.slug, project]),
) as Record<ProjectCaseSlug, ProjectCase>;
