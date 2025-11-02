import { Skill } from "@/types/portfolio";

/**
 * Filters out low-priority skills from the list
 */
export function filterSkills(skills: Skill[]): Skill[] {
  const excludedSkills = ["Terraform", "Spring-boot", "Three.js"];

  return skills.filter((skill) => !excludedSkills.includes(skill.name));
}

/**
 * Categorizes skills by proficiency level
 */
export function categorizeSkills(skills: Skill[]) {
  const filteredSkills = filterSkills(skills);

  return {
    expert: filteredSkills.filter((skill) => skill.level >= 95),
    advanced: filteredSkills.filter(
      (skill) => skill.level >= 85 && skill.level < 95
    ),
    competent: filteredSkills.filter((skill) => skill.level < 85),
  };
}

/**
 * Returns the appropriate emoji for a skill based on its category
 */
export function getSkillEmoji(skillName: string): string {
  // Infrastructure & Cloud
  if (
    skillName.includes("Kubernetes") ||
    skillName.includes("AWS") ||
    skillName.includes("Docker") ||
    skillName.includes("Linux")
  )
    return "🏗️";

  // Data & Messaging
  if (
    skillName.includes("Kafka") ||
    skillName.includes("RabbitMQ") ||
    skillName.includes("Airflow") ||
    skillName.includes("Grafana") ||
    skillName.includes("Prometheus") ||
    skillName.includes("OpenTelemetry")
  )
    return "📊";

  // Backend
  if (
    skillName.includes("Python") ||
    skillName.includes("Django") ||
    skillName.includes("FastAPI") ||
    skillName.includes("Go") ||
    skillName.includes("Node.js")
  )
    return "💻";

  // Frontend
  if (
    skillName.includes("React") ||
    skillName.includes("Vue") ||
    skillName.includes("Next.js") ||
    skillName.includes("TypeScript")
  )
    return "🎨";

  // Mobile
  if (skillName.includes("Flutter")) return "📱";

  return "⚙️";
}
