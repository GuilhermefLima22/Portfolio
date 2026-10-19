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
    tagline: 'Em Uso em Lava-Rápido Real · IA, Visão Computacional & n8n',
    category: 'automacao',
    status: 'Finalizado',
    description:
      'Sistema desenvolvido para um lava-rápido real e utilizado no dia a dia da operação via WhatsApp: une recepcionista com IA para clientes, registro presencial no pátio por foto (OCR de placa e modelo via Gemini Vision), roteamento B2B automático para a Oficina Jcar, aviso de "Carro Pronto" e travas de segurança.',
    longDescription:
      'Criado e implementado para resolver de ponta a ponta a rotina de um estabelecimento real (Lava-Rápido do Portuga), o projeto unifica 5 módulos inteligentes no n8n integrados à Evolution API e ao Google Sheets. Além do Agente Recepcionista que atende clientes no WhatsApp, conta com Modo Pátio para os administradores: basta enviar a foto do veículo para o Gemini Vision ler a placa (OCR), identificar modelo e porte, deduzir o serviço pela tabela de preços e puxar o histórico. Inclui regra B2B para a parceira Oficina Jcar (Jeferson): ao detectar "Jcar" ou "Jeferson" na legenda, aplica tabela fixa automática por porte (R$ 50 Hatch/Sedan, R$ 65 SUV/Picape) e grava em aba exclusiva na planilha. Quando o serviço termina, responder "ok" na mensagem do pedido atualiza o status para "Pronto" e avisa o cliente. Conta ainda com travas de segurança de produção: bloqueio de placa duplicada no dia, filtro anti-mensagens antigas (> 5 min) e trava diária de inicialização que envia o aviso de sistema online apenas no primeiro boot do dia.',
    highlights: [
      'Modo Pátio (Vision OCR): foto do veículo aciona leitura de placa (Mercosul/antiga), modelo e porte com retry automático (4x) e puxa histórico do cliente',
      'Parceria B2B (Oficina Jcar): identifica "Jcar/Jeferson" na legenda, aplica tabela fixa por porte (R$ 50 / R$ 65) sem precisar digitar valor e separa em aba exclusiva no Sheets',
      'Dashboard Financeiro Automático: aba de Resumo no Google Sheets com fórmulas dinâmicas que avançam de mês sozinhas todo dia 1º, consolidando receitas da Oficina Jcar, Lava-Rápido geral e histórico acumulado em tempo real',
      'Comando "ok" (Carro Pronto): responder à mensagem do pedido atualiza a planilha para "Pronto" e notifica o cliente automaticamente no WhatsApp',
      'Travas de Segurança & Anti-Spam: bloqueio de placa duplicada no mesmo dia, descarte de mensagens antigas (> 5 min) e trava diária que envia o aviso de "sistema online" apenas no 1º boot do dia',
      'Administração via WhatsApp: comandos exclusivos da gerência (ativar, desativar e status) controlam o estado global do bot em tempo real',
      'Recepcionista IA (Gemini Flash Lite) com memória de contexto, coleta inteligente e infraestrutura local em Docker Compose (n8n, Evolution API, Postgres e Redis)',
    ],
    techStack: [
      'n8n',
      'Gemini Vision (OCR)',
      'Gemini Flash Lite',
      'Evolution API',
      'Google Sheets CRM',
      'Docker & Redis',
      'JavaScript',
    ],
    facts: [
      { label: 'Aplicação Prática', value: 'Lava-Rápido Real em Operação' },
      { label: 'Volume Real', value: '1.167+ msgs · 321 contatos' },
      { label: 'Arquitetura n8n', value: '5 Módulos + Vision OCR' },
      { label: 'Regra B2B (Jcar)', value: 'Tabela Fixa + Aba Exclusiva' },
      { label: 'Dashboard Financeiro', value: 'Resumo com Virada Mensal Automática' },
      { label: 'Travas de Segurança', value: 'Anti-Duplicidade & Anti-Spam' },
      { label: 'Infraestrutura', value: 'Docker Compose + Evolution API' },
    ],
    media: [
      {
        type: 'image',
        title: 'Arquitetura Completa no n8n (5 Módulos & Travas de Segurança)',
        description: 'Workflow em produção no n8n dividido em 5 módulos: (1) Recepção & Segurança, (2) Modo Pátio & Oficina Jcar com Gemini Vision OCR, (3) Aviso de Carro Pronto via comando "ok", (4) Atendimento Inteligente aos Clientes e (5) Comandos da Gerência & Trava Diária de Inicialização.',
        imageUrl: '/portuguinha/n8n_workflow.png'
      },
      {
        type: 'dashboard',
        title: 'Painel da Evolution API (Instância Conectada)',
        description: 'Painel de gerenciamento da Evolution API em tempo real mostrando a instância lavarapido-bot conectada, com mais de 1.160 mensagens processadas e 320+ contatos (dados anonimizados).',
        imageUrl: '/portuguinha/evolution_dashboard.png'
      }
    ],
    githubUrl: 'https://github.com/GuilhermefLima22/Portuguinha-',
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
    tagline: 'Projeto acadêmico no Mackenzie · Algoritmos, Busca & Manipulação de Arquivos',
    category: 'algoritmos',
    status: 'Concluído',
    description:
      'Projeto desenvolvido na faculdade (Mackenzie): recriação do jogo Termo (Wordle) em linguagem C para o terminal, com leitura de dicionário em arquivo, busca sequencial, validação em duas passagens e cronometragem.',
    longDescription:
      'Desenvolvido na faculdade (Universidade Presbiteriana Mackenzie) como projeto prático de algoritmos e programação em C. O programa carrega um dicionário externo (sem_acentos.txt) filtrando palavras de 5 letras em uma matriz em memória, sorteia a palavra secreta com semente aleatória e valida cada palpite com Busca Sequencial. O algoritmo de verificação em duas passagens utiliza um vetor de controle (letras_usadas) para sinalizar letras na posição exata (^), letras existentes na posição errada (!) e letras ausentes (X) sem falsos positivos em letras repetidas, além de medir o tempo total da partida com time_t.',
    highlights: [
      'Código-fonte completo em C ANSI disponível para inspeção direto no portfólio',
      'Leitura e filtragem de dicionário em arquivo (sem_acentos.txt) para matriz de até 10.000 palavras',
      'Validação de palpites existentes usando algoritmo de Busca Sequencial e normalização (tolower)',
      'Algoritmo de dicas em 2 passagens (^ posição certa, ! deslocada, X ausente) com controle de letras repetidas',
      'Cronometragem de partida com <time.h> e geração de log estruturado do jogador',
    ],
    techStack: ['Linguagem C', 'Busca Sequencial', 'Manipulação de Arquivos', 'Strings & Matrizes', 'Mackenzie'],
    facts: [
      { label: 'Contexto', value: 'Faculdade (Mackenzie)' },
      { label: 'Algoritmo de Validação', value: 'Busca Sequencial + 2 Passagens' },
      { label: 'Capacidade Dicionário', value: 'Até 10.000 palavras (FILE*)' },
      { label: 'Bibliotecas C', value: 'stdio, string, stdlib, time, ctype' },
    ],
    codeSnippet: {
      filename: 'termo.c',
      language: 'c',
      code: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include <ctype.h>

#define MAX_PALAVRAS 10000 
#define MAX_LETRAS 10 

int buscaSequencial(char dicionario[][MAX_LETRAS], int tamanho, char *palavra) {
    for (int i = 0; i < tamanho; i++) {
        if (strcmp(dicionario[i], palavra) == 0) {
            return i;
        }
    }
    return -1; 
}

int main(void) {
    char dicionario[MAX_PALAVRAS][MAX_LETRAS]; 
    int total_palavras = 0;
    char linha_arquivo[100]; 
    
    char palavra_secreta[MAX_LETRAS]; 
    char palpite[MAX_LETRAS];

    FILE *arq = fopen("sem_acentos.txt", "r");
    if (arq == NULL) {
        printf("Erro ao abrir o arquivo txt.\\n"); 
        return 1;
    }

    while (fgets(linha_arquivo, sizeof(linha_arquivo), arq) != NULL) {
        linha_arquivo[strcspn(linha_arquivo, "\\n")] = '\\0';
        
        if (strlen(linha_arquivo) == 5) {
            strcpy(dicionario[total_palavras], linha_arquivo); 
            total_palavras++;
        }
    }
    fclose(arq);

    srand(time(NULL)); 
    int indice_sorteado = rand() % total_palavras; 
    strcpy(palavra_secreta, dicionario[indice_sorteado]); 
    
    time_t tempo_inicio = time(NULL); 

    int tentativas = 0;
    int ganhou = 0; 

    printf("\\nBEM-VINDO AO WORDLE (TERMO)!\\n");
    printf("Tente adivinhar a palavra de 5 letras.\\n\\n");

    while (tentativas < 6 && ganhou == 0) {
        printf("Tentativa %d/6. Digite seu palpite: ", tentativas + 1);
        scanf("%s", palpite);

        for (int i = 0; palpite[i] != '\\0'; i++) {
            palpite[i] = tolower(palpite[i]);
        }

        int posicao = buscaSequencial(dicionario, total_palavras, palpite);

        if (posicao == -1) {
            printf("Palavra invalida! Tente novamente com uma palavra que exista.\\n");
            continue; 
        }

        tentativas++; 

        printf("\\n+-----------+\\n| ");
        for (int i = 0; i < 5; i++) {
            printf("%c ", palpite[i]);
        }
        printf("|\\n| ");
        
        int letras_usadas[5] = {0, 0, 0, 0, 0}; 
        char dicas[5] = {'X', 'X', 'X', 'X', 'X'}; 
        
        for (int i = 0; i < 5; i++) {
            if (palpite[i] == palavra_secreta[i]) {
                dicas[i] = '^';
                letras_usadas[i] = 1; 
            }
        }
        
        for (int i = 0; i < 5; i++) {
            if (dicas[i] == 'X') { 
                for (int j = 0; j < 5; j++) {
                    if (palpite[i] == palavra_secreta[j] && letras_usadas[j] == 0) {
                        dicas[i] = '!';
                        letras_usadas[j] = 1; 
                        break; 
                    }
                }
            }
        }
        
        for (int i = 0; i < 5; i++) {
            printf("%c ", dicas[i]);
        }
        printf("|\\n+-----------+\\n\\n");

        if (strcmp(palpite, palavra_secreta) == 0) {
            ganhou = 1;
            printf("Parabens! Voce acertou a palavra!\\n");
        }
    }

    if (ganhou == 0) {
        printf("Que pena! Voce esgotou suas 6 tentativas.\\n");
        printf("A palavra secreta era: %s\\n\\n", palavra_secreta);
    }

    char nome_jogador[50];
    printf("Digite seu primeiro nome: ");
    scanf("%s", nome_jogador);

    time_t tempo_fim = time(NULL);
    int tempo_total = (int)(tempo_fim - tempo_inicio);

    printf("\\n%s; %s; %d; %d\\n", nome_jogador, palavra_secreta, tentativas, tempo_total);

    return 0;
}`,
    },
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
      { name: 'Visão Computacional & OCR (Gemini Vision)', usedIn: ['portuguinha'] },
      { name: 'Engenharia de Prompt & Context Window', usedIn: ['dentinho', 'portuguinha'] },
      { name: 'Orquestração de Intenções & Administração via WhatsApp', usedIn: ['dentinho', 'portuguinha'] },
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
