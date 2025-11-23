import type { InterviewQuestion } from "@/types/portfolio";

/**
 * Observability & Monitoring 질문들
 * ID: 11, 70, 71, 62, 72, 73, 74
 */
export const infraObservabilityQuestions: InterviewQuestion[] = [
  {
    id: 11,
    category1: "Infrastructure",
    category2: "Monitoring",
    question: "Observability/Monitoring 경험에 대해 설명해주세요.",
    answer:
      "Observability에서 가장 어려웠던 것은 장애가 발생했을 때 '어디서 시작된 문제인지' 찾는 것이었어요. 로그 18시간 뒤지는 경험은 정말... 이건 엔지니어링이 아니라 운에 맡기는 거더라고요.\n\n" +
      "문제 상황: ₩500B 규모 이커머스 플랫폼에 Legacy Scouter APM만 있었어요. Java만 지원해서 React, Vue.js, Go 서비스는 완전히 사각지대였죠. 결제 완료율이 갑자기 95%에서 87%로 떨어졌는데, 어느 서비스에서 문제가 시작되었는지 알 수가 없었어요. 15개 서버에 tail -f로 로그를 열어두고, Ctrl+F로 에러 찾고... 18시간 동안 로그만 봤습니다.\n\n" +
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
  },
  {
    id: 70,
    category1: "Infrastructure",
    category2: "Monitoring",
    question: "마이크로서비스 환경에서의 모니터링 전략은 어떻게 접근하나요?",
    answer:
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
  },
  {
    id: 71,
    category1: "Infrastructure",
    category2: "Distributed Tracing",
    question: "분산 트레이싱 구현에서 어떤 어려움을 겪었나요?",
    answer:
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
  },
  {
    id: 62,
    category1: "Infrastructure",
    category2: "Time-Series Database",
    question: "InfluxDB 같은 시계열 데이터베이스 경험에 대해 설명해주세요.",
    answer:
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
  },
  {
    id: 72,
    category1: "Infrastructure",
    category2: "Observability",
    question: "효과적인 알림 전략을 어떻게 구현하나요?",
    answer:
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
      "Runbook 자동화로 L1 대응의 70%를 자동화했습니다.\n\n" +
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
  },
  {
    id: 73,
    category1: "Infrastructure",
    category2: "Time-Series Database",
    question: "시계열 데이터 보존 및 스토리지를 어떻게 최적화하나요?",
    answer:
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
  },
  {
    id: 74,
    category1: "Infrastructure",
    category2: "Observability",
    question: "SRE 실천 방법에 대해 어떻게 접근하나요?",
    answer:
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
      "Runbook 표준화로 장애 대응 시간을 단축하고, " +
      "escalation 정책으로 적절한 전문가에게 신속하게 연결했습니다. " +
      "On-call 부담을 줄이기 위해 알림 품질을 개선하고 자동 복구 기능을 강화했습니다.\n\n" +
      "결과적으로 시스템 가용성을 99.5%에서 99.9%로 향상시키고, " +
      "평균 복구 시간을 2시간에서 15분으로 단축했으며, " +
      "엔지니어가 운영업무에 사용하는 시간을 50% 줄였습니다.",
  },
  {
    id: 134,
    category1: "Observability",
    category2: "Distributed Tracing",
    question:
      "10년 이상 된 모놀리식 시스템과 MSA가 혼재된 하이브리드 환경에서 End-to-End 분산 추적을 구현할 때, 레거시 애플리케이션에 트레이스 컨텍스트를 주입하고 전파하기 위해 사용한 구체적인 전략은?",
    answer:
      "하이브리드 환경에서의 분산 추적은 '완벽한 통합'보다는 '실용적인 가시성 확보'가 목표였습니다.\n\n" +
      "당시 상황을 먼저 설명하겠습니다. TheShop의 아키텍처는 크게 세 계층으로 나뉘어 있었습니다. 첫째, 10년 이상 운영된 Oracle + Tomcat 8 + Spring 4 기반의 모놀리식 Core System이 있었고, 둘째, 최근 3년간 개발된 Next.js + Spring Boot 2.7 기반의 MSA 서비스들이 있었으며, 셋째, Kafka + Airflow로 연결된 Batch/Analytics 계층이 있었습니다. 문제는 이 세 계층이 각각 다른 기술 스택과 통신 프로토콜을 사용했다는 거죠.\n\n" +
      "전체 전략을 세 단계로 나눴습니다.\n\n" +
      "첫 번째 단계는 Modern MSA부터 OpenTelemetry 계측을 시작한 것이었습니다. Spring Boot 서비스들은 OpenTelemetry Java Agent 자동 계측으로 쉽게 적용할 수 있었어요. JVM 옵션에 -javaagent를 추가하고, OTEL_SERVICE_NAME과 OTEL_EXPORTER_OTLP_ENDPOINT만 설정하면 자동으로 HTTP, JDBC, Redis 호출이 trace에 잡혔습니다. Next.js 프론트엔드는 @opentelemetry/sdk-trace-web를 사용해서 브라우저 → Backend 첫 hop부터 Trace ID를 생성하도록 했죠.\n\n" +
      "두 번째 단계가 가장 까다로웠습니다. Legacy Monolith에 대한 전략이었어요. Spring 4는 OpenTelemetry Auto-instrumentation이 공식 지원되지 않았고, 소스코드 전체를 수정하는 것도 리스크가 컸습니다. 그래서 '경계에서의 계측(Boundary Instrumentation)' 전략을 선택했습니다.\n\n" +
      "구체적으로는 Servlet Filter를 구현했어요. LegacyTracingFilter라는 커스텀 필터를 만들어서 HTTP 요청이 레거시 시스템에 들어올 때 W3C Trace Context 헤더(traceparent, tracestate)를 읽어서 ThreadLocal에 저장했습니다. MSA에서 온 요청은 이미 Trace ID가 있으니 그걸 이어받고, 레거시에서 시작된 요청은 새로 Trace ID를 생성했죠.\n\n" +
      "문제는 레거시 내부 로직은 여전히 사각지대라는 것이었습니다. 수천 개의 메서드를 일일이 계측할 수는 없었기 때문에, 핵심 진입점만 선별적으로 계측했어요. Database 호출은 DataSource Proxy로 감싸서 SQL 쿼리를 자동으로 span으로 기록했고, 외부 API 호출은 RestTemplate을 커스터마이징해서 Trace Context를 HTTP Header로 전파했습니다. Redis 호출은 Spring Data Redis의 interceptor를 활용했죠.\n\n" +
      "Logging과의 통합도 중요했습니다. 레거시는 Log4j 1.x를 사용하고 있었는데, MDC(Mapped Diagnostic Context)에 trace_id를 주입하는 방식으로 해결했어요. 모든 로그 메시지에 [trace_id=xxxxx] 포맷으로 자동 추가되도록 했고, 이를 통해 Loki에서 Trace로 바로 점프할 수 있게 했습니다.\n\n" +
      "세 번째 단계는 Kafka를 통한 비동기 경계 추적이었습니다. 이게 가장 복잡했어요. 레거시 시스템에서 Kafka Producer로 이벤트를 발행할 때, Trace Context를 메시지 Header에 주입해야 했습니다. KafkaTemplate을 래핑한 TracingKafkaTemplate를 만들어서 send() 호출 시 자동으로 traceparent 헤더를 추가하도록 했죠.\n\n" +
      "Consumer 쪽에서는 @KafkaListener에 Aspect를 적용했습니다. 메시지를 받을 때 Header에서 Trace Context를 추출해서 새로운 Span을 시작하는 AroundAdvice를 구현했어요. 이렇게 해서 Kafka를 거쳐도 Trace가 끊기지 않고 연결되었습니다.\n\n" +
      "특히 어려웠던 케이스가 Batch 처리였어요. Airflow DAG가 Kafka Consumer로 100만 건의 메시지를 polling해서 한 번에 처리하는데, 각 메시지마다 다른 Trace ID가 있었습니다. 이를 Batch Span으로 묶되, 개별 메시지는 Child Span으로 처리하는 hierarchy를 구현했죠. Python OpenTelemetry API의 start_as_current_span()을 활용했습니다.\n\n" +
      "Frontend → Backend → Legacy → Kafka → Batch의 전체 흐름을 하나의 Trace로 연결하는 데 성공했지만, 몇 가지 제약은 남아있었어요. 레거시 내부의 세밀한 메서드 호출까지는 추적하지 못했고, P2P 통신이나 FTP 배치 전송 같은 비표준 프로토콜은 수동 계측이 필요했습니다.\n\n" +
      "성능 오버헤드도 신경 썼습니다. Servlet Filter와 Proxy 계층이 추가되면서 초기에는 응답시간이 10ms 증가했어요. Span 전송을 비동기로 처리하고, Sampling Rate를 10%로 낮춰서 오버헤드를 5ms 이하로 줄였습니다. Critical Path의 에러는 100% 샘플링하되, 성공 케이스는 확률적으로 샘플링했죠.\n\n" +
      "결과적으로 MTTD가 18시간에서 10분으로 99% 단축되었습니다. 장애 발생 시 어느 계층에서 문제가 시작되었는지 Trace Waterfall Diagram 하나로 바로 파악할 수 있게 되었죠. 예를 들어, 결제 완료율이 떨어졌을 때 Frontend → MSA는 정상인데 Legacy로 넘어가는 순간 지연이 발생한다는 것을 10분 만에 발견했습니다. 원인은 Legacy의 Connection Pool 고갈이었고요.\n\n" +
      "핵심 교훈은, 완벽한 추적보다 핵심 경로의 가시성 확보가 먼저라는 것입니다. 레거시 모든 코드를 수정할 필요는 없었어요. 경계 지점만 잘 계측하면 충분한 통찰을 얻을 수 있었습니다. 그리고 점진적 개선이 중요했습니다. 처음부터 완벽을 추구하지 않고, 우선순위 높은 서비스부터 시작해서 3개월에 걸쳐 확장했죠.",
  },
  {
    id: 135,
    category1: "Observability",
    category2: "OpenTelemetry",
    question:
      "OpenTelemetry Collector의 Pipeline 구조를 설명하고, 프로젝트에서 어떻게 구성했나요? 12개 프로덕션 서버에 어떤 배포 방식을 사용했고, 3TB 분산 추적 데이터를 어떻게 효율적으로 관리하나요?",
    answer:
      "OpenTelemetry Collector는 단순한 데이터 파이프라인이 아니라, 관측성 데이터의 '교통 정리 허브'였습니다.\n\n" +
      "Collector Pipeline은 Receivers → Processors → Exporters의 3단계로 구성됩니다. 간단해 보이지만, 각 단계마다 수십 가지 옵션이 있고 조합에 따라 성능과 안정성이 크게 달라졌어요.\n\n" +
      "Receivers 설정을 먼저 설명하겠습니다. 우리 환경에서는 여러 프로토콜을 동시에 받아야 했습니다. OTLP gRPC 4317포트로 Java/Go 서비스의 trace/metrics를, OTLP HTTP 4318포트로 JavaScript SDK 데이터를, Prometheus Receiver 9090포트로 레거시 메트릭을, Loki Receiver로 로그를 수집했죠. 각 Receiver마다 버퍼 크기와 timeout을 조정했는데, gRPC는 max_recv_msg_size를 32MB로 설정해서 대용량 batch를 받을 수 있게 했습니다.\n\n" +
      "Processors가 핵심이었습니다. 여기서 데이터를 필터링하고 변환하고 샘플링했거든요. 구체적인 구성을 설명하면 이렇습니다.\n\n" +
      "첫째, Batch Processor였습니다. 개별 span을 하나씩 전송하면 네트워크 오버헤드가 크기 때문에, send_batch_size=1000, timeout=10s로 설정해서 1000개씩 묶거나 10초마다 전송하도록 했어요. 이것만으로도 네트워크 호출이 99% 감소했습니다.\n\n" +
      "둘째, Memory Limiter였습니다. Collector가 메모리를 무한정 사용하면 서버가 죽을 수 있으니, limit_mib=4096, spike_limit_mib=512로 제한을 두었습니다. 메모리 사용량이 4GB를 넘으면 새 데이터를 drop하고, spike는 512MB까지 허용했죠. 중요한 건 check_interval=1s로 자주 체크해서 메모리 급증을 빠르게 감지하는 것이었습니다.\n\n" +
      "셋째, Resource Processor였습니다. 모든 span에 공통 메타데이터를 추가했어요. env=production, cluster=aws-us-east-1, version=v2.5.0 같은 태그를 자동으로 주입해서, 나중에 Grafana에서 필터링할 때 유용했습니다.\n\n" +
      "넷째, Tail Sampling Processor가 가장 중요했습니다. 처음에는 Head Sampling으로 무작위 10%만 수집했는데, 중요한 에러 trace가 누락되는 문제가 있었어요. Tail Sampling은 trace가 완료된 후 판단하기 때문에 더 똑똑합니다. 설정은 이랬습니다. Error trace는 100% 수집, P99 latency 이상은 100%, 정상 trace는 1% 샘플링, 단 특정 endpoint는 10% 샘플링(결제 API 등). 이 정책만으로 storage 비용을 70% 줄이면서도 중요한 데이터는 모두 보존했습니다.\n\n" +
      "다섯째, Attributes Processor로 민감 정보를 제거했습니다. PII(Personally Identifiable Information)인 email, phone_number, credit_card 같은 속성은 자동으로 마스킹했어요. GDPR 컴플라이언스 때문에 필수였습니다.\n\n" +
      "Exporters는 목적지별로 나눴습니다. Jaeger Exporter로 trace를 Jaeger backend로, Prometheus Exporter로 metrics를 Prometheus로, Loki Exporter로 logs를 Loki로 보냈습니다. 각 Exporter마다 retry_on_failure와 sending_queue 설정으로 네트워크 장애 시에도 데이터 손실을 방지했죠. sending_queue_size=5000, retry_on_failure=enabled, max_elapsed_time=5m으로 설정해서 최대 5분까지 재시도했습니다.\n\n" +
      "12개 프로덕션 서버 배포 전략을 설명하겠습니다. Agent 모드와 Gateway 모드를 혼합했어요.\n\n" +
      "각 서버에는 Agent Collector를 DaemonSet으로 배포했습니다. 애플리케이션은 localhost:4317로 데이터를 보내니 네트워크 지연이 최소화되었죠. Agent는 가벼운 처리만 하고(batch, memory_limit), 실제 sampling과 export는 중앙 Gateway Collector가 담당했습니다.\n\n" +
      "Gateway Collector는 3대를 고가용성으로 구성했어요. Agent들은 Gateway의 load balancer 주소로 데이터를 전송하고, Gateway에서 Tail Sampling과 같은 무거운 작업을 수행했습니다. 이 아키텍처의 장점은 Agent가 가볍기 때문에 애플리케이션 성능에 영향을 주지 않고, Gateway를 스케일 아웃해서 처리량을 늘릴 수 있다는 것이었습니다.\n\n" +
      "Deployment는 Kubernetes Operator를 사용했습니다. OpenTelemetry Operator가 Collector 설정을 CRD로 관리할 수 있게 해줘서, GitOps로 configuration을 버전 관리하고 자동 배포했죠. Collector 버전 업그레이드도 rolling update로 무중단 배포했습니다.\n\n" +
      "3TB 분산 추적 데이터 관리 전략을 설명하겠습니다. 이게 가장 어려운 부분이었어요.\n\n" +
      "첫째, Storage 계층화였습니다. Hot data(7일)는 Jaeger Elasticsearch에, Warm data(30일)는 S3 Standard에, Cold data(90일)는 S3 Glacier에 보관했습니다. 자주 조회되는 최근 데이터는 빠른 스토리지에, 거의 안 보는 옛날 데이터는 저렴한 스토리지에 두는 거죠.\n\n" +
      "둘째, Parquet 압축이었습니다. JSON 포맷의 trace를 Parquet 컬럼형 포맷으로 변환하면 압축률이 10배 이상 높았어요. 10GB JSON이 1GB Parquet이 되는 식이죠. 게다가 쿼리 성능도 빨라졌습니다. Athena로 Parquet을 쿼리하면 필요한 컬럼만 읽어서 스캔 비용이 대폭 감소했습니다.\n\n" +
      "셋째, Aggregation과 Rollup이었습니다. 개별 span을 모두 보관하지 않고, 통계 정보만 남겼어요. 예를 들어 30일 이후 trace는 span 개수, 평균 duration, error count만 보존하고 상세 span은 삭제했습니다. 디버깅에는 최근 7일 trace만 필요하고, 장기 트렌드 분석에는 aggregated metrics로 충분했거든요.\n\n" +
      "넷째, Index 최적화였습니다. Elasticsearch에 모든 필드를 인덱싱하면 index 크기가 data보다 커지는 문제가 있었어요. 검색에 자주 쓰이는 service.name, trace_id, span_id, status_code만 인덱싱하고, 나머지는 stored field로만 보관했습니다. 인덱스 크기가 70% 줄었습니다.\n\n" +
      "다섯째, Retention Policy 자동화였습니다. Elasticsearch Curator와 S3 Lifecycle Policy로 자동 삭제 규칙을 설정했어요. 7일 지난 Elasticsearch 인덱스는 자동으로 S3로 export 후 삭제, 90일 지난 S3 object는 Glacier로 이동, 1년 지난 데이터는 완전 삭제되도록 했죠.\n\n" +
      "비용 효과를 계산해보면, DataDog을 사용했다면 월 2,000달러가 들었을 텐데, Self-hosted OpenTelemetry stack은 월 200달러(EC2 + S3 + Elasticsearch)로 90% 절감했습니다. 대신 운영 부담이 있었지만, Collector 자동 복구와 모니터링 자동화로 관리 가능한 수준이었습니다.\n\n" +
      "결과적으로 일일 50만 traces, 월 3TB 데이터를 안정적으로 처리하고, 99.9% 데이터 수집 성공률을 달성했으며, 평균 end-to-end latency는 5초 이내(수집부터 시각화까지)로 유지했습니다.\n\n" +
      "핵심 교훈은, Observability 인프라도 관측이 필요하다는 것입니다. Collector 자체의 메트릭(처리량, drop rate, latency)을 Prometheus로 모니터링하고, 문제가 생기면 즉시 알림이 오도록 했습니다. 관측성을 제공하는 시스템이 blind spot이 되면 안 되니까요.",
  },
  {
    id: 136,
    category1: "Infrastructure",
    category2: "Synthetic Monitoring",
    question:
      "Synthetic Monitoring과 Self-Healing 시스템을 어떻게 구현했나요? 특히 자체 설치형 환경에서 Managed APM 유료 기능 없이 컨테이너와 HTTP 엔드포인트 가용성을 어떻게 모니터링하고 자동 복구했나요?",
    answer:
      "Synthetic Monitoring은 '사용자가 문제를 겪기 전에 우리가 먼저 발견한다'는 철학으로 시작했습니다. 특히 ₩500B 이커머스 환경에서 L4 장비가 80/443 포트만 체크하는 한계를 극복해야 했어요.\n\n" +
      "당시 문제 상황을 먼저 설명하겠습니다. 협력업체가 관리하는 L4 Load Balancer는 단순히 Nginx 80 포트가 열려있으면 '서버 정상'으로 판단했어요. 하지만 실제로는 한 서버에 Frontend, Backend, Batch 컨테이너가 여러 개 돌고 있었고, Batch 컨테이너만 죽어도 주문 처리가 멈췄습니다. L4는 이걸 감지 못했죠. 게다가 컨테이너가 Restarting 루프에 빠져도, Nginx가 살아있으면 L4는 계속 트래픽을 보냈어요. 고객은 502 Bad Gateway를 보는데 모니터링은 '정상'이라고 했습니다.\n\n" +
      "이 문제를 해결하기 위해 Monitoring Agent 프로젝트를 직접 개발했습니다. Go 언어로 두 가지 핵심 컴포넌트를 만들었어요.\n\n" +
      "**첫 번째 컴포넌트: CRI Health Checker**\n\n" +
      "서버 내 모든 컨테이너의 상태를 세밀하게 추적하는 에이전트입니다. Docker API를 직접 호출해서 컨테이너 이름 패턴, 이미지, Health 상태, CPU/Memory 사용량을 실시간으로 수집했어요.\n\n" +
      "핵심은 '이미지 패턴 기반 감시'였습니다. 설정 파일에 `image_pattern: \"ecr.aws/.*/theshop-backend:.*\"` 같은 정규식을 정의하면, 해당 패턴에 맞는 모든 컨테이너를 자동으로 추적했죠. 서버마다 컨테이너 이름이 조금씩 달랐기 때문에 패턴 매칭이 필수였어요.\n\n" +
      "컨테이너 상태를 4가지로 분류했습니다. Healthy, Starting, Restarting, Exited. L4가 못 보던 부분이 바로 이 Restarting 상태였어요. Docker healthcheck가 실패하면 컨테이너가 자동 재시작되는데, 이 과정이 10분씩 반복되어도 L4는 모르고 트래픽을 계속 보냈습니다. CRI Health Checker는 restart_count를 추적해서, 5분 내 3회 이상 재시작되면 알림을 보냈죠.\n\n" +
      "자동 Remediation 정책도 구현했습니다. 설정 파일에 `auto_restart: true`, `max_restart_attempts: 3`, `restart_cooldown: 5m`를 정의하면, 컨테이너가 Unhealthy 상태로 5분 이상 지속될 때 자동으로 재시작을 시도했어요. 단, 무한 재시작 루프를 막기 위해 3회 시도 후에는 알림만 보내고 수동 개입을 기다렸습니다.\n\n" +
      "리소스 사용량도 모니터링했어요. CPU 90% 이상 또는 Memory 85% 이상 사용하는 컨테이너를 찾아서 warn 레벨 로그를 남겼습니다. 이 데이터는 OpenTelemetry로 자동 전송되어 Grafana 대시보드에 실시간으로 표시되었죠.\n\n" +
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
      "30초마다 Product API를 호출하고, 응답시간과 HTTP 상태 코드를 기록했어요. expected_status가 200이 아니거나 timeout을 초과하면 실패로 카운트됩니다. alert_threshold=3이므로 3회 연속 실패하면 알림이 발생했죠.\n\n" +
      "Trace Context 전파도 구현했습니다. HTTP 요청마다 W3C Trace Context 헤더(traceparent)를 자동으로 생성해서 보냈어요. 덕분에 Synthetic test가 Backend까지 어떻게 전파되었는지, Distributed Tracing으로 전체 흐름을 볼 수 있었습니다. 예를 들어 Product API 호출이 느리다면, Trace를 따라가서 Database 쿼리가 병목인지, Redis 캐시 미스인지 바로 파악할 수 있었죠.\n\n" +
      "**OpenTelemetry 통합 (핵심 차별화 요소)**\n\n" +
      "이 프로젝트의 가장 큰 강점은 '모든 텔레메트리를 OpenTelemetry 표준으로 통합'한 것이었습니다.\n\n" +
      "CRI Health Checker와 HTTP Health Checker 모두 OTLP gRPC로 데이터를 전송했어요. Metrics, Traces, Logs가 단일 파이프라인으로 수집되어 Grafana, Tempo, Loki에서 상관 분석이 가능했습니다.\n\n" +
      "구체적으로, HTTP Health Checker가 Product API 실패를 감지하면 이런 흐름이 발생했어요. 첫째, Error Trace가 Tempo로 전송되고, 둘째, 실패 로그(status=500, url=..., error=...)가 Loki로 전송되며, 셋째, 메트릭(http_check_success=0, http_check_duration_ms=5000)이 Prometheus로 전송됩니다. Grafana에서 trace_id를 클릭하면 로그와 메트릭이 자동으로 연결되어 전체 컨텍스트를 한눈에 볼 수 있었죠.\n\n" +
      "Resource Attributes로 환경/버전/태그를 자동 보강했습니다. 모든 span에 env=production, server=web-01, version=v1.2.3, team=platform 같은 메타데이터가 자동 주입되어, 나중에 '특정 서버만 문제인지', '전체 환경 문제인지' 필터링이 쉬웠어요.\n\n" +
      "**Auto-Instrumentation 기능**\n\n" +
      "Go 런타임 메트릭, Host 메트릭, HTTP 클라이언트 메트릭을 자동으로 수집했습니다. 에이전트 자체의 성능(고루틴 수, 메모리 사용량, GC 시간)도 모니터링되어, '모니터링 시스템이 장애 원인'인 경우도 탐지할 수 있었죠.\n\n" +
      "특히 `app_ready`, `app_running`, `app_startup_duration` 같은 라이프사이클 메트릭으로 에이전트가 정상 동작 중인지 확인했습니다. 에이전트가 crash되면 app_running=0으로 변하고, 이걸 Prometheus AlertManager가 감지해서 알림을 보냈어요.\n\n" +
      "**배포 및 운영**\n\n" +
      "12개 프로덕션 서버에 Docker Compose로 배포했습니다. 각 서버의 `/var/run/docker.sock`을 마운트해서 컨테이너 상태를 감시하고, 중앙 OpenTelemetry Collector(10.101.91.145:4317)로 데이터를 전송했죠.\n\n" +
      "ECR(Elastic Container Registry)에 이미지를 저장하고, SHA 태그로 버전 관리했습니다. 배포는 GitOps 스타일로, Git commit마다 CI가 이미지를 빌드하고 ECR에 푸시하면, 각 서버에서 `make run ENV=prod`로 최신 이미지를 pull해서 실행했어요.\n\n" +
      "설정 파일은 `/opt/agent-configs/`에 중앙 관리했고, 환경별로 dev/staging/prod 설정을 분리했습니다. `.env.local`로 환경 변수(AWS_PROFILE, OTEL_ENDPOINT)를 주입해서 유연하게 운영했죠.\n\n" +
      "**실제 장애 탐지 사례**\n\n" +
      "새벽 3시에 Batch 컨테이너가 OOM Killed로 죽었어요. 기존 L4 헬스체크는 이걸 못 봤지만, CRI Health Checker가 즉시 감지해서 Slack 알림을 보냈습니다. 자동 재시작이 시도되었지만 계속 OOM이 발생했고, 3회 재시도 후 알림이 다시 왔어요. 로그를 보니 Memory Leak이 원인이었고, 즉시 패치를 배포해서 5분 만에 해결했습니다. 기존에는 아침에 출근해서야 발견했을 문제를 선제적으로 막은 거죠.\n\n" +
      "**운영 성과**\n\n" +
      "MTTD(Mean Time To Detection)를 18시간에서 10뵔으로 99% 단축했고, 컨테이너 자동 복구로 MTTR(Mean Time To Recovery)를 4시간에서 10뵔으로 단축했습니다. 월 인시던트 수가 15건에서 3건으로 감소했고, 대부분 자동 복구로 해결되었죠.\n\n" +
      "비용 효율성도 탁월했어요. Datadog Synthetic Monitoring을 사용했다면 월 500달러가 들었을 텐데, Self-hosted 방식으로 EC2 비용만 월 40달러로 운영했습니다. 대신 개발과 유지보수 부담이 있었지만, 커스터마이징 자유도가 높아서 충분히 가치가 있었어요.\n\n" +
      "**핵심 교훈**\n\n" +
      "첫째, Synthetic Monitoring은 '사용자 관점의 가용성'을 측정합니다. L4가 '서버 살아있음'을 보는 것과, 우리가 '실제 API 요청이 성공함'을 보는 것은 완전히 다릅니다. 후자가 진짜 가용성이에요.\n\n" +
      "둘째, Self-Healing은 간단한 케이스부터 시작해야 합니다. 컨테이너 재시작 같은 Safe Operation부터 자동화하고, 복잡한 복구는 수동 개입을 남겨둬야 해요. 자동화가 문제를 더 악화시키면 안 되니까요.\n\n" +
      "셋째, Observability 표준(OpenTelemetry)을 지키면 나중에 도구를 바꾸기 쉽습니다. Jaeger에서 Tempo로, Prometheus에서 InfluxDB로 전환해도 에이전트 코드는 변경 없이 Collector 설정만 바꾸면 됐어요. 이게 표준의 힘입니다.",
  },
  {
    id: 137,
    category1: "Infrastructure",
    category2: "High Availability",
    question:
      "OpenTelemetry Collector의 고가용성(HA)을 AWS 환경에서 어떻게 구현했나요? ADOT + NLB + ECS 아키텍처를 선택한 이유와 구체적인 구성을 설명해주세요.",
    answer:
      "OTEL Collector의 고가용성은 '관측성 시스템이 먼저 죽으면 장애 대응이 불가능하다'는 절박함에서 시작했습니다.\n\n" +
      "고가용성 설계에서 가장 중요한 원칙은 Single Point of Failure 제거와 데이터 손실 방지였습니다. Collector가 다운되면 모든 텔레메트리가 유실되고, 장애 상황에서 blind spot이 생기는 거죠. 특히 ₩500B 규모 이커머스 환경에서는 초당 수백 건의 trace와 수천 개의 metric이 발생했기 때문에 Collector 장애가 곧 비즈니스 임팩트로 연결되었습니다.\n\n" +
      "AWS 환경에서는 Managed 서비스의 안정성과 Auto Scaling 능력을 최대한 활용했습니다.\n\n" +
      "첫째, AWS Distro for OpenTelemetry(ADOT) Collector를 선택한 이유는 AWS 네이티브 통합과 검증된 안정성 때문이었습니다. 오픈소스 OTEL Collector에 AWS X-Ray, CloudWatch, Kinesis 수신기와 내보내기가 사전 통합되어 있어서 설정이 간편했죠. 또한 AWS에서 직접 보안 패치와 버전 관리를 해주니 운영 부담이 줄었습니다.\n\n" +
      "둘째, ECS Fargate로 Collector를 배포했습니다. 서버리스 환경이라 인프라 관리 부담이 없고, Task Definition으로 리소스 제한(CPU 2vCPU, Memory 4GB)과 Health Check를 명확히 정의할 수 있었어요. 특히 중요한 건 ECS Service Auto Scaling이었습니다. CloudWatch 메트릭(CPU 사용률 70% 이상 또는 메모리 85% 이상)에 기반해서 Collector 인스턴스를 자동으로 스케일 아웃했죠. 평소에는 3개 Task가 돌다가, 트래픽 스파이크 시 10개까지 증가하도록 설정했습니다.\n\n" +
      "셋째, Network Load Balancer를 앞단에 배치했습니다. NLB는 Layer 4에서 동작하기 때문에 OTLP gRPC 트래픽을 효율적으로 분산할 수 있었어요. ALB는 HTTP/2를 지원하지만 gRPC의 long-lived connection을 제대로 다루지 못했거든요. NLB 설정의 핵심은 Connection Draining과 Health Check였습니다.\n\n" +
      "Connection Draining을 300초로 설정해서 Collector Task가 종료될 때 기존 연결이 안전하게 끊길 시간을 확보했습니다. 이렇게 안 하면 rolling deployment 중에 데이터가 손실될 수 있어요.\n\n" +
      "Health Check는 단순히 TCP 연결이 아니라 OTLP Health Check Endpoint(13133포트)를 호출하도록 설정했습니다. Collector가 메모리 부족이나 백엔드 연결 끊김으로 비정상 상태가 되면 health endpoint가 503을 반환하고, NLB가 자동으로 해당 Task를 제외했죠. Health check interval 10초, unhealthy threshold 2회로 설정해서 장애 감지를 빠르게 했습니다.\n\n" +
      "넷째, Multi-AZ 배포로 가용 영역 장애에 대비했습니다. ECS Service를 3개 AZ(us-east-1a, 1b, 1c)에 분산 배치하고, NLB도 Cross-Zone Load Balancing을 활성화했어요. 하나의 AZ가 완전히 다운되어도 나머지 2개 AZ에서 트래픽을 처리할 수 있었습니다.\n\n" +
      "다섯째, Retry와 Queue 설정으로 일시적 장애를 흡수했습니다. 애플리케이션 SDK에서 Collector로 데이터를 보낼 때, gRPC의 Retry Policy를 설정했어요. 최대 3회 재시도, exponential backoff 1초→2초→4초로 설정해서 Collector가 일시적으로 응답하지 않아도 데이터 손실을 방지했습니다. 또한 SDK의 Batch Processor에서 sending_queue_size=5000으로 설정해서 네트워크 지연 시 메모리 버퍼에 임시 저장했죠.\n\n" +
      "여섯째, 모니터링과 알림을 Collector 자체에 구축했습니다. Collector가 내보내는 자체 메트릭(otelcol_processor_batch_batch_send_size, otelcol_exporter_send_failed_metric_points)을 CloudWatch로 수집하고, 실패율이 5% 이상이면 즉시 알림을 보냈어요. 또한 ECS Task 상태(Running, Stopped, Pending)를 CloudWatch Events로 추적해서 비정상 종료 시 자동으로 재시작하도록 했습니다.\n\n" +
      "결과적으로 AWS 환경에서는 99.95% 가용성을 달성했습니다. 월 1회 rolling deployment로 버전 업그레이드를 해도 downtime 없이 진행되었고, AZ 장애 시뮬레이션(Chaos Engineering)에서도 자동 복구가 검증되었죠.\n\n" +
      "핵심 교훈은, AWS Managed 서비스를 활용하면 운영 부담을 크게 줄이면서도 엔터프라이즈급 가용성을 달성할 수 있다는 것입니다. Auto Scaling과 Multi-AZ 배포는 수동으로 구현하기 어려운 복원력을 제공했고, CloudWatch 통합으로 메타 모니터링까지 자동화할 수 있었습니다. 비용은 월 300달러 정도였지만, 엔지니어 시간 절약과 안정성을 고려하면 충분히 가치가 있었어요.",
  },
  {
    id: 138,
    category1: "Infrastructure",
    category2: "API Gateway",
    question:
      "OnPremise 환경에서 APISIX Gateway를 활용한 OTEL Collector 고가용성 아키텍처를 어떻게 설계했나요? Health Check, Circuit Breaker, Failover 전략을 구체적으로 설명해주세요.",
    answer:
      "OnPremise 환경에서 OTEL Collector의 고가용성은 APISIX API Gateway를 도입하여 구현했습니다. AWS처럼 Managed 서비스가 없었기 때문에, 오픈소스 기반의 자체 구축 아키텍처를 설계해야 했어요.\n\n" +
      "**APISIX 선택 이유**\n\n" +
      "첫째, APISIX를 선택한 이유는 동적 라우팅과 Health Check 기능이 강력했기 때문입니다. NGINX는 설정 변경 시 reload가 필요하고, HAProxy는 gRPC 지원이 제한적이었어요. APISIX는 REST API로 무중단 설정 업데이트가 가능하고, Lua 스크립트로 복잡한 라우팅 로직을 구현할 수 있었죠. 또한 OpenResty 기반이라 gRPC Upstream을 네이티브로 지원했습니다.\n\n" +
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
      "roundrobin 알고리즘으로 트래픽을 균등 분산했고, retries=2로 실패 시 다른 노드로 자동 재시도하도록 설정했습니다. 중요한 건 Active Health Check와 Passive Health Check의 조합이었어요.\n\n" +
      "Active Health Check는 10초마다 각 Collector의 13133포트 /health 엔드포인트를 호출합니다. 3회 연속 실패하면 해당 노드를 unhealthy로 마킹하고 트래픽을 자동으로 제외했죠. 반대로 2회 연속 성공하면 다시 healthy 상태로 복구되어 트래픽을 받기 시작합니다.\n\n" +
      "셋째, Passive Health Check로 실시간 장애를 더 빠르게 감지했습니다. Active Check는 주기적으로 확인하는 거라 최대 10초 간격의 지연이 있을 수 있어요. Passive Check는 실제 트래픽의 응답을 보고 즉시 판단합니다. 500/502/503 에러가 3회 연속 발생하면 즉시 해당 노드를 제외했죠. 이 방식이 평균 5초 더 빠르게 장애를 감지했습니다.\n\n" +
      "넷째, Circuit Breaker 패턴을 api-breaker 플러그인으로 추가했습니다. Upstream 전체가 불안정할 때를 대비한 보호장치였어요. 설정은 이랬습니다. 500/503 에러가 3회 발생하면 Circuit을 OPEN 상태로 전환하고, 502 에러를 클라이언트에게 반환했습니다. Circuit이 열리면 2초 → 4초 → 8초 간격으로 재시도하며, 최대 300초까지 대기했죠. 1회 성공 응답(200)이 오면 Circuit을 다시 CLOSED로 전환했습니다.\n\n" +
      "다섯째, Weighted Round Robin으로 서버 성능 차이를 반영했습니다. 3대 Collector의 하드웨어 스펙이 달랐어요. 145번 서버는 16 Core 32GB RAM이었지만, 146번은 8 Core 16GB였습니다. Weight를 2:1:1로 설정해서 성능 좋은 서버로 더 많은 트래픽을 보냈죠. 이로써 리소스 활용률이 균등해졌습니다.\n\n" +
      "여섯째, Failover 시나리오를 자동화했습니다. Collector 1번이 완전히 다운되면 APISIX가 자동으로 2번과 3번으로만 트래픽을 보냈어요. 2대로도 처리 가능하도록 각 Collector의 용량을 150% 오버프로비저닝했습니다. 평소에는 3대가 각각 50% 부하로 돌다가, 1대 장애 시 2대가 75% 부하로 처리하는 구조였죠.\n\n" +
      "일곱째, etcd 클러스터로 APISIX 설정을 고가용성으로 관리했습니다. APISIX의 라우팅 설정은 etcd에 저장되고, 3개 노드로 HA 구성했어요. APISIX 인스턴스 자체도 2대를 띄우고 앞단에 Keepalived + VRRP로 가상 IP를 관리했습니다. APISIX 1번이 죽으면 VIP가 자동으로 2번으로 이동했죠.\n\n" +
      "여덟째, Connection Pooling과 Keep-Alive로 성능을 최적화했습니다. APISIX에서 Collector로의 gRPC 연결을 재사용하도록 설정해서 매번 TLS Handshake를 하는 오버헤드를 줄였어요. Connection pool size=100, max idle time=60s로 설정했습니다.\n\n" +
      "아홉째, Observability를 Collector 자체에 구축했습니다. APISIX의 prometheus 플러그인으로 메트릭(upstream_status, request_latency, error_rate)을 수집하고, Grafana 대시보드로 실시간 모니터링했어요. 특정 Collector로의 트래픽이 0이 되면 즉시 알림이 발생했죠.\n\n" +
      "**실제 장애 복구 사례**\n\n" +
      "Collector 145번 서버가 하드웨어 장애로 완전히 다운되었을 때, APISIX의 Active Health Check가 30초 내 감지하고 146, 147번으로만 트래픽을 보냈습니다. 145번 복구까지 2시간이 걸렸지만, 서비스는 정상 동작했죠. Passive Health Check 덕분에 실제로는 15초 만에 장애를 감지했고, 사용자에게는 단 1건의 에러만 노출되었습니다.\n\n" +
      "**운영 성과 및 비용**\n\n" +
      "OnPremise APISIX 구성의 가장 큰 장점은 비용이었습니다. 기존 서버 3대와 APISIX 2대를 활용해서 추가 인프라 비용이 거의 없었어요. AWS NLB + Fargate가 월 300달러인 것에 비해, 전기세 포함 월 50달러 정도였죠.\n\n" +
      "단점은 운영 부담이었습니다. 서버 장애 시 수동 복구가 필요하고, 용량 계획을 직접 해야 했어요. 하지만 APISIX의 동적 설정 기능 덕분에 대부분의 운영 작업은 무중단으로 진행할 수 있었습니다.\n\n" +
      "**핵심 교훈**\n\n" +
      "첫째, Active + Passive Health Check의 조합이 필수입니다. Active만으로는 주기 사이 장애를 놓치고, Passive만으로는 unhealthy 노드 복구를 감지할 수 없어요.\n\n" +
      "둘째, Circuit Breaker는 Upstream 전체 보호에 중요합니다. 개별 노드 장애는 Health Check로 처리하지만, 전체 Upstream 불안정은 Circuit Breaker로 막아야 캐스케이딩 장애를 방지할 수 있습니다.\n\n" +
      "셋째, Weighted Round Robin으로 서버 스펙 차이를 반영하면 리소스 활용률이 균등해집니다. 모든 서버가 동일 스펙이 아니라면 weight 조정이 필수예요.\n\n" +
      "넷째, Chaos Engineering으로 장애 시나리오를 사전에 테스트해야 합니다. 서버를 강제로 죽이고, 네트워크를 끊어보고, 실제로 Failover가 동작하는지 검증했어요. 이 과정에서 설정 오류를 많이 발견했습니다.",
  },
  {
    id: 139,
    category1: "Infrastructure",
    category2: "Distributed System",
    question:
      "APISIX의 설정 저장소로 etcd 클러스터를 구성했나요? etcd의 고가용성과 데이터 일관성을 어떻게 보장했는지 설명해주세요.",
    answer:
      "APISIX의 고가용성을 위해서는 설정 저장소인 etcd 자체도 HA로 구성해야 했습니다. APISIX는 모든 라우팅 설정, Upstream 정보, 플러그인 구성을 etcd에 저장하기 때문에, etcd가 SPOF가 되면 APISIX 전체가 마비되는 거죠.\n\n" +
      "**etcd 클러스터 구성**\n\n" +
      "3노드 etcd 클러스터를 Static 방식으로 구축했습니다. 각 노드는 독립적인 서버(10.101.91.145, 146, 147)에 배포되었고, 초기 클러스터 멤버를 명시적으로 정의했어요.\n\n" +
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
      "etcd는 Raft 알고리즘으로 분산 합의를 달성합니다. 3노드 클러스터에서는 과반수인 2개 노드가 살아있어야 쓰기가 가능해요. 1개 노드 장애는 문제없지만, 2개 노드가 죽으면 클러스터가 read-only 모드로 전환됩니다.\n\n" +
      "Quorum 계산식은 `(N/2) + 1`입니다. 3노드면 2개, 5노드면 3개가 필요하죠. 그래서 etcd는 항상 홀수 개 노드로 구성해야 합니다. 짝수 개는 장애 허용 능력이 늘지 않으면서 오버헤드만 증가해요.\n\n" +
      "**Leader Election과 Auto-Failover**\n\n" +
      "etcd 클러스터는 항상 1개의 Leader를 선출하고, 나머지는 Follower가 됩니다. 모든 쓰기는 Leader를 거쳐야 하고, Follower는 읽기만 처리해요.\n\n" +
      "Leader가 죽으면 자동으로 재선출이 시작됩니다. Election timeout(기본 1초)이 지나면 Follower들이 투표를 시작하고, 과반수 득표한 노드가 새 Leader가 되죠. 보통 1-2초 내에 재선출이 완료되어 downtime이 최소화됩니다.\n\n" +
      "실제로 145번 노드(Leader)가 다운되었을 때, 146번이 1.2초 만에 새 Leader로 선출되었고, APISIX는 자동으로 새 Leader와 통신했어요. etcd client library가 endpoint list를 관리하면서 자동 failover를 처리했습니다.\n\n" +
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
      "APISIX client가 3개 endpoint를 모두 알고 있어서, 하나가 죽어도 자동으로 다른 노드로 연결을 시도합니다. Health check를 5초마다 수행해서 죽은 노드는 제외하고, 복구되면 다시 포함했어요.\n\n" +
      "**Snapshot과 백업**\n\n" +
      "etcd 데이터 손실을 막기 위해 자동 백업을 구축했습니다. etcdctl snapshot save로 매일 밤 2시에 스냅샷을 생성하고, S3에 업로드했어요.\n\n" +
      "```bash\n" +
      "# Daily backup cron job\n" +
      "0 2 * * * etcdctl --endpoints=http://10.101.91.145:2379 \\\n" +
      "  snapshot save /backup/etcd-$(date +\\%Y\\%m\\%d).db && \\\n" +
      "  aws s3 cp /backup/etcd-$(date +\\%Y\\%m\\%d).db s3://backups/etcd/\n" +
      "```\n\n" +
      "7일 이상 된 백업은 자동 삭제하여 스토리지 비용을 절감했습니다. Disaster recovery test를 월 1회 실시해서 백업에서 복구하는 절차를 검증했죠.\n\n" +
      "**성능 최적화**\n\n" +
      "etcd는 디스크 I/O에 민감합니다. SSD를 사용하고, data directory를 별도 볼륨에 마운트했어요. 또한 --quota-backend-bytes=8GB로 데이터 크기를 제한해서 메모리 사용을 제어했습니다.\n\n" +
      "Auto-compaction을 활성화해서 오래된 revision을 자동으로 삭제했어요. --auto-compaction-retention=1h 설정으로 1시간 이전 데이터는 압축했습니다. APISIX 설정은 자주 변경되지 않기 때문에 1시간이면 충분했죠.\n\n" +
      "Defragmentation을 주기적으로 수행해서 디스크 공간을 회수했습니다. etcdctl defrag를 매주 일요일 새벽에 실행해서 내부 단편화를 제거했어요.\n\n" +
      "**모니터링**\n\n" +
      "etcd의 Prometheus metrics를 수집해서 Grafana로 모니터링했습니다. 핵심 지표는 이랬어요. etcd_server_is_leader로 현재 Leader를 추적하고, etcd_server_has_leader로 Leader 부재를 감지했습니다. etcd_mvcc_db_total_size_in_bytes로 데이터 크기를 모니터링하고, 7GB 초과 시 알림을 보냈어요. etcd_disk_backend_commit_duration_seconds로 디스크 I/O 지연을 추적하고, 100ms 초과 시 경고했습니다.\n\n" +
      "**실제 장애 사례**\n\n" +
      "145번 노드의 디스크가 꽉 차서 etcd가 read-only 모드로 전환되었어요. quota-backend-bytes에 도달했기 때문이었죠. 즉시 defrag와 compaction을 수행해서 공간을 확보하고, quota를 12GB로 증가시켰습니다. 이 과정에서 APISIX는 정상 동작했어요. 읽기는 가능했고, 쓰기만 일시적으로 실패했기 때문에 라우팅에는 영향이 없었습니다.\n\n" +
      "**핵심 교훈**\n\n" +
      "첫째, etcd는 단순해 보여도 프로덕션에서는 세심한 관리가 필요합니다. 디스크 I/O, 데이터 크기, Compaction을 모두 신경 써야 안정적이에요.\n\n" +
      "둘째, 3노드 클러스터면 대부분의 경우 충분합니다. 5노드는 더 높은 가용성이 필요할 때만 고려하세요. 노드가 많을수록 합의 비용이 증가합니다.\n\n" +
      "셋째, etcd와 APISIX는 같은 서버에 두지 마세요. 리소스 경쟁이 발생하고, 서버 장애 시 둘 다 죽습니다. 우리는 별도 서버에 배치해서 독립성을 보장했어요.\n\n" +
      "넷째, Backup은 필수이지만, 복구 테스트가 더 중요합니다. 백업만 해두고 복구를 안 해봤다면, 실제 장애 시 복구 못 할 수 있어요. 주기적인 DR 테스트가 핵심입니다.",
  },
];
