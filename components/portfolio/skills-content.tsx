import { Progress } from "@heroui/progress";
import { Chip } from "@heroui/chip";

import { Dictionary, Skill } from "@/types/portfolio";

interface SkillsContentProps {
  skills: Skill[];
  dict: Dictionary;
}

export default function SkillsContent({ skills, dict }: SkillsContentProps) {
  const skillsWithColor = skills.map((skill, index) => ({
    ...skill,
    color:
      index % 3 === 0
        ? "var(--color-skill-1)"
        : index % 3 === 1
          ? "var(--color-skill-2)"
          : "var(--color-skill-3)",
  }));

  return (
    <div className="py-12">
      <h2
        className="text-3xl font-bold text-center"
        style={{ color: "var(--color-text-primary)" }}
      >
        {dict.profile.skills}
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {skillsWithColor.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span
                className="font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                {skill.name}
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {skill.level}%
              </span>
            </div>
            <Progress
              aria-label={skill.name}
              className="h-2"
              color="default"
              style={
                {
                  "--progress-background": "var(--color-background-tertiary)",
                  "--progress-color": skill.color,
                } as any
              }
              value={skill.level}
            />
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-4xl mx-auto">
        <h3
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: "var(--color-text-primary)" }}
        >
          {dict.profile.teamworkSkills}
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Jira / Confluence",
            "Git / GitHub / GitLab",
            "MCP 세미나 개최 및 지식 공유",
            "Cross Functional Team 협업",
          ].map((skill, idx) => (
            <Chip
              key={idx}
              className="px-4 py-2"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
              }}
              variant="bordered"
            >
              {skill}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
