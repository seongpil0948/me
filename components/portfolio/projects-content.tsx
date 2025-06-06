"use client";

import { useState } from "react";
import { Dictionary } from "@/types/portfolio";

interface ProjectsContentProps {
  dict: Dictionary;
}

export default function ProjectsContent({}: ProjectsContentProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const projects = [
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
      title: "📊 비즈니스 성과",
      subtitle: "직거래 활성화 및 성능 개선",
      content: [
        "직거래 활성화 비율 50% 증가 기대",
        "신규 어드민 전환 프로젝트 기한 내 성공",
        "OKR 항목 구체화 및 실행 가능성 확보",
        "빠른 속도와 접근성 제공 개발 방안 제시",
        "팀 내 AI 통합 개발 역량 강화",
        "MCP 세미나 개최 및 지식 공유",
      ],
    },
    {
      title: "🤖 LG AI 솔루션 - 익시",
      subtitle: "생성형 AI 기업용 SaaS 플랫폼",
      content: [
        "Server Side Event(SSE)를 활용한 실시간 스트리밍 구현",
        "Chat, Code Editor 등 복잡한 기능의 POC 품질 향상",
        "Kubernetes with Istio 환경에서의 서비스 구축",
        "CodeMirror 라이브러리 브라우저 참조 이슈 해결",
      ],
    },
    {
      title: "🚁 SK 드론 관제 플랫폼",
      subtitle: "SSO 인증 시스템 및 3D 데이터 처리",
      content: [
        "Keycloak을 활용한 SSO 시스템 구축",
        "500MB 이상 3D 데이터 효율적 저장 방안 구현",
        "사진 메타정보(EXIF)로부터 고도, 위도, 경도 추출",
        "SK T Map API 연동 실시간 위치 표시",
        "AWS CloudFront와 PWA 캐시 충돌 이슈 해결",
      ],
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
                    <div style={{ color: "var(--color-text-primary)" }}>
                      {project.title}
                    </div>
                    <div
                      className="text-sm font-normal mt-1"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {project.subtitle}
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      expandedIndex === idx ? "rotate-180" : ""
                    }`}
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
              {expandedIndex === idx && (
                <div className="px-2 pb-4">
                  <ul className="space-y-2 pt-2">
                    {project.content.map((item, iidx) => (
                      <li key={iidx} style={{ color: "var(--color-text-secondary)" }}>
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