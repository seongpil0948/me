# Step Functions 오케스트레이션 가이드

## 개요

이 프로젝트는 AWS Step Functions를 사용하여 여러 서비스에 대한 Athena 분석 테이블 생성을 자동화합니다. Step Functions는 Lambda 함수와 Athena 쿼리 실행을 조율하여 MAU, DAU, Retention 등의 지표를 계산합니다.

## 아키텍처

```
Step Function 실행
├── TransformServiceNames: 서비스 이름 배열을 변환
├── ProcessEachService: 각 서비스별로 순차 처리 (MaxConcurrency: 1)
│   ├── ComputeTablePrefix: 서비스 이름 → 테이블 접두사 변환
│   ├── Batch1_MAU_DAU: MAU, DAU 병렬 생성
│   ├── Batch2_Retention_Conversion: Retention, Conversion 병렬 생성
│   ├── Batch3_UserCohort_SessionMetrics: UserCohort, SessionMetrics 병렬 생성
│   └── Batch4_EventDistribution: EventDistribution 단독 생성
└── SummarizeResults: 실행 결과 요약
```

## 입력 페이로드

```json
{
  "service_names": ["theshop-brand", "theshop-pharmacy"]
}
```

### 필드 설명

- `service_names`: 처리할 서비스 이름 배열 (하이픈 사용)

## 실행 흐름

### 1. TransformServiceNames

서비스 이름 배열을 받아 공통 설정과 함께 다음 단계로 전달합니다.

**출력 파라미터:**

```json
{
  "services": ["theshop-brand", "theshop-pharmacy"],
  "database": "log_db",
  "output_location": "s3://aws-athena-query-results-725129837589-ap-northeast-2",
  "workgroup": "primary",
  "s3_base": "s3://aws-athena-query-results-725129837589-ap-northeast-2/summary",
  "execution_time": "2025-10-28T10:30:00Z"
}
```

### 2. ProcessEachService (Map State)

각 서비스를 **순차적으로** 처리합니다 (`MaxConcurrency: 1`).

**이유:** Athena는 계정당 동시 쿼리 실행 제한이 있습니다 (기본 25개). 여러 서비스를 동시에 처리하면 쿼리 실행 실패가 발생할 수 있습니다.

#### 2.1 ComputeTablePrefix

서비스 이름을 테이블 접두사로 변환합니다.

**변환 규칙:**

- 하이픈(`-`)을 언더스코어(`_`)로 변환
- 예: `theshop-brand` → `theshop_brand`

**변환 로직:**

```json
"table_prefix.$": "States.Format('{}_{}',
    States.ArrayGetItem(States.StringSplit($.service_name, '-'), 0),
    States.ArrayGetItem(States.StringSplit($.service_name, '-'), 1))"
```

#### 2.2 Batch 1: MAU + DAU (병렬)

월간 활성 사용자(MAU)와 일간 활성 사용자(DAU) 테이블을 병렬로 생성합니다.

**각 브랜치 실행 단계:**

1. **DropTable**: 기존 테이블 삭제 (`DROP TABLE IF EXISTS`)
2. **BuildQuery**: Lambda 함수 호출하여 CTAS 쿼리 생성
3. **CreateTable**: Athena에서 쿼리 실행

**Lambda 호출 예시:**

```json
{
  "FunctionName": "arn:aws:lambda:ap-northeast-2:725129837589:function:athena-query-builder",
  "Payload": {
    "query_type": "mau",
    "table_prefix": "theshop_brand",
    "s3_base": "s3://aws-athena-query-results-725129837589-ap-northeast-2/summary",
    "service_names": ["theshop-brand"]
  }
}
```

#### 2.3 Batch 2: Retention + Conversion (병렬)

사용자 리텐션과 전환율 테이블을 병렬로 생성합니다.

**생성 테이블:**

- `{table_prefix}_retention_summary`: D+1, D+7, D+30 리텐션
- `{table_prefix}_conversion_summary`: 세션 → 상품 조회 → 장바구니 전환율

#### 2.4 Batch 3: UserCohort + SessionMetrics (병렬)

사용자 코호트 분석과 세션 메트릭을 병렬로 생성합니다.

**생성 테이블:**

- `{table_prefix}_user_cohort_summary`: 신규/최근/활성/베테랑 사용자 분류
- `{table_prefix}_session_metrics_summary`: 세션당 이벤트 수, P90 등 통계

#### 2.5 Batch 4: EventDistribution (단독)

이벤트 분포를 분석하는 테이블을 생성합니다.

**생성 테이블:**

- `{table_prefix}_event_distribution_summary`: 이벤트 타입별 발생 빈도

### 3. SummarizeResults

모든 서비스 처리 완료 후 결과를 요약합니다.

**출력 예시:**

```json
{
  "status": "COMPLETED",
  "services": ["theshop-brand", "theshop-pharmacy"],
  "execution_summary": {
    "database": "log_db",
    "output_location": "s3://aws-athena-query-results-725129837589-ap-northeast-2/",
    "execution_time": "2025-10-28T10:30:00Z",
    "processed_services": 2
  }
}
```

## 실행 방법

### AWS CLI를 통한 실행

```bash
aws stepfunctions start-execution \
    --state-machine-arn "arn:aws:states:ap-northeast-2:725129837589:stateMachine:otel-analytics-pipeline" \
    --input file://step-payload.json
```

