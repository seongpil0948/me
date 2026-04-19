import type { Metadata } from "next";

import { Card, CardContent } from "@heroui/react";
import Image from "next/image";

import { getDictionary, Locale } from "../dictionaries";

import { ResumePrintWrapper } from "@/components/resume-print-wrapper";
import { personalInfo } from "@/data/personal";
import {
  certifications,
  experiences,
  openSourceContributions,
  portfolioLinks,
  projectImages,
  resumeProjects,
  skills,
} from "@/data/portfolio";

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

  return (
    <ResumePrintWrapper dict={dict}>
      <div className="min-h-screen bg-white text-black p-8 max-w-full mx-auto font-sans">
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
                <Image
                  priority
                  alt={nameByLocale}
                  height={150}
                  loading="eager"
                  src="/me/face.jpg"
                  style={{ height: "auto" }}
                  width={150}
                />
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
            <CardContent className="p-4">
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
            </CardContent>
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
                        height={20}
                        src={cert.logo}
                        width={20}
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

          {/* Technical Skills - Categorized Table */}
          <div className="my-4">
            <h3 className="text-[11pt] font-semibold mb-2 text-gray-800">
              🛠️ Technical Skills
            </h3>
            <table className="w-full border-collapse text-[9pt] border border-gray-300">
              <tbody>
                <tr>
                  <td className="py-2 px-3 border border-gray-300 font-semibold bg-blue-50 w-[20%] align-top">
                    🏗️ Infrastructure &amp; Cloud
                  </td>
                  <td className="py-2 px-3 border border-gray-300">
                    {skills
                      .filter(
                        (s) =>
                          s.name.includes("Kubernetes") ||
                          s.name.includes("AWS") ||
                          s.name.includes("Docker") ||
                          s.name.includes("Linux"),
                      )
                      .map((s) => s.name)
                      .join(" · ")}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-3 border border-gray-300 font-semibold bg-blue-50 align-top">
                    📊 Observability &amp; Data
                  </td>
                  <td className="py-2 px-3 border border-gray-300">
                    {skills
                      .filter(
                        (s) =>
                          s.name.includes("OpenTelemetry") ||
                          s.name.includes("Grafana") ||
                          s.name.includes("Prometheus") ||
                          s.name.includes("Kafka") ||
                          s.name.includes("Airflow"),
                      )
                      .map((s) => s.name)
                      .join(" · ")}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 border border-gray-300 font-semibold bg-blue-50 align-top">
                    💻 Backend
                  </td>
                  <td className="py-2 px-3 border border-gray-300">
                    {skills
                      .filter(
                        (s) =>
                          s.name.includes("Python") ||
                          s.name.includes("Go") ||
                          s.name.includes("Node.js") ||
                          s.name.includes("Spring"),
                      )
                      .map((s) => s.name)
                      .join(" · ")}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-3 border border-gray-300 font-semibold bg-blue-50 align-top">
                    🎨 Frontend &amp; Mobile
                  </td>
                  <td className="py-2 px-3 border border-gray-300">
                    {skills
                      .filter(
                        (s) =>
                          s.name.includes("React") ||
                          s.name.includes("Vue") ||
                          s.name.includes("Next.js") ||
                          s.name.includes("TypeScript") ||
                          s.name.includes("Flutter") ||
                          s.name.includes("Three.js"),
                      )
                      .map((s) => s.name)
                      .join(" · ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
            {resumeProjects.map(({ key, thumbnailIndex = 0 }, index) => {
              const project = dict.projects[
                key as keyof typeof dict.projects
              ] as { title: string; subtitle: string; content: string[] };
              const images = projectImages[key];
              const startIndex =
                images.length > 0 ? thumbnailIndex % images.length : 0;
              const orderedImages =
                images.length > 1
                  ? [
                      ...images.slice(startIndex),
                      ...images.slice(0, startIndex),
                    ]
                  : images;

              return (
                <Card
                  key={key}
                  className={`mb-3.5 p-3.5 ${
                    index % 2 !== 0 ? "bg-gray-50" : ""
                  }`}
                  style={{ pageBreakInside: "avoid" }}
                >
                  <CardContent className="p-0">
                    <h3 className="text-[10pt] font-bold mb-1.5 text-gray-800">
                      {project.title}
                    </h3>
                    <p className="text-[8pt] text-gray-600 mb-1.5 italic">
                      {project.subtitle}
                    </p>
                    <ul className="ml-5 leading-relaxed list-disc">
                      {project.content.map((item: string, idx: number) => (
                        <li key={idx} className="mb-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                    {orderedImages.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {orderedImages.slice(0, 2).map((src, imgIdx) => (
                          <Image
                            key={imgIdx}
                            alt={`${project.title} ${imgIdx + 1}`}
                            className="rounded object-cover"
                            height={110}
                            src={src}
                            style={{ height: "auto" }}
                            width={180}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Page break before portfolio links */}
        <div style={{ pageBreakBefore: "always" }} />

        {/* Portfolio Links */}
        <section className="mb-6">
          <h2 className="text-[14pt] font-bold mb-3 border-b-2 border-gray-800 pb-1.5 text-gray-800">
            {dict.profile.portfolioLinks}
          </h2>
          <div className="grid grid-cols-2 gap-3 text-[10pt]">
            {portfolioLinks.map((link, index) => (
              <Card key={index} className="p-3.5 transition-all duration-200">
                <CardContent className="p-0">
                  <div className="text-[10pt] font-semibold text-gray-800 mb-1.5">
                    {link.name}
                  </div>
                  <a
                    className="text-blue-600 no-underline text-[9pt] break-all hover:text-blue-700"
                    href={link.url}
                  >
                    {link.url.replace(/^https?:\/\//, "")}
                  </a>
                </CardContent>
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
