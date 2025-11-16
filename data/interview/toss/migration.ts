import type { InterviewQuestion } from "@/types/portfolio";

/**
 * Container 환경 마이그레이션 관련 질문 (ID 109)
 * - EKS vs ECS 선택 기준
 * - 기술 선택 트레이드오프
 */
export const tossMigrationQuestions: InterviewQuestion[] = [
  {
    id: 109,
    category1: "Infrastructure",
    category2: "Migration",
    question:
      "EKS로 마이그레이션을 검토하셨는데, 최종적으로 ECS를 선택한 이유가 무엇인가요?",
    answer:
      "EKS가 기술적으로는 더 좋았지만 ECS를 선택했어요. DevOps 2-3명이 전체 인프라를 담당했는데 Kubernetes 경험이 제한적이었고, Istio를 배우는 데만 6개월은 필요했거든요. 레거시 마이그레이션이 더 급했어요.\n\n" +
      "Istio Ambient Mode도 Beta 단계여서 프로덕션 레퍼런스가 거의 없었죠. 결정적으로 ECS는 AWS 관리형이라 운영 부담이 적었고 ALB와 APISIX만으로도 충분했어요.\n\n" +
      "토스는 성숙한 DevOps 팀과 표준화된 Kubernetes가 있어서 EKS와 Istio의 가치를 제대로 발휘할 수 있을 것 같습니다.",
  },
];
