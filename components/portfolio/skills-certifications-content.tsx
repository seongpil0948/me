import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";

import { Certification, Dictionary, Skill } from "@/types/portfolio";
import { categorizeSkills, getSkillEmoji } from "@/lib/skill-utils";

interface SkillsCertificationsContentProps {
  certifications: Certification[];
  dict: Dictionary;
  skills: Skill[];
}

export default function SkillsCertificationsContent({
  skills,
  certifications,
  dict,
}: SkillsCertificationsContentProps) {
  // Categorize skills by proficiency level using utility function
  const {
    expert: expertSkills,
    advanced: advancedSkills,
    competent: competentSkills,
  } = categorizeSkills(skills);

  // Add status to certifications based on their index
  const certsWithStatus = certifications.map((cert) => ({
    ...cert,
    status: "certified",
  }));

  return (
    <div className="py-12">
      {/* Certifications Section */}
      <div>
        <h2
          className="text-3xl font-bold text-center mb-8"
          style={{ color: "var(--color-text-primary)" }}
        >
          🏆 {dict.certifications.title}
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {certsWithStatus.map((cert, idx) => (
            <Card
              key={idx}
              className="p-6 border"
              style={{
                backgroundColor: "var(--color-background-secondary)",
                borderColor: "var(--color-border-primary)",
              }}
            >
              <CardBody className="p-0">
                <div className="flex items-start gap-4 mb-4">
                  {cert.logo && (
                    <Image
                      alt={`${cert.org} logo`}
                      className="object-contain shrink-0"
                      height={60}
                      src={cert.logo}
                      width={60}
                    />
                  )}
                  <div className="flex-1">
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {cert.name}
                    </h3>
                    <p
                      className="text-sm mb-2"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {cert.org}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {cert.date}
                  </span>
                  <Chip
                    size="sm"
                    style={{
                      backgroundColor:
                        cert.status === "certified"
                          ? "var(--color-success-bg)"
                          : "var(--color-warning-bg)",
                      color:
                        cert.status === "certified"
                          ? "var(--color-success)"
                          : "var(--color-warning)",
                    }}
                    variant="flat"
                  >
                    {cert.status === "certified"
                      ? dict.certifications.certified
                      : dict.certifications.inProgress}
                  </Chip>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <Divider className="my-6" />
      {/* Skills Section */}
      <div className="mb-16">
        <h2
          className="text-3xl font-bold text-center mb-8"
          style={{ color: "var(--color-text-primary)" }}
        >
          {dict.profile.skills}
        </h2>

        {/* Skills by proficiency level */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Expert Level Skills */}
          {expertSkills.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-2">
                {expertSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    className="text-white"
                    color="success"
                    size="md"
                    variant="flat"
                  >
                    {getSkillEmoji(skill.name)} {skill.name}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Level Skills */}
          {advancedSkills.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-2">
                {advancedSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    className="text-white"
                    color="primary"
                    size="md"
                    variant="flat"
                  >
                    {getSkillEmoji(skill.name)} {skill.name}
                  </Chip>
                ))}
              </div>
            </div>
          )}
          <Divider />

          {/* Competent Level Skills */}
          {competentSkills.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-2">
                {competentSkills.map((skill, index) => (
                  <Chip key={index} color="default" size="md" variant="flat">
                    {getSkillEmoji(skill.name)} {skill.name}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Teamwork Skills */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h3
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "var(--color-text-primary)" }}
          >
            {dict.profile.teamworkSkills}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              dict.profile.teamwork.jiraConfluence,
              dict.profile.teamwork.gitTools,
              dict.profile.teamwork.mcpSeminar,
              dict.profile.teamwork.crossFunctional,
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
    </div>
  );
}
