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
  position: {
    ko: string;
    en: string;
    zh: string;
  };
  period: {
    ko: string;
    en: string;
    zh: string;
  };
  description: {
    ko: string;
    en: string;
    zh: string;
  };
  achievements: {
    ko: string[];
    en: string[];
    zh: string[];
  };
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

/**
 * Project details with localized content
 */
export interface ProjectDetails {
  title: string;
  subtitle: string;
  content: string[];
}

/**
 * Teamwork skills structure
 */
export interface TeamworkSkills {
  jiraConfluence: string;
  gitTools: string;
  mcpSeminar: string;
  crossFunctional: string;
}

/**
 * Profile section of dictionary - contains both string fields and nested teamwork object
 */
export interface ProfileDictionary extends Record<string, any> {
  skills: string;
  teamworkSkills: string;
  teamwork: TeamworkSkills;
}

/**
 * Resume section of dictionary
 */
export interface ResumeDictionary {
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
}

/**
 * Button labels
 */
export interface ButtonLabels {
  visitGithub: string;
  visitPortfolio: string;
  downloadResume: string;
}

/**
 * Hero section of dictionary
 */
export interface HeroDictionary {
  greeting: string;
  title: string;
  description: string;
}

/**
 * Projects section with all project details
 */
export interface ProjectsDictionary {
  monitoring: ProjectDetails;
  dataLake: ProjectDetails;
  theshop: ProjectDetails;
  gateway: ProjectDetails;
  airflow: ProjectDetails;
  ixiStudio: ProjectDetails;
  ixiAdmin: ProjectDetails;
  drone: ProjectDetails;
  robotPlatform: ProjectDetails;
  inoutbox: ProjectDetails;
  campi: ProjectDetails;
  virtualTryOn: ProjectDetails;
  intellisysWebsite: ProjectDetails;
  [key: string]: ProjectDetails | string;
}

/**
 * Complete dictionary interface with all translations
 */
export interface Dictionary {
  nav: Record<string, string>;
  hero: HeroDictionary;
  common: Record<string, string>;
  profile: ProfileDictionary;
  experience: Record<string, any>;
  certifications: Record<string, string>;
  projects: ProjectsDictionary;
  reviews: Record<string, any>;
  buttons: ButtonLabels;
  tabs: Record<string, string>;
  companies: Record<string, string>;
  dates: Record<string, string>;
  achievements: Record<string, string>;
  resume: ResumeDictionary;
}

export interface PortfolioData {
  skills: Skill[];
  certifications: Certification[];
  experiences: Experience[];
  portfolioLinks: PortfolioLink[];
  dict: Dictionary;
  description: string;
}

export type Category1 = "General" | "Infrastructure" | "Frontend" | "Backend";

export interface InterviewQuestion {
  id: number;
  category1: Category1;
  category2: string;
  question: string;
  answer: string;
}
