# Athena Query Builder 상세 가이드

## 개요

`athena-query-builder.py`는 OTEL 로그 데이터로부터 비즈니스 메트릭을 계산하는.  
Athena CTAS (Create Table As Select) 쿼리를 동적으로 생성하는 AWS Lambda 함수입니다.

## 함수 목적

1. **동적 쿼리 생성**: 7가지 분석 유형에 대한 SQL 쿼리 자동 생성
2. **멀티 서비스 지원**: 여러 서비스의 데이터를 필터링하여 처리
3. **S3 클린업**: 새 데이터 생성 전 기존 Parquet 파일 삭제
4. **실행 날짜 추적**: 각 분석에 execution_date 기록

## Lambda 함수 구조

```python
athena-query-builder.py
├── lambda_handler()           # 메인 핸들러
├── cleanup_s3_location()      # S3 데이터 삭제
├── build_service_filter()     # 서비스 필터 SQL 생성
└── generate_query()           # 쿼리 타입별 SQL 생성
```

## 입력 파라미터

### 필수 파라미터

```json
{
  "query_type": "dau", // 쿼리 타입
  "table_prefix": "theshop_brand", // 테이블 접두사
  "s3_base": "s3://bucket/summary", // S3 기본 경로
  "service_names": ["theshop-brand"] // 필터링할 서비스 목록
}
```

### 선택 파라미터

```json
{
  "execution_date": "2025-10-28", // 실행 날짜 (기본값: 오늘)
  "cleanup_s3": true // S3 클린업 여부 (기본값: true)
}
```

### 파라미터 설명

| 파라미터         | 타입      | 필수 | 설명                                    |
| ---------------- | --------- | ---- | --------------------------------------- |
| `query_type`     | string    | ✅   | 생성할 쿼리 타입 (mau/dau/retention 등) |
| `table_prefix`   | string    | ✅   | 테이블 이름 접두사 (예: theshop_brand)  |
| `s3_base`        | string    | ✅   | Parquet 파일 저장 기본 경로             |
| `service_names`  | list[str] | ✅   | 분석 대상 서비스 이름 목록              |
| `execution_date` | string    | ❌   | 쿼리 실행 기준 날짜 (YYYY-MM-DD)        |
| `cleanup_s3`     | boolean   | ❌   | 기존 S3 데이터 삭제 여부                |

## 출력 형식

```json
{
  "query_string": "CREATE TABLE theshop_brand_dau_summary...",
  "execution_date": "2025-10-28",
  "query_type": "dau",
  "s3_location": "s3://bucket/summary/theshop_brand_dau/",
  "service_names": ["theshop-brand"],
  "cleanup_result": {
    "status": "success",
    "location": "s3://bucket/summary/theshop_brand_dau/",
    "deleted_objects": 145,
    "deleted_size_mb": 23.45
  }
}
```

## 지원하는 쿼리 타입

### 1. MAU (Monthly Active Users)

**쿼리 타입:** `mau`

**목적:** 월별 활성 사용자 수 집계

**생성 테이블:** `{table_prefix}_mau_summary`

**주요 메트릭:**

- `monthly_active_users`: 월간 순 사용자 수
- `total_sessions`: 총 세션 수
- `total_events`: 총 이벤트 수

**쿼리 로직:**

```sql
-- 현재 연도의 각 월별로 고유 사용자 집계
SELECT
    year || '-' || LPAD(month, 2, '0') as year_month,
    COUNT(DISTINCT attributes.userKey) as monthly_active_users,
    COUNT(DISTINCT attributes.sessionId) as total_sessions
FROM logall
WHERE year = CAST(YEAR(DATE '2025-10-28') AS VARCHAR)
    AND body = 'commerce.session.start'
    AND attributes.userKey IS NOT NULL
    AND attributes."resource.service.name" IN ('theshop-brand')
GROUP BY year, month
```

**사용 예시:**

