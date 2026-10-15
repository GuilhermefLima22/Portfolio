import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useAppStore } from '../store';

/** Contador de carregamento real: espera as fontes (o nome em partículas depende delas). */
export function Preloader() {
  const setReady = useAppStore((s) => s.setReady);
  const setFontsReady = useAppStore((s) => s.setFontsReady);
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let fontsLoaded = false;
    let raf = 0;
    const start = performance.now();
    const minTime = reducedMotion ? 0 : 1100;

    Promise.race([
      Promise.all([
        document.fonts.load('700 100px "Space Grotesk"'),
        document.fonts.load('400 16px Inter'),
      ]),
      new Promise((r) => setTimeout(r, 2500)), // nunca trava o site
    ]).finally(() => {
      fontsLoaded = true;
      setFontsReady(true);
    });

    const tick = () => {
      const elapsed = performance.now() - start;
      const timeP = Math.min(elapsed / Math.max(minTime, 1), 1);
      const p = fontsLoaded ? timeP : Math.min(timeP, 0.85);
      setProgress(Math.round(p * 100));
      if (p >= 1) {
        setDone(true);
        setTimeout(() => setReady(true), reducedMotion ? 0 : 250);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, setFontsReady, setReady]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink-950 p-6 sm:p-10"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Carregando"
        >
          <div className="label">Organizando os dados…</div>
          <div className="flex items-end justify-between">
            <span className="font-display text-fluid-hero font-bold tabular-nums text-paper">
              {progress.toString().padStart(3, '0')}
            </span>
            <span className="label mb-4">Guilherme · Dados &amp; IA</span>
          </div>
          <div className="absolute bottom-0 left-0 h-px bg-signal" style={{ width: `${progress}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
