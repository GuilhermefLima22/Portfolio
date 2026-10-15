# 🚀 Portfólio Profissional - Guilherme | Full Stack Developer

Um site de portfólio moderno, criativo, de alta performance e interativo, construído com foco em **Engenharia de Software Full Stack, Automações e Inteligência Artificial**.

---

## ✨ Tecnologias Utilizadas

- **React 18 / 19** com **TypeScript**
- **Vite 6 / 8** (Build ultra-rápido com HMR)
- **Tailwind CSS 3.4** (Dark Tech theme, Glassmorphism, Gradientes)
- **Lucide Icons** (Ícones modernos e leves)
- **Canvas Confetti** (Micro-interações de feedback)
- **HTML5 Canvas Particles** (Efeito dinâmico no background sensível ao mouse e acessível com `prefers-reduced-motion`)

---

## 📂 Estrutura do Projeto

```plaintext
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Menu de navegação fixo com status e gaveta mobile
│   │   ├── Hero.tsx               # Seção principal com terminal interativo e botões de ação
│   │   ├── About.tsx              # Pilares de engenharia e linha do tempo de experiência
│   │   ├── Projects.tsx           # Grid de projetos com filtros dinâmicos
│   │   ├── ProjectModal.tsx       # Modal de detalhes com arquitetura e métricas
│   │   ├── Skills.tsx             # Habilidades técnicas categorizadas
│   │   ├── ApiPlayground.tsx      # Simulador de API ao vivo (requisições e respostas JSON)
│   │   ├── Contact.tsx            # Formulário com integração direta ao WhatsApp e e-mail
│   │   ├── Footer.tsx             # Rodapé com status do sistema e botão de topo
│   │   ├── InteractiveCanvas.tsx  # Fundo dinâmico com constelação de partículas
│   │   └── BrandIcons.tsx         # Ícones vetoriais customizados
│   ├── data/
│   │   └── portfolioData.ts       # ⚙️ ARQUIVO CENTRAL DE CONFIGURAÇÃO (edite seus dados aqui)
│   ├── types/
│   │   └── index.ts               # Tipagens estritas do TypeScript
│   ├── App.tsx                    # Orquestrador da aplicação
│   └── index.css                  # Estilos globais e utilitários modernos
├── index.html                     # Metadados, SEO e fontes (Inter & JetBrains Mono)
└── package.json
```

---

## 🛠️ Como Personalizar Seus Dados

Para alterar suas informações (nome, WhatsApp, e-mail, links do GitHub/LinkedIn, projetos e habilidades), basta editar o arquivo:

👉 **[`src/data/portfolioData.ts`](./src/data/portfolioData.ts)**

- **WhatsApp**: Altere `whatsapp: "5511999999999"` para o seu número com DDD.
- **E-mail**: Atualize para seu e-mail profissional.
- **Projetos**: Adicione novos projetos ou altere descrições, tags e links.

---

## ⚡ Comandos Disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor local de desenvolvimento (ex: `http://localhost:5173`) |
| `npm run build` | Compila o projeto em arquivos estáticos otimizados na pasta `dist/` |
| `npm run preview` | Pré-visualiza a build de produção localmente |

---

## 🌐 Como Fazer Deploy Gratuito (Vercel ou Netlify)

1. Crie um repositório no seu GitHub e envie o código da pasta `portfolio`.
2. Acesse [vercel.com](https://vercel.com) ou [netlify.com](https://netlify.com).
3. Conecte com o GitHub e selecione o repositório.
4. O framework **Vite** será detectado automaticamente.
5. Clique em **Deploy**! O site estará no ar em menos de 1 minuto com certificado SSL gratuito.
