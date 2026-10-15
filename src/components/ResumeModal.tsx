import React from 'react';
import { useAppStore } from '../store';
import { personalInfo } from '../data/portfolioData';
import { X, Printer, ExternalLink, FileText, Sparkles, GraduationCap, Code2, Brain, Workflow, Mail, Phone, MapPin } from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const cvModalOpen = useAppStore((s) => s.cvModalOpen);
  const setCvModalOpen = useAppStore((s) => s.setCvModalOpen);

  if (!cvModalOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open('/curriculo.html', '_blank');
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        printWindow.print();
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setCvModalOpen(false)}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[94vh] sm:max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#080B12] border border-white/10 shadow-2xl p-4 sm:p-8 md:p-10 text-paper"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra Superior de Ações */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-5 mb-8">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-signal/10 border border-signal/30 text-signal">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-paper">
                Meu Currículo
              </h2>
              <p className="font-mono text-xs text-muted">
                {personalInfo.fullName} • Simples, direto e sem enrolação
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-signal text-ink-950 font-mono text-xs font-bold flex items-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_rgba(198,255,61,0.25)]"
              title="Imprimir ou salvar em PDF limpo A4"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>

            <a
              href="/curriculo.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-paper font-mono text-xs flex items-center gap-1.5 transition-colors"
              title="Abrir em aba isolada"
            >
              <ExternalLink className="w-4 h-4 text-muted" />
              <span className="hidden sm:inline">Página Isolada</span>
            </a>

            <button
              onClick={() => setCvModalOpen(false)}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/15 text-paper/80 hover:text-white transition-colors"
              aria-label="Fechar currículo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cabeçalho */}
        <header className="mb-8 pb-6 border-b border-white/[0.08]">
          <span className="font-mono text-[11px] text-signal font-semibold tracking-wider uppercase">
            {personalInfo.status}
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-paper tracking-tight mt-1">
            {personalInfo.fullName}
          </h1>
          <p className="font-mono text-xs sm:text-sm text-paper/80 mt-1">
            Estudante de Ciência da Computação · Universidade Presbiteriana Mackenzie
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-5 mt-4 font-mono text-xs text-muted">
            <span className="flex items-center gap-1.5 text-paper/80">
              <MapPin className="w-3.5 h-3.5 text-signal" />
              {personalInfo.location}
            </span>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-1.5 text-paper/80 hover:text-signal transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-signal" />
              {personalInfo.email}
            </a>
            <a 
              href={`https://wa.me/${personalInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              {personalInfo.whatsappDisplay}
            </a>
          </div>
        </header>

        {/* Layout em 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Coluna Esquerda: Formação, O que eu uso & Cursos */}
          <aside className="lg:col-span-5 space-y-7">
            
            {/* Formação Acadêmica */}
            <section className="space-y-3.5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-signal font-semibold flex items-center gap-2 border-b border-white/[0.06] pb-2">
                <GraduationCap className="w-4 h-4" />
                Formação
              </h3>

              <div className="space-y-4">
                <div className="space-y-0.5">
                  <div className="font-display font-semibold text-paper text-sm">
                    Ciência da Computação
                  </div>
                  <div className="font-mono text-xs text-signal">
                    Universidade Presbiteriana Mackenzie
                  </div>
                  <div className="font-mono text-[11px] text-muted">
                    2026 — Em andamento (2º Semestre)
                  </div>
                  <p className="text-xs text-paper/70 pt-1 leading-relaxed">
                    Lógica de programação, linguagem C, estruturas de dados e matemática.
                  </p>
                </div>

                <div className="space-y-0.5 pt-2 border-t border-white/[0.04]">
                  <div className="font-display font-semibold text-paper text-sm">
                    Ensino Médio Completo
                  </div>
                  <div className="font-mono text-xs text-muted">
                    Colégio Objetivo
                  </div>
                  <div className="font-mono text-[11px] text-muted">
                    Concluído
                  </div>
                  <p className="text-xs text-paper/70 pt-1 leading-relaxed">
                    Boa base em exatas, raciocínio lógico e resolução de problemas.
                  </p>
                </div>
              </div>
            </section>

            {/* O que eu sei usar (Sem JS, Sem C++) */}
            <section className="space-y-3.5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-signal font-semibold flex items-center gap-2 border-b border-white/[0.06] pb-2">
                <Code2 className="w-4 h-4" />
                O que eu uso
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-mono text-xs font-semibold text-paper mb-0.5">Linguagens</div>
                  <p className="text-muted leading-relaxed">
                    Python (scripts, dados e APIs) e Linguagem C (faculdade, terminal e Arduino).
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs font-semibold text-paper mb-0.5">Dados</div>
                  <p className="text-muted leading-relaxed">
                    Pandas (tabelas e filtros), estatística básica e Google Colab.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs font-semibold text-paper mb-0.5">Inteligência Artificial</div>
                  <p className="text-muted leading-relaxed">
                    API do Gemini (Google), criação de instruções para bots e contexto de conversa.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs font-semibold text-paper mb-0.5">Automação & Ferramentas</div>
                  <p className="text-muted leading-relaxed">
                    n8n, Webhooks, APIs em FastAPI, Git/GitHub e servidores em nuvem.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-xs font-semibold text-paper mb-0.5">Fundamentos & Hardware</div>
                  <p className="text-muted leading-relaxed">
                    Circuitos Digitais (Logisim e Mapa de Karnaugh) e Arduino IoT.
                  </p>
                </div>
              </div>
            </section>

            {/* Cursos & Certificações */}
            <section className="space-y-3.5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-signal font-semibold flex items-center gap-2 border-b border-white/[0.06] pb-2">
                <Brain className="w-4 h-4" />
                Cursos & Certificações
              </h3>

              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="font-medium text-paper">Trilha de IA Generativa & MLOps</div>
                  <div className="font-mono text-[10.5px] text-muted">Google Cloud Skills Boost · 30h (Fluxos de dados e modelos)</div>
                </div>

                <div>
                  <div className="font-medium text-paper">Gemini para Análise de Dados</div>
                  <div className="font-mono text-[10.5px] text-muted">Google Cloud Skills Boost · Análise e relatórios</div>
                </div>

                <div>
                  <div className="font-medium text-paper">Pacote Office & Windows 11</div>
                  <div className="font-mono text-[10.5px] text-muted">Excel para planilhas e análise no dia a dia</div>
                </div>
              </div>
            </section>

          </aside>

          {/* Coluna Principal: Sobre mim & Projetos práticos */}
          <main className="lg:col-span-7 space-y-7">
            
            {/* Sobre mim / Objetivo */}
            <section className="p-5 rounded-2xl bg-white/[0.02] border-l-2 border-signal border-y border-r border-white/[0.04]">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sobre mim & Objetivo</span>
              </div>
              <p className="text-paper/85 text-sm leading-relaxed">
                Estudo Ciência da Computação no Mackenzie e gosto de aprender construindo projetos práticos. Desenvolvi bots com IA para WhatsApp, automações que rodam 24h na nuvem e projetos em Python e linguagem C na faculdade. Busco uma oportunidade de <strong>estágio em Dados ou Inteligência Artificial</strong> para aprender com a equipe, colocar a mão na massa no dia a dia e evoluir profissionalmente.
              </p>
            </section>

            {/* Projetos Práticos */}
            <section className="space-y-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-signal font-semibold flex items-center gap-2 border-b border-white/[0.06] pb-2">
                <Workflow className="w-4 h-4" />
                Projetos Práticos que Criei
              </h3>

              <div className="space-y-5">
                
                {/* Dentinho */}
                <div className="space-y-1.5 pb-4 border-b border-white/[0.05]">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-display font-semibold text-paper text-sm sm:text-base">
                      Dentinho — Bot de WhatsApp com IA & Painel
                    </span>
                    <span className="font-mono text-[11px] text-signal">
                      Python • Gemini • FastAPI • SQLite
                    </span>
                  </div>
                  <ul className="text-xs text-paper/80 space-y-1 leading-relaxed list-disc list-inside">
                    <li>
                      Bot inteligente para WhatsApp que tira dúvidas e ajuda a marcar horários, lembrando do contexto da conversa.
                    </li>
                    <li>
                      Terminal de controle para acompanhar o atendimento em tempo real e testar as respostas da IA.
                    </li>
                    <li>
                      API em FastAPI com banco de dados para salvar os pedidos e agendamentos com segurança.
                    </li>
                  </ul>
                </div>

                {/* Portuguinha */}
                <div className="space-y-1.5 pb-4 border-b border-white/[0.05]">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-display font-semibold text-paper text-sm sm:text-base">
                      Portuguinha Lava-Rápido — Atendimento Automático
                    </span>
                    <span className="font-mono text-[11px] text-signal">
                      n8n • Gemini • Evolution API • Planilhas
                    </span>
                  </div>
                  <ul className="text-xs text-paper/80 space-y-1 leading-relaxed list-disc list-inside">
                    <li>
                      Fluxo no n8n rodando direto em servidor na nuvem 24 horas por dia para atender clientes no WhatsApp.
                    </li>
                    <li>
                      Já atendeu mais de 320 contatos e processou mais de 1.100 mensagens reais.
                    </li>
                    <li>
                      Salva novos agendamentos automaticamente no Google Sheets e avisa a equipe no mesmo instante.
                    </li>
                  </ul>
                </div>

                {/* D&SKY */}
                <div className="space-y-1.5 pb-4 border-b border-white/[0.05]">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-display font-semibold text-paper text-sm sm:text-base">
                      D&SKY — Automação de Postagens & Afiliados
                    </span>
                    <span className="font-mono text-[11px] text-signal">
                      Python • Automação
                    </span>
                  </div>
                  <ul className="text-xs text-paper/80 space-y-1 leading-relaxed list-disc list-inside">
                    <li>
                      Script em Python que ajuda a programar e postar vídeos automaticamente com links de produtos para gerar vendas.
                    </li>
                  </ul>
                </div>

                {/* Projetos Mackenzie */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-display font-semibold text-paper text-sm sm:text-base">
                      Projetos da Faculdade (Mackenzie)
                    </span>
                    <span className="font-mono text-[11px] text-signal">
                      Linguagem C • Logisim • Arduino
                    </span>
                  </div>
                  <ul className="text-xs text-paper/80 space-y-1 leading-relaxed list-disc list-inside">
                    <li>
                      <strong>Display de 7 Segmentos:</strong> Decodificador BCD (0 a 9) montado no Logisim, utilizando Mapas de Karnaugh em cada segmento para simplificar as expressões e otimizar as portas lógicas.
                    </li>
                    <li>
                      <strong>Jogo Termo em C:</strong> Recriei o jogo Termo para rodar no terminal em C puro, praticando ponteiros, arquivos e controle de memória.
                    </li>
                    <li>
                      <strong>Estufa com Arduino:</strong> Circuito com sensores para medir temperatura e umidade e cuidar das plantas de forma automática.
                    </li>
                  </ul>
                </div>

              </div>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
};
