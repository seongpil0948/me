# Data Platform 문서

## 문서 목록

### 📚 핵심 가이드

1. **[Step Functions 오케스트레이션 가이드](./docs/step-functions-guide.md)**
   - Step Functions 실행 흐름 및 배치 전략
   - 입력/출력 형식 및 에러 처리
   - 모니터링 및 비용 최적화

2. **[Athena Query Builder 상세 가이드](./docs/athena-query-builder-guide.md)**
   - Lambda 함수 구조 및 파라미터
   - 7가지 쿼리 타입 상세 설명 (MAU, DAU, Retention 등)
   - 멀티 서비스 필터링 및 S3 클린업

3. **[커머스 파이프라인 가이드](./docs/commerce-pipeline-guide.md)**
   - 커머스 이벤트 분석 쿼리 (장바구니, 검색, 구매 등)
   - Multi-Period 지원 (1M, 3M)
   - S3 쓰로틀링 방지 전략

4. **[비기술자를 위한 지표 가이드](./docs/metrics-guide-for-non-technical.md)**
   - MAU, DAU, Retention 등 핵심 지표 이해
   - 기획자/마케터를 위한 실무 활용법

### 🚀 빠른 시작

#### Step Functions 실행

```bash
aws stepfunctions start-execution \
    --state-machine-arn "arn:aws:states:ap-northeast-2:725129837589:stateMachine:otel-analytics-pipeline" \
    --input file://step-payload.json
```

#### Lambda 함수 테스트

```python
from athena_query_builder import lambda_handler

event = {
    "query_type": "dau",
    "table_prefix": "theshop_brand",
    "s3_base": "s3://bucket/summary",
    "service_names": ["theshop-brand"]
}

result = lambda_handler(event, None)
```

### 📊 지원하는 분석 타입

#### User Behavior Analytics (otel-analytics-multi-service)

| 쿼리 타입            | 설명                | 데이터 범위 | 실행 시간 |
| -------------------- | ------------------- | ----------- | --------- |
| `mau`                | 월간 활성 사용자    | 현재 연도   | 2-3분     |
| `dau`                | 일간 활성 사용자    | 최근 90일   | 2-3분     |
| `retention`          | D+1/D+7/D+30 리텐션 | 최근 45일   | 3-5분     |
| `conversion`         | 전환율 퍼널 분석    | 최근 90일   | 3-5분     |
| `user_cohort`        | 사용자 코호트 분류  | 최근 365일  | 2-4분     |
| `session_metrics`    | 세션 품질 통계      | 최근 90일   | 2-4분     |
| `event_distribution` | 이벤트 분포         | 최근 7일    | 1-2분     |

#### Commerce Analytics (commerce) ⭐ NEW

| 쿼리 타입               | 설명                      | Period 지원 | 실행 시간 |
| ----------------------- | ------------------------- | ----------- | --------- |
| `button_interaction`    | 버튼 클릭 분석            | 1M, 3M      | 2-3분     |
| `product_ranking`       | 상품 랭킹 (장바구니 소스) | 1M, 3M      | 3-4분     |
| `search_analytics`      | 검색어 분석               | 1M, 3M      | 2-3분     |
| `category_performance`  | 카테고리별 성과           | 1M, 3M      | 2-3분     |
| `hourly_traffic`        | 시간대별 트래픽           | 1M, 3M      | 2-3분     |
| `purchase_analytics`    | 구매 분석                 | 1M, 3M      | 2-3분     |
| `navigation_flow`       | 페이지 이동 경로          | 1M, 3M      | 3-4분     |
| `cart_source_analytics` | 장바구니 소스별 분석      | 1M, 3M      | 2-3분     |

### 🔍 주요 개념

#### OTEL 로그 구조

```python
# 리소스 레벨 속성 (resource. 접두사)
attributes["resource.service.name"]  # 서비스 식별자
attributes["resource.service.namespace"]

# 로그 레벨 속성 (접두사 없음)
attributes["userKey"]      # 사용자 ID
attributes["sessionId"]    # 세션 ID
attributes["productName"]  # 상품명
attributes["source"]       # 장바구니 소스 (favorites/routine/missed)
```

#### 데이터 품질 필터

