import { Color } from 'three';
import { projects } from '../data/portfolioData';
import type { SceneId } from '../store';

/** Tamanho visível (em unidades do mundo) no plano z = 0. */
export interface Layout {
  w: number;
  h: number;
  mobile: boolean;
}

export interface Shape {
  /** Posições-alvo (x, y, z por partícula). */
  pos: Float32Array;
  /** Cores-alvo (r, g, b por partícula). */
  col: Float32Array;
  /** Opacidade global da nuvem nesta cena. */
  opacity: number;
  /** Para formas vivas: escreve as posições-alvo do frame atual em `out`. */
  animate?: (out: Float32Array, t: number) => void;
}

const PAPER = new Color('#EDEDE6');
const SIGNAL = new Color('#C6FF3D');
const DEEP = new Color('#2C6B5A');

function gauss(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function put(arr: Float32Array, i: number, x: number, y: number, z: number) {
  arr[i * 3] = x;
  arr[i * 3 + 1] = y;
  arr[i * 3 + 2] = z;
}

function putColor(arr: Float32Array, i: number, c: Color, k = 1) {
  arr[i * 3] = c.r * k;
  arr[i * 3 + 1] = c.g * k;
  arr[i * 3 + 2] = c.b * k;
}

/** 0 · Dados brutos: caos espalhado pela tela. */
function chaosShape(n: number, L: Layout, dim: number, opacity: number): Shape {
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    put(pos, i, (Math.random() - 0.5) * L.w * 1.5, (Math.random() - 0.5) * L.h * 1.5, (Math.random() - 0.5) * 9 - 1);
    putColor(col, i, Math.random() < 0.06 ? SIGNAL : PAPER, dim * (0.5 + Math.random() * 0.5));
  }
  return { pos, col, opacity };
}

/** 1 · Hero: no desktop os dados formam o nome; no celular criam um campo de dados dinâmico e sutil ao fundo sem sobrepor o texto. */
function nameShape(n: number, L: Layout, text: string): Shape {
  if (L.mobile) {
    // No celular, uma nuvem elegante de dados dinâmicos emoldura a tela sem colidir com os textos do centro
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = L.w * (0.34 + Math.random() * 0.48);
      const x = Math.cos(angle) * r;
      // Alonga no eixo vertical para acompanhar o formato do smartphone
      const y = Math.sin(angle) * (r * 1.55) + (Math.random() - 0.5) * 1.2;
      const z = (Math.random() - 0.5) * 6 - 0.5;
      put(pos, i, x, y, z);
      const isSignal = Math.random() < 0.12;
      putColor(col, i, isSignal ? SIGNAL : PAPER, isSignal ? 0.6 : 0.25);
    }
    const animate = (out: Float32Array, t: number) => {
      for (let i = 0; i < n; i++) {
        const x = pos[i * 3];
        const y = pos[i * 3 + 1];
        const z = pos[i * 3 + 2];
        out[i * 3] = x + Math.sin(t * 0.35 + y * 0.6) * 0.12;
        out[i * 3 + 1] = y + Math.cos(t * 0.28 + x * 0.6) * 0.15;
        out[i * 3 + 2] = z;
      }
    };
    return { pos, col, opacity: 0.4, animate };
  }

  const cw = 1400;
  const ch = 360;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  let fontSize = 260;
  ctx.font = `700 ${fontSize}px "Space Grotesk", Inter, sans-serif`;
  const measured = ctx.measureText(text).width;
  fontSize = Math.floor(fontSize * Math.min(1, (cw * 0.94) / measured));
  ctx.font = `700 ${fontSize}px "Space Grotesk", Inter, sans-serif`;
  const textW = ctx.measureText(text).width;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cw / 2, ch / 2);

  const data = ctx.getImageData(0, 0, cw, ch).data;
  const samples: number[] = [];
  for (let y = 0; y < ch; y += 2) {
    for (let x = 0; x < cw; x += 2) {
      if (data[(y * cw + x) * 4 + 3] > 128) samples.push(x, y);
    }
  }

  const worldW = L.w * 0.84;
  const scale = worldW / textW;
  const yOffset = L.h * 0.12;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const count = samples.length / 2;

  for (let i = 0; i < n; i++) {
    const s = Math.floor(Math.random() * count) * 2;
    const jitter = scale * 1.4;
    put(
      pos,
      i,
      (samples[s] - cw / 2) * scale + (Math.random() - 0.5) * jitter,
      -(samples[s + 1] - ch / 2) * scale + yOffset + (Math.random() - 0.5) * jitter,
      gauss() * 0.06,
    );
    putColor(col, i, Math.random() < 0.1 ? SIGNAL : PAPER, 0.75 + Math.random() * 0.25);
  }
  return { pos, col, opacity: 1 };
}

