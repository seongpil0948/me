import type { InterviewQuestion } from "@/types/portfolio";

export const backendQuestions: InterviewQuestion[] = [
  {
    id: 16,
    category1: "Backend",
    category2: "Go vs Python",
    question: "Between Go and Python, which would you choose and why?",
    answer:
      "**Choose Python when:**\n- Fast prototyping and development speed are critical\n- ML/data pipelines (Airflow, Dramatiq, Pandas)\n- Leveraging rich ecosystem (Django, FastAPI)\n\n**Choose Go when:**\n- High-performance infrastructure tools (Kubernetes, OpenTelemetry)\n- Single binary deployment for simplified dependency management\n- Concurrency-critical systems\n\nI **select the appropriate tool based on problem characteristics**. Currently mainly using Python, but have experience developing OpenTelemetry Custom Exporter in Go.",
  },
  {
    id: 17,
    category1: "Backend",
    category2: "Spring",
    question: "What is your Spring Boot experience?",
    answer:
      "Experience with **Spring Boot microservices** in enterprise e-commerce platform.\n\n**Key Areas:**\n- Spring Cloud Eureka for service discovery\n- Integration with APISIX Gateway for routing\n- Oracle DB with MyBatis ORM\n- Performance optimization across complex application stacks\n- Circuit breaker and resilience patterns\n\n**Scale:** Supporting ₩500B annual revenue platform with 100K daily users.",
  },
  {
    id: 18,
    category1: "Backend",
    category2: "Django",
    question: "What is your Django experience?",
    answer:
      "Started backend development career with **Python Django**.\n\n**Projects:**\n- Virtual Try-on fitting room (national project)\n- AI model integration web service\n- RESTful API design and implementation\n- Vue.js frontend integration\n\n**Expertise:**\n- Django ORM and query optimization\n- Authentication and authorization\n- API design patterns\n- Integration with ML pipelines",
  },
  {
    id: 19,
    category1: "Backend",
    category2: "Database",
    question: "What is your database experience?",
    answer:
      "**Relational Databases:**\n- **Oracle DB**: Production e-commerce platform queries optimization\n- **PostgreSQL**: Airflow metadata DB, application databases\n- **MySQL/MariaDB**: Various web applications\n\n**NoSQL:**\n- **Redis Sentinel**: HA cluster for caching and session management\n- Experience with data modeling, indexing strategies\n\n**Data Warehousing:**\n- AWS Athena (Hive-based) for long-term analytics\n- Parquet format optimization and partitioning strategies",
  },
  {
    id: 35,
    category1: "Backend",
    category2: "API Design",
    question: "What is your API design philosophy?",
    answer:
      "**RESTful API Design Principles:**\n\n1. **Resource-Oriented**: Clear noun-based endpoints\n2. **Standard HTTP Methods**: Proper use of GET, POST, PUT, DELETE\n3. **Versioning**: URL-based versioning (/v1/, /v2/)\n4. **Error Handling**: Consistent error response format\n5. **Documentation**: OpenAPI/Swagger specs\n6. **Security**: Authentication, rate limiting, input validation\n\n**Experience:**\n- Go-Gin RESTful API for Inoutbox\n- Django REST framework\n- Spring Boot microservices\n- GraphQL evaluation and implementation",
  },
  {
    id: 40,
    category1: "Backend",
    category2: "Testing",
    question: "What is your testing strategy?",
    answer:
      "**Testing Approach:**\n\n1. **Unit Tests**: Core business logic coverage\n2. **Integration Tests**: API endpoints and database interactions\n3. **End-to-End Tests**: Critical user flows\n4. **Load Testing**: Performance under expected traffic\n5. **Chaos Engineering**: Fault injection for resilience testing\n\n**Quality Practices:**\n- Test coverage monitoring\n- CI/CD integration for automated testing\n- Code review processes\n- Static analysis tools\n- Canary deployments for production validation",
  },
];
