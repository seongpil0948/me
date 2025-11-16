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
      "네트워크 아키텍처에서 가장 어려웠던 것은 온프레미스와 AWS 간 안정적인 연결을 보장하면서도 비용을 최적화하는 것이었어요.\n\n" +
      "문제 상황: ₩500B 규모 이커머스 플랫폼을 AWS로 마이그레이션하면서 온프레미스 레거시 시스템과 실시간 데이터 동기화가 필수였어요. 기존에는 Public Internet으로 연결했는데, 보안팀에서 '고객 개인정보가 Public으로 전송되면 안 된다'고 강력히 반대했죠.\n\n" +
      "고민했던 3가지 선택지:\n\n" +
      "첫째, AWS Direct Connect: 가장 안정적이지만 월 500만원 이상 비용에 구축 기간 3개월. 당시 우리에겐 시간이 없었어요.\n\n" +
      "둘째, Public VPN: 비용은 저렴하지만 Internet 품질에 의존. 트래픽 급증 시 지연 예측 불가.\n\n" +
      "셋째, Site-to-Site VPN 1.25Gbps: Direct Connect 대비 1/10 비용, 2주 내 구축 가능. 다만 온프레미스 네트워크팀의 BGP 경험 부족이 걸림돌.\n\n" +
      "최종 선택과 이유:\n\n" +
      "Site-to-Site VPN을 선택했어요. BGP 라우팅 대신 정적 라우팅을 적용했는데, 이유는 온프레미스 네트워크팀이 BGP 운영 경험이 없어서 장애 시 대응이 어려울 것 같았거든요. 정적 라우팅은 설정이 단순하고 라우팅 테이블이 명확해서 트러블슈팅도 쉬웠죠.\n\n" +
      "실제 구현 과정에서 마주친 문제들:\n\n" +
      "처음엔 1개 VPN 터널만 구성했는데, 온프레미스 라우터 장애로 새벽 2시에 전체 서비스가 중단됐어요. 그때 '아, 이건 SPOF였구나'를 깨달았죠. 즉시 이중화를 추가했어요. Primary와 Secondary VPN 터널을 각각 다른 AWS Availability Zone에 연결하고, 온프레미스 측도 2대의 라우터로 이중화했습니다.\n\n" +
      "처리량 테스트에서도 문제가 있었어요. 스펙상 1.25Gbps지만 실제로는 평균 800Mbps만 나왔죠. 원인은 VPN 암호화 오버헤드와 패킷 단편화였어요. MTU를 1500에서 1400으로 낮추고, TCP Window Scaling을 조정하니 안정적으로 900Mbps 이상 나왔습니다.\n\n" +
      "Multi-AZ 네트워크 설계로 가용성을 높였어요:\n\n" +
      "AZ-1a에 Primary ECS 클러스터, AZ-1b에 Secondary, AZ-1c에 Standby를 배치했어요. 각 AZ마다 독립적인 NAT Gateway와 Internet Gateway를 두어서 단일 AZ 장애가 다른 AZ에 영향을 주지 않도록 했습니다. 실제로 AZ-1a에서 AWS 측 네트워크 장애가 발생했을 때도 트래픽이 자동으로 AZ-1b로 전환되어 서비스가 유지됐어요.\n\n" +
      "보안 설계에서 배운 점:\n\n" +
      "Security Group과 NACL을 계층화했어요. 처음엔 Security Group만 썼는데, 서브넷 레벨에서 한번 더 필터링하는 게 심층 방어에 유리하더라고요. NACL로 알려진 공격 IP 대역을 차단하고, Security Group으로 애플리케이션별 세밀한 제어를 했습니다. Deny-by-default 원칙으로 필요한 포트만 선택적으로 열었어요.\n\n" +
      "VPC Flow Logs로 이상 트래픽을 모니터링했어요. Athena 쿼리로 Top Talkers를 분석하니까, 특정 IP에서 초당 10만 건 이상 요청이 들어오는 게 보였어요. GuardDuty와 연동해서 자동으로 차단하는 Lambda를 만들었죠.\n\n" +
      "결과적으로:\n\n" +
      "네트워크 가용성 99.9%에서 99.95%로 개선했고, VPN 평균 지연시간 P95 기준 15ms를 유지했어요. 가장 큰 성과는 보안 인시던트 제로를 달성한 거였죠.\n\n" +
      "핵심 교훈은, 최신 기술(BGP, Direct Connect)이 항상 정답은 아니라는 겁니다. 팀 상황과 비용, 시간을 고려한 현실적인 선택이 더 중요하더라고요.",
  },
  {
    id: 67,
    category1: "Infrastructure",
    category2: "CI/CD",
    question: "강력한 CI/CD 파이프라인 구축에 대한 접근 방식은 무엇인가요?",
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
