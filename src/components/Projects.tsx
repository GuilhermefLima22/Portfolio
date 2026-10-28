import React, { useState } from 'react';
import { projects, categoryLabels } from '../data/portfolioData';
import type { Project } from '../types';
import { SectionHeading } from './Reveal';
import { ProjectModal } from './ProjectModal';
import { useAppStore } from '../store';
import { CheckCircle2, Lock, Code2 } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const setHoveredProject = useAppStore((s) => s.setHoveredProject);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section 
      id="projetos" 
      data-scene="projetos" 
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto"
    >
      <SectionHeading 
        index="02" 
        label="Projetos & Aplicações Reais" 
        title="O que já coloquei para funcionar" 
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mt-8 mb-10 sm:mt-10 sm:mb-14">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-xs transition-all ${
            selectedCategory === 'all'
              ? 'bg-signal text-ink-950 font-bold'
              : 'border border-white/10 bg-white/[0.02] text-paper/70 hover:text-paper hover:border-white/20'
          }`}
        >
          Todos ({projects.length})
        </button>

        {Object.entries(categoryLabels).map(([key, label]) => {
          const count = projects.filter(p => p.category === key).length;
          if (count === 0) return null;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-xs transition-all ${
                selectedCategory === key
                  ? 'bg-signal text-ink-950 font-bold'
                  : 'border border-white/10 bg-white/[0.02] text-paper/70 hover:text-paper hover:border-white/20'
              }`}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onHover={(hovering) => setHoveredProject(hovering ? project.id : null)} 
            onClick={() => setActiveModalProject(project)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {activeModalProject && (
        <ProjectModal 
          project={activeModalProject} 
          onClose={() => setActiveModalProject(null)} 
        />
      )}
    </section>
  );
};

const ProjectCard: React.FC<{ 
  project: Project; 
  onHover: (hover: boolean) => void;
  onClick: () => void;
}> = ({ project, onHover, onClick }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="group relative flex flex-col justify-between p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-ink-900/70 border border-white/[0.08] hover:border-signal/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 cursor-pointer"
      data-cursor="Abrir"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-paper/80">
            {categoryLabels[project.category]}
          </span>
          <span 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: project.color, boxShadow: `0 0 10px ${project.color}` }} 
          />
        </div>

        <h3 className="font-display font-bold text-2xl text-paper group-hover:text-signal transition-colors mb-2">
          {project.title}
        </h3>

        <p className="font-mono text-xs text-muted mb-4">
          {project.tagline}
        </p>

        <p className="text-paper/75 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="space-y-2 mb-6">
          {project.highlights.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-muted">
              <CheckCircle2 className="w-3.5 h-3.5 text-signal/80 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info & Tech Stack */}
      <div>
        {/* Facts Box */}
        {project.facts.length > 0 && (
          <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-ink-950/60 border border-white/[0.04] mb-5">
            {project.facts.slice(0, 2).map((fact, idx) => (
              <div key={idx}>
                <div className="font-mono text-[10px] text-muted">{fact.label}</div>
                <div className="font-mono text-xs font-semibold text-paper/90 truncate">{fact.value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06] mb-3">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-paper/60 border border-white/[0.04]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Status do Código / GitHub */}
        <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.04] text-xs font-mono">
          <span className="text-[11px] text-muted">Acesso ao código:</span>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-signal hover:text-ink-950 text-paper/90 border border-white/10 font-mono text-[11px] font-semibold transition-all group"
              title="Acessar repositório público no GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5 text-paper/80 group-hover:text-ink-950 transition-colors" />
              <span>GitHub Público</span>
            </a>
          ) : project.codeAccess === 'private_nda' ? (
            <span 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 font-mono text-[11px] font-semibold"
              title="Código comercial confidencial sob termo de sigilo (NDA)"
            >
              <Lock className="w-3 h-3" />
              <span>Código Privado (NDA)</span>
            </span>
          ) : project.codeSnippet ? (
            <span 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-mono text-[11px] font-semibold"
              title="Código-fonte completo exibido no modal do portfólio"
            >
              <Code2 className="w-3 h-3" />
              <span>Ver Código (Modal)</span>
            </span>
          ) : (
            <span 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-paper/60 font-mono text-[11px]"
            >
              <span>Acadêmico</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
