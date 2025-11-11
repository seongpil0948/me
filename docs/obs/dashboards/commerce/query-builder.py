"""
AWS Lambda Function: Commerce Analytics Query Builder for OTEL Logs
Generates dynamic Athena CTAS queries for e-commerce event analytics with S3 cleanup and multi-service support

FIXES APPLIED:
1. Navigation query uses 'attributes.path' instead of 'fromPath/toPath'
2. Event body changed from 'client.routing' to 'Routing in client side'
3. Multi-period support (1M, 3M) with period_months parameter
4. Month-only partition filtering for query optimization
5. Cart source tracking (favorites/routine/missed) in product_ranking and new cart_source_analytics
"""

import json
from datetime import UTC, datetime
from typing import Any
from urllib.parse import urlparse

import boto3

s3_client = boto3.client("s3")
S3_DELETE_BATCH_SIZE = 1000
MIN_DATA_DATE = "2025-10-01"

# Period definitions in months
PERIOD_DEFINITIONS = {
    "1m": 1,
    "3m": 3,
}
# S3 delete batch size limit
def lambda_handler(event: dict[str, Any], _context: Any) -> dict[str, Any]:
    """
    Generate commerce analytics Athena CTAS queries dynamically with multi-service support

    Args:
        event: {
            "query_type": str,  # "button_interaction", "product_ranking", "search_analytics", etc.
            "table_prefix": str,  # e.g., "theshop_brand_commerce"
            "s3_base": str,
            "service_names": list[str],  # e.g., ["theshop-brand", "theshop-pharmacy"]
            "execution_date": str (optional, defaults to today),
            "cleanup_s3": bool (optional, defaults to True),
            "period": str (optional, "1m" or "3m", defaults to "1m")
        }

    Returns:
        {
            "query_string": str,
            "execution_date": str,
            "query_type": str,
            "service_names": list[str],
            "period": str,
            "period_months": int,
            "cleanup_result": dict (if cleanup was performed)
        }
    """
    # Extract parameters
    query_type = event.get("query_type")
    table_prefix = event.get("table_prefix")
    s3_base = event.get("s3_base")
    service_names = event.get("service_names", [])
    cleanup_s3 = event.get("cleanup_s3", True)
    period = event.get("period", "1m").lower()

    # Use provided execution_date or default to today
    execution_date = event.get("execution_date", datetime.now(UTC).strftime("%Y-%m-%d"))
    
    print(f"[INIT] Starting query builder for {query_type} | period={period} | services={len(service_names)} | execution_date={execution_date}")

    # Validate required parameters
    if not all([query_type, table_prefix, s3_base]):
        error_msg = f"Missing required parameters: query_type={query_type}, table_prefix={table_prefix}, s3_base={s3_base}"
        print(f"[ERROR] {error_msg}")
        raise ValueError(error_msg)
    
    # Type assertions after validation
    assert query_type is not None
    assert table_prefix is not None
    assert s3_base is not None

    if not service_names:
        error_msg = "service_names list is required and cannot be empty"
        print(f"[ERROR] {error_msg}")
        raise ValueError(error_msg)
    
    # Validate and get period months
    if period not in PERIOD_DEFINITIONS:
        error_msg = f"Invalid period: {period}. Must be one of {list(PERIOD_DEFINITIONS.keys())}"
        print(f"[ERROR] {error_msg}")
        raise ValueError(error_msg)
    
    period_months = PERIOD_DEFINITIONS[period]

    # Query type to table name mapping for commerce analytics
    table_suffix_map = {
        "button_interaction": "button_interaction",
        "product_ranking": "product_ranking",
        "search_analytics": "search_analytics",
        "category_performance": "category_performance",
        "hourly_traffic": "hourly_traffic",
        "purchase_analytics": "purchase_analytics",
        "navigation_flow": "navigation_flow",
        "cart_source_analytics": "cart_source_analytics",
    }

    # Get table suffix with period and S3 location
    base_suffix = table_suffix_map[query_type]
    table_suffix = f"{base_suffix}_{period}"
    full_table_name = f"{table_prefix}_{table_suffix}_summary"
    s3_location = f"{s3_base}/{table_prefix}_{table_suffix}/"
    
    print(f"[CONFIG] Query Type: {query_type}")
    print(f"[CONFIG] Table Name: {full_table_name}")
    print(f"[CONFIG] Period: {period} ({period_months} months)")
    print(f"[CONFIG] Services: {', '.join(service_names)}")
    print(f"[CONFIG] S3 Location: {s3_location}")

    # Cleanup S3 data before creating new table
    cleanup_result = None
    if cleanup_s3:
        try:
            print(f"[CLEANUP] Starting S3 cleanup for location: {s3_location}")
            cleanup_result = cleanup_s3_location(s3_location)
            print(f"[CLEANUP] ✓ Cleanup completed: {cleanup_result.get('deleted_objects', 0)} objects deleted ({cleanup_result.get('deleted_size_mb', 0)} MB)")
        except Exception as e:
            print(f"[CLEANUP] ⚠ Cleanup failed for {s3_location}: {e!s}")
            cleanup_result = {"status": "failed", "error": str(e), "location": s3_location}
    else:
        print(f"[CLEANUP] Skipped (cleanup_s3=False)")

    # Generate query with service filtering and period
    print(f"[QUERY] Generating {query_type} query with {period_months}-month lookback")
    query_string = generate_query(
        query_type, table_prefix, s3_base, execution_date, 
        service_names, period, period_months
    )
    print(f"[QUERY] ✓ Query generated successfully ({len(query_string)} characters)")

    response = {
        "query_string": query_string.strip(),
        "execution_date": execution_date,
        "query_type": query_type,
        "period": period,
        "period_months": period_months,
        "s3_location": s3_location,
        "service_names": service_names,
    }

    if cleanup_result:
        response["cleanup_result"] = cleanup_result

    print(f"[SUCCESS] Query builder completed for {query_type} ({period})")
    print(f"[SUCCESS] Response keys: {', '.join(response.keys())}")
    return response


