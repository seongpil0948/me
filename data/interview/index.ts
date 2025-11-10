import type { InterviewQuestion } from "@/types/portfolio";

import { backendQuestions } from "./backend";
import { frontendQuestions } from "./frontend";
import { generalQuestions } from "./general";
import { infrastructureQuestions } from "./infrastructure";
import { tossCompanyQuestions } from "./toss-company";
import { tossTechQuestions } from "./toss-tech";

/**
 * All interview questions combined
 * Split by category for better maintainability
 */
export const interviewQuestions: InterviewQuestion[] = [
  ...generalQuestions,
  ...infrastructureQuestions,
  ...backendQuestions,
  ...frontendQuestions,
];

/**
 * Toss-specific interview questions
 * Technical (Istio, mTLS, Service Mesh) + Company/Culture
 */
export const tossInterviewQuestions: InterviewQuestion[] = [
  ...tossTechQuestions,
  ...tossCompanyQuestions,
];

/**
 * Export individual categories for selective import
 */
export {
  backendQuestions,
  frontendQuestions,
  generalQuestions,
  infrastructureQuestions,
  tossCompanyQuestions,
  tossTechQuestions,
};
