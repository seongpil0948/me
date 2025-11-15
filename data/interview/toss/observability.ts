import type { InterviewQuestion } from "@/types/portfolio";

/**
 * Observability 관련 질문 (ID 110-112)
 * - 금융권 Observability 특수성
 * - OpenTelemetry + Istio 통합
 * - Istio Telemetry v1 deprecation 대응
 */
export const tossObservabilityQuestions: InterviewQuestion[] = [
  {
    id: 110,
    category1: "Infrastructure",
    category2: "Observability",
    question: "금융권에서 Observability가 일반 서비스와 다른 점은 무엇인가요?",
    answer:
      "금융권 Observability는 첫째 규제 준수를 위해 전자금융감독규정에 따라 모든 거래 로그를 최소 5년 보관하고, 누가 언제 무엇을 했는지 불변 기록으로 감사 추적하며, 개인정보는 마스킹과 암호화 저장이 필수입니다. 둘째, 금융 거래 실패는 비즈니스 직접 손실이므로 장애 허용도가 Zero이며, MTTI와 MTTR을 몇 분이 아닌 몇 초 단위로 목표하고 장애 발생 전 징후를 포착하는 Proactive 감지가 필수입니다. 셋째, 송금 $100이 여러 서비스를 거쳐 완료 또는 실패하는 전체 흐름을 추적하는 Transaction Tracing, 여러 마이크로서비스에 걸친 원자성 보장을 확인하는 분산 트랜잭션, 실패 시 보상 트랜잭션 전파 과정을 가시화하는 롤백 추적이 필요합니다. 넷째, 99.99% SLA의 거래 성공률 모니터링, p99 latency 200ms 미만 같은 엄격한 처리 지연 목표, 이상 패턴 실시간 알람으로 사기 탐지 연동이 필요합니다.\n\n토스는 개발자가 빠르게 근본 원인을 파악할 수 있는 직관적 메트릭 도출, 중복 호출과 성능 저하를 자동 발견하는 자동화된 탐지, Thread dump와 profiling을 개발자가 직접 사용하는 GUI 툴을 제공합니다.\n\nTheShop에서는 OpenTelemetry로 주문에서 결제, 재고, 배송까지 전체 트랜잭션을 추적하여 MTTI를 99% 감소시켰고 (18시간 → 10분), Grafana BI 대시보드로 전환율과 리텐션을 가시화하고 인프라 메트릭과 비즈니스 KPI의 상관관계를 분석했습니다. AWS Glue와 Athena Data Lake로 로그 보존을 7일에서 10년으로 142배 확장했고, Parquet 압축으로 비용 효율적인 장기 보관과 S3 Glacier 불변 저장으로 규제에 대응했습니다.\n\n금융권 적용 시 주민번호와 계좌번호 자동 마스킹, 변경 불가능한 별도 저장소의 감사 로그 분리, 거래 실패율 임계값 초과 시 즉시 대응하는 실시간 알람, 규제 기관 제출용 자동 생성 Compliance 리포트가 추가로 필요합니다.",
  },
  {
    id: 111,
    category1: "Infrastructure",
    category2: "Observability",
    question:
      "OpenTelemetry와 Istio를 함께 사용할 때의 장점과 통합 방법을 설명해주세요.",
    answer:
      "OpenTelemetry와 Istio는 완전한 분산 추적에서 시너지를 발휘합니다. Istio는 서비스 메쉬 레벨에서 자동 트레이스를 생성하고, OpenTelemetry는 애플리케이션 레벨에서 상세 추적하며, 결합하면 네트워크와 비즈니스 로직의 end-to-end 가시성을 얻습니다. Context Propagation에서 Istio Envoy가 HTTP 헤더로 Trace Context를 자동 전파하고, OpenTelemetry SDK가 컨텍스트를 이어받아 애플리케이션 span을 생성하여 전체 요청 흐름이 하나의 Trace ID로 연결됩니다. Istio는 서비스 간 통신 메트릭인 latency, error rate, RPS를, OpenTelemetry는 주문 수와 결제 성공률 같은 비즈니스 메트릭을 수집하여 동일한 백엔드인 Prometheus, Grafana, Tempo로 통합합니다.\n\n통합 구현은 첫째 Istio 설정에서 tracing의 zipkin address를 otel-collector:9411로 지정하고 sampling을 100.0으로 설정합니다. 둘째, OpenTelemetry Collector를 Sidecar 또는 DaemonSet으로 배포하여 Istio traces와 App traces를 수집하고, zipkin receiver를 0.0.0.0:9411로, otlp receiver를 grpc/http 프로토콜로 설정하며, prometheus와 jaeger exporter를 14250 포트로 설정합니다. 셋째, 애플리케이션 SDK 통합에서 Python의 경우 FlaskInstrumentor로 Istio가 전파한 Trace Context를 자동 인식하고, tracer.start_as_current_span으로 커스텀 Span을 추가합니다. 넷째, Grafana 통합 대시보드에서 Tempo로 분산 트레이싱을 시각화하고, Prometheus로 Istio와 App 메트릭을, Loki로 Trace ID 링크된 로그를 통합합니다.\n\n토스는 Istio로 서비스 메쉬 자동 트레이싱하고 애플리케이션은 OpenTelemetry SDK로 비즈니스 로직을 추적하여 결제와 송금 등 핵심 트랜잭션의 전체 흐름을 가시화합니다. TheShop에서는 OpenTelemetry Collector 12대 서버를 구성하고 AWS와 컨테이너 이슈를 해결하기 위해 Custom Exporter를 Go로 개발했으며, Grafana, Prometheus, Tempo를 통합하여 3TB 월간 추적 데이터를 처리하고 MTTI를 99% 감소시켰습니다. 토스 입사 시 OpenTelemetry 전문성으로 즉시 기여 가능하고, Istio 통합은 공식 문서로 빠르게 학습하며, 이미 구축된 토스 observability stack에 최적화된 추가 기능을 제안할 수 있습니다.",
  },
  {
    id: 112,
    category1: "Infrastructure",
    category2: "Observability",
    question:
      "Istio Telemetry v1이 deprecate된 후 토스가 어떻게 대응했는지, 비슷한 상황에서 당신은 어떻게 할 건가요?",
    answer:
      "토스는 Istio 1.7부터 Telemetry v1 Mixer가 제거되어 기존 메트릭과 로그 수집 방식을 더 이상 사용할 수 없게 되자 수백 개 서비스의 모니터링 중단 리스크에 직면했습니다. 초기에는 Envoy를 직접 빌드하여 기존 방식을 유지하려 했으나 복잡도가 증가하고 유지보수 부담이 커졌습니다. 최종적으로 새로운 컴포넌트를 개발했고, 회고에서 더 빠른 판단으로 새 컴포넌트를 만들었으면 좋았을 것이라고 했습니다. 핵심 교훈은 오픈소스 fork와 patch는 단기적 해결이고, 업스트림 방향에 맞춰 재설계하는 것이 장기적으로 유리하다는 것입니다.\n\n제 접근 방식은 1단계로 1-2일간 영향도 분석을 하여 현재 메트릭 수집 방식을 정리하고, 새 Telemetry v2 Wasm Extensions 기능과 비교하며, Migration path 공식 문서를 검토하고, 팀의 운영 역량을 평가합니다. 2단계로 1주간 빠른 POC를 진행하여 Option A는 Istio Telemetry v2 EnvoyFilter와 Wasm로 공식 지원과 활발한 커뮤니티가 장점이지만 새로운 설정 방식 학습이 필요하고, Option B는 OpenTelemetry Collector로 대체하여 표준화와 유연성, 제 전문 분야가 장점이지만 Istio 통합 설정이 필요하며, Option C는 Envoy를 직접 수정하여 기존 방식을 유지할 수 있지만 업스트림과 diverge하고 유지보수 부담이 큰 것을 비교합니다. 3단계로 데이터 기반 의사결정을 위해 마이그레이션 소요 시간, 장기 유지보수 비용, 팀 학습 곡선, 기능 손실 여부를 평가 기준으로 삼습니다. 4단계로 단계적 적용을 위해 비중요 서비스부터 Canary 배포하고, 기존 방식과 새 방식의 메트릭을 A/B 테스트로 비교하며, Runbook을 작성하여 롤백 절차를 명확화합니다.\n\n제가 추천하는 OpenTelemetry 기반 솔루션은 IstioOperator의 meshConfig에서 extensionProviders로 otel을 지정하고 opentelemetry service를 otel-collector.observability.svc의 4317 포트로 설정합니다. 장점은 Istio 버전 업그레이드에 덜 민감한 벤더 중립성, Prometheus와 Jaeger, 상용 APM 등 백엔드를 자유롭게 변경하는 유연성, CNCF 졸업 프로젝트로 장기 지원이 보장되는 표준, OpenTelemetry Contributor로 즉시 기여 가능한 제 전문성입니다.\n\n토스 상황에서 OpenTelemetry 기반 솔루션 제안 및 POC를 리드하고, 기존 Telemetry v1 데이터와 호환되는 마이그레이션 경로를 설계하며, 팀 교육과 Runbook을 작성하고, 단계적 롤아웃으로 리스크를 최소화하는 방식으로 기여하겠습니다. 핵심 철학은 오픈소스를 고칠지, 대체할지, 기다릴지는 장기 유지보수 비용과 팀 역량으로 결정한다는 것입니다.",
  },
  {
    id: 119,
    category1: "Infrastructure",
    category2: "Observability",
    question:
      "왜 OpenTelemetry를 그렇게 좋아하나요? 다른 observability 도구와 비교했을 때 특별한 점은?",
    answer:
      "개인적으로 BE/FE/Infra 통틀어 기술력과 성능 모두 중요하지만, 제가 가장 높게 가치를 두는 것은 '통일성'입니다.\n\n" +
      "처음 observability 시스템을 구축할 때 가장 답답했던 부분이 바로 이거였어요. " +
      "Java는 Log4j, Logback을 쓰고, Python은 Logging 모듈, JavaScript는 Winston을 사용하죠. " +
      "언어별로 라이브러리가 다른데, 관측 시스템은 동일해야 한다는 게 모순처럼 느껴졌어요. " +
      "통일된 인터페이스가 없으면 언어마다 다른 설정, 다른 데이터 포맷, 다른 문제 해결 방식을 배워야 하거든요.\n\n" +
      "초반에는 통일을 위해 특정 관측 플랫폼의 SDK를 고려했습니다. Loki, GCP Cloud Trace, AWS X-Ray 같은 것들이요. " +
      "하지만 이 방식은 '벤더 락인' 리스크가 너무 컸어요. " +
      "나중에 Grafana에서 Datadog으로 바꾸고 싶으면 모든 코드를 다시 짜야 하고, 클라우드 마이그레이션 시에도 마찬가지였죠.\n\n" +
      "그때 OpenTelemetry를 발견했고, 이게 제가 찾던 답이었어요.\n\n" +
      "첫째, 진정한 벤더 중립성입니다. Java, Python, Go, JavaScript 모두 동일한 API로 Trace와 Metric을 생성합니다. " +
      "백엔드는 Prometheus든 Datadog이든 Jaeger든 자유롭게 선택할 수 있고, 나중에 바꿔도 애플리케이션 코드는 안 건드려도 돼요.\n\n" +
      "둘째, 모니터링 데이터의 E2E를 완성할 수 있습니다. " +
      "Client → Nginx → Frontend → Backend → Kafka → Batch까지 전체 플로우를 하나의 Trace ID로 추적할 수 있어요. " +
      "이 경험 덕분에 SRE 파트와 소통할 때도 '어디서 병목이 생겼나?'를 데이터로 보여줄 수 있습니다.\n\n" +
      "셋째, CNCF 졸업 프로젝트라는 신뢰감이요. 커뮤니티가 활발하고, Google, Microsoft, Uber 같은 회사들이 적극 기여하고 있어요. " +
      "제 PR도 빠르게 리뷰받고 병합되는 걸 보면서 '이 프로젝트는 오래갈 거구나'라고 확신했습니다.\n\n" +
      "넷째, Spring, Hibernate, Gradle, Jenkins, Kafka, Grafana, Redis 환경을 모두 OTEL로 통합한 경험이 있어요. " +
      "각 스택마다 auto-instrumentation이 잘 되어 있어서, 코드 수정 없이 JVM agent만 붙이면 기본 메트릭이 자동 수집되더라고요. " +
      "필요한 부분만 manual instrumentation으로 비즈니스 메트릭을 추가하는 식으로 점진적으로 개선할 수 있었습니다.\n\n" +
      "토스는 마이크로서비스가 수백 개 이상이고, 여러 언어와 프레임워크가 섞여 있을 텐데, " +
      "OTEL의 통일된 인터페이스가 엄청난 가치를 발휘할 것 같아요. " +
      "새로운 서비스를 추가할 때도 동일한 방식으로 observability를 구축할 수 있고, " +
      "나중에 백엔드를 바꾸고 싶을 때도 애플리케이션 코드는 안 건드려도 되니까요.\n\n" +
      "핵심은, OTEL은 단순한 도구가 아니라 'observability의 표준'이라는 점입니다. " +
      "이 표준 위에서 토스만의 커스텀 메트릭과 대시보드를 만들 수 있고, 장기적으로 유지보수 비용을 크게 줄일 수 있을 거예요.",
  },
];
