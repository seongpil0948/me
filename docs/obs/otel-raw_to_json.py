import json
import boto3
import gzip
import urllib.parse
from datetime import datetime, timedelta
import uuid
import re
import os
import logging
import traceback
from botocore.exceptions import ClientError

# 로깅 설정
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# 환경 변수 설정
OUTPUT_PREFIX = os.environ.get("OUTPUT_PREFIX", "logs/onpremise/all/")
OTEL_LOG_PREFIX = os.environ.get("OTEL_LOG_PREFIX", "logs/raw/otel/")
TARGET_BUCKET = os.environ.get("TARGET_BUCKET", "theshop-lake")  # 대상 버킷 이름
DEFAULT_CONTENT_TYPE = "application/x-ndjson"
MAX_RETRY_COUNT = 3
SCAN_WINDOW_DAYS = int(
    os.environ.get("SCAN_WINDOW_DAYS", "1")
)  # 기본적으로 당일 파일만 스캔
MAX_FILES_PER_RUN = int(
    os.environ.get("MAX_FILES_PER_RUN", "10")
)  # 한 번에 처리할 최대 파일 수

# AWS 클라이언트 초기화
s3_client = boto3.client("s3")


class ProcessingError(Exception):
    """로그 처리 중 발생한 오류를 표시하기 위한 사용자 정의 예외"""

    pass


def lambda_handler(event, context):
    """
    Lambda 핸들러 함수 - 이벤트 처리 및 미처리 파일 스캔
    1. 주어진 이벤트의 S3 객체 처리
    2. 미처리된 파일도 함께 검색하여 처리
    """
    logger.info(f"이벤트 수신 - {json.dumps(event)}")
    results = {"processed_events": 0, "processed_backlog": 0, "failed": 0}

    try:
        # 이벤트에서 S3 정보 추출 및 처리
        if (
            event.get("source") == "aws.s3"
            and event.get("detail-type") == "Object Created"
        ):
            # 이벤트 세부 정보 파싱
            detail = event.get("detail", {})
            bucket = detail.get("bucket", {}).get("name")
            key = detail.get("object", {}).get("key")

            if not bucket or not key:
                logger.warning("버킷 또는 키 정보가 없습니다.")
                return {"statusCode": 400, "body": json.dumps("버킷 또는 키 정보 누락")}

            # URL 디코딩
            key = urllib.parse.unquote_plus(key)
            logger.info(f"이벤트 S3 객체 처리 중: s3://{bucket}/{key}")

            # OTEL 로그 파일 확인
            if not is_otel_log(key):
                logger.info(f"OTEL 로그 파일이 아님, 건너뜀: {key}")
            else:
                # 이벤트 대상 파일 처리
                try:
                    process_file(bucket, key)
                    delete_from_s3(bucket, key)
                    logger.info(f"이벤트 파일 처리 및 삭제 성공: {key}")
                    results["processed_events"] += 1
                except Exception as e:
                    results["failed"] += 1
                    logger.error(f"이벤트 파일 처리 실패: {key}, 오류: {str(e)}")
        else:
            logger.info("S3 객체 생성 이벤트가 아니므로 미처리 파일만 검색합니다.")

        # 미처리 파일 검색 및 처리
        logger.info(f"미처리 파일 검색 및 처리 시작 (최대 {MAX_FILES_PER_RUN}개)")

        # 미처리 파일 검색 (제한된 개수만)
        unprocessed_files = find_unprocessed_files(
            TARGET_BUCKET, SCAN_WINDOW_DAYS, MAX_FILES_PER_RUN
        )

        if not unprocessed_files:
            logger.info("미처리 파일이 없습니다.")
        else:
            logger.info(f"미처리 파일 {len(unprocessed_files)}개를 발견했습니다.")

            # 발견된 파일 처리
            for key in unprocessed_files:
                try:
                    logger.info(f"미처리 파일 처리 중: {key}")
                    process_file(TARGET_BUCKET, key)
                    delete_from_s3(TARGET_BUCKET, key)
                    results["processed_backlog"] += 1
                    logger.info(f"미처리 파일 처리 및 삭제 성공: {key}")
                except Exception as e:
                    results["failed"] += 1
                    logger.error(f"미처리 파일 처리 실패: {key}, 오류: {str(e)}")
                    continue

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "처리 완료", "results": results}),
        }

    except Exception as e:
        logger.error(f"Lambda 실행 중 예상치 못한 오류: {str(e)}")
        logger.error(traceback.format_exc())
        raise


