import { useEffect, useRef } from 'react';

// Asymmetric star positions retain the recognizable silhouette without a rigid cross.
const CRUX = [
  { x: -0.09, y: -0.49, spread: 0.033 }, // Gacrux
  { x: 0.07, y: 0.49, spread: 0.045 }, // Acrux
  { x: -0.35, y: -0.06, spread: 0.035 }, // Mimosa
  { x: 0.31, y: -0.17, spread: 0.027 }, // Imai
  { x: 0.15, y: 0.15, spread: 0.018 }, // Epsilon
];

interface Particle {
  x: number; y: number; vx: number; vy: number;
  homeX: number; homeY: number;
  cloudX: number; cloudY: number;
  depth: number; phase: number; size: number; alpha: number;
  stiffness: number; tint: number; dust: boolean;
  link: number; along: number; ignition: number; anchor: number;
}

interface Meteor {
  x: number; y: number; age: number; speed: number; length: number;
}

/** Mobile counterpart of the desktop spring-driven, softly glowing particle field. */
export function MobileCosmos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.innerWidth >= 768) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = motionQuery.matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let previousTime = 0;
    let time = 0;
    let progress = 0;
    let targetProgress = 0;
    let scroll = window.scrollY;
    let nextMeteor = 4;
    let disposed = false;

    // Stable sampling keeps the composition intact across orientation changes.
    let seed = 25129;
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const gaussian = () => Math.sqrt(-2 * Math.log(Math.max(random(), 0.0001))) * Math.cos(random() * Math.PI * 2);
    const clamp = (n: number) => Math.max(0, Math.min(n, 1));
    const smooth = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p); };

    // Cache the soft falloff once, rather than calculating hundreds of gradients per frame.
    const sprites = ['237,237,230', '198,255,61', '159,206,170'].map((color) => {
      const sprite = document.createElement('canvas');
      sprite.width = sprite.height = 32;
      const brush = sprite.getContext('2d')!;
      const glow = brush.createRadialGradient(16, 16, 0, 16, 16, 16);
      glow.addColorStop(0, `rgba(${color},1)`);
      glow.addColorStop(0.16, `rgba(${color},0.85)`);
      glow.addColorStop(0.42, `rgba(${color},0.22)`);
      glow.addColorStop(1, `rgba(${color},0)`);
      brush.fillStyle = glow;
      brush.fillRect(0, 0, 32, 32);
      return sprite;
    });

    const particles: Particle[] = Array.from({ length: 680 }, (_, i) => {
      const star = CRUX[i % CRUX.length];
      let homeX = star.x + gaussian() * star.spread;
      let homeY = star.y + gaussian() * star.spread;
      const dust = i % 10 === 0;
      let link = -1;
      let along = 0;
      const ignition = [0.08, 0.34, 0.38, 0.65, 0.82][i % CRUX.length];
      if (dust) {
        homeX = gaussian() * 0.4;
        homeY = gaussian() * 0.5;
      } else if (i % 4 === 0) {
        // Three particle streams ignite in sequence as the page scrolls.
        link = (i / 4) % 3;
        const a = link === 0 ? CRUX[0] : link === 1 ? CRUX[2] : { x: 0.01, y: -0.11 };
        const b = CRUX[link === 0 ? 1 : link === 1 ? 3 : 4];
        along = random();
        homeX = a.x + (b.x - a.x) * along + gaussian() * 0.014;
        homeY = a.y + (b.y - a.y) * along + gaussian() * 0.016;
      }
      const cloudX = gaussian() * 0.55;
      const cloudY = gaussian() * 0.68;
      return {
        x: cloudX, y: cloudY, vx: 0, vy: 0, homeX, homeY, cloudX, cloudY,
        depth: random(), phase: random() * Math.PI * 2,
        size: random() < 0.035 ? 6 : 1.8 + random() * 2.3,
        alpha: dust ? 0.15 : 0.3 + random() * 0.45,
        stiffness: 0.012 + random() * 0.025,
        tint: random() < 0.24 ? 1 : random() < 0.18 ? 2 : 0,
        dust, link, along, ignition, anchor: i % CRUX.length,
      };
    });
    const sky = Array.from({ length: 75 }, () => ({
      x: random(), y: random(), depth: random(), phase: random() * Math.PI * 2,
      size: 1.5 + random() * 2, tint: random() < 0.12 ? 1 : 0,
    }));
    const meteors: Meteor[] = [];

    const measureProgress = () => {
      const contact = document.getElementById('contato');
      const end = contact
        ? contact.getBoundingClientRect().top + window.scrollY - height * 0.45
        : document.documentElement.scrollHeight - height;
      targetProgress = clamp(window.scrollY / Math.max(end, 1));
    };

    function schedule() {
      if (!raf && !document.hidden && !disposed) raf = requestAnimationFrame(render);
    }

    const resize = () => {
      const oldWidth = width;
      const oldHeight = height;
      width = window.innerWidth;
      height = window.innerHeight;
      if (width !== oldWidth || height !== oldHeight) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      measureProgress();
      schedule();
    };

    function render(timestamp: number) {
      raf = 0;
      const dt = previousTime ? Math.min((timestamp - previousTime) / 1000, 0.04) : 1 / 60;
      previousTime = timestamp;
      const f = dt * 60;
      if (!reduced) time += dt;
      progress += (targetProgress - progress) * (reduced ? 1 : 1 - Math.pow(0.93, f));
      scroll += (window.scrollY - scroll) * (reduced ? 1 : 1 - Math.pow(0.9, f));
      const formation = smooth((progress - 0.02) / 0.85);
      const span = Math.min(width * 0.88, height * 0.65, 460);
      const centerX = width * 0.52;
      const centerY = height * (0.45 + progress * 0.07);
      const tilt = -0.13 + (reduced ? 0 : Math.sin(time * 0.13) * 0.025);
      const cos = Math.cos(tilt);
      const sin = Math.sin(tilt);
      ctx.clearRect(0, 0, width, height);

      for (const star of sky) {
        const travel = reduced ? 0 : time * (0.7 + star.depth * 1.4);
        const y = ((star.y * height - scroll * (0.025 + star.depth * 0.055) + travel) % height + height) % height;
        const x = ((star.x * width + (reduced ? 0 : Math.sin(time * 0.09 + star.phase) * 12)) % width + width) % width;
        ctx.globalAlpha = 0.18 + 0.12 * Math.sin(time * 0.5 + star.phase);
        ctx.drawImage(sprites[star.tint], x, y, star.size, star.size);
      }

      ctx.globalCompositeOperation = 'lighter';
      // Each star wanders independently; its dust stream follows the moving endpoints.
      const wander = CRUX.map((_, i) => ({
        x: reduced ? 0 : Math.sin(time * 0.24 + i * 1.7) * 0.028 + Math.cos(time * 0.11 + i) * 0.012,
        y: reduced ? 0 : Math.cos(time * 0.19 + i * 1.3) * 0.032,
      }));
      for (const p of particles) {
        const start = p.link === 0 ? 0.06 : p.link === 1 ? 0.36 : 0.67;
        const duration = p.link === 2 ? 0.2 : 0.3;
        const front = clamp((progress - start) / duration) * 1.15;
        const connected = p.link >= 0
          ? smooth((front - p.along) / 0.15)
          : smooth((progress - p.ignition + 0.1) / 0.18);
        // A brighter leading edge travels through the dust, then leaves a visible trail.
        const leading = p.link >= 0 && front > 0 && front < 1.15
          ? Math.exp(-Math.pow((front - p.along) / 0.09, 2))
          : 0;
        const gathering = p.dust ? formation : Math.max(formation * 0.3, connected);
        let anchorX = wander[p.anchor].x;
        let anchorY = wander[p.anchor].y;
        if (p.link >= 0) {
          const a = p.link === 0 ? wander[0] : p.link === 1 ? wander[2] : {
            x: (wander[0].x + wander[1].x + wander[2].x + wander[3].x) / 4,
            y: (wander[0].y + wander[1].y + wander[2].y + wander[3].y) / 4,
          };
          const b = wander[p.link === 0 ? 1 : p.link === 1 ? 3 : 4];
          anchorX = a.x + (b.x - a.x) * p.along;
          anchorY = a.y + (b.y - a.y) * p.along;
        }
        // Independent elliptical orbits keep the settled field alive, without moving the page.
        const orbit = p.dust ? 0.065 : 0.008 + p.depth * 0.016;
        const speed = 0.3 + p.depth * 0.35;
        const driftX = reduced ? 0 : Math.cos(time * speed + p.phase) * orbit;
        const driftY = reduced ? 0 : Math.sin(time * speed * 0.83 + p.phase) * orbit * 1.3;
        const cloudDriftX = reduced ? 0 : Math.sin(time * 0.2 + p.phase) * 0.09;
        const cloudDriftY = reduced ? 0 : Math.cos(time * 0.16 + p.phase) * 0.1;
        const tx = (p.cloudX + cloudDriftX) * (1 - gathering) + (p.homeX + anchorX) * gathering + driftX;
        const ty = (p.cloudY + cloudDriftY) * (1 - gathering) + (p.homeY + anchorY) * gathering + driftY;
        if (reduced) {
          p.x = tx; p.y = ty; p.vx = p.vy = 0;
        } else {
          const damping = Math.pow(0.86, f);
          p.vx = p.vx * damping + (tx - p.x) * p.stiffness * f;
          p.vy = p.vy * damping + (ty - p.y) * p.stiffness * f;
          p.x += p.vx * f; p.y += p.vy * f;
        }
        const depthDrift = reduced ? 0 : Math.sin(time * 0.27 + p.phase) * 0.045;
        const perspective = 0.88 + p.depth * 0.2 + depthDrift;
        const x = centerX + (p.x * cos - p.y * sin) * span * perspective;
        const y = centerY + (p.x * sin + p.y * cos) * span * perspective;
        const size = p.size * (1 + p.depth * 0.35 + connected * 0.2 + leading * 0.65);
        ctx.globalAlpha = Math.min(1, p.alpha * (0.32 + connected * 0.95 + leading * 0.9) * (0.9 + Math.sin(time * 0.7 + p.phase) * 0.1));
        ctx.drawImage(sprites[p.tint], x - size / 2, y - size / 2, size, size);
      }

      // Occasional shooting stars remain secondary to the particle composition.
      if (!reduced) {
        nextMeteor -= dt;
        if (nextMeteor <= 0 && meteors.length < 3) {
          meteors.push({ x: width * (0.4 + random() * 0.7), y: random() * height * 0.35, age: 0, speed: 260 + random() * 120, length: 45 + random() * 40 });
          nextMeteor = progress > 0.9 ? 1.5 + random() * 2 : 5 + random() * 5;
        }
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.age += dt; m.x -= m.speed * dt; m.y += m.speed * dt * 0.65;
          if (m.age > 1.4) { meteors.splice(i, 1); continue; }
          ctx.globalAlpha = Math.sin(Math.min(m.age / 1.4, 1) * Math.PI) * 0.45;
          const tail = ctx.createLinearGradient(m.x, m.y, m.x + m.length, m.y - m.length * 0.65);
          tail.addColorStop(0, '#edede6'); tail.addColorStop(1, 'transparent');
          ctx.strokeStyle = tail; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x + m.length, m.y - m.length * 0.65); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      if (!reduced) schedule();
    }

    const onScroll = () => { measureProgress(); schedule(); };
    const onVisibility = () => {
      cancelAnimationFrame(raf); raf = 0; previousTime = 0;
      schedule();
    };
    const onMotion = () => { reduced = motionQuery.matches; previousTime = 0; schedule(); };
    resize();
    const observer = new ResizeObserver(() => { measureProgress(); schedule(); });
    const main = document.querySelector('main');
    if (main) observer.observe(main);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    motionQuery.addEventListener('change', onMotion);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      motionQuery.removeEventListener('change', onMotion);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 block md:hidden" style={{ width: '100%', height: '100%' }} />;
}
