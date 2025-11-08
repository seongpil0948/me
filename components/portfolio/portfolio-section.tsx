import HeroSection from "./hero-section";
import AboutContent from "./about-content";
import SkillsCertificationsContent from "./skills-certifications-content";
import ExperienceContent from "./experience-content";
import ProjectsContent from "./projects-content";
import PortfolioTabs from "./portfolio-tabs";

import { PortfolioData } from "@/types/portfolio";
import { Locale } from "@/app/[locale]/dictionaries";

export default function PortfolioSection({
  skills,
  certifications,
  experiences,
  portfolioLinks,
  openSourceContributions,
  dict,
  description,
  locale,
}: PortfolioData & { locale: Locale }) {
  return (
    <div>
      <HeroSection description={description} dict={dict} locale={locale} />

      <section className="max-w-6xl mx-auto px-6">
        <PortfolioTabs
          aboutContent={
            <AboutContent
              dict={dict}
              locale={locale}
              openSourceContributions={openSourceContributions}
              portfolioLinks={portfolioLinks}
            />
          }
          dict={dict}
          experienceContent={
            <ExperienceContent
              dict={dict}
              experiences={experiences}
              locale={locale}
            />
          }
          projectsContent={<ProjectsContent dict={dict} locale={locale} />}
          skillsCertificationsContent={
            <SkillsCertificationsContent
              certifications={certifications}
              dict={dict}
              skills={skills}
            />
          }
        />
      </section>
    </div>
  );
}
