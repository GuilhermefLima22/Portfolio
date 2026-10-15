import { education, currentCourses, certifications } from '../data/portfolioData';
import { SectionHeading } from './Reveal';
import { GraduationCap, BookOpen, Target, Sparkles, Award, Clock, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section 
      id="sobre" 
      data-scene="sobre" 
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto"
    >
      <SectionHeading 
        index="01" 
        label="Trajetória, Visão & Formação" 
        title="Quem sou eu e onde quero chegar" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mt-10 sm:mt-16 items-start">
        {/* Left Column: Quem Sou Eu & Onde Quero Chegar */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-paper/80 font-sans text-base md:text-lg leading-relaxed">
          {/* Card: Quem sou eu */}
          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-ink-900/60 border border-white/[0.08] backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-signal font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Quem sou eu</span>
            </div>
            <p className="text-paper text-sm md:text-base leading-relaxed">
              Estudo <strong>Ciência da Computação no Mackenzie</strong> (2º semestre) e fiz o ensino médio no <strong>Colégio Objetivo</strong>. Sempre tive curiosidade por tecnologia e raciocínio lógico, o que me fez querer entender como as coisas realmente funcionam por baixo dos panos.
            </p>
            <p className="text-paper/75 text-sm md:text-base leading-relaxed">
              Em vez de ficar só na teoria, gosto de testar as coisas na prática: desenvolvi chatbots inteligentes com IA (Gemini), criei automações em nuvem e, na faculdade (Mackenzie), desenvolvi projetos práticos como o decodificador para display de 7 segmentos no Logisim (otimizado com Mapa de Karnaugh), a estufa com Arduino e a versão do jogo Termo em C no terminal para exercitar estruturas de dados, ponteiros e controle de memória.
            </p>
          </div>

          {/* Card: Onde quero chegar */}
          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-signal/[0.03] border border-signal/25 backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-signal font-bold">
              <Target className="w-4 h-4" />
              <span>Onde quero chegar</span>
            </div>
            <p className="text-paper text-sm md:text-base leading-relaxed">
              Procuro uma oportunidade de <strong>estágio em Dados ou Inteligência Artificial</strong>. Quero fazer parte de um time onde eu possa aprender com quem tem mais experiência, botar a mão na massa com Python, análise de dados e APIs, e contribuir de verdade com o dia a dia da empresa.
            </p>
          </div>

          {/* Certificações de Produtividade */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-ink-900/50 border border-white/[0.06]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted mb-4">
              <Award className="w-4 h-4 text-signal" />
              <span>Certificações de Ambiente & Produtividade</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-ink-950/60 border border-white/[0.05] flex items-center justify-between">
                  <div>
                    <h5 className="font-display font-semibold text-paper text-xs">{cert.title}</h5>
                    <p className="font-mono text-[10px] text-muted mt-0.5">{cert.issuer}</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-signal shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Formação & Trilhas de Cursos */}
        <div className="lg:col-span-5 space-y-6">
          {/* Formação Acadêmica */}
          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-ink-900/80 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-signal mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Formação Acadêmica</span>
            </div>

            <div className="space-y-6 divide-y divide-white/[0.08]">
              {education.map((item, idx) => (
                <div key={idx} className={idx > 0 ? 'pt-6' : ''}>
                  <div className="flex items-center justify-between text-xs font-mono text-muted mb-1">
                    <span>{item.period}</span>
                    {item.current && (
                      <span className="px-2 py-0.5 rounded-full bg-signal/10 text-signal border border-signal/30 text-[10px]">
                        Atual
                      </span>
                    )}
                  </div>
                  <h4 className="font-display font-semibold text-paper text-base">
                    {item.title}
                  </h4>
                  <p className="text-xs text-signal/90 font-mono mt-1 font-semibold">
                    {item.institution}
                  </p>
                  <p className="text-xs text-muted mt-2 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cursos & Trilhas em Andamento (Google Cloud / GenAI) */}
          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-ink-900/80 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal">
                <BookOpen className="w-4 h-4" />
                <span>Trilhas & Cursos Especializados</span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-signal/10 text-signal border border-signal/30">
                Em Andamento
              </span>
            </div>

            <p className="text-xs text-muted leading-relaxed mb-6">
              Aprofundamento contínuo em trilhas oficiais de dados e IA generativa:
            </p>

            <div className="space-y-3.5">
              {currentCourses.map((course, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-ink-950/60 border border-white/[0.04] space-y-1.5 hover:border-signal/30 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-muted">
                      {course.category}
                    </span>
                    {course.hours && (
                      <span className="text-[10px] font-mono text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3 text-signal" /> {course.hours}
                      </span>
                    )}
                  </div>

                  <h5 className="font-display font-semibold text-paper text-xs sm:text-sm">
                    {course.title}
                  </h5>

                  <p className="text-[11px] font-mono text-signal/80">
                    {course.provider}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-mono text-muted text-center pt-4">
              * Demais certificados e histórico completo disponíveis no currículo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
