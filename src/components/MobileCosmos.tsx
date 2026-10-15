import React, { useEffect, useRef } from 'react';

interface SkyStar {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
  speed: number;
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

interface StardustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  alpha: number;
  decay: number;
  color: string;
  seed: number;
}

/**
 * Constelação Cruzeiro do Sul (Símbolo do Brasil 🇧🇷):
 * 5 estrelas principais em escala ampliada, imponente e centralizada:
 * - Gamma Crucis (Rubídea / Gacrux): topo da cruz, tom marfim/dourado sutil
 * - Alpha Crucis (Acrux / Estrela de Magalhães): base da cruz, branca pura e luminosa
 * - Beta Crucis (Mimosa): braço esquerdo, branco-cristal
 * - Delta Crucis (Pálida / Imai): braço direito, branca com leve toque esmeralda
 * - Epsilon Crucis (Intrometida): menor, posicionada discretamente à direita do eixo
 */
const CRUX_STARS = [
  { id: 'gamma', name: 'Rubídea', rx: 0, ry: -0.48, size: 4.5, color: '#FEF3C7', glow: 'rgba(254, 243, 199, 0.22)' },
  { id: 'alpha', name: 'Acrux', rx: 0.02, ry: 0.48, size: 5.2, color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.28)' },
  { id: 'beta', name: 'Mimosa', rx: -0.42, ry: -0.06, size: 4.6, color: '#F8FAFC', glow: 'rgba(248, 250, 252, 0.24)' },
  { id: 'delta', name: 'Pálida', rx: 0.40, ry: -0.02, size: 4.0, color: '#DCFCE7', glow: 'rgba(198, 255, 61, 0.2)' },
  { id: 'epsilon', name: 'Intrometida', rx: 0.18, ry: 0.18, size: 2.8, color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.2)' },
];