def find_unprocessed_files(bucket, days=1, max_files=10):
    """
    지정된 기간 내의 미처리 OTEL 로그 파일 검색
    max_files: 최대 반환할 파일 수
    """
    unprocessed_files = []

    # 현재 날짜부터 지정된 일수만큼 과거로 검색
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)

    logger.info(
        f"{start_date.strftime('%Y-%m-%d')}부터 {end_date.strftime('%Y-%m-%d')}까지의 파일 검색"
    )

    # 각 날짜에 대해 파티션 경로 생성 및 검색
    current_date = start_date
    while current_date <= end_date and len(unprocessed_files) < max_files:
        year = current_date.year
        month = f"{current_date.month:02d}"
        day = f"{current_date.day:02d}"

        # 파티션 경로 구성
        prefix = f"{OTEL_LOG_PREFIX}year={year}/month={month}/day={day}/"

        try:
            # S3 리스팅 페이지네이션 처리
            paginator = s3_client.get_paginator("list_objects_v2")
            page_iterator = paginator.paginate(Bucket=bucket, Prefix=prefix)

            for page in page_iterator:
                if "Contents" in page:
                    for obj in page["Contents"]:
                        key = obj["Key"]
                        # 로그 파일만 처리하고 최대 파일 수 제한
                        if (key.endswith(".json") or key.endswith(".json.gz")) and len(
                            unprocessed_files
                        ) < max_files:
                            unprocessed_files.append(key)

                        # 최대 파일 수에 도달하면 검색 중단
                        if len(unprocessed_files) >= max_files:
                            break

                # 최대 파일 수에 도달하면 페이지네이션 중단
                if len(unprocessed_files) >= max_files:
                    break

        except ClientError as e:
            logger.error(f"S3 리스팅 오류: {str(e)}")

        # 다음 날짜로 이동
        current_date += timedelta(days=1)

    logger.info(f"총 {len(unprocessed_files)}개의 미처리 파일을 발견했습니다.")
    return unprocessed_files


def process_file(bucket, key):
    """S3 파일 처리 및 변환"""
    retry_count = 0

    while retry_count < MAX_RETRY_COUNT:
        try:
            # S3에서 로그 파일 다운로드
            content = download_from_s3(bucket, key)

            # 필요한 경우 압축 해제
            if key.endswith(".gz"):
                content = gzip.decompress(content)

            # 파일 내용을 텍스트로 변환
            log_content = content.decode("utf-8")

            # OTEL 로그를 ndjson 형식으로 변환
            transformed_logs = transform_otel_to_ndjson(log_content)

            if not transformed_logs:
                logger.warning(f"유효한 로그가 없음: {key}")
                return

            # 파티션 정보 추출
            timestamp_info = extract_timestamp(log_content, key)

            # 대상 경로 구성 및 저장
            output_key = generate_output_key(timestamp_info)
            save_to_s3(bucket, output_key, transformed_logs)

            logger.info(f"변환된 로그가 저장됨: s3://{bucket}/{output_key}")
            return

        except ClientError as e:
            retry_count += 1
            error_code = e.response.get("Error", {}).get("Code", "")

            if error_code in ["SlowDown", "InternalError", "ServiceUnavailable"]:
                logger.warning(
                    f"재시도 가능한 S3 오류 발생, 재시도 {retry_count}/{MAX_RETRY_COUNT}: {str(e)}"
                )
                if retry_count < MAX_RETRY_COUNT:
                    # 타임아웃 15초를 고려한 백오프 설정
                    import time

                    time.sleep(2**retry_count)  # 2s, 4s, 8s
                    continue

            # 재시도 불가능한 오류 또는 최대 재시도 횟수 초과
            logger.error(f"S3 작업 실패: {str(e)}")
            raise ProcessingError(f"S3 작업 실패: {str(e)}")

        except Exception as e:
            logger.error(f"파일 처리 중 오류 발생: {str(e)}")
            logger.error(traceback.format_exc())
            raise ProcessingError(f"파일 처리 오류: {str(e)}")

    # 최대 재시도 횟수 초과
    raise ProcessingError(f"최대 재시도 횟수({MAX_RETRY_COUNT})를 초과했습니다.")


def download_from_s3(bucket, key):
    """S3에서 파일 다운로드"""
    try:
        response = s3_client.get_object(Bucket=bucket, Key=key)
        return response["Body"].read()
    except ClientError as e:
        if e.response["Error"]["Code"] == "NoSuchKey":
            raise ProcessingError(f"파일을 찾을 수 없음: {key}")
        raise


def save_to_s3(bucket, key, transformed_logs):
    """변환된 로그를 S3에 저장"""
    try:
        s3_client.put_object(
            Bucket=bucket,
            Key=key,
            Body="\n".join(transformed_logs),
            ContentType=DEFAULT_CONTENT_TYPE,
        )
    except ClientError as e:
        logger.error(f"S3 저장 실패: {str(e)}")
        raise ProcessingError(f"S3 저장 실패: {str(e)}")


