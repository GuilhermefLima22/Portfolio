export type ProjectCategory = 'ia' | 'automacao' | 'iot' | 'algoritmos';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  status: 'Em produção' | 'Concluído' | 'Finalizado' | 'Em evolução';
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  /** Fatos verificáveis (nada de métricas inventadas). */
  facts: { label: string; value: string }[];
  /** Capturas de tela ou painéis visuais para o modal de detalhes */
  media?: {
    type: 'terminal' | 'dashboard' | 'image';
    title: string;
    description: string;
    imageUrl?: string;
  }[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  /** Cor do cluster na cena 3D e do acento do card. */
  color: string;
}

export interface Skill {
  name: string;
  /** ids de projetos onde a skill foi usada de verdade. */
  usedIn?: string[];
  /** true = estudando agora (honestidade > "Especialista"). */
  learning?: boolean;
}

export interface SkillGroup {
  stage: string;
  title: string;
  description: string;
  skills: Skill[];
}

export interface EducationItem {
  period: string;
  title: string;
  institution: string;
  detail: string;
  current?: boolean;
}

export interface CourseItem {
  title: string;
  provider: string;
  status: string;
  category: string;
  hours?: string;
  description: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  status: string;
}
