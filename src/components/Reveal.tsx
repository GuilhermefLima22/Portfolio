import type { ReactNode } from 'react';
import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

/** Revela o conteúdo ao entrar na viewport (uma vez). */
export function Reveal({ children, delay = 0, className = '', y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Título de seção: índice + rótulo + título com revelação por linha. */
export function SectionHeading({ index, label, title, className = '' }: { index: string; label: string; title: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Reveal>
        <div className="mb-4 sm:mb-6 flex items-center gap-2.5 sm:gap-3">
          <span className="font-mono text-[11px] text-signal font-semibold">{index}</span>
          <span className="h-px w-8 sm:w-10 bg-white/20" />
          <span className="label text-[10px] sm:text-[11px]">{label}</span>
        </div>
      </Reveal>
      <div className="overflow-hidden">
        <motion.h2
          className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-paper leading-[1.15] sm:leading-[1.05] tracking-tight"
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease }}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
