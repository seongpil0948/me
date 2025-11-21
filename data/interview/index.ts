import type { InterviewQuestion } from "@/types/portfolio";

import { backendQuestions } from "./backend";
import { defensiveTacticsQuestions } from "./defensive-tactics";
import { frontendQuestions } from "./frontend";
import { generalQuestions } from "./general";
import { infraQuestions as infrastructureQuestions } from "./infra";

/**
 * All general interview questions combined
 * Split by category for better maintainability
 */
export const interviewQuestions: InterviewQuestion[] = [
  ...generalQuestions,
  ...infrastructureQuestions,
  ...backendQuestions,
  ...frontendQuestions,
  ...defensiveTacticsQuestions,
];

/**
 * Export individual categories for selective import
 */
export {
  backendQuestions,
  defensiveTacticsQuestions,
  frontendQuestions,
  generalQuestions,
  infrastructureQuestions,
};
