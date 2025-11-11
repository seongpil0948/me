<div align="center">

# Monitoring Agent

서버(베어메탈 / VM) 환경에서 다중 컨테이너 & 다중 HTTP 엔드포인트의 가용성을 능동적으로 관찰하고  
(Observability) **자동 시정(Remediation)** 까지 수행하는 경량 Go 기반 에이전트입니다.

`cri-health-checker` + `http-health-checker` = 인프라 & 애플리케이션 계층 상태를 단일 OpenTelemetry 파이프라인으로 통합.

## 🆕 Auto-Instrumentation 기능

이 모니터링 에이전트는 **OpenTelemetry Auto-Instrumentation** 기능을 통해 다음 메트릭을 자동으로 수집합니다:

### 📊 자동 수집 메트릭

- **Runtime Metrics**: Go 런타임 메모리, GC, 고루틴 정보
- **Host Metrics**: 시스템 CPU, 메모리, 네트워크, 디스크 사용량
- **HTTP Instrumentation**: 모든 HTTP 요청/응답 자동 추적 (latency, status codes)
- **Application Metrics**: 시작 시간, 준비 상태, 종료 메트릭

### 🔧 Auto-Instrumentation 설정

Auto-instrumentation은 기본적으로 활성화되며, 다음과 같이 구성됩니다:

```go
// HTTP Health Checker & CRI Health Checker 공통 설정
common.StartAutoInstrumentation(context.Background(), common.AutoInstrumentationConfig{
    EnableRuntime:  true,              // Go 런타임 메트릭 수집
    EnableHost:     true,              // 시스템 메트릭 수집
    Interval:       10 * time.Second,  // 메트릭 수집 간격
    ServiceName:    "http-health-checker", // 서비스 이름
    ServiceVersion: "0.1.0",           // 서비스 버전
})
```

### 📈 수집되는 주요 메트릭들

#### Runtime Metrics (Go 런타임)

- `go_memstats_*`: 메모리 통계
- `go_gc_*`: GC 통계
- `go_goroutines`: 고루틴 수
- `go_threads`: 스레드 수

#### Host Metrics (시스템)

- `system_cpu_utilization`: CPU 사용률
- `system_memory_usage`: 메모리 사용량
- `system_network_io`: 네트워크 I/O
- `system_disk_io`: 디스크 I/O

#### Application Metrics (애플리케이션)

- `app_startup_duration`: 애플리케이션 시작 시간
- `app_ready`: 준비 상태 (1=ready, 0=not ready)
- `app_running`: 구동 상태 (1=running, 0=stopped)
- `app_shutdown_duration`: 종료 시간
- `app_shutdown_total`: 종료 횟수

#### HTTP Metrics (HTTP 요청)

- `http_client_duration`: HTTP 클라이언트 요청 시간
- `http_client_request_size`: 요청 크기
- `http_client_response_size`: 응답 크기

### 🎯 메트릭 확인 방법

이러한 메트릭들은 OpenTelemetry Collector를 통해 자동으로 전송되며, Grafana 등의 도구에서 확인할 수 있습니다:

```bash
# HTTP Health Checker 실행
./bin/http-health-checker -config configs/http-health-checker.yaml

# CRI Health Checker 실행
./bin/cri-health-checker -config configs/cri-health-checker.yaml
```

### 리포지토리 확장 역할 구성

