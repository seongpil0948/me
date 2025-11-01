import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { nanumMyeongjo } from "@/config/fonts";
import { Dictionary } from "@/types/portfolio";
import { personalInfo } from "@/data/personal";
import { Locale } from "@/app/[locale]/dictionaries";

import { HeroCanvas } from "./hero-canvas";

interface HeroSectionProps {
  description: string;
  dict: Dictionary;
  locale: Locale;
}

export default function HeroSection({
  description,
  dict,
  locale,
}: HeroSectionProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 relative">
      {/* Text content - centered */}
      <div className="text-center">
        <h1
          className={`text-5xl md:text-6xl font-bold mb-4 ${nanumMyeongjo.className}`}
        >
          {locale === "ko" ? (
            <>
              {personalInfo.name.ko}{" "}
              <span style={{ color: "var(--color-primary)" }}>
                ({personalInfo.name.en})
              </span>
            </>
          ) : (
            <>
              {personalInfo.name.en}{" "}
              <span style={{ color: "var(--color-primary)" }}>
                ({personalInfo.name.ko})
              </span>
            </>
          )}
        </h1>
        <p
          className="text-xl mb-8 max-w-2xl mx-auto"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {description}
        </p>
        <div className="flex justify-center gap-4">
          <Button
            as={Link}
            className="bg-transparent border-2"
            href="https://github.com/seongpil0948"
            style={{
              borderColor: "var(--color-text-primary)",
              color: "var(--color-text-primary)",
            }}
            target="_blank"
            variant="flat"
          >
            {dict.buttons.visitGithub}
          </Button>
          <Button
            as={Link}
            color="primary"
            href="http://all-ad.in"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {dict.buttons.visitPortfolio}
          </Button>
        </div>
      </div>

      {/* Canvas animation - absolute positioned */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "300px",
          height: "300px",
          zIndex: 1,
          pointerEvents: "auto",
        }}
      >
        <HeroCanvas />
      </div>
    </section>
  );
}
