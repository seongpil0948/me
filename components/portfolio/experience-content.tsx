import { Dictionary, Experience } from "@/types/portfolio";

interface ExperienceContentProps {
  experiences: Experience[];
  dict: Dictionary;
}

export default function ExperienceContent({
  experiences,
}: ExperienceContentProps) {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="relative pl-8 pb-8 border-l-2"
            style={{ borderColor: "var(--color-border-primary)" }}
          >
            <div
              className="absolute -left-3 top-0 w-6 h-6 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />

            <div className="mb-4">
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: "var(--color-text-primary)" }}
              >
                {exp.position}
              </h3>
              <p className="text-lg mb-1" style={{ color: "var(--color-text-secondary)" }}>
                {exp.company}
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                {exp.period}
              </p>
            </div>

            <p className="mb-4" style={{ color: "var(--color-text-secondary)" }}>
              {exp.description}
            </p>

            <ul className="space-y-2">
              {exp.achievements.map((achievement, aidx) => (
                <li key={aidx} className="text-sm" style={{ color: "var(--color-text-tertiary)" }}>
                  • {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
