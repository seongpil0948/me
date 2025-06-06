export interface Skill {
  name: string;
  level: number;
}

export interface Certification {
  name: string;
  org: string;
  date: string;
  status?: "certified" | "in-progress";
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface PortfolioLink {
  name: string;
  url: string;
  disabled?: boolean;
}

export interface Dictionary {
  nav: Record<string, string>;
  hero: {
    greeting: string;
    title: string;
    description: string;
  };
  common: Record<string, string>;
  profile: Record<string, string>;
  experience: Record<string, any>;
  certifications: Record<string, string>;
  projects: Record<string, string>;
  reviews: Record<string, any>;
  buttons: Record<string, string>;
  tabs: Record<string, string>;
  companies: Record<string, string>;
  dates: Record<string, string>;
  achievements: Record<string, string>;
}

export interface PortfolioData {
  skills: Skill[];
  certifications: Certification[];
  experiences: Experience[];
  portfolioLinks: PortfolioLink[];
  dict: Dictionary;
  description: string;
}