| 영역                         | 디렉터리             | 스크립트/파일                                                               | 목적                                            | 특징                               |
| ---------------------------- | -------------------- | --------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------- |
| Core Health Check            | `cmd/`, `internal/`  | Go 소스                                                                     | 컨테이너 & HTTP 헬스 / Remediation              | 경량, OTEL First                   |
| Sonic 서비스 운영            | `sonic/`             | `ignite.sh`, `log-rotate.sh`, `LOG_ROTATE.md`, `otel-collector-config.yaml` | Sonic 도메인 Collector & 로그 로테이션          | Cron 기반, 서비스별 Resource 태깅  |
| Docker 로그 파이프라인       | `docker/`            | `README.md`                                                                 | Docker → Loki Driver → OTEL Collector → Backend | Loki Driver 옵션 & 파싱 파이프라인 |
| APISIX Gateway Observability | `apisix/`            | `ignite.sh`, `apisix-logs.sh`, `otel-collector-config.yaml`                 | Gateway 트래픽/로그 수집                        | 게이트웨이 전용 Metrics/Logs 채널  |
| Local Integration Stack      | `deployments/local/` | `docker-compose.yaml`, configs                                              | 로컬 통합 (Collector + Agent)                   | 빠른 재현 & 통합 테스트            |

위 구성으로 헬스체크/게이트웨이/서비스 전용 Collector/로그 운영을 단일 리포지토리에서 표준화합니다.

</div>

---

## 0. Getting Started (빠른 온보딩)

새 환경(로컬 개발 서버 혹은 베어메탈/VM)에 처음 설치/실행하는 전체 흐름을 10단계로 요약합니다.

### 0.1 사전 요구사항 (Prerequisites)

| 항목                    | 최소 버전/조건  | 비고                                |
| ----------------------- | --------------- | ----------------------------------- |
| Git                     | 2.x             | 리포지토리 클론 & 태그(SHA) 추출    |
| Go                      | 1.22+           | (선택) 로컬 개발/디버그 시 필요     |
| Docker                  | 20.x+           | 컨테이너 실행 & 이미지 빌드         |
| AWS CLI v2              | 최신            | ECR 로그인 / STS 계정 확인          |
| (선택) AWS SSO Profile  | 구성 완료       | 조직 SSO 사용하는 경우              |
| OpenTelemetry Collector | (Endpoint 준비) | OTLP gRPC 수신 포트 (기본 예: 4317) |

### 0.2 리포지토리 클론

```bash
git clone http://10.101.91.186:5001/ecommerceteam/msa/monitoring-agent
cd monitoring-agent
```

### 0.3 환경 변수 파일 (.env.local) 생성 (선택)

프로젝트 루트에 `.env.local` 을 두면 `Makefile` 에 자동 include 됩니다.

```bash
cat > .env.local <<'EOF'
# 선택: AWS 프로파일 (SSO / 자격증명 세션) 이름
AWS_PROFILE=your-sso-profile

# ECR 기본 계정/리전 (필요 시 override)
ACCOUNT_ID=725129837589
AWS_REGION=ap-northeast-2

# OTLP Collector Endpoint
OTEL_ENDPOINT=http://10.101.91.145:4317

# 추가 Resource Attributes (콤마 구분)
EXTRA_OTEL_ATTRS=team=platform,role=observer
EOF
```

### 0.4 설정(config) 파일 확보

기본 예시는 `configs/`에 존재. 운영/스테이징용 외부 디렉터리를 사용하고 싶다면 복사 후 수정:

```bash
mkdir -p /opt/agent-configs
cp configs/cri-health-checker.yaml /opt/agent-configs/
cp configs/http-health-checker.yaml /opt/agent-configs/
# 필요 시 편집
vi /opt/agent-configs/cri-health-checker.yaml
```

실행 시 `CONFIGS_DIR=/opt/agent-configs` 로 지정 가능.

### 0.5 AWS 인증 & ECR 로그인

1. 계정 확인

```bash
make whoami AWS_PROFILE=$AWS_PROFILE
```

2. ECR 로그인 (수동)

```bash
make ecr-login AWS_PROFILE=$AWS_PROFILE
```

자동 실행: `make run-cri` / `make run-http` 는 로컬에 이미지 없고 `AUTO_ECR_PULL=1` 일 때 ECR pull 을 시도합니다.

### 0.6 이미지 확보 (Pull 또는 Build)

옵션 A) 이미 CI가 푸시한 SHA 태그 사용 (추천)

```bash
export IMG_TAG=$(git rev-parse --short=12 HEAD)
make run-cri ENV=dev
```

