-- =====================================================================
-- Data Extraction Queries for theshop-brand (대웅 & 알피스페이스)
-- Period: 2025-10-18 onwards (all data after 2025-10-18)
-- Service: theshop-brand
-- Sub-brands: 대웅 (dw.shop), 알피스페이스 (rp.shop)
-- Date: 2025-11-03
-- Updated: 2025-11-06 - Korean column names applied
--
-- 요청사항:
-- 1. 주 단위 UV
-- 2. 일일 브랜드관 내 [장바구니 담기] 클릭 수
-- 3. 일 단위 DAU
-- 4. 리텐션율 (유니크 유저 / 중복 유저 각각)
-- =====================================================================

-- =====================================================================
-- Query 1: Weekly UV (Unique Visitors) by Brand
-- Purpose: Count unique users per week separated by brand
-- Output: 주 시작 날짜, 주 종료 날짜, 브랜드명, 주간 고유 방문자, 집계 기간 내 일수
-- =====================================================================


WITH daily_users AS (
    SELECT 
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as date,
        attributes.userKey,
        CASE
            WHEN attributes.page LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.page LIKE '%rp.shop%' THEN '알피스페이스'
            WHEN attributes.referer LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.referer LIKE '%rp.shop%' THEN '알피스페이스'
            ELSE 'Unknown'
        END as brand_name
    FROM log_db.logall
    WHERE CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) >= DATE '2025-10-18'
        AND attributes."resource.service.name" = 'theshop-brand'
        AND attributes.userKey IS NOT NULL
        AND (
            attributes.page LIKE '%dw.shop%' OR
            attributes.page LIKE '%rp.shop%' OR
            attributes.referer LIKE '%dw.shop%' OR
            attributes.referer LIKE '%rp.shop%'
        )
    GROUP BY 
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE),
        attributes.userKey,
        CASE
            WHEN attributes.page LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.page LIKE '%rp.shop%' THEN '알피스페이스'
            WHEN attributes.referer LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.referer LIKE '%rp.shop%' THEN '알피스페이스'
            ELSE 'Unknown'
        END
),
weekly_data AS (
    SELECT
        date,
        userKey,
        brand_name,
        DATE_TRUNC('week', date) as week_start  -- Monday of the week
    FROM daily_users
)
SELECT 
    week_start AS '주 시작 날짜',
    DATE_ADD('day', 6, week_start) AS '주 종료 날짜',
    brand_name AS '브랜드명',
    COUNT(DISTINCT userKey) AS '주간 고유 방문자',
    COUNT(DISTINCT date) AS '집계 기간 내 일수'
FROM weekly_data
GROUP BY week_start, brand_name
ORDER BY week_start, brand_name;


-- =====================================================================
-- Query 2: Daily Cart Add Clicks (브랜드관 내 장바구니 담기) by Brand
-- Purpose: Count daily cart add events separated by brand
-- =====================================================================

SELECT 
    CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) AS '날짜',
    COUNT(*) AS '장바구니 담기 클릭 수',
    COUNT(DISTINCT attributes.userKey) AS '고유 사용자 수',
    COUNT(DISTINCT attributes.sessionId) AS '고유 세션 수'
FROM log_db.logall
WHERE ((year = '2025' AND month = '10' AND day >= '18')
    OR (year = '2025' AND month > '10')
    OR (year > '2025'))
    AND body = 'commerce.cart.add'
    AND attributes."resource.service.name" = 'theshop-brand'
GROUP BY 
    year, month, day
ORDER BY CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE);


-- =====================================================================
-- Query 3: Daily DAU (Daily Active Users) by Brand
-- Purpose: Count unique users per day based on session start events separated by brand
-- Output: 날짜, 브랜드명, 일일 활성 사용자 수, 세션 수, 사용자당 평균 세션 수
-- =====================================================================

SELECT 
    CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) AS '날짜',
    CASE
        WHEN attributes.page LIKE '%dw.shop%' THEN '대웅'
        WHEN attributes.page LIKE '%rp.shop%' THEN '알피스페이스'
        WHEN attributes.referer LIKE '%dw.shop%' THEN '대웅'
        WHEN attributes.referer LIKE '%rp.shop%' THEN '알피스페이스'
        ELSE 'Unknown'
    END AS '브랜드명',
    COUNT(DISTINCT attributes.userKey) AS '일일 활성 사용자 수',
    COUNT(DISTINCT attributes.sessionId) AS '세션 수',
    ROUND(CAST(COUNT(DISTINCT attributes.sessionId) AS DOUBLE) / NULLIF(COUNT(DISTINCT attributes.userKey), 0), 2) AS '사용자당 평균 세션 수'
