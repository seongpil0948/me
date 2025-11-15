import type { InterviewQuestion } from "@/types/portfolio";

/**
 * Data & Messaging 질문들
 * ID: 12, 13, 58, 61, 65
 */
export const infraDataQuestions: InterviewQuestion[] = [
  {
    id: 12,
    category1: "Infrastructure",
    category2: "Messaging",
    question: "Describe your experience with message queues like Kafka.",
    answer:
      "Kafka 운영에서 가장 어려운 것은 파티션 전략과 컨슈머 그룹 리밸런싱 최적화입니다.\n\n" +
      "20-50M 메시지/일 처리하는 Kafka 클러스터를 운영했습니다. " +
      "3개 브로커에 replication factor 3으로 무손실 메시징을 보장했고, " +
      "파티션 수를 컨슈머 인스턴스 수의 2배로 설정하여 확장성을 확보했습니다.\n\n" +
      "파티셔닝 전략이 성능에 미치는 영향이 컸습니다. " +
      "처음에는 user_id 해싱으로 파티셔닝했는데 특정 사용자의 활동이 집중되어 " +
      "hot partition 문제가 발생했습니다. " +
      "user_id + timestamp 조합으로 변경하여 부하를 균등 분산시켰습니다.\n\n" +
      "컨슈머 그룹 관리에서 리밸런싱 최소화가 중요했습니다. " +
      "Stop-the-world 리밸런싱으로 30초간 메시지 처리가 중단되는 문제를 겪었는데, " +
      "Incremental Cooperative Rebalancing으로 전환하여 중단 시간을 5초로 단축했습니다. " +
      "session.timeout.ms와 heartbeat.interval.ms를 세밀하게 조정했습니다.\n\n" +
      "메시지 처리 보장 레벨을 비즈니스 요구사항에 맞게 조정했습니다. " +
      "결제 관련 메시지는 acks=all로 모든 replica 확인 후 응답하고, " +
      "로그 수집은 acks=1로 리더만 확인하여 성능을 우선했습니다. " +
      "idempotent producer로 중복 메시지를 방지했습니다.\n\n" +
      "Dead Letter Queue 패턴으로 실패한 메시지를 처리했습니다. " +
      "3회 재시도 후 실패한 메시지를 별도 토픽으로 라우팅하고, " +
      "수동 검토 후 재처리하는 워크플로우를 구축했습니다. " +
      "poison message로 인한 컨슈머 중단을 방지했습니다.\n\n" +
      "Schema Registry로 메시지 스키마를 중앙화했습니다. " +
      "Avro 스키마 진화로 backward/forward compatibility를 보장하고, " +
      "프로듀서와 컨슈머 간 스키마 불일치 오류를 사전에 방지했습니다. " +
      "스키마 버전 관리로 점진적 마이그레이션을 지원했습니다.\n\n" +
      "모니터링으로 Lag monitoring이 핵심이었습니다. " +
      "컨슈머 lag이 10만 건을 초과하면 알림을 보내고, " +
      "파티션별 처리량 불균형을 감지하여 컨슈머를 재조정했습니다. " +
      "JMX 메트릭으로 브로커 상태를 실시간 추적했습니다.\n\n" +
      "장애 복구를 위해 미러링 전략을 구축했습니다. " +
      "Multi-region 설정으로 DR 클러스터를 운영하고, " +
      "RTO 30분, RPO 5분을 목표로 자동 failover 시스템을 구축했습니다. " +
      "정기적인 재해 복구 훈련으로 절차를 검증했습니다.\n\n" +
      "결과적으로 메시지 처리 지연시간을 P95 기준 50ms 이내로 유지하고, " +
      "99.99% 가용성을 달성했으며, zero message loss를 보장했습니다.",
  },
  {
    id: 13,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question: "What is your experience building data pipelines?",
    answer:
      "데이터 파이프라인 구축에서 가장 중요한 것은 데이터 품질 보장과 장애 복구 전략입니다.\n\n" +
      "20-50M 메시지/일을 처리하는 실시간 분석 파이프라인을 설계했습니다. " +
      "Kafka → AWS Lambda → Athena → S3의 아키텍처로 " +
      "원시 이벤트를 비즈니스 인사이트로 변환하는 시스템을 구축했습니다.\n\n" +
      "AWS Step Functions로 복잡한 ETL 워크플로우를 오케스트레이션했습니다. " +
      "15개의 병렬 처리 단계로 구성하여 전체 처리 시간을 12-18분으로 최적화했습니다. " +
      "각 단계별 retry 정책과 error handling으로 장애 전파를 방지했습니다.\n\n" +
      "Parquet 포맷과 압축으로 스토리지 효율성을 극대화했습니다. " +
      "JSON에서 Parquet으로 전환하여 90% 용량 절약과 쿼리 성능 10배 향상을 달성했습니다. " +
      "컬럼형 저장으로 분석 쿼리에 최적화된 구조를 만들었습니다.\n\n" +
      "데이터 파티셔닝 전략으로 쿼리 성능을 최적화했습니다. " +
      "year=2024/month=03/day=15/hour=14 구조로 시간 기반 파티셔닝을 적용하고, " +
      "Athena 쿼리 시 파티션 프루닝으로 스캔 범위를 99% 축소했습니다. " +
      "10TB 전체 스캔을 100GB로 줄여 비용과 시간을 대폭 절감했습니다.\n\n" +
      "데이터 품질 검증을 자동화했습니다. " +
      "스키마 validation으로 필수 필드 누락을 검출하고, " +
      "outlier detection으로 비정상 값을 필터링했습니다. " +
      "duplicates removal과 data freshness check으로 데이터 신뢰성을 보장했습니다.\n\n" +
      "실시간과 배치 처리의 Lambda Architecture를 구현했습니다. " +
      "실시간 스트림은 5분 지연으로 대시보드 업데이트를 제공하고, " +
      "배치 처리는 정확성을 위해 하루 지연으로 최종 결과를 생성했습니다. " +
      "속도와 정확성의 trade-off를 비즈니스 요구사항에 맞게 조정했습니다.\n\n" +
      "CDC(Change Data Capture)로 DB 변경사항을 실시간 반영했습니다. " +
      "MySQL binlog를 Kafka로 스트리밍하여 DB와 분석 시스템 간 일관성을 유지했습니다. " +
      "Schema evolution 지원으로 DB 스키마 변경에 자동 대응했습니다.\n\n" +
      "백프레셔 제어로 시스템 안정성을 확보했습니다. " +
      "downstream 시스템의 처리 능력을 모니터링하고, " +
      "큐 크기가 임계값을 초과하면 upstream에서 유입량을 조절했습니다. " +
      "circuit breaker 패턴으로 장애 전파를 차단했습니다.\n\n" +
      "결과적으로 데이터 처리 지연시간을 18시간에서 2-4시간으로 단축하고, " +
      "비용을 월 500달러에서 40달러로 92% 절감했으며, " +
      "데이터 정확성을 95%에서 99.5%로 향상시켰습니다.",
  },
  {
    id: 58,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question: "How do you handle data pipeline failure recovery?",
    answer:
      "데이터 파이프라인 장애 복구에서 가장 중요한 것은 빠른 감지와 자동 복구, 그리고 데이터 일관성 보장입니다.\n\n" +
      "Circuit Breaker 패턴으로 장애 전파를 차단했습니다. " +
      "downstream 서비스의 실패율이 50%를 초과하면 요청을 차단하고, " +
      "half-open 상태에서 점진적으로 트래픽을 복구했습니다. " +
      "이로써 cascade failure를 방지하고 시스템 전체의 안정성을 유지했습니다.\n\n" +
      "Checkpointing과 상태 관리로 정확한 재시작을 구현했습니다. " +
      "Kafka 오프셋, 처리된 파일 목록, 중간 결과를 Redis에 저장하여 " +
      "장애 발생 시 마지막 성공 지점부터 재시작할 수 있도록 했습니다. " +
      "exactly-once processing을 보장했습니다.\n\n" +
      "Dead Letter Queue와 Poison Message 처리 전략을 구축했습니다. " +
      "3회 재시도 후 실패한 메시지는 DLQ로 이동시키고, " +
      "수동 검토 후 데이터 정제를 거쳐 재처리하는 워크플로우를 만들었습니다. " +
      "하나의 잘못된 메시지로 인한 전체 파이프라인 중단을 방지했습니다.\n\n" +
      "Exponential Backoff와 Jitter를 적용한 재시도 메커니즘을 구현했습니다. " +
      "즉시 재시도 → 2초 → 4초 → 8초 → 16초 간격으로 증가시키고, " +
      "여러 프로세서가 동시에 재시도하는 thundering herd를 방지하기 위해 " +
      "랜덤 지연을 추가했습니다.\n\n" +
      "데이터 무결성 검증을 자동화했습니다. " +
      "각 배치 처리 후 row count, checksum, business rule validation을 수행하고, " +
      "불일치 발견 시 자동으로 롤백하고 재처리를 시작했습니다. " +
      "SLA를 위반하기 전에 proactive하게 문제를 해결했습니다.\n\n" +
      "Multi-path 처리로 복원력을 강화했습니다. " +
      "Primary path가 실패하면 simplified logic의 fallback path로 전환하여 " +
      "기능은 제한적이지만 서비스 중단을 방지했습니다. " +
      "degraded mode로 최소 기능은 유지했습니다.\n\n" +
      "Real-time 모니터링과 알림으로 빠른 대응을 구현했습니다. " +
      "pipeline lag, error rate, data freshness를 추적하고, " +
      "임계값 초과 시 5분 내 담당자에게 알림을 보냈습니다. " +
      "Runbook 자동화로 L1 대응을 무인화했습니다.\n\n" +
      "Data Lineage 추적으로 영향 범위를 신속히 파악했습니다. " +
      "어떤 upstream 데이터가 어떤 downstream 시스템에 영향을 주는지 매핑하여 " +
      "장애 시 영향받는 대시보드와 알림을 선제적으로 비활성화했습니다.\n\n" +
      "결과적으로 MTTR을 4시간에서 15분으로 단축하고, " +
      "데이터 유실률을 0.1%에서 0.001%로 개선했으며, " +
      "파이프라인 가용성을 99.5%에서 99.9%로 향상시켰습니다.",
  },
  {
    id: 61,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question: "What's your experience with stream processing frameworks?",
    answer:
      "스트림 처리에서 가장 어려운 것은 상태 관리와 정확히 한 번 처리 보장입니다.\n\n" +
      "Kafka Streams와 AWS Lambda를 조합한 하이브리드 아키텍처를 구축했습니다. " +
      "단순한 변환은 Lambda로 서버리스 처리하고, " +
      "복잡한 aggregation과 windowing은 Kafka Streams로 처리하여 " +
      "각각의 장점을 활용했습니다.\n\n" +
      "윈도우 처리에서 Late Arrival 데이터 문제를 해결했습니다. " +
      "네트워크 지연으로 타임스탬프가 이미 닫힌 윈도우에 속하는 이벤트들이 " +
      "누락되는 문제가 있었습니다. " +
      "Grace period를 5분으로 설정하고, watermark 기반으로 윈도우 생명주기를 관리했습니다.\n\n" +
      "Stateful 처리에서 State Store 관리가 까다로웠습니다. " +
      "사용자별 세션 상태를 RocksDB에 저장하는데 메모리 사용량이 급증하는 문제가 있었습니다. " +
      "TTL 설정으로 오래된 상태를 자동 정리하고, " +
      "compaction 전략으로 storage overhead를 제어했습니다.\n\n" +
      "Exactly-once semantics 구현이 가장 복잡했습니다. " +
      "Kafka의 idempotent producer와 transactional consumer를 조합하고, " +
      "processing.guarantee=exactly_once_v2로 설정했습니다. " +
      "downstream 시스템에도 idempotent write를 구현하여 end-to-end 정확성을 보장했습니다.\n\n" +
      "Backpressure 제어로 시스템 안정성을 확보했습니다. " +
      "처리 속도보다 유입 속도가 빠를 때 consumer를 일시 정지시키고, " +
      "queue depth 기반으로 adaptive throttling을 구현했습니다. " +
      "메모리 OOM을 방지하고 graceful degradation을 제공했습니다.\n\n" +
      "복잡한 이벤트 처리를 위한 패턴 매칭을 구현했습니다. " +
      "사용자 행동 시퀀스에서 특정 패턴을 감지하여 실시간 개인화를 제공했습니다. " +
      "CEP(Complex Event Processing) 엔진으로 fraud detection과 recommendation을 강화했습니다.\n\n" +
      "Multi-tenant 환경에서 리소스 격리를 구현했습니다. " +
      "테넌트별로 별도 토픽과 consumer group을 할당하고, " +
      "quota management로 공정한 리소스 분배를 보장했습니다. " +
      "noisy neighbor 문제를 방지했습니다.\n\n" +
      "스트림-배치 융합 아키텍처로 Lambda architecture의 복잡성을 해결했습니다. " +
      "실시간 스트림과 배치 처리의 결과를 serving layer에서 merge하여 " +
      "빠른 응답과 높은 정확도를 동시에 제공했습니다. " +
      "Kappa architecture로의 전환을 점진적으로 진행했습니다.\n\n" +
      "결과적으로 실시간 이벤트 처리 지연시간을 P95 기준 100ms로 유지하고, " +
      "스트림 처리 처리량을 초당 10,000 이벤트로 확장했으며, " +
      "데이터 정확성 99.99%를 달성했습니다.",
  },
  {
    id: 65,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question: "How do you implement data quality monitoring in pipelines?",
    answer:
      "데이터 품질 모니터링에서 가장 중요한 것은 실시간 검증과 문제 데이터의 격리입니다.\n\n" +
      "Data Quality Dimensions을 정의하여 체계적으로 접근했습니다. " +
      "Completeness는 필수 필드 누락률, Accuracy는 비즈니스 룰 위반률, " +
      "Consistency는 참조 무결성 위반률, Timeliness는 데이터 지연시간을 측정했습니다. " +
      "각 차원별로 임계값을 설정하고 SLA를 정의했습니다.\n\n" +
      "Schema Validation을 파이프라인 진입점에 구현했습니다. " +
      "JSON Schema와 Avro Schema로 데이터 구조를 검증하고, " +
      "타입 불일치, 필드 누락, 값 범위 초과를 사전에 차단했습니다. " +
      "잘못된 데이터가 downstream으로 전파되는 것을 방지했습니다.\n\n" +
      "Statistical Profiling으로 데이터 분포를 모니터링했습니다. " +
      "각 필드의 min, max, mean, percentiles를 추적하고, " +
      "historical baseline과 비교하여 anomaly를 감지했습니다. " +
      "갑작스런 분포 변화는 upstream 시스템의 문제를 나타내는 early warning이었습니다.\n\n" +
      "Business Rule Engine을 구축하여 도메인 특화 검증을 수행했습니다. " +
      "주문 금액은 0보다 커야 하고, 이메일은 valid format이어야 하며, " +
      "날짜는 미래 값이 될 수 없다는 등의 비즈니스 로직을 코드화했습니다. " +
      "rule violation시 severity에 따라 reject 또는 flag 처리했습니다.\n\n" +
      "Data Lineage 추적으로 품질 문제의 근본 원인을 파악했습니다. " +
      "어떤 source system에서 문제가 시작되었는지, " +
      "어떤 transformation에서 오염되었는지를 역추적할 수 있게 했습니다. " +
      "metadata driven approach로 자동화된 lineage mapping을 구현했습니다.\n\n" +
      "Quarantine Zone으로 문제 데이터를 격리했습니다. " +
      "품질 검사를 통과하지 못한 데이터는 별도 storage에 격리하고, " +
      "manual review와 data cleansing 후 재처리하는 워크플로우를 구축했습니다. " +
      "전체 파이프라인이 bad data로 인해 중단되는 것을 방지했습니다.\n\n" +
      "Real-time Quality Metrics Dashboard를 구축했습니다. " +
      "품질 점수, 오류율, 처리량을 실시간으로 표시하고, " +
      "품질 저하 시 immediate alert을 보냈습니다. " +
      "data steward가 proactive하게 대응할 수 있는 환경을 만들었습니다.\n\n" +
      "Data Quality Test Automation을 CI/CD에 통합했습니다. " +
      "파이프라인 코드 변경 시 quality test suite가 자동 실행되어 " +
      "regression을 방지했습니다. " +
      "test-driven data pipeline development 문화를 정착시켰습니다.\n\n" +
      "결과적으로 데이터 품질을 85%에서 99.5%로 향상시키고, " +
      "품질 이슈 탐지 시간을 8시간에서 5분으로 단축했으며, " +
      "bad data로 인한 downstream 시스템 장애를 90% 감소시켰습니다.",
  },
  {
    id: 136,
    category1: "Data Pipeline",
    category2: "Orchestration",
    question:
      "일일 2천만~5천만 건의 메시지를 처리하는 Kafka 클러스터와 200개 이상의 Airflow DAG를 운영한 경험에 대해 설명해주세요. Celery Executor를 선택한 이유와 DAG 실패 시 자동 복구 전략, 데이터 파이프라인 SLA 보장 방법은?",
    answer:
      "대규모 데이터 파이프라인 운영에서 가장 중요한 것은 '예측 가능성'과 'Fault Tolerance'입니다.\n\n" +
      "당시 상황을 먼저 설명하겠습니다. TheShop의 데이터 파이프라인은 크게 세 가지 워크로드로 구성되어 있었습니다. 첫째, Kafka 기반 실시간 이벤트 스트림(주문, 장바구니, 조회 로그)이 하루 평균 2천만~5천만 건 유입되었고, 둘째, 이 데이터를 배치로 가공하는 200개 이상의 Airflow DAG가 매시간/매일 실행되었으며, 셋째, 비즈니스 팀이 요청하는 Ad-hoc 분석 쿼리가 수시로 발생했습니다. 이 세 가지를 안정적으로 처리하면서 SLA를 지키는 것이 핵심 과제였죠.\n\n" +
      "먼저 Kafka 클러스터 아키텍처를 설명하겠습니다.\n\n" +
      "3개 브로커로 클러스터를 구성했습니다. Replication Factor는 3으로 설정해서 브로커 1대가 죽어도 데이터 손실 없이 운영할 수 있었어요. min.insync.replicas=2로 설정해서 최소 2개 replica에 쓰기가 완료되어야 ACK를 보내도록 했습니다. 완벽한 durability와 성능의 균형점이었죠.\n\n" +
      "파티션 전략이 처리량에 큰 영향을 미쳤습니다. 각 토픽마다 12개 파티션을 설정했어요. Consumer Group당 최대 12개 인스턴스가 병렬 처리할 수 있는 구조였죠. 파티션 키는 user_id 해싱으로 설정해서 같은 사용자의 이벤트는 순서가 보장되도록 했습니다. Hot Partition 문제가 발생할 때는 user_id + event_type 조합으로 더 세밀하게 분산시켰어요.\n\n" +
      "Kafka 성능 튜닝을 위해 여러 설정을 조정했습니다. batch.size=16384, linger.ms=10으로 설정해서 메시지를 묶어서 전송하도록 했죠. 네트워크 호출 횟수가 줄어서 throughput이 30% 향상되었습니다. compression.type=snappy로 설정해서 네트워크 대역폭도 40% 절감했고요.\n\n" +
      "Consumer Lag 모니터링이 SLA 보장의 핵심이었습니다. Burrow를 사용해서 Consumer Group별 Lag를 실시간으로 추적했어요. Lag가 100만 건을 넘으면 P1 알림, 500만 건을 넘으면 P0 알림으로 escalation했습니다. Lag spike를 조기에 감지해서 Consumer를 scale-out하거나 병목 코드를 최적화했죠.\n\n" +
      "이제 Airflow 아키텍처를 설명하겠습니다.\n\n" +
      "Celery Executor를 선택한 이유는 세 가지였습니다. 첫째, Horizontal Scaling이 쉬웠어요. LocalExecutor는 단일 서버에 제한되지만, Celery는 Worker를 여러 서버에 분산할 수 있었죠. 200개 DAG를 동시에 실행하려면 분산 처리가 필수였습니다. 둘째, Dynamic Scaling이 가능했어요. 피크 타임에는 Worker를 10대까지 늘리고, 야간에는 3대로 줄여서 비용을 절감했습니다. 셋째, Task 격리가 명확했습니다. 한 Task가 메모리를 과다 사용해도 다른 Task에 영향을 주지 않았죠.\n\n" +
      "Celery Executor 구성을 상세히 설명하면 이렇습니다. Message Broker로 Redis를 사용했습니다. RabbitMQ도 고려했지만, 이미 Redis를 캐시와 세션 스토리지로 사용하고 있었고, Redis Sentinel로 고가용성을 확보한 상태여서 추가 인프라 없이 재사용할 수 있었죠. Result Backend도 Redis로 설정해서 Task 실행 결과를 저장했습니다.\n\n" +
      "Worker Pool은 prefork 방식을 사용했습니다. 각 Worker마다 concurrency=4로 설정해서 4개 프로세스가 병렬로 Task를 처리하도록 했어요. CPU-bound Task는 prefork가 효율적이었습니다. I/O-bound Task가 많은 경우는 eventlet pool을 고려했지만, 우리는 Athena 쿼리나 Glue Job 같은 CPU/메모리 집약적 작업이 대부분이어서 prefork가 적합했죠.\n\n" +
      "DAG 실패 시 자동 복구 전략을 구체적으로 설명하겠습니다.\n\n" +
      "첫 번째는 Task 레벨 Retry 정책이었습니다. 모든 Task에 retries=3, retry_delay=timedelta(minutes=5), retry_exponential_backoff=True를 설정했어요. 일시적 네트워크 오류나 AWS 서비스 throttling으로 실패한 경우 자동으로 재시도되도록 했죠. 단, 데이터 품질 오류나 syntax error는 재시도해도 의미가 없으니 on_failure_callback으로 Slack 알림을 보내고 수동 개입을 요청했습니다.\n\n" +
      "두 번째는 Idempotent Task 설계였습니다. 모든 Task가 여러 번 실행되어도 결과가 동일하도록 설계했어요. 예를 들어 Athena CTAS 쿼리는 CREATE OR REPLACE 구문을 사용해서 중복 실행 시 기존 테이블을 덮어쓰도록 했습니다. S3 파일 업로드는 고유한 파일명(날짜+시간+랜덤ID)을 사용해서 충돌을 방지했죠.\n\n" +
      "세 번째는 Sensor를 활용한 Dependency 체크였습니다. Downstream DAG가 Upstream 데이터를 기다릴 때 S3KeySensor를 사용했어요. 데이터가 준비될 때까지 polling하다가 준비되면 자동으로 다음 Task를 실행했습니다. 이렇게 해서 Upstream 지연이 Downstream 실패로 이어지지 않도록 했죠.\n\n" +
      "네 번째는 Dead Letter Queue(DLQ) 패턴이었습니다. 3회 재시도 후에도 실패한 Task는 실패 원인과 입력 데이터를 DynamoDB에 기록했어요. Data Engineer가 매일 아침 DLQ를 리뷰하고, 데이터를 수정한 후 재처리하는 워크플로우를 만들었습니다. 이렇게 해서 하나의 bad data가 전체 파이프라인을 멈추지 않도록 했죠.\n\n" +
      "데이터 파이프라인 SLA 보장 방법을 설명하겠습니다.\n\n" +
      "첫 번째는 SLA 모니터링과 알림이었습니다. Airflow의 SLAs parameter를 각 DAG에 설정했어요. 예를 들어 매일 오전 9시까지 완료되어야 하는 리포트 DAG는 sla=timedelta(hours=12)로 설정했습니다. SLA Miss가 발생하면 자동으로 Slack 알림과 PagerDuty 페이지가 발송되었죠.\n\n" +
      "두 번째는 Critical Path 최적화였습니다. 200개 DAG 중 비즈니스 크리티컬한 20개를 식별해서 우선순위를 높였어요. Airflow의 priority_weight를 높게 설정해서 Celery Queue에서 먼저 처리되도록 했습니다. 나머지 180개는 여유 시간대에 실행되도록 스케줄을 조정했죠.\n\n" +
      "세 번째는 Incremental Processing이었습니다. 매번 전체 데이터를 재처리하지 않고, 변경된 부분만 처리하도록 최적화했어요. Athena 쿼리에 WHERE date >= '{{ ds }}'를 추가해서 해당 날짜 파티션만 스캔했습니다. 처리 시간이 2시간에서 12분으로 90% 단축되었죠.\n\n" +
      "네 번째는 Parallel Execution이었습니다. 의존성이 없는 Task들은 최대한 병렬로 실행하도록 DAG를 설계했어요. Task Group을 활용해서 논리적으로 묶되, 물리적으로는 병렬 실행되도록 했습니다. 예를 들어 7개 서비스의 로그를 각각 처리하는 Task는 모두 병렬로 실행되었죠.\n\n" +
      "다섯 번째는 Capacity Planning이었습니다. 과거 3개월 DAG 실행 통계를 분석해서 피크 타임을 파악했어요. 매일 오전 8-10시, 매주 월요일 오전이 가장 바빴습니다. 이 시간대에는 Celery Worker를 10대까지 scale-out하고, 나머지 시간은 3대로 유지해서 비용을 40% 절감했죠.\n\n" +
      "결과적으로 DAG 성공률을 92%에서 99.5%로 향상시켰고, SLA 달성률을 88%에서 99%로 높였으며, 평균 파이프라인 실행 시간을 45분에서 12분으로 73% 단축했습니다. 가장 중요한 성과는, 데이터 팀이 운영에 쓰는 시간이 주당 20시간에서 3시간으로 줄어서 실제 분석과 개선에 집중할 수 있게 되었다는 것입니다.\n\n" +
      "핵심 교훈은, 대규모 데이터 파이프라인은 '한 번에 완벽하게'가 아니라 '지속적인 모니터링과 개선'으로 안정화된다는 것입니다. 장애를 zero로 만들 수는 없지만, 장애 발생 시 자동 복구되고, 영향 범위를 최소화하며, 빠르게 대응할 수 있는 시스템을 만드는 것이 현실적인 목표였습니다.",
  },
];
