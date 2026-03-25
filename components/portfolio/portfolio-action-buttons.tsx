import type { Dictionary } from "@/types/i18n";

import Link from "next/link";
import { Button } from "@heroui/react";

import { Locale } from "@/app/[locale]/dictionaries";
import { GithubIcon } from "@/components/icons";
import ResumePrintButton from "@/components/resume-print-button";
import { commonStyles } from "@/constants/styles";

interface PortfolioActionButtonsProps {
  dict: Dictionary;
  locale: Locale;
}

export default function PortfolioActionButtons({
  dict,
  locale,
}: PortfolioActionButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mt-8 mb-16 flex-wrap">
      <a href="https://github.com/seongpil0948" rel="noreferrer" target="_blank">
        <Button className="shadow-lg" style={commonStyles.button.secondary}>
          <GithubIcon size={20} />
          {dict.buttons.visitGithub}
        </Button>
      </a>
      <a href="http://all-ad.in" rel="noreferrer" target="_blank">
        <Button className="shadow-lg" style={commonStyles.button.primary}>
          {dict.buttons.visitPortfolio}
        </Button>
      </a>
      <ResumePrintButton label={dict.buttons.downloadResume} locale={locale} />
      <Link href={`/${locale}/exp-only-test`}>
        <Button className="shadow-lg" style={commonStyles.button.secondary}>
          📝 {dict.buttons.viewTextResume}
        </Button>
      </Link>
      <Link href="/interview">
        <Button className="shadow-lg" style={commonStyles.button.secondary}>
          IV
        </Button>
      </Link>
    </div>
  );
}