def delete_from_s3(bucket, key):
    """S3에서 원본 파일 삭제"""
    try:
        s3_client.delete_object(Bucket=bucket, Key=key)
        logger.info(f"원본 파일 삭제 성공: s3://{bucket}/{key}")
    except ClientError as e:
        logger.error(f"S3 파일 삭제 실패: {str(e)}")
        raise ProcessingError(f"S3 파일 삭제 실패: {str(e)}")


def is_otel_log(key):
    """OTEL 로그 경로인지 확인"""
    return "logs/raw/otel/" in key


def extract_timestamp(content, key):
    """타임스탬프 정보 추출 (로그 내용 또는 키에서)"""
    # 로그 내용에서 타임스탬프 추출 시도
    timestamp_info = extract_timestamp_from_otel(content)

    # 실패 시 파일 이름 또는 경로에서 추출 시도
    if not timestamp_info:
        timestamp_info = extract_timestamp_from_key(key)

    # 여전히 실패 시 현재 시간 사용
    if not timestamp_info:
        logger.warning(f"타임스탬프를 추출할 수 없음, 현재 시간 사용: {key}")
        now = datetime.utcnow()
        timestamp_info = (
            str(now.year),
            f"{now.month:02d}",
            f"{now.day:02d}",
            f"{now.hour:02d}",
            f"{now.minute:02d}",
        )

    return timestamp_info


def extract_timestamp_from_key(key):
    """파일 키에서 타임스탬프 정보 추출"""
    # year=YYYY/month=MM/day=DD/hour=HH/minute=MM 패턴 검색
    pattern = r"year=(\d{4})/month=(\d{2})/day=(\d{2})/hour=(\d{2})/minute=(\d{2})"
    match = re.search(pattern, key)
    if match:
        return match.groups()

    # logs_YYYYMMDDHHMM 패턴 검색
    pattern = r"logs_(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})"
    match = re.search(pattern, key)
    if match:
        return match.groups()

    return None


def extract_timestamp_from_otel(content):
    """OTEL 로그 내용에서 타임스탬프 추출"""
    try:
        log_json = json.loads(content)

        if (
            "resourceLogs" in log_json
            and log_json["resourceLogs"]
            and "scopeLogs" in log_json["resourceLogs"][0]
        ):
            scope_logs = log_json["resourceLogs"][0]["scopeLogs"]
            if scope_logs and "logRecords" in scope_logs[0]:
                log_records = scope_logs[0]["logRecords"]
                if log_records and "timeUnixNano" in log_records[0]:
                    # Unix Nano 타임스탬프를 datetime으로 변환
                    unix_nano = int(log_records[0]["timeUnixNano"])
                    ts = datetime.fromtimestamp(unix_nano / 1_000_000_000)
                    return (
                        str(ts.year),
                        f"{ts.month:02d}",
                        f"{ts.day:02d}",
                        f"{ts.hour:02d}",
                        f"{ts.minute:02d}",
                    )
    except (json.JSONDecodeError, KeyError, IndexError, ValueError) as e:
        logger.warning(f"OTEL 내용에서 타임스탬프 추출 오류: {e}")
    except Exception as e:
        logger.warning(f"OTEL 내용에서 타임스탬프 추출 중 예상치 못한 오류: {e}")

    return None


def generate_output_key(timestamp_info):
    """출력 파일 경로 생성"""
    year, month, day, hour, minute = timestamp_info
    output_path = f"{OUTPUT_PREFIX}year={year}/month={month}/day={day}/hour={hour}/minute={minute}/"
    output_filename = f"logs_{year}{month}{day}{hour}{minute}_{uuid.uuid4().hex}.ndjson"
    return f"{output_path}{output_filename}"


def transform_otel_to_ndjson(content):
    """OTEL 로그를 ndjson 형식으로 변환"""
    transformed_logs = []

    try:
        log_json = json.loads(content)

        if "resourceLogs" not in log_json:
            logger.warning("resourceLogs 필드가 없음")
            return transformed_logs

        for resource_log in log_json.get("resourceLogs", []):
            # 리소스 레벨 속성 추출
            resource_attrs = extract_resource_attributes(resource_log)

            # 스코프 로그 처리
            for scope_log in resource_log.get("scopeLogs", []):
                # 스코프 레벨 속성 추출
                scope_attrs = extract_scope_attributes(scope_log)

                # 로그 레코드 처리
                for log_record in scope_log.get("logRecords", []):
                    try:
                        # 로그 변환
                        transformed_log = transform_log_record(
                            log_record, resource_attrs, scope_attrs
                        )
                        transformed_logs.append(json.dumps(transformed_log))
                    except Exception as e:
                        logger.warning(f"로그 레코드 변환 실패: {str(e)}")
                        continue

    except json.JSONDecodeError as e:
        logger.error(f"JSON 파싱 오류: {str(e)}")
        raise ProcessingError("유효하지 않은 JSON 형식")
    except Exception as e:
        logger.error(f"OTEL 로그 변환 오류: {str(e)}")
        logger.error(traceback.format_exc())
        raise ProcessingError(f"로그 변환 오류: {str(e)}")

    return transformed_logs


