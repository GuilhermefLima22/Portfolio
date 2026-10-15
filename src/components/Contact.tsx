import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { useAppStore } from '../store';
import { SectionHeading } from './Reveal';
import { Magnetic } from './Magnetic';
import { Mail, Copy, Check, FileText } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const setCvModalOpen = useAppStore((s) => s.setCvModalOpen);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="contato" 
      data-scene="contato" 
      className="py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto"
    >
      <SectionHeading 
        index="05" 
        label="Contato & Oportunidades" 
        title="Vamos conversar sobre dados, IA e tecnologia?" 
      />

      <div className="mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        {/* Left Column: Direct Call to Action */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          <p className="text-paper/80 text-base sm:text-lg md:text-xl font-sans max-w-xl leading-relaxed">
            Estou em busca de um <strong>estágio na área de Dados ou Inteligência Artificial</strong>. Se a sua empresa busca alguém dedicado, curioso e que já coloca projetos no ar, meu e-mail e canais estão abertos.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Magnetic strength={0.3}>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-full sm:w-auto text-center justify-center px-8 py-4 rounded-full bg-signal text-ink-950 font-mono text-sm font-bold flex items-center gap-2 hover:bg-white transition-all shadow-[0_0_25px_rgba(198,255,61,0.3)]"
                data-cursor="Enviar"
              >
                <Mail className="w-4 h-4" />
                Enviar Mensagem Direta
              </a>
            </Magnetic>

            {personalInfo.whatsapp && (
              <Magnetic strength={0.3}>
                <a
                  href={`https://wa.me/${personalInfo.whatsapp}?text=Ol%C3%A1%20Guilherme,%20vi%20seu%20portf%C3%B3lio!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center justify-center px-6 py-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500 hover:text-ink-950 text-emerald-400 font-mono text-sm flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                  data-cursor="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Chamar no WhatsApp
                </a>
              </Magnetic>
            )}

            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto text-center justify-center px-6 py-4 rounded-full border border-white/15 bg-white/[0.02] hover:bg-white/10 text-paper font-mono text-sm flex items-center gap-2 transition-all"
              title="Copiar e-mail"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-signal" />
                  <span className="text-signal font-semibold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-muted" />
                  <span>Copiar E-mail</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap gap-6 text-xs font-mono text-muted">
            <div>
              <span className="block text-paper font-semibold mb-1">Localização</span>
              <span>{personalInfo.location}</span>
            </div>
            <div>
              <span className="block text-paper font-semibold mb-1">Status</span>
              <span className="text-signal">{personalInfo.status}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Connection Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* E-mail Card */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-ink-900/80 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
              <span>E-MAIL PROFISSIONAL</span>
              <Mail className="w-4 h-4 text-signal" />
            </div>
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="font-mono text-sm md:text-base text-paper hover:text-signal transition-colors break-all"
            >
              {personalInfo.email}
            </a>
          </div>

          {/* WhatsApp Card */}
          {personalInfo.whatsapp && (
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-ink-900/80 border border-white/10 backdrop-blur-md flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted mb-1">
                  <span>WHATSAPP DIRETO</span>
                </div>
                <a 
                  href={`https://wa.me/${personalInfo.whatsapp}?text=Ol%C3%A1%20Guilherme,%20vi%20seu%20portf%C3%B3lio!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm md:text-base text-paper hover:text-emerald-400 transition-colors"
                >
                  {personalInfo.whatsappDisplay || personalInfo.whatsapp}
                </a>
              </div>
              <a
                href={`https://wa.me/${personalInfo.whatsapp}?text=Ol%C3%A1%20Guilherme,%20vi%20seu%20portf%C3%B3lio!`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-white/[0.05] hover:bg-emerald-500 hover:text-ink-950 transition-colors text-emerald-400"
                title="Conversar no WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          )}

          {/* Curriculo / CV Card */}
          <div 
            onClick={() => setCvModalOpen(true)}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-ink-900/80 border border-white/10 hover:border-signal/40 backdrop-blur-md flex items-center justify-between cursor-pointer group transition-all"
          >
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-signal mb-1">
                <span>CURRÍCULO PROFISSIONAL</span>
              </div>
              <div className="font-display font-semibold text-paper text-base group-hover:text-signal transition-colors">
                Visualizar & Baixar em PDF
              </div>
              <div className="text-xs text-muted font-mono mt-0.5">
                Formato A4 • ATS-Friendly
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCvModalOpen(true);
                }}
                className="p-3.5 rounded-full bg-signal text-ink-950 font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(198,255,61,0.2)]"
                title="Abrir Currículo"
              >
                <FileText className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
