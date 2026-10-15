import { create } from 'zustand';

export type SceneId = 'hero' | 'sobre' | 'projetos' | 'stack' | 'contato';

export const SCENES: { id: SceneId; label: string }[] = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'stack', label: 'Stack & Cursos' },
  { id: 'contato', label: 'Contato' },
];

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface AppState {
  /** Seção visível — dirige o estado da cena 3D. */
  scene: SceneId;
  setScene: (s: SceneId) => void;
  /** Preloader terminou. */
  ready: boolean;
  setReady: (r: boolean) => void;
  /** Fontes carregadas (necessário para amostrar o nome em partículas). */
  fontsReady: boolean;
  setFontsReady: (r: boolean) => void;
  hoveredProject: string | null;
  setHoveredProject: (id: string | null) => void;
  webgl: boolean;
  reducedMotion: boolean;
  cvModalOpen: boolean;
  setCvModalOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  scene: 'hero',
  setScene: (scene) => set({ scene }),
  ready: false,
  setReady: (ready) => set({ ready }),
  fontsReady: false,
  setFontsReady: (fontsReady) => set({ fontsReady }),
  hoveredProject: null,
  setHoveredProject: (hoveredProject) => set({ hoveredProject }),
  webgl: detectWebGL(),
  reducedMotion,
  cvModalOpen: false,
  setCvModalOpen: (cvModalOpen) => set({ cvModalOpen }),
}));

/** Valores que mudam a cada frame — mutáveis de propósito para não re-renderizar o React. */
export const frame = {
  scrollVelocity: 0,
};
