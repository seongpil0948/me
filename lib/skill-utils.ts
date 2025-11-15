import type { InterviewQuestion, Skill } from "@/types/portfolio";

/**
 * Filters out low-priority skills from the list
 */
export function filterSkills(skills: Skill[]): Skill[] {
  const excludedSkills = ["Terraform", "Spring-boot", "Three.js"];

  return skills.filter((skill) => !excludedSkills.includes(skill.name));
}

/**
 * Categorize skills by proficiency level
 * Expert: 90+, Advanced: 80-89, Competent: <80
 */
export function categorizeSkills(skills: Skill[]) {
  const expert = skills.filter((s) => s.proficiency >= 90);
  const advanced = skills.filter(
    (s) => s.proficiency >= 80 && s.proficiency < 90,
  );
  const competent = skills.filter((s) => s.proficiency < 80);

  return { expert, advanced, competent };
}

/**
 * Deterministic shuffle using category as seed
 * This ensures the same order for the same category across renders
 */
export function shuffleQuestions(
  questions: InterviewQuestion[],
  seed: number,
): InterviewQuestion[] {
  const shuffled = [...questions];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1) + i) % (i + 1);

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Get random index using current timestamp
 * Used for true randomness in event handlers
 */
export function getRandomIndex(maxLength: number): number {
  const now = Date.now();

  return (
    Math.floor((now % maxLength) + (Math.floor(now / 1000) % maxLength)) %
    maxLength
  );
}

/**
 * Extract unique categories from interview questions
 */
export function extractCategories(questions: InterviewQuestion[]): string[] {
  const categorySet = new Set<string>();

  categorySet.add("all");
  questions.forEach((q) => {
    if (q.category1) categorySet.add(q.category1);
    if (q.category2) categorySet.add(q.category2);
  });

  return Array.from(categorySet);
}

/**
 * Filter questions by category
 */
export function filterQuestionsByCategory(
  questions: InterviewQuestion[],
  category: string,
): InterviewQuestion[] {
  if (category === "all") return questions;

  return questions.filter(
    (q) => q.category1 === category || q.category2 === category,
  );
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