```json
{
  "query_type": "mau",
  "table_prefix": "theshop_brand",
  "s3_base": "s3://bucket/summary",
  "service_names": ["theshop-brand"]
}
```

**결과 예시:**
| year_month | monthly_active_users | total_sessions | execution_date |
| ---------- | -------------------- | -------------- | -------------- |
| 2025-10 | 15234 | 45123 | 2025-10-28 |
| 2025-09 | 14892 | 43211 | 2025-10-28 |

---

### 2. DAU (Daily Active Users)

**쿼리 타입:** `dau`

**목적:** 일별 활성 사용자 수 및 참여도 지표

**생성 테이블:** `{table_prefix}_dau_summary`

**주요 메트릭:**

- `daily_active_users`: 일별 순 사용자 수
- `daily_sessions`: 일별 세션 수
- `daily_events`: 일별 이벤트 수
- `events_per_user`: 사용자당 평균 이벤트 수

**쿼리 로직:**

```sql
-- 최근 90일간의 일별 사용자 활동 집계
SELECT
    CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as date,
    COUNT(DISTINCT attributes.userKey) as daily_active_users,
    COUNT(DISTINCT attributes.sessionId) as daily_sessions,
    COUNT(*) as daily_events,
    ROUND(COUNT(*) * 1.0 / NULLIF(COUNT(DISTINCT attributes.userKey), 0), 2) as events_per_user
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= GREATEST(DATE '2025-10-28' - INTERVAL '90' DAY, DATE '2025-09-20')
    AND body = 'commerce.session.start'
    AND attributes."resource.service.name" IN ('theshop-brand')
GROUP BY year, month, day
```

**특징:**

- 최근 90일 데이터만 조회 (성능 최적화)
- `MIN_DATA_DATE` (2025-09-20) 이후 데이터만 사용
- `NULLIF`로 0으로 나누기 방지

**결과 예시:**
| date | daily_active_users | daily_sessions | events_per_user |
| ---------- | ------------------ | -------------- | --------------- |
| 2025-10-27 | 523 | 1234 | 8.5 |
| 2025-10-26 | 498 | 1156 | 7.9 |

---

### 3. Retention (사용자 리텐션)

**쿼리 타입:** `retention`

**목적:** D+1, D+7, D+30 리텐션율 계산

**생성 테이블:** `{table_prefix}_retention_summary`

**주요 메트릭:**

- `base_users`: 기준일 방문 사용자 수
- `retained_users`: 재방문 사용자 수
- `retention_rate`: 리텐션율 (%)

**쿼리 로직:**

```sql
-- 1단계: 최근 45일간 일별 방문 사용자 집계
WITH daily_users AS (
    SELECT
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as visit_date,
        attributes.userKey as user_key
    FROM logall
    WHERE visit_date >= DATE '2025-10-28' - INTERVAL '45' DAY
        AND visit_date < DATE '2025-10-28'
        AND body = 'commerce.session.start'
        AND attributes."resource.service.name" IN ('theshop-brand')
    GROUP BY year, month, day, attributes.userKey
),
-- 2단계: D+1 리텐션 계산
d1_retention AS (
    SELECT
        DATE '2025-10-28' - INTERVAL '2' DAY as calculation_date,
        'D+1' as retention_type,
        COUNT(DISTINCT base.user_key) as base_users,
        COUNT(DISTINCT CASE WHEN ret.user_key IS NOT NULL THEN base.user_key END) as retained_users
    FROM (
        SELECT DISTINCT user_key FROM daily_users
        WHERE visit_date = DATE '2025-10-28' - INTERVAL '2' DAY
    ) base
    LEFT JOIN (
        SELECT DISTINCT user_key FROM daily_users
        WHERE visit_date = DATE '2025-10-28' - INTERVAL '1' DAY
    ) ret ON base.user_key = ret.user_key
)
-- 3단계: 리텐션율 계산
SELECT
    retention_type,
    base_users,
    retained_users,
    ROUND(CAST(retained_users AS DOUBLE) * 100.0 / NULLIF(base_users, 0), 2) as retention_rate
FROM d1_retention
WHERE base_users > 0
```

