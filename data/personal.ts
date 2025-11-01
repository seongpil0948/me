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

export const personalInfo: PersonalInfo = {
  name: {
    ko: "최성필",
    en: "Seongpil Choi",
  },
  contact: {
    email: "seongpil0948@gmail.com",
    phone: "010-7184-0948",
    linkedin: "https://www.linkedin.com/in/choi-seongpil-9910a0203/",
    github: "https://github.com/seongpil0948",
    portfolio: "http://all-ad.in",
  },
  location: {
    ko: "경기도 광명시 철산동",
    en: "Gwangmyeong, Gyeonggi-do",
    zh: "京畿道光明市",
  },
  education: {
    school: {
      ko: "부천대학교",
      en: "Bucheon University",
      zh: "富川大学",
    },
    degree: {
      ko: "학사",
      en: "Bachelor's Degree",
      zh: "学士",
    },
    major: {
      ko: "정보통신공학",
      en: "Information and Communication Engineering",
      zh: "信息通信工程",
    },
    period: "2016 - 2020",
  },
};

export interface SummaryStats {
  errorDetectionReduction: number;
  costSavings: number;
  deploymentSpeedup: number;
  logRetentionExpansion: string;
  projectRevenue: number;
  dailyMessages: string;
}

export const summaryStats: SummaryStats = {
  errorDetectionReduction: 99,
  costSavings: 50,
  deploymentSpeedup: 90,
  logRetentionExpansion: "142x",
  projectRevenue: 300,
  dailyMessages: "10억 건",
};
