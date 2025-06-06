import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { Dictionary } from "@/types/portfolio";
import { nanumMyeongjo } from "@/config/fonts";

interface HeroSectionProps {
  description: string;
  dict: Dictionary;
}

export default function HeroSection({ description, dict }: HeroSectionProps) {
  return (
    <section className="max-w-4xl mx-auto px-6  text-center">
      <h1
        className={`text-5xl md:text-6xl font-bold mb-4 ${nanumMyeongjo.className}`}
      >
        Seongpil Choi{" "}
        <span style={{ color: "var(--color-primary)" }}>(최성필)</span>
      </h1>
      <p
        className="text-xl mb-8"
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
    </section>
  );
}
