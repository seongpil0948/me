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
    priority: "high",
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
    priority: "high",
    question:
      "JD에서 AWS 외에 Azure나 GCP 경험을 요구하는데, AWS 이외의 클라우드 경험이 있나요?",
    answer:
      "네, GCP 경험이 있습니다. 2022-2023년 Inoutbox 스타트업에서 1인 개발로 GCP 풀 스택을 운영했어요.\n\n" +
      "Firebase Hosting + Cloud Functions으로 동대문 의류 B2B/B2C 플랫폼의 프론트엔드 서빙과 서버리스 API를 담당했고, Firestore로 주문/재고 데이터를 실시간으로 관리했습니다. 상품 이미지와 영수증 PDF는 Cloud Storage에, 모바일 Push 알림은 FCM으로 처리했고, GCP Cloud Logging + Slack 웹훅으로 프로덕션 장애 알림 시스템도 구축했어요. GCP IAM으로 서비스 어카운트 권한 관리도 담당했습니다.\n\n" +
      "GCP를 쓰면서 두 가지가 특히 인상 깊었어요. Firebase의 리얼타임 동기화는 설정이 매우 빠르고 편했고, Firebase Functions의 Cold Start도 AWS Lambda보다 체감상 빨랐습니다. 반면 엔터프라이즈 환경에 필요한 IAM 세밀도, VPC 설계, EKS 수준의 Kubernetes 관리는 AWS가 훨씬 강력하다고 느꼈어요. 빠른 시작이 필요한 스타트업에는 Firebase, 복잡한 거버넌스가 필요한 엔터프라이즈에는 AWS가 더 맞는 것 같아요.\n\n" +
      "지금은 AWS가 주력이지만, GCP의 BigQuery나 Pub/Sub는 꾸준히 동향을 파악하고 있습니다. 멀티 클라우드에서 핵심은 특정 클라우드에 종속되지 않는 추상화 계층, 즉 Kubernetes, Terraform, OpenTelemetry인데, 이 부분은 이미 실무로 검증됐어요.\n\n" +
      "지금 다시 한다면 GCP에서도 Terraform IaC를 처음부터 적용했을 거예요. Firebase 콘솔에서 수동으로 관리하다 보니 재현이 어려운 설정들이 남게 됐거든요.",
  },
  {
    id: 312,
    category1: "Infrastructure",
    category2: "Automation",
    priority: "high",
    question:
      "인프라 자동화 스크립트를 개발한 경험을 구체적으로 설명해주세요. 보안과 비용 최적화 자동화 경험이 있나요?",
    answer:
      "자동화 스크립트 개발은 SRE 업무의 핵심이에요. Python, Bash, Go로 다양한 자동화를 구현했는데, 크게 보안과 비용 최적화로 나뉩니다.\n\n" +
      "보안 쪽에서 가장 중요했던 건 시크릿 관리 자동화였어요. 소스코드에 하드코딩된 DB 패스워드, API 키를 AWS Secrets Manager와 Parameter Store로 이관하는 Python 스크립트를 작성했습니다. 코드베이스를 파싱해서 시크릿 후보를 추출하고 Parameter Store에 자동 등록하는 방식이었어요. GitLab CI 파이프라인에는 ECR 이미지 스캔 결과를 파싱하는 단계를 추가해서, Critical/High 취약점이 감지되면 빌드를 자동 실패시키고 Slack 알림을 보냅니다. 온프레미스 클러스터에서 개발자 kubeconfig 발급도 Bash로 자동화해서 AWS Cognito 토큰 기반으로 인증하고 네임스페이스별 권한을 자동 설정해요.\n\n" +
      "비용 최적화에서는 S3 Lifecycle 자동화가 성과가 컸어요. CloudWatch + Lambda로 접근 패턴을 분석해서 30일 뒤 Standard-IA, 90일 뒤 Glacier, 7년 뒤 Deep Archive로 자동 이동하도록 했는데, 스토리지 비용이 절반으로 줄었습니다. 개발/테스트 ECS 서비스를 업무시간 외에 자동 중지하고 월요일 오전에 다시 시작하는 것도 Lambda + EventBridge로 구현했어요.\n\n" +
      "Terraform Destroy Guard는 Jenkins 파이프라인의 안전망이에요. 플랜 결과를 파싱해서 삭제 리소스가 감지되면 Slack 긴급 알림과 추가 승인을 요구합니다. 인프라 사고의 절반은 실수에서 나오거든요. 사람을 믿기보다 시스템이 막는 구조가 훨씬 신뢰할 수 있어요.\n\n" +
      "지금 다시 한다면 Airflow DAG Factory 패턴을 더 일찍 도입했을 거예요. 100개 넘는 DAG를 YAML 설정에서 동적으로 생성하니 코드 중복이 크게 줄었는데, 초기부터 설계했으면 마이그레이션 부담이 없었을 겁니다.",
  },
  {
    id: 307,
    category1: "Infrastructure",
    category2: "Monitoring",
    priority: "high",
    question:
      "DataDog 사용 경험이 없는데, 모니터링 스택을 어떻게 운영했나요? Grafana/Prometheus로 DataDog을 대체할 수 있나요?",
    answer:
      "DataDog을 직접 사용한 경험은 없지만, Grafana + Prometheus + OpenTelemetry 스택으로 DataDog이 제공하는 기능 대부분을 직접 구현했어요.\n\n" +
      "현재 운영 스택은 OTLP 프로토콜로 수집되는 trace, metric, log가 OpenTelemetry Collector로 집약되고, metric은 Prometheus, log는 Loki, trace는 Tempo, 장기 보관은 ClickHouse에 저장됩니다. Grafana에서 조각난 데이터를 Trace ID 하나로 연결해서 분석해요.\n\n" +
      "DataDog의 APM은 Tempo + Grafana Explore가 대체합니다. trace_id로 로그와 트레이스를 연결하는 구조 덕에 MTTD가 18시간에서 10분으로 줄었어요. 인프라 모니터링은 Prometheus + Node Exporter + cAdvisor, 알림은 Grafana AlertManager + Slack 웹훅으로 P0/P1/P2 단계별 라우팅합니다. 비즈니스 지표는 Grafana + Athena 쿼리로 MAU/DAU/Conversion Rate 셀프서비스 대시보드를 구성했고, AI 에이전트 비용은 LLM 토큰 사용량과 Prompt Cache 효율을 FinOps 대시보드로 시각화했습니다.\n\n" +
      "DataDog 대비 가장 큰 장점은 비용이에요. 월 200만원 수준의 DataDog 대신 셀프 호스팅으로 20만원대로 운영합니다. 고객 데이터가 외부 SaaS로 나가지 않는 데이터 주권도 중요한 이유였고요. 단점도 솔직히 말하면 있어요. DataDog의 AI 이상 감지(Watchdog) 기능은 없고, Loki, Prometheus, Tempo를 각각 운영해야 하는 인프라 부담이 있습니다.\n\n" +
      "어떤 스택이든 핵심은 '장애 발생 시 Root Cause를 얼마나 빨리 찾을 수 있나'라고 생각해요. 저는 이 기준에서 직접 검증한 경험이 있고, DataDog 환경으로 전환하는 것도 어렵지 않을 거예요.\n\n" +
      "지금 다시 한다면 초기부터 ClickHouse 장기 보관 계층을 함께 설계했을 거예요. Tempo 24시간 보관 한계를 나중에 만나서 마이그레이션이 생겼거든요.",
  },
  {
    id: 308,
    category1: "Infrastructure",
    category2: "Production Troubleshooting",
    priority: "high",
    question:
      "프로덕션 환경에서 발생한 가장 복잡한 장애를 어떻게 해결했나요? 근본 원인 분석 프로세스를 설명해주세요.",
    answer:
      "가장 기억에 남는 장애는 EKS Spot 인스턴스 인터럽션으로 인한 GitLab 장애였어요.\n\n" +
      "새벽 3시에 GitLab이 응답하지 않는다는 알림을 받았습니다. Pod를 확인하니 Pending 상태에서 멈춰 있었어요. 처음엔 단순한 재시작 문제로 봤는데, 아무리 기다려도 Running이 되지 않았습니다.\n\n" +
      "kubectl describe pod로 이벤트 로그를 확인하니 'Multi-Attach error: Volume is already exclusively attached to one node'라는 경고가 떠 있었어요. EBS PV는 단일 AZ에 바인딩되는데, Spot 인스턴스가 AZ-1a에서 회수되면서 Pod가 AZ-1b로 이동했고, PV는 AZ-1a에 묶여 있는 상황이었습니다. 노드 목록을 확인해보니 GitLab NodeGroup의 Spot 인스턴스가 정말로 다른 AZ로 이동해 있었고, 거기서 원인이 명확해졌어요.\n\n" +
      "즉시 조치로는 AZ-1a에 임시 On-Demand 노드를 추가해서 GitLab Pod를 같은 AZ로 재스케줄했어요. 15분 만에 서비스가 복구됐습니다.\n\n" +
      "구조적으로는 On-Demand 전용 NodeGroup을 새로 만들었어요. GitLab, ClickHouse, Scouter처럼 PV를 가진 Stateful 워크로드는 전부 이 노드그룹으로 이전하고, nodeAffinity로 PV와 Pod가 항상 같은 AZ를 바라보도록 필수화했습니다. 이후 동일한 장애는 재발하지 않았어요.\n\n" +
      "이 경험에서 가장 뼈저리게 배운 건 'Stateless는 Spot, Stateful은 On-Demand'라는 원칙을 처음부터 지켜야 한다는 거예요. 비용 절감에 욕심을 부리다가 새벽 3시를 맞이했거든요.\n\n" +
      "지금 다시 한다면 초기 EKS 설계에서 Stateful 워크로드의 NodeGroup 분리를 기본값으로 넣었을 거예요. 나중에 분리하면 서비스 영향을 고려해야 해서 훨씬 복잡해지거든요.",
  },
  {
    id: 309,
    category1: "Backend",
    category2: "Java/Spring",
    priority: "high",
    question:
      "Java/Spring 환경에서 프로덕션 장애를 해결한 경험을 설명해주세요. 특히 메모리 누수나 성능 이슈를 어떻게 진단했나요?",
    answer:
      "TheShop에서 Spring Boot 서비스를 운영하면서 Java 이슈를 여럿 해결했는데, 가장 기억에 남는 건 결제 서비스 OOM 장애였어요.\n\n" +
      "결제 서비스 Pod가 하루에 2-3번씩 재시작되고 있었습니다. Kubernetes liveness probe가 실패해서 자동 재시작하는 거였는데, Pod가 왜 죽는지가 불명확했어요.\n\n" +
      "Grafana에서 JVM Heap 사용량 그래프를 보니 패턴이 뚜렷했어요. Heap이 서서히 오르다가 GC가 실행되어도 줄지 않고 계속 증가하다가 OOM으로 터지는 거였습니다. 전형적인 메모리 누수 패턴이죠. HeapDumpOnOutOfMemoryError JVM 옵션을 활성화해서 Heap Dump를 수집하고, Eclipse MAT로 분석했더니 HikariCP DataSource가 메모리의 60%를 점유하고 있었어요. Connection이 반환되지 않고 쌓이고 있던 겁니다.\n\n" +
      "코드를 추적해보니 배치 작업에서 DB Connection을 획득하고, 예외가 발생하면 catch에서 return되면서 finally 없이 Connection이 닫히지 않는 부분이 있었어요. try-with-resources 패턴으로 수정해서 Connection이 항상 자동 반환되도록 바꿨습니다.\n\n" +
      "이후에는 Spring Boot Actuator + Micrometer + OpenTelemetry를 연결해서 hikaricp connections 메트릭을 Grafana로 실시간 추적하게 했어요. pending connection이 5를 넘으면 Slack 알림이 오고, OOM 발생 시 Heap Dump를 S3에 자동 업로드하는 스크립트도 추가했습니다.\n\n" +
      "지금 다시 한다면 팀 코딩 컨벤션에 'DB Connection은 try-with-resources로'를 처음부터 포함시켰을 거예요. 장애 후에야 코드 리뷰 체크리스트에 추가했는데, 애초에 있었으면 이 장애는 없었을 겁니다.",
  },
  {
    id: 310,
    category1: "General",
    category2: "Global Team",
    priority: "high",
    question:
      "글로벌 팀에서 일한 경험이 있나요? 영어로 기술 커뮤니케이션을 어떻게 하나요?",
    answer:
      "직접 글로벌 팀에서 근무한 경험은 없지만, 영어 기술 커뮤니케이션에 대한 준비는 충분히 되어 있습니다.\n\n" +
      "평소에 AWS, Kubernetes, OpenTelemetry 공식 문서를 번역 없이 원문으로 읽고 적용해요. AWS re:Invent 강연 영상도 자막 없이 청취합니다. OpenTelemetry 오픈소스에 영어로 PR(#40123)과 Issue를 작성해서 메인테이너와 코멘트를 주고받은 경험도 있고요. 이 포트폴리오 자체도 영어, 한국어, 중국어 3개 언어로 구성되어 있어요.\n\n" +
      "실무에서는 Abacus에서 LG 프로젝트를 리딩할 때 영어 기술 스펙 문서를 작성하고 리뷰했어요. Jira/Confluence에서 영어 티켓 작성, GitHub PR과 코드 리뷰를 영어로 쓰는 것도 일상이었습니다.\n\n" +
      "글로벌 팀 협업에서 강점이라고 생각하는 건 비동기 커뮤니케이션 능력이에요. Jira 티켓에 배경 맥락을 상세히 담는 습관이 있어서 시간대가 다른 팀원과도 컨텍스트 손실이 적거든요. Confluence에 아키텍처 결정 이유를 문서화하는 것도 일상화되어 있습니다.\n\n" +
      "솔직히 영어 말하기는 더 연습이 필요해요. 기술 문서 읽기와 쓰기는 지금 바로 업무 수행이 가능한 수준이지만, 실시간 회의는 처음 몇 달은 부담이 있을 겁니다.\n\n" +
      "지금 다시 한다면 오픈소스 기여를 더 일찍 시작했을 것 같아요. PR 과정에서 글로벌 개발자들과 영어로 기술 토론을 하면서 자신감이 많이 붙었거든요.",
  },

  // ─── Wipro JD 누락 보완 질문 (2026-04) ─────────────────────────────────────

  // Wipro/Samsung/Harman 맞춤 자기소개
  {
    id: 317,
    category1: "General",
    category2: "Self Introduction",
    priority: "high",
    question:
      "Wipro Cloud DevOps/SRE 포지션에 지원한 이유와 Samsung/Harman 프로젝트에서 어떻게 기여할 수 있는지 설명해주세요.",
    answer:
      "7년간 플랫폼 엔지니어링과 SRE 업무를 해오면서, 다음 커리어에서는 글로벌 규모의 인프라를 운영해보고 싶다는 갈증이 있었어요. Wipro JD를 보는 순간 제가 지금까지 쌓아온 경험과 정확히 맞닿아 있다고 느꼈습니다.\n\n" +
      "현재 연매출 5,000억 규모 이커머스 플랫폼에서 하이브리드 멀티 클러스터 환경을 운영하고 있어요. EKS, ECS, 온프레미스 Kubernetes 세 가지를 동시에 관리하면서 Terraform IaC, GitLab CI와 Argo CD 기반 GitOps, OpenTelemetry 관측성 플랫폼까지 End-to-End로 구축했습니다. AWS는 4년 넘게 주력으로 사용하고 있고, SysOps Administrator부터 DevOps Professional, Advanced Networking Specialty까지 자격증으로도 역량을 검증했어요.\n\n" +
      "이 포지션에 끌린 건 세 가지예요. 첫째, AWS 기반 인프라를 글로벌 분산 팀과 협업하며 운영하는 경험이요. 지금까지는 한국 내 소규모 팀에서 일했는데, Wipro의 65개국 분산 팀 구조에서 비동기 커뮤니케이션과 문서 중심 협업을 실전으로 체득하고 싶어요. 둘째, Samsung/Harman 수준의 대규모 멀티 리전 인프라에서 제 CI/CD 자동화와 모니터링 경험을 한 단계 확장할 수 있다는 점. 셋째, Cloud-Native 기반의 자동화 철학이 저와 맞는다는 거예요. 저는 반복되는 건 자동화하고, 실수 가능한 건 시스템이 막아야 한다고 믿거든요.\n\n" +
      "즉시 기여할 수 있는 부분은 명확해요. Grafana, Prometheus, OpenTelemetry로 모니터링 시스템을 고도화하고, 보안/비용 자동화 스크립트를 개발하며, EKS 환경에서 Jenkins와 ArgoCD 기반 CI/CD 파이프라인을 구축·개선하는 업무는 이미 프로덕션에서 검증한 경험이 있습니다. 그러면서 Samsung/Harman 특유의 엔터프라이즈 규모 운영 노하우를 배워가고 싶어요.\n\n" +
      "지금 다시 한다면, 더 일찍 글로벌 환경을 경험했을 텐데요. 그래서 이 기회가 더 소중하게 느껴집니다.",
  },

  // Linux OS & 네트워크 인프라
  {
    id: 318,
    category1: "Infrastructure",
    category2: "Linux",
    priority: "high",
    question:
      "Linux 운영체제와 네트워크 인프라에 대한 이해를 설명해주세요. 실무에서 Linux 트러블슈팅 경험이 있나요?",
    answer:
      "Linux는 제 일상 업무 환경 그 자체예요. 온프레미스 Kubernetes 클러스터 6대가 전부 Ubuntu 24.04이고, EKS 워커노드도 Amazon Linux 기반이라 매일 SSH 들어가서 작업합니다. LFCS(Linux Foundation Certified SysAdmin)도 취득했어요.\n\n" +
      "가장 기억에 남는 트러블슈팅은 온프레미스 클러스터에서 containerd가 간헐적으로 overlayfs 이미지를 stale 상태로 인식하는 문제였어요. Pod가 ImagePullBackOff 상태로 멈추는데, 이미지는 분명히 로컬에 있거든요. journalctl로 containerd 로그를 추적하니 overlayfs 레이어의 메타데이터가 깨져 있었고, 원인은 디스크 I/O 부하가 집중되는 시간대에 Ceph OSD와 containerd가 같은 디스크를 경합하는 거였어요. 해결책으로 containerd의 snapshotter 디렉토리를 별도 파티션으로 분리하고, 주기적으로 stale 레이어를 정리하는 스크립트를 cron에 등록했습니다.\n\n" +
      "네트워크 쪽에서는 VPN 구간의 MTU 불일치로 패킷이 조각나면서 특정 API만 타임아웃 나는 증상이 까다로웠어요. tcpdump로 패킷을 캡처해보니 1500바이트 이상 패킷이 VPN 구간에서 드롭되고 있었고, MTU를 1400으로 낮추고 TCP MSS clamping을 적용해서 해결했습니다. 이 경험으로 iptables 규칙, ip route 테이블, ss/netstat 활용이 자연스러워졌어요.\n\n" +
      "일상적으로 쓰는 도구들은 systemctl로 서비스 관리, top/htop으로 리소스 모니터링, lsof/strace로 프로세스 디버깅, awk/sed로 로그 파싱이에요. kubectl exec로 Pod 안에서 직접 네트워크 디버깅하는 것도 일상이고요. Linux 기초가 탄탄하니까 어떤 클라우드 환경이든 근본적인 문제 해결이 가능하다고 생각해요.\n\n" +
      "지금 다시 한다면 eBPF 기반 디버깅 도구(bpftrace, bcc)를 더 일찍 익혔을 것 같아요. Cilium을 쓰면서 eBPF의 가능성을 봤는데, 커널 레벨 디버깅까지 확장하면 훨씬 깊은 트러블슈팅이 가능하거든요.",
  },

  // Cloud-Native 사고방식
  {
    id: 319,
    category1: "Infrastructure",
    category2: "Cloud-Native",
    priority: "high",
    question:
      "Cloud-Native 사고방식이란 무엇이며, 실무에서 어떻게 적용했나요? Self-healing, 컨테이너화, 자동화 경험을 설명해주세요.",
    answer:
      "Cloud-Native를 한마디로 줄이면 '인프라는 언제든 죽을 수 있다. 그걸 전제로 설계하자'라고 생각해요. 이게 단순한 철학이 아니라 제 일상 업무에 깊이 녹아 있습니다.\n\n" +
      "Self-healing 측면에서 가장 극적인 사례는 EKS Spot 인스턴스 인터럽션이었어요. 새벽에 Spot 인스턴스가 회수되면서 Pod들이 한꺼번에 내려갔는데, Kubernetes의 ReplicaSet이 자동으로 다른 노드에 Pod를 재스케줄하고, HPA가 부하에 따라 스케일아웃하면서 서비스 중단은 2분도 안 됐어요. 다만 Stateful 워크로드인 GitLab은 Self-healing이 안 돼서 장애가 났고, 그 이후로 Stateful은 반드시 On-Demand 전용 NodeGroup으로 분리하는 원칙을 세웠습니다.\n\n" +
      "컨테이너화는 레거시 Tomcat 서비스들을 Docker 이미지로 포장하는 것부터 시작했어요. 처음엔 개발팀이 '왜 굳이?'라고 했는데, 환경 차이로 인한 배포 실패가 월 5-6건에서 0으로 줄어들자 자발적으로 컨테이너화를 요청하기 시작했죠. 이미지 빌드는 GitLab CI에서 자동화하고, ECR에 푸시하면 Argo CD Image Updater가 자동으로 Deployment를 업데이트하는 흐름이에요.\n\n" +
      "자동화에서 제가 고집하는 원칙이 있어요. '반복되면 자동화하고, 실수 가능하면 시스템이 막는다.' Terraform Destroy Guard가 대표적인데, terraform plan에서 삭제 리소스가 감지되면 Slack으로 긴급 알림을 보내고 추가 승인을 요구해요. 개발 환경 자동 종료도 EventBridge와 Lambda로 업무시간 외에 자동 중지시켜서 비용을 크게 줄였어요.\n\n" +
      "12-Factor App 원칙도 실무에서 적용하고 있어요. 특히 Config를 코드와 분리하는 것(AWS Parameter Store)과 Stateless 프로세스 설계가 가장 효과적이었어요. Stateless로 설계하면 수평 확장이 자유롭고, 장애 복구도 빨라지거든요.\n\n" +
      "지금 다시 한다면 GitOps를 더 일찍 도입했을 거예요. 선언적 인프라 관리가 Cloud-Native의 핵심인데, 초기엔 Jenkins에서 kubectl apply를 직접 실행하는 imperative 방식이었거든요. Argo CD로 전환하고 나서 롤백이 git revert 한 줄로 해결되면서 운영 안정성이 확 높아졌습니다.",
  },

  // EKS 기반 CI/CD (GitHub, Jenkins, ArgoCD)
  {
    id: 320,
    category1: "Infrastructure",
    category2: "CI/CD",
    priority: "high",
    question:
      "EKS 환경에서 CI/CD 파이프라인을 구축한 경험을 설명해주세요. GitHub, Jenkins, ArgoCD를 어떻게 조합했나요?",
    answer:
      "현재 EKS 환경에서 GitLab CI + Argo CD + Jenkins 세 가지를 용도별로 조합해서 운영하고 있어요. JD에 언급된 GitHub Actions 경험도 있는데, 오픈소스 프로젝트에서 CI/CD를 GitHub Actions으로 구성한 경험이 있습니다.\n\n" +
      "핵심 파이프라인 흐름은 이래요. 개발자가 GitLab에 코드를 푸시하면, GitLab CI가 자동으로 빌드와 테스트를 수행하고 Docker 이미지를 ECR에 푸시해요. 여기까지가 CI 단계. 그다음 Argo CD Image Updater가 ECR의 새 이미지 태그를 감지해서 GitOps 매니페스트 저장소의 이미지 태그를 자동 업데이트하면, Argo CD가 EKS 클러스터에 동기화합니다. 이렇게 하면 배포 이력이 전부 Git에 남아서 롤백도 git revert 한 줄로 끝나요.\n\n" +
      "Jenkins는 Terraform IaC 파이프라인 전용으로 사용해요. 인프라 변경은 애플리케이션 배포와 성격이 다르니까 의도적으로 분리한 거예요. Jenkins에서 terraform plan을 실행하면 Destroy Guard 스크립트가 삭제될 리소스를 파싱하고, Critical 리소스가 포함되면 Slack으로 긴급 알림 후 추가 승인을 받는 흐름이에요. DEV 계정과 PRD 계정 파이프라인을 완전히 분리해서 실수로 프로덕션 인프라가 변경되는 사고를 원천 차단했습니다.\n\n" +
      "GitHub Actions 경험은 이 포트폴리오 사이트의 CI/CD에서 활용했어요. PR이 열리면 자동으로 린트, 타입체크, 빌드를 실행하고 Vercel에 프리뷰 배포하는 워크플로우를 구성했습니다. GitHub Actions의 장점은 marketplace 생태계가 풍부해서 설정이 간편하다는 건데, 엔터프라이즈 환경에서는 GitLab CI의 세밀한 파이프라인 제어가 더 적합했어요.\n\n" +
      "가장 어려웠던 건 EKS에서의 Helm 릴리즈 관리와 Argo CD 동기화 충돌이었어요. shop-ai 프로젝트는 4개 컴포넌트(orchestrator, 3개 agent)를 하나의 Helm chart로 관리하는데, 한 컴포넌트만 업데이트할 때 Argo CD가 나머지도 재배포하려는 문제가 생겼죠. Argo CD의 selective sync와 Helm values 오버라이드를 조합해서 컴포넌트별 독립 배포를 가능하게 만들었습니다.\n\n" +
      "지금 다시 한다면 Tekton Pipelines도 고려해볼 것 같아요. Kubernetes-native CI/CD라서 EKS와의 통합이 더 자연스럽고, 파이프라인 자체가 CRD로 관리되니까 GitOps 철학과도 잘 맞거든요.",
  },

  // AWS 애플리케이션 개발·배포·운영 End-to-End
  {
    id: 321,
    category1: "Infrastructure",
    category2: "AWS",
    priority: "high",
    question:
      "AWS 환경에서 애플리케이션을 개발하고 배포·운영한 End-to-End 경험을 설명해주세요.",
    answer:
      "AWS에서 애플리케이션의 전체 라이프사이클을 관리한 대표적인 사례가 shop-ai 프로젝트예요. Go 기반 멀티 에이전트 AI 플랫폼을 EKS 위에서 처음부터 끝까지 구축했습니다.\n\n" +
      "개발 단계에서는 AWS Bedrock의 Converse API로 LLM을 호출하고, Amazon Titan으로 임베딩을 생성하며, S3에 문서를 저장하는 구조를 잡았어요. 로컬 개발 환경에서 AWS 서비스와 동일한 인터페이스를 쓸 수 있도록 Parameter Store에서 설정을 로드하는 패턴을 만들어서 환경 차이를 최소화했습니다.\n\n" +
      "배포는 Helm chart로 4개 컴포넌트를 패키징했어요. ECR에 이미지를 푸시하면 Argo CD가 자동으로 EKS에 배포하는데, 각 컴포넌트별로 리소스 요청량이 다르니까 values.yaml에서 컴포넌트별 CPU/메모리 limit을 세밀하게 조정했습니다. RDS PostgreSQL은 Terraform으로 프로비저닝하고, ElastiCache Redis는 세션과 캐싱 용도로 분리했어요.\n\n" +
      "운영에서 가장 까다로웠던 건 LLM 호출 비용 관리였어요. Bedrock의 Prompt Caching을 적극 활용해서 반복 요청의 토큰 비용을 줄이고, Grafana 대시보드에서 에이전트별 토큰 사용량과 비용을 실시간 추적하는 FinOps 체계를 만들었습니다. CloudWatch 알림으로 일일 비용 임계값을 초과하면 즉시 알림이 오게 했어요.\n\n" +
      "보안 측면에서는 EKS Pod Identity로 각 Pod가 필요한 AWS 서비스에만 접근하도록 IAM 역할을 최소 권한으로 분리했어요. Cognito로 사용자 인증을 처리하고, API Gateway 레벨에서 인가를 수행합니다. 시크릿은 전부 Parameter Store에서 관리하고 코드에 하드코딩하지 않는 원칙을 지켰어요.\n\n" +
      "DBA 역할도 부분적으로 했는데, RDS의 Performance Insights로 Slow Query를 잡아내고, Read Replica를 추가해서 읽기 부하를 분산한 경험이 있어요. S3 Lifecycle 정책으로 오래된 로그를 자동으로 Glacier로 이동시켜 월 비용을 50% 절감한 것도 운영 최적화의 일부였습니다.\n\n" +
      "지금 다시 한다면 초기부터 비용 추적 대시보드를 먼저 만들었을 거예요. LLM 비용이 예상보다 빠르게 증가해서 나중에 급하게 모니터링을 붙였는데, 처음부터 있었으면 불필요한 지출을 더 빨리 잡았을 겁니다.",
  },

  // Helm Chart 관리 경험
  {
    id: 322,
    category1: "Infrastructure",
    category2: "IaC",
    priority: "high",
    question:
      "Helm Chart를 활용한 Kubernetes 워크로드 관리 경험을 설명해주세요. Chart 설계와 배포 전략은 어떻게 했나요?",
    answer:
      "Helm은 EKS와 온프레미스 클러스터 양쪽에서 워크로드 배포의 핵심 도구로 쓰고 있어요. 직접 만든 Custom Chart부터 커뮤니티 Chart 운영까지 폭넓은 경험이 있습니다.\n\n" +
      "가장 복잡했던 건 shop-ai-chart였어요. orchestrator, meeting_agent, recommend_agent, customer_service_agent 4개 컴포넌트를 하나의 Umbrella Chart로 관리하는데, 각각 다른 리소스 요구사항과 환경변수가 있거든요. values.yaml을 컴포넌트별로 구조화해서 하나의 helm upgrade 명령으로 4개 서비스를 한꺼번에 배포하면서도, 필요할 때는 --set으로 특정 컴포넌트만 이미지 태그를 오버라이드할 수 있게 설계했어요.\n\n" +
      "서비스 온보딩 자동화도 Helm으로 해결했어요. 새로운 마이크로서비스를 EKS에 배포할 때마다 Deployment, Service, Ingress, HPA, PDB를 일일이 YAML로 작성하는 건 비효율적이었거든요. 공통 서비스 템플릿 Chart를 만들어서 values.yaml에 서비스명, 포트, 레플리카 수만 적으면 나머지가 자동 생성되게 했습니다. 새 서비스 온보딩이 반나절에서 30분으로 줄었어요.\n\n" +
      "커뮤니티 Chart 운영도 적지 않아요. Airflow, GitLab, ClickHouse 모두 공식 Helm Chart로 설치했는데, values.yaml 커스터마이징이 핵심이었어요. Airflow는 KubernetesExecutor를 활성화하고 Git-Sync Sidecar로 DAG를 자동 동기화하게 설정했고, ClickHouse는 Persistent Volume 크기와 복제 설정을 환경별로 다르게 오버라이드했습니다.\n\n" +
      "환경별 배포 전략은 Helm의 values 파일을 DEV, STG, PRD로 분리하는 방식이에요. values-dev.yaml에는 적은 리소스와 1개 레플리카, values-prd.yaml에는 넉넉한 리소스와 HA 설정을 넣어요. Argo CD에서 각 환경별 Application을 생성하고 해당 values 파일을 참조하게 연결합니다.\n\n" +
      "가장 고생했던 건 Chart 버전 관리와 Argo CD 동기화 충돌이었어요. Chart.yaml의 appVersion과 실제 이미지 태그가 불일치하면 Argo CD가 계속 OutOfSync 상태를 표시하거든요. Argo CD Image Updater를 도입해서 이미지 태그 업데이트를 자동화하고, Chart 버전은 기능 변경 시에만 올리는 원칙을 세워서 해결했습니다.\n\n" +
      "지금 다시 한다면 Helmfile을 처음부터 도입했을 거예요. 여러 Chart를 선언적으로 관리하는 기능이 커뮤니티 Chart가 많아질수록 필수거든요.",
  },

  // ─── CloudFormation & DR 보완 ─────────────────────────────────────────────
  {
    id: 323,
    category1: "Infrastructure",
    category2: "IaC",
    priority: "high",
    question:
      "CloudFormation 경험이 있나요? Terraform과 어떻게 구분해서 사용했는지 설명해주세요.",
    answer:
      "CloudFormation과 Terraform 둘 다 실무에서 사용했고, 의도적으로 역할을 나눠서 운영했어요.\n\n" +
      "CloudFormation을 선택한 영역은 AWS 네이티브 서비스와 강하게 결합되는 인프라였어요. EKS 노드그룹 候補 리소스, Parameter Store, Security Group을 CloudFormation StackSet으로 관리했는데, 이유는 두 가지였습니다. 첫째, AWS Console에서 드리프트 감지와 롤백이 네이티브로 지원되니 운영 부담이 낮아요. 둘째, EKS nodeadm 부트스트랩처럼 AWS 공식 예제가 CloudFormation 기반일 때는 그냥 쓰는 게 빠르거든요. 특히 IAM Role과 Instance Profile처럼 EKS 클러스터와 tight coupling된 리소스는 CloudFormation이 상태 관리를 더 안정적으로 해줬어요.\n\n" +
      "반면 Terraform이 필요한 영역은 멀티 환경 격리와 모듈 재사용이 중요한 곳이었어요. shop-iac 프로젝트에서 DEV 계정(008971653402)과 PRD 계정(725129837589)을 완전히 분리하고, ECR, Cognito, S3 상태 백엔드를 모듈로 관리했습니다. CloudFormation StackSet으로도 멀티 계정이 가능하지만, Terraform의 workspace + backend 조합이 계정 간 상태 분리를 더 명확하게 표현해요.\n\n" +
      "두 도구를 함께 쓸 때 가장 주의한 건 동일 리소스를 양쪽에서 관리하는 중복 소유 문제였어요. EKS 클러스터 자체는 eksctl로, 노드그룹 IAM 역할은 CloudFormation으로, ECR과 Cognito는 Terraform으로 분리하고, 경계를 팀 내 문서에 명확히 기록해서 실수로 충돌하는 상황을 막았습니다.\n\n" +
      "지금 다시 한다면 처음부터 CloudFormation과 Terraform의 책임 경계를 더 명확히 정의했을 거예요. 프로젝트 초기에 '이 리소스는 어떤 IaC가 관리한다'는 원칙을 세우지 않으면 나중에 두 도구가 같은 리소스를 참조하면서 충돌이 생기거든요.",
  },
  {
    id: 324,
    category1: "Infrastructure",
    category2: "DR/HA",
    priority: "high",
    question:
      "고가용성(HA)과 재해 복구(DR) 설계 경험을 설명해주세요. 실제 장애 상황에서 어떻게 대응했나요?",
    answer:
      "HA와 DR은 설계 단계에서 목표 RPO/RTO를 정하는 것부터 시작해야 해요. 저는 TheShop에서 비즈니스 크리티컬 서비스는 RTO 15분, RPO 1시간을 목표로 설계했습니다.\n\n" +
      "EKS 고가용성은 Multi-AZ 노드그룹으로 확보했어요. 각 노드그룹을 ap-northeast-2a, 2b, 2c에 분산 배치하고, Pod Anti-Affinity로 같은 Deployment의 레플리카가 다른 AZ에 스케줄되도록 강제했습니다. HPA와 PDB를 함께 구성해서 오토스케일링 중에도 최소 1개 레플리카는 항상 종료되지 않도록 보호했어요. 실제로 AZ-2a 노드에 장애가 났을 때 다른 AZ로 3분 만에 페일오버되면서 서비스 영향 없이 복구됐습니다.\n\n" +
      "데이터베이스 HA는 RDS Multi-AZ로 해결했어요. 프라이머리 AZ 장애 시 1-2분 안에 자동 페일오버됩니다. 하지만 그 1-2분이 중요한 서비스에는 치명적일 수 있어서, Connection Pool에 재연결 로직을 추가하고 Application 레벨에서 DB 재연결 실패 시 Circuit Breaker를 열도록 설계했어요.\n\n" +
      "GitLab과 ClickHouse처럼 Stateful 서비스는 EBS PV를 쓰다 보니 AZ 바인딩 이슈가 생겼어요. On-Demand 전용 NodeGroup을 만들고 nodeAffinity로 PV와 Pod를 같은 AZ에 고정시켰습니다. 앞서 설명한 Spot 인터럽션 장애에서 배운 교훈이에요.\n\n" +
      "DR 관점에서는 Velero로 Kubernetes 리소스와 PV 스냅샷을 일 1회 S3에 백업하고, RDS 자동 백업은 7일 보관으로 설정했어요. etcd 스냅샷도 매일 새벽에 S3에 업로드하는 CronJob을 구성했습니다. DR 훈련은 분기 1회 실시했는데, 백업에서 복구하는 절차를 실제로 테스트해야 형식적인 백업에 그치지 않거든요. 복구 테스트 중에 설정 누락을 두 번 발견했고, 실제 장애 전에 발견해서 다행이었어요.\n\n" +
      "지금 다시 한다면 RPO/RTO 목표를 서비스 등급별로 명문화하고 팀에 공유했을 거예요. 모든 서비스가 같은 HA 수준을 요구하지 않는데, 초기에는 일률적으로 똑같이 설계하느라 비용이 과잉 지출됐거든요.",
  },
];