FROM log_db.logall
WHERE ((year = '2025' AND month = '10' AND day >= '18')
    OR (year = '2025' AND month > '10')
    OR (year > '2025'))
    AND body = 'commerce.session.start'
    AND attributes."resource.service.name" = 'theshop-brand'
    AND attributes.userKey IS NOT NULL
    AND (
        attributes.page LIKE '%dw.shop%' OR
        attributes.page LIKE '%rp.shop%' OR
        attributes.referer LIKE '%dw.shop%' OR
        attributes.referer LIKE '%rp.shop%'
    )
GROUP BY 
    year, month, day,
    CASE
        WHEN attributes.page LIKE '%dw.shop%' THEN '대웅'
        WHEN attributes.page LIKE '%rp.shop%' THEN '알피스페이스'
        WHEN attributes.referer LIKE '%dw.shop%' THEN '대웅'
        WHEN attributes.referer LIKE '%rp.shop%' THEN '알피스페이스'
        ELSE 'Unknown'
    END
ORDER BY CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE), 
         CASE
             WHEN attributes.page LIKE '%dw.shop%' THEN '대웅'
             WHEN attributes.page LIKE '%rp.shop%' THEN '알피스페이스'
             WHEN attributes.referer LIKE '%dw.shop%' THEN '대웅'
             WHEN attributes.referer LIKE '%rp.shop%' THEN '알피스페이스'
             ELSE 'Unknown'
         END;


-- =====================================================================
-- Query 4-1: Retention Rate - Unique Users Only (중복 제거) by Brand
-- Purpose: Calculate D1, D3, D7 retention for unique users only separated by brand
-- Logic: 
--   - First visit date per user per brand (cohort date)
--   - Return on D+1, D+3, D+7 (unique users only)
-- Output: 첫 방문일, 브랜드명, 첫 방문 사용자 수, D+1/D+3/D+7 재방문 사용자 수, 재방문율(%)
-- =====================================================================

