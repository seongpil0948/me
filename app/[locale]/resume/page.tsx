import type { Metadata } from "next";

import { getDictionary, Locale } from "../dictionaries";

import { ResumePrintWrapper } from "@/components/resume-print-wrapper";
import { personalInfo, summaryStats } from "@/data/personal";
import {
  certifications,
  experiences,
  portfolioLinks,
  skills,
} from "@/data/portfolio";
import { Image } from "@heroui/image";
import { Progress } from "@heroui/progress";

export const metadata: Metadata = {
  title: "Resume | Seongpil Choi",
  description: "Professional resume of Seongpil Choi",
};

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const nameByLocale =
    locale === "en" ? personalInfo.name.en : personalInfo.name.ko;
  const locationByLocale = personalInfo.location[locale];
  const schoolByLocale = personalInfo.education.school[locale];
  const degreeByLocale = personalInfo.education.degree[locale];
  const majorByLocale = personalInfo.education.major[locale];

  const getSkillBarColor = (level: number): string => {
    if (level >= 90) return "#27ae60";
    if (level >= 80) return "#3498db";

    return "#95a5a6";
  };

  return (
    <ResumePrintWrapper dict={dict}>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: "32px",
          maxWidth: "210mm",
          margin: "0 auto",
          fontFamily:
            "'Malgun Gothic', 'Noto Sans KR', system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header */}
        <header
          style={{
            marginBottom: "32px",
            borderBottom: "2px solid #2c3e50",
            paddingBottom: "16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "16px",
              alignItems: "start",
            }}
          >
            <div>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{nameByLocale}</h1>
                  <p className="text-xl text-gray-700 mb-4">
                    {dict.hero.title}
                  </p>
                </div>
                <Image src={"/me/face.jpg"} alt={nameByLocale} />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              fontSize: "9pt",
              marginTop: "16px",
            }}
          >
            <div>
              <strong>{dict.profile.email}:</strong>{" "}
              {personalInfo.contact.email}
            </div>
            <div>
              <strong>{dict.profile.phone}:</strong>{" "}
              {personalInfo.contact.phone}
            </div>
            <div>
              <strong>GitHub:</strong>{" "}
              <a
                style={{ color: "#3498db", textDecoration: "underline" }}
                href={personalInfo.contact.github}
              >
                {personalInfo.contact.github}
              </a>
            </div>
            <div>
              <strong>LinkedIn:</strong>{" "}
              <a
                style={{ color: "#3498db", textDecoration: "underline" }}
                href={personalInfo.contact.linkedin}
              >
                linkedin.com/in/choi-seongpil
              </a>
            </div>
            <div>
              <strong>{dict.profile.address}:</strong> {locationByLocale}
            </div>
            <div>
              <strong>Portfolio:</strong>{" "}
              <a
                style={{ color: "#3498db", textDecoration: "underline" }}
                href={personalInfo.contact.portfolio}
              >
                {personalInfo.contact.portfolio}
              </a>
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16pt",
              fontWeight: "bold",
              marginBottom: "12px",
              borderBottom: "1px solid #7f8c8d",
              paddingBottom: "4px",
              color: "#2c3e50",
            }}
          >
            {dict.resume.summary}
          </h2>
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "16px",
              borderRadius: "4px",
              borderLeft: "4px solid #3498db",
              marginBottom: "16px",
            }}
          >
            <p
              style={{
                fontSize: "10pt",
                lineHeight: "1.8",
                color: "#2c3e50",
                margin: 0,
              }}
            >
              {dict.hero.description}
            </p>
          </div>
        </section>

        {/* Technical Skills */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16pt",
              fontWeight: "bold",
              marginBottom: "12px",
              borderBottom: "1px solid #7f8c8d",
              paddingBottom: "4px",
              color: "#2c3e50",
            }}
          >
            {dict.resume.skills}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              fontSize: "9pt",
            }}
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <span
                  style={{
                    fontWeight: "600",
                    minWidth: "140px",
                    fontSize: "9pt",
                  }}
                >
                  {skill.name}
                </span>
                <div style={{ flex: 1 }}>
                  <Progress
                    aria-label={skill.name}
                    classNames={{
                      base: "max-w-full",
                      track: "h-2",
                      indicator: `bg-[${getSkillBarColor(skill.level)}]`,
                    }}
                    size="sm"
                    style={
                      {
                        "--heroui-progress-indicator": getSkillBarColor(
                          skill.level
                        ),
                      } as React.CSSProperties
                    }
                    value={skill.level}
                  />
                </div>
                <span
                  style={{
                    fontSize: "8pt",
                    color: "#7f8c8d",
                    minWidth: "35px",
                    textAlign: "right",
                  }}
                >
                  {skill.level}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16pt",
              fontWeight: "bold",
              marginBottom: "12px",
              borderBottom: "1px solid #7f8c8d",
              paddingBottom: "4px",
              color: "#2c3e50",
            }}
          >
            {dict.resume.experience}
          </h2>
          {experiences.map((exp, index) => (
            <div
              key={index}
              style={{
                marginBottom: "16px",
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                padding: "12px",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "4px",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "12pt", fontWeight: "bold" }}>
                    {exp.company}
                  </h3>
                  <p style={{ fontSize: "9pt", color: "#34495e" }}>
                    {exp.position}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "9pt",
                    color: "#7f8c8d",
                    textAlign: "right",
                  }}
                >
                  {exp.period}
                </p>
              </div>
              <p
                style={{
                  fontSize: "9pt",
                  marginBottom: "8px",
                  color: "#34495e",
                }}
              >
                {exp.description}
              </p>
              <ul style={{ marginLeft: "20px", fontSize: "9pt" }}>
                {exp.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    style={{
                      marginBottom: "4px",
                      color: "#2c3e50",
                      lineHeight: "1.5",
                    }}
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Key Projects */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16pt",
              fontWeight: "bold",
              marginBottom: "12px",
              borderBottom: "1px solid #7f8c8d",
              paddingBottom: "4px",
              color: "#2c3e50",
            }}
          >
            {dict.resume.projects}
          </h2>
          <div style={{ fontSize: "9pt" }}>
            <div
              style={{
                marginBottom: "12px",
                backgroundColor: "#ffffff",
                padding: "12px",
                borderRadius: "4px",
              }}
            >
              <h3
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#2c3e50",
                }}
              >
                🏗️ Gateway 및 트래픽 관리 (IDSTrust)
              </h3>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>shop.co.kr, connect.shop.co.kr IDSTrust 게이트웨이 통합</li>
                <li>전체 트래픽에 RBAC 적용 및 고가용(HA) 환경 구성</li>
                <li>APISIX POC로 Kafka와 Airflow 연동 성공</li>
              </ul>
            </div>

            <div
              style={{
                marginBottom: "12px",
                backgroundColor: "#f8f9fa",
                padding: "12px",
                borderRadius: "4px",
              }}
            >
              <h3
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#2c3e50",
                }}
              >
                🤖 LG 익시 AI 솔루션 (IXI Studio)
              </h3>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>기업 특성에 맞춤 내부 AI 모델 생성 및 관리 플랫폼 개발</li>
                <li>Server Side Event(SSE)를 활용한 실시간 AI 응답 스트리밍</li>
                <li>Kubernetes with Istio 환경에서의 안정적 서비스 구축</li>
              </ul>
            </div>

            <div
              style={{
                marginBottom: "12px",
                backgroundColor: "#ffffff",
                padding: "12px",
                borderRadius: "4px",
              }}
            >
              <h3
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#2c3e50",
                }}
              >
                🚁 SK 드론 관제 플랫폼
              </h3>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>Three.js LOD (Level of Detail) 최적화로 성능 70% 개선</li>
                <li>동시 50대 드론 실시간 관제 지원</li>
                <li>사진 메타정보(EXIF)로부터 GPS 추출 및 SK T Map API 연동</li>
              </ul>
            </div>

            <div
              style={{
                marginBottom: "12px",
                backgroundColor: "#f8f9fa",
                padding: "12px",
                borderRadius: "4px",
              }}
            >
              <h3
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#2c3e50",
                }}
              >
                🤖 LG 물류 로봇 관제 플랫폼
              </h3>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>100대 동시 관제, M2PX 알고리즘 독자 개발</li>
                <li>
                  RabbitMQ + AWS IoT Core MQTTS-WebSocket 실시간 디바이스 통신
                </li>
                <li>평균 응답 시간 200ms 이하 달성</li>
              </ul>
            </div>

            <div
              style={{
                marginBottom: "12px",
                backgroundColor: "#ffffff",
                padding: "12px",
                borderRadius: "4px",
              }}
            >
              <h3
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "#2c3e50",
                }}
              >
                💼 인아웃박스 (Inoutbox)
              </h3>
              <p
                style={{
                  fontSize: "8pt",
                  color: "#7f8c8d",
                  marginBottom: "6px",
                  fontStyle: "italic",
                }}
              >
                동대문 의류 B2B/B2C 플랫폼 · 1인 풀스택 개발 (End-to-End)
              </p>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>Go-Gin RESTful API + Vue.js 웹 + Flutter 모바일 앱 개발</li>
                <li>
                  소매/도매/사입 역할별 맞춤 기능 (재고관리, POS, 배송관리)
                </li>
                <li>GCP 인프라 구축 및 Firebase FCM Push 알림 연동</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Page break before certifications */}
        <div style={{ pageBreakBefore: "always" }} />

        {/* Certifications */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16pt",
              fontWeight: "bold",
              marginBottom: "12px",
              borderBottom: "1px solid #7f8c8d",
              paddingBottom: "4px",
              color: "#2c3e50",
            }}
          >
            {dict.resume.certifications}
          </h2>
          <div>
            {certifications.map((cert, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "12px",
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "10pt", fontWeight: "600" }}>
                    {cert.name}
                  </h3>
                  <p style={{ fontSize: "8pt", color: "#7f8c8d" }}>
                    {cert.org}
                  </p>
                </div>
                <p style={{ fontSize: "9pt", color: "#7f8c8d" }}>{cert.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16pt",
              fontWeight: "bold",
              marginBottom: "12px",
              borderBottom: "1px solid #7f8c8d",
              paddingBottom: "4px",
              color: "#2c3e50",
            }}
          >
            {dict.resume.education}
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              backgroundColor: "#f8f9fa",
              padding: "12px",
              borderRadius: "4px",
            }}
          >
            <div>
              <h3 style={{ fontSize: "12pt", fontWeight: "600" }}>
                {schoolByLocale}
              </h3>
              <p style={{ fontSize: "9pt", color: "#34495e" }}>
                {degreeByLocale}, {majorByLocale}
              </p>
            </div>
            <p style={{ fontSize: "9pt", color: "#7f8c8d" }}>
              {personalInfo.education.period}
            </p>
          </div>
        </section>

        {/* Portfolio Links */}
        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16pt",
              fontWeight: "bold",
              marginBottom: "12px",
              borderBottom: "1px solid #7f8c8d",
              paddingBottom: "4px",
              color: "#2c3e50",
            }}
          >
            {dict.profile.portfolioLinks}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              fontSize: "9pt",
            }}
          >
            {portfolioLinks.map((link, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #e0e0e0",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "10pt",
                    fontWeight: "600",
                    color: "#2c3e50",
                    marginBottom: "4px",
                  }}
                >
                  {link.name}
                </div>
                <a
                  style={{
                    color: "#3498db",
                    textDecoration: "none",
                    fontSize: "9pt",
                    wordBreak: "break-all",
                  }}
                  href={link.url}
                >
                  {link.url.replace(/^https?:\/\//, "")}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            marginTop: "32px",
            paddingTop: "16px",
            borderTop: "1px solid #ecf0f1",
            fontSize: "8pt",
            color: "#95a5a6",
            textAlign: "center",
          }}
        >
          Last updated: {new Date().toLocaleDateString(locale)}
        </footer>
      </div>
    </ResumePrintWrapper>
  );
}
