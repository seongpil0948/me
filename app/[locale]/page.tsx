import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { getDictionary, Locale } from "./dictionaries";

import { GithubIcon } from "@/components/icons";
import PortfolioSection from "@/components/portfolio/portfolio-section";
import ResumePrintButton from "@/components/resume-print-button";
import {
  certifications,
  experiences,
  portfolioLinks,
  skills,
} from "@/data/portfolio";

export default async function MePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="w-full max-w-full flex flex-col gap-8 bg-background">
      {/* 탭 내비게이션 */}
      <PortfolioSection
        certifications={certifications}
        description={dict.hero.description}
        dict={dict}
        experiences={experiences}
        locale={locale}
        portfolioLinks={portfolioLinks}
        skills={skills}
      />

      <div className="flex justify-center gap-4 mt-8 mb-16">
        <Button
          as={Link}
          isExternal
          className="shadow-lg"
          radius="full"
          style={{
            backgroundColor: "var(--color-text-primary)",
            color: "var(--color-background)",
          }}
          href="https://github.com/seongpil0948"
        >
          <GithubIcon size={20} />
          {dict.buttons.visitGithub}
        </Button>
        <Button
          as={Link}
          isExternal
          radius="full"
          color="primary"
          style={{
            backgroundColor: "var(--color-primary)",
          }}
          href="http://all-ad.in"
        >
          {dict.buttons.visitPortfolio}
        </Button>
        <ResumePrintButton
          label={dict.buttons.downloadResume}
          locale={locale}
        />
      </div>
    </div>
  );
}
