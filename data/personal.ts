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
  careerYears: 6,
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
    noticeEndDate: "2025-12-29",
    interviewPreference: "무관",
    otherPositions: false,
  },
  coreCompetencies: [
    {
      title: "OpenTelemetry 기반 Full-Stack 관측성 플랫폼",
      description:
        "레거시 시스템(Tomcat/Spring)과 마이크로서비스가 혼재된 환경에서 OpenTelemetry 기반 관측성 플랫폼 구축. 중앙 Monitoring 수집 Gateway(OTEL Collector)와 각 서버별 Agent 배포로 시스템 전반 Monitoring Stack 운영. 단일 Trace ID로 Client→Gateway→Frontend→Backend→Kafka 전체 경로 추적. MTTI 18시간→10분(99% 개선). Grafana/Loki/Tempo/Prometheus 스택 운영, 15개 셀프서비스 대시보드로 비기술팀 지원.",
    },
    {
      title: "대규모 데이터 파이프라인 & 비즈니스 인텔리전스",
      description:
        "AWS Step Functions + Athena로 일 2천만~5천만 건 Kafka 메시지 처리. JSON→Parquet 전환으로 90% 용량 절감, 파티션 프로젝션으로 쿼리 시간 5분→10초. Airflow 5개 노드 200+ DAG 구축 및 운영. MAU/DAU, Conversion Funnel, Product Top 100 등 핵심 KPI 자동화. 월 20TB 데이터 처리",
    },
    {
      title: "API Gateway & Service Discovery 아키텍처",
      description:
        "APISIX Gateway로 레거시 트래픽 중앙화, Netflix Eureka Service Discovery 구축. 마이크로서비스 라우팅, Rate Limiting, Circuit Breaker 패턴 적용. API 지연시간 40% 감소. Graceful Shutdown으로 502 에러 제로 달성.",
    },
    {
      title: "Redis 운영 & 비즈니스 메트릭 최적화",
      description:
        "Redis Sentinel 3 Node HA 클러스터 구축, v5→v7 무중단 마이그레이션(Dual-Write 전략). Custom Signal SDK 개발로 API별 Cache Hit/Miss 측정(상품 85%, 장바구니 92%, 주문 78%). P95 응답시간 5ms 이내, 4개 클러스터 실시간 모니터링. ClickHouse 장기 저장소 운영",
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
