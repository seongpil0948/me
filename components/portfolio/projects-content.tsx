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
      title: "🏗️ Gateway 및 트래픽 관리",
      subtitle: "IDSTrust 게이트웨이 통합",
      content: [
        "shop.co.kr, connect.shop.co.kr IDSTrust 게이트웨이 통합",
        "Connect API 연동과 트래픽 효율적 관리",
        "Platform 및 BO 서비스 트래픽 운영 최적화",
        "전체 트래픽에 RBAC 적용",
        "고가용(HA) 환경 구성",
        "APISIX POC로 Kafka와 Airflow 연동 성공",
      ],
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
