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
  const nameDisplay =
    locale === "ko" ? (
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
    );

  return (
    <section className="max-w-4xl mx-auto px-6 relative">
      <div className="text-center">
        <h1
          className={`text-5xl md:text-6xl font-bold mb-4 ${nanumMyeongjo.className}`}
        >
          {nameDisplay}
        </h1>
        <p
          className="text-xl mb-8 max-w-2xl mx-auto"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {description}
        </p>
      </div>

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
