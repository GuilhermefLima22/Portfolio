import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { scrollToId } from '../lib/scroll';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-muted">
      <div>
        <span className="text-paper font-semibold">{personalInfo.name}</span> · {personalInfo.course} ({personalInfo.university})
      </div>

      {/* Social Links no Rodapé */}
      <div className="flex items-center gap-5 text-paper/70">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-signal transition-colors"
          title="GitHub de Guilherme"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>
        <span className="text-white/20">·</span>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-signal transition-colors"
          title="LinkedIn de Guilherme"
        >
          <LinkedinIcon className="w-3.5 h-3.5" />
          <span>LinkedIn</span>
        </a>
      </div>

      <div className="flex items-center gap-6">
        <span>© {new Date().getFullYear()}</span>
        <button
          onClick={() => scrollToId('hero')}
          className="flex items-center gap-1.5 text-paper/70 hover:text-signal transition-colors focus:outline-none"
        >
          <span>Voltar ao topo</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
