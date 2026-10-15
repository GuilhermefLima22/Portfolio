import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { ParticleField } from './ParticleField';

/** Canvas 3D fixo atrás de todo o conteúdo para Desktop. Carregado de forma lazy pelo App. */
export default function Scene() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Em mobile (< 768px), o fundo é assumido pelo MobileCosmos (céu estrelado, meteoros e constelações)
  if (isMobile) return null;

  const maxDpr = Math.min(window.devicePixelRatio, 1.75);
  const [dpr, setDpr] = useState(maxDpr);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden md:block">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        eventSource={document.getElementById('root')!}
        eventPrefix="client"
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(maxDpr)} />
        <ParticleField count={7000} />
      </Canvas>
    </div>
  );
}
