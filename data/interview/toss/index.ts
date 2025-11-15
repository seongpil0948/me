import type { InterviewQuestion } from "@/types/portfolio";

// 토스 DevOps Engineer 포지션 기술 인터뷰 질문 (카테고리별)
export { tossIstioQuestions } from "./istio";
export { tossGatewayQuestions } from "./gateway";
export { tossMigrationQuestions } from "./migration";
export { tossObservabilityQuestions } from "./observability";
export { tossOpensourceQuestions } from "./opensource";
export { tossAutomationQuestions } from "./automation";
export { tossMultiClusterQuestions } from "./multi-cluster";
export { tossComplianceQuestions } from "./compliance";
export { tossCompanyQuestions } from "./company";

import { tossIstioQuestions } from "./istio";
import { tossGatewayQuestions } from "./gateway";
import { tossMigrationQuestions } from "./migration";
import { tossObservabilityQuestions } from "./observability";
import { tossOpensourceQuestions } from "./opensource";
import { tossAutomationQuestions } from "./automation";
import { tossMultiClusterQuestions } from "./multi-cluster";
import { tossComplianceQuestions } from "./compliance";
import { tossCompanyQuestions } from "./company";

/**
 * 토스 기술 질문 전체 (카테고리별 통합)
 * ID 범위: 101-200
 */
export const tossTechQuestions: InterviewQuestion[] = [
  ...tossIstioQuestions,
  ...tossGatewayQuestions,
  ...tossMigrationQuestions,
  ...tossObservabilityQuestions,
  ...tossOpensourceQuestions,
  ...tossAutomationQuestions,
  ...tossMultiClusterQuestions,
  ...tossComplianceQuestions,
];

/**
 * 토스 인터뷰 질문 전체 (기술 + 회사)
 * ID 범위: 101-300
 */
export const tossInterviewQuestions: InterviewQuestion[] = [
  ...tossTechQuestions,
  ...tossCompanyQuestions,
];
