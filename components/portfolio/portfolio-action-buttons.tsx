import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { Locale } from "@/app/[locale]/dictionaries";
import { GithubIcon } from "@/components/icons";
import ResumePrintButton from "@/components/resume-print-button";
import { commonStyles } from "@/constants/styles";
import { Dictionary } from "@/types/portfolio";

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
      <Button
        isExternal
        as={Link}
        className="shadow-lg"
        href="https://github.com/seongpil0948"
        radius="full"
        style={commonStyles.button.secondary}
      >
        <GithubIcon size={20} />
        {dict.buttons.visitGithub}
      </Button>
      <Button
        isExternal
        as={Link}
        color="primary"
        href="http://all-ad.in"
        radius="full"
        style={commonStyles.button.primary}
      >
        {dict.buttons.visitPortfolio}
      </Button>
      <ResumePrintButton label={dict.buttons.downloadResume} locale={locale} />
      <Button
        as={Link}
        className="shadow-lg"
        color="default"
        href={`/${locale}/exp-only-test`}
        radius="full"
        style={commonStyles.button.secondary}
      >
        📝 {dict.buttons.viewTextResume}
      </Button>
    </div>
  );
}
