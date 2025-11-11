# Commerce Analytics Test Queries (Optimized)

**Purpose**: Standalone Athena queries for testing commerce event analytics during staging phase  
**Database**: `log_db`  
**Table**: `logall`  
**Date**: 2025-10-29  
**Optimization**: 3-day scan window, 3-service filtering, corrected navigation attributes

## Table of Contents

1. [Event Type Validation](#event-type-validation)
2. [Attribute Availability Checks](#attribute-availability-checks)
3. [Sample Data Inspection](#sample-data-inspection)
4. [Aggregation Tests](#aggregation-tests)
5. [Production CTAS Templates](#production-ctas-templates)
6. [Troubleshooting Queries](#troubleshooting-queries)

---

## Event Type Validation

### 1.1 Check All Available Event Types (Last 3 Days)

**Purpose**: Verify what event types exist in the data  
**Expected**: Should see `commerce.button.click`, `commerce.cart.add`, `commerce.search`, etc.

```sql
SELECT
    body as event_type,
    COUNT(*) as event_count,
    COUNT(DISTINCT attributes.userKey) as unique_users,
    COUNT(DISTINCT attributes.sessionId) as unique_sessions,
    MIN(CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)) as first_seen,
    MAX(CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)) as last_seen
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND (body LIKE 'commerce.%' OR body LIKE 'client.%')
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
GROUP BY body
ORDER BY event_count DESC;
```

**Expected Output**:

```
| event_type                   | event_count | unique_users | unique_sessions |
| ---------------------------- | ----------- | ------------ | --------------- |
| commerce.session.start       | 20000+      | 2000+        | 4000+           |
| client.routing               | 15000+      | 1500+        | 3000+           |
| commerce.cart.add            | 5000+       | 500+         | 1500+           |
| commerce.button.click        | 2000+       | 200+         | 600+            |
| commerce.search              | 1000+       | 100+         | 300+            |
| commerce.search.result_click | 800+        | 80+          | 250+            |
| commerce.checkout.purchase   | 200+        | 80+          | 150+            |
```

---

## Attribute Availability Checks

### 2.1 Button Click Attributes (`commerce.button.click`)

**Purpose**: Verify all required attributes exist for button interaction analytics  
**Required Attributes**: `action`, `menuName`, `page`, `userKey`, `sessionId`

```sql
SELECT
    COUNT(*) as total_events,
    COUNT(attributes.action) as has_action,
    COUNT(attributes.menuName) as has_menu_name,
    COUNT(attributes.page) as has_page,
    COUNT(attributes.userKey) as has_user_key,
    COUNT(attributes.sessionId) as has_session_id,
    ROUND(COUNT(attributes.action) * 100.0 / COUNT(*), 2) as action_coverage_pct,
    ROUND(COUNT(attributes.menuName) * 100.0 / COUNT(*), 2) as menu_coverage_pct,
    ROUND(COUNT(attributes.page) * 100.0 / COUNT(*), 2) as page_coverage_pct
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND body = 'commerce.button.click'
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital');
```

**Expected**: All percentages should be > 95%

### 2.2 Cart Add Attributes (`commerce.cart.add`)

**Purpose**: Verify product and cart attributes for product ranking analytics  
**Required Attributes**: `productName`, `category`/`ctgnm`, `sellerNm`, `quantity`, `salePrice`

```sql
SELECT
    COUNT(*) as total_events,
    COUNT(attributes.productName) as has_product_name,
    COUNT(attributes.quantity) as has_quantity,
    COUNT(attributes.salePrice) as has_price,
    COUNT(attributes.sellerNm) as has_seller,
    COUNT(attributes.userKey) as has_user_key,
    COUNT(attributes.sessionId) as has_session_id,
    ROUND(COUNT(attributes.productName) * 100.0 / COUNT(*), 2) as product_coverage_pct,
    ROUND(COUNT(attributes.quantity) * 100.0 / COUNT(*), 2) as quantity_coverage_pct,
    ROUND(COUNT(attributes.salePrice) * 100.0 / COUNT(*), 2) as price_coverage_pct,
    ROUND(COUNT(COALESCE(attributes.category, attributes.ctgnm)) * 100.0 / COUNT(*), 2) as category_coverage_pct
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND body = 'commerce.cart.add'
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital');
```

**Expected**: productName > 98%, category > 90%, quantity/price > 80%

### 2.3 Search Attributes (`commerce.search` and `commerce.search.result_click`)

**Purpose**: Verify search query attributes exist  
**Required Attributes**: `query`, `sessionId`

```sql
SELECT
    body as event_type,
    COUNT(*) as total_events,
    COUNT(attributes.query) as has_search_query,
    COUNT(attributes.sessionId) as has_session_id,
    COUNT(attributes.userKey) as has_user_key,
    ROUND(COUNT(attributes.query) * 100.0 / COUNT(*), 2) as search_query_coverage_pct,
    ROUND(COUNT(attributes.sessionId) * 100.0 / COUNT(*), 2) as session_coverage_pct
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND body IN ('commerce.search', 'commerce.search.result_click')
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
GROUP BY body;
```

**Expected**: searchQuery > 95% for both event types

### 2.4 Purchase Attributes (`commerce.checkout.purchase`)

**Purpose**: Verify purchase and payment attributes  
**Required Attributes**: `totalAmount`, `paymentMethod`, `userKey`  
**Note**: Using 90-day window due to low purchase volume

```sql
SELECT
    COUNT(*) as total_events,
    COUNT(attributes.totalAmount) as has_total_amount,
    COUNT(attributes.paymentMethod) as has_payment_method,
    COUNT(attributes.userKey) as has_user_key,
    COUNT(attributes.sessionId) as has_session_id,
    ROUND(COUNT(attributes.totalAmount) * 100.0 / COUNT(*), 2) as amount_coverage_pct,
    ROUND(COUNT(attributes.paymentMethod) * 100.0 / COUNT(*), 2) as payment_coverage_pct
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '90' DAY
    AND body = 'commerce.checkout.purchase'
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital');
```

**Expected**: totalAmount > 90%, paymentMethod > 80%

### 2.5 Navigation Attributes (`client.routing`)

**Purpose**: Verify routing path attributes  
**Required Attributes**: `path`, `sessionId`

```sql
SELECT
    COUNT(*) as total_events,
    COUNT(attributes.path) as has_path,
    COUNT(attributes.sessionId) as has_session_id,
    COUNT(attributes.userKey) as has_user_key,
    ROUND(COUNT(attributes.path) * 100.0 / COUNT(*), 2) as path_coverage_pct,
    ROUND(COUNT(attributes.sessionId) * 100.0 / COUNT(*), 2) as session_coverage_pct
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND body = 'client.routing'
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital');
```

**Expected**: path coverage > 95%

---

## Sample Data Inspection

### 3.1 Button Click Sample Data

**Purpose**: Inspect actual button click events to understand data structure

```sql
SELECT
    attributes."resource.service.name" as service_name,
    attributes.action,
    attributes.menuName,
    attributes.page,
    attributes.userKey,
    attributes.sessionId,
    timestamp
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '1' DAY
    AND body = 'commerce.button.click'
    AND attributes.action IS NOT NULL
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
ORDER BY timestamp DESC
LIMIT 10;
```

**Look For**: Verify action values like `smart_order_open`, menuName patterns, page URLs

### 3.2 Cart Add Sample Data with Product Details

**Purpose**: Inspect product attributes for ranking analysis

```sql
SELECT
    attributes."resource.service.name" as service_name,
    attributes.productName,
    COALESCE(attributes.category, attributes.ctgnm) as category,
    attributes.sellerNm,
    attributes.specification,
    TRY_CAST(attributes.quantity AS INTEGER) as quantity,
    TRY_CAST(attributes.salePrice AS DOUBLE) as sale_price,
    attributes.source,
    attributes.goodsCd,
    timestamp
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '1' DAY
    AND body = 'commerce.cart.add'
    AND attributes.productName IS NOT NULL
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
ORDER BY timestamp DESC
LIMIT 10;
```

**Look For**: Product names, category values, seller names, price ranges

### 3.3 Search Query Sample Data

**Purpose**: Inspect search terms and result clicks

```sql
SELECT
    attributes."resource.service.name" as service_name,
    body as event_type,
    attributes.query as searchQuery,
    attributes.productName,
    attributes.sessionId,
    timestamp
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '1' DAY
    AND body IN ('commerce.search', 'commerce.search.result_click')
    AND attributes.query IS NOT NULL
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
ORDER BY timestamp DESC
LIMIT 10;
```

**Look For**: Common search terms, whether search and click have matching sessionId

### 3.4 Purchase Transaction Sample Data

**Purpose**: Inspect purchase events and payment methods

```sql
SELECT
    attributes."resource.service.name" as service_name,
    TRY_CAST(attributes.totalAmount AS DOUBLE) as total_amount,
    attributes.paymentMethod,
    attributes.userKey,
    attributes.sessionId,
    timestamp
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '7' DAY
    AND body = 'commerce.checkout.purchase'
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
ORDER BY timestamp DESC
LIMIT 10;
```

**Look For**: Order values, payment method values (card, cash, etc.)

### 3.5 Navigation Flow Sample Data

**Purpose**: Inspect routing paths

```sql
SELECT
    attributes."resource.service.name" as service_name,
    attributes.path,
    attributes.sessionId,
    attributes.userKey,
    timestamp
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '1' DAY
    AND body = 'client.routing'
    AND attributes.path IS NOT NULL
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
ORDER BY timestamp DESC
LIMIT 10;
```

**Look For**: Common paths, URL patterns, page visit frequencies

---

## Aggregation Tests

### 4.1 Button Click Aggregation Test (TOP 10 Actions)

**Purpose**: Test aggregation logic before creating CTAS table

```sql
SELECT
    attributes."resource.service.name" as service_name,
    attributes.action,
    COUNT(*) as total_clicks,
    COUNT(DISTINCT attributes.userKey) as unique_users,
    COUNT(DISTINCT attributes.sessionId) as unique_sessions,
    ROUND(CAST(COUNT(*) AS DOUBLE) / NULLIF(COUNT(DISTINCT attributes.userKey), 0), 2) as avg_clicks_per_user
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND body = 'commerce.button.click'
    AND attributes.action IS NOT NULL
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
GROUP BY attributes."resource.service.name", attributes.action
ORDER BY service_name, total_clicks DESC
LIMIT 10;
```

**Expected**: Should see `smart_order_open` and other actions with counts

### 4.2 Product Ranking Aggregation Test (TOP 20 Products)

**Purpose**: Test product ranking logic with price calculations

```sql
SELECT
    attributes."resource.service.name" as service_name,
    attributes.productName,
    COALESCE(attributes.category, attributes.ctgnm, 'Uncategorized') as category,
    COUNT(*) as cart_add_count,
    COUNT(DISTINCT attributes.userKey) as unique_users,
    SUM(TRY_CAST(attributes.quantity AS INTEGER)) as total_quantity,
    ROUND(AVG(TRY_CAST(COALESCE(attributes.salePrice, attributes.price) AS DOUBLE)), 2) as avg_price,
    ROUND(SUM(TRY_CAST(attributes.quantity AS INTEGER) * TRY_CAST(COALESCE(attributes.salePrice, attributes.price) AS DOUBLE)), 2) as total_cart_value
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND body = 'commerce.cart.add'
    AND attributes.productName IS NOT NULL
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
GROUP BY
    attributes."resource.service.name",
    attributes.productName,
    COALESCE(attributes.category, attributes.ctgnm, 'Uncategorized')
ORDER BY service_name, cart_add_count DESC
LIMIT 20;
```

**Expected**: TOP products with valid prices and quantities

### 4.3 Search CTR Aggregation Test

**Purpose**: Test search click-through rate calculation

```sql
WITH search_events AS (
    SELECT
        attributes."resource.service.name" as service_name,
        attributes.query as searchQuery,
        attributes.sessionId,
        COUNT(*) as search_count
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= DATE '2025-10-29' - INTERVAL '3' DAY
        AND body = 'commerce.search'
        AND attributes.query IS NOT NULL
        AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
    GROUP BY
        attributes."resource.service.name",
        attributes.query,
        attributes.sessionId
),
search_clicks AS (
    SELECT
        attributes."resource.service.name" as service_name,
        attributes.sessionId,
        COUNT(*) as click_count
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= DATE '2025-10-29' - INTERVAL '3' DAY
        AND body = 'commerce.search.result_click'
        AND attributes.sessionId IS NOT NULL
        AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
    GROUP BY
        attributes."resource.service.name",
        attributes.sessionId
)
SELECT
    se.service_name,
    se.searchQuery,
    se.search_count,
    COALESCE(sc.click_count, 0) as click_count,
    ROUND(CAST(COALESCE(sc.click_count, 0) AS DOUBLE) * 100.0 / NULLIF(se.search_count, 0), 2) as click_through_rate
FROM search_events se
LEFT JOIN search_clicks sc
    ON se.service_name = sc.service_name
    AND se.sessionId = sc.sessionId
GROUP BY se.service_name, se.searchQuery, se.search_count, sc.click_count
HAVING se.search_count >= 5
ORDER BY se.service_name, se.search_count DESC
LIMIT 20;
```

**Expected**: CTR between 0% - 100%, popular search terms with clicks

### 4.4 Hourly Traffic Pattern Test

**Purpose**: Test hourly aggregation by hour of day

```sql
SELECT
    attributes."resource.service.name" as service_name,
    CAST(hour AS INTEGER) as hour,
    COUNT(DISTINCT attributes.sessionId) as session_count,
    COUNT(DISTINCT attributes.userKey) as unique_users
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND body = 'commerce.session.start'
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
GROUP BY attributes."resource.service.name", hour
ORDER BY service_name, hour;
```

**Expected**: 24 rows per service (hours 00-23), peak hours visible

### 4.5 Category Performance Test

**Purpose**: Test category-level aggregations

```sql
SELECT
    attributes."resource.service.name" as service_name,
    COALESCE(attributes.category, attributes.ctgnm, 'Uncategorized') as category,
    COUNT(*) as cart_add_count,
    COUNT(DISTINCT attributes.productName) as unique_products,
    COUNT(DISTINCT attributes.userKey) as unique_users,
    ROUND(AVG(TRY_CAST(attributes.salePrice AS DOUBLE)), 2) as avg_price
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND body = 'commerce.cart.add'
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
GROUP BY
    attributes."resource.service.name",
    COALESCE(attributes.category, attributes.ctgnm, 'Uncategorized')
ORDER BY service_name, cart_add_count DESC
LIMIT 15;
```

**Expected**: Top categories with aggregated metrics

### 4.6 Navigation Flow Aggregation Test (TOP 20 Paths)

**Purpose**: Test page view aggregation by path

```sql
SELECT
    attributes."resource.service.name" as service_name,
    attributes.path,
    COUNT(*) as page_view_count,
    COUNT(DISTINCT attributes.userKey) as unique_users,
    COUNT(DISTINCT attributes.sessionId) as unique_sessions,
    ROUND(CAST(COUNT(*) AS DOUBLE) / NULLIF(COUNT(DISTINCT attributes.sessionId), 0), 2) as avg_views_per_session
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND body = 'client.routing'
    AND attributes.path IS NOT NULL
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
GROUP BY
    attributes."resource.service.name",
    attributes.path
ORDER BY service_name, page_view_count DESC
LIMIT 20;
```

**Expected**: Top pages with visit frequencies

---

## Production CTAS Templates

These queries are ready to run in production. They create the actual summary tables.

### 5.1 Button Interaction Summary (Production)

```sql
-- Production-ready CTAS query for button interaction analytics
CREATE TABLE theshop_brand_commerce_button_interaction_summary
WITH (
    format = 'PARQUET',
    external_location = 's3://aws-athena-query-results-725129837589-ap-northeast-2/commerce-summary/theshop_brand_commerce_button_interaction/'
) AS
WITH button_clicks AS (
    SELECT
        attributes."resource.service.name" as service_name,
        attributes.action,
        attributes.menuName,
        attributes.page,
        COUNT(*) as total_clicks,
        COUNT(DISTINCT attributes.userKey) as unique_users,
        COUNT(DISTINCT attributes.sessionId) as unique_sessions,
        ROUND(CAST(COUNT(*) AS DOUBLE) / NULLIF(COUNT(DISTINCT attributes.userKey), 0), 2) as avg_clicks_per_user
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= GREATEST(DATE '2025-10-29' - INTERVAL '7' DAY, DATE '2025-09-20')
        AND body = 'commerce.button.click'
        AND attributes.action IS NOT NULL
        AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
    GROUP BY attributes."resource.service.name", attributes.action, attributes.menuName, attributes.page
)
SELECT
    service_name,
    action,
    menuName,
    page,
    total_clicks,
    unique_users,
    unique_sessions,
    avg_clicks_per_user,
    DATE '2025-10-29' as calculation_date
FROM button_clicks
ORDER BY service_name, total_clicks DESC
LIMIT 50;
```

### 5.2 Product Ranking Summary (Production)

```sql
-- Production-ready CTAS query for product ranking
CREATE TABLE theshop_brand_commerce_product_ranking_summary
WITH (
    format = 'PARQUET',
    external_location = 's3://aws-athena-query-results-725129837589-ap-northeast-2/commerce-summary/theshop_brand_commerce_product_ranking/'
) AS
WITH product_stats AS (
    SELECT
        attributes."resource.service.name" as service_name,
        attributes.productName,
        COALESCE(attributes.category, attributes.ctgnm, 'Uncategorized') as category,
        attributes.sellerNm,
        COUNT(*) as cart_add_count,
        COUNT(DISTINCT attributes.userKey) as unique_users,
        SUM(TRY_CAST(attributes.quantity AS INTEGER)) as total_quantity,
        ROUND(AVG(TRY_CAST(COALESCE(attributes.salePrice, attributes.price) AS DOUBLE)), 2) as avg_sale_price,
        ROUND(SUM(TRY_CAST(attributes.quantity AS INTEGER) * TRY_CAST(COALESCE(attributes.salePrice, attributes.price) AS DOUBLE)), 2) as total_cart_value
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= GREATEST(DATE '2025-10-29' - INTERVAL '30' DAY, DATE '2025-09-20')
        AND body = 'commerce.cart.add'
        AND attributes.productName IS NOT NULL
        AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
    GROUP BY
        attributes."resource.service.name",
        attributes.productName,
        COALESCE(attributes.category, attributes.ctgnm, 'Uncategorized'),
        attributes.sellerNm
)
SELECT
    service_name,
    productName,
    category,
    sellerNm,
    cart_add_count,
    unique_users,
    total_quantity,
    avg_sale_price,
    total_cart_value,
    DATE '2025-10-29' as calculation_date
FROM product_stats
ORDER BY service_name, cart_add_count DESC
LIMIT 100;
```

### 5.3 Navigation Flow Summary (Production - Fixed)

```sql
-- Production-ready CTAS query for navigation flow (using 'path' attribute)
CREATE TABLE theshop_brand_commerce_navigation_flow_summary
WITH (
    format = 'PARQUET',
    external_location = 's3://aws-athena-query-results-725129837589-ap-northeast-2/commerce-summary/theshop_brand_commerce_navigation_flow/'
) AS
WITH routing_events AS (
    SELECT
        attributes."resource.service.name" as service_name,
        attributes.path,
        COUNT(*) as page_view_count,
        COUNT(DISTINCT attributes.userKey) as unique_users,
        COUNT(DISTINCT attributes.sessionId) as unique_sessions
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= GREATEST(DATE '2025-10-29' - INTERVAL '7' DAY, DATE '2025-09-20')
        AND body = 'client.routing'
        AND attributes.path IS NOT NULL
        AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
    GROUP BY
        attributes."resource.service.name",
        attributes.path
)
SELECT
    service_name,
    path,
    page_view_count,
    unique_users,
    unique_sessions,
    ROUND(CAST(page_view_count AS DOUBLE) / NULLIF(unique_sessions, 0), 2) as avg_views_per_session,
    DATE '2025-10-29' as calculation_date
FROM routing_events
ORDER BY service_name, page_view_count DESC
LIMIT 100;
```

---

## Troubleshooting Queries

### 6.1 Check for NULL Service Names

**Purpose**: Identify events missing service identifier

```sql
SELECT
    body as event_type,
    COUNT(*) as events_with_null_service,
    COUNT(DISTINCT attributes.userKey) as affected_users
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND attributes."resource.service.name" IS NULL
    AND (body LIKE 'commerce.%' OR body LIKE 'client.%')
GROUP BY body
ORDER BY events_with_null_service DESC;
```

**Expected**: Should be 0 or very low

### 6.2 Check Date Range Coverage

**Purpose**: Verify data exists for all days in the window

```sql
SELECT
    CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as date,
    COUNT(*) as total_events,
    COUNT(DISTINCT attributes.userKey) as unique_users
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND (body LIKE 'commerce.%' OR body LIKE 'client.%')
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
GROUP BY year, month, day
ORDER BY date DESC;
```

**Expected**: 3 consecutive days with data

### 6.3 Check for Duplicate Events

**Purpose**: Identify potential duplicate logging

```sql
WITH event_dedup AS (
    SELECT
        attributes."resource.service.name" as service_name,
        body,
        attributes.userKey,
        attributes.sessionId,
        timestamp,
        COUNT(*) as duplicate_count
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= DATE '2025-10-29' - INTERVAL '3' DAY
        AND (body LIKE 'commerce.%' OR body LIKE 'client.%')
        AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
    GROUP BY
        attributes."resource.service.name",
        body,
        attributes.userKey,
        attributes.sessionId,
        timestamp
    HAVING COUNT(*) > 1
)
SELECT
    COUNT(*) as duplicate_event_groups,
    SUM(duplicate_count) as total_duplicates
FROM event_dedup;
```

**Expected**: Low duplicate count (< 1% of total events)

### 6.4 Verify MIN_DATA_DATE Filter Works

**Purpose**: Ensure no data before 2025-09-20 is included

```sql
SELECT
    CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as date,
    COUNT(*) as event_count
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    < DATE '2025-09-20'
    AND (body LIKE 'commerce.%' OR body LIKE 'client.%')
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')
GROUP BY year, month, day
ORDER BY date DESC
LIMIT 10;
```

**Expected**: Should return 0 rows (all filtered out)

### 6.5 Check TRY_CAST Success Rate for Numeric Fields

**Purpose**: Verify numeric conversions work for quantity and price

```sql
SELECT
    COUNT(*) as total_cart_adds,
    COUNT(attributes.quantity) as has_quantity_value,
    COUNT(TRY_CAST(attributes.quantity AS INTEGER)) as quantity_cast_success,
    COUNT(attributes.salePrice) as has_price_value,
    COUNT(TRY_CAST(attributes.salePrice AS DOUBLE)) as price_cast_success,
    ROUND(COUNT(TRY_CAST(attributes.quantity AS INTEGER)) * 100.0 / NULLIF(COUNT(attributes.quantity), 0), 2) as quantity_cast_success_pct,
    ROUND(COUNT(TRY_CAST(attributes.salePrice AS DOUBLE)) * 100.0 / NULLIF(COUNT(attributes.salePrice), 0), 2) as price_cast_success_pct
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND body = 'commerce.cart.add'
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital');
```

**Expected**: Both cast success rates > 95%

### 6.6 Check Navigation Path Attribute Exists

**Purpose**: Verify 'path' attribute is present (not fromPath/toPath)

```sql
SELECT
    COUNT(*) as total_routing_events,
    COUNT(attributes.path) as has_path_attribute,
    ROUND(COUNT(attributes.path) * 100.0 / COUNT(*), 2) as path_coverage_pct,
    COUNT(DISTINCT attributes.path) as unique_paths
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= DATE '2025-10-29' - INTERVAL '3' DAY
    AND body = 'client.routing'
    AND attributes."resource.service.name" IN ('theshop-brand', 'theshop-pharmacy', 'theshop-hospital');
```

**Expected**: path_coverage_pct > 95%

---

## Testing Workflow

1. **Run Event Type Validation** (Section 1) - Confirm all event types exist
2. **Run All Attribute Checks** (Section 2) - Verify ≥95% coverage for critical attributes
3. **Inspect Sample Data** (Section 3) - Manually review data quality and patterns
4. **Test Aggregations** (Section 4) - Validate metrics logic before CTAS
5. **Run Production CTAS** (Section 5) - Create actual summary tables
6. **Run Troubleshooting Queries** (Section 6) if issues found

## Success Criteria

✅ All event types present with > 100 events/day  
✅ Critical attributes have > 95% coverage  
✅ Sample data shows realistic values (no test/dummy data)  
✅ Aggregation tests return expected TOP N results  
✅ TRY_CAST success rates > 95%  
✅ No data before MIN_DATA_DATE (2025-09-20)  
✅ Duplicate rate < 1%  
✅ Navigation queries use 'path' attribute (not fromPath/toPath)

## Key Optimizations Applied

🎯 **3-Day Scan Window**: Reduced from 7 days (except 90 days for purchases)  
🎯 **3-Service Filtering**: All queries filter by `('theshop-brand', 'theshop-pharmacy', 'theshop-hospital')`  
🎯 **Fixed Navigation**: Changed from `fromPath`/`toPath` to `path` attribute  
🎯 **Updated Date**: Changed from `2025-10-28` to `2025-10-29`  
🎯 **Cost Reduction**: Estimated 57% reduction in data scanned (3 days vs 7 days)

## Next Steps After Testing

1. Update `commerce-query-builder.py` navigation_flow query to use `path` attribute
2. Deploy Lambda function with fixed navigation query
3. Run Step Function manually with test payload
4. Verify 21 tables created (7 query types × 3 services)
5. Create Grafana dashboard using new tables
6. Enable daily schedule (EventBridge at 04:00 UTC)
