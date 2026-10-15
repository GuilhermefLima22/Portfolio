import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useAppStore } from '../store';

/**
 * Cursor customizado contextual.
 * - Elementos com [data-cursor="Texto"] mostram um rótulo (ex.: "Ver", "Arrastar").
 * - Links e botões aumentam o anel.
 * Só ativa em ponteiros finos (mouse) e sem prefers-reduced-motion.
 */
export function Cursor() {
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine || reducedMotion) return;
    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor], a, button, input, label, [role="button"]');
      setLabel(el?.dataset.cursor ?? null);
      setHovering(!!el);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', leave);
    };
  }, [reducedMotion, x, y]);

  if (!enabled) return null;

  const ringSize = label ? 84 : hovering ? 54 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-paper/60 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          scale: pressed ? 0.85 : 1,
          backgroundColor: label ? 'rgba(198,255,61,1)' : 'rgba(198,255,61,0)',
          borderColor: label ? 'rgba(198,255,61,1)' : 'rgba(237,237,230,0.6)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {label && (
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-ink-950">{label}</span>
        )}
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-signal"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: label ? 0 : 1 }}
      />
    </div>
  );
}
