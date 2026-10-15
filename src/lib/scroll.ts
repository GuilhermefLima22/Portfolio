import Lenis from 'lenis';
import { frame, useAppStore, type SceneId } from '../store';

let lenis: Lenis | null = null;

/** Inicia o smooth scroll (desligado com prefers-reduced-motion). */
export function initSmoothScroll(): () => void {
  if (useAppStore.getState().reducedMotion) return () => {};
  lenis = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 1 });
  lenis.on('scroll', (l: Lenis) => {
    frame.scrollVelocity = l.velocity;
  });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: useAppStore.getState().reducedMotion ? 'auto' : 'smooth' });
}

export function lockScroll(lock: boolean) {
  if (lenis) {
    if (lock) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = lock ? 'hidden' : '';
}

/**
 * Observa as seções com [data-scene] e marca como ativa a que cruza
 * a linha central da viewport.
 */
export function observeScenes(): () => void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          useAppStore.getState().setScene(entry.target.getAttribute('data-scene') as SceneId);
        }
      }
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
