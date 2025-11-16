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
      "EKS가 기술적으로는 더 좋았지만 ECS를 선택했어요. DevOps 2-3명이 전체 인프라를 담당했는데 Kubernetes 경험이 제한적이었고, Istio를 배우는 데만 6개월은 필요했거든요. Docker 교육부터 시작해야 하는 상황이라 팀원들이 Kubernetes까지 따라오려면 최소 6개월은 필요했어요. 레거시 마이그레이션이 더 급했죠.\n\n" +
      "Istio Ambient Mode도 Beta 단계여서 프로덕션 레퍼런스가 거의 없었어요. CNI로 Cilium을 검토했는데 정말 매력적이었지만, 당시 조직에는 리스크가 컸죠. 결정적으로 ECS는 AWS 관리형이라 운영 부담이 적었고 ALB와 APISIX만으로도 충분했어요.\n\n" +
      "하지만 최근 다시 Kubernetes를 깊이 들여다보면서 안정성이 정말 높아졌다는 걸 느꼈어요. 특히 재성님 강연에서 CPU 쓰로틀링과 eBPF 관련 내용이 정말 흥미로웠습니다. Cilium의 Connectivity Test는 제가 온프레미스 관리하면서 가장 어려웠던 네트워크 테스트 자동화 문제를 완벽하게 해결해주더라고요. DNS 문제, 외부 연동업체 연결 문제가 정말 많았거든요.\n\n" +
      "게다가 Cilium이 General Purpose한 점도 놀라웠습니다. CNI를 넘어서 네트워크 관측성, 보안 정책, 로드밸런싱까지 커버하더라고요. 정확히 어떤 eBPF 툴을 프로덕션에서 사용하고 계신지 궁금합니다. Cilium 외에도 Pixie, Falco 같은 도구들의 실전 조합이 궁금해요.\n\n" +
      "토스는 성숙한 DevOps 팀과 표준화된 Kubernetes가 있어서 EKS와 Istio, 그리고 Cilium 같은 최신 기술의 가치를 제대로 발휘할 수 있을 것 같습니다. 제 이후 커리어는 이 eBPF 기반 네트워킹과 관측성 분야로 결심했어요.",
  },
];