WITH first_visit AS (
    SELECT 
        attributes.userKey,
        CASE
            WHEN attributes.page LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.page LIKE '%rp.shop%' THEN '알피스페이스'
            WHEN attributes.referer LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.referer LIKE '%rp.shop%' THEN '알피스페이스'
            ELSE 'Unknown'
        END as brand_name,
        MIN(CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)) as first_date
    FROM log_db.logall
    WHERE ((year = '2025' AND month = '10' AND day >= '18')
        OR (year = '2025' AND month > '10')
        OR (year > '2025'))
        AND body = 'commerce.session.start'
        AND attributes."resource.service.name" = 'theshop-brand'
        AND attributes.userKey IS NOT NULL
        AND (
            attributes.page LIKE '%dw.shop%' OR
            attributes.page LIKE '%rp.shop%' OR
            attributes.referer LIKE '%dw.shop%' OR
            attributes.referer LIKE '%rp.shop%'
        )
    GROUP BY 
        attributes.userKey,
        CASE
            WHEN attributes.page LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.page LIKE '%rp.shop%' THEN '알피스페이스'
            WHEN attributes.referer LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.referer LIKE '%rp.shop%' THEN '알피스페이스'
            ELSE 'Unknown'
        END
),
user_activity AS (
    SELECT 
        attributes.userKey,
        CASE
            WHEN attributes.page LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.page LIKE '%rp.shop%' THEN '알피스페이스'
            WHEN attributes.referer LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.referer LIKE '%rp.shop%' THEN '알피스페이스'
            ELSE 'Unknown'
        END as brand_name,
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as activity_date
    FROM log_db.logall
    WHERE ((year = '2025' AND month = '10' AND day >= '18')
        OR (year = '2025' AND month > '10')
        OR (year > '2025'))
        AND body = 'commerce.session.start'
        AND attributes."resource.service.name" = 'theshop-brand'
        AND attributes.userKey IS NOT NULL
        AND (
            attributes.page LIKE '%dw.shop%' OR
            attributes.page LIKE '%rp.shop%' OR
            attributes.referer LIKE '%dw.shop%' OR
            attributes.referer LIKE '%rp.shop%'
        )
    GROUP BY 
        attributes.userKey,
        CASE
            WHEN attributes.page LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.page LIKE '%rp.shop%' THEN '알피스페이스'
            WHEN attributes.referer LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.referer LIKE '%rp.shop%' THEN '알피스페이스'
            ELSE 'Unknown'
        END,
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
),
retention_data AS (
    SELECT 
        fv.first_date as cohort_date,
        fv.brand_name,
        fv.userKey,
        MAX(CASE WHEN DATE_DIFF('day', fv.first_date, ua.activity_date) = 1 THEN 1 ELSE 0 END) as returned_d1,
        MAX(CASE WHEN DATE_DIFF('day', fv.first_date, ua.activity_date) = 3 THEN 1 ELSE 0 END) as returned_d3,
        MAX(CASE WHEN DATE_DIFF('day', fv.first_date, ua.activity_date) = 7 THEN 1 ELSE 0 END) as returned_d7
    FROM first_visit fv
    LEFT JOIN user_activity ua ON fv.userKey = ua.userKey AND fv.brand_name = ua.brand_name
    GROUP BY fv.first_date, fv.brand_name, fv.userKey
)
SELECT 
    cohort_date AS '첫 방문일',
    brand_name AS '브랜드명',
    COUNT(DISTINCT userKey) AS '첫 방문 사용자 수',
    SUM(returned_d1) AS 'D+1 재방문 사용자 수',
    SUM(returned_d3) AS 'D+3 재방문 사용자 수',
    SUM(returned_d7) AS 'D+7 재방문 사용자 수',
    ROUND(SUM(returned_d1) * 100.0 / NULLIF(COUNT(DISTINCT userKey), 0), 2) AS 'D+1 재방문율(%)',
    ROUND(SUM(returned_d3) * 100.0 / NULLIF(COUNT(DISTINCT userKey), 0), 2) AS 'D+3 재방문율(%)',
    ROUND(SUM(returned_d7) * 100.0 / NULLIF(COUNT(DISTINCT userKey), 0), 2) AS 'D+7 재방문율(%)'
FROM retention_data
GROUP BY cohort_date, brand_name
ORDER BY cohort_date, brand_name;


-- =====================================================================
-- Query 4-2: Retention Rate - All Users Including Duplicates (중복 포함) by Brand
-- Purpose: Calculate retention including users who visited multiple times separated by brand
-- Logic:
--   - Each visit creates a cohort entry per brand
--   - Return on D+1, D+3, D+7 (including duplicate visits)
-- Output: 방문일, 브랜드명, 총 방문 횟수, 고유 사용자 수, D+1/D+3/D+7 재방문 사용자/총 재방문 횟수, 사용자 재방문율(%)
-- =====================================================================

