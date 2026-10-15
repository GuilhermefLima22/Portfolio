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

interface Stardust {
  angle: number;
  distance: number;
  speed: number;
  radius: number;
  alpha: number;
  phase: number;
  color: string;
}

/**
 * Constelação Cruzeiro do Sul (Símbolo do Brasil)
 * As 5 estrelas principais:
 * - Gamma Crucis (Rubídea / Gacrux - topo, gigante vermelha/dourada)
 * - Alpha Crucis (Estrela de Magalhães / Acrux - base, mais brilhante)
 * - Beta Crucis (Mimosa - braço esquerdo)
 * - Delta Crucis (Pálida / Imai - braço direito)
 * - Epsilon Crucis (Intrometida - 5ª estrela, menor, à direita do centro)
 */
const CRUX_STARS = [
  { id: 'gamma', name: 'Rubídea', rx: 0, ry: -0.46, size: 3.4, color: '#FFD79E', glow: '#FFA552' },
  { id: 'alpha', name: 'Acrux (Magalhães)', rx: 0.02, ry: 0.46, size: 4.0, color: '#FFFFFF', glow: '#C6FF3D' },
  { id: 'beta', name: 'Mimosa', rx: -0.38, ry: -0.06, size: 3.6, color: '#E0F2FE', glow: '#38BDF8' },
  { id: 'delta', name: 'Pálida', rx: 0.36, ry: -0.02, size: 2.8, color: '#E2FAD0', glow: '#C6FF3D' },
  { id: 'epsilon', name: 'Intrometida', rx: 0.16, ry: 0.17, size: 2.2, color: '#FFFFFF', glow: '#C6FF3D' },
];