def cleanup_s3_location(s3_location: str) -> dict[str, Any]:
    """
    Delete all objects in the specified S3 location

    Args:
        s3_location: S3 URI (e.g., 's3://bucket/prefix/')

    Returns:
        Cleanup result summary
    """
    # Parse S3 location
    parsed = urlparse(s3_location)
    if parsed.scheme != "s3":
        raise ValueError(f"Invalid S3 location: {s3_location}")

    bucket = parsed.netloc
    prefix = parsed.path.lstrip("/")

    print(f"[S3] Target bucket: {bucket}")
    print(f"[S3] Target prefix: {prefix}")

    deleted_count = 0
    deleted_size = 0

    try:
        # List and delete objects in batches
        paginator = s3_client.get_paginator("list_objects_v2")
        pages = paginator.paginate(Bucket=bucket, Prefix=prefix)

        objects_to_delete = []

        for page in pages:
            if "Contents" not in page:
                continue

            for obj in page["Contents"]:
                objects_to_delete.append({"Key": obj["Key"]})
                deleted_size += obj["Size"]

                # Delete in batches of 1000 (S3 API limit)
                if len(objects_to_delete) >= S3_DELETE_BATCH_SIZE:
                    response = s3_client.delete_objects(Bucket=bucket, Delete={"Objects": objects_to_delete})
                    batch_deleted = len(response.get("Deleted", []))
                    deleted_count += batch_deleted
                    print(f"[S3] Batch deleted: {batch_deleted} objects (total: {deleted_count})")
                    objects_to_delete = []

        # Delete remaining objects
        if objects_to_delete:
            response = s3_client.delete_objects(Bucket=bucket, Delete={"Objects": objects_to_delete})
            deleted_count += len(response.get("Deleted", []))

        result = {
            "status": "success",
            "location": s3_location,
            "deleted_objects": deleted_count,
            "deleted_size_mb": round(deleted_size / (1024 * 1024), 2),
        }

        print(f"[S3] Cleanup summary: {deleted_count} objects, {result['deleted_size_mb']} MB freed")
        return result

    except Exception as e:
        error_msg = f"Failed to cleanup S3 location {s3_location}: {e!s}"
        print(error_msg)
        raise Exception(error_msg) from e


def build_service_filter(service_names: list[str]) -> str:
    """Build SQL IN clause for service filtering"""
    if not service_names:
        return ""
    
    quoted_services = [f"'{svc}'" for svc in service_names]
    return f"AND attributes.\"resource.service.name\" IN ({', '.join(quoted_services)})"