WITH all_visits AS (
    SELECT 
        attributes.userKey,
        CASE
            WHEN attributes.page LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.page LIKE '%rp.shop%' THEN '알피스페이스'
            WHEN attributes.referer LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.referer LIKE '%rp.shop%' THEN '알피스페이스'
            ELSE 'Unknown'
        END as brand_name,
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE) as visit_date,
        COUNT(*) as visit_count
    FROM log_db.logall
    WHERE ((year = '2025' AND month = '10' AND day >= '18')
        OR (year = '2025' AND month > '10')
        OR (year > '2025'))
        AND body = 'commerce.session.start'
        AND attributes."resource.service.name" = 'theshop-brand'
        AND attributes.userKey IS NOT NULL
        AND (
            attributes.page LIKE '%dw.shop%' OR
            attributes.page LIKE '%rp.shop%' OR
            attributes.referer LIKE '%dw.shop%' OR
            attributes.referer LIKE '%rp.shop%'
        )
    GROUP BY 
        attributes.userKey,
        CASE
            WHEN attributes.page LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.page LIKE '%rp.shop%' THEN '알피스페이스'
            WHEN attributes.referer LIKE '%dw.shop%' THEN '대웅'
            WHEN attributes.referer LIKE '%rp.shop%' THEN '알피스페이스'
            ELSE 'Unknown'
        END,
        CAST(year || '-' || LPAD(month, 2, '0') || '-' || LPAD(day, 2, '0') AS DATE)
),
return_visits AS (
    SELECT 
        v1.visit_date as cohort_date,
        v1.brand_name,
        v1.userKey,
        v1.visit_count as initial_visits,
        MAX(CASE WHEN DATE_DIFF('day', v1.visit_date, v2.visit_date) = 1 THEN v2.visit_count ELSE 0 END) as d1_returns,
        MAX(CASE WHEN DATE_DIFF('day', v1.visit_date, v2.visit_date) = 3 THEN v2.visit_count ELSE 0 END) as d3_returns,
        MAX(CASE WHEN DATE_DIFF('day', v1.visit_date, v2.visit_date) = 7 THEN v2.visit_count ELSE 0 END) as d7_returns
    FROM all_visits v1
    LEFT JOIN all_visits v2 ON v1.userKey = v2.userKey AND v1.brand_name = v2.brand_name
    GROUP BY v1.visit_date, v1.brand_name, v1.userKey, v1.visit_count
)
SELECT 
    cohort_date AS '방문일',
    brand_name AS '브랜드명',
    SUM(initial_visits) AS '총 방문 횟수',
    COUNT(DISTINCT userKey) AS '고유 사용자 수',
    SUM(CASE WHEN d1_returns > 0 THEN 1 ELSE 0 END) AS 'D+1 재방문한 사용자 수',
    SUM(CASE WHEN d3_returns > 0 THEN 1 ELSE 0 END) AS 'D+3 재방문한 사용자 수',
    SUM(CASE WHEN d7_returns > 0 THEN 1 ELSE 0 END) AS 'D+7 재방문한 사용자 수',
    SUM(d1_returns) AS 'D+1 총 재방문 횟수',
    SUM(d3_returns) AS 'D+3 총 재방문 횟수',
    SUM(d7_returns) AS 'D+7 총 재방문 횟수',
    ROUND(SUM(CASE WHEN d1_returns > 0 THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(DISTINCT userKey), 0), 2) AS 'D+1 사용자 재방문율(%)',
    ROUND(SUM(CASE WHEN d3_returns > 0 THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(DISTINCT userKey), 0), 2) AS 'D+3 사용자 재방문율(%)',
    ROUND(SUM(CASE WHEN d7_returns > 0 THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(DISTINCT userKey), 0), 2) AS 'D+7 사용자 재방문율(%)'
FROM return_visits
GROUP BY cohort_date, brand_name
ORDER BY cohort_date, brand_name;


-- =====================================================================
-- USAGE INSTRUCTIONS
-- =====================================================================
-- 1. Athena 콘솔에서 각 쿼리를 개별적으로 실행하세요
-- 2. 각 쿼리 실행 후 "Download results" 버튼을 클릭하여 CSV 다운로드
-- 3. CSV 파일을 Excel에서 열어서 확인
-- 4. 여러 시트로 구성된 Excel 파일로 통합하려면:
--    - Excel에서 새 통합문서 생성
--    - 각 CSV를 별도 시트로 Import
--    - 시트 이름: "Weekly UV", "Daily Cart Add", "Daily DAU", 
--                  "Retention (Unique)", "Retention (All)"
--
-- Query Execution Order:
-- 1. Weekly UV (Query 1)
-- 2. Daily Cart Add (Query 2) 
-- 3. Daily DAU (Query 3)
-- 4. Retention - Unique Users (Query 4-1)
-- 5. Retention - All Users (Query 4-2)
--
-- Expected Data Volume:
-- - Period: 2025-10-18 onwards (all available data)
-- - Weekly UV: Multiple weeks with brand separation (대웅, 알피스페이스)
-- - Daily metrics: Each row per day per brand
-- - Retention: Each cohort date per brand
--
-- Brand Identification Logic:
-- - 대웅: attributes.page or attributes.referer contains 'dw.shop'
-- - 알피스페이스: attributes.page or attributes.referer contains 'rp.shop'
-- - Unknown: Does not match any brand pattern (should be minimal)
--
-- Key Changes from Original:
-- 1. All queries now include brand_name column
-- 2. Date filter changed from BETWEEN to >= DATE '2025-10-18'
-- 3. Added brand filtering logic using page/referer attributes
-- 4. Retention queries track users separately per brand
-- 5. All column names translated to Korean (2025-11-06 update)
-- =====================================================================