**계산 방식:**

- **D+1**: 2일 전 방문자 중 어제 재방문한 비율
- **D+7**: 8일 전 방문자 중 어제 재방문한 비율
- **D+30**: 31일 전 방문자 중 어제 재방문한 비율

**결과 예시:**
| retention_type | base_users | retained_users | retention_rate | calculation_date |
| -------------- | ---------- | -------------- | -------------- | ---------------- |
| D+1 | 1234 | 456 | 36.95 | 2025-10-26 |
| D+7 | 2341 | 623 | 26.61 | 2025-10-20 |
| D+30 | 4523 | 892 | 19.72 | 2025-09-27 |

---

### 4. Conversion (전환율)

**쿼리 타입:** `conversion`

**목적:** 세션 → 상품 조회 → 장바구니 전환 퍼널 분석

**생성 테이블:** `{table_prefix}_conversion_summary`

**주요 메트릭:**

- `product_view_rate`: 세션 대비 상품 조회율
- `cart_conversion_rate`: 상품 조회 대비 장바구니 전환율
- `overall_conversion_rate`: 전체 전환율 (세션 → 장바구니)
- `user_conversion_rate`: 사용자 기준 전환율

**쿼리 로직:**

```sql
-- 1단계: 일별 이벤트 데이터 추출
WITH daily_data AS (
    SELECT
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as calculation_date,
        attributes.sessionId,
        attributes.userKey,
        body  -- 이벤트 타입
    FROM logall
    WHERE calculation_date >= DATE '2025-10-28' - INTERVAL '90' DAY
        AND body IN ('commerce.session.start', 'commerce.cart.add', 'commerce.product.view')
        AND attributes."resource.service.name" IN ('theshop-brand')
    GROUP BY year, month, day, attributes.sessionId, attributes.userKey, body
),
-- 2단계: 일별 메트릭 집계
daily_metrics AS (
    SELECT
        calculation_date,
        COUNT(DISTINCT CASE WHEN body = 'commerce.session.start' THEN sessionId END) as total_sessions,
        COUNT(DISTINCT CASE WHEN body = 'commerce.product.view' THEN sessionId END) as product_view_sessions,
        COUNT(DISTINCT CASE WHEN body = 'commerce.cart.add' THEN sessionId END) as cart_add_sessions
    FROM daily_data
    GROUP BY calculation_date
)
-- 3단계: 전환율 계산
SELECT
    calculation_date,
    ROUND(CAST(product_view_sessions AS DOUBLE) * 100.0 / NULLIF(total_sessions, 0), 2) as product_view_rate,
    ROUND(CAST(cart_add_sessions AS DOUBLE) * 100.0 / NULLIF(product_view_sessions, 0), 2) as cart_conversion_rate,
    ROUND(CAST(cart_add_sessions AS DOUBLE) * 100.0 / NULLIF(total_sessions, 0), 2) as overall_conversion_rate
FROM daily_metrics
```

**전환 퍼널:**

```
세션 시작 (100%)
    ↓
상품 조회 (product_view_rate)
    ↓
장바구니 추가 (cart_conversion_rate)
```

**결과 예시:**
| calculation_date | total_sessions | product_view_rate | cart_conversion_rate | overall_conversion_rate |
| ---------------- | -------------- | ----------------- | -------------------- | ----------------------- |
| 2025-10-27 | 1234 | 75.5 | 12.3 | 9.3 |
| 2025-10-26 | 1156 | 73.2 | 11.8 | 8.6 |

---

### 5. User Cohort (사용자 코호트)

**쿼리 타입:** `user_cohort`

**목적:** 첫 방문 시점 기준 사용자 분류

