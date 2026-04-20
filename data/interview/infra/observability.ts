import type { LocalizedInterviewQuestion } from "@/types/portfolio";

/**
 * Observability & Monitoring 질문들
 * ID: 11, 70, 71, 62, 72, 73, 74, 134, 135, 144, 145, 146, 139,
 *     150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 162
 */
export const infraObservabilityQuestions: LocalizedInterviewQuestion[] = [
  {
    id: 11,
    category1: "Infrastructure",
    category2: "Monitoring",
    question: { ko: "Observability/Monitoring 경험에 대해 설명해주세요." },
    answer: {
      ko:
        "Observability에서 가장 어려웠던 것은 장애가 발생했을 때 '어디서 시작된 문제인지' 찾는 것이었습니다. 로그 18시간 뒤지는 경험은 정말... 이건 엔지니어링이 아니라 운에 맡기는 거더라고요.\n\n" +
        "문제 상황: ₩500B 규모 이커머스 플랫폼에 Legacy Scouter APM만 있었습니다. Java만 지원해서 React, Vue.js, Go 서비스는 완전히 사각지대였죠. 결제 완료율이 갑자기 95%에서 87%로 떨어졌는데, 어느 서비스에서 문제가 시작되었는지 알 수가 없었습니다. 15개 서버에 tail -f로 로그를 열어두고, Ctrl+F로 에러 찾고... 18시간 동안 로그만 봤습니다.\n\n" +
        "OpenTelemetry 아키텍처를 설계하여 12개 서버에 Collector를 배포했습니다. " +
        "OTLP 프로토콜로 traces, metrics, logs를 수집하고, batch processor로 1000개씩 묶어 처리했습니다. " +
        "memory_limiter로 서버당 10GB 제한을 두고, resource processor로 production 네임스페이스를 태그했습니다.\n\n" +
        "분산 트레이싱의 컨텍스트 전파 문제에서 가장 복잡했던 것은 Kafka를 통한 비동기 경계에서 Trace Context 유지였습니다. " +
        "W3C Trace Context를 Kafka Header로 변환하여 Producer에서 주입하고, Consumer에서 복원하는 로직을 구현했습니다. " +
        "이로써 전체 요청 흐름이 하나의 Trace ID로 연결되었습니다.\n\n" +
        "Grafana 대시보드 설계는 RED Method와 USE Method를 기반으로 했습니다. " +
        "Request Rate, Error Rate, Duration을 service별로 추적하고, " +
        "CPU Utilization, Memory Saturation, Disk I/O Saturation을 모니터링했습니다. " +
        "비즈니스 컨텍스트가 포함된 Custom Metrics로 user.segment, product.category, cart.source를 추가하여 " +
        "기술적 메트릭과 비즈니스 KPI를 연결했습니다.\n\n" +
        "Log-Trace Correlation을 Logrus Hook로 구현하여 자동으로 trace_id와 span_id를 로그에 주입했습니다. " +
        "Grafana Explore에서 Loki datasource 설정으로 Logs-to-Traces 연결을 구현했습니다.\n\n" +
        "OpenTelemetry 오픈소스 기여로 AWS SDK Context Propagation Bug를 수정하고, " +
        "Container Environment Detection을 개선했습니다. " +
        "MTTI를 18시간 수동 로그 분석에서 10분 자동화된 분석으로 단축했습니다.\n\n" +
        "실제 장애 해결 사례로 결제 완료율이 95%에서 87%로 하락했을 때, " +
        "OpenTelemetry 기반 분석으로 Payment service trace에서 에러율 증가를 발견하고, " +
        "Span duration 분석으로 API 응답시간 증가를 확인하며, Database trace에서 Connection pool exhaustion을 발견하여 " +
        "10분 만에 근본 원인을 파악했습니다. 현재 일일 50만 traces, 월 3TB 데이터를 처리하며, " +
        "Self-hosted stack으로 월 200달러 비용으로 DataDog 2000달러 대비 90% 절감했습니다.\n\n" +
        "핵심 교훈은 Observability는 문제를 찾는 도구가 아니라 시스템을 이해하는 렌즈라는 것입니다. " +
        "기술적 메트릭과 비즈니스 컨텍스트의 결합이 진짜 통찰력을 제공합니다.",
      en: "A concise Monitoring answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 70,
    category1: "Infrastructure",
    category2: "Monitoring",
    question: {
      ko: "마이크로서비스 환경에서의 모니터링 전략은 어떻게 접근하습니까?",
    },
    answer: {
      ko:
        "마이크로서비스 모니터링 전략에서 가장 중요한 것은 서비스 간 의존성 추적과 장애 전파 경로 파악입니다.\n\n" +
        "20개 마이크로서비스 환경에서 각 서비스가 독립적으로 메트릭을 생성하다 보니 전체 시스템 상태 파악이 어려웠습니다. " +
        "Service Map을 구축하여 서비스 간 호출 관계를 시각화하고, 각 edge의 성공률과 지연시간을 표시했습니다.\n\n" +
        "SLI/SLO 기반 모니터링으로 전환했습니다. 각 서비스별로 Availability 99.9%, Latency P95 < 200ms, " +
        "Error Rate < 0.1% 목표를 설정하고, Error Budget 소진율을 추적했습니다. " +
        "서비스별 SLO 달성률을 대시보드로 시각화하여 팀별 성능 책임을 명확히 했습니다.\n\n" +
        "Circuit Breaker 메트릭 모니터링이 핵심이었습니다. 각 서비스의 circuit breaker 상태변화를 추적하고, " +
        "OPEN 상태로 전환되는 패턴을 분석하여 upstream 서비스의 문제를 조기 감지했습니다. " +
        "Bulkhead 패턴으로 격리된 스레드 풀의 사용률도 모니터링하여 리소스 고갈을 방지했습니다.\n\n" +
        "Correlation ID 기반 추적으로 사용자 요청이 여러 서비스를 거치는 전체 여정을 추적했습니다. " +
        "특히 비동기 처리에서 Kafka를 통한 이벤트 전파도 correlation ID로 연결하여 " +
        "주문 → 결제 → 재고 → 배송의 전체 비즈니스 플로우를 하나의 trace로 볼 수 있게 했습니다.\n\n" +
        "Alert Fatigue 해결을 위해 계층화된 알림 전략을 구현했습니다. " +
        "P0는 비즈니스 크리티컬한 서비스 다운, P1은 SLO 위반, P2는 리소스 임계치 초과로 분류하고, " +
        "P0만 즉시 전화, P1은 Slack, P2는 이메일로 차등 알림했습니다.\n\n" +
        "Chaos Engineering과 연동하여 의도적으로 서비스를 중단시키고 " +
        "모니터링 시스템이 얼마나 빠르게 감지하는지 측정했습니다. " +
        "MTTD를 30초 이내로 목표하고, 실제 장애와 chaos test 결과를 비교하여 모니터링 사각지대를 발견했습니다.\n\n" +
        "결과적으로 서비스별 가용성을 99.95%로 향상시키고, 평균 장애 복구시간을 4시간에서 15분으로 단축했습니다.",
      en: "A concise Monitoring answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 71,
    category1: "Infrastructure",
    category2: "Distributed Tracing",
    question: { ko: "분산 트레이싱 구현에서 어떤 어려움을 겪었습니까?" },
    answer: {
      ko:
        "분산 트레이싱 구현에서 가장 큰 도전은 Context Propagation의 일관성과 성능 오버헤드의 균형이었습니다.\n\n" +
        "처음에는 각 언어별로 다른 tracing 라이브러리를 사용했는데, Java는 Jaeger, Go는 Zipkin, JavaScript는 자체 구현으로 " +
        "trace context 형식이 달라 연결이 끊어지는 문제가 있었습니다. " +
        "OpenTelemetry로 표준화하여 W3C Trace Context 헤더로 통일했습니다.\n\n" +
        "가장 복잡했던 부분은 비동기 메시징에서의 context 전파였습니다. " +
        "HTTP 요청은 헤더로 쉽게 전파되지만, Kafka 메시지의 경우 producer에서 trace context를 " +
        "메시지 헤더에 직렬화하고 consumer에서 역직렬화하는 로직을 구현해야 했습니다. " +
        "특히 batch processing에서 여러 메시지가 한 번에 처리될 때 각각의 trace를 분리하는 것이 까다로웠습니다.\n\n" +
        "성능 오버헤드 문제도 심각했습니다. 초기에 100% 샘플링을 적용했더니 " +
        "서비스 응답시간이 15% 증가했습니다. 적응형 샘플링을 구현하여 정상 상황에서는 1%, " +
        "에러 발생 시에는 100% 샘플링하도록 조정했습니다. " +
        "또한 head-based sampling 대신 tail-based sampling으로 전환하여 " +
        "중요한 trace만 선별적으로 저장했습니다.\n\n" +
        "데이터 볼륨 폭발도 문제였습니다. 하루 수백만 개의 span이 생성되어 " +
        "스토리지 비용이 급증했습니다. span의 생명주기를 정의하여 " +
        "hot data 7일, warm data 30일, cold data 90일로 계층화하고, " +
        "압축과 aggregation으로 장기 보관 비용을 줄였습니다.\n\n" +
        "Clock Skew 문제도 해결해야 했습니다. 여러 서버의 시계가 동기화되지 않아 " +
        "span의 시간 순서가 뒤바뀌는 경우가 있었습니다. " +
        "NTP 동기화를 강화하고, span 처리 시 논리적 시간 순서를 고려하는 로직을 추가했습니다.\n\n" +
        "가장 어려웠던 것은 레거시 시스템과의 통합이었습니다. " +
        "10년 된 Spring 2.x 시스템에서는 OpenTelemetry auto-instrumentation이 동작하지 않아 " +
        "수동으로 trace context를 전파하는 코드를 추가해야 했습니다.\n\n" +
        "결과적으로 end-to-end 트레이싱을 달성하여 20개 서비스를 거치는 요청의 " +
        "전체 흐름을 하나의 waterfall diagram으로 볼 수 있게 되었고, " +
        "평균 장애 분석 시간을 3시간에서 10분으로 단축했습니다.",
      en: "A concise Distributed Tracing answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 62,
    category1: "Infrastructure",
    category2: "Time-Series Database",
    question: {
      ko: "InfluxDB 같은 시계열 데이터베이스 경험에 대해 설명해주세요.",
    },
    answer: {
      ko:
        "InfluxDB 운영에서 가장 중요한 것은 데이터 보존 정책과 쿼리 성능 최적화입니다.\n\n" +
        "고속 메트릭 수집을 위해 InfluxDB를 선택했습니다. 초당 400개 이벤트를 처리하는 환경에서 " +
        "1GB 캐시로 hot data를 메모리에 유지하고, query concurrency를 1,024로 설정했습니다. " +
        "7일 retention policy로 오래된 데이터를 자동 삭제하여 성능을 유지했습니다.\n\n" +
        "LZ4 압축을 적용하여 10배 압축률을 달성했습니다. 10GB 원본 데이터가 1GB로 압축되어 " +
        "스토리지 비용을 대폭 절감했습니다. " +
        "압축률과 쿼리 성능을 고려하여 measurement별로 최적화된 압축 알고리즘을 선택했습니다.\n\n" +
        "태그 카디널리티 관리가 가장 까다로웠습니다. " +
        "처음에는 user_id를 tag로 사용했다가 카디널리티가 수백만 개로 폭증하여 쿼리 성능이 급격히 저하되었습니다. " +
        "user_id는 field로 이동하고, service_name, environment, instance처럼 " +
        "카디널리티가 낮은 값만 tag로 사용하도록 재설계했습니다.\n\n" +
        "Continuous Query로 실시간 집계를 구현했습니다. " +
        "1분 단위 raw 데이터를 5분, 1시간, 1일 단위로 자동 집계하여 " +
        "장기간 데이터 조회 시 성능을 향상시켰습니다. " +
        "또한 알림을 위한 threshold 체크도 Continuous Query로 자동화했습니다.\n\n" +
        "Grafana와의 연동에서 쿼리 최적화가 중요했습니다. " +
        "WHERE 절에 시간 범위와 주요 tag를 먼저 지정하고, " +
        "GROUP BY에서 시간 간격을 적절히 조정하여 응답 시간을 단축했습니다. " +
        "대시보드 로딩 시간을 15초에서 2초로 개선했습니다.\n\n" +
        "HA 구성을 위해 3노드 클러스터를 구성하고 replication factor를 2로 설정했습니다. " +
        "Anti-entropy repair로 노드 간 데이터 일관성을 유지했고, " +
        "load balancer로 read/write 트래픽을 분산했습니다.\n\n" +
        "백업 전략으로 매일 밤 snapshot을 생성하고 S3에 저장했습니다. " +
        "incremental backup으로 변경된 shard만 백업하여 시간과 비용을 절감했습니다. " +
        "disaster recovery test를 월 1회 실시하여 RTO 30분, RPO 1시간을 보장했습니다.\n\n" +
        "결과적으로 95% 쿼리가 1초 이내 응답하고, 초당 400개 이벤트 처리에서 " +
        "peak load 시에도 안정적인 성능을 유지했습니다.",
      en: "A concise Time-Series Database answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 72,
    category1: "Infrastructure",
    category2: "Observability",
    question: { ko: "효과적인 알림 전략을 어떻게 구현하습니까?" },
    answer: {
      ko:
        "효과적인 알림 전략의 핵심은 Alert Fatigue 방지와 Actionable Alert 설계입니다.\n\n" +
        "처음에는 모든 임계값 초과에 대해 알림을 설정했더니 하루 500개 이상의 알림이 발생했습니다. " +
        "정작 중요한 알림이 노이즈에 묻혀 놓치는 상황이 반복되었습니다. " +
        "SLI/SLO 기반으로 재설계하여 비즈니스 임팩트가 있는 30개 핵심 알림으로 축소했습니다.\n\n" +
        "계층화된 알림 시스템을 구축했습니다. " +
        "P0는 서비스 완전 다운으로 즉시 전화 알림, P1은 SLO 위반으로 Slack 알림, " +
        "P2는 리소스 임계치로 이메일 알림으로 분류했습니다. " +
        "각 레벨별로 escalation 정책을 설정하여 15분 내 미대응 시 상위 레벨로 자동 전파했습니다.\n\n" +
        "Context-rich Alert를 구현했습니다. 단순히 CPU 사용률 90%라는 정보보다는 " +
        "어떤 서비스에서, 어떤 프로세스가, 언제부터 높아졌는지와 함께 " +
        "관련 Grafana 대시보드 링크, 예상 원인, 1차 대응 방법을 포함했습니다. " +
        "Instruction 기반 AX 구조로 L1 대응의 70%를 자동화했습니다. Runbook을 prompt-friendly한 Instruction으로 전환하고 script + AI agent + skill을 연결해, 알림 발생 시 LLM이 Instruction을 읽고 진단 스크립트를 직접 호출해 권장 조치를 제안하는 방식입니다.\n\n" +
        "Anomaly Detection을 적용하여 정적 임계값의 한계를 극복했습니다. " +
        "주말과 평일, 시간대별로 정상 패턴을 학습하고 예상 범위를 벗어나는 경우 알림을 발생시켰습니다. " +
        "특히 트래픽 패턴이 불규칙한 이벤트 기반 서비스에서 효과적이었습니다.\n\n" +
        "Multi-condition Alert로 false positive를 줄였습니다. " +
        "CPU 높음 AND (응답시간 증가 OR 에러율 증가) 조건으로 설정하여 " +
        "실제 서비스 영향이 있을 때만 알림이 발생하도록 했습니다. " +
        "또한 flapping 방지를 위해 2분 연속 조건 만족 시에만 알림을 보냈습니다.\n\n" +
        "Alert Correlation으로 연관 알림을 그룹화했습니다. " +
        "DB 다운으로 인해 10개 서비스가 동시에 알림을 보내는 경우 " +
        "root cause만 primary alert로 표시하고 나머지는 secondary로 분류했습니다. " +
        "이로써 알림 수를 80% 줄이고 근본 원인 파악을 빨라졌습니다.\n\n" +
        "On-call 로테이션과 통합하여 시간대별, 담당자별 escalation을 자동화했습니다. " +
        "휴가나 병가 시 자동으로 backup 담당자에게 전달되도록 설정했고, " +
        "주말에는 critical alert만 발생하도록 필터링했습니다.\n\n" +
        "Alert Feedback Loop을 구축하여 알림의 정확성을 지속적으로 개선했습니다. " +
        "각 알림에 대한 대응 결과를 추적하고, false positive rate가 높은 알림은 " +
        "임계값 조정이나 조건 변경을 통해 개선했습니다. " +
        "월별 Alert Review 회의에서 팀과 함께 알림 효과성을 평가했습니다.",
      en: "A concise Observability answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 73,
    category1: "Infrastructure",
    category2: "Time-Series Database",
    question: { ko: "시계열 데이터 보존 및 스토리지를 어떻게 최적화하습니까?" },
    answer: {
      ko:
        "시계열 데이터 보존과 스토리지 최적화에서 가장 중요한 것은 데이터 생명주기 관리와 압축 전략입니다.\n\n" +
        "데이터 계층화 전략을 구축했습니다. Hot 데이터는 SSD에 7일간 보관하여 실시간 쿼리 성능을 보장하고, " +
        "Warm 데이터는 HDD에 30일간 보관하여 비용을 절감했습니다. " +
        "Cold 데이터는 S3 Glacier에 1년간 보관하여 장기 추세 분석과 컴플라이언스 요구사항을 충족했습니다.\n\n" +
        "압축 기법으로 스토리지 효율성을 극대화했습니다. " +
        "Parquet 포맷과 GZIP 압축을 조합하여 10:1 압축률을 달성했습니다. " +
        "특히 반복적인 태그 값들은 dictionary encoding으로 추가 압축했고, " +
        "timestamp는 delta encoding으로 저장 공간을 90% 절약했습니다.\n\n" +
        "샘플링 전략으로 데이터 볼륨을 제어했습니다. " +
        "1초 단위 원본 데이터는 1시간 후 1분 단위로 downsampling하고, " +
        "1일 후에는 5분 단위, 1주 후에는 1시간 단위로 집계했습니다. " +
        "Min, Max, Avg, P95를 보존하여 상세도는 줄이면서도 중요한 통계는 유지했습니다.\n\n" +
        "Partitioning으로 쿼리 성능을 최적화했습니다. " +
        "시간 기반 파티셔닝으로 연/월/일/시간 단위로 데이터를 분할하고, " +
        "쿼리 시 필요한 파티션만 스캔하도록 했습니다. " +
        "Partition pruning으로 10TB 스캔을 100GB로 99% 축소했습니다.\n\n" +
        "자동화된 데이터 생명주기를 구현했습니다. " +
        "CRON job으로 매일 밤 오래된 데이터를 다음 tier로 이동시키고, " +
        "retention policy에 따라 만료된 데이터를 자동 삭제했습니다. " +
        "S3 Lifecycle rule과 연동하여 Standard → IA → Glacier → Deep Archive 이동을 자동화했습니다.\n\n" +
        "인덱싱 전략으로 조회 성능을 향상시켰습니다. " +
        "시간 범위와 주요 태그에 대한 복합 인덱스를 생성하고, " +
        "Bloom filter로 존재하지 않는 데이터에 대한 불필요한 스캔을 방지했습니다. " +
        "카디널리티가 높은 필드는 인덱싱에서 제외하여 인덱스 크기를 제어했습니다.\n\n" +
        "백업과 복구 전략을 수립했습니다. " +
        "Hot 데이터는 매시간 incremental backup, Warm 데이터는 매일 full backup을 S3에 저장했습니다. " +
        "Point-in-time recovery를 위해 WAL 로그도 실시간으로 복제했습니다. " +
        "Cross-region replication으로 재해 복구 능력을 강화했습니다.\n\n" +
        "결과적으로 스토리지 비용을 80% 절감하면서도 쿼리 성능은 유지했고, " +
        "데이터 보존 기간을 7일에서 1년으로 확장했습니다.",
      en: "A concise Time-Series Database answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 74,
    category1: "Infrastructure",
    category2: "Observability",
    question: { ko: "SRE 실천 방법에 대해 어떻게 접근하습니까?" },
    answer: {
      ko:
        "SRE 실천에서 가장 중요한 것은 SLI/SLO 기반의 데이터 주도 의사결정과 Error Budget 관리입니다.\n\n" +
        "Service Level Indicator를 정의하는 것부터 시작했습니다. " +
        "각 서비스의 핵심 기능을 분석하여 Availability, Latency, Throughput, Quality의 4개 축으로 " +
        "측정 가능한 지표를 설정했습니다. " +
        "예를 들어 결제 서비스는 99.9% 가용성, P95 응답시간 200ms 이하, 초당 1000건 처리 가능을 목표로 했습니다.\n\n" +
        "Error Budget을 통한 혁신과 안정성의 균형을 구현했습니다. " +
        "월간 0.1%의 에러 예산을 설정하고, 예산 소진율에 따라 배포 정책을 조정했습니다. " +
        "예산의 50% 이상 소진 시 새 기능 배포를 중단하고 안정성 개선에 집중했습니다. " +
        "반대로 예산이 충분할 때는 더 과감한 실험을 허용했습니다.\n\n" +
        "Toil Reduction을 체계적으로 추진했습니다. " +
        "반복적인 운영 작업을 식별하고 자동화 우선순위를 정했습니다. " +
        "서버 프로비저닝, 배포, 모니터링 설정, 알림 대응의 80%를 자동화하여 " +
        "엔지니어가 개발에 집중할 수 있는 시간을 확보했습니다.\n\n" +
        "Postmortem 문화를 정착시켰습니다. " +
        "모든 outage에 대해 blame-free 사후분석을 실시하고, " +
        "근본 원인, 영향 범위, 대응 과정, 개선 방안을 문서화했습니다. " +
        "5 Whys 기법으로 표면적 원인이 아닌 시스템적 문제를 찾아 해결했습니다. " +
        "Postmortem 리뷰를 통해 유사한 장애의 재발을 90% 방지했습니다.\n\n" +
        "Chaos Engineering을 도입하여 시스템 복원력을 검증했습니다. " +
        "의도적으로 서버를 중단시키고, 네트워크를 지연시키며, 의존성을 차단하여 " +
        "시스템이 어떻게 반응하는지 관찰했습니다. " +
        "장애 시뮬레이션을 통해 모니터링 사각지대를 발견하고 복구 절차를 개선했습니다.\n\n" +
        "Capacity Planning을 데이터 기반으로 수행했습니다. " +
        "과거 3개월 트래픽 패턴을 분석하고 계절성, 이벤트 효과를 고려하여 " +
        "향후 6개월 용량 필요량을 예측했습니다. " +
        "Auto Scaling 정책을 세밀하게 조정하여 비용 효율성과 성능을 동시에 확보했습니다.\n\n" +
        "On-call 문화를 개선했습니다. " +
        "Instruction 기반 운영 지식 체계화로 장애 대응 시간을 단축하고, " +
        "escalation 정책으로 적절한 전문가에게 신속하게 연결했습니다. " +
        "On-call 부담을 줄이기 위해 알림 품질을 개선하고 자동 복구 기능을 강화했습니다.\n\n" +
        "결과적으로 시스템 가용성을 99.5%에서 99.9%로 향상시키고, " +
        "평균 복구 시간을 2시간에서 15분으로 단축했으며, " +
        "엔지니어가 운영업무에 사용하는 시간을 50% 줄였습니다.",
      en: "A concise Observability answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 134,
    category1: "Observability",
    category2: "Distributed Tracing",
    question: {
      ko: "10년 이상 된 모놀리식 시스템과 MSA가 혼재된 하이브리드 환경에서 End-to-End 분산 추적을 구현할 때, 레거시 애플리케이션에 트레이스 컨텍스트를 주입하고 전파하기 위해 사용한 구체적인 전략은?",
    },
    answer: {
      ko:
        "하이브리드 환경에서의 분산 추적은 '완벽한 통합'보다는 '실용적인 가시성 확보'가 목표였습니다.\n\n" +
        "당시 상황을 먼저 설명하겠습니다. TheShop의 아키텍처는 크게 세 계층으로 나뉘어 있었습니다. 첫째, 10년 이상 운영된 Oracle + Tomcat 8 + Spring 4 기반의 모놀리식 Core System이 있었고, 둘째, 최근 3년간 개발된 Next.js + Spring Boot 2.7 기반의 MSA 서비스들이 있었으며, 셋째, Kafka + Airflow로 연결된 Batch/Analytics 계층이 있었습니다. 문제는 이 세 계층이 각각 다른 기술 스택과 통신 프로토콜을 사용했다는 거죠.\n\n" +
        "전체 전략을 세 단계로 나눴습니다.\n\n" +
        "첫 번째 단계는 Modern MSA부터 OpenTelemetry 계측을 시작한 것이었습니다. Spring Boot 서비스들은 OpenTelemetry Java Agent 자동 계측으로 쉽게 적용할 수 있었습니다. JVM 옵션에 -javaagent를 추가하고, OTEL_SERVICE_NAME과 OTEL_EXPORTER_OTLP_ENDPOINT만 설정하면 자동으로 HTTP, JDBC, Redis 호출이 trace에 잡혔습니다. Next.js 프론트엔드는 @opentelemetry/sdk-trace-web를 사용해서 브라우저 → Backend 첫 hop부터 Trace ID를 생성하도록 했습니다.\n\n" +
        "두 번째 단계가 가장 까다로웠습니다. Legacy Monolith에 대한 전략이었습니다. Spring 4는 OpenTelemetry Auto-instrumentation이 공식 지원되지 않았고, 소스코드 전체를 수정하는 것도 리스크가 컸습니다. 그래서 '경계에서의 계측(Boundary Instrumentation)' 전략을 선택했습니다.\n\n" +
        "구체적으로는 Servlet Filter를 구현했습니다. LegacyTracingFilter라는 커스텀 필터를 만들어서 HTTP 요청이 레거시 시스템에 들어올 때 W3C Trace Context 헤더(traceparent, tracestate)를 읽어서 ThreadLocal에 저장했습니다. MSA에서 온 요청은 이미 Trace ID가 있으니 그걸 이어받고, 레거시에서 시작된 요청은 새로 Trace ID를 생성했습니다.\n\n" +
        "문제는 레거시 내부 로직은 여전히 사각지대라는 것이었습니다. 수천 개의 메서드를 일일이 계측할 수는 없었기 때문에, 핵심 진입점만 선별적으로 계측했습니다. Database 호출은 DataSource Proxy로 감싸서 SQL 쿼리를 자동으로 span으로 기록했고, 외부 API 호출은 RestTemplate을 커스터마이징해서 Trace Context를 HTTP Header로 전파했습니다. Redis 호출은 Spring Data Redis의 interceptor를 활용했습니다.\n\n" +
        "Logging과의 통합도 중요했습니다. 레거시는 Log4j 1.x를 사용하고 있었는데, MDC(Mapped Diagnostic Context)에 trace_id를 주입하는 방식으로 해결했습니다. 모든 로그 메시지에 [trace_id=xxxxx] 포맷으로 자동 추가되도록 했고, 이를 통해 Loki에서 Trace로 바로 점프할 수 있게 했습니다.\n\n" +
        "세 번째 단계는 Kafka를 통한 비동기 경계 추적이었습니다. 이게 가장 복잡했습니다. 레거시 시스템에서 Kafka Producer로 이벤트를 발행할 때, Trace Context를 메시지 Header에 주입해야 했습니다. KafkaTemplate을 래핑한 TracingKafkaTemplate를 만들어서 send() 호출 시 자동으로 traceparent 헤더를 추가하도록 했습니다.\n\n" +
        "Consumer 쪽에서는 @KafkaListener에 Aspect를 적용했습니다. 메시지를 받을 때 Header에서 Trace Context를 추출해서 새로운 Span을 시작하는 AroundAdvice를 구현했습니다. 이렇게 해서 Kafka를 거쳐도 Trace가 끊기지 않고 연결되었습니다.\n\n" +
        "특히 어려웠던 케이스가 Batch 처리였습니다. Airflow DAG가 Kafka Consumer로 100만 건의 메시지를 polling해서 한 번에 처리하는데, 각 메시지마다 다른 Trace ID가 있었습니다. 이를 Batch Span으로 묶되, 개별 메시지는 Child Span으로 처리하는 hierarchy를 구현했습니다. Python OpenTelemetry API의 start_as_current_span()을 활용했습니다.\n\n" +
        "Frontend → Backend → Legacy → Kafka → Batch의 전체 흐름을 하나의 Trace로 연결하는 데 성공했지만, 몇 가지 제약은 남아있었습니다. 레거시 내부의 세밀한 메서드 호출까지는 추적하지 못했고, P2P 통신이나 FTP 배치 전송 같은 비표준 프로토콜은 수동 계측이 필요했습니다.\n\n" +
        "성능 오버헤드도 신경 썼습니다. Servlet Filter와 Proxy 계층이 추가되면서 초기에는 응답시간이 10ms 증가했습니다. Span 전송을 비동기로 처리하고, Sampling Rate를 10%로 낮춰서 오버헤드를 5ms 이하로 줄였습니다. Critical Path의 에러는 100% 샘플링하되, 성공 케이스는 확률적으로 샘플링했습니다.\n\n" +
        "결과적으로 MTTD가 18시간에서 10분으로 99% 단축되었습니다. 장애 발생 시 어느 계층에서 문제가 시작되었는지 Trace Waterfall Diagram 하나로 바로 파악할 수 있게 되었습니다. 예를 들어, 결제 완료율이 떨어졌을 때 Frontend → MSA는 정상인데 Legacy로 넘어가는 순간 지연이 발생한다는 것을 10분 만에 발견했습니다. 원인은 Legacy의 Connection Pool 고갈이었고요.\n\n" +
        "핵심 교훈은, 완벽한 추적보다 핵심 경로의 가시성 확보가 먼저라는 것입니다. 레거시 모든 코드를 수정할 필요는 없었습니다. 경계 지점만 잘 계측하면 충분한 통찰을 얻을 수 있었습니다. 그리고 점진적 개선이 중요했습니다. 처음부터 완벽을 추구하지 않고, 우선순위 높은 서비스부터 시작해서 3개월에 걸쳐 확장했습니다.",
      en: "A concise Distributed Tracing answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 135,
    category1: "Observability",
    category2: "OpenTelemetry",
    question: {
      ko: "OpenTelemetry Collector의 Pipeline 구조를 설명하고, 프로젝트에서 어떻게 구성했습니까? 12개 프로덕션 서버에 어떤 배포 방식을 사용했고, 3TB 분산 추적 데이터를 어떻게 효율적으로 관리하습니까?",
    },
    answer: {
      ko:
        "OpenTelemetry Collector는 단순한 데이터 파이프라인이 아니라, 관측성 데이터의 '교통 정리 허브'였습니다.\n\n" +
        "Collector Pipeline은 Receivers → Processors → Exporters의 3단계로 구성됩니다. 간단해 보이지만, 각 단계마다 수십 가지 옵션이 있고 조합에 따라 성능과 안정성이 크게 달라졌어요.\n\n" +
        "Receivers 설정을 먼저 설명하겠습니다. 우리 환경에서는 여러 프로토콜을 동시에 받아야 했습니다. OTLP gRPC 4317포트로 Java/Go 서비스의 trace/metrics를, OTLP HTTP 4318포트로 JavaScript SDK 데이터를, Prometheus Receiver 9090포트로 레거시 메트릭을, Loki Receiver로 로그를 수집했습니다. 각 Receiver마다 버퍼 크기와 timeout을 조정했는데, gRPC는 max_recv_msg_size를 32MB로 설정해서 대용량 batch를 받을 수 있게 했습니다.\n\n" +
        "Processors가 핵심이었습니다. 여기서 데이터를 필터링하고 변환하고 샘플링했습니다. 구체적인 구성을 설명하면 이렇습니다.\n\n" +
        "첫째, Batch Processor였습니다. 개별 span을 하나씩 전송하면 네트워크 오버헤드가 크기 때문에, send_batch_size=1000, timeout=10s로 설정해서 1000개씩 묶거나 10초마다 전송하도록 했습니다. 이것만으로도 네트워크 호출이 99% 감소했습니다.\n\n" +
        "둘째, Memory Limiter였습니다. Collector가 메모리를 무한정 사용하면 서버가 죽을 수 있으니, limit_mib=4096, spike_limit_mib=512로 제한을 두었습니다. 메모리 사용량이 4GB를 넘으면 새 데이터를 drop하고, spike는 512MB까지 허용했습니다. 중요한 건 check_interval=1s로 자주 체크해서 메모리 급증을 빠르게 감지하는 것이었습니다.\n\n" +
        "셋째, Resource Processor였습니다. 모든 span에 공통 메타데이터를 추가했습니다. env=production, cluster=aws-us-east-1, version=v2.5.0 같은 태그를 자동으로 주입해서, 나중에 Grafana에서 필터링할 때 유용했습니다.\n\n" +
        "넷째, Tail Sampling Processor가 가장 중요했습니다. 처음에는 Head Sampling으로 무작위 10%만 수집했는데, 중요한 에러 trace가 누락되는 문제가 있었습니다. Tail Sampling은 trace가 완료된 후 판단하기 때문에 더 똑똑합니다. 설정은 이랬습니다. Error trace는 100% 수집, P99 latency 이상은 100%, 정상 trace는 1% 샘플링, 단 특정 endpoint는 10% 샘플링(결제 API 등). 이 정책만으로 storage 비용을 70% 줄이면서도 중요한 데이터는 모두 보존했습니다.\n\n" +
        "다섯째, Attributes Processor로 민감 정보를 제거했습니다. PII(Personally Identifiable Information)인 email, phone_number, credit_card 같은 속성은 자동으로 마스킹했습니다. GDPR 컴플라이언스 때문에 필수였습니다.\n\n" +
        "Exporters는 목적지별로 나눴습니다. Jaeger Exporter로 trace를 Jaeger backend로, Prometheus Exporter로 metrics를 Prometheus로, Loki Exporter로 logs를 Loki로 보냈습니다. 각 Exporter마다 retry_on_failure와 sending_queue 설정으로 네트워크 장애 시에도 데이터 손실을 방지했습니다. sending_queue_size=5000, retry_on_failure=enabled, max_elapsed_time=5m으로 설정해서 최대 5분까지 재시도했습니다.\n\n" +
        "12개 프로덕션 서버 배포 전략을 설명하겠습니다. Agent 모드와 Gateway 모드를 혼합했습니다.\n\n" +
        "각 서버에는 Agent Collector를 DaemonSet으로 배포했습니다. 애플리케이션은 localhost:4317로 데이터를 보내니 네트워크 지연이 최소화되었습니다. Agent는 가벼운 처리만 하고(batch, memory_limit), 실제 sampling과 export는 중앙 Gateway Collector가 담당했습니다.\n\n" +
        "Gateway Collector는 3대를 고가용성으로 구성했습니다. Agent들은 Gateway의 load balancer 주소로 데이터를 전송하고, Gateway에서 Tail Sampling과 같은 무거운 작업을 수행했습니다. 이 아키텍처의 장점은 Agent가 가볍기 때문에 애플리케이션 성능에 영향을 주지 않고, Gateway를 스케일 아웃해서 처리량을 늘릴 수 있다는 것이었습니다.\n\n" +
        "Deployment는 Kubernetes Operator를 사용했습니다. OpenTelemetry Operator가 Collector 설정을 CRD로 관리할 수 있게 해줘서, GitOps로 configuration을 버전 관리하고 자동 배포했습니다. Collector 버전 업그레이드도 rolling update로 무중단 배포했습니다.\n\n" +
        "3TB 분산 추적 데이터 관리 전략을 설명하겠습니다. 이게 가장 어려운 부분이었습니다.\n\n" +
        "첫째, Storage 계층화였습니다. Hot data(7일)는 Jaeger Elasticsearch에, Warm data(30일)는 S3 Standard에, Cold data(90일)는 S3 Glacier에 보관했습니다. 자주 조회되는 최근 데이터는 빠른 스토리지에, 거의 안 보는 옛날 데이터는 저렴한 스토리지에 두는 거죠.\n\n" +
        "둘째, Parquet 압축이었습니다. JSON 포맷의 trace를 Parquet 컬럼형 포맷으로 변환하면 압축률이 10배 이상 높았습니다. 10GB JSON이 1GB Parquet이 되는 식입니다. 게다가 쿼리 성능도 빨라졌습니다. Athena로 Parquet을 쿼리하면 필요한 컬럼만 읽어서 스캔 비용이 대폭 감소했습니다.\n\n" +
        "셋째, Aggregation과 Rollup이었습니다. 개별 span을 모두 보관하지 않고, 통계 정보만 남겼어요. 예를 들어 30일 이후 trace는 span 개수, 평균 duration, error count만 보존하고 상세 span은 삭제했습니다. 디버깅에는 최근 7일 trace만 필요하고, 장기 트렌드 분석에는 aggregated metrics로 충분했습니다.\n\n" +
        "넷째, Index 최적화였습니다. Elasticsearch에 모든 필드를 인덱싱하면 index 크기가 data보다 커지는 문제가 있었습니다. 검색에 자주 쓰이는 service.name, trace_id, span_id, status_code만 인덱싱하고, 나머지는 stored field로만 보관했습니다. 인덱스 크기가 70% 줄었습니다.\n\n" +
        "다섯째, Retention Policy 자동화였습니다. Elasticsearch Curator와 S3 Lifecycle Policy로 자동 삭제 규칙을 설정했습니다. 7일 지난 Elasticsearch 인덱스는 자동으로 S3로 export 후 삭제, 90일 지난 S3 object는 Glacier로 이동, 1년 지난 데이터는 완전 삭제되도록 했습니다.\n\n" +
        "비용 효과를 계산해보면, DataDog을 사용했다면 월 2,000달러가 들었을 텐데, Self-hosted OpenTelemetry stack은 월 200달러(EC2 + S3 + Elasticsearch)로 90% 절감했습니다. 대신 운영 부담이 있었지만, Collector 자동 복구와 모니터링 자동화로 관리 가능한 수준이었습니다.\n\n" +
        "결과적으로 일일 50만 traces, 월 3TB 데이터를 안정적으로 처리하고, 99.9% 데이터 수집 성공률을 달성했으며, 평균 end-to-end latency는 5초 이내(수집부터 시각화까지)로 유지했습니다.\n\n" +
        "핵심 교훈은, Observability 인프라도 관측이 필요하다는 것입니다. Collector 자체의 메트릭(처리량, drop rate, latency)을 Prometheus로 모니터링하고, 문제가 생기면 즉시 알림이 오도록 했습니다. 관측성을 제공하는 시스템이 blind spot이 되면 안 되니까요.",
      en: "A concise OpenTelemetry answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 144,
    category1: "Infrastructure",
    category2: "Synthetic Monitoring",
    question: {
      ko: "Synthetic Monitoring과 Self-Healing 시스템을 어떻게 구현했습니까? 특히 자체 설치형 환경에서 Managed APM 유료 기능 없이 컨테이너와 HTTP 엔드포인트 가용성을 어떻게 모니터링하고 자동 복구했습니까?",
    },
    answer: {
      ko:
        "Synthetic Monitoring은 '사용자가 문제를 겪기 전에 우리가 먼저 발견한다'는 철학으로 시작했습니다. 특히 ₩500B 이커머스 환경에서 L4 장비가 80/443 포트만 체크하는 한계를 극복해야 했습니다.\n\n" +
        "당시 문제 상황을 먼저 설명하겠습니다. 협력업체가 관리하는 L4 Load Balancer는 단순히 Nginx 80 포트가 열려있으면 '서버 정상'으로 판단했습니다. 하지만 실제로는 한 서버에 Frontend, Backend, Batch 컨테이너가 여러 개 돌고 있었고, Batch 컨테이너만 죽어도 주문 처리가 멈췄습니다. L4는 이걸 감지 못했습니다. 게다가 컨테이너가 Restarting 루프에 빠져도, Nginx가 살아있으면 L4는 계속 트래픽을 보냈어요. 고객은 502 Bad Gateway를 보는데 모니터링은 '정상'이라고 했습니다.\n\n" +
        "이 문제를 해결하기 위해 Monitoring Agent 프로젝트를 직접 개발했습니다. Go 언어로 두 가지 핵심 컴포넌트를 만들었습니다.\n\n" +
        "**첫 번째 컴포넌트: CRI Health Checker**\n\n" +
        "서버 내 모든 컨테이너의 상태를 세밀하게 추적하는 에이전트입니다. Docker API를 직접 호출해서 컨테이너 이름 패턴, 이미지, Health 상태, CPU/Memory 사용량을 실시간으로 수집했습니다.\n\n" +
        "핵심은 '이미지 패턴 기반 감시'였습니다. 설정 파일에 `image_pattern: \"ecr.aws/.*/theshop-backend:.*\"` 같은 정규식을 정의하면, 해당 패턴에 맞는 모든 컨테이너를 자동으로 추적했습니다. 서버마다 컨테이너 이름이 조금씩 달랐기 때문에 패턴 매칭이 필수였습니다.\n\n" +
        "컨테이너 상태를 4가지로 분류했습니다. Healthy, Starting, Restarting, Exited. L4가 못 보던 부분이 바로 이 Restarting 상태였습니다. Docker healthcheck가 실패하면 컨테이너가 자동 재시작되는데, 이 과정이 10분씩 반복되어도 L4는 모르고 트래픽을 계속 보냈습니다. CRI Health Checker는 restart_count를 추적해서, 5분 내 3회 이상 재시작되면 알림을 보냈죠.\n\n" +
        "자동 Remediation 정책도 구현했습니다. 설정 파일에 `auto_restart: true`, `max_restart_attempts: 3`, `restart_cooldown: 5m`를 정의하면, 컨테이너가 Unhealthy 상태로 5분 이상 지속될 때 자동으로 재시작을 시도했습니다. 단, 무한 재시작 루프를 막기 위해 3회 시도 후에는 알림만 보내고 수동 개입을 기다렸습니다.\n\n" +
        "리소스 사용량도 모니터링했습니다. CPU 90% 이상 또는 Memory 85% 이상 사용하는 컨테이너를 찾아서 warn 레벨 로그를 남겼습니다. 이 데이터는 OpenTelemetry로 자동 전송되어 Grafana 대시보드에 실시간으로 표시되었습니다.\n\n" +
        "**두 번째 컴포넌트: HTTP Health Checker**\n\n" +
        "중요한 HTTP 엔드포인트를 주기적으로 호출해서 가용성과 응답시간을 측정하는 Synthetic Monitoring 에이전트입니다.\n\n" +
        "설정 예시를 보면 이해가 쉬워요. YAML 파일에 여러 엔드포인트를 정의했습니다.\n\n" +
        "```yaml\n" +
        "endpoints:\n" +
        '  - name: "Product API"\n' +
        '    url: "https://api.theshop.com/v1/products"\n' +
        "    method: GET\n" +
        "    interval: 30s\n" +
        "    timeout: 5s\n" +
        "    expected_status: 200\n" +
        "    headers:\n" +
        '      Authorization: "Bearer {env:API_TOKEN}"\n' +
        '  - name: "Order Submit"\n' +
        '    url: "https://api.theshop.com/v1/orders"\n' +
        "    method: POST\n" +
        '    body: \'{"product_id":"test","quantity":1}\'\n' +
        "    interval: 1m\n" +
        "    alert_threshold: 3\n" +
        "```\n\n" +
        "30초마다 Product API를 호출하고, 응답시간과 HTTP 상태 코드를 기록했습니다. expected_status가 200이 아니거나 timeout을 초과하면 실패로 카운트됩니다. alert_threshold=3이므로 3회 연속 실패하면 알림이 발생했습니다.\n\n" +
        "Trace Context 전파도 구현했습니다. HTTP 요청마다 W3C Trace Context 헤더(traceparent)를 자동으로 생성해서 보냈어요. 덕분에 Synthetic test가 Backend까지 어떻게 전파되었는지, Distributed Tracing으로 전체 흐름을 볼 수 있었습니다. 예를 들어 Product API 호출이 느리다면, Trace를 따라가서 Database 쿼리가 병목인지, Redis 캐시 미스인지 바로 파악할 수 있었습니다.\n\n" +
        "**OpenTelemetry 통합 (핵심 차별화 요소)**\n\n" +
        "이 프로젝트의 가장 큰 강점은 '모든 텔레메트리를 OpenTelemetry 표준으로 통합'한 것이었습니다.\n\n" +
        "CRI Health Checker와 HTTP Health Checker 모두 OTLP gRPC로 데이터를 전송했습니다. Metrics, Traces, Logs가 단일 파이프라인으로 수집되어 Grafana, Tempo, Loki에서 상관 분석이 가능했습니다.\n\n" +
        "구체적으로, HTTP Health Checker가 Product API 실패를 감지하면 이런 흐름이 발생했습니다. 첫째, Error Trace가 Tempo로 전송되고, 둘째, 실패 로그(status=500, url=..., error=...)가 Loki로 전송되며, 셋째, 메트릭(http_check_success=0, http_check_duration_ms=5000)이 Prometheus로 전송됩니다. Grafana에서 trace_id를 클릭하면 로그와 메트릭이 자동으로 연결되어 전체 컨텍스트를 한눈에 볼 수 있었습니다.\n\n" +
        "Resource Attributes로 환경/버전/태그를 자동 보강했습니다. 모든 span에 env=production, server=web-01, version=v1.2.3, team=platform 같은 메타데이터가 자동 주입되어, 나중에 '특정 서버만 문제인지', '전체 환경 문제인지' 필터링이 쉬웠어요.\n\n" +
        "**Auto-Instrumentation 기능**\n\n" +
        "Go 런타임 메트릭, Host 메트릭, HTTP 클라이언트 메트릭을 자동으로 수집했습니다. 에이전트 자체의 성능(고루틴 수, 메모리 사용량, GC 시간)도 모니터링되어, '모니터링 시스템이 장애 원인'인 경우도 탐지할 수 있었습니다.\n\n" +
        "특히 `app_ready`, `app_running`, `app_startup_duration` 같은 라이프사이클 메트릭으로 에이전트가 정상 동작 중인지 확인했습니다. 에이전트가 crash되면 app_running=0으로 변하고, 이걸 Prometheus AlertManager가 감지해서 알림을 보냈어요.\n\n" +
        "**배포 및 운영**\n\n" +
        "12개 프로덕션 서버에 Docker Compose로 배포했습니다. 각 서버의 `/var/run/docker.sock`을 마운트해서 컨테이너 상태를 감시하고, 중앙 OpenTelemetry Collector(10.101.91.145:4317)로 데이터를 전송했습니다.\n\n" +
        "ECR(Elastic Container Registry)에 이미지를 저장하고, SHA 태그로 버전 관리했습니다. 배포는 GitOps 스타일로, Git commit마다 CI가 이미지를 빌드하고 ECR에 푸시하면, 각 서버에서 `make run ENV=prod`로 최신 이미지를 pull해서 실행했습니다.\n\n" +
        "설정 파일은 `/opt/agent-configs/`에 중앙 관리했고, 환경별로 dev/staging/prod 설정을 분리했습니다. `.env.local`로 환경 변수(AWS_PROFILE, OTEL_ENDPOINT)를 주입해서 유연하게 운영했습니다.\n\n" +
        "**실제 장애 탐지 사례**\n\n" +
        "새벽 3시에 Batch 컨테이너가 OOM Killed로 죽었습니다. 기존 L4 헬스체크는 이걸 못 봤지만, CRI Health Checker가 즉시 감지해서 Slack 알림을 보냈습니다. 자동 재시작이 시도되었지만 계속 OOM이 발생했고, 3회 재시도 후 알림이 다시 왔어요. 로그를 보니 Memory Leak이 원인이었고, 즉시 패치를 배포해서 5분 만에 해결했습니다. 기존에는 아침에 출근해서야 발견했을 문제를 선제적으로 막은 거죠.\n\n" +
        "**운영 성과**\n\n" +
        "MTTD(Mean Time To Detection)를 18시간에서 10뵔으로 99% 단축했고, 컨테이너 자동 복구로 MTTR(Mean Time To Recovery)를 4시간에서 10뵔으로 단축했습니다. 월 인시던트 수가 15건에서 3건으로 감소했고, 대부분 자동 복구로 해결되었습니다.\n\n" +
        "비용 효율성도 탁월했습니다. Datadog Synthetic Monitoring을 사용했다면 월 500달러가 들었을 텐데, Self-hosted 방식으로 EC2 비용만 월 40달러로 운영했습니다. 대신 개발과 유지보수 부담이 있었지만, 커스터마이징 자유도가 높아서 충분히 가치가 있었습니다.\n\n" +
        "**핵심 교훈**\n\n" +
        "첫째, Synthetic Monitoring은 '사용자 관점의 가용성'을 측정합니다. L4가 '서버 살아있음'을 보는 것과, 우리가 '실제 API 요청이 성공함'을 보는 것은 완전히 다릅니다. 후자가 진짜 가용성입니다.\n\n" +
        "둘째, Self-Healing은 간단한 케이스부터 시작해야 합니다. 컨테이너 재시작 같은 Safe Operation부터 자동화하고, 복잡한 복구는 수동 개입을 남겨둬야 합니다. 자동화가 문제를 더 악화시키면 안 되니까요.\n\n" +
        "셋째, Observability 표준(OpenTelemetry)을 지키면 나중에 도구를 바꾸기 쉽습니다. Jaeger에서 Tempo로, Prometheus에서 InfluxDB로 전환해도 에이전트 코드는 변경 없이 Collector 설정만 바꾸면 됐습니다. 이게 표준의 힘입니다.",
      en: "A concise Synthetic Monitoring answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 145,
    category1: "Infrastructure",
    category2: "High Availability",
    question: {
      ko: "OpenTelemetry Collector의 고가용성(HA)을 AWS 환경에서 어떻게 구현했습니까? ADOT + NLB + ECS 아키텍처를 선택한 이유와 구체적인 구성을 설명해주세요.",
    },
    answer: {
      ko:
        "OTEL Collector의 고가용성은 '관측성 시스템이 먼저 죽으면 장애 대응이 불가능하다'는 절박함에서 시작했습니다.\n\n" +
        "고가용성 설계에서 가장 중요한 원칙은 Single Point of Failure 제거와 데이터 손실 방지였습니다. Collector가 다운되면 모든 텔레메트리가 유실되고, 장애 상황에서 blind spot이 생기는 거죠. 특히 ₩500B 규모 이커머스 환경에서는 초당 수백 건의 trace와 수천 개의 metric이 발생했기 때문에 Collector 장애가 곧 비즈니스 임팩트로 연결되었습니다.\n\n" +
        "AWS 환경에서는 Managed 서비스의 안정성과 Auto Scaling 능력을 최대한 활용했습니다.\n\n" +
        "첫째, AWS Distro for OpenTelemetry(ADOT) Collector를 선택한 이유는 AWS 네이티브 통합과 검증된 안정성 때문이었습니다. 오픈소스 OTEL Collector에 AWS X-Ray, CloudWatch, Kinesis 수신기와 내보내기가 사전 통합되어 있어서 설정이 간편했습니다. 또한 AWS에서 직접 보안 패치와 버전 관리를 해주니 운영 부담이 줄었습니다.\n\n" +
        "둘째, ECS Fargate로 Collector를 배포했습니다. 서버리스 환경이라 인프라 관리 부담이 없고, Task Definition으로 리소스 제한(CPU 2vCPU, Memory 4GB)과 Health Check를 명확히 정의할 수 있었습니다. 특히 중요한 건 ECS Service Auto Scaling이었습니다. CloudWatch 메트릭(CPU 사용률 70% 이상 또는 메모리 85% 이상)에 기반해서 Collector 인스턴스를 자동으로 스케일 아웃했습니다. 평소에는 3개 Task가 돌다가, 트래픽 스파이크 시 10개까지 증가하도록 설정했습니다.\n\n" +
        "셋째, Network Load Balancer를 앞단에 배치했습니다. NLB는 Layer 4에서 동작하기 때문에 OTLP gRPC 트래픽을 효율적으로 분산할 수 있었습니다. ALB는 HTTP/2를 지원하지만 gRPC의 long-lived connection을 제대로 다루지 못했습니다. NLB 설정의 핵심은 Connection Draining과 Health Check였습니다.\n\n" +
        "Connection Draining을 300초로 설정해서 Collector Task가 종료될 때 기존 연결이 안전하게 끊길 시간을 확보했습니다. 이렇게 안 하면 rolling deployment 중에 데이터가 손실될 수 있습니다.\n\n" +
        "Health Check는 단순히 TCP 연결이 아니라 OTLP Health Check Endpoint(13133포트)를 호출하도록 설정했습니다. Collector가 메모리 부족이나 백엔드 연결 끊김으로 비정상 상태가 되면 health endpoint가 503을 반환하고, NLB가 자동으로 해당 Task를 제외했습니다. Health check interval 10초, unhealthy threshold 2회로 설정해서 장애 감지를 빠르게 했습니다.\n\n" +
        "넷째, Multi-AZ 배포로 가용 영역 장애에 대비했습니다. ECS Service를 3개 AZ(us-east-1a, 1b, 1c)에 분산 배치하고, NLB도 Cross-Zone Load Balancing을 활성화했습니다. 하나의 AZ가 완전히 다운되어도 나머지 2개 AZ에서 트래픽을 처리할 수 있었습니다.\n\n" +
        "다섯째, Retry와 Queue 설정으로 일시적 장애를 흡수했습니다. 애플리케이션 SDK에서 Collector로 데이터를 보낼 때, gRPC의 Retry Policy를 설정했습니다. 최대 3회 재시도, exponential backoff 1초→2초→4초로 설정해서 Collector가 일시적으로 응답하지 않아도 데이터 손실을 방지했습니다. 또한 SDK의 Batch Processor에서 sending_queue_size=5000으로 설정해서 네트워크 지연 시 메모리 버퍼에 임시 저장했습니다.\n\n" +
        "여섯째, 모니터링과 알림을 Collector 자체에 구축했습니다. Collector가 내보내는 자체 메트릭(otelcol_processor_batch_batch_send_size, otelcol_exporter_send_failed_metric_points)을 CloudWatch로 수집하고, 실패율이 5% 이상이면 즉시 알림을 보냈어요. 또한 ECS Task 상태(Running, Stopped, Pending)를 CloudWatch Events로 추적해서 비정상 종료 시 자동으로 재시작하도록 했습니다.\n\n" +
        "결과적으로 AWS 환경에서는 99.95% 가용성을 달성했습니다. 월 1회 rolling deployment로 버전 업그레이드를 해도 downtime 없이 진행되었고, AZ 장애 시뮬레이션(Chaos Engineering)에서도 자동 복구가 검증되었습니다.\n\n" +
        "핵심 교훈은, AWS Managed 서비스를 활용하면 운영 부담을 크게 줄이면서도 엔터프라이즈급 가용성을 달성할 수 있다는 것입니다. Auto Scaling과 Multi-AZ 배포는 수동으로 구현하기 어려운 복원력을 제공했고, CloudWatch 통합으로 메타 모니터링까지 자동화할 수 있었습니다. 비용은 월 300달러 정도였지만, 엔지니어 시간 절약과 안정성을 고려하면 충분히 가치가 있었습니다.",
      en: "A concise High Availability answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 146,
    category1: "Infrastructure",
    category2: "API Gateway",
    question: {
      ko: "OnPremise 환경에서 APISIX Gateway를 활용한 OTEL Collector 고가용성 아키텍처를 어떻게 설계했습니까? Health Check, Circuit Breaker, Failover 전략을 구체적으로 설명해주세요.",
    },
    answer: {
      ko:
        "OnPremise 환경에서 OTEL Collector의 고가용성은 APISIX API Gateway를 도입하여 구현했습니다. AWS처럼 Managed 서비스가 없었기 때문에, 오픈소스 기반의 자체 구축 아키텍처를 설계해야 했습니다.\n\n" +
        "**APISIX 선택 이유**\n\n" +
        "첫째, APISIX를 선택한 이유는 동적 라우팅과 Health Check 기능이 강력했기 때문입니다. NGINX는 설정 변경 시 reload가 필요하고, HAProxy는 gRPC 지원이 제한적이었습니다. APISIX는 REST API로 무중단 설정 업데이트가 가능하고, Lua 스크립트로 복잡한 라우팅 로직을 구현할 수 있었습니다. 또한 OpenResty 기반이라 gRPC Upstream을 네이티브로 지원했습니다.\n\n" +
        "둘째, Upstream 노드 구성으로 3대의 Collector 인스턴스를 등록했습니다. 각 Collector는 Docker Compose로 독립적인 서버(10.101.91.145, 10.101.91.146, 10.101.91.147)에 배포되었고, APISIX Route에 다음과 같이 정의했습니다.\n\n" +
        "```json\n" +
        "{\n" +
        '  "uri": "/v1/*",\n' +
        '  "upstream": {\n' +
        '    "type": "roundrobin",\n' +
        '    "nodes": {\n' +
        '      "10.101.91.145:4317": 1,\n' +
        '      "10.101.91.146:4317": 1,\n' +
        '      "10.101.91.147:4317": 1\n' +
        "    },\n" +
        '    "retries": 2,\n' +
        '    "timeout": {\n' +
        '      "connect": 5,\n' +
        '      "send": 10,\n' +
        '      "read": 10\n' +
        "    },\n" +
        '    "checks": {\n' +
        '      "active": {\n' +
        '        "type": "http",\n' +
        '        "timeout": 5,\n' +
        '        "http_path": "/health",\n' +
        '        "healthy": {\n' +
        '          "interval": 10,\n' +
        '          "successes": 2\n' +
        "        },\n" +
        '        "unhealthy": {\n' +
        '          "interval": 5,\n' +
        '          "http_failures": 3\n' +
        "        }\n" +
        "      },\n" +
        '      "passive": {\n' +
        '        "healthy": {\n' +
        '          "http_statuses": [200, 201],\n' +
        '          "successes": 3\n' +
        "        },\n" +
        '        "unhealthy": {\n' +
        '          "http_statuses": [500, 502, 503],\n' +
        '          "http_failures": 3\n' +
        "        }\n" +
        "      }\n" +
        "    }\n" +
        "  }\n" +
        "}\n" +
        "```\n\n" +
        "roundrobin 알고리즘으로 트래픽을 균등 분산했고, retries=2로 실패 시 다른 노드로 자동 재시도하도록 설정했습니다. 중요한 건 Active Health Check와 Passive Health Check의 조합이었습니다.\n\n" +
        "Active Health Check는 10초마다 각 Collector의 13133포트 /health 엔드포인트를 호출합니다. 3회 연속 실패하면 해당 노드를 unhealthy로 마킹하고 트래픽을 자동으로 제외했습니다. 반대로 2회 연속 성공하면 다시 healthy 상태로 복구되어 트래픽을 받기 시작합니다.\n\n" +
        "셋째, Passive Health Check로 실시간 장애를 더 빠르게 감지했습니다. Active Check는 주기적으로 확인하는 거라 최대 10초 간격의 지연이 있을 수 있습니다. Passive Check는 실제 트래픽의 응답을 보고 즉시 판단합니다. 500/502/503 에러가 3회 연속 발생하면 즉시 해당 노드를 제외했습니다. 이 방식이 평균 5초 더 빠르게 장애를 감지했습니다.\n\n" +
        "넷째, Circuit Breaker 패턴을 api-breaker 플러그인으로 추가했습니다. Upstream 전체가 불안정할 때를 대비한 보호장치였습니다. 설정은 이랬습니다. 500/503 에러가 3회 발생하면 Circuit을 OPEN 상태로 전환하고, 502 에러를 클라이언트에게 반환했습니다. Circuit이 열리면 2초 → 4초 → 8초 간격으로 재시도하며, 최대 300초까지 대기했습니다. 1회 성공 응답(200)이 오면 Circuit을 다시 CLOSED로 전환했습니다.\n\n" +
        "다섯째, Weighted Round Robin으로 서버 성능 차이를 반영했습니다. 3대 Collector의 하드웨어 스펙이 달랐어요. 145번 서버는 16 Core 32GB RAM이었지만, 146번은 8 Core 16GB였습니다. Weight를 2:1:1로 설정해서 성능 좋은 서버로 더 많은 트래픽을 보냈죠. 이로써 리소스 활용률이 균등해졌습니다.\n\n" +
        "여섯째, Failover 시나리오를 자동화했습니다. Collector 1번이 완전히 다운되면 APISIX가 자동으로 2번과 3번으로만 트래픽을 보냈어요. 2대로도 처리 가능하도록 각 Collector의 용량을 150% 오버프로비저닝했습니다. 평소에는 3대가 각각 50% 부하로 돌다가, 1대 장애 시 2대가 75% 부하로 처리하는 구조였죠.\n\n" +
        "일곱째, etcd 클러스터로 APISIX 설정을 고가용성으로 관리했습니다. APISIX의 라우팅 설정은 etcd에 저장되고, 3개 노드로 HA 구성했습니다. APISIX 인스턴스 자체도 2대를 띄우고 앞단에 Keepalived + VRRP로 가상 IP를 관리했습니다. APISIX 1번이 죽으면 VIP가 자동으로 2번으로 이동했습니다.\n\n" +
        "여덟째, Connection Pooling과 Keep-Alive로 성능을 최적화했습니다. APISIX에서 Collector로의 gRPC 연결을 재사용하도록 설정해서 매번 TLS Handshake를 하는 오버헤드를 줄였습니다. Connection pool size=100, max idle time=60s로 설정했습니다.\n\n" +
        "아홉째, Observability를 Collector 자체에 구축했습니다. APISIX의 prometheus 플러그인으로 메트릭(upstream_status, request_latency, error_rate)을 수집하고, Grafana 대시보드로 실시간 모니터링했습니다. 특정 Collector로의 트래픽이 0이 되면 즉시 알림이 발생했습니다.\n\n" +
        "**실제 장애 복구 사례**\n\n" +
        "Collector 145번 서버가 하드웨어 장애로 완전히 다운되었을 때, APISIX의 Active Health Check가 30초 내 감지하고 146, 147번으로만 트래픽을 보냈습니다. 145번 복구까지 2시간이 걸렸지만, 서비스는 정상 동작했습니다. Passive Health Check 덕분에 실제로는 15초 만에 장애를 감지했고, 사용자에게는 단 1건의 에러만 노출되었습니다.\n\n" +
        "**운영 성과 및 비용**\n\n" +
        "OnPremise APISIX 구성의 가장 큰 장점은 비용이었습니다. 기존 서버 3대와 APISIX 2대를 활용해서 추가 인프라 비용이 거의 없었습니다. AWS NLB + Fargate가 월 300달러인 것에 비해, 전기세 포함 월 50달러 정도였죠.\n\n" +
        "단점은 운영 부담이었습니다. 서버 장애 시 수동 복구가 필요하고, 용량 계획을 직접 해야 했습니다. 하지만 APISIX의 동적 설정 기능 덕분에 대부분의 운영 작업은 무중단으로 진행할 수 있었습니다.\n\n" +
        "**핵심 교훈**\n\n" +
        "첫째, Active + Passive Health Check의 조합이 필수입니다. Active만으로는 주기 사이 장애를 놓치고, Passive만으로는 unhealthy 노드 복구를 감지할 수 없습니다.\n\n" +
        "둘째, Circuit Breaker는 Upstream 전체 보호에 중요합니다. 개별 노드 장애는 Health Check로 처리하지만, 전체 Upstream 불안정은 Circuit Breaker로 막아야 캐스케이딩 장애를 방지할 수 있습니다.\n\n" +
        "셋째, Weighted Round Robin으로 서버 스펙 차이를 반영하면 리소스 활용률이 균등해집니다. 모든 서버가 동일 스펙이 아니라면 weight 조정이 필수예요.\n\n" +
        "넷째, Chaos Engineering으로 장애 시나리오를 사전에 테스트해야 합니다. 서버를 강제로 죽이고, 네트워크를 끊어보고, 실제로 Failover가 동작하는지 검증했습니다. 이 과정에서 설정 오류를 많이 발견했습니다.",
      en: "A concise API Gateway answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 139,
    category1: "Infrastructure",
    category2: "Distributed System",
    question: {
      ko: "APISIX의 설정 저장소로 etcd 클러스터를 구성했습니까? etcd의 고가용성과 데이터 일관성을 어떻게 보장했는지 설명해주세요.",
    },
    answer: {
      ko:
        "APISIX의 고가용성을 위해서는 설정 저장소인 etcd 자체도 HA로 구성해야 했습니다. APISIX는 모든 라우팅 설정, Upstream 정보, 플러그인 구성을 etcd에 저장하기 때문에, etcd가 SPOF가 되면 APISIX 전체가 마비되는 거죠.\n\n" +
        "**etcd 클러스터 구성**\n\n" +
        "3노드 etcd 클러스터를 Static 방식으로 구축했습니다. 각 노드는 독립적인 서버(10.101.91.145, 146, 147)에 배포되었고, 초기 클러스터 멤버를 명시적으로 정의했습니다.\n\n" +
        "```bash\n" +
        "# Node 1 (10.101.91.145)\n" +
        "etcd --name etcd-1 \\\n" +
        "  --initial-advertise-peer-urls http://10.101.91.145:2380 \\\n" +
        "  --listen-peer-urls http://10.101.91.145:2380 \\\n" +
        "  --listen-client-urls http://10.101.91.145:2379,http://127.0.0.1:2379 \\\n" +
        "  --advertise-client-urls http://10.101.91.145:2379 \\\n" +
        "  --initial-cluster-token etcd-apisix-cluster \\\n" +
        "  --initial-cluster etcd-1=http://10.101.91.145:2380,etcd-2=http://10.101.91.146:2380,etcd-3=http://10.101.91.147:2380 \\\n" +
        "  --initial-cluster-state new\n\n" +
        "# Node 2, 3도 동일한 initial-cluster 설정으로 시작\n" +
        "```\n\n" +
        "initial-cluster-token을 'etcd-apisix-cluster'로 고유하게 설정해서 다른 etcd 클러스터와 혼동을 방지했습니다. 이 토큰이 다르면 같은 네트워크에 여러 etcd 클러스터가 있어도 서로 격리되어요.\n\n" +
        "**Raft Consensus와 Quorum**\n\n" +
        "etcd는 Raft 알고리즘으로 분산 합의를 달성합니다. 3노드 클러스터에서는 과반수인 2개 노드가 살아있어야 쓰기가 가능합니다. 1개 노드 장애는 문제없지만, 2개 노드가 죽으면 클러스터가 read-only 모드로 전환됩니다.\n\n" +
        "Quorum 계산식은 `(N/2) + 1`입니다. 3노드면 2개, 5노드면 3개가 필요하죠. 그래서 etcd는 항상 홀수 개 노드로 구성해야 합니다. 짝수 개는 장애 허용 능력이 늘지 않으면서 오버헤드만 증가합니다.\n\n" +
        "**Leader Election과 Auto-Failover**\n\n" +
        "etcd 클러스터는 항상 1개의 Leader를 선출하고, 나머지는 Follower가 됩니다. 모든 쓰기는 Leader를 거쳐야 하고, Follower는 읽기만 처리합니다.\n\n" +
        "Leader가 죽으면 자동으로 재선출이 시작됩니다. Election timeout(기본 1초)이 지나면 Follower들이 투표를 시작하고, 과반수 득표한 노드가 새 Leader가 되죠. 보통 1-2초 내에 재선출이 완료되어 downtime이 최소화됩니다.\n\n" +
        "실제로 145번 노드(Leader)가 다운되었을 때, 146번이 1.2초 만에 새 Leader로 선출되었고, APISIX는 자동으로 새 Leader와 통신했습니다. etcd client library가 endpoint list를 관리하면서 자동 failover를 처리했습니다.\n\n" +
        "**데이터 일관성 보장**\n\n" +
        "etcd는 Strong Consistency를 보장합니다. Raft 알고리즘 덕분에 모든 노드가 동일한 순서로 동일한 데이터를 가져요. CAP theorem에서 CP(Consistency + Partition tolerance)를 선택한 거죠.\n\n" +
        "쓰기 프로세스는 이렇습니다. 첫째, Client가 Leader에게 쓰기 요청을 보냅니다. 둘째, Leader가 로그를 Follower들에게 복제합니다. 셋째, 과반수 노드가 로그를 저장하면 commit됩니다. 넷째, Leader가 Client에게 성공 응답을 보냅니다. 다섯째, 비동기로 나머지 Follower들도 commit합니다.\n\n" +
        "이 과정에서 Network Partition이 발생하면, 과반수를 유지한 쪽만 쓰기가 가능하고 소수 쪽은 read-only가 됩니다. Split-brain 문제가 원천적으로 방지되는 거죠.\n\n" +
        "**APISIX와 etcd 통합**\n\n" +
        "APISIX는 etcd의 Watch API를 사용해서 설정 변경을 실시간으로 감지합니다. 관리자가 Admin API로 Route를 추가하면, etcd에 저장되고, 모든 APISIX 인스턴스가 Watch를 통해 즉시 업데이트를 받아요.\n\n" +
        "APISIX 설정 파일(config.yaml)에 etcd endpoints를 배열로 정의했습니다.\n\n" +
        "```yaml\n" +
        "etcd:\n" +
        "  host:\n" +
        '    - "http://10.101.91.145:2379"\n' +
        '    - "http://10.101.91.146:2379"\n' +
        '    - "http://10.101.91.147:2379"\n' +
        '  prefix: "/apisix"\n' +
        "  timeout: 30\n" +
        "```\n\n" +
        "APISIX client가 3개 endpoint를 모두 알고 있어서, 하나가 죽어도 자동으로 다른 노드로 연결을 시도합니다. Health check를 5초마다 수행해서 죽은 노드는 제외하고, 복구되면 다시 포함했습니다.\n\n" +
        "**Snapshot과 백업**\n\n" +
        "etcd 데이터 손실을 막기 위해 자동 백업을 구축했습니다. etcdctl snapshot save로 매일 밤 2시에 스냅샷을 생성하고, S3에 업로드했습니다.\n\n" +
        "```bash\n" +
        "# Daily backup cron job\n" +
        "0 2 * * * etcdctl --endpoints=http://10.101.91.145:2379 \\\n" +
        "  snapshot save /backup/etcd-$(date +\\%Y\\%m\\%d).db && \\\n" +
        "  aws s3 cp /backup/etcd-$(date +\\%Y\\%m\\%d).db s3://backups/etcd/\n" +
        "```\n\n" +
        "7일 이상 된 백업은 자동 삭제하여 스토리지 비용을 절감했습니다. Disaster recovery test를 월 1회 실시해서 백업에서 복구하는 절차를 검증했습니다.\n\n" +
        "**성능 최적화**\n\n" +
        "etcd는 디스크 I/O에 민감합니다. SSD를 사용하고, data directory를 별도 볼륨에 마운트했습니다. 또한 --quota-backend-bytes=8GB로 데이터 크기를 제한해서 메모리 사용을 제어했습니다.\n\n" +
        "Auto-compaction을 활성화해서 오래된 revision을 자동으로 삭제했습니다. --auto-compaction-retention=1h 설정으로 1시간 이전 데이터는 압축했습니다. APISIX 설정은 자주 변경되지 않기 때문에 1시간이면 충분했습니다.\n\n" +
        "Defragmentation을 주기적으로 수행해서 디스크 공간을 회수했습니다. etcdctl defrag를 매주 일요일 새벽에 실행해서 내부 단편화를 제거했습니다.\n\n" +
        "**모니터링**\n\n" +
        "etcd의 Prometheus metrics를 수집해서 Grafana로 모니터링했습니다. 핵심 지표는 이랬어요. etcd_server_is_leader로 현재 Leader를 추적하고, etcd_server_has_leader로 Leader 부재를 감지했습니다. etcd_mvcc_db_total_size_in_bytes로 데이터 크기를 모니터링하고, 7GB 초과 시 알림을 보냈어요. etcd_disk_backend_commit_duration_seconds로 디스크 I/O 지연을 추적하고, 100ms 초과 시 경고했습니다.\n\n" +
        "**실제 장애 사례**\n\n" +
        "145번 노드의 디스크가 꽉 차서 etcd가 read-only 모드로 전환되었습니다. quota-backend-bytes에 도달했기 때문이었습니다. 즉시 defrag와 compaction을 수행해서 공간을 확보하고, quota를 12GB로 증가시켰습니다. 이 과정에서 APISIX는 정상 동작했습니다. 읽기는 가능했고, 쓰기만 일시적으로 실패했기 때문에 라우팅에는 영향이 없었습니다.\n\n" +
        "**핵심 교훈**\n\n" +
        "첫째, etcd는 단순해 보여도 프로덕션에서는 세심한 관리가 필요합니다. 디스크 I/O, 데이터 크기, Compaction을 모두 신경 써야 안정적입니다.\n\n" +
        "둘째, 3노드 클러스터면 대부분의 경우 충분합니다. 5노드는 더 높은 가용성이 필요할 때만 고려하세요. 노드가 많을수록 합의 비용이 증가합니다.\n\n" +
        "셋째, etcd와 APISIX는 같은 서버에 두지 마세요. 리소스 경쟁이 발생하고, 서버 장애 시 둘 다 죽습니다. 우리는 별도 서버에 배치해서 독립성을 보장했습니다.\n\n" +
        "넷째, Backup은 필수이지만, 복구 테스트가 더 중요합니다. 백업만 해두고 복구를 안 해봤다면, 실제 장애 시 복구 못 할 수 있습니다. 주기적인 DR 테스트가 핵심입니다.",
      en: "A concise Distributed System answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 150,
    category1: "Infrastructure",
    category2: "CDC Monitoring",
    question: {
      ko: "Kafka Connect 기반 CDC(Change Data Capture) 파이프라인에서 어떻게 모니터링 체계를 구축했습니까? Oracle LogMiner 기반 CDC를 운영할 때 특히 어떤 메트릭이 중요했습니까?",
    },
    answer: {
      ko:
        "CDC 파이프라인 모니터링은 '데이터가 얼마나 늦었나'와 '얼마나 많이 누락됐나' 두 가지가 핵심입니다.\n\n" +
        "**배경: Kubernetes 외부 CDC 아키텍처**\n\n" +
        "TheShop에서 운영하는 CDC 파이프라인은 Kubernetes 위에 있지 않습니다. Oracle 온프레미스 DB → Debezium 3.4 Kafka Connect → Kafka 클러스터 → JDBC Sink 방향으로 흐르며, Kafka Connect 자체는 VM에서 Strimzi 없이 실행됩니다. 이 환경에서 Kubernetes native 모니터링 도구는 쓸 수 없었고, JMX Exporter + OTEL Collector 조합으로 직접 구성했습니다.\n\n" +
        "**Oracle LogMiner 핵심 메트릭**\n\n" +
        "Oracle Source Connector에서 가장 중요한 메트릭은 세 가지였습니다.\n\n" +
        "첫째, `debezium_streaming_millisecondsbehindcommitsource` — Debezium이 Oracle의 Redo Log를 얼마나 뒤처져서 읽고 있는지 나타냅니다. 이 값이 증가하기 시작하면 Oracle LogMiner가 느려진 것입니다. 경험상 10분(600,000ms)을 넘으면 Alert를 보냈어요. 평소 100~500ms 수준을 유지해야 합니다.\n\n" +
        "둘째, `debezium_oracle_currentscn` — Oracle의 현재 SCN(System Change Number)과 Debezium이 처리 중인 SCN의 차이입니다. SCN Gap이 벌어지면 배치 트랜잭션이 폭발했거나 LogMiner 세션이 재시작된 것입니다. 특히 Oracle RMAN 백업이 돌 때 LogMiner가 느려지는 문제를 이 메트릭으로 조기 발견했습니다.\n\n" +
        "셋째, `debezium_oracle_uga_memory_bytes` / `debezium_oracle_pga_memory_bytes` — LogMiner가 메모리를 얼마나 사용하는지입니다. LogMiner가 대량 DML을 처리할 때 PGA가 급증해서 Oracle 전체 성능에 영향을 줄 수 있습니다. 특정 임계치(4GB)를 초과하면 Debezium Connector를 재시작하는 자동화를 구현했습니다.\n\n" +
        "**Kafka Connect JMX → Prometheus 파이프라인**\n\n" +
        "Kafka Connect JMX 메트릭을 수집하기 위해 두 단계 파이프라인을 구성했습니다.\n\n" +
        "1. `jmx_prometheus_javaagent.jar`를 Kafka Connect 기동 시 `-javaagent` 옵션으로 주입\n" +
        "2. JMX exporter가 9999 포트로 Prometheus 형식 메트릭 노출\n" +
        "3. OTEL Collector의 Prometheus Receiver로 scrape하여 OTLP로 변환\n" +
        "4. monitoring-stack의 OTEL Gateway → Prometheus로 push\n\n" +
        "이 구조 덕분에 Kafka Connect 메트릭이 기존 Grafana 대시보드와 동일한 쿼리 언어로 분석됩니다.\n\n" +
        "**양방향 CDC 루프 방지 모니터링**\n\n" +
        "Oracle ↔ MySQL 양방향 복제를 운영할 때 가장 위험한 것은 무한 루프입니다. 이를 방지하기 위해 Debezium SMT(Single Message Transform)에 Groovy 스크립트로 `__cdc_source` 필드를 삽입했습니다.\n\n" +
        "모니터링 관점에서 중요한 것은 이 필터가 제대로 동작하는지 검증하는 메트릭입니다. Sink Connector의 `filtered_record_count`를 Prometheus로 추적해서, 필터링 비율이 갑자기 0%가 되면 SMT가 bypass된 것을 감지했습니다. 또한 특정 테이블의 Row Count를 Oracle과 MySQL에서 동시에 집계해서 Grafana에 비교 차트로 표시했습니다. 두 값이 계속 다르면 복제 불일치입니다.\n\n" +
        "**Airflow 배치와 CDC 상관 모니터링**\n\n" +
        "CDC 파이프라인과 Airflow 배치가 같은 데이터를 다루기 때문에 두 시스템의 상태를 연결해서 볼 필요가 있었습니다.\n\n" +
        "Airflow 쪽에서는 DAG별 `last_success_time`, `task_duration_seconds`, `task_failure_count`를 OTEL로 내보냈습니다. Grafana에서 CDC lag 차트 옆에 관련 Airflow DAG 상태를 배치했는데, 이게 매우 유용했습니다. CDC lag이 증가할 때 동시에 Airflow DAG가 실패하면 Kafka Consumer 경합 문제이고, CDC lag만 증가하면 Oracle 쪽 문제였습니다.\n\n" +
        "**실제 장애 사례: Oracle RMAN 백업 충돌**\n\n" +
        "새벽 2시 백업 윈도우에서 CDC lag이 5분 → 45분으로 급등했습니다. `currentscn` 메트릭으로 보니 Debezium SCN Gap이 10만 이상으로 벌어졌고, `pga_memory_bytes`도 5GB를 초과했습니다.\n\n" +
        "원인은 RMAN 백업 중 LogMiner 세션이 메모리 부족으로 재시작된 것이었습니다. 해결책은 두 가지였습니다. 첫째, Oracle DBA와 협의해서 RMAN 백업 스케줄을 Debezium Connector를 일시 정지하는 시간대와 맞췄습니다. 둘째, Debezium의 `log.mining.session.max.ms=60000`을 설정해서 LogMiner 세션을 1분마다 갱신하도록 했습니다. 이후 같은 백업 윈도우에서 lag이 최대 2분 수준으로 유지되었습니다.\n\n" +
        "**핵심 교훈**\n\n" +
        "CDC 모니터링에서 가장 중요한 것은 '데이터베이스 레벨 메트릭'과 '파이프라인 레벨 메트릭'을 모두 봐야 한다는 것입니다. Kafka Consumer lag만 보면 DB 쪽 문제를 놓칩니다. Oracle PGA/UGA 메모리, LogMiner SCN Gap, Debezium 스냅샷 진행률을 함께 봐야 진짜 병목을 찾을 수 있습니다.",
      en: "A concise CDC Monitoring answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 151,
    category1: "Infrastructure",
    category2: "Observability Platform",
    question: {
      ko: "온프레미스 환경에서 고가용성 관측성 플랫폼(OTEL + Prometheus + Loki + Tempo + Grafana)을 직접 구축했을 때 가장 어려웠던 설계 결정은 무엇이었습니까?",
    },
    answer: {
      ko:
        "고가용성 관측성 플랫폼을 직접 구축할 때 가장 어려웠던 것은 'OTEL Collector 자체가 SPOF가 되는 문제'였습니다.\n\n" +
        "**문제: Collector 단일 장애 지점**\n\n" +
        "처음 설계는 단일 OTEL Collector였습니다. 모든 에이전트가 하나의 Collector(10.101.91.145:4317)로 데이터를 보냈는데, Collector 업그레이드나 장애 시 전체 텔레메트리가 유실됐습니다. 관측성 시스템이 먼저 죽으면 장애 대응이 불가능하다는 아이러니한 상황입니다.\n\n" +
        "**해결: 3x Gateway + Nginx 로드밸런서**\n\n" +
        "현재 운영 중인 monitoring-stack은 다음과 같이 구성되어 있습니다:\n\n" +
        "- `otel-gw-1`, `otel-gw-2`, `otel-gw-3`: 각 2GB 메모리 제한의 독립 OTEL Collector 컨테이너 (opentelemetry-collector-contrib:0.148.0)\n" +
        "- `otel-nginx`: Nginx 1.27 리버스 프록시가 OTLP gRPC(4317), OTLP HTTP(4318), Loki HTTP(3500), Loki gRPC(3600)를 세 Gateway로 분산\n" +
        "- `otel-scraper`: Prometheus pull-based scrape 전용 단일 Collector (push/pull 역할 분리)\n\n" +
        "Nginx에서 gRPC 로드밸런싱의 함정이 있었습니다. HTTP/2 기반 gRPC는 한 번 연결되면 같은 서버로만 요청을 보냅니다. 이를 해결하기 위해 `grpc_next_upstream` 설정과 Least Connection 알고리즘을 함께 써서 커넥션 유지 시간을 제한했습니다.\n\n" +
        "**Push vs Pull 분리 설계**\n\n" +
        "OTEL Collector를 두 역할로 분리한 것이 핵심 결정이었습니다.\n\n" +
        "**Push (otel-gw-1~3):** 에이전트, 앱, monitoring-agent가 능동적으로 데이터를 보내는 채널. 여기는 HA가 필수이므로 3중화했습니다.\n\n" +
        "**Pull (otel-scraper):** Prometheus의 scrape 모델로 Node Exporter, Redis Exporter, Kafka JMX 등을 주기적으로 수집. 이쪽은 단일 인스턴스로 충분합니다. Pull은 Collector가 죽었다 살아나도 다음 scrape 주기에 자동 복구되니까요.\n\n" +
        "이 분리 덕분에 Push 트래픽과 Pull 스케줄링이 서로 간섭하지 않았습니다. 초기 단일 Collector에서는 burst push와 대량 scrape가 겹치면 메모리가 급증했습니다.\n\n" +
        "**Prometheus 3 OTLP Native Receiver**\n\n" +
        "Prometheus 3.x부터는 OTLP를 native로 받을 수 있습니다. `--web.enable-otlp-receiver` 플래그를 켜면 Prometheus가 직접 OTLP endpoint를 엽니다. 이를 이용해서 OTEL Gateway의 exporter 목적지로 Prometheus를 직접 지정했습니다.\n\n" +
        "기존에는 OTEL → Prometheus Remote Write → Prometheus였다면, 지금은 OTEL → OTLP Native → Prometheus입니다. Remote Write는 쓰기 증폭 문제가 있었는데, OTLP native는 이 오버헤드가 없어서 대규모 메트릭 수집이 안정화되었습니다.\n\n" +
        "**장기 보관: otel-kafka-pg 브릿지**\n\n" +
        "모니터링 스택의 Retention 정책은 Prometheus 7일, Loki 30일, Tempo 7일입니다. 하지만 특정 트레이스는 감사나 디버깅을 위해 더 오래 보관해야 했습니다.\n\n" +
        "이를 위해 otel-kafka-pg라는 Go 서비스를 직접 개발했습니다. OTEL Gateway에서 중요한 트레이스/로그를 Kafka 토픽(`otlp.traces`, `otlp.logs`)으로 발행하면, otel-kafka-pg가 컨슈머 그룹으로 읽어서 PostgreSQL에 배치 삽입합니다. 배치 크기 100건, flush 5초 간격으로 처리합니다.\n\n" +
        "결과적으로 실시간 분석은 Grafana → Prometheus/Loki/Tempo, 장기 분석은 PostgreSQL에서 SQL로 쿼리하는 두 개 경로가 만들어졌습니다.\n\n" +
        "**ClickHouse for OLAP**\n\n" +
        "Scouter APM과 대규모 메트릭 집계는 ClickHouse에 별도 저장합니다. OTEL Gateway에서 ClickHouse Exporter를 통해 직접 삽입하고, Grafana ClickHouse 플러그인으로 쿼리합니다. 컬럼형 스토리지라 시계열 집계(30일 P99 latency 트렌드, 월별 에러율 등)가 매우 빠릅니다.\n\n" +
        "**운영 중 발견한 핵심 함정**\n\n" +
        "첫째, OTEL Collector의 메모리 제한을 반드시 설정해야 합니다. memory_limiter processor를 두지 않으면 burst 시 Collector가 OOM으로 죽고, 그 순간의 데이터가 모두 유실됩니다.\n\n" +
        "둘째, Prometheus native histogram을 켜면 metric cardinality가 급증합니다. `--enable-feature=native-histograms`를 켤 때 기존 클래식 histogram과 병렬 수집이 되어서 스토리지가 2배 커졌어요. 전환 기간을 짧게 관리해야 합니다.\n\n" +
        "셋째, Grafana PostgreSQL 백엔드를 사용할 때 Grafana 자체 메타데이터 DB가 병목이 됩니다. Grafana 12.x에서 고차원 대시보드를 많이 열면 PostgreSQL 커넥션이 포화되는 문제를 Redis 세션 캐시로 완화했습니다.",
      en: "A concise Observability Platform answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 152,
    category1: "Infrastructure",
    category2: "Airflow SRE",
    question: {
      ko: "Apache Airflow를 KubernetesExecutor로 운영할 때 기존 CeleryExecutor 대비 SRE 관점에서 어떤 트레이드오프가 있었습니까?",
    },
    answer: {
      ko:
        "KubernetesExecutor로의 전환은 '리소스 효율성'을 얻는 대신 '디버깅 복잡도'가 올라가는 트레이드오프였습니다.\n\n" +
        "**기존 CeleryExecutor의 문제**\n\n" +
        "이전에는 Docker Compose + CeleryExecutor로 Airflow를 운영했습니다. 워커가 항상 상주하다 보니 DAG가 하나도 없는 새벽 2시에도 CPU/메모리가 지속 점유됐습니다. 게다가 워커 수를 고정해야 해서 피크 타임(오전 9시 데이터 집계) 때 DAG 큐가 밀렸어요.\n\n" +
        "**KubernetesExecutor: 태스크마다 Pod 생성**\n\n" +
        "현재 air-k8s 프로젝트는 온프레미스 HA K8s 클러스터(kubespray, 3 control + 3 worker)에서 KubernetesExecutor로 운영됩니다. 각 Airflow Task가 실행될 때마다 독립 Pod를 생성하고, 완료 후 삭제합니다.\n\n" +
        "SRE 관점의 이점:\n" +
        "- **리소스 격리**: Task A의 메모리 누수가 Task B에 영향을 주지 않음\n" +
        "- **동시성 확장**: 클러스터 용량 내에서 무한 병렬 실행 가능 (CeleryExecutor는 워커 수 고정)\n" +
        "- **환경 일관성**: 각 Task는 동일한 컨테이너 이미지로 실행되어 'Works on my machine' 문제 제거\n\n" +
        "SRE 관점의 난점:\n" +
        "- **Pod 기동 지연**: 태스크 시작 시 컨테이너 이미지 pull + Pod 스케줄링에 10~30초 소요. SLA가 빡빡한 DAG에는 이 지연이 문제였습니다\n" +
        "- **Pod 로그 수집**: 완료된 Pod는 삭제되므로 로그 영속화가 필수. Rook-Ceph CephFS PVC에 로그를 mount해서 보존\n" +
        "- **디버깅 복잡도**: 태스크 실패 시 `kubectl describe pod`로 Pod 이벤트, `kubectl logs` 로 컨테이너 로그, Airflow UI 로그를 함께 봐야 함\n\n" +
        "**연결 관리: KubernetesSecretsBackend**\n\n" +
        "운영에서 가장 큰 차이는 Connection 관리 방식이었습니다. CeleryExecutor 시절에는 `.env` 파일로 DB 비밀번호를 관리했습니다. KubernetesExecutor로 전환하면서 `KubernetesSecretsBackend`를 도입했습니다.\n\n" +
        "각 Connection은 K8s Secret으로 저장됩니다:\n" +
        "- `airflow-conn-kafka-onpre` → Kafka 브로커 주소\n" +
        "- `airflow-conn-mariadb-rds-dev` → DEV 계정 RDS\n" +
        "- `airflow-conn-postgres-dev` → Connect 네임스페이스 PostgreSQL\n\n" +
        "Secret에 `connections.airflow` 라벨을 붙이면 Airflow가 자동으로 인식합니다. 덕분에 `airflow connections import` 없이 Secret 추가만으로 Connection이 활성화되었습니다. RBAC으로 네임스페이스별 접근도 제어했습니다.\n\n" +
        "**DAG GitOps: git-sync 사이드카**\n\n" +
        "100개 이상의 DAG를 운영하면서 'DAG 배포 실수'가 잦았습니다. 특히 `schedule_interval` 변경이 즉시 반영되어 예상치 못한 시간에 DAG가 실행되는 사고가 있었습니다.\n\n" +
        "해결책은 `git-sync` 사이드카입니다. Airflow Scheduler Pod에 git-sync 컨테이너를 함께 띄워서 GitLab `dags/` 브랜치를 PVC에 자동 동기화합니다. DEV는 `dev` 브랜치, PRD는 `prd` 브랜치로 분리했습니다.\n\n" +
        "Jenkins CI가 GitLab push를 감지해서 ruff lint → 구문 검증 → Airflow 가져오기 테스트를 실행합니다. 파이프라인이 통과한 커밋만 `prd` 브랜치에 merge되어 PRD DAG에 반영됩니다. 이 흐름으로 손으로 파일을 올리는 방식을 완전히 제거했습니다.\n\n" +
        "**Airflow SLO: DAG 실패율**\n\n" +
        "SRE로서 Airflow에 SLO를 설정했습니다. 핵심 DAG(Oracle→MariaDB 동기화, S3 Parquet 적재)는 '일별 성공률 99.5%' 목표입니다.\n\n" +
        "모니터링은 두 레이어로 합니다. 첫째, Airflow UI의 DAG Run 상태를 OTEL 메트릭으로 변환해서 Grafana 알림 규칙을 붙였습니다. 둘째, Airflow `email_on_failure` 대신 Slack Webhook으로 실패 알림을 보내서 팀이 즉시 인지하도록 했습니다.\n\n" +
        "과거 Docker Compose 시절 Airflow DAG 실패율이 약 8%였는데, KubernetesExecutor 전환 이후 0.5% 미만으로 개선되었습니다. 가장 큰 원인은 워커 환경 불일치가 사라진 것이었습니다.",
      en: "A concise Airflow SRE answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 153,
    category1: "Infrastructure",
    category2: "Data Engineering",
    question: {
      ko: "OTLP 텔레메트리 데이터를 Kafka를 통해 PostgreSQL에 장기 보관하는 파이프라인을 Go로 직접 개발했는데, 왜 Kafka를 중간에 두었습니까? 단순히 OTLP → PostgreSQL 직접 삽입과 비교해서 어떤 장점이 있었습니까?",
    },
    answer: {
      ko:
        "Kafka를 중간에 둔 이유는 '속도 불일치(Impedance Mismatch) 해소'와 '다중 소비자 지원' 때문입니다.\n\n" +
        "**문제 상황: OTLP → PostgreSQL 직접 삽입의 한계**\n\n" +
        "처음에는 OTEL Collector의 PostgreSQL Exporter를 써서 직접 삽입하는 방식을 시도했습니다. 하지만 두 가지 문제가 생겼습니다.\n\n" +
        "첫째, OTEL Collector가 수집 속도와 PostgreSQL 삽입 속도의 차이를 버퍼링합니다. 피크 시간에 PostgreSQL I/O가 느려지면 Collector 메모리가 급증하고, 결국 Drop이 발생했습니다.\n\n" +
        "둘째, 같은 OTLP 데이터를 ClickHouse(실시간 분석), PostgreSQL(장기 보관), S3(데이터 레이크) 세 곳에 보내야 했는데, Collector에서 세 Exporter를 동시에 쓰면 하나가 실패해도 나머지 두 개가 데이터를 잃는 문제가 있었습니다.\n\n" +
        "**해결: Kafka를 분리 레이어로 추가**\n\n" +
        "OTEL Gateway → Kafka (`otlp.traces`, `otlp.logs` 토픽) → 각 소비자(otel-kafka-pg, ClickHouse Kafka Connector, S3 Sink Connector) 구조로 재설계했습니다.\n\n" +
        "이 구조의 장점은 다음과 같습니다:\n\n" +
        "1. **속도 분리**: OTEL Gateway는 Kafka에 쓰는 속도로만 실행됩니다. PostgreSQL이 느려져도 OTEL 수집에 영향 없음\n" +
        "2. **독립 소비자**: otel-kafka-pg가 죽어도 ClickHouse Consumer는 계속 동작합니다. 각 Consumer가 독립 offset을 가지므로\n" +
        "3. **재처리 가능**: PostgreSQL 삽입 실패 시 Kafka offset을 리셋해서 재처리 가능. 직접 삽입은 실패한 데이터를 복구할 방법이 없음\n" +
        "4. **팬아웃 무료**: 동일 토픽을 여러 Consumer Group이 구독하면 데이터 복사 없이 다목적 소비 가능\n\n" +
        "**otel-kafka-pg 구현 세부사항**\n\n" +
        "Go 1.24로 DDD 패턴으로 구현했습니다. `modules/kafka/consumer`가 Consumer Group(`telemetry-processor-group`)으로 토픽을 구독하고, `modules/trace/service`와 `modules/log/service`가 OTLP Protobuf를 파싱해서 도메인 모델로 변환하며, `modules/trace/repository`가 PostgreSQL에 배치 삽입합니다.\n\n" +
        "배치 처리가 성능의 핵심이었습니다. 메시지를 하나씩 INSERT하면 초당 수백 건 수준인데, 100건씩 묶어서 bulk INSERT하면 초당 수천 건으로 올라가요. `BATCH_SIZE=100`, `FLUSH_INTERVAL=5000ms`로 설정해서 지연과 처리량의 균형을 맞췄습니다.\n\n" +
        "PostgreSQL 스키마는 쿼리 패턴에 최적화했습니다. `trace_id`, `span_id`에 인덱스를 두고, `timestamp` 컬럼으로 파티션 테이블을 월별로 분리했습니다. 이렇게 하면 '특정 trace_id로 로그 조회'와 '3개월 전 특정 날짜 에러 패턴 분석'이 모두 빠릅니다.\n\n" +
        "**실제 사용 사례: 장기 감사 및 보안 분석**\n\n" +
        "이 파이프라인의 실제 가치는 두 가지 시나리오에서 나왔습니다.\n\n" +
        "첫째, 보안 감사입니다. 특정 사용자가 90일 전에 어떤 API를 호출했는지 조회해야 할 때, Grafana Tempo(7일 보관)로는 불가능하지만 PostgreSQL에서는 SQL 한 줄로 가능했습니다.\n\n" +
        "둘째, 장애 패턴 분석입니다. '이 에러가 처음 발생한 게 언제였나'를 6개월 데이터로 분석할 수 있었습니다. Grafana의 단기 Retention으로는 이런 분석이 불가능했는데, otel-kafka-pg 덕분에 PostgreSQL에서 직접 쿼리할 수 있었습니다.\n\n" +
        "**핵심 교훈**\n\n" +
        "Kafka를 중간 레이어로 두면 시스템 복잡도가 올라가는 것은 사실입니다. 하지만 속도 불일치가 있는 두 시스템 사이를 연결할 때, Kafka는 그 복잡도 비용을 충분히 정당화합니다. 특히 같은 데이터 스트림을 여러 목적으로 소비해야 할 때 팬아웃 패턴은 필수적입니다.",
      en: "A concise Data Engineering answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 154,
    category1: "Infrastructure",
    category2: "OTEL Architecture",
    question: {
      ko: "3중화 OTEL Collector 환경에서 Kubernetes 이벤트를 중복 수집하지 않으려면 어떻게 해야 하습니까? Leader Election을 Collector에 적용한 경험을 설명해주세요.",
    },
    answer: {
      ko:
        "3개의 OTEL Gateway가 모두 Kubernetes 이벤트를 수집하면 같은 이벤트가 3배로 Loki에 들어옵니다. 이 문제를 k8s_leader_elector Extension으로 해결했습니다.\n\n" +
        "**왜 중복이 발생하는가**\n\n" +
        "monitoring-stack은 OTLP 트래픽의 HA를 위해 otel-gw-1~3을 3중화합니다. 각 Gateway는 동일한 config를 쓰기 때문에 k8sobjects receiver(pods/events/deployments/nodes 감시)도 세 인스턴스가 모두 실행합니다. Kubernetes events watch는 API server에서 streaming으로 받기 때문에, 3개가 동시에 watch하면 같은 이벤트가 Loki에 3번 들어가요.\n\n" +
        "**k8s_leader_elector Extension**\n\n" +
        "OTEL Collector contrib의 `k8sleaderelector` extension을 사용하면 3개 인스턴스 중 하나만 Leader로 선출됩니다. Leader가 죽으면 나머지 두 중 하나가 자동으로 새 Leader가 됩니다.\n\n" +
        "설정 구조는 다음과 같습니다:\n\n" +
        "```yaml\nextensions:\n  k8s_leader_elector:\n    lease_name: otel-k8s-collector\n    lease_namespace: monitoring\n    lease_duration: 15s\n    renew_deadline: 10s\n    retry_period: 2s\n```\n\n" +
        "그리고 k8sobjects receiver를 사용하는 pipeline에 이 extension을 leader_election으로 등록합니다. 이렇게 하면 Leader 인스턴스만 해당 pipeline을 활성화합니다.\n\n" +
        "**Leader Election 메커니즘**\n\n" +
        "내부적으로 Kubernetes Lease object를 이용합니다. `monitoring` 네임스페이스에 `otel-k8s-collector`라는 Lease가 생성되고, 3개 인스턴스가 이 Lease를 선점하려 경쟁합니다. 현재 Leader는 `lease_duration(15s)` 마다 Lease를 갱신합니다. 갱신이 `renew_deadline(10s)` 이내에 이루어지지 않으면 Lease가 만료되고 다른 인스턴스가 선점합니다.\n\n" +
        "Leader가 교체되면 약 15~30초 동안 K8s 이벤트 수집이 중단됩니다. 이는 허용 가능한 범위였습니다. 반대로 모든 인스턴스가 수집하면 Loki에 중복 데이터가 쌓여서 스토리지 비용과 쿼리 노이즈가 증가하는 문제가 훨씬 컸습니다.\n\n" +
        "**K8s Objects 수집 설계**\n\n" +
        "k8sobjects receiver는 두 가지 모드로 동작합니다:\n\n" +
        "- `pull` (5분 간격): pods, deployments, nodes — 현재 상태 스냅샷\n" +
        "- `watch` (실시간 streaming): events — 생성/변경/삭제 이벤트\n\n" +
        "`events.k8s.io` 그룹의 Event object를 watch하면 Pod OOMKilled, ImagePullBackOff, Eviction 같은 K8s 이벤트가 Loki로 들어옵니다. `transform/k8s_events` processor에서 JSON body를 파싱해서 severity(Normal/Warning), reason, kind, name 필드를 추출하고, `resource/k8s` processor에서 `k8s.cluster.name=theshop-onprem` 레이블을 자동 주입합니다.\n\n" +
        "**KUBECONFIG 주입**\n\n" +
        "온프레미스 K8s 클러스터는 OTEL Collector와 같은 네트워크에 있지만 별도 서버입니다. Docker Compose로 배포된 Gateway에서 K8s API server에 접근하려면 kubeconfig가 필요합니다. `/data/grafana/config/otel-k8s-kubeconfig.yaml`을 read-only로 마운트해서 인증했습니다.\n\n" +
        "kubeconfig에 설정된 ServiceAccount는 `monitoring` 네임스페이스에 최소 권한만 부여했습니다. events/watch, pods/list, deployments/list, nodes/list, leases/get/create/update만 허용합니다. Lease 생성/업데이트 권한이 없으면 Leader Election 자체가 안 됩니다.\n\n" +
        "**핵심 교훈**\n\n" +
        "Collector를 다중화할 때는 '모든 기능을 모든 인스턴스가 동일하게 실행한다'는 가정을 버려야 합니다. Push 수신(OTLP), Log 수집(Loki)은 3개 모두 실행해도 되지만, Pull-based 수집(K8s events watch, Node Exporter scrape)은 반드시 단일 인스턴스 또는 Sharding이 필요합니다. 그래서 monitoring-stack은 K8s scrape를 otel-gw가 아닌 단독 otel-scraper 컨테이너로 분리한 것이기도 합니다.",
      en: "A concise OTEL Architecture answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 155,
    category1: "Infrastructure",
    category2: "Log Management",
    question: {
      ko: "Loki에서 로그 수집량이 급증했을 때 rate limit 문제를 어떻게 해결했습니까? TSDB 스키마 전환과 retention 정책 설계 경험을 함께 설명해주세요.",
    },
    answer: {
      ko:
        "Loki rate limit 문제는 초기 기본값 그대로 두고 운영하다가 발생했습니다. 특히 Airflow DAG가 일괄 배치 실행될 때 단시간에 로그가 폭발하는 상황이 문제였습니다.\n\n" +
        "**발생한 에러와 원인**\n\n" +
        "Airflow DAG 실행 시 Grafana에 이런 에러가 보이기 시작했습니다:\n\n" +
        "`429 Too Many Requests: per-user ingestion rate limit (4MB/s) exceeded`\n\n" +
        "기본값은 `ingestion_rate_mb: 4`, `ingestion_burst_size_mb: 6`이었습니다. Airflow KubernetesExecutor는 태스크마다 Pod를 생성하고 동시에 수십 개가 실행될 때 모든 로그가 동시에 OTEL Gateway → Loki로 흘러들어옵니다. 100개 DAG의 태스크가 병렬로 실행되면 초당 수백 MB가 들어오는 거죠.\n\n" +
        "**해결: rate limit 상향 조정**\n\n" +
        "현재 운영 중인 loki-config.yaml의 limits_config 설정입니다:\n\n" +
        "```yaml\nlimits_config:\n  ingestion_rate_mb: 16          # 4MB → 16MB\n  ingestion_burst_size_mb: 32    # 6MB → 32MB\n  per_stream_rate_limit: 8MB\n  per_stream_rate_limit_burst: 16MB\n  max_global_streams_per_user: 20000\n  max_line_size: 1048576          # 1MB (Spring Stack Trace 대응)\n  reject_old_samples: false       # 배치 재처리 허용\n  reject_old_samples_max_age: 336h # 2주\n  creation_grace_period: 2h       # 미래 타임스탬프 허용\n```\n\n" +
        "`reject_old_samples: false`가 중요한 설정입니다. 기본값은 `true`인데, 이렇게 하면 2주 이상 된 타임스탬프 로그가 모두 거부됩니다. Airflow 배치 작업에서 과거 데이터를 재처리할 때 원본 타임스탬프를 보존하면 2주 이전 데이터가 reject되습니다. 이 옵션을 끄면 언제든 원본 시간 기준 로그를 삽입할 수 있습니다.\n\n" +
        "**TSDB 스키마 v13 전환**\n\n" +
        "초기에는 schema v11(BoltDB shipper)을 사용했는데, 대량 스트림에서 인덱스 파일이 커지면서 조회 성능이 하락했습니다. TSDB(v13) 스키마로 전환하면서 크게 개선됐습니다.\n\n" +
        "TSDB 스키마의 핵심 차이는 인덱스 저장 방식입니다. BoltDB shipper는 날짜별 파일로 인덱스를 저장하는데, 로그 스트림이 많을수록 파일이 분산되어 조회 시 I/O가 증가합니다. TSDB는 컬럼형 인덱스로 압축률이 높고 range query에 최적화됐습니다.\n\n" +
        "현재 schema 설정:\n\n" +
        "```yaml\nschema_config:\n  configs:\n    - from: 2020-05-15\n      store: tsdb\n      schema: v13\n      index:\n        prefix: index_\n        period: 24h\n```\n\n" +
        "**Retention 정책 설계**\n\n" +
        "`retention_period: 360h`(15일)로 설정했습니다. 이 결정의 근거는 세 가지였습니다.\n\n" +
        "첫째, Loki는 실시간 분석용입니다. 15일 이내 로그는 Grafana에서 바로 조회합니다. 15일 이전 로그는 S3 → Athena나 ClickHouse로 쿼리합니다.\n\n" +
        "둘째, 서버 디스크 용량 제약입니다. 하루 약 20GB 수집 기준으로 15일이면 300GB입니다. `/data/grafana/loki` 볼륨 크기를 기준으로 계산했습니다.\n\n" +
        "셋째, compactor 설정입니다. `compaction_interval: 10m`, `retention_delete_delay: 2h`, `retention_delete_worker_count: 150`으로 설정해서 만료된 청크를 빠르게 정리합니다. worker를 150개로 늘린 것은 기본값(10개)으로는 대량 삭제 시 backlog가 쌓여서였습니다.\n\n" +
        "**OTLP Resource Attribute → Loki Index Label 매핑**\n\n" +
        "Loki에서 스트림 카디널리티 관리가 중요합니다. 너무 많은 필드를 index label로 쓰면 스트림이 폭발해서 `max_global_streams_per_user` 한도에 걸립니다.\n\n" +
        "현재 index label로 활성화한 resource attributes:\n\n" +
        "- 서비스 식별: `service.name`, `compose_service`, `app`, `job`\n" +
        "- 환경 구분: `service.env`, `env`, `service.namespace`\n" +
        "- 로그 레벨: `severity_text`, `level` (대소문자 여러 형태 자동 인식)\n" +
        "- K8s 컨텍스트: `k8s.namespace_name`, `k8s.pod_name`, `k8s.deployment_name`\n" +
        "- 트레이스 연결: `trace_id`, `span_id`\n" +
        "- 도메인 이벤트: `event_domain`, `request_id`\n\n" +
        "`trace_id`를 index label에 포함시키면 Grafana Explore에서 특정 trace_id로 로그를 바로 필터링할 수 있습니다. Tempo 트레이스 뷰에서 로그로 jump하는 'Traces to Logs' 기능도 이 설정이 있어야 동작합니다.\n\n" +
        "**핵심 교훈**\n\n" +
        "Loki는 '카디널리티를 낮게, 스트림을 적게'가 기본 철학입니다. 처음부터 모든 field를 label로 만들면 stream 수가 폭발하고 성능이 급락합니다. 핵심 필터링에 쓰이는 5~10개 field만 index label로 쓰고, 나머지는 log line에 포함시켜서 `| json` parser로 필터링하는 패턴이 올바릅니다.",
      en: "A concise Log Management answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 156,
    category1: "Infrastructure",
    category2: "Distributed Tracing",
    question: {
      ko: "Grafana Tempo의 Metrics Generator를 사용해서 RED 메트릭을 자동 생성한 경험을 설명해주세요. Service Graph와 Span Metrics의 차이는 무엇인가요?",
    },
    answer: {
      ko:
        "Tempo Metrics Generator를 도입한 계기는 '서비스 간 호출 관계와 에러율을 코드 변경 없이 즉시 파악하고 싶다'는 요구였습니다.\n\n" +
        "**기존 접근의 한계**\n\n" +
        "기존에는 RED 메트릭(Request rate, Error rate, Duration)을 각 서비스 SDK에서 직접 계측했습니다. 그런데 레거시 Java 서비스나 서드파티 모듈처럼 코드를 수정하기 어려운 경우에는 메트릭이 없었습니다. 또한 '서비스 A → 서비스 B 호출 레이턴시'처럼 서비스 간 관계 메트릭은 어느 한쪽 SDK에서 계측해야 하는데, 경계가 모호해서 중복이나 누락이 생겼어요.\n\n" +
        "**Tempo Metrics Generator: 트레이스 → 메트릭 변환**\n\n" +
        "Tempo는 수집된 트레이스 span을 분석해서 메트릭을 자동 생성합니다. 별도 SDK 변경 없이 OTLP trace만 있으면 됩니다.\n\n" +
        "현재 사용 중인 processor는 세 가지입니다:\n\n" +
        "**1. service-graphs**\n\n" +
        "서비스 간 호출 관계(DAG)와 RED 메트릭을 생성합니다. 설정:\n\n" +
        "```yaml\nprocessors:\n  service_graphs:\n    wait: 10s              # span 매칭 대기 시간\n    max_items: 10000       # 동시 추적 edge 수\n    workers: 10\n    histogram_buckets: [0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4, 12.8]\n    peer_attributes:       # 외부 호출 식별\n      - peer.service\n      - db.name\n      - db.system\n```\n\n" +
        "생성 메트릭 예시:\n" +
        '- `traces_service_graph_request_total{client="api-gateway", server="user-service"}` — 호출 수\n' +
        "- `traces_service_graph_request_failed_total` — 실패 호출 수\n" +
        "- `traces_service_graph_request_server_seconds_bucket` — 서버 사이드 레이턴시 히스토그램\n" +
        "- `traces_service_graph_request_client_seconds_bucket` — 클라이언트 사이드 레이턴시\n\n" +
        "이 메트릭으로 Grafana에서 서비스 맵(Service Map)을 그릴 수 있습니다. Grafana의 Tempo datasource에 `serviceMap.datasourceUid`로 Prometheus를 연결하면 자동으로 서비스 의존성 그래프가 시각화됩니다. DB, 외부 API 호출도 `peer.service`, `db.name` attribute를 통해 자동으로 node로 추가됩니다.\n\n" +
        "**2. span-metrics**\n\n" +
        "개별 span 단위의 RED 메트릭을 생성합니다. 설정:\n\n" +
        "```yaml\nspan_metrics:\n  histogram_buckets: [0.002, 0.004, 0.008, 0.016, 0.032, 0.064,\n                      0.128, 0.256, 0.512, 1.024, 2.048, 4.096, 8.192, 16.384]\n  intrinsic_dimensions:\n    service: true\n    span_name: true\n    span_kind: true\n    status_code: true\n```\n\n" +
        "생성 메트릭:\n" +
        '- `traces_spanmetrics_calls_total{service="order-service", span_name="POST /orders", status_code="OK"}` — 엔드포인트별 호출 수\n' +
        "- `traces_spanmetrics_latency_bucket` — P50/P95/P99 계산용 히스토그램\n\n" +
        "service-graphs와 span-metrics의 핵심 차이는 **granularity**입니다. service-graphs는 '서비스 A와 서비스 B 사이' 관계를 봅니다. span-metrics는 '서비스 A의 어떤 엔드포인트'가 느린지 봅니다. 서비스 맵 레벨 → 상세 엔드포인트 레벨로 drill-down하는 구조입니다.\n\n" +
        "**3. local-blocks**\n\n" +
        "```yaml\nlocal_blocks:\n  max_block_duration: 1m\n  max_block_bytes: 500000000  # 500MB\n  flush_check_period: 10s\n  trace_idle_period: 10s\n  complete_block_timeout: 1h\n  concurrent_blocks: 10\n```\n\n" +
        "TraceQL 기반의 Trace Search나 'live' 메트릭 계산에 사용되는 로컬 WAL입니다. 1분 이내 들어온 span이 여기 버퍼링되고, flush 후 main storage로 이동합니다.\n\n" +
        "**Exemplar 연동: 메트릭에서 트레이스로 Jump**\n\n" +
        "Tempo Metrics Generator가 Prometheus에 메트릭을 remote_write할 때 exemplar를 함께 전송합니다. Exemplar는 메트릭 데이터포인트에 trace_id를 연결하는 포인터입니다.\n\n" +
        "```yaml\nremote_write:\n  - url: http://prometheus:9090/api/v1/write\n    send_exemplars: true\n    send_native_histograms: true\n```\n\n" +
        "Grafana Prometheus datasource에서 Exemplar destination으로 Tempo를 설정하면, P99 레이턴시 그래프의 특정 데이터포인트를 클릭했을 때 그 순간의 실제 trace로 바로 이동할 수 있습니다. '레이턴시가 스파이크된 순간의 트레이스가 뭔지' 클릭 한 번으로 확인하는 SRE에게 매우 강력한 기능입니다.\n\n" +
        "**Traces to Logs 연동**\n\n" +
        "Grafana Tempo datasource에 traces-to-logs 설정을 했습니다:\n\n" +
        '```yaml\n# datasources.yaml\ntracesToLogs:\n  query: \'{service_name="${__span.tags.service.name}"} | json | trace_id="${__span.traceID}"\n          | span_id="${__span.spanID}"\'\n  filterByTraceID: true\n  spanStartTimeShift: -10m\n  spanEndTimeShift: 10m\n```\n\n' +
        "트레이스 span을 보다가 Loki 로그로 바로 점프합니다. `trace_id`와 `span_id`가 Loki index label로 설정되어 있어서 이 쿼리가 빠르게 동작합니다. span 시작/종료 전후 10분 범위의 로그까지 함께 보여주므로 장애 전후 맥락 파악이 쉽습니다.",
      en: "A concise Distributed Tracing answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 157,
    category1: "Infrastructure",
    category2: "Alerting",
    question: {
      ko: "Prometheus recording rule을 활용해서 복합 헬스 스코어 메트릭을 설계한 경험이 있습니까? SRE 관점에서 단순 임계치 알림 대신 복합 지표를 쓰는 이유는 무엇인가요?",
    },
    answer: {
      ko:
        "단순 임계치 알림(`cpu > 80%이면 alert`)의 한계는 맥락이 없다는 것입니다. CPU가 80%여도 정상 배치 실행 중일 수 있고, 50%여도 request latency가 급증하는 진짜 장애일 수 있습니다.\n\n" +
        "**복합 헬스 스코어 설계 배경**\n\n" +
        "monitoring-stack의 Prometheus alert rule에서 `service_health_composite`라는 복합 메트릭을 설계했습니다. monitoring-agent의 두 체커(CRI + HTTP)가 수집하는 데이터를 하나의 점수로 합산합니다.\n\n" +
        "**Recording Rule 구조**\n\n" +
        "Recording rule 파일(prometheus3/rules/health_labels.yml)은 4단계 계층으로 구성됩니다:\n\n" +
        "**1단계: cri_health_status_labeled** (container runtime 상태 텍스트화)\n\n" +
        '```yaml\n- record: cri_health_status_labeled\n  expr: |\n    label_replace(\n      cri_health_status == 1,\n      "health_text", "healthy", "", ""\n    )\n    OR\n    label_replace(\n      cri_health_status == 0,\n      "health_text", "unhealthy", "", ""\n    )\n```\n\n' +
        '숫자 0/1을 "healthy"/"unhealthy" 텍스트 레이블로 변환합니다. Grafana stat 패널에서 색상 코드를 텍스트 기반으로 조건부 적용할 때 유용합니다. 또한 알림 메시지에 \'컨테이너 상태: unhealthy\'처럼 사람이 읽기 쉬운 형태로 표시됩니다.\n\n' +
        "**2단계: cri_containers_by_range** (컨테이너 수 분류)\n\n" +
        '```yaml\n- record: cri_containers_by_range\n  expr: |\n    label_replace(cri_health_checks_total == 0, "range", "none", "", "")\n    OR\n    label_replace(\n      cri_health_checks_total > 0 and cri_health_checks_total <= 10,\n      "range", "low", "", ""\n    )\n    OR\n    label_replace(\n      cri_health_checks_total > 10 and cri_health_checks_total <= 50,\n      "range", "medium", "", ""\n    )\n    OR\n    label_replace(cri_health_checks_total > 50, "range", "high", "", "")\n```\n\n' +
        '서버 규모를 자동으로 분류합니다. 컨테이너 수가 0개인 서버는 배포 완료 후 비어있는 것인지 장애인지 구분이 필요합니다. "none" 분류를 보면 어느 서버에 컨테이너가 없는지 즉시 파악됩니다.\n\n' +
        "**3단계: health_check_age_category** (체크 데이터 신선도)\n\n" +
        '```yaml\n- record: health_check_age_category\n  expr: |\n    label_replace(\n      (time() - http_health_last_check_timestamp) < 60,\n      "age", "current", "", ""\n    )\n    OR\n    label_replace(\n      (time() - http_health_last_check_timestamp) >= 300,\n      "age", "stale", "", ""\n    )\n```\n\n' +
        "이 메트릭의 핵심 역할은 '헬스체크가 오래됐으면 알림 자체를 신뢰하지 말라'는 신호입니다. monitoring-agent가 죽거나 네트워크가 단절되면 메트릭 자체가 끊어지는데, \"stale\" 분류가 보이면 헬스체크 인프라 자체를 먼저 점검해야 합니다.\n\n" +
        "**4단계: service_health_composite** (최종 복합 스코어)\n\n" +
        "```yaml\n- record: service_health_composite\n  labels:\n    metric_type: composite\n  expr: |\n    (\n      clamp_max(cri_health_status, 1) * 100\n    )\n    +\n    (\n      clamp_max(http_health_active_endpoints, 11) / 11 * 100\n    )\n```\n\n" +
        "최대 200점 스코어입니다. 컨테이너가 살아있으면 100점, 모든 HTTP 엔드포인트(11개)가 응답하면 100점 추가. 100점 미만이면 컨테이너 장애, 100점 이상 200점 미만이면 컨테이너는 살아있지만 일부 엔드포인트 실패, 200점이면 완전 정상입니다.\n\n" +
        "**복합 스코어 알림의 장점**\n\n" +
        "단순 임계치 알림(`cri_health_status == 0 → alert`)은 binary입니다. 반면 복합 스코어는 severity 계층화가 자연스럽습니다:\n\n" +
        "- `service_health_composite < 50`: P0 (컨테이너 장애 + 엔드포인트 절반 이상 실패)\n" +
        "- `service_health_composite >= 50 AND < 100`: P1 (컨테이너 장애, 일부 엔드포인트는 동작)\n" +
        "- `service_health_composite >= 100 AND < 180`: P2 (컨테이너 정상, 엔드포인트 일부 실패)\n\n" +
        "같은 Slack 채널에 P0부터 P2까지 다른 형태로 알림이 가도록 라우팅했습니다. P0는 즉시 전화, P1은 5분 내 Slack, P2는 30분 지속 후 Slack입니다.\n\n" +
        "**File SD 기반 Node Exporter 대상 hot reload**\n\n" +
        "서버 추가/삭제 시 Prometheus를 재시작하지 않으려면 File SD(Service Discovery)를 써야 합니다. otel-scraper의 prometheus receiver에서 File SD로 node exporter 대상을 정의했습니다:\n\n" +
        "```yaml\njob_name: node\nfile_sd_configs:\n  - files:\n    - /etc/targets/node_targets.yaml\n    refresh_interval: 1m\n```\n\n" +
        "`node_targets.yaml`에 새 서버를 추가하면 1분 내에 자동으로 scrape 대상에 포함됩니다. `curl -X POST http://prometheus:9090/-/reload`로 hot reload도 가능합니다(`--web.enable-lifecycle` 플래그가 활성화돼 있으므로).\n\n" +
        "현재 node_targets.yaml에는 K8s control plane(10.101.99.158~160), K8s worker(161~163), GW(100~101), Connect API(102~104), Sandbox(145~146)가 있습니다. 서버 추가 시 이 파일만 수정하면 되기 때문에 인프라 확장이 Prometheus 무중단으로 진행됩니다.",
      en: "A concise Alerting answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 158,
    category1: "Infrastructure",
    category2: "Cardinality",
    question: {
      ko: "Prometheus metric cardinality 폭발을 경험한 적 있습니까? OTLP에서 Prometheus로 메트릭을 보낼 때 cardinality가 급증하는 원인과 해결 방법을 구체적으로 설명해주세요.",
    },
    answer: {
      ko:
        "Prometheus cardinality 문제는 OTLP 도입 초기에 가장 크게 겪었습니다. 원인은 'OTLP resource attribute를 Prometheus label로 전환하는 방식'을 잘못 설정한 것이었습니다.\n\n" +
        "**cardinality 폭발의 원인**\n\n" +
        "초기 prometheus.yaml에 다음 설정을 넣었습니다:\n\n" +
        "```yaml\notlp:\n  promote_all_resource_attributes: true\n```\n\n" +
        "이 한 줄이 문제였습니다. OTLP resource attributes는 span/metric/log마다 붙어오는 키-값 쌍 전체입니다. `promote_all_resource_attributes: true`로 설정하면 모든 resource attribute가 Prometheus label로 변환됩니다. 결과적으로 다음과 같은 label이 메트릭에 붙었습니다:\n\n" +
        "- `k8s.pod.name` → Pod 수만큼 time series 증식\n" +
        "- `process.pid` → 재시작마다 새 PID → 무한 증식\n" +
        "- `commerce.cart.add.source` → 이커머스 커스텀 이벤트 출처 (수십 종류)\n" +
        "- `cache.key.hash` → 캐시 키 해시값 → 사실상 unbounded cardinality\n" +
        "- `container.image.tag` → 배포마다 새 태그 → 증식\n\n" +
        "Prometheus가 처리할 수 있는 active time series 한도(기본 200만)에 근접했고, 쿼리 응답시간이 급격히 느려졌습니다. 특히 `range_query`가 수백 MB의 메모리를 점유했습니다.\n\n" +
        "**진단: 어떤 메트릭이 cardinality를 많이 차지하는지 찾기**\n\n" +
        "Prometheus의 TSDB status endpoint로 cardinality top-N을 확인했습니다:\n\n" +
        "```\nGET http://prometheus:9090/api/v1/status/tsdb?topN=20\n```\n\n" +
        '응답의 `seriesCountByMetricName`과 `labelValueCountByLabelName`을 보면 어떤 메트릭/레이블이 time series를 폭발시키는지 바로 보입니다. `cache_operation_duration_bucket{cache_key_hash="..."}`가 top 1이었습니다.\n\n' +
        "**해결 1: selective promote_resource_attributes**\n\n" +
        "```yaml\n# prometheus.yaml (현재 운영 설정)\notlp:\n  translation_strategy: NoUTF8EscapingWithSuffixes\n  keep_identifying_resource_attributes: true\n  promote_all_resource_attributes: true  # 주석 처리된 안전한 대안:\n  # promote_resource_attributes:\n  #   - service.name\n  #   - service.namespace\n  #   - deployment.environment\n  #   - k8s.cluster.name\n  #   - host.name\n  #   - job\n  #   - instance\n```\n\n" +
        "현재 운영에서는 `promote_all_resource_attributes: true`를 유지하되, 아래 transform processor에서 문제 attribute를 차단하는 방식으로 우회했습니다. 추후 `promote_resource_attributes` 화이트리스트 방식으로 전환 예정입니다.\n\n" +
        "**해결 2: transform processor에서 고카디널리티 attribute 제거**\n\n" +
        "otel-gw-config.yaml의 transform processor에서 Prometheus label로 전파할 attribute를 명시적으로 제어합니다:\n\n" +
        '```yaml\ntransform:\n  metric_statements:\n    # metric name 표준화: dot → underscore\n    - replace_pattern(metric.name, "\\\\.", "_")\n    # attribute key 표준화: dot → underscore\n    - replace_all_patterns(datapoint.attributes, "key", "\\\\.", "_")\n    # 필수 식별 label만 resource에서 datapoint로 복사\n    - set(datapoint.attributes["service_name"],\n          resource.attributes["service.name"])\n    - set(datapoint.attributes["job"],\n          resource.attributes["service.name"])\n          where datapoint.attributes["job"] == nil\n    # instance 우선순위: service.instance.id → host.name\n    - set(datapoint.attributes["instance"],\n          resource.attributes["service.instance.id"])\n          where datapoint.attributes["instance"] == nil\n    - set(datapoint.attributes["instance"],\n          resource.attributes["host.name"])\n          where datapoint.attributes["instance"] == nil\n```\n\n' +
        "`process.pid`, `cache.key.hash`, `k8s.pod.name` 같은 고카디널리티 attribute는 이 processor에서 명시적으로 복사하지 않으므로 datapoint label에 포함되지 않습니다. resource attribute로는 존재하지만 Prometheus label로 promote되지 않아요.\n\n" +
        "**해결 3: OTLP translation_strategy 설정**\n\n" +
        "Prometheus 3.x에서 OTLP 메트릭 이름 변환 방식을 `NoUTF8EscapingWithSuffixes`로 설정했습니다:\n\n" +
        "```yaml\notlp:\n  translation_strategy: NoUTF8EscapingWithSuffixes\n```\n\n" +
        "기본 전략(`UnderscoreEscapingWithSuffixes`)은 OTLP 메트릭 이름의 특수문자를 모두 이스케이프하는데, 이 과정에서 메트릭 이름이 달라져서 기존 dashboard query가 깨졌어요. `NoUTF8EscapingWithSuffixes`는 suffix(`_total`, `_bytes` 등)만 추가하고 이름은 최대한 유지합니다.\n\n" +
        "**해결 4: out_of_order_time_window 설정**\n\n" +
        "```yaml\nstorage:\n  tsdb:\n    out_of_order_time_window: 600m  # 10시간\n```\n\n" +
        "Airflow 배치가 수시간 전 데이터에 타임스탬프를 붙여서 메트릭을 보내면, Prometheus 기본 설정으로는 `out of order` 에러로 거부됩니다. 10시간 허용 윈도우를 열어두면 최대 10시간 이전 타임스탬프 메트릭까지 수용합니다. cardinality와 직접 연관은 없지만 데이터 손실 방지 측면에서 중요한 설정입니다.\n\n" +
        "**핵심 교훈**\n\n" +
        "Cardinality 관리의 3원칙:\n" +
        "1. **Prometheus label에 들어오는 것을 whitelist로 제어하라** — `promote_all_resource_attributes: true`는 개발 환경에서만 쓸 것\n" +
        "2. **PID, hash, 동적 ID는 절대 label로 쓰지 말 것** — series가 unbounded로 증식함\n" +
        "3. **TSDB status endpoint를 정기적으로 모니터링하라** — Prometheus가 제공하는 cardinality top-N을 alert로 걸어두면 폭발 전에 잡을 수 있음",
      en: "A concise Cardinality answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 159,
    category1: "Infrastructure",
    category2: "OTEL Pipeline Optimization",
    question: {
      ko: "OTEL Collector에서 수집 데이터 볼륨을 줄이기 위해 어떤 processor들을 실제로 적용했습니까? health check 트래픽, 중복 로그, Kafka Connect 메트릭 필터링 경험을 구체적으로 설명해주세요.",
    },
    answer: {
      ko:
        "OTEL 파이프라인 최적화는 '어떤 데이터를 버릴지 의식적으로 결정하는 것'입니다. 무작정 다 저장하면 비용과 쿼리 성능이 선형으로 나빠집니다.\n\n" +
        "**1. Health Check 트래픽 필터링**\n\n" +
        "HTTP 헬스체크는 30초마다 수십 개 서비스에서 발생합니다. 이게 OTLP로 들어오면 trace/log/metric 모두 발생합니다. 하루 10만 건 이상의 완전히 무의미한 데이터입니다.\n\n" +
        "```yaml\n# otel-gw-config.yaml\nfilter/health_logs:\n  error_mode: ignore\n  logs:\n    log_record:\n      - 'IsMatch(body, \".*health[-_]?check.*\")'\n      - 'IsMatch(body, \".*/api/health.*\")'\n\nfilter/health_traces:\n  error_mode: ignore\n  traces:\n    span:\n      - 'IsMatch(name, \".*health[-_]?check.*\")'\n      - 'IsMatch(name, \".*/api/health.*\")'\n\nfilter/health_metrics:\n  error_mode: ignore\n  metrics:\n    metric:\n      - 'IsMatch(name, \".*health[-_]?check.*\")'\n```\n\n" +
        "`error_mode: ignore`를 반드시 설정해야 합니다. 기본값은 `propagate`인데, 이렇게 하면 filter 표현식에서 예외가 발생할 때 해당 배치 전체가 drop됩니다. `ignore`로 설정하면 표현식 에러가 난 레코드만 통과시킵니다.\n\n" +
        "**2. Kafka Connect 메트릭 환경별 필터링**\n\n" +
        "Kafka Connect는 Debezium Connector 하나당 수십 개의 JMX 메트릭을 내보냅니다. DEV 환경까지 수집하면 거의 쓸모없는 데이터가 prd의 2~3배 쌓입니다.\n\n" +
        '```yaml\nfilter/kafka_connect_policy:\n  error_mode: ignore\n  metrics:\n    metric:\n      # kafka-connect 서비스이면서 prd가 아닌 환경 → drop\n      - \'resource.attributes["service.name"] == "kafka-connect"\n         and resource.attributes["env"] != "prd"\'\n  traces:\n    span:\n      # kafka-connect trace는 환경 무관 전량 drop\n      # (내부 connector 호출 trace는 디버깅 가치 없음)\n      - \'resource.attributes["service.name"] == "kafka-connect"\'\n```\n\n' +
        "Kafka Connect trace를 전량 drop하는 이유는 connector 내부 동작이 Debezium 메트릭(lag, scn, snapshot)으로 충분히 관찰 가능하기 때문입니다. trace는 애플리케이션 레벨 디버깅용인데, Kafka Connect는 이미 Prometheus JMX 메트릭으로 운영 가시성이 확보됩니다.\n\n" +
        "**3. logdedup: 반복 로그 중복 제거**\n\n" +
        "레거시 Java 서비스 중 일부는 같은 에러 메시지를 초당 수백 번 반복 출력합니다. 예를 들어 Connection Pool 고갈 시 `HikariPool-1 - Connection is not available` 메시지가 1분에 수만 번 나와요.\n\n" +
        '```yaml\nlogdedup:\n  interval: 10s\n  log_count_attribute: dedup_count\n  timezone: "Asia/Seoul"\n```\n\n' +
        "10초 윈도우 내에 동일한 log body+attributes 조합이 반복되면 하나로 합치고, 합쳐진 횟수를 `dedup_count` attribute에 기록합니다. Grafana에서 `dedup_count`가 높은 로그를 필터링하면 '무엇이 가장 반복되고 있는가'를 바로 알 수 있습니다.\n\n" +
        "주의: logdedup processor는 logs pipeline에서만 동작하고, 시계열 메트릭이나 trace에는 적용되지 않습니다. 또한 `timezone: Asia/Seoul` 설정은 시간 윈도우 경계를 UTC 대신 KST 기준으로 맞추기 위해서예요.\n\n" +
        "**4. batch processor 크기 조정**\n\n" +
        "Gateway(otel-gw)와 Scraper(otel-scraper)는 배치 설정이 다릅니다:\n\n" +
        "```yaml\n# otel-gw-config.yaml (Push 수신 전담)\nbatch:\n  send_batch_size: 200   # 작게 — 실시간성 우선\n  timeout: 5s            # 짧게 — 지연 누적 방지\n\n# otel-scraper-config.yaml (Pull 수집 전담)\nbatch:\n  send_batch_size: 1000  # 크게 — 처리량 우선\n  timeout: 10s           # 넉넉하게 — scrape 주기 맞춤\n```\n\n" +
        "Gateway는 실시간 OTLP 스트림을 받기 때문에 빠르게 downstream으로 flush해야 알림 지연이 없습니다. Scraper는 15초~10분 scrape 주기로 수집하기 때문에 큰 배치로 묶어서 보내는 게 효율적입니다.\n\n" +
        "**5. otel-node-collector: systemd journal 선택적 수집**\n\n" +
        "K8s 노드에 DaemonSet으로 배포한 otel-node-collector는 systemd journal 로그 중 etcd, kubelet, containerd 세 유닛만 수집합니다:\n\n" +
        "```yaml\nreceivers:\n  journald:\n    units:\n      - etcd.service\n      - kubelet.service\n      - containerd.service\n    priority: info   # info 이상만 수집\n    start_at: end    # 시작 시점부터만 (재시작 시 과거 재수집 방지)\n```\n\n" +
        "`priority: info`로 debug 로그를 차단하고, `start_at: end`로 collector 재시작 시 과거 journal을 재전송하는 것을 막았습니다. 특히 etcd는 Raft 합의 과정에서 debug 로그가 초당 수천 건 나오는데, info 이상만 수집하면 실제 장애 로그만 남습니다.\n\n" +
        "**전체 절감 효과**\n\n" +
        "이 최적화들을 모두 적용한 후 Loki 일일 수집량이 약 35% 감소했고, Prometheus active series가 피크 대비 40% 줄었습니다. 가장 효과가 컸던 것은 health check 필터(약 15%)와 logdedup(약 12%)이었습니다.",
      en: "A concise OTEL Pipeline Optimization answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 160,
    category1: "Infrastructure",
    category2: "Trace Sampling",
    question: {
      ko: "분산 추적에서 trace sampling 전략을 어떻게 설계했습니까? 모든 trace를 수집하는 것과 sampling을 적용하는 것 사이에서 어떤 선택을 했고 왜 그렇게 결정했습니까?",
    },
    answer: {
      ko:
        "현재 운영 환경에서는 trace를 전량 수집하되, 의미 없는 trace는 수집 전에 filter로 차단하는 전략을 선택했습니다. Tail Sampling을 도입하지 않은 이유가 있습니다.\n\n" +
        "**현재 전략: Full Capture + 사전 필터**\n\n" +
        "OTEL Gateway에서 trace pipeline은 다음과 같습니다:\n\n" +
        "```yaml\ntraces:\n  receivers: [otlp]\n  processors:\n    - filter/kafka_connect_policy  # kafka-connect 전량 drop\n    - resourcedetection             # 환경 attribute 주입\n    - memory_limiter               # OOM 방지\n    - filter/health_traces         # health check span drop\n    - batch\n  exporters: [otlp_grpc/traces/tempo, clickhouse/aws]\n```\n\n" +
        "Tempo 자체의 ingestion limit으로 cardinality를 간접 제어합니다:\n\n" +
        "```yaml\n# tempo-config.yaml\noverrides:\n  ingestion_rate_limit_bytes: 50000000   # 50MB/s\n  ingestion_burst_size_bytes: 75000000   # 75MB burst\n  max_bytes_per_trace: 50000000          # 트레이스당 최대 50MB\n  block_retention: 24h                   # 로컬 보관 24시간\n```\n\n" +
        "**Tail Sampling을 도입하지 않은 이유**\n\n" +
        "Tail Sampling은 trace 전체가 완성된 뒤에 '이 trace를 보관할지 버릴지' 결정합니다. 에러가 있는 trace는 100% 보관하고, 정상 trace는 10%만 샘플링하는 식입니다. 이상적으로 들리지만 운영 복잡도가 올라갑니다:\n\n" +
        "1. **Collector가 stateful** — 같은 trace의 span들이 반드시 같은 Collector 인스턴스에 모여야 합니다. 3중화된 Gateway 앞에 Load Balancing을 하면 같은 trace_id의 span이 gw-1과 gw-2에 분산될 수 있습니다. 이를 막으려면 trace_id 기반 consistent hashing이 필요합니다.\n\n" +
        "2. **메모리 비용** — tail sampling을 하려면 '결정 대기 시간(decision_wait)' 동안 모든 span을 메모리에 보관합니다. 현재 Tempo block retention이 24시간인 환경에서 이 비용이 Gateway 2GB 메모리 제한에 부담이 됩니다.\n\n" +
        "3. **운영 복잡도** — 샘플링 정책 자체가 버그의 원인이 됩니다. '에러 trace가 왜 Grafana에 없지?' 물음에 답하는 것이 매우 어려워요.\n\n" +
        "**대신 선택한 전략: 사전 필터 + 장기 보관 분리**\n\n" +
        "전량 수집하되 두 계층으로 나눴습니다:\n\n" +
        "- **Tempo (24h)**: 실시간 디버깅용. 최근 24시간 trace를 빠르게 조회\n" +
        "- **ClickHouse**: 장기 분석용. OTLP Gateway에서 동시에 ClickHouse로도 전송\n\n" +
        "ClickHouse `otel_traces` 테이블은 컬럼형 스토리지라 오래된 trace를 집계 쿼리로 분석할 때 매우 빠릅니다. '지난 30일간 payment service P99 latency 트렌드'처럼 Tempo에서는 불가능한 장기 분석이 가능합니다.\n\n" +
        "**Trace Cardinality 관점: 높은 카디널리티 span attribute**\n\n" +
        "Trace는 Prometheus 메트릭처럼 cardinality로 과금되지 않지만, span attribute에 고카디널리티 값을 넣으면 검색이 느려집니다.\n\n" +
        "실제로 겪은 문제:\n" +
        "- `db.statement` 속성에 SQL 전문을 넣었더니 Tempo 검색에서 10초 이상 걸림\n" +
        "- 해결: `db.statement`는 짧게 truncate하고, 파라미터 바인딩 값은 제외\n\n" +
        "Tempo의 `max_bytes_per_trace: 50MB` 설정이 이런 비대한 trace를 차단하는 안전망 역할을 합니다. 한 trace가 50MB를 초과하면 ingestion 자체가 거부됩니다.\n\n" +
        "**현재 전략의 실제 숫자**\n\n" +
        "- 필터 전: 일 ~8억 span 수신\n" +
        "- health check 필터 후: ~5.5억 (약 30% 제거)\n" +
        "- kafka-connect 필터 후: ~5억 (추가 10% 제거)\n" +
        "- Tempo 보관: 24h 회전, 약 500GB/day\n" +
        "- ClickHouse 보관: 컬럼형 압축으로 실제 사용 ~50GB/day\n\n" +
        "**핵심 교훈**\n\n" +
        "Tail Sampling은 강력하지만 운영 복잡도가 높습니다. 초기에는 '사전 필터로 노이즈를 제거하고 전량 수집'하는 전략이 운영하기 쉽고 신뢰할 수 있습니다. 볼륨이 증가해서 비용이 문제가 되면 그때 Tail Sampling을 검토하는 것이 순서입니다. '미리 최적화하느라 중요한 trace를 잃는 것'이 가장 비싼 실수입니다.",
      en: "A concise Trace Sampling answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },

  // ─── AI / LLM Observability ────────────────────────────────────────────
  {
    id: 162,
    category1: "Observability",
    category2: "AI Platform",
    priority: "high",
    question: {
      ko: "AI 멀티 에이전트 환경(ADK-Go, MCP)에서 Observability를 어떻게 구현했습니까? 에이전트별·유저별 토큰 사용량, 캐싱 효율, 비용 추적을 Grafana로 어떻게 시각화하고 의사결정에 활용했는지 설명해주세요.",
    },
    answer: {
      ko:
        "shop-ai 프로젝트에서 가장 어려웠던 건 LLM 호출이 기존 HTTP 요청과 완전히 다른 관측 패턴을 요구한다는 점이었습니다. 기존 Observability에서는 latency, error rate, throughput만 보면 됐는데, LLM은 여기에 토큰 사용량, 캐싱 히트율, 모델별 비용이라는 새로운 차원이 추가되습니다.\n\n" +
        "문제의 시작은 AWS Bedrock 비용이 한 달 만에 예상의 3배로 뛰어오른 거였습니다. 어떤 에이전트가, 어떤 유저의 요청에서, 얼마나 토큰을 쓰고 있는지 전혀 보이지 않았습니다. CloudWatch에 Bedrock 메트릭이 있긴 한데 모델 ID 단위까지만 나오고, 에이전트별·유저별 분해가 안 되더라고요.\n\n" +
        "그래서 Go의 OpenTelemetry SDK(otel-go)로 직접 계측 레이어를 만들었습니다. ADK-Go 프레임워크 안에서 Bedrock Converse API를 호출할 때마다, 응답 메타데이터에 담긴 inputTokens, outputTokens, cacheReadInputTokens, cacheWriteInputTokens를 파싱해서 OTEL Meter로 히스토그램과 카운터를 기록합니다. 핵심은 이 메트릭에 agent_name, user_id, model_id, session_id를 attribute로 붙이는 거였습니다. 이렇게 하면 Grafana에서 에이전트별, 유저별, 모델별로 자유롭게 group by 할 수 있습니다.\n\n" +
        "Prompt Caching 관측이 특히 중요했습니다. Bedrock의 Prompt Caching은 동일한 시스템 프롬프트나 컨텍스트를 재사용할 때 토큰 비용을 크게 줄여주는데, 실제로 캐시가 얼마나 히트하는지 보이지 않으면 최적화할 수가 없잖아요. cacheReadInputTokens가 0이 아닌 비율을 cache_hit_ratio로 계산해서 메트릭으로 내보냈더니, meeting_agent의 캐시 히트율이 87%인 반면 knowledge_app은 12%에 불과한 걸 발견했습니다. knowledge_app은 매번 다른 문서를 컨텍스트로 넘기니까 당연한 거였는데, 시스템 프롬프트 부분만이라도 캐싱되도록 프롬프트 구조를 재배치해서 히트율을 45%까지 올렸습니다.\n\n" +
        "MCP 툴 호출 트레이싱도 직접 구현했습니다. 에이전트가 postgres-mcp, codesearch-mcp, mcp-atlassian 같은 MCP 서버에 도구를 호출할 때마다 Span을 생성하고, W3C Trace Context를 MCP params._meta 필드로 전파합니다. wrapWithMeta()라는 미들웨어로 모든 MCP 핸들러를 래핑해서 trace context 추출을 자동화했습니다. 덕분에 Grafana Tempo에서 사용자 요청 → orchestrator → 서브에이전트 → MCP 서버 → DB까지 전체 흐름을 하나의 Trace ID로 추적할 수 있게 됐습니다.\n\n" +
        "FinOps 대시보드는 Grafana에서 4개 패널로 구성했습니다. 첫째, 에이전트별 일일 토큰 소비량과 예상 비용 추이 그래프. 둘째, 유저별 사용량 Top 10 테이블로 과도 사용자를 식별. 셋째, Prompt Cache 효율 히트맵으로 에이전트별 캐싱 최적화 여지 파악. 넷째, 모델 티어별 비용 비교로 특정 태스크에 비싼 모델을 불필요하게 쓰고 있는지 검출.\n\n" +
        "이 데이터가 실제 의사결정에 쓰인 대표 사례가 있습니다. knowledge_app이 모든 질문에 Claude Opus(가장 비싼 모델)를 쓰고 있었는데, 대시보드에서 확인해보니 질문의 70%가 단순 FAQ 수준이었습니다. 이걸 근거로 경량 질문은 Haiku 티어로, 복잡한 질문만 Opus로 라우팅하는 3단계 파이프라인으로 리팩터링했고, 해당 에이전트의 월 비용이 60% 이상 줄었습니다.\n\n" +
        "또 하나는 AI 도입 자체의 ROI를 경영진에게 보여준 것입니다. meeting_agent가 월 평균 80건의 회의록을 자동 생성하는데, 이전에는 담당자가 회의당 40분 이상 소비했습니다. Grafana에서 에이전트 실행 횟수와 평균 처리 시간을 뽑아서 '월 53시간 절감, 인건비 환산 시 LLM 비용 대비 4배 ROI'라는 수치를 만들었습니다. 이 데이터가 AI 플랫폼 추가 투자 승인의 핵심 근거가 됐습니다.\n\n" +
        "지금 다시 한다면 토큰 메트릭 수집을 ADK-Go 미들웨어 레벨로 더 추상화했을 것입니다. 현재는 Bedrock Converse API 응답만 파싱하는데, 나중에 OpenAI나 다른 프로바이더를 추가하면 프로바이더별 파싱 로직이 필요하습니다. 프로바이더 무관하게 inputTokens, outputTokens, cachedTokens를 통일 인터페이스로 추출하는 GenAI Semantic Convention을 처음부터 따랐으면 확장이 더 쉬웠을 겁니다. 실제로 OpenTelemetry의 GenAI Semantic Convention이 아직 Experimental이라 당시엔 커스텀으로 갔는데, 이제 안정화되고 있으니 마이그레이션을 계획하고 있습니다.",
      en: "A concise AI Platform answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
];
