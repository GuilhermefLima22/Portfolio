import { useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { ResumeModal } from './components/ResumeModal';
import { initSmoothScroll, observeScenes } from './lib/scroll';
import { useAppStore } from './store';

// Lazy loading da cena 3D (Three.js/R3F) para performance inicial máxima
const Scene3D = lazy(() => import('./three/Scene'));

export function App() {
  const webgl = useAppStore((s) => s.webgl);

  useEffect(() => {
    // Inicializa o smooth scroll (Lenis) e o observador de seções 3D
    const destroyScroll = initSmoothScroll();
    const disconnectObserver = observeScenes();

    return () => {
      destroyScroll();
      disconnectObserver();
    };
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 text-paper relative selection:bg-signal selection:text-ink-950 font-sans">
      {/* Preloader de carregamento real */}
      <Preloader />

      {/* Cursor Contextual Customizado */}
      <Cursor />

      {/* Fundo 3D Interativo: Three.js + React Three Fiber com Física de Molas */}
      {webgl && (
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      )}

      {/* Barra de Navegação */}
      <Navbar />

      {/* Conteúdo Principal com Scroll Espacial */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Rodapé */}
      <Footer />

      {/* Modal Interativo do Currículo */}
      <ResumeModal />
    </div>
  );
}

export default App;
