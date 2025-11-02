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
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { categorizeSkills, getSkillEmoji } from "@/lib/skill-utils";

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
  const highSchoolByLocale = personalInfo.highSchool.school[locale];
  const militaryBranchByLocale = personalInfo.military.branch[locale];
  const militaryRankByLocale = personalInfo.military.rank[locale];
  const militaryStatusByLocale = personalInfo.military.status[locale];

  // Categorize skills by proficiency level using utility function
  const {
    expert: expertSkills,
    advanced: advancedSkills,
    competent: competentSkills,
  } = categorizeSkills(skills);

  return (
    <ResumePrintWrapper dict={dict}>
      <div className="min-h-screen bg-white text-black p-8 max-w-[210mm] mx-auto font-sans">
        {/* Header */}
        <header
          style={{
            marginBottom: "32px",
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
                      <a
                        style={{
                          color: "#3498db",
                          textDecoration: "underline",
                        }}
                        href="mailto:seongpil0948@gmail.com"
                      >
                        seongpil0948@gmail.com
                      </a>
                    </div>
                    <div>
                      <strong>{dict.profile.phone}:</strong>{" "}
                      <a
                        style={{
                          color: "#3498db",
                          textDecoration: "underline",
                        }}
                        href="tel:+821071840948"
                      >
                        010-7184-0948
                      </a>
                    </div>
                    <div>
                      <strong>GitHub:</strong>{" "}
                      <a
                        style={{
                          color: "#3498db",
                          textDecoration: "underline",
                        }}
                        href={personalInfo.contact.github}
                      >
                        {personalInfo.contact.github}
                      </a>
                    </div>
                    <div>
                      <strong>LinkedIn:</strong>{" "}
                      <a
                        style={{
                          color: "#3498db",
                          textDecoration: "underline",
                        }}
                        href={personalInfo.contact.linkedin}
                      >
                        linkedin.com/in/choi-seongpil
                      </a>
                    </div>
                    <div>
                      <strong>{dict.profile.address}:</strong>{" "}
                      {locationByLocale}
                    </div>
                    <div>
                      <strong>🌐 이력서 웹사이트:</strong>{" "}
                      <a
                        style={{
                          color: "#3498db",
                          textDecoration: "underline",
                        }}
                        href={"https://sp.all-ad.in/"}
                      >
                        {"https://sp.all-ad.in/"}
                      </a>
                    </div>
                  </div>
                </div>
                <Image width={150} src={"/me/face.jpg"} alt={nameByLocale} />
              </div>
            </div>
          </div>
        </header>
        {/* Education & Military Service - Compact Table Format */}
        <section className="mb-5">
          <h2 className="text-[13pt] font-bold mb-2.5 border-b-2 border-gray-800 pb-1 text-gray-800">
            {dict.resume.education} / 병역
          </h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "9pt",
              border: "1px solid #d0d0d0",
            }}
          >
            <tbody>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <td
                  style={{
                    padding: "10px 12px",
                    border: "1px solid #d0d0d0",
                    fontWeight: "600",
                    width: "18%",
                    backgroundColor: "#e8eef5",
                  }}
                >
                  대학교
                </td>
                <td
                  style={{ padding: "10px 12px", border: "1px solid #d0d0d0" }}
                >
                  {schoolByLocale} · {degreeByLocale} · {majorByLocale} · 학점:{" "}
                  {personalInfo.education.gpa}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    border: "1px solid #d0d0d0",
                    color: "#7f8c8d",
                    whiteSpace: "nowrap",
                    width: "15%",
                    textAlign: "right",
                  }}
                >
                  {personalInfo.education.period}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "10px 12px",
                    border: "1px solid #d0d0d0",
                    fontWeight: "600",
                    backgroundColor: "#e8eef5",
                  }}
                >
                  고등학교
                </td>
                <td
                  style={{ padding: "10px 12px", border: "1px solid #d0d0d0" }}
                >
                  {highSchoolByLocale} · 졸업
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    border: "1px solid #d0d0d0",
                    color: "#7f8c8d",
                    textAlign: "right",
                  }}
                >
                  {personalInfo.highSchool.period}
                </td>
              </tr>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <td
                  style={{
                    padding: "10px 12px",
                    border: "1px solid #d0d0d0",
                    fontWeight: "600",
                    backgroundColor: "#e8eef5",
                  }}
                >
                  병역
                </td>
                <td
                  style={{ padding: "10px 12px", border: "1px solid #d0d0d0" }}
                >
                  {militaryBranchByLocale} · {militaryRankByLocale} ·{" "}
                  {militaryStatusByLocale}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    border: "1px solid #d0d0d0",
                    color: "#7f8c8d",
                    textAlign: "right",
                  }}
                >
                  {personalInfo.military.period}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Professional Summary / About Me */}
        <section className="mb-5">
          <h2 className="text-[13pt] font-bold mb-2.5 border-b-2 border-gray-800 pb-1 text-gray-800">
            {dict.resume.summary}
          </h2>
          <Card>
            <CardBody className="p-3.5">
              <p className="text-[9pt] leading-relaxed text-gray-800 mb-2">
                {dict.profile.aboutMeParagraph1}
              </p>
              <p className="text-[9pt] leading-relaxed text-gray-800 mb-2">
                {dict.profile.aboutMeParagraph2}
              </p>
              <p className="text-[9pt] leading-relaxed text-gray-800 mb-2">
                {dict.profile.aboutMeParagraph3}
              </p>
              <p className="text-[9pt] leading-relaxed text-gray-800 m-0">
                {dict.profile.aboutMeParagraph4}
              </p>
            </CardBody>
          </Card>
        </section>

        {/* Skills & Certifications */}
        <section className="mb-5">
          <h2 className="text-[13pt] font-bold mb-2.5 border-b-2 border-gray-800 pb-1 text-gray-800">
            {dict.resume.skillsAndCertifications}
          </h2>

          {/* Certifications */}
          <div className=" my-4">
            <h3
              style={{
                fontSize: "10pt",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#2c3e50",
              }}
            >
              🏆 {dict.resume.certifications}
            </h3>
            <div style={{ fontSize: "9pt" }}>
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                    padding: "6px 8px",
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flex: 1,
                    }}
                  >
                    {cert.logo && (
                      <Image
                        alt={cert.org}
                        src={cert.logo}
                        style={{
                          width: "20px",
                          height: "20px",
                          objectFit: "contain",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <span style={{ fontWeight: "600", fontSize: "9pt" }}>
                      {cert.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "8pt",
                      color: "#7f8c8d",
                      whiteSpace: "nowrap",
                      marginLeft: "8px",
                    }}
                  >
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Expert Level Skills */}
          {expertSkills.length > 0 && (
            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  fontSize: "9pt",
                }}
              >
                {expertSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    color="success"
                    size="sm"
                    style={{
                      fontSize: "8pt",
                      height: "24px",
                      backgroundColor: "#17c964",
                      color: "#ffffff",
                    }}
                    variant="flat"
                  >
                    {getSkillEmoji(skill.name)} {skill.name}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Level Skills */}
          {advancedSkills.length > 0 && (
            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  fontSize: "9pt",
                }}
              >
                {advancedSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    color="primary"
                    size="sm"
                    style={{
                      fontSize: "8pt",
                      height: "24px",
                      backgroundColor: "#006fee",
                      color: "#ffffff",
                    }}
                    variant="flat"
                  >
                    {getSkillEmoji(skill.name)} {skill.name}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {/* Competent Level Skills */}
          {competentSkills.length > 0 && (
            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  fontSize: "9pt",
                }}
              >
                {competentSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    color="default"
                    size="sm"
                    style={{
                      fontSize: "8pt",
                      height: "24px",
                      backgroundColor: "#d4d4d8",
                      color: "#27272a",
                    }}
                    variant="flat"
                  >
                    {getSkillEmoji(skill.name)} {skill.name}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Work Experience */}
        <section className="mb-5">
          <h2 className="text-[14pt] font-bold mb-2 border-b border-gray-500 pb-0.5 text-gray-800">
            {dict.resume.experience}
          </h2>
          {experiences.map((exp, index) => (
            <div
              key={index}
              style={{
                marginBottom: "16px",
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "6px",
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
                    whiteSpace: "nowrap",
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
                      marginBottom: "6px",
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
        <section className="mb-5">
          <h2 className="text-[13pt] font-bold mb-2.5 border-b-2 border-gray-800 pb-1 text-gray-800">
            {dict.resume.projects}
          </h2>
          <div style={{ fontSize: "9pt" }}>
            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#ffffff",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "#2c3e50",
                }}
              >
                📊 모니터링 시스템 고도화 (Legacy End-to-End 관측 환경 구축)
              </h3>
              <p
                style={{
                  fontSize: "8pt",
                  color: "#7f8c8d",
                  marginBottom: "6px",
                  fontStyle: "italic",
                }}
              >
                기간: 2024.06 ~ 현재 · Project leading
              </p>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>
                  Challenge: Scouter 기반 레거시 모니터링의 한계 및 컨테이너
                  서비스 메시 환경에서의 관측 단절로 인한 장애 감지 지연
                </li>
                <li>
                  Solution: OpenTelemetry, Grafana stack, Prometheus, AWS 기반
                  통합 관측(Observability) 시스템으로 마이그레이션 주도
                </li>
                <li>
                  10년 이상 운영된 레거시 모놀리식 시스템과 신규 MSA가 혼재된
                  환경에서 End-to-End 분산 추적(Distributed Tracing), 메트릭,
                  로그를 단일 플랫폼에서 수집
                </li>
                <li>12대 서버에 Collector 구축 및 Grafana 대시보드 연동</li>
                <li>
                  OpenTelemetry 오픈소스 클라우드 네이티브, Container, AWS 관련
                  이슈 기여
                </li>
              </ul>
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="모니터링 시스템 고도화"
                  src="/projects/otel-grafana/Grafana - System Dashboard.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#f8f9fa",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "#2c3e50",
                }}
              >
                🗄️ 데이터 레이크 기반 비즈니스 지표 시각화
              </h3>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>
                  Challenge: 기존 7일 제한의 로그 조회 기간으로 인한 장기 데이터
                  분석 및 장애 대응 한계
                </li>
                <li>
                  Solution: AWS Glue (Spark 기반)와 Athena (Hive 기반)를 활용한
                  데이터 레이크 아키텍처 구축
                </li>
                <li>S3를 중앙 저장소로 사용하여 로그 장기 보관 (10년)</li>
                <li>
                  Parquet 포맷 압축 및 시간/날짜 기반 파티셔닝으로 쿼리 성능
                  최적화
                </li>
                <li>
                  Achievement: 로그 조회 기간 142배 확장 (7일 → 10년) 및 수집된
                  데이터를 Grafana와 연동하여 리텐션, 구매 전환율 등 핵심
                  이커머스 분석 지표 시각화 대시보드 구축
                </li>
              </ul>
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="데이터 레이크 기반 비즈니스 지표 시각화"
                  src="/projects/business-grafana/Grafana NPS.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#ffffff",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "#2c3e50",
                }}
              >
                🏥 TheShop 의약/B2B 이커머스 플랫폼 SRE 및 하이브리드 아키텍처
                운영
              </h3>
              <p
                style={{
                  fontSize: "8pt",
                  color: "#7f8c8d",
                  marginBottom: "6px",
                  fontStyle: "italic",
                }}
              >
                연 5천억 원 거래 규모 · 일 10만 사용자 트래픽 · 월 20TB 데이터
                처리
              </p>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>
                  AWS ECS Fargate 서버리스 컨테이너 환경과
                  온프레미스(CentOS/Ubuntu) Docker 환경이 혼재된 하이브리드
                  인프라 설계 및 운영
                </li>
                <li>
                  APISIX 게이트웨이 및 Nginx를 통해 마이크로서비스 트래픽을
                  중앙에서 관리하고, Rate Limiting 및 Circuit Breaker 패턴을
                  적용하여 시스템 장애 전파 방지
                </li>
                <li>
                  CloudFormation(IaC)을 활용해 인프라 프로비저닝을 자동화하고,
                  EC2 Right-sizing 및 S3 생명주기 정책을 통해 월 운영 비용 50%
                  절감
                </li>
                <li>
                  React/Next.js 기반 프론트엔드와 Spring Boot, Node.js 백엔드
                  API 서버, Oracle DB로 구성된 복잡한 어플리케이션 스택 전반의
                  성능 병목 지점 식별 및 최적화
                </li>
                <li>
                  OpenTelemetry를 도입하여 레거시 모니터링 시스템을 고도화, 분산
                  추적(Tracing)을 통해 신규 시스템의 오류 감지 시간을 18시간에서
                  10분 이내로 99% 단축
                </li>
                <li>
                  Apache Kafka 및 Redis Sentinel 클러스터를 구축하여 일 2~5천만
                  건의 대규모 메시지를 안정적으로 처리하고, 데이터 일관성 확보
                </li>
              </ul>
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="TheShop 의약/B2B 이커머스 플랫폼"
                  src="/projects/theshop/TheShop_Pharmacy.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#f8f9fa",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "#2c3e50",
                }}
              >
                🏗️ Gateway 및 트래픽 관리 (IDSTrust)
              </h3>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>shop.co.kr, connect.shop.co.kr IDSTrust 게이트웨이 통합</li>
                <li>
                  APISIX 기반 API Gateway 구축 및 Eureka 서비스 디스커버리 통합
                </li>
                <li>
                  Spring Cloud Eureka와 APISIX 연동으로 동적 서비스 라우팅 및
                  로드밸런싱 구현
                </li>
                <li>전체 트래픽에 RBAC 적용 및 고가용(HA) 환경 구성</li>
                <li>APISIX POC로 Kafka와 Airflow 연동 성공</li>
              </ul>
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="APISIX Gateway 및 트래픽 관리"
                  src="/projects/APISIX-Dashboard.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#ffffff",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "#2c3e50",
                }}
              >
                🔄 Apache Airflow 데이터 파이프라인 구축
              </h3>
              <p
                style={{
                  fontSize: "8pt",
                  color: "#7f8c8d",
                  marginBottom: "6px",
                  fontStyle: "italic",
                }}
              >
                고가용성 5개 클러스터 운영 · 배치/CDC/통계 자동화
              </p>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>
                  고가용성(HA) 아키텍처 기반 5개 Airflow 클러스터 설계 및 구축
                </li>
                <li>
                  배치 처리(Batch), CDC(Change Data Capture), 통계 집계 작업
                  자동화
                </li>
                <li>
                  PostgreSQL 메타데이터 DB와 Redis 메시지 브로커를 활용한 분산
                  워크플로우 관리
                </li>
                <li>
                  Celery Executor 기반 태스크 병렬 처리로 대규모 데이터
                  파이프라인 성능 최적화
                </li>
                <li>
                  DAG(Directed Acyclic Graph) 기반 복잡한 데이터 의존성 관리 및
                  스케줄링
                </li>
                <li>
                  실시간 모니터링 대시보드 및 알림 시스템 구축으로 데이터
                  파이프라인 안정성 확보
                </li>
              </ul>
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="Apache Airflow 데이터 파이프라인"
                  src="/projects/Aiflow.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#f8f9fa",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
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
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="LG 익시 AI 솔루션"
                  src="/projects/ixi-studio/0.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#ffffff",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "#2c3e50",
                }}
              >
                �️ LG 익시 관리 도구 (IXI Admin)
              </h3>
              <p
                style={{
                  fontSize: "8pt",
                  color: "#7f8c8d",
                  marginBottom: "6px",
                  fontStyle: "italic",
                }}
              >
                AI 서비스 TTS, NLP 모델 관리 플랫폼
              </p>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>금칙어, 로그, 가중치 설정 및 모니터링 기능 제공</li>
                <li>
                  LG 바이올렛(Kubernetes) 환경에서 웹서비스 최초 개발 및 인프라
                  구축
                </li>
                <li>
                  horizontal pod autoscaler, Notebook resource, Argo 등 row
                  level kubectl 관리
                </li>
                <li>
                  CVT 테스트를 통한 Kubernetes + Istio 네트워킹 이슈 해결 및 ECR
                  이미지 관리 불안정성 해결
                </li>
              </ul>
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="LG 익시 관리 도구"
                  src="/projects/ixi-admin/1.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#f8f9fa",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "#2c3e50",
                }}
              >
                �🚁 SK 드론 관제 플랫폼
              </h3>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>
                  Three.js LOD (Level of Detail) 최적화로 3D 렌더링 성능 70%
                  개선
                </li>
                <li>
                  대용량 이미지 최적화: 장당 최대 50MB 드론 촬영 사진을 WebP
                  변환 및 Progressive Loading으로 로딩 시간 85% 단축
                </li>
                <li>동시 50대 드론 실시간 관제 지원</li>
                <li>
                  사진 메타정보(EXIF)로부터 GPS(고도/위도/경도) 추출 및 SK T Map
                  API 연동
                </li>
              </ul>
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="SK 드론 관제 플랫폼"
                  src="/projects/drone/3.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#f8f9fa",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
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
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="LG 물류 로봇 관제 플랫폼"
                  src="/projects/robot-platform/1.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#ffffff",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
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
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="인아웃박스"
                  src="/projects/iobox/app-store.jpeg"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#f8f9fa",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "#2c3e50",
                }}
              >
                🏕️ 캠핑 SNS 앱 (Campi)
              </h3>
              <p
                style={{
                  fontSize: "8pt",
                  color: "#7f8c8d",
                  marginBottom: "6px",
                  fontStyle: "italic",
                }}
              >
                Custom Image Editing Library Development in Dart
              </p>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>
                  Dart로 커스텀 이미지 편집 라이브러리 개발 (Pinch-to-zoom,
                  Cropping, Rotation, Flip)
                </li>
                <li>
                  Firebase, GCP 인프라 구축 및 FCM Push 알림 연동으로 실시간
                  알림 시스템 구현
                </li>
                <li>캠핑 SNS 플랫폼 (캠핑장 예약, 리뷰, 사진 공유 기능)</li>
              </ul>
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="캠핑 SNS 앱"
                  src="/projects/campi/feed.jpg"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#ffffff",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "#2c3e50",
                }}
              >
                🎨 Virtual Try-on 가상 피팅룸
              </h3>
              <p
                style={{
                  fontSize: "8pt",
                  color: "#7f8c8d",
                  marginBottom: "6px",
                  fontStyle: "italic",
                }}
              >
                AI 모델 통합 웹 서비스 (국가 과제)
              </p>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>AI 부서 모델 기반 가상 피팅룸 웹 서비스 구현</li>
                <li>
                  3개 모델 (상의/하의, 신발) 통합 관리 서버 구축 및 Python
                  Django 백엔드 + Vue.js 프론트엔드 개발
                </li>
                <li>
                  실시간 모델 선택 및 피팅 결과 표시 기능으로 사용자 경험 최적화
                </li>
              </ul>
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="Virtual Try-on 가상 피팅룸"
                  src="/projects/try-on.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginBottom: "14px",
                backgroundColor: "#f8f9fa",
                padding: "14px",
                borderRadius: "4px",
                border: "1px solid #e8e8e8",
              }}
            >
              <h3
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: "#2c3e50",
                }}
              >
                🏢 Intellisys 회사 웹사이트
              </h3>
              <p
                style={{
                  fontSize: "8pt",
                  color: "#7f8c8d",
                  marginBottom: "6px",
                  fontStyle: "italic",
                }}
              >
                PM & 외주 관리 프로젝트
              </p>
              <ul style={{ marginLeft: "20px", lineHeight: "1.6" }}>
                <li>
                  외주 선정부터 프로젝트 실행 및 유지보수까지 전반적인 관리
                  (WBS, 요구사항 정의, 개발 진행도, 산출물 관리)
                </li>
                <li>
                  웹 에이전시와의 효율적인 협업 방법 구축 및 Node.js, Express,
                  EJS 템플릿 엔진 활용
                </li>
                <li>PM에서 SM 역할로 전환하여 프로젝트 관리 역량 강화</li>
              </ul>
              <div style={{ marginTop: "8px" }}>
                <Image
                  alt="Intellisys 회사 웹사이트"
                  src="/projects/intellisys.png"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #e8e8e8",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Page break before portfolio links */}
        <div style={{ pageBreakBefore: "always" }} />

        {/* Portfolio Links */}
        <section className="mb-5">
          <h2 className="text-[13pt] font-bold mb-2.5 border-b-2 border-gray-800 pb-1 text-gray-800">
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
                  padding: "14px",
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
                    marginBottom: "6px",
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