/** 2 · Sobre: clusters — um por projeto, na cor do projeto (estilo K-means). */
function clusterShape(n: number, L: Layout): Shape {
  const k = projects.length;
  const cx = L.mobile ? 0 : L.w * 0.25;
  const cy = L.mobile ? -L.h * 0.2 : 0;
  const radius = L.mobile ? L.w * 0.3 : Math.min(L.w * 0.15, L.h * 0.28);
  const unit = L.h / 8.3;
  const centers = projects.map((_, c) => {
    const a = (c / k) * Math.PI * 2 + 0.4;
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius * 0.85, ((c % 3) - 1) * 0.9];
  });
  const colors = projects.map((p) => new Color(p.color));
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);

  for (let i = 0; i < n; i++) {
    if (Math.random() < 0.1) {
      put(pos, i, cx + gauss() * radius * 1.3, cy + gauss() * radius, gauss() * 1.5);
      putColor(col, i, PAPER, 0.25);
      continue;
    }
    const c = i % k;
    const sigma = (0.22 + (c % 3) * 0.06) * unit * (L.mobile ? 0.8 : 1);
    put(pos, i, centers[c][0] + gauss() * sigma, centers[c][1] + gauss() * sigma, centers[c][2] + gauss() * sigma * 1.3);
    putColor(col, i, colors[c], 0.65 + Math.random() * 0.35);
  }
  return { pos, col, opacity: L.mobile ? 0.65 : 0.95 };
}

/** 3 · Projetos: um "terreno de dados" vivo, ao fundo dos cards. */
function surfaceShape(n: number, L: Layout): Shape {
  const side = Math.ceil(Math.sqrt(n));
  const base = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const baseY = -L.h * 0.34;
  for (let i = 0; i < n; i++) {
    const u = (i % side) / side;
    const v = Math.floor(i / side) / side;
    put(base, i, (u - 0.5) * L.w * 1.7, baseY, (v - 0.5) * 12 - 2);
    const tint = DEEP.clone().lerp(SIGNAL, v * 0.6);
    putColor(col, i, tint, 0.35 + v * 0.45);
  }
  const animate = (out: Float32Array, t: number) => {
    for (let i = 0; i < n; i++) {
      const x = base[i * 3];
      const z = base[i * 3 + 2];
      out[i * 3] = x;
      out[i * 3 + 1] = baseY + Math.sin(x * 0.55 + t * 0.7) * 0.28 + Math.cos(z * 0.65 + t * 0.5) * 0.32;
      out[i * 3 + 2] = z;
    }
  };
  const pos = new Float32Array(base);
  animate(pos, 0);
  return { pos, col, opacity: 0.7, animate };
}