**생성 테이블:** `{table_prefix}_user_cohort_summary`

**사용자 분류:**

- **New (0-7d)**: 최근 7일 이내 첫 방문
- **Recent (8-30d)**: 8-30일 전 첫 방문
- **Active (31-90d)**: 31-90일 전 첫 방문
- **Veteran (90d+)**: 90일 이전 첫 방문

**쿼리 로직:**

```sql
-- 1단계: 사용자별 첫 방문일 계산
WITH first_visit AS (
    SELECT
        attributes.userKey as user_key,
        MIN(CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)) as first_visit_date
    FROM logall
    WHERE visit_date >= DATE '2025-10-28' - INTERVAL '365' DAY
        AND body = 'commerce.session.start'
        AND attributes."resource.service.name" IN ('theshop-brand')
    GROUP BY attributes.userKey
),
-- 2단계: 코호트 분류
cohort_classification AS (
    SELECT
        user_key,
        CASE
            WHEN first_visit_date >= DATE '2025-10-28' - INTERVAL '7' DAY THEN 'New (0-7d)'
            WHEN first_visit_date >= DATE '2025-10-28' - INTERVAL '30' DAY THEN 'Recent (8-30d)'
            WHEN first_visit_date >= DATE '2025-10-28' - INTERVAL '90' DAY THEN 'Active (31-90d)'
            ELSE 'Veteran (90d+)'
        END as cohort_type
    FROM first_visit
)
-- 3단계: 코호트별 집계
SELECT
    cohort_type,
    COUNT(DISTINCT user_key) as user_count
FROM cohort_classification
GROUP BY cohort_type
```

**결과 예시:**
| cohort_type | user_count | calculation_date |
| --------------- | ---------- | ---------------- |
| New (0-7d) | 234 | 2025-10-28 |
| Recent (8-30d) | 567 | 2025-10-28 |
| Active (31-90d) | 892 | 2025-10-28 |
| Veteran (90d+) | 3421 | 2025-10-28 |

---

### 6. Session Metrics (세션 메트릭)

**쿼리 타입:** `session_metrics`

**목적:** 세션 품질 및 참여도 통계

**생성 테이블:** `{table_prefix}_session_metrics_summary`

**주요 메트릭:**

- `avg_events_per_session`: 세션당 평균 이벤트 수
- `avg_event_types_per_session`: 세션당 평균 이벤트 타입 수
- `median_events_per_session`: 중앙값
- `p90_events_per_session`: 90th percentile

**쿼리 로직:**

```sql
-- 1단계: 세션별 이벤트 집계
WITH daily_sessions AS (
    SELECT
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as calculation_date,
        attributes.sessionId,
        COUNT(*) as events_per_session,
        COUNT(DISTINCT body) as unique_event_types
    FROM logall
    WHERE calculation_date >= DATE '2025-10-28' - INTERVAL '90' DAY
        AND attributes.sessionId IS NOT NULL
        AND attributes."resource.service.name" IN ('theshop-brand')
    GROUP BY year, month, day, attributes.sessionId
),
-- 2단계: 일별 통계 계산
daily_metrics AS (
    SELECT
        calculation_date,
        COUNT(*) as total_sessions,
        ROUND(AVG(events_per_session), 2) as avg_events_per_session,
        APPROX_PERCENTILE(events_per_session, 0.5) as median_events_per_session,
        APPROX_PERCENTILE(events_per_session, 0.9) as p90_events_per_session
    FROM daily_sessions
    GROUP BY calculation_date
)
SELECT * FROM daily_metrics
```

**통계 지표 설명:**

- **평균 (AVG)**: 전체 세션의 평균값
- **중앙값 (P50)**: 상위 50% 기준값
- **P90**: 상위 10% 파워 유저 기준값