- **User Behavior Pipeline**: MIN_DATA_DATE = `2025-09-20` (이전 데이터는 손상됨)
- **Commerce Pipeline**: MIN_DATA_DATE = `2025-10-01`
- 모든 쿼리에서 자동으로 필터링됨

#### Multi-Period 지원 (Commerce Only)

- **1M (1개월)**: 최근 1개월 데이터 분석
- **3M (3개월)**: 최근 3개월 데이터 분석
- **Month-Only Filtering**: Day 파티션 제외, Month 파티션만 사용하여 성능 최적화
- **Table Naming**: `{service}_commerce_{query_type}_{period}_summary`
  - 예: `theshop_brand_commerce_product_ranking_1m_summary`

#### 멀티 서비스 지원

- 서비스 이름: `theshop-brand`, `theshop-pharmacy`
- 테이블 접두사: `theshop_brand`, `theshop_pharmacy`
- 각 서비스별로 독립적인 분석 테이블 생성

### 🛠 개발 워크플로우

#### 1. 새로운 쿼리 타입 추가

1. `athena-query-builder.py`의 `table_suffix_map`에 쿼리 타입 추가
2. `generate_query()` 함수에 SQL 템플릿 구현
3. `step-function-state.json`에 새 배치 단계 추가
4. Grafana 대시보드에 패널 추가

#### 2. 쿼리 디버깅

```bash
# Athena 쿼리 실행 히스토리 확인
aws athena list-query-executions --max-results 10

# 특정 쿼리 상세 정보
aws athena get-query-execution --query-execution-id <id>
```

#### 3. Step Functions 모니터링

```bash
# 실행 목록 조회
aws stepfunctions list-executions \
    --state-machine-arn "arn:aws:states:ap-northeast-2:725129837589:stateMachine:otel-analytics-pipeline"

# 실행 히스토리 조회
aws stepfunctions get-execution-history \
    --execution-arn "arn:aws:states:ap-northeast-2:725129837589:execution:..."
```

### ⚠️ 주의사항

#### Athena 쿼리 제한

- 계정당 동시 쿼리 실행: 25개
- Step Functions MaxConcurrency: 1로 설정 필수

#### S3 쓰로틀링 방지 🚨 CRITICAL

- **Commerce Pipeline**: 각 배치당 최대 **2개 쿼리만 병렬 실행**
- 8개 배치로 순차 실행 (Batch1a → 1b → 2a → 2b → 3a → 3b → 4 → 5)
- 4개 병렬 실행 시 S3 API rate limit 초과로 에러 발생
- 배치 구조:
  ```
  Batch1a: Button Interaction (1M + 3M) = 2 parallel
  Batch1b: Hourly Traffic (1M + 3M) = 2 parallel
  Batch2a: Product Ranking (1M + 3M) = 2 parallel
  ...
  ```

#### 파티션 필터링

**User Behavior (Day-level)**:

```sql
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-28' - INTERVAL '90' DAY
```

**Commerce (Month-level)** ⚡ Optimized:

```sql
WHERE (year = '2025' AND month = '10')
   OR (year = '2025' AND month = '09')
   OR (year = '2025' AND month = '08')
```

#### NULL 안전성

0으로 나누기 방지:

```sql
ROUND(value * 100.0 / NULLIF(total, 0), 2)
```

### 📈 성능 최적화

1. **파티션 프루닝**: 날짜 파티션 필터 필수
2. **Parquet 형식**: CTAS 결과를 Parquet으로 저장
3. **배치 삭제**: S3 객체 1000개씩 배치 삭제
4. **데이터 범위 제한**: 불필요한 과거 데이터 스캔 방지

### 💰 비용 관리

#### Athena 비용

- 스캔된 데이터 기준: $5 per TB
- 파티션 프루닝으로 비용 절감
- Parquet 압축으로 스토리지 비용 절감

#### Step Functions 비용

- State Transition: $0.025 per 1,000 transitions
- 서비스당 약 50-60 transitions
- 일일 실행 비용: ~$0.01

### 🔗 관련 리소스

- [AWS Step Functions Developer Guide](https://docs.aws.amazon.com/step-functions/)
- [AWS Athena User Guide](https://docs.aws.amazon.com/athena/)
- [OpenTelemetry Specification](https://opentelemetry.io/docs/specs/otel/)

### 📞 문의

문서 개선 제안이나 질문이 있으면 이슈를 생성해 주세요.
