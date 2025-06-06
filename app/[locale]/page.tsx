import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { getDictionary, Locale } from "./dictionaries";

import { GithubIcon } from "@/components/icons";
import PortfolioSection from "@/components/portfolio/portfolio-section";

export default async function MePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const skills = [
    { name: "React&Vue", level: 90 },
    { name: "Go-Gin", level: 80 },
    { name: "Flutter", level: 80 },
    { name: "Python,Django&Airflow", level: 85 },
    { name: "Spring-boot", level: 75 },
    { name: "Kubernetes", level: 95 },
    { name: "AWS", level: 90 },
    { name: "Terraform", level: 50 },
  ];

  const certifications = [
    {
      name: "AWS Certified DevOps Engineer – Professional",
      org: "Amazon Web Services",
      date: "2024년 11월",
    },
    {
      name: "AWS Certified SysOps Administrator – Associate",
      org: "Amazon Web Services",
      date: "2024년 8월",
    },
    {
      name: "LFCS (Linux Foundation Certified System Administrator)",
      org: "The Linux Foundation",
      date: "2024년 3월",
    },
    {
      name: "CKA (Certified Kubernetes Administrator)",
      org: "The Linux Foundation",
      date: "2024년 1월",
    },
    {
      name: "정보처리기사",
      org: "한국산업인력공단",
      date: "2019년",
    },
  ];

  const experiences = [
    {
      company: "대웅 (Idstrust)",
      position: "Senior Engineer",
      period: "2024년 6월 – 현재 (성과평가: 2025년 1월-5월)",
      description:
        "Frontend, 인프라, 데이터 플랫폼 업무를 담당하며 TheShop 고도화 및 운영 중입니다. AWS와 Kubernetes 환경에서 안정적인 시스템 구축에 주력하고 있습니다.",
      achievements: [
        "인프라/Gateway: 12대 서버에 모니터링 수집기 설치 및 Grafana 연동 완료",
        "Connect 인증 서버 연동 성공 및 전체 트래픽에 RBAC 적용",
        "Platform 포함 5개 BO 서비스 연동 및 IP 제한 설정 완료",
        "데이터(Airflow 등): 메일, Kafka, Health check 배치 통합을 위한 DAG 개발 및 적용",
        "Glue(Spark)와 Athena(Hive)를 활용해 7일 로그 확인에서 10년 로그 조회로 기능 확장",
        "Scouter의 Java17 이상 미지원 문제로 Scouter-React(OTEL-Kafka-React) 전환",
        "고객관리 플랫폼: 신규 CICD 환경(AWS, E2E Test)을 OnPremise Jenkins에 성공적으로 구축",
        "서비스 트래픽 모니터링 후 스케일 다운 실행, 예상 비용 대비 50% 절감",
        "APISIX (Gateway): POC로 Kafka와 Airflow 연동 성공",
        "사내 DB(Maria, PG) Health 모니터링 및 알림 기능 도입으로 장애 식별 시간 1분 이내 가능",
        "Airflow용 Redis Sentinel 3개 서버 구성으로 고가용성 달성, 장애 복구 시간 50% 단축",
        "직거래 영업사원 관리자 어플리케이션 1차 개발 완료, 사용자 만족도 85% 이상 달성",
        "신 어드민 오류 감지 시간을 평균 18시간에서 10분 이내로 단축",
      ],
    },
    {
      company: "애버커스 (Abacus)",
      position: "Senior Researcher",
      period: "2023년 4월 – 2024년 5월",
      description:
        "SI 회사, 주 협력사인 LG, SK와 K8S, EC2, On-Premise 등 개발환경에 맞추어 소프트웨어를 제공했으며 주로 Front End Project Leader 로서 기획 – 설계 – 개발 프로세스에서 Cross Functional Team 들간 커뮤니케이션, 주요 이슈 해결을 도맡았습니다.",
      achievements: [
        "11개 Debian 서버 구성 완료 후 각 담당자 인계, 프로젝트 진행 bottleneck을 최소화",
        "문서화를 통한 운영 매뉴얼 정비로 업무 의존성 감소 및 시스템 안정성 향상",
        "크로스플랫폼 App 내부 테스트 환경 출시, 영업사원 대상 사용성 테스트 결과를 반영해 직거래 활성화 비율 50% 증가",
        "안드로이드(내부 개발자), 웹(AWS ECS-ALB)를 통해 성공적인 인프라 작업 수행",
        "4주차에 걸쳐 체계적이고 연속적인 배포 업무 수행하여 로컬 테스트 환경 개선",
      ],
    },
    {
      company: "InoutBox",
      position: "Researcher",
      period: "2022년 6월 – 2023년 3월 (10개월)",
      description:
        "개발의 모든 분야(인프라 to 프론트)를 담당하여 안정적인 서비스를 구축하는 것을 목적으로 진행했던 개인 사업, 결과적으로 의류 도매 플랫폼 웹/앱, 캠핑 모바일 앱 제작등 다양한 경험을 쌓았습니다.",
      achievements: [
        "셀러 및 어드민 서비스 운영 이슈 80% 신속 해결, 서비스 가동률 99.9% 유지",
        "실시간 모니터링 시스템 도입 완료, 비정상 유저 식별 정확도 30% 향상",
        "주요 기능 90% 구현 완료, 개발 일정 10% 단축",
        "Spring 프레임워크를 활용한 백엔드 개발과 TypeScript를 사용한 프론트엔드 작업 성공적으로 완료",
      ],
    },
    {
      company: "Intellisys",
      position: "Full Stack Engineer",
      period: "2020년 1월 – 2022년 6월 (2년 6개월)",
      description:
        "추천 솔루션 회사로 AI 모델 개발자를 서포트하여 Kubernetes 환경에서의 API서버(python), Web서버(Vue/React), 다양한 workflows(Argo, RabbitMQ/dramatiq) 서비스를 구축/유지보수, 데이터 분석 등 다양한 업무를 담당하였습니다.",
      achievements: [
        "On premise DB와 VM 분리 운영 환경 구축, 시스템 장애 발생률 25% 감소",
        "5개의 배치 작업을 오류 없이 수행하여 POC 성공",
        "주요 이슈 협의 내용을 관련 담당자들과 공유하여, 단축된 Frontend 작업 시간을 타 프로젝트 진행에 활용",
        "AWS 서버리스 지식을 활용해 내결함성과 고가용성을 갖춘 인프라 환경 구축",
      ],
    },
  ];

  const portfolioLinks = [
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

  return (
    <div className="w-full max-w-full flex flex-col gap-8 bg-background">
      {/* 탭 내비게이션 */}
      <PortfolioSection
        certifications={certifications}
        description={dict.hero.description}
        dict={dict}
        experiences={experiences}
        portfolioLinks={portfolioLinks}
        skills={skills}
      />

      <div className="flex justify-center gap-4 mt-8 mb-16">
        <Button
          as={Link}
          isExternal
          className="shadow-lg"
          radius="full"
          style={{
            backgroundColor: "var(--color-text-primary)",
            color: "var(--color-background)",
          }}
          href="https://github.com/seongpil0948"
        >
          <GithubIcon size={20} />
          {dict.buttons.visitGithub}
        </Button>
        <Button
          as={Link}
          isExternal
          className="shadow-lg"
          radius="full"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#FFFFFF",
          }}
          href="http://all-ad.in"
        >
          {dict.buttons.visitPortfolio}
        </Button>
      </div>
    </div>
  );
}
