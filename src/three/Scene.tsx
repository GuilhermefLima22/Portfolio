import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { ParticleField } from './ParticleField';

/** Canvas fixo atrás de todo o conteúdo. Carregado de forma lazy pelo App. */
export default function Scene() {
  const mobile = window.innerWidth < 768;
  const maxDpr = Math.min(window.devicePixelRatio, mobile ? 1.5 : 1.75);
  const [dpr, setDpr] = useState(maxDpr);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        eventSource={document.getElementById('root')!}
        eventPrefix="client"
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(maxDpr)} />
        <ParticleField count={mobile ? 3200 : 7000} />
      </Canvas>
    </div>
  );
}
