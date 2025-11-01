import type {
  Certification,
  Experience,
  PortfolioLink,
  Skill,
} from "@/types/portfolio";

export const skills: Skill[] = [
  { name: "React&Vue", level: 90 },
  { name: "Go-Gin", level: 80 },
  { name: "Flutter", level: 80 },
  { name: "Python,Django&Airflow", level: 85 },
  { name: "Spring-boot", level: 75 },
  { name: "Kubernetes", level: 95 },
  { name: "AWS", level: 90 },
  { name: "Terraform", level: 50 },
];

export const certifications: Certification[] = [
  {
    name: "AWS Certified Advanced Networking – Specialty",
    org: "Amazon Web Services",
    date: "2025년 10월",
    logo: "/other/logo/amazon_web_services_logo.jpeg",
  },
  {
    name: "AWS Certified DevOps Engineer – Professional",
    org: "Amazon Web Services",
    date: "2024년 11월",
    logo: "/other/logo/amazon_web_services_logo.jpeg",
  },
  {
    name: "AWS Certified SysOps Administrator – Associate",
    org: "Amazon Web Services",
    date: "2024년 8월",
    logo: "/other/logo/amazon_web_services_logo.jpeg",
  },
  {
    name: "LFCS (Linux Foundation Certified System Administrator)",
    org: "The Linux Foundation",
    date: "2024년 3월",
    logo: "/other/logo/the_linux_foundation_logo.jpeg",
  },
  {
    name: "CKA (Certified Kubernetes Administrator)",
    org: "The Linux Foundation",
    date: "2024년 1월",
    logo: "/other/logo/the_linux_foundation_logo.jpeg",
  },
  {
    name: "정보처리기사",
    org: "한국산업인력공단",
    date: "2019년",
    logo: "/other/logo/hrd_korea_logo.jpeg",
  },
];

export const experiences: Experience[] = [
  {
    company: "대웅 (Idstrust)",
    position: "Senior Engineer",
    period: "2024년 6월 – 현재 (1년 5개월)",
    description:
      "연 5천억 규모 TheShop 이커머스 플랫폼 지원팀 소속. 일 10억 건 메시지, 월 20TB 데이터 레이크, 200+ Airflow DAG 운영. OpenTelemetry, Kafka, EKS 기반 MSA 인프라 담당.",
    achievements: [
      "OpenTelemetry 마이그레이션으로 오류 감지 시간 99% 단축 (18시간 → 10분)",
      "OpenTelemetry 오픈소스 커스텀 Exporter 개발 및 기여",
      "Nginx → APISIX 마이그레이션으로 중앙화된 API 트래픽 관리 구현",
      "Apache Kafka 3-node HA 클러스터로 일 10억 건 메시지 안정 처리",
      "Apache Airflow 5-server 클러스터로 200+ 배치 작업 자동화",
      "Redis Sentinel Master-Slave HA 캐싱 시스템 구현",
      "ECS Fargate + CloudFormation IaC로 배포 시간 90% 단축 (2시간 → 12분)",
      "AWS Glue + Athena 데이터 레이크로 로그 조회 기간 142배 확장 (7일 → 10년)",
      "Grafana 대시보드로 리텐션, 구매 전환율 등 핵심 비즈니스 지표 시각화",
      "Redis v5 → v7 LTS 무중단 마이그레이션 (Dual-Write + Phased Rollout)",
      "개발자 샌드박스 환경 자동 프로비저닝 시스템 구축",
    ],
  },
  {
    company: "애버커스 (Abacus)",
    position: "Senior Researcher (Frontend Project Leader)",
    period: "2023년 5월 – 2024년 6월 (1년 2개월)",
    description:
      "LG/SK 협력 SI 회사. Kubernetes, AWS 환경 기반 MSA 구축 및 프론트엔드 프로젝트 리딩. Cross Functional Team 간 커뮤니케이션 및 주요 이슈 해결 담당.",
    achievements: [
      "LG 바이올렛 Kubernetes 환경 유일 기술 파트너사 인정, 매출 300% 증가",
      "Kubernetes 클러스터 구축 (Master 1, Worker 2) + Keycloak SSO",
      "M2PX 알고리즘 독자 개발 (Meter to Pixel 좌표 변환)",
      "LG U+ 로봇 플랫폼: 100대 동시 관제, 평균 응답 200ms 이하",
      "RabbitMQ + AWS IoT Core 실시간 디바이스 통신 구현",
      "Three.js LOD 최적화로 SK 드론 3D 렌더링 70% 개선",
      "50대 드론 실시간 관제 지원",
      "EXIF GPS 추출 + SK T Map API 연동",
    ],
  },
  {
    company: "인아웃박스 (Inoutbox)",
    position: "1인 풀스택 개발 (창업)",
    period: "2022년 6월 – 2023년 3월 (10개월)",
    description:
      "의류 도매 B2B/B2C 플랫폼. 서비스 기획, 설계, 개발, 인프라 운영 총괄 (End-to-End).",
    achievements: [
      "동대문 의류 도매 B2B/B2C 플랫폼 서비스 기획 및 개발",
      "Go-Gin 기반 RESTful API 서버 개발",
      "Vue.js 기반 프론트엔드 개발",
      "Flutter 크로스 플랫폼 앱 개발 (Android/iOS)",
      "POS 프린터 기기별 DOM/CSS 최적화로 호환성 확보",
      "GCP Logging + Slack 실시간 장애 알림 시스템",
    ],
  },
  {
    company: "인텔리시스 (Intellisys)",
    position: "서비스 연구원",
    period: "2020년 2월 – 2022년 6월 (2년 5개월)",
    description:
      "AI 추천 솔루션 회사. Kubernetes 환경에서 API서버(Python), Web서버(Vue/React), ML 파이프라인(Argo, RabbitMQ/Dramatiq) 구축 및 운영.",
    achievements: [
      "Argo Workflows 기반 ML 파이프라인으로 학습 시간 60% 단축",
      "RabbitMQ + Dramatiq 비동기 처리로 40개 쇼핑몰 데이터 수집 완전 자동화",
      "n2 알고리즘 (ANN) 기반 상품 추천 시스템으로 클릭률 15% 향상",
      "일 10만 건 이상 추천 요청 안정 처리",
    ],
  },
];

export const portfolioLinks: PortfolioLink[] = [
  { name: "Github", url: "https://github.com/seongpil0948" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/choi-seongpil-9910a0203/",
  },
  {
    name: "CodingGame",
    url: "https://www.codingame.com/profile/f98c28095b66d60aa9adc3f62e04210e6669263",
  },
  { name: "All-ad", url: "http://all-ad.in" },
];
