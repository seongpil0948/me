# Commerce Analytics - Known Issues & Backend Requirements

**Last Updated**: 2025-10-29  
**Source**: Log analysis from `Logs-2025-10-28 16_38_51.json` (30,379 events)

## ✅ FIXED Issues (2025-10-29)

### 1. Search Analytics - Wrong Field Name ✅

**Status**: **FIXED**

- **Problem**: Query used `attributes.searchQuery` which doesn't exist in logs
- **Root Cause**: Logs use TWO different field patterns:
  - `attributes.query` (found in log lines 241, 269, 497)
  - `attributes.payload_query` (found in log lines 213, 326, 412, 4678, 4707)
- **Fix Applied**: Changed to `COALESCE(attributes.query, attributes.payload_query)`
- **Impact**: Search analytics query now returns data (previously 0 rows)

### 2. Product Ranking - Inconsistent Price Field ✅

**Status**: **FIXED**

- **Problem**: Query only used `attributes.salePrice` but some cart events use `attributes.price`
- **Evidence**: Log line 735 shows `"price": "30800"` with no `salePrice` field
- **Fix Applied**: Changed to `COALESCE(attributes.salePrice, attributes.price)`
- **Impact**: Product ranking now captures all products regardless of price field name

### 3. Category Performance - Price Field Consistency ✅

**Status**: **FIXED**

- **Fix Applied**: Added `COALESCE(attributes.salePrice, attributes.price)` to match product_ranking
- **Impact**: Consistent revenue calculations across all commerce queries

---

## 🚨 CRITICAL Issues Requiring Backend Changes

### 4. Hourly Traffic - Missing Session Start Events 🚨

**Status**: **BLOCKED - Backend Implementation Required**

**Problem**: Query filters for `body = 'commerce.session.start'` but this event is **NEVER logged**

```sql
-- Current query (Lines 377-425)
WHERE body = 'commerce.session.start'  -- ❌ Returns 0 rows
```

**Evidence**:

- Grep search across 30,379 log entries: **0 occurrences** of `commerce.session.start`
- All other commerce events present (cart.add, search, button.click, etc.)

**Impact**:

- Hourly traffic query returns **0 sessions**
- Cannot track peak hours or traffic patterns
- Dashboard panel shows no data

**Proposed Solutions**:

#### Option A: Backend Implements Session Events (RECOMMENDED)

```javascript
// Backend needs to log this event:
{
  "body": "commerce.session.start",
  "attributes": {
    "resource.service.name": "theshop-pharmacy",
    "sessionId": "71b3f6d1-66ce-4378-8f96-e84b9a765b5e",
    "userKey": "1000000200"
  }
}
```

#### Option B: Use Proxy Event (WORKAROUND)

Use first `commerce.cart.view` per session as session start:

```sql
-- Temporary workaround until backend fix
WITH first_events AS (
    SELECT
        sessionId,
        MIN(timestamp) as session_start
    FROM logall
    WHERE body = 'commerce.cart.view'
    GROUP BY sessionId
)
```

**Recommendation**: Implement Option A for accurate session tracking

---

### 5. Purchase Analytics - Missing Revenue Data 🚨

**Status**: **BLOCKED - Backend Implementation Required**

**Problem**: Query expects `attributes.totalAmount` and `attributes.paymentMethod` but these are **NOT logged**

**Evidence** (Log line 4883):

```json
{
  "line": "commerce.checkout.purchase",
  "fields": {
    "channel": "direct", // ✅ Present
    "sessionId": "...", // ✅ Present
    "userKey": "..." // ✅ Present
    // ❌ totalAmount - MISSING
    // ❌ paymentMethod - MISSING
    // ❌ orderItems - MISSING
  }
}
```

**Current Query (Lines 427-487)**:

```python
attributes.totalAmount  # ❌ Returns NULL always
attributes.paymentMethod  # ❌ Returns NULL always
```

**Impact**:

- Purchase analytics shows **$0 revenue**
- Payment method distribution: **all NULL**
- Cannot track average order value
- Cannot analyze payment preferences

**Required Backend Changes**:

```javascript
// Backend must log these attributes:
{
  "body": "commerce.checkout.purchase",
  "attributes": {
    "resource.service.name": "theshop-pharmacy",
    "sessionId": "...",
    "userKey": "...",
    "channel": "direct",
    // ADD THESE:
    "totalAmount": "45000",           // Required for revenue
    "paymentMethod": "card",          // Required for payment analysis
    "orderItems": "3",                // Optional: item count
    "discountAmount": "5000"          // Optional: discount tracking
  }
}
```

**Priority**: **HIGH** - Core business metric (revenue) is not trackable

---

### 6. Search Click Correlation - Missing Query Context 🚨

**Status**: **PARTIAL - Backend Enhancement Recommended**

**Problem**: `commerce.search.result_click` events lack the original search query, preventing accurate click-through rate calculation

**Evidence** (Log line 5096):

```json
{
  "line": "commerce.search.result_click",
  "fields": {
    "payload_productId": "01802", // ✅ Present
    "payload_productName": "다이아벡스정500mg", // ✅ Present
    "payload_sellerCode": "50004", // ✅ Present
    "sessionId": "71b3f6d1-66ce-4378-8f96-e84b9a765b5e"
    // ❌ query or payload_query - MISSING
  }
}
```

