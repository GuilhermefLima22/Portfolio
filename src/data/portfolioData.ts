import type { Project, SkillGroup, EducationItem, CourseItem, CertificationItem } from '../types';

/**
 * ⚙️ ARQUIVO CENTRAL DE CONTEÚDO
 * Tudo que aparece no site vem daqui. Itens marcados com TODO precisam
 * ser confirmados/preenchidos por você antes de publicar.
 * Links vazios ('') não são renderizados — assim nunca aparece link quebrado.
 */
export const personalInfo = {
  name: 'Guilherme',
  fullName: 'Guilherme Lima Freitas',
  headline: 'Ciência da Computação · Mackenzie · Dados & IA',
  status: 'Buscando estágio em Dados / IA',
  university: 'Universidade Presbiteriana Mackenzie',
  course: 'Ciência da Computação',
  semester: '2º semestre',
  location: 'São Paulo, Brasil',
  bio: [
    'Estudo Ciência da Computação no Mackenzie (2º semestre) e concluí o ensino médio no Colégio Objetivo. Sempre fui curioso para entender como as coisas funcionam por trás dos panos, o que me levou a gostar de lógica, matemática e programação.',
    'Gosto de construir coisas reais: já desenvolvi chatbots com IA para WhatsApp, criei automações em nuvem e, na faculdade (Mackenzie), desenvolvi projetos práticos como o monitoramento de estufa com Arduino e a recriação do Termo em C no terminal.',
    'Hoje meu foco principal é a área de Dados e Inteligência Artificial. Busco um estágio onde eu possa aprender no dia a dia com a equipe, colocar a mão na massa e ajudar a resolver problemas de verdade.',
  ],
  email: 'contato.gui2206@gmail.com',
  github: 'https://github.com/GuilhermefLima22',
  linkedin: '', // TODO: https://linkedin.com/in/seu-usuario
  whatsapp: '5511989568771',
  whatsappDisplay: '+55 (11) 98956-8771',
  cvUrl: '/curriculo.html',
};

export const categoryLabels: Record<Project['category'], string> = {
  ia: 'IA & LLMs',
  automacao: 'Automação',
  iot: 'IoT & Hardware',
  algoritmos: 'Algoritmos',
};

