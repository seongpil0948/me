"""
AWS Lambda Function: Athena Query Builder for OTEL Analytics
Generates dynamic Athena CTAS queries with S3 cleanup and multi-service support
"""

import json
from datetime import UTC, datetime
from typing import Any
from urllib.parse import urlparse

import boto3

s3_client = boto3.client("s3")

# S3 delete batch size limit
S3_DELETE_BATCH_SIZE = 1000

# Data quality filter - skip corrupted partitions before this date
MIN_DATA_DATE = "2025-09-20"


def lambda_handler(event: dict[str, Any], _context: Any) -> dict[str, Any]:
    """
    Generate Athena CTAS queries dynamically with multi-service support

    Args:
        event: {
            "query_type": str,  # "mau", "dau", "retention", etc.
            "table_prefix": str,  # e.g., "theshop_brand"
            "s3_base": str,
            "service_names": list[str],  # e.g., ["theshop-brand", "theshop-pharmacy"]
            "execution_date": str (optional, defaults to today),
            "cleanup_s3": bool (optional, defaults to True)
        }

    Returns:
        {
            "query_string": str,
            "execution_date": str,
            "query_type": str,
            "service_names": list[str],
            "cleanup_result": dict (if cleanup was performed)
        }
    """
    query_type = event.get("query_type")
    table_prefix = event.get("table_prefix")
    s3_base = event.get("s3_base")
    service_names = event.get("service_names", [])
    cleanup_s3 = event.get("cleanup_s3", True)

    # Use provided execution_date or default to today
    execution_date = event.get("execution_date", datetime.now(UTC).strftime("%Y-%m-%d"))

    # Validate required parameters
    if not all([query_type, table_prefix, s3_base]):
        raise ValueError("Missing required parameters: query_type, table_prefix, s3_base")
    
    # Type narrowing: at this point we know these are not None
    assert query_type is not None
    assert table_prefix is not None
    assert s3_base is not None

    if not service_names:
        raise ValueError("service_names list is required and cannot be empty")

    # Query type to table name mapping
    table_suffix_map = {
        "mau": "mau",
        "dau": "dau",
        "retention": "retention",
        "conversion": "conversion",
        "user_cohort": "user_cohort",
        "session_metrics": "session_metrics",
        "event_distribution": "event_distribution",
    }

    if query_type not in table_suffix_map:
        raise ValueError(f"Invalid query_type: {query_type}. Must be one of: {list(table_suffix_map.keys())}")

    # Get table suffix and S3 location
    table_suffix = table_suffix_map[query_type]
    s3_location = f"{s3_base}/{table_prefix}_{table_suffix}/"
    print(f"S3 location for {query_type}: {s3_location}")

    # Cleanup S3 data before creating new table
    cleanup_result = None
    if cleanup_s3:
        try:
            print(f"Starting S3 cleanup for {s3_location}")
            cleanup_result = cleanup_s3_location(s3_location)
        except Exception as e:
            print(f"Warning: S3 cleanup failed for {s3_location}: {e!s}")
            cleanup_result = {"status": "failed", "error": str(e), "location": s3_location}

    # Generate query with service filtering
    query_string = generate_query(query_type, table_prefix, s3_base, execution_date, service_names)

    response = {
        "query_string": query_string.strip(),
        "execution_date": execution_date,
        "query_type": query_type,
        "s3_location": s3_location,
        "service_names": service_names,
    }

    if cleanup_result:
        response["cleanup_result"] = cleanup_result

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

    print(f"Cleaning up S3 location: s3://{bucket}/{prefix}")

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
                    deleted_count += len(response.get("Deleted", []))
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

        print(f"Cleanup completed: {json.dumps(result)}")
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


