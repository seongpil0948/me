# Commerce Analytics Pipeline Guide

**Version**: 1.0  
**Last Updated**: 2025-10-28  
**Purpose**: E-commerce event analytics using Athena CTAS queries

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Separation Rationale](#separation-rationale)
3. [Query Type Specifications](#query-type-specifications)
4. [Batch Strategy](#batch-strategy)
5. [Deployment Procedures](#deployment-procedures)
6. [Grafana Integration](#grafana-integration)
7. [Pipeline Comparison](#pipeline-comparison)
8. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                  Commerce Analytics Pipeline                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌──────────────────────────────────────┐
        │  EventBridge Schedule (Daily 04:00)  │
        └──────────────────────────────────────┘
                              │
                              ▼
        ┌──────────────────────────────────────┐
        │   Step Functions State Machine       │
        │   (commerce-analytics-pipeline)      │
        └──────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
         ┌──────────┐  ┌──────────┐  ┌──────────┐
         │ Batch 1  │  │ Batch 2  │  │ Batch 3  │
         │ 2 queries│  │ 2 queries│  │ 3 queries│
         └──────────┘  └──────────┘  └──────────┘
                              │
                              ▼
        ┌──────────────────────────────────────┐
        │    Lambda: commerce-query-builder    │
        │    Generates Athena CTAS Queries     │
        └──────────────────────────────────────┘
                              │
                              ▼
        ┌──────────────────────────────────────┐
        │         Amazon Athena                │
        │    Executes CTAS (creates tables)    │
        └──────────────────────────────────────┘
                              │
                              ▼
        ┌──────────────────────────────────────┐
        │    S3: commerce-summary/             │
        │    PARQUET tables per service        │
        └──────────────────────────────────────┘
                              │
                              ▼
        ┌──────────────────────────────────────┐
        │            Grafana                   │
        │  Commerce Analytics Dashboard        │
        └──────────────────────────────────────┘
```

### Data Flow

1. **EventBridge** triggers Step Function daily at 04:00 (2 hours after user behavior pipeline)
2. **Step Function** iterates over each service (`theshop-brand`, `theshop-pharmacy`)
3. **Lambda** generates SQL for 7 commerce query types
4. **Athena** executes queries and creates PARQUET tables
5. **Grafana** visualizes summary data from tables

---

## Separation Rationale

### Why Separate from User Behavior Pipeline?

#### **1. Different Event Types and Metrics**

- **User Behavior**: Session-based (MAU, DAU, retention, conversion)
- **Commerce**: Transaction-based (products, purchases, search, navigation)

#### **2. Different Time Windows**

- **User Behavior**: 30-90 day windows for cohort analysis
- **Commerce**: 7-day for buttons/search, 30-day for products, 90-day for purchases

#### **3. Independent Scaling and Deployment**

- Commerce features can be deployed/tested without affecting core user metrics
- Failures in commerce pipeline don't impact critical user behavior reports

#### **4. Clear Separation of Concerns**

- User Behavior: Product team (growth, engagement)
- Commerce: Business team (sales, merchandising, operations)

#### **5. Resource Optimization**

- Spread Athena query load across time (02:00 vs 04:00)
- Avoid hitting 25 concurrent query limit
- Separate S3 prefixes prevent cleanup conflicts

---

## Query Type Specifications

### 1. Button Interaction (`button_interaction`)

**Purpose**: Track feature usage through button clicks  
**Time Window**: 7 days (high volume events)  
**TOP N Limit**: 50 actions  
**Key Metrics**:

- Total clicks per action
- Unique users per action
- Average clicks per user

**Use Cases**:

- Feature adoption tracking (e.g., smart order button)
- UI/UX engagement analysis
- A/B test validation

**Table**: `{service}_commerce_button_interaction_summary`

---

### 2. Product Ranking (`product_ranking`)

**Purpose**: Identify top-performing products by cart additions  
**Time Window**: 30 days  
**TOP N Limit**: 100 products  
**Key Metrics**:

- Cart add count
- Unique users adding product
- Total cart value (quantity × price)
- Average sale price

**Use Cases**:

- Merchandising decisions
- Inventory planning
- Seller performance tracking

**Table**: `{service}_commerce_product_ranking_summary`

---

### 3. Search Analytics (`search_analytics`)

**Purpose**: Measure search effectiveness and popular queries  
**Time Window**: 7 days  
**TOP N Limit**: 200 search terms  
**Key Metrics**:

- Search frequency
- Click-through rate (search → result click)
- Zero-result searches

**Use Cases**:

- Search optimization
- Catalog gap analysis
- SEO strategy

**Table**: `{service}_commerce_search_analytics_summary`

---

### 4. Category Performance (`category_performance`)

**Purpose**: Business insights by product category  
**Time Window**: 30 days  
**TOP N Limit**: 30 categories  
**Key Metrics**:

- Cart adds per category
- Unique products per category
- Average price per category
- Total category value

**Use Cases**:

- Category-level strategy
- Pricing optimization
- Assortment planning

**Table**: `{service}_commerce_category_performance_summary`

---

### 5. Hourly Traffic (`hourly_traffic`)

**Purpose**: Identify traffic patterns by hour of day  
**Time Window**: 7 days aggregated  
**Rows**: 24 (one per hour 00-23)  
**Key Metrics**:

- Sessions per hour
- Cart conversion rate per hour
- Unique users per hour

**Use Cases**:

- Peak hours identification
- Resource allocation
- Promotional timing optimization

**Table**: `{service}_commerce_hourly_traffic_summary`

---

### 6. Purchase Analytics (`purchase_analytics`)

**Purpose**: Revenue and transaction analysis  
**Time Window**: 90 days (low frequency events)  
**Key Metrics**:

- Daily purchase count
- Total revenue
- Average order value
- Payment method distribution

**Use Cases**:

- Revenue forecasting
- Payment method optimization
- Transaction monitoring

**Table**: `{service}_commerce_purchase_analytics_summary`

---

### 7. Navigation Flow (`navigation_flow`)

**Purpose**: User journey and page transition analysis  
**Time Window**: 7 days  
**TOP N Limit**: 100 transitions  
**Key Metrics**:

- Transition count (fromPath → toPath)
- Unique users per transition
- Average transitions per session

**Use Cases**:

- UX flow optimization
- Drop-off point identification
- Navigation pattern discovery

**Table**: `{service}_commerce_navigation_flow_summary`

---

## Batch Strategy

### Batch Configuration

| Batch       | Query Types                            | Concurrency | Estimated Time | Athena Queries |
| ----------- | -------------------------------------- | ----------- | -------------- | -------------- |
| **Batch 1** | Button Interaction + Hourly Traffic    | 2 parallel  | 3-5 min        | 2 per service  |
| **Batch 2** | Product Ranking + Category Performance | 2 parallel  | 4-6 min        | 2 per service  |
| **Batch 3** | Search + Purchase + Navigation         | 3 parallel  | 5-7 min        | 3 per service  |

**Total Execution Time**: ~12-18 minutes per service

### Sequential Processing

- **MaxConcurrency = 1** per service to avoid exceeding Athena's 25 concurrent query limit
- For 2 services: Total time = 24-36 minutes
- Each batch waits for previous batch completion before starting

### Athena Query Limits

- **AWS Limit**: 25 concurrent queries per account
- **Our Usage**:
  - User Behavior Pipeline: up to 8 queries (runs at 02:00)
  - Commerce Pipeline: up to 7 queries (runs at 04:00)
  - Total: 15 concurrent max (safe margin)

---

## Deployment Procedures

### Prerequisites

1. AWS CLI configured with appropriate credentials
2. S3 bucket: `aws-athena-query-results-725129837589-ap-northeast-2`
3. Athena database: `log_db`
4. Athena workgroup: `primary`

### Step 1: Deploy Lambda Function

```bash
# Package Lambda code
cd /Users/2309-n0015/Code/Project/Util/data-platform
zip commerce-query-builder.zip commerce-query-builder.py

# Create Lambda function
aws lambda create-function \
    --function-name commerce-query-builder \
    --runtime python3.11 \
    --role arn:aws:iam::725129837589:role/lambda-athena-execution-role \
    --handler commerce-query-builder.lambda_handler \
    --zip-file fileb://commerce-query-builder.zip \
    --timeout 300 \
    --memory-size 512 \
    --region ap-northeast-2

# Or update existing function
aws lambda update-function-code \
    --function-name commerce-query-builder \
    --zip-file fileb://commerce-query-builder.zip \
    --region ap-northeast-2
```

### Step 2: Create Step Function State Machine

```bash
# Create state machine
aws stepfunctions create-state-machine \
    --name commerce-analytics-pipeline \
    --definition file://commerce-step-function-state.json \
    --role-arn arn:aws:iam::725129837589:role/step-functions-athena-execution-role \
    --region ap-northeast-2

# Or update existing state machine
aws stepfunctions update-state-machine \
    --state-machine-arn arn:aws:states:ap-northeast-2:725129837589:stateMachine:commerce-analytics-pipeline \
    --definition file://commerce-step-function-state.json \
    --region ap-northeast-2
```

### Step 3: Test Pipeline Manually

```bash
# Start execution with test payload
aws stepfunctions start-execution \
    --state-machine-arn arn:aws:states:ap-northeast-2:725129837589:stateMachine:commerce-analytics-pipeline \
    --input file://commerce-step-payload.json \
    --name "test-execution-$(date +%Y%m%d-%H%M%S)" \
    --region ap-northeast-2

# Monitor execution
aws stepfunctions describe-execution \
    --execution-arn <execution-arn> \
    --region ap-northeast-2
```

### Step 4: Schedule Daily Execution

```bash
# Create EventBridge rule (daily at 04:00 UTC)
aws events put-rule \
    --name commerce-analytics-daily-run \
    --schedule-expression "cron(0 4 * * ? *)" \
    --state ENABLED \
    --region ap-northeast-2

# Add Step Functions as target
aws events put-targets \
    --rule commerce-analytics-daily-run \
    --targets "Id"="1","Arn"="arn:aws:states:ap-northeast-2:725129837589:stateMachine:commerce-analytics-pipeline","RoleArn"="arn:aws:iam::725129837589:role/events-step-functions-execution-role","Input"="{\"service_names\":[\"theshop-brand\",\"theshop-pharmacy\"]}" \
    --region ap-northeast-2
```

### Step 5: Verify Table Creation

```sql
-- Check if tables were created
SHOW TABLES IN log_db LIKE '%commerce%';

-- Expected output:
-- theshop_brand_commerce_button_interaction_summary
-- theshop_brand_commerce_product_ranking_summary
-- theshop_brand_commerce_search_analytics_summary
-- theshop_brand_commerce_category_performance_summary
-- theshop_brand_commerce_hourly_traffic_summary
-- theshop_brand_commerce_purchase_analytics_summary
-- theshop_brand_commerce_navigation_flow_summary
-- (repeat for theshop_pharmacy)

-- Query sample data
SELECT * FROM theshop_brand_commerce_product_ranking_summary
ORDER BY cart_add_count DESC
LIMIT 10;
```

---

## Grafana Integration

### Data Source Configuration

```yaml
Name: Athena Commerce
Type: grafana-athena-datasource
Database: log_db
Workgroup: primary
Region: ap-northeast-2
Output Location: s3://aws-athena-query-results-725129837589-ap-northeast-2/
```

### Panel Query Examples

#### **Button Click Stats (Stat Panel)**

```sql
SELECT
    SUM(total_clicks) as clicks,
    SUM(unique_users) as users
FROM theshop_${service}_commerce_button_interaction_summary
WHERE action = '${action}'
```

#### **Product Ranking (Table Panel)**

```sql
SELECT
    productName,
    category,
    cart_add_count,
    unique_users,
    total_cart_value
FROM theshop_${service}_commerce_product_ranking_summary
ORDER BY cart_add_count DESC
LIMIT 20
```

#### **Hourly Traffic (Time Series Panel)**

```sql
SELECT
    CAST(hour AS VARCHAR) as hour_label,
    sessions,
    cart_adds,
    cart_conversion_rate
FROM theshop_${service}_commerce_hourly_traffic_summary
ORDER BY hour
```

#### **Search CTR (Gauge Panel)**

```sql
SELECT
    AVG(click_through_rate) as avg_ctr
FROM theshop_${service}_commerce_search_analytics_summary
WHERE search_count >= 10
```

### Dashboard Variables

```
$service: theshop_brand, theshop_pharmacy
$action: smart_order_open, quick_add, view_detail
$category: health, beauty, supplement
```

---

## Pipeline Comparison

### User Behavior Pipeline vs Commerce Pipeline

| Aspect                | User Behavior Pipeline                                                            | Commerce Pipeline                                                                                                                |
| --------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**           | User engagement, retention                                                        | Sales, merchandising                                                                                                             |
| **Events**            | `commerce.session.start`                                                          | `commerce.button.click`, `commerce.cart.add`, etc.                                                                               |
| **Query Types**       | MAU, DAU, Retention, Conversion, User Cohort, Session Metrics, Event Distribution | Button Interaction, Product Ranking, Search Analytics, Category Performance, Hourly Traffic, Purchase Analytics, Navigation Flow |
| **Time Windows**      | 30-90 days                                                                        | 7-90 days (varies by query)                                                                                                      |
| **Lambda**            | `athena-query-builder`                                                            | `commerce-query-builder`                                                                                                         |
| **Step Function**     | `otel-analytics-pipeline`                                                         | `commerce-analytics-pipeline`                                                                                                    |
| **S3 Prefix**         | `summary/`                                                                        | `commerce-summary/`                                                                                                              |
| **Schedule**          | Daily 02:00 UTC                                                                   | Daily 04:00 UTC                                                                                                                  |
| **Execution Time**    | 10-15 min/service                                                                 | 12-18 min/service                                                                                                                |
| **Table Naming**      | `{service}_{query_type}_summary`                                                  | `{service}_commerce_{query_type}_summary`                                                                                        |
| **Stakeholders**      | Product Team                                                                      | Business Team                                                                                                                    |
| **Grafana Dashboard** | `otel-analytics-multi-service`                                                    | `commerce-analytics-multi-service`                                                                                               |

---

## Troubleshooting

### Common Issues

#### **Issue 1: Lambda Timeout**

**Symptom**: Lambda execution exceeds 5 minutes  
**Cause**: Large S3 cleanup or complex query generation  
**Solution**:

```bash
# Increase Lambda timeout to 10 minutes
aws lambda update-function-configuration \
    --function-name commerce-query-builder \
    --timeout 600 \
    --region ap-northeast-2
```

#### **Issue 2: Athena Query Fails with "Too Many Concurrent Queries"**

**Symptom**: Step Function fails in Batch3  
**Cause**: Exceeded 25 concurrent query limit  
**Solution**: Reduce Batch3 parallelism from 3 to 2 branches

#### **Issue 3: Empty Summary Tables**

**Symptom**: Tables created but 0 rows  
**Cause**: No events matching filter criteria  
**Solution**: Run test queries from `docs/commerce-analytics-test-queries.md` Section 1-2

#### **Issue 4: TRY_CAST Returns NULL**

**Symptom**: `total_cart_value` is NULL  
**Cause**: Invalid numeric data in `quantity` or `salePrice` attributes  
**Solution**: Check data quality:

```sql
SELECT
    attributes.quantity,
    attributes.salePrice,
    TRY_CAST(attributes.quantity AS INTEGER) as parsed_quantity,
    TRY_CAST(attributes.salePrice AS DOUBLE) as parsed_price
FROM logall
WHERE body = 'commerce.cart.add'
AND (TRY_CAST(attributes.quantity AS INTEGER) IS NULL
     OR TRY_CAST(attributes.salePrice AS DOUBLE) IS NULL)
LIMIT 10;
```

#### **Issue 5: Table Name Too Long**

**Symptom**: Error "table name exceeds maximum length"  
**Cause**: Service name generates long table prefix  
**Solution**: Modify `ComputeTablePrefix` in Step Function to shorten names

### Monitoring Queries

```sql
-- Check last execution date
SELECT
    MAX(calculation_date) as last_run
FROM theshop_brand_commerce_product_ranking_summary;

-- Verify row counts
SELECT
    'button_interaction' as query_type,
    COUNT(*) as row_count
FROM theshop_brand_commerce_button_interaction_summary
UNION ALL
SELECT
    'product_ranking',
    COUNT(*)
FROM theshop_brand_commerce_product_ranking_summary;
-- Add remaining query types...
```

### CloudWatch Logs

```bash
# Lambda logs
aws logs tail /aws/lambda/commerce-query-builder --follow --region ap-northeast-2

# Step Functions execution history
aws stepfunctions get-execution-history \
    --execution-arn <arn> \
    --region ap-northeast-2 \
    --max-results 100
```

---

## Next Steps

1. ✅ Deploy Lambda and Step Function
2. ✅ Run test execution
3. ⏳ Verify 14 tables created (7 per service)
4. ⏳ Create Grafana dashboard
5. ⏳ Enable EventBridge schedule
6. ⏳ Monitor for 1 week
7. ⏳ Share dashboards with business stakeholders