**Current Query JOIN (Line 336)**:

```sql
LEFT JOIN search_clicks sc
    ON se.service_name = sc.service_name
    AND se.searchQuery = sc.searchQuery  -- ❌ Click events have no query field!
    AND se.sessionId = sc.sessionId
```

**Impact**:

- Click-through rate calculation: **Always 0%** (JOIN never matches)
- Cannot identify which search terms lead to clicks
- Cannot optimize search relevance

**Proposed Solutions**:

#### Option A: Add Query to Click Events (RECOMMENDED)

```javascript
// Backend should preserve search context:
{
  "body": "commerce.search.result_click",
  "attributes": {
    "query": "동국제약",              // ADD: Original search query
    "payload_productId": "01802",
    "payload_productName": "다이아벡스정500mg",
    "sessionId": "..."
  }
}
```

#### Option B: Time-Based Correlation (WORKAROUND)

```sql
-- Join by session + time proximity (within 5 minutes)
LEFT JOIN search_clicks sc
    ON se.sessionId = sc.sessionId
    AND sc.timestamp BETWEEN se.timestamp AND se.timestamp + INTERVAL '5' MINUTE
```

**Trade-offs**:

- Option A: Accurate but requires backend change
- Option B: Works now but may correlate wrong searches (if user searches multiple times)

**Recommendation**: Implement Option A for accuracy

---

## 📊 Log Analysis Summary

### Event Coverage (from 30,379 log entries)

| Event Type                     | Status            | Count | Issues                  |
| ------------------------------ | ----------------- | ----- | ----------------------- |
| `commerce.cart.add`            | ✅ Working        | ~40+  | None                    |
| `commerce.cart.view`           | ✅ Working        | ~50+  | None                    |
| `commerce.search`              | ✅ **FIXED**      | ~10+  | Field name corrected    |
| `commerce.button.click`        | ✅ Working        | ~5    | Optional fields handled |
| `commerce.checkout.purchase`   | 🚨 **BLOCKED**    | ~3    | Missing revenue data    |
| `commerce.checkout.start`      | ✅ Working        | ~1    | Minimal attributes OK   |
| `commerce.search.result_click` | ⚠️ **PARTIAL**    | ~1    | Missing query context   |
| `commerce.session.start`       | ❌ **NOT LOGGED** | 0     | Event doesn't exist     |
| `Routing in client side`       | ✅ Working        | Many  | Navigation tracking     |

### Field Name Patterns Discovered

| Expected Field  | Actual Field(s)            | Status                 |
| --------------- | -------------------------- | ---------------------- |
| `searchQuery`   | `query` OR `payload_query` | ✅ Fixed with COALESCE |
| `salePrice`     | `salePrice` OR `price`     | ✅ Fixed with COALESCE |
| `category`      | `category` OR `ctgnm`      | ✅ Already handled     |
| `path`          | `path`                     | ✅ Already correct     |
| `totalAmount`   | ❌ NOT PRESENT             | 🚨 Backend required    |
| `paymentMethod` | ❌ NOT PRESENT             | 🚨 Backend required    |

---

## 🎯 Action Items

### For Data/Analytics Team (COMPLETED ✅)

- [x] Fix search_analytics query field names
- [x] Fix product_ranking price handling
- [x] Fix category_performance price consistency
- [x] Document backend requirements

### For Backend Engineering Team (PENDING 🚨)

- [ ] **Priority 1**: Add `totalAmount` and `paymentMethod` to `commerce.checkout.purchase` events
- [ ] **Priority 2**: Implement `commerce.session.start` event logging
- [ ] **Priority 3**: Add `query` field to `commerce.search.result_click` events

### For Product Team (DECISION NEEDED 🤔)

- [ ] Decide if hourly traffic workaround (using cart.view) is acceptable short-term
- [ ] Prioritize backend instrumentation changes vs. dashboard launch timeline

---

## 📝 Testing Recommendations

After backend changes are deployed:

1. **Verify New Fields Appear in Logs**:

   ```bash
   # Check for totalAmount in purchase events
   aws logs tail /aws/lambda/your-service --format=json | jq 'select(.body == "commerce.checkout.purchase") | .attributes.totalAmount'
   ```

2. **Test Queries with Real Data**:

   ```python
   # Test event payload:
   event = {
       "query_type": "purchase_analytics",
       "table_prefix": "theshop_pharmacy_commerce",
       "service_names": ["theshop-pharmacy"],
       "execution_date": "2025-10-30",
       "cleanup_s3": False  # Don't delete during testing
   }
   ```

3. **Validate Dashboard Panels**:
   - Hourly traffic shows session counts > 0
   - Purchase analytics shows revenue > $0
   - Search CTR shows percentage > 0%

---

## 📚 Related Documentation

- [Commerce Pipeline Guide](../docs/commerce-pipeline-guide.md) - Architecture overview
- [Copilot Instructions](../.github/copilot-instructions.md) - Development conventions
- [Query Builder Lambda](query-builder.py) - Implementation code
- [Step Function State](step-function-state.json) - Orchestration config
