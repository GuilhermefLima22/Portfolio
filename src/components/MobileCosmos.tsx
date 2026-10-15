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
 * As 5 estrelas astronômicas do Cruzeiro do Sul (Símbolo do Brasil 🇧🇷):
 * - Gamma Crucis (Rubídea / Gacrux): topo da cruz, gigante vermelho-dourada
 * - Alpha Crucis (Acrux / Estrela de Magalhães): base da cruz, a mais brilhante
 * - Beta Crucis (Mimosa): braço esquerdo, branco-azulada brilhante
 * - Delta Crucis (Pálida / Imai): braço direito
 * - Epsilon Crucis (Intrometida): a 5ª estrela, menor, posicionada à direita do eixo
 */
const CRUX_STARS = [
  { id: 'gamma', name: 'Rubídea', rx: 0, ry: -0.48, size: 4.6, color: '#FFAA5C', glow: '#FF8833', label: 'γ' },
  { id: 'alpha', name: 'Acrux', rx: 0.02, ry: 0.48, size: 5.4, color: '#FFFFFF', glow: '#C6FF3D', label: 'α' },
  { id: 'beta', name: 'Mimosa', rx: -0.42, ry: -0.06, size: 5.0, color: '#E0F2FE', glow: '#38BDF8', label: 'β' },
  { id: 'delta', name: 'Pálida', rx: 0.40, ry: -0.02, size: 4.2, color: '#E2FAD0', glow: '#C6FF3D', label: 'δ' },
  { id: 'epsilon', name: 'Intrometida', rx: 0.18, ry: 0.18, size: 3.4, color: '#FFFFFF', glow: '#C6FF3D', label: 'ε' },
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

    // 1. Céu Estrelado com Parallax
    const starCount = 120;
    const stars: Star[] = [];
    const starColors = ['#FFFFFF', '#EDEDE6', '#C6FF3D', '#E2FAD0', '#38BDF8', '#FFD23D'];

    for (let i = 0; i < starCount; i++) {
      const isNeon = Math.random() < 0.18;
      const isGold = !isNeon && Math.random() < 0.1;
      const isCyan = !isNeon && !isGold && Math.random() < 0.1;
      const color = isNeon ? '#C6FF3D' : isGold ? '#FFD23D' : isCyan ? '#38BDF8' : starColors[Math.floor(Math.random() * 2)];

      const layer = Math.random();
      const speed = layer < 0.5 ? 0.08 : layer < 0.85 ? 0.22 : 0.45;
      const radius = layer < 0.5 ? 0.8 + Math.random() * 0.5 : layer < 0.85 ? 1.2 + Math.random() * 0.6 : 1.7 + Math.random() * 0.9;

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        baseAlpha: 0.35 + Math.random() * 0.6,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
        speed,
        color,
      });
    }

    // 2. Partículas Elementais de Poeira Cósmica para o Grand Finale
    const stardustCount = 42;
    const stardusts: Stardust[] = [];
    for (let i = 0; i < stardustCount; i++) {
      stardusts.push({
        angle: Math.random() * Math.PI * 2,
        distance: 20 + Math.random() * 120,
        speed: (0.006 + Math.random() * 0.014) * (Math.random() < 0.5 ? 1 : -1),
        radius: 0.8 + Math.random() * 1.8,
        alpha: 0.35 + Math.random() * 0.65,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() < 0.55 ? '#C6FF3D' : Math.random() < 0.8 ? '#FFD23D' : '#38BDF8',
      });
    }

    // 3. Meteoros (Estrelas Cadentes)
    const meteors: Meteor[] = [];

    const spawnMeteor = () => {
      if (prefersReducedMotion) return;
      const startX = Math.random() * (width * 1.3) - width * 0.15;
      const startY = Math.random() * (height * 0.35) - 40;
      const speed = 12 + Math.random() * 7;
      const angle = (Math.PI / 180) * (36 + Math.random() * 12);

      meteors.push({
        x: startX,
        y: startY,
        vx: -Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 80 + Math.random() * 70,
        alpha: 0.98,
        decay: 0.015 + Math.random() * 0.012,
        size: 1.8 + Math.random() * 1.2,
      });
    };

    let meteorTimer = setInterval(() => {
      if (Math.random() < 0.8) {
        spawnMeteor();
      }
    }, 2800);

    // 4. Scroll Tracking calibrado: 100% ao atingir o #contato (e não no rodapé!)
    let currentScrollY = window.scrollY || 0;
    let targetScrollY = currentScrollY;
    let currentProgress = 0;

    const calculateTargetProgress = () => {
      targetScrollY = window.scrollY || 0;
      const contatoEl = document.getElementById('contato');
      if (contatoEl) {
        // Quando o topo de #contato entra na viewport (ou fica 180px antes), atinge 1.0 (100%)!
        const contatoTop = contatoEl.offsetTop;
        const triggerDistance = Math.max(contatoTop - window.innerHeight * 0.45, 1);
        return Math.min(Math.max(targetScrollY / triggerDistance, 0), 1);
      }
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight - 350, 1);
      return Math.min(Math.max(targetScrollY / maxScroll, 0), 1);
    };

    let targetProgress = calculateTargetProgress();

    const handleScroll = () => {
      targetProgress = calculateTargetProgress();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Função para desenhar segmento de linha progressiva com ponto de luz
    const drawProgressiveBeam = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      progress: number,
      color: string,
      lineWidth: number
    ) => {
      if (progress <= 0) return;
      const p = Math.min(progress, 1);
      const curX = x1 + (x2 - x1) * p;
      const curY = y1 + (y2 - y1) * p;

      // Linha do feixe
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(curX, curY);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      // Centelha de luz na ponta que avança
      if (p > 0.02 && p < 0.99) {
        ctx.beginPath();
        ctx.arc(curX, curY, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#C6FF3D';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    // Função para desenhar raios de estrela (diffraction spikes)
    const drawStarRays = (cx: number, cy: number, length: number, alpha: number, color: string) => {
      if (alpha <= 0) return;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.1;
      ctx.globalAlpha = alpha;

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

    // Loop de Renderização 60fps
    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.025;

      // Interpolação suave do scroll e do progresso de rolagem
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;
      currentProgress += (targetProgress - currentProgress) * 0.08;

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
        ctx.globalAlpha = Math.max(0.12, Math.min(1, alpha));
        ctx.fill();

        if (star.radius > 1.3 && alpha > 0.55) {
          ctx.beginPath();
          ctx.arc(star.x, y, star.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = star.color === '#C6FF3D' ? 'rgba(198, 255, 61, 0.22)' : 'rgba(255, 255, 255, 0.16)';
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // --- 2. CRUZEIRO DO SUL (Conexão ao Longo do Scroll & Conclusão no Contato) ---
      // Posição no céu mobile: terço superior direito, bem visível com respiro
      const cruxCenterX = width * 0.58;
      const cruxCenterY = Math.min(height * 0.23, 175);
      const cruxSpan = Math.min(width * 0.38, 140);

      // Posições das 5 estrelas em coordenadas de tela
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

      // Ponto central da cruz
      const interX = (gamma.px + alphaStar.px) * 0.5;
      const interY = (beta.py + delta.py) * 0.5;

      // Fases das conexões:
      // Linha 1 (Eixo Vertical: Gamma -> Alpha): 0.05 até 0.45 (Hero -> Sobre)
      const pLine1 = Math.min(Math.max((currentProgress - 0.04) / 0.4, 0), 1);
      // Linha 2 (Eixo Horizontal: Beta -> Delta): 0.40 até 0.75 (Sobre -> Projetos -> Stack)
      const pLine2 = Math.min(Math.max((currentProgress - 0.38) / 0.36, 0), 1);
      // Linha 3 (Centro -> Intrometida): 0.70 até 0.90 (Chegando em Contato)
      const pLine3 = Math.min(Math.max((currentProgress - 0.68) / 0.22, 0), 1);

      // Grand Finale Elemental: atinge esplendor máximo ao chegar no #contato (0.85 a 1.0)
      const finaleBloom = Math.min(Math.max((currentProgress - 0.82) / 0.18, 0), 1);

      // --- GRAND FINALE ELEMENTAL AO ENTRAR NO CONTATO ---
      if (finaleBloom > 0.02) {
        // 1. Grande Nebulosa Cósmica Radiante (Emerald & Teal & Gold)
        const nebulaRadius = cruxSpan * (1.3 + Math.sin(time * 1.4) * 0.12);
        const nebulaGrad = ctx.createRadialGradient(
          cruxCenterX,
          cruxCenterY,
          15,
          cruxCenterX,
          cruxCenterY,
          nebulaRadius
        );
        nebulaGrad.addColorStop(0, `rgba(198, 255, 61, ${finaleBloom * 0.22})`);
        nebulaGrad.addColorStop(0.35, `rgba(56, 189, 248, ${finaleBloom * 0.15})`);
        nebulaGrad.addColorStop(0.7, `rgba(44, 107, 90, ${finaleBloom * 0.08})`);
        nebulaGrad.addColorStop(1, 'rgba(6, 7, 9, 0)');

        ctx.beginPath();
        ctx.arc(cruxCenterX, cruxCenterY, nebulaRadius, 0, Math.PI * 2);
        ctx.fillStyle = nebulaGrad;
        ctx.fill();

        // 2. Halo Estelar Concéntrico
        ctx.beginPath();
        ctx.arc(cruxCenterX, cruxCenterY, cruxSpan * 0.82, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(198, 255, 61, ${finaleBloom * 0.25 + Math.sin(time * 2) * 0.08})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([5, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // 3. Poeira Estelar Elemental Orbitante
        stardusts.forEach((dust) => {
          dust.angle += dust.speed;
          dust.phase += 0.035;
          const curDist = dust.distance * (0.85 + finaleBloom * 0.4);
          const dx = cruxCenterX + Math.cos(dust.angle) * curDist;
          const dy = cruxCenterY + Math.sin(dust.angle) * curDist * 1.15;
          const dAlpha = dust.alpha * finaleBloom * (0.65 + 0.35 * Math.sin(dust.phase));

          ctx.beginPath();
          ctx.arc(dx, dy, dust.radius * (1 + finaleBloom * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = dust.color;
          ctx.globalAlpha = Math.max(0, Math.min(1, dAlpha));
          ctx.fill();

          if (dust.radius > 1.2) {
            ctx.shadowColor = dust.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
        ctx.globalAlpha = 1;
      }

      // --- LINHAS FEIXE DA CONSTELAÇÃO PROGRESSIVAS ---
      const baseLineAlpha = 0.35 + finaleBloom * 0.45 + Math.sin(time * 1.8) * 0.08;
      const lineColor = `rgba(198, 255, 61, ${baseLineAlpha})`;

      // 1. Linha Vertical (Gamma -> Alpha)
      drawProgressiveBeam(
        gamma.px,
        gamma.py,
        alphaStar.px,
        alphaStar.py,
        pLine1,
        lineColor,
        finaleBloom > 0.4 ? 2.4 : 1.8
      );

      // 2. Linha Horizontal (Beta -> Delta)
      drawProgressiveBeam(
        beta.px,
        beta.py,
        delta.px,
        delta.py,
        pLine2,
        lineColor,
        finaleBloom > 0.4 ? 2.4 : 1.8
      );

      // 3. Linha da Intrometida (Centro -> Epsilon)
      drawProgressiveBeam(
        interX,
        interY,
        epsilon.px,
        epsilon.py,
        pLine3,
        `rgba(255, 255, 255, ${baseLineAlpha * 0.9})`,
        finaleBloom > 0.4 ? 2.0 : 1.5
      );

      // --- AS 5 ESTRELAS VIBRANTES DO CRUZEIRO DO SUL ---
      starPositions.forEach((star, idx) => {
        const starTwinkle = 0.85 + 0.15 * Math.sin(time * 2.5 + idx * 1.3);
        const isConnected =
          (idx <= 1 && pLine1 > 0.95) ||
          (idx >= 2 && idx <= 3 && pLine2 > 0.95) ||
          (idx === 4 && pLine3 > 0.95);

        const currentStarSize = star.size * (1 + (isConnected ? 0.25 : 0) + finaleBloom * 0.4) * starTwinkle;

        // Halo de luz estelar
        ctx.beginPath();
        ctx.arc(star.px, star.py, currentStarSize * (2.8 + finaleBloom * 1.8), 0, Math.PI * 2);
        ctx.fillStyle = star.glow;
        ctx.globalAlpha = 0.25 + finaleBloom * 0.45 + (isConnected ? 0.15 : 0);
        ctx.fill();

        // Núcleo sólido brilhante
        ctx.beginPath();
        ctx.arc(star.px, star.py, currentStarSize, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 1;
        ctx.shadowColor = star.glow;
        ctx.shadowBlur = 10 + finaleBloom * 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Raios de Luz (Diffraction Spikes) no Grand Finale em Contato
        if (finaleBloom > 0.12) {
          const spikeLen = (currentStarSize * 4.2 + 6) * finaleBloom;
          drawStarRays(star.px, star.py, spikeLen, finaleBloom * 0.85, star.color);
        }
      });

      // --- LEGENDA POÉTICA NO CONTATO ---
      if (finaleBloom > 0.25) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, (finaleBloom - 0.25) * 1.35);
        ctx.textAlign = 'center';

        ctx.font = '700 11.5px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#EDEDE6';
        ctx.letterSpacing = '0.24em';
        ctx.fillText('CRUZEIRO DO SUL', cruxCenterX, cruxCenterY + cruxSpan * 0.76);

        ctx.font = '600 9.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#C6FF3D';
        ctx.shadowColor = '#C6FF3D';
        ctx.shadowBlur = 8;
        ctx.fillText('✦ BRASIL ✦', cruxCenterX, cruxCenterY + cruxSpan * 0.89);
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      // --- 3. METEOROS (Estrelas Cadentes com Cauda Luminosa) ---
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
        ctx.lineWidth = m.size * (1 + finaleBloom * 0.35);
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
        ctx.shadowColor = '#C6FF3D';
        ctx.shadowBlur = 10;
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
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 block md:hidden"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
