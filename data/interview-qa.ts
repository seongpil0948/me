import type { InterviewQuestion } from "@/types/portfolio";

export const interviewQuestions: InterviewQuestion[] = [
  // General - Self Introduction & Career
  {
    id: 1,
    category1: "General",
    category2: "Self Introduction",
    question: "Please introduce yourself briefly.",
    answer:
      "Hello, I'm Seongpil Choi, a 6-year Platform Lead Engineer specializing in infrastructure and DevOps. I'm currently responsible for the infrastructure of an e-commerce platform with ₩500B annual revenue, and I focus on **proving Developer Experience (DevEx) with data**.\n\nMy biggest achievement is **reducing MTTI from 18 hours to 10 minutes (99% reduction)** by introducing OpenTelemetry. I also built a data platform that links 20TB of monthly observability data with business metrics, visualizing key indicators like retention and conversion rates.\n\nI hold certifications in Kubernetes (CKA), AWS (DevOps Pro), and Linux (LFCS), and operate Kafka clusters processing 20-50 million messages daily and over 200 Airflow DAGs.",
  },
  {
    id: 2,
    category1: "General",
    category2: "Career Change",
    question: "Why did you decide to change jobs?",
    answer:
      "While I've achieved significant results at my current company, I want to expand my capabilities in larger-scale systems and global environments. Particularly, I'm interested in contributing to [company's specific technology/project] and experiencing higher-level technical challenges.",
  },
  {
    id: 3,
    category1: "General",
    category2: "Company Interest",
    question: "Why did you apply to our company?",
    answer:
      "1. **Technical Challenge**: Interest in [company's specific tech stack/project]\n2. **Scale**: Opportunity to work in [large-scale traffic/user count] environments\n3. **Vision**: Alignment with [company's mission/vision]\n4. **Growth**: Personal growth opportunities through [company's culture/programs]",
  },
  {
    id: 4,
    category1: "General",
    category2: "Salary",
    question: "What is your current salary?",
    answer:
      "My current salary is **confidential according to company policy**. However, I'm willing to negotiate at a reasonable level considering my experience, capabilities, and market standards.",
  },
  {
    id: 5,
    category1: "General",
    category2: "Salary",
    question: "What matters to you besides salary?",
    answer:
      "1. **Technical Challenge**: Large-scale systems, latest tech stack experience\n2. **Growth Environment**: Learning support, conference attendance, certification support\n3. **Team Culture**: Transparency, data-driven decisions, technical discussions\n4. **Work-Life Balance**: Flexible work, remote work availability\n5. **Impact**: Environment where my contributions can make real business impact",
  },
  {
    id: 6,
    category1: "General",
    category2: "Start Date",
    question: "When can you start?",
    answer:
      "I prioritize **smooth handover with my current company**.\n- **Minimum Period**: About **1 month** after offer\n- **Negotiable**: Can adjust based on project situation\n- **Goal**: Start after completing stable handover and documentation of current systems",
  },

  // Infrastructure - Kubernetes
  {
    id: 7,
    category1: "Infrastructure",
    category2: "Kubernetes",
    question: "Please explain your Kubernetes experience.",
    answer:
      "I've developed and operated applications in EKS environments since the beginning of my career and hold **CKA certification**.\n\n**Key Experience:**\n- Current: Operating 100+ containers in EKS environment\n- Abacus: Developed and deployed in Kubernetes environment with namespace-based workflow\n- Experience with CNI networking, security contexts, RBAC configuration\n- APISIX Gateway integration\n\n**Problem-Solving**: Rich practical experience including container network issues, resource troubleshooting, and Pod scheduling optimization.",
  },
  {
    id: 8,
    category1: "Infrastructure",
    category2: "AWS",
    question: "Please explain your AWS experience and certifications.",
    answer:
      "**Certifications:**\n- AWS Certified DevOps Engineer – Professional (Nov 2024)\n- AWS Certified SysOps Administrator – Associate (Aug 2024)\n- CKA, LFCS\n\n**Key Service Experience:**\n- **Compute**: ECS Fargate, EKS, Lambda\n- **Storage**: 50% cost reduction through S3 Lifecycle policies\n- **Data**: Data lake with Glue + Athena (7 days → 10 years)\n- **Networking**: Site-to-Site VPN 1.25Gbps, API Gateway\n- **IaC**: 90% deployment speedup with CloudFormation (2 hours → 12 min)",
  },
  {
    id: 9,
    category1: "Infrastructure",
    category2: "Monitoring",
    question: "What is your observability/monitoring experience?",
    answer:
      "Led migration from legacy Scouter to **OpenTelemetry + Grafana stack** unified observability system.\n\n**Architecture:**\n- Collectors on 12 servers collecting traces, metrics, logs\n- End-to-end distributed tracing in mixed legacy monolith + MSA environment\n- Real-time visualization with Grafana dashboards\n- Prometheus for metrics aggregation\n\n**Results:**\n- MTTI reduced 99% (18 hours → 10 minutes)\n- Contributing to OpenTelemetry open-source (AWS, Container issues)\n- Processing 3TB monthly distributed tracing data",
  },
  {
    id: 10,
    category1: "Infrastructure",
    category2: "Messaging",
    question: "What is your Kafka experience?",
    answer:
      "Built and operate **Apache Kafka clusters** handling 20-50 million messages daily.\n\n**Key Implementations:**\n- High availability cluster configuration\n- Rate limiting and circuit breaker patterns\n- APISIX Gateway integration\n- Real-time data pipeline with Airflow integration\n- Message ordering and exactly-once delivery guarantees\n\n**Scale:** Processing 1 billion daily messages for ₩500B revenue e-commerce platform.",
  },
  {
    id: 11,
    category1: "Infrastructure",
    category2: "Data Pipeline",
    question: "Please explain your Airflow/data pipeline experience.",
    answer:
      "Designed and built **5 HA Airflow clusters** for batch/CDC/statistics automation.\n\n**Architecture:**\n- PostgreSQL metadata DB + Redis message broker\n- Celery Executor for parallel task processing\n- DAG-based complex dependency management\n- Real-time monitoring dashboard and alerts\n\n**Scale:**\n- 200+ DAGs managing complex workflows\n- Automated data warehouse ETL processes\n- Integration with AWS Glue, Athena for long-term analytics",
  },
  {
    id: 12,
    category1: "Infrastructure",
    category2: "IaC",
    question: "What is your Infrastructure as Code experience?",
    answer:
      "Extensive experience with **IaC (Infrastructure as Code)** and **CI/CD pipelines** across multiple platforms.\n\n**CI/CD Experience:**\n- **Jenkins**: Onpremise GitLab(Web hook) 기반 CI/CD 파이프라인 구성\n- **ArgoCD**: GitHub 기반 GitOps CD 파이프라인 구현\n- **AWS CodeCommit + CloudFormation**: GitHub 기반 CI/CD 자동화\n\n**IaC Achievements:**\n- 90% deployment speedup (2 hours → 12 minutes) with CloudFormation\n- Consistent infrastructure provisioning across environments\n- Version-controlled infrastructure changes\n- Automated rollback capabilities\n\n**Best Practices:**\n- Modular template design for reusability\n- Parameter-driven configurations\n- Integration with GitOps workflows",
  },
  {
    id: 13,
    category1: "Infrastructure",
    category2: "Networking",
    question: "Please explain your networking and gateway experience.",
    answer:
      "Built and operate **APISIX-based API Gateway** with comprehensive traffic management.\n\n**Key Features:**\n- Eureka service discovery integration\n- Dynamic routing and load balancing\n- RBAC for all traffic\n- Rate limiting and circuit breaker patterns\n- High availability (HA) configuration\n\n**Integration:**\n- Successfully integrated Kafka and Airflow in POC\n- Site-to-Site VPN (1.25Gbps throughput)\n- Multi-gateway orchestration (shop.co.kr, connect.shop.co.kr)",
  },

  // Backend - Programming Languages
  {
    id: 14,
    category1: "Backend",
    category2: "Go vs Python",
    question: "Between Go and Python, which would you choose and why?",
    answer:
      "**Choose Python when:**\n- Fast prototyping and development speed are critical\n- ML/data pipelines (Airflow, Dramatiq, Pandas)\n- Leveraging rich ecosystem (Django, FastAPI)\n\n**Choose Go when:**\n- High-performance infrastructure tools (Kubernetes, OpenTelemetry)\n- Single binary deployment for simplified dependency management\n- Concurrency-critical systems\n\nI **select the appropriate tool based on problem characteristics**. Currently mainly using Python, but have experience developing OpenTelemetry Custom Exporter in Go.",
  },
  {
    id: 15,
    category1: "Backend",
    category2: "Spring",
    question: "What is your Spring Boot experience?",
    answer:
      "Experience with **Spring Boot microservices** in enterprise e-commerce platform.\n\n**Key Areas:**\n- Spring Cloud Eureka for service discovery\n- Integration with APISIX Gateway for routing\n- Oracle DB with MyBatis ORM\n- Performance optimization across complex application stacks\n- Circuit breaker and resilience patterns\n\n**Scale:** Supporting ₩500B annual revenue platform with 100K daily users.",
  },
  {
    id: 16,
    category1: "Backend",
    category2: "Django",
    question: "What is your Django experience?",
    answer:
      "Started backend development career with **Python Django**.\n\n**Projects:**\n- Virtual Try-on fitting room (national project)\n- AI model integration web service\n- RESTful API design and implementation\n- Vue.js frontend integration\n\n**Expertise:**\n- Django ORM and query optimization\n- Authentication and authorization\n- API design patterns\n- Integration with ML pipelines",
  },
  {
    id: 17,
    category1: "Backend",
    category2: "Database",
    question: "What is your database experience?",
    answer:
      "**Relational Databases:**\n- **Oracle DB**: Production e-commerce platform queries optimization\n- **PostgreSQL**: Airflow metadata DB, application databases\n- **MySQL/MariaDB**: Various web applications\n\n**NoSQL:**\n- **Redis Sentinel**: HA cluster for caching and session management\n- Experience with data modeling, indexing strategies\n\n**Data Warehousing:**\n- AWS Athena (Hive-based) for long-term analytics\n- Parquet format optimization and partitioning strategies",
  },

  // Frontend - Frameworks
  {
    id: 18,
    category1: "Frontend",
    category2: "React",
    question: "What is your React/Next.js experience?",
    answer:
      "**React/Next.js Experience:**\n- Current portfolio site built with **Next.js 16 (App Router)** + React 19\n- Production e-commerce platform frontend (React)\n- Component-driven development with modern React patterns\n\n**Technical Skills:**\n- Server Components and Client Components patterns\n- Static generation and dynamic rendering\n- Integration with HeroUI component library\n- Performance optimization (code splitting, lazy loading)\n- State management and data fetching patterns",
  },
  {
    id: 19,
    category1: "Frontend",
    category2: "Vue",
    question: "What is your Vue.js experience?",
    answer:
      "Extensive **Vue.js** experience across multiple production projects.\n\n**Major Projects:**\n- LG IXI Studio (Generative AI platform)\n- Virtual Try-on fitting room\n- Inoutbox POS system\n- Various enterprise web applications\n\n**Technical Skills:**\n- Component composition and reusability\n- Vuex state management\n- Integration with backend APIs\n- Element UI and other component libraries\n- Real-time data visualization (konva.js, Apache ECharts)",
  },
  {
    id: 20,
    category1: "Frontend",
    category2: "Build Tools",
    question: "What is your experience with Vite/build tools?",
    answer:
      "**Vite Experience:**\n- Resolved Vite prerender build issues with CodeMirror library\n- Modified open-source libraries for compatibility\n- Build optimization for production deployments\n\n**Other Build Tools:**\n- Webpack configuration and optimization\n- Turbopack with Next.js (current portfolio)\n- Bundle size optimization strategies\n- Hot module replacement (HMR) setup",
  },
  {
    id: 21,
    category1: "Frontend",
    category2: "Mobile",
    question: "What is your Flutter/mobile development experience?",
    answer:
      "**Flutter Development:**\n- **Campi** (Camping SNS): Custom image editing library in Dart\n- **Inoutbox**: Cross-platform mobile app (Android/iOS)\n- Implemented pinch-to-zoom, cropping, rotation, flip features\n- Gesture handling (scale, pan, drag) with aspect ratio processing\n\n**Mobile Expertise:**\n- Cross-platform development strategy\n- Platform-specific optimizations\n- FCM Push notifications integration\n- Offline-first architecture patterns",
  },

  // Problem Solving
  {
    id: 22,
    category1: "General",
    category2: "Problem Solving",
    question:
      "What was your most difficult technical problem and how did you solve it?",
    answer:
      "**(STAR Method)**\n\n**(Situation)** When joining idstrust, faced dual challenges:\n1. Legacy system (Oracle/Tomcat) modernization to Next.js/Spring\n2. Observability impossible for 100+ containers, failure detection took **18 hours**\n\n**(Task)** \n1. Design core architecture for new system and manage data migration\n2. Achieve complete observability and reduce failure detection time\n\n**(Action)**\n1. **Legacy Migration Lead**: Designed core modules, scaffold, and application architecture for Next.js/Spring\n2. **Airflow 5-server Cluster**: Built data migration pipeline handling statistical data, Data Lake, and near-realtime CDC\n3. **OpenTelemetry adoption**: Developed custom Exporter in Go, built Collectors on 12 servers\n4. **Data-driven persuasion**: Quantified costs and ROI to convince leadership\n\n**(Result)**\n- Successfully led legacy migration architecture design\n- Airflow cluster automated 200+ DAGs including data migration, CDC, and batch jobs\n- MTTI **reduced 99.5%** (18 hours → 10 minutes)\n- Data Lake enabling 10-year data retention (142x expansion)\n- OpenTelemetry open-source contributions",
  },
  {
    id: 23,
    category1: "General",
    category2: "Data-Driven",
    question: "Do you have experience with data-driven decision making?",
    answer:
      "Yes, I use data in all major decisions.\n\n**Case 1: Infrastructure Cost Optimization**\n- Analyzed S3 usage patterns with CloudWatch + EMF\n- Established data-driven Lifecycle policies\n- Result: 50% monthly cost reduction ($5K → $2.5K)\n\n**Case 2: OpenTelemetry Adoption**\n- Quantified 18-hour MTTI in actual engineering costs\n- Proved ROI with data\n- Result: Successfully convinced leadership\n\n**Case 3: Data Lake Construction**\n- Surveyed planning team's business metrics requirements\n- Measured and optimized Athena query performance with partitioning\n- Result: Visualized key metrics like retention and conversion rates",
  },
  {
    id: 24,
    category1: "General",
    category2: "Failure",
    question: "What was a failure experience and what did you learn?",
    answer:
      "During Inoutbox startup, initially **obsessed with technical perfection**, delaying launch.\n\n**Lessons Learned:**\n1. **MVP First**: Fast validation over perfect product\n2. **Business Value Focus**: Technology is a means, not the goal\n3. **Priority Management**: Maximum effect with limited resources\n\nAfter this experience, changed approach to **Fast POC → Validation → Incremental Improvement**, achieving better results in subsequent projects.",
  },

  // Collaboration
  {
    id: 25,
    category1: "General",
    category2: "Cross Functional",
    question: "What is your cross-functional team collaboration experience?",
    answer:
      '**Abacus - Frontend Project Leader:**\n- **Client (LG)**: Technical requirements coordination and weekly reports\n- **Internal Backend Team**: API spec negotiation and integration testing\n- **Frontend Team**: Technical guidance and code reviews\n- **Result**: Recognized as LG\'s sole technical partner, 300% revenue increase\n\n**idstrust - Data Platform Construction:**\n- **Planning Team**: Business metrics requirements interviews\n- **Marketing Team**: Acquisition, Conversion, Retention analysis environment\n- **Infrastructure Team**: S3, Glue, Athena architecture discussions\n- **Result**: Planning/Marketing teams can directly query and analyze data\n\n**Collaboration Philosophy:** "Transparency, ownership, shared success" - Clear goal setting and continuous communication',
  },
  {
    id: 26,
    category1: "General",
    category2: "Remote Work",
    question:
      "What is your remote work and asynchronous communication experience?",
    answer:
      "**Asynchronous Communication Tools:**\n- **Jira**: All work ticketed with detailed context\n- **Confluence**: Architecture design, decision documentation\n- **Slack**: Real-time collaboration, thread-based discussions\n- **GitHub**: Code reviews and technical discussions via PRs\n\n**Document-Centric Collaboration:**\n- Share **design docs + anticipated Q&A** before verbal explanations\n- Allow time for colleagues in different time zones to review and comment\n- Can read English technical documents without translation tools",
  },
  {
    id: 27,
    category1: "General",
    category2: "Conflict Resolution",
    question: "How do you resolve conflicts within a team?",
    answer:
      '**Case: OpenTelemetry Adoption Opposition**\n\n**(Situation)** Some opposed: "Installing agents on running services is risky", "Urgent business features need development"\n\n**(Action)**\n1. **Data-driven persuasion**: Converted last month\'s incident response time to cost\n2. **Risk minimization plan**: Detailed canary deployment and rollback plan\n3. **Quick Win presentation**: Validate effectiveness by applying to specific service within 1 week\n\n**(Result)** Convinced leadership, completed OTel adoption, 5-minute MTTI reduction secured team resources\n\n**Lesson:** Focus on **data and logic** rather than emotions, and **understand and address others\' concerns**',
  },

  // Leadership
  {
    id: 28,
    category1: "General",
    category2: "Leadership",
    question: "What is your leadership experience and style?",
    answer:
      "**Leadership Philosophy:**\n- **Pioneer Role**: Complete POC quickly alone or with small team, then invite team members\n- **End-to-End Interest**: Take interest in all roles to be helpful\n- **Root Problem Solving**: Prioritize solving core issues over patches\n- **Data-Driven Coordination**: Persuade and coordinate with stakeholders using data\n\n**Specific Cases:**\n- **Abacus**: Coordinated LG client-internal team-development team as Frontend Project Leader\n- **idstrust**: Led DX improvement by building developer sandbox environment\n- **Inoutbox**: End-to-End ownership experience as solo founder\n\n**Mentoring Philosophy:**\n- Confirm working with official docs, thorough research, and references\n- Emphasize fundamentals most important in AI era",
  },
  {
    id: 29,
    category1: "General",
    category2: "Disagreement",
    question: "How do you handle disagreements with team members?",
    answer:
      '1. **Listen**: Fully understand others\' opinions and concerns\n2. **Data-Based Discussion**: Discuss with objective metrics, not emotions\n3. **Experiment**: Try both approaches on small scale, then compare results\n4. **Document Decisions**: Record what decisions were made and why\n\n**Key:** Focus on "what\'s best for the business" rather than "who\'s right"',
  },

  // Additional Technical Questions
  {
    id: 30,
    category1: "Infrastructure",
    category2: "Redis",
    question: "What is your Redis experience?",
    answer:
      "Built and operate **Redis Sentinel HA cluster** for high availability.\n\n**Use Cases:**\n- Session management for distributed systems\n- Caching layer for database query optimization\n- Message broker for Airflow task queue\n- Rate limiting implementation\n\n**Scale:**\n- Supporting 100K daily users\n- Sub-millisecond latency requirements\n- Automatic failover with Sentinel",
  },
  {
    id: 31,
    category1: "Infrastructure",
    category2: "Cost Optimization",
    question: "How did you achieve 50% infrastructure cost reduction?",
    answer:
      "**Systematic Cost Optimization Approach:**\n\n1. **S3 Lifecycle Policies**: Automated data tiering and archival\n2. **EC2 Right-sizing**: Analyzed CloudWatch metrics to optimize instance types\n3. **Reserved Instances**: Committed to long-term for predictable workloads\n4. **Spot Instances**: For non-critical batch processing\n5. **Data Transfer Optimization**: Reduced cross-region/cross-AZ traffic\n\n**Results:** $5K → $2.5K monthly savings while maintaining performance",
  },
  {
    id: 32,
    category1: "Frontend",
    category2: "Performance",
    question: "What frontend performance optimization experience do you have?",
    answer:
      "**Major Optimizations:**\n\n**SK Drone Platform:**\n- 70% rendering improvement with Three.js LOD optimization\n- 85% loading time reduction for 50MB+ drone photos\n- WebP conversion + Progressive Loading + Web Worker\n- Prevented main thread blocking\n\n**General Techniques:**\n- Code splitting and lazy loading\n- Image optimization (WebP, responsive images)\n- Bundle size reduction\n- Critical CSS and above-the-fold optimization\n- Lighthouse score optimization",
  },
  {
    id: 33,
    category1: "Backend",
    category2: "API Design",
    question: "What is your API design philosophy?",
    answer:
      "**RESTful API Design Principles:**\n\n1. **Resource-Oriented**: Clear noun-based endpoints\n2. **Standard HTTP Methods**: Proper use of GET, POST, PUT, DELETE\n3. **Versioning**: URL-based versioning (/v1/, /v2/)\n4. **Error Handling**: Consistent error response format\n5. **Documentation**: OpenAPI/Swagger specs\n6. **Security**: Authentication, rate limiting, input validation\n\n**Experience:**\n- Go-Gin RESTful API for Inoutbox\n- Django REST framework\n- Spring Boot microservices\n- GraphQL evaluation and implementation",
  },
  {
    id: 34,
    category1: "Infrastructure",
    category2: "Security",
    question: "What is your security experience?",
    answer:
      "**Security Implementations:**\n\n- **Authentication**: OAuth2, JWT\n- **Authorization**: RBAC across all Gateway traffic\n- **Network Security**: VPC design, security groups, NACLs\n- **Secrets Management**: AWS Secrets Manager, parameter store\n- **WAF**: Web Application Firewall for LG projects\n- **Compliance**: Following security best practices for enterprise clients\n\n**Approach:**\n- Security by design, not afterthought\n- Regular security audits and updates\n- Principle of least privilege",
  },
  {
    id: 35,
    category1: "General",
    category2: "Learning",
    question: "How do you stay updated with new technologies?",
    answer:
      "**Continuous Learning Approach:**\n\n1. **Hands-on Practice**: Build side projects with new tech\n2. **Certifications**: CKA, AWS DevOps Pro, LFCS - validates deep knowledge\n3. **Open Source**: Contributing to OpenTelemetry project\n4. **Technical Blogs**: Reading engineering blogs from major tech companies\n5. **Documentation**: Always reading official docs first\n6. **Community**: Attending conferences, meetups, technical discussions\n\n**Recent Focus:**\n- OpenTelemetry ecosystem\n- eBPF for observability\n- Platform engineering practices\n- AI-powered development tools",
  },
  {
    id: 36,
    category1: "General",
    category2: "Work Style",
    question: "Describe your work style and approach.",
    answer:
      "**Work Philosophy:**\n\n1. **Data-Driven**: Every decision backed by metrics and analysis\n2. **Documentation First**: Write design docs before coding\n3. **Automation**: If doing it twice, automate it\n4. **Fast Feedback**: POC → Validate → Iterate quickly\n5. **Ownership**: End-to-end responsibility for my work\n6. **Collaboration**: Proactive communication and knowledge sharing\n\n**Daily Practices:**\n- Morning: Review metrics, check alerts, plan daily tasks\n- Afternoon: Deep work sessions, code reviews\n- Evening: Documentation, learning, planning next day",
  },
  {
    id: 37,
    category1: "Infrastructure",
    category2: "Disaster Recovery",
    question:
      "What is your disaster recovery and high availability experience?",
    answer:
      "**HA Architecture Implementations:**\n\n- **Multi-AZ Deployment**: ECS Fargate across availability zones\n- **Database HA**: Redis Sentinel, RDS Multi-AZ\n- **Gateway HA**: APISIX cluster configuration\n- **Backup Strategy**: Automated backups, point-in-time recovery\n- **Monitoring**: 24/7 alerting for critical systems\n\n**Recovery Procedures:**\n- Documented runbooks for common failures\n- Regular disaster recovery drills\n- RTO/RPO targets defined and tested\n- Automated rollback mechanisms",
  },
  {
    id: 38,
    category1: "Backend",
    category2: "Testing",
    question: "What is your testing strategy?",
    answer:
      "**Testing Approach:**\n\n1. **Unit Tests**: Core business logic coverage\n2. **Integration Tests**: API endpoints and database interactions\n3. **End-to-End Tests**: Critical user flows\n4. **Load Testing**: Performance under expected traffic\n5. **Chaos Engineering**: Fault injection for resilience testing\n\n**Quality Practices:**\n- Test coverage monitoring\n- CI/CD integration for automated testing\n- Code review processes\n- Static analysis tools\n- Canary deployments for production validation",
  },
  {
    id: 39,
    category1: "General",
    category2: "Career Goals",
    question: "What are your career goals for the next 3-5 years?",
    answer:
      "**Short-term (1-2 years):**\n- Deepen expertise in platform engineering and observability\n- Contribute more significantly to open-source projects\n- Mentor junior engineers and share knowledge\n- Expand to multi-cloud and edge computing\n\n**Medium-term (3-5 years):**\n- Technical leadership role (Staff/Principal Engineer)\n- Architect large-scale distributed systems from scratch\n- Speak at major technical conferences\n- Build reputation as subject matter expert in infrastructure\n\n**Long-term Vision:**\n- Bridge technical excellence with business value\n- Influence industry best practices\n- Potentially start technical consulting or products",
  },

  // Additional General Questions
  {
    id: 40,
    category1: "General",
    category2: "Self Introduction",
    question: "What are your greatest strengths as an engineer?",
    answer:
      "**1. Data-Driven Problem Solving:**\nI excel at quantifying problems and proving solutions with metrics. For example, I reduced MTTI from 18 hours to 10 minutes (99% reduction) by implementing OpenTelemetry, and convinced leadership using cost analysis.\n\n**2. End-to-End Platform Ownership:**\nFrom Inoutbox solo platform development to leading TheShop infrastructure operations, I take complete responsibility for projects from conception to production.\n\n**3. Cross-Functional Collaboration:**\nSuccessfully coordinated with LG clients, planning teams, marketing teams, and development teams across multiple companies, delivering measurable business results.\n\n**4. Continuous Learning:**\nCKA, AWS DevOps Pro, LFCS certifications demonstrate my commitment to deep technical expertise. Contributing to OpenTelemetry open-source project validates practical application.",
  },
  {
    id: 41,
    category1: "General",
    category2: "Self Introduction",
    question: "What are your biggest weaknesses?",
    answer:
      "**1. Perfectionism (Managed):**\nEarly in my career at Inoutbox, I delayed launches pursuing technical perfection. I've learned to balance quality with delivery speed through MVP approach and iterative improvement.\n\n**2. Impatience with Inefficiency:**\nWhen I see inefficient processes, I want to fix them immediately. I'm learning to prioritize improvements based on ROI and team capacity rather than tackling everything at once.\n\n**3. Over-Engineering Tendency:**\nI sometimes design solutions for scale beyond immediate needs. I now actively practice YAGNI (You Aren't Gonna Need It) principle and focus on solving today's problems first.\n\n**How I Address These:**\n- Set clear timelines and MVP scopes before starting projects\n- Use data to justify optimization efforts\n- Regular code reviews and architecture discussions with team\n- Focus on incremental improvements rather than big rewrites",
  },
  {
    id: 42,
    category1: "General",
    category2: "Company Interest",
    question: "What do you know about our company?",
    answer:
      "**Research Approach:**\nI researched your company through:\n- Engineering blog and technical publications\n- Tech stack analysis (job descriptions, LinkedIn, GitHub)\n- Company culture and values (reviews, interviews)\n- Recent news, funding, and product launches\n- Industry position and competitive landscape\n\n**What Interests Me:**\n1. **Technical Challenges**: [Specific tech/scale mentioned in job description]\n2. **Engineering Culture**: [Specific culture aspects - e.g., data-driven, innovation, autonomy]\n3. **Impact**: [Specific products/services and their market impact]\n4. **Growth**: [Specific opportunities - e.g., cloud migration, platform engineering]\n\n**Questions I Have:**\n- What's the biggest technical challenge the team is facing?\n- How does the team balance innovation with stability?\n- What does success look like in the first 6 months?",
  },
  {
    id: 43,
    category1: "General",
    category2: "Work Style",
    question: "How do you handle pressure and tight deadlines?",
    answer:
      "**Pressure Management Strategy:**\n\n**1. Prioritization:**\n- Identify critical path and blockers immediately\n- Focus on MVP features that deliver core value\n- Communicate trade-offs clearly to stakeholders\n\n**2. Time Management:**\n- Break large tasks into small, deliverable chunks\n- Use timeboxing for research and decision-making\n- Protect deep work time for complex problems\n\n**3. Communication:**\n- Early escalation of risks and blockers\n- Daily progress updates to keep stakeholders informed\n- Clear documentation of decisions and assumptions\n\n**Real Example - LG IXI Studio:**\nFaced tight development deadline for POC. Improved Chat and Code Editor quality by:\n- Focusing on core SSE streaming functionality first\n- Leveraging existing libraries (CodeMirror) instead of building from scratch\n- Parallel development of frontend and backend\n- Result: Delivered on time and met quality standards",
  },
  {
    id: 44,
    category1: "General",
    category2: "Work Style",
    question: "Describe your ideal work environment.",
    answer:
      "**Cultural Values:**\n1. **Data-Driven Decisions**: Metrics-based discussions rather than opinions\n2. **Psychological Safety**: Freedom to experiment and learn from failures\n3. **Technical Excellence**: High standards for code quality and architecture\n4. **Continuous Learning**: Support for conferences, certifications, and experimentation\n\n**Team Dynamics:**\n- Cross-functional collaboration with clear ownership\n- Asynchronous communication with good documentation\n- Regular technical discussions and knowledge sharing\n- Balanced autonomy and collaboration\n\n**Work Practices:**\n- Flexible work hours respecting deep work time\n- Remote-first or hybrid with strong async culture\n- Modern tooling (GitHub, Jira, Slack, Confluence)\n- CI/CD automation and infrastructure as code\n\n**What Matters Less:**\n- Office location or specific work hours\n- Company size or stage (startup vs enterprise)\n- Specific tech stack (I adapt quickly)",
  },
  {
    id: 45,
    category1: "General",
    category2: "Career Change",
    question: "What motivates you in your work?",
    answer:
      "**1. Impact and Measurable Results:**\nSeeing direct business impact from my work. Examples:\n- 99% MTTI reduction enabling faster feature delivery\n- 50% cost savings freeing budget for innovation\n- Developer productivity improvements measured in hours saved\n\n**2. Technical Challenges:**\nSolving complex problems at scale:\n- Operating systems handling 100K+ daily users\n- Processing billions of messages daily\n- Building observability for 100+ microservices\n\n**3. Continuous Learning:**\nExpanding my technical depth:\n- Earning CKA, AWS DevOps Pro certifications\n- Contributing to OpenTelemetry open-source\n- Exploring new technologies (eBPF, platform engineering)\n\n**4. Team Growth:**\nHelping others succeed:\n- Mentoring through knowledge sharing sessions\n- Building tools that improve developer experience\n- Creating documentation that accelerates onboarding\n\n**5. Building Systems That Last:**\nCreating maintainable, scalable infrastructure that serves the business long-term, not just solving today's problems.",
  },
  {
    id: 46,
    category1: "General",
    category2: "Career Change",
    question: "Why are you leaving your current position?",
    answer:
      "I'm **not leaving due to dissatisfaction** - I've achieved significant results at my current company:\n- Built observability platform reducing MTTI 99%\n- Optimized infrastructure costs by 50%\n- Established data platform for business analytics\n\n**Reasons for Seeking New Challenge:**\n\n**1. Scale:**\nLooking to work on larger-scale systems with global reach. Current platform serves 100K daily users; interested in 10x-100x scale.\n\n**2. Technical Growth:**\nWant to expand expertise in:\n- Multi-region/multi-cloud architectures\n- Global distributed systems\n- Platform engineering at scale\n- Advanced observability patterns\n\n**3. Team and Culture:**\nSeek environment with:\n- Larger, more diverse engineering teams\n- Stronger open-source contribution culture\n- Advanced DevOps/SRE practices\n- International collaboration opportunities\n\n**4. Career Progression:**\nReady for next level of technical leadership and architectural responsibility.\n\n**Timeline:**\nCommitted to smooth handover and proper documentation before transition.",
  },
  {
    id: 47,
    category1: "General",
    category2: "Company Interest",
    question: "How do you evaluate a company before joining?",
    answer:
      "**Technical Evaluation:**\n1. **Engineering Culture:**\n   - Engineering blog quality and frequency\n   - Open-source contributions and community presence\n   - Tech stack modernity and adoption of best practices\n   - Technical debt management approach\n\n2. **Team Structure:**\n   - Engineer-to-manager ratio\n   - On-call practices and work-life balance\n   - Career progression paths\n   - Cross-functional collaboration patterns\n\n**Business Evaluation:**\n3. **Product and Market:**\n   - Product-market fit and growth trajectory\n   - Competitive positioning\n   - Revenue model and financial health\n   - Customer satisfaction and retention\n\n4. **People and Culture:**\n   - Employee reviews (Glassdoor, Blind)\n   - Diversity and inclusion initiatives\n   - Learning and development support\n   - Leadership quality and vision\n\n**Red Flags to Avoid:**\n- High engineering turnover\n- Lack of technical documentation\n- Unclear technical decision-making process\n- Poor work-life balance indicators\n- Unrealistic promises during interview",
  },
  {
    id: 48,
    category1: "General",
    category2: "Salary",
    question: "How do you evaluate your worth/value?",
    answer:
      "**Quantifiable Impact:**\n1. **Cost Savings**: 50% infrastructure cost reduction ($60K annually)\n2. **Productivity Gains**: 99% MTTI reduction saving ~100 engineering hours/month\n3. **Revenue Enablement**: Supporting ₩500B annual revenue platform\n4. **Scale**: Managing 100K+ daily users, 20TB+ monthly data\n\n**Technical Expertise:**\n- **Certifications**: CKA, AWS DevOps Pro, LFCS (top-tier validations)\n- **Breadth**: Platform Engineering + Infrastructure + Data Engineering\n- **Depth**: 6 years specialized experience in distributed systems\n\n**Market Comparison:**\n- Senior SRE/Platform Engineer with CKA + AWS Pro\n- 6 years experience in e-commerce/high-traffic systems\n- Proven leadership in technical initiatives\n- Open-source contributions\n\n**Unique Value:**\n- End-to-end ownership from solo startup to enterprise\n- Data-driven approach to technical decisions\n- Cross-functional collaboration with business stakeholders\n- Rapid learning and certification acquisition\n\n**Salary Range:**\nBased on market research and my capabilities, I expect compensation in the [X-Y] range, but I'm flexible based on total compensation package including growth opportunities.",
  },
  {
    id: 49,
    category1: "General",
    category2: "Problem Solving",
    question:
      "Tell me about a time you had to learn something completely new quickly.",
    answer:
      "**Situation: LG IXI Studio - SSE (Server-Sent Events)**\n\nJoined project with tight deadline requiring real-time AI response streaming. Had never implemented SSE protocol before.\n\n**Challenge:**\n- 2 weeks to deliver working POC\n- Complex integration with AI models\n- Frontend and backend both needed SSE\n- Quality standards couldn't be compromised\n\n**Learning Approach:**\n1. **Official Documentation First** (1 day):\n   - MDN Web Docs for SSE specification\n   - Backend framework (Node.js) SSE libraries\n   - Vue.js SSE client implementations\n\n2. **Hands-on Experimentation** (2 days):\n   - Built simple SSE prototype\n   - Tested connection handling, reconnection, error scenarios\n   - Identified gotchas and edge cases\n\n3. **Reference Implementation Study** (1 day):\n   - Analyzed open-source projects using SSE\n   - Studied production patterns and best practices\n\n4. **Implementation** (1 week):\n   - Applied learnings to actual project\n   - Iterative testing and refinement\n   - Documentation for team\n\n**Result:**\n- Delivered on time with working SSE implementation\n- Achieved stable real-time streaming\n- Expanded technical spectrum with new protocol expertise\n- Shared knowledge with team through tech session\n\n**Key Lesson:**\n**Official docs + Hands-on practice + Reference code** = Fastest path to production-ready knowledge",
  },
  {
    id: 50,
    category1: "General",
    category2: "Problem Solving",
    question: "How do you approach debugging a complex production issue?",
    answer:
      "**Systematic Debugging Process:**\n\n**1. Gather Information (10 minutes):**\n- When did it start? (Correlation with deployments)\n- What's the impact? (Affected users, services)\n- What changed recently? (Code, config, infrastructure)\n- Check monitoring: logs, metrics, traces\n\n**2. Form Hypothesis (5 minutes):**\n- List possible causes based on symptoms\n- Prioritize by probability and impact\n- Consider recent changes first\n\n**3. Test Hypothesis (Iterative):**\n- Start with least invasive checks\n- Use distributed tracing to follow request path\n- Check external dependencies (DB, cache, APIs)\n- Reproduce in non-production if possible\n\n**4. Implement Fix:**\n- Quick mitigation first (rollback, circuit breaker)\n- Proper fix with testing afterward\n- Monitor closely after deployment\n\n**5. Post-Mortem:**\n- Document timeline and root cause\n- Identify prevention measures\n- Update runbooks and alerts\n\n**Real Example - TheShop:**\nIntermittent 500 errors on checkout:\n1. **Traced** with OpenTelemetry: Timeout in payment service\n2. **Found** DB connection pool exhaustion\n3. **Mitigated** Increased pool size temporarily\n4. **Root Cause** N+1 query in new feature\n5. **Fixed** Optimized query, added monitoring\n6. **Prevented** Added query performance testing to CI/CD",
  },
  {
    id: 51,
    category1: "General",
    category2: "Communication",
    question:
      "How do you explain technical concepts to non-technical stakeholders?",
    answer:
      '**Communication Strategy:**\n\n**1. Start with Business Impact:**\n❌ "We need to implement distributed tracing with OpenTelemetry"\n✅ "We can reduce bug fix time from 18 hours to 10 minutes, saving 8 engineering hours per incident"\n\n**2. Use Analogies:**\n- **Distributed Tracing**: Like GPS tracking for a package, we can see exactly where requests go wrong\n- **Caching**: Like keeping frequently used documents on your desk instead of filing cabinet\n- **Load Balancing**: Like multiple checkout lanes at a store instead of one long line\n\n**3. Visual Aids:**\n- Architecture diagrams with clear flows\n- Before/after metrics comparisons\n- Cost analysis charts\n- Timeline visualizations\n\n**4. Focus on Outcomes, Not Technology:**\n- "Faster feature delivery" not "CI/CD pipeline"\n- "99.9% uptime" not "Kubernetes HA cluster"\n- "50% cost reduction" not "EC2 right-sizing"\n\n**5. Anticipate Questions:**\n- Prepare cost/benefit analysis\n- Have risk mitigation plan\n- Show similar success cases\n- Provide realistic timeline\n\n**Real Example - Data Lake Presentation:**\nTo planning team: "Currently we can only see last 7 days of data. With data lake, you\'ll have 10 years of history to analyze trends, seasonality, and customer behavior for better business decisions. Cost: $2K/month. Value: Better forecasting and strategy."',
  },
  {
    id: 52,
    category1: "General",
    category2: "Communication",
    question:
      "Describe a situation where you had to give difficult feedback to a colleague.",
    answer:
      '**Situation:**\nJunior engineer repeatedly submitting PRs without proper testing, causing production bugs and requiring multiple review cycles.\n\n**Approach:**\n\n**1. Prepared Specific Examples:**\n- Collected 3-4 recent PRs with issues\n- Noted impact: rollbacks, customer complaints, wasted review time\n- Gathered metrics: average PR revision count, bug rate\n\n**2. Private 1-on-1 Conversation:**\n- Started with positive: acknowledged hard work and quick delivery\n- Presented data objectively, not emotionally\n- Focused on behavior, not personality\n- Asked open-ended question: "What\'s preventing thorough testing?"\n\n**3. Understood Root Cause:**\n- Discovered: Felt pressure to deliver fast\n- Lacked understanding of testing best practices\n- Unsure how to write effective tests\n\n**4. Collaborative Solution:**\n- Set clear expectation: All PRs need tests and local verification\n- Offered help: Paired on writing first few test cases\n- Shared resources: Testing guides, examples from codebase\n- Established checklist for PR self-review\n\n**5. Follow-up:**\n- Weekly check-ins for first month\n- Celebrated improvements publicly\n- Adjusted expectations based on progress\n\n**Result:**\n- PR quality improved significantly\n- Bug rate decreased 70% within 2 months\n- Engineer gained confidence in testing\n- Relationship strengthened through honest communication\n\n**Key Lesson:**\n**Data + Empathy + Support** = Effective feedback that drives improvement',
  },
  {
    id: 53,
    category1: "General",
    category2: "Learning",
    question: "What technical book or resource has influenced you the most?",
    answer:
      '**Most Influential Resources:**\n\n**1. "Designing Data-Intensive Applications" by Martin Kleppmann:**\n- Changed how I think about distributed systems\n- Deepened understanding of trade-offs in system design\n- Applied concepts in Kafka, data lake, and cache architectures\n- Go-to reference for distributed system decisions\n\n**2. "Site Reliability Engineering" by Google:**\n- Shaped my SRE philosophy and practices\n- SLI/SLO concepts applied to TheShop operations\n- Error budgets influence deployment strategies\n- On-call best practices implementation\n\n**3. Kubernetes Official Documentation:**\n- Foundation for CKA certification preparation\n- Continuously reference for production operations\n- Taught me value of high-quality documentation\n\n**4. AWS Well-Architected Framework:**\n- Guides cloud architecture decisions\n- Influenced cost optimization strategies\n- Shaped security and reliability practices\n\n**5. OpenTelemetry Documentation + Community:**\n- Learning observability best practices\n- Active participation shaped my understanding\n- Contributing back deepens knowledge\n\n**Learning Philosophy:**\n- **Official docs first** for authoritative knowledge\n- **Books for fundamentals** that don\'t change\n- **Blogs/talks for patterns** and real-world application\n- **Open source code** for implementation details\n- **Hands-on practice** to solidify understanding',
  },
  {
    id: 54,
    category1: "General",
    category2: "Career Goals",
    question: "Where do you see yourself in 10 years?",
    answer:
      "**10-Year Vision:**\n\n**Technical Path (Primary):**\n- **Staff/Principal Engineer** or **Distinguished Engineer** role\n- Recognized expert in **platform engineering and observability**\n- Regular speaker at major conferences (KubeCon, AWS re:Invent)\n- Significant open-source contributions with maintainer roles\n- Published technical articles reaching thousands of engineers\n\n**Impact I Want to Make:**\n1. **Industry Influence:**\n   - Shape best practices in cloud-native observability\n   - Contribute to standards and specifications\n   - Mentor next generation of platform engineers\n\n2. **Technical Excellence:**\n   - Architect systems handling millions of users\n   - Solve previously unsolved infrastructure challenges\n   - Pioneer new approaches to developer experience\n\n3. **Knowledge Sharing:**\n   - Write technical book on platform engineering\n   - Create educational content (blog, videos, courses)\n   - Build tools that benefit wider community\n\n**Alternative Paths (Open):**\n- **Technical Leadership**: VP of Engineering or CTO if right opportunity\n- **Consulting**: Independent consultant for high-growth companies\n- **Entrepreneurship**: Technical co-founder of infrastructure startup\n\n**Non-Negotiables:**\n- Stay hands-on technical (writing code, solving problems)\n- Work on meaningful problems at scale\n- Continuous learning and growth\n- Healthy work-life balance\n\n**What I'm Building Toward:**\nReputation as go-to expert when companies need to scale infrastructure from thousands to millions of users.",
  },
  {
    id: 55,
    category1: "General",
    category2: "Self Introduction",
    question: "What makes you different from other candidates?",
    answer:
      "**Unique Combination:**\n\n**1. Breadth AND Depth:**\nMost engineers specialize in one area. I have:\n- **Infrastructure**: Kubernetes, AWS, monitoring, data pipelines\n- **Backend**: Go, Python, Django, Spring Boot\n- **Frontend**: React, Vue, Flutter\n- **Data**: Data lakes, analytics, observability\n\nThis enables **end-to-end platform ownership** and **cross-functional collaboration**.\n\n**2. Startup to Enterprise Experience:**\n- Solo platform development at Inoutbox (0→1)\n- Small team at Intellisys/Abacus (1→10)\n- Enterprise scale at idstrust (₩500B revenue, 100K users)\n\nI understand challenges at every stage and can operate in any environment.\n\n**3. Data-Driven Everything:**\nEvery major decision backed by metrics:\n- 99% MTTI reduction (18h → 10min)\n- 50% cost savings ($5K → $2.5K/month)\n- 90% deployment speedup (2h → 12min)\n- 142x log retention (7 days → 10 years)\n\n**4. Proven Leadership Without Title:**\n- Led OpenTelemetry adoption despite initial resistance\n- Project leader for LG client engagements\n- Built systems now used by 100K+ daily users\n\n**5. Rapid Skill Acquisition:**\n- CKA, AWS DevOps Pro, LFCS in 6 months\n- Learned SSE protocol in 2 weeks for production\n- Contributing to OpenTelemetry within months of adoption\n\n**6. Business Impact Focus:**\nNot just building technology—driving business outcomes:\n- Infrastructure supporting ₩500B revenue\n- Enabling faster feature delivery\n- Reducing operational costs\n- Improving developer productivity\n\n**Bottom Line:**\nI bring **technical depth, business acumen, and proven execution** at scale.",
  },
];
