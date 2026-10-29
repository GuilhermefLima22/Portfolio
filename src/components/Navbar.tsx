import { useState } from 'react';
import { SCENES } from '../store';
import { scrollToId } from '../lib/scroll';
import { useAppStore } from '../store';
import { personalInfo } from '../data/portfolioData';
import { Magnetic } from './Magnetic';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export const Navbar: React.FC = () => {
  const currentScene = useAppStore((s) => s.scene);
  const setCvModalOpen = useAppStore((s) => s.setCvModalOpen);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 backdrop-blur-md bg-ink-950/60 border-b border-white/[0.06] transition-all">
      {/* Brand / Logo */}
      <button 
        onClick={() => scrollToId('hero')}
        className="group flex items-center gap-2.5 text-left text-paper hover:text-signal transition-colors focus:outline-none"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-signal animate-pulse" />
        <span className="font-display font-bold tracking-tight text-lg">
          GUILHERME
        </span>
        <span className="hidden sm:inline font-mono text-[11px] text-muted tracking-widest uppercase pl-1 border-l border-white/10">
          Dados & IA
        </span>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {SCENES.map((item) => {
          const isActive = currentScene === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className={`text-xs font-mono tracking-wider transition-all relative py-1 focus:outline-none ${
                isActive ? 'text-signal font-semibold' : 'text-paper/70 hover:text-paper'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-signal shadow-[0_0_8px_#c6ff3d]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Social Links & CTA Buttons */}
      <div className="hidden sm:flex items-center gap-2.5">
        <Magnetic strength={0.25}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-signal/40 text-paper/70 hover:text-signal transition-all flex items-center justify-center"
            title="GitHub (@GuilhermefLima22)"
            aria-label="GitHub de Guilherme"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </Magnetic>

        <Magnetic strength={0.25}>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-signal/40 text-paper/70 hover:text-signal transition-all flex items-center justify-center"
            title="LinkedIn (Guilherme Freitas)"
            aria-label="LinkedIn de Guilherme"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </Magnetic>

        <button
          onClick={() => setCvModalOpen(true)}
          className="px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-signal/40 text-paper text-xs font-mono tracking-wider transition-all"
        >
          Currículo
        </button>

        <Magnetic strength={0.25}>
          <button
            onClick={() => scrollToId('contato')}
            className="px-4 py-2 rounded-full border border-signal/40 bg-signal/10 hover:bg-signal hover:text-ink-950 text-signal text-xs font-mono tracking-wider transition-all"
            data-cursor="Falar"
          >
            Contato
          </button>
        </Magnetic>
      </div>

      {/* Mobile Burger */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2 text-paper focus:outline-none"
        aria-label="Menu"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        <span className={`w-6 h-[2px] bg-paper transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-[2px] bg-paper transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-[2px] bg-paper transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="absolute top-full left-0 right-0 bg-ink-900 border-b border-white/10 px-6 py-6 flex flex-col gap-3.5 md:hidden shadow-2xl animate-in slide-in-from-top-2">
          {SCENES.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToId(item.id);
                setMobileMenuOpen(false);
              }}
              aria-current={currentScene === item.id ? 'page' : undefined}
              className="text-left py-1.5 font-mono text-sm tracking-wider text-paper/80 hover:text-signal"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setCvModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-paper font-mono text-xs text-center"
          >
            📄 Ver Currículo (PDF)
          </button>
          <button
            onClick={() => {
              scrollToId('contato');
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-lg bg-signal text-ink-950 font-mono text-xs font-bold text-center"
          >
            Entrar em Contato
          </button>

          {/* Redes Sociais no Mobile */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08]">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-lg border border-white/10 bg-white/[0.03] text-paper/80 font-mono text-xs flex items-center justify-center gap-2 hover:border-signal/40 hover:text-signal transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-lg border border-white/10 bg-white/[0.03] text-paper/80 font-mono text-xs flex items-center justify-center gap-2 hover:border-signal/40 hover:text-signal transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
