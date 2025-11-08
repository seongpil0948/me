import type { Metadata } from "next";

import { getDictionary, Locale } from "../dictionaries";

import { ResumePrintWrapper } from "@/components/resume-print-wrapper";
import { personalInfo, summaryStats } from "@/data/personal";
import {
  certifications,
  experiences,
  openSourceContributions,
  portfolioLinks,
  skills,
} from "@/data/portfolio";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
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
        <header className="mb-8 pb-4">
          <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
            <div>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{nameByLocale}</h1>
                  <p className="text-xl text-gray-700 mb-4">
                    {dict.hero.title}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[9pt] mt-4">
                    <div>
                      <strong>{dict.profile.email}:</strong>{" "}
                      <a
                        className="text-blue-600 underline hover:text-blue-700"
                        href="mailto:seongpil0948@gmail.com"
                      >
                        seongpil0948@gmail.com
                      </a>
                    </div>
                    <div>
                      <strong>{dict.profile.phone}:</strong>{" "}
                      <a
                        className="text-blue-600 underline hover:text-blue-700"
                        href="tel:+821071840948"
                      >
                        010-7184-0948
                      </a>
                    </div>
                    <div>
                      <strong>GitHub:</strong>{" "}
                      <a
                        className="text-blue-600 underline hover:text-blue-700"
                        href={personalInfo.contact.github}
                      >
                        {personalInfo.contact.github}
                      </a>
                    </div>
                    <div>
                      <strong>LinkedIn:</strong>{" "}
                      <a
                        className="text-blue-600 underline hover:text-blue-700"
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
                      <strong>🌐 {dict.resume.resumeWebsite}:</strong>{" "}
                      <a
                        className="text-blue-600 underline hover:text-blue-700"
                        href="https://sp.all-ad.in/"
                      >
                        https://sp.all-ad.in/
                      </a>
                    </div>
                  </div>
                </div>
                <Image width={150} src="/me/face.jpg" alt={nameByLocale} />
              </div>
            </div>
          </div>
        </header>
        {/* Education & Military Service - Compact Table Format */}
        <section className="mb-6">
          <h2 className="text-[14pt] font-bold mb-3 border-b-2 border-gray-800 pb-1.5 text-gray-800">
            {dict.resume.education} / {dict.resume.military}
          </h2>
          <table className="w-full border-collapse text-[10pt] border border-gray-300">
            <tbody>
              <tr className="bg-gray-50">
                <td className="py-2.5 px-3 border border-gray-300 font-semibold w-[18%] bg-blue-50">
                  {dict.resume.university}
                </td>
                <td className="py-2.5 px-3 border border-gray-300">
                  {schoolByLocale} · {degreeByLocale} · {majorByLocale} ·{" "}
                  {dict.profile.education}: {personalInfo.education.gpa}
                </td>
                <td className="py-2.5 px-3 border border-gray-300 text-gray-600 whitespace-nowrap w-[15%] text-right">
                  {personalInfo.education.period}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 border border-gray-300 font-semibold bg-blue-50">
                  {dict.resume.highSchool}
                </td>
                <td className="py-2.5 px-3 border border-gray-300">
                  {highSchoolByLocale}
                </td>
                <td className="py-2.5 px-3 border border-gray-300 text-gray-600 text-right">
                  {personalInfo.highSchool.period}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-2.5 px-3 border border-gray-300 font-semibold bg-blue-50">
                  {dict.resume.military}
                </td>
                <td className="py-2.5 px-3 border border-gray-300">
                  {militaryBranchByLocale} · {militaryRankByLocale} ·{" "}
                  {militaryStatusByLocale}
                </td>
                <td className="py-2.5 px-3 border border-gray-300 text-gray-600 text-right">
                  {personalInfo.military.period}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Professional Summary / About Me */}
        <section className="mb-6">
          <h2 className="text-[14pt] font-bold mb-3 border-b-2 border-gray-800 pb-1.5 text-gray-800">
            {dict.resume.summary}
          </h2>
          <Card>
            <CardBody className="p-4">
              <p className="text-[10pt] leading-relaxed text-gray-800 mb-2.5">
                {dict.profile.aboutMeParagraph1}
              </p>
              <p className="text-[10pt] leading-relaxed text-gray-800 mb-2.5">
                {dict.profile.aboutMeParagraph2}
              </p>
              <p className="text-[10pt] leading-relaxed text-gray-800 mb-2.5">
                {dict.profile.aboutMeParagraph3}
              </p>
              <p className="text-[10pt] leading-relaxed text-gray-800 m-0">
                {dict.profile.aboutMeParagraph4}
              </p>
            </CardBody>
          </Card>
        </section>

        {/* Skills & Certifications */}
        <section className="mb-6">
          <h2 className="text-[14pt] font-bold mb-3 border-b-2 border-gray-800 pb-1.5 text-gray-800">
            {dict.resume.skillsAndCertifications}
          </h2>

          {/* Certifications */}
          <div className="my-4">
            <h3 className="text-[11pt] font-semibold mb-3 text-gray-800">
              🏆 {dict.resume.certifications}
            </h3>
            <div className="text-[10pt]">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center mb-1.5 py-1.5 px-2 rounded border border-gray-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1">
                    {cert.logo && (
                      <Image
                        alt={cert.org}
                        className="w-5 h-5 object-contain shrink-0"
                        src={cert.logo}
                      />
                    )}
                    <span className="font-semibold text-[10pt]">
                      {cert.name}
                    </span>
                  </div>
                  <span className="text-[9pt] text-gray-600 whitespace-nowrap ml-2">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Level Skills */}
          {expertSkills.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-1.5 text-[10pt]">
                {expertSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    className="text-[8pt] h-6 bg-green-600 text-white"
                    color="success"
                    size="sm"
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
            <div className="mb-2">
              <div className="flex flex-wrap gap-1.5 text-[10pt]">
                {advancedSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    className="text-[8pt] h-6 bg-blue-600 text-white"
                    color="primary"
                    size="sm"
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
            <div className="mb-2">
              <div className="flex flex-wrap gap-1.5 text-[10pt]">
                {competentSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    className="text-[8pt] h-6 bg-gray-300 text-gray-900"
                    color="default"
                    size="sm"
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
        <section className="mb-6">
          <h2 className="text-[14pt] font-bold mb-3 border-b-2 border-gray-800 pb-1.5 text-gray-800">
            {dict.resume.experience}
          </h2>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`mb-4 p-3.5 rounded border border-gray-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start mb-1.5">
                <div>
                  <h3 className="text-[11pt] font-bold text-gray-800">
                    {exp.company}
                  </h3>
                  <p className="text-[10pt] text-gray-700">
                    {exp.position[locale]}
                  </p>
                </div>
                <p className="text-[10pt] text-gray-600 text-right whitespace-nowrap">
                  {exp.period[locale]}
                </p>
              </div>
              <p className="text-[10pt] mb-2 text-gray-700">
                {exp.description[locale]}
              </p>
              <ul className="ml-5 text-[10pt] list-disc">
                {exp.achievements[locale].map((achievement, idx) => (
                  <li
                    key={idx}
                    className="mb-1.5 text-gray-800 leading-relaxed list-none"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Key Projects */}
        <section className="mb-6">
          <h2 className="text-[14pt] font-bold mb-3 border-b-2 border-gray-800 pb-1.5 text-gray-800">
            {dict.resume.projects}
          </h2>
          <div className="text-[10pt]">
            <Card className="mb-3.5 p-4">
              <CardBody className="p-0">
                <h3 className="text-[11pt] font-bold mb-2 text-gray-800">
                  {dict.projects.monitoring.title}
                </h3>
                <p className="text-[9pt] text-gray-600 mb-2 italic">
                  {dict.projects.monitoring.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.monitoring.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.monitoring.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/otel-grafana/Grafana - System Dashboard.png"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5 bg-gray-50">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.dataLake.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.dataLake.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.dataLake.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.dataLake.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/business-grafana/Grafana NPS.png"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.theshop.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.theshop.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.theshop.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.theshop.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/theshop/TheShop_Pharmacy.png"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5 bg-gray-50">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.gateway.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.gateway.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.gateway.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.gateway.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/APISIX-Dashboard.png"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.airflow.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.airflow.subtitle}
                </p>
                <ul className=" leading-relaxed">
                  {dict.projects.airflow.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.airflow.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/Aiflow.png"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5 bg-gray-50">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.ixiStudio.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.ixiStudio.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.ixiStudio.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.ixiStudio.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/ixi-studio/0.png"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.ixiAdmin.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.ixiAdmin.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.ixiAdmin.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.ixiAdmin.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/ixi-admin/1.png"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5 bg-gray-50">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.drone.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.drone.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.drone.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.drone.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/drone/3.png"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5 bg-gray-50">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.robotPlatform.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.robotPlatform.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.robotPlatform.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.robotPlatform.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/robot-platform/1.png"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.inoutbox.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.inoutbox.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.inoutbox.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.inoutbox.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/iobox/app-store.jpeg"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5 bg-gray-50">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.campi.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.campi.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.campi.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.campi.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/campi/feed.jpg"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.virtualTryOn.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.virtualTryOn.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.virtualTryOn.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.virtualTryOn.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/try-on.png"
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="mb-3.5 p-3.5 bg-gray-50">
              <CardBody className="p-0">
                <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                  {dict.projects.intellisysWebsite.title}
                </h3>
                <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                  {dict.projects.intellisysWebsite.subtitle}
                </p>
                <ul className="ml-5 leading-relaxed list-disc">
                  {dict.projects.intellisysWebsite.content.map((item, idx) => (
                    <li key={idx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <Image
                    alt={dict.projects.intellisysWebsite.title}
                    className="w-full h-auto rounded border border-gray-200"
                    src="/projects/intellisys.png"
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Page break before portfolio links */}
        <div className="break-before-page" />

        {/* Portfolio Links */}
        <section className="mb-6">
          <h2 className="text-[14pt] font-bold mb-3 border-b-2 border-gray-800 pb-1.5 text-gray-800">
            {dict.profile.portfolioLinks}
          </h2>
          <div className="grid grid-cols-2 gap-3 text-[10pt]">
            {portfolioLinks.map((link, index) => (
              <Card key={index} className="p-3.5 transition-all duration-200">
                <CardBody className="p-0">
                  <div className="text-[10pt] font-semibold text-gray-800 mb-1.5">
                    {link.name}
                  </div>
                  <a
                    className="text-blue-600 no-underline text-[9pt] break-all hover:text-blue-700"
                    href={link.url}
                  >
                    {link.url.replace(/^https?:\/\//, "")}
                  </a>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Open Source Contributions */}
        <section className="mb-6">
          <h2 className="text-[13pt] font-bold mb-3 border-b border-gray-600 pb-1.5 text-gray-800">
            {dict.profile.openSourceContributions}
          </h2>
          <div className="space-y-1.5 text-[9pt]">
            {openSourceContributions.map((contribution, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <a
                  className="text-blue-600 no-underline hover:text-blue-700 break-all"
                  href={contribution.url}
                >
                  {contribution.name}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-gray-300 text-[9pt] text-gray-500 text-center">
          Last updated: {new Date().toLocaleDateString(locale)}
        </footer>
      </div>
    </ResumePrintWrapper>
  );
}