export const projects: Project[] = [
  {
    id: 'dentinho',
    title: 'Dentinho',
    tagline: 'Chatbot com Terminal de Controle & API de Painel de Pedidos',
    category: 'ia',
    status: 'Em produção',
    description:
      'Ecossistema completo com chatbot no WhatsApp integrado ao Gemini 3.8 Flash, Terminal de Controle dedicado para monitoramento em tempo real e API com painel administrativo de pedidos e métricas dos últimos meses.',
    longDescription:
      'O Dentinho vai muito além de um bot de respostas: é uma infraestrutura de atendimento e dados. Possui um Terminal de Controle para monitoramento do fluxo da IA, testes e ajustes de treinamento, além de uma API completa que alimenta um Painel Web administrativo. O painel compila os pedidos registrados no banco de dados e exibe gráficos analíticos do desempenho da empresa ao longo dos últimos meses.',
    highlights: [
      'Cérebro alimentado pelo Gemini 3.8 Flash para compreensão de contexto e intenções',
      'Terminal de Controle do Bot para monitoramento de logs, status de serviço e testes rápidos',
      'API de Painel de Pedidos com dashboard analítico e gráficos de métricas mensais',
      'Banco de dados relacional para persistência e estruturação de agendamentos e pedidos',
      'Integração multi-dispositivo estável com o WhatsApp',
    ],
    techStack: ['Python', 'Gemini 3.8 Flash', 'FastAPI / REST', 'SQLite / SQL', 'Tailwind CSS', 'Chart.js'],
    facts: [
      { label: 'Linguagem & Backend', value: 'Python & FastAPI' },
      { label: 'IA Conversacional', value: 'Gemini 3.8 Flash' },
      { label: 'Módulos', value: 'Bot + Terminal + Painel' },
      { label: 'Métricas', value: 'Gráficos de Pedidos Mensais' },
    ],
    media: [
      {
        type: 'terminal',
        title: 'Terminal de Controle do Bot',
        description: 'Interface de monitoramento em tempo real do processamento de linguagem natural, logs de requisições, status dos serviços e estúdio de testes da IA.',
      },
      {
        type: 'dashboard',
        title: 'API & Painel Administrativo de Pedidos',
        description: 'Dashboard conectado à API com gráficos visuais (Chart.js) dos pedidos dos últimos meses, status de atendimentos, filtros e tabela de histórico.',
      },
      {
        type: 'image',
        title: 'Mascote & Expressões do Dentinho',
        description: 'Modelagem 3D e pacote de reações dinâmicas que humanizam a comunicação com o cliente.',
        imageUrl: '/dentinho/dentinho_avatar.png'
      }
    ],
    githubUrl: '',
    featured: true,
    color: '#C6FF3D',
  },
  {
    id: 'dsky',
    title: 'D&SKY',
    tagline: 'Automação de Postagem de Vídeos & Venda de Afiliados',
    category: 'automacao',
    status: 'Concluído',
    description:
      'Sistema de automação voltado para vendas com links de afiliados, combinando geração e agendamento automático de postagens de vídeos nas redes sem intervenção humana.',
    longDescription:
      'O D&SKY foi desenvolvido estrategicamente para monetização e conversão de afiliados. Ele automatiza tanto a esteira de publicação de vídeos de alta tração quanto a injeção e rastreamento dinâmico dos links de afiliados em cada publicação, otimizando o funil de vendas de forma 100% autônoma.',
    highlights: [
      'Automação de publicação contínua de vídeos em redes sociais',
      'Injeção e gerenciamento automatizado de links de afiliados',
      'Otimização do ciclo de postagens para maximizar conversão de vendas',
      'Execução em background sem necessidade de disparo manual',
    ],
    techStack: ['Python', 'Automação', 'APIs de Mídia', 'Marketing de Afiliados'],
    facts: [
      { label: 'Foco do Projeto', value: 'Vendas de Afiliados' },
      { label: 'Operação', value: 'Vídeos + Links Automáticos' },
    ],
    githubUrl: '',
    featured: true,
    color: '#FF7A45',
  },
  {
    id: 'portuguinha',
    title: 'Portuguinha Lava-Rápido',
    tagline: 'Agente de IA no WhatsApp com n8n & Gemini',
    category: 'automacao',
    status: 'Concluído',
    description:
      'Agente de IA conversacional para WhatsApp construído no n8n com Google Gemini Chat Model e Evolution API, gravando pedidos no Google Sheets e operando 24/7 em servidor cloud via VPN.',
    longDescription:
      'O Portuguinha é um agente inteligente de atendimento e agendamento para lava-rápido. O fluxo completo é orquestrado visualmente no n8n: recebe mensagens do WhatsApp via Evolution API através de webhooks, filtra e valida os tipos de dados via Switch, processa a intenção com o Google Gemini Chat Model retendo o contexto na Memória de Chats, e aciona ferramentas para salvar novos agendamentos no Google Sheets e notificar a equipe em tempo real.',
    highlights: [
      'Workflow visual no n8n publicado e operando em nuvem com túnel VPN seguro',
      'Agente de IA com Google Gemini Chat Model e memória de contexto',
      'Integração com Evolution API para envio e recepção de mensagens no WhatsApp',
      'Ferramenta conectada ao Google Sheets para registro automático de pedidos',
      'Disparo de alertas e notificações para os responsáveis pelo lava-rápido',
    ],
    techStack: ['n8n', 'Google Gemini', 'Evolution API (WhatsApp)', 'Google Sheets', 'Webhooks', 'VPN Dedicada'],
    facts: [
      { label: 'Orquestrador', value: 'n8n Workflow' },
      { label: 'Modelo de IA', value: 'Gemini Chat Model' },
      { label: 'Instância WhatsApp', value: 'Evolution API (Connected)' },
      { label: 'Mensagens Processadas', value: '1.167 mensagens' },
      { label: 'Contatos & Chats', value: '321 contatos / 101 chats' },
      { label: 'Integração', value: 'Google Sheets (Tools)' },
    ],
    media: [
      {
        type: 'dashboard',
        title: 'Painel da Evolution API (Instância Conectada)',
        description: 'Painel de gerenciamento da Evolution API em tempo real mostrando a instância lavarapido-bot conectada, com mais de 1.100 mensagens processadas e 320+ contatos (dados anonimizados).',
        imageUrl: '/portuguinha/evolution_dashboard.png'
      },
      {
        type: 'image',
        title: 'Workflow do n8n com IA & Evolution API',
        description: 'Fluxo orquestrado no n8n conectando Webhook da Evolution API, Switch de regras, Agente de IA com Google Gemini, Memória de chats e ferramentas para registro de pedidos e notificações automáticas.',
        imageUrl: '/portuguinha/n8n_workflow.png'
      }
    ],
    githubUrl: '',
    featured: true,
    color: '#45D4FF',
  },
  {
    id: 'estufa',
    title: 'Estufa com Arduino',
    tagline: 'Projeto acadêmico no Mackenzie · IoT & Hardware',
    category: 'iot',
    status: 'Concluído',
    description:
      'Projeto prático desenvolvido na faculdade (Mackenzie): estufa automatizada com Arduino e sensores para monitoramento e controle ambiental de plantas.',
    longDescription:
      'Projeto prático de hardware desenvolvido na faculdade (Universidade Presbiteriana Mackenzie), integrando programação e circuitos eletrônicos. O microcontrolador Arduino faz a leitura periódica dos sensores do ambiente e reage às condições da estufa. Além do circuito e da lógica em Linguagem C (Arduino), funcionou como laboratório prático de coleta e geração de dados do mundo físico.',
    highlights: [
      'Desenvolvido na faculdade (Universidade Presbiteriana Mackenzie)',
      'Leitura de sensores e controle de atuadores com Arduino',
      'Lógica embarcada de monitoramento em Linguagem C (Arduino)',
    ],
    techStack: ['Arduino', 'Linguagem C', 'Sensores IoT', 'Eletrônica', 'Mackenzie'],
    facts: [
      { label: 'Contexto', value: 'Faculdade (Mackenzie)' },
      { label: 'Plataforma', value: 'Arduino Uno' },
    ],
    githubUrl: '',
    featured: false,
    color: '#B58CFF',
  },
  {
    id: 'termo',
    title: 'Termo em C',
    tagline: 'Projeto acadêmico no Mackenzie · Algoritmos & Memória',
    category: 'algoritmos',
    status: 'Concluído',
    description:
      'Projeto desenvolvido na faculdade (Mackenzie): recriação do jogo Termo em linguagem C para o terminal, com manipulação de ponteiros, alocação de memória e arquivos.',
    longDescription:
      'Desenvolvido na faculdade (Universidade Presbiteriana Mackenzie) como projeto prático de ciência da computação. Toda a lógica do jogo foi programada em C puro para o terminal: leitura de dicionário em arquivo, sorteio de palavra secreta, validação de tentativas, manipulação de ponteiros e feedback visual letra a letra (correta, deslocada ou ausente).',
    highlights: [
      'Desenvolvido na faculdade (Universidade Presbiteriana Mackenzie)',
      'Lógica completa do jogo em C puro rodando no terminal',
      'Manipulação de ponteiros, alocação de memória e arquivos',
      'Feedback visual letra a letra com coloração no terminal',
    ],
    techStack: ['C Puro', 'Ponteiros & Memória', 'Terminal', 'Algoritmos', 'Mackenzie'],
    facts: [
      { label: 'Contexto', value: 'Faculdade (Mackenzie)' },
      { label: 'Linguagem', value: 'C (ANSI/ISO)' },
    ],
    githubUrl: '',
    featured: false,
    color: '#FFD23D',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    stage: '01',
    title: 'Linguagens & Fundamentos',
    description: 'A base sólida de computação e algoritmos.',
    skills: [
      { name: 'Python', usedIn: ['dentinho'] },
      { name: 'Linguagem C (Terminal & Memória)', usedIn: ['termo'] },
      { name: 'Linguagem C (Hardware & Sensores Arduino)', usedIn: ['estufa'] },
      { name: 'Matemática Discreta & Combinatória', learning: true },
    ],
  },
  {
    stage: '02',
    title: 'Análise de Dados & Google Colab',
    description: 'Trabalho analítico com datasets reais no Google Colab (Mackenzie).',
    skills: [
      { name: 'Pandas (DataFrames & Séries)', learning: true },
      { name: 'Limpeza, Filtragem & Enriquecimento de Dados', learning: true },
      { name: 'Estatística Descritiva & Quantis (Q1, Q2, Q3, Percentis)', learning: true },
      { name: 'Cálculo de Scores & Métricas Ponderadas', learning: true },
      { name: 'Consumo de APIs REST com Requests & JSON Parser', learning: true },
      { name: 'Google Colab & Jupyter Notebooks', learning: true },
    ],
  },
  {
    stage: '03',
    title: 'IA Generativa & Chatbots',
    description: 'Colocando modelos de linguagem de ponta em produção.',
    skills: [
      { name: 'Google Gemini 3.8 Flash (API & SDK)', usedIn: ['dentinho'] },
      { name: 'Engenharia de Prompt & Context Window', usedIn: ['dentinho'] },
      { name: 'Orquestração de Intenções em Tempo Real', usedIn: ['dentinho'] },
      { name: 'Terminal de Monitoramento de IA', usedIn: ['dentinho'] },
    ],
  },
  {
    stage: '04',
    title: 'Automação, Cloud & Integrações',
    description: 'Pipelines autônomos, esteiras de dados e hospedagem.',
    skills: [
      { name: 'Servidor Cloud com VPN Dedicada', usedIn: ['portuguinha'] },
      { name: 'Workflows & Webhooks no n8n', usedIn: ['portuguinha'] },
      { name: 'Automação de Mídias & Afiliados', usedIn: ['dsky'] },
      { name: 'APIs RESTful (Python & FastAPI)', usedIn: ['dentinho'] },
    ],
  },
  {
    stage: '05',
    title: 'Em Aprofundamento no Mackenzie',
    description: 'Tópicos avançados sendo explorados continuamente nos notebooks e laboratórios.',
    skills: [
      { name: 'Visualização de Dados (Matplotlib & Seaborn)', learning: true },
      { name: 'Modelagem Estatística & Probabilidade', learning: true },
      { name: 'SQL & Modelagem Relacional (SQLite / PostgreSQL)', learning: true },
      { name: 'Machine Learning (scikit-learn & Clustering)', learning: true },
    ],
  },
];