**결과 예시:**
| calculation_date | total_sessions | avg_events | median_events | p90_events |
| ---------------- | -------------- | ---------- | ------------- | ---------- |
| 2025-10-27 | 1234 | 8.5 | 6.0 | 18.0 |
| 2025-10-26 | 1156 | 7.9 | 5.0 | 16.0 |

---

### 7. Event Distribution (이벤트 분포)

**쿼리 타입:** `event_distribution`

**목적:** 이벤트 타입별 발생 빈도 분석

**생성 테이블:** `{table_prefix}_event_distribution_summary`

**주요 메트릭:**

- `event_count`: 이벤트 발생 횟수
- `unique_users`: 이벤트를 발생시킨 고유 사용자 수
- `unique_sessions`: 이벤트가 발생한 고유 세션 수
- `percentage_of_total`: 전체 이벤트 대비 비율

**쿼리 로직:**

```sql
-- 1단계: 이벤트 타입별 집계
WITH event_counts AS (
    SELECT
        body as event_type,
        COUNT(*) as event_count,
        COUNT(DISTINCT attributes.userKey) as unique_users,
        COUNT(DISTINCT attributes.sessionId) as unique_sessions
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= DATE '2025-10-28' - INTERVAL '7' DAY
        AND body IS NOT NULL
        AND attributes."resource.service.name" IN ('theshop-brand')
    GROUP BY body
),
-- 2단계: 전체 이벤트 수 계산
service_totals AS (
    SELECT
        SUM(event_count) as total_events
    FROM event_counts
)
-- 3단계: 비율 계산
SELECT
    ec.event_type,
    ec.event_count,
    ec.unique_users,
    ec.unique_sessions,
    ROUND(CAST(ec.event_count AS DOUBLE) * 100.0 / st.total_events, 2) as percentage_of_total
FROM event_counts ec
CROSS JOIN service_totals st
ORDER BY ec.event_count DESC
```

**결과 예시:**
| event_type | event_count | unique_users | unique_sessions | percentage_of_total |
| ---------------------- | ----------- | ------------ | --------------- | ------------------- |
| commerce.session.start | 45123 | 15234 | 45123 | 45.2 |
| commerce.product.view | 34567 | 12345 | 23456 | 34.6 |
| commerce.cart.add | 12345 | 5678 | 9876 | 12.3 |
| commerce.checkout | 8901 | 4567 | 7890 | 8.9 |

---

## 멀티 서비스 필터링

### build_service_filter() 함수

여러 서비스를 동시에 분석할 때 SQL WHERE 절을 생성합니다.

**입력:**

```python
service_names = ["theshop-brand", "theshop-pharmacy"]
```

**출력:**

```sql
AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy')
```

**구현:**

```python
def build_service_filter(service_names: list[str]) -> str:
    if not service_names:
        return ""

    quoted_services = [f"'{svc}'" for svc in service_names]
    return f"AND attributes.\"resource.service.name\" IN ({', '.join(quoted_services)})"
```

## S3 클린업 프로세스

### cleanup_s3_location() 함수

기존 Parquet 파일을 삭제하여 데이터 중복을 방지합니다.

**프로세스:**

1. S3 URI 파싱 (버킷, 접두사 추출)
2. 객체 목록 조회 (페이지네이션)
3. 1000개씩 배치 삭제 (S3 API 제한)
4. 삭제 결과 반환

**구현:**

```python
def cleanup_s3_location(s3_location: str) -> dict[str, Any]:
    parsed = urlparse(s3_location)
    bucket = parsed.netloc
    prefix = parsed.path.lstrip("/")

    paginator = s3_client.get_paginator("list_objects_v2")
    pages = paginator.paginate(Bucket=bucket, Prefix=prefix)

    objects_to_delete = []
    for page in pages:
        for obj in page["Contents"]:
            objects_to_delete.append({"Key": obj["Key"]})

            if len(objects_to_delete) >= S3_DELETE_BATCH_SIZE:
                s3_client.delete_objects(
                    Bucket=bucket,
                    Delete={"Objects": objects_to_delete}
                )
                objects_to_delete = []
```

