import HeroSection from "./hero-section";
import AboutContent from "./about-content";
import SkillsContent from "./skills-content";
import ExperienceContent from "./experience-content";
import ProjectsContent from "./projects-content";
import CertificationsContent from "./certifications-content";
import PortfolioTabs from "./portfolio-tabs";

import { PortfolioData } from "@/types/portfolio";

export default function PortfolioSection({
  skills,
  certifications,
  experiences,
  portfolioLinks,
  dict,
  description,
}: PortfolioData) {
  return (
    <div>
      <HeroSection description={description} dict={dict} />

      <section className="max-w-6xl mx-auto px-6">
        <PortfolioTabs
          aboutContent={
            <AboutContent dict={dict} portfolioLinks={portfolioLinks} />
          }
          certificationsContent={
            <CertificationsContent
              certifications={certifications}
              dict={dict}
            />
          }
          dict={dict}
          experienceContent={
            <ExperienceContent dict={dict} experiences={experiences} />
          }
          projectsContent={<ProjectsContent dict={dict} />}
          skillsContent={<SkillsContent dict={dict} skills={skills} />}
        />
      </section>
    </div>
  );
}
