export interface PersonalInfo {
  name: {
    ko: string;
    en: string;
    englishNickname: string;
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
    gpa: string;
  };
  highSchool: {
    school: {
      ko: string;
      en: string;
      zh: string;
    };
    period: string;
  };
  military: {
    branch: {
      ko: string;
      en: string;
      zh: string;
    };
    rank: {
      ko: string;
      en: string;
      zh: string;
    };
    period: string;
    status: {
      ko: string;
      en: string;
      zh: string;
    };
  };
  careerYears: number;
  compensation: {
    current: {
      baseSalary: number;
      bonus: number;
      benefits: string;
    };
    target: number;
  };
  careerMotivation: string;
  availability: {
    noticeEndDate: string;
    interviewPreference: string;
    otherPositions: boolean;
  };
  coreCompetencies: Array<{
    title: string;
    description: string;
  }>;
}

export const personalInfo: PersonalInfo = {
  name: {
    ko: "최성필",
    en: "Seongpil Choi",
    englishNickname: "Ryan",
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
      ko: "정보통신공학과",
      en: "Information and Communication Engineering",
      zh: "信息通信工程",
    },
    period: "2015.03 - 2019.03",
    gpa: "3.35 / 4.5",
  },
  highSchool: {
    school: {
      ko: "경기영상과학고등학교",
      en: "Gyeonggi Media Science High School",
      zh: "京畿影像科学高等学校",
    },
    period: "2014.02",
  },
  military: {
    branch: {
      ko: "육군",
      en: "Republic of Korea Army",
      zh: "陆军",
    },
    rank: {
      ko: "중사",
      en: "Staff Sergeant",
      zh: "中士",
    },
    period: "2014.02 - 2018.05",
    status: {
      ko: "만기 제대",
      en: "Honorably Discharged",
      zh: "满期退伍",
    },
  },
  careerYears: 7,
  compensation: {
    current: {
      baseSalary: 41_500_000,
      bonus: 0,
      benefits: "점심 지원",
    },
    target: 50_000_000,
  },
  careerMotivation:
    "현재 회사에서 많은 기회를 받았고 성장했으며 사람들도 좋지만, Networking, Monitoring, Open Container Initiative에 좀 더 집중해서 연구하고 싶습니다. OTEL, OCI 등 표준화 프로젝트가 너무 흥미롭습니다.",
  availability: {
    noticeEndDate: "즉시 출근 가능",
    interviewPreference: "무관",
    otherPositions: false,
  },
  coreCompetencies: [
    {
      title: "OpenTelemetry 기반 Full-Stack 관측성 플랫폼",
      description:
        "Scouter 기반 레거시 모니터링을 OpenTelemetry, Grafana, Prometheus, ClickHouse 기반 통합 관측성 플랫폼으로 현대화했습니다. Receiver 분리와 Nginx 로드밸런싱을 적용해 수집 계층을 확장하고, AI·CDC·Java·Go·Node.js 환경에서 월 20억 Trace, 150억 Metric, 2억5천만 Log를 처리합니다. 단일 Trace ID 기반 Root Cause 분석으로 MTTD를 18시간에서 10분으로 단축했습니다.",
    },
    {
      title: "대규모 데이터 파이프라인 & 비즈니스 인텔리전스",
      description:
        "Spring Batch와 Docker Compose Airflow 기반 배치 체계를 Kubernetes Airflow + OpenTelemetry 플랫폼으로 전환해 100+ DAG를 운영했습니다. Oracle On-Premise → Kafka CDC → AWS RDS 이관, AWS Glue/Athena 기반 데이터 레이크, 10년 장기 검색 환경을 함께 구축했고 월 20TB 이상 데이터를 분석합니다.",
    },
    {
      title: "API Gateway & Service Discovery 아키텍처",
      description:
        "IDC 이전과 함께 Docker 기반 온프레미스 레거시 시스템을 EKS·온프레미스 멀티 Kubernetes 클러스터·AWS ECS 하이브리드 아키텍처로 전환했습니다. Cilium, Argo CD, GitLab CI, APISIX, Eureka를 조합해 서비스 디스커버리, 배포 표준화, 트래픽 제어를 정리했고 Standby/Production 분리로 운영 안정성을 높였습니다.",
    },
    {
      title: "Bedrock 기반 멀티 에이전트 AI 서비스",
      description:
        "Amazon Bedrock, ADK, MCP를 기반으로 Seller/Admin/Developer/CS 조직별 멀티 에이전트 LLM PWA를 EKS에 구축했습니다. 사용자별 Bedrock API Token 발급 체계를 설계해 Claude 팀 사용을 확산했고, Grafana로 Prompt Cache, 에이전트 실행 흐름, Root Cause 지표를 시각화했습니다.",
    },
  ],
};

export interface SummaryStats {
  errorDetectionReduction: number;
  costSavings: number;
  logRetentionExpansion: string;
  projectRevenue: number;
  dailyMessages: string;
}

export const summaryStats: SummaryStats = {
  errorDetectionReduction: 99,
  costSavings: 50,
  logRetentionExpansion: "142x",
  projectRevenue: 300,
  dailyMessages: "2~5천만 건",
};
