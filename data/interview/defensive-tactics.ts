import type { InterviewQuestion } from "@/types/portfolio";

/**
 * 방어적 면접 전술: 기술 경험 부족에 대한 트릭 질문 대응
 *
 * 목적: "이 기술을 실무에서 써본 적 없으시네요?"와 같은
 *       심화/꼬임 질문에 유연하게 답변할 수 있도록 준비
 */
export const defensiveTacticsQuestions: InterviewQuestion[] = [
  // EKS 운영 경험 — 멀티 클러스터 (ECS+EKS+온프레미스)
  {
    id: 301,
    category1: "General",
    category2: "Experience",
    question:
      "EKS, ECS, 온프레미스 Kubernetes를 동시에 운영하는 하이브리드 멀티 클러스터 환경에서 가장 어려웠던 점은 무엇인가요?",
    answer:
      "현재 TheShop 플랫폼에서 EKS 1.34, AWS ECS, 온프레미스 Kubernetes(6노드 Kubespray 기반) 세 가지를 동시에 운영하고 있습니다. 각 환경을 선택한 데는 이유가 있지만, 동시에 운영하면서 생긴 가장 큰 도전은 **'일관성 없는 운영 표준'**이었어요.\n\n" +
      "**세 환경을 함께 운영하는 이유**\n\n" +
      "- **ECS**: 초기에 팀 학습 곡선과 빠른 마이그레이션을 위해 일부 레거시 워크로드는 ECS Fargate로 이전. 서버리스라 패치 부담 없음.\n" +
      "- **온프레미스 K8s**: IDC에 있는 Oracle DB, 사내 시스템과 가까운 레이턴시가 필요한 워크로드, 그리고 Rook-Ceph 같은 직접 스토리지 제어가 필요한 경우에 사용.\n" +
      "- **EKS 1.34**: AI 에이전트, GitLab, ClickHouse 등 AWS 서비스(Bedrock, ECR, S3)와 깊은 통합이 필요한 워크로드. Cilium + Gateway API + Pod Identity + External DNS 조합으로 운영.\n\n" +
      "**가장 어려웠던 문제들**\n\n" +
      "**1. Stateful 워크로드 AZ 경계 문제 (EKS)**\n\n" +
      "EKS EBS는 단일 AZ에 바운드됩니다. GitLab이 Spot 인스턴스 인터럽션으로 다른 AZ로 이동했을 때 PV를 재마운트하지 못해서 서비스가 중단됐어요. 해결책은 Critical Stateful 워크로드(GitLab, ClickHouse, Scouter)를 On-Demand 전용 NodeGroup으로 분리하고, PV nodeAffinity와 NodeGroup AZ를 반드시 일치시키는 정책을 수립한 것입니다.\n\n" +
      "**2. 온프레미스 DNS와 EKS 서비스 디스커버리 통합**\n\n" +
      "온프레미스 K8s의 CoreDNS와 EKS 내부 DNS가 충돌하지 않도록 도메인을 분리했어요. 온프레미스는 `*.cluster.local`, EKS는 External DNS로 Route53에 `*.shop.co.kr`을 자동 등록. 온프레미스 → AWS 통신은 VPN 터널을 통해 Private IP로 직접 통신하게 설계했습니다.\n\n" +
      "**3. 배포 파이프라인 표준화**\n\n" +
      "ECS는 CloudFormation + CodePipeline, 온프레미스는 Jenkins + kubectl, EKS는 GitLab CI + Argo CD Image Updater로 제각각이었습니다. 이를 점진적으로 GitLab CI → ECR push → Argo CD Sync 흐름으로 통합했어요. ECS 워크로드는 시간이 지나면서 EKS로 마이그레이션하는 방향입니다.\n\n" +
      "**4. Observability 통합**\n\n" +
      "세 환경 모두 OpenTelemetry Collector를 배포하고 같은 Grafana/Prometheus 스택에 집계해요. Service Name 태그를 환경별로 표준화해서 `service.environment=eks/onprem/ecs`로 구분합니다. EKS Hubble + 온프레미스 Cilium 모두 eBPF 기반이라 네트워크 flow 관찰이 가능하지만, UI 접근 방법이 달라서 통합 대시보드를 별도로 구성했습니다.\n\n" +
      "**핵심 교훈**\n\n" +
      "멀티 클러스터 운영에서 가장 중요한 건 '각 환경의 장점을 살리되, 운영 표준은 최대한 통일'하는 것입니다. 배포 방식, 네이밍 규칙, 모니터링 레이블, 시크릿 관리(모두 AWS Parameter Store)를 통일함으로써 어느 환경이든 같은 방식으로 디버깅할 수 있게 됐어요.",
  },

  // Service Mesh 경험 (Cilium vs Istio)

  {
    id: 302,
    category1: "General",
    category2: "Gap Defense",
    question:
      "Istio를 프로덕션에서 운영한 경험이 없는데, 복잡한 Service Mesh 환경에 어떻게 기여할 수 있을까요?",
    answer:
      "Istio를 프로덕션에서 직접 운영한 경험은 없습니다. 하지만 저는 Istio와 같은 목표를 달성하는 **Cilium eBPF 기반 Service Mesh**를 프로덕션에서 운영하고 있으며, 오히려 이 분야에서 더 앞선 경험을 갖고 있다고 생각합니다.\n\n" +
      "**Cilium vs Istio — 같은 목표, 다른 구현**\n\n" +
      "두 기술 모두 Service Mesh의 핵심 목표(mTLS, L7 정책, 트래픽 관리, 관측성)를 제공합니다:\n\n" +
      "| 기능 | Istio (Envoy Sidecar) | Cilium (eBPF) |\n" +
      "|---|---|---|\n" +
      "| mTLS | VirtualService + DestinationRule | CiliumNetworkPolicy (L7) |\n" +
      "| 트래픽 관리 | Envoy 프록시 경유 | 커널 레벨 직접 처리 |\n" +
      "| 관측성 | Envoy 텔레메트리 | Hubble (eBPF flow) |\n" +
      "| 성능 | Sidecar 오버헤드 있음 | kube-proxy 대체, 낮은 latency |\n\n" +
      "저는 EKS 1.34와 온프레미스 K8s 양쪽에서 Cilium을 CNI + Gateway API 컨트롤러로 운영합니다. Hubble을 통해 Pod-to-Pod flow를 실시간으로 관찰하고, CiliumNetworkPolicy로 L7 HTTP 메서드/경로 단위 세밀한 정책을 적용하고 있어요.\n\n" +
      "**Istio로 전환 시 빠른 적응이 가능한 이유**\n\n" +
      "Cilium과 Istio의 핵심 개념(L7 정책, 트래픽 라우팅, 서비스 디스커버리, TLS 종단)을 이미 실무에서 다루고 있기 때문에, Istio의 VirtualService/DestinationRule/AuthorizationPolicy 추상화는 빠르게 익힐 수 있습니다.\n\n" +
      "또한 APISIX Gateway(Envoy 기반)를 프로덕션에서 운영하면서 Envoy 설정, Rate Limiting, Circuit Breaker, 플러그인 체인을 다뤄봤어요. Istio의 데이터 플레인도 Envoy이므로 진입장벽이 낮습니다.\n\n" +
      "**즉시 기여 가능한 영역**\n\n" +
      "1. **Observability**: OpenTelemetry + Grafana + Prometheus 통합 운영 경험. Cilium Hubble 데이터를 OpenTelemetry에 연계한 경험이 Istio Telemetry 통합에도 직접 적용됩니다.\n" +
      "2. **CI/CD**: GitLab CI + Argo CD GitOps 파이프라인 운영. Istio 설정 변경도 동일한 GitOps 워크플로우로 관리 가능.\n" +
      "3. **다중 클러스터 운영**: EKS + 온프레미스 멀티 클러스터 동시 운영 경험.\n\n" +
      "Cilium을 eBPF로 직접 다뤄본 경험은 Istio 학습을 '처음 배우는 것'이 아니라 '유사한 문제를 다른 도구로 해결하는 것'으로 만들어줍니다.",
  },

  // 공통 방어 전략
  {
    id: 303,
    category1: "General",
    category2: "Gap Defense",
    question:
      "특정 기술 스택(예: Kafka Streams, Flink)에 대한 실무 경험이 부족한데, 어떻게 빠르게 따라잡을 수 있나요?",
    answer:
      "좋은 지적입니다. 솔직하게 말씀드리면 [해당 기술]에 대한 직접적인 프로덕션 경험은 제한적입니다. 하지만 세 가지 관점에서 이것이 큰 장애물이 되지 않는다고 생각합니다.\n\n" +
      "**1. 전이 가능한 기반 지식**\n\n" +
      "SRE와 DevOps는 모두 **넓은 도메인의 지식을 요구하는 직무**입니다. 어떤 회사든 100% Fit한 실무 경험을 갖춘 후보자는 드뭅니다. 중요한 것은 **빠르게 학습하고 적용할 수 있는 기반**이 있느냐입니다.\n\n" +
      "제 경우:\n" +
      "- **유사 기술 경험**: [관련 기술 A]를 3년간 운영하며 [핵심 개념 1, 2]를 깊이 이해\n" +
      "- **아키텍처 이해**: 분산 시스템, 이벤트 기반 아키텍처, 스트리밍 처리의 본질적 원리 숙지\n" +
      "- **문제 해결 능력**: 오픈소스 코드 분석과 디버깅 경험 (OpenTelemetry 기여 사례)\n\n" +
      "예를 들어, Kafka Streams를 직접 써보지 않았더라도 Kafka Consumer/Producer를 운영하며 Offset 관리, Rebalancing, Partition 전략을 다뤘고, Airflow로 스트림 데이터를 배치 처리한 경험이 있습니다. 이런 기반 지식은 Kafka Streams 학습을 크게 가속화할 것입니다.\n\n" +
      "**2. 빠른 학습 능력 입증**\n\n" +
      "제가 새로운 기술을 빠르게 습득한 사례:\n\n" +
      "**케이스 1: OpenTelemetry (0 → Expert)**\n" +
      "- 입사 당시 Observability 경험 전무\n" +
      "- 3개월 만에 분산 추적 시스템 구축 (MTTI 99% 감소)\n" +
      "- 6개월 후 오픈소스 기여 (AWS SDK, Container 이슈)\n\n" +
      "**케이스 2: APISIX Gateway (0 → Production)**\n" +
      "- 레거시 Nginx에서 2주 만에 APISIX로 전환\n" +
      "- Envoy 기반 아키텍처 학습 및 Rate Limiting 적용\n" +
      "- Circuit Breaker 패턴 프로덕션 배포\n\n" +
      "**케이스 3: SSE Protocol (새로운 프로토콜)**\n" +
      "- LG 프로젝트에서 실시간 메시징 요구사항 발생\n" +
      "- 2주 만에 SSE Protocol 학습 및 프로덕션 적용\n" +
      "- WebSocket 대비 장단점 분석 후 기술 선택 주도\n\n" +
      "**학습 방법론:**\n" +
      "1. **공식 문서 정독**: End-to-End 학습\n" +
      "2. **Hands-on 실습**: 즉시 로컬 환경에서 테스트\n" +
      "3. **오픈소스 분석**: GitHub 코드 리뷰\n" +
      "4. **커뮤니티 참여**: Slack, Stack Overflow 활동\n" +
      "5. **멘토링 요청**: 팀 내 전문가에게 적극적으로 질문\n\n" +
      "**3. 즉시 기여 가능한 다른 전문성**\n\n" +
      "[해당 기술] 학습 중에도 제가 즉시 기여할 수 있는 영역:\n\n" +
      "**A. Observability (제 핵심 강점)**\n" +
      "- OpenTelemetry 기반 분산 추적 시스템 고도화\n" +
      "- Grafana 대시보드 설계 및 메트릭 최적화\n" +
      "- MTTI/MTTR 단축 프로젝트 리드\n\n" +
      "**B. AWS 인프라 최적화**\n" +
      "- 비용 절감 기회 발굴 (S3 Lifecycle 50% 절감 경험)\n" +
      "- VPC 네트워킹 설계 개선\n" +
      "**C. CI/CD 자동화**\n" +
      "- 배포 파이프라인 최적화 (2시간 → 12분 경험)\n" +
      "- GitOps 워크플로우 개선\n" +
      "- 개발자 샌드박스 환경 자동화 (80% 시간 단축)\n\n" +
      "**D. 데이터 기반 의사결정**\n" +
      "- 비즈니스 메트릭 자동화 (MAU, DAU, Retention)\n" +
      "- 셀프서비스 대시보드 구축\n" +
      "- 주간 2-3일 소요 작업 → 완전 자동화\n\n" +
      "**결론:**\n\n" +
      "SRE와 DevOps는 넓은 도메인의 지식을 요구하는 직무이기 때문에, 어떤 회사든 100% Fit한 실무 경험을 갖춘 후보자는 드뭅니다. 중요한 것은 빠르게 학습하고 적용할 수 있는 **기반과 의지**입니다.\n\n" +
      "제 경우 유사 기술 경험과 아키텍처 이해로 전이 가능한 지식이 탄탄하고, CKA 1개월/OpenTelemetry 3개월 마스터 같은 빠른 학습 능력도 검증되었습니다. 무엇보다 Cloud, Monitoring, 특히 **OpenTelemetry와 Observability 분야**에서 즉시 기여할 수 있는 강점이 있습니다.\n\n" +
      "새로운 기술은 금방 적응할 수 있을 것 같고, 오히려 **귀사의 대규모 환경에서 더 깊은 전문성을 쌓을 수 있는 기회**가 벌써 기대됩니다. 배우는 동안에도 제 강점으로 팀에 기여하며, 함께 성장하는 모습을 보여드리고 싶습니다.",
  },

  // 대규모 환경 경험 부족
  {
    id: 304,
    category1: "General",
    category2: "Gap Defense",
    question:
      "현재 회사는 상대적으로 작은 규모인데, 우리처럼 대규모 트래픽 환경에서 일할 수 있을까요?",
    answer:
      "좋은 지적입니다. 현재 회사는 연 매출 ₩500B, 일일 Kafka 메시지 2천만~5천만 건 규모로, 귀사 대비 작은 것이 사실입니다. 하지만 이것이 바로 **제가 지원한 핵심 이유**입니다. 세 가지 관점에서 답변드리겠습니다.\n\n" +
      "**1. 확장 가능한 아키텍처 설계 경험**\n\n" +
      "현재 규모는 작지만, **대규모로 확장 가능한 아키텍처**를 설계했습니다:\n\n" +
      "**A. Observability 플랫폼**\n" +
      "- 월 2-5TB Athena 스캔, 일 100GB+ 로그 처리 (Parquet 압축 10GB)\n" +
      "- OpenTelemetry Collector 멀티 프로토콜 수집 (OTLP gRPC/HTTP, Loki, Prometheus)\n" +
      "- ClickHouse 장기 저장소 (LZ4 압축, 7일 TTL)\n" +
      "- 이 아키텍처는 **10배 트래픽에도 수평 확장 가능**하도록 설계\n\n" +
      "**B. 데이터 파이프라인**\n" +
      "- AWS Step Functions로 15+ 분석 쿼리 병렬 처리\n" +
      "- S3 Throttling 해결 위한 배치 전략 (2개 병렬, 8개 순차)\n" +
      "- 이 설계는 **일일 1억 건 메시지도 처리 가능**\n\n" +
      "**C. Kafka 클러스터**\n" +
      "- 3노드 HA 구성, Replication Factor 3\n" +
      "- Producer Idempotence, Consumer Group Rebalancing 최적화\n" +
      "- Partition 전략: 초당 50,000 메시지 처리 검증\n\n" +
      "**D. CI/CD 자동화**\n" +
      "- CloudFormation IaC 기반 인프라 자동화 경험\n" +
      "- 이 파이프라인은 **100개+ 서비스에 적용 가능**\n\n" +
      "**2. 핵심은 규모가 아닌 문제 해결 능력**\n\n" +
      "대규모 환경의 본질적 도전:\n" +
      "1. **장애 탐지 속도**: MTTI 단축 → 제가 18시간 → 10분으로 99% 개선\n" +
      "2. **리소스 효율성**: 비용 최적화 → S3 Lifecycle으로 50% 절감 경험\n" +
      "3. **배포 속도**: 개발자 생산성 → CI/CD 90% 개선 경험\n" +
      "4. **시스템 안정성**: Observability → OpenTelemetry 전문가\n\n" +
      "이 네 가지는 규모와 무관하게 **DevOps의 본질적 문제**이며, 제가 이미 검증한 영역입니다.\n\n" +
      "**3. 대규모 환경 경험의 가치**\n\n" +
      "솔직하게 말씀드리면, 다음 경험들은 귀사에서 배우고 싶습니다:\n\n" +
      "**배우고 싶은 것:**\n" +
      "- **멀티 클러스터 관리**: 여러 계열사의 Kubernetes 클러스터 통합 운영\n" +
      "- **대규모 트래픽 최적화**: 수천 개 컨테이너 환경의 리소스 관리\n" +
      "- **복잡한 네트워킹**: Istio Service Mesh, mTLS, Zero Trust 아키텍처\n" +
      "- **금융 규제 준수**: 전자금융감독규정과 DevOps 생산성 균형\n" +
      "- **조직 확장성**: 수십 명의 개발자를 지원하는 플랫폼 설계\n\n" +
      "**제가 가져갈 것:**\n" +
      "- **OpenTelemetry 전문성**: 대규모 분산 추적 시스템 고도화\n" +
      "- **AWS 최적화**: 비용 절감 및 아키텍처 개선\n" +
      "- **자동화 철학**: 개발자 경험 개선과 셀프서비스 구축\n" +
      "- **데이터 기반 의사결정**: 비즈니스 메트릭과 인프라 통합\n" +
      "- **빠른 학습 능력**: 새로운 도전을 빠르게 마스터\n\n" +
      "**4. 즉시 기여 + 성장 기회**\n\n" +
      "규모와 무관하게 즉시 기여:\n\n" +
      "**A. Observability 고도화**\n" +
      "- Istio Telemetry와 OpenTelemetry 통합\n" +
      "- MTTI 추가 단축 (현재보다 더 개선)\n" +
      "- SRE 팀 자동화 툴 개발\n\n" +
      "**B. AWS 비용 최적화**\n" +
      "- EKS Spot Instance 전략\n" +
      "- S3 Lifecycle 정책 개선\n" +
      "- CloudWatch 메트릭 최적화\n\n" +
      "**C. 개발자 경험 개선**\n" +
      "- CI/CD 파이프라인 추가 단축\n" +
      "- 셀프서비스 대시보드 개선\n" +
      "- 배포 자동화 고도화\n\n" +
      "**결론:**\n\n" +
      "현재 규모는 작지만, 확장 가능한 아키텍처 설계 능력과 본질적 문제 해결 능력(MTTI 99% 단축, 비용 50% 절감)은 검증되었습니다. 대규모 환경 경험은 제가 귀사에서 배우고 싶은 핵심 이유이며, 동시에 제 OpenTelemetry 전문성과 자동화 철학은 즉시 기여할 것입니다.\n\n" +
      "규모는 금방 적응할 수 있을 것 같고, 오히려 **수천 개 컨테이너 환경에서 CKAD나 CKS까지 도전하며 전문성을 한 단계 더 끌어올릴 기회**가 벌써 기대됩니다. 더 큰 환경에서 더 큰 임팩트를 내고 싶어 지원했습니다.",
  },

  // 금융권 경험 부족
  {
    id: 305,
    category1: "General",
    category2: "Gap Defense",
    question:
      "금융권에서 일해본 경험이 없는데, 전자금융감독규정 같은 규제를 이해하고 대응할 수 있나요?",
    answer:
      "솔직하게 말씀드리면, 금융권 실무 경험은 없습니다. 하지만 **규제 준수와 생산성 균형**이라는 본질적 과제는 제가 이미 다른 형태로 경험했고, 빠르게 학습할 준비가 되어 있습니다.\n\n" +
      "**1. 유사한 규제 환경 경험**\n\n" +
      "현재 회사도 엄격한 규제를 준수해야 했습니다:\n\n" +
      "**A. 개인정보보호법 (PIPA)**\n" +
      "- 고객 PII 데이터 암호화 (AES-256)\n" +
      "- 로그 마스킹: 주민번호, 카드번호 자동 치환\n" +
      "- 접근 제어: RBAC 기반 권한 관리\n" +
      "- 감사 로그: 모든 데이터 접근 이력 추적 (7년 보관)\n\n" +
      "**B. 전자상거래법**\n" +
      "- 거래 데이터 무결성 보장 (Blockchain 검토)\n" +
      "- 배송 추적 정보 3년 보관 (S3 Glacier)\n" +
      "- 결제 실패 알림 즉시 발송 (SQS + Lambda)\n\n" +
      "**C. 사내 보안 정책**\n" +
      "- 프로덕션 접근 제한: Bastion Host + MFA\n" +
      "- 코드 리뷰 필수: 2명 이상 승인\n" +
      "- 배포 승인 프로세스: Change Advisory Board\n\n" +
      "이런 경험을 통해 **규제를 준수하면서도 개발자 생산성을 유지하는 방법**을 배웠습니다. 토스 블로그에서 '보안 엔지니어분들과 최대한 협업하면서 해결'한다는 철학이 정확히 제가 경험한 것입니다.\n\n" +
      "**2. 금융 규제 사전 학습**\n\n" +
      "지원 전 기본적인 금융 규제를 학습했습니다:\n\n" +
      "**전자금융감독규정 핵심 사항:**\n" +
      "- **접근 통제**: 최소 권한 원칙, 직무 분리\n" +
      "- **로그 관리**: 최소 1년 이상 보관 (현재 7년 보관 경험 활용)\n" +
      "- **변경 관리**: 모든 시스템 변경 사전 승인 (현재 CAB 프로세스 유사)\n" +
      "- **재해 복구**: RPO/RTO 준수 (현재 백업 자동화 경험 활용)\n" +
      "- **보안 패치**: 취약점 발견 시 30일 내 조치 (현재 CI/CD 자동화 활용)\n\n" +
      "**케이스 2: 로그 마스킹 자동화 (PIPA 준수)**\n" +
      "- **문제**: 개발자가 로그에서 PII 수동 제거 (실수 빈번)\n" +
      "- **규제**: 개인정보 로그 유출 금지\n" +
      "- **해결**: OpenTelemetry Processor로 주민번호/카드번호 자동 마스킹\n" +
      "- **결과**: 규제 위반 제로 + 개발자 부담 제거\n\n" +
      "**케이스 3: 배포 승인 프로세스 간소화**\n" +
      "- **문제**: Change Advisory Board 승인에 2-3일 소요\n" +
      "- **규제**: 모든 프로덕션 변경 사전 승인 필수\n" +
      "- **해결**: Low-risk 변경(설정 수정)은 자동 승인, High-risk(코드 배포)만 CAB\n" +
      "- **결과**: 평균 승인 시간 50% 단축 + 규제 준수\n\n" +
      "**4. 입사 후 학습 계획**\n\n" +
      "**입사 전 (2주):**\n" +
      "- ✅ 전자금융감독규정 전문 정독\n" +
      "- ✅ 금융보안원(FSI) 가이드라인 학습\n" +
      "- ✅ 토스 보안 관련 블로그 전체 분석\n" +
      "- ✅ 금융권 DevOps 사례 연구 (Kakao Bank, KB)\n\n" +
      "**4. 즉시 기여 가능한 영역**\n\n" +
      "금융 규제 학습 중에도 즉시 기여:\n\n" +
      "**A. 보안 Observability**\n" +
      "- Istio mTLS 메트릭 시각화\n" +
      "- AuthorizationPolicy 위반 알림 자동화\n" +
      "- 감사 로그 자동 집계 (Athena + Grafana)\n\n" +
      "**B. 규제 준수 자동화**\n" +
      "- 로그 보관 정책 자동 검증 (S3 Lifecycle)\n" +
      "- 보안 패치 알림 자동화 (AWS Security Hub)\n" +
      "- 접근 권한 정기 리뷰 대시보드\n\n" +
      "**C. 개발자 생산성 유지**\n" +
      "- 규제 준수 체크리스트 자동화\n" +
      "- 보안 승인 프로세스 간소화\n" +
      "- 샌드박스 환경 자동 생성\n\n" +
      "**결론:**\n\n" +
      "금융권 경험은 없지만, 개인정보보호법/전자상거래법 준수 경험으로 **규제 준수와 생산성 균형**이라는 본질은 이미 이해하고 있습니다. 전자금융감독규정은 입사 전 기본 학습을 마쳤고, 제가 가진 자동화 철학(로그 마스킹 자동화, 샌드박스 자동화)과 보안 Observability 전문성은 오히려 금융권 DevOps에 더 큰 가치를 제공할 것입니다.\n\n" +
      "토스 블로그에서 강조한 '보안팀과 협업하며 더 편리하고 안전하게'라는 방향이 정확히 제가 추구하는 철학입니다. 금융 규제는 금방 적응할 수 있을 것 같고, 오히려 **금융권 특유의 견고한 보안 문화 속에서 Security Specialist로 성장할 기회**가 벌써 기대됩니다. 규제를 제약이 아닌 DevOps 플랫폼을 더 견고하게 만드는 새로운 목표로 삼고 싶습니다.",
  },

  // 일반적인 Gap 대응 프레임워크
  {
    id: 306,
    category1: "General",
    category2: "Gap Defense",
    question:
      "JD에 명시된 [특정 기술/경험]이 부족한데, 이 포지션에 적합하다고 생각하시나요?",
    answer:
      "**프레임워크: Gap을 인정하되, 전이 가능성과 학습 의지를 강조**\n\n" +
      "**1단계: 솔직한 Gap 인정**\n" +
      '> "네, 솔직하게 말씀드리면 [해당 기술/경험]에 대한 직접적인 프로덕션 경험은 제한적입니다."\n\n' +
      "**2단계: 전이 가능한 기반 강조**\n" +
      '> "하지만 [유사 기술 A]를 X년간 운영하며 [핵심 개념 1, 2]를 깊이 이해했고, 이것은 [해당 기술]로 전이 가능합니다."\n\n' +
      "**예시:**\n" +
      "- APISIX → Istio: 둘 다 Envoy 기반, 트래픽 제어 본질 동일\n" +
      "- ECS → EKS: 둘 다 컨테이너 오케스트레이션, Kubernetes 지식 전이\n" +
      "- Airflow → Kafka Streams: 둘 다 데이터 파이프라인, 스트리밍 개념 유사\n\n" +
      "**3단계: 빠른 학습 능력 입증**\n" +
      '> "제가 새로운 기술을 빠르게 습득한 사례를 들면..."\n\n' +
      "**케이스 제시:**\n" +
      "- CKA: 1개월 만에 취득\n" +
      "- OpenTelemetry: 3개월 만에 오픈소스 기여\n" +
      "- SSE Protocol: 2주 만에 프로덕션 적용\n\n" +
      "**학습 방법론 공유:**\n" +
      "1. 공식 문서 정독\n" +
      "2. Hands-on 실습\n" +
      "3. 오픈소스 코드 분석\n" +
      "4. 커뮤니티 참여\n" +
      "5. 멘토링 요청\n\n" +
      "**4단계: 즉시 기여 가능한 다른 강점**\n" +
      '> "[해당 기술] 학습 중에도 제가 즉시 기여할 수 있는 영역은..."\n\n' +
      "**영역 제시:**\n" +
      "- Observability 고도화 (OpenTelemetry 전문가)\n" +
      "- AWS 비용 최적화 (50% 절감 경험)\n" +
      "- CI/CD 자동화 (90% 개선 경험)\n" +
      "- 개발자 경험 개선 (셀프서비스 구축)\n\n" +
      "**5단계: 구체적인 학습 로드맵**\n" +
      '> "입사 후 다음과 같은 타임라인으로 기여하겠습니다."\n\n' +
      "**타임라인:**\n" +
      "- **입사 전 (2주)**: 기초 학습, 로컬 실습\n" +
      "- **1개월**: 아키텍처 이해, 소규모 작업\n" +
      "- **2-3개월**: 독립 작업, 1차 트러블슈팅\n" +
      "- **6개월**: 전문가 수준, 복잡한 프로젝트 리드\n\n" +
      "**6단계: Gap의 긍정적 재해석**\n" +
      '> "이 Gap은 제가 귀사에 지원한 이유이기도 합니다."\n\n' +
      "**재해석:**\n" +
      "- EKS 경험 부족 → 대규모 환경을 배우고 싶어 지원\n" +
      "- Istio 경험 부족 → Service Mesh 전문가로 성장하고 싶어 지원\n" +
      "- 금융권 경험 부족 → 금융 규제와 DevOps 균형을 배우고 싶어 지원\n\n" +
      "**7단계: 마무리 (자신감 + 겸손)**\n" +
      '> "특정 기술 경험은 부족하지만, 제 기반 지식, 학습 능력, 다른 전문성이 팀 적응에 걸림돌이 되지 않을 것입니다. 오히려 [제 강점 A, B]로 즉시 기여하며, [해당 기술]도 수개월 내 마스터하겠습니다."\n\n' +
      "---\n\n" +
      "**실전 예시 (EKS 경험 부족):**\n\n" +
      '**면접관**: "EKS 경험이 없으신 것 같은데, 대규모 컨테이너 환경을 어떻게 다룰 수 있나요?"\n\n' +
      "**답변**:\n" +
      '"네, 맞습니다. EKS 프로덕션 경험은 없습니다. 하지만 세 가지 관점에서 빠르게 기여 가능하다고 봅니다.\n\n' +
      "첫째, 3년간 Kubernetes를 운영하며 CNI, CRI, CSI를 직접 다뤘고, CKA로 네트워킹과 보안을 검증받았습니다. EKS는 매니지드 K8s이므로 제 경험이 100% 전이됩니다.\n\n" +
      "둘째, 작년 EKS 전환 프로젝트에서 직접 평가했지만, 당시 우리 규모(50만 사용자)에는 과도하다 판단해 ECS를 선택했습니다. 무경험이 아닌 합리적 기술 선택이었습니다.\n\n" +
      '셋째, OpenTelemetry로 MTTI 99% 단축한 Observability 전문성은 EKS 환경에서도 즉시 기여할 것입니다. 대규모 환경을 배우고 싶어 지원했고, 1-2개월 내 생산적 기여가 가능하다고 자신합니다."\n\n' +
      "---\n\n" +
      "**핵심 원칙:**\n\n" +
      "1. **정직**: Gap을 숨기지 않고 솔직하게 인정\n" +
      "2. **긍정**: Gap을 약점이 아닌 성장 기회로 재해석\n" +
      "3. **증거**: 학습 능력을 구체적 사례로 입증\n" +
      "4. **균형**: 부족한 부분 + 강한 부분 함께 제시\n" +
      "5. **자신감**: 빠르게 따라잡을 수 있다는 확신 전달",
  },

  // ─── Wipro Cloud DevOps/SRE Engineer (Harman) JD 대응 질문 ───────────────
  {
    id: 311,
    category1: "General",
    category2: "Multi-Cloud",
    question:
      "JD에서 AWS 외에 Azure나 GCP 경험을 요구하는데, AWS 이외의 클라우드 경험이 있나요?",
    answer:
      "네, GCP 경험이 있습니다. 2022-2023년 Inoutbox 스타트업에서 End-to-End 단독 개발을 담당하면서 GCP를 풀 스택으로 운영했어요.\n\n" +
      "**GCP 사용 경험 (Inoutbox)**\n\n" +
      "- **Firebase Hosting + Cloud Functions**: 동대문 의류 B2B/B2C 플랫폼 Frontend Hosting, Serverless API 서빙\n" +
      "- **Firestore**: 실시간 NoSQL DB로 주문/재고 데이터 관리. 트랜잭션과 리얼타임 리스너 활용\n" +
      "- **Cloud Storage**: 상품 이미지, 영수증 PDF 저장\n" +
      "- **GCP Cloud Logging + Slack 웹훅**: 프로덕션 장애 시 Slack 실시간 알림 시스템 구축\n" +
      "- **Firebase FCM**: 모바일 Push 알림 (사입 앱, 캠핑 앱)\n" +
      "- **GCP IAM**: 서비스 어카운트 권한 관리\n\n" +
      "**AWS vs GCP 비교 관점**\n\n" +
      "GCP에서 인상 깊었던 점은 Firebase의 리얼타임 동기화와 서버리스 Cold Start 속도였어요. AWS Lambda에 비해 Firebase Functions가 더 빨랐습니다. 반면 엔터프라이즈 거버넌스(IAM 세밀도, VPC 설계, EKS 수준의 Kubernetes 관리)는 AWS가 훨씬 강력하다고 느꼈어요.\n\n" +
      "현재 AWS가 주력이지만, GCP의 BigQuery나 Pub/Sub 같은 서비스는 항상 관심을 갖고 동향을 파악하고 있습니다. 멀티 클라우드 환경에서 핵심은 특정 클라우드에 종속되지 않는 추상화 계층(Kubernetes, Terraform, OpenTelemetry)인데, 이 부분은 이미 실무에서 깊이 다루고 있어요.",
  },
  {
    id: 312,
    category1: "Infrastructure",
    category2: "Automation",
    question:
      "인프라 자동화 스크립트를 개발한 경험을 구체적으로 설명해주세요. 보안과 비용 최적화 자동화 경험이 있나요?",
    answer:
      "자동화 스크립트 개발은 SRE 업무의 핵심이에요. 저는 Python, Bash, Go로 다양한 자동화를 구현했습니다.\n\n" +
      "**보안 자동화**\n\n" +
      "1. **시크릿 관리 자동화**: 소스코드에 하드코딩된 DB 패스워드, API 키를 AWS Secrets Manager와 Parameter Store로 이관하는 Python 스크립트를 작성했어요. 기존 애플리케이션 코드를 파싱해서 시크릿 후보를 추출하고, 자동으로 Parameter Store에 등록하는 방식이었습니다.\n\n" +
      "2. **ECR 이미지 취약점 스캔 자동화**: GitLab CI 파이프라인에 ECR 이미지 스캔 결과를 파싱하는 단계를 추가했어요. Critical/High 취약점이 발견되면 자동으로 빌드를 실패시키고 Slack 알림을 보냅니다.\n\n" +
      "3. **Kubernetes RBAC 자동화**: 온프레미스 클러스터에서 개발자 kubeconfig 발급을 `scripts/auth/create-kubeconfig.sh`로 자동화했어요. AWS Cognito 토큰 기반으로 인증하고, 네임스페이스별 권한을 자동 설정합니다.\n\n" +
      "**비용 최적화 자동화**\n\n" +
      "1. **S3 Lifecycle 자동화**: CloudWatch + Lambda로 실제 접근 패턴을 분석해서 30일 후 Standard-IA, 90일 후 Glacier, 7년 후 Deep Archive로 자동 이동. 월 비용 $5K → $2.5K (50% 절감).\n\n" +
      "2. **Terraform Destroy Guard**: Jenkins 파이프라인에서 `terraform plan` 결과를 파싱해서 삭제 리소스가 감지되면 Slack 긴급 알림 + 추가 승인을 요구하는 Bash 스크립트.\n\n" +
      "3. **EKS Spot 인터럽션 핸들러**: Spot 인터럽션 시 Pod를 graceful하게 종료하고 재스케줄링하는 스크립트. On-Demand NodeGroup으로 자동 fallback.\n\n" +
      "4. **개발 환경 자동 종료**: 업무시간 외(18시-9시) 개발/테스트 ECS 서비스를 자동으로 중지하고, 월요일 오전에 자동 시작. Lambda + EventBridge로 구현.\n\n" +
      "**Airflow DAG 자동화**\n\n" +
      "100+ DAG를 수동으로 관리하는 대신 DAG Factory 패턴을 도입했어요. YAML 설정에서 DAG를 동적 생성해서 코드 중복을 90% 제거하고, 새 서비스 추가 시 YAML 한 줄만 추가하면 됩니다.\n\n" +
      "자동화의 핵심 원칙은 **'반복되면 자동화하고, 실수 가능하면 시스템이 막는다'**예요.",
  },
  {
    id: 307,
    category1: "Infrastructure",
    category2: "Monitoring",
    question:
      "DataDog 사용 경험이 없는데, 모니터링 스택을 어떻게 운영했나요? Grafana/Prometheus로 DataDog을 대체할 수 있나요?",
    answer:
      "DataDog을 직접 사용한 경험은 없지만, Grafana + Prometheus + OpenTelemetry 스택으로 DataDog이 제공하는 기능 대부분을 직접 구현했어요.\n\n" +
      "**현재 운영 중인 모니터링 스택**\n\n" +
      "```\nOTLP(gRPC/HTTP) → OpenTelemetry Collector → ┬ Prometheus (Metric)\n                                              ├ Loki (Log)\n                                              ├ Tempo (Trace)\n                                              └ ClickHouse (Long-term)\n                                              ↓\n                                           Grafana (Visualization)\n```\n\n" +
      "**DataDog 기능과 우리 스택 대응**\n\n" +
      "- **APM (Application Performance Monitoring)**: Tempo + Grafana Explore로 분산 추적. Trace ID 기반으로 Root Cause를 10분 내 파악 (MTTD 99% 단축).\n" +
      "- **Infrastructure Monitoring**: Prometheus + Node Exporter + cAdvisor로 CPU/메모리/디스크/네트워크 메트릭 수집. Grafana 대시보드로 시각화.\n" +
      "- **Log Management**: Loki + Grafana Explore로 로그 검색. trace_id 기반으로 로그-트레이스 상관관계 분석.\n" +
      "- **Alerting**: Grafana AlertManager + Slack 웹훅으로 P0/P1/P2 단계별 알림.\n" +
      "- **Business Analytics**: Grafana + AWS Athena 쿼리로 MAU/DAU/Conversion Rate 셀프서비스 대시보드.\n" +
      "- **FinOps**: Grafana로 LLM 토큰 비용, Prompt Cache 효율, 에이전트 실행 비용 시각화.\n\n" +
      "**DataDog 대비 장단점**\n\n" +
      "장점:\n" +
      "- 비용: DataDog $2,000/월 → 셀프 호스팅 $200/월 (90% 절감)\n" +
      "- 데이터 소유권: 고객 데이터가 외부로 나가지 않음\n" +
      "- 커스터마이징: 비즈니스 특화 메트릭 자유롭게 추가 가능\n\n" +
      "단점:\n" +
      "- 초기 셋업 복잡도 높음\n" +
      "- DataDog의 AI 이상 감지(Watchdog) 같은 기능은 없음\n" +
      "- 인프라 운영 부담 (Loki, Prometheus, Tempo 모두 직접 관리)\n\n" +
      "DataDog은 빠른 시작이 필요하거나 팀 규모가 작을 때 좋고, 우리 스택은 규모가 커질수록 비용 이점이 커요. 어떤 모니터링 스택이든 핵심은 '장애 발생 시 Root Cause를 얼마나 빨리 찾느냐'인데, 저는 이 부분에서 검증된 경험이 있습니다.",
  },
  {
    id: 308,
    category1: "Infrastructure",
    category2: "Production Troubleshooting",
    question:
      "프로덕션 환경에서 발생한 가장 복잡한 장애를 어떻게 해결했나요? 근본 원인 분석 프로세스를 설명해주세요.",
    answer:
      "가장 기억에 남는 장애는 EKS Spot 인스턴스 인터럽션으로 인한 GitLab 장애였어요 (2026-03-07).\n\n" +
      "**장애 상황**\n\n" +
      "새벽 3시에 GitLab이 응답하지 않는다는 알림이 왔습니다. 확인해보니 GitLab Pod가 Pending 상태에서 멈춰 있었어요. 처음엔 단순한 Pod 재시작 문제로 봤지만, 아무리 기다려도 Running이 되지 않았습니다.\n\n" +
      "**진단 과정**\n\n" +
      "1. `kubectl describe pod -n gitlab gitlab-xxx`를 실행하니 Events에서 힌트를 찾았어요:\n" +
      "`Warning: FailedAttachVolume: Multi-Attach error for volume \"pvc-xxx\" Volume is already exclusively attached to one node`\n\n" +
      "2. EBS PV는 단일 AZ에 바운드됩니다. Spot 인스턴스가 AZ-1a에서 인터럽션되면서 Pod가 AZ-1b로 이동했는데, PV는 AZ-1a에 남아있는 상황이었어요.\n\n" +
      "3. `kubectl get nodes -o custom-columns=NAME:.metadata.name,AZ:.metadata.labels.topology.kubernetes.io/zone`으로 확인하니 GitLab NodeGroup의 Spot 인스턴스가 AZ-1b로 이동해 있었습니다.\n\n" +
      "**즉시 조치**\n\n" +
      "- AZ-1a에 임시 On-Demand 노드를 추가해서 GitLab Pod를 강제로 AZ-1a로 재스케줄\n" +
      "- `kubectl patch pod -p '...' --type merge`로 nodeAffinity 강제 지정\n" +
      "- 15분 만에 서비스 복구\n\n" +
      "**근본 원인 및 구조적 개선**\n\n" +
      "근본 원인: Critical Stateful 워크로드(GitLab, ClickHouse, Scouter)를 Spot NodeGroup에서 운영한 것.\n\n" +
      "개선 조치:\n" +
      "1. **On-Demand 전용 NodeGroup 생성**: `eks.amazonaws.com/capacityType=ON_DEMAND` 전용 ng4-critical 노드그룹 추가\n" +
      "2. **nodeAffinity 필수화**: PV nodeAffinity와 Pod nodeAffinity를 항상 동일 AZ로 고정\n" +
      "3. **문서화**: `docs/14-pv-node-affinity-strategy.md`에 교훈 기록\n" +
      "4. **모니터링 추가**: `kubectl get pv`로 AZ 분포를 주기적으로 확인하는 스크립트 추가\n\n" +
      "이 경험에서 배운 교훈: **비용 절감(Spot) vs 안정성(On-Demand)은 워크로드 특성에 따라 결정해야 한다.** Stateless는 Spot, Stateful은 On-Demand가 원칙이에요.",
  },
  {
    id: 309,
    category1: "Backend",
    category2: "Java/Spring",
    question:
      "Java/Spring 환경에서 프로덕션 장애를 해결한 경험을 설명해주세요. 특히 메모리 누수나 성능 이슈를 어떻게 진단했나요?",
    answer:
      "TheShop에서 Spring Boot 마이크로서비스를 운영하면서 여러 Java 관련 이슈를 해결했어요. 가장 인상 깊었던 건 메모리 누수로 인한 OOM(OutOfMemoryError) 장애였습니다.\n\n" +
      "**상황: 결제 서비스 OOM 장애**\n\n" +
      "결제 서비스 Pod가 하루에 2-3번 자동 재시작되고 있었어요. Kubernetes liveness probe 실패로 Pod가 재시작되는 건데, 근본 원인을 찾아야 했죠.\n\n" +
      "**진단 과정**\n\n" +
      "1. **메트릭 분석**: Grafana에서 JVM Heap 사용량을 보니 서서히 증가하다가 OOM으로 죽는 패턴이 명확했습니다. GC가 실행되어도 메모리가 줄지 않는 전형적인 메모리 누수.\n\n" +
      "2. **Heap Dump 분석**: `kubectl exec -it <pod> -- /bin/sh -c 'kill -3 1'`로 Thread Dump를 확인하고, 문제가 지속되면 `-XX:+HeapDumpOnOutOfMemoryError` JVM 옵션으로 Heap Dump 생성.\n\n" +
      "3. **Eclipse MAT로 분석**: Heap Dump를 Eclipse Memory Analyzer로 분석하니 `com.zaxxer.hikari.HikariDataSource`가 메모리의 60%를 점유하고 있었어요.\n\n" +
      "4. **근본 원인 발견**: Connection Pool에서 Connection이 반환되지 않고 누적되고 있었습니다. 원인은 특정 배치 작업에서 DB Connection을 획득하고 예외 발생 시 `finally` 블록에서 반환하지 않는 코드였어요.\n\n" +
      "```java\n// 문제 코드 (단순화)\npublic void processBatch() {\n    Connection conn = dataSource.getConnection(); // 획득\n    try {\n        // 처리 중 Exception 발생\n        conn.close(); // 예외 발생 시 실행 안됨!\n    } catch (Exception e) {\n        log.error(\"Error\", e);\n        // return 후 finally 없어서 Connection 반환 안됨\n    }\n}\n\n// 수정 코드\ntry (Connection conn = dataSource.getConnection()) { // try-with-resources\n    // 처리 로직\n} catch (Exception e) {\n    log.error(\"Error\", e);\n}\n```\n\n" +
      "**OpenTelemetry와 연동**\n\n" +
      "이후 Spring Boot Actuator + Micrometer + OpenTelemetry Exporter를 연결해서 JVM 메트릭을 실시간으로 Grafana에서 모니터링하게 됐어요. `jvm.memory.used`, `hikaricp.connections.active`, `hikaricp.connections.pending` 메트릭으로 Connection Pool 상태를 실시간 추적합니다.\n\n" +
      "**현재 예방 체계**\n\n" +
      "- Grafana에서 `hikaricp.connections.pending > 5`면 Slack 알림\n" +
      "- 코드 리뷰에서 DB/Resource 사용 시 `try-with-resources` 필수 체크\n" +
      "- OOM 발생 시 자동 Heap Dump + S3 업로드 스크립트",
  },
  {
    id: 310,
    category1: "General",
    category2: "Global Team",
    question:
      "글로벌 팀에서 일한 경험이 있나요? 영어로 기술 커뮤니케이션을 어떻게 하나요?",
    answer:
      "직접 글로벌 팀에서 근무한 경험은 없지만, 영어 기술 커뮤니케이션에 대한 준비는 충분히 되어 있습니다.\n\n" +
      "**영어 역량 현황**\n\n" +
      "- AWS, Kubernetes, OpenTelemetry 공식 문서를 번역 없이 원문으로 읽고 적용해요. AWS re:Invent 강연 영상도 자막 없이 청취합니다.\n" +
      "- OpenTelemetry 오픈소스에 PR(#40123)과 Issue를 영어로 작성해 머지했어요.\n" +
      "- 이 포트폴리오 자체가 영어/한국어/중국어 3개 언어로 작성되었습니다.\n\n" +
      "**기술 영어 활용 경험**\n\n" +
      "- Abacus에서 LG 프로젝트 프로젝트 리더로 일할 때 영어로 된 기술 스펙 문서를 작성하고 리뷰했어요.\n" +
      "- Jira/Confluence로 협업할 때 영어 티켓 작성 및 기술 토론 경험 있습니다.\n" +
      "- GitHub PR 설명과 코드 리뷰를 영어로 작성하는 것에 익숙합니다.\n\n" +
      "**글로벌 팀 협업을 위한 강점**\n\n" +
      "- 비동기 커뮤니케이션 선호: Jira 티켓에 컨텍스트를 상세히 기록하는 습관이 있어 시간대가 다른 팀원에게 유리\n" +
      "- 문서화 강점: Confluence에 아키텍처 결정 사유를 문서화하는 것이 일상화되어 있음\n" +
      "- OTel 오픈소스 기여로 영어 기술 토론에 대한 자신감 보유\n\n" +
      "현재 영어 말하기는 더 연습이 필요하지만, 기술 문서 읽기/쓰기와 이메일/Slack 커뮤니케이션은 즉시 업무 수행이 가능한 수준입니다. 글로벌 팀 합류 후 6개월 내 실무 회의 참여를 목표로 영어 스피킹을 적극 개선할 것입니다.",
  },
];
