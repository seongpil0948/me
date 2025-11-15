import type { InterviewQuestion } from "@/types/portfolio";

/**
 * Networking & CI/CD 질문들
 * ID: 15, 64
 */
export const infraNetworkingQuestions: InterviewQuestion[] = [
  {
    id: 15,
    category1: "Infrastructure",
    category2: "Networking",
    question:
      "Describe your experience with network architecture and VPN setup.",
    answer:
      "네트워크 아키텍처에서 가장 중요한 것은 보안과 성능의 균형, 그리고 장애 도메인 분리입니다.\n\n" +
      "Site-to-Site VPN을 1.25Gbps로 구성하여 온프레미스와 AWS를 연결했습니다. " +
      "BGP 라우팅 대신 정적 라우팅을 선택한 이유는 온프레미스 네트워크팀의 BGP 운영 경험 부족과 " +
      "라우팅 테이블의 예측 가능성이 필요했기 때문입니다. " +
      "결과적으로 평균 800Mbps 처리량과 P95 기준 15ms 지연시간을 달성했습니다.\n\n" +
      "Multi-AZ 네트워크 설계로 고가용성을 보장했습니다. " +
      "AZ-1a에 Primary 서비스, AZ-1b에 Secondary, AZ-1c에 Standby를 배치하고, " +
      "각 AZ별로 독립적인 NAT Gateway와 Internet Gateway를 구성했습니다. " +
      "단일 AZ 장애 시에도 서비스 연속성을 유지했습니다.\n\n" +
      "VPC Peering과 Transit Gateway의 trade-off를 분석했습니다. " +
      "5개 미만의 VPC는 Peering으로 직접 연결하고, " +
      "그 이상은 Transit Gateway로 hub-and-spoke 모델을 구현했습니다. " +
      "네트워크 복잡도를 줄이면서도 통신 지연을 최소화했습니다.\n\n" +
      "Security Group과 NACL의 계층화된 보안을 구현했습니다. " +
      "NACL로 서브넷 레벨에서 거친 필터링을 하고, " +
      "Security Group으로 인스턴스 레벨에서 세밀한 제어를 적용했습니다. " +
      "Deny-by-default 원칙으로 필요한 포트만 선택적으로 개방했습니다.\n\n" +
      "Network Segmentation으로 보안을 강화했습니다. " +
      "Public Subnet에는 Load Balancer와 NAT Gateway만, " +
      "Private Subnet에는 애플리케이션 서버, " +
      "Database Subnet에는 DB만 배치하여 공격 표면을 최소화했습니다.\n\n" +
      "VPC Flow Logs로 네트워크 트래픽을 모니터링했습니다. " +
      "Athena 쿼리로 Top Talkers와 이상 트래픽 패턴을 분석하고, " +
      "DDoS 공격이나 데이터 유출 시도를 조기 탐지했습니다. " +
      "GuardDuty와 연동하여 위협 인텔리전스를 강화했습니다.\n\n" +
      "CDN과 글로벌 네트워크 최적화를 구현했습니다. " +
      "CloudFront로 정적 콘텐츠를 엣지에 캐싱하고, " +
      "Global Accelerator로 동적 콘텐츠의 네트워크 경로를 최적화했습니다. " +
      "전 세계 사용자의 응답시간을 평균 40% 단축했습니다.\n\n" +
      "Network Performance 튜닝으로 처리량을 최적화했습니다. " +
      "Enhanced Networking과 SR-IOV를 활성화하고, " +
      "Placement Group으로 인스턴스 간 네트워크 지연을 최소화했습니다. " +
      "10Gbps 네트워크를 활용하여 data-intensive 애플리케이션 성능을 향상시켰습니다.\n\n" +
      "결과적으로 네트워크 가용성 99.99%를 달성하고, " +
      "평균 응답시간을 200ms에서 50ms로 단축했으며, " +
      "보안 인시던트 zero를 유지했습니다.",
  },
  {
    id: 64,
    category1: "Infrastructure",
    category2: "CI/CD",
    question: "What's your approach to building robust CI/CD pipelines?",
    answer:
      "견고한 CI/CD 파이프라인 구축에서 가장 중요한 것은 fast feedback과 안전한 배포 전략입니다.\n\n" +
      "GitOps 워크플로우를 GitHub Actions와 ArgoCD로 구현했습니다. " +
      "코드 변경 시 자동으로 테스트를 실행하고, 성공 시 컨테이너 이미지를 빌드하여 " +
      "GitOps repository에 새 버전을 커밋합니다. " +
      "ArgoCD가 변경사항을 감지하여 Kubernetes 클러스터에 자동 배포했습니다.\n\n" +
      "Multi-stage 파이프라인으로 품질 게이트를 구현했습니다. " +
      "Static Analysis → Unit Test → Integration Test → Security Scan → Build → Deploy 단계로 구성하여 " +
      "각 단계 실패 시 즉시 중단하고 빠른 피드백을 제공했습니다. " +
      "전체 파이프라인 실행 시간을 15분 이내로 유지했습니다.\n\n" +
      "Blue-Green Deployment로 zero-downtime 배포를 구현했습니다. " +
      "새 버전을 parallel environment에 배포하고 health check 통과 후 " +
      "traffic을 점진적으로 전환했습니다. " +
      "문제 발생 시 1분 내 즉시 rollback이 가능했습니다.\n\n" +
      "Canary Release 전략으로 리스크를 최소화했습니다. " +
      "새 버전을 전체 트래픽의 5% → 25% → 50% → 100% 순으로 점진 배포하고, " +
      "각 단계에서 error rate, latency, business metrics를 모니터링했습니다. " +
      "자동화된 rollback trigger로 안전망을 구축했습니다.\n\n" +
      "Feature Flag를 통한 배포와 릴리스의 분리를 구현했습니다. " +
      "코드는 배포하되 기능은 flag로 제어하여 " +
      "runtime에 안전하게 기능을 켜고 끌 수 있도록 했습니다. " +
      "A/B 테스팅과 gradual rollout도 지원했습니다.\n\n" +
      "환경별 설정 관리를 GitOps로 표준화했습니다. " +
      "Kustomize로 환경별 차이를 관리하고, " +
      "Sealed Secrets로 민감 정보를 안전하게 Git에 저장했습니다. " +
      "환경 간 설정 drift를 방지하고 일관성을 보장했습니다.\n\n" +
      "보안을 파이프라인에 내재화했습니다. " +
      "SAST(Static Application Security Testing)로 코드 취약점을 스캔하고, " +
      "Container Image Scanning으로 알려진 CVE를 검출했습니다. " +
      "OWASP 상위 10개 취약점에 대한 자동 검증을 포함했습니다.\n\n" +
      "Pipeline as Code로 재사용성과 유지보수성을 향상시켰습니다. " +
      "공통 파이프라인 템플릿을 작성하고 parameterization으로 " +
      "팀별 요구사항에 맞게 customization할 수 있도록 했습니다. " +
      "Pipeline 변경도 code review와 approval process를 거치도록 했습니다.\n\n" +
      "결과적으로 배포 빈도를 주 1회에서 일 5회로 증가시키고, " +
      "배포 실패율을 15%에서 2%로 감소시켰으며, " +
      "평균 복구 시간을 4시간에서 10분으로 단축했습니다.",
  },
];