def generate_month_filter(execution_date: str, period_months: int) -> str:
    """
    Generate month-based partition filter (no day filtering for optimization)
    
    Args:
        execution_date: Execution date in YYYY-MM-DD format
        period_months: Number of months to look back
    
    Returns:
        SQL WHERE clause fragment for month filtering
    """
    from datetime import datetime
    exec_date = datetime.strptime(execution_date, "%Y-%m-%d")
    exec_year = exec_date.year
    exec_month = exec_date.month
    
    print(f"[FILTER] Generating month filter: execution_date={execution_date}, lookback={period_months} months")
    
    # Calculate start year/month
    total_months = (exec_year * 12 + exec_month) - period_months
    start_year = total_months // 12
    start_month = total_months % 12
    if start_month == 0:
        start_month = 12
        start_year -= 1
    
    # Handle MIN_DATA_DATE constraint
    min_date = datetime.strptime(MIN_DATA_DATE, "%Y-%m-%d")
    min_year = min_date.year
    min_month = min_date.month
    
    # Use the later of calculated start or MIN_DATA_DATE
    if start_year < min_year or (start_year == min_year and start_month < min_month):
        start_year = min_year
        start_month = min_month
    
    # Generate month filter conditions
    conditions = []
    current_year = start_year
    current_month = start_month
    
    while current_year < exec_year or (current_year == exec_year and current_month <= exec_month):
        conditions.append(f"(year = '{current_year}' AND month = '{current_month:02d}')")
        current_month += 1
        if current_month > 12:
            current_month = 1
            current_year += 1
    
    filter_clause = f"({' OR '.join(conditions)})"
    print(f"[FILTER] Generated {len(conditions)} month conditions from {start_year}-{start_month:02d} to {exec_year}-{exec_month:02d}")
    return filter_clause


