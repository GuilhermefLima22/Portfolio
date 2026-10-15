import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { useAppStore } from '../store';
import { scrollToId } from '../lib/scroll';
import { Magnetic } from './Magnetic';
import { ArrowDown, Sparkles, Terminal, FileText } from 'lucide-react';

export const Hero: React.FC = () => {
  const setCvModalOpen = useAppStore((s) => s.setCvModalOpen);
  return (
    <section 
      id="hero" 
      data-scene="hero" 
      className="min-h-screen relative flex flex-col justify-between pt-36 pb-12 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Top Tag & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-signal animate-ping" />
          <span className="font-mono text-xs text-signal font-medium">
            {personalInfo.status}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted">
          <Terminal className="w-3.5 h-3.5 text-signal" />
          <span>{personalInfo.university} · {personalInfo.semester}</span>
        </div>
      </div>

      {/* Center Narrative Statement */}
      <div className="my-auto py-12 max-w-4xl">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-signal/90 mb-4 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Estudante de Ciência da Computação
        </p>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-paper leading-[1.05] mb-8">
          Transformando dados brutos e modelos de IA em soluções reais.
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-paper/70 font-sans max-w-2xl leading-relaxed mb-10">
          Olá, sou o <strong className="text-paper font-semibold">{personalInfo.name}</strong>. Crio automações inteligentes, conecto LLMs à rotina de negócios e exploro a engenharia e análise de dados de ponta a ponta.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Magnetic strength={0.3}>
            <button
              onClick={() => scrollToId('projetos')}
              className="px-7 py-3.5 rounded-full bg-signal text-ink-950 font-mono text-xs md:text-sm font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(198,255,61,0.25)]"
              data-cursor="Explorar"
            >
              Ver Projetos Reais
            </button>
          </Magnetic>

          <Magnetic strength={0.25}>
            <button
              onClick={() => setCvModalOpen(true)}
              className="px-6 py-3.5 rounded-full border border-signal/40 bg-signal/10 hover:bg-signal hover:text-ink-950 text-signal font-mono text-xs md:text-sm font-semibold tracking-wider transition-all flex items-center gap-2"
              data-cursor="Currículo"
            >
              <FileText className="w-4 h-4" />
              Ver Currículo (PDF)
            </button>
          </Magnetic>

          <Magnetic strength={0.2}>
            <button
              onClick={() => scrollToId('sobre')}
              className="px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.02] hover:bg-white/10 text-paper font-mono text-xs md:text-sm tracking-wider transition-all"
              data-cursor="Conhecer"
            >
              Sobre Mim
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-end text-muted text-xs font-mono border-t border-white/[0.06] pt-6">
        <button 
          onClick={() => scrollToId('sobre')}
          className="flex items-center gap-2 hover:text-signal transition-colors group focus:outline-none"
        >
          <span>Role para navegar</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
