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
];
