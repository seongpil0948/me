export interface Skill {
  name: string;
  level: number;
}

export interface Certification {
  name: string;
  org: string;
  date: string;
  status?: "certified" | "in-progress";
  logo?: string;
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

export interface PersonalInfo {
  name: {
    ko: string;
    en: string;
  };
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  location: {
    ko: string;
    en: string;
    zh: string;
  };
  education: {
    school: {
      ko: string;
      en: string;
      zh: string;
    };
    degree: {
      ko: string;
      en: string;
      zh: string;
    };
    major: {
      ko: string;
      en: string;
      zh: string;
    };
    period: string;
  };
}

export interface SummaryStats {
  errorDetectionReduction: number;
  costSavings: number;
  deploymentSpeedup: number;
  logRetentionExpansion: string;
  projectRevenue: number;
  dailyMessages: string;
}

export interface Dictionary {
  nav: Record<string, string>;
  hero: {
    greeting: string;
    title: string;
    description: string;
  };
  common: Record<string, string>;
  profile: Record<string, string | any> & {
    teamwork: {
      jiraConfluence: string;
      gitTools: string;
      mcpSeminar: string;
      crossFunctional: string;
    };
  };
  experience: Record<string, any>;
  certifications: Record<string, string>;
  projects: Record<string, string | any> & {
    monitoring: { title: string; subtitle: string; content: string[] };
    dataLake: { title: string; subtitle: string; content: string[] };
    theshop: { title: string; subtitle: string; content: string[] };
    gateway: { title: string; subtitle: string; content: string[] };
    airflow: { title: string; subtitle: string; content: string[] };
    ixiStudio: { title: string; subtitle: string; content: string[] };
    ixiAdmin: { title: string; subtitle: string; content: string[] };
    drone: { title: string; subtitle: string; content: string[] };
    robotPlatform: { title: string; subtitle: string; content: string[] };
    inoutbox: { title: string; subtitle: string; content: string[] };
    campi: { title: string; subtitle: string; content: string[] };
    virtualTryOn: { title: string; subtitle: string; content: string[] };
    intellisysWebsite: { title: string; subtitle: string; content: string[] };
  };
  reviews: Record<string, any>;
  buttons: {
    visitGithub: string;
    visitPortfolio: string;
    downloadResume: string;
  };
  tabs: Record<string, string>;
  companies: Record<string, string>;
  dates: Record<string, string>;
  achievements: Record<string, string>;
  resume: {
    title: string;
    summary: string;
    contact: string;
    education: string;
    skills: string;
    experience: string;
    projects: string;
    certifications: string;
    downloadPdf: string;
    errorDetection: string;
    costSavings: string;
    deploymentSpeedup: string;
    logRetention: string;
    projectRevenue: string;
    dailyMessages: string;
  };
}

export interface PortfolioData {
  skills: Skill[];
  certifications: Certification[];
  experiences: Experience[];
  portfolioLinks: PortfolioLink[];
  dict: Dictionary;
  description: string;
}
