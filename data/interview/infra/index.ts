import type { InterviewQuestion } from "@/types/portfolio";

/**
 * Infrastructure 카테고리별 질문들
 * 각 카테고리 파일에서 질문들을 import하여 통합 export
 */

import { infraCoreQuestions } from "./core";
import { infraObservabilityQuestions } from "./observability";
import { infraDataQuestions } from "./data";
import { infraOperationsQuestions } from "./operations";
import { infraNetworkingQuestions } from "./networking";
import { infraSoftSkillsQuestions } from "./soft-skills";

/**
 * 모든 Infrastructure 질문들을 카테고리별로 통합
 */
export const infraQuestions: InterviewQuestion[] = [
  ...infraCoreQuestions, // Core Infrastructure (Kubernetes, AWS, IaC)
  ...infraObservabilityQuestions, // Observability & Monitoring
  ...infraDataQuestions, // Data & Messaging
  ...infraOperationsQuestions, // Operations & Management
  ...infraNetworkingQuestions, // Networking & CI/CD
  ...infraSoftSkillsQuestions, // Soft Skills & Philosophy
];

/**
 * 카테고리별 개별 export (필요시 사용)
 */
export {
  infraCoreQuestions,
  infraObservabilityQuestions,
  infraDataQuestions,
  infraOperationsQuestions,
  infraNetworkingQuestions,
  infraSoftSkillsQuestions,
};
