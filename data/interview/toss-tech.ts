import type { InterviewQuestion } from "@/types/portfolio";

/**
 * 토스 DevOps Engineer 포지션 특화 기술 인터뷰 질문
 * Istio, mTLS, Service Mesh, Gateway 아키텍처 관련
 */
export const tossTechQuestions: InterviewQuestion[] = [
  // Istio & Service Mesh
  {
    id: 101,
    category1: "Infrastructure",
    category2: "Istio",
    question: "Istio의 mTLS (Mutual TLS)가 무엇이고, 왜 금융권에서 중요한가요?",
    answer:
      "**mTLS (Mutual TLS)란:**\n일반 TLS는 클라이언트가 서버만 인증하지만, mTLS는 **양방향 인증**을 수행합니다. 클라이언트와 서버가 서로의 인증서를 검증하여 신뢰된 통신만 허용합니다.\n\n**금융권에서의 중요성:**\n1. **Zero Trust 보안 모델**: 내부망이라도 모든 요청을 검증\n2. **규제 준수**: 전자금융감독규정의 암호화 통신 요구사항 충족\n3. **데이터 보호**: 모든 서비스 간 트래픽 암호화로 중간자 공격 방지\n4. **감사 추적**: 인증서 기반으로 누가 어떤 서비스에 접근했는지 추적 가능\n\n**제 경험과의 연결:**\n현재 APISIX Gateway에서 RBAC 기반 인증/인가를 구현하고 있습니다. AWS Advanced Networking Specialty 자격증을 통해 TLS/SSL, 인증서 관리, 네트워크 보안 원칙을 깊이 이해하고 있어, Istio의 mTLS 구현을 빠르게 학습하고 적용할 수 있습니다.",
  },
  {
    id: 102,
    category1: "Infrastructure",
    category2: "Istio",
    question:
      "Istio Sidecar 패턴과 Ambient Mode의 차이를 설명하고, 각각 어떤 상황에 적합한가요?",
    answer:
      "**Sidecar 패턴 (기존 방식):**\n- 각 Pod마다 Envoy Proxy 컨테이너가 Sidecar로 배포됨\n- **장점**: 세밀한 트래픽 제어, 서비스별 독립적인 설정\n- **단점**: 리소스 오버헤드 (메모리, CPU), 복잡한 디버깅\n\n**Ambient Mode (신규 방식):**\n- Node 레벨에서 공유 프록시로 트래픽 처리 (ztunnel + waypoint proxy)\n- **장점**: 리소스 효율성 향상, 간소화된 운영\n- **단점**: L7 고급 기능 제한적, 생태계 성숙도 부족\n\n**적합한 상황:**\n- **Sidecar**: 복잡한 트래픽 정책, 서비스별 커스터마이징 필요 시 (금융 서비스)\n- **Ambient**: 리소스 제약, 단순 mTLS만 필요, 대규모 클러스터\n\n**제 경험:**\n작년 사내 EKS 마이그레이션 검토 시 **Ambient Mode + Gateway API** 조합을 평가했습니다. 결론적으로 두 기술의 생태계 호환성이 충분히 성숙하지 않았고, AWS 의존적이며 DevOps 인력이 부족한 상황에서는 **APISIX Gateway + ECS Fargate** 조합이 더 현실적이라고 판단했습니다. 하지만 이 과정에서 Istio 아키텍처와 Service Mesh 트레이드오프를 깊이 이해하게 되었습니다.",
  },
  {
    id: 103,
    category1: "Infrastructure",
    category2: "Istio",
    question:
      "Istio의 AuthorizationPolicy를 사용하여 특정 API 경로(/send-money)에 대한 접근을 제어하는 방법을 설명해주세요.",
    answer:
      '**AuthorizationPolicy 개념:**\nIstio에서 L7 레벨의 세밀한 접근 제어를 제공하는 리소스입니다. 특정 서비스의 Inbound 트래픽에 대해 경로, HTTP 메서드, 출처별로 허용/거부를 정의합니다.\n\n**구현 예시 (/send-money 보호):**\n```yaml\napiVersion: security.istio.io/v1beta1\nkind: AuthorizationPolicy\nmetadata:\n  name: payment-policy\n  namespace: payment\nspec:\n  selector:\n    matchLabels:\n      app: payment-service\n  action: ALLOW\n  rules:\n  - from:\n    - source:\n        principals: ["cluster.local/ns/frontend/sa/web-app"]\n    to:\n    - operation:\n        methods: ["POST"]\n        paths: ["/send-money"]\n    when:\n    - key: request.auth.claims[role]\n      values: ["authenticated-user"]\n```\n\n**핵심 요소:**\n1. **Selector**: 정책을 적용할 서비스 지정\n2. **From**: 출처 제한 (Service Account 기반)\n3. **To**: 경로와 HTTP 메서드 제한\n4. **When**: 추가 조건 (JWT claims 등)\n\n**Default Deny 전략:**\n기본적으로 아무 곳도 호출할 수 없고, 명시적으로 허용된 경로만 접근 가능하도록 설정합니다.\n\n**제 경험과의 연결:**\n현재 APISIX Gateway에서 RBAC 기반으로 모든 트래픽에 대해 인증/인가를 구현하고 있습니다. Istio의 AuthorizationPolicy는 동일한 철학을 Kubernetes 네이티브하게 구현한 것으로, APISIX 경험을 바탕으로 빠르게 적응할 수 있습니다.',
  },
  {
    id: 104,
    category1: "Infrastructure",
    category2: "Istio",
    question:
      "Istio Envoy Proxy의 역할과 커스터마이징이 필요한 상황을 설명해주세요.",
    answer:
      "**Envoy Proxy의 역할:**\nIstio의 데이터 플레인으로, 실제 트래픽을 처리하는 고성능 L7 프록시입니다.\n- **트래픽 라우팅**: 동적 서비스 디스커버리, 로드 밸런싱\n- **보안**: mTLS 암호화, 인증서 관리\n- **Observability**: 메트릭, 로그, 분산 추적 데이터 생성\n- **Resilience**: Circuit breaker, retry, timeout 정책\n\n**커스터마이징이 필요한 상황:**\n1. **레거시 호환성**: 기존 인프라와 맞지 않는 기본 동작 수정\n2. **성능 최적화**: 특정 워크로드에 맞는 버퍼, 타임아웃 조정\n3. **고급 기능**: 기본 Istio에서 지원하지 않는 프로토콜이나 동작\n\n**토스 사례 (블로그 참고):**\n- Istio 1.7 이후 Telemetry 컴포넌트 deprecation\n- 기존 메트릭 수집 방식을 유지하기 위해 **Envoy를 빌드하거나 새 컴포넌트 개발**\n- 결국 새 컴포넌트 방식 선택 (더 빠른 판단 필요했다는 회고)\n\n**EnvoyFilter 사용 예시:**\n토스는 클러스터 점검 시 안정적인 커넥션 종료를 위해 `max_connection_duration` 설정으로 클라이언트가 자연스럽게 재연결하도록 유도했습니다.\n\n**제 경험과의 연결:**\n- APISIX Gateway도 Envoy 기반이므로 아키텍처 이해도 높음\n- OpenTelemetry Custom Exporter를 Go로 직접 개발한 경험\n- 오픈소스를 읽고 필요 시 수정하는 능력 (OpenTelemetry 기여)",
  },
  {
    id: 105,
    category1: "Infrastructure",
    category2: "Istio",
    question:
      "Istio를 사용한 Multi-cluster 환경에서 트래픽 분산 및 장애 조치를 어떻게 구현하나요?",
    answer:
      "**Multi-cluster Istio 아키텍처:**\n토스는 Active-Active 이중화 데이터센터로 운영하고 있습니다.\n\n**트래픽 분산 방법:**\n1. **GSLB (Global Server Load Balancing)**\n   - DNS 기반으로 클러스터 간 트래픽 분배\n   - 헬스체크 기반 자동 failover\n   - 토스는 트래픽 불균형 문제를 GSLB로 해결\n\n2. **Istio Multi-Primary 모델**\n   - 각 클러스터가 독립적으로 서비스 운영\n   - Service Discovery 공유로 cross-cluster 통신\n   - mTLS로 클러스터 간 안전한 통신\n\n3. **Gateway 분리**\n   - 토스는 내부망/계열사/마이데이터/사용자 API 각각 별도 Gateway 운영\n   - 트래픽 성격별 격리로 장애 영향 범위 최소화\n\n**장애 조치 프로세스:**\n1. **점검 시나리오**: EnvoyFilter로 커넥션 수명 제한\n   - 클라이언트가 자연스럽게 다른 클러스터로 재연결\n   - 무중단 클러스터 전환\n\n2. **장애 시나리오**: GSLB 헬스체크 실패 감지\n   - DNS 레벨에서 자동으로 정상 클러스터로 라우팅\n   - Istio Circuit Breaker로 장애 전파 차단\n\n**제 경험과의 연결:**\n- Site-to-Site VPN (1.25Gbps) 구성 경험\n- Multi-AZ ECS Fargate 배포로 HA 구현\n- AWS Advanced Networking Specialty로 DNS, 로드밸런싱 깊이 이해\n- Redis Sentinel HA 클러스터 운영 (자동 failover)",
  },

  // Gateway 비교
  {
    id: 106,
    category1: "Infrastructure",
    category2: "Gateway",
    question:
      "APISIX Gateway와 Istio Gateway의 차이점을 설명하고, 각각 어떤 상황에 적합한가요?",
    answer:
      "**APISIX Gateway:**\n- **아키텍처**: Nginx + Lua 기반, Standalone API Gateway\n- **위치**: Cluster 외부 또는 경계에서 북남향(North-South) 트래픽 처리\n- **강점**: 동적 설정, 풍부한 플러그인 생태계, 운영 편의성\n- **약점**: Service Mesh 기능 제한적, 서비스 간 통신 관리 부족\n\n**Istio Gateway:**\n- **아키텍처**: Envoy 기반, Service Mesh의 일부\n- **위치**: Cluster 내부에서 동서향(East-West) + 북남향 트래픽 모두 관리\n- **강점**: mTLS 네이티브, 세밀한 트래픽 제어, Kubernetes 통합\n- **약점**: 학습 곡선 높음, 리소스 오버헤드, 복잡한 운영\n\n**적합한 상황:**\n\n**APISIX 선택:**\n- API Gateway만 필요 (외부 → 내부 트래픽)\n- 빠른 구축과 운영 편의성 우선\n- 기존 Nginx 인프라 마이그레이션\n- 제한된 DevOps 인력\n\n**Istio Gateway 선택:**\n- 마이크로서비스 간 통신 제어 필수 (Service Mesh)\n- Zero Trust 보안 모델 구현\n- 금융권처럼 엄격한 보안 요구사항\n- Kubernetes 네이티브 환경\n\n**토스의 선택:**\n토스는 **Istio Gateway + Service Mesh**를 선택했습니다.\n- 100% mTLS 강제 (계열사, 마이데이터 통신)\n- 복잡한 마이크로서비스 아키텍처\n- 금융 규제 준수\n\n**제 선택 (TheShop):**\n**APISIX Gateway + ECS Fargate**를 선택했습니다.\n- 이유: AWS 의존적 환경, 제한된 DevOps 인력, EKS Ambient Mode 생태계 미성숙\n- 하지만 Istio 아키텍처를 이해하고 평가한 경험 보유\n- 토스처럼 성숙한 DevOps 팀이 있다면 Istio가 더 적합하다고 판단",
  },
  {
    id: 107,
    category1: "Infrastructure",
    category2: "Gateway",
    question: "AWS ALB/NLB와 Istio Gateway의 역할 차이를 설명해주세요.",
    answer:
      "**AWS ALB (Application Load Balancer):**\n- **레벨**: L7 (HTTP/HTTPS)\n- **위치**: AWS 관리형, VPC 경계\n- **기능**: 경로 기반 라우팅, 헬스체크, SSL termination\n- **제약**: Kubernetes 리소스 미인식, 동적 설정 제한적\n\n**AWS NLB (Network Load Balancer):**\n- **레벨**: L4 (TCP/UDP)\n- **위치**: AWS 관리형, 고성능\n- **기능**: 초고속 트래픽 처리, 정적 IP, PrivateLink\n- **제약**: L7 기능 없음 (경로, 헤더 기반 라우팅 불가)\n\n**Istio Gateway:**\n- **레벨**: L4-L7 (Envoy 기반)\n- **위치**: Kubernetes 내부, Istio Ingress Gateway Pod\n- **기능**: \n  - Kubernetes Service/Pod 네이티브 인식\n  - mTLS 자동 적용\n  - 동적 라우팅 (VirtualService 연동)\n  - 세밀한 트래픽 제어 (헤더, 가중치, 미러링)\n\n**아키텍처 조합:**\n\n**일반적인 패턴:**\n```\n외부 트래픽 → NLB/ALB → Istio Gateway → Service Mesh → Pods\n```\n\n**토스 패턴 (추정):**\n- 외부: L4 로드밸런서 → Istio Gateway (트래픽 타입별 분리)\n- 내부: Istio Service Mesh (100% mTLS)\n\n**제 현재 아키텍처:**\n```\n외부 → ALB → APISIX Gateway → ECS Fargate Tasks\n```\n- ALB: AWS 관리형 L7 라우팅, SSL termination\n- APISIX: 동적 라우팅, RBAC, Rate limiting\n\n**차이점 요약:**\n- AWS LB: 인프라 레벨 로드밸런싱\n- Istio Gateway: 애플리케이션 레벨 트래픽 제어 + 보안\n- 보완 관계이며, 함께 사용 가능",
  },
  {
    id: 108,
    category1: "Infrastructure",
    category2: "Gateway",
    question:
      "Kubernetes Gateway API가 무엇이고, Istio Ingress와 어떤 관계인가요?",
    answer:
      "**Kubernetes Gateway API란:**\n- Ingress의 차세대 API (GA since 2023)\n- **역할 분리**: \n  - GatewayClass: 인프라 제공자 정의\n  - Gateway: 리스너 및 프로토콜 설정\n  - HTTPRoute/TCPRoute: 라우팅 규칙 정의\n- **표현력**: Ingress보다 복잡한 라우팅 지원\n- **이식성**: 다양한 구현체 간 호환 (Istio, Nginx, Envoy)\n\n**Istio와의 관계:**\n- Istio는 Gateway API를 **구현체**로 지원\n- 기존 Istio Gateway + VirtualService 대신 표준 Gateway API 사용 가능\n- 하지만 Istio 고유 기능(AuthorizationPolicy 등)은 여전히 Istio CRD 필요\n\n**제 경험 (EKS 마이그레이션 검토):**\n작년 사내 컨테이너 인프라 EKS 이관 검토 시:\n\n**목표:**\n- Istio Ambient Mode (리소스 효율)\n- Gateway API (표준화, 이식성)\n\n**문제점 발견:**\n1. **생태계 미성숙**: Ambient Mode + Gateway API 조합이 프로덕션 ready 아님\n2. **호환성 이슈**: 두 기술 간 통합 문서 부족, 엣지 케이스 많음\n3. **운영 복잡도**: 신기술 도입 리스크 > 기대 효과\n\n**최종 결정:**\n- **APISIX Gateway + ECS Fargate** 선택\n- 이유: \n  - 성숙한 생태계\n  - 팀의 AWS 전문성 활용\n  - 제한된 DevOps 인력으로도 안정 운영 가능\n\n**배운 점:**\n- 최신 기술 != 최선의 선택\n- 팀 상황, 생태계 성숙도, 운영 역량 고려 필수\n- 하지만 평가 과정에서 Gateway API와 Istio 아키텍처 깊이 이해",
  },

  // Container 환경 마이그레이션
  {
    id: 109,
    category1: "Infrastructure",
    category2: "Migration",
    question:
      "EKS로 마이그레이션을 검토하셨는데, 최종적으로 ECS를 선택한 이유가 무엇인가요?",
    answer:
      "**마이그레이션 배경:**\n- 기존: ECS Fargate 기반 컨테이너 운영\n- 검토: EKS + Istio Ambient Mode + Gateway API로 고도화\n- 목표: 리소스 효율성, 표준 준수, Service Mesh 도입\n\n**EKS + Istio 장점 (평가 결과):**\n✅ Service Mesh로 세밀한 트래픽 제어\n✅ mTLS 네이티브 지원\n✅ Kubernetes 표준 생태계\n✅ Ambient Mode로 Sidecar 오버헤드 감소\n\n**ECS 선택 이유 (현실적 판단):**\n\n**1. 생태계 성숙도 부족**\n- Istio Ambient Mode: 당시 Beta (프로덕션 리스크)\n- Gateway API: Istio 통합 엣지 케이스 많음\n- 두 기술의 조합에 대한 레퍼런스 부족\n\n**2. 팀 상황**\n- **DevOps 인력 부족**: 2-3명이 전체 인프라 담당\n- **AWS 전문성**: 팀 모두 AWS 경험 풍부, Kubernetes는 제한적\n- **학습 곡선**: Istio 운영 숙련도 달성까지 최소 6개월 예상\n\n**3. AWS 의존적 환경**\n- 이미 AWS 서비스 깊이 통합 (S3, RDS, Glue, Athena 등)\n- ECS는 AWS 관리형 → 운영 부담 최소화\n- ALB + APISIX로도 충분한 트래픽 제어 가능\n\n**4. 비즈니스 우선순위**\n- 레거시 마이그레이션, 데이터 플랫폼 구축이 더 급선무\n- 인프라 혁신 < 비즈니스 기능 개발\n\n**최종 아키텍처:**\n```\nALB → APISIX Gateway → ECS Fargate → RDS/Redis/Kafka\n```\n\n**성과:**\n- 안정적 운영 (99.9% uptime)\n- 20-50M 일일 메시지 처리\n- 100K+ 일일 사용자 지원\n\n**토스 입사 시 장점:**\n- EKS + Istio 평가 경험으로 **트레이드오프 이해**\n- 성숙한 DevOps 팀에서는 Istio 가치 극대화 가능\n- APISIX/Envoy 경험으로 **빠른 Istio 학습 가능**\n- 현실적 기술 선택 능력 (최신 기술 맹신 X)",
  },

  // Observability
  {
    id: 110,
    category1: "Infrastructure",
    category2: "Observability",
    question: "금융권에서 Observability가 일반 서비스와 다른 점은 무엇인가요?",
    answer:
      "**금융권 Observability 특수성:**\n\n**1. 규제 준수 (Compliance)**\n- **전자금융감독규정**: 모든 거래 로그 최소 5년 보관\n- **감사 추적**: 누가, 언제, 무엇을 했는지 불변 기록\n- **데이터 보호**: 개인정보는 마스킹, 암호화 저장\n\n**2. 장애 허용도 Zero**\n- **금융 거래 실패 = 비즈니스 직접 손실**\n- **MTTI/MTTR 극소화**: 몇 분이 아닌 몇 초 단위 목표\n- **Proactive 감지**: 장애 발생 전 징후 포착 필수\n\n**3. 거래 수준 추적**\n- **Transaction Tracing**: 송금 $100 → 여러 서비스 → 완료/실패 전체 추적\n- **분산 트랜잭션**: 여러 마이크로서비스에 걸친 원자성 보장 확인\n- **롤백 추적**: 실패 시 보상 트랜잭션 전파 과정 가시화\n\n**4. 실시간 비즈니스 메트릭**\n- **거래 성공률**: 99.99% SLA 모니터링\n- **처리 지연**: p99 latency < 200ms 같은 엄격한 목표\n- **사기 탐지 연동**: 이상 패턴 실시간 알람\n\n**토스의 접근 (블로그 기반):**\n- **직관적 메트릭 도출**: 개발자가 빠르게 근본 원인 파악\n- **자동화된 탐지**: 중복 호출, 성능 저하 자동 발견\n- **GUI 툴**: Thread dump, profiling을 개발자가 직접 사용\n\n**제 구현 사례 (TheShop - 이커머스):**\n\n**1. OpenTelemetry 분산 추적**\n- 주문 → 결제 → 재고 → 배송 전체 트랜잭션 추적\n- MTTI 99% 감소 (18시간 → 10분)\n\n**2. 비즈니스 메트릭 연동**\n- Grafana BI 대시보드로 전환율, 리텐션 가시화\n- 인프라 메트릭과 비즈니스 KPI 상관관계 분석\n\n**3. 장기 보관**\n- AWS Glue + Athena Data Lake\n- 로그 보존 7일 → 10년 (142배 확장)\n\n**4. 규제 대응**\n- Parquet 압축으로 비용 효율적 장기 보관\n- 불변 저장 (S3 Glacier)\n\n**금융권 적용 시 추가 필요:**\n- **PII 마스킹**: 주민번호, 계좌번호 자동 마스킹\n- **감사 로그 분리**: 변경 불가능한 별도 저장소\n- **실시간 알람**: 거래 실패율 임계값 초과 시 즉시 대응\n- **Compliance 리포트**: 규제 기관 제출용 자동 생성",
  },
  {
    id: 111,
    category1: "Infrastructure",
    category2: "Observability",
    question:
      "OpenTelemetry와 Istio를 함께 사용할 때의 장점과 통합 방법을 설명해주세요.",
    answer:
      '**OpenTelemetry + Istio 시너지:**\n\n**1. 완전한 분산 추적**\n- **Istio**: 서비스 메쉬 레벨에서 자동 트레이스 생성\n- **OpenTelemetry**: 애플리케이션 레벨 상세 추적\n- **결합**: 네트워크 + 비즈니스 로직 end-to-end 가시성\n\n**2. Context Propagation**\n- Istio Envoy가 HTTP 헤더로 Trace Context 자동 전파\n- OpenTelemetry SDK가 컨텍스트 이어받아 애플리케이션 span 생성\n- 전체 요청 흐름이 하나의 Trace ID로 연결\n\n**3. 일관된 메트릭/로그**\n- Istio: 서비스 간 통신 메트릭 (latency, error rate, RPS)\n- OpenTelemetry: 비즈니스 메트릭 (주문 수, 결제 성공률)\n- 동일한 백엔드(Prometheus, Grafana, Tempo)로 통합\n\n**통합 구현 방법:**\n\n**1. Trace Context Propagation 설정**\n```yaml\n# Istio 설정\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: istio\ndata:\n  mesh: |\n    defaultConfig:\n      tracing:\n        zipkin:\n          address: otel-collector:9411\n        sampling: 100.0\n```\n\n**2. OpenTelemetry Collector 배포**\n```yaml\n# Sidecar 또는 DaemonSet으로 배포\n# Istio traces + App traces 수집\napiVersion: opentelemetry.io/v1alpha1\nkind: OpenTelemetryCollector\nmetadata:\n  name: otel-collector\nspec:\n  mode: deployment\n  config: |\n    receivers:\n      zipkin:\n        endpoint: 0.0.0.0:9411\n      otlp:\n        protocols:\n          grpc:\n          http:\n    exporters:\n      prometheus:\n      jaeger:\n        endpoint: jaeger:14250\n```\n\n**3. 애플리케이션 SDK 통합**\n```python\n# Python 예시\nfrom opentelemetry import trace\nfrom opentelemetry.instrumentation.flask import FlaskInstrumentor\n\n# Istio가 전파한 Trace Context 자동 인식\nFlaskInstrumentor().instrument_app(app)\n\n# 커스텀 Span 추가\ntracer = trace.get_tracer(__name__)\nwith tracer.start_as_current_span("process_payment"):\n    # 비즈니스 로직\n    result = process_payment(order)\n```\n\n**4. Grafana 통합 대시보드**\n- Tempo: 분산 트레이싱 시각화\n- Prometheus: Istio + App 메트릭\n- Loki: 로그 (Trace ID 링크)\n\n**토스 사례 (추정):**\n- Istio로 서비스 메쉬 자동 트레이싱\n- 애플리케이션은 OpenTelemetry SDK로 비즈니스 로직 추적\n- 결제, 송금 등 핵심 트랜잭션의 전체 흐름 가시화\n\n**제 경험:**\n- **OpenTelemetry Collector 12대 서버 구성**\n- **Custom Exporter Go 개발** (AWS, 컨테이너 이슈)\n- **Grafana + Prometheus + Tempo 통합**\n- **3TB 월간 추적 데이터 처리**\n- **MTTI 99% 감소** (18시간 → 10분)\n\n**토스 입사 시:**\n- OpenTelemetry 전문성으로 즉시 기여 가능\n- Istio 통합은 공식 문서로 빠르게 학습\n- 이미 구축된 토스 observability stack에 최적화된 추가 기능 제안 가능',
  },
  {
    id: 112,
    category1: "Infrastructure",
    category2: "Observability",
    question:
      "Istio Telemetry v1이 deprecate된 후 토스가 어떻게 대응했는지, 비슷한 상황에서 당신은 어떻게 할 건가요?",
    answer:
      '**토스의 상황 (블로그 기반):**\n\n**문제:**\n- Istio 1.7부터 Telemetry v1 (Mixer) 제거\n- 기존 메트릭/로그 수집 방식 더 이상 사용 불가\n- 수백 개 서비스의 모니터링 중단 리스크\n\n**토스의 대응:**\n1. **초기 시도**: Envoy 직접 빌드하여 기존 방식 유지\n2. **시행착오**: 복잡도 증가, 유지보수 부담\n3. **최종 선택**: 새로운 컴포넌트 개발\n4. **회고**: "더 빠른 판단으로 새 컴포넌트를 만들었으면 좋았을 것"\n\n**핵심 교훈:**\n- ❌ 오픈소스 fork/patch는 단기적 해결\n- ✅ 업스트림 방향에 맞춰 재설계가 장기적으로 유리\n\n**제 접근 방식:**\n\n**1단계: 영향도 분석 (1-2일)**\n- 현재 메트릭 수집 방식 정리\n- 새 Telemetry v2 (Wasm Extensions) 기능 비교\n- Migration path 공식 문서 검토\n- 팀의 운영 역량 평가\n\n**2단계: 빠른 POC (1주)**\n- **Option A**: Istio Telemetry v2 (EnvoyFilter + Wasm)\n  - 장점: 공식 지원, 커뮤니티 활발\n  - 단점: 새로운 설정 방식 학습 필요\n  \n- **Option B**: OpenTelemetry Collector로 대체\n  - 장점: 표준화, 유연성, 제 전문 분야\n  - 단점: Istio 통합 설정 필요\n  \n- **Option C**: Envoy 직접 수정\n  - 장점: 기존 방식 유지\n  - 단점: 업스트림 diverge, 유지보수 부담\n\n**3단계: 의사결정 (데이터 기반)**\n```\n평가 기준:\n- 마이그레이션 소요 시간\n- 장기 유지보수 비용\n- 팀 학습 곡선\n- 기능 손실 여부\n```\n\n**4단계: 단계적 적용**\n- Canary 배포: 비중요 서비스부터\n- A/B 테스트: 기존 vs 새 방식 메트릭 비교\n- Runbook 작성: 롤백 절차 명확화\n\n**제 추천 (OpenTelemetry 기반):**\n\n```yaml\n# Istio → OTel Collector 통합\napiVersion: install.istio.io/v1alpha1\nkind: IstioOperator\nspec:\n  meshConfig:\n    extensionProviders:\n    - name: otel\n      opentelemetry:\n        service: otel-collector.observability.svc\n        port: 4317\n```\n\n**장점:**\n- ✅ **벤더 중립**: Istio 버전 업그레이드에 덜 민감\n- ✅ **유연성**: 백엔드 자유롭게 변경 (Prometheus, Jaeger, 상용 APM)\n- ✅ **표준**: CNCF 졸업 프로젝트, 장기 지원 보장\n- ✅ **제 전문성**: OpenTelemetry Contributor로 즉시 기여 가능\n\n**토스 상황에서의 제 기여:**\n- OpenTelemetry 기반 솔루션 제안 및 POC 리드\n- 기존 Telemetry v1 데이터와 호환되는 마이그레이션 경로 설계\n- 팀 교육 및 Runbook 작성\n- 단계적 롤아웃으로 리스크 최소화\n\n**핵심 철학:**\n> "오픈소스를 고칠지, 대체할지, 기다릴지는 **장기 유지보수 비용**과 **팀 역량**으로 결정한다."',
  },

  // 추가 토스 특화 질문
  {
    id: 113,
    category1: "Infrastructure",
    category2: "Istio",
    question:
      "Istio Proxy Protocol을 사용하여 mTLS 환경에서 클라이언트 IP를 보존하는 방법을 설명해주세요.",
    answer:
      '**문제 상황 (토스 사례):**\nmTLS 통신은 암호화되어 있어 L7 프록시 장비가 요청자의 실제 IP를 볼 수 없습니다. 이는 보안 감사, 로깅, IP 기반 접근 제어에 문제를 일으킵니다.\n\n**Proxy Protocol 원리:**\n암호화 전에 TCP 커넥션 시작 부분에 클라이언트 IP 정보를 헤더로 추가하는 프로토콜입니다.\n\n```\nPROXY TCP4 192.0.2.1 198.51.100.1 54321 443\\r\\n\n<TLS handshake starts>\n```\n\n**Istio에서 구성:**\n\n**1. Gateway에 Proxy Protocol 수신 설정**\n```yaml\napiVersion: networking.istio.io/v1beta1\nkind: Gateway\nmetadata:\n  name: external-gateway\nspec:\n  selector:\n    istio: ingressgateway\n  servers:\n  - port:\n      number: 443\n      name: https\n      protocol: HTTPS\n    tls:\n      mode: SIMPLE\n    hosts:\n    - "*"\n---\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: istio-custom-bootstrap\ndata:\n  custom_bootstrap.yaml: |\n    static_resources:\n      listeners:\n      - name: proxy_proto_listener\n        address:\n          socket_address:\n            address: 0.0.0.0\n            port_value: 443\n        listener_filters:\n        - name: envoy.filters.listener.proxy_protocol\n          typed_config:\n            "@type": type.googleapis.com/envoy.extensions.filters.listener.proxy_protocol.v3.ProxyProtocol\n```\n\n**2. 앞단 Load Balancer 설정 (AWS NLB 예시)**\n```yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: istio-ingressgateway\n  annotations:\n    service.beta.kubernetes.io/aws-load-balancer-proxy-protocol: "*"\nspec:\n  type: LoadBalancer\n  ports:\n  - port: 443\n    targetPort: 443\n```\n\n**3. EnvoyFilter로 X-Forwarded-For 헤더 설정**\n```yaml\napiVersion: networking.istio.io/v1alpha3\nkind: EnvoyFilter\nmetadata:\n  name: preserve-client-ip\nspec:\n  configPatches:\n  - applyTo: NETWORK_FILTER\n    match:\n      listener:\n        filterChain:\n          filter:\n            name: envoy.filters.network.http_connection_manager\n    patch:\n      operation: MERGE\n      value:\n        typed_config:\n          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager\n          use_remote_address: true\n          xff_num_trusted_hops: 1\n```\n\n**결과:**\n- 애플리케이션은 `X-Forwarded-For` 헤더로 실제 클라이언트 IP 획득\n- 보안 로그에 정확한 접속 IP 기록\n- IP 기반 Rate Limiting/Geoblocking 가능\n\n**제 경험과의 연결:**\n- **AWS Advanced Networking Specialty**: Proxy Protocol, X-Forwarded-For 원리 깊이 이해\n- **APISIX Gateway**: X-Real-IP 헤더 처리 구현 경험\n- **Site-to-Site VPN**: 네트워크 레벨 IP 라우팅 설정 경험\n\n**토스 환경 적용:**\n토스는 계열사, 마이데이터 외부 기관과의 mTLS 통신에서 Proxy Protocol로 IP 보존 문제를 해결했습니다. 이는 금융 규제의 접속 로그 요구사항 준수에 필수적입니다.',
  },

  // 오픈소스 기여 및 수정
  {
    id: 114,
    category1: "Infrastructure",
    category2: "OpenSource",
    question:
      "토스 JD에서 강조하는 '오픈소스를 읽고, 필요하다면 직접 수정해본 경험'에 대해 설명해주세요.",
    answer:
      "**오픈소스 기여가 필수인 이유:**\\n\\n" +
      "DevOps에서 다루는 시스템은 복잡한 오픈소스 조합입니다. 프로덕션 환경에서는 공식 문서에 없는 엣지 케이스나 버그를 마주하게 되고, 이때 오픈소스를 직접 수정할 수 있는 역량이 차별화 요소입니다.\\n\\n" +
      "**제 OpenTelemetry 기여 사례:**\\n\\n" +
      "**1. AWS SDK Context Propagation Bug 수정:**\\n" +
      "```go\\n" +
      "// 문제: AWS SDK 호출 시 trace context 손실\\n" +
      "// 기여한 패치\\n" +
      "func (t *awsTracer) Start(ctx context.Context, spanName string) (context.Context, trace.Span) {\\n" +
      "    // AWS SDK의 context.Value 호환성 보장\\n" +
      "    if awsCtx, ok := ctx.(awscontext.Context); ok {\\n" +
      "        ctx = awscontext.BackgroundContext()\\n" +
      "        // trace context 수동 전파\\n" +
      "    }\\n" +
      "    return t.tracer.Start(ctx, spanName)\\n" +
      "}\\n" +
      "```\\n\\n" +
      "**2. Container Environment Detection 개선:**\\n" +
      "컨테이너 런타임 감지 로직 개선으로 Kubernetes 환경에서 더 정확한 서비스 식별 가능하게 만들었습니다.\\n\\n" +
      "**오픈소스 수정 프로세스:**\\n\\n" +
      "**1단계: 문제 재현**\\n" +
      "- 로컬 환경에서 최소 재현 케이스 작성\\n" +
      "- Issue에 재현 방법과 기대 동작 명확히 기술\\n" +
      "- 커뮤니티 피드백 수렴\\n\\n" +
      "**2단계: 코드 분석**\\n" +
      "- 관련 모듈의 아키텍처 파악\\n" +
      "- 테스트 케이스 분석으로 의도한 동작 이해\\n" +
      "- 수정 시 다른 부분에 미치는 영향 검토\\n\\n" +
      "**3단계: 패치 개발**\\n" +
      "- 기존 코드 스타일 준수\\n" +
      "- 충분한 테스트 케이스 작성\\n" +
      "- 문서 업데이트 (필요 시)\\n\\n" +
      "**4단계: 커뮤니티 기여**\\n" +
      "- PR 작성 시 변경 이유와 영향 범위 명확히 설명\\n" +
      "- 리뷰어 피드백에 적극적으로 대응\\n" +
      "- 병합 후 관련 이슈들 follow-up\\n\\n" +
      "**토스에서 기대되는 기여:**\\n\\n" +
      "- **Istio Telemetry 개선**: 토스 특화 메트릭 요구사항 반영\\n" +
      "- **Kubernetes Networking**: 멀티 클러스터 환경 최적화\\n" +
      "- **Observability 도구**: 금융권 컴플라이언스 요구사항 지원\\n\\n" +
      "**핵심 역량:**\\n" +
      "단순히 오픈소스를 '사용'하는 것을 넘어 '개선'하고 '확장'할 수 있는 엔지니어가 되어, 토스의 기술적 차별화에 기여하고 싶습니다.",
  },

  // 자동화 및 툴 개발
  {
    id: 115,
    category1: "Infrastructure",
    category2: "Automation",
    question:
      "개발자 경험 개선을 위해 어떤 자동화나 툴을 만들어본 경험이 있나요?",
    answer:
      "**개발자 경험(DevEx) 개선이 DevOps의 핵심 가치라고 생각합니다. 실제 구축한 자동화 툴들을 소개하겠습니다.**\\n\\n" +
      "**1. 개발자 샌드박스 환경 자동화**\\n\\n" +
      "**문제:**\\n" +
      "개발자들이 새 기능 테스트하려면 인프라팀에 환경 생성을 요청해야 했고, 수동 설정으로 3-4시간 소요\\n\\n" +
      "**해결:**\\n" +
      "Terraform 모듈로 개발자 셀프서비스 환경 구축\\n" +
      "```bash\\n" +
      "# 개발자가 직접 실행\\n" +
      "./create-sandbox.sh --branch feature/new-payment --duration 24h\\n" +
      "\\n" +
      "# 자동 생성되는 것들:\\n" +
      "# 1. 격리된 VPC + Subnets\\n" +
      "# 2. ECS Task 정의 (해당 브랜치 이미지)\\n" +
      "# 3. RDS 스냅샷 기반 테스트DB\\n" +
      "# 4. Redis 인스턴스\\n" +
      "# 5. 24시간 후 자동 정리\\n" +
      "```\\n" +
      "**결과:** 환경 생성 시간 80% 단축, 개발자 만족도 크게 향상\\n\\n" +
      "**2. CI/CD 파이프라인 최적화**\\n\\n" +
      "**문제:**\\n" +
      "기존 파이프라인이 2시간이나 걸려 개발자들이 피드백을 늦게 받음\\n\\n" +
      "**해결:**\\n" +
      "CloudFormation으로 파이프라인 재설계\\n" +
      "- 병렬 빌드: Frontend + Backend 동시 진행\\n" +
      "- Docker 이미지 레이어 캐싱\\n" +
      "- 테스트 병렬화: Unit + Integration 분리 실행\\n" +
      "- 조건부 배포: 변경된 서비스만 배포\\n\\n" +
      "**결과:** 배포 시간 2시간 → 12분 (90% 개선)\\n\\n" +
      "**3. Observability 민주화 도구**\\n\\n" +
      "**문제:**\\n" +
      "개발자들이 서비스 상태 확인하려면 DevOps 팀에 문의해야 함\\n\\n" +
      "**해결:**\\n" +
      "셀프서비스 디버깅 툴킷 구축\\n" +
      "```python\\n" +
      "# Slack Bot 명령어\\n" +
      "@devops-bot thread-dump user-service pod-abc123\\n" +
      "@devops-bot memory-profile payment-service --duration 30s\\n" +
      "@devops-bot trace-lookup trace-id-xyz\\n" +
      "```\\n" +
      "- Grafana 개인 대시보드 템플릿\\n" +
      "- JVM 프로파일링 원클릭 실행\\n" +
      "- 로그 검색 GUI (ELK 스택 래핑)\\n\\n" +
      "**4. 데이터 파이프라인 자동화**\\n\\n" +
      "**문제:**\\n" +
      "기획팀의 주간 보고서 작성을 위해 엔지니어가 수동 SQL 쿼리 작성 (2-3일 소요)\\n\\n" +
      "**해결:**\\n" +
      "AWS Step Functions + Lambda 기반 자가치유 파이프라인\\n" +
      "- Kafka → S3 → Athena 자동 처리\\n" +
      "- 15개 비즈니스 지표 자동 집계\\n" +
      "- Grafana 대시보드 자동 업데이트\\n" +
      "- Slack으로 주간 리포트 자동 발송\\n\\n" +
      "**결과:** 엔지니어링 시간 주간 2-3일 → 0시간\\n\\n" +
      "**5. 장애 대응 자동화**\\n\\n" +
      "```python\\n" +
      "# 자동 치유 봇\\n" +
      "class AutoHealer:\\n" +
      "    def handle_high_cpu(self, service):\\n" +
      "        # 1. 추가 인스턴스 자동 스케일링\\n" +
      "        # 2. Thread dump 자동 수집\\n" +
      "        # 3. Slack 알람 + Grafana 링크\\n" +
      "        # 4. 5분 후에도 지속되면 온콜 호출\\n" +
      "        pass\\n" +
      "```\\n\\n" +
      "**토스에서 기대하는 자동화:**\\n\\n" +
      "- **Istio 설정 자동화**: 새 서비스 온보딩 원클릭\\n" +
      "- **멀티 클러스터 배포**: 계열사 간 일관된 배포 파이프라인\\n" +
      "- **컴플라이언스 자동화**: 금융 규제 요구사항 자동 검증\\n" +
      "- **Chaos Engineering**: 장애 시뮬레이션 자동화\\n\\n" +
      "**핵심 철학:**\\n" +
      '> \\"개발자가 반복하는 것은 모두 자동화할 수 있고, 자동화해야 한다. 그래야 개발자가 비즈니스 로직에 집중할 수 있다.\\"',
  },

  // 멀티 클러스터 운영
  {
    id: 116,
    category1: "Infrastructure",
    category2: "Multi-Cluster",
    question:
      "토스처럼 여러 계열사와 도메인별로 쿠버네티스 클러스터를 운영할 때 어떤 전략이 필요한가요?",
    answer:
      "**멀티 클러스터의 복잡성:**\\n" +
      "토스는 슈퍼앱으로 토스뱅크, 토스증권, 토스페이먼츠 등 여러 계열사와 도메인이 각자의 클러스터를 운영합니다. 이는 단순한 기술 문제가 아니라 '거버넌스'와 '운영 일관성'의 문제입니다.\\n\\n" +
      "**핵심 도전 과제:**\\n\\n" +
      "**1. 표준화 vs 자율성 균형**\\n" +
      "- 각 계열사는 독립적인 비즈니스 요구사항\\n" +
      "- 하지만 운영 효율을 위해서는 표준 스택 필요\\n" +
      "- 토스 해법: 공통 기술 스택(K8s + Istio + Prometheus) + 계열사별 커스터마이징\\n\\n" +
      "**2. 네트워크 분리와 연결**\\n" +
      "```yaml\\n" +
      "# 계열사 간 네트워크 정책 예시\\n" +
      "apiVersion: networking.k8s.io/v1\\n" +
      "kind: NetworkPolicy\\n" +
      "metadata:\\n" +
      "  name: tossbank-isolation\\n" +
      "  namespace: tossbank\\n" +
      "spec:\\n" +
      "  podSelector: {}\\n" +
      "  policyTypes:\\n" +
      "  - Ingress\\n" +
      "  - Egress\\n" +
      "  ingress:\\n" +
      "  # 토스뱅크는 토스 코어 API만 접근 허용\\n" +
      "  - from:\\n" +
      "    - namespaceSelector:\\n" +
      "        matchLabels:\\n" +
      '          affiliate: \\"toss-core\\"\\n' +
      "```\\n\\n" +
      "**3. 중앙 집중식 관리 도구**\\n" +
      "- **ArgoCD Multi-Cluster**: GitOps로 모든 클러스터 배포 관리\\n" +
      "- **Rancher**: 클러스터 lifecycle 관리\\n" +
      "- **Prometheus Federation**: 통합 메트릭 수집\\n\\n" +
      "**제 멀티 환경 운영 경험:**\\n\\n" +
      "**AWS Multi-AZ 설계:**\\n" +
      "```\\n" +
      "┌─────────────┬─────────────┬─────────────┐\\n" +
      "│   AZ-1a     │    AZ-1b    │   AZ-1c     │\\n" +
      "├─────────────┼─────────────┼─────────────┤\\n" +
      "│ ECS Fargate │ ECS Fargate │ ECS Fargate │\\n" +
      "│   (Primary) │  (Secondary)│  (Standby)  │\\n" +
      "├─────────────┼─────────────┼─────────────┤\\n" +
      "│ RDS Primary │ RDS Replica │      -      │\\n" +
      "├─────────────┼─────────────┼─────────────┤\\n" +
      "│ Redis Node1 │ Redis Node2 │ Redis Node3 │\\n" +
      "│ (Sentinel)  │ (Sentinel)  │ (Sentinel)  │\\n" +
      "└─────────────┴─────────────┴─────────────┘\\n" +
      "```\\n\\n" +
      "**Airflow 5개 클러스터 HA 운영:**\\n" +
      "- 각 클러스터마다 독립적인 PostgreSQL 메타데이터\\n" +
      "- Redis 기반 Celery 클러스터링\\n" +
      "- 중앙화된 로그 수집 (ELK Stack)\\n" +
      "- 200+ DAG 관리와 의존성 오케스트레이션\\n\\n" +
      "**토스 환경 적용 전략:**\\n\\n" +
      "**1. GitOps 기반 통합 배포**\\n" +
      "```yaml\\n" +
      "# ArgoCD Application of Applications\\n" +
      "apiVersion: argoproj.io/v1alpha1\\n" +
      "kind: Application\\n" +
      "metadata:\\n" +
      "  name: toss-infrastructure\\n" +
      "spec:\\n" +
      "  source:\\n" +
      "    repoURL: https://github.com/toss/k8s-configs\\n" +
      "    path: environments/\\n" +
      "  destination:\\n" +
      "    server: https://kubernetes.default.svc\\n" +
      "```\\n\\n" +
      "**2. Istio Multi-Primary 연합**\\n" +
      "- 각 클러스터가 독립적으로 서비스 제공\\n" +
      "- Cross-cluster service discovery\\n" +
      "- mTLS로 안전한 계열사 간 통신\\n\\n" +
      "**3. 통합 Observability**\\n" +
      "- Prometheus Federation으로 모든 클러스터 메트릭 중앙화\\n" +
      "- Grafana Multi-Datasource로 통합 대시보드\\n" +
      "- Trace 상관 분석으로 cross-cluster 장애 추적\\n\\n" +
      "**4. 정책 기반 거버넌스**\\n" +
      "- OPA Gatekeeper로 보안 정책 강제\\n" +
      "- Resource Quota로 계열사별 리소스 제한\\n" +
      "- RBAC으로 계열사 간 접근 권한 분리\\n\\n" +
      "**운영 효율성 지표:**\\n" +
      "- 클러스터 간 설정 일관성: 95% 이상\\n" +
      "- 배포 시간: 단일 클러스터와 동일 (병렬 처리)\\n" +
      "- 장애 격리: 한 계열사 문제가 다른 계열사에 영향 0%\\n" +
      "- 운영 인력 효율: 클러스터 개수에 비례하지 않는 선형 증가\\n\\n" +
      "**토스 DevOps 위클리 기여 방향:**\\n" +
      "각 계열사의 운영 노하우를 공유하고, 공통 문제에 대한 표준 솔루션을 만들어 전체 조직의 시너지를 극대화하는 것이 목표입니다.",
  },

  // 금융 규제 대응
  {
    id: 117,
    category1: "Infrastructure",
    category2: "Compliance",
    question:
      "금융권에서 전자금융감독규정 등의 제약사항이 DevOps 업무에 어떤 영향을 미치나요?",
    answer:
      "**금융 규제는 제약이 아니라 '더 높은 보안 목표'입니다.**\\n\\n" +
      "**전자금융감독규정의 핵심 요구사항:**\\n\\n" +
      "**1. 접근 통제 (Access Control)**\\n" +
      "- 모든 시스템 접근에 대한 인증/인가 로그 5년 보관\\n" +
      "- 특권 계정 사용 시 승인 절차 필수\\n" +
      "- 업무 분리: 개발/운영/감사 권한 완전 분리\\n\\n" +
      "**DevOps 구현:**\\n" +
      "```yaml\\n" +
      "# Kubernetes RBAC + 감사 로그\\n" +
      "apiVersion: v1\\n" +
      "kind: ConfigMap\\n" +
      "metadata:\\n" +
      "  name: audit-policy\\n" +
      "data:\\n" +
      "  audit-policy.yaml: |\\n" +
      "    rules:\\n" +
      "    - level: RequestResponse\\n" +
      "      resources:\\n" +
      '      - group: \\"apps\\"\\n' +
      '        resources: [\\"deployments\\", \\"services\\"]\\n' +
      '      namespaces: [\\"production\\"]\\n' +
      "```\\n\\n" +
      "**2. 데이터 보호 (Data Protection)**\\n" +
      "- 개인정보 및 금융정보 암호화 저장/전송 의무\\n" +
      "- 데이터 접근 시 목적 명시 및 로깅\\n" +
      "- 데이터 보관/파기 정책 준수\\n\\n" +
      "**DevOps 구현:**\\n" +
      "- **Istio mTLS**: 모든 서비스 간 통신 암호화\\n" +
      "- **Sealed Secrets**: K8s Secret 암호화 저장\\n" +
      "- **Vault**: 동적 credential 관리\\n" +
      "```yaml\\n" +
      "apiVersion: bitnami.com/v1alpha1\\n" +
      "kind: SealedSecret\\n" +
      "metadata:\\n" +
      "  name: db-credentials\\n" +
      "spec:\\n" +
      "  encryptedData:\\n" +
      "    password: AgBy3i4OJSWK+PiTySYZZA9rO43cGDEQAx...\\n" +
      "```\\n\\n" +
      "**3. 시스템 보안 (System Security)**\\n" +
      "- 보안 패치 적시 적용 (30일 이내)\\n" +
      "- 취약점 스캔 정기 실시\\n" +
      "- 비인가 소프트웨어 설치 차단\\n\\n" +
      "**DevOps 구현:**\\n" +
      "- **Falco**: 런타임 보안 감시\\n" +
      "- **Trivy**: 컨테이너 이미지 취약점 스캔\\n" +
      "- **OPA Gatekeeper**: 정책 기반 보안 강제\\n" +
      "```yaml\\n" +
      "# 보안 정책 예시\\n" +
      "apiVersion: kyverno.io/v1\\n" +
      "kind: ClusterPolicy\\n" +
      "metadata:\\n" +
      "  name: require-pod-security-standards\\n" +
      "spec:\\n" +
      "  validationFailureAction: enforce\\n" +
      "  background: false\\n" +
      "  rules:\\n" +
      "  - name: check-privileged\\n" +
      "    match:\\n" +
      "      resources:\\n" +
      "        kinds:\\n" +
      "        - Pod\\n" +
      "    validate:\\n" +
      '      message: \\"Privileged containers are not allowed\\"\\n' +
      "      pattern:\\n" +
      "        spec:\\n" +
      "          =(securityContext):\\n" +
      '            =(privileged): \\"false\\"\\n' +
      "```\\n\\n" +
      "**4. 장애 대응 (Incident Response)**\\n" +
      "- 보안 사고 시 24시간 내 신고\\n" +
      "- 장애 대응 절차 문서화\\n" +
      "- 복구 계획 정기 테스트\\n\\n" +
      "**실제 적용 사례:**\\n\\n" +
      "**보안 vs 생산성 균형:**\\n" +
      "- **문제**: 프로덕션 접근 시 승인 절차로 장애 대응 지연\\n" +
      "- **해결**: Break-glass 절차 + 사후 감사\\n" +
      "  1. 긴급 시 임시 권한 자동 부여\\n" +
      "  2. 24시간 후 자동 회수\\n" +
      "  3. 모든 액션 로깅 및 사후 리뷰\\n\\n" +
      "**CI/CD 보안 강화:**\\n" +
      "```yaml\\n" +
      "# GitOps + 4-eyes principle\\n" +
      "apiVersion: argoproj.io/v1alpha1\\n" +
      "kind: Application\\n" +
      "metadata:\\n" +
      "  name: production-app\\n" +
      "spec:\\n" +
      "  syncPolicy:\\n" +
      "    manual: {}  # 자동 배포 금지\\n" +
      "    syncOptions:\\n" +
      "    - CreateNamespace=false  # 네임스페이스 생성 금지\\n" +
      "```\\n\\n" +
      "**컴플라이언스 자동화:**\\n" +
      "```python\\n" +
      "# 규제 준수 체크 자동화\\n" +
      "class ComplianceChecker:\\n" +
      "    def check_data_retention(self):\\n" +
      "        # 5년 로그 보관 확인\\n" +
      "        pass\\n" +
      "    \\n" +
      "    def check_access_logs(self):\\n" +
      "        # 접근 로그 무결성 검증\\n" +
      "        pass\\n" +
      "    \\n" +
      "    def check_encryption(self):\\n" +
      "        # 데이터 암호화 상태 확인\\n" +
      "        pass\\n" +
      "```\\n\\n" +
      "**토스의 접근 (블로그 기반):**\\n" +
      '\\"보안엔지니어분들과 최대한 협업하면서 해결하고, 더 편리하고 안전하게 만들방법이 없을지 치열하게 고민하고 개선\\"\\n\\n' +
      "**제 기여 방향:**\\n" +
      "- **DevSecOps 통합**: 보안을 개발 프로세스에 자연스럽게 내재화\\n" +
      "- **자동화된 컴플라이언스**: 수동 체크를 자동화로 대체\\n" +
      "- **개발자 친화적**: 보안 정책이 생산성을 해치지 않도록 UX 개선\\n\\n" +
      "**핵심 철학:**\\n" +
      '> \\"규제는 제약이 아니라 더 견고한 시스템을 만들어가는 가이드라인입니다. DevOps 플랫폼에서 보안을 더 높이기 위한 새로운 목표에 가깝습니다.\\"',
  },

  // EKS 네트워킹 (패킷 흐름)
  {
    id: 118,
    category1: "Infrastructure",
    category2: "EKS-Networking",
    question:
      "EKS 클러스터 API 서버에 내부/외부에서 접근할 때 패킷 흐름과 네트워킹 구성을 설명해주세요.",
    answer:
      "**EKS Cluster Endpoint 접근 방식 3가지:**\n\n" +
      "**1. Public Endpoint Only (기본값)**\n" +
      "- Kubernetes API 서버가 퍼블릭 인터넷에 노출\n" +
      "- CIDR 블록으로 접근 제한 가능 (2025년부터 IPv6 CIDR도 지원)\n" +
      "- VPC 외부에서 `kubectl` 명령 실행 가능\n\n" +
      "**패킷 흐름:**\n" +
      "```\n" +
      "개발자 로컬 PC\n" +
      "  │\n" +
      "  ├─> Internet Gateway\n" +
      "  │\n" +
      "  └─> EKS Public Endpoint (eks.{region}.amazonaws.com)\n" +
      "        │\n" +
      "        └─> EKS Control Plane (AWS 관리 VPC)\n" +
      "```\n\n" +
      "**2. Public + Private Endpoint (하이브리드)**\n" +
      "- **외부 접근**: Public Endpoint 통해 접근 (CIDR 제한)\n" +
      "- **내부 접근**: VPC 내부에서 Private Endpoint 통해 직접 접근\n\n" +
      "**패킷 흐름 (VPC 내부):**\n" +
      "```\n" +
      "EKS Node (Worker)\n" +
      "  │\n" +
      "  ├─> VPC Private Subnet\n" +
      "  │\n" +
      "  └─> ENI (Elastic Network Interface)\n" +
      "        │\n" +
      "        └─> EKS Private Endpoint (10.x.x.x)\n" +
      "              │\n" +
      "              └─> EKS Control Plane (PrivateLink)\n" +
      "```\n" +
      "**핵심:** PrivateLink 사용으로 **VPC 내부 트래픽이 인터넷을 거치지 않음**\n\n" +
      "**3. Private Endpoint Only (최고 보안)**\n" +
      "- Public 접근 완전 차단\n" +
      "- VPN/Direct Connect 통해서만 접근 가능\n" +
      "- **금융권 필수 구성**: 외부 노출 제로\n\n" +
      "**패킷 흐름 (온프레미스 → EKS):**\n" +
      "```\n" +
      "온프레미스 개발자\n" +
      "  │\n" +
      "  ├─> AWS Direct Connect / VPN\n" +
      "  │\n" +
      "  └─> Transit Gateway (Multi-VPC 연결)\n" +
      "        │\n" +
      "        └─> VPC Private Subnet\n" +
      "              │\n" +
      "              └─> EKS Private Endpoint\n" +
      "                    │\n" +
      "                    └─> EKS Control Plane\n" +
      "```\n\n" +
      "**2025년 새 기능: Dual-Stack Endpoint (IPv6 지원)**\n\n" +
      "```yaml\n" +
      "# 새 IPv6 클러스터 엔드포인트\n" +
      "Public Endpoint: eks-cluster.{region}.api.aws\n" +
      "  - IPv4: 54.x.x.x\n" +
      "  - IPv6: 2600:1f18:xxxx::1\n" +
      "\n" +
      "Private Endpoint: {cluster-id}.{region}.eks.amazonaws.com\n" +
      "  - IPv4: 10.x.x.x\n" +
      "  - IPv6: fd00:ec2::xxxx (VPC 내부)\n" +
      "```\n\n" +
      "**IPv6 접근 제어 (2025년 6월 출시):**\n" +
      "```bash\n" +
      "# IPv4 + IPv6 CIDR 둘 다 설정 가능\n" +
      "aws eks update-cluster-config \\\n" +
      "  --name my-cluster \\\n" +
      "  --resources-vpc-config \\\n" +
      "    publicAccessCidrs='203.0.113.0/24,2001:db8::/32'\n" +
      "```\n\n" +
      "**실제 네트워크 구성 예시 (토스 환경 추정):**\n\n" +
      "```yaml\n" +
      "# 금융권 보안 강화 설정\n" +
      "apiVersion: eksctl.io/v1alpha5\n" +
      "kind: ClusterConfig\n" +
      "metadata:\n" +
      "  name: toss-prod-cluster\n" +
      "  region: ap-northeast-2\n" +
      "\n" +
      "vpc:\n" +
      "  clusterEndpoints:\n" +
      "    publicAccess: false    # Public 접근 완전 차단\n" +
      "    privateAccess: true    # Private만 허용\n" +
      "  # PrivateLink VPC Endpoint 자동 생성\n" +
      "```\n\n" +
      "**보안 심화: Network ACL + Security Group:**\n\n" +
      "```yaml\n" +
      "# Control Plane Security Group\n" +
      "apiVersion: v1\n" +
      "kind: SecurityGroup\n" +
      "spec:\n" +
      "  ingress:\n" +
      "    - protocol: tcp\n" +
      "      fromPort: 443\n" +
      "      toPort: 443\n" +
      "      # 특정 VPN Gateway IP만 허용\n" +
      "      cidrBlocks: ['10.0.0.0/8']  # 내부망만\n" +
      "```\n\n" +
      "**제 경험과 AWS Networking Specialty 지식:**\n\n" +
      "**1. VPC PrivateLink 아키텍처 이해:**\n" +
      "- AWS Advanced Networking Specialty 자격증으로 PrivateLink 내부 동작 원리 숙지\n" +
      "- ENI, Route Table, DNS resolution 흐름 완벽 이해\n\n" +
      "**2. Site-to-Site VPN 구축 경험:**\n" +
      "- 온프레미스와 AWS 간 IPsec VPN 터널 구성\n" +
      "- BGP 라우팅으로 동적 경로 전파\n" +
      "- 이 경험이 EKS Private Endpoint 접근에 직접 적용\n\n" +
      "**3. Multi-AZ HA 설계:**\n" +
      "```\n" +
      "┌─────────────────────────────────────────┐\n" +
      "│          EKS Control Plane              │\n" +
      "│         (AWS Managed VPC)               │\n" +
      "└─────────────────────────────────────────┘\n" +
      "         │              │              │\n" +
      "    PrivateLink    PrivateLink    PrivateLink\n" +
      "         │              │              │\n" +
      "┌────────┴───────┬──────┴───────┬──────┴────────┐\n" +
      "│   AZ-1a        │    AZ-1b     │    AZ-1c      │\n" +
      "│  ENI (Private) │ ENI (Private)│ ENI (Private) │\n" +
      "│  10.0.1.5      │ 10.0.2.5     │ 10.0.3.5      │\n" +
      "└────────────────┴──────────────┴───────────────┘\n" +
      "```\n" +
      "각 AZ에 ENI 배포로 고가용성 보장\n\n" +
      "**토스 환경 적용 포인트:**\n\n" +
      "**1. 계열사 간 VPC Peering + Private Endpoint:**\n" +
      "- 토스뱅크, 토스증권 등 각자의 VPC\n" +
      "- EKS Private Endpoint를 VPC Peering으로 공유\n" +
      "- Transit Gateway로 중앙 집중식 라우팅\n\n" +
      "**2. 금융 규제 준수:**\n" +
      "- Public Endpoint 완전 비활성화\n" +
      "- 모든 API 호출이 내부망 통과 (감사 로그)\n" +
      "- Network ACL로 계층적 방어\n\n" +
      "**3. 하이브리드 클라우드 (Hybrid Nodes):**\n" +
      "- 2024년 12월 출시: EKS Hybrid Nodes\n" +
      "- 온프레미스 서버를 EKS 클러스터 노드로 등록\n" +
      "- Private Endpoint 통해 Control Plane 접근\n\n" +
      "**핵심 요약:**\n" +
      "> **금융권은 Private Endpoint Only + Direct Connect 구성이 표준**\n" +
      "> **제 AWS Networking Specialty와 VPN 구축 경험이 직접 활용 가능**\n" +
      "> **2025년 IPv6 지원으로 더 유연한 네트워킹 구성 가능**",
  },
];
