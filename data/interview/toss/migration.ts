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
      "솔직히 기술적으론 EKS가 더 나은 선택이었어요. Service Mesh, Kubernetes 표준 생태계, Istio Ambient Mode의 리소스 효율성까지 매력적이었죠.\n\n" +
      "하지만 최종적으로 ECS를 선택한 이유는 크게 세 가지였습니다.\n\n" +
      "첫째, 팀 상황이었어요. 당시 DevOps 2-3명이 전체 인프라를 담당하고 있었고, AWS 경험은 풍부했지만 Kubernetes는 제한적이었죠. " +
      "Istio 운영 숙련도를 쌓는 데만 최소 6개월은 필요했는데, 그 시간이 우리에겐 없었어요. " +
      "레거시 마이그레이션과 데이터 플랫폼 구축이 더 급선무였거든요.\n\n" +
      "둘째, 기술 성숙도 리스크였습니다. Istio Ambient Mode가 Beta 단계였고, Gateway API와의 통합에 엣지 케이스가 많았어요. " +
      "두 기술 조합에 대한 프로덕션 레퍼런스가 거의 없었죠. " +
      "'우리가 first mover가 되어야 하나?'라는 고민이 컸습니다.\n\n" +
      "셋째, 현실적인 트레이드오프 계산이었어요. 우리는 이미 S3, RDS, Glue, Athena와 깊이 통합되어 있었고, " +
      "ECS는 AWS 관리형이라 운영 부담이 적었습니다. ALB와 APISIX만으로도 충분한 트래픽 제어가 가능했고요.\n\n" +
      "결과적으로 안정적인 운영을 유지하면서 비즈니스에 집중할 수 있었습니다.\n\n" +
      "토스 입사 후에는 상황이 다를 거라고 생각해요. 성숙한 DevOps 팀이 있고, Kubernetes가 이미 표준화되어 있으니까요. " +
      "그때는 EKS와 Istio의 가치를 제대로 발휘할 수 있을 것 같습니다. " +
      "APISIX와 Envoy 경험이 있어서 Istio도 빠르게 적응할 수 있을 거고요.\n\n" +
      "핵심 교훈은, 기술 선택은 팀 상황과 우선순위를 고려해야 한다는 것입니다. " +
      "최신 기술이 항상 정답은 아니니까요.",
  },
];