export const MobileCosmos: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Executa estritamente no ambiente mobile (< 768px)
    if (typeof window === 'undefined' || window.innerWidth >= 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Céu Estrelado Equilibrado: maioria brancas/neutras, algumas verdes discretas
    const skyStarCount = 110;
    const skyStars: SkyStar[] = [];
    const neutralColors = ['#FFFFFF', '#F1F5F9', '#E2E8F0', '#EDEDE6'];

    for (let i = 0; i < skyStarCount; i++) {
      // 18% em verde sutil (#C6FF3D), o restante em tons brancos/neutros elegantes
      const isGreen = Math.random() < 0.18;
      const color = isGreen ? '#C6FF3D' : neutralColors[Math.floor(Math.random() * neutralColors.length)];

      const layer = Math.random();
      const speed = layer < 0.5 ? 0.06 : layer < 0.85 ? 0.18 : 0.38;
      const radius = layer < 0.5 ? 0.7 + Math.random() * 0.4 : layer < 0.85 ? 1.0 + Math.random() * 0.5 : 1.4 + Math.random() * 0.7;

      skyStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha: 0.25 + Math.random() * 0.55,
        twinkleSpeed: 0.018 + Math.random() * 0.032,
        phase: Math.random() * Math.PI * 2,
        speed,
        color,
      });
    }

    // 2. Partículas Elementais para o Grand Finale (dispersão cósmica fluida ao redor da cruz)
    const particlePoolCount = 65;
    const particles: StardustParticle[] = [];
    const particleColors = ['#FFFFFF', '#F8FAFC', '#C6FF3D', '#E2FAD0', '#FEF08A'];

    for (let i = 0; i < particlePoolCount; i++) {
      particles.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseRadius: 0.6 + Math.random() * 1.4,
        alpha: 0.2 + Math.random() * 0.6,
        decay: 0.003 + Math.random() * 0.005,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        seed: Math.random() * 100,
      });
    }

    // 4. Meteoros (Estrelas Cadentes & Chuva de Meteoros no Clímax)
    const meteors: Meteor[] = [];

    const spawnMeteor = (isShower = false) => {
      if (prefersReducedMotion) return;

      // Posição de origem: na chuva cobre uma área ampla do céu, incluindo início no meio
      const startX = isShower
        ? Math.random() * (width * 1.4) - width * 0.2
        : Math.random() * (width * 1.1) - width * 0.05;

      const startY = isShower
        ? Math.random() * (height * 0.65) - 40
        : Math.random() * (height * 0.3) - 20;

      // Velocidade: na chuva há meteoros rápidos e dinâmicos cortando a atmosfera
      const speed = isShower ? 13 + Math.random() * 9 : 10 + Math.random() * 5;

      // Ângulo convergente do radiante (entre 33° e 49°)
      const angleDeg = isShower ? 33 + Math.random() * 16 : 36 + Math.random() * 12;
      const angle = (Math.PI / 180) * angleDeg;

      const length = isShower ? 85 + Math.random() * 95 : 65 + Math.random() * 55;
      const alpha = isShower ? 0.75 + Math.random() * 0.25 : 0.8;
      const decay = isShower ? 0.012 + Math.random() * 0.014 : 0.016 + Math.random() * 0.01;
      const size = isShower ? 1.0 + Math.random() * 1.3 : 1.3 + Math.random() * 0.8;

      meteors.push({
        x: startX,
        y: startY,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length,
        alpha,
        decay,
        size,
      });
    };

    // 4. Scroll Tracking: 100% ao atingir o início da seção de Contato
    let currentScrollY = window.scrollY || 0;
    let targetScrollY = currentScrollY;
    let currentProgress = 0;

    const calculateTargetProgress = () => {
      targetScrollY = window.scrollY || 0;
      const contatoEl = document.getElementById('contato');
      if (contatoEl) {
        // Ao chegar perto da seção #contato, o progresso atinge 100%
        const contatoTop = contatoEl.offsetTop;
        const triggerDistance = Math.max(contatoTop - window.innerHeight * 0.45, 1);
        return Math.min(Math.max(targetScrollY / triggerDistance, 0), 1);
      }
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight - 300, 1);
      return Math.min(Math.max(targetScrollY / maxScroll, 0), 1);
    };

    let targetProgress = calculateTargetProgress();

    const handleScroll = () => {
      targetProgress = calculateTargetProgress();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Função para desenhar linhas de conexão BRANCAS puras e elegantes
    const drawWhiteConnection = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      progress: number,
      alpha: number,
      lineWidth: number
    ) => {
      if (progress <= 0) return;
      const p = Math.min(progress, 1);
      const curX = x1 + (x2 - x1) * p;
      const curY = y1 + (y2 - y1) * p;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(curX, curY);
      // Linha estritamente branca, fina e sutil
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // Ponto suave de luz que viaja na ponta da conexão
      if (p > 0.02 && p < 0.99) {
        ctx.beginPath();
        ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    // Função para desenhar raios de estrela (diffraction spikes) finos e discretos
    const drawSubtleSpikes = (cx: number, cy: number, length: number, alpha: number) => {
      if (alpha <= 0) return;
      ctx.save();
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      ctx.moveTo(cx - length, cy);
      ctx.lineTo(cx + length, cy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy - length);
      ctx.lineTo(cx, cy + length);
      ctx.stroke();

      ctx.restore();
    };

    // Loop de Renderização Principal 60fps
    let animationId: number;
    let time = 0;
    let showerCooldown = 0;
    let normalMeteorCooldown = 60;

    const render = () => {
      time += 0.02;

      // Interpolação fluida do scroll e do progresso
      currentScrollY += (targetScrollY - currentScrollY) * 0.09;
      currentProgress += (targetProgress - currentProgress) * 0.07;

      // Fator de Grand Finale ao entrar na seção de Contato (0.85 a 1.0)
      const finaleBloom = Math.min(Math.max((currentProgress - 0.85) / 0.15, 0), 1);

      ctx.clearRect(0, 0, width, height);

      // --- 1. Céu Estrelado Neutro & Verde com Parallax ---
      skyStars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const twinkle = 0.7 + 0.3 * Math.sin(star.phase);
        const alpha = star.baseAlpha * twinkle;

        const scrollOffset = currentScrollY * star.speed;
        let y = (star.y - scrollOffset) % height;
        if (y < 0) y += height;

        ctx.beginPath();
        ctx.arc(star.x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, alpha));
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // --- 2. CRUZEIRO DO SUL: CENTRALIZADO, AMPLIADO E MAJESTOSO ---
      // Centralizado horizontalmente no meio da tela (width * 0.5)
      const cruxCenterX = width * 0.5;
      // Posicionado de forma ampla para cobrir o centro da tela
      const cruxCenterY = Math.min(height * 0.38, 290) + currentProgress * 25;
      // Envergadura significativamente ampliada para preencher o espaço vertical e horizontal
      const cruxSpan = Math.min(width * 0.82, 340);

      // Posições das 5 estrelas em pixels
      const starPositions = CRUX_STARS.map((s) => ({
        ...s,
        px: cruxCenterX + s.rx * cruxSpan,
        py: cruxCenterY + s.ry * cruxSpan,
      }));

      const gamma = starPositions[0]; // Topo
      const alphaStar = starPositions[1]; // Base
      const beta = starPositions[2]; // Esquerda
      const delta = starPositions[3]; // Direita
      const epsilon = starPositions[4]; // Intrometida

      // Ponto central de interseção da cruz
      const interX = (gamma.px + alphaStar.px) * 0.5;
      const interY = (beta.py + delta.py) * 0.5;

      // Progressão das conexões sincronizadas com o scroll:
      // Linha 1 (Eixo Vertical: Gamma -> Alpha): 0.05 a 0.45 (Hero -> Sobre)
      const pLine1 = Math.min(Math.max((currentProgress - 0.04) / 0.4, 0), 1);
      // Linha 2 (Eixo Horizontal: Beta -> Delta): 0.38 a 0.75 (Sobre -> Projetos -> Stack)
      const pLine2 = Math.min(Math.max((currentProgress - 0.36) / 0.37, 0), 1);
      // Linha 3 (Centro -> Intrometida / Epsilon): 0.70 a 0.90 (Chegando em Contato)
      const pLine3 = Math.min(Math.max((currentProgress - 0.68) / 0.22, 0), 1);

      // --- CHUVA DE METEOROS NO GRAND FINALE (AO CHEGAR NO CONTATO) ---
      if (!prefersReducedMotion) {
        if (finaleBloom > 0.08) {
          showerCooldown--;
          if (showerCooldown <= 0) {
            // Cadência intensa de chuva de meteoros: novos meteoros velozes a cada 5 a 14 frames
            const cadence = Math.max(5, Math.floor(17 - finaleBloom * 11 + Math.random() * 4));
            showerCooldown = cadence;

            // No ápice do clímax, disparamos até 2 meteoros quase simultâneos
            const count = finaleBloom > 0.45 && Math.random() < 0.5 ? 2 : 1;
            for (let c = 0; c < count; c++) {
              if (meteors.length < 22) {
                spawnMeteor(true);
              }
            }
          }
        } else {
          normalMeteorCooldown--;
          if (normalMeteorCooldown <= 0) {
            normalMeteorCooldown = 180 + Math.floor(Math.random() * 120); // a cada ~3 a 5s
            if (meteors.length < 3) {
              spawnMeteor(false);
            }
          }
        }
      }

      // --- EFEITO FINAL ELEMENTAL PROFISSIONAL (PARTÍCULAS & NÉVOA CÓSMICA) ---
      if (finaleBloom > 0.01) {
        // 1. Resplendor de Fundo Suave e Discreto (Sem formas geométricas rígidas)
        const nebulaRadius = cruxSpan * (1.15 + Math.sin(time * 0.8) * 0.08);
        const nebulaGrad = ctx.createRadialGradient(
          cruxCenterX,
          cruxCenterY,
          10,
          cruxCenterX,
          cruxCenterY,
          nebulaRadius
        );
        nebulaGrad.addColorStop(0, `rgba(198, 255, 61, ${finaleBloom * 0.08})`);
        nebulaGrad.addColorStop(0.4, `rgba(255, 255, 255, ${finaleBloom * 0.04})`);
        nebulaGrad.addColorStop(1, 'rgba(6, 7, 9, 0)');

        ctx.beginPath();
        ctx.arc(cruxCenterX, cruxCenterY, nebulaRadius, 0, Math.PI * 2);
        ctx.fillStyle = nebulaGrad;
        ctx.fill();

        // 2. Partículas Elementais Flutuantes & Poeira Cósmica em volta da Cruz
        particles.forEach((p, idx) => {
          const angle = time * 0.3 + idx * 0.35 + p.seed;
          const distVariation = Math.sin(time * 0.5 + idx) * 25;
          const targetDist = cruxSpan * 0.32 + (idx % 4) * (cruxSpan * 0.16) + distVariation;

          p.x = cruxCenterX + Math.cos(angle) * targetDist;
          p.y = cruxCenterY + Math.sin(angle) * (targetDist * 1.15);

          const pAlpha = p.alpha * finaleBloom * (0.6 + 0.4 * Math.sin(time * 2 + p.seed));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseRadius * (1 + finaleBloom * 0.25), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, Math.min(0.85, pAlpha));
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }

      // --- LINHAS DE CONEXÃO BRANCAS, FINAS E ELEGANTES ---
      // Opacidade comedida para permanecer em segundo plano sem brigar com o texto
      const lineAlpha = 0.28 + finaleBloom * 0.35 + Math.sin(time * 1.5) * 0.05;
      const lineWidth = finaleBloom > 0.5 ? 1.4 : 1.1;

      // 1. Linha Vertical (Gamma -> Alpha)
      drawWhiteConnection(gamma.px, gamma.py, alphaStar.px, alphaStar.py, pLine1, lineAlpha, lineWidth);

      // 2. Linha Horizontal (Beta -> Delta)
      drawWhiteConnection(beta.px, beta.py, delta.px, delta.py, pLine2, lineAlpha, lineWidth);

      // 3. Linha para a Intrometida (Centro -> Epsilon)
      drawWhiteConnection(interX, interY, epsilon.px, epsilon.py, pLine3, lineAlpha * 0.85, lineWidth * 0.9);

      // --- AS 5 ESTRELAS DO CRUZEIRO DO SUL (LEVES, EQUILIBRADAS E SUTIS) ---
      starPositions.forEach((star, idx) => {
        const starTwinkle = 0.9 + 0.1 * Math.sin(time * 2 + idx * 1.3);
        const isConnected =
          (idx <= 1 && pLine1 > 0.95) ||
          (idx >= 2 && idx <= 3 && pLine2 > 0.95) ||
          (idx === 4 && pLine3 > 0.95);

        const currentStarSize = star.size * (1 + (isConnected ? 0.2 : 0) + finaleBloom * 0.25) * starTwinkle;

        // Halo suave de segundo plano (opacidade contida para não cegar ou atravessar as letras)
        ctx.beginPath();
        ctx.arc(star.px, star.py, currentStarSize * (2.2 + finaleBloom * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = star.glow;
        ctx.fill();

        // Núcleo nítido e elegante da estrela
        ctx.beginPath();
        ctx.arc(star.px, star.py, currentStarSize, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 0.95;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 6 + finaleBloom * 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Raios sutis de difração estelar no final (finos e misteriosos)
        if (finaleBloom > 0.15) {
          const spikeLen = (currentStarSize * 3 + 3) * finaleBloom;
          drawSubtleSpikes(star.px, star.py, spikeLen, finaleBloom * 0.55);
        }
      });

      // --- 3. METEOROS & CHUVA DE METEOROS NO FUNDO ---
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= m.decay;

        if (m.alpha <= 0 || m.x < -120 || m.y > height + 120) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.length;
        const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha * 0.95})`);
        grad.addColorStop(0.2, `rgba(198, 255, 61, ${m.alpha * 0.75})`);
        grad.addColorStop(0.7, `rgba(44, 107, 90, ${m.alpha * 0.25})`);
        grad.addColorStop(1, 'rgba(198, 255, 61, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Ponto brilhante na cabeça do meteoro
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 block md:hidden"
      style={{ width: '100vw', height: '100vh', opacity: 0.9 }}
    />
  );
};
