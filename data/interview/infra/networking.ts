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
      "하이브리드 네트워킹이 제가 토스에 지원한 가장 큰 이유 중 하나예요. 지난 1년간 Direct Connect, IPsec VPN, Transit Gateway를 집중적으로 공부하며 CDC(Cloud Data Center) 하이브리드 네트워킹 설계에 깊은 관심을 가져왔습니다.\n\n" +
      "실무에서는 ₩500B 규모 이커머스 플랫폼의 온프레미스-AWS 하이브리드 환경을 직접 구축했어요. 이론으로만 배운 것과 실제 운영의 차이를 뼈저리게 느꼈죠.\n\n" +
      "**당시 문제 상황**\n\n" +
      "레거시 시스템은 온프레미스에, 신규 서비스는 AWS에 있었는데 실시간 데이터 동기화가 필수였어요. 기존 Public Internet 연결은 보안팀이 강력히 반대했고, '고객 개인정보가 Public으로 전송되면 안 된다'는 게 이유였죠.\n\n" +
      "**3가지 설계안 검토**\n\n" +
      "첫째, **AWS Direct Connect 10Gbps**: 가장 안정적이지만 월 500만원 이상, 구축 3개월 소요. 당시 우리에겐 시간이 없었어요.\n\n" +
      "둘째, **Public VPN over Internet**: 비용은 저렴하지만 품질 예측 불가. 트래픽 급증 시 지연 문제.\n\n" +
      "셋째, **Site-to-Site IPsec VPN 1.25Gbps**: Direct Connect 대비 1/10 비용, 2주 내 구축 가능. 온프레미스 네트워크팀의 BGP 경험 부족이 걸림돌.\n\n" +
      "**최종 선택: IPsec VPN + 정적 라우팅**\n\n" +
      "Site-to-Site VPN을 선택했어요. BGP 대신 정적 라우팅을 적용한 이유는 온프레미스 팀이 BGP 운영 경험이 없어서 장애 시 대응이 어려울 것 같았거든요. AWS re:Invent NET318 세션에서 배운 'Longest Prefix Match' 원칙으로 라우팅 테이블을 설계했습니다.\n\n" +
      "**실전에서 마주한 문제와 해결**\n\n" +
      "1. **SPOF 문제**: 처음엔 1개 VPN 터널만 구성했는데, 온프레미스 라우터 장애로 새벽 2시에 전체 서비스 중단. Primary/Secondary VPN 터널을 각각 다른 AZ에 연결하고, 온프레미스도 2대 라우터로 이중화했어요.\n\n" +
      "2. **처리량 문제**: 스펙상 1.25Gbps인데 실제로는 800Mbps만 나왔죠. 원인은 VPN 암호화 오버헤드와 패킷 단편화. MTU를 1500 → 1400으로 낮추고 TCP Window Scaling 조정하니 900Mbps 이상으로 개선됐습니다.\n\n" +
      "3. **라우팅 우선순위 제어**: AWS re:Invent에서 배운 대로, Static Routes가 Propagated Routes보다 우선순위가 높다는 점을 활용했어요. 특정 트래픽은 VPN으로, 나머지는 NAT Gateway로 라우팅하도록 설계했죠.\n\n" +
      "**Zonal 트래픽 설계 (AWS re:Invent NET318 핵심)**\n\n" +
      "'Keep your traffic zonal'이라는 원칙을 적용했어요. AZ 간 통신은 비용($)이 발생하고 latency가 증가하니까, 각 AZ에 독립적인 NAT Gateway와 Internet Gateway를 배치했습니다. AZ-1a 장애 시에도 트래픽이 자동으로 AZ-1b로 전환되어 서비스가 유지됐어요.\n\n" +
      "**Transit Gateway 도입 검토 (미래 계획)**\n\n" +
      "현재는 VPN 2개로 운영 중이지만, 계열사가 늘어나면 Transit Gateway가 필수라고 봐요. 각 VPC를 일일이 피어링하는 것보다 중앙 허브로 관리하는 게 훨씬 효율적이거든요. 특히 토스처럼 계열사별 격리가 중요한 환경에서는 Transit Gateway의 Route Table 분리 기능이 핵심일 것 같습니다.\n\n" +
      "**BGP와 트래픽 엔지니어링 (학습 중)**\n\n" +
      "1년간 집중 공부한 내용 중 가장 흥미로웠던 건 BGP 속성이에요. Local Preference (AWS → 온프레미스), AS Path Prepending (온프레미스 → AWS)으로 트래픽 경로를 제어하는 방법을 배웠습니다. 아직 실무에서 BGP를 직접 운영해보진 못했지만, Direct Connect 환경에서 꼭 적용해보고 싶어요.\n\n" +
      "**보안 설계**\n\n" +
      "Security Group과 NACL을 계층화했어요. NACL로 알려진 공격 IP 대역 차단, Security Group으로 애플리케이션별 세밀한 제어. VPC Flow Logs + Athena로 Top Talkers를 분석하니 특정 IP에서 초당 10만 건 요청이 보였고, GuardDuty 연동 Lambda로 자동 차단했죠.\n\n" +
      "**운영 성과**\n\n" +
      "네트워크 가용성 99.9% → 99.95% 개선, VPN 평균 지연시간 P95 기준 15ms 유지, 보안 인시던트 zero.\n\n" +
      "**왜 토스인가?**\n\n" +
      "토스는 계열사가 많고, 온프레미스-클라우드 하이브리드 환경이 필수일 것 같아요. 제가 1년간 공부한 Direct Connect, Transit Gateway, Cloud WAN 같은 기술들을 실전에서 대규모로 운영해보고 싶습니다. 특히 BGP 기반 트래픽 엔지니어링과 멀티 리전 라우팅 설계는 토스에서만 경험할 수 있는 도전 과제라고 생각해요.\n\n" +
      "이론적 준비는 끝났습니다. 이제 실전에서 직접 문제를 해결하며 성장하고 싶어요.",
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
