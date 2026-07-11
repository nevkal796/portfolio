export interface Profile {
  name: string;
  classTitle: string;
  origin?: string;
  age?: number;
  hp: number;
  mp: number;
  expCurrent: number;
  expTotal: number;
  bio: string;
  traits: string[];
}

export interface ProjectDetail {
  problem: string;
  approach: string;
  trials: string;
  findings: string;
  stack: string[];
  links?: { label: string; url: string }[];
}

export interface Project {
  id: string;
  questNumber: number;
  title: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'ARCHIVED';
  description: string;
  techTags: string[];
  rewards?: string;
  linkUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  sortOrder: number;
  detail?: ProjectDetail;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend/DB' | 'Systems/ML' | 'Tools/Other';
  proficiency: 1 | 2 | 3 | 4 | 5;
  yearsUsed?: number;
  exampleProjectId?: string;
  unlocked: boolean;
}