**삭제 결과 예시:**

```json
{
  "status": "success",
  "location": "s3://bucket/summary/theshop_brand_dau/",
  "deleted_objects": 145,
  "deleted_size_mb": 23.45
}
```

## 데이터 품질 필터

### MIN_DATA_DATE 상수

```python
MIN_DATA_DATE = "2025-09-20"
```

**목적:** 이 날짜 이전의 손상된 데이터를 쿼리에서 제외

**적용 방법:**

```sql
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= GREATEST(DATE '2025-10-28' - INTERVAL '90' DAY, DATE '2025-09-20')
```

**설명:**

- `GREATEST()` 함수로 두 날짜 중 최신 날짜 선택
- 90일 전보다 `MIN_DATA_DATE`가 더 최신이면 후자 사용

## 에러 처리

### 일반적인 에러

#### 1. 필수 파라미터 누락

```python
if not all([query_type, table_prefix, s3_base]):
    raise ValueError("Missing required parameters: query_type, table_prefix, s3_base")
```

#### 2. 잘못된 쿼리 타입

```python
if query_type not in table_suffix_map:
    raise ValueError(f"Invalid query_type: {query_type}")
```

#### 3. S3 클린업 실패

```python
try:
    cleanup_result = cleanup_s3_location(s3_location)
except Exception as e:
    cleanup_result = {"status": "failed", "error": str(e)}
    # 클린업 실패해도 쿼리는 계속 진행
```

## 성능 최적화

### 1. 파티션 프루닝

모든 쿼리에서 날짜 파티션 필터 적용:

```sql
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-28' - INTERVAL '90' DAY
```

### 2. NULL 체크

0으로 나누기 방지:

```sql
ROUND(COUNT(*) * 1.0 / NULLIF(COUNT(DISTINCT attributes.userKey), 0), 2)
```

### 3. GROUP BY 최적화

파티션 컬럼 사용:

```sql
GROUP BY year, month, day, attributes.userKey
```

### 4. Parquet 압축

CTAS 쿼리 결과를 Parquet으로 저장:

```sql
CREATE TABLE theshop_brand_dau_summary
WITH (format = 'PARQUET', external_location = 's3://...')
AS SELECT ...
```

## 테스트 방법

### 로컬 테스트

```python
# test_query_builder.py
import json
from athena_query_builder import lambda_handler

event = {
    "query_type": "dau",
    "table_prefix": "test",
    "s3_base": "s3://test-bucket/summary",
    "service_names": ["theshop-brand"],
    "cleanup_s3": False  # 테스트 시 클린업 비활성화
}

result = lambda_handler(event, None)
print(json.dumps(result, indent=2))
```

### AWS CLI 테스트

```bash
aws lambda invoke \
    --function-name athena-query-builder \
    --payload '{"query_type":"dau","table_prefix":"test","s3_base":"s3://bucket/path","service_names":["theshop-brand"]}' \
    response.json

cat response.json | jq .
```

## 모범 사례

### 1. execution_date 활용

모든 쿼리에 execution_date 포함하여 실행 추적:

```sql
DATE '2025-10-28' as execution_date
```

### 2. 서비스 필터링

멀티 서비스 환경에서 항상 service_name 필터 적용:

```sql
AND attributes."resource.service.name" IN ('theshop-brand')
```

### 3. 데이터 범위 제한

성능을 위해 쿼리 범위 제한:

- DAU: 최근 90일
- Retention: 최근 45일
- Conversion: 최근 90일

### 4. 멱등성 보장

S3 클린업으로 재실행 시 동일한 결과 보장

## 참고 자료

- [Step Functions Guide](./step-functions-guide.md)
- [OTEL Log Structure](./otel-log-structure.md)
- [Grafana Dashboard Guide](./grafana-dashboard-guide.md)