### AWS Console을 통한 실행

1. AWS Step Functions 콘솔 접속
2. State Machine 선택: `otel-analytics-pipeline`
3. "Start execution" 클릭
4. 입력 JSON 입력 후 실행

## 배치 전략

### 순차 배치 실행의 이유

각 배치는 순차적으로 실행되며, 배치 내에서만 병렬 처리합니다.

**순차 실행 이유:**

1. **Athena 쿼리 제한**: 계정당 25개 동시 쿼리 제한
2. **데이터 의존성**: 일부 쿼리는 이전 배치 결과에 의존할 수 있음
3. **비용 최적화**: S3 스캔 비용 관리

### 배치 구성

| 배치    | 쿼리 타입                  | 병렬도 | 예상 실행 시간 |
| ------- | -------------------------- | ------ | -------------- |
| Batch 1 | MAU, DAU                   | 2      | 2-3분          |
| Batch 2 | Retention, Conversion      | 2      | 3-5분          |
| Batch 3 | UserCohort, SessionMetrics | 2      | 2-4분          |
| Batch 4 | EventDistribution          | 1      | 1-2분          |

**총 예상 실행 시간:** 서비스당 8-14분

## 에러 처리

### 재시도 정책

Athena 쿼리 실행 실패 시 자동 재시도가 적용됩니다:

- **최대 재시도 횟수**: 3회
- **백오프**: Exponential backoff
- **재시도 가능 에러**: `States.Timeout`, `States.TaskFailed`

### 일반적인 에러

#### 1. Athena 쿼리 실패

**에러 메시지:** `Query exhausted resources at this scale factor`

**원인:** 쿼리가 너무 많은 데이터를 스캔

**해결 방법:**

- 파티션 필터 확인 (`year`, `month`, `day`)
- `MIN_DATA_DATE` 이후 데이터만 스캔하는지 확인

#### 2. 동시 실행 제한 초과

**에러 메시지:** `ConcurrentExecutionLimitExceeded`

**원인:** Map State의 MaxConcurrency 설정이 너무 높음

**해결 방법:**

- `MaxConcurrency`를 1로 유지
- 다른 Step Function 실행이 없는지 확인

#### 3. Lambda 타임아웃

**에러 메시지:** `Lambda function execution timed out`

**원인:** 쿼리 생성에 너무 오래 걸림

**해결 방법:**

- Lambda 타임아웃 설정 확인 (최소 30초)
- 쿼리 복잡도 검토

## 모니터링

### CloudWatch 지표

Step Functions 실행을 모니터링하기 위한 주요 지표:

- `ExecutionTime`: 전체 실행 시간
- `ExecutionsFailed`: 실패한 실행 수
- `ExecutionsSucceeded`: 성공한 실행 수
- `ExecutionsThrottled`: 제한된 실행 수

### 알람 설정 권장사항

```json
{
  "AlarmName": "step-functions-execution-failed",
  "MetricName": "ExecutionsFailed",
  "Threshold": 1,
  "ComparisonOperator": "GreaterThanOrEqualToThreshold",
  "EvaluationPeriods": 1,
  "Period": 300
}
```

## 비용 최적화

### Step Functions 비용

- **State Transition 비용**: $0.025 per 1,000 transitions
- **서비스당 예상 Transition 수**: 약 50-60개
- **2개 서비스 실행 비용**: ~$0.003

### Athena 비용

- **스캔된 데이터 기준**: $5 per TB
- **파티션 프루닝 필수**: 항상 날짜 파티션 필터 적용
- **CTAS 쿼리**: 결과를 Parquet으로 저장하여 후속 쿼리 비용 절감

### S3 비용

- **스토리지**: Parquet 파일로 압축 저장
- **클린업**: 기존 데이터 삭제 후 재생성하여 중복 방지

## 모범 사례

### 1. 실행 스케줄링

```yaml
# EventBridge Rule 예시
schedule_expression: "cron(0 2 * * ? *)" # 매일 오전 2시 (UTC)
description: "Daily analytics table refresh"
```

### 2. 멱등성 보장

- DROP TABLE 후 CREATE TABLE로 항상 새로 생성
- S3 클린업으로 기존 데이터 제거

### 3. 데이터 품질 검증

```sql
-- 생성된 테이블 검증 쿼리
SELECT
    COUNT(*) as record_count,
    MAX(execution_date) as last_execution
FROM theshop_brand_dau_summary;
```

## 트러블슈팅

### Step Function 실행 기록 확인

```bash
# 최근 실행 목록 조회
aws stepfunctions list-executions \
    --state-machine-arn "arn:aws:states:ap-northeast-2:725129837589:stateMachine:otel-analytics-pipeline" \
    --max-results 10

# 특정 실행 상세 조회
aws stepfunctions describe-execution \
    --execution-arn "arn:aws:states:ap-northeast-2:725129837589:execution:..."
```

### 실행 히스토리 분석

```bash
# 실행 히스토리 조회 (실패 원인 파악)
aws stepfunctions get-execution-history \
    --execution-arn "arn:aws:states:ap-northeast-2:725129837589:execution:..." \
    --reverse-order
```

## 참고 자료

- [AWS Step Functions Developer Guide](https://docs.aws.amazon.com/step-functions/)
- [Athena Query Builder Guide](./athena-query-builder-guide.md)
- [OTEL Log Processor Guide](./otel-processor-guide.md)
