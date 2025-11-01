"use client";

import { useState } from "react";

import { Dictionary } from "@/types/portfolio";

import ProjectImageSwiper from "./project-image-swiper";

interface ProjectsContentProps {
  dict: Dictionary;
}

interface Project {
  content: string[];
  images?: string[];
  subtitle: string;
  title: string;
}

export default function ProjectsContent({}: ProjectsContentProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: "📊 모니터링 시스템 고도화",
      subtitle: "Legacy End-to-End 관측 환경 구축",
      content: [
        "기간: 2024.06 ~ 현재 · Project leading",
        "Challenge: Scouter 기반 레거시 모니터링의 한계 및 컨테이너 서비스 메시 환경에서의 관측 단절로 인한 장애 감지 지연",
        "Solution: OpenTelemetry, Grafana stack, Prometheus, AWS 기반 통합 관측(Observability) 시스템으로 마이그레이션 주도",
        "10년 이상 운영된 레거시 모놀리식 시스템과 신규 MSA가 혼재된 환경에서 End-to-End 분산 추적(Distributed Tracing), 메트릭, 로그를 단일 플랫폼에서 수집",
        "12대 서버에 Collector 구축 및 Grafana 대시보드 연동",
        "OpenTelemetry 오픈소스 프로젝트에 커스텀 Exporter 개발 및 기여",
      ],
      images: [
        "/projects/otel-grafana/Grafana - System Dashboard.png",
        "/projects/otel-grafana/Grafana - Networking.png",
      ],
    },
    {
      title: "🗄️ 데이터 레이크 기반 비즈니스 지표 시각화",
      subtitle: "AWS Glue & Athena를 활용한 장기 데이터 분석 환경 구축",
      content: [
        "Challenge: 기존 7일 제한의 로그 조회 기간으로 인한 장기 데이터 분석 및 장애 대응 한계",
        "Solution: AWS Glue (Spark 기반)와 Athena (Hive 기반)를 활용한 데이터 레이크 아키텍처 구축",
        "S3를 중앙 저장소로 사용하여 로그 장기 보관 (10년)",
        "Parquet 포맷 압축 및 시간/날짜 기반 파티셔닝으로 쿼리 성능 최적화",
        "Achievement: 로그 조회 기간 142배 확장 (7일 → 10년)",
        "수집된 데이터를 Grafana와 연동하여 리텐션, 구매 전환율 등 핵심 이커머스 분석 지표 시각화 대시보드 구축",
      ],
      images: ["/projects/business-grafana/Grafana NPS.png"],
    },
    {
      title: "🏥 TheShop 의약/B2B 이커머스 플랫폼 SRE",
      subtitle: "하이브리드 아키텍처 운영 · 연 5천억 규모",
      content: [
        "Situation & Task: 대웅 그룹의 핵심 B2B/B2C 이커머스 플랫폼 'TheShop'의 안정적인 운영 및 확장을 위한 SRE 업무 총괄",
        "연 5천억 원의 거래 규모, 일 10만 사용자 트래픽, 월 20TB 이상의 데이터 처리",
        "Action 1: AWS ECS Fargate 서버리스 컨테이너 환경과 온프레미스(CentOS/Ubuntu) Docker 환경이 혼재된 하이브리드 인프라 설계 및 운영",
        "APISIX 게이트웨이 및 Nginx를 통한 마이크로서비스 트래픽 중앙 관리, Rate Limiting 및 Circuit Breaker 패턴 적용",
        "CloudFormation(IaC)을 활용한 인프라 프로비저닝 자동화, EC2 Right-sizing 및 S3 생명주기 정책으로 월 운영 비용 50% 절감",
        "Action 2: React/Next.js 프론트엔드와 Spring Boot, Node.js 백엔드 API 서버, Oracle DB로 구성된 복잡한 어플리케이션 스택 전반의 성능 병목 지점 식별 및 최적화",
        "OpenTelemetry 도입으로 레거시 모니터링 시스템 고도화, 분산 추적(Tracing)을 통해 신규 시스템의 오류 감지 시간을 18시간에서 10분 이내로 99% 단축",
        "Apache Kafka 및 Redis Sentinel 클러스터 구축으로 일 10억 건의 대규모 메시지 안정 처리",
        "Result: 비즈니스 연속성 확보, 비용 최적화(50% 절감) 및 배포 자동화(90% 단축) 달성, 평균 장애 복구 시간(MTTR) 획기적 단축",
      ],
      images: [
        "/projects/theshop/TheShop_Pharmacy.png",
        "/projects/theshop/TheShop_Seller.png",
      ],
    },
    {
      title: "🏗️ Gateway 및 트래픽 관리",
      subtitle: "IDSTrust 게이트웨이 통합",
      content: [
        "shop.co.kr, connect.shop.co.kr IDSTrust 게이트웨이 통합",
        "Connect API 연동과 트래픽 효율적 관리",
        "Platform 및 BO 서비스 트래픽 운영 최적화",
        "APISIX 기반 API Gateway 구축 및 Eureka 서비스 디스커버리 통합",
        "Spring Cloud Eureka와 APISIX 연동으로 동적 서비스 라우팅 및 로드밸런싱 구현",
        "전체 트래픽에 RBAC 적용",
        "고가용(HA) 환경 구성",
        "APISIX POC로 Kafka와 Airflow 연동 성공",
      ],
      images: ["/projects/APISIX-Dashboard.png"],
    },
    {
      title: "🔄 Apache Airflow 데이터 파이프라인 구축",
      subtitle: "고가용성 5개 클러스터 운영 · 배치/CDC/통계 자동화",
      content: [
        "고가용성(HA) 아키텍처 기반 5개 Airflow 클러스터 설계 및 구축",
        "배치 처리(Batch), CDC(Change Data Capture), 통계 집계 작업 자동화",
        "PostgreSQL 메타데이터 DB와 Redis 메시지 브로커를 활용한 분산 워크플로우 관리",
        "Celery Executor 기반 태스크 병렬 처리로 대규모 데이터 파이프라인 성능 최적화",
        "DAG(Directed Acyclic Graph) 기반 복잡한 데이터 의존성 관리 및 스케줄링",
        "실시간 모니터링 대시보드 및 알림 시스템 구축으로 데이터 파이프라인 안정성 확보",
        "데이터 웨어하우스 ETL 프로세스 자동화로 분석 업무 효율성 향상",
      ],
      images: ["/projects/Aiflow.png"],
    },
    {
      title: "🤖 LG 익시 AI 솔루션 (IXI Studio)",
      subtitle: "생성형 AI 기업용 SaaS 플랫폼",
      content: [
        "기업 특성에 맞춤 내부 AI 모델 생성 및 관리 플랫폼",
        "Server Side Event(SSE)를 활용한 실시간 AI 응답 스트리밍",
        "Chat, Code Editor 등 POC 품질 향상으로 빠듯한 개발일정 성공",
        "Kubernetes with Istio 환경에서의 안정적 서비스 구축",
        "CodeMirror 라이브러리 Vite prerender build 이슈 해결 (오픈소스 수정)",
        "konva.js, element-ui, apache echarts 데이터 시각화",
        "SSE 프로토콜 경험으로 기술 스펙트럼 확장",
      ],
      images: [
        "/projects/ixi-studio/0.png",
        "/projects/ixi-studio/1.png",
        "/projects/ixi-studio/2.png",
        "/projects/ixi-studio/3.png",
        "/projects/ixi-studio/4.png",
      ],
    },
    {
      title: "🛠️ LG 익시 관리 도구 (IXI Admin)",
      subtitle: "AI 서비스 TTS, NLP 모델 관리 플랫폼",
      content: [
        "금칙어, 로그, 가중치 설정 및 모니터링",
        "LG 바이올렛(Kubernetes) 환경에서 웹서비스 최초 개발",
        "horizontal pod autoscaler, Notebook resource, Argo 등 row level kubectl 관리",
        "CVT 테스트를 통한 Kubernetes + Istio 네트워킹 이슈 해결",
        "ECR 이미지 관리 불안정성 해결 (쿠버네티스 자격증 기반 소통)",
        "WAF를 통한 보안 이슈 해결",
      ],
      images: [
        "/projects/ixi-admin/1.png",
        "/projects/ixi-admin/2.png",
        "/projects/ixi-admin/3.png",
        "/projects/ixi-admin/4.png",
        "/projects/ixi-admin/5.png",
        "/projects/ixi-admin/6.png",
      ],
    },
    {
      title: "🚁 SK 드론 관제 플랫폼",
      subtitle: "Three.js LOD 최적화로 3D 렌더링 70% 개선",
      content: [
        "500MB 이상 대용량 3D 데이터 효율적 처리",
        "Three.js LOD (Level of Detail) 최적화로 성능 70% 개선",
        "Keycloak SSO 인증 시스템 구축",
        "사진 메타정보(EXIF)로부터 GPS(고도/위도/경도) 추출",
        "SK T Map API 연동 실시간 드론 위치 추적",
        "AWS CloudFront + PWA 캐시 충돌 이슈 해결",
        "동시 50대 드론 실시간 관제 지원",
      ],
      images: [
        "/projects/drone/1.jpeg",
        "/projects/drone/2.jpeg",
        "/projects/drone/3.png",
        "/projects/drone/4.png",
      ],
    },
    {
      title: "🤖 LG 물류 로봇 관제 플랫폼",
      subtitle: "100대 동시 관제, M2PX 알고리즘 독자 개발",
      content: [
        "유진로봇 Gateway 연동으로 로봇 상태/위치/배터리 실시간 제어",
        "PWA + 반응형 웹으로 모바일/데스크탑 서비스 제공",
        "M2PX 알고리즘 독자 개발 (Meter to Pixel 좌표 변환)",
        "RabbitMQ + AWS IoT Core MQTTS-WebSocket 실시간 디바이스 통신",
        "대시보드, AS 접수, 알림 이력 등 관리 화면 제공",
        "평균 응답 시간 200ms 이하 달성",
        "레퍼런스 코드 분석으로 층별 지도 scale 기반 위치 표시 해결",
      ],
      images: [
        "/projects/robot-platform/1.png",
        "/projects/robot-platform/2.png",
        "/projects/robot-platform/3.png",
        "/projects/robot-platform/4.png",
      ],
    },
    {
      title: "💼 인아웃박스 (Inoutbox)",
      subtitle: "동대문 의류 B2B/B2C 플랫폼 (1인 풀스택 개발)",
      content: [
        "동대문 특화 의류 소/도매 플랫폼 구축",
        "소매: 재고관리, 판매관리, 주문관리, 배송관리",
        "도매: 상품등록, 주문관리, 배송관리, POS, 외상관리",
        "사입: 모바일 앱을 통한 빠른 배송 프로세스",
        "Go-Gin 기반 RESTful API 서버 개발",
        "Vue.js 기반 프론트엔드 및 POS 시스템 구현",
        "Flutter 크로스 플랫폼 앱 개발 (Android/iOS)",
        "POS 프린터 기기별 DOM/CSS 최적화로 다양한 프린터 모델 호환",
        "GCP Logging + Slack 실시간 장애 알림 시스템",
        "Firebase, GCP 인프라 구축 및 FCM Push 알림 연동",
      ],
      images: [
        "/projects/iobox/inout-login.png",
        "/projects/iobox/main.png",
        "/projects/iobox/shop-main.png",
        "/projects/iobox/uncle-main.png",
        "/projects/iobox/vendor-main.png",
        "/projects/iobox/inquiry.png",
        "/projects/iobox/uncle-app-1.png",
        "/projects/iobox/uncle-app-2.png",
      ],
    },
    {
      title: "🏕️ 캠핑 SNS 앱 (Campi)",
      subtitle: "Dart 커스텀 이미지 편집 라이브러리 개발",
      content: [
        "캠핑 SNS 플랫폼 (캠핑장 예약, 리뷰, 사진 공유)",
        "사용자/인플루언서 캠핑 컨텐츠 게시 및 상품 판매",
        "Flutter 앱 개발 중 이미지 편집 기능 추가 요구",
        "Dart로 이미지 편집 라이브러리 직접 개발 (초기 Flutter 생태계에 라이브러리 부재)",
        "Pinch-to-zoom, Cropping, Rotation, Flip 기능 구현",
        "제스처(scale, pan, drag)에 맞춘 aspect ratio, clip 처리",
        "Firebase, GCP 인프라 및 FCM Push 알림",
        "Dart 언어 이해도 향상 및 라이브러리 제작 경험",
      ],
      images: ["/projects/campi/feed.jpg", "/projects/campi/my-page.jpg"],
    },
    {
      title: "🎨 Virtual Try-on 가상 피팅룸",
      subtitle: "AI 모델 통합 웹 서비스 (국가 과제)",
      content: [
        "AI 부서 제작 모델 기반 가상 피팅룸 웹 서비스",
        "Intelligent Personalization Solution 적용",
        "상/하의, 신발 3개 모델 별 서버 통합 관리",
        "Python Django 백엔드 + Vue.js 프론트엔드",
        "1인 개발로 AI 부서와 협업",
        "실시간 모델 선택 및 피팅 결과 표시",
      ],
      images: ["/projects/try-on.png"],
    },
    {
      title: "🏢 인텔리시스 회사 홈페이지",
      subtitle: "PM 및 외주 관리 프로젝트",
      content: [
        "외주사 선정부터 프로젝트 진행, 유지보수까지 전반적 관리",
        "WBS, 요구사항 정의, 개발 진행, 산출물 관리",
        "웹 에이전시와의 효율적 협업 방법 확립",
        "Node.js, Express, EJS 템플릿 엔진 활용",
        "PM에서 SM으로 역할 전환 경험",
      ],
      images: ["/projects/intellisys.png"],
    },
  ];

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="border-b"
              style={{ borderColor: "var(--color-border-primary)" }}
            >
              <button
                className="w-full text-left py-4 px-2 hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpanded(idx)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {project.subtitle}
                    </p>
                  </div>

                  <svg
                    className={`w-5 h-5 transform transition-transform ${expandedIndex === idx || idx < 3 ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {(expandedIndex === idx ||
                (expandedIndex === null && idx < 3)) && (
                <div className="px-2 pb-4">
                  {project.images && project.images.length > 0 && (
                    <div className="mb-4">
                      <ProjectImageSwiper
                        alt={project.title}
                        images={project.images}
                      />
                    </div>
                  )}

                  <ul className="space-y-2">
                    {project.content.map((item, iidx) => (
                      <li
                        key={iidx}
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
