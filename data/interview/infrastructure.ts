import type { InterviewQuestion } from "@/types/portfolio";

export const infrastructureQuestions: InterviewQuestion[] = [
  // Kubernetes
  {
    id: 9,
    category1: "Infrastructure",
    category2: "Kubernetes",
    question: "Please explain your Kubernetes experience.",
    answer:
      "I've developed and operated applications in EKS environments since the beginning of my career and hold **CKA certification**.\n\n**Key Experience:**\n- Current: Operating 100+ containers in EKS environment\n- Abacus: Developed and deployed in Kubernetes environment with namespace-based workflow\n- Experience with CNI networking, security contexts, RBAC configuration\n- APISIX Gateway integration\n\n**Problem-Solving**: Rich practical experience including container network issues, resource troubleshooting, and Pod scheduling optimization.",
  },
  {
    id: 10,
    category1: "Infrastructure",
    category2: "AWS",
    question: "Please explain your AWS experience and certifications.",
    answer:
      "**Certifications:**\n- AWS Certified DevOps Engineer – Professional (Nov 2024)\n- AWS Certified SysOps Administrator – Associate (Aug 2024)\n- CKA, LFCS\n\n**Key Service Experience:**\n- **Compute**: ECS Fargate, EKS, Lambda\n- **Storage**: 50% cost reduction through S3 Lifecycle policies\n- **Data**: Data lake with Glue + Athena (7 days → 10 years)\n- **Networking**: Site-to-Site VPN 1.25Gbps, API Gateway\n- **IaC**: 90% deployment speedup with CloudFormation (2 hours → 12 min)",
  },
  {
    id: 11,
    category1: "Infrastructure",
    category2: "Monitoring",
    question: "What is your observability/monitoring experience?",
    answer:
      "Led migration from legacy Scouter to **OpenTelemetry + Grafana stack** unified observability system.\n\n**Architecture:**\n- Collectors on 12 servers collecting traces, metrics, logs\n- End-to-end distributed tracing in mixed legacy monolith + MSA environment\n- Real-time visualization with Grafana dashboards\n- Prometheus for metrics aggregation\n\n**Results:**\n- MTTI reduced 99% (18 hours → 10 minutes)\n- Contributing to OpenTelemetry open-source (AWS, Container issues)\n- Processing 3TB monthly distributed tracing data",
  },
  {
    id: 12,
    category1: "Infrastructure",
    category2: "Messaging",
    question: "What is your Kafka experience?",
    answer:
      "Built and operate **Apache Kafka clusters** handling 20-50 million messages daily.\n\n**Key Implementations:**\n- High availability cluster configuration\n- Rate limiting and circuit breaker patterns\n- APISIX Gateway integration\n- Real-time data pipeline with Airflow integration\n- Message ordering and exactly-once delivery guarantees\n\n**Scale:** Processing 1 billion daily messages for ₩500B revenue e-commerce platform.",
  },
  {
    id: 13,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question: "Please explain your Airflow/data pipeline experience.",
    answer:
      "Designed and built **5 HA Airflow clusters** for batch/CDC/statistics automation.\n\n**Architecture:**\n- PostgreSQL metadata DB + Redis message broker\n- Celery Executor for parallel task processing\n- DAG-based complex dependency management\n- Real-time monitoring dashboard and alerts\n\n**Scale:**\n- 200+ DAGs managing complex workflows\n- Automated data warehouse ETL processes\n- Integration with AWS Glue, Athena for long-term analytics",
  },
  {
    id: 14,
    category1: "Infrastructure",
    category2: "IaC",
    question: "What is your Infrastructure as Code experience?",
    answer:
      "Extensive experience with **IaC (Infrastructure as Code)** and **CI/CD pipelines** across multiple platforms.\n\n**CI/CD Experience:**\n- **Jenkins**: Onpremise GitLab(Web hook) 기반 CI/CD 파이프라인 구성\n- **ArgoCD**: GitHub 기반 GitOps CD 파이프라인 구현\n- **AWS CodeCommit + CloudFormation**: GitHub 기반 CI/CD 자동화\n\n**IaC Achievements:**\n- 90% deployment speedup (2 hours → 12 minutes) with CloudFormation\n- Consistent infrastructure provisioning across environments\n- Version-controlled infrastructure changes\n- Automated rollback capabilities\n\n**Best Practices:**\n- Modular template design for reusability\n- Parameter-driven configurations\n- Integration with GitOps workflows",
  },
  {
    id: 15,
    category1: "Infrastructure",
    category2: "Networking",
    question: "Please explain your networking and gateway experience.",
    answer:
      "Built and operate **APISIX-based API Gateway** with comprehensive traffic management.\n\n**Key Features:**\n- Eureka service discovery integration\n- Dynamic routing and load balancing\n- RBAC for all traffic\n- Rate limiting and circuit breaker patterns\n- High availability (HA) configuration\n\n**Integration:**\n- Successfully integrated Kafka and Airflow in POC\n- Site-to-Site VPN (1.25Gbps throughput)\n- Multi-gateway orchestration (shop.co.kr, connect.shop.co.kr)",
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
      "**Systematic Cost Optimization Approach:**\n\n1. **S3 Lifecycle Policies**: Automated data tiering and archival\n2. **EC2 Right-sizing**: Analyzed CloudWatch metrics to optimize instance types\n3. **Reserved Instances**: Committed to long-term for predictable workloads\n4. **Spot Instances**: For non-critical batch processing\n5. **Data Transfer Optimization**: Reduced cross-region/cross-AZ traffic\n\n**Results:** $5K → $2.5K monthly savings while maintaining performance",
  },
  {
    id: 36,
    category1: "Infrastructure",
    category2: "Security",
    question: "What is your security experience?",
    answer:
      "**Security Implementations:**\n\n- **Authentication**: OAuth2, JWT\n- **Authorization**: RBAC across all Gateway traffic\n- **Network Security**: VPC design, security groups, NACLs\n- **Secrets Management**: AWS Secrets Manager, parameter store\n- **WAF**: Web Application Firewall for LG projects\n- **Compliance**: Following security best practices for enterprise clients\n\n**Approach:**\n- Security by design, not afterthought\n- Regular security audits and updates\n- Principle of least privilege",
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
];