/** 5 · Stack: rede neural esférica — nós + conexões, girando. */
function networkShape(n: number, L: Layout): Shape {
  const cx = L.mobile ? 0 : L.w * 0.26;
  const cy = L.mobile ? -L.h * 0.18 : 0;
  const R = L.mobile ? L.w * 0.36 : Math.min(L.w, L.h) * 0.3;
  const rel = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);

  const hubs: [number, number, number][] = [];
  const hubCount = 42;
  for (let h = 0; h < hubCount; h++) {
    const y = 1 - (h / (hubCount - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const phi = h * Math.PI * (3 - Math.sqrt(5));
    hubs.push([Math.cos(phi) * r, y, Math.sin(phi) * r]);
  }
  const nodeCount = Math.floor(n * 0.62);
  for (let i = 0; i < n; i++) {
    if (i < nodeCount) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * Math.PI * (3 - Math.sqrt(5));
      const isHub = i % 37 === 0;
      put(rel, i, Math.cos(phi) * r * R, y * R, Math.sin(phi) * r * R);
      putColor(col, i, isHub ? SIGNAL : PAPER, isHub ? 1 : 0.3);
    } else {
      // pontos ao longo das "sinapses" entre hubs
      const a = hubs[Math.floor(Math.random() * hubCount)];
      const b = hubs[Math.floor(Math.random() * hubCount)];
      const t = Math.random();
      let x = a[0] + (b[0] - a[0]) * t;
      let y = a[1] + (b[1] - a[1]) * t;
      let z = a[2] + (b[2] - a[2]) * t;
      const len = Math.hypot(x, y, z) || 1;
      const k = (0.75 + 0.25 * len) / len; // curva levemente para a superfície
      x *= k * R;
      y *= k * R;
      z *= k * R;
      put(rel, i, x, y, z);
      putColor(col, i, SIGNAL, 0.35);
    }
  }
  const animate = (out: Float32Array, t: number) => {
    const a = t * 0.12;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    for (let i = 0; i < n; i++) {
      const x = rel[i * 3];
      const z = rel[i * 3 + 2];
      out[i * 3] = cx + x * cos - z * sin;
      out[i * 3 + 1] = cy + rel[i * 3 + 1];
      out[i * 3 + 2] = x * sin + z * cos;
    }
  };
  const pos = new Float32Array(n * 3);
  animate(pos, 0);
  return { pos, col, opacity: L.mobile ? 0.65 : 0.95, animate };
}

/** 6 · Contato: tudo converge em um anel — o "output". */
function ringShape(n: number, L: Layout): Shape {
  const R = L.mobile ? L.w * 0.44 : Math.min(L.w, L.h) * 0.4;
  const theta = new Float32Array(n);
  const radius = new Float32Array(n);
  const depth = new Float32Array(n);
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    theta[i] = Math.random() * Math.PI * 2;
    const dust = Math.random() < 0.12;
    radius[i] = dust ? R * (0.2 + Math.random() * 1.4) : R + gauss() * R * 0.035;
    depth[i] = gauss() * (dust ? 1.2 : 0.12);
    const c = PAPER.clone().lerp(SIGNAL, 0.5 + 0.5 * Math.sin(theta[i] * 2));
    putColor(col, i, c, dust ? 0.25 : 0.9);
  }
  const animate = (out: Float32Array, t: number) => {
    for (let i = 0; i < n; i++) {
      const a = theta[i] + t * 0.08;
      const r = radius[i] * (1 + Math.sin(a * 3 + t) * 0.015);
      out[i * 3] = Math.cos(a) * r;
      out[i * 3 + 1] = Math.sin(a) * r;
      out[i * 3 + 2] = depth[i];
    }
  };
  const pos = new Float32Array(n * 3);
  animate(pos, 0);
  return { pos, col, opacity: L.mobile ? 0.65 : 0.9, animate };
}

export type ShapeKey = SceneId | 'intro';

export function buildShapes(n: number, L: Layout, name: string): Record<ShapeKey, Shape> {
  return {
    intro: chaosShape(n, L, 0.6, 0.8),
    hero: nameShape(n, L, name),
    sobre: clusterShape(n, L),
    projetos: surfaceShape(n, L),
    stack: networkShape(n, L),
    contato: ringShape(n, L),
  };
}
