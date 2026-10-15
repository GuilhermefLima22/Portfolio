import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial, type Points } from 'three';
import { buildShapes, type Layout, type ShapeKey } from './shapes';
import { frame, useAppStore } from '../store';
import { projects } from '../data/portfolioData';

const vertexShader = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;
  uniform float uSize;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vFade;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float depth = -mv.z;
    gl_PointSize = min(uSize * aSize * uPixelRatio * (10.0 / depth), 28.0);
    vColor = aColor;
    vFade = 1.0 - smoothstep(8.0, 24.0, depth);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = 1.0 - smoothstep(0.0, 0.5, d);
    gl_FragColor = vec4(vColor, a * a * uOpacity * vFade);
  }
`;

/**
 * Nuvem de partículas com física de mola: cada ponto é puxado para a
 * posição-alvo da cena ativa, é repelido pelo cursor e sacode com a
 * velocidade do scroll.
 */
export function ParticleField({ count }: { count: number }) {
  const { viewport, size } = useThree();
  const fontsReady = useAppStore((s) => s.fontsReady);
  const pointsRef = useRef<Points>(null);

  const layout: Layout = useMemo(
    () => ({ w: viewport.width, h: viewport.height, mobile: size.width < 768 }),
    [viewport.width, viewport.height, size.width],
  );

  const shapes = useMemo(
    () => buildShapes(count, layout, 'GUILHERME'),
    // fontsReady: re-amostra o nome quando a fonte display terminar de carregar
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, layout, fontsReady],
  );

  const { geometry, velocity, stiffness } = useMemo(() => {
    const g = new BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const stiff = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sizes[i] = Math.random() < 0.04 ? 2.2 : 0.55 + Math.random() * 0.9;
      stiff[i] = 0.012 + Math.random() * 0.03;
    }
    g.setAttribute('position', new BufferAttribute(pos, 3));
    g.setAttribute('aColor', new BufferAttribute(col, 3));
    g.setAttribute('aSize', new BufferAttribute(sizes, 1));
    return { geometry: g, velocity: new Float32Array(count * 3), stiffness: stiff };
  }, [count]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uSize: { value: size.width < 768 ? 2.6 : 3.1 },
          uPixelRatio: { value: 1 },
          uOpacity: { value: 0 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  const dynamicTarget = useMemo(() => new Float32Array(count * 3), [count]);
  const hoverColors = useMemo(() => Object.fromEntries(projects.map((p) => [p.id, new Color(p.color)])), []);
  const tint = useMemo(() => new Color(), []);
  const tintAmount = useRef(0);

  useFrame((state, delta) => {
    const { scene, ready, hoveredProject } = useAppStore.getState();
    const key: ShapeKey = ready ? scene : 'intro';
    const shape = shapes[key];
    const t = state.clock.elapsedTime;

    let target = shape.pos;
    if (shape.animate) {
      shape.animate(dynamicTarget, t);
      target = dynamicTarget;
    }

    const posAttr = geometry.attributes.position as BufferAttribute;
    const colAttr = geometry.attributes.aColor as BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const col = colAttr.array as Float32Array;

    const f = Math.min(delta * 60, 2.5);
    const damping = Math.pow(0.86, f);
    const colorLerp = 1 - Math.pow(0.93, f);

    // Cursor no plano z = 0
    const mx = (state.pointer.x * viewport.width) / 2;
    const my = (state.pointer.y * viewport.height) / 2;
    const mR = layout.mobile ? 0.7 : 1.15;
    const mR2 = mR * mR;
    const kick = Math.min(Math.abs(frame.scrollVelocity) * 0.0011, 0.03);

    // Tint do terreno quando um card de projeto está em hover
    const wantTint = key === 'projetos' && hoveredProject ? 0.6 : 0;
    if (hoveredProject) tint.copy(hoverColors[hoveredProject]);
    tintAmount.current += (wantTint - tintAmount.current) * colorLerp;
    const ta = tintAmount.current;

    const sc = shape.col;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const k = stiffness[i] * f;

      let vx = velocity[ix] * damping + (target[ix] - pos[ix]) * k;
      let vy = velocity[ix + 1] * damping + (target[ix + 1] - pos[ix + 1]) * k;
      const vz = velocity[ix + 2] * damping + (target[ix + 2] - pos[ix + 2]) * k;

      const dx = pos[ix] - mx;
      const dy = pos[ix + 1] - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < mR2) {
        const force = (1 - d2 / mR2) * 0.04 * f;
        vx += dx * force;
        vy += dy * force;
      }
      if (kick > 0.001) {
        vx += (Math.random() - 0.5) * kick;
        vy += (Math.random() - 0.5) * kick;
      }

      velocity[ix] = vx;
      velocity[ix + 1] = vy;
      velocity[ix + 2] = vz;
      pos[ix] += vx;
      pos[ix + 1] += vy;
      pos[ix + 2] += vz;

      const lum = ta > 0.001 ? Math.max(sc[ix], sc[ix + 1], sc[ix + 2]) : 0;
      col[ix] += (sc[ix] * (1 - ta) + tint.r * lum * ta - col[ix]) * colorLerp;
      col[ix + 1] += (sc[ix + 1] * (1 - ta) + tint.g * lum * ta - col[ix + 1]) * colorLerp;
      col[ix + 2] += (sc[ix + 2] * (1 - ta) + tint.b * lum * ta - col[ix + 2]) * colorLerp;
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    const u = material.uniforms;
    u.uPixelRatio.value = state.viewport.dpr;
    u.uOpacity.value += (shape.opacity - u.uOpacity.value) * colorLerp;

    // Parallax 3D sutil seguindo o cursor
    const p = pointsRef.current;
    if (p) {
      p.rotation.y += (state.pointer.x * 0.12 - p.rotation.y) * 0.04 * f;
      p.rotation.x += (-state.pointer.y * 0.06 - p.rotation.x) * 0.04 * f;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}
