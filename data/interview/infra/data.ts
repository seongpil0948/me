import type { InterviewQuestion } from "@/types/portfolio";

/**
 * Data & Messaging 질문들
 * ID: 66, 13, 58, 60, 65, 69
 */
export const infraDataQuestions: InterviewQuestion[] = [
  {
    id: 66,
    category1: "Infrastructure",
    category2: "Messaging",
    question: "Describe your experience with message queues like Kafka.",
    answer:
      "Kafka 운영에서 가장 어려웠던 것은 하루 2천만~5천만 건 메시지가 쏟아지는데 어느 하나 놓치면 안 된다는 부담감이었어요. 특히 결제 관련 메시지는 단 1건도 손실되면 안 되거든요.\n\n" +
      "문제 상황: ₩500B 이커머스 플랫폼의 Kafka 클러스터를 운영했는데, 크게 세 종류의 토픽이 있었어요. 첫째, CDC(Change Data Capture) 토픽으로 MySQL binlog를 실시간 스트리밍해서 주문, 결제, 재고 변경사항을 전파했습니다. 둘째, 모니터링 토픽으로 OpenTelemetry Span, 메트릭, 로그를 수집했어요. 셋째, 운영 토픽으로 알림, 배치 트리거, 이벤트 발행을 처리했죠. 이 세 가지를 합치면 하루 2천만~5천만 건이었어요.\n\n" +
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
    id: 59,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question: "데이터 파이프라인 구축 경험은 어떤가요?",
    answer:
      "데이터 파이프라인 구축에서 가장 어려웠던 것은 '실시간'과 '정확성' 사이의 trade-off였어요. 기획팀은 5분마다 업데이트되는 대시보드를 원했지만, 데이터 품질이 떨어지면 잘못된 의사결정으로 이어질 수 있었거든요.\n\n" +
      "문제 상황: ₩500B 플랫폼의 비즈니스 인사이트가 필요했어요. MAU, DAU, Conversion Rate, Cart Source 같은 지표를 실시간으로 봐야 하는데, 기존엔 개발자가 SQL 쿼리를 직접 짜서 수동으로 추출했죠. 일주일에 2-3일을 리포트 만드는 데 쓰고 있었어요. 이건 비효율의 극치였죠.\n\n" +
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
    id: 60,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question: "데이터 파이프라인 장애 복구를 어떻게 처리하나요?",
    answer:
      "데이터 파이프라인 장애 복구에서 가장 중요한 것은 빠른 감지와 자동 복구입니다. AWS Step Functions, Athena, Glue, S3 기반 파이프라인에서 실제로 마주한 문제들과 해결 방법을 설명하겠습니다.\n\n" +
      "AWS SNS 기반 에러 알림 시스템을 구축했습니다. Step Functions의 각 State에서 실패가 발생하면 즉시 SNS Topic으로 알림을 보냈어요. Lambda에서 Athena 쿼리 실패, Glue Job 실패, S3 권한 오류 등을 감지하면 Slack과 PagerDuty로 알림을 전송했습니다. 에러 메시지에는 실패한 Step, 에러 타입, 처리 중이던 데이터 경로, 재실행 가능 여부를 포함했죠. 이렇게 해서 장애 발생 후 5분 내 담당자가 인지할 수 있었어요.\n\n" +
      "S3 쓰로틀링(429 에러)이 가장 빈번한 문제였습니다. 처음엔 Step Functions에서 15개 Athena 쿼리를 병렬로 실행했는데, 각 쿼리가 S3에 동시에 접근하면서 초당 3,500 PUT 요청 제한을 초과했어요. S3는 prefix당 3,500 TPS를 제공하는데, 모든 쿼리가 같은 output/ prefix에 쓰면서 병목이 발생한 거죠. 해결책은 두 가지였습니다. 첫째, 병렬 쿼리 수를 4개에서 2개로 줄였어요. 둘째, S3 output path를 쿼리 타입별로 분리했습니다. output/user-behavior/, output/commerce/, output/performance/ 이렇게 prefix를 나눠서 각각 독립적인 TPS를 확보했죠. 이렇게 해서 쓰로틀링 에러를 100% 제거했습니다.\n\n" +
      "Athena 쿼리 타임아웃 문제도 있었습니다. 특정 쿼리가 5분 안에 완료되지 않으면 Lambda의 15분 타임아웃에 걸렸어요. 원인은 파티션 프루닝 없이 전체 테이블을 스캔해서였습니다. WHERE date >= '2024-01-01' 조건을 추가해서 스캔 범위를 90% 줄였고, 쿼리 실행 시간을 5분에서 1분으로 단축했죠. 또한 Athena 쿼리 결과를 S3 Glacier로 자동 전환(7일 후)해서 스토리지 비용도 40% 절감했습니다.\n\n" +
      "Glue Job 실패 시 자동 재시도 전략을 구현했습니다. Glue에는 내장 재시도 기능이 있지만, 데이터 품질 오류로 실패한 경우 재시도해도 소용없어요. 그래서 에러 타입별로 재시도 전략을 차등 적용했습니다. transient error(네트워크 오류, AWS throttling)는 3회 자동 재시도하고, data quality error(스키마 불일치, null 값)는 즉시 실패시키고 SNS 알림을 보냈죠. Glue의 JobRun API로 에러 타입을 파싱해서 분기 처리했습니다.\n\n" +
      "Step Functions의 Retry와 Catch 설정을 최적화했습니다. Athena 쿼리 실패 시 IntervalSeconds=10, MaxAttempts=3, BackoffRate=2.0으로 설정해서 exponential backoff를 적용했어요. S3 쓰로틀링 같은 일시적 오류는 10초 후 재시도, 20초 후 2차 재시도 이런 식으로 자동 복구했습니다. 하지만 SQL syntax error나 권한 오류는 재시도해도 의미가 없으니 Catch로 바로 SNS 알림을 보냈죠.\n\n" +
      "데이터 재처리를 위한 Idempotent 설계가 중요했습니다. Athena CTAS 쿼리는 CREATE TABLE AS SELECT 대신 CREATE OR REPLACE를 사용해서, 재실행 시 기존 테이블을 덮어쓰도록 했어요. S3 파일도 고유한 경로(s3://bucket/year=2024/month=03/day=15/)로 파티셔닝해서, 날짜별로 재처리해도 충돌이 없도록 설계했습니다. 이렇게 해서 장애 복구 시 특정 날짜만 재실행할 수 있었죠.\n\n" +
      "CloudWatch 알람으로 proactive 모니터링을 구축했습니다. Step Functions 실행 실패 횟수, Athena 스캔 데이터 용량(임계값 5TB 초과 시 알림), S3 GET/PUT 요청 급증, Glue Job DPU 사용률을 추적했어요. 비정상 패턴이 감지되면 자동으로 SNS 알림을 보내서, 장애가 발생하기 전에 선제 대응할 수 있었습니다.\n\n" +
      "Data Lineage를 Step Functions의 실행 이력으로 추적했습니다. 각 State의 Input/Output을 S3에 JSON으로 저장해서, 어떤 원본 데이터가 어떤 테이블로 가공되었는지 추적 가능했어요. 장애 발생 시 영향받는 downstream 대시보드를 빠르게 파악하고, 비즈니스 팀에 사전 안내할 수 있었죠.\n\n" +
      "결과적으로 MTTR을 4시간에서 15분으로 단축했고, S3 쓰로틀링 에러를 100% 제거했으며, 파이프라인 성공률을 92%에서 99.5%로 향상시켰습니다. 가장 중요한 성과는, SNS 알림으로 장애를 5분 내 인지하고 자동 재시도로 80% 이상의 문제가 인간 개입 없이 해결되었다는 것입니다.",
  },
  {
    id: 68,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question:
      "Airflow 또는 유사한 워크플로우 오케스트레이션 도구 경험은 어떤가요?",
    answer:
      "Airflow 운영에서 가장 중요한 것은 DAG 의존성 관리와 실패 복구 전략입니다. 저는 20개에서 시작해서 200개 이상의 DAG로 확장하면서, 확장성과 안정성을 동시에 달성하는 여정을 겪었습니다.\n\n" +
      "초기 상황을 먼저 설명하겠습니다. TheShop의 데이터 파이프라인은 처음엔 단순했어요. 매일 오전 9시에 실행되는 일일 배치 20개가 전부였죠. 그런데 비즈니스가 성장하면서 요구사항이 폭발적으로 증가했습니다. CDC 처리, 실시간 스트리밍 데이터 가공, ML 모델 학습, 분석 리포트 생성 등 다양한 워크로드가 추가되었어요. 6개월 만에 DAG가 100개를 넘었고, 1년 후엔 200개를 돌파했습니다. 이 과정에서 Airflow 아키텍처를 3번이나 재설계했죠.\n\n" +
      "DAG 설계에서 멱등성(Idempotency)을 최우선으로 고려했습니다. 재실행해도 결과가 동일하도록 upsert 패턴을 사용하고, 파티션 기반 처리로 중복 실행에도 안전하게 설계했습니다. 예를 들어 Athena CTAS 쿼리는 CREATE OR REPLACE 구문을 사용해서 중복 실행 시 기존 테이블을 덮어쓰도록 했어요. S3 파일 업로드는 고유한 파일명(날짜+시간+UUID)을 사용해서 충돌을 방지했죠. 날짜 파라미터를 명시적으로 전달하여 execution_date 기반으로 재처리가 가능하게 만들었습니다.\n\n" +
      "의존성 관리가 가장 복잡했습니다. DAG 간 의존성을 처음엔 ExternalTaskSensor로 관리했지만, upstream DAG 지연으로 downstream이 타임아웃되는 문제가 빈번했습니다. 예를 들어 일일 매출 집계 DAG(A)가 완료되어야 주간 매출 리포트 DAG(B)가 실행되는 구조였는데, A가 평소 30분 걸리다가 어느 날 2시간 걸리면 B가 타임아웃으로 실패했죠. TriggerDagRunOperator로 명시적 트리거 패턴으로 전환하고, SLA 알림을 설정해서 upstream 지연을 조기에 감지하도록 했습니다. 이렇게 해서 의존성 타임아웃 실패율을 30%에서 5%로 줄였어요.\n\n" +
      "리소스 경합 해결이 중요했습니다. 여러 DAG가 동시 실행되면서 Celery Worker가 고갈되는 문제를 겪었습니다. 매일 오전 8-10시, 특히 월요일 오전이 가장 바빴어요. 20개 DAG가 동시에 트리거되면서 Worker 큐가 포화 상태가 되었고, 중요한 실시간 데이터 처리 DAG조차 대기해야 했죠. Pool을 업무별(ETL, ML, Reporting)로 분리하고 우선순위 큐를 설정했습니다. 중요 DAG는 전용 pool에서 실행되도록 격리했어요. 예를 들어 결제 데이터 처리는 priority_weight=10으로 설정해서 항상 먼저 실행되도록 했습니다.\n\n" +
      "실패 복구 전략으로 자동 재시도와 알림을 구현했습니다. Task별로 retry 정책을 차등 적용했어요. 네트워크 오류나 AWS throttling 같은 transient error는 retries=3, retry_delay=5분, retry_exponential_backoff=True로 자동 재시도했습니다. 하지만 데이터 품질 오류나 syntax error는 재시도해도 의미가 없으니 on_failure_callback으로 즉시 Slack 알림을 보냈죠. SLA 모니터링으로 지연 감지를 자동화했습니다. 각 DAG에 sla=timedelta(hours=12) 같은 값을 설정해서, SLA Miss 발생 시 PagerDuty로 escalation되도록 했어요.\n\n" +
      "Dynamic DAG 생성으로 유지보수 부담을 줄였습니다. 반복적인 ETL 패턴을 템플릿화하고, YAML 설정에서 DAG를 동적 생성했습니다. 예를 들어 7개 서비스(주문, 결제, 재고, 배송, 고객, 마케팅, 정산)의 로그를 각각 S3 → Athena → Glue로 처리하는 DAG가 있었는데, 처음엔 7개 Python 파일로 관리했어요. 근데 공통 로직 변경할 때마다 7개 파일을 다 고쳐야 했죠. DAG Factory 패턴을 도입해서 service_config.yaml에 서비스 정보만 정의하고, 단일 템플릿에서 7개 DAG를 동적 생성하도록 바꿨습니다. 이렇게 해서 200개 DAG를 10개 템플릿으로 관리하게 되었고, 코드 중복을 90% 제거했어요.\n\n" +
      "Celery Worker 성능 튜닝도 중요했습니다. 처음엔 worker_concurrency=4로 설정했는데, CPU-bound Task가 많아서 GIL 때문에 병렬 처리 효과가 적었어요. prefork pool 방식으로 변경하고 concurrency를 8로 늘렸더니 throughput이 2배로 증가했습니다. 또한 Task 실행 지연 문제도 있었어요. 특정 Worker들이 Scheduler로부터 Task를 할당받는 시간이 8초나 지연되는 현상이 있었죠. Redis Sentinel 설정 최적화와 Worker node 증설(24 Core → 120 Core)로 지연을 1초 이내로 줄였습니다.\n\n" +
      "모니터링과 알림 체계를 구축했습니다. Flower(Celery 모니터링 툴)로 Worker 상태와 Task Queue 상황을 실시간 추적했어요. Grafana 대시보드에서 DAG 성공률, 평균 실행시간, SLA Miss 횟수를 시각화했습니다. CloudWatch 알림으로 DB Connection Pool 고갈, Redis 메모리 임계값 초과 등의 이상 징후를 조기에 감지했죠.\n\n" +
      "결과적으로 DAG 성공률을 92%에서 99.5%로 향상시켰고, SLA 달성률을 88%에서 99%로 높였으며, 평균 파이프라인 실행 시간을 45분에서 12분으로 73% 단축했습니다. 가장 중요한 성과는, 데이터 팀이 운영에 쓰는 시간이 주당 20시간에서 3시간으로 줄어서 실제 분석과 개선에 집중할 수 있게 되었다는 것입니다.",
  },
  {
    id: 69,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question: "스트림 처리 프레임워크 경험은 어떤가요?",
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
    category2: "Data Quality",
    question: "파이프라인에서 데이터 품질 모니터링을 어떻게 구현하나요?",
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
      "200개 이상의 Airflow DAG와 일일 2천만~5천만 건의 메시지를 처리하는 Kafka 클러스터를 운영한 경험에 대해 설명해주세요. Celery Executor를 선택한 이유와 DAG 실패 시 자동 복구 전략, 데이터 파이프라인 SLA 보장 방법은?",
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
      "핵심 교훈은, 대규模 데이터 파이프라인은 '한 번에 완벽하게'가 아니라 '지속적인 모니터링과 개선'으로 안정화된다는 것입니다. 장애를 zero로 만들 수는 없지만, 장애 발생 시 자동 복구되고, 영향 범위를 최소화하며, 빠르게 대응할 수 있는 시스템을 만드는 것이 현실적인 목표였습니다.",
  },
  {
    id: 137,
    category1: "Infrastructure",
    category2: "Airflow Troubleshooting",
    question:
      "Airflow 분산 환경에서 OpenTelemetry 연동 시 발생한 'Failed to encode key file_path: Invalid type DagFileInfo' 에러를 어떻게 해결했나요?",
    answer:
      "이 문제는 단일 호스트 환경(local, dev)에서는 발생하지 않았는데, 프로덕션 분산 환경에서만 발생해서 디버깅이 까다로웠습니다.\n\n" +
      "문제 상황을 먼저 설명하겠습니다. 프로덕션 환경은 6개 서버로 구성된 멀티 호스트 Airflow 클러스터였어요. Scheduler 2대, Worker 4대, WebServer, Triggerer 등이 분산되어 있었죠. OpenTelemetry로 분산 추적을 구현하려고 했는데, Dag-processor에서 계속 에러가 발생했습니다. 에러 메시지는 'Failed to encode key file_path: Invalid type <class airflow.dag_processing.manager.DagFileInfo>'였어요. 로컬이나 개발 서버(단일 호스트)에서는 정상 동작했는데, 프로덕션에서만 터지는 거예요.\n\n" +
      "근본 원인을 분석했습니다. OpenTelemetry Exporter는 Span 속성을 OTLP 프로토콜로 직렬화할 때, 기본 Python 타입(str, int, float, bool, list, dict)만 지원합니다. 그런데 Airflow 2.x의 DagFileInfo는 커스텀 클래스였어요. 단일 호스트 환경에서는 Span이 같은 프로세스 내에서 처리되어 문제가 없었지만, 분산 환경에서는 네트워크를 통해 전송되면서 직렬화 오류가 발생한 거죠.\n\n" +
      "해결 방법은 세 가지 단계로 진행했습니다.\n\n" +
      "첫째, DagFileInfo를 직렬화 가능한 타입으로 변환하는 헬퍼 함수를 작성했습니다. lib/otel/traces/utils.py에 sanitize_attributes 함수를 구현했어요. DagFileInfo 객체를 만나면 str(obj)로 변환하고, PosixPath도 문자열로 변환했습니다. 재귀적으로 dict와 list를 순회하면서 모든 커스텀 객체를 기본 타입으로 변환하도록 했죠.\n\n" +
      "둘째, Airflow의 DagFileProcessorManager instrumentation을 커스터마이징했습니다. OpenTelemetry의 instrument() 데코레이터를 사용하되, span_attributes_extractor 콜백에서 sanitize_attributes를 호출하도록 했어요. 이렇게 해서 Span이 생성되기 전에 모든 속성이 직렬화 가능한 상태로 변환되었습니다.\n\n" +
      "셋째, 프로덕션 환경에서만 발생하는 문제였기 때문에, 환경별 설정 분리가 중요했습니다. config/prd/docker-compose.yaml에서 OTEL_EXPORTER_OTLP_ENDPOINT를 멀티 호스트 클러스터의 Collector로 설정하고, OTEL_SPAN_ATTRIBUTE_SANITIZATION=true 환경 변수를 추가했죠. 로컬/개발 환경에서는 이 설정이 필요 없으니 활성화하지 않았습니다.\n\n" +
      "테스트 전략도 중요했습니다. 로컬에서는 재현이 안 되니, 개발 서버를 일시적으로 멀티 노드로 구성해서 테스트했어요. Docker Compose로 Scheduler와 Worker를 별도 컨테이너로 분리하고, 네트워크를 격리해서 분산 환경을 시뮬레이션했습니다. 이렇게 해서 프로덕션 배포 전에 문제를 검증할 수 있었죠.\n\n" +
      "추가로 발견한 문제도 있었습니다. 특정 DAG들(analysis/goods_prediction/dag.py, etl/update_dag_run_in_mariadb.py 등 50개 이상)에서 에러가 집중되었어요. 이 DAG들은 공통적으로 커스텀 Operator를 사용하고 있었는데, Operator 내부에서 context를 Span 속성으로 직접 전달하고 있었습니다. context에는 DagFileInfo 외에도 여러 Airflow 내부 객체들이 포함되어 있었죠. 이 문제를 해결하려고 lib/otel/logger/core.py에서 context를 필터링하는 로직을 추가했습니다. task_id, dag_id, execution_date 같은 필수 정보만 추출하고, 나머지 복잡한 객체는 제외했어요.\n\n" +
      "모니터링 개선도 했습니다. OpenTelemetry Collector에서 직렬화 에러를 감지하면 AWS SNS 알림을 보내도록 설정했어요. 또한 Grafana 대시보드에 'OTEL Encoding Errors' 패널을 추가해서, 어떤 DAG에서 에러가 발생하는지 실시간으로 추적했습니다. 에러 발생 시 자동으로 DagFileInfo를 문자열로 변환하되, 로그에는 원본 타입 정보를 남겨서 추후 디버깅에 활용할 수 있도록 했죠.\n\n" +
      "결과적으로 프로덕션 환경에서 OTEL 에러를 100% 제거했고, 분산 추적이 정상적으로 동작하게 되었습니다. Span 속성 직렬화 오버헤드는 Task당 평균 5ms 이내로 성능에 거의 영향이 없었어요. 가장 중요한 교훈은, '로컬에서 되면 프로덕션에서도 된다'는 가정이 분산 시스템에서는 위험하다는 것이었습니다. 환경별 차이를 고려한 테스트 전략이 필수적이죠.",
  },
  {
    id: 138,
    category1: "Infrastructure",
    category2: "Airflow Performance",
    question:
      "Airflow Worker의 Task 할당 지연 문제(8초)를 어떻게 해결했나요? Worker 증설과 동시성 튜닝 경험을 설명해주세요.",
    answer:
      "이 문제는 DAG 수가 20개에서 100개로 증가하면서 발생했습니다. 특정 Worker들이 Scheduler로부터 Task를 할당받는데 8초나 걸렸어요. 이 지연 때문에 분당 처리 가능한 Task 수가 병목되었고, 피크 타임에 Task들이 Queue에 쌓이면서 SLA Miss가 빈번했습니다.\n\n" +
      "문제 진단을 위해 Celery Flower와 Prometheus 메트릭을 분석했습니다. Worker별로 Task 수신 시간을 추적했더니, 시간대별로 패턴이 보였어요. 매일 오전 8-10시, 특히 월요일 오전이 가장 심했습니다. 분당 최대 22개 Task가 실행되는데, 예정된 DAG는 100개가 넘었죠. 계산해보니 분당 110개 Task가 필요했어요. 기존 Worker 3대(각 8 CPU, 16GB)로는 처리량이 부족했습니다.\n\n" +
      "근본 원인은 세 가지였습니다. 첫째, Worker 리소스 부족. 각 Task는 1 Core를 점유하는데, 전체 24 Core로는 동시에 24개 Task밖에 처리할 수 없었어요. 둘째, Celery Worker의 worker_concurrency 설정이 4로 제한되어 있었습니다. 셋째, Redis Broker의 connection pool이 부족해서 Worker들이 Task를 가져올 때 경합이 발생했죠.\n\n" +
      "해결 방법은 단계별로 진행했습니다.\n\n" +
      "첫 번째 단계는 Worker 증설과 스펙업이었습니다. Worker 3대를 4대로 증설하고, 기존 Worker는 8 CPU에서 32 CPU로 스케일업했어요. 신규 Worker는 48 CPU로 프로비저닝했습니다. 총 120 Core를 확보해서 이론적으로는 분당 120개 Task를 처리할 수 있게 되었죠. Scheduler와 Triggerer용으로 16 Core, Redis용으로 4 Core를 예약했으니, 실제 DAG 실행용으로는 100 Core가 남았습니다.\n\n" +
      "두 번째 단계는 Celery Executor 최적화였습니다. worker_concurrency를 4에서 16으로 증가시켰어요. 각 Worker마다 16개 프로세스가 병렬로 Task를 처리하도록 했죠. Worker Pool은 prefork 방식을 유지했습니다. CPU-bound Task가 많아서 prefork가 효율적이었거든요. I/O-bound Task가 많았다면 eventlet pool을 고려했겠지만, 우리는 Athena 쿼리, Glue Job, ML 학습 같은 CPU/메모리 집약적 작업이 대부분이었습니다.\n\n" +
      "세 번째 단계는 DAG 레벨 동시성 제어였습니다. dag_concurrency 파라미터를 조정했어요. 기존엔 DAG당 무제한 Task가 동시 실행될 수 있었는데, 이게 Worker를 과부하시켰습니다. dag_concurrency=10으로 설정해서, 한 DAG가 최대 10개 Task만 동시 실행하도록 제한했죠. 대신 여러 DAG가 병렬로 실행될 수 있어서 전체 throughput은 오히려 증가했습니다.\n\n" +
      "네 번째 단계는 Redis Sentinel 최적화였습니다. Redis connection pool size를 50에서 200으로 증가시켰어요. Worker 4대 × worker_concurrency 16 = 64개 프로세스가 동시에 Redis에 연결하는데, pool이 부족하면 connection wait이 발생했거든요. 또한 Redis maxmemory를 2GB에서 4GB로 증가시키고, eviction policy를 allkeys-lru로 설정해서 메모리 부족 시 오래된 Task 결과를 자동으로 제거하도록 했습니다.\n\n" +
      "다섯 번째 단계는 Task Priority 및 Pool 분리였습니다. Airflow의 Pool 기능으로 리소스를 용도별로 격리했어요. 'critical' pool(20 slots), 'etl' pool(40 slots), 'ml' pool(20 slots), 'reporting' pool(20 slots)로 나눴습니다. 결제 데이터 처리 같은 중요 DAG는 critical pool에 할당하고 priority_weight=10으로 설정해서, 항상 먼저 실행되도록 했죠. 덜 중요한 배치 작업은 reporting pool에 할당해서 리소스 경합을 줄였습니다.\n\n" +
      "여섯 번째 단계는 DB Connection Pool 튜닝이었습니다. PostgreSQL AirflowDB의 max_connections를 40에서 100으로 증가시켰어요. Worker가 증가하면 DB 연결도 비례해서 증가하거든요. connection pool timeout과 retry 설정도 최적화해서, DB 연결 실패로 인한 Task 실패를 방지했습니다.\n\n" +
      "모니터링 개선도 중요했습니다. Prometheus + Grafana로 실시간 대시보드를 구축했어요. Worker별 CPU/Memory 사용량, Task 처리량, Queue depth, Task 할당 지연시간을 모니터링했습니다. Task 할당 지연이 3초를 초과하면 Slack 알림을 보내도록 설정했죠. 또한 시간대별 부하 패턴을 분석해서, 피크 타임(오전 8-10시)에는 Worker를 scale-out하고 야간에는 scale-in하는 auto-scaling 전략을 수립했습니다.\n\n" +
      "결과적으로 Task 할당 지연을 8초에서 1초 이내로 단축했고, 분당 처리 가능한 Task 수를 22개에서 110개로 5배 증가시켰습니다. DAG 성공률은 92%에서 99.5%로 향상되었고, SLA 달성률은 88%에서 99%로 개선되었어요. 가장 중요한 성과는, 피크 타임에도 안정적으로 모든 DAG가 정시에 실행되어, 비즈니스 팀이 신뢰할 수 있는 데이터 파이프라인이 구축되었다는 것입니다.\n\n" +
      "핵심 교훈은, 단순히 서버 증설만으로는 부족하다는 것이었습니다. Worker 수, worker_concurrency, dag_concurrency, Redis pool, DB connections가 모두 조화롭게 튜닝되어야 진정한 성능 향상이 가능했습니다. 병목 지점을 정확히 진단하고, 전체 시스템의 균형을 맞추는 것이 핵심이었죠.",
  },
];