옵션 B) 직접 빌드 후 로컬 테스트

```bash
make docker-build-cri docker-build-http
make run ENV=local
```

옵션 C) ECR에 최신 SHA 푸시 (테스트 환경)

```bash
make push-ecr ENV=dev AWS_PROFILE=$AWS_PROFILE
```

### 0.7 컨테이너 실행

CRI 단독:

```bash
make run-cri ENV=dev CONFIGS_DIR=/opt/agent-configs
```

HTTP 단독:

```bash
make run-http ENV=dev CONFIGS_DIR=/opt/agent-configs
```

둘 다:

```bash
make run ENV=dev CONFIGS_DIR=/opt/agent-configs
```

| 이미지 Pull 실패 (권한) | 잘못된 계정/리전 | `make whoami` 로 ACCOUNT_ID / REGION 재확인 |

---

## 1. 배경 (Problem Statement)

[SRE](https://aws.amazon.com/ko/what-is/sre/) 관점에서 더샵(사내) 인프라는 다음의 구조적 제약을 안고 있었습니다.

| 문제                        | 상세                                               | 기존 한계                               | 영향                               |
| --------------------------- | -------------------------------------------------- | --------------------------------------- | ---------------------------------- |
| L4 기반 단일 Port 헬스체크  | 협력업체 L4 장비가 80/443 포트만 체크              | L7(업스트림별) 식별 불가                | 부분 장애 은폐, SLA 추적 곤란      |
| 다중 컨테이너 서버          | 한 서버에 FE, BE, Batch 등 혼재                    | Nginx 레벨 200 OK ≠ 각 컨테이너 Healthy | 부분 장애 조기 탐지 실패           |
| 컨테이너 상태 세분화 미검출 | Healthy / Starting / Restarting / Exited 구분 필요 | 단순 Alive 판단                         | 재시작 루프 미인지, 장애 MTTR 증가 |
| 자체 설치형 환경            | Managed Synthetic / APM 유료 기능 제약             | 고도화된 Synthetic / Remediation 부재   | 커스텀 스크립트 난립, 운영 복잡성  |

결과적으로 “Nginx 가 떠 있다” = “서비스 정상” 이라는 잘못된 신호에 의존하여 부분 장애 탐지, 선제적 복구, 근본원인 분석(속성 태깅)이 지연되었습니다.

## 2. 목표 (Vision)

단 하나의 프로젝트(Monitoring Agent)로 다음을 달성합니다.

1. 서버 내 모든 핵심 컨테이너 상태(이미지/이름 패턴, 헬스, 리소스 사용량)를 주기 평가
2. 중요 HTTP 엔드포인트(내부/외부) 가용성 & 지연시간 다차원 측정
3. 실패 조건 감지 시 정책 기반 자동 Remediation (재시작 등) 으로 MTTR 단축
4. Metrics / Traces / Logs 를 OpenTelemetry 표준으로 단일 Collector 에 Export → Grafana / Tempo / Loki (또는 OTEL 호환 백엔드) 연동
5. 모든 텔레메트리에 환경 / 버전 / 태그(Resource Attributes) 자동 보강 → 검색/대시보드 표준화

## 3. 기능 (Key Features)

| 영역 | 기능 | 설명 |
...

## Logging Policy (Unified)

The agent now enforces a single logging pathway:

1. Central Factory: All loggers are created via `internal/pkg/logging` ( `NewLogger` / `NewRawLogger` ). No direct `logrus.New()` in production paths.
2. Formatter: Uniform human-readable `logrus.TextFormatter`. JSON output for logs is only produced inside the OpenTelemetry bridge path (OTLP export / Loki pipeline) – not by configuring per-service JSON format.
3. Metadata: A `nameHook` automatically injects `logger_name=<component>` into every line for correlation.
4. OTEL Integration: Structured records (metrics/traces + logs) are emitted through a Logrus → OTEL hook (`LogrusOTELHook`) ensuring consistent enrichment (trace_id / span_id when available).
5. Removed Legacy: The legacy `SetupLogger` function and runtime log formatting switches (json vs text) have been removed. `LogConfig.Format` is retained only for backward-compatible YAML parsing but no longer changes runtime formatter behavior (scheduled for removal in a future major version).

Migration Guidance:

- If you previously depended on JSON console logs, rely instead on OTEL/Loki aggregation for structured consumption.
- Use `logging.NewLogger("component")` in new code; in tests prefer the test utilities.
- Avoid storing or passing raw `*logrus.Logger`; use the abstraction where possible (legacy unwrap remains temporarily).

Planned Future Cleanup:

- Remove `Format` from `LogConfig` (breaking change) after external configs are updated.
- Drop unwrap helpers once all downstream code uses the abstraction.

|------|------|------|
| CRI Health | 다중 런타임 지원 | Docker, containerd, CRI-O, Podman (패턴 기반 확장) |
| 상태 평가 | 헬스 / 러닝 / 리소스(CPU, Memory) / 개수 규칙 | 정책(YAML) 기반 규칙화 |
| HTTP Health | 다중 엔드포인트 동시 체크 | 응답코드, 지연(Histogram), 사이즈 수집 |
| Observability | OTLP (gRPC) Export (Metrics/Traces/Logs) | `OTEL_EXPORTER_OTLP_ENDPOINT` 하나로 제어 |
| Structured Logging | Logrus → OTEL Logs Bridge | Trace/Span context 자동 첨부 |
| Remediation | 간단한 2분 Rate Limiting | 중복/폭주 재시작 차단, Skip 사유 메트릭/로그 |
| Configuration | 단순 YAML + Env | 환경별 Override 용이 |
| 운영 편의 | Make / Docker / systemd / Compose | 로컬 ↔ 스테이징 ↔ 운영 동일 컨셉 |

## 4. 아키텍처 개요

```
								+---------------------+
								|  OpenTelemetry      |
								|  Collector (gRPC)   |
								+----------+----------+
													 ^ (OTLP: metrics / traces / logs)
													 |
		 +---------------------+----------------------+
		 |                                            |
 +---+----------------+        +------------------+---+
 | cri-health-checker |        | http-health-checker  |
 |  - 컨테이너 목록    |        |  - 엔드포인트 목록    |
 |  - 상태/리소스 수집 |        |  - HTTP 요청/결과     |
 |  - 정책평가/재시작  |        |  - SLA / Latency 측정 |
 +----------+----------+        +-----------+----------+
						|                                |
						| Remediation (Restart/Stop/Kill) |
						+---------------+-----------------+
														|
										 Docker / CRI API
```

## 5. 구성 요소 (Packages)

간단 요약 (세부: `internal/` 하위 README 참조)

| 경로                          | 역할                                                                      |
| ----------------------------- | ------------------------------------------------------------------------- |
| `cmd/cri-health-checker`      | 컨테이너 상태/리소스/헬스 체크 바이너리 엔트리포인트                      |
| `cmd/http-health-checker`     | HTTP 엔드포인트 가용성 체크 엔트리포인트                                  |
| `internal/domain/health`      | 도메인 모델 (체커 인터페이스, 상태, 리포지토리)                           |
| `internal/domain/remediation` | 정책, 트리거, 메트릭 로직 (cooldown 제거됨)                               |
| `internal/component`          | HealthChecker 상위 컴포넌트 조립                                          |
| `internal/common`             | 공통 설정, 환경, 텔레메트리 초기화                                        |
| `internal/infrastructure`     | Docker/CRI 접근, HTTP 클라이언트 등                                       |
| `docs/`                       | 세부 가이드 (`DEPLOYMENT_GUIDE.md`, `OBSERVABILITY.md`, `REMEDIATION.md`) |

## 6. 빠른 시작 (Quick Start)

### 6.1 바이너리 빌드

```bash
make build          # 모든 바이너리
make build-cri      # cri-health-checker
make build-http     # http-health-checker
```

### 6.2 로컬 Compose 실행

```bash
make run-local      # deployments/local/docker-compose.yaml 사용
make stop-local
```

### 6.3 직접 실행 (go run)

```bash
make dev-cri
make dev-http
```

### 6.4 고정 ECR 경로 & 태깅 정책 (업데이트)

Global Base Repository Prefix:

```
725129837589.dkr.ecr.ap-northeast-2.amazonaws.com/monitoring
```

컴포넌트별 이미지:

```
monitoring/cri-health-checker:<TAG>
monitoring/http-health-checker:<TAG>
```

최종 태깅 정책 (Makefile 구현 기준):

1. 항상 Git short SHA (`git rev-parse --short=12 HEAD`) 태그를 **기본**으로 빌드/푸시 (불변성 확보)
2. 추가로 `latest` 태그는 `ENV=prd` 인 경우에만 동일 이미지를 재태깅하여 푸시 (운영 편의용 단축)
3. Git 정보가 전혀 없을 (거의 없음) 상황이면 `IMG_TAG` 기본값(SHA 추출 실패 시) `latest` 로 대체

즉, dev / stg / local 에서는 `latest` 가 생성/업데이트되지 않고, 운영 환경 배포 시점에서만 최신 운영 이미지를 가리키도록 제한합니다.

환경 구분은 이미지 경로나 태그에 넣지 않고, 컨테이너 실행 시 `ENVIRONMENT` / `deployment.environment` Resource Attribute 로만 표현합니다.

이미지 빌드 & 푸시:

```bash
make push-ecr                 # SHA 태그 필수, ENV=prd 일 때만 latest 추가
# 예) ENV=dev  → monitoring/cri-health-checker:a1b2c3d4e5f6 만 존재
#     ENV=prd  → monitoring/cri-health-checker:a1b2c3d4e5f6 + monitoring/cri-health-checker:latest
```

### 6.5 로컬 실행 옵션

1. 통합 (Compose)

```bash
make run-local
make stop-local
```

2. 단일 바이너리 즉시 실행

```bash
make dev-cri
make dev-http
```

3. VSCode Debug 예시 (`.vscode/launch.json`)

```jsonc
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug CRI",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/cmd/cri-health-checker",
      "args": ["-config", "configs/cri-health-checker.yaml"],
      "env": {
        "ENVIRONMENT": "local",
        "OTEL_EXPORTER_OTLP_ENDPOINT": "http://localhost:4317",
      },
    },
    {
      "name": "Debug HTTP",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/cmd/http-health-checker",
      "args": ["-config", "configs/http-health-checker.yaml"],
      "env": {
        "ENVIRONMENT": "local",
        "OTEL_EXPORTER_OTLP_ENDPOINT": "http://localhost:4317",
      },
    },
  ],
}
```

### 6.6 환경별 배포 Make 타겟

| 목적             | 명령                    | 설명                                                |
| ---------------- | ----------------------- | --------------------------------------------------- | --- | --- | --- |
| 이미지 빌드      | `make build`            | 두 바이너리 빌드 후 이미지 생성 (docker-build 포함) |
| 이미지 빌드+푸시 | `make push-ecr`         | git SHA 태그 빌드/푸시, ENV=prd 时 latest 추가      |
| 실행 (CRI)       | `make run-cri ENV=dev`  | ENV=local                                           | dev | stg | prd |
| 실행 (HTTP)      | `make run-http ENV=dev` |                                                     |
| 실행 (둘 다)     | `make run ENV=dev`      | 두 서비스 동시에 실행                               |
| 프로덕션 실행    | `make run-prod`         | ENV=prd shortcut                                    |

추가 변수: `OTEL_ENDPOINT`, `EXTRA_OTEL_ATTRS` 필요 시 함께 지정.

## 7. 환경 변수 & 설정 (Configuration)

필수/주요 환경 변수:
| 변수 | 설명 | 예시 |
|------|------|------|
| `ENVIRONMENT` | 배포 환경 태그 | `dev` / `stg` / `prd` |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OTLP gRPC Collector 주소 | `http://otel.prd:4317` |
| `OTEL_SERVICE_NAME` | (선택) service.name Override | `cri-health-checker` |
| `OTEL_RESOURCE_ATTRIBUTES` | 추가 Resource Attributes | `team=platform,cluster=prd-main` |
| `EXTRA_OTEL_ATTRS` | 코드가 자동 병합 (중복키 보호) | `role=observer` |
| `AWS_REGION` | 선택, 태깅 용 | `ap-northeast-2` |

YAML 설정 예 (일부): `configs/cri-health-checker.yaml`

```yaml
remediation:
	enabled: true
	# 간단한 2분 rate limiting 자동 적용
	actions:
		high_cpu: restart
		high_memory: restart
	cpu_threshold: 80.0
	memory_threshold: 80.0
```

HTTP 체크 설정: `configs/http-health-checker.yaml` (엔드포인트/메서드/성공 기준 정의)

### 7.1 컨테이너 규칙 Min / Max Count Semantics (UPDATED)

컨테이너 개수 제약은 다음과 같이 **정규화(Normalization)** 를 거친 뒤 평가됩니다 (2025-09 업데이트):

| 입력 (YAML)          | 내부 저장값 | 의미      | 설명                                                         |
| -------------------- | ----------- | --------- | ------------------------------------------------------------ |
| (필드 생략)          | -1          | 무제한    | `max_count` 를 명시하지 않으면 무제한 허용                   |
| `max_count: 0`       | -1          | 무제한    | 0 은 더 이상 "0개 허용" 이 아님 → 자동으로 무제한으로 정규화 |
| `max_count: -1`      | -1          | 무제한    | 명시적으로 무제한 선언                                       |
| `max_count: N (N>0)` | N           | 상한 N    | 컨테이너 수가 N 초과 시 실패                                 |
| `max_count: < -1`    | (에러)      | 잘못된 값 | 로딩 단계에서 Validation 실패                                |

추가 규칙:

1. `min_count` 는 0 이상 정수. 음수면 Validation 오류.
2. `max_count != -1` 인 경우에만 상한 비교 로직이 실행됩니다.
3. `max_count != -1` 이고 `max_count < min_count` 이면 Validation 실패.
4. 런타임 로그/메트릭 상에서는 이미 정규화된 값(-1 또는 양수)만 사용됩니다.

예시:

```yaml
rules:
	- name: core-api
		image_pattern: "mycorp/core-api:*"
		min_count: 2
		# max_count 생략 → 무제한 허용 (스케일 아웃 자유)

	- name: batch-jobs
		image_pattern: "mycorp/batch-job:*"
		min_count: 0
		max_count: -1   # 명시적으로 무제한 선언 (생략과 동일)

	- name: edge-proxy
		image_pattern: "nginx:*"
		min_count: 2
		max_count: 4    # 5개 이상이면 실패
```

마이그레이션 가이드:

- 과거에 `max_count: 0` 을 "상한 0 (즉, 존재하면 안 됨)" 의 의미로 사용했다면 지금은 동작이 바뀌었으므로 `min_count: 0` 과 `max_count: 0` 조합을 **"금지"** 하고, 대신 특정 이미지를 금지하고 싶다면 룰을 분리하거나 경고 전용 정책을 도입해야 합니다 (추후 별도 기능 권장).
- "정확히 1개" 를 강제하려면 `min_count: 1`, `max_count: 1` 로 명시하십시오.

이 변경은 모니터링 일관성(상한 미지정 = 무제한) 및 설정 단순화를 위해 도입되었습니다.

## 8. Observability (요약)

자세한 표/메트릭 설명은 `docs/OBSERVABILITY.md` 참고.

### 8.1 Metrics 예시

| 카테고리    | 주요 메트릭                            | 의미                    |
| ----------- | -------------------------------------- | ----------------------- |
| HTTP        | `http_health_requests_total`           | 전체 요청 수            |
| HTTP        | `http_health_request_duration_seconds` | 지연 시간 히스토그램    |
| CRI         | `cri_health_checks_total`              | 컨테이너 상태 평가 횟수 |
| CRI         | `cri_health_status`                    | 컨테이너 상태 Gauge     |
| Remediation | `remediation_actions_attempt_total`    | 재시작 등 시도 카운트   |

### 8.2 Logs

Logrus Hook → OTEL Logs. Trace/Span context 자동 부착. `REMEDIATION` prefix + `event=...` 필드로 grep 친화.

### 8.3 Traces

체커 루프/HTTP 요청 단위 Span (선택적으로 확장 예정). 장애 구간 지연 상관분석에 활용.

## 9. Remediation (요약)

간소화된 remediation 시스템: 복잡한 cooldown 제거, 2분 간격 rate limiting 적용.

| 단계          | 설명                                                      |
| ------------- | --------------------------------------------------------- |
| 트리거 감지   | CPU / Memory / Unhealthy / NotRunning                     |
| 정책 필터     | 이미지 / 이름 패턴 일치 확인                              |
| Rate Limiting | 컨테이너당 2분 간격 제한 (간단하고 효과적)                |
| 실행          | Docker Restart / Stop / Kill (현재 Restart 중심)          |
| 메트릭/로그   | Attempt / Executed / Skipped / Failed 카운트 및 상세 로그 |

Skip 사례는 운영 대시보드에서 과도한 재시작을 즉시 탐지하고 정책 조정에 참고합니다.

## 10. 배포 (Deployment)

상세 절차 및 추가 Use Case 는 `docs/DEPLOYMENT_GUIDE.md` 참고.
간단 실행 예:

```bash
# 이미지 빌드 & 푸시 (ENV=dev → only SHA)
make push-ecr ENV=dev

# 운영(prod)에서 latest 동시 태깅
make push-ecr ENV=prd   # SHA + latest

# stg 실행 (ENV 지정)
make run ENV=stg

# prod 재배포 (기존 컨테이너 제거 후 재실행)
docker rm -f cri-health-checker-prd http-health-checker-prd || true
make run-prod
```

## 11. CONFIGS_DIR (설정 디렉터리 오버라이드)

기본 구성 파일 경로는 프로젝트 내 `configs/` 디렉터리를 가정합니다. 모든 실행/개발 관련 Make 타겟은 공통 변수 `CONFIGS_DIR` 를 사용하도록 통일되어 있으며, 필요 시 외부 마운트된 디렉터리로 치환할 수 있습니다.

기본값: `CONFIGS_DIR ?= $(PWD)/configs`

사용 예:

```bash
# 외부 경로에 운영용 YAML 배치 후 실행
make run-cri ENV=prd CONFIGS_DIR=/opt/agent-configs
make run-http ENV=prd CONFIGS_DIR=/opt/agent-configs

# 통합 실행 (두 바이너리)
make run ENV=stg CONFIGS_DIR=/data/health-configs

# dev 모드 (go run) 도 동일하게 동작
make dev-cri CONFIGS_DIR=./my-configs
make dev-http CONFIGS_DIR=./my-configs
```

VSCode Debug 설정 역시 다음처럼 `${env:CONFIGS_DIR}` 활용을 고려할 수 있습니다:

```jsonc
{
  "args": ["-config", "${env:CONFIGS_DIR}/cri-health-checker.yaml"],
  "env": {
    "CONFIGS_DIR": "${workspaceFolder}/configs",
    "ENVIRONMENT": "local",
  },
}
```

이 통일로 인해 과거 문서/스크립트에서 `configs/cri-health-checker.yaml` 같이 하드코딩된 경로가 있다면 `$(CONFIGS_DIR)/cri-health-checker.yaml` 형태로 교체하는 것이 권장됩니다.
