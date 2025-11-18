import type { Dictionary } from "@/types/i18n";

import { Link } from "@heroui/link";

import { PortfolioLink } from "@/types/portfolio";
import { personalInfo } from "@/data/personal";
import { Locale } from "@/app/[locale]/dictionaries";

interface AboutContentProps {
  dict: Dictionary;
  portfolioLinks: PortfolioLink[];
  openSourceContributions?: PortfolioLink[];
  locale: Locale;
}

export default function AboutContent({
  dict,
  portfolioLinks,
  openSourceContributions,
  locale,
}: AboutContentProps) {
  return (
    <div className="pb-2 pt-4 grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Contact Info */}
      <div>
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: "var(--color-text-primary)" }}
        >
          {dict.profile.contactInfo}
        </h2>
        <div
          className="space-y-3"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <p>📱 {personalInfo.contact.phone}</p>
          <p>📧 {personalInfo.contact.email}</p>
          <Link
            isExternal
            href="https://idstrust.com"
            style={{ color: "var(--color-primary)" }}
          >
            🌐 {dict.companies.daewoong} → {dict.companies.idstrust}
          </Link>
          <p>📍 {personalInfo.location[locale]}</p>
        </div>
        <h2
          className="text-2xl font-bold mt-12 mb-6"
          style={{ color: "var(--color-text-primary)" }}
        >
          {dict.profile.education}
        </h2>
        <div style={{ color: "var(--color-text-secondary)" }}>
          <p className="font-semibold">
            {personalInfo.education.school[locale]}
          </p>
          <p>{personalInfo.education.degree[locale]}</p>
          <p>{personalInfo.education.major[locale]}</p>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {personalInfo.education.period}
          </p>
        </div>

        <h2
          className="text-2xl font-bold mt-12 mb-6"
          style={{ color: "var(--color-text-primary)" }}
        >
          {dict.profile.portfolioLinks}
        </h2>
        <div className="space-y-2">
          {portfolioLinks
            .filter((link) => !link.disabled)
            .map((link, idx) => (
              <Link
                key={idx}
                isExternal
                className="block hover:translate-x-1 transition-transform"
                href={link.url}
                style={{ color: "var(--color-primary)" }}
              >
                {link.name} →
              </Link>
            ))}
        </div>

        {openSourceContributions && openSourceContributions.length > 0 && (
          <>
            <h2
              className="text-xl font-bold mt-8 mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              {dict.profile.openSourceContributions}
            </h2>
            <div className="space-y-1.5">
              {openSourceContributions.map((contribution, idx) => (
                <Link
                  key={idx}
                  isExternal
                  className="block text-sm hover:translate-x-1 transition-transform"
                  href={contribution.url}
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  🔗 {contribution.name}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* About Me */}
      <div className="md:col-span-2">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: "var(--color-text-primary)" }}
        >
          {dict.profile.aboutMe}
        </h2>
        <div
          className="prose prose-lg"
          style={{ color: "var(--color-text-secondary)", lineHeight: "1.8" }}
        >
          <p className="mb-6">{dict.profile.aboutMeParagraph1}</p>
          <p className="mb-6">{dict.profile.aboutMeParagraph2}</p>
          <p className="mb-6">{dict.profile.aboutMeParagraph3}</p>
          <p>{dict.profile.aboutMeParagraph4}</p>
        </div>
      </div>
    </div>
  );
}
