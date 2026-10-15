import React from 'react';
import { skillGroups } from '../data/portfolioData';
import { SectionHeading } from './Reveal';
import { Sparkles } from 'lucide-react';

export const Skills: React.FC = () => {
  return (
    <section 
      id="stack" 
      data-scene="stack" 
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto"
    >
      <SectionHeading 
        index="04" 
        label="Habilidades & Ferramentas" 
        title="O pipeline de tecnologias" 
      />

      <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {skillGroups.map((group, idx) => (
          <div
            key={idx}
            className={`p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-ink-900/60 border backdrop-blur-md flex flex-col justify-between transition-all ${
              group.stage === '05'
                ? 'border-signal/40 bg-signal/[0.02] shadow-[0_0_30px_rgba(198,255,61,0.06)]'
                : 'border-white/[0.08] hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted mb-4">
                <span className="text-signal font-bold">{group.stage}</span>
                {group.stage === '05' && (
                  <span className="flex items-center gap-1 text-[10px] text-signal font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> Foco Atual
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-xl text-paper mb-2">
                {group.title}
              </h3>

              <p className="text-xs text-muted leading-relaxed mb-6">
                {group.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
              {group.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                    skill.learning
                      ? 'bg-signal/10 text-signal border border-signal/30'
                      : 'bg-white/[0.04] text-paper/80 border border-white/10 hover:border-signal/40'
                  }`}
                >
                  {skill.name}
                  {skill.learning && <span className="ml-1 text-[10px] opacity-75">✦</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
