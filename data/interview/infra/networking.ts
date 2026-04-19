import type { LocalizedInterviewQuestion } from "@/types/portfolio";

/**
 * Networking & CI/CD 질문들
 * ID: 15, 67, 140, 141, 161
 */
export const infraNetworkingQuestions: LocalizedInterviewQuestion[] = [
  {
    id: 15,
    category1: "Infrastructure",
    category2: "Networking",
    question: {
      ko: "Describe your experience with network architecture and VPN setup.",
    },
    answer: {
      ko:
        "하이브리드 네트워킹은 제가 가장 집중해온 인프라 영역 중 하나예요. 지난 1년간 Direct Connect, IPsec VPN, Transit Gateway를 집중적으로 학습하며 실무 적용을 준비해왔습니다.\n\n" +
        "현재 회사의 온프레미스-AWS 환경을 관찰하면서 하이브리드 네트워킹의 실제 운영 특성을 이해하게 되었고, 네트워크팀과 협업하며 실무 경험을 쌓았습니다.\n\n" +
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
        "현재는 VPN 2개로 운영 중이지만, 서비스와 계정이 늘어나면 Transit Gateway가 필수라고 봐요. 각 VPC를 일일이 피어링하는 것보다 중앙 허브로 관리하는 게 훨씬 효율적이거든요. 조직별 격리가 중요한 환경에서는 Transit Gateway의 Route Table 분리 기능이 핵심이라고 생각합니다.\n\n" +
        "**BGP와 트래픽 엔지니어링 (학습 중)**\n\n" +
        "1년간 집중 공부한 내용 중 가장 흥미로웠던 건 BGP 속성이에요. Local Preference (AWS → 온프레미스), AS Path Prepending (온프레미스 → AWS)으로 트래픽 경로를 제어하는 방법을 배웠습니다. 아직 실무에서 BGP를 직접 운영해보진 못했지만, Direct Connect 환경에서 꼭 적용해보고 싶어요.\n\n" +
        "**보안 설계**\n\n" +
        "Security Group과 NACL을 계층화했어요. NACL로 알려진 공격 IP 대역 차단, Security Group으로 애플리케이션별 세밀한 제어. VPC Flow Logs + Athena로 Top Talkers를 분석하니 특정 IP에서 초당 10만 건 요청이 보였고, GuardDuty 연동 Lambda로 자동 차단했죠.\n\n" +
        "**운영 성과**\n\n" +
        "네트워크 가용성 99.9% → 99.95% 개선, VPN 평균 지연시간 P95 기준 15ms 유지, 보안 인시던트 zero.\n\n" +
        "**왜 이 포지션인가?**\n\n" +
        "글로벌 고객사를 지원하는 DevOps/SRE 포지션에서는 온프레미스-클라우드 하이브리드 환경이 필수라고 생각해요. 제가 1년간 공부한 Direct Connect, Transit Gateway, Cloud WAN 같은 기술들을 실전에서 대규모로 운영해보고 싶습니다. 특히 BGP 기반 트래픽 엔지니어링과 멀티 리전 라우팅 설계는 이 역할에서 핵심 도전 과제라고 봅니다.\n\n" +
        "이론적 준비는 끝났습니다. 이제 실전에서 직접 문제를 해결하며 성장하고 싶어요.",
      en: "A concise Networking answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 67,
    category1: "Infrastructure",
    category2: "CI/CD",
    question: {
      ko: "강력한 CI/CD 파이프라인 구축에 대한 접근 방식은 무엇인가요?",
    },
    answer: {
      ko:
        "견고한 CI/CD 파이프라인에서 가장 중요한 것은 **fast feedback, 안전한 배포, 그리고 롤백 용이성**입니다. 현재 GitLab CI + Argo CD + Jenkins 조합으로 여러 환경을 운영합니다.\n\n" +
        "**실제 운영 중인 파이프라인 (GitLab CI + Argo CD)**\n\n" +
        "흐름: `GitLab Merge → GitLab CI 테스트/빌드 → ECR Push → Argo CD Image Updater 감지 → Helm Chart 태그 자동 커밋 → Argo CD Sync`\n\n" +
        "- **dev 브랜치**: MR 머지 시 자동 테스트/빌드/배포. Image Updater가 ECR 태그를 감지해 Chart 레포를 자동 커밋하고 Argo CD가 동기화.\n" +
        "- **prd 브랜치**: 자동 빌드 + ECR Push까지만 자동화. Argo CD Sync는 관리자가 수동 승인 후 실행.\n\n" +
        "이 구조 덕분에 수동 이미지 태그 수정 과정이 사라지고, 롤백도 Argo CD에서 이전 버전 Sync 한 번으로 가능합니다.\n\n" +
        "**Terraform 인프라 파이프라인 (Jenkins)**\n\n" +
        "인프라 변경은 별도 Jenkins 파이프라인으로 관리합니다:\n" +
        "`Checkout → Terraform Init → Validate → Plan → Plan Review → [Destroy Guard] → Approval → Apply`\n\n" +
        "- Destroy Guard: Plan 결과를 파싱해서 리소스 삭제가 감지되면 Slack 긴급 알림 + 별도 승인 요구\n" +
        "- Apply 전 항상 관리자 승인 필수 (자동 Apply 없음)\n\n" +
        "**Multi-stage 품질 게이트**\n\n" +
        "Static Analysis → Unit Test → Integration Test → Security Scan → Build → Deploy 단계로 구성해서 각 단계 실패 시 즉시 중단합니다. 전체 파이프라인 실행 시간은 15분 이내로 유지해요.\n\n" +
        "**Blue-Green 및 Canary 배포**\n\n" +
        "Argo CD Rollout을 활용해 새 버전을 parallel environment에 배포하고 health check 통과 후 traffic을 점진적으로 전환합니다. " +
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
      en: "A concise CI/CD answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 140,
    category1: "Infrastructure",
    category2: "Networking",
    question: {
      ko: "Cilium eBPF CNI를 실무에서 운영한 경험을 설명해주세요. kube-proxy를 대체한 이유와 Hubble 관측성을 어떻게 활용했나요?",
    },
    answer: {
      ko:
        "EKS 1.34와 온프레미스 Kubernetes 양쪽에서 Cilium을 CNI로 운영하고 있습니다. Calico, Flannel 같은 전통적인 CNI 대신 Cilium을 선택한 데는 명확한 이유가 있었어요.\n\n" +
        "**kube-proxy를 대체한 이유**\n\n" +
        "kube-proxy는 iptables 규칙 기반으로 서비스 라우팅을 처리합니다. 서비스 수가 늘어날수록 iptables 규칙도 선형으로 증가해서 성능 저하와 디버깅 어려움이 생기죠. Cilium은 eBPF로 커널 레벨에서 직접 패킷을 처리해서:\n\n" +
        "- **더 낮은 latency**: 패킷이 iptables 체인을 거치지 않고 직접 처리\n" +
        "- **더 높은 처리량**: eBPF XDP를 활용한 빠른 패킷 포워딩\n" +
        "- **더 직관적인 디버깅**: iptables 규칙 대신 Cilium CLI와 Hubble로 flow 단위 관찰\n\n" +
        "설정: `kube_proxy_remove: true`, `cilium_kube_proxy_replacement: true`로 Kubespray에서 완전 대체합니다.\n\n" +
        "**Gateway API 활용**\n\n" +
        "Nginx Ingress 대신 Cilium Gateway API 컨트롤러를 사용합니다:\n\n" +
        "- **EKS**: Cilium Gateway → AWS NLB (ACM TLS 종단). annotations 위치가 `spec.infrastructure.annotations`에 있어야 해요. `nlb-target-type: instance` 필수.\n" +
        "- **온프레미스**: Cilium Gateway → 호스트 네트워크 모드. `shop.co.kr`, `*.shop.co.kr`, `dwoong.com` 도메인 처리. cert-manager + Let's Encrypt DNS-01 (Route53)으로 TLS 자동화.\n\n" +
        "**Hubble로 네트워크 가시성 확보**\n\n" +
        "Hubble은 Cilium의 네트워크 관측성 레이어입니다. 실제 운영에서 이런 상황에 도움이 됐어요:\n\n" +
        "1. **Pod 간 연결 문제 디버깅**: `hubble observe --namespace <ns> --follow`로 특정 네임스페이스의 flow를 실시간으로 관찰. 방화벽 정책으로 드롭된 패킷 즉시 파악.\n" +
        "2. **서비스 메시 대체**: Hubble UI에서 서비스 간 연결 그래프와 에러율을 시각화. Istio 없이도 서비스 간 통신 패턴을 관찰할 수 있어요.\n" +
        "3. **보안 정책 검증**: NetworkPolicy 적용 전 Hubble로 실제 트래픽 패턴을 먼저 확인하고, 필요한 정책만 추가하는 방식.\n\n" +
        "Hubble UI는 `https://hubble.dwoong.com`으로 접근하거나, 로컬에서 `./scripts/portforward-hubble.sh`로 포트포워딩해서 사용합니다.\n\n" +
        "**CiliumNetworkPolicy L7 정책**\n\n" +
        "일반 Kubernetes NetworkPolicy보다 세밀한 제어가 가능합니다:\n" +
        "- HTTP 메서드별 허용 (GET만 허용, POST는 특정 Path에만)\n" +
        "- DNS 기반 정책 (외부 API 호출 도메인 화이트리스트)\n" +
        "- 서비스 어카운트 기반 정책 (RBAC과 연계)\n\n" +
        "**운영 중 겪은 주요 이슈**\n\n" +
        "온프레미스에서 containerd를 CRI-O에서 containerd 2.2.1로 마이그레이션(2026-03-31)했을 때, Worker 노드에서 간헐적으로 stale `overlayfs@sha256:...` 이미지가 나타났어요. `scripts/fix-containerd-overlayfs.sh`를 만들어서 주기적으로 실행하도록 했습니다. Cilium과 containerd 버전 호환성을 항상 확인하는 것이 중요해요.",
      en: "A concise Networking answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 141,
    category1: "Infrastructure",
    category2: "Networking",
    question: {
      ko: "온프레미스와 AWS를 연결하는 하이브리드 네트워크 설계 경험을 설명해주세요.",
    },
    answer: {
      ko:
        "IDC 이전 프로젝트에서 온프레미스 Kubernetes와 AWS VPC를 연결하는 하이브리드 아키텍처를 설계했습니다. 보안팀의 '고객 데이터는 Public 경유 불가' 요구사항이 핵심 제약이었어요.\n\n" +
        "**설계안 비교**\n\n" +
        "- **Direct Connect 10Gbps**: 가장 안정적이지만 월 500만원+, 구축 3개월 소요 → 일정 불가\n" +
        "- **Site-to-Site VPN 1.25Gbps**: Direct Connect 대비 1/10 비용, 2주 내 구축 가능 → 선택\n\n" +
        "**Site-to-Site VPN + 정적 라우팅 설계**\n\n" +
        "BGP 대신 정적 라우팅을 선택한 이유: 온프레미스 네트워크팀의 BGP 운영 경험 부족 → 장애 대응 어려움 우려. 대신 Longest Prefix Match 원칙으로 라우팅 테이블을 설계했어요.\n\n" +
        "**실운영에서 겪은 문제들**\n\n" +
        "1. **SPOF**: 초기 1개 터널 → AZ-1a 라우터 장애로 새벽 2시 서비스 중단. Primary/Secondary VPN 터널을 각각 다른 AZ에 연결하고, 온프레미스도 2대 라우터 이중화로 해결.\n" +
        "2. **처리량**: 스펙 1.25Gbps인데 실제 800Mbps. VPN 암호화 오버헤드 + 패킷 단편화 문제. MTU 1500→1400으로 낮추고 TCP Window Scaling 조정 후 900Mbps+ 달성.\n" +
        "3. **Zonal 트래픽 비용**: AZ 간 통신은 $0.01/GB 발생. 각 AZ에 독립적인 NAT Gateway를 배치하고 'Keep traffic zonal' 원칙 적용.\n\n" +
        "**Direct Connect 전환 시 BGP 운영 모델**\n\n" +
        "트래픽 증가 단계에서는 Direct Connect를 Primary, IPsec VPN을 Backup으로 두는 Active/Standby 구성을 기본으로 보고 있습니다. 라우팅은 BGP 기반으로 관리하되, 온프레미스 라우터 장애나 DX 회선 이슈 시 VPN 경로로 자동 우회되도록 설계합니다.\n\n" +
        "**CloudWatch 기반 BGP 헬스 모니터링**\n\n" +
        "AWS가 제공하는 Direct Connect VIF BGP Health와 Prefix Count 메트릭을 기준으로 운영합니다. 핵심은 세 가지입니다.\n" +
        "1. BGP session down 감지: BGP 헬스 지표가 비정상 상태로 전환되면 즉시 경보\n" +
        "2. Prefix 급감/급증 감지: advertised/received prefix count 변동으로 라우팅 누락, route leak 조기 탐지\n" +
        "3. 장애 전파 최소화: 알람과 라우팅 정책을 연결해 Direct Connect 장애 시 VPN 경로로 자동 전환\n\n" +
        "이 방식은 AWS 네트워킹 블로그에서 소개된 Direct Connect VIF BGP Health/Prefix Count 운영 패턴을 기준으로 런북화해 적용하려는 설계입니다.\n\n" +
        "**현재 온프레미스 ↔ EKS 통신 패턴**\n\n" +
        "- 온프레미스 K8s → AWS RDS: VPN 터널 통해 Private IP 직접 통신\n" +
        "- EKS → 온프레미스 Oracle DB (Kafka CDC): VPN 경유 Private subnet\n" +
        "- DNS: External DNS가 Route53에 자동 등록, 온프레미스는 CoreDNS에서 `.cluster.local` 도메인 처리",
      en: "A concise Networking answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 161,
    category1: "Infrastructure",
    category2: "Networking",
    question: {
      ko: "Direct Connect, BGP, IPsec VPN을 함께 운영할 때 장애 대응과 모니터링 전략을 어떻게 설계하시나요?",
    },
    answer: {
      ko:
        "핵심 원칙은 '전용선은 성능 경로, VPN은 복구 경로'입니다. Direct Connect를 Primary로 두고 IPsec VPN을 Backup으로 구성해, 회선 장애나 BGP 세션 다운 시 서비스가 끊기지 않도록 설계합니다.\n\n" +
        "첫째, 라우팅 제어는 BGP 정책으로 단순하게 유지합니다. 평시에는 Direct Connect 경로를 우선 사용하고, 장애 시 VPN 경로가 자동 활성화되도록 AS Path와 Local Preference를 환경에 맞게 설계합니다.\n\n" +
        "둘째, 모니터링은 CloudWatch의 Direct Connect VIF BGP Health와 Prefix Count 지표를 중심으로 구성합니다.\n" +
        "- BGP Health 비정상 전환: 세션 다운 즉시 알람\n" +
        "- Received/Advertised Prefix Count 급변: 라우트 누락, 오배포, route leak 조기 탐지\n" +
        "- 터널 상태 + 트래픽 지표 동시 관찰: 장애 유형을 회선/라우팅/암호화 계층으로 빠르게 분리\n\n" +
        "셋째, 운영 런북은 자동 전환 검증까지 포함해야 합니다. 분기별로 Direct Connect 장애 가정 훈련을 실행해 VPN 페일오버 시간, 핵심 서비스 지연, 복구 후 라우팅 정상화 시간을 측정합니다.\n\n" +
        "실무적으로는 처음부터 완전 자동화보다 '알람 정확도 확보 → 자동 우회 → 사후 원인 분석' 순서로 성숙도를 올리는 게 안정적입니다. 이 접근이 하이브리드 네트워크에서 가장 현실적인 운영 모델이라고 봅니다.",
      en: "A concise Networking answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
];
