import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
  speed: number;
}

interface ConstellationNode {
  x: number; // 0 a 1 (percentual da largura)
  y: number; // em pixels de altura virtual
  label?: string;
}

interface Constellation {
  nodes: ConstellationNode[];
  edges: [number, number][];
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  decay: number;
  size: number;
}

export const MobileCosmos: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Apenas executa em mobile
    if (typeof window === 'undefined' || window.innerWidth >= 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Preferência por movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Gerar estrelas com diferentes camadas de profundidade
    const starCount = 140;
    const stars: Star[] = [];
    const colors = ['#FFFFFF', '#EDEDE6', '#C6FF3D', '#E2FAD0', '#38BDF8'];

    for (let i = 0; i < starCount; i++) {
      const isSignal = Math.random() < 0.15;
      const isCyan = !isSignal && Math.random() < 0.08;
      const color = isSignal ? '#C6FF3D' : isCyan ? '#38BDF8' : colors[Math.floor(Math.random() * 2)];

      // Camadas de profundidade: 0 (fundo distante), 1 (médio), 2 (primeiro plano)
      const layer = Math.random();
      const speed = layer < 0.5 ? 0.08 : layer < 0.85 ? 0.22 : 0.45;
      const radius = layer < 0.5 ? 0.6 + Math.random() * 0.4 : layer < 0.85 ? 0.9 + Math.random() * 0.5 : 1.3 + Math.random() * 0.8;

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha: 0.25 + Math.random() * 0.65,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
        speed,
        color,
      });
    }

    // 2. Constelações sutis distribuídas pela altura da página
    const constellations: Constellation[] = [
      {
        nodes: [
          { x: 0.2, y: 180 },
          { x: 0.38, y: 150 },
          { x: 0.55, y: 210 },
          { x: 0.72, y: 170 },
          { x: 0.85, y: 230 },
        ],
        edges: [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
        ],
      },
      {
        nodes: [
          { x: 0.15, y: 540 },
          { x: 0.32, y: 590 },
          { x: 0.48, y: 520 },
          { x: 0.68, y: 570 },
          { x: 0.82, y: 510 },
          { x: 0.52, y: 640 },
        ],
        edges: [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
          [1, 5],
          [5, 3],
        ],
      },
    ];

    // 3. Meteoros (Estrelas Cadentes)
    const meteors: Meteor[] = [];

    const spawnMeteor = () => {
      if (prefersReducedMotion) return;
      // Spawna na parte superior ou topo direito
      const startX = Math.random() * (width * 1.2) - width * 0.1;
      const startY = Math.random() * (height * 0.4) - 50;
      const speed = 10 + Math.random() * 7;
      const angle = (Math.PI / 180) * (38 + Math.random() * 12); // ~45 graus

      meteors.push({
        x: startX,
        y: startY,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 70 + Math.random() * 60,
        alpha: 0.9,
        decay: 0.016 + Math.random() * 0.012,
        size: 1.5 + Math.random() * 1.2,
      });
    };

    // Spawn periódico de meteoros
    let meteorTimer = setInterval(() => {
      if (Math.random() < 0.8) {
        spawnMeteor();
      }
    }, 2800);

    // Scroll tracking
    let currentScrollY = window.scrollY || 0;
    let targetScrollY = currentScrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    // Loop de Renderização
    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      // Interpolação suave do scroll (efeito inércia)
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // --- Desenhar Constelações Fundo ---
      const constAlpha = 0.14 + Math.sin(time * 0.8) * 0.05;
      constellations.forEach((c) => {
        // Conexões (arestas)
        ctx.beginPath();
        c.edges.forEach(([fromIdx, toIdx]) => {
          const from = c.nodes[fromIdx];
          const to = c.nodes[toIdx];

          const fromY = ((from.y - currentScrollY * 0.18) % (height * 1.5) + height * 1.5) % (height * 1.5) - height * 0.25;
          const toY = ((to.y - currentScrollY * 0.18) % (height * 1.5) + height * 1.5) % (height * 1.5) - height * 0.25;

          ctx.moveTo(from.x * width, fromY);
          ctx.lineTo(to.x * width, toY);
        });
        ctx.strokeStyle = `rgba(198, 255, 61, ${constAlpha})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();

        // Nós da constelação
        c.nodes.forEach((node) => {
          const ny = ((node.y - currentScrollY * 0.18) % (height * 1.5) + height * 1.5) % (height * 1.5) - height * 0.25;
          ctx.beginPath();
          ctx.arc(node.x * width, ny, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(198, 255, 61, ${constAlpha * 2.5})`;
          ctx.shadowColor = '#C6FF3D';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      // --- Desenhar Estrelas com Parallax ---
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const twinkle = 0.6 + 0.4 * Math.sin(star.phase);
        const alpha = star.baseAlpha * twinkle;

        // Deslocamento vertical relativo ao scroll da página (parallax)
        const scrollOffset = currentScrollY * star.speed;
        let y = (star.y - scrollOffset) % height;
        if (y < 0) y += height;

        ctx.beginPath();
        ctx.arc(star.x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.08, Math.min(1, alpha));
        ctx.fill();

        // Brilho suave nas estrelas maiores
        if (star.radius > 1.2 && alpha > 0.6) {
          ctx.beginPath();
          ctx.arc(star.x, y, star.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = star.color === '#C6FF3D' ? 'rgba(198, 255, 61, 0.2)' : 'rgba(255, 255, 255, 0.15)';
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // --- Desenhar Meteoros (Estrelas Cadentes) ---
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= m.decay;

        if (m.alpha <= 0 || m.x < -100 || m.y > height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        // Desenhar rastro gradiente
        const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.length;
        const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        grad.addColorStop(0.2, `rgba(198, 255, 61, ${m.alpha * 0.9})`);
        grad.addColorStop(0.7, `rgba(44, 107, 90, ${m.alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(198, 255, 61, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Cabeça brilhante do meteoro
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
        ctx.shadowColor = '#C6FF3D';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    // Pausar se a aba estiver oculta para economizar bateria do celular
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(meteorTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 block md:hidden"
      style={{ opacity: 0.95 }}
    />
  );
};
