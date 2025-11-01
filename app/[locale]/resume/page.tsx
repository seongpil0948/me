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
          <p
            style={{
              fontSize: "9pt",
              lineHeight: "1.6",
              marginBottom: "12px",
              color: "#2c3e50",
            }}
          >
            {dict.hero.description}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "12px",
              fontSize: "9pt",
              backgroundColor: "#ecf0f1",
              padding: "16px",
              borderRadius: "4px",
            }}
          >
            <div>
              <div style={{ fontSize: "8pt", color: "#7f8c8d" }}>
                {dict.resume.errorDetection}
              </div>
              <div
                style={{
                  fontSize: "18pt",
                  fontWeight: "bold",
                  color: "#e74c3c",
                }}
              >
                {summaryStats.errorDetectionReduction}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "8pt", color: "#7f8c8d" }}>
                {dict.resume.costSavings}
              </div>
              <div
                style={{
                  fontSize: "18pt",
                  fontWeight: "bold",
                  color: "#27ae60",
                }}
              >
                {summaryStats.costSavings}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "8pt", color: "#7f8c8d" }}>
                {dict.resume.deploymentSpeedup}
              </div>
              <div
                style={{
                  fontSize: "18pt",
                  fontWeight: "bold",
                  color: "#3498db",
                }}
              >
                {summaryStats.deploymentSpeedup}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "8pt", color: "#7f8c8d" }}>
                {dict.resume.logRetention}
              </div>
              <div
                style={{
                  fontSize: "18pt",
                  fontWeight: "bold",
                  color: "#9b59b6",
                }}
              >
                {summaryStats.logRetentionExpansion}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "8pt", color: "#7f8c8d" }}>
                {dict.resume.projectRevenue}
              </div>
              <div
                style={{
                  fontSize: "18pt",
                  fontWeight: "bold",
                  color: "#e67e22",
                }}
              >
                {summaryStats.projectRevenue}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "8pt", color: "#7f8c8d" }}>
                {dict.resume.dailyMessages}
              </div>
              <div
                style={{
                  fontSize: "18pt",
                  fontWeight: "bold",
                  color: "#16a085",
                }}
              >
                {summaryStats.dailyMessages}
              </div>
            </div>
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
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <span
                  style={{
                    fontWeight: "600",
                    marginRight: "8px",
                    minWidth: "140px",
                  }}
                >
                  {skill.name}
                </span>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#e0e0e0",
                    height: "8px",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: getSkillBarColor(skill.level),
                      height: "100%",
                      width: `${skill.level}%`,
                    }}
                  />
                </div>
                <span
                  style={{
                    marginLeft: "8px",
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
              gap: "8px",
              fontSize: "9pt",
            }}
          >
            {portfolioLinks.map((link, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <strong>{link.name}:</strong>{" "}
                <a
                  style={{ color: "#3498db", textDecoration: "underline" }}
                  href={link.url}
                >
                  {link.url}
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