def extract_resource_attributes(resource_log):
    """리소스 레벨 속성 추출"""
    resource_attrs = {}

    if "resource" in resource_log and "attributes" in resource_log["resource"]:
        for attr in resource_log["resource"]["attributes"]:
            try:
                key = attr.get("key", "")
                if not key:
                    continue

                value = extract_attribute_value(attr.get("value", {}))
                if value is not None:
                    resource_attrs[key] = value
            except Exception as e:
                logger.warning(f"리소스 속성 추출 오류: {str(e)}")

    return resource_attrs


def extract_scope_attributes(scope_log):
    """스코프 레벨 속성 추출"""
    scope_attrs = {}

    if "scope" in scope_log and "attributes" in scope_log["scope"]:
        for attr in scope_log["scope"]["attributes"]:
            try:
                key = attr.get("key", "")
                if not key:
                    continue

                # 배열 값 처리
                value = None
                if (
                    "value" in attr
                    and "arrayValue" in attr["value"]
                    and "values" in attr["value"]["arrayValue"]
                ):
                    values = []
                    for v in attr["value"]["arrayValue"]["values"]:
                        if "stringValue" in v:
                            values.append(v["stringValue"])
                    value = values

                if value is not None:
                    scope_attrs[key] = value
            except Exception as e:
                logger.warning(f"스코프 속성 추출 오류: {str(e)}")

    return scope_attrs


def extract_attribute_value(value_obj):
    """속성 값 객체에서 실제 값 추출"""
    if not value_obj:
        return None

    if "stringValue" in value_obj:
        return value_obj["stringValue"]
    elif "boolValue" in value_obj:
        return value_obj["boolValue"]
    elif "intValue" in value_obj:
        return value_obj["intValue"]
    elif "doubleValue" in value_obj:
        return value_obj["doubleValue"]

    return None


def transform_log_record(log_record, resource_attrs, scope_attrs=None):
    """로그 레코드를 표준 형식으로 변환"""
    # 기본 로그 필드 추출
    time_unix_nano = log_record.get("timeUnixNano", "")

    # ISO 타임스탬프로 변환
    timestamp = ""
    if time_unix_nano:
        try:
            unix_time_seconds = int(time_unix_nano) / 1_000_000_000
            timestamp = datetime.utcfromtimestamp(unix_time_seconds).isoformat() + "Z"
        except (ValueError, OverflowError) as e:
            logger.warning(f"타임스탬프 변환 오류: {str(e)}")
            timestamp = datetime.utcnow().isoformat() + "Z"
    else:
        timestamp = datetime.utcnow().isoformat() + "Z"

    body = ""
    if "body" in log_record:
        if isinstance(log_record["body"], dict) and "stringValue" in log_record["body"]:
            body = log_record["body"]["stringValue"]
        elif isinstance(log_record["body"], str):
            body = log_record["body"]

    severity_number = log_record.get("severityNumber")
    severity_text = log_record.get("severityText", "")
    trace_id = log_record.get("traceId", "")
    span_id = log_record.get("spanId", "")

    # 로그 레코드 속성 추출
    log_attrs = {}
    if "attributes" in log_record:
        for attr in log_record["attributes"]:
            try:
                key = attr.get("key", "")
                if not key:
                    continue

                value = extract_attribute_value(attr.get("value", {}))
                if value is not None:
                    log_attrs[key] = value
            except Exception as e:
                logger.warning(f"로그 속성 추출 오류: {str(e)}")

    # 리소스 속성 추가 (충돌 방지를 위해 접두사 추가)
    for key, value in resource_attrs.items():
        log_attrs[f"resource.{key}"] = value

    # 스코프 속성 추가 (있는 경우)
    if scope_attrs:
        for key, value in scope_attrs.items():
            log_attrs[f"scope.{key}"] = value

    # 표준 ndjson 형식으로 변환
    transformed_log = {
        "timestamp": timestamp,
        "severityNumber": severity_number,
        "severityText": severity_text,
        "body": body,
        "attributes": log_attrs,
    }

    # 선택적 필드 추가
    if trace_id:
        transformed_log["trace_id"] = trace_id
    if span_id:
        transformed_log["span_id"] = span_id

    return transformed_log
