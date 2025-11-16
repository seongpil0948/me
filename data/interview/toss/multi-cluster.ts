import type { InterviewQuestion } from "@/types/portfolio";

/**
 * 멀티 클러스터 운영 관련 질문 (ID 116)
 * - 계열사별 클러스터 전략
 * - 표준화와 자율성 균형
 */
export const tossMultiClusterQuestions: InterviewQuestion[] = [
  {
    id: 116,
    category1: "Infrastructure",
    category2: "Multi-Cluster",
    question:
      "토스처럼 여러 계열사와 도메인별로 쿠버네티스 클러스터를 운영할 때 어떤 전략이 필요한가요?",
    answer:
      "TheShop에서 Airflow 5개 클러스터를 HA로 운영했어요. 각 클러스터는 독립적이었지만 중앙화된 모니터링으로 통합 관리했죠.\n\n" +
      "토스처럼 계열사가 많으면 '표준화와 자율성의 균형'이 중요해요. 토스뱅크는 금융 규제 때문에 엄격한 보안이 필요하고, 토스증권은 빠른 배포가 중요하니까요.\n\n" +
      "제안하고 싶은 전략은 세 가지예요. 첫째, ArgoCD Multi-Cluster로 GitOps 기반 배포를 하되 계열사별 커스터마이징은 허용하는 거죠. 둘째, NetworkPolicy로 계열사 간 트래픽을 기본 차단하되 명시적으로 허용된 API만 접근 가능하게 해요. 셋째, Prometheus Federation으로 cross-cluster 장애를 추적할 수 있어야 합니다.",
  },
];
