import type { Metadata } from "next";

import { getDictionary, Locale } from "../dictionaries";

import { personalInfo, summaryStats } from "@/data/personal";
import {
  certifications,
  experiences,
  openSourceContributions,
  portfolioLinks,
  skills,
} from "@/data/portfolio";

export const metadata: Metadata = {
  title: "경력기술서 (텍스트 전용) | Seongpil Choi",
  description: "Text-only career description for copy-paste",
};

export default async function ExpOnlyTestPage({
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

  return (
    <div className="min-h-screen bg-white text-black p-8 max-w-4xl mx-auto">
      <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
        {/* Header Section */}
        <div className="mb-8">
          {`========================================
${dict.expOnlyTest?.title || "Career Description (Text Only)"}
========================================

${dict.profile.contactInfo}
${dict.nav.home}: ${nameByLocale}
${dict.profile.email}: seongpil0948@gmail.com
${dict.profile.phone}: 010-7184-0948
GitHub: ${personalInfo.contact.github}
LinkedIn: ${personalInfo.contact.linkedin}
${dict.profile.address}: ${locationByLocale}
${dict.resume.resumeWebsite}: https://sp.all-ad.in/

========================================
${dict.resume.summary}
========================================

${dict.hero.description}

${dict.profile.aboutMeParagraph1}

${dict.profile.aboutMeParagraph2}

${dict.profile.aboutMeParagraph3}

${dict.profile.aboutMeParagraph4}

========================================
${dict.resume.education} / ${dict.resume.military}
========================================

[${dict.resume.university}]
${schoolByLocale} · ${degreeByLocale} · ${majorByLocale}
${dict.profile.education}: ${personalInfo.education.gpa}
${dict.resume.period || "Period"}: ${personalInfo.education.period}

[${dict.resume.highSchool}]
${highSchoolByLocale}
${dict.resume.period || "Period"}: ${personalInfo.highSchool.period}

[${dict.resume.military}]
${militaryBranchByLocale} · ${militaryRankByLocale} · ${militaryStatusByLocale}
${dict.resume.period || "Period"}: ${personalInfo.military.period}

========================================
${dict.resume.certifications}
========================================
`}
          {certifications
            .map(
              (cert, index) =>
                `${index + 1}. ${cert.name} - ${cert.org} (${cert.date})\n`
            )
            .join("")}
          {`
========================================
${dict.resume.skillsTitle || dict.resume.skills}
========================================

[Expert Level (90%+)]
${skills
  .filter((s) => s.proficiency >= 90)
  .map((s) => `- ${s.name} (${s.proficiency}%)`)
  .join("\n")}

[Advanced Level (85-89%)]
${skills
  .filter((s) => s.proficiency >= 85 && s.proficiency < 90)
  .map((s) => `- ${s.name} (${s.proficiency}%)`)
  .join("\n")}

[Competent Level (75-84%)]
${skills
  .filter((s) => s.proficiency >= 75 && s.proficiency < 85)
  .map((s) => `- ${s.name} (${s.proficiency}%)`)
  .join("\n")}

========================================
${dict.resume.experience}
========================================
`}
          {experiences
            .map((exp, index) => {
              return `
[${index + 1}] ${exp.company}
${dict.resume.position || "Position"}: ${exp.position[locale]}
${dict.resume.period || "Period"}: ${exp.period[locale]}

${dict.experience.description || "Description"}:
${exp.description[locale]}

${dict.experience.keyAchievements}:
${exp.achievements[locale].map((achievement, idx) => `${idx + 1}. ${achievement}`).join("\n")}

${dict.resume.techStack || "Tech Stack"}:
${exp.technologies.join(", ")}
`;
            })
            .join("\n----------------------------------------\n")}
          {`
========================================
${dict.resume.projects}
========================================

[1] ${dict.projects.monitoring.title}
${dict.projects.monitoring.subtitle}

${dict.projects.monitoring.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[2] ${dict.projects.dataLake.title}
${dict.projects.dataLake.subtitle}

${dict.projects.dataLake.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[3] ${dict.projects.theshop.title}
${dict.projects.theshop.subtitle}

${dict.projects.theshop.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[4] ${dict.projects.gateway.title}
${dict.projects.gateway.subtitle}

${dict.projects.gateway.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[5] ${dict.projects.airflow.title}
${dict.projects.airflow.subtitle}

${dict.projects.airflow.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[6] ${dict.projects.ixiStudio.title}
${dict.projects.ixiStudio.subtitle}

${dict.projects.ixiStudio.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[7] ${dict.projects.ixiAdmin.title}
${dict.projects.ixiAdmin.subtitle}

${dict.projects.ixiAdmin.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[8] ${dict.projects.drone.title}
${dict.projects.drone.subtitle}

${dict.projects.drone.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[9] ${dict.projects.robotPlatform.title}
${dict.projects.robotPlatform.subtitle}

${dict.projects.robotPlatform.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[10] ${dict.projects.inoutbox.title}
${dict.projects.inoutbox.subtitle}

${dict.projects.inoutbox.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[11] ${dict.projects.campi.title}
${dict.projects.campi.subtitle}

${dict.projects.campi.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[12] ${dict.projects.virtualTryOn.title}
${dict.projects.virtualTryOn.subtitle}

${dict.projects.virtualTryOn.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

----------------------------------------

[13] ${dict.projects.intellisysWebsite.title}
${dict.projects.intellisysWebsite.subtitle}

${dict.projects.intellisysWebsite.content.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}

========================================
${dict.profile.portfolioLinks}
========================================
`}
          {portfolioLinks
            .map((link, index) => `${index + 1}. ${link.name}: ${link.url}\n`)
            .join("")}
          {`
========================================
${dict.profile.openSourceContributions}
========================================
`}
          {openSourceContributions
            .map(
              (contribution, index) =>
                `${index + 1}. ${contribution.name}: ${contribution.url}\n`
            )
            .join("")}
          {`
========================================

${dict.expOnlyTest?.lastUpdated || "Last Updated"}: ${new Date().toLocaleDateString(locale)}

${dict.expOnlyTest?.copyInstructions || "Copy the content above and paste it into text-based forms."}
`}
        </div>
      </div>
    </div>
  );
}
