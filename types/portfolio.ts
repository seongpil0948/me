export interface Skill {
  name: string;
  level: number;
  proficiency: number;
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
  technologies: string[];
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

export type Category1 =
  | "General"
  | "Infrastructure"
  | "Frontend"
  | "Backend"
  | "Defensive Tactics"
  | "Data Pipeline"
  | "Infrastructure/Operations"
  | "OpenSource"
  | "Observability";

export interface InterviewQuestion {
  id: number;
  category1: Category1;
  category2: string;
  question: string;
  answer: string;
}

/**
 * Portfolio data structure combining all portfolio information with dictionary
 * Note: Dictionary type is imported from @/types/i18n for better type inference
 */
export interface PortfolioData {
  skills: Skill[];
  certifications: Certification[];
  experiences: Experience[];
  portfolioLinks: PortfolioLink[];
  openSourceContributions?: PortfolioLink[];
  dict: any; // Use 'any' here to avoid circular dependency. Components should import Dictionary from @/types/i18n
  description: string;
}
