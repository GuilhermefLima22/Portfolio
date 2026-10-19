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
    'Gosto de construir coisas reais: já desenvolvi chatbots com IA e Visão Computacional para WhatsApp, criei automações com Docker e n8n e, na faculdade (Mackenzie), desenvolvi projetos práticos como o monitoramento de estufa com Arduino e a recriação do Termo em C no terminal.',
    'Hoje meu foco principal é a área de Dados e Inteligência Artificial. Busco um estágio onde eu possa aprender no dia a dia com a equipe, colocar a mão na massa e ajudar a resolver problemas de verdade.',
  ],
  email: 'contato.gui2206@gmail.com',
  github: 'https://github.com/GuilhermefLima22',
  linkedin: 'https://www.linkedin.com/in/guilherme-freitas-3b8883381',
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
    tagline: 'Automação Completa de Operação · IA, Visão Computacional & n8n',
    category: 'automacao',
    status: 'Em produção',
    description:
      'Ecossistema em produção que atende 99% da operação do lava-rápido via WhatsApp: recepcionista IA para clientes, Modo Pátio para administradores (registro presencial por foto com OCR de placa e veículo), aviso automático de "Carro Pronto" e controle remoto do bot.',
    longDescription:
      'Desenvolvido para resolver de ponta a ponta a rotina real do Lava-Rápido do Portuga, o sistema unifica 4 fluxos inteligentes no n8n integrados à Evolution API e ao Google Sheets. Além do Agente Recepcionista que atende os clientes automaticamente, conta com números de Admin para gestão rápida de pátio: basta enviar uma foto do carro com o valor na legenda para a Visão Computacional (Gemini Vision) ler a placa (OCR), identificar modelo e porte, deduzir o serviço pela tabela de preços e recuperar o histórico do cliente na planilha. Quando o serviço termina, responder "ok" na mensagem do pedido atualiza o status para "Pronto" e avisa o cliente no privado. Os administradores também controlam o estado do bot em tempo real pelo WhatsApp (ativar, desativar e status).',
    highlights: [
      'Modo Pátio (Admin): foto do carro + valor aciona OCR da placa, identifica modelo/porte, deduz o serviço e puxa histórico do cliente',
      'Comando "ok" (Carro Pronto): responder à mensagem do pedido atualiza a planilha e notifica o cliente automaticamente no WhatsApp',
      'Controle de Estado Remoto: números de Admin ativam, desativam e consultam o status do bot direto na conversa',
      'Recepcionista IA (Gemini 3.1 Flash Lite) com memória de contexto, coleta em bloco e gravação automática no Google Sheets',
      'Blindagens de Produção: trava anti-duplicidade diária da mesma placa e descarte de mensagens antigas (> 5 min) pós-reconexão',
      'Infraestrutura local conteinerizada em Docker Compose (n8n, Evolution API, PostgreSQL e Redis) com scripts .bat de inicialização automática',
    ],
    techStack: [
      'n8n',
      'Gemini Vision (OCR)',
      'Gemini 3.1 Flash',
      'Evolution API',
      'Google Sheets CRM',
      'Docker & Redis',
      'JavaScript',
    ],
    facts: [
      { label: 'Cobertura Operacional', value: '99% da Operação Real' },
      { label: 'IA & Visão Computacional', value: 'Gemini Flash + Vision OCR' },
      { label: 'Modo Pátio (Admin)', value: 'Foto + Valor → Registro' },
      { label: 'Mensagens Processadas', value: '1.167+ mensagens' },
      { label: 'Contatos & Chats', value: '321 contatos / 101 chats' },
      { label: 'Persistência & CRM', value: 'Google Sheets em Tempo Real' },
    ],
    media: [
      {
        type: 'image',
        title: 'Arquitetura Completa no n8n (4 Fluxos Integrados)',
        description: 'Workflow em produção no n8n unificando: (1) Aviso de Carro Pronto via comando "ok", (2) Modo Pátio por Foto com Gemini Vision OCR para números Admin, (3) Agente Recepcionista IA com Memória e Tools, e (4) Controle de Estado Remoto (ativar/desativar/status).',
        imageUrl: '/portuguinha/n8n_workflow.png'
      },
      {
        type: 'dashboard',
        title: 'Painel da Evolution API (Instância Conectada)',
        description: 'Painel de gerenciamento da Evolution API em tempo real mostrando a instância lavarapido-bot conectada, com mais de 1.160 mensagens processadas e 320+ contatos (dados anonimizados).',
        imageUrl: '/portuguinha/evolution_dashboard.png'
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
  {
    id: 'display7seg',
    title: 'Display de 7 Segmentos (BCD)',
    tagline: 'Projeto acadêmico no Mackenzie · Circuitos Digitais & Logisim',
    category: 'iot',
    status: 'Concluído',
    description:
      'Projeto desenvolvido na faculdade (Mackenzie): decodificador BCD para display de 7 segmentos de 0 a 9, com tabela-verdade, simplificação por Mapa de Karnaugh e circuito no Logisim.',
    longDescription:
      'Desenvolvido na disciplina de Circuitos Digitais na Universidade Presbiteriana Mackenzie. O projeto consistiu em projetar e implementar um decodificador BCD (Binary Coded Decimal) de 4 bits para acionar um display de 7 segmentos e representar os números de 0 a 9. Para cada um dos 7 segmentos (a até g), foi construída a tabela-verdade e aplicado o Mapa de Karnaugh para simplificação das expressões booleanas, minimizando o número de portas lógicas antes da montagem e simulação funcional no Logisim.',
    highlights: [
      'Desenvolvido na disciplina de Circuitos Digitais (Universidade Presbiteriana Mackenzie)',
      'Conversão de 4 bits de entrada BCD para controle individual dos 7 segmentos (a até g)',
      'Simplificação lógica de expressões booleanas usando Mapa de Karnaugh para cada segmento',
      'Montagem, otimização e simulação do circuito digital completo no Logisim',
    ],
    techStack: ['Logisim', 'Circuitos Digitais', 'Mapa de Karnaugh', 'Lógica Booleana', 'Mackenzie'],
    facts: [
      { label: 'Contexto', value: 'Faculdade (Mackenzie)' },
      { label: 'Disciplina', value: 'Circuitos Digitais' },
      { label: 'Ambiente', value: 'Logisim Simulator' },
      { label: 'Entradas / Saídas', value: '4 bits BCD → 7 Segmentos (0-9)' },
    ],
    githubUrl: '',
    featured: false,
    color: '#38BDF8',
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
      { name: 'Circuitos Digitais & Logisim', usedIn: ['display7seg'] },
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
    title: 'IA Generativa, Visão & Chatbots',
    description: 'Colocando modelos de linguagem e visão computacional em produção.',
    skills: [
      { name: 'Google Gemini (API, SDK & Chat Models)', usedIn: ['dentinho', 'portuguinha'] },
      { name: 'Visão Computacional & OCR de Placas (Gemini Vision)', usedIn: ['portuguinha'] },
      { name: 'Engenharia de Prompt & Context Window', usedIn: ['dentinho', 'portuguinha'] },
      { name: 'Orquestração de Intenções & Governança Remota', usedIn: ['dentinho', 'portuguinha'] },
      { name: 'Terminal de Monitoramento de IA', usedIn: ['dentinho'] },
    ],
  },
  {
    stage: '04',
    title: 'Automação, Docker & Integrações',
    description: 'Pipelines autônomos, esteiras de dados e conteinerização local.',
    skills: [
      { name: 'Workflows, Webhooks & Tools no n8n', usedIn: ['portuguinha'] },
      { name: 'Docker Compose (Evolution API, Postgres & Redis)', usedIn: ['portuguinha'] },
      { name: 'Integração Google Sheets CRM & WhatsApp', usedIn: ['portuguinha'] },
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
    title: 'Trilha de IA Generativa & MLOps',
    provider: 'Google Cloud Skills Boost / Data & MLOps',
    status: 'Em andamento',
    category: 'GenAI & MLOps',
    hours: '30h',
    description: 'Integração de IA Generativa em fluxos de trabalho e fundamentos de ciclo de vida e implantação de modelos.',
  },
  {
    title: 'Gemini for Data Scientists and Analysts',
    provider: 'Google Cloud Skills Boost / Data Science',
    status: 'Em andamento',
    category: 'Data Science',
    hours: '10h',
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
