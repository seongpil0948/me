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
      index % 3 === 0 ? "#E5D4B1" : index % 3 === 1 ? "#00D184" : "#B8B8B2",
  }));

  return (
    <div className="py-12">
      <h2
        className="text-3xl font-bold text-center"
        style={{ color: "#262626" }}
      >
        {dict.profile.skills}
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {skillsWithColor.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-medium" style={{ color: "#262626" }}>
                {skill.name}
              </span>
              <span className="text-sm" style={{ color: "#787872" }}>
                {skill.level}%
              </span>
            </div>
            <Progress
              aria-label={skill.name}
              className="h-2"
              color="default"
              style={
                {
                  "--progress-background": "#F5F5F3",
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
          style={{ color: "#262626" }}
        >
          {dict.profile.teamworkSkills}
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Jira / Confluence",
            "Git / GitHub / GitLab",
            "부사관 경험 기반의 리더십",
            "MCP 세미나 개최 및 지식 공유",
            "Cross Functional Team 협업",
          ].map((skill, idx) => (
            <Chip
              key={idx}
              className="px-4 py-2"
              style={{ borderColor: "#DC6B4A", color: "#DC6B4A" }}
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