def generate_query(
    query_type: str, 
    table_prefix: str, 
    s3_base: str, 
    execution_date: str,
    service_names: list[str]
) -> str:
    """
    Generate Athena CTAS query based on query type with multi-service support

    Args:
        query_type: Type of query to generate
        table_prefix: Prefix for table name (e.g., "theshop_brand")
        s3_base: Base S3 location
        execution_date: Execution date for the query
        service_names: List of service names to filter

    Returns:
        Generated SQL query string
    """
    service_filter = build_service_filter(service_names)
    
    queries = {
        "mau": f"""
CREATE TABLE {table_prefix}_mau_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_mau/'
) AS
SELECT
    attributes."resource.service.name" as service_name,
    year || '-' || LPAD(month, 2, '0') as year_month,
    year,
    month,
    COUNT(DISTINCT attributes.userKey) as monthly_active_users,
    COUNT(DISTINCT attributes.sessionId) as total_sessions,
    COUNT(*) as total_events,
    DATE '{execution_date}' as execution_date
FROM logall
WHERE year = CAST(YEAR(DATE '{execution_date}') AS VARCHAR)
    AND CAST(year || '-' || LPAD(month, 2, '0') || '-01' AS DATE) >= DATE '{MIN_DATA_DATE}'
    AND body = 'commerce.session.start'
    AND attributes.userKey IS NOT NULL
    {service_filter}
GROUP BY attributes."resource.service.name", year, month
ORDER BY service_name, year, month
        """,
        "dau": f"""
CREATE TABLE {table_prefix}_dau_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_dau/'
) AS
SELECT
    attributes."resource.service.name" as service_name,
    CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as date,
    year,
    month,
    day,
    COUNT(DISTINCT attributes.userKey) as daily_active_users,
    COUNT(DISTINCT attributes.sessionId) as daily_sessions,
    COUNT(*) as daily_events,
    ROUND(COUNT(*) * 1.0 / NULLIF(COUNT(DISTINCT attributes.userKey), 0), 2) as events_per_user,
    DATE '{execution_date}' as execution_date
FROM logall
WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
    >= GREATEST(DATE '{execution_date}' - INTERVAL '90' DAY, DATE '{MIN_DATA_DATE}')
    AND body = 'commerce.session.start'
    AND attributes.userKey IS NOT NULL
    {service_filter}
GROUP BY attributes."resource.service.name", year, month, day
ORDER BY service_name, date
        """,
        "retention": f"""
CREATE TABLE {table_prefix}_retention_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_retention/'
) AS
WITH daily_users AS (
    SELECT
        attributes."resource.service.name" as service_name,
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as visit_date,
        attributes.userKey as user_key
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= GREATEST(DATE '{execution_date}' - INTERVAL '45' DAY, DATE '{MIN_DATA_DATE}')
        AND CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        < DATE '{execution_date}'
        AND body = 'commerce.session.start'
        AND attributes.userKey IS NOT NULL
        AND year IS NOT NULL
        AND month IS NOT NULL
        AND day IS NOT NULL
        {service_filter}
    GROUP BY attributes."resource.service.name", year, month, day, attributes.userKey
),
d1_retention AS (
    SELECT
        base.service_name,
        DATE '{execution_date}' - INTERVAL '2' DAY as calculation_date,
        'D+1' as retention_type,
        COUNT(DISTINCT base.user_key) as base_users,
        COUNT(DISTINCT CASE
            WHEN ret.user_key IS NOT NULL THEN base.user_key
        END) as retained_users
    FROM (
        SELECT DISTINCT service_name, user_key
        FROM daily_users
        WHERE visit_date = DATE '{execution_date}' - INTERVAL '2' DAY
    ) base
    LEFT JOIN (
        SELECT DISTINCT service_name, user_key
        FROM daily_users
        WHERE visit_date = DATE '{execution_date}' - INTERVAL '1' DAY
    ) ret ON base.user_key = ret.user_key AND base.service_name = ret.service_name
    GROUP BY base.service_name
),
d7_retention AS (
    SELECT
        base.service_name,
        DATE '{execution_date}' - INTERVAL '8' DAY as calculation_date,
        'D+7' as retention_type,
        COUNT(DISTINCT base.user_key) as base_users,
        COUNT(DISTINCT CASE
            WHEN ret.user_key IS NOT NULL THEN base.user_key
        END) as retained_users
    FROM (
        SELECT DISTINCT service_name, user_key
        FROM daily_users
        WHERE visit_date = DATE '{execution_date}' - INTERVAL '8' DAY
    ) base
    LEFT JOIN (
        SELECT DISTINCT service_name, user_key
        FROM daily_users
        WHERE visit_date = DATE '{execution_date}' - INTERVAL '1' DAY
    ) ret ON base.user_key = ret.user_key AND base.service_name = ret.service_name
    GROUP BY base.service_name
),
d30_retention AS (
    SELECT
        base.service_name,
        DATE '{execution_date}' - INTERVAL '31' DAY as calculation_date,
        'D+30' as retention_type,
        COUNT(DISTINCT base.user_key) as base_users,
        COUNT(DISTINCT CASE
            WHEN ret.user_key IS NOT NULL THEN base.user_key
        END) as retained_users
    FROM (
        SELECT DISTINCT service_name, user_key
        FROM daily_users
        WHERE visit_date = DATE '{execution_date}' - INTERVAL '31' DAY
    ) base
    LEFT JOIN (
        SELECT DISTINCT service_name, user_key
        FROM daily_users
        WHERE visit_date = DATE '{execution_date}' - INTERVAL '1' DAY
    ) ret ON base.user_key = ret.user_key AND base.service_name = ret.service_name
    GROUP BY base.service_name
)
SELECT
    all_retention.service_name,
    all_retention.retention_type,
    all_retention.base_users,
    all_retention.retained_users,
    ROUND(CAST(all_retention.retained_users AS DOUBLE) * 100.0 / NULLIF(all_retention.base_users, 0), 2) as retention_rate,
    all_retention.calculation_date,
    DATE '{execution_date}' as execution_date
FROM (
    SELECT * FROM d1_retention
    UNION ALL
    SELECT * FROM d7_retention
    UNION ALL
    SELECT * FROM d30_retention
) all_retention
WHERE all_retention.base_users > 0
ORDER BY all_retention.service_name, all_retention.calculation_date, all_retention.retention_type
        """,
        "conversion": f"""
CREATE TABLE {table_prefix}_conversion_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_conversion/'
) AS
WITH daily_data AS (
    SELECT
        attributes."resource.service.name" as service_name,
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as calculation_date,
        attributes.sessionId,
        attributes.userKey,
        body
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= GREATEST(DATE '{execution_date}' - INTERVAL '90' DAY, DATE '{MIN_DATA_DATE}')
        AND body IN ('commerce.session.start', 'commerce.cart.add', 'commerce.product.view')
        AND attributes.sessionId IS NOT NULL
        {service_filter}
    GROUP BY attributes."resource.service.name", year, month, day, attributes.sessionId, attributes.userKey, body
),
daily_metrics AS (
    SELECT
        service_name,
        calculation_date,
        COUNT(DISTINCT CASE WHEN body = 'commerce.session.start' THEN sessionId END) as total_sessions,
        COUNT(DISTINCT CASE WHEN body = 'commerce.product.view' THEN sessionId END) as product_view_sessions,
        COUNT(DISTINCT CASE WHEN body = 'commerce.cart.add' THEN sessionId END) as cart_add_sessions,
        COUNT(DISTINCT CASE WHEN body = 'commerce.session.start' THEN userKey END) as total_users,
        COUNT(DISTINCT CASE WHEN body = 'commerce.cart.add' THEN userKey END) as purchasing_users
    FROM daily_data
    GROUP BY service_name, calculation_date
)
SELECT
    service_name,
    calculation_date,
    total_sessions,
    product_view_sessions,
    cart_add_sessions,
    total_users,
    purchasing_users,
    ROUND(CAST(product_view_sessions AS DOUBLE) * 100.0 / NULLIF(total_sessions, 0), 2) as product_view_rate,
    ROUND(CAST(cart_add_sessions AS DOUBLE) * 100.0 / NULLIF(product_view_sessions, 0), 2) as cart_conversion_rate,
    ROUND(CAST(cart_add_sessions AS DOUBLE) * 100.0 / NULLIF(total_sessions, 0), 2) as overall_conversion_rate,
    ROUND(CAST(purchasing_users AS DOUBLE) * 100.0 / NULLIF(total_users, 0), 2) as user_conversion_rate,
    DATE '{execution_date}' as execution_date
FROM daily_metrics
ORDER BY service_name, calculation_date
        """,
        "user_cohort": f"""
CREATE TABLE {table_prefix}_user_cohort_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_user_cohort/'
) AS
WITH first_visit AS (
    SELECT
        attributes."resource.service.name" as service_name,
        attributes.userKey as user_key,
        MIN(CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)) as first_visit_date
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= GREATEST(DATE '{execution_date}' - INTERVAL '365' DAY, DATE '{MIN_DATA_DATE}')
        AND body = 'commerce.session.start'
        AND attributes.userKey IS NOT NULL
        {service_filter}
    GROUP BY attributes."resource.service.name", attributes.userKey
),
cohort_classification AS (
    SELECT
        service_name,
        user_key,
        first_visit_date,
        CASE
            WHEN first_visit_date >= DATE '{execution_date}' - INTERVAL '7' DAY THEN 'New (0-7d)'
            WHEN first_visit_date >= DATE '{execution_date}' - INTERVAL '30' DAY THEN 'Recent (8-30d)'
            WHEN first_visit_date >= DATE '{execution_date}' - INTERVAL '90' DAY THEN 'Active (31-90d)'
            ELSE 'Veteran (90d+)'
        END as cohort_type
    FROM first_visit
)
SELECT
    service_name,
    cohort_type,
    COUNT(DISTINCT user_key) as user_count,
    DATE '{execution_date}' as calculation_date
FROM cohort_classification
GROUP BY service_name, cohort_type
ORDER BY service_name,
    CASE cohort_type
        WHEN 'New (0-7d)' THEN 1
        WHEN 'Recent (8-30d)' THEN 2
        WHEN 'Active (31-90d)' THEN 3
        ELSE 4
    END
        """,
        "session_metrics": f"""
CREATE TABLE {table_prefix}_session_metrics_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_session_metrics/'
) AS
WITH daily_sessions AS (
    SELECT
        attributes."resource.service.name" as service_name,
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as calculation_date,
        attributes.sessionId,
        COUNT(*) as events_per_session,
        COUNT(DISTINCT body) as unique_event_types
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= GREATEST(DATE '{execution_date}' - INTERVAL '90' DAY, DATE '{MIN_DATA_DATE}')
        AND attributes.sessionId IS NOT NULL
        {service_filter}
    GROUP BY attributes."resource.service.name", year, month, day, attributes.sessionId
),
daily_metrics AS (
    SELECT
        service_name,
        calculation_date,
        COUNT(*) as total_sessions,
        ROUND(AVG(events_per_session), 2) as avg_events_per_session,
        ROUND(AVG(unique_event_types), 2) as avg_event_types_per_session,
        MAX(events_per_session) as max_events_per_session,
        APPROX_PERCENTILE(events_per_session, 0.5) as median_events_per_session,
        APPROX_PERCENTILE(events_per_session, 0.9) as p90_events_per_session
    FROM daily_sessions
    GROUP BY service_name, calculation_date
)
SELECT
    service_name,
    calculation_date,
    total_sessions,
    avg_events_per_session,
    avg_event_types_per_session,
    max_events_per_session,
    median_events_per_session,
    p90_events_per_session,
    DATE '{execution_date}' as execution_date
FROM daily_metrics
ORDER BY service_name, calculation_date
        """,
        "event_distribution": f"""
CREATE TABLE {table_prefix}_event_distribution_summary
WITH (
    format = 'PARQUET',
    external_location = '{s3_base}/{table_prefix}_event_distribution/'
) AS
WITH event_counts AS (
    SELECT
        attributes."resource.service.name" as service_name,
        body as event_type,
        COUNT(*) as event_count,
        COUNT(DISTINCT attributes.userKey) as unique_users,
        COUNT(DISTINCT attributes.sessionId) as unique_sessions
    FROM logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
        >= GREATEST(DATE '{execution_date}' - INTERVAL '7' DAY, DATE '{MIN_DATA_DATE}')
        AND body IS NOT NULL
        {service_filter}
    GROUP BY attributes."resource.service.name", body
),
service_totals AS (
    SELECT 
        service_name,
        SUM(event_count) as total_events
    FROM event_counts
    GROUP BY service_name
)
SELECT
    ec.service_name,
    ec.event_type,
    ec.event_count,
    ec.unique_users,
    ec.unique_sessions,
    ROUND(CAST(ec.event_count AS DOUBLE) * 100.0 / st.total_events, 2) as percentage_of_total,
    DATE '{execution_date}' as calculation_date
FROM event_counts ec
JOIN service_totals st ON ec.service_name = st.service_name
ORDER BY ec.service_name, ec.event_count DESC
        """,
    }

    return queries[query_type]
