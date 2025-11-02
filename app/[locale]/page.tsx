import { getDictionary, Locale } from "./dictionaries";

import PortfolioSection from "@/components/portfolio/portfolio-section";
import PortfolioActionButtons from "@/components/portfolio/portfolio-action-buttons";
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
      <PortfolioSection
        certifications={certifications}
        description={dict.hero.description}
        dict={dict}
        experiences={experiences}
        locale={locale}
        portfolioLinks={portfolioLinks}
        skills={skills}
      />

      <PortfolioActionButtons dict={dict} locale={locale} />
    </div>
  );
}
