import type { InterviewQuestion } from "@/types/portfolio";

import { backendQuestions } from "./backend";
import { defensiveTacticsQuestions } from "./defensive-tactics";
import { frontendQuestions } from "./frontend";
import { generalQuestions } from "./general";
import { infraQuestions as infrastructureQuestions } from "./infra";
// 토스 질문들 (toss 디렉토리로 분리)
import {
  tossCompanyQuestions,
  tossInterviewQuestions,
  tossIstioQuestions,
  tossTechQuestions,
} from "./toss";

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
 * All interview questions (general + toss-specific)
 */
export const allInterviewQuestions: InterviewQuestion[] = [
  ...interviewQuestions,
  ...tossInterviewQuestions,
  ...defensiveTacticsQuestions,
];

/**
 * Toss-specific interview questions (all combined)
 * Technical (Istio, mTLS, Service Mesh) + Company/Culture + Defensive Tactics
 */
export const allTossInterviewQuestions: InterviewQuestion[] = [
  ...tossInterviewQuestions,
  ...defensiveTacticsQuestions,
];

/**
 * Export individual categories for selective import
 */
export {
  // General questions
  backendQuestions,
  defensiveTacticsQuestions,
  frontendQuestions,
  generalQuestions,
  infrastructureQuestions,
  // Toss questions
  tossCompanyQuestions,
  tossInterviewQuestions,
  tossIstioQuestions,
  tossTechQuestions,
};
