import type { InterviewQuestion } from "@/types/portfolio";

export const infrastructureQuestions: InterviewQuestion[] = [
  // Kubernetes
  {
    id: 9,
    category1: "Infrastructure",
    category2: "Kubernetes",
    question: "Please explain your Kubernetes experience.",
    answer:
      '**Kubernetes 운영에서 가장 어려운 것은 \'네트워크 디버깅\'과 \'리소스 경합\'입니다.**\n\n**EKS 클러스터 운영 경험 (100+ Pods):**\n\n**네트워크 문제 해결:**\n\nPod 간 통신 장애 시 가장 효과적인 디버깅 순서:\n\n```bash\n# 1. Pod-to-Pod 연결성 확인\nkubectl exec -it pod-a -- nc -zv pod-b-service 8080\n\n# 2. DNS 해상도 문제 확인\nkubectl exec -it pod-a -- nslookup pod-b-service.namespace.svc.cluster.local\n\n# 3. CNI 네트워크 상태 확인\nkubectl describe node worker-node-1 | grep -A10 \'Network\'\n\n# 4. Security Policy 검증\nkubectl get networkpolicies -A\nkubectl describe networkpolicy deny-all -n production\n```\n\n**실제 장애 사례: Pod Network 파편화**\n\n- **현상**: 특정 Node의 Pod들이 intermittent connection timeout\n- **원인**: AWS ENI 한계 (t3.medium = 6 ENIs, 각각 6 IPs = 36 Pods max)\n- **해결**: Node 인스턴스 타입 변경 (t3.medium → t3.large), Pod density 조정\n\n```yaml\n# 해결책: Pod 밀도 제한\napiVersion: v1\nkind: Node\nmetadata:\n  annotations:\n    cluster-autoscaler.kubernetes.io/node-template: |\n      max-pods-per-node: 30\nspec:\n  allocatable:\n    pods: "30"\n```\n\n**RBAC 보안 설계:**\n\n```yaml\n# 최소 권한 원칙 적용\napiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: production\n  name: backend-service-role\nrules:\n- apiGroups: [""]\n  resources: ["secrets", "configmaps"]\n  verbs: ["get", "list"]\n  resourceNames: ["backend-config", "db-credentials"]  # 특정 리소스만 접근\n- apiGroups: ["apps"]\n  resources: ["deployments"]\n  verbs: ["get", "patch"]  # 자신의 deployment만 수정 가능\n```\n\n**Resource 관리 최적화:**\n\n**Vertical Pod Autoscaler 실전 경험:**\n\n```yaml\napiVersion: autoscaling.k8s.io/v1\nkind: VerticalPodAutoscaler\nmetadata:\n  name: backend-vpa\nspec:\n  targetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: backend-service\n  updatePolicy:\n    updateMode: "Auto"  # 운영 중 자동 조정\n  resourcePolicy:\n    containerPolicies:\n    - containerName: backend\n      maxAllowed:\n        cpu: 2\n        memory: 4Gi\n      controlledResources: ["cpu", "memory"]\n```\n\n**결과**: CPU 사용률 30% → 70% (적정 수준), 메모리 OOM 킬 95% 감소\n\n**Pod Scheduling 고급 전략:**\n\n```yaml\n# Anti-affinity로 고가용성 보장\napiVersion: apps/v1\nkind: Deployment\nspec:\n  template:\n    spec:\n      affinity:\n        podAntiAffinity:\n          requiredDuringSchedulingIgnoredDuringExecution:\n          - labelSelector:\n              matchExpressions:\n              - key: app\n                operator: In\n                values:\n                - backend-service\n            topologyKey: kubernetes.io/hostname  # 같은 노드 배치 금지\n        nodeAffinity:\n          preferredDuringSchedulingIgnoredDuringExecution:\n          - weight: 100\n            preference:\n              matchExpressions:\n              - key: instance-type\n                operator: In\n                values:\n                - compute-optimized  # CPU 집약적 워크로드\n```\n\n**APISIX Gateway + Kubernetes Integration:**\n\n```yaml\n# Ingress 대신 APISIX CRD 사용\napiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: backend-route\nspec:\n  http:\n  - match:\n      paths:\n      - /api/v1/*\n      methods:\n      - GET\n      - POST\n    backends:\n    - serviceName: backend-service\n      servicePort: 8080\n      weight: 100\n    plugins:\n    - name: limit-req\n      enable: true\n      config:\n        rate: 100\n        burst: 50\n    - name: prometheus\n      enable: true\n```\n\n**CKA 인증에서 배운 실전 기술:**\n\n1. **etcd 백업/복구**: 매일 자동 백업, 3개월 보관\n2. **클러스터 업그레이드**: Rolling update 전략, 노드별 순차 진행\n3. **트러블슈팅**: Pod 상태 진단 → 로그 분석 → 리소스 확인 → 네트워크 검증\n\n**운영 메트릭스:**\n\n- **클러스터 가용성**: 99.9% (계획된 유지보수 제외)\n- **Pod 시작 시간**: P95 기준 30초 이내\n- **리소스 효율성**: 노드 CPU 사용률 60-80% 유지\n\n**6개월 운영 교훈:**\n\n1. **네트워크**: CNI 한계를 미리 계획하라\n2. **보안**: RBAC은 복잡해도 처음부터 제대로\n3. **모니터링**: Kubernetes 자체도 모니터링 대상\n4. **백업**: etcd 백업이 생명줄\n\n핵심은 \'Kubernetes는 플랫폼이 아니라 생태계\'라는 것입니다. 각 컴포넌트의 상호작용을 이해해야 안정적 운영이 가능합니다.',
  },
  {
    id: 10,
    category1: "Infrastructure",
    category2: "AWS",
    question: "Please explain your AWS experience and certifications.",
    answer:
      "**AWS 아키텍처 설계에서 가장 중요한 것은 '장애 도메인 분리'와 '비용 최적화'의 균형입니다.**\n\n**Multi-AZ 고가용성 아키텍처:**\n\n```\n┌─────────────┬─────────────┬─────────────┐\n│   AZ-1a     │    AZ-1b    │   AZ-1c     │\n├─────────────┼─────────────┼─────────────┤\n│ ECS Fargate │ ECS Fargate │ ECS Fargate │\n│   (Primary) │  (Secondary)│  (Standby)  │\n├─────────────┼─────────────┼─────────────┤\n│ RDS Primary │ RDS Replica │      -      │\n├─────────────┼─────────────┼─────────────┤\n│ Redis Node1 │ Redis Node2 │ Redis Node3 │\n│ (Sentinel)  │ (Sentinel)  │ (Sentinel)  │\n└─────────────┴─────────────┴─────────────┘\n```\n\n**ECS Fargate vs EKS 선택 딜레마:**\n\n당시 가장 고민했던 것은 '관리 복잡도 vs 제어 권한'이었습니다:\n\n**ECS Fargate (선택한 이유):**\n\n```yaml\n# task-definition.yaml\nfamily: backend-service\nnetworkMode: awsvpc\nrequiresCompatibilities:\n  - FARGATE\ncpu: 1024\nmemory: 2048\ncontainerDefinitions:\n  - name: backend\n    image: backend:v1.2.3\n    portMappings:\n      - containerPort: 8080\n        protocol: tcp\n    environment:\n      - name: DB_HOST\n        valueFrom: !Ref DatabaseEndpoint\n    logConfiguration:\n      logDriver: awslogs\n      options:\n        awslogs-group: /ecs/backend-service\n        awslogs-region: ap-northeast-2\n        awslogs-stream-prefix: ecs\n```\n\n**장점**: 서버리스 컨테이너, 패치 관리 불필요, 초 단위 과금\n**단점**: Kubernetes 생태계 제약, 디버깅 어려움\n\n**Site-to-Site VPN 1.25Gbps 구현:**\n\n온프레미스와 AWS 간 하이브리드 아키텍처:\n\n```bash\n# VPN 터널 설정\naws ec2 create-vpn-connection \\\n  --type ipsec.1 \\\n  --customer-gateway-id cgw-12345 \\\n  --vpn-gateway-id vgw-67890 \\\n  --options StaticRoutesOnly=true\n\n# BGP 라우팅 대신 정적 라우팅 선택 이유:\n# - 온프레미스 네트워크팀의 BGP 운영 경험 부족\n# - 라우팅 테이블 예측 가능성 필요\n# - 장애 시 빠른 문제 해결\n```\n\n**결과**: 평균 처리량 800Mbps, 지연시간 P95 기준 15ms\n\n**S3 Lifecycle 비용 최적화 전략:**\n\n```json\n{\n  \"Rules\": [\n    {\n      \"ID\": \"LogDataLifecycle\",\n      \"Status\": \"Enabled\",\n      \"Filter\": {\n        \"Prefix\": \"logs/\"\n      },\n      \"Transitions\": [\n        {\n          \"Days\": 30,\n          \"StorageClass\": \"STANDARD_IA\"\n        },\n        {\n          \"Days\": 90,\n          \"StorageClass\": \"GLACIER\"\n        },\n        {\n          \"Days\": 2555,  \n          \"StorageClass\": \"DEEP_ARCHIVE\"\n        }\n      ],\n      \"Expiration\": {\n        \"Days\": 3653  // 10년 보관\n      }\n    }\n  ]\n}\n```\n\n**비용 분석:**\n- Standard: $0.023/GB/month\n- IA: $0.0125/GB/month (30일 후)\n- Glacier: $0.004/GB/month (90일 후)\n- Deep Archive: $0.00099/GB/month (7년 후)\n\n**결과**: 월 스토리지 비용 $5,000 → $2,500 (50% 절감)\n\n**Athena + Glue Data Lake 아키텍처:**\n\n```sql\n-- 파티션 프로젝션으로 성능 최적화\nCREATE EXTERNAL TABLE analytics_logs (\n  trace_id string,\n  user_id string,\n  event_type string,\n  timestamp bigint\n)\nPARTITIONED BY (\n  year int,\n  month int,\n  day int,\n  hour int\n)\nSTORED AS PARQUET\nLOCATION 's3://data-lake-bucket/logs/'\nTBLPROPERTIES (\n  'projection.enabled' = 'true',\n  'projection.year.type' = 'integer',\n  'projection.year.range' = '2023,2030',\n  'projection.month.type' = 'integer',\n  'projection.month.range' = '1,12',\n  'projection.day.type' = 'integer',\n  'projection.day.range' = '1,31',\n  'projection.hour.type' = 'integer',\n  'projection.hour.range' = '0,23'\n);\n\n-- 쿼리 예시 (파티션 프루닝 활용)\nSELECT event_type, COUNT(*) as event_count\nFROM analytics_logs\nWHERE year = 2024 AND month = 11 AND day = 12\nGROUP BY event_type\nORDER BY event_count DESC;\n```\n\n**성능 결과**: 10TB 스캔 → 100GB 스캔 (99% 축소), 쿼리 시간 5분 → 10초\n\n**CloudFormation Infrastructure as Code:**\n\n```yaml\n# 템플릿 모듈화 전략\nAWSTemplateFormatVersion: '2010-09-09'\nParameters:\n  Environment:\n    Type: String\n    AllowedValues: [dev, staging, prod]\n  InstanceType:\n    Type: String\n    Default: t3.medium\n    AllowedValues: [t3.small, t3.medium, t3.large]\n\nMappings:\n  EnvironmentConfig:\n    dev:\n      MinSize: 1\n      MaxSize: 3\n      DesiredCapacity: 1\n    prod:\n      MinSize: 3\n      MaxSize: 10\n      DesiredCapacity: 5\n\nResources:\n  ECSCluster:\n    Type: AWS::ECS::Cluster\n    Properties:\n      ClusterName: !Sub '${Environment}-cluster'\n      CapacityProviders:\n        - FARGATE\n        - FARGATE_SPOT  # 비용 최적화\n      DefaultCapacityProviderStrategy:\n        - CapacityProvider: FARGATE\n          Weight: 1\n        - CapacityProvider: FARGATE_SPOT\n          Weight: 4  # 80% Spot 사용\n```\n\n**배포 시간 단축:**\n- Before: 수동 콘솔 작업 2시간\n- After: CloudFormation 자동화 12분\n- 90% 시간 단축 + 일관성 보장\n\n**AWS 인증 취득 과정에서 배운 실전 노하우:**\n\n**DevOps Professional 핵심 통찰:**\n1. **CI/CD**: CodePipeline보다 GitHub Actions + AWS CLI가 유연\n2. **모니터링**: CloudWatch Custom Metrics로 비즈니스 지표 추적\n3. **보안**: IAM Role 기반 접근, 최소 권한 원칙\n4. **비용**: Reserved Instance + Savings Plan 조합 활용\n\n**SysOps Administrator 운영 경험:**\n1. **자동화**: Systems Manager로 패치 관리\n2. **로깅**: CloudTrail + GuardDuty로 보안 모니터링\n3. **백업**: 교차 리전 백업으로 재해 복구\n4. **성능**: CloudWatch Insights로 로그 분석\n\n**실제 장애 대응 경험:**\n\n**장애 시나리오**: RDS Primary 인스턴스 장애\n**대응 시간**: 3분 (자동 페일오버)\n**근본 원인**: 하드웨어 장애\n**개선사항**: Read Replica 추가, 모니터링 강화\n\n**현재 운영 중인 AWS 아키텍처:**\n- **가용성**: 99.99% (연간 다운타임 1시간 이내)\n- **비용 효율성**: 월 $2,500 (최적화 전 $5,000)\n- **확장성**: Auto Scaling으로 트래픽 10배 증가 대응\n- **보안**: WAF, GuardDuty, Config Rules 적용\n\n핵심 교훈: **'AWS는 도구가 아니라 플랫폼'**입니다. 각 서비스의 한계와 연동 방식을 이해해야 안정적인 운영이 가능합니다.",
  },
  {
    id: 11,
    category1: "Infrastructure",
    category2: "Monitoring",
    question: "What is your observability/monitoring experience?",
    answer:
      '**Observability에서 가장 어려운 것은 \'신호와 노이즈를 구분\'하는 것입니다.**\n\n**Legacy Scouter → OpenTelemetry 마이그레이션 도전:**\n\n기존 Scouter APM의 한계:\n\n```\n[문제점]\n- Java만 지원 (React, Vue, Go 서비스 사각지대)\n- 수동 로그 분석: tail -f 15개 서버 로그\n- 18시간 장애 추적: "어느 서비스에서 시작된 문제?"\n- 비즈니스 컨텍스트 부족: 기술적 에러만 표시\n```\n\n**OpenTelemetry 아키텍처 설계:**\n\n```yaml\n# OpenTelemetry Collector 설정 (12개 서버)\nreceivers:\n  otlp:\n    protocols:\n      grpc:\n        endpoint: 0.0.0.0:4317\n      http:\n        endpoint: 0.0.0.0:4318\n  prometheus:\n    config:\n      scrape_configs:\n        - job_name: \'kubernetes-pods\'\n          kubernetes_sd_configs:\n            - role: pod\n\nprocessors:\n  batch:\n    send_batch_size: 1000\n    timeout: 10s\n  memory_limiter:\n    limit_mib: 10240\n  resource:\n    attributes:\n      - key: service.namespace\n        value: production\n        action: upsert\n\nexporters:\n  otlp/tempo:\n    endpoint: http://tempo:4317\n    tls:\n      insecure: true\n  otlphttp/loki:\n    endpoint: http://loki:3100/otlp\n  prometheus:\n    endpoint: "0.0.0.0:8889"\n\nservice:\n  pipelines:\n    traces:\n      receivers: [otlp]\n      processors: [memory_limiter, batch, resource]\n      exporters: [otlp/tempo]\n    metrics:\n      receivers: [otlp, prometheus]\n      processors: [memory_limiter, batch]\n      exporters: [prometheus]\n    logs:\n      receivers: [otlp]\n      processors: [memory_limiter, batch]\n      exporters: [otlphttp/loki]\n```\n\n**분산 트레이싱의 컨텍스트 전파 문제:**\n\n가장 복잡했던 것은 **Kafka를 통한 비동기 경계에서 Trace Context 유지**:\n\n```go\n// Producer: Trace context를 Kafka header에 주입\nfunc (p *Producer) SendWithTrace(ctx context.Context, msg *kafka.Message) error {\n    span := trace.SpanFromContext(ctx)\n    \n    // W3C Trace Context를 Kafka Header로 변환\n    traceparent := span.SpanContext().TraceID().String() + "-" + \n                   span.SpanContext().SpanID().String() + "-" + \n                   "01"  // sampled flag\n    \n    msg.Headers = append(msg.Headers, kafka.Header{\n        Key:   "traceparent",\n        Value: []byte(traceparent),\n    })\n    \n    return p.client.Produce(msg)\n}\n\n// Consumer: Header에서 Trace context 복원\nfunc (c *Consumer) ProcessWithTrace(msg *kafka.Message) {\n    var parentCtx context.Context = context.Background()\n    \n    // Kafka header에서 trace context 추출\n    for _, header := range msg.Headers {\n        if string(header.Key) == "traceparent" {\n            traceparent := string(header.Value)\n            // SpanContext 복원 로직\n            spanCtx := extractSpanContext(traceparent)\n            parentCtx = trace.ContextWithRemoteSpanContext(parentCtx, spanCtx)\n            break\n        }\n    }\n    \n    // 새 span 시작 (부모 관계 유지)\n    tracer := otel.Tracer("kafka-consumer")\n    ctx, span := tracer.Start(parentCtx, "kafka.consume")\n    defer span.End()\n    \n    // 비즈니스 로직 처리\n    c.handleMessage(ctx, msg)\n}\n```\n\n**Grafana 대시보드 설계 철학:**\n\n**1. RED Method (Rate, Errors, Duration)**\n```promql\n# Request Rate (per second)\nsum(rate(http_requests_total[5m])) by (service, endpoint)\n\n# Error Rate (percentage)\nsum(rate(http_requests_total{status=~"5.."}[5m])) by (service) / \nsum(rate(http_requests_total[5m])) by (service) * 100\n\n# Duration (P95 latency)\nhistogram_quantile(0.95, \n  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service)\n)\n```\n\n**2. USE Method (Utilization, Saturation, Errors)**\n```promql\n# CPU Utilization\n100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)\n\n# Memory Saturation \n(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / \nnode_memory_MemTotal_bytes * 100\n\n# Disk I/O Saturation\nrate(node_disk_io_time_seconds_total[5m]) * 100\n```\n\n**비즈니스 컨텍스트가 포함된 Custom Metrics:**\n\n```javascript\n// Frontend: 비즈니스 이벤트 추적\nfunction trackUserBehavior(action, context) {\n  const span = trace.getActiveSpan();\n  \n  span.setAttributes({\n    // 비즈니스 컨텍스트\n    \'user.segment\': context.userSegment,\n    \'product.category\': context.category,\n    \'cart.source\': context.source, // favorites/routine/missed\n    \'conversion.step\': action, // view/cart/purchase\n    \n    // 기술적 컨텍스트\n    \'service.name\': \'frontend\',\n    \'service.version\': process.env.APP_VERSION,\n    \'browser.name\': navigator.userAgent\n  });\n  \n  // Custom metric 발송\n  const counter = meter.createCounter(\'user_actions_total\');\n  counter.add(1, {\n    action: action,\n    user_segment: context.userSegment,\n    product_category: context.category\n  });\n}\n```\n\n**Log-Trace Correlation 구현:**\n\n```go\n// Logrus Hook for automatic trace_id injection\ntype OtelHook struct {\n    tracer trace.Tracer\n}\n\nfunc (hook *OtelHook) Fire(entry *logrus.Entry) error {\n    span := trace.SpanFromContext(entry.Context)\n    if span.SpanContext().IsValid() {\n        entry.Data["trace_id"] = span.SpanContext().TraceID().String()\n        entry.Data["span_id"] = span.SpanContext().SpanID().String()\n    }\n    return nil\n}\n\n// 사용 예시\nlogger := logrus.New()\nlogger.AddHook(&OtelHook{})\n\nctx, span := tracer.Start(context.Background(), "order.process")\nlogger.WithContext(ctx).Info("Processing order", "order_id", orderID)\n// 결과: {"level":"info", "trace_id":"abc123", "span_id":"def456", "msg":"Processing order"}\n```\n\n**Grafana Explore의 Logs-to-Traces 연결:**\n\n```yaml\n# Loki datasource 설정\ndatasources:\n  - name: Loki\n    type: loki\n    url: http://loki:3100\n    jsonData:\n      derivedFields:\n        - name: "TraceID"\n          matcherRegex: "trace_id=(\\\\w+)"\n          url: "${__value.raw}"\n          datasourceUid: "tempo"\n```\n\n**OpenTelemetry 오픈소스 기여 경험:**\n\n**1. AWS SDK Context Propagation Bug 수정:**\n```go\n// 문제: AWS SDK 호출 시 trace context 손실\n// 기여한 패치\nfunc (t *awsTracer) Start(ctx context.Context, spanName string) (context.Context, trace.Span) {\n    // AWS SDK의 context.Value 호환성 보장\n    if awsCtx, ok := ctx.(awscontext.Context); ok {\n        ctx = awscontext.BackgroundContext()\n        // trace context 수동 전파\n    }\n    return t.tracer.Start(ctx, spanName)\n}\n```\n\n**2. Container Environment Detection 개선:**\n컨테이너 런타임 감지 로직 개선으로 Kubernetes 환경에서 더 정확한 서비스 식별 가능\n\n**MTTI (Mean Time To Identification) 개선 사례:**\n\n**Before (Legacy Scouter):**\n```\n장애 발생 → 18시간 수동 로그 분석\n1. 각 서버에 SSH 접속\n2. tail -f /var/log/app.log 15개 창\n3. timestamp 기준 수동 매칭\n4. "어느 서비스가 원인인가?" 추측 게임\n```\n\n**After (OpenTelemetry):**\n```\n장애 발생 → 10분 자동화된 분석\n1. Grafana Alert 수신 (Slack)\n2. 트레이스 ID 또는 에러 메시지로 검색\n3. Waterfall diagram에서 병목 지점 시각적 확인\n4. 관련 로그 자동 연결, 근본 원인 식별\n```\n\n**실제 장애 해결 사례:**\n\n**문제**: 결제 완료율 95% → 87% 갑작스런 하락\n\n**OpenTelemetry 기반 분석:**\n1. **Payment service trace 검색**: 에러율 5% → 13% 증가\n2. **Span duration 분석**: 결제 API 응답시간 200ms → 3초\n3. **Database trace 확인**: Connection pool exhaustion 발견\n4. **Log correlation**: "connection timeout" 로그와 trace 매칭\n5. **Root cause**: DB connection pool 크기 부족\n\n**해결 시간**: 10분 (vs 이전 18시간)\n\n**현재 처리 중인 데이터 규모:**\n\n- **Traces**: 일일 50만 traces, 월 3TB 데이터\n- **Metrics**: 초당 400 데이터포인트\n- **Logs**: 일일 100GB, trace_id로 인덱싱된 로그\n- **Retention**: Traces 7일, Metrics 90일, Logs 30일\n\n**성능 최적화:**\n\n- **Sampling**: Production 1%, Development 100%\n- **Batch processing**: 1000 spans per batch\n- **Memory limiting**: Collector당 10GB 제한\n- **Compression**: Parquet format으로 10:1 압축\n\n**비용 효율성:**\n\n- **Self-hosted stack**: 월 $200 (vs DataDog $2000+)\n- **Storage optimization**: S3 Intelligent Tiering\n- **Query optimization**: Pre-aggregated dashboards\n\n핵심 교훈: **Observability는 \'문제를 찾는 도구\'가 아니라 \'시스템을 이해하는 렌즈\'**입니다. 기술적 메트릭과 비즈니스 컨텍스트의 결합이 진짜 통찰력을 제공합니다.',
  },
  {
    id: 12,
    category1: "Infrastructure",
    category2: "Messaging",
    question: "What is your Kafka experience?",
    answer:
      "**Kafka 운영의 가장 큰 도전은 '메시지 유실'과 '중복 처리'의 균형점을 찾는 것입니다.**\n\n" +
      "**프로덕션 운영 경험 (20-50M 메시지/일):**\n" +
      "우리 e-커머스 플랫폼에서 일평균 3천만 개의 사용자 행동 이벤트를 처리합니다. 핵심 과제들:\n\n" +
      "**1. 메시지 유실 vs 성능 Trade-off:**\n" +
      "- Producer acks=all: 모든 replica 동기화 대기 → 지연 증가 (50ms → 200ms)\n" +
      "- acks=1: leader만 확인 → 3% 메시지 유실 위험 발견\n" +
      "- 해결: idempotence=true + retries=MAX_VALUE로 exactly-once semantics 구현\n\n" +
      "**2. Consumer Lag 모니터링과 Auto-scaling:**\n" +
      "```bash\n" +
      "# 실시간 lag 모니터링\n" +
      "kafka-consumer-groups.sh --describe --group analytics-group\n" +
      "# Lag > 10,000시 Pod 자동 스케일링\n" +
      "```\n\n" +
      "**3. Partition 설계의 교훈:**\n" +
      "- 처음: user_id 기반 파티셔닝 → 핫스팟 파티션 (80/20 법칙)\n" +
      "- 개선: hash(user_id + timestamp) → 균등 분산\n" +
      "- 결과: 처리량 3배 향상 (5K → 15K msgs/sec per partition)\n\n" +
      "**4. Schema Evolution 전략:**\n" +
      "Confluent Schema Registry로 backward compatibility 보장\n" +
      "- JSON → Avro 마이그레이션으로 메시지 크기 60% 감소\n" +
      "- 점진적 스키마 변경으로 무중단 배포 달성\n\n" +
      "**운영 후 깨달은 핵심:**\n" +
      "Kafka는 단순한 메시지 큐가 아니라 '분산 로그 시스템'입니다. 순서 보장, 내구성, 확장성의 근본이 append-only log에 있다는 것을 이해해야 운영 시 발생하는 문제들을 본질적으로 해결할 수 있습니다.",
  },
  {
    id: 13,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question: "Please explain your Airflow/data pipeline experience.",
    answer:
      "**데이터 파이프라인의 핵심은 '비용 vs 지연시간 vs 정확성'의 3-way trade-off 관리입니다.**\n\n" +
      "**AWS Step Functions 기반 분석 파이프라인 (2-5TB/월 처리):**\n\n" +
      "**1. 아키텍처 설계 철학:**\n" +
      "- 실시간 스트리밍: 비용 $500/월, 지연 <1분\n" +
      "- 배치 처리: 비용 $40/월, 지연 2-4시간\n" +
      "→ 비즈니스 요구사항 분석 결과 4시간 지연 허용하여 **배치 처리 선택**\n\n" +
      "**2. Parquet + Athena 최적화:**\n" +
      "```sql\n" +
      "-- 압축 전략으로 10GB → 1GB (90% 절약)\n" +
      "CREATE TABLE analytics_compressed\n" +
      "STORED AS PARQUET\n" +
      "TBLPROPERTIES ('parquet.compress'='GZIP')\n" +
      "PARTITIONED BY (year, month, day)\n" +
      "```\n\n" +
      "**3. Lambda로 동적 쿼리 생성:**\n" +
      "Python 3.11 + athena-query-builder로 15가지 분석 쿼리 자동 생성\n" +
      "- 사용자 행동 분석: MAU/DAU/Retention 계산\n" +
      "- 커머스 퍼널: CTR/Conversion/Cart 분석\n" +
      "- 실행 시간: 12-18분 (병렬 처리 vs S3 throttling 최적화)\n\n" +
      "**4. S3 Throttling 해결:**\n" +
      "문제: 4개 병렬 Athena 쿼리 → S3 429 에러\n" +
      "해결: 배치 전략으로 최대 2개 동시 쿼리, 8개 순차 배치\n" +
      "결과: 에러율 15% → 0%, 안정적 12분 실행 시간\n\n" +
      "**5. Step Functions 오케스트레이션:**\n" +
      "```json\n" +
      "{\n" +
      '  "Comment": "Analytics Pipeline",\n' +
      '  "States": {\n' +
      '    "ParallelAnalytics": {\n' +
      '      "Type": "Parallel",\n' +
      '      "Branches": [\n' +
      '        { "StartAt": "UserBehaviorBatch" },\n' +
      '        { "StartAt": "CommerceBatch" }\n' +
      "      ]\n" +
      "    }\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**운영 6개월 후 교훈:**\n" +
      "- 데이터 품질 > 실시간성: 배치에서 validation 로직이 더 안정적\n" +
      "- 비용 최적화: Spot Instance + Reserved Capacity 조합으로 40% 절약\n" +
      "- 모니터링: CloudWatch 알람으로 파이프라인 실패 시 10분 내 감지",
  },
  {
    id: 14,
    category1: "Infrastructure",
    category2: "IaC",
    question: "What is your Infrastructure as Code experience?",
    answer:
      "**IaC의 가장 큰 함정은 '상태 불일치'와 '의존성 순환'입니다. 실제 운영에서 배운 교훈들을 공유하겠습니다.**\n\n" +
      "**Terraform State 관리의 현실:**\n\n" +
      "**1. State Drift 문제:**\n" +
      "수동으로 AWS 콘솔에서 수정한 리소스들이 terraform plan에서 차이 발생\n" +
      "```bash\n" +
      "# 매주 금요일 상태 검증 자동화\n" +
      "terraform plan -detailed-exitcode\n" +
      "if [ $? -eq 2 ]; then\n" +
      '  echo "State drift detected!" | slack-notify\n' +
      "fi\n" +
      "```\n\n" +
      "**2. Remote State Locking 전략:**\n" +
      "- S3 backend + DynamoDB 테이블로 동시 수정 방지\n" +
      "- 문제: 10분 이상 실행 시 lock timeout → 수동 해제 필요\n" +
      "- 해결: CI/CD에서 `-lock-timeout=20m` 설정\n\n" +
      "**3. 모듈 설계 철학:**\n" +
      "```hcl\n" +
      "# Bad: 너무 많은 매개변수\n" +
      'module "vpc" {\n' +
      '  source = "./modules/vpc"\n' +
      "  cidr_block = var.vpc_cidr\n" +
      "  enable_dns_hostnames = var.enable_dns\n" +
      "  # ... 50개 변수\n" +
      "}\n" +
      "\n" +
      "# Good: 컨벤션 기반 설계\n" +
      'module "vpc" {\n' +
      '  source = "./modules/vpc"\n' +
      '  environment = "prod"\n' +
      '  service_name = "ecommerce"\n' +
      "  # 내부적으로 naming convention 적용\n" +
      "}\n" +
      "```\n\n" +
      "**4. Dependency Hell 해결:**\n" +
      "순환 의존성으로 인한 apply 실패 경험:\n" +
      "- EKS 클러스터 → ALB Ingress Controller → Route53 → EKS\n" +
      "- 해결: 단계별 apply + data source 활용으로 참조 분리\n\n" +
      "**5. GitOps와 통합:**\n" +
      "```yaml\n" +
      "# .github/workflows/terraform.yml\n" +
      "- name: Terraform Plan\n" +
      "  run: |\n" +
      "    terraform plan -out=tfplan\n" +
      "    terraform show -json tfplan > plan.json\n" +
      "    # PR 코멘트에 변경사항 요약\n" +
      "```\n\n" +
      "**6개월 운영 후 Best Practices:**\n" +
      "- **환경별 workspace 분리**: dev/staging/prod 완전 격리\n" +
      "- **변수 검증**: validation 블록으로 잘못된 입력 방지\n" +
      "- **버전 고정**: provider 버전 lock으로 예상치 못한 변경 방지\n" +
      "- **Import 전략**: 기존 리소스는 terraform import로 점진적 IaC화\n\n" +
      "**핵심 깨달음:**\n" +
      "Terraform은 도구가 아니라 '인프라 거버넌스 시스템'입니다. 코드 리뷰, 승인 프로세스, 변경 이력 관리까지 포함해야 진정한 IaC의 가치를 얻을 수 있습니다.",
  },
  {
    id: 15,
    category1: "Infrastructure",
    category2: "Networking",
    question: "Please explain your networking and gateway experience.",
    answer:
      '**API Gateway 설계에서 가장 중요한 것은 \'단일 장애점 제거\'와 \'트래픽 패턴 이해\'입니다.**\n\n**Netflix Zuul → APISIX 마이그레이션 결정 과정:**\n\n당시 직면한 핵심 문제:\n\n```\n[Zuul의 한계]\n- JVM 기반: 메모리 사용량 2GB+\n- 동기 I/O: 높은 latency 하에서 thread 고갈\n- 설정 복잡성: Java Config + Annotation 기반\n- Hot reload 미지원: 설정 변경 시 재시작 필요\n```\n\n**APISIX 선택 이유와 아키텍처:**\n\n```lua\n-- APISIX Route 설정 (Lua 기반)\nlocal _M = {}\n\nfunction _M.init()\n    -- Eureka Service Discovery Integration\n    local eureka = require("apisix.discovery.eureka")\n    \n    -- Dynamic upstream configuration\n    local upstream_conf = {\n        type = "roundrobin",\n        discovery_type = "eureka",\n        service_name = "BACKEND-SERVICE",\n        discovery_args = {\n            eureka_base_url = "http://eureka:8761/eureka/"\n        }\n    }\n    \n    return upstream_conf\nend\n\nfunction _M.access()\n    -- Rate Limiting (Token Bucket Algorithm)\n    local limit_req = require("apisix.plugins.limit-req")\n    local rate = ngx.var.rate_limit or 100\n    local burst = ngx.var.rate_burst or 50\n    \n    local ok, err = limit_req.access(rate, burst)\n    if not ok then\n        ngx.status = 429\n        ngx.say(\'{"error": "Rate limit exceeded"}\')\n        ngx.exit(429)\n    end\nend\n\nreturn _M\n```\n\n**고가용성 아키텍처 설계:**\n\n```yaml\n# APISIX HA Cluster (3-node)\napisix-1: # Primary\n  role: data_plane\n  etcd_endpoints:\n    - https://etcd-1:2379\n    - https://etcd-2:2379\n    - https://etcd-3:2379\n  \napisix-2: # Secondary \n  role: data_plane\n  sync_from: apisix-1\n  \napisix-3: # Control Plane\n  role: control_plane\n  admin_api_port: 9180\n```\n\n**동적 라우팅과 로드밸런싱:**\n\n```json\n{\n  "uri": "/api/v1/*",\n  "methods": ["GET", "POST", "PUT", "DELETE"],\n  "upstream": {\n    "type": "chash",\n    "key": "remote_addr",\n    "nodes": {\n      "backend-1:8080": 100,\n      "backend-2:8080": 100,\n      "backend-3:8080": 50\n    },\n    "checks": {\n      "active": {\n        "timeout": 5,\n        "http_path": "/health",\n        "healthy": {\n          "interval": 2,\n          "successes": 2\n        },\n        "unhealthy": {\n          "interval": 1,\n          "http_failures": 3\n        }\n      }\n    }\n  }\n}\n```\n\n**Consistent Hashing 선택 이유:**\n- **User session affinity**: 동일 사용자 → 동일 backend\n- **Cache locality**: 서버별 로컬 캐시 효율성 향상\n- **Graceful scaling**: 노드 추가/제거 시 최소 rehashing\n\n**RBAC (Role-Based Access Control) 구현:**\n\n```lua\n-- JWT 기반 인증 + 권한 검증\nlocal jwt = require "resty.jwt"\nlocal cjson = require "cjson"\n\nfunction check_permissions()\n    local auth_header = ngx.var.http_authorization\n    if not auth_header then\n        ngx.status = 401\n        ngx.say(\'{"error": "Missing Authorization header"}\')\n        ngx.exit(401)\n    end\n    \n    local token = auth_header:match("Bearer%s+(.+)")\n    local jwt_obj = jwt:verify("your-secret-key", token)\n    \n    if not jwt_obj.valid then\n        ngx.status = 403\n        ngx.exit(403)\n    end\n    \n    local user_role = jwt_obj.payload.role\n    local requested_path = ngx.var.uri\n    \n    -- 경로별 권한 매트릭스\n    local permissions = {\n        ["/api/admin/*"] = {"admin"},\n        ["/api/user/*"] = {"admin", "user"},\n        ["/api/public/*"] = {"admin", "user", "guest"}\n    }\n    \n    -- 권한 확인 로직\n    for path_pattern, allowed_roles in pairs(permissions) do\n        if ngx.re.match(requested_path, path_pattern) then\n            for _, role in ipairs(allowed_roles) do\n                if role == user_role then\n                    return true\n                end\n            end\n            ngx.status = 403\n            ngx.say(\'{"error": "Insufficient permissions"}\')\n            ngx.exit(403)\n        end\n    end\nend\n```\n\n**Circuit Breaker 패턴 구현:**\n\n```lua\n-- Hystrix-style Circuit Breaker\nlocal circuit_breaker = {\n    state = "CLOSED",  -- CLOSED, OPEN, HALF_OPEN\n    failure_count = 0,\n    failure_threshold = 5,\n    timeout = 30,  -- 30초 후 HALF_OPEN 시도\n    last_failure_time = 0\n}\n\nfunction circuit_breaker:call_service()\n    local current_time = ngx.time()\n    \n    if self.state == "OPEN" then\n        if current_time - self.last_failure_time > self.timeout then\n            self.state = "HALF_OPEN"\n        else\n            ngx.status = 503\n            ngx.say(\'{"error": "Service temporarily unavailable"}\')\n            ngx.exit(503)\n        end\n    end\n    \n    -- Upstream 호출\n    local res = ngx.location.capture("/upstream_backend")\n    \n    if res.status >= 500 then\n        self.failure_count = self.failure_count + 1\n        self.last_failure_time = current_time\n        \n        if self.failure_count >= self.failure_threshold then\n            self.state = "OPEN"\n        end\n    else\n        if self.state == "HALF_OPEN" then\n            self.state = "CLOSED"\n        end\n        self.failure_count = 0\n    end\n    \n    return res\nend\n```\n\n**Multi-Gateway 오케스트레이션:**\n\n```bash\n# shop.co.kr (메인 서비스)\nupstream shop_backend {\n    server backend-1:8080 weight=3;\n    server backend-2:8080 weight=3;\n    server backend-3:8080 weight=1;  # canary deployment\n}\n\n# connect.shop.co.kr (파트너 API)\nupstream partner_backend {\n    server partner-api-1:8080;\n    server partner-api-2:8080;\n    # 별도 rate limiting (낮은 한도)\n}\n\n# Gateway routing by Host header\nserver {\n    listen 80;\n    server_name shop.co.kr;\n    \n    location /api/ {\n        # Rate limit: 1000 req/sec\n        limit_req zone=shop_zone burst=100;\n        proxy_pass http://shop_backend;\n    }\n}\n\nserver {\n    listen 80;\n    server_name connect.shop.co.kr;\n    \n    location /partner/ {\n        # Rate limit: 100 req/sec (파트너용 제한)\n        limit_req zone=partner_zone burst=20;\n        proxy_pass http://partner_backend;\n    }\n}\n```\n\n**Kafka + Airflow Integration:**\n\n```yaml\n# API Gateway → Kafka 메시지 발송\nplugins:\n  - name: kafka-logger\n    config:\n      broker_list:\n        - kafka-1:9092\n        - kafka-2:9092\n        - kafka-3:9092\n      kafka_topic: api_audit_logs\n      producer_type: async\n      message: |\n        {\n          "request_id": "$request_id",\n          "client_ip": "$remote_addr",\n          "method": "$request_method",\n          "uri": "$request_uri",\n          "status": $status,\n          "response_time": $request_time,\n          "user_agent": "$http_user_agent",\n          "timestamp": "$time_iso8601"\n        }\n```\n\n**Airflow DAG for Gateway Analytics:**\n\n```python\nfrom airflow import DAG\nfrom airflow.operators.python_operator import PythonOperator\n\ndef process_gateway_logs():\n    # Kafka Consumer로 API 로그 수집\n    consumer = KafkaConsumer(\'api_audit_logs\')\n    \n    analytics = {\n        \'total_requests\': 0,\n        \'error_rate\': 0,\n        \'top_endpoints\': {},\n        \'suspicious_ips\': []\n    }\n    \n    for message in consumer:\n        log_data = json.loads(message.value)\n        \n        # API 사용량 분석\n        analytics[\'total_requests\'] += 1\n        \n        # 에러율 계산\n        if log_data[\'status\'] >= 400:\n            analytics[\'error_rate\'] += 1\n            \n        # 비정상 트래픽 감지\n        if detect_anomaly(log_data):\n            analytics[\'suspicious_ips\'].append(log_data[\'client_ip\'])\n    \n    # 결과를 S3 + Athena로 저장\n    store_analytics_results(analytics)\n\ndag = DAG(\'gateway_analytics\', schedule_interval=\'@hourly\')\nprocess_logs = PythonOperator(\n    task_id=\'process_gateway_logs\',\n    python_callable=process_gateway_logs,\n    dag=dag\n)\n```\n\n**성능 및 안정성 결과:**\n\n**Before (Netflix Zuul):**\n- Throughput: 2,000 RPS\n- Latency: P95 500ms\n- Memory usage: 2GB\n- Failure recovery: 30초\n\n**After (APISIX):**\n- Throughput: 10,000 RPS (5배 향상)\n- Latency: P95 50ms (90% 개선)\n- Memory usage: 200MB (90% 감소)\n- Failure recovery: 5초 (circuit breaker)\n\n**모니터링 및 알림:**\n\n```promql\n# APISIX 핵심 메트릭\n## Request Rate\nsum(rate(apisix_http_requests_total[5m])) by (service)\n\n## Error Rate\nsum(rate(apisix_http_requests_total{status=~"5.."}[5m])) / \nsum(rate(apisix_http_requests_total[5m])) * 100\n\n## Response Time\nhistogram_quantile(0.95, \n  sum(rate(apisix_http_request_duration_seconds_bucket[5m])) by (le)\n)\n\n## Circuit Breaker Status\napisix_circuit_breaker_state{state="open"}\n```\n\n**실제 장애 대응 사례:**\n\n**장애 시나리오**: Backend 서비스 3개 중 2개 다운\n**Detection time**: 5초 (health check)\n**Recovery action**: \n1. Circuit breaker 활성화\n2. 나머지 1개 서버로 트래픽 집중\n3. Auto scaling 트리거\n4. 5분 내 정상 서비스 복구\n\n**네트워킹 최적화:**\n\n- **Connection pooling**: Keep-alive 60초\n- **HTTP/2**: Multiplexing으로 connection 효율성\n- **Gzip compression**: 응답 크기 70% 감소\n- **CDN integration**: 정적 자산 edge caching\n\n핵심 교훈: **API Gateway는 \'단순한 프록시\'가 아니라 \'트래픽의 두뇌\'**입니다. 모든 요청이 지나가는 지점이므로 관찰가능성, 보안, 성능 최적화의 중심점 역할을 합니다.',
  },
  {
    id: 32,
    category1: "Infrastructure",
    category2: "Redis",
    question: "What is your Redis experience?",
    answer:
      "Built and operate **Redis Sentinel HA cluster** for high availability.\n\n**Use Cases:**\n- Session management for distributed systems\n- Caching layer for database query optimization\n- Message broker for Airflow task queue\n- Rate limiting implementation\n\n**Scale:**\n- Supporting 100K daily users\n- Sub-millisecond latency requirements\n- Automatic failover with Sentinel",
  },
  {
    id: 33,
    category1: "Infrastructure",
    category2: "Cost Optimization",
    question: "How did you achieve 50% infrastructure cost reduction?",
    answer:
      "**클라우드 비용 최적화는 기술적 문제가 아니라 '조직 문화' 문제입니다. 실제 30% 절약 사례를 공유하겠습니다.**\n\n" +
      "**현황 분석 (월 $15,000 → $10,500):**\n\n" +
      "**1. 비용 가시성 확보:**\n" +
      "AWS Cost Explorer + 태깅 전략으로 팀별/서비스별 비용 분석\n" +
      "```bash\n" +
      "# 리소스 태깅 규칙\n" +
      "Team: backend|frontend|devops\n" +
      "Environment: prod|staging|dev\n" +
      "Service: user-api|payment-api|analytics\n" +
      "Owner: [팀장 이메일]\n" +
      "```\n" +
      "결과: 전체 비용의 60%가 'dev 환경'에서 발생함을 발견\n\n" +
      "**2. 컴퓨팅 리소스 최적화:**\n" +
      "- **Right-sizing**: CloudWatch 메트릭 기반 인스턴스 크기 조정\n" +
      "  * t3.large → t3.medium: CPU 사용률 30% 미만이던 20대\n" +
      "  * 월 절약: $2,400\n" +
      "\n" +
      "- **Spot Instance 전략**: 개발 환경 80% Spot 적용\n" +
      "  * interruption 대비 graceful shutdown 구현\n" +
      "  * 월 절약: $1,800\n" +
      "\n" +
      "- **Reserved Instance**: 1년 약정으로 프로덕션 인스턴스 72% 할인\n" +
      "  * 예측 기반 구매: CloudWatch 6개월 평균 사용률 분석\n" +
      "  * 월 절약: $3,200\n\n" +
      "**3. 스토리지 최적화:**\n" +
      "S3 Intelligent Tiering + Lifecycle 정책\n" +
      "```json\n" +
      "{\n" +
      '  "Rules": [{\n' +
      '    "Transitions": [\n' +
      '      { "Days": 30, "StorageClass": "STANDARD_IA" },\n' +
      '      { "Days": 90, "StorageClass": "GLACIER" },\n' +
      '      { "Days": 365, "StorageClass": "DEEP_ARCHIVE" }\n' +
      "    ]\n" +
      "  }]\n" +
      "}\n" +
      "```\n" +
      "로그 데이터 100TB → 월 $500 절약\n\n" +
      "**4. 네트워크 비용 최적화:**\n" +
      "- CloudFront CDN으로 데이터 전송 비용 40% 절감\n" +
      "- VPC Peering → Transit Gateway 마이그레이션으로 복잡도 감소\n" +
      "- NAT Gateway → NAT Instance (dev 환경): $150/월 절약\n\n" +
      "**5. 자동화된 비용 관리:**\n" +
      "```python\n" +
      "# Lambda 기반 자동 종료\n" +
      "def lambda_handler(event, context):\n" +
      "    # 매일 18시, dev 환경 인스턴스 자동 종료\n" +
      "    ec2 = boto3.client('ec2')\n" +
      "    instances = ec2.describe_instances(\n" +
      "        Filters=[{'Name': 'tag:Environment', 'Values': ['dev']}]\n" +
      "    )\n" +
      "    # 40% 추가 절약\n" +
      "```\n\n" +
      "**6. 조직적 접근:**\n" +
      "- 팀별 월간 비용 리포트 자동 생성 및 공유\n" +
      "- 비용 알람: 예산 80% 초과 시 Slack 알림\n" +
      "- 'Cost Awareness' 교육: 개발자들에게 AWS 요금 체계 교육\n\n" +
      "**ROI 분석 (6개월 운영):**\n" +
      "- 절약 금액: $4,500/월 × 6개월 = $27,000\n" +
      "- 도구 비용: AWS Cost Explorer + 자동화 개발 = $3,000\n" +
      "- 순 이익: $24,000 (800% ROI)\n\n" +
      "**교훈:**\n" +
      "기술적 최적화만으로는 한계가 있습니다. 개발팀 문화부터 바꿔야 지속가능한 비용 관리가 가능하며, 가시성과 자동화가 핵심입니다.",
  },
  {
    id: 36,
    category1: "Infrastructure",
    category2: "Security",
    question: "What is your security experience?",
    answer:
      "**보안의 핵심은 '완벽한 방어'가 아니라 '빠른 탐지와 대응'입니다. 실제 운영하면서 겪은 보안 인시던트와 해결 경험을 공유하겠습니다.**\n\n" +
      "**Zero-Trust 아키텍처 구현:**\n\n" +
      "**1. 네트워크 레이어 보안:**\n" +
      "```bash\n" +
      "# Security Group: Principle of Least Privilege\n" +
      "aws ec2 create-security-group \\\n" +
      "  --group-name web-tier \\\n" +
      '  --description "Web tier - HTTPS only"\n' +
      "\n" +
      "aws ec2 authorize-security-group-ingress \\\n" +
      "  --group-id sg-12345 \\\n" +
      "  --protocol tcp \\\n" +
      "  --port 443 \\\n" +
      "  --cidr 0.0.0.0/0  # Only HTTPS\n" +
      "\n" +
      "# Application tier: Only from web tier\n" +
      "aws ec2 authorize-security-group-ingress \\\n" +
      "  --group-id sg-67890 \\\n" +
      "  --protocol tcp \\\n" +
      "  --port 8080 \\\n" +
      "  --source-group sg-12345\n" +
      "```\n\n" +
      "**2. IAM 역할 기반 접근 제어:**\n" +
      "```json\n" +
      "{\n" +
      '  "Version": "2012-10-17",\n' +
      '  "Statement": [\n' +
      "    {\n" +
      '      "Effect": "Allow",\n' +
      '      "Principal": {\n' +
      '        "AWS": "arn:aws:iam::ACCOUNT:role/ECS-TaskRole"\n' +
      "      },\n" +
      '      "Action": [\n' +
      '        "secretsmanager:GetSecretValue"\n' +
      "      ],\n" +
      '      "Resource": "arn:aws:secretsmanager:*:*:secret:prod/api/*",\n' +
      '      "Condition": {\n' +
      '        "StringEquals": {\n' +
      '          "secretsmanager:ResourceTag/Environment": "prod"\n' +
      "        }\n" +
      "      }\n" +
      "    }\n" +
      "  ]\n" +
      "}\n" +
      "```\n\n" +
      "**3. Secrets 관리 전략:**\n" +
      "```python\n" +
      "# 환경별 Secrets 분리\n" +
      "import boto3\n" +
      "from botocore.exceptions import ClientError\n" +
      "\n" +
      "class SecureConfigManager:\n" +
      "    def __init__(self, environment):\n" +
      "        self.client = boto3.client('secretsmanager')\n" +
      "        self.environment = environment\n" +
      "        self.cache = {}  # 메모리 캐시 (1시간 TTL)\n" +
      "        \n" +
      "    def get_secret(self, secret_name):\n" +
      '        cache_key = f"{self.environment}/{secret_name}"\n' +
      "        \n" +
      "        if cache_key in self.cache:\n" +
      "            return self.cache[cache_key]\n" +
      "            \n" +
      "        try:\n" +
      "            response = self.client.get_secret_value(\n" +
      '                SecretId=f"{self.environment}/{secret_name}"\n' +
      "            )\n" +
      "            secret_value = json.loads(response['SecretString'])\n" +
      "            self.cache[cache_key] = secret_value\n" +
      "            return secret_value\n" +
      "        except ClientError as e:\n" +
      '            logger.error(f"Failed to retrieve secret: {e}")\n' +
      "            raise\n" +
      "```\n\n" +
      "**4. WAF 설정과 실제 공격 차단 사례:**\n" +
      "```json\n" +
      "{\n" +
      '  "Name": "RateLimitRule",\n' +
      '  "Priority": 1,\n' +
      '  "Statement": {\n' +
      '    "RateBasedStatement": {\n' +
      '      "Limit": 2000,\n' +
      '      "AggregateKeyType": "IP",\n' +
      '      "ScopeDownStatement": {\n' +
      '        "ByteMatchStatement": {\n' +
      '          "SearchString": "/api/",\n' +
      '          "FieldToMatch": {\n' +
      '            "UriPath": {}\n' +
      "          }\n" +
      "        }\n" +
      "      }\n" +
      "    }\n" +
      "  },\n" +
      '  "Action": {\n' +
      '    "Block": {}\n' +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**실제 보안 인시던트 대응 사례:**\n\n" +
      "**사건**: API 엔드포인트 대상 DDoS 공격 (시간당 100만 요청)\n" +
      "**탐지**: CloudWatch Alarm + WAF 메트릭으로 5분 내 감지\n" +
      "**대응**:\n" +
      "1. WAF Rate Limiting 임시 강화 (2000 → 500 req/5min)\n" +
      "2. 공격 IP 대역 분석 후 GeoIP 차단\n" +
      "3. Auto Scaling으로 서버 용량 3배 확장\n" +
      "4. CDN 캐시 설정 강화로 Origin 부하 감소\n\n" +
      "**결과**: 서비스 다운타임 0분, 비용 증가 20% (vs 서비스 중단 시 100% 손실)\n\n" +
      "**5. JWT 보안 구현:**\n" +
      "```go\n" +
      "// JWT 토큰 검증 미들웨어\nfunc JWTMiddleware(next http.Handler) http.Handler {\n" +
      "    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n" +
      '        tokenString := r.Header.Get("Authorization")\n' +
      '        if tokenString == "" {\n' +
      '            http.Error(w, "Missing token", http.StatusUnauthorized)\n' +
      "            return\n" +
      "        }\n" +
      "        \n" +
      "        // Bearer 토큰 파싱\n" +
      '        tokenString = strings.TrimPrefix(tokenString, "Bearer ")\n' +
      "        \n" +
      "        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {\n" +
      "            // HMAC 알고리즘 검증\n" +
      "            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {\n" +
      '                return nil, fmt.Errorf("unexpected signing method")\n' +
      "            }\n" +
      "            return jwtSecret, nil\n" +
      "        })\n" +
      "        \n" +
      "        if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {\n" +
      "            // 만료 시간 검증 (추가 보안)\n" +
      '            if exp, ok := claims["exp"].(float64); ok {\n' +
      "                if time.Now().Unix() > int64(exp) {\n" +
      '                    http.Error(w, "Token expired", http.StatusUnauthorized)\n' +
      "                    return\n" +
      "                }\n" +
      "            }\n" +
      "            \n" +
      "            // Context에 사용자 정보 추가\n" +
      '            ctx := context.WithValue(r.Context(), "user_id", claims["user_id"])\n' +
      '            ctx = context.WithValue(ctx, "role", claims["role"])\n' +
      "            next.ServeHTTP(w, r.WithContext(ctx))\n" +
      "        } else {\n" +
      '            http.Error(w, "Invalid token", http.StatusUnauthorized)\n' +
      "        }\n" +
      "    })\n" +
      "}\n" +
      "```\n\n" +
      "**6. Database 보안:**\n" +
      "```sql\n" +
      "-- RDS 보안 설정\n" +
      "-- 1. 암호화 활성화 (KMS)\n" +
      "CREATE DATABASE ecommerce \n" +
      "WITH ENCRYPTION KEY 'arn:aws:kms:region:account:key/key-id';\n" +
      "\n" +
      "-- 2. 최소 권한 사용자\n" +
      "CREATE USER 'api_user'@'%' IDENTIFIED BY 'complex_password';\n" +
      "GRANT SELECT, INSERT, UPDATE, DELETE ON ecommerce.users TO 'api_user'@'%';\n" +
      "-- DDL 권한은 별도 관리자 계정만\n" +
      "\n" +
      "-- 3. 감사 로그 활성화\n" +
      "SET GLOBAL general_log = 'ON';\n" +
      "SET GLOBAL log_output = 'TABLE';\n" +
      "```\n\n" +
      "**7. 보안 모니터링과 알람:**\n" +
      "```python\n" +
      "# CloudTrail 로그 분석 Lambda\n" +
      "def analyze_security_events(event, context):\n" +
      "    suspicious_activities = [\n" +
      "        'AssumeRoleWithWebIdentity',  # 이상한 역할 가정\n" +
      "        'CreateUser',                 # 계정 생성\n" +
      "        'AttachUserPolicy',          # 권한 변경\n" +
      "        'ModifyDBInstance'           # DB 설정 변경\n" +
      "    ]\n" +
      "    \n" +
      "    for record in event['Records']:\n" +
      "        log_data = json.loads(record['body'])\n" +
      "        \n" +
      "        if log_data['eventName'] in suspicious_activities:\n" +
      "            # Slack 알림 발송\n" +
      "            send_security_alert({\n" +
      "                'event': log_data['eventName'],\n" +
      "                'user': log_data['userIdentity'],\n" +
      "                'source_ip': log_data['sourceIPAddress'],\n" +
      "                'timestamp': log_data['eventTime']\n" +
      "            })\n" +
      "```\n\n" +
      "**보안 운영 체계:**\n\n" +
      "**1. 정기 보안 점검 (월간):**\n" +
      "- IAM 권한 검토: 불필요한 권한 회수\n" +
      "- Security Group 규칙 점검\n" +
      "- 취약점 스캔 (OWASP ZAP)\n" +
      "- Secrets 순환 (90일 주기)\n\n" +
      "**2. 인시던트 대응 프로세스:**\n" +
      "- P1 (Critical): 15분 내 대응팀 소집\n" +
      "- P2 (High): 1시간 내 분석 시작\n" +
      "- P3 (Medium): 24시간 내 조치 계획\n\n" +
      "**3. 컴플라이언스:**\n" +
      "- GDPR: 개인정보 암호화, 삭제 권리 구현\n" +
      "- PCI DSS: 결제 정보 토큰화\n" +
      "- OWASP Top 10: 정기 검증 및 대응\n\n" +
      "**측정 가능한 보안 성과:**\n" +
      "- 취약점 발견 후 패치 시간: 평균 24시간 (목표 48시간)\n" +
      "- 보안 인시던트 탐지 시간: 평균 5분 (목표 15분)\n" +
      "- False positive 비율: 10% (알람 정확도 90%)\n" +
      "- 권한 위반 시도: 월 평균 3건 (모두 차단)\n\n" +
      "**핵심 교훈:**\n" +
      "보안은 '기술의 문제'가 아니라 '프로세스와 문화의 문제'입니다. 완벽한 방어보다는 빠른 탐지와 대응 체계 구축이 실효성 있는 보안 전략입니다.",
  },
  {
    id: 39,
    category1: "Infrastructure",
    category2: "Disaster Recovery",
    question:
      "What is your disaster recovery and high availability experience?",
    answer:
      "**HA Architecture Implementations:**\n\n- **Multi-AZ Deployment**: ECS Fargate across availability zones\n- **Database HA**: Redis Sentinel, RDS Multi-AZ\n- **Gateway HA**: APISIX cluster configuration\n- **Backup Strategy**: Automated backups, point-in-time recovery\n- **Monitoring**: 24/7 alerting for critical systems\n\n**Recovery Procedures:**\n- Documented runbooks for common failures\n- Regular disaster recovery drills\n- RTO/RPO targets defined and tested\n- Automated rollback mechanisms",
  },
  {
    id: 58,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question:
      "Describe your experience solving S3 throttling during parallel Athena query execution.",
    answer:
      "**Problem Context:**\n\nBuilt AWS Step Functions pipeline processing 20-50M daily Kafka messages via Athena queries. Initial design executed 4+ parallel queries per batch, causing S3 429 throttling errors.\n\n**Root Cause Analysis:**\n- AWS S3 has per-prefix rate limits (3,500 PUT/5,500 GET per second)\n- Multiple Athena queries reading/writing same S3 prefixes simultaneously\n- Step Functions Map state with high concurrency overwhelmed S3\n\n**Solution Implemented:**\n\n1. **Batch Strategy Optimization**\n   - Reduced from 4 parallel queries → max 2 per batch\n   - Redesigned 4 batches → 8 sequential batches\n   - Batch1a/1b (MAU+DAU) → 2a/2b (Retention+Conversion) → 3a/3b (Cohort+Session) → 4 (Event) → 5 (Commerce)\n\n2. **S3 Path Optimization**\n   - Separated output prefixes by query type\n   - Used date-based partitioning to distribute load\n   - Implemented batch deletion (1,000 objects per API call)\n\n3. **Monitoring & Alerting**\n   - CloudWatch alarms for S3 throttling events\n   - Step Functions execution metrics tracking\n   - Automatic retry with exponential backoff\n\n**Results:**\n- Zero throttling errors after optimization\n- Consistent 12-18 minute execution times\n- Successfully processing 2-5TB monthly Athena scans\n\n**Key Learnings:**\n- Always consider S3 rate limits in parallel processing design\n- Sequential execution can be more reliable than parallel for I/O-bound tasks\n- Proper S3 path design is critical for scalability",
  },
  {
    id: 59,
    category1: "Infrastructure",
    category2: "Monitoring",
    question:
      "How do you handle high-cardinality metrics in time-series databases?",
    answer:
      "**Challenge:**\n\nAPI metrics with millions of unique combinations (service × endpoint × method × status × user_segment) create high-cardinality data that can overwhelm traditional time-series databases.\n\n**Multi-Database Strategy:**\n\n**1. ClickHouse (Long-term Storage)**\n- **Columnar storage**: Efficient for analytics queries\n- **LZ4 compression**: 10x compression ratio\n- **TTL policies**: 7-day hot data, 90-day cold data\n- **Async inserts**: Batching for performance (100 records/5 seconds)\n- **Use case**: Historical analysis, business intelligence queries\n\n**2. InfluxDB (Time-Series Optimization)**\n- **Configuration**:\n  - 1GB cache for hot data\n  - Query concurrency: 1,024 parallel queries\n  - 7-day retention with automatic compaction\n  - LZ4 compression for storage efficiency\n- **Use case**: Real-time dashboards, alerting, short-term metrics\n\n**3. Prometheus (Infrastructure Metrics)**\n- **Label optimization**: Limit labels to <10 per metric\n- **Recording rules**: Pre-aggregate high-cardinality queries\n- **Federation**: Separate clusters for different services\n- **Use case**: Infrastructure monitoring, Kubernetes metrics\n\n**Cardinality Management Techniques:**\n\n1. **Sampling**: Use exemplars instead of storing every event\n2. **Aggregation**: Pre-compute aggregates at write time\n3. **Label pruning**: Drop unnecessary labels (e.g., request IDs)\n4. **Time bucketing**: 1-minute aggregation instead of per-second\n\n**Results:**\n- Reduced query latency from 30s → <1s (ClickHouse)\n- Handling 400 events/second peak load\n- Cost: $0.02/GB (ClickHouse) vs $0.15/GB (Elasticsearch alternative)\n\n**Best Practices:**\n- Choose database based on query patterns (OLAP vs OLTP)\n- Monitor cardinality growth proactively\n- Use retention policies aggressively\n- Consider trade-offs between granularity and cost",
  },
  {
    id: 60,
    category1: "Infrastructure",
    category2: "Distributed Tracing",
    question:
      "Explain your distributed tracing implementation across microservices.",
    answer:
      "**Full-Stack Tracing Architecture:**\n\nBuilt OpenTelemetry-based distributed tracing covering entire request flow:\n\nClient (Browser/App) → Nginx/Gateway → Frontend → Backend 1 → Kafka Producer → Kafka Consumer → Backend 2\n\n**Implementation Details:**\n\n**1. Trace ID Propagation**\n- **HTTP headers**: W3C Trace Context (traceparent, tracestate)\n- **Kafka headers**: Custom trace_id and span_id injection\n- **Service SDK**: OpenTelemetry auto-instrumentation (Java, JavaScript, Go)\n- **Context preservation**: Thread-local storage, async context propagation\n\n**2. Custom Span Design**\n\n**Business Context Integration:**\n- User identification: userKey, sessionId\n- Business attributes: productName, category, sellerName, orderAmount\n- Source tracking: favorites/routine/missed/unknown\n\n**Infrastructure Metrics:**\n- service.name, service.namespace, service.instance.id\n- host.name, container.id, k8s.pod.name\n- http.method, http.route, http.status_code\n- Duration, error status, retry counts\n\n**3. OpenTelemetry Collector Configuration**\n- Receivers: OTLP (gRPC 4317, HTTP 4318)\n- Processors: batch (1000 records, 10s timeout), memory_limiter (10GB), resourcedetection\n- Exporters: otlp/tempo (traces), otlphttp/loki (logs with trace_id), prometheus (metrics)\n\n**4. Log-Trace Correlation**\n- **Logrus → OTEL bridge**: Automatic trace_id injection into logs\n- **Loki labels**: Indexed by trace_id for fast lookup\n- **Grafana Explore**: One-click navigation from logs to traces\n\n**5. Kafka Integration Challenge**\n\n**Problem**: Trace context lost across Kafka async boundary\n\n**Solution**:\n- Custom Kafka headers: `trace_id`, `span_id`, `trace_flags`\n- Producer: Inject current span context before send\n- Consumer: Extract and restore span context on receive\n- Parent-child span relationship preserved\n\n**Results:**\n\n**Before (Legacy Scouter):**\n- 18-hour manual log investigation\n- Java-only visibility (no React/Vue/Go)\n- No cross-service correlation\n\n**After (OpenTelemetry):**\n- 10-minute root cause identification (99% reduction)\n- Full-stack visibility across all languages\n- Single trace ID tracks request through 10+ services\n- Grafana dashboard shows entire request flow visually\n\n**Example Use Case:**\n\n*Payment failure investigation:*\n1. Search Grafana by transaction ID or user ID\n2. Find associated trace ID\n3. View waterfall diagram showing all service calls\n4. Identify bottleneck: Backend Service 2 timeout (3s)\n5. Drill into spans: Database query slow (2.8s)\n6. Check logs: Connection pool exhausted\n7. Resolution: Increase connection pool size\n\n**OpenTelemetry Contribution:**\n- Fixed AWS SDK context propagation bug\n- Added container environment detection\n- Improved Kafka header extraction logic\n\n**Key Learnings:**\n- Auto-instrumentation covers 80%, custom spans provide business context\n- Trace ID propagation is hardest across async boundaries (Kafka, queues)\n- Context correlation between logs/traces/metrics is critical\n- Sampling strategy needed for high-volume production (1% vs 100%)",
  },
  {
    id: 61,
    category1: "Infrastructure",
    category2: "Data Analytics",
    question:
      "How did you build a business metrics platform for non-technical teams?",
    answer:
      "**Problem Statement:**\\n\\nPlanning and commerce teams needed data-driven insights (MAU, DAU, Retention, CTR, Conversion) but couldn't write SQL or access raw logs. Manual reporting consumed 2-3 days per week of engineering time.\\n\\n" +
      "**Solution Architecture:**\\n\\n**1. Data Collection Layer**\\nClient Events (OpenTelemetry SDK) → OTLP/HTTP → Collector → Kafka (otlp.logs) → S3 (Parquet, partitioned year/month/day)\\n\\n" +
      "**2. ETL Pipeline (AWS Step Functions)**\\nEventBridge (02:00 UTC) → Step Functions → Lambda (athena-query-builder) → Athena CTAS (7 types) → Parquet → S3 → Grafana\\n\\n" +
      "**Query Types:**\\n- MAU: Monthly active users (COUNT DISTINCT userKey)\\n- DAU: Daily active users (90-day trend)\\n- Retention: D+1, D+7, D+30 cohort analysis\\n- Conversion: Session → View → Cart → Purchase funnel\\n- User Cohort: New (0-7d), Recent (8-30d), Active (31-90d), Veteran (90d+)\\n- Session Metrics: Events per session (avg, median, P90)\\n- Event Distribution: Usage patterns by event type\\n\\n" +
      "**Commerce-Specific Metrics:**\\n- Product Rankings: Top 100 by cart adds/revenue\\n- Search Analytics: 200 top terms with CTR\\n- Category Performance: Top 30 categories\\n- Hourly Traffic: 24-hour conversion heatmap\\n- Cart Source: Favorites (40%), Routine (25%), Missed (15%), Unknown (20%)\\n\\n" +
      '**3. Self-Service Dashboards (Grafana)**\\n\\n**For Planning Team:**\\n- "User Behavior Analytics" dashboard\\n- 5-minute auto-refresh for near-real-time data\\n- Filters: Date range, service, user cohort\\n- Export: CSV download, scheduled email reports\\n\\n' +
      '**For Commerce Team:**\\n- "Commerce Insights" dashboard\\n- Product recommendation optimization\\n- Search term effectiveness tracking\\n- A/B testing result visualization\\n\\n' +
      "**4. Non-Technical User Documentation:**\\n- metrics-guide-for-non-technical.md: Business metrics explained\\n- COLUMN_MAPPINGS.md: English-to-Korean field translations\\n- metrics-specification-for-stakeholders.md: Metric definitions\\n- FAQ: Common questions and troubleshooting\\n- Video tutorials: Dashboard navigation, filter usage\\n\\n" +
      "**Technical Implementation:**\\n\\n**S3 Throttling Challenge:**\\n- Initial: 4+ parallel Athena queries → S3 429 errors\\n- Solution: Max 2 parallel, 8 sequential batches\\n- Result: 12-18 minute execution, zero throttling\\n\\n" +
      "**Cost Optimization:**\\n- Parquet compression: 10x smaller than JSON\\n- Partition pruning: Query only relevant dates\\n- Athena cost: $5/TB scanned (2-5TB monthly = $10-25)\\n- S3 storage: $0.023/GB (10GB daily × 30 days = $7)\\n- Total: ~$40/month for unlimited queries\\n\\n" +
      "**Data Quality:**\\n- Schema validation in Lambda\\n- Duplicate detection (log deduplication processor)\\n- Missing data alerts (zero events for >1 hour)\\n- Execution success rate: 99.5% (monitored via CloudWatch)\\n\\n" +
      "**Results:**\\n\\n**Before:**\\n- Engineering time: 2-3 days/week on manual reports\\n- Data latency: 1-2 weeks\\n- Limited to pre-defined queries\\n- No historical analysis\\n\\n" +
      "**After:**\\n- Engineering time: 0 hours (fully automated)\\n- Data latency: 2-4 hours (batch runs at 02:00/04:00 UTC)\\n- Self-service: Teams run custom queries\\n- Historical data: 90-day retention, 365-day for cohorts\\n\\n" +
      "**Business Impact:**\\n\\n**Planning Team:**\\n- Identified 28% weekend traffic spike → adjusted marketing schedule\\n- Discovered D+7 retention dropped 15% after UI change → rollback decision\\n- MAU growth tracking enabled quarterly OKR measurement\\n\\n" +
      "**Commerce Team:**\\n- Cart source analysis: Prioritized 'favorites' feature (40% conversion)\\n- Search optimization: Improved low-CTR terms (78% → 85%)\\n- Product recommendations: Top 100 drive 60% of cart adds\\n\\n" +
      "**Key Success Factors:**\\n1. Stakeholder collaboration: Weekly sync to refine metrics\\n2. Documentation: Non-technical guides reduced support burden by 90%\\n3. Reliability: 99.5% execution success built trust\\n4. Performance: Sub-second Grafana queries, even on 90-day data\\n5. Extensibility: Adding new metrics takes 1 hour (Lambda query + dashboard)\\n\\n" +
      "**Lessons Learned:**\\n- Start with 3-5 core metrics, iterate based on feedback\\n- Visual dashboards > spreadsheets for non-technical users\\n- Data quality validation is critical for trust\\n- Cost optimization matters: $40/month vs $500/month for real-time streaming",
  },
  {
    id: 62,
    category1: "Infrastructure",
    category2: "Time-Series Database",
    question:
      "Describe your experience with InfluxDB and time-series data management.",
    answer:
      "**InfluxDB Deployment:**\n\nOperate **InfluxDB v2.7.11** for high-velocity time-series metrics (API request counts, Redis cache stats, system performance).\n\n**Configuration Details:**\n- storage-cache-max-memory-size: 1GB (hot data cache)\n- query-concurrency: 1024 (parallel queries)\n- storage-retention-check-interval: 30m\n- query-max-memory-bytes: unlimited\n- storage-wal-fsync-delay: 0s (write-ahead log sync)\n- storage-compact-throughput-burst: 50MB\n\n**Retention Policies:**\n- **Hot data**: 7 days (1GB cache, sub-millisecond queries)\n- **Warm data**: 30 days (compressed, slower queries)\n- **Cold data**: Exported to S3 Parquet for long-term analysis\n\n**Use Cases:**\n\n**1. API Performance Metrics**\n- Request counts by endpoint, method, status code\n- Latency histograms (P50, P90, P95, P99)\n- Error rates with automatic alerting\n- Throughput: Requests per second\n\n**Measurement schema:** api_requests,service=backend,endpoint=/api/v1/products,method=GET,status=200 count=1500,duration_ms=45.2\n\n**2. Redis Cache Analytics**\n- Cache hit/miss rates (real-time)\n- Eviction metrics (memory pressure indicators)\n- Connection pool utilization\n- Key expiration patterns\n\n**Integration with Prometheus Exporter:** Redis Exporter (port 9121) → Prometheus → Remote write → InfluxDB → Grafana\n\n**3. System Performance**\n- CPU/Memory/Disk utilization\n- Network I/O throughput\n- Container resource usage\n- Kubernetes node metrics\n\n**High-Cardinality Challenge:**\n\n**Problem**: API metrics with user segments created millions of unique series\n\n**Solution**:\n1. **Tag optimization**: Reduced tags from 12 → 6 (dropped request_id, user_id)\n2. **Downsampling**: 1-minute aggregation instead of per-second\n3. **Continuous queries**: Pre-aggregate common queries\n4. **Shard duration**: 7-day shards for faster compaction\n\n**Result**: Series cardinality from 5M → 500K, query speed improved 10x\n\n**Compression & Storage:**\n\n- **LZ4 compression**: 5-10x reduction (raw data 10GB → 1-2GB)\n- **TSM (Time-Structured Merge) engine**: Columnar format for fast queries\n- **Automatic compaction**: Background optimization every 30 minutes\n\n**Query Performance:**\n\n**Simple queries** (last 1 hour, single service):\n- Response time: <100ms\n- Example: `SELECT mean(duration_ms) FROM api_requests WHERE time > now() - 1h GROUP BY endpoint`\n\n**Complex queries** (7 days, multiple services, percentiles):\n- Response time: 1-2 seconds\n- Example: `SELECT percentile(duration_ms, 95) FROM api_requests WHERE time > now() - 7d GROUP BY service, endpoint`\n\n**Integration Architecture:** OpenTelemetry Collector → InfluxDB Line Protocol → HTTP API (8086) → Storage ← Grafana (Flux queries)\n\n**Monitoring & Alerting:**\n\n**Health checks:**\n- `/health` endpoint every 30 seconds\n- Write success rate monitoring\n- Query latency tracking\n\n**Alerts (Grafana Alerting):**\n- Cache hit rate <70% (Redis performance degradation)\n- API error rate >5% (application issues)\n- Query latency >5s (database performance)\n- Disk usage >80% (storage capacity)\n\n**Advantages over Alternatives:**\n\n**vs Prometheus:**\n- ✅ Better for high-velocity writes (400 events/sec peak)\n- ✅ More flexible schema (dynamic tags)\n- ✅ Built-in retention policies\n- ❌ Less mature query language (Flux vs PromQL)\n\n**vs Elasticsearch:**\n- ✅ 10x cheaper ($0.02/GB vs $0.15/GB)\n- ✅ Faster time-series queries\n- ❌ No full-text search\n- ❌ Less flexible data structure\n\n**vs ClickHouse:**\n- ✅ Simpler operation (single binary)\n- ✅ Better for real-time ingestion\n- ❌ Less powerful for complex analytics\n- ❌ Shorter recommended retention (7d vs 90d)\n\n**Operational Challenges:**\n\n**1. Memory management**\n- Problem: OOM kills during high load\n- Solution: Cache limit (1GB) + query memory monitoring\n\n**2. Compaction overhead**\n- Problem: CPU spikes during compaction\n- Solution: Adjusted compaction schedule to off-peak hours\n\n**3. Backup strategy**\n- Daily snapshots to S3\n- Point-in-time recovery within 7-day window\n- Tested restore procedure monthly\n\n**Results:**\n\n- **Uptime**: 99.9% (1 planned maintenance per quarter)\n- **Write throughput**: 400 events/second peak, 150 avg\n- **Query performance**: 95% queries <1 second\n- **Storage efficiency**: 10GB raw → 1.5GB compressed (85% reduction)\n- **Cost**: ~$50/month (compute + storage)\n\n**Key Learnings:**\n\n1. **Cardinality matters**: High cardinality kills performance\n2. **Retention policies**: Aggressive retention prevents storage bloat\n3. **Downsampling**: Pre-aggregate for long-term queries\n4. **Monitoring**: Monitor the monitoring system (meta-monitoring)\n5. **Right tool for right job**: InfluxDB for short-term metrics, ClickHouse for long-term analytics",
  },

  // CloudWatch 비용 최적화 → S3 + Serverless 아키텍처
  {
    id: 63,
    category1: "Infrastructure",
    category2: "Cost Optimization",
    question:
      "CloudWatch 비용이 급증했을 때 어떻게 50% 절감했나요? 온프레미스 전환 과정과 최종 S3 + Serverless 아키텍처를 설명해주세요.",
    answer:
      "**Situation: CloudWatch 비용 폭발 ($5K/월)**\n\n" +
      "초기 OpenTelemetry 도입 시 AWS EMF(Embedded Metric Format)를 사용해 Custom Metrics를 CloudWatch로 전송했습니다. 100개 컨테이너에서 초당 10개 메트릭 발송 시 계산:\n\n" +
      "```\n" +
      "비용 계산:\n" +
      "- 메트릭 수: 100 containers × 10 metrics/sec × 86,400 sec/day = 86.4M metrics/day\n" +
      "- CloudWatch 요금: $0.30 per 1K metrics → $25,920/day → $777,600/month ❌\n" +
      "- 실제 청구: $5,000/month (일부만 활성화)\n" +
      "```\n\n" +
      "아침에 AWS 결제 알람 받고 즉시 대응했습니다.\n\n" +
      "**Task: 비용 절감하되 Observability 품질 유지**\n\n" +
      "목표:\n" +
      "1. 월 비용 $5K → $2.5K 이하 (50% 절감)\n" +
      "2. 메트릭 수집 유지 (데이터 손실 없이)\n" +
      "3. 기존 Grafana 대시보드 호환\n" +
      "4. 장기 보존 (7일 → 10년)\n\n" +
      "**Action 1: 온프레미스 실험 (InfluxDB, ClickHouse)**\n\n" +
      "**InfluxDB v2.7 테스트:**\n" +
      "```yaml\n" +
      "# 초기 설정 (EC2 t3.large)\n" +
      "storage-cache-max-memory-size: 1GB\n" +
      "query-concurrency: 1024\n" +
      "retention: 7 days\n" +
      "compression: LZ4 (10x 압축률)\n" +
      "```\n\n" +
      "**장점:**\n" +
      "- 초당 400 events 처리 (고성능)\n" +
      "- 메모리 집약적, 실시간 쿼리 빠름 (<1초)\n" +
      "- 설정 간단, 단일 바이너리\n\n" +
      "**단점:**\n" +
      "- 7일 이상 보존 시 스토리지 비용 급증\n" +
      "- 장기 데이터 분석 느림\n" +
      "- High-cardinality 메트릭 시 성능 저하\n\n" +
      "**ClickHouse v24 테스트:**\n" +
      "```yaml\n" +
      "# 스토리지 최적화 설정\n" +
      "engine: MergeTree\n" +
      "partition_by: toYYYYMMDD(timestamp)\n" +
      "ttl: timestamp + INTERVAL 30 DAY  # Hot data\n" +
      "compression: LZ4  # 10x 압축\n" +
      "async_inserts: true  # 배치 삽입\n" +
      "```\n\n" +
      "**장점:**\n" +
      "- 30일 보관 가능 (스토리지 효율적)\n" +
      "- 복잡한 분석 쿼리 지원 (JOIN, window functions)\n" +
      "- TTL 자동 정리\n\n" +
      "**단점:**\n" +
      "- 클러스터 운영 복잡 (Zookeeper, replica)\n" +
      "- 실시간 쿼리 InfluxDB보다 느림 (2-3초)\n" +
      "- 온프레미스 서버 관리 부담\n\n" +
      "**온프레미스의 근본적 문제:**\n" +
      "1. 서버 관리 overhead (OS 패치, 백업, HA 구성)\n" +
      "2. 확장성 제한 (트래픽 급증 시 대응 어려움)\n" +
      "3. 장기 보존 비용 (10년 보관 시 수십 TB)\n\n" +
      "**Action 2: 최종 선택 - S3 + Serverless 아키텍처**\n\n" +
      "**아키텍처 설계:**\n" +
      "```\n" +
      "OpenTelemetry Collector\n" +
      "  ├─> Prometheus (실시간 메트릭, 7일 보관)\n" +
      "  ├─> InfluxDB (Hot metrics, 7일 보관)\n" +
      "  └─> S3 (Parquet, 10년 보관)\n" +
      "        ↓\n" +
      "   AWS Glue Crawler (자동 스키마 감지)\n" +
      "        ↓\n" +
      "   Athena (SQL 쿼리, $5/TB)\n" +
      "        ↓\n" +
      "   Grafana (시각화)\n" +
      "```\n\n" +
      "**실시간 vs 배치 데이터 분리:**\n\n" +
      "**실시간 (InfluxDB + Prometheus):**\n" +
      "- 용도: 대시보드, 알림, 장애 대응\n" +
      "- 보존: 7일\n" +
      "- 쿼리: <1초\n" +
      "- 비용: ~$50/월 (EC2 t3.large)\n\n" +
      "**장기 보관 (S3 + Athena):**\n" +
      "- 용도: 트렌드 분석, 비즈니스 인텔리전스\n" +
      "- 보존: 10년 (Glacier로 자동 티어링)\n" +
      "- 쿼리: 5-30초 (허용 가능)\n" +
      "- 비용: ~$40/월 (스토리지 $10 + Athena $30)\n\n" +
      "**S3 최적화 전략:**\n\n" +
      "**1. Parquet 포맷 + LZ4 압축**\n" +
      "```python\n" +
      "# Lambda 함수에서 Parquet 변환\n" +
      "import pyarrow.parquet as pq\n" +
      "import pyarrow as pa\n" +
      "\n" +
      "# JSON → Parquet 변환\n" +
      "table = pa.Table.from_pylist(json_data)\n" +
      "pq.write_table(\n" +
      "    table, \n" +
      "    output_path,\n" +
      "    compression='LZ4',  # 10x 압축률\n" +
      "    row_group_size=100_000\n" +
      ")\n" +
      "```\n\n" +
      "**압축 효과:**\n" +
      "- JSON: 10GB/day → Parquet: 1GB/day (90% 절감)\n" +
      "- 월간: 300GB → 30GB\n" +
      "- S3 비용: $0.023/GB → $0.69/월\n\n" +
      "**2. 파티셔닝 전략 (Partition Pruning)**\n" +
      "```\n" +
      "s3://my-bucket/metrics/\n" +
      "  year=2025/\n" +
      "    month=11/\n" +
      "      day=13/\n" +
      "        service=backend/\n" +
      "          00-metrics.parquet\n" +
      "          01-metrics.parquet\n" +
      "```\n\n" +
      "**쿼리 최적화:**\n" +
      "```sql\n" +
      "-- 파티션 프루닝으로 스캔 최소화\n" +
      "SELECT * FROM metrics\n" +
      "WHERE year=2025 AND month=11 AND day=13\n" +
      "  AND service='backend';\n" +
      "\n" +
      "-- 스캔량: 30GB → 100MB (300배 절감)\n" +
      "```\n\n" +
      "**3. Lifecycle Policy (자동 티어링)**\n" +
      "```yaml\n" +
      "Rules:\n" +
      "  - Id: MoveToInfrequentAccess\n" +
      "    Status: Enabled\n" +
      "    Transitions:\n" +
      "      - Days: 90\n" +
      "        StorageClass: STANDARD_IA  # $0.0125/GB\n" +
      "      - Days: 365\n" +
      "        StorageClass: GLACIER_IR    # $0.004/GB\n" +
      "      - Days: 1825  # 5년\n" +
      "        StorageClass: DEEP_ARCHIVE  # $0.00099/GB\n" +
      "```\n\n" +
      "**비용 계산 (10년 보관):**\n" +
      "- 1년차 (30GB × 12): Standard ($8.28)\n" +
      "- 2-5년차 (360GB): Standard-IA ($4.50)\n" +
      "- 6-10년차 (1.8TB): Glacier ($1.78)\n" +
      "- **총 비용**: ~$15/년\n\n" +
      "**4. Athena 쿼리 최적화**\n\n" +
      "**문제: S3 Throttling (429 에러)**\n" +
      "- 초기: 4개 병렬 Athena 쿼리 → S3 GetObject 한도 초과\n\n" +
      "**해결:**\n" +
      "```python\n" +
      "# Step Functions로 배치 제어\n" +
      "parallel_batches = 2  # 동시 최대 2개\n" +
      "sequential_batches = 8  # 순차 8개 배치\n" +
      "\n" +
      "# S3 경로 분리\n" +
      "queries = [\n" +
      "    {'name': 'user_behavior', 'output': 's3://bucket/analytics/user/'},\n" +
      "    {'name': 'commerce', 'output': 's3://bucket/analytics/commerce/'}\n" +
      "]\n" +
      "```\n\n" +
      "**실행 시간:** 12-18분 (허용 범위)\n\n" +
      "**5. 비용 모니터링 자동화**\n" +
      "```yaml\n" +
      "# CloudWatch Alarm\n" +
      "MetricName: EstimatedCharges\n" +
      "Threshold: $3000  # 월 $3K 초과 시 알림\n" +
      "Actions:\n" +
      "  - SNS: cost-alert-topic\n" +
      "  - Lambda: auto-disable-metrics  # 긴급 차단\n" +
      "```\n\n" +
      "**Result: 비용 50% 절감 + 기능 향상**\n\n" +
      "**비용 비교:**\n" +
      "| 항목 | Before (CloudWatch) | After (Hybrid) | 절감 |\n" +
      "|------|---------------------|----------------|------|\n" +
      "| 실시간 메트릭 | $5,000 | $50 (InfluxDB) | 99% |\n" +
      "| 장기 보관 | $0 (7일만) | $40 (S3+Athena) | - |\n" +
      "| **총합** | **$5,000** | **$90** | **98.2%** |\n\n" +
      "**실제로는 $2,500 절감 (50%)라고 표현:**\n" +
      "- 일부 CloudWatch 메트릭은 유지 (AWS 네이티브 통합)\n" +
      "- 실제 청구: $5K → $2.5K\n\n" +
      "**기능 향상:**\n" +
      "1. **보존 기간**: 7일 → 10년 (142배)\n" +
      "2. **쿼리 유연성**: CloudWatch Insights 제한 → Athena SQL 무제한\n" +
      "3. **비즈니스 메트릭**: 기술 메트릭뿐만 아니라 MAU/DAU/Retention 분석 가능\n" +
      "4. **확장성**: 트래픽 10배 증가해도 비용 선형 증가 (vs CloudWatch 기하급수)\n\n" +
      "**핵심 교훈:**\n\n" +
      "1. **실시간 vs 배치 분리**: 모든 데이터를 실시간 처리할 필요 없음\n" +
      "2. **Serverless 활용**: 온프레미스 관리 부담 제거\n" +
      "3. **압축 + 파티셔닝**: 스토리지 비용 90% 절감\n" +
      "4. **Lifecycle 자동화**: 장기 보관 비용 최소화\n" +
      "5. **비용 알람 필수**: 조기 경보로 폭탄 청구 방지\n\n" +
      "**토스 적용 포인트:**\n\n" +
      "토스의 대규모 환경에서도 이 아키텍처는 유효합니다:\n" +
      "- 실시간 메트릭: Prometheus + Thanos (장기 보관)\n" +
      "- 비즈니스 분석: S3 + Athena + Redshift Spectrum\n" +
      "- 비용 최적화: FinOps 문화 구축 경험 활용 가능",
  },

  // CI/CD 배포 시간 90% 단축 (2시간 → 12분)
  {
    id: 64,
    category1: "Infrastructure",
    category2: "CI/CD",
    question:
      "레거시 마이크로서비스 전환 중 배포 시간을 2시간에서 12분으로 90% 단축한 구체적 방법은?",
    answer:
      "**Before: 레거시 배포 프로세스 (2시간)**\n\n" +
      "**수동 배포 단계:**\n" +
      "```\n" +
      "1. 로컬 빌드 (15분)\n" +
      "   └─> mvn clean package (Spring Boot WAR)\n" +
      "   └─> npm run build (React)\n" +
      "\n" +
      "2. 수동 파일 업로드 (20분)\n" +
      "   └─> SCP로 WAR 파일을 EC2 서버로 전송\n" +
      "   └─> Static 파일을 S3로 업로드\n" +
      "\n" +
      "3. 서버 접속 및 배포 (30분)\n" +
      "   └─> SSH로 각 서버 접속\n" +
      "   └─> Tomcat 중지 → WAR 교체 → 재시작\n" +
      "   └─> 3대 서버 순차 배포 (롤링)\n" +
      "\n" +
      "4. 수동 검증 (20분)\n" +
      "   └─> Health check 수동 확인\n" +
      "   └─> 로그 tail로 에러 모니터링\n" +
      "   └─> 기능 테스트 (Postman)\n" +
      "\n" +
      "5. 롤백 시 (추가 30분)\n" +
      "   └─> 백업 WAR로 재배포\n" +
      "   └─> 다시 검증\n" +
      "\n" +
      "총 소요 시간: 2시간 (에러 발생 시 3시간+)\n" +
      "```\n\n" +
      "**문제점:**\n" +
      "1. 사람이 직접 해야 함 (휴먼 에러 위험)\n" +
      "2. 배포 중 서비스 다운타임 (순차 재시작)\n" +
      "3. 롤백 느림 (30분 추가)\n" +
      "4. 여러 환경 배포 시 시간 배수 증가\n\n" +
      "**After: 자동화된 CI/CD (12분)**\n\n" +
      "**1단계: Infrastructure as Code (CloudFormation)**\n\n" +
      "**모든 인프라를 코드화:**\n" +
      "```yaml\n" +
      "# cloudformation/ecs-service.yaml\n" +
      "Resources:\n" +
      "  ECSTaskDefinition:\n" +
      "    Type: AWS::ECS::TaskDefinition\n" +
      "    Properties:\n" +
      "      Family: backend-api\n" +
      "      ContainerDefinitions:\n" +
      "        - Name: app\n" +
      "          Image: !Sub ${AWS::AccountId}.dkr.ecr.${AWS::Region}.amazonaws.com/backend:${ImageTag}\n" +
      "          PortMappings:\n" +
      "            - ContainerPort: 8080\n" +
      "          HealthCheck:\n" +
      '            Command: ["CMD-SHELL", "curl -f http://localhost:8080/health || exit 1"]\n' +
      "            Interval: 10\n" +
      "            Timeout: 5\n" +
      "            Retries: 3\n" +
      "\n" +
      "  ECSService:\n" +
      "    Type: AWS::ECS::Service\n" +
      "    Properties:\n" +
      "      Cluster: !Ref ECSCluster\n" +
      "      TaskDefinition: !Ref ECSTaskDefinition\n" +
      "      DesiredCount: 3\n" +
      "      DeploymentConfiguration:\n" +
      "        MaximumPercent: 200  # Blue-Green\n" +
      "        MinimumHealthyPercent: 100\n" +
      "      LoadBalancers:\n" +
      "        - TargetGroupArn: !Ref TargetGroup\n" +
      "          ContainerName: app\n" +
      "          ContainerPort: 8080\n" +
      "```\n\n" +
      "**IaC 장점:**\n" +
      "- 환경 복제: dev/staging/prod 동일 구성\n" +
      "- 버전 관리: Git으로 인프라 변경 추적\n" +
      "- 재현 가능: 언제든 동일 환경 재구축\n\n" +
      "**2단계: Docker 멀티 스테이지 빌드 최적화**\n\n" +
      "**Before (단일 스테이지):**\n" +
      "```dockerfile\n" +
      "FROM openjdk:17\n" +
      "COPY . /app\n" +
      "RUN mvn clean package\n" +
      'CMD ["java", "-jar", "app.jar"]\n' +
      "\n" +
      "# 이미지 크기: 800MB\n" +
      "# 빌드 시간: 15분 (매번 전체 재빌드)\n" +
      "```\n\n" +
      "**After (멀티 스테이지 + 레이어 캐싱):**\n" +
      "```dockerfile\n" +
      "# Stage 1: 의존성 캐싱\n" +
      "FROM maven:3.9-eclipse-temurin-17 AS dependencies\n" +
      "WORKDIR /app\n" +
      "COPY pom.xml .\n" +
      "RUN mvn dependency:go-offline  # 의존성만 다운로드\n" +
      "\n" +
      "# Stage 2: 빌드\n" +
      "FROM dependencies AS build\n" +
      "COPY src ./src\n" +
      "RUN mvn package -DskipTests\n" +
      "\n" +
      "# Stage 3: 런타임\n" +
      "FROM eclipse-temurin:17-jre-alpine AS runtime\n" +
      "WORKDIR /app\n" +
      "COPY --from=build /app/target/*.jar app.jar\n" +
      "EXPOSE 8080\n" +
      'CMD ["java", "-Xmx512m", "-jar", "app.jar"]\n' +
      "\n" +
      "# 이미지 크기: 150MB (81% 절감)\n" +
      "# 빌드 시간: 3분 (의존성 캐시 히트 시)\n" +
      "```\n\n" +
      "**레이어 캐싱 효과:**\n" +
      "- pom.xml 미변경 시: 의존성 다운로드 스킵 (10분 절약)\n" +
      "- 소스 코드만 변경: 빌드만 재실행 (3분)\n\n" +
      "**3단계: GitHub Actions 병렬 빌드**\n\n" +
      "```yaml\n" +
      "# .github/workflows/deploy.yml\n" +
      "name: Deploy to ECS\n" +
      "\n" +
      "on:\n" +
      "  push:\n" +
      "    branches: [main]\n" +
      "\n" +
      "jobs:\n" +
      "  test:\n" +
      "    runs-on: ubuntu-latest\n" +
      "    steps:\n" +
      "      - uses: actions/checkout@v4\n" +
      "      - name: Run Tests\n" +
      "        run: mvn test\n" +
      "    # 소요 시간: 2분\n" +
      "\n" +
      "  build-backend:\n" +
      "    needs: test\n" +
      "    runs-on: ubuntu-latest\n" +
      "    steps:\n" +
      "      - uses: actions/checkout@v4\n" +
      "      - name: Login to ECR\n" +
      "        uses: aws-actions/amazon-ecr-login@v2\n" +
      "      - name: Build and Push\n" +
      "        run: |\n" +
      "          docker build --cache-from=$IMAGE:latest \\\n" +
      "            -t $IMAGE:$GITHUB_SHA \\\n" +
      "            -t $IMAGE:latest .\n" +
      "          docker push $IMAGE:$GITHUB_SHA\n" +
      "    # 소요 시간: 3분 (캐시 히트)\n" +
      "\n" +
      "  build-frontend:\n" +
      "    needs: test\n" +
      "    runs-on: ubuntu-latest\n" +
      "    steps:\n" +
      "      - uses: actions/checkout@v4\n" +
      "      - name: Build and Upload to S3\n" +
      "        run: |\n" +
      "          npm ci --cache .npm  # 의존성 캐싱\n" +
      "          npm run build\n" +
      "          aws s3 sync build/ s3://$BUCKET/ --delete\n" +
      '          aws cloudfront create-invalidation --distribution-id $CF_ID --paths "/*"\n' +
      "    # 소요 시간: 2분 (병렬 실행)\n" +
      "\n" +
      "  deploy:\n" +
      "    needs: [build-backend, build-frontend]\n" +
      "    runs-on: ubuntu-latest\n" +
      "    steps:\n" +
      "      - name: Update ECS Service\n" +
      "        run: |\n" +
      "          aws ecs update-service \\\n" +
      "            --cluster prod-cluster \\\n" +
      "            --service backend-api \\\n" +
      "            --force-new-deployment \\\n" +
      "            --deployment-configuration \\\n" +
      "              maximumPercent=200,minimumHealthyPercent=100\n" +
      "      - name: Wait for Deployment\n" +
      "        run: |\n" +
      "          aws ecs wait services-stable \\\n" +
      "            --cluster prod-cluster \\\n" +
      "            --services backend-api\n" +
      "    # 소요 시간: 5분 (Blue-Green 롤링)\n" +
      "```\n\n" +
      "**총 소요 시간: 12분**\n" +
      "- Test: 2분\n" +
      "- Build (병렬): max(3분, 2분) = 3분\n" +
      "- Deploy: 5분\n" +
      "- 검증: 2분 (자동)\n\n" +
      "**4단계: Blue-Green 무중단 배포**\n\n" +
      "**ECS 배포 전략:**\n" +
      "```\n" +
      "기존 Task (Green):\n" +
      "  ├─> Task 1 (Running)\n" +
      "  ├─> Task 2 (Running)\n" +
      "  └─> Task 3 (Running)\n" +
      "\n" +
      "새 Task (Blue) 시작:\n" +
      "  ├─> Task 4 (Starting) → Health Check 통과\n" +
      "  ├─> Task 5 (Starting) → Health Check 통과\n" +
      "  └─> Task 6 (Starting) → Health Check 통과\n" +
      "\n" +
      "ALB 트래픽 전환:\n" +
      "  Green (100%) → Blue (0%)\n" +
      "  Green (50%) → Blue (50%)\n" +
      "  Green (0%) → Blue (100%)\n" +
      "\n" +
      "Green Task 종료:\n" +
      "  └─> Task 1, 2, 3 Draining (30초) → Stopped\n" +
      "```\n\n" +
      "**다운타임: 0초**\n\n" +
      "**5단계: 자동 롤백 (Circuit Breaker)**\n\n" +
      "```yaml\n" +
      "# CloudFormation\n" +
      "DeploymentCircuitBreaker:\n" +
      "  Enable: true\n" +
      "  Rollback: true  # 자동 롤백\n" +
      "\n" +
      "# Health Check 실패 시 자동 롤백\n" +
      "HealthCheckGracePeriodSeconds: 60\n" +
      "```\n\n" +
      "**롤백 시나리오:**\n" +
      "```\n" +
      "1. 새 Task 배포 시작\n" +
      "2. Health Check 3회 연속 실패\n" +
      "3. Circuit Breaker 작동 → 자동 롤백\n" +
      "4. 이전 Task Definition으로 재배포\n" +
      "5. Slack 알림 발송\n" +
      "\n" +
      "롤백 시간: 2분 (기존 30분 → 93% 단축)\n" +
      "```\n\n" +
      "**6단계: Airflow DAG 통합 (데이터 마이그레이션)**\n\n" +
      "레거시 마이크로서비스 전환 시 데이터 마이그레이션도 자동화:\n\n" +
      "```python\n" +
      "# airflow/dags/legacy_migration.py\n" +
      "from airflow import DAG\n" +
      "from airflow.providers.amazon.aws.operators.ecs import EcsRunTaskOperator\n" +
      "\n" +
      "with DAG('legacy_migration', schedule_interval='@daily') as dag:\n" +
      "    \n" +
      "    # 1. 데이터 백업\n" +
      "    backup_task = EcsRunTaskOperator(\n" +
      "        task_id='backup_oracle',\n" +
      "        cluster='data-cluster',\n" +
      "        task_definition='oracle-backup',\n" +
      "        overrides={\n" +
      "            'containerOverrides': [{\n" +
      "                'name': 'backup',\n" +
      "                'command': ['python', 'backup.py', '--date', '{{ ds }}']\n" +
      "            }]\n" +
      "        }\n" +
      "    )\n" +
      "    \n" +
      "    # 2. CDC (Change Data Capture)\n" +
      "    cdc_task = EcsRunTaskOperator(\n" +
      "        task_id='cdc_sync',\n" +
      "        cluster='data-cluster',\n" +
      "        task_definition='debezium-connector',\n" +
      "    )\n" +
      "    \n" +
      "    # 3. 데이터 검증\n" +
      "    validate_task = EcsRunTaskOperator(\n" +
      "        task_id='validate_data',\n" +
      "        cluster='data-cluster',\n" +
      "        task_definition='data-validator',\n" +
      "    )\n" +
      "    \n" +
      "    backup_task >> cdc_task >> validate_task\n" +
      "```\n\n" +
      "**Airflow 역할:**\n" +
      "- 통계 데이터: 일일 배치 (200+ DAG)\n" +
      "- 데이터 레이크: S3 동기화\n" +
      "- CDC: 준실시간 데이터 동기화\n\n" +
      "**Result: 배포 속도 90% 향상**\n\n" +
      "| 지표 | Before | After | 개선 |\n" +
      "|------|--------|-------|------|\n" +
      "| 배포 시간 | 2시간 | 12분 | 90% ↓ |\n" +
      "| 다운타임 | 10분 | 0분 | 100% ↓ |\n" +
      "| 롤백 시간 | 30분 | 2분 | 93% ↓ |\n" +
      "| 배포 빈도 | 주 1회 | 일 3회 | 300% ↑ |\n" +
      "| 휴먼 에러 | 월 3건 | 월 0건 | 100% ↓ |\n\n" +
      "**비즈니스 임팩트:**\n" +
      "1. **개발 속도**: 기능 출시 Lead Time 감소 (2주 → 3일)\n" +
      "2. **안정성**: 배포 실패율 감소 (10% → 1%)\n" +
      "3. **생산성**: 엔지니어 수동 작업 제거 (주 8시간 절약)\n" +
      "4. **비용**: ECS Fargate Spot으로 인프라 비용 40% 절감\n\n" +
      "**핵심 기술:**\n" +
      "- **IaC**: CloudFormation\n" +
      "- **Container**: Docker Multi-stage Build\n" +
      "- **CI/CD**: GitHub Actions\n" +
      "- **배포 전략**: Blue-Green with ALB\n" +
      "- **자동 롤백**: ECS Circuit Breaker\n" +
      "- **데이터 마이그레이션**: Airflow DAG\n\n" +
      "**토스 적용 포인트:**\n\n" +
      "토스의 린스타트업 정신과 완벽히 일치:\n" +
      "- 빠른 실험 → 측정 → 개선 사이클\n" +
      "- 하루에 여러 번 배포 가능한 환경\n" +
      "- 자동 롤백으로 리스크 최소화\n" +
      "- 개발자 경험 개선 (배포 버튼 한 번)",
  },

  // Airflow 5노드 클러스터 운영 (200+ DAG)
  {
    id: 65,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question:
      "Airflow 5개 노드 클러스터에서 200+ DAG를 운영하며 마주한 동시 실행 문제와 해결 방법은?",
    answer:
      "**Airflow 클러스터 아키텍처:**\n\n" +
      "```\n" +
      "┌─────────────────────────────────────────┐\n" +
      "│         PostgreSQL 13.x                 │\n" +
      "│  (Metadata DB, RDS Multi-AZ)            │\n" +
      "└─────────────────────────────────────────┘\n" +
      "                  ▲\n" +
      "                  │\n" +
      "┌─────────────────┴───────────────────────┐\n" +
      "│    Scheduler (1대, ECS Fargate)         │\n" +
      "│  - DAG parsing                          │\n" +
      "│  - Task scheduling                      │\n" +
      "│  - Dependency resolution                │\n" +
      "└─────────────────┬───────────────────────┘\n" +
      "                  │\n" +
      "                  ▼\n" +
      "┌─────────────────────────────────────────┐\n" +
      "│         Redis 7.x Cluster               │\n" +
      "│  (Celery Message Broker, ElastiCache)   │\n" +
      "└─────────────────┬───────────────────────┘\n" +
      "                  │\n" +
      "        ┌─────────┴─────────┐\n" +
      "        │                   │\n" +
      "┌───────▼────────┐  ┌───────▼────────┐\n" +
      "│  Worker 1-4    │  │  Worker 5      │\n" +
      "│  (ECS Fargate) │  │  (ECS Fargate) │\n" +
      "│  - Task 실행   │  │  - Task 실행   │\n" +
      "│  - Celery      │  │  - Celery      │\n" +
      "└────────────────┘  └────────────────┘\n" +
      "\n" +
      "총 5대 서버:\n" +
      "- Scheduler: 1대 (CPU 4 vCPU, 8GB RAM)\n" +
      "- Workers: 4대 (CPU 2 vCPU, 4GB RAM)\n" +
      "```\n\n" +
      "**Infrastructure: NFS 공유 파일 시스템 (DAG 동기화)**\n\n" +
      "**Problem: 5개 노드 간 DAG 파일 동기화**\n\n" +
      "Airflow의 모든 Scheduler와 Worker는 동일한 DAG 파일에 접근해야 함:\n" +
      "- **Scheduler**: DAG Processor가 Python 파일을 파싱하여 DAG 정의 추출\n" +
      "- **Worker**: Task 실행 시 Python 코드 로드 필요\n" +
      "- **문제점**: 5개 노드에 개별 파일 시스템 사용 시 수동 동기화 불가\n\n" +
      "**해결책: NFS 기반 공유 파일 시스템**\n\n" +
      "```\n" +
      "┌────────────────────────────────────────┐\n" +
      "│      NFS Server / AWS EFS              │\n" +
      "│  /mnt/airflow/dags (Single Source)    │\n" +
      "└────────┬───────────────────────────────┘\n" +
      "         │\n" +
      "         │ (모든 노드가 동일한 파일 시스템 마운트)\n" +
      "         │\n" +
      "    ┌────┴────┬─────────┬─────────┐\n" +
      "    │         │         │         │\n" +
      "┌───▼──┐  ┌──▼──┐  ┌──▼──┐  ┌──▼──┐\n" +
      "│ Sch  │  │ W1  │  │ W2  │  │ W3  │\n" +
      "│ eduler│  │     │  │     │  │     │\n" +
      "└──────┘  └─────┘  └─────┘  └─────┘\n" +
      "\n" +
      "모든 노드의 DAG 디렉토리 → 동일한 NFS 볼륨\n" +
      "```\n\n" +
      "**Option 1: Kubernetes NFS CSI Driver (On-Premise)**\n\n" +
      "```yaml\n" +
      "# NFS CSI Driver 설치\n" +
      "# https://github.com/kubernetes-csi/csi-driver-nfs\n" +
      "kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/csi-driver-nfs/master/deploy/install-driver.sh\n" +
      "\n" +
      "# PersistentVolume 정의 (NFS Server 연결)\n" +
      "apiVersion: v1\n" +
      "kind: PersistentVolume\n" +
      "metadata:\n" +
      "  name: airflow-dags-pv\n" +
      "spec:\n" +
      "  capacity:\n" +
      "    storage: 10Gi\n" +
      "  accessModes:\n" +
      "    - ReadWriteMany  # 다중 노드 동시 읽기/쓰기\n" +
      "  persistentVolumeReclaimPolicy: Retain\n" +
      "  csi:\n" +
      "    driver: nfs.csi.k8s.io  # NFS CSI Driver\n" +
      "    volumeHandle: airflow-dags-volume\n" +
      "    volumeAttributes:\n" +
      "      server: nfs-server.internal.company.com  # NFS 서버 주소\n" +
      "      share: /exports/airflow/dags             # NFS 공유 경로\n" +
      "\n" +
      "---\n" +
      "# PersistentVolumeClaim (애플리케이션에서 요청)\n" +
      "apiVersion: v1\n" +
      "kind: PersistentVolumeClaim\n" +
      "metadata:\n" +
      "  name: airflow-dags-pvc\n" +
      "  namespace: airflow\n" +
      "spec:\n" +
      "  accessModes:\n" +
      "    - ReadWriteMany  # 다중 노드 접근\n" +
      '  storageClassName: ""  # Static Provisioning (PV와 수동 바인딩)\n' +
      "  resources:\n" +
      "    requests:\n" +
      "      storage: 10Gi\n" +
      "\n" +
      "---\n" +
      "# Airflow Scheduler Deployment\n" +
      "apiVersion: apps/v1\n" +
      "kind: Deployment\n" +
      "metadata:\n" +
      "  name: airflow-scheduler\n" +
      "  namespace: airflow\n" +
      "spec:\n" +
      "  replicas: 1\n" +
      "  template:\n" +
      "    spec:\n" +
      "      containers:\n" +
      "      - name: scheduler\n" +
      "        image: apache/airflow:2.7.0\n" +
      "        volumeMounts:\n" +
      "        - name: dags\n" +
      "          mountPath: /opt/airflow/dags  # Airflow DAG 경로\n" +
      "          readOnly: false  # Scheduler는 .pyc 캐시 쓰기 가능\n" +
      "      volumes:\n" +
      "      - name: dags\n" +
      "        persistentVolumeClaim:\n" +
      "          claimName: airflow-dags-pvc  # NFS PVC 마운트\n" +
      "\n" +
      "---\n" +
      "# Airflow Worker Deployment\n" +
      "apiVersion: apps/v1\n" +
      "kind: Deployment\n" +
      "metadata:\n" +
      "  name: airflow-worker\n" +
      "  namespace: airflow\n" +
      "spec:\n" +
      "  replicas: 4  # 4대 Worker\n" +
      "  template:\n" +
      "    spec:\n" +
      "      containers:\n" +
      "      - name: worker\n" +
      "        image: apache/airflow:2.7.0\n" +
      "        volumeMounts:\n" +
      "        - name: dags\n" +
      "          mountPath: /opt/airflow/dags\n" +
      "          readOnly: true  # Worker는 읽기 전용 (안전성)\n" +
      "      volumes:\n" +
      "      - name: dags\n" +
      "        persistentVolumeClaim:\n" +
      "          claimName: airflow-dags-pvc  # 동일한 PVC 공유\n" +
      "```\n\n" +
      "**Option 2: AWS EFS CSI Driver (Cloud)**\n\n" +
      "```yaml\n" +
      "# AWS EFS CSI Driver 설치\n" +
      "# https://github.com/kubernetes-sigs/aws-efs-csi-driver\n" +
      "helm repo add aws-efs-csi-driver https://kubernetes-sigs.github.io/aws-efs-csi-driver/\n" +
      "helm upgrade --install aws-efs-csi-driver aws-efs-csi-driver/aws-efs-csi-driver \\\n" +
      "  --namespace kube-system\n" +
      "\n" +
      "# StorageClass (Dynamic Provisioning)\n" +
      "apiVersion: storage.k8s.io/v1\n" +
      "kind: StorageClass\n" +
      "metadata:\n" +
      "  name: efs-sc\n" +
      "provisioner: efs.csi.aws.com\n" +
      "parameters:\n" +
      "  provisioningMode: efs-ap  # EFS Access Point 자동 생성\n" +
      "  fileSystemId: fs-0a1b2c3d4e5f6g7h8  # EFS ID\n" +
      '  directoryPerms: "700"  # 디렉토리 권한\n' +
      "\n" +
      "---\n" +
      "# PersistentVolumeClaim (EFS 자동 프로비저닝)\n" +
      "apiVersion: v1\n" +
      "kind: PersistentVolumeClaim\n" +
      "metadata:\n" +
      "  name: airflow-dags-pvc\n" +
      "  namespace: airflow\n" +
      "spec:\n" +
      "  accessModes:\n" +
      "    - ReadWriteMany  # EFS는 다중 AZ 지원\n" +
      "  storageClassName: efs-sc  # Dynamic Provisioning\n" +
      "  resources:\n" +
      "    requests:\n" +
      "      storage: 5Gi  # EFS는 elastic이므로 상징적 값\n" +
      "```\n\n" +
      "**AWS EFS 설정 (Terraform)**\n\n" +
      "```hcl\n" +
      "# EFS 파일 시스템 생성\n" +
      'resource "aws_efs_file_system" "airflow_dags" {\n' +
      '  creation_token = "airflow-dags-efs"\n' +
      "  \n" +
      '  performance_mode = "generalPurpose"  # 또는 maxIO (고처리량)\n' +
      '  throughput_mode  = "bursting"         # 또는 provisioned (고정 처리량)\n' +
      "  \n" +
      "  lifecycle_policy {\n" +
      '    transition_to_ia = "AFTER_30_DAYS"  # Infrequent Access (비용 절감)\n' +
      "  }\n" +
      "  \n" +
      "  tags = {\n" +
      '    Name = "airflow-dags"\n' +
      "  }\n" +
      "}\n" +
      "\n" +
      "# EFS Mount Target (각 AZ마다 필요)\n" +
      'resource "aws_efs_mount_target" "airflow_dags" {\n' +
      "  count           = length(var.private_subnet_ids)\n" +
      "  file_system_id  = aws_efs_file_system.airflow_dags.id\n" +
      "  subnet_id       = var.private_subnet_ids[count.index]\n" +
      "  security_groups = [aws_security_group.efs.id]\n" +
      "}\n" +
      "\n" +
      "# Security Group (EFS 접근 허용)\n" +
      'resource "aws_security_group" "efs" {\n' +
      '  name        = "airflow-efs-sg"\n' +
      "  vpc_id      = var.vpc_id\n" +
      "  \n" +
      "  ingress {\n" +
      "    from_port   = 2049  # NFS 포트\n" +
      "    to_port     = 2049\n" +
      '    protocol    = "tcp"\n' +
      "    cidr_blocks = [var.vpc_cidr]  # VPC 내부 접근만 허용\n" +
      "  }\n" +
      "}\n" +
      "```\n\n" +
      "**Option 3: ECS Task Definition (EFS Volume)**\n\n" +
      "```json\n" +
      "{\n" +
      '  "family": "airflow-scheduler",\n' +
      '  "networkMode": "awsvpc",\n' +
      '  "requiresCompatibilities": ["FARGATE"],\n' +
      '  "cpu": "4096",\n' +
      '  "memory": "8192",\n' +
      '  "containerDefinitions": [\n' +
      "    {\n" +
      '      "name": "scheduler",\n' +
      '      "image": "apache/airflow:2.7.0",\n' +
      '      "mountPoints": [\n' +
      "        {\n" +
      '          "sourceVolume": "airflow-dags",\n' +
      '          "containerPath": "/opt/airflow/dags",\n' +
      '          "readOnly": false\n' +
      "        }\n" +
      "      ]\n" +
      "    }\n" +
      "  ],\n" +
      '  "volumes": [\n' +
      "    {\n" +
      '      "name": "airflow-dags",\n' +
      '      "efsVolumeConfiguration": {\n' +
      '        "fileSystemId": "fs-0a1b2c3d4e5f6g7h8",\n' +
      '        "transitEncryption": "ENABLED",\n' +
      '        "authorizationConfig": {\n' +
      '          "iam": "ENABLED"\n' +
      "        }\n" +
      "      }\n" +
      "    }\n" +
      "  ]\n" +
      "}\n" +
      "```\n\n" +
      "**관리 효율성 (Management Efficiency)**\n\n" +
      "**Before (개별 파일 시스템):**\n" +
      "```bash\n" +
      "# 200+ DAG 파일 수동 배포 (5개 노드)\n" +
      "for host in scheduler worker1 worker2 worker3 worker4; do\n" +
      "    scp -r dags/* $host:/opt/airflow/dags/\n" +
      "done\n" +
      "\n" +
      "문제점:\n" +
      "- 배포 시간: 15분 (5개 노드 순차 배포)\n" +
      "- 동기화 불일치: Worker 1-3 신규 버전, Worker 4-5 구버전\n" +
      "- 롤백 불가: 각 노드별로 수동 복구 필요\n" +
      "- 장애 위험: 배포 중 Task 실행 시 ImportError\n" +
      "```\n\n" +
      "**After (NFS/EFS 공유 파일 시스템):**\n" +
      "```bash\n" +
      "# Git 기반 자동 배포 (CI/CD)\n" +
      "# 1. DAG 코드 변경 → Git Push\n" +
      "git add dags/new_pipeline.py\n" +
      'git commit -m "Add new ETL pipeline"\n' +
      "git push origin main\n" +
      "\n" +
      "# 2. CI/CD 파이프라인 (GitHub Actions)\n" +
      "# .github/workflows/deploy-dags.yml\n" +
      "name: Deploy DAGs\n" +
      "on:\n" +
      "  push:\n" +
      "    branches: [main]\n" +
      "    paths:\n" +
      "      - 'dags/**'\n" +
      "\n" +
      "jobs:\n" +
      "  deploy:\n" +
      "    runs-on: ubuntu-latest\n" +
      "    steps:\n" +
      "      - uses: actions/checkout@v3\n" +
      "      \n" +
      "      # NFS 마운트 (또는 EFS)\n" +
      "      - name: Mount NFS\n" +
      "        run: |\n" +
      "          sudo mount -t nfs nfs-server:/exports/airflow/dags /mnt/dags\n" +
      "      \n" +
      "      # DAG 파일 복사 (Single Source of Truth)\n" +
      "      - name: Deploy DAGs\n" +
      "        run: |\n" +
      "          rsync -av --delete dags/ /mnt/dags/\n" +
      "      \n" +
      "      # Airflow DAG 유효성 검증\n" +
      "      - name: Validate DAGs\n" +
      "        run: |\n" +
      "          docker run --rm -v /mnt/dags:/opt/airflow/dags \\\n" +
      "            apache/airflow:2.7.0 \\\n" +
      "            python -c \"from airflow.models import DagBag; DagBag('/opt/airflow/dags')\"\n" +
      "\n" +
      "# 3. 자동 전파 (30초 이내)\n" +
      "# Airflow Scheduler의 DAG Processor가 자동 감지\n" +
      "# - dag_dir_list_interval: 30초 (기본값)\n" +
      "# - 모든 노드가 동일한 파일 시스템 사용 → 즉시 동기화\n" +
      "```\n\n" +
      "**관리 효율 개선 결과:**\n\n" +
      "| 항목 | Before (개별 FS) | After (NFS/EFS) | 개선율 |\n" +
      "|------|------------------|-----------------|--------|\n" +
      "| 배포 시간 | 15분 (수동) | 30초 (자동) | 97% ↓ |\n" +
      "| 배포 실패 | 주 2-3회 | 0회 | 100% ↓ |\n" +
      "| DAG 동기화 불일치 | 10% (50회/500회) | 0% | 100% ↓ |\n" +
      "| 롤백 시간 | 30분 | 1분 | 97% ↓ |\n" +
      "| 관리 공수 | 주 10시간 | 주 1시간 | 90% ↓ |\n\n" +
      "**추가 장점:**\n\n" +
      "1. **Single Source of Truth**: 모든 노드가 동일한 DAG 버전 사용\n" +
      "2. **Blue-Green Deployment**: Symlink 전환으로 무중단 배포\n" +
      "   ```bash\n" +
      "   /mnt/dags/current -> /mnt/dags/releases/v1.2.3\n" +
      "   # 배포 시 symlink만 변경\n" +
      "   ln -sfn /mnt/dags/releases/v1.2.4 /mnt/dags/current\n" +
      "   ```\n" +
      "3. **High Availability**: EFS는 Multi-AZ 자동 복제 (99.99% 가용성)\n" +
      "4. **Backup & Restore**: EFS Backup으로 일일 자동 백업\n" +
      "5. **Security**: IAM 기반 접근 제어, 전송 중 암호화 (TLS)\n\n" +
      "**Performance 최적화:**\n\n" +
      "```python\n" +
      "# airflow.cfg\n" +
      "[scheduler]\n" +
      "dag_dir_list_interval = 30  # DAG 파일 스캔 주기 (초)\n" +
      "min_file_process_interval = 30  # DAG 재처리 최소 간격\n" +
      "file_parsing_sort_mode = modified_time  # 수정된 파일 우선 처리\n" +
      "\n" +
      "[core]\n" +
      "dags_folder = /opt/airflow/dags  # NFS/EFS 마운트 경로\n" +
      "dag_file_processor_timeout = 50  # DAG 파싱 타임아웃\n" +
      "```\n\n" +
      "**NFS vs EFS 선택 가이드:**\n\n" +
      "| 항목 | NFS (On-Premise) | AWS EFS |\n" +
      "|------|------------------|----------|\n" +
      "| 비용 | 초기 투자 높음 | 사용량 기반 ($0.30/GB/월) |\n" +
      "| 성능 | 네트워크 의존 | Bursting: 100MB/s, Max: 500MB/s |\n" +
      "| 가용성 | 단일 장애점 | Multi-AZ (99.99%) |\n" +
      "| 관리 | 수동 (패치, 백업) | 완전 관리형 |\n" +
      "| 암호화 | 수동 설정 | 전송/저장 암호화 기본 |\n" +
      "| Latency | 낮음 (동일 DC) | 중간 (AZ 간) |\n" +
      "| Scalability | 수동 확장 | Elastic (자동 확장) |\n\n" +
      "**실 경험 결과:**\n\n" +
      "NFS 공유 파일 시스템 도입으로 **관리 효율이 극적으로 개선**되었습니다:\n" +
      "- **배포 자동화**: Git Push → 30초 후 모든 노드 자동 반영\n" +
      "- **장애 제거**: DAG 동기화 불일치로 인한 Task 실패 0건\n" +
      "- **운영 공수**: 주 10시간 → 1시간 (90% 절감)\n" +
      "- **안정성**: 200+ DAG 무중단 배포 (6개월간 사고 없음)\n\n" +
      "**Problem 1: DAG 동시 실행 리소스 경합**\n\n" +
      "**증상:**\n" +
      "```\n" +
      "새벽 2시 (배치 시간):\n" +
      "- 200+ DAG 동시 실행 시도\n" +
      "- Worker CPU 100% (4개 Worker 모두)\n" +
      "- Task 큐 적체 (Redis에 10K+ pending tasks)\n" +
      "- 일부 DAG SLA 위반 (6시간 목표 → 12시간 소요)\n" +
      "```\n\n" +
      "**근본 원인:**\n" +
      "1. 모든 DAG가 같은 시간(02:00 UTC)에 스케줄링\n" +
      "2. Worker 리소스 무제한 할당 (선착순)\n" +
      "3. CPU 집약적 DAG가 I/O 집약적 DAG 차단\n\n" +
      "**Solution 1: DAG 옵션 최적화**\n\n" +
      "**1-1. max_active_runs (DAG 레벨)**\n\n" +
      "```python\n" +
      "# DAG 동시 실행 개수 제한\n" +
      "with DAG(\n" +
      "    'data_lake_sync',\n" +
      "    schedule_interval='0 2 * * *',\n" +
      "    max_active_runs=1,  # 이전 실행 완료 전 새 실행 차단\n" +
      "    catchup=False,      # 과거 실행 스킵\n" +
      ") as dag:\n" +
      "    pass\n" +
      "```\n\n" +
      "**효과:**\n" +
      "- 동시 DAG 실행: 200개 → 50개 (나머지는 대기)\n" +
      "- Scheduler overhead 감소\n\n" +
      "**1-2. concurrency (DAG 내 Task 동시성)**\n\n" +
      "```python\n" +
      "with DAG(\n" +
      "    'athena_queries',\n" +
      "    concurrency=4,  # 이 DAG 내 최대 4개 Task 동시 실행\n" +
      ") as dag:\n" +
      "    \n" +
      "    # 10개 Task가 있어도 4개씩만 실행\n" +
      "    for i in range(10):\n" +
      "        task = AthenaOperator(\n" +
      "            task_id=f'query_{i}',\n" +
      "            query='SELECT * FROM ...',\n" +
      "        )\n" +
      "```\n\n" +
      "**적용 전:**\n" +
      "- 10개 Task 동시 실행 → Athena S3 throttling (429 에러)\n\n" +
      "**적용 후:**\n" +
      "- 4개 Task씩 순차 실행 → S3 요청 안정화\n\n" +
      "**1-3. pool (리소스 풀 할당)**\n\n" +
      "```python\n" +
      "# Airflow Pools 정의 (UI 또는 CLI)\n" +
      'airflow pools set cpu_intensive_pool 10 "CPU 집약적 작업"\n' +
      'airflow pools set io_intensive_pool 20 "I/O 집약적 작업"\n' +
      'airflow pools set athena_pool 4 "Athena 쿼리 (S3 throttling 방지)"\n' +
      "\n" +
      "# DAG에서 Pool 사용\n" +
      "with DAG('heavy_computation') as dag:\n" +
      "    \n" +
      "    cpu_task = PythonOperator(\n" +
      "        task_id='data_processing',\n" +
      "        pool='cpu_intensive_pool',  # 10개 슬롯 중 1개 사용\n" +
      "        pool_slots=2,               # 이 Task는 2 슬롯 소비\n" +
      "        python_callable=heavy_computation,\n" +
      "    )\n" +
      "    \n" +
      "    athena_task = AthenaOperator(\n" +
      "        task_id='athena_query',\n" +
      "        pool='athena_pool',  # 최대 4개만 동시 실행\n" +
      "        query='...',\n" +
      "    )\n" +
      "```\n\n" +
      "**Pool 전략:**\n\n" +
      "| Pool 이름 | 슬롯 수 | 용도 | 예시 Task |\n" +
      "|-----------|---------|------|----------|\n" +
      "| cpu_intensive_pool | 10 | CPU 집약적 | 데이터 변환, ML 추론 |\n" +
      "| io_intensive_pool | 20 | I/O 집약적 | S3 업로드, DB 쿼리 |\n" +
      "| athena_pool | 4 | Athena | CTAS 쿼리 (S3 throttling 방지) |\n" +
      "| kafka_pool | 8 | Kafka | Producer (메시지 전송) |\n" +
      "| default_pool | 128 | 기본 | 일반 Task |\n\n" +
      "**Solution 2: Celery Queue 분리**\n\n" +
      "**2-1. 우선순위 기반 Queue**\n\n" +
      "```python\n" +
      "# airflow.cfg\n" +
      "[celery]\n" +
      "celery_broker_url = redis://redis.cache.amazonaws.com:6379/0\n" +
      "celery_result_backend = db+postgresql://...\n" +
      "\n" +
      "# Worker 시작 시 Queue 지정\n" +
      "# Worker 1-2: high priority\n" +
      "airflow celery worker --queues high_priority,default\n" +
      "\n" +
      "# Worker 3-4: normal priority\n" +
      "airflow celery worker --queues default\n" +
      "\n" +
      "# DAG에서 Queue 지정\n" +
      "with DAG('critical_pipeline', default_args={'queue': 'high_priority'}) as dag:\n" +
      "    task = PythonOperator(...)\n" +
      "```\n\n" +
      "**Queue 전략:**\n\n" +
      "1. **high_priority**: SLA 중요 (2시간 이내 완료)\n" +
      "   - 예: 실시간 대시보드 데이터\n" +
      "2. **default**: 일반 배치 (6시간 이내)\n" +
      "   - 예: 일일 통계\n" +
      "3. **low_priority**: 백그라운드 작업\n" +
      "   - 예: 로그 아카이빙\n\n" +
      "**2-2. Worker 자동 스케일링 (ECS Service Auto Scaling)**\n\n" +
      "```yaml\n" +
      "# CloudFormation\n" +
      "AutoScalingTarget:\n" +
      "  Type: AWS::ApplicationAutoScaling::ScalableTarget\n" +
      "  Properties:\n" +
      "    MaxCapacity: 8  # 최대 8대 Worker\n" +
      "    MinCapacity: 4  # 최소 4대\n" +
      "    ResourceId: !Sub service/${ECSCluster}/airflow-worker\n" +
      "    ScalableDimension: ecs:service:DesiredCount\n" +
      "\n" +
      "ScalingPolicy:\n" +
      "  Type: AWS::ApplicationAutoScaling::ScalingPolicy\n" +
      "  Properties:\n" +
      "    PolicyType: TargetTrackingScaling\n" +
      "    TargetTrackingScalingPolicyConfiguration:\n" +
      "      TargetValue: 70.0  # CPU 70% 목표\n" +
      "      PredefinedMetricSpecification:\n" +
      "        PredefinedMetricType: ECSServiceAverageCPUUtilization\n" +
      "```\n\n" +
      "**스케일링 동작:**\n" +
      "- 02:00-06:00 (피크): Worker 4대 → 8대\n" +
      "- 06:00-02:00 (일반): Worker 8대 → 4대\n" +
      "- 비용 절감: Fargate Spot 사용 시 70% 할인\n\n" +
      "**Problem 2: DAG 의존성 충돌 (Deadlock)**\n\n" +
      "**증상:**\n" +
      "```\n" +
      "DAG A: Task A1 (Pool cpu_intensive, 대기 중)\n" +
      "       └─> Task A2 (Pool io_intensive, 실행 중)\n" +
      "\n" +
      "DAG B: Task B1 (Pool io_intensive, 대기 중)\n" +
      "       └─> Task B2 (Pool cpu_intensive, 실행 중)\n" +
      "\n" +
      "결과: Deadlock (서로 대기)\n" +
      "```\n\n" +
      "**Solution 3: ExternalTaskSensor로 DAG 간 의존성 명시**\n\n" +
      "```python\n" +
      "# upstream_dag.py\n" +
      "with DAG('data_ingestion', schedule_interval='0 2 * * *') as dag:\n" +
      "    \n" +
      "    ingest_task = PythonOperator(\n" +
      "        task_id='ingest_data',\n" +
      "        python_callable=ingest,\n" +
      "    )\n" +
      "\n" +
      "# downstream_dag.py\n" +
      "with DAG('data_processing', schedule_interval='0 3 * * *') as dag:\n" +
      "    \n" +
      "    # data_ingestion DAG 완료 대기\n" +
      "    wait_for_ingestion = ExternalTaskSensor(\n" +
      "        task_id='wait_for_ingestion',\n" +
      "        external_dag_id='data_ingestion',\n" +
      "        external_task_id='ingest_data',\n" +
      "        timeout=3600,  # 1시간 대기\n" +
      "        poke_interval=60,  # 1분마다 체크\n" +
      "        mode='reschedule',  # Worker 슬롯 해제\n" +
      "    )\n" +
      "    \n" +
      "    process_task = PythonOperator(\n" +
      "        task_id='process_data',\n" +
      "        python_callable=process,\n" +
      "    )\n" +
      "    \n" +
      "    wait_for_ingestion >> process_task\n" +
      "```\n\n" +
      "**의존성 그래프:**\n" +
      "```\n" +
      "02:00 - data_ingestion (15분)\n" +
      "        ↓\n" +
      "02:15 - data_processing (30분)\n" +
      "        ↓\n" +
      "02:45 - data_aggregation (20분)\n" +
      "        ↓\n" +
      "03:05 - data_export (10분)\n" +
      "```\n\n" +
      "**Solution 4: Monitoring & Alerting**\n\n" +
      "**Grafana Dashboard:**\n\n" +
      "```yaml\n" +
      "Metrics:\n" +
      "  - DAG Success Rate (목표: >99%)\n" +
      "  - Task Duration (P95 < 30분)\n" +
      "  - Pool Utilization (70-80% 유지)\n" +
      "  - Scheduler Heartbeat (30초 이내)\n" +
      "  - Worker CPU/Memory Usage\n" +
      "  - Queue Depth (Redis 적체)\n" +
      "\n" +
      "Alerts:\n" +
      "  - DAG 실패 시 Slack 알림\n" +
      "  - SLA 위반 시 PagerDuty\n" +
      "  - Pool 고갈 시 (95% 초과)\n" +
      "  - Scheduler Lag >60초\n" +
      "```\n\n" +
      "**Airflow Metrics Exporter:**\n\n" +
      "```python\n" +
      "# Custom Airflow Plugin\n" +
      "from airflow.plugins_manager import AirflowPlugin\n" +
      "from flask import Response\n" +
      "from prometheus_client import generate_latest, REGISTRY\n" +
      "\n" +
      "class MetricsView(BaseView):\n" +
      "    @expose('/metrics')\n" +
      "    def metrics(self):\n" +
      "        return Response(generate_latest(REGISTRY), mimetype='text/plain')\n" +
      "\n" +
      "class MetricsPlugin(AirflowPlugin):\n" +
      '    name = "metrics"\n' +
      "    flask_blueprints = [MetricsView()]\n" +
      "```\n\n" +
      "**Result: 동시 실행 최적화**\n\n" +
      "| 지표 | Before | After | 개선 |\n" +
      "|------|--------|-------|------|\n" +
      "| 피크 시간 DAG 완료 | 12시간 | 4시간 | 67% ↓ |\n" +
      "| Task 실패율 | 5% | 0.5% | 90% ↓ |\n" +
      "| Worker CPU 평균 | 95% | 70% | - |\n" +
      "| Scheduler Lag | 120초 | 15초 | 87% ↓ |\n" +
      "| SLA 위반 | 10회/월 | 0회/월 | 100% ↓ |\n\n" +
      "**동시 실행 달성:**\n" +
      "- **최대 동시 DAG**: 50개 (max_active_runs 제어)\n" +
      "- **최대 동시 Task**: 100개 (Pool + Worker 조합)\n" +
      "- **피크 처리량**: 초당 5개 Task 완료\n\n" +
      "**핵심 옵션 조합:**\n\n" +
      "```python\n" +
      "# 최적화된 DAG 템플릿\n" +
      "default_args = {\n" +
      "    'owner': 'data-team',\n" +
      "    'retries': 3,\n" +
      "    'retry_delay': timedelta(minutes=5),\n" +
      "    'execution_timeout': timedelta(hours=2),\n" +
      "    'sla': timedelta(hours=6),\n" +
      "    'on_failure_callback': slack_alert,\n" +
      "}\n" +
      "\n" +
      "with DAG(\n" +
      "    'optimized_pipeline',\n" +
      "    default_args=default_args,\n" +
      "    schedule_interval='0 2 * * *',\n" +
      "    max_active_runs=1,      # 중복 실행 방지\n" +
      "    concurrency=10,          # DAG 내 Task 동시성\n" +
      "    catchup=False,           # 과거 실행 스킵\n" +
      "    tags=['production', 'critical'],\n" +
      ") as dag:\n" +
      "    \n" +
      "    task = PythonOperator(\n" +
      "        task_id='process',\n" +
      "        pool='cpu_intensive_pool',  # 리소스 풀\n" +
      "        pool_slots=2,               # 슬롯 수\n" +
      "        queue='high_priority',      # 우선순위 큐\n" +
      "        trigger_rule='all_success', # 의존성 규칙\n" +
      "        python_callable=process,\n" +
      "    )\n" +
      "```\n\n" +
      "**토스 적용 포인트:**\n\n" +
      "토스의 대규모 데이터 파이프라인에 직접 적용 가능:\n" +
      "- 금융 배치 작업의 정시 완료 보장\n" +
      "- 규제 준수를 위한 SLA 모니터링\n" +
      "- 리소스 효율 최적화로 비용 절감",
  },

  // Tempo 메모리 최적화 (10GB → 2GB)
  {
    id: 66,
    category1: "Infrastructure",
    category2: "Observability",
    question:
      "Grafana Tempo 메모리 사용량이 10GB를 초과해 OOM Killer가 발생했을 때 어떻게 해결했나요?",
    answer:
      "**Problem: Tempo Container OOM Kill (10GB+ 메모리)**\n\n" +
      "**증상:**\n" +
      "```\n" +
      "$ kubectl logs tempo-distributor-7f8b9c5d4-xkzwj\n" +
      "fatal error: runtime: out of memory\n" +
      "\n" +
      "$ kubectl top pods -n monitoring\n" +
      "NAME                          CPU    MEMORY\n" +
      "tempo-distributor-0           2000m  10.5Gi / 8Gi  ❌ OOM Killed\n" +
      "tempo-ingester-0              1500m  9.8Gi / 8Gi   ❌ OOM Killed\n" +
      "tempo-querier-0               800m   3.2Gi / 4Gi   ✅\n" +
      "tempo-compactor-0             1200m  6.5Gi / 8Gi   ⚠️  경고\n" +
      "```\n\n" +
      "**Root Cause Analysis:**\n\n" +
      "**1. High-Cardinality Traces (수백만 개 Span)**\n" +
      "```\n" +
      "# OpenTelemetry Span 구조\n" +
      "Span {\n" +
      '  trace_id: "abc123...",\n' +
      '  span_id: "def456...",\n' +
      "  attributes: {\n" +
      '    http.method: "GET",\n' +
      '    http.route: "/api/products",\n' +
      "    http.status_code: 200,\n" +
      '    user.id: "user_12345",      # High cardinality!\n' +
      '    product.id: "prod_67890",    # High cardinality!\n' +
      '    session.id: "sess_abcdef",   # High cardinality!\n' +
      "  }\n" +
      "}\n" +
      "\n" +
      "문제:\n" +
      "- 일일 활성 사용자: 100K\n" +
      "- 평균 세션당 요청: 50개\n" +
      "- 총 Span 수: 100K × 50 = 5M spans/day\n" +
      "- Span 크기: 평균 2KB\n" +
      "- 일일 Trace 데이터: 10GB\n" +
      "```\n\n" +
      "**2. 긴 Retention (30일)**\n" +
      "```\n" +
      "# tempo.yaml (초기 설정)\n" +
      "storage:\n" +
      "  trace:\n" +
      "    backend: s3\n" +
      "    s3:\n" +
      "      bucket: tempo-traces\n" +
      "      retention: 720h  # 30일\n" +
      "\n" +
      "메모리 압박:\n" +
      "- 30일 × 10GB/day = 300GB 데이터\n" +
      "- Ingester가 모든 Trace를 메모리에 버퍼링\n" +
      "- Compaction 과정에서 메모리 추가 소비\n" +
      "```\n\n" +
      "**3. Compaction 부족**\n" +
      "```\n" +
      "# Tempo Block 구조\n" +
      "s3://tempo-traces/\n" +
      "  ├─ single-tenant/\n" +
      "      ├─ 2025-11-13/\n" +
      "          ├─ 00001.parquet  # 100MB\n" +
      "          ├─ 00002.parquet  # 100MB\n" +
      "          ├─ ... (1000개 파일)  ❌ 너무 많음\n" +
      "\n" +
      "문제:\n" +
      "- Compaction 주기: 24시간 (너무 느림)\n" +
      "- 작은 파일 1000개 → 큰 파일 10개로 병합 필요\n" +
      "- Compaction 중 메모리 스파이크\n" +
      "```\n\n" +
      "**Solution 1: Sampling 전략 (Production 0.1%)**\n\n" +
      "**Head-based Sampling (Collector):**\n" +
      "```yaml\n" +
      "# otel-collector-config.yaml\n" +
      "processors:\n" +
      "  probabilistic_sampler:\n" +
      "    sampling_percentage: 0.1  # 0.1% = 1/1000\n" +
      "\n" +
      "service:\n" +
      "  pipelines:\n" +
      "    traces:\n" +
      "      receivers: [otlp]\n" +
      "      processors: [probabilistic_sampler, batch]\n" +
      "      exporters: [otlp/tempo]\n" +
      "```\n\n" +
      "**Tail-based Sampling (Tempo):**\n" +
      "```yaml\n" +
      "# tempo.yaml\n" +
      "overrides:\n" +
      "  per_tenant_override_config: /conf/overrides.yaml\n" +
      "\n" +
      "# overrides.yaml\n" +
      "'*':  # 모든 tenant\n" +
      "  ingestion_rate_limit_bytes: 5000000  # 5MB/s\n" +
      "  max_bytes_per_trace: 500000          # 500KB per trace\n" +
      "  max_search_bytes_per_trace: 100000   # 100KB per trace\n" +
      "```\n\n" +
      "**Intelligent Sampling (에러 우선):**\n" +
      "```yaml\n" +
      "# Collector에서 에러 Trace는 100% 수집\n" +
      "processors:\n" +
      "  tail_sampling:\n" +
      "    policies:\n" +
      "      - name: error-traces\n" +
      "        type: status_code\n" +
      "        status_code:\n" +
      "          status_codes: [ERROR]\n" +
      "        sampling_percentage: 100  # 에러는 100%\n" +
      "      \n" +
      "      - name: slow-traces\n" +
      "        type: latency\n" +
      "        latency:\n" +
      "          threshold_ms: 5000  # 5초 이상\n" +
      "        sampling_percentage: 50  # 느린 요청은 50%\n" +
      "      \n" +
      "      - name: normal-traces\n" +
      "        type: probabilistic\n" +
      "        probabilistic:\n" +
      "          sampling_percentage: 0.1  # 정상은 0.1%\n" +
      "```\n\n" +
      "**Sampling 효과:**\n" +
      "- Trace 수: 5M/day → 5K/day (99.9% 감소)\n" +
      "- 일일 데이터: 10GB → 10MB (99.9% 감소)\n" +
      "- 메모리 사용량: 10GB → 1GB (90% 감소)\n\n" +
      "**Solution 2: Retention 단축 (30일 → 7일)**\n\n" +
      "**Tempo는 Hot Storage, ClickHouse는 Warm Storage:**\n\n" +
      "```yaml\n" +
      "# tempo.yaml\n" +
      "storage:\n" +
      "  trace:\n" +
      "    backend: s3\n" +
      "    s3:\n" +
      "      retention: 168h  # 7일 (기존 30일)\n" +
      "\n" +
      "# 7일 이후 데이터는 ClickHouse로 Export\n" +
      "```\n\n" +
      "**ClickHouse 장기 보관 (30일):**\n" +
      "```sql\n" +
      "-- ClickHouse 테이블 생성\n" +
      "CREATE TABLE traces (\n" +
      "  trace_id String,\n" +
      "  span_id String,\n" +
      "  timestamp DateTime,\n" +
      "  service_name LowCardinality(String),\n" +
      "  operation_name LowCardinality(String),\n" +
      "  duration_ms UInt32,\n" +
      "  status_code LowCardinality(String),\n" +
      "  attributes Map(String, String)\n" +
      ") ENGINE = MergeTree()\n" +
      "PARTITION BY toYYYYMMDD(timestamp)\n" +
      "ORDER BY (service_name, timestamp)\n" +
      "TTL timestamp + INTERVAL 30 DAY  # 30일 자동 삭제\n" +
      "SETTINGS index_granularity = 8192;\n" +
      "```\n\n" +
      "**Export Pipeline (Lambda):**\n" +
      "```python\n" +
      "# tempo-to-clickhouse.py\n" +
      "import boto3\n" +
      "from clickhouse_driver import Client\n" +
      "\n" +
      "def lambda_handler(event, context):\n" +
      "    # S3에서 Tempo Block 읽기\n" +
      "    s3 = boto3.client('s3')\n" +
      "    blocks = s3.list_objects_v2(\n" +
      "        Bucket='tempo-traces',\n" +
      "        Prefix=f'single-tenant/{date}/'\n" +
      "    )\n" +
      "    \n" +
      "    # ClickHouse에 삽입\n" +
      "    ch = Client('clickhouse.internal')\n" +
      "    for block in blocks:\n" +
      "        traces = parse_parquet(block)\n" +
      "        ch.execute(\n" +
      "            'INSERT INTO traces VALUES',\n" +
      "            traces,\n" +
      "            types_check=True\n" +
      "        )\n" +
      "```\n\n" +
      "**데이터 흐름:**\n" +
      "```\n" +
      "Day 0-7:  Tempo (실시간 조회, <1초)\n" +
      "Day 8-30: ClickHouse (분석용, 1-5초)\n" +
      "Day 31+:  삭제 (TTL 자동)\n" +
      "```\n\n" +
      "**Solution 3: Compaction 자동화**\n\n" +
      "**Compaction 주기 단축:**\n" +
      "```yaml\n" +
      "# tempo.yaml\n" +
      "compactor:\n" +
      "  compaction:\n" +
      "    block_retention: 168h  # 7일\n" +
      "    compaction_window: 1h  # 1시간마다 (기존 24시간)\n" +
      "    max_compaction_objects: 1000\n" +
      "    max_block_bytes: 107374182400  # 100GB\n" +
      "```\n\n" +
      "**Cron Job으로 강제 Compaction:**\n" +
      "```yaml\n" +
      "# k8s CronJob\n" +
      "apiVersion: batch/v1\n" +
      "kind: CronJob\n" +
      "metadata:\n" +
      "  name: tempo-compact\n" +
      "  namespace: monitoring\n" +
      "spec:\n" +
      '  schedule: "0 */6 * * *"  # 6시간마다\n' +
      "  jobTemplate:\n" +
      "    spec:\n" +
      "      template:\n" +
      "        spec:\n" +
      "          containers:\n" +
      "          - name: tempo-cli\n" +
      "            image: grafana/tempo:latest\n" +
      '            command: ["/tempo", "-config.file=/etc/tempo.yaml", "-target=compactor"]\n' +
      "```\n\n" +
      "**Compaction 모니터링:**\n" +
      "```promql\n" +
      "# Prometheus Alerts\n" +
      "- alert: TempoCompactionLag\n" +
      "  expr: tempo_ingester_blocks_per_compaction > 500\n" +
      "  for: 1h\n" +
      "  annotations:\n" +
      '    summary: "Tempo Compaction 지연 ({{ $value }} blocks)"\n' +
      "```\n\n" +
      "**Solution 4: Gateway Collector 분리 (메모리 집약적 서버)**\n\n" +
      "**Before: 단일 Collector (메모리 부족):**\n" +
      "```\n" +
      "Application Pods (100개)\n" +
      "    ↓ (OTLP gRPC)\n" +
      "Single Collector (메모리 8GB)\n" +
      "    ↓\n" +
      "Tempo Distributor\n" +
      "```\n\n" +
      "**After: Gateway + Agent 패턴:**\n" +
      "```\n" +
      "Application Pods\n" +
      "    ↓ (OTLP gRPC)\n" +
      "DaemonSet Collector (각 Node에 1개)\n" +
      "    ├─> 메모리: 512MB (로컬 버퍼)\n" +
      "    ├─> Processor: batch, memory_limiter\n" +
      "    └─> Exporter: otlp/gateway\n" +
      "        ↓\n" +
      "Gateway Collector (메모리 집약적 서버: 32GB)\n" +
      "    ├─> EC2 r6i.xlarge (32GB RAM)\n" +
      "    ├─> Processor: tail_sampling, transform\n" +
      "    └─> Exporter: otlp/tempo\n" +
      "        ↓\n" +
      "Tempo Distributor\n" +
      "```\n\n" +
      "**Gateway Collector 최적화:**\n" +
      "```yaml\n" +
      "# gateway-collector.yaml\n" +
      "processors:\n" +
      "  memory_limiter:\n" +
      "    check_interval: 1s\n" +
      "    limit_mib: 28000  # 28GB (32GB의 87%)\n" +
      "    spike_limit_mib: 4000\n" +
      "  \n" +
      "  batch:\n" +
      "    timeout: 10s\n" +
      "    send_batch_size: 10000  # 큰 배치\n" +
      "    send_batch_max_size: 20000\n" +
      "\n" +
      "exporters:\n" +
      "  otlp/tempo:\n" +
      "    endpoint: tempo-distributor:4317\n" +
      "    sending_queue:\n" +
      "      enabled: true\n" +
      "      num_consumers: 20  # 병렬 전송\n" +
      "      queue_size: 10000\n" +
      "```\n\n" +
      "**메모리 할당 전략:**\n" +
      "- DaemonSet: 512MB × 10 nodes = 5GB (분산)\n" +
      "- Gateway: 32GB × 1 instance (집중)\n" +
      "- 총 메모리: 37GB (기존 10GB → 3.7배이지만 안정적)\n\n" +
      "**Solution 5: 불필요 Attribute 제거 (Cardinality 감소)**\n\n" +
      "**Before: High-Cardinality Attributes:**\n" +
      "```json\n" +
      "{\n" +
      '  "user.id": "user_12345",         # 100K 고유 값\n' +
      '  "session.id": "sess_abcdef",     # 500K 고유 값\n' +
      '  "product.id": "prod_67890",      # 50K 고유 값\n' +
      '  "request.id": "req_xyz123",      # 5M 고유 값\n' +
      '  "timestamp.unix": "1700000000",  # 무한 고유 값\n' +
      "}\n" +
      "```\n\n" +
      "**After: Low-Cardinality Attributes Only:**\n" +
      "```yaml\n" +
      "# Collector Transform Processor\n" +
      "processors:\n" +
      "  transform:\n" +
      "    trace_statements:\n" +
      "      - context: span\n" +
      "        statements:\n" +
      "          # High-cardinality 제거\n" +
      '          - delete_key(attributes, "user.id")\n' +
      '          - delete_key(attributes, "session.id")\n' +
      '          - delete_key(attributes, "product.id")\n' +
      '          - delete_key(attributes, "request.id")\n' +
      '          - delete_key(attributes, "timestamp.unix")\n' +
      "          \n" +
      "          # 유지: Low-cardinality만\n" +
      "          # service.name, http.method, http.status_code\n" +
      "```\n\n" +
      "**Cardinality 측정:**\n" +
      "```promql\n" +
      "# Prometheus Query\n" +
      "count(count by (service_name, operation_name) (tempo_span_count))\n" +
      "\n" +
      "Before: 50,000 unique combinations\n" +
      "After:  500 unique combinations (99% 감소)\n" +
      "```\n\n" +
      "**Result: 메모리 80% 절감**\n\n" +
      "| Component | Before | After | 개선 |\n" +
      "|-----------|--------|-------|------|\n" +
      "| Distributor | 10.5GB | 2.1GB | 80% ↓ |\n" +
      "| Ingester | 9.8GB | 1.8GB | 82% ↓ |\n" +
      "| Compactor | 6.5GB | 1.2GB | 82% ↓ |\n" +
      "| **총 메모리** | **26.8GB** | **5.1GB** | **81% ↓** |\n\n" +
      "**부가 효과:**\n" +
      "1. **OOM Kill 제거**: 0회 (지난 3개월)\n" +
      "2. **쿼리 속도**: 5초 → 1초 (80% 개선)\n" +
      "3. **스토리지 비용**: $200/월 → $40/월 (80% 절감)\n" +
      "4. **Compaction 시간**: 2시간 → 15분 (87% 단축)\n\n" +
      "**핵심 교훈:**\n\n" +
      "1. **Sampling 필수**: Production에서 100% 수집은 비현실적\n" +
      "2. **Cardinality 관리**: High-cardinality attribute는 독\n" +
      "3. **Retention 분리**: Hot(Tempo) + Warm(ClickHouse) 전략\n" +
      "4. **Gateway 패턴**: 메모리 집약적 작업은 전용 서버에\n" +
      "5. **OpenTelemetry 장점**: SDK 수정 없이 Collector에서 제어\n\n" +
      "**토스 적용 포인트:**\n\n" +
      "토스의 대규모 트래픽 환경에서 필수:\n" +
      "- Intelligent Sampling: 에러/느린 요청 우선\n" +
      "- Cardinality 엄격 관리\n" +
      "- 금융 규제 준수: 7일 Hot + 90일 Warm 보관",
  },

  // ClickHouse 30일 SLA 달성
  {
    id: 67,
    category1: "Infrastructure",
    category2: "Time-Series Database",
    question:
      "ClickHouse로 30일 데이터 보관 SLA를 달성하기 위해 어떤 최적화를 했나요?",
    answer:
      "**Requirement: 30일 Hot Data + 90일 Warm Data + 10년 Cold Data**\n\n" +
      "**데이터 볼륨:**\n" +
      "- 일일 OpenTelemetry 로그: 100GB (JSON)\n" +
      "- 월간 데이터: 3TB\n" +
      "- 30일 Hot: 3TB\n" +
      "- 90일 Warm: 9TB\n" +
      "- 10년 Cold: 365TB\n\n" +
      "**Challenge: 스토리지 비용 폭발**\n\n" +
      "**Naive 접근 시 비용:**\n" +
      "```\n" +
      "ClickHouse SSD (IOPS 최적화):\n" +
      "- 3TB × $0.10/GB = $300/월 (30일)\n" +
      "- 9TB × $0.10/GB = $900/월 (90일)\n" +
      "- 365TB → 불가능 (수십만 달러)\n" +
      "\n" +
      "총 비용: $1,200/월 (Hot + Warm만)\n" +
      "```\n\n" +
      "**Solution 1: LZ4 Compression (10x 압축률)**\n\n" +
      "**ClickHouse 테이블 정의:**\n" +
      "```sql\n" +
      "CREATE TABLE otel_logs (\n" +
      "  timestamp DateTime64(9),\n" +
      "  trace_id FixedString(32),\n" +
      "  span_id FixedString(16),\n" +
      "  severity_text LowCardinality(String),\n" +
      "  body String CODEC(LZ4HC),  # LZ4 High Compression\n" +
      "  service_name LowCardinality(String),\n" +
      "  resource_attributes Map(String, String) CODEC(LZ4HC),\n" +
      "  log_attributes Map(String, String) CODEC(LZ4HC)\n" +
      ") ENGINE = MergeTree()\n" +
      "PARTITION BY toYYYYMMDD(timestamp)\n" +
      "ORDER BY (service_name, timestamp, trace_id)\n" +
      "TTL timestamp + INTERVAL 30 DAY TO DISK 'warm',  # Warm tier\n" +
      "    timestamp + INTERVAL 120 DAY TO VOLUME 's3_cold'  # Cold tier (S3)\n" +
      "SETTINGS \n" +
      "  index_granularity = 8192,\n" +
      "  compress_block_size = 1048576;  # 1MB block\n" +
      "```\n\n" +
      "**LZ4 vs LZ4HC 비교:**\n\n" +
      "| Codec | 압축률 | 압축 속도 | 해제 속도 | 용도 |\n" +
      "|-------|--------|-----------|-----------|------|\n" +
      "| LZ4 | 5x | 매우 빠름 | 매우 빠름 | Hot data |\n" +
      "| LZ4HC | 10x | 느림 | 빠름 | Warm/Cold data |\n" +
      "| ZSTD | 15x | 매우 느림 | 느림 | Archive |\n\n" +
      "**압축 효과 실측:**\n" +
      "```\n" +
      "원본 JSON: 100GB/day\n" +
      "  ↓ Parquet 변환: 30GB/day (70% 절감)\n" +
      "  ↓ LZ4HC 압축: 10GB/day (90% 절감)\n" +
      "\n" +
      "30일: 10GB × 30 = 300GB (기존 3TB → 90% 절감)\n" +
      "```\n\n" +
      "**Solution 2: TTL Tiered Storage (Hot → Warm → Cold)**\n\n" +
      "**Storage Tier 구성:**\n" +
      "```xml\n" +
      "<!-- /etc/clickhouse-server/config.d/storage.xml -->\n" +
      "<storage_configuration>\n" +
      "  <disks>\n" +
      "    <!-- Hot tier: NVMe SSD -->\n" +
      "    <hot>\n" +
      "      <type>local</type>\n" +
      "      <path>/var/lib/clickhouse/hot/</path>\n" +
      "    </hot>\n" +
      "    \n" +
      "    <!-- Warm tier: SATA HDD -->\n" +
      "    <warm>\n" +
      "      <type>local</type>\n" +
      "      <path>/mnt/warm/clickhouse/</path>\n" +
      "    </warm>\n" +
      "    \n" +
      "    <!-- Cold tier: S3 -->\n" +
      "    <s3_cold>\n" +
      "      <type>s3</type>\n" +
      "      <endpoint>https://s3.amazonaws.com/my-bucket/clickhouse/</endpoint>\n" +
      "      <access_key_id>AKIA...</access_key_id>\n" +
      "      <secret_access_key>...</secret_access_key>\n" +
      "      <region>ap-northeast-2</region>\n" +
      "    </s3_cold>\n" +
      "  </disks>\n" +
      "  \n" +
      "  <policies>\n" +
      "    <tiered>\n" +
      "      <volumes>\n" +
      "        <hot_volume>\n" +
      "          <disk>hot</disk>\n" +
      "        </hot_volume>\n" +
      "        <warm_volume>\n" +
      "          <disk>warm</disk>\n" +
      "        </warm_volume>\n" +
      "        <cold_volume>\n" +
      "          <disk>s3_cold</disk>\n" +
      "        </cold_volume>\n" +
      "      </volumes>\n" +
      "      <move_factor>0.2</move_factor>  # 80% 차면 이동\n" +
      "    </tiered>\n" +
      "  </policies>\n" +
      "</storage_configuration>\n" +
      "```\n\n" +
      "**TTL 자동 이동:**\n" +
      "```sql\n" +
      "ALTER TABLE otel_logs MODIFY TTL\n" +
      "  timestamp + INTERVAL 30 DAY TO DISK 'warm',\n" +
      "  timestamp + INTERVAL 120 DAY TO VOLUME 's3_cold',\n" +
      "  timestamp + INTERVAL 3650 DAY DELETE;  # 10년 후 삭제\n" +
      "```\n\n" +
      "**데이터 라이프사이클:**\n" +
      "```\n" +
      "Day 0-30:  NVMe SSD (쿼리 <1초, 자주 접근)\n" +
      "Day 31-120: SATA HDD (쿼리 1-5초, 가끔 접근)\n" +
      "Day 121-3650: S3 (쿼리 10-30초, 거의 안 함)\n" +
      "Day 3651+: 자동 삭제\n" +
      "```\n\n" +
      "**비용 계산 (압축 후):**\n" +
      "```\n" +
      "Hot (NVMe): 300GB × $0.10/GB = $30/월\n" +
      "Warm (HDD): 900GB × $0.02/GB = $18/월\n" +
      "Cold (S3 Standard-IA): 36TB × $0.0125/GB = $450/월\n" +
      "Cold (S3 Glacier): 300TB × $0.004/GB = $1,200/월\n" +
      "\n" +
      "총 비용: $1,698/월 (기존 수만 달러 → 95% 절감)\n" +
      "```\n\n" +
      "**Solution 3: Partition Pruning (쿼리 최적화)**\n\n" +
      "**Before: Full Table Scan (느림)**\n" +
      "```sql\n" +
      "SELECT * FROM otel_logs\n" +
      "WHERE trace_id = 'abc123...'\n" +
      "  AND timestamp > '2025-11-01';\n" +
      "\n" +
      "-- 스캔량: 3TB (전체 테이블)\n" +
      "-- 실행 시간: 30초\n" +
      "```\n\n" +
      "**After: Partition + Order Key 활용 (빠름)**\n" +
      "```sql\n" +
      "-- Partition Key: toYYYYMMDD(timestamp)\n" +
      "-- Order Key: (service_name, timestamp, trace_id)\n" +
      "\n" +
      "SELECT * FROM otel_logs\n" +
      "WHERE toYYYYMMDD(timestamp) = 20251113  # Partition pruning\n" +
      "  AND service_name = 'backend-api'       # Index hit\n" +
      "  AND trace_id = 'abc123...';            # Index hit\n" +
      "\n" +
      "-- 스캔량: 10GB (하루치만)\n" +
      "-- 실행 시간: 0.5초 (60배 개선)\n" +
      "```\n\n" +
      "**Partition 설계 원칙:**\n\n" +
      "1. **일별 파티션**: 조회 패턴이 일별일 때\n" +
      "   ```sql\n" +
      "   PARTITION BY toYYYYMMDD(timestamp)\n" +
      "   ```\n\n" +
      "2. **월별 파티션**: 조회 패턴이 월별일 때\n" +
      "   ```sql\n" +
      "   PARTITION BY toYYYYMM(timestamp)\n" +
      "   ```\n\n" +
      "3. **다중 파티션**: 서비스별 + 일별\n" +
      "   ```sql\n" +
      "   PARTITION BY (service_name, toYYYYMMDD(timestamp))\n" +
      "   ```\n\n" +
      "**Solution 4: Async Inserts (배치 삽입)**\n\n" +
      "**Before: 개별 INSERT (느림)**\n" +
      "```python\n" +
      "# Lambda 함수에서 로그마다 INSERT\n" +
      "for log in logs:\n" +
      "    client.execute(\n" +
      "        'INSERT INTO otel_logs VALUES',\n" +
      "        [log]\n" +
      "    )\n" +
      "\n" +
      "# 성능:\n" +
      "# - 1,000 logs → 1,000 INSERT → 10초\n" +
      "# - Network overhead 큼\n" +
      "```\n\n" +
      "**After: Async Batch INSERT (빠름)**\n" +
      "```xml\n" +
      "<!-- /etc/clickhouse-server/config.d/async_insert.xml -->\n" +
      "<async_insert_settings>\n" +
      "  <async_insert>1</async_insert>\n" +
      "  <wait_for_async_insert>0</wait_for_async_insert>\n" +
      "  <async_insert_max_data_size>10485760</async_insert_max_data_size>  <!-- 10MB -->\n" +
      "  <async_insert_busy_timeout_ms>5000</async_insert_busy_timeout_ms>  <!-- 5초 -->\n" +
      "</async_insert_settings>\n" +
      "```\n\n" +
      "```python\n" +
      "# Lambda 함수에서 배치 INSERT\n" +
      "client.execute(\n" +
      "    'INSERT INTO otel_logs VALUES',\n" +
      "    logs,  # 1,000 logs 한 번에\n" +
      "    settings={'async_insert': 1}\n" +
      ")\n" +
      "\n" +
      "# 성능:\n" +
      "# - 1,000 logs → 1 INSERT → 0.5초 (20배 개선)\n" +
      "```\n\n" +
      "**Async Insert 동작:**\n" +
      "```\n" +
      "Client → ClickHouse Buffer (메모리)\n" +
      "           ├─> 100 records 또는\n" +
      "           ├─> 5초 경과 시\n" +
      "           └─> Disk에 Flush\n" +
      "```\n\n" +
      "**Solution 5: MergeTree 엔진 최적화**\n\n" +
      "**Index Granularity 튜닝:**\n" +
      "```sql\n" +
      "SETTINGS index_granularity = 8192  # 기본값\n" +
      "\n" +
      "-- 큰 파일 (TB급): index_granularity = 16384 (메모리 절약)\n" +
      "-- 작은 파일 (GB급): index_granularity = 4096 (쿼리 빠름)\n" +
      "```\n\n" +
      "**Index Granularity란?**\n" +
      "```\n" +
      "ClickHouse는 8192 rows마다 인덱스 생성\n" +
      "\n" +
      "Row 0:      Index Entry (service_name='backend', timestamp='2025-11-13 00:00:00')\n" +
      "Row 8192:   Index Entry (service_name='backend', timestamp='2025-11-13 00:05:00')\n" +
      "Row 16384:  Index Entry (service_name='backend', timestamp='2025-11-13 00:10:00')\n" +
      "\n" +
      "쿼리 시: Binary Search로 관련 8192-row 블록만 읽음\n" +
      "```\n\n" +
      "**Merge 주기 조정:**\n" +
      "```xml\n" +
      "<merge_tree>\n" +
      "  <max_bytes_to_merge_at_max_space_in_pool>161061273600</max_bytes_to_merge_at_max_space_in_pool>  <!-- 150GB -->\n" +
      "  <number_of_free_entries_in_pool_to_lower_max_size_of_merge>8</number_of_free_entries_in_pool_to_lower_max_size_of_merge>\n" +
      "</merge_tree>\n" +
      "```\n\n" +
      "**Merge 동작:**\n" +
      "```\n" +
      "작은 파일 (100개, 각 100MB)\n" +
      "  ↓ Background Merge\n" +
      "큰 파일 (1개, 10GB)\n" +
      "\n" +
      "효과:\n" +
      "- 읽기 성능 향상 (파일 적음)\n" +
      "- 압축률 향상 (큰 블록)\n" +
      "```\n\n" +
      "**Result: 30일 SLA 달성 + 비용 95% 절감**\n\n" +
      "| 지표 | 요구사항 | 달성 | 비고 |\n" +
      "|------|----------|------|------|\n" +
      "| Hot 데이터 보관 | 30일 | 30일 | NVMe SSD |\n" +
      "| Warm 데이터 | 90일 | 120일 | HDD |\n" +
      "| Cold 데이터 | 10년 | 10년 | S3 Glacier |\n" +
      "| 쿼리 속도 (Hot) | <5초 | <1초 | 80% 개선 |\n" +
      "| 쿼리 속도 (Warm) | <30초 | <5초 | 83% 개선 |\n" +
      "| 압축률 | - | 10x | LZ4HC |\n" +
      "| 월간 비용 | - | $1,698 | 기존 $30K+ |\n\n" +
      "**실제 쿼리 성능:**\n\n" +
      "```sql\n" +
      "-- 1. 최근 1시간 에러 로그 (Hot)\n" +
      "SELECT * FROM otel_logs\n" +
      "WHERE timestamp > now() - INTERVAL 1 HOUR\n" +
      "  AND severity_text = 'ERROR';\n" +
      "-- 실행 시간: 0.3초\n" +
      "-- 스캔량: 5GB\n" +
      "\n" +
      "-- 2. 최근 7일 서비스별 에러율 (Hot)\n" +
      "SELECT \n" +
      "  service_name,\n" +
      "  countIf(severity_text = 'ERROR') / count() AS error_rate\n" +
      "FROM otel_logs\n" +
      "WHERE timestamp > now() - INTERVAL 7 DAY\n" +
      "GROUP BY service_name;\n" +
      "-- 실행 시간: 2초\n" +
      "-- 스캔량: 70GB\n" +
      "\n" +
      "-- 3. 최근 90일 트렌드 (Warm)\n" +
      "SELECT \n" +
      "  toDate(timestamp) AS date,\n" +
      "  count() AS log_count\n" +
      "FROM otel_logs\n" +
      "WHERE timestamp > now() - INTERVAL 90 DAY\n" +
      "GROUP BY date\n" +
      "ORDER BY date;\n" +
      "-- 실행 시간: 4초\n" +
      "-- 스캔량: 900GB (HDD)\n" +
      "```\n\n" +
      "**핵심 최적화 기법:**\n\n" +
      "1. **LZ4HC 압축**: 10배 압축, 90% 스토리지 절감\n" +
      "2. **TTL Tiered Storage**: Hot/Warm/Cold 자동 이동\n" +
      "3. **Partition Pruning**: 일별 파티션으로 스캔량 최소화\n" +
      "4. **Async Inserts**: 배치 삽입으로 처리량 20배 향상\n" +
      "5. **MergeTree 최적화**: Index granularity, Merge 주기 조정\n\n" +
      "**토스 적용 포인트:**\n\n" +
      "토스의 금융 규제 환경에 적합:\n" +
      "- 전자금융감독규정: 1년 이상 로그 보관 의무\n" +
      "- ClickHouse로 비용 효율적 장기 보관\n" +
      "- Hot/Warm 분리로 쿼리 성능 보장\n" +
      "- S3 Glacier로 10년 보관 달성",
  },

  // Batch 서비스 Trace ID 전파
  {
    id: 68,
    category1: "Infrastructure",
    category2: "Observability",
    question:
      "Batch 서비스가 5000+ messages/min를 처리할 때 어떻게 Trace ID를 유지했나요?",
    answer:
      "**Requirement: End-to-End Distributed Tracing**\n\n" +
      "**목표: Single Trace ID로 전체 흐름 추적**\n\n" +
      "```\n" +
      "Client Request (trace_id=abc123)\n" +
      "  ↓\n" +
      "API Gateway (trace_id=abc123)\n" +
      "  ↓\n" +
      "Backend API (trace_id=abc123)\n" +
      "  ↓ (Kafka Producer)\n" +
      "Kafka Topic: events (trace_id=abc123 in headers)\n" +
      "  ↓ (Kafka Consumer)\n" +
      "Batch Service (trace_id=abc123)\n" +
      "  ↓ (Database Write)\n" +
      "PostgreSQL (trace_id=abc123 in logs)\n" +
      "  ↓\n" +
      "Grafana Dashboard: 전체 흐름 시각화\n" +
      "```\n\n" +
      "**Challenge: Kafka가 Trace Context를 끊음**\n\n" +
      "**Before: Trace ID 소실**\n\n" +
      "```go\n" +
      "// Backend API (Producer)\n" +
      "func PublishEvent(ctx context.Context, event Event) error {\n" +
      "    msg := &sarama.ProducerMessage{\n" +
      '        Topic: "events",\n' +
      "        Value: sarama.StringEncoder(event.ToJSON()),\n" +
      "    }\n" +
      "    _, _, err := producer.SendMessage(msg)\n" +
      "    return err\n" +
      "}\n" +
      "// ❌ Trace Context가 전파되지 않음!\n" +
      "\n" +
      "// Batch Service (Consumer)\n" +
      "func ConsumeEvent(msg *sarama.ConsumerMessage) {\n" +
      "    // ❌ 새로운 Trace가 시작됨 (기존 trace_id와 무관)\n" +
      "    ctx := context.Background()\n" +
      '    span := tracer.StartSpan("process_event")\n' +
      "    defer span.Finish()\n" +
      "    \n" +
      "    processEvent(ctx, msg.Value)\n" +
      "}\n" +
      "```\n\n" +
      "**문제:**\n" +
      "- API → Kafka: trace_id=abc123\n" +
      "- Kafka → Batch: trace_id=xyz789 (새로 생성)\n" +
      "- Grafana에서 두 Trace가 연결 안 됨\n\n" +
      "**Solution 1: W3C Trace Context in Kafka Headers**\n\n" +
      "**W3C Trace Context 표준:**\n\n" +
      "```\n" +
      "traceparent: 00-{trace_id}-{span_id}-{flags}\n" +
      "tracestate: vendor=value,vendor2=value2\n" +
      "\n" +
      "예시:\n" +
      "traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01\n" +
      "             ^^  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^  ^^\n" +
      "             |   trace_id (16 bytes hex)          span_id (8 bytes) flags\n" +
      "             version\n" +
      "```\n\n" +
      "**Producer: Trace Context Injection (Go + OpenTelemetry)**\n\n" +
      "```go\n" +
      "// backend-api/kafka_producer.go\n" +
      "import (\n" +
      '    "go.opentelemetry.io/otel"\n' +
      '    "go.opentelemetry.io/otel/propagation"\n' +
      '    "github.com/Shopify/sarama"\n' +
      ")\n" +
      "\n" +
      "type MessageCarrier struct {\n" +
      "    msg *sarama.ProducerMessage\n" +
      "}\n" +
      "\n" +
      "func (c MessageCarrier) Get(key string) string {\n" +
      "    for _, header := range c.msg.Headers {\n" +
      "        if string(header.Key) == key {\n" +
      "            return string(header.Value)\n" +
      "        }\n" +
      "    }\n" +
      '    return ""\n' +
      "}\n" +
      "\n" +
      "func (c MessageCarrier) Set(key, value string) {\n" +
      "    header := sarama.RecordHeader{\n" +
      "        Key:   []byte(key),\n" +
      "        Value: []byte(value),\n" +
      "    }\n" +
      "    c.msg.Headers = append(c.msg.Headers, header)\n" +
      "}\n" +
      "\n" +
      "func (c MessageCarrier) Keys() []string {\n" +
      "    keys := make([]string, len(c.msg.Headers))\n" +
      "    for i, h := range c.msg.Headers {\n" +
      "        keys[i] = string(h.Key)\n" +
      "    }\n" +
      "    return keys\n" +
      "}\n" +
      "\n" +
      "func PublishEvent(ctx context.Context, event Event) error {\n" +
      "    // 1. Span 생성\n" +
      '    tracer := otel.Tracer("backend-api")\n' +
      '    ctx, span := tracer.Start(ctx, "kafka.publish")\n' +
      "    defer span.End()\n" +
      "    \n" +
      "    // 2. Kafka 메시지 생성\n" +
      "    msg := &sarama.ProducerMessage{\n" +
      '        Topic: "events",\n' +
      "        Value: sarama.StringEncoder(event.ToJSON()),\n" +
      "    }\n" +
      "    \n" +
      "    // 3. Trace Context Injection (W3C 표준)\n" +
      "    propagator := otel.GetTextMapPropagator()\n" +
      "    carrier := MessageCarrier{msg: msg}\n" +
      "    propagator.Inject(ctx, carrier)\n" +
      "    \n" +
      "    // 4. Kafka 전송\n" +
      "    _, _, err := producer.SendMessage(msg)\n" +
      "    if err != nil {\n" +
      "        span.RecordError(err)\n" +
      "        return err\n" +
      "    }\n" +
      "    \n" +
      "    span.SetAttributes(\n" +
      '        attribute.String("messaging.system", "kafka"),\n' +
      '        attribute.String("messaging.destination", "events"),\n' +
      '        attribute.Int64("messaging.message_payload_size_bytes", int64(len(msg.Value.Encode()))),\n' +
      "    )\n" +
      "    \n" +
      "    return nil\n" +
      "}\n" +
      "```\n\n" +
      "**Kafka Message 구조 (Header에 Trace Context):**\n\n" +
      "```json\n" +
      "{\n" +
      '  "topic": "events",\n' +
      '  "partition": 3,\n' +
      '  "offset": 12345,\n' +
      '  "headers": [\n' +
      "    {\n" +
      '      "key": "traceparent",\n' +
      '      "value": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"\n' +
      "    },\n" +
      "    {\n" +
      '      "key": "content-type",\n' +
      '      "value": "application/json"\n' +
      "    }\n" +
      "  ],\n" +
      '  "value": "{\\"user_id\\": 12345, \\"action\\": \\"purchase\\"}"\n' +
      "}\n" +
      "```\n\n" +
      "**Consumer: Trace Context Extraction (Go + OpenTelemetry)**\n\n" +
      "```go\n" +
      "// batch-service/kafka_consumer.go\n" +
      "type MessageCarrier struct {\n" +
      "    msg *sarama.ConsumerMessage\n" +
      "}\n" +
      "\n" +
      "func (c MessageCarrier) Get(key string) string {\n" +
      "    for _, header := range c.msg.Headers {\n" +
      "        if string(header.Key) == key {\n" +
      "            return string(header.Value)\n" +
      "        }\n" +
      "    }\n" +
      '    return ""\n' +
      "}\n" +
      "\n" +
      "func (c MessageCarrier) Set(key, value string) {\n" +
      "    // Consumer는 읽기 전용이므로 구현 불필요\n" +
      "}\n" +
      "\n" +
      "func (c MessageCarrier) Keys() []string {\n" +
      "    keys := make([]string, len(c.msg.Headers))\n" +
      "    for i, h := range c.msg.Headers {\n" +
      "        keys[i] = string(h.Key)\n" +
      "    }\n" +
      "    return keys\n" +
      "}\n" +
      "\n" +
      "func ConsumeEvent(msg *sarama.ConsumerMessage) {\n" +
      "    // 1. Trace Context Extraction (W3C 표준)\n" +
      "    propagator := otel.GetTextMapPropagator()\n" +
      "    carrier := MessageCarrier{msg: msg}\n" +
      "    ctx := propagator.Extract(context.Background(), carrier)\n" +
      "    // ✅ 이제 ctx에 원본 trace_id가 포함됨!\n" +
      "    \n" +
      "    // 2. Span 생성 (부모 Trace 이어받음)\n" +
      '    tracer := otel.Tracer("batch-service")\n' +
      '    ctx, span := tracer.Start(ctx, "kafka.consume")\n' +
      "    defer span.End()\n" +
      "    \n" +
      "    span.SetAttributes(\n" +
      '        attribute.String("messaging.system", "kafka"),\n' +
      '        attribute.String("messaging.source", "events"),\n' +
      '        attribute.Int("messaging.kafka.partition", int(msg.Partition)),\n' +
      '        attribute.Int64("messaging.kafka.offset", msg.Offset),\n' +
      "    )\n" +
      "    \n" +
      "    // 3. 비즈니스 로직 (Trace ID 유지)\n" +
      "    processEvent(ctx, msg.Value)\n" +
      "}\n" +
      "\n" +
      "func processEvent(ctx context.Context, data []byte) {\n" +
      "    // 4. DB 쿼리에도 Trace ID 전파\n" +
      '    tracer := otel.Tracer("batch-service")\n' +
      '    ctx, span := tracer.Start(ctx, "db.insert")\n' +
      "    defer span.End()\n" +
      "    \n" +
      "    // PostgreSQL 쿼리에 Trace ID 포함\n" +
      "    query := `\n" +
      "        INSERT INTO events (user_id, action, trace_id)\n" +
      "        VALUES ($1, $2, $3)\n" +
      "    `\n" +
      "    \n" +
      "    // OpenTelemetry에서 Trace ID 추출\n" +
      "    spanCtx := trace.SpanFromContext(ctx).SpanContext()\n" +
      "    traceID := spanCtx.TraceID().String()\n" +
      "    \n" +
      "    _, err := db.ExecContext(ctx, query, userID, action, traceID)\n" +
      "    if err != nil {\n" +
      "        span.RecordError(err)\n" +
      "    }\n" +
      "}\n" +
      "```\n\n" +
      "**Solution 2: High-Throughput 처리 (5000+ messages/min)**\n\n" +
      "**Consumer Group 병렬 처리:**\n\n" +
      "```yaml\n" +
      "# batch-service deployment\n" +
      "apiVersion: apps/v1\n" +
      "kind: Deployment\n" +
      "metadata:\n" +
      "  name: batch-consumer\n" +
      "spec:\n" +
      "  replicas: 10  # 10 pods\n" +
      "  template:\n" +
      "    spec:\n" +
      "      containers:\n" +
      "      - name: consumer\n" +
      "        env:\n" +
      "        - name: KAFKA_GROUP_ID\n" +
      '          value: "batch-service-group"\n' +
      "        - name: KAFKA_CONCURRENCY\n" +
      '          value: "10"  # Pod당 10 goroutines\n' +
      "```\n\n" +
      "**처리량 계산:**\n" +
      "```\n" +
      "총 Consumer 수: 10 pods × 10 goroutines = 100 consumers\n" +
      "메시지 처리 시간: 평균 1초\n" +
      "이론 처리량: 100 messages/sec = 6,000 messages/min\n" +
      "\n" +
      "실제 처리량: 5,500 messages/min (여유 있음)\n" +
      "```\n\n" +
      "**Kafka Partition 최적화:**\n\n" +
      "```bash\n" +
      "# Topic 생성 (20 partitions)\n" +
      "kafka-topics.sh --create \\\n" +
      "  --topic events \\\n" +
      "  --partitions 20 \\\n" +
      "  --replication-factor 3 \\\n" +
      "  --config retention.ms=604800000  # 7일\n" +
      "\n" +
      "# Partition 수 = Consumer 수\n" +
      "# 20 partitions → 최대 20 consumers 병렬\n" +
      "# 여기서는 10 consumers → 각 consumer가 2 partitions 담당\n" +
      "```\n\n" +
      "**Solution 3: Batch Context Propagation**\n\n" +
      "**Batch 작업 전체를 하나의 Trace로:**\n\n" +
      "```go\n" +
      "// batch-service/batch_processor.go\n" +
      "func ProcessBatch(ctx context.Context, messages []*sarama.ConsumerMessage) {\n" +
      '    tracer := otel.Tracer("batch-service")\n' +
      '    ctx, span := tracer.Start(ctx, "batch.process")\n' +
      "    defer span.End()\n" +
      "    \n" +
      "    span.SetAttributes(\n" +
      '        attribute.Int("batch.size", len(messages)),\n' +
      "    )\n" +
      "    \n" +
      "    var wg sync.WaitGroup\n" +
      "    for _, msg := range messages {\n" +
      "        wg.Add(1)\n" +
      "        go func(m *sarama.ConsumerMessage) {\n" +
      "            defer wg.Done()\n" +
      "            \n" +
      "            // 각 메시지는 독립적인 Span (부모는 batch.process)\n" +
      "            propagator := otel.GetTextMapPropagator()\n" +
      "            carrier := MessageCarrier{msg: m}\n" +
      "            msgCtx := propagator.Extract(ctx, carrier)\n" +
      "            \n" +
      '            _, msgSpan := tracer.Start(msgCtx, "message.process")\n' +
      "            defer msgSpan.End()\n" +
      "            \n" +
      "            processEvent(msgCtx, m.Value)\n" +
      "        }(msg)\n" +
      "    }\n" +
      "    \n" +
      "    wg.Wait()\n" +
      "    span.SetAttributes(\n" +
      '        attribute.String("batch.status", "completed"),\n' +
      "    )\n" +
      "}\n" +
      "```\n\n" +
      "**Grafana Trace 시각화:**\n\n" +
      "```\n" +
      "Trace ID: 4bf92f3577b34da6a3ce929d0e0e4736 (총 5초)\n" +
      "├─ api-gateway: / (50ms)\n" +
      "│  └─ backend-api: POST /events (200ms)\n" +
      "│     └─ kafka.publish (10ms)\n" +
      "│        └─ kafka: events (비동기)\n" +
      "│           └─ batch-service: kafka.consume (4.5초)\n" +
      "│              ├─ db.insert (100ms)\n" +
      "│              └─ db.commit (50ms)\n" +
      "```\n\n" +
      "**Solution 4: 로그에 Trace ID 자동 주입**\n\n" +
      "**Logrus Hook (Go):**\n\n" +
      "```go\n" +
      "// batch-service/logger.go\n" +
      "import (\n" +
      '    "github.com/sirupsen/logrus"\n' +
      '    "go.opentelemetry.io/otel/trace"\n' +
      ")\n" +
      "\n" +
      "type TraceHook struct{}\n" +
      "\n" +
      "func (h *TraceHook) Levels() []logrus.Level {\n" +
      "    return logrus.AllLevels\n" +
      "}\n" +
      "\n" +
      "func (h *TraceHook) Fire(entry *logrus.Entry) error {\n" +
      "    ctx := entry.Context\n" +
      "    if ctx != nil {\n" +
      "        span := trace.SpanFromContext(ctx)\n" +
      "        if span.SpanContext().IsValid() {\n" +
      '            entry.Data["trace_id"] = span.SpanContext().TraceID().String()\n' +
      '            entry.Data["span_id"] = span.SpanContext().SpanID().String()\n' +
      "        }\n" +
      "    }\n" +
      "    return nil\n" +
      "}\n" +
      "\n" +
      "func init() {\n" +
      "    logrus.AddHook(&TraceHook{})\n" +
      "}\n" +
      "\n" +
      "// 사용 예시\n" +
      "func processEvent(ctx context.Context, data []byte) {\n" +
      '    logrus.WithContext(ctx).Info("Processing event")\n' +
      '    // 출력: {"level":"info","msg":"Processing event","trace_id":"4bf92f35...","span_id":"00f067aa..."}\n' +
      "}\n" +
      "```\n\n" +
      "**Grafana Loki 쿼리 (Trace ID로 필터):**\n\n" +
      "```logql\n" +
      '{service_name="batch-service"} |= "trace_id=4bf92f3577b34da6a3ce929d0e0e4736"\n' +
      "```\n\n" +
      "**Result: 5000+ messages/min with Full Traceability**\n\n" +
      "| 지표 | Before | After | 개선 |\n" +
      "|------|--------|-------|------|\n" +
      "| Trace 연결률 | 0% | 100% | ∞ |\n" +
      "| MTTI (Root Cause) | 1-2시간 | 5분 | 95% ↓ |\n" +
      "| 처리량 | 3000 msg/min | 5500 msg/min | 83% ↑ |\n" +
      "| Latency P99 | 10초 | 2초 | 80% ↓ |\n\n" +
      "**Kafka Monitoring (Grafana):**\n\n" +
      "```promql\n" +
      "# Consumer Lag\n" +
      'kafka_consumer_lag{topic="events",group="batch-service-group"}\n' +
      "\n" +
      "# 처리 속도\n" +
      "rate(kafka_consumer_messages_consumed_total[1m])\n" +
      "\n" +
      "# Trace 성공률\n" +
      "sum(rate(traces_received_total[1m])) / sum(rate(messages_consumed_total[1m]))\n" +
      "```\n\n" +
      "**핵심 기술:**\n\n" +
      "1. **W3C Trace Context**: 표준 프로토콜로 Kafka Header 전파\n" +
      "2. **OpenTelemetry Propagator**: Inject/Extract API로 자동화\n" +
      "3. **Consumer Group**: 10 pods × 10 goroutines = 100 병렬 처리\n" +
      "4. **Logrus Hook**: 로그에 Trace ID 자동 주입\n" +
      "5. **Batch Context**: 전체 배치 작업을 하나의 Trace로\n\n" +
      "**토스 적용 포인트:**\n\n" +
      "토스의 실시간 결제 시스템에서 필수:\n" +
      "- 결제 요청 → Kafka → 정산 배치 → DB\n" +
      "- 전체 흐름 Trace로 장애 추적\n" +
      "- 5000+ TPS 처리 보장",
  },

  // Linux 서버 최적화 (100대 모니터링)
  {
    id: 69,
    category1: "Infrastructure",
    category2: "Linux",
    question: "100대 이상 Linux 서버를 운영하며 어떤 최적화 작업을 했나요?",
    answer:
      "**Environment: 120 Linux Servers (Ubuntu 22.04, CentOS 7)**\n\n" +
      "**서버 구성:**\n" +
      "```\n" +
      "- Web Servers: 40대 (Nginx + Node.js)\n" +
      "- API Servers: 30대 (Go + Python)\n" +
      "- Batch Servers: 20대 (Airflow + Celery)\n" +
      "- DB Servers: 15대 (PostgreSQL + Redis)\n" +
      "- Monitoring: 10대 (Prometheus + Grafana + ClickHouse)\n" +
      "- ELK Stack: 5대 (Elasticsearch + Kibana)\n" +
      "```\n\n" +
      "**Challenge 1: CPU Throttling (T3 인스턴스)**\n\n" +
      "**Problem: CPU Credit 고갈**\n\n" +
      "```bash\n" +
      "# AWS T3 인스턴스는 CPU Credit 시스템\n" +
      "# Baseline 30% 초과 시 Credit 소진 → Throttling\n" +
      "\n" +
      "$ aws cloudwatch get-metric-statistics \\\n" +
      "  --namespace AWS/EC2 \\\n" +
      "  --metric-name CPUCreditBalance \\\n" +
      "  --dimensions Name=InstanceId,Value=i-1234567890abcdef0\n" +
      "\n" +
      "# 결과:\n" +
      "# 09:00 - 288 credits (정상)\n" +
      "# 12:00 - 120 credits (감소)\n" +
      "# 15:00 - 0 credits ❌ (고갈)\n" +
      "# 15:05 - CPU 30%로 제한 (Throttling)\n" +
      "```\n\n" +
      "**Solution: T3 Unlimited 활성화 + Auto Scaling**\n\n" +
      "```bash\n" +
      "# 1. T3 Unlimited 활성화\n" +
      "aws ec2 modify-instance-credit-specification \\\n" +
      "  --instance-credit-specification \\\n" +
      '    "InstanceId=i-1234567890abcdef0,CpuCredits=unlimited"\n' +
      "\n" +
      "# 2. CloudWatch Alarm\n" +
      "aws cloudwatch put-metric-alarm \\\n" +
      "  --alarm-name cpu-credits-low \\\n" +
      '  --alarm-description "CPU Credit 부족" \\\n' +
      "  --metric-name CPUCreditBalance \\\n" +
      "  --namespace AWS/EC2 \\\n" +
      "  --statistic Average \\\n" +
      "  --period 300 \\\n" +
      "  --threshold 50 \\\n" +
      "  --comparison-operator LessThanThreshold\n" +
      "\n" +
      "# 3. Auto Scaling Policy (CPU Credit 기반)\n" +
      "aws autoscaling put-scaling-policy \\\n" +
      "  --auto-scaling-group-name web-servers-asg \\\n" +
      "  --policy-name scale-up-cpu-credits \\\n" +
      "  --scaling-adjustment 2 \\\n" +
      "  --adjustment-type ChangeInCapacity\n" +
      "```\n\n" +
      "**결과:**\n" +
      "- CPU Throttling: 0회 (지난 3개월)\n" +
      "- T3 Unlimited 비용: $20/월 추가 (허용 가능)\n\n" +
      "**Challenge 2: OOM Killer (메모리 부족)**\n\n" +
      "**Problem: Java Heap + OS Cache 충돌**\n\n" +
      "```bash\n" +
      "# /var/log/syslog\n" +
      "Dec 13 15:23:45 ip-10-0-1-123 kernel: [12345.678901] Out of memory: Kill process 12345 (java) score 800 or sacrifice child\n" +
      "Dec 13 15:23:45 ip-10-0-1-123 kernel: [12345.678902] Killed process 12345 (java) total-vm:16777216kB, anon-rss:15728640kB, file-rss:0kB\n" +
      "\n" +
      "# 메모리 현황\n" +
      "$ free -h\n" +
      "              total        used        free      shared  buff/cache   available\n" +
      "Mem:            16G         15G         100M         50M        900M         200M\n" +
      "Swap:            0B          0B          0B\n" +
      "\n" +
      "문제:\n" +
      "- Java Heap: -Xmx14G (14GB)\n" +
      "- OS Cache: 900MB\n" +
      "- Available: 200MB (너무 적음)\n" +
      "- Swap: 0 (미설정)\n" +
      "```\n\n" +
      "**Solution 1: JVM Heap 조정 (14GB → 12GB)**\n\n" +
      "```bash\n" +
      "# /etc/systemd/system/app.service\n" +
      "[Service]\n" +
      'Environment="JAVA_OPTS=-Xms12G -Xmx12G -XX:+UseG1GC -XX:MaxGCPauseMillis=200"\n' +
      "ExecStart=/usr/bin/java $JAVA_OPTS -jar /app/app.jar\n" +
      "\n" +
      "# G1GC 튜닝\n" +
      "# - Xms=Xmx: Heap 크기 고정 (GC 오버헤드 감소)\n" +
      "# - MaxGCPauseMillis=200: GC Pause 목표 200ms\n" +
      "```\n\n" +
      "**Solution 2: Swap 활성화 (4GB)**\n\n" +
      "```bash\n" +
      "# Swap 파일 생성\n" +
      "sudo fallocate -l 4G /swapfile\n" +
      "sudo chmod 600 /swapfile\n" +
      "sudo mkswap /swapfile\n" +
      "sudo swapon /swapfile\n" +
      "\n" +
      "# /etc/fstab 영구 설정\n" +
      "echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab\n" +
      "\n" +
      "# Swappiness 조정 (기본 60 → 10)\n" +
      "# 10 = Swap을 최후의 수단으로만 사용\n" +
      "sudo sysctl vm.swappiness=10\n" +
      "echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf\n" +
      "```\n\n" +
      "**Solution 3: Memory Cgroup 제한**\n\n" +
      "```bash\n" +
      "# systemd unit에서 메모리 제한\n" +
      "[Service]\n" +
      "MemoryLimit=13G  # 13GB로 제한 (16GB 서버에서)\n" +
      "MemoryAccounting=yes\n" +
      "OOMPolicy=continue  # OOM 시에도 재시작하지 않음\n" +
      "```\n\n" +
      "**결과:**\n" +
      "- OOM Kill: 0회 (지난 6개월)\n" +
      "- 메모리 여유: 3-4GB (버퍼)\n\n" +
      "**Challenge 3: Disk I/O Bottleneck**\n\n" +
      "**Problem: IOPS 한계**\n\n" +
      "```bash\n" +
      "# iostat -x 1 (1초마다 출력)\n" +
      "Device            r/s     w/s     rkB/s     wkB/s   await  %util\n" +
      "xvda            500.0   200.0   10000.0    4000.0  120.0   98.5  ❌ 병목\n" +
      "\n" +
      "문제:\n" +
      "- EBS gp2 (기본): 3 IOPS/GB baseline\n" +
      "- 100GB 볼륨: 300 IOPS (부족)\n" +
      "- await 120ms (매우 느림, 목표 <10ms)\n" +
      "```\n\n" +
      "**Solution: EBS gp3 전환 + IOPS 증설**\n\n" +
      "```bash\n" +
      "# 1. EBS 볼륨 타입 변경 (gp2 → gp3)\n" +
      "aws ec2 modify-volume \\\n" +
      "  --volume-id vol-1234567890abcdef0 \\\n" +
      "  --volume-type gp3 \\\n" +
      "  --iops 5000 \\\n" +
      "  --throughput 250\n" +
      "\n" +
      "# 2. 변경 완료 확인\n" +
      "aws ec2 describe-volumes-modifications \\\n" +
      "  --volume-id vol-1234567890abcdef0\n" +
      "\n" +
      "# 결과:\n" +
      "# Device            r/s     w/s     rkB/s     wkB/s   await  %util\n" +
      "# xvda            500.0   200.0   10000.0    4000.0    5.0   45.0  ✅ 개선\n" +
      "```\n\n" +
      "**비용 비교:**\n" +
      "```\n" +
      "gp2 (100GB): $10/월\n" +
      "gp3 (100GB, 5000 IOPS): $10 + $2 = $12/월 (20% 증가)\n" +
      "\n" +
      "성능 개선:\n" +
      "- IOPS: 300 → 5000 (16배 ↑)\n" +
      "- await: 120ms → 5ms (24배 ↑)\n" +
      "```\n\n" +
      "**Challenge 4: Network Congestion (1Gbps 제한)**\n\n" +
      "**Problem: 대용량 로그 전송 시 타임아웃**\n\n" +
      "```bash\n" +
      "# iftop (실시간 네트워크 모니터링)\n" +
      "$ sudo iftop -i eth0\n" +
      "\n" +
      "10.0.1.123 => 10.0.2.234  850Mbps  ❌ 거의 1Gbps 한계\n" +
      "10.0.1.123 => 10.0.2.235  100Mbps\n" +
      "\n" +
      "문제:\n" +
      "- EC2 t3.xlarge: 최대 5Gbps 지원\n" +
      "- 하지만 단일 TCP 연결: 1Gbps 제한\n" +
      "- 대용량 파일 (10GB) 전송 시 타임아웃\n" +
      "```\n\n" +
      "**Solution: 병렬 전송 + 압축**\n\n" +
      "```bash\n" +
      "# 1. 파일 분할 후 병렬 전송\n" +
      "split -b 1G large_file.log large_file.part\n" +
      "\n" +
      "# 2. GNU Parallel로 병렬 업로드\n" +
      "ls large_file.part* | parallel -j 4 'aws s3 cp {} s3://bucket/'\n" +
      "\n" +
      "# 3. 압축 (gzip 대신 pigz 사용, 병렬 압축)\n" +
      "pigz -p 8 large_file.log  # 8 cores\n" +
      "# 압축률: 10GB → 1GB (90% 절감)\n" +
      "# 압축 시간: 60초 → 10초 (6배 ↑, gzip 대비)\n" +
      "```\n\n" +
      "**네트워크 튜닝 (sysctl):**\n\n" +
      "```bash\n" +
      "# /etc/sysctl.conf\n" +
      "# TCP 버퍼 크기 증가 (기본 4MB → 32MB)\n" +
      "net.core.rmem_max = 33554432\n" +
      "net.core.wmem_max = 33554432\n" +
      "net.ipv4.tcp_rmem = 4096 87380 33554432\n" +
      "net.ipv4.tcp_wmem = 4096 65536 33554432\n" +
      "\n" +
      "# TCP 연결 재사용\n" +
      "net.ipv4.tcp_tw_reuse = 1\n" +
      "\n" +
      "# 적용\n" +
      "sudo sysctl -p\n" +
      "```\n\n" +
      "**결과:**\n" +
      "- 전송 시간: 120초 → 15초 (8배 ↑)\n" +
      "- 네트워크 utilization: 85% → 40% (여유)\n\n" +
      "**Challenge 5: 100대 서버 Synthetic Monitoring**\n\n" +
      "**Requirement: 모든 서버 Health Check (5분마다)**\n\n" +
      "**Solution: Go로 경량 Health Checker 구현**\n\n" +
      "```go\n" +
      "// healthcheck.go\n" +
      "package main\n" +
      "\n" +
      "import (\n" +
      '    "context"\n' +
      '    "fmt"\n' +
      '    "net/http"\n' +
      '    "sync"\n' +
      '    "time"\n' +
      '    "github.com/prometheus/client_golang/prometheus"\n' +
      '    "github.com/prometheus/client_golang/prometheus/promhttp"\n' +
      ")\n" +
      "\n" +
      "var (\n" +
      "    healthGauge = prometheus.NewGaugeVec(\n" +
      "        prometheus.GaugeOpts{\n" +
      '            Name: "server_health_status",\n' +
      '            Help: "Server health status (1=healthy, 0=unhealthy)",\n' +
      "        },\n" +
      '        []string{"server", "type"},\n' +
      "    )\n" +
      "    \n" +
      "    latencyHistogram = prometheus.NewHistogramVec(\n" +
      "        prometheus.HistogramOpts{\n" +
      '            Name: "server_health_check_duration_seconds",\n' +
      '            Help: "Health check latency",\n' +
      "            Buckets: prometheus.DefBuckets,\n" +
      "        },\n" +
      '        []string{"server", "type"},\n' +
      "    )\n" +
      ")\n" +
      "\n" +
      "func init() {\n" +
      "    prometheus.MustRegister(healthGauge)\n" +
      "    prometheus.MustRegister(latencyHistogram)\n" +
      "}\n" +
      "\n" +
      "type Server struct {\n" +
      "    Name string\n" +
      "    URL  string\n" +
      "    Type string\n" +
      "}\n" +
      "\n" +
      "func checkHealth(server Server) {\n" +
      "    start := time.Now()\n" +
      "    \n" +
      "    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\n" +
      "    defer cancel()\n" +
      "    \n" +
      '    req, _ := http.NewRequestWithContext(ctx, "GET", server.URL, nil)\n' +
      "    resp, err := http.DefaultClient.Do(req)\n" +
      "    \n" +
      "    duration := time.Since(start).Seconds()\n" +
      "    latencyHistogram.WithLabelValues(server.Name, server.Type).Observe(duration)\n" +
      "    \n" +
      "    if err != nil || resp.StatusCode != 200 {\n" +
      "        healthGauge.WithLabelValues(server.Name, server.Type).Set(0)\n" +
      '        fmt.Printf("[FAIL] %s: %v\\n", server.Name, err)\n' +
      "    } else {\n" +
      "        healthGauge.WithLabelValues(server.Name, server.Type).Set(1)\n" +
      '        fmt.Printf("[OK] %s (%.2fs)\\n", server.Name, duration)\n' +
      "    }\n" +
      "}\n" +
      "\n" +
      "func main() {\n" +
      "    servers := []Server{\n" +
      '        {"web-01", "http://10.0.1.10/health", "web"},\n' +
      '        {"web-02", "http://10.0.1.11/health", "web"},\n' +
      "        // ... 120개 서버\n" +
      "    }\n" +
      "    \n" +
      "    ticker := time.NewTicker(5 * time.Minute)\n" +
      "    defer ticker.Stop()\n" +
      "    \n" +
      "    // Prometheus Metrics 서버\n" +
      '    http.Handle("/metrics", promhttp.Handler())\n' +
      '    go http.ListenAndServe(":9090", nil)\n' +
      "    \n" +
      "    for {\n" +
      "        var wg sync.WaitGroup\n" +
      "        for _, server := range servers {\n" +
      "            wg.Add(1)\n" +
      "            go func(s Server) {\n" +
      "                defer wg.Done()\n" +
      "                checkHealth(s)\n" +
      "            }(server)\n" +
      "        }\n" +
      "        wg.Wait()\n" +
      "        \n" +
      "        <-ticker.C\n" +
      "    }\n" +
      "}\n" +
      "```\n\n" +
      "**Prometheus Alert:**\n\n" +
      "```yaml\n" +
      "# alert.rules\n" +
      "groups:\n" +
      "- name: server-health\n" +
      "  rules:\n" +
      "  - alert: ServerDown\n" +
      "    expr: server_health_status == 0\n" +
      "    for: 5m\n" +
      "    annotations:\n" +
      '      summary: "Server {{ $labels.server }} is down"\n' +
      "```\n\n" +
      "**결과:**\n" +
      "- Health Check 주기: 5분\n" +
      "- 메모리 사용량: 20MB (Go binary)\n" +
      "- 100대 서버 체크 시간: 3초 (병렬)\n\n" +
      "**핵심 최적화:**\n\n" +
      "1. **CPU Throttling**: T3 Unlimited + Auto Scaling\n" +
      "2. **OOM Killer**: JVM Heap 조정 + Swap 활성화\n" +
      "3. **Disk I/O**: EBS gp3 + 5000 IOPS\n" +
      "4. **Network**: 병렬 전송 + pigz 압축\n" +
      "5. **Monitoring**: Go Health Checker (20MB, 3초/100서버)\n\n" +
      "**토스 적용 포인트:**\n\n" +
      "- 대규모 서버 운영 경험 (100대+)\n" +
      "- 실시간 모니터링 + 장애 조기 감지\n" +
      "- 비용 효율적 최적화 (gp3, Swap)",
  },

  // Generalist 철학 (T-shaped Engineer)
  {
    id: 70,
    category1: "Infrastructure",
    category2: "Philosophy",
    question:
      "Platform Lead Engineer로서 FE/BE/Infra를 모두 다룬 경험이 어떻게 도움이 되었나요?",
    answer:
      "**Background: Full-Stack Observability 구축 경험**\n\n" +
      "**T-shaped Engineer로서 역할:**\n\n" +
      "```\n" +
      "├── 수평 축 (Breadth): 폭넓은 기술 이해\n" +
      "│   ├─ Frontend: React, Next.js, Vue.js (기본 가능)\n" +
      "│   ├─ Backend: Go, Python, Java (실무 가능)\n" +
      "│   └─ Infrastructure: Kubernetes, AWS, Observability (전문가)\n" +
      "│\n" +
      "└── 수직 축 (Depth): Observability 전문성\n" +
      "    ├─ OpenTelemetry (Contributor)\n" +
      "    ├─ Distributed Tracing Architecture\n" +
      "    └─ Full-Stack Instrumentation\n" +
      "```\n\n" +
      "**Case 1: Frontend 성능 문제 (React 렌더링 병목)**\n\n" +
      "**문제 상황:**\n\n" +
      "```\n" +
      '개발팀: "페이지 로딩이 5초 걸려요. 백엔드 API가 느린 것 같아요."\n' +
      "\n" +
      'Backend 팀: "API는 200ms 이내입니다. 문제 없어요."\n' +
      "```\n\n" +
      "**Infrastructure 관점만으로는 해결 불가:**\n" +
      "```promql\n" +
      "# Prometheus 쿼리\n" +
      "histogram_quantile(0.99, \n" +
      "  rate(http_request_duration_seconds_bucket[5m])\n" +
      ")\n" +
      "# 결과: P99 = 250ms ✅ (정상)\n" +
      "```\n\n" +
      "**Frontend 지식 활용 (React DevTools Profiler):**\n\n" +
      "```javascript\n" +
      "// 문제 코드: 불필요한 Re-render\n" +
      "function ProductList({ products }) {\n" +
      "  const [filter, setFilter] = useState('');\n" +
      "  \n" +
      "  // ❌ 문제: filter 변경 시 10,000개 Product 모두 re-render\n" +
      "  const filteredProducts = products.filter(p => \n" +
      "    p.name.includes(filter)\n" +
      "  );\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input onChange={e => setFilter(e.target.value)} />\n" +
      "      {filteredProducts.map(p => <Product key={p.id} {...p} />)}\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**React DevTools Profiler 분석:**\n" +
      "```\n" +
      "Commit: Filter Input Changed\n" +
      "  ProductList: 4500ms ❌\n" +
      "    Product (× 10,000): 0.45ms each\n" +
      "```\n\n" +
      "**해결책: useMemo + Virtualization**\n\n" +
      "```javascript\n" +
      "import { useMemo } from 'react';\n" +
      "import { FixedSizeList } from 'react-window';\n" +
      "\n" +
      "function ProductList({ products }) {\n" +
      "  const [filter, setFilter] = useState('');\n" +
      "  \n" +
      "  // ✅ 1. useMemo로 필터링 최적화\n" +
      "  const filteredProducts = useMemo(() => {\n" +
      "    return products.filter(p => p.name.includes(filter));\n" +
      "  }, [products, filter]);\n" +
      "  \n" +
      "  // ✅ 2. react-window로 가상화 (화면에 보이는 10개만 렌더링)\n" +
      "  const Row = ({ index, style }) => (\n" +
      "    <div style={style}>\n" +
      "      <Product {...filteredProducts[index]} />\n" +
      "    </div>\n" +
      "  );\n" +
      "  \n" +
      "  return (\n" +
      "    <div>\n" +
      "      <input onChange={e => setFilter(e.target.value)} />\n" +
      "      <FixedSizeList\n" +
      "        height={600}\n" +
      "        itemCount={filteredProducts.length}\n" +
      "        itemSize={50}\n" +
      '        width="100%"\n' +
      "      >\n" +
      "        {Row}\n" +
      "      </FixedSizeList>\n" +
      "    </div>\n" +
      "  );\n" +
      "}\n" +
      "```\n\n" +
      "**Observability 통합 (OpenTelemetry):**\n\n" +
      "```javascript\n" +
      "import { trace } from '@opentelemetry/api';\n" +
      "\n" +
      "const tracer = trace.getTracer('frontend-app');\n" +
      "\n" +
      "function ProductList({ products }) {\n" +
      "  const [filter, setFilter] = useState('');\n" +
      "  \n" +
      "  const filteredProducts = useMemo(() => {\n" +
      "    // 필터링 성능 측정\n" +
      "    const span = tracer.startSpan('filter_products');\n" +
      "    span.setAttribute('product.count', products.length);\n" +
      "    span.setAttribute('filter.query', filter);\n" +
      "    \n" +
      "    const result = products.filter(p => p.name.includes(filter));\n" +
      "    \n" +
      "    span.setAttribute('result.count', result.length);\n" +
      "    span.end();\n" +
      "    \n" +
      "    return result;\n" +
      "  }, [products, filter]);\n" +
      "  \n" +
      "  // ...\n" +
      "}\n" +
      "```\n\n" +
      "**Grafana 대시보드 (FE + BE 통합):**\n\n" +
      "```\n" +
      "User Request (trace_id=abc123)\n" +
      "├─ Frontend: Page Load (5000ms)\n" +
      "│  ├─ React Render: 4500ms ❌ (병목)\n" +
      "│  │  └─ filter_products: 4200ms\n" +
      "│  └─ API Call: 200ms ✅\n" +
      "│     └─ Backend: GET /products (180ms)\n" +
      "│        └─ Database: SELECT (120ms)\n" +
      "```\n\n" +
      "**결과:**\n" +
      "- 페이지 로딩: 5000ms → 300ms (94% 개선)\n" +
      "- React Render: 4500ms → 50ms (99% 개선)\n" +
      "- 문제 진단: 3일 → 1시간 (Frontend 지식 덕분)\n\n" +
      "**Case 2: Backend API 병목 (N+1 Query)**\n\n" +
      "**문제 상황:**\n\n" +
      "```\n" +
      '개발팀: "상품 목록 API가 10초 걸려요. DB가 느린 것 같아요."\n' +
      "\n" +
      'DBA: "DB는 정상입니다. 쿼리는 10ms 이내입니다."\n' +
      "```\n\n" +
      "**Infrastructure 관점 (OpenTelemetry Trace):**\n\n" +
      "```\n" +
      "Trace ID: xyz789\n" +
      "├─ Backend: GET /products (10,500ms) ❌\n" +
      "│  ├─ Database: SELECT * FROM products (10ms) ✅\n" +
      "│  └─ Database: SELECT * FROM images WHERE product_id=? (10ms) × 1000회 ❌\n" +
      "```\n\n" +
      "**Backend 지식 활용 (N+1 Query 식별):**\n\n" +
      "```python\n" +
      "# 문제 코드: N+1 Query (Django ORM)\n" +
      "def get_products(request):\n" +
      "    products = Product.objects.all()  # 1 query\n" +
      "    \n" +
      "    data = []\n" +
      "    for product in products:  # 1000 products\n" +
      "        images = product.images.all()  # ❌ N queries (1000회)\n" +
      "        data.append({\n" +
      "            'id': product.id,\n" +
      "            'name': product.name,\n" +
      "            'images': [img.url for img in images]\n" +
      "        })\n" +
      "    \n" +
      "    return JsonResponse({'products': data})\n" +
      "```\n\n" +
      "**해결책: prefetch_related (1+1 Query)**\n\n" +
      "```python\n" +
      "def get_products(request):\n" +
      "    # ✅ prefetch_related: 2 queries only\n" +
      "    products = Product.objects.prefetch_related('images').all()\n" +
      "    \n" +
      "    data = []\n" +
      "    for product in products:\n" +
      "        images = product.images.all()  # ✅ 캐시에서 읽음\n" +
      "        data.append({\n" +
      "            'id': product.id,\n" +
      "            'name': product.name,\n" +
      "            'images': [img.url for img in images]\n" +
      "        })\n" +
      "    \n" +
      "    return JsonResponse({'products': data})\n" +
      "```\n\n" +
      "**SQL 쿼리 변화:**\n\n" +
      "```sql\n" +
      "-- Before: N+1 Query (1001 queries)\n" +
      "SELECT * FROM products;  -- 1 query\n" +
      "SELECT * FROM images WHERE product_id = 1;  -- query 2\n" +
      "SELECT * FROM images WHERE product_id = 2;  -- query 3\n" +
      "-- ... (1000 queries)\n" +
      "\n" +
      "-- After: 1+1 Query (2 queries)\n" +
      "SELECT * FROM products;  -- 1 query\n" +
      "SELECT * FROM images WHERE product_id IN (1, 2, ..., 1000);  -- 1 query\n" +
      "```\n\n" +
      "**Observability 통합 (Database Span):**\n\n" +
      "```python\n" +
      "from opentelemetry import trace\n" +
      "from django.db import connection\n" +
      "\n" +
      "tracer = trace.get_tracer(__name__)\n" +
      "\n" +
      "def get_products(request):\n" +
      '    with tracer.start_as_current_span("get_products") as span:\n' +
      "        products = Product.objects.prefetch_related('images').all()\n" +
      "        \n" +
      "        # DB 쿼리 수 기록\n" +
      "        query_count = len(connection.queries)\n" +
      '        span.set_attribute("db.query.count", query_count)\n' +
      '        span.set_attribute("product.count", len(products))\n' +
      "        \n" +
      "        # ...\n" +
      "```\n\n" +
      "**Grafana 대시보드 (Before/After):**\n\n" +
      "| 지표 | Before | After | 개선 |\n" +
      "|------|--------|-------|------|\n" +
      "| API 응답 시간 | 10,500ms | 50ms | 99.5% ↓ |\n" +
      "| DB 쿼리 수 | 1001 | 2 | 99.8% ↓ |\n" +
      "| DB 부하 (QPS) | 10,000 | 20 | 99.8% ↓ |\n\n" +
      "**Case 3: Infrastructure 장애 (Kafka Consumer Lag)**\n\n" +
      "**문제 상황:**\n\n" +
      "```\n" +
      '개발팀: "결제 이벤트가 처리되지 않아요. 30분 지연되고 있습니다."\n' +
      "```\n\n" +
      "**Infrastructure 전문성 활용:**\n\n" +
      "**1. Kafka Consumer Lag 확인:**\n" +
      "```bash\n" +
      "$ kafka-consumer-groups.sh \\\n" +
      "    --bootstrap-server localhost:9092 \\\n" +
      "    --group payment-service \\\n" +
      "    --describe\n" +
      "\n" +
      "GROUP           TOPIC      PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG\n" +
      "payment-service payments   0          1000            50000           49000 ❌\n" +
      "payment-service payments   1          2000            51000           49000 ❌\n" +
      "payment-service payments   2          3000            52000           49000 ❌\n" +
      "\n" +
      "총 Lag: 147,000 messages (30분치)\n" +
      "```\n\n" +
      "**2. Consumer Pod 상태 확인:**\n" +
      "```bash\n" +
      "$ kubectl get pods -n payment\n" +
      "NAME                 READY   STATUS    RESTARTS   AGE\n" +
      "payment-consumer-0   1/1     Running   0          2h\n" +
      "payment-consumer-1   0/1     CrashLoopBackOff   10   2h ❌\n" +
      "payment-consumer-2   1/1     Running   0          2h\n" +
      "\n" +
      "$ kubectl logs payment-consumer-1\n" +
      "OOMKilled: Container exceeded memory limit (2Gi)\n" +
      "```\n\n" +
      "**3. 메모리 프로파일링 (Backend 지식):**\n" +
      "```python\n" +
      "# payment-consumer/consumer.py\n" +
      "import memory_profiler\n" +
      "\n" +
      "@memory_profiler.profile\n" +
      "def process_payment(message):\n" +
      "    payment = json.loads(message.value)  # 100KB\n" +
      "    \n" +
      "    # ❌ 문제: 모든 결제 내역을 메모리에 로드\n" +
      "    history = PaymentHistory.objects.filter(\n" +
      "        user_id=payment['user_id']\n" +
      "    ).all()  # 10,000 rows × 10KB = 100MB per user\n" +
      "    \n" +
      "    # 30분 동안 147,000 messages 처리\n" +
      "    # 메모리: 147,000 × 100MB = 14.7TB ❌ (불가능)\n" +
      "```\n\n" +
      "**4. 해결책: Streaming Query + Pagination:**\n" +
      "```python\n" +
      "def process_payment(message):\n" +
      "    payment = json.loads(message.value)\n" +
      "    \n" +
      "    # ✅ 최근 10건만 조회\n" +
      "    history = PaymentHistory.objects.filter(\n" +
      "        user_id=payment['user_id']\n" +
      "    ).order_by('-created_at')[:10]  # 10KB\n" +
      "    \n" +
      "    # 메모리: 10KB per message\n" +
      "```\n\n" +
      "**5. Kubernetes HPA 설정:**\n" +
      "```yaml\n" +
      "apiVersion: autoscaling/v2\n" +
      "kind: HorizontalPodAutoscaler\n" +
      "metadata:\n" +
      "  name: payment-consumer-hpa\n" +
      "spec:\n" +
      "  scaleTargetRef:\n" +
      "    apiVersion: apps/v1\n" +
      "    kind: Deployment\n" +
      "    name: payment-consumer\n" +
      "  minReplicas: 3\n" +
      "  maxReplicas: 20\n" +
      "  metrics:\n" +
      "  - type: External\n" +
      "    external:\n" +
      "      metric:\n" +
      "        name: kafka_consumer_lag\n" +
      "      target:\n" +
      "        type: AverageValue\n" +
      '        averageValue: "10000"  # Lag > 10K면 Scale Out\n' +
      "```\n\n" +
      "**결과:**\n" +
      "- Consumer Lag: 147,000 → 0 (30분 내 처리)\n" +
      "- OOMKilled: 0회\n" +
      "- Auto Scaling: 3 pods → 15 pods (피크 시)\n\n" +
      "**Generalist의 가치:**\n\n" +
      "**1. 빠른 문제 진단**\n" +
      "```\n" +
      "전문가만 있는 팀:\n" +
      '  Frontend 팀: "백엔드가 느려요" (3일)\n' +
      "    ↓ 핑퐁\n" +
      '  Backend 팀: "DB가 느려요" (3일)\n' +
      "    ↓ 핑퐁\n" +
      '  DBA 팀: "쿼리는 정상이에요" (3일)\n' +
      "  총 9일 소요\n" +
      "\n" +
      "Generalist:\n" +
      "  OpenTelemetry Trace로 전체 흐름 파악 (1시간)\n" +
      "  React Profiler로 Frontend 병목 식별 (1시간)\n" +
      "  N+1 Query 직접 수정 (1시간)\n" +
      "  총 3시간 소요 (72배 빠름)\n" +
      "```\n\n" +
      "**2. End-to-End Observability 설계**\n" +
      "```\n" +
      "단일 영역 전문가:\n" +
      "  - Frontend: React DevTools만 사용\n" +
      "  - Backend: APM만 사용\n" +
      "  - Infrastructure: Prometheus만 사용\n" +
      "  → 영역 간 연결 불가\n" +
      "\n" +
      "Generalist:\n" +
      "  - OpenTelemetry로 FE/BE/Infra 통합\n" +
      "  - Single Trace ID로 전체 흐름 추적\n" +
      "  - Grafana 대시보드 하나로 모든 영역 시각화\n" +
      "```\n\n" +
      "**3. 개발팀과 원활한 협업**\n" +
      "```\n" +
      "Infrastructure만 아는 엔지니어:\n" +
      '  "Kubernetes Pod이 CrashLoopBackOff 상태입니다."\n' +
      '  → 개발팀: "무슨 말인지 모르겠어요."\n' +
      "\n" +
      "Generalist:\n" +
      '  "Django ORM의 N+1 Query 때문에 메모리 부족입니다.\n' +
      '   prefetch_related를 사용하면 해결됩니다."\n' +
      '  → 개발팀: "바로 이해했습니다. 수정하겠습니다."\n' +
      "```\n\n" +
      "**T-shaped Engineer의 장점:**\n\n" +
      "1. **Cross-functional Problem Solving**: FE/BE/Infra 경계 넘어 해결\n" +
      "2. **Faster MTTI**: 전체 Stack 이해로 빠른 Root Cause 분석\n" +
      "3. **Better Architecture**: End-to-End 관점으로 최적 설계\n" +
      "4. **Effective Communication**: 개발팀 언어로 소통 가능\n" +
      "5. **OpenTelemetry Depth**: Observability 전문가로서 깊은 통찰\n\n" +
      "**토스 적용 포인트:**\n\n" +
      "토스의 복잡한 금융 시스템에서 유용:\n" +
      "- App (Flutter) → API (Spring) → Kafka → Batch → DB\n" +
      "- 전체 흐름 이해로 빠른 장애 대응\n" +
      "- Observability Platform 구축 경험 직접 활용",
  },

  // 역질문 1: AZ/Region 간 네트워크 Observability
  {
    id: 71,
    category1: "Infrastructure",
    category2: "Reverse Question",
    question:
      "[역질문] 토스의 Multi-AZ/Multi-Region 환경에서 네트워크 Observability는 어떻게 구현되어 있나요?",
    answer:
      "**질문 배경:**\n\n" +
      "제가 운영한 시스템은 Single-Region (ap-northeast-2, Seoul) 환경이었습니다. Multi-AZ는 경험했지만, Multi-Region은 경험하지 못했습니다.\n\n" +
      "**현재 경험 (Multi-AZ):**\n\n" +
      "```\n" +
      "Region: ap-northeast-2 (Seoul)\n" +
      "├─ AZ-a: Web Servers (10대)\n" +
      "├─ AZ-b: API Servers (10대)\n" +
      "└─ AZ-c: DB Servers (5대)\n" +
      "\n" +
      "Observability:\n" +
      "- OpenTelemetry: service.availability_zone attribute\n" +
      "- Prometheus: instance label에 AZ 포함\n" +
      "- Grafana: AZ별 Latency 시각화\n" +
      "```\n\n" +
      "**Multi-Region 궁금증:**\n\n" +
      "**1. Cross-Region Latency 측정**\n\n" +
      "```\n" +
      "토스는 금융 규제상 한국 (Seoul) + 재해복구용 두 번째 Region이 있을 것 같은데요.\n" +
      "\n" +
      "예상 구조:\n" +
      "- Primary: ap-northeast-2 (Seoul)\n" +
      "- DR: ap-northeast-3 (Osaka) or us-west-2 (Oregon)\n" +
      "\n" +
      "질문:\n" +
      "1. Cross-Region 트래픽을 어떻게 추적하나요?\n" +
      "   - OpenTelemetry Span에 region attribute 포함?\n" +
      "   - Trace가 Region 경계를 넘을 때 성능 저하는?\n" +
      "\n" +
      "2. Region 간 Latency를 어떻게 모니터링하나요?\n" +
      "   - CloudWatch Metrics?\n" +
      "   - Synthetic Monitoring (Health Check)?\n" +
      "   - VPC Peering/Transit Gateway 대역폭 모니터링?\n" +
      "```\n\n" +
      "**2. Data Replication Lag 모니터링**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. Database Replication (Primary → DR):\n" +
      "   - Aurora Global Database?\n" +
      "   - Replication Lag은 어떻게 측정? (초 단위?)\n" +
      "   - SLA 목표는? (예: Lag < 1초)\n" +
      "\n" +
      "2. Kafka Cross-Region Replication:\n" +
      "   - MirrorMaker2 사용?\n" +
      "   - Consumer Lag을 Region별로 추적?\n" +
      "   - 결제 이벤트가 DR로 복제되는 시간은?\n" +
      "```\n\n" +
      "**3. Failover 시나리오**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. Primary Region 장애 시:\n" +
      "   - Route53 Health Check로 자동 Failover?\n" +
      "   - Failover 시간 목표 (RTO)는? (예: 5분)\n" +
      "   - 데이터 손실 허용 (RPO)은? (예: 1분)\n" +
      "\n" +
      "2. Observability Platform도 Multi-Region?\n" +
      "   - Grafana/Prometheus가 DR에도 있나요?\n" +
      "   - Primary 장애 시 DR에서 모니터링 계속 가능?\n" +
      "```\n\n" +
      "**4. Cost Optimization**\n\n" +
      "```\n" +
      "질문:\n" +
      "Multi-Region 운영 비용은 어떻게 관리하나요?\n" +
      "- Cross-Region Data Transfer: $0.02/GB (비쌈)\n" +
      "- DR Region은 Hot Standby? Cold Standby?\n" +
      "- 월 예산은 Single-Region 대비 몇 배?\n" +
      "```\n\n" +
      "**배우고 싶은 점:**\n\n" +
      "1. **Multi-Region Observability Architecture**: 글로벌 스케일 모니터링 설계\n" +
      "2. **금융 규제 준수**: DR 의무사항과 구현 방법\n" +
      "3. **Failover Automation**: Route53 + Lambda를 활용한 자동화\n" +
      "4. **Cost vs Reliability 균형**: 비용 대비 가용성 최적화\n\n" +
      "**토스에서 기여할 수 있는 부분:**\n\n" +
      "- Single-Region OpenTelemetry 구축 경험 → Multi-Region으로 확장\n" +
      "- Grafana 대시보드 설계 → Region 간 비교 시각화\n" +
      "- Cost Optimization 경험 → Cross-Region Transfer 최소화",
  },

  // 역질문 2: CI/CD Pipeline
  {
    id: 72,
    category1: "Infrastructure",
    category2: "Reverse Question",
    question:
      "[역질문] 토스의 CI/CD Pipeline은 어떤 도구를 사용하고, 어떤 자동화가 구현되어 있나요?",
    answer:
      "**질문 배경:**\n\n" +
      "저는 GitHub Actions + AWS CloudFormation으로 CI/CD를 구축했습니다. 하지만 토스처럼 대규모 조직에서는 어떤 도구와 프로세스를 사용하는지 궁금합니다.\n\n" +
      "**현재 경험 (GitHub Actions):**\n\n" +
      "```yaml\n" +
      "# .github/workflows/deploy.yml\n" +
      "name: Deploy to Production\n" +
      "\n" +
      "on:\n" +
      "  push:\n" +
      "    branches: [main]\n" +
      "\n" +
      "jobs:\n" +
      "  build:\n" +
      "    runs-on: ubuntu-latest\n" +
      "    steps:\n" +
      "      - uses: actions/checkout@v3\n" +
      "      \n" +
      "      - name: Build Docker Image\n" +
      "        run: docker build -t my-app:${{ github.sha }} .\n" +
      "      \n" +
      "      - name: Push to ECR\n" +
      "        run: |\n" +
      "          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REPO\n" +
      "          docker push $ECR_REPO/my-app:${{ github.sha }}\n" +
      "      \n" +
      "      - name: Deploy to ECS\n" +
      "        run: |\n" +
      "          aws ecs update-service --cluster prod --service my-app --force-new-deployment\n" +
      "```\n\n" +
      "**성과:**\n" +
      "- 배포 시간: 2시간 → 12분 (90% 단축)\n" +
      "- Docker Multi-Stage Build: 이미지 크기 81% 감소\n" +
      "- Blue-Green Deployment: Zero-Downtime\n\n" +
      "**토스 CI/CD 궁금증:**\n\n" +
      "**1. 사용 도구**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. CI/CD 플랫폼:\n" +
      "   - GitHub Actions?\n" +
      "   - Jenkins?\n" +
      "   - ArgoCD (GitOps)?\n" +
      "   - 자체 개발 플랫폼?\n" +
      "\n" +
      "2. Container Orchestration:\n" +
      "   - Kubernetes?\n" +
      "   - ECS?\n" +
      "   - 둘 다 사용? (마이그레이션 중?)\n" +
      "\n" +
      "3. IaC (Infrastructure as Code):\n" +
      "   - Terraform?\n" +
      "   - CloudFormation?\n" +
      "   - Pulumi?\n" +
      "```\n\n" +
      "**2. 자동화 수준**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. 자동 테스트:\n" +
      "   - Unit Test 커버리지 목표는? (예: 80%)\n" +
      "   - Integration Test 자동화?\n" +
      "   - E2E Test (Selenium/Playwright)?\n" +
      "   - Load Test (k6/Locust) 자동 실행?\n" +
      "\n" +
      "2. 자동 롤백:\n" +
      "   - 장애 감지 기준은? (Error Rate > 5%?)\n" +
      "   - 롤백 자동화? (Circuit Breaker?)\n" +
      "   - Canary Deployment 비율은? (10% → 50% → 100%?)\n" +
      "\n" +
      "3. 자동 Approval:\n" +
      "   - Production 배포 시 수동 승인 필요?\n" +
      "   - Staging → Production 자동 프로모션?\n" +
      "   - 금융 규제상 변경 승인 프로세스는?\n" +
      "```\n\n" +
      "**3. Monorepo vs Polyrepo**\n\n" +
      "```\n" +
      "질문:\n" +
      "토스는 수십 개 마이크로서비스를 운영할 텐데요.\n" +
      "\n" +
      "1. Repository 구조:\n" +
      "   - Monorepo (하나의 거대 Repo)?\n" +
      "   - Polyrepo (서비스마다 독립 Repo)?\n" +
      "   - Hybrid (Core는 Monorepo, 부가 서비스는 Polyrepo)?\n" +
      "\n" +
      "2. Monorepo라면:\n" +
      "   - Nx/Turborepo 같은 빌드 도구 사용?\n" +
      "   - Affected Analysis (변경된 서비스만 빌드)?\n" +
      "   - 빌드 시간은? (전체 vs 증분)\n" +
      "\n" +
      "3. Polyrepo라면:\n" +
      "   - 공통 라이브러리 버전 관리는?\n" +
      "   - Dependency 업데이트 자동화 (Dependabot)?\n" +
      "```\n\n" +
      "**4. Security & Compliance**\n\n" +
      "```\n" +
      "질문:\n" +
      "금융 서비스라 보안이 중요할 텐데요.\n" +
      "\n" +
      "1. Image Scanning:\n" +
      "   - Trivy/Clair로 취약점 스캔?\n" +
      "   - Critical CVE 발견 시 배포 차단?\n" +
      "\n" +
      "2. Secret Management:\n" +
      "   - AWS Secrets Manager?\n" +
      "   - HashiCorp Vault?\n" +
      "   - Environment Variable 관리는?\n" +
      "\n" +
      "3. Audit Log:\n" +
      "   - 누가 언제 무엇을 배포했는지 추적?\n" +
      "   - Git Commit SHA → Production 배포 매핑?\n" +
      "   - 금융감독원 감사 대응 자료 자동 생성?\n" +
      "```\n\n" +
      "**5. 배포 빈도**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. 배포 주기:\n" +
      "   - 하루 몇 회 배포? (DORA Metrics 기준)\n" +
      "   - Feature Flag로 배포와 릴리스 분리?\n" +
      "\n" +
      "2. Hotfix 프로세스:\n" +
      "   - 긴급 배포 소요 시간 목표? (예: 30분)\n" +
      "   - Production에서 직접 Hotfix? 아니면 Staging 경유?\n" +
      "\n" +
      "3. Deployment Window:\n" +
      "   - 업무시간 배포 금지?\n" +
      "   - 결제 서비스는 새벽에만?\n" +
      "```\n\n" +
      "**배우고 싶은 점:**\n\n" +
      "1. **GitOps (ArgoCD)**: 선언적 배포와 Self-Healing\n" +
      "2. **Canary Deployment**: 점진적 배포 자동화\n" +
      "3. **금융 규제 준수**: 변경 관리 프로세스\n" +
      "4. **대규모 Monorepo**: 수백 개 서비스 관리 노하우\n\n" +
      "**토스에서 기여할 수 있는 부분:**\n\n" +
      "- GitHub Actions 90% 배포 시간 단축 경험\n" +
      "- Docker Multi-Stage Build 최적화\n" +
      "- Blue-Green Deployment 구현\n" +
      "- CloudFormation IaC 경험 → Terraform으로 전환 가능",
  },

  // 역질문 3: Kubernetes Namespace 리소스 관리
  {
    id: 73,
    category1: "Infrastructure",
    category2: "Reverse Question",
    question:
      "[역질문] 토스의 Kubernetes 환경에서 Namespace별 리소스(CPU/메모리) 할당은 어떻게 관리하나요?",
    answer:
      "**질문 배경:**\n\n" +
      "저는 AWS ECS를 주로 사용했고, Kubernetes는 CKA 자격증 수준의 이론 지식과 작은 프로젝트 경험만 있습니다. 토스는 대규모 Kubernetes 클러스터를 운영할 텐데, 멀티 테넌시 환경에서 리소스 관리가 궁금합니다.\n\n" +
      "**현재 경험 (AWS ECS):**\n\n" +
      "```yaml\n" +
      "# ECS Task Definition\n" +
      "{\n" +
      '  "family": "backend-api",\n' +
      '  "containerDefinitions": [\n' +
      "    {\n" +
      '      "name": "app",\n' +
      '      "image": "my-app:latest",\n' +
      '      "cpu": 1024,  # 1 vCPU\n' +
      '      "memory": 2048,  # 2GB\n' +
      '      "memoryReservation": 1536  # Soft limit 1.5GB\n' +
      "    }\n" +
      "  ]\n" +
      "}\n" +
      "\n" +
      "특징:\n" +
      "- Task 단위 리소스 할당 (간단)\n" +
      "- Cluster 전체 리소스는 Auto Scaling Group이 관리\n" +
      "- Namespace 개념 없음 (단일 테넌트)\n" +
      "```\n\n" +
      "**Kubernetes 이론 지식 (CKA):**\n\n" +
      "```yaml\n" +
      "# ResourceQuota (Namespace 전체 제한)\n" +
      "apiVersion: v1\n" +
      "kind: ResourceQuota\n" +
      "metadata:\n" +
      "  name: team-a-quota\n" +
      "  namespace: team-a\n" +
      "spec:\n" +
      "  hard:\n" +
      '    requests.cpu: "100"      # 100 vCPU\n' +
      '    requests.memory: "200Gi"\n' +
      '    limits.cpu: "200"        # Burst 허용\n' +
      '    limits.memory: "400Gi"\n' +
      '    pods: "100"              # Pod 개수 제한\n' +
      "\n" +
      "# LimitRange (개별 Pod 제한)\n" +
      "apiVersion: v1\n" +
      "kind: LimitRange\n" +
      "metadata:\n" +
      "  name: default-limits\n" +
      "  namespace: team-a\n" +
      "spec:\n" +
      "  limits:\n" +
      "  - max:\n" +
      '      cpu: "4"          # Pod 최대 4 vCPU\n' +
      '      memory: "8Gi"\n' +
      "    min:\n" +
      '      cpu: "100m"       # Pod 최소 0.1 vCPU\n' +
      '      memory: "128Mi"\n' +
      "    default:\n" +
      '      cpu: "1"          # 미지정 시 기본값\n' +
      '      memory: "1Gi"\n' +
      "    type: Container\n" +
      "```\n\n" +
      "**토스 Kubernetes 궁금증:**\n\n" +
      "**1. Namespace 설계**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. Namespace 분리 기준:\n" +
      "   - 팀별? (예: team-payment, team-lending)\n" +
      "   - 서비스별? (예: svc-toss-pay, svc-securities)\n" +
      "   - 환경별? (예: dev, staging, production)\n" +
      "   - 혼합? (예: team-payment-prod, team-payment-dev)\n" +
      "\n" +
      "2. Namespace 개수:\n" +
      "   - 토스 전체 Namespace는 몇 개?\n" +
      "   - Cluster는 하나? 아니면 여러 개?\n" +
      "   - (예: Cluster-A: Production, Cluster-B: Dev/Staging)\n" +
      "```\n\n" +
      "**2. ResourceQuota 정책**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. CPU/메모리 할당 기준:\n" +
      "   - 팀 규모에 비례? (10명 팀 = 50 vCPU?)\n" +
      "   - 트래픽 기반? (결제 팀 = 200 vCPU?)\n" +
      "   - 요청 기반? (팀이 신청하면 승인?)\n" +
      "\n" +
      "2. Quota 초과 시:\n" +
      "   - Pod이 Pending 상태로 대기?\n" +
      "   - 자동 Quota 증설?\n" +
      "   - 알림 발송 후 수동 조정?\n" +
      "\n" +
      "3. Cost Allocation:\n" +
      "   - Namespace별 비용 산출?\n" +
      "   - AWS Cost Explorer로 추적?\n" +
      "   - Kubecost 같은 도구 사용?\n" +
      "```\n\n" +
      "**3. QoS (Quality of Service) 클래스**\n\n" +
      "```yaml\n" +
      "# Kubernetes는 Pod를 3가지 QoS로 분류\n" +
      "\n" +
      "# 1. Guaranteed (최우선)\n" +
      "resources:\n" +
      "  requests:\n" +
      '    cpu: "2"\n' +
      '    memory: "4Gi"\n' +
      "  limits:\n" +
      '    cpu: "2"       # requests == limits\n' +
      '    memory: "4Gi"\n' +
      "\n" +
      "# 2. Burstable (중간)\n" +
      "resources:\n" +
      "  requests:\n" +
      '    cpu: "1"\n' +
      '    memory: "2Gi"\n' +
      "  limits:\n" +
      '    cpu: "4"       # limits > requests\n' +
      '    memory: "8Gi"\n' +
      "\n" +
      "# 3. BestEffort (최하위)\n" +
      "resources: {}  # 미지정\n" +
      "\n" +
      "질문:\n" +
      "1. 토스는 어떤 QoS 전략을 사용하나요?\n" +
      "   - 결제 서비스: Guaranteed (절대 OOMKilled 방지)\n" +
      "   - 배치 작업: Burstable (유연한 리소스)\n" +
      "   - 개발 환경: BestEffort (최소 리소스)\n" +
      "\n" +
      "2. OOMKilled 발생 빈도는?\n" +
      "   - 월 평균 몇 건?\n" +
      "   - 자동 재시작 후 복구?\n" +
      "   - Slack 알림 발송?\n" +
      "```\n\n" +
      "**4. Cluster Autoscaler vs HPA**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. Cluster Autoscaler:\n" +
      "   - Node 부족 시 자동 증설?\n" +
      "   - AWS Auto Scaling Group 통합?\n" +
      "   - Node Pool 전략? (예: Spot + On-Demand 혼합)\n" +
      "\n" +
      "2. HPA (Horizontal Pod Autoscaler):\n" +
      "   - CPU/메모리 기반 Auto Scaling?\n" +
      "   - Custom Metrics (예: Kafka Consumer Lag)?\n" +
      "   - KEDA (Kubernetes Event-Driven Autoscaling) 사용?\n" +
      "\n" +
      "3. VPA (Vertical Pod Autoscaler):\n" +
      "   - 사용 중? (requests/limits 자동 조정)\n" +
      "   - Recommendation 모드? 아니면 Auto?\n" +
      "```\n\n" +
      "**5. Network Policy & Security**\n\n" +
      "```yaml\n" +
      "# NetworkPolicy로 Namespace 간 격리\n" +
      "apiVersion: networking.k8s.io/v1\n" +
      "kind: NetworkPolicy\n" +
      "metadata:\n" +
      "  name: deny-from-other-namespaces\n" +
      "  namespace: team-payment\n" +
      "spec:\n" +
      "  podSelector: {}\n" +
      "  policyTypes:\n" +
      "  - Ingress\n" +
      "  ingress:\n" +
      "  - from:\n" +
      "    - podSelector: {}  # 같은 Namespace만 허용\n" +
      "\n" +
      "질문:\n" +
      "1. Zero-Trust Network:\n" +
      "   - Namespace 간 트래픽 기본 차단?\n" +
      "   - Whitelist 방식? (명시적 허용)\n" +
      "   - Istio/Linkerd 같은 Service Mesh 사용?\n" +
      "\n" +
      "2. mTLS:\n" +
      "   - Pod 간 통신 암호화?\n" +
      "   - Cert-Manager로 인증서 자동 발급?\n" +
      "   - 금융 규제상 의무사항?\n" +
      "```\n\n" +
      "**6. Observability (Namespace별)**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. Prometheus:\n" +
      "   - Namespace별 Prometheus 인스턴스?\n" +
      "   - 아니면 중앙 Prometheus + Tenant Label?\n" +
      "\n" +
      "2. Grafana:\n" +
      "   - 팀별 대시보드 격리?\n" +
      "   - 다른 팀 리소스 조회 불가?\n" +
      "\n" +
      "3. Logs:\n" +
      "   - ELK Stack? Loki?\n" +
      "   - Namespace별 로그 보관 정책? (예: 7일 vs 30일)\n" +
      "```\n\n" +
      "**배우고 싶은 점:**\n\n" +
      "1. **대규모 Multi-Tenancy**: 수십 개 팀이 공유하는 클러스터 운영\n" +
      "2. **ResourceQuota 최적화**: 비용 vs 성능 균형\n" +
      "3. **Service Mesh (Istio)**: mTLS + Traffic Management\n" +
      "4. **Cluster Autoscaler**: Node Pool 전략 (Spot + On-Demand)\n\n" +
      "**토스에서 기여할 수 있는 부분:**\n\n" +
      "- CKA 자격증 기반 Kubernetes 이론 지식\n" +
      "- AWS ECS → EKS 마이그레이션 지원\n" +
      "- OpenTelemetry 기반 Namespace별 Observability 구축\n" +
      "- Cost Optimization 경험 (EBS gp3, Spot 인스턴스)",
  },

  // 역질문 4: APM 도구와 Grafana 시각화
  {
    id: 74,
    category1: "Infrastructure",
    category2: "Reverse Question",
    question:
      "[역질문] 토스는 APM 도구로 무엇을 사용하고, Grafana 대시보드는 어떻게 설계되어 있나요?",
    answer:
      "**질문 배경:**\n\n" +
      "저는 OpenTelemetry + Grafana Stack (Tempo, Loki, Prometheus, ClickHouse)으로 Full-Stack Observability를 구축했습니다. 하지만 토스처럼 대규모 조직에서는 어떤 도구를 선택하고, 어떤 구조로 운영하는지 궁금합니다.\n\n" +
      "**현재 경험 (Self-Hosted Observability):**\n\n" +
      "```\n" +
      "Architecture:\n" +
      "├─ Metrics: Prometheus (v3.5.0, Native Histograms)\n" +
      "├─ Logs: Grafana Loki (8GB mem, log aggregation)\n" +
      "├─ Traces: Grafana Tempo (distributed tracing)\n" +
      "├─ Long-Term Storage: ClickHouse (30-day SLA)\n" +
      "└─ Visualization: Grafana (15+ dashboards)\n" +
      "\n" +
      "OpenTelemetry Collector:\n" +
      "- OTLP gRPC/HTTP ingestion\n" +
      "- Tail Sampling (0.1% production)\n" +
      "- Attribute filtering (Cardinality 관리)\n" +
      "\n" +
      "성과:\n" +
      "- MTTI: 18시간 → 10분 (99% 개선)\n" +
      "- 월 비용: $1,698 (Self-Hosted)\n" +
      "- 데이터 보관: Hot 30일 + Warm 90일 + Cold 10년\n" +
      "```\n\n" +
      "**토스 APM 궁금증:**\n\n" +
      "**1. 상용 APM vs Open-Source**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. 상용 APM 사용 여부:\n" +
      "   - Datadog APM?\n" +
      "   - New Relic?\n" +
      "   - Dynatrace?\n" +
      "   - 아니면 Open-Source (Grafana/Jaeger/Zipkin)?\n" +
      "\n" +
      "2. 상용 APM을 사용한다면:\n" +
      "   - 왜 선택했나요? (기능? 지원? 편의성?)\n" +
      "   - 월 비용은? (대략적인 규모)\n" +
      "   - Self-Hosted와 비교했을 때 장단점은?\n" +
      "\n" +
      "3. Open-Source라면:\n" +
      "   - OpenTelemetry 기반?\n" +
      "   - Jaeger vs Tempo 선택 이유는?\n" +
      "   - 운영 팀 규모는? (SRE 몇 명?)\n" +
      "```\n\n" +
      "**2. Grafana 대시보드 설계**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. 대시보드 구조:\n" +
      "   - 경영진용 (High-Level Metrics: MAU, DAU, Conversion)\n" +
      "   - 개발팀용 (Service-Level: Latency, Error Rate, Throughput)\n" +
      "   - 인프라팀용 (Infrastructure: CPU, Memory, Disk, Network)\n" +
      "   - 각 레벨별 대시보드 개수는?\n" +
      "\n" +
      "2. SLO (Service Level Objective) 모니터링:\n" +
      "   - SLO 목표는? (예: Availability 99.9%, Latency P99 < 1s)\n" +
      "   - Error Budget 추적?\n" +
      "   - Grafana SLO Plugin 사용?\n" +
      "\n" +
      "3. 실시간 vs 배치:\n" +
      "   - 실시간 대시보드 (5초 refresh)?\n" +
      "   - 배치 분석 (일일 리포트)?\n" +
      "   - 둘 다 사용? (용도 분리?)\n" +
      "```\n\n" +
      "**3. Distributed Tracing 구현**\n\n" +
      "```\n" +
      "질문:\n" +
      "제가 구현한 방식:\n" +
      "- Frontend (React) → Backend (Go) → Kafka → Batch (Python)\n" +
      "- W3C Trace Context로 Trace ID 전파\n" +
      "- Single Trace로 전체 흐름 추적\n" +
      "\n" +
      "토스는?\n" +
      "1. 어디까지 Tracing?\n" +
      "   - App (Flutter) → API (Spring) → Kafka → Batch → DB?\n" +
      "   - Frontend (Web/App) 도 포함?\n" +
      "   - 외부 API (PG사, 은행) 호출도 추적?\n" +
      "\n" +
      "2. Sampling 전략:\n" +
      "   - Production 환경 Sampling Rate는? (1%? 0.1%?)\n" +
      "   - Head-based? Tail-based?\n" +
      "   - 에러는 100% 수집?\n" +
      "\n" +
      "3. Trace 보관 기간:\n" +
      "   - Hot Storage: 며칠? (Tempo/Jaeger)\n" +
      "   - Warm Storage: 며칠? (ClickHouse/S3)\n" +
      "   - 금융 규제상 최소 기간은?\n" +
      "```\n\n" +
      "**4. Business Metrics vs Technical Metrics**\n\n" +
      "```\n" +
      "질문:\n" +
      "제가 구현한 방식:\n" +
      "- Business Metrics:\n" +
      "  * MAU/DAU (Monthly/Daily Active Users)\n" +
      "  * Conversion Rate (Session → Purchase)\n" +
      "  * Cart Source (어디서 장바구니 담았는지)\n" +
      "  * Top 100 Products by Revenue\n" +
      "  * Search Keywords (Top 200)\n" +
      "\n" +
      "- Technical Metrics:\n" +
      "  * API Latency (P50/P90/P95/P99)\n" +
      "  * Error Rate by Service\n" +
      "  * Redis Cache Hit/Miss Rate\n" +
      "  * Kafka Consumer Lag\n" +
      "\n" +
      "토스는?\n" +
      "1. Business Metrics 예시:\n" +
      "   - 송금 성공률? (PG사 장애 포함)\n" +
      "   - 결제 완료 시간 (P99)?\n" +
      "   - 신규 가입자 수 (일일)?\n" +
      "\n" +
      "2. Technical Metrics:\n" +
      "   - Golden Signals (Latency, Traffic, Errors, Saturation)?\n" +
      "   - RED Method (Rate, Errors, Duration)?\n" +
      "   - USE Method (Utilization, Saturation, Errors)?\n" +
      "\n" +
      "3. 대시보드 접근 권한:\n" +
      "   - 비개발자(기획팀, 마케팅)도 조회?\n" +
      "   - Grafana 계정 관리는?\n" +
      "   - Public Dashboard (인증 없음) 존재?\n" +
      "```\n\n" +
      "**5. Alerting & On-Call**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. Alert 채널:\n" +
      "   - Slack?\n" +
      "   - PagerDuty?\n" +
      "   - SMS/전화?\n" +
      "   - 우선순위별 채널 분리?\n" +
      "\n" +
      "2. Alert 기준:\n" +
      "   - Critical: Error Rate > 5% for 5min?\n" +
      "   - Warning: Latency P99 > 3s?\n" +
      "   - Info: Disk 80% 사용?\n" +
      "\n" +
      "3. On-Call Rotation:\n" +
      "   - 인프라팀만? 아니면 개발팀도?\n" +
      "   - On-Call 주기는? (1주? 2주?)\n" +
      "   - 야간/주말 대응 보상?\n" +
      "```\n\n" +
      "**6. Cost Optimization**\n\n" +
      "```\n" +
      "질문:\n" +
      "제가 달성한 비용:\n" +
      "- CloudWatch 비용: $5K → $2.5K (50% 절감)\n" +
      "- Self-Hosted Grafana Stack: $1,698/월\n" +
      "  * Athena: $40\n" +
      "  * S3: $450\n" +
      "  * EC2 (Grafana/Prometheus): $800\n" +
      "  * ClickHouse: $400\n" +
      "\n" +
      "토스는?\n" +
      "- 상용 APM이라면 월 예산은?\n" +
      "- Self-Hosted라면 인프라 비용은?\n" +
      "- 데이터 보관 비용 최적화 방법은?\n" +
      "```\n\n" +
      "**배우고 싶은 점:**\n\n" +
      "1. **대규모 조직의 APM 선택**: Datadog vs Self-Hosted 의사결정 과정\n" +
      "2. **SLO/SLI 설계**: Error Budget 기반 Release 관리\n" +
      "3. **Business Metrics 통합**: 기술 지표와 비즈니스 지표 연결\n" +
      "4. **금융 규제 준수**: 로그/Trace 보관 의무사항\n\n" +
      "**토스에서 기여할 수 있는 부분:**\n\n" +
      "- OpenTelemetry Contributor 경험\n" +
      "- Full-Stack Distributed Tracing 구축 (FE → BE → Batch)\n" +
      "- Self-Hosted Observability로 50% 비용 절감\n" +
      "- 15+ Grafana 대시보드 설계 (Business + Technical)",
  },

  // 역질문 5: Istio Ambient Mode 도입 계획
  {
    id: 75,
    category1: "Infrastructure",
    category2: "Reverse Question",
    question:
      "[역질문] 토스는 Istio Ambient Mode 같은 차세대 Service Mesh 도입을 고려하고 있나요?",
    answer:
      "**질문 배경:**\n\n" +
      "저는 EKS 마이그레이션을 준비하며 Istio Ambient Mode를 평가했습니다. 하지만 실무 도입은 하지 못했고, 이론적 지식만 있는 상태입니다. 토스처럼 대규모 트래픽을 처리하는 환경에서 Service Mesh를 어떻게 운영하는지 궁금합니다.\n\n" +
      "**Istio Ambient Mode란?**\n\n" +
      "```\n" +
      "기존 Sidecar 방식 (Istio 1.x ~ 1.22):\n" +
      "┌────────────────────────┐\n" +
      "│  Application Pod       │\n" +
      "│  ┌──────────┐          │\n" +
      "│  │   App    │          │\n" +
      "│  │ (Go/Java)│          │\n" +
      "│  └──────────┘          │\n" +
      "│  ┌──────────┐          │\n" +
      "│  │ Envoy    │ ← Sidecar│\n" +
      "│  │ (Proxy)  │          │\n" +
      "│  └──────────┘          │\n" +
      "└────────────────────────┘\n" +
      "\n" +
      "문제:\n" +
      "- Pod마다 Envoy Sidecar 필요 (메모리 100MB+)\n" +
      "- 1000 Pods = 100GB 메모리 낭비\n" +
      "- Pod 재시작 시간 증가 (Sidecar 초기화)\n" +
      "\n" +
      "Ambient Mode (Istio 1.23+):\n" +
      "┌────────────────────────┐\n" +
      "│  Application Pod       │\n" +
      "│  ┌──────────┐          │\n" +
      "│  │   App    │          │\n" +
      "│  │ (Go/Java)│          │\n" +
      "│  └──────────┘          │\n" +
      "└────────────────────────┘\n" +
      "         ↓ (iptables redirect)\n" +
      "┌────────────────────────┐\n" +
      "│ ztunnel (DaemonSet)    │ ← Node 당 1개\n" +
      "│ mTLS, Basic Routing    │\n" +
      "└────────────────────────┘\n" +
      "         ↓ (필요 시)\n" +
      "┌────────────────────────┐\n" +
      "│ Waypoint Proxy (L7)    │ ← Namespace 당 1개\n" +
      "│ Advanced Routing, Retry│\n" +
      "└────────────────────────┘\n" +
      "\n" +
      "장점:\n" +
      "- 메모리 절약: 1000 Pods × 100MB → 10 Nodes × 50MB = 500MB (99.5% ↓)\n" +
      "- Pod 재시작 빠름 (Sidecar 없음)\n" +
      "- 점진적 도입 가능 (Namespace 단위)\n" +
      "```\n\n" +
      "**제가 평가한 Ambient Mode (PoC 수준):**\n\n" +
      "```yaml\n" +
      "# Istio 1.23 Ambient Mode 설치\n" +
      "istioctl install --set profile=ambient -y\n" +
      "\n" +
      "# Namespace에 Ambient 활성화\n" +
      "kubectl label namespace team-a istio.io/dataplane-mode=ambient\n" +
      "\n" +
      "# mTLS 자동 활성화 (ztunnel)\n" +
      "apiVersion: security.istio.io/v1beta1\n" +
      "kind: PeerAuthentication\n" +
      "metadata:\n" +
      "  name: default\n" +
      "  namespace: team-a\n" +
      "spec:\n" +
      "  mtls:\n" +
      "    mode: STRICT  # 모든 Pod 간 mTLS 강제\n" +
      "\n" +
      "# L7 기능 필요 시 Waypoint Proxy\n" +
      "apiVersion: gateway.networking.k8s.io/v1\n" +
      "kind: Gateway\n" +
      "metadata:\n" +
      "  name: waypoint\n" +
      "  namespace: team-a\n" +
      "spec:\n" +
      "  gatewayClassName: istio-waypoint\n" +
      "  listeners:\n" +
      "  - name: http\n" +
      "    port: 80\n" +
      "    protocol: HTTP\n" +
      "```\n\n" +
      "**PoC 결과 (테스트 환경):**\n\n" +
      "| 지표 | Sidecar Mode | Ambient Mode | 개선 |\n" +
      "|------|--------------|--------------|------|\n" +
      "| 메모리 (100 Pods) | 10GB | 500MB | 95% ↓ |\n" +
      "| Pod 시작 시간 | 15초 | 5초 | 67% ↓ |\n" +
      "| mTLS 성능 | 5ms 추가 | 3ms 추가 | 40% ↑ |\n" +
      "| 학습 곡선 | 보통 | 높음 | - |\n\n" +
      "**하지만 Production 도입은 못 함:**\n\n" +
      "```\n" +
      "이유:\n" +
      "1. Ambient Mode는 Istio 1.23 (2024년 11월 출시) - 너무 신규\n" +
      "2. Kernel 4.19+ 필요 (eBPF 지원)\n" +
      "3. Production Case Study 부족 (아직 Early Adopter 단계)\n" +
      "4. 팀 내 Istio 전문가 없음 (학습 비용 큼)\n" +
      "5. 회사는 ECS 환경 (Kubernetes 마이그레이션 우선 필요)\n" +
      "```\n\n" +
      "**토스 Service Mesh 궁금증:**\n\n" +
      "**1. 현재 상태**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. Service Mesh 사용 여부:\n" +
      "   - Istio (Sidecar Mode)?\n" +
      "   - Linkerd?\n" +
      "   - Consul Connect?\n" +
      "   - 아니면 미사용? (Kubernetes Service만?)\n" +
      "\n" +
      "2. 사용 중이라면:\n" +
      "   - 언제부터? (도입 시기)\n" +
      "   - 전체 클러스터? 일부 Namespace만?\n" +
      "   - mTLS 활성화율은? (100%? 50%?)\n" +
      "\n" +
      "3. 미사용이라면:\n" +
      "   - 도입 계획은?\n" +
      "   - 도입하지 않는 이유는? (복잡도? 비용?)\n" +
      "```\n\n" +
      "**2. Ambient Mode 관심 여부**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. Ambient Mode 평가:\n" +
      "   - PoC 진행했나요?\n" +
      "   - 아니면 관심만 있는 상태?\n" +
      "   - 도입 계획은 언제?\n" +
      "\n" +
      "2. Sidecar 방식의 문제:\n" +
      "   - 메모리 오버헤드가 실제 문제인가요?\n" +
      "   - Pod 재시작 시간이 문제인가요?\n" +
      "   - 개발자 불만이 있나요? (복잡도)\n" +
      "\n" +
      "3. Ambient Mode로 기대하는 효과:\n" +
      "   - 비용 절감? (메모리 95% 감소)\n" +
      "   - 개발자 경험 개선? (투명한 mTLS)\n" +
      "   - 운영 간소화? (Sidecar 관리 제거)\n" +
      "```\n\n" +
      "**3. mTLS 구현 수준**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. 현재 mTLS 상태:\n" +
      "   - Pod 간 통신 암호화?\n" +
      "   - 인증서 자동 Rotation? (Cert-Manager?)\n" +
      "   - 금융 규제상 필수인가요?\n" +
      "\n" +
      "2. mTLS 성능 영향:\n" +
      "   - Latency 증가는 얼마나? (5ms? 10ms?)\n" +
      "   - CPU 오버헤드는?\n" +
      "   - 개발 환경에서도 mTLS?\n" +
      "\n" +
      "3. Zero-Trust Network:\n" +
      "   - Pod 간 기본 차단 + 명시적 허용?\n" +
      "   - NetworkPolicy만으로 충분?\n" +
      "   - Service Mesh의 추가 이점은?\n" +
      "```\n\n" +
      "**4. Traffic Management**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. Canary Deployment:\n" +
      "   - Istio VirtualService로 트래픽 분산?\n" +
      "   - Argo Rollouts 사용?\n" +
      "   - Blue-Green vs Canary 선호?\n" +
      "\n" +
      "2. Retry/Timeout 정책:\n" +
      "   - Service Mesh에서 설정?\n" +
      "   - Application 코드에서 처리?\n" +
      "   - Circuit Breaker 패턴 사용?\n" +
      "\n" +
      "3. Rate Limiting:\n" +
      "   - Envoy Filter로 구현?\n" +
      "   - API Gateway (Kong/APISIX)에서?\n" +
      "   - 결제 API는 Rate Limit 몇?\n" +
      "```\n\n" +
      "**5. Observability 통합**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. Istio + OpenTelemetry:\n" +
      "   - Istio가 자동으로 Trace 생성?\n" +
      "   - Application에서도 Instrumentation 필요?\n" +
      "   - Grafana Tempo로 시각화?\n" +
      "\n" +
      "2. Service Graph:\n" +
      "   - Kiali 사용?\n" +
      "   - Grafana에서 직접 시각화?\n" +
      "   - 서비스 간 의존성 자동 감지?\n" +
      "\n" +
      "3. Metrics:\n" +
      "   - Istio의 기본 메트릭만? (Request Rate, Latency)\n" +
      "   - Custom Metrics 추가?\n" +
      "   - Prometheus Exporter 통합?\n" +
      "```\n\n" +
      "**6. 학습 리소스**\n\n" +
      "```\n" +
      "질문:\n" +
      "1. 팀 교육:\n" +
      "   - Istio 전담 팀이 있나요?\n" +
      "   - 개발팀도 Istio를 이해해야 하나요?\n" +
      "   - 내부 교육 자료/Wiki가 있나요?\n" +
      "\n" +
      "2. 외부 지원:\n" +
      "   - Solo.io 같은 벤더 컨설팅?\n" +
      "   - CNCF 커뮤니티 참여?\n" +
      "   - Istio Con 참석?\n" +
      "```\n\n" +
      "**배우고 싶은 점:**\n\n" +
      "1. **Istio Production 운영**: Sidecar/Ambient 실전 경험\n" +
      "2. **mTLS at Scale**: 수천 Pod 환경에서 인증서 관리\n" +
      "3. **Traffic Management**: Canary Deployment 자동화\n" +
      "4. **금융 규제 준수**: Service Mesh로 달성하는 보안 요구사항\n\n" +
      "**토스에서 기여할 수 있는 부분:**\n\n" +
      "- Istio Ambient Mode PoC 경험 (이론 + 테스트 환경)\n" +
      "- OpenTelemetry 통합 노하우 (Trace Context 전파)\n" +
      "- CKA 자격증 기반 Kubernetes 운영 지식\n" +
      "- Zero-Trust Network 설계 (NetworkPolicy 경험)\n\n" +
      "**마지막으로:**\n\n" +
      "토스가 만약 Ambient Mode를 도입한다면, 초기 설계부터 참여하고 싶습니다. 제가 PoC로 평가한 내용을 실제 Production에 적용하며 배우고 싶습니다.",
  },

  // Data Squad TF를 통한 Observability 조직 확산
  {
    id: 76,
    category1: "Infrastructure",
    category2: "Leadership",
    question:
      "Observability 시스템을 최초 구축 후 조직 전체에 어떻게 확산시켰나요?",
    answer:
      "**Challenge: 기술 플랫폼을 조직 문화로 확산시키기**\n\n" +
      "**상황 인식 (Thinking):**\n\n" +
      "```\n" +
      "초기 상황 (2023년 1월):\n" +
      "- OpenTelemetry 플랫폼 구축 완료 (Infrastructure 팀 단독)\n" +
      "- 모니터링 시스템: Grafana + Tempo + Loki + Prometheus\n" +
      "- 문제: 개발팀이 사용하지 않음 (사용률 5%)\n" +
      "\n" +
      "근본 원인 분석:\n" +
      '1. 학습 곡선: "OpenTelemetry가 뭔지 모르겠어요"\n' +
      '2. 동기 부족: "지금까지 로그로 잘 했는데 왜 필요해?"\n' +
      '3. 접근성: "Grafana 어디서 보나요? 계정은?"\n' +
      '4. 신뢰 부족: "이게 정말 도움이 될까요?"\n' +
      "\n" +
      "핵심 통찰:\n" +
      "→ 기술 문제가 아니라 조직 문화 문제\n" +
      '→ "강요"가 아닌 "경험"으로 설득 필요\n' +
      "→ Bottom-up 확산 전략 필요\n" +
      "```\n\n" +
      "**전략적 의사결정 (Decision Making):**\n\n" +
      "**Decision 1: Data Squad TF 구성 (Small Win 전략)**\n\n" +
      "```\n" +
      "의사결정 배경:\n" +
      "- Option A: 전사 교육 (Top-down)\n" +
      "  * 장점: 빠른 전파\n" +
      "  * 단점: 강제성, 낮은 참여도\n" +
      '  * 리스크: "또 회사에서 시키는 거네"\n' +
      "\n" +
      "- Option B: 자율 도입 (Laissez-faire)\n" +
      "  * 장점: 자발성\n" +
      "  * 단점: 너무 느림\n" +
      '  * 리스크: "아무도 안 쓸 수 있음"\n' +
      "\n" +
      "- Option C: 소규모 TF → 확산 (선택) ✅\n" +
      "  * 장점: 각 팀의 Champion 양성\n" +
      "  * 실행: 3명 선발 (Backend/Frontend/기획자)\n" +
      '  * 전략: "보여주기" → "전파하기" 2단계\n' +
      "\n" +
      "선택 이유:\n" +
      "1. 각 팀의 언어로 소통 가능한 전도사 필요\n" +
      "2. 실제 성공 사례를 만들어 신뢰 구축\n" +
      "3. Peer-to-peer learning이 가장 효과적\n" +
      "```\n\n" +
      "**Decision 2: TF 멤버 선발 기준**\n\n" +
      "```\n" +
      "선발 기준 (명확한 의사결정 프레임워크):\n\n" +
      "1. 기술적 호기심 (Technical Curiosity)\n" +
      "   - 새로운 도구 학습 의지\n" +
      "   - 기존 방식에 만족하지 않는 문제의식\n" +
      "\n" +
      "2. 영향력 (Influence)\n" +
      "   - 팀 내 신뢰받는 시니어 엔지니어\n" +
      "   - 코드 리뷰어, 기술 의사결정자\n" +
      "\n" +
      "3. 커뮤니케이션 (Communication)\n" +
      "   - 복잡한 기술을 쉽게 설명 가능\n" +
      "   - 팀 내 기술 공유 경험\n" +
      "\n" +
      "4. 시간 투자 의지 (Commitment)\n" +
      "   - 주 5시간 TF 활동 가능\n" +
      "   - 온보딩 문서 작성 참여\n" +
      "\n" +
      "최종 선발:\n" +
      "- Backend Lead: 김OO (Go 전문가, 5년차)\n" +
      "- Frontend Lead: 이OO (React 전문가, 4년차)\n" +
      "- Product Manager: 박OO (기획 3년차, 데이터 분석 관심)\n" +
      "```\n\n" +
      "**협업 방식 (Collaboration):**\n\n" +
      "**Phase 1: TF 온보딩 (Week 1-2)**\n\n" +
      "```\n" +
      '목표: "Observability의 가치를 체감"\n\n' +
      "Week 1: 실습 중심 Hands-on\n" +
      "─────────────────────────────\n" +
      "Day 1-2: OpenTelemetry 기초\n" +
      "  • 내가 직접 시연: Trace 하나로 장애 10분 해결\n" +
      '  • "여러분 서비스에서 이렇게 써요"\n' +
      "  • 실습: 자신의 서비스에 Instrumentation 추가\n" +
      "\n" +
      "Day 3-4: Grafana 대시보드 구축\n" +
      "  • 템플릿 제공 (복붙 가능)\n" +
      "  • 실습: 자신의 팀 대시보드 커스터마이징\n" +
      '  • 목표: "내가 만든 대시보드" 소유감 부여\n' +
      "\n" +
      "Day 5: 실전 문제 해결\n" +
      "  • 실제 Production 장애 로그 제공\n" +
      "  • TF 멤버가 직접 Trace로 Root Cause 찾기\n" +
      '  • "아, 이래서 필요하구나!" 순간 창출\n' +
      "\n" +
      "Week 2: 각 파트별 특화 교육\n" +
      "─────────────────────────────\n" +
      "Backend (김OO):\n" +
      "  • Go OpenTelemetry SDK 심화\n" +
      "  • Database Query Instrumentation\n" +
      "  • Kafka Trace Context 전파\n" +
      "\n" +
      "Frontend (이OO):\n" +
      "  • React Auto-instrumentation\n" +
      "  • User Action Tracking\n" +
      "  • Web Vitals (LCP, FID, CLS) 연동\n" +
      "\n" +
      "Product (박OO):\n" +
      "  • Business Metrics 설계\n" +
      "  • Conversion Funnel 대시보드\n" +
      "  • A/B Test 결과 시각화\n" +
      "\n" +
      "협업 원칙:\n" +
      '1. "질문 환영": Slack #data-squad-tf 채널 24시간 답변\n' +
      '2. "실패 허용": 테스트 환경에서 자유롭게 실험\n' +
      '3. "페어 프로그래밍": 막히면 화면공유로 즉시 도움\n' +
      "```\n\n" +
      "**Phase 2: Quick Win 프로젝트 (Week 3-4)**\n\n" +
      "```\n" +
      '전략: "작지만 확실한 성공 경험"\n\n' +
      "Backend 팀 (김OO):\n" +
      "──────────────────\n" +
      '문제: "회원가입 API가 가끔 5초 걸려요"\n' +
      "\n" +
      "해결 과정 (TF 멤버 주도):\n" +
      "1. Trace로 발견: Database Connection Pool 고갈\n" +
      "2. Span Duration 분석: 4.8초가 Connection 대기\n" +
      "3. 해결: Pool size 10 → 50으로 증설\n" +
      "4. 결과: P99 Latency 5초 → 300ms (94% 개선)\n" +
      "\n" +
      "임팩트:\n" +
      "• Backend 팀 전체가 Grafana 사용 시작\n" +
      '• "김OO이 Trace로 장애 10분 만에 해결" 입소문\n' +
      "\n" +
      "Frontend 팀 (이OO):\n" +
      "──────────────────\n" +
      '문제: "상품 목록 페이지가 느려요"\n' +
      "\n" +
      "해결 과정:\n" +
      "1. React Profiler + OpenTelemetry 연동\n" +
      "2. 발견: 10,000개 Product 컴포넌트 전체 re-render\n" +
      "3. 해결: useMemo + react-window 가상화\n" +
      "4. 결과: 렌더링 시간 4500ms → 50ms (99% 개선)\n" +
      "\n" +
      "임팩트:\n" +
      "• Frontend 팀 성능 최적화 문화 정착\n" +
      '• 이OO이 팀 내 "성능 전문가"로 인정\n' +
      "\n" +
      "기획팀 (박OO):\n" +
      "──────────────────\n" +
      '문제: "주간 리포트 만드는데 2일 걸려요"\n' +
      "\n" +
      "해결 과정:\n" +
      "1. Business Metrics 대시보드 구축\n" +
      "   - MAU/DAU (실시간)\n" +
      "   - Conversion Rate (Session → Purchase)\n" +
      "   - Top 100 Products by Revenue\n" +
      "2. 자동 리포트: Grafana → PDF 내보내기\n" +
      "3. 결과: 2일 → 10분 (99.6% 시간 절감)\n" +
      "\n" +
      "임팩트:\n" +
      "• 기획팀 전체가 데이터 기반 의사결정 시작\n" +
      "• CEO 주간 회의에서 실시간 대시보드 사용\n" +
      "\n" +
      "공통 원칙:\n" +
      "1. TF 멤버가 직접 문제 해결 (내가 멘토링만)\n" +
      "2. 해결 과정을 팀 내 공유 (Notion 문서)\n" +
      "3. Before/After 메트릭 강조 (숫자로 증명)\n" +
      "```\n\n" +
      "**Phase 3: 조직 확산 (Week 5-8)**\n\n" +
      "```\n" +
      '전략: "TF 멤버가 전도사 되기"\n\n' +
      "1. 팀별 Tech Talk (각 30분)\n" +
      "───────────────────────────\n" +
      "Backend 팀 (김OO 발표):\n" +
      '  • 제목: "Trace 하나로 장애 10분 해결하기"\n' +
      "  • 내용: 실제 해결한 사례 3가지\n" +
      "  • 데모: 라이브 코딩으로 Instrumentation 추가\n" +
      "  • 참석률: 95% (팀원 20명 중 19명)\n" +
      "\n" +
      "Frontend 팀 (이OO 발표):\n" +
      '  • 제목: "React 성능 최적화의 끝판왕"\n' +
      "  • 내용: React Profiler + OpenTelemetry\n" +
      "  • 데모: 10,000개 렌더링 최적화 Before/After\n" +
      "  • 참석률: 100% (팀원 15명 전원)\n" +
      "\n" +
      "기획팀 (박OO 발표):\n" +
      '  • 제목: "엑셀 지옥에서 탈출하기"\n' +
      "  • 내용: Grafana로 2일 → 10분 리포트\n" +
      "  • 데모: CEO가 보는 실시간 대시보드\n" +
      "  • 참석률: 100% (팀원 10명 전원)\n" +
      "\n" +
      "2. 1:1 페어링 프로그램\n" +
      "───────────────────────────\n" +
      "구조:\n" +
      "  • TF 멤버 1명 : 팀원 1명\n" +
      "  • 2주간 주 2회, 1시간씩 페어링\n" +
      "  • 목표: 팀원의 서비스에 Instrumentation 추가\n" +
      "\n" +
      "Backend:\n" +
      "  • 김OO → 6명 페어링 (2주 × 3 라운드)\n" +
      "  • 결과: 18명 Backend 엔지니어 모두 Trace 사용\n" +
      "\n" +
      "Frontend:\n" +
      "  • 이OO → 5명 페어링 (2주 × 3 라운드)\n" +
      "  • 결과: 15명 Frontend 엔지니어 모두 Web Vitals 모니터링\n" +
      "\n" +
      "기획팀:\n" +
      "  • 박OO → 3명 페어링 (2주 × 3 라운드)\n" +
      "  • 결과: 10명 기획자 모두 Grafana 대시보드 직접 생성\n" +
      "\n" +
      "3. 문서화 (Notion Wiki)\n" +
      "───────────────────────────\n" +
      "TF 멤버가 직접 작성:\n" +
      '  • "5분 만에 시작하는 OpenTelemetry"\n' +
      '  • "Go/React/Python별 Instrumentation 가이드"\n' +
      '  • "자주 묻는 질문 50개" (FAQ)\n' +
      '  • "대시보드 템플릿 모음" (복붙 가능)\n' +
      "\n" +
      "특징:\n" +
      "  • 스크린샷 풍부 (글보다 이미지)\n" +
      "  • 실제 코드 예제 (복붙 가능)\n" +
      '  • 트러블슈팅 가이드 ("이럴 땐 이렇게")\n' +
      "```\n\n" +
      "**Phase 4: 문화 정착 (Week 9-12)**\n\n" +
      "```\n" +
      '1. 주간 "Observability 챔피언" 선정\n' +
      "──────────────────────────────────\n" +
      "  • 가장 인사이트 있는 대시보드 만든 사람\n" +
      "  • 가장 빠르게 장애 해결한 사람\n" +
      "  • 스타벅스 기프티콘 + 전사 Slack 공유\n" +
      "\n" +
      "2. Observability Office Hours (매주 금요일 2시간)\n" +
      "────────────────────────────────────────────\n" +
      "  • 운영: TF 멤버 3명 + 나\n" +
      "  • 내용: 질문 환영, 라이브 디버깅, 페어링\n" +
      "  • 참석률: 평균 15명\n" +
      "\n" +
      "3. Grafana Dashboard 갤러리\n" +
      "───────────────────────────────\n" +
      '  • 월간 "Best Dashboard" 투표\n' +
      "  • 우승자 대시보드 → 전사 템플릿 등록\n" +
      '  • 경쟁이 아닌 "공유" 문화\n' +
      "```\n\n" +
      "**측정 가능한 성과 (Measurable Results):**\n\n" +
      "```\n" +
      "3개월 후 (2023년 4월):\n" +
      "─────────────────────\n" +
      "정량 지표:\n" +
      "  • Grafana 사용률: 5% → 92% (18배 증가)\n" +
      "  • OpenTelemetry 적용 서비스: 3개 → 28개 (전체 30개 중)\n" +
      "  • 평균 MTTI: 18시간 → 15분 (99% 개선)\n" +
      "  • 대시보드 개수: 5개 → 87개 (각 팀이 직접 생성)\n" +
      "  • Trace 일일 생성량: 10K → 500K (50배 증가)\n" +
      "\n" +
      "정성 지표:\n" +
      '  • 개발자 만족도: "장애 대응이 편해졌어요" (설문 89%)\n' +
      '  • 기획팀: "데이터 기반 의사결정 가능" (설문 95%)\n' +
      '  • CEO: "전사 실시간 KPI 대시보드 매일 확인"\n' +
      "\n" +
      "부수 효과:\n" +
      "  • TF 멤버 3명 → 각 팀 Tech Lead로 승진\n" +
      '  • Observability 문화 → 채용 강점 ("최신 기술 사용")\n' +
      "  • OpenTelemetry 오픈소스 기여 증가 (회사 PR)\n" +
      "```\n\n" +
      "**리더십 & 협업 원칙:**\n\n" +
      "**1. Thinking (사고방식):**\n" +
      "```\n" +
      '• "기술은 수단, 조직 변화가 목적"\n' +
      "  → 플랫폼 구축만으론 부족, 사람이 쓰게 만들기\n" +
      "\n" +
      '• "Top-down보다 Bottom-up"\n' +
      "  → 강제 교육보다 성공 사례로 자연스럽게 전파\n" +
      "\n" +
      '• "작은 승리의 연속"\n' +
      "  → 한 번에 전사 확산보다 3명 → 각 팀 → 전사\n" +
      "\n" +
      '• "소유권 이전 (Ownership Transfer)"\n' +
      "  → 내가 전문가가 아니라 TF 멤버가 전문가 되게\n" +
      "```\n\n" +
      "**2. Decision Making (의사결정):**\n" +
      "```\n" +
      "• 데이터 기반: 사용률 5% → 명확한 문제 인식\n" +
      "• 다중 옵션 평가: Top-down vs Bottom-up vs Hybrid\n" +
      "• 명확한 기준: TF 멤버 선발 4가지 기준\n" +
      "• 빠른 실행: 2주 만에 Quick Win 프로젝트 완료\n" +
      "• 측정 가능: 사용률 92% 달성으로 성공 검증\n" +
      "```\n\n" +
      "**3. Collaboration (협업):**\n" +
      "```\n" +
      '• 수평적 관계: 내가 "선생님"이 아니라 "멘토"\n' +
      '• 심리적 안전: "질문 환영", "실패 허용" 문화\n' +
      "• 페어 프로그래밍: 1:1 밀착 지원으로 학습 가속화\n" +
      "• 문서화: 지속 가능성 확보 (내가 없어도 돌아감)\n" +
      "• 인정과 보상: 주간 챔피언, Best Dashboard 투표\n" +
      "```\n\n" +
      "**핵심 교훈:**\n\n" +
      "```\n" +
      "1. 기술 플랫폼은 30%, 조직 변화가 70%\n" +
      "2. 강제보다 경험, 설명보다 시연\n" +
      "3. Champion을 만들고, Champion이 확산시키게\n" +
      "4. 작은 팀 → 큰 조직 (Snowball Effect)\n" +
      "5. 측정 가능한 성과로 지속 동력 확보\n" +
      "```\n\n" +
      "**토스 적용 포인트:**\n\n" +
      "토스의 DevOps 문화 확산에 직접 기여 가능:\n" +
      "- 새로운 플랫폼 도입 시 조직 확산 경험\n" +
      "- Cross-functional TF 운영 노하우\n" +
      "- Bottom-up 변화 관리 (Change Management)\n" +
      "- 측정 가능한 성과 창출 (92% 사용률)\n" +
      "- 기술 리더십 + 조직 리더십 겸비",
  },
];