def generate_query(
    query_type: str, 
    table_prefix: str, 
    s3_base: str, 
    execution_date: str,
    service_names: list[str],
    period: str,
    period_months: int
) -> str:
    """
    Generate Athena CTAS query based on commerce query type with multi-service and multi-period support

    Args:
        query_type: Type of commerce query to generate
        table_prefix: Prefix for table name (e.g., "theshop_brand_commerce")
        s3_base: Base S3 location
        execution_date: Execution date for the query
        service_names: List of service names to filter
        period: Period string ("1m" or "3m")
        period_months: Number of months for the period

    Returns:
        Generated SQL query string
    """
    service_filter = build_service_filter(service_names)
    month_filter = generate_month_filter(execution_date, period_months)
    period_label = period.upper()
    
    queries = {
        "button_interaction": f"""
CREATE TABLE {table_prefix}_button_interaction_{period}_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_button_interaction_{period}/'
) AS
WITH button_clicks AS (
    SELECT
        attributes."resource.service.name" as service_name,
        attributes.action,
        attributes.menuName,
        attributes.page,
        COUNT(*) as total_clicks,
        COUNT(DISTINCT attributes.userKey) as unique_users,
        COUNT(DISTINCT attributes.sessionId) as unique_sessions
    FROM logall
    WHERE {month_filter}
        AND body = 'commerce.button.click'
        AND attributes.action IS NOT NULL
        {service_filter}
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
    ROUND(CAST(total_clicks AS DOUBLE) / NULLIF(unique_users, 0), 2) as avg_clicks_per_user,
    '{period_label}' as period,
    DATE '{execution_date}' as calculation_date
FROM button_clicks
ORDER BY service_name, total_clicks DESC
LIMIT 50
        """,
        "product_ranking": f"""
CREATE TABLE {table_prefix}_product_ranking_{period}_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_product_ranking_{period}/'
) AS
WITH product_stats AS (
    SELECT
        attributes."resource.service.name" as service_name,
        attributes.productName,
        COALESCE(attributes.category, attributes.ctgnm) as category,
        attributes.sellerNm,
        COALESCE(attributes.source, 'unknown') as source,
        COUNT(*) as cart_add_count,
        COUNT(DISTINCT attributes.userKey) as unique_users,
        COUNT(DISTINCT attributes.sessionId) as unique_sessions,
        SUM(TRY_CAST(attributes.quantity AS INTEGER)) as total_quantity,
        ROUND(AVG(TRY_CAST(COALESCE(attributes.salePrice, attributes.price) AS DOUBLE)), 2) as avg_sale_price,
        ROUND(SUM(TRY_CAST(attributes.quantity AS INTEGER) * TRY_CAST(COALESCE(attributes.salePrice, attributes.price) AS DOUBLE)), 2) as total_cart_value
    FROM logall
    WHERE {month_filter}
        AND body = 'commerce.cart.add'
        AND attributes.productName IS NOT NULL
        {service_filter}
    GROUP BY 
        attributes."resource.service.name", 
        attributes.productName, 
        COALESCE(attributes.category, attributes.ctgnm), 
        attributes.sellerNm,
        COALESCE(attributes.source, 'unknown')
)
SELECT
    service_name,
    productName,
    category,
    sellerNm,
    source,
    cart_add_count,
    unique_users,
    unique_sessions,
    total_quantity,
    avg_sale_price,
    total_cart_value,
    ROUND(CAST(cart_add_count AS DOUBLE) / NULLIF(unique_users, 0), 2) as avg_adds_per_user,
    '{period_label}' as period,
    DATE '{execution_date}' as calculation_date
FROM product_stats
ORDER BY service_name, cart_add_count DESC
LIMIT 100
        """,
        "search_analytics": f"""
CREATE TABLE {table_prefix}_search_analytics_{period}_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_search_analytics_{period}/'
) AS
WITH search_events AS (
    SELECT
        attributes."resource.service.name" as service_name,
        attributes.query as searchQuery,
        attributes.sessionId
    FROM logall
    WHERE {month_filter}
        AND body = 'commerce.search'
        AND attributes.query IS NOT NULL
        {service_filter}
),
search_clicks AS (
    SELECT
        attributes."resource.service.name" as service_name,
        attributes.sessionId
    FROM logall
    WHERE {month_filter}
        AND body = 'commerce.search.result_click'
        AND attributes.sessionId IS NOT NULL
        {service_filter}
),
search_stats AS (
    SELECT
        se.service_name,
        se.searchQuery,
        COUNT(DISTINCT se.sessionId) as search_count,
        COUNT(DISTINCT sc.sessionId) as click_count
    FROM search_events se
    LEFT JOIN search_clicks sc 
        ON se.service_name = sc.service_name 
        AND se.sessionId = sc.sessionId
    GROUP BY se.service_name, se.searchQuery
)
SELECT
    service_name,
    searchQuery,
    search_count,
    click_count,
    ROUND(CAST(click_count AS DOUBLE) * 100.0 / NULLIF(search_count, 0), 2) as click_through_rate,
    '{period_label}' as period,
    DATE '{execution_date}' as calculation_date
FROM search_stats
ORDER BY service_name, search_count DESC
LIMIT 200
        """,
        "category_performance": f"""
CREATE TABLE {table_prefix}_category_performance_{period}_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_category_performance_{period}/'
) AS
SELECT
    attributes."resource.service.name" as service_name,
    COALESCE(attributes.category, attributes.ctgnm, 'Uncategorized') as category,
    COUNT(*) as cart_add_count,
    COUNT(DISTINCT attributes.userKey) as unique_users,
    COUNT(DISTINCT attributes.productName) as unique_products,
    SUM(TRY_CAST(attributes.quantity AS INTEGER)) as total_quantity,
    ROUND(AVG(TRY_CAST(COALESCE(attributes.salePrice, attributes.price) AS DOUBLE)), 2) as avg_price,
    ROUND(SUM(TRY_CAST(attributes.quantity AS INTEGER) * TRY_CAST(COALESCE(attributes.salePrice, attributes.price) AS DOUBLE)), 2) as total_value,
    '{period_label}' as period,
    DATE '{execution_date}' as calculation_date
FROM logall
WHERE {month_filter}
    AND body = 'commerce.cart.add'
    {service_filter}
GROUP BY 
    attributes."resource.service.name", 
    COALESCE(attributes.category, attributes.ctgnm, 'Uncategorized')
ORDER BY service_name, cart_add_count DESC
LIMIT 30
        """,
        "hourly_traffic": f"""
CREATE TABLE {table_prefix}_hourly_traffic_{period}_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_hourly_traffic_{period}/'
) AS
WITH hourly_sessions AS (
    SELECT
        attributes."resource.service.name" as service_name,
        hour,
        COUNT(DISTINCT attributes.sessionId) as sessions,
        COUNT(DISTINCT attributes.userKey) as unique_users
    FROM logall
    WHERE {month_filter}
        AND body = 'commerce.session.start'
        {service_filter}
    GROUP BY attributes."resource.service.name", hour
),
hourly_carts AS (
    SELECT
        attributes."resource.service.name" as service_name,
        hour,
        COUNT(*) as cart_adds,
        COUNT(DISTINCT attributes.userKey) as cart_users
    FROM logall
    WHERE {month_filter}
        AND body = 'commerce.cart.add'
        {service_filter}
    GROUP BY attributes."resource.service.name", hour
)
SELECT
    hs.service_name,
    hs.hour,
    hs.sessions,
    hs.unique_users,
    COALESCE(hc.cart_adds, 0) as cart_adds,
    COALESCE(hc.cart_users, 0) as cart_users,
    ROUND(CAST(COALESCE(hc.cart_adds, 0) AS DOUBLE) * 100.0 / NULLIF(hs.sessions, 0), 2) as cart_conversion_rate,
    '{period_label}' as period,
    DATE '{execution_date}' as calculation_date
FROM hourly_sessions hs
LEFT JOIN hourly_carts hc ON hs.service_name = hc.service_name AND hs.hour = hc.hour
ORDER BY hs.service_name, hs.hour
        """,
        "purchase_analytics": f"""
CREATE TABLE {table_prefix}_purchase_analytics_{period}_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_purchase_analytics_{period}/'
) AS
SELECT
    attributes."resource.service.name" as service_name,
    CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as purchase_date,
    COUNT(*) as total_purchases,
    COUNT(DISTINCT attributes.userKey) as unique_purchasers,
    COUNT(DISTINCT attributes.sessionId) as unique_sessions,
    CAST(NULL AS DOUBLE) as total_revenue,
    CAST(NULL AS DOUBLE) as avg_order_value,
    ROUND(CAST(COUNT(*) AS DOUBLE) / NULLIF(COUNT(DISTINCT attributes.userKey), 0), 2) as purchases_per_user,
    '{period_label}' as period,
    DATE '{execution_date}' as calculation_date
FROM logall
WHERE {month_filter}
    AND body = 'commerce.checkout.purchase'
    {service_filter}
GROUP BY attributes."resource.service.name", year, month, day
ORDER BY service_name, purchase_date
        """,
        "navigation_flow": f"""
CREATE TABLE {table_prefix}_navigation_flow_{period}_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_navigation_flow_{period}/'
) AS
WITH routing_events AS (
    SELECT
        attributes."resource.service.name" as service_name,
        attributes.path,
        COUNT(*) as page_view_count,
        COUNT(DISTINCT attributes.userKey) as unique_users,
        COUNT(DISTINCT attributes.sessionId) as unique_sessions
    FROM logall
    WHERE {month_filter}
        AND body = 'Routing in client side'
        AND attributes.path IS NOT NULL
        {service_filter}
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
    '{period_label}' as period,
    DATE '{execution_date}' as calculation_date
FROM routing_events
ORDER BY service_name, page_view_count DESC
LIMIT 100
        """,
        "cart_source_analytics": f"""
CREATE TABLE {table_prefix}_cart_source_analytics_{period}_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_cart_source_analytics_{period}/'
) AS
WITH source_stats AS (
    SELECT
        attributes."resource.service.name" as service_name,
        COALESCE(attributes.source, 'unknown') as source,
        COUNT(*) as cart_add_count,
        COUNT(DISTINCT attributes.userKey) as unique_users,
        COUNT(DISTINCT attributes.sessionId) as unique_sessions,
        COUNT(DISTINCT attributes.productName) as unique_products,
        SUM(TRY_CAST(attributes.quantity AS INTEGER)) as total_quantity,
        ROUND(AVG(TRY_CAST(COALESCE(attributes.salePrice, attributes.price) AS DOUBLE)), 2) as avg_price,
        ROUND(SUM(TRY_CAST(attributes.quantity AS INTEGER) * TRY_CAST(COALESCE(attributes.salePrice, attributes.price) AS DOUBLE)), 2) as total_cart_value
    FROM logall
    WHERE {month_filter}
        AND body = 'commerce.cart.add'
        {service_filter}
    GROUP BY 
        attributes."resource.service.name",
        COALESCE(attributes.source, 'unknown')
),
total_counts AS (
    SELECT
        service_name,
        SUM(cart_add_count) as total_adds,
        SUM(unique_users) as total_users
    FROM source_stats
    GROUP BY service_name
)
SELECT
    ss.service_name,
    ss.source,
    ss.cart_add_count,
    ss.unique_users,
    ss.unique_sessions,
    ss.unique_products,
    ss.total_quantity,
    ss.avg_price,
    ss.total_cart_value,
    ROUND(CAST(ss.cart_add_count AS DOUBLE) * 100.0 / NULLIF(tc.total_adds, 0), 2) as source_percentage,
    ROUND(CAST(ss.cart_add_count AS DOUBLE) / NULLIF(ss.unique_users, 0), 2) as avg_adds_per_user,
    '{period_label}' as period,
    DATE '{execution_date}' as calculation_date
FROM source_stats ss
JOIN total_counts tc ON ss.service_name = tc.service_name
ORDER BY ss.service_name, ss.cart_add_count DESC
        """,
    }

    return queries[query_type]