export const MobileCosmos: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Apenas executa na versão mobile (< 768px)
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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Céu Estrelado de Fundo (Parallax em 3 camadas)
    const starCount = 130;
    const stars: Star[] = [];
    const colors = ['#FFFFFF', '#EDEDE6', '#C6FF3D', '#E2FAD0', '#38BDF8'];

    for (let i = 0; i < starCount; i++) {
      const isSignal = Math.random() < 0.14;
      const isCyan = !isSignal && Math.random() < 0.08;
      const color = isSignal ? '#C6FF3D' : isCyan ? '#38BDF8' : colors[Math.floor(Math.random() * 2)];

      const layer = Math.random();
      const speed = layer < 0.5 ? 0.07 : layer < 0.85 ? 0.2 : 0.42;
      const radius = layer < 0.5 ? 0.6 + Math.random() * 0.4 : layer < 0.85 ? 0.9 + Math.random() * 0.5 : 1.3 + Math.random() * 0.7;

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha: 0.2 + Math.random() * 0.65,
        twinkleSpeed: 0.02 + Math.random() * 0.035,
        phase: Math.random() * Math.PI * 2,
        speed,
        color,
      });
    }

    // 2. Partículas Elementais de Poeira Estelar (despertam quando chega ao final)
    const stardustCount = 36;
    const stardusts: Stardust[] = [];
    for (let i = 0; i < stardustCount; i++) {
      stardusts.push({
        angle: Math.random() * Math.PI * 2,
        distance: 15 + Math.random() * 110,
        speed: (0.005 + Math.random() * 0.012) * (Math.random() < 0.5 ? 1 : -1),
        radius: 0.7 + Math.random() * 1.5,
        alpha: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() < 0.5 ? '#C6FF3D' : Math.random() < 0.75 ? '#FFD23D' : '#38BDF8',
      });
    }

    // 3. Meteoros (Estrelas Cadentes)
    const meteors: Meteor[] = [];

    const spawnMeteor = () => {
      if (prefersReducedMotion) return;
      const startX = Math.random() * (width * 1.3) - width * 0.15;
      const startY = Math.random() * (height * 0.35) - 40;
      const speed = 11 + Math.random() * 7;
      const angle = (Math.PI / 180) * (36 + Math.random() * 12);

      meteors.push({
        x: startX,
        y: startY,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 75 + Math.random() * 65,
        alpha: 0.95,
        decay: 0.015 + Math.random() * 0.012,
        size: 1.6 + Math.random() * 1.2,
      });
    };

    let meteorTimer = setInterval(() => {
      if (Math.random() < 0.75) {
        spawnMeteor();
      }
    }, 2900);

    // 4. Scroll Tracking & Progress
    let currentScrollY = window.scrollY || 0;
    let targetScrollY = currentScrollY;
    let currentProgress = 0; // 0 (topo) a 1 (fim do site)

    const updateScrollMetrics = () => {
      targetScrollY = window.scrollY || 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const targetP = Math.min(Math.max(targetScrollY / maxScroll, 0), 1);
      return targetP;
    };

    let targetProgress = updateScrollMetrics();

    const handleScroll = () => {
      targetProgress = updateScrollMetrics();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      targetProgress = updateScrollMetrics();
    };
    window.addEventListener('resize', handleResize);

    // Função auxiliar para desenhar segmento progressivo
    const drawProgressiveLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      progress: number,
      color: string,
      lineWidth: number
    ) => {
      if (progress <= 0) return;
      const clampedP = Math.min(progress, 1);
      const curX = x1 + (x2 - x1) * clampedP;
      const curY = y1 + (y2 - y1) * clampedP;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(curX, curY);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // Ponto de luz na ponta do feixe que está se conectando
      if (clampedP > 0 && clampedP < 1) {
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#C6FF3D';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    // Função para desenhar pontas de difração (raios de estrela)
    const drawDiffractionSpikes = (cx: number, cy: number, length: number, alpha: number, color: string) => {
      if (alpha <= 0) return;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = alpha;

      // Raio horizontal
      ctx.beginPath();
      ctx.moveTo(cx - length, cy);
      ctx.lineTo(cx + length, cy);
      ctx.stroke();

      // Raio vertical
      ctx.beginPath();
      ctx.moveTo(cx, cy - length);
      ctx.lineTo(cx, cy + length);
      ctx.stroke();

      ctx.restore();
    };

    // Loop de Renderização 60fps
    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.02;

      // Interpolação suave do scroll e do progresso de rolagem
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      currentProgress += (targetProgress - currentProgress) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // --- 1. Céu Estrelado com Parallax ---
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const twinkle = 0.65 + 0.35 * Math.sin(star.phase);
        const alpha = star.baseAlpha * twinkle;

        const scrollOffset = currentScrollY * star.speed;
        let y = (star.y - scrollOffset) % height;
        if (y < 0) y += height;

        ctx.beginPath();
        ctx.arc(star.x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.08, Math.min(1, alpha));
        ctx.fill();

        if (star.radius > 1.2 && alpha > 0.6) {
          ctx.beginPath();
          ctx.arc(star.x, y, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = star.color === '#C6FF3D' ? 'rgba(198, 255, 61, 0.18)' : 'rgba(255, 255, 255, 0.12)';
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // --- 2. CRUZEIRO DO SUL (Conexão com a Rolagem & Grand Finale) ---
      // Posição no céu mobile: no terço superior direito, com sutil parallax vertical
      const cruxCenterX = width * 0.68;
      const cruxCenterY = height * 0.24 + currentProgress * 25;
      const cruxScale = Math.min(width * 0.38, 145);

      // Mapeamento das posições das 5 estrelas em pixels
      const starPositions = CRUX_STARS.map((s) => ({
        ...s,
        px: cruxCenterX + s.rx * cruxScale,
        py: cruxCenterY + s.ry * cruxScale,
      }));

      const gamma = starPositions[0]; // Topo
      const alphaStar = starPositions[1]; // Base
      const beta = starPositions[2]; // Esquerda
      const delta = starPositions[3]; // Direita
      const epsilon = starPositions[4]; // Intrometida

      // Ponto de interseção da cruz (para ramificar a Intrometida)
      const interX = (gamma.px + alphaStar.px) * 0.5;
      const interY = (beta.py + delta.py) * 0.5;

      // Fases da Conexão ao longo da rolagem (0 a 1):
      // Linha 1 (Eixo Vertical: Gamma -> Alpha): do progresso 0.05 ao 0.40
      const pLine1 = Math.min(Math.max((currentProgress - 0.04) / 0.36, 0), 1);
      // Linha 2 (Eixo Horizontal: Beta -> Delta): do progresso 0.38 ao 0.72
      const pLine2 = Math.min(Math.max((currentProgress - 0.36) / 0.36, 0), 1);
      // Linha 3 (Centro -> Intrometida / Epsilon): do progresso 0.70 ao 0.88
      const pLine3 = Math.min(Math.max((currentProgress - 0.68) / 0.2, 0), 1);

      // Fator do Grand Finale (quando atinge 0.85 a 1.0 - final do site)
      const finaleBloom = Math.min(Math.max((currentProgress - 0.85) / 0.15, 0), 1);

      // --- AURA & NEBULA ELEMENTAL AO CHEGAR AO FINAL ---
      if (finaleBloom > 0.01) {
        // 1. Resplendor Cósmico Radial (Nebula Aura)
        const nebulaRadius = cruxScale * (1.1 + Math.sin(time * 1.2) * 0.1);
        const nebulaGrad = ctx.createRadialGradient(
          cruxCenterX,
          cruxCenterY,
          10,
          cruxCenterX,
          cruxCenterY,
          nebulaRadius
        );
        nebulaGrad.addColorStop(0, `rgba(198, 255, 61, ${finaleBloom * 0.16})`);
        nebulaGrad.addColorStop(0.35, `rgba(56, 189, 248, ${finaleBloom * 0.1})`);
        nebulaGrad.addColorStop(0.7, `rgba(44, 107, 90, ${finaleBloom * 0.06})`);
        nebulaGrad.addColorStop(1, 'rgba(6, 7, 9, 0)');

        ctx.beginPath();
        ctx.arc(cruxCenterX, cruxCenterY, nebulaRadius, 0, Math.PI * 2);
        ctx.fillStyle = nebulaGrad;
        ctx.fill();

        // 2. Halo Estelar Anelar
        ctx.beginPath();
        ctx.arc(cruxCenterX, cruxCenterY, cruxScale * 0.78, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(198, 255, 61, ${finaleBloom * 0.18 + Math.sin(time * 2) * 0.05})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // 3. Poeira Estelar Elemental Orbitante
        stardusts.forEach((dust) => {
          dust.angle += dust.speed;
          dust.phase += 0.03;
          const curDist = dust.distance * (0.8 + finaleBloom * 0.35);
          const dx = cruxCenterX + Math.cos(dust.angle) * curDist;
          const dy = cruxCenterY + Math.sin(dust.angle) * curDist * 1.15;
          const dAlpha = dust.alpha * finaleBloom * (0.6 + 0.4 * Math.sin(dust.phase));

          ctx.beginPath();
          ctx.arc(dx, dy, dust.radius * (1 + finaleBloom * 0.3), 0, Math.PI * 2);
          ctx.fillStyle = dust.color;
          ctx.globalAlpha = Math.max(0, Math.min(1, dAlpha));
          ctx.fill();

          if (dust.radius > 1.2) {
            ctx.shadowColor = dust.color;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
        ctx.globalAlpha = 1;
      }

      // --- LINHAS DA CONSTELAÇÃO PROGRESSIVAS ---
      const baseLineAlpha = 0.22 + finaleBloom * 0.45 + Math.sin(time * 1.5) * 0.06;
      const lineColor = finaleBloom > 0.4 
        ? `rgba(198, 255, 61, ${baseLineAlpha})` 
        : `rgba(198, 255, 61, ${baseLineAlpha})`;

      // Linha Vertical: Gamma -> Alpha
      drawProgressiveLine(
        gamma.px,
        gamma.py,
        alphaStar.px,
        alphaStar.py,
        pLine1,
        lineColor,
        finaleBloom > 0.5 ? 1.4 : 1.0
      );

      // Linha Horizontal: Beta -> Delta
      drawProgressiveLine(
        beta.px,
        beta.py,
        delta.px,
        delta.py,
        pLine2,
        lineColor,
        finaleBloom > 0.5 ? 1.4 : 1.0
      );

      // Linha para a Intrometida: Centro -> Epsilon
      drawProgressiveLine(
        interX,
        interY,
        epsilon.px,
        epsilon.py,
        pLine3,
        `rgba(255, 255, 255, ${baseLineAlpha * 0.75})`,
        finaleBloom > 0.5 ? 1.1 : 0.85
      );

      // --- DESENHAR AS 5 ESTRELAS DO CRUZEIRO DO SUL ---
      starPositions.forEach((star, idx) => {
        const starTwinkle = 0.8 + 0.2 * Math.sin(time * 2 + idx * 1.2);
        const isConnected = 
          (idx <= 1 && pLine1 > 0.95) || 
          (idx >= 2 && idx <= 3 && pLine2 > 0.95) || 
          (idx === 4 && pLine3 > 0.95);

        const starSize = star.size * (1 + (isConnected ? 0.2 : 0) + finaleBloom * 0.35) * starTwinkle;

        // Brilho pulsante (Glow)
        ctx.beginPath();
        ctx.arc(star.px, star.py, starSize * (2.2 + finaleBloom * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = star.glow;
        ctx.globalAlpha = 0.18 + finaleBloom * 0.35 + (isConnected ? 0.12 : 0);
        ctx.fill();

        // Núcleo da estrela
        ctx.beginPath();
        ctx.arc(star.px, star.py, starSize, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 1;
        ctx.shadowColor = star.glow;
        ctx.shadowBlur = 8 + finaleBloom * 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Raios de Luz (Diffraction Spikes) no Grand Finale
        if (finaleBloom > 0.15) {
          const spikeLen = (starSize * 3.5 + 4) * finaleBloom;
          drawDiffractionSpikes(star.px, star.py, spikeLen, finaleBloom * 0.75, star.color);
        }
      });

      // --- LEGENDA POÉTICA DISCRETA AO FINAL DO SITE ---
      if (finaleBloom > 0.2) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, (finaleBloom - 0.2) * 1.25);
        ctx.textAlign = 'center';

        // Título da constelação
        ctx.font = '600 10.5px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#EDEDE6';
        ctx.letterSpacing = '0.22em';
        ctx.fillText('CRUZEIRO DO SUL', cruxCenterX, cruxCenterY + cruxScale * 0.72);

        // Subtítulo em reverência ao Brasil
        ctx.font = '500 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#C6FF3D';
        ctx.shadowColor = '#C6FF3D';
        ctx.shadowBlur = 6;
        ctx.fillText('✦ BRASIL ✦', cruxCenterX, cruxCenterY + cruxScale * 0.83);
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      // --- 3. METEOROS (Estrelas Cadentes com Rastro Luminoso) ---
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= m.decay;

        if (m.alpha <= 0 || m.x < -100 || m.y > height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.length;
        const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        grad.addColorStop(0.2, `rgba(198, 255, 61, ${m.alpha * 0.95})`);
        grad.addColorStop(0.7, `rgba(44, 107, 90, ${m.alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(198, 255, 61, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.size * (1 + finaleBloom * 0.3);
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
        ctx.shadowColor = '#C6FF3D';
        ctx.shadowBlur = 9;
        ctx.fill();
        ctx.shadowBlur = 0;
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