export const education: EducationItem[] = [
  {
    period: '2026 — em andamento',
    title: 'Bacharelado em Ciência da Computação',
    institution: 'Universidade Presbiteriana Mackenzie',
    detail: 'Cursando o 2º semestre. Foco em algoritmos, análise de dados e arquitetura computacional.',
    current: true,
  },
  {
    period: 'Concluído',
    title: 'Ensino Médio Completo',
    institution: 'Colégio Objetivo',
    detail: 'Formação básica com sólida base de raciocínio lógico e exatas.',
  },
];

export const currentCourses: CourseItem[] = [
  {
    title: 'Integrate Generative AI Into Your Data Workflow',
    provider: 'Google Cloud Skills Boost / Data & AI Path',
    status: 'Em andamento',
    category: 'Data & GenAI',
    hours: '12h 20m',
    description: 'Trilha voltada a profissionais de dados que desejam integrar IA Generativa e LLMs diretamente aos fluxos de processamento e análise analítica.',
  },
  {
    title: 'Deploy and Manage Generative AI Models',
    provider: 'Google Cloud Skills Boost / MLOps Path',
    status: 'Em andamento',
    category: 'MLOps & IA',
    hours: '18h 30m',
    description: 'Fundamentos de MLOps: ciclo de vida, implantação em produção, escalabilidade e monitoramento de modelos generativos.',
  },
  {
    title: 'Build and Modernize Applications With Generative AI',
    provider: 'Google Cloud Skills Boost / Developer Path',
    status: 'Em andamento',
    category: 'Engenharia de Software & IA',
    hours: '19h 01m',
    description: 'Desenvolvimento e modernização de arquiteturas de software potencializadas por modelos de linguagem e orquestração de IA.',
  },
  {
    title: 'Gemini for Data Scientists and Analysts',
    provider: 'Google Cloud Skills Boost / Data Science',
    status: 'Em andamento',
    category: 'Data Science',
    description: 'Uso prático do Gemini como copiloto e motor de análise exploratória, SQL e geração de insights para cientistas de dados.',
  },
];

export const certifications: CertificationItem[] = [
  {
    title: 'Certificação Windows 11',
    issuer: 'Ambiente & Sistema Operacional',
    status: 'Certificado',
  },
  {
    title: 'Certificação Pacote Office (Excel, Word, PowerPoint)',
    issuer: 'Produtividade & Análise de Planilhas',
    status: 'Certificado',
  },
];
