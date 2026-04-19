import type { LocalizedInterviewQuestion } from "@/types/portfolio";

/**
 * Soft Skills & Philosophy 질문들
 * ID: 75 및 기타 소프트 스킬 관련 질문들
 */
export const infraSoftSkillsQuestions: LocalizedInterviewQuestion[] = [
  {
    id: 75,
    category1: "Infrastructure",
    category2: "Philosophy",
    question: { ko: "인프라 엔지니어링에 대한 철학은 무엇인가요?" },
    answer: {
      ko:
        "장애 대응하면서 로그 18시간 뒤지던 경험이 제일 힘들었어요. '이건 엔지니어링이 아니라 운에 맡기는 거구나'라고 느꼈죠. 그때부터 Observability를 최우선으로 두게 되었습니다. 측정할 수 없으면 개선할 수 없거든요.\n\n" +
        "**Observability First**: 모든 시스템 변경 전에 먼저 '이 상태를 어떻게 관찰할 것인가'를 정의합니다. OpenTelemetry 기반으로 Trace-Metric-Log를 하나의 Trace ID로 연결하는 구조를 갖추면, 장애가 발생해도 Grafana에서 Root Cause를 10분 내 찾을 수 있어요. MTTD 18시간 → 10분 단축이 이 철학의 결과입니다.\n\n" +
        "**Infrastructure as Code**: 수동 설정은 결국 누군가 실수하게 되어 있어요. Terraform + Jenkins 파이프라인에 Destroy Guard를 추가한 것도 이 철학에서 나왔습니다. '무엇을 했나'가 아니라 '왜 그렇게 했나'가 git commit에 남아야 합니다.\n\n" +
        "**시스템 방어 설계**: 처음엔 '누가 실수했나'를 찾았는데, 지금은 '왜 시스템이 이런 실수를 허용했나'를 먼저 봅니다. 사람은 실수하게 되어 있으니 시스템이 방어해야 하죠.\n\n" +
        "**운영 복잡도 우선 평가**: 신기술 도입 시 '이 기술이 장애 나면 새벽 2시에 내가 혼자 복구할 수 있나?'를 먼저 물어봅니다. Rook-Ceph는 강력하지만 운영 복잡도가 높아서 모니터링 체계와 runbook을 먼저 만들고 도입했어요.",
      en: "A concise Philosophy answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 142,
    category1: "Infrastructure",
    category2: "Philosophy",
    question: {
      ko: "SRE와 DevOps의 차이를 어떻게 이해하나요? 현업에서 두 역할을 어떻게 구분해서 일하나요?",
    },
    answer: {
      ko:
        "SRE와 DevOps는 같은 목표(신뢰할 수 있는 소프트웨어 빠르게 배포)를 다른 관점에서 접근합니다.\n\n" +
        "**제가 이해하는 차이**\n\n" +
        "- **DevOps**: 개발과 운영의 경계를 허무는 문화/프로세스. CI/CD 자동화, 코드로서의 인프라, 배포 속도에 집중.\n" +
        "- **SRE (Site Reliability Engineering)**: Google이 소프트웨어 엔지니어링 방식으로 운영 문제를 해결하는 방법론. SLI/SLO/Error Budget으로 신뢰성을 정량화하고, Toil을 자동화로 줄이는 데 집중.\n\n" +
        "핵심 차이는 **Error Budget**입니다. SRE는 '이만큼의 장애는 허용한다'는 에러 버짓을 정하고, 그 범위 내에서 빠른 배포와 안정성의 균형을 잡아요. DevOps는 이런 명시적 숫자 없이 '더 빠르게, 더 안전하게'를 추구하는 경향이 있죠.\n\n" +
        "**현업에서 실제로 하는 일**\n\n" +
        "저는 두 역할을 모두 수행하는데, 상황에 따라 모자를 바꿔 씁니다:\n\n" +
        "**SRE 모자를 쓸 때:**\n" +
        "- OpenTelemetry로 MTTD를 99% 단축한 것 → 전형적인 SRE 작업\n" +
        "- Kafka Sentinel HA, Redis HA 구성 → 서비스 신뢰성 확보\n" +
        "- 장애 포스트모템 작성 → 재발 방지 시스템 개선\n" +
        "- Airflow SLA 설정, DAG 실패율 92%→99.5% 개선 → SLO 달성\n\n" +
        "**DevOps 모자를 쓸 때:**\n" +
        "- GitLab CI + Argo CD 파이프라인 구축 → 배포 자동화\n" +
        "- Terraform + Jenkins → IaC로 인프라 코드화\n" +
        "- ECR + Argo Image Updater → 이미지 태그 수동 수정 제거\n" +
        "- 개발자 샌드박스 환경 자동화 → 개발자 경험 개선\n\n" +
        "**실제로 가장 중요했던 판단**\n\n" +
        "결제 API P99 latency가 8초일 때 '당장 스케일업으로 해결하자' vs '근본 원인(N+1 쿼리)을 해결하자' 사이에서 SRE 관점을 취했어요. 임시 조치로 Connection Pool 크기를 늘리고(DevOps), 근본 원인은 백엔드 팀과 협업해서 쿼리 최적화로 해결했습니다(SRE). 두 관점의 균형이 중요합니다.",
      en: "A concise Philosophy answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 143,
    category1: "Infrastructure",
    category2: "Philosophy",
    question: {
      ko: "온프레미스와 클라우드 중 무엇을 선택할지 어떤 기준으로 판단하나요?",
    },
    answer: {
      ko:
        "이 판단을 가장 많이 해본 게 TheShop IDC 이전 프로젝트였어요. 결론부터 말하면 **'워크로드 성격에 따라 최적의 환경이 다르다'**입니다. 저는 지금 EKS + 온프레미스 K8s + ECS를 동시에 운영하며 이 철학을 실천하고 있어요.\n\n" +
        "**온프레미스를 유지한 워크로드**\n\n" +
        "- **Oracle DB + 레거시 Java 시스템**: IDC → AWS 이전 비용과 재인증 리스크가 너무 컸어요. Kafka CDC로 데이터를 AWS RDS로 점진적으로 이관하면서 레거시는 온프레미스에 유지.\n" +
        "- **Scouter APM + ClickHouse**: 사내 모든 서버의 메트릭을 수집하는 워크로드. 데이터 볼륨이 매우 크고 레이턴시가 중요해서 온프레미스 Kubernetes에서 운영.\n" +
        "- **Rook-Ceph 분산 스토리지**: EKS EBS는 단일 AZ 제약이 있어요. RWX (Read-Write-Many)가 필요한 워크로드는 CephFS를 통해 온프레미스에서 처리.\n\n" +
        "**클라우드(EKS)를 선택한 워크로드**\n\n" +
        "- **AI 에이전트 서비스**: AWS Bedrock, ECR, S3 Vectors와의 통합이 필수. Pod Identity로 IAM 역할을 Pod에 직접 부여하는 방식이 온프레미스에서는 구현하기 어렵습니다.\n" +
        "- **GitLab + Argo CD**: GitLab을 EC2에서 EKS Managed NodeGroup으로 이전. Auto-scaling과 On-Demand/Spot 혼합으로 비용 최적화.\n" +
        "- **애플리케이션 서버 (마이그레이션 중)**: 레거시에서 벗어나는 신규 마이크로서비스는 EKS로.\n\n" +
        "**판단 기준 체크리스트**\n\n" +
        "1. **AWS 서비스 의존성**: Bedrock, RDS, S3 등 AWS Native 서비스가 필요하면 EKS/ECS\n" +
        "2. **데이터 볼륨 + 레이턴시**: 매우 크거나 레이턴시가 중요하면 온프레미스 유리\n" +
        "3. **규제/컴플라이언스**: 데이터 국외 반출 제약이 있으면 온프레미스\n" +
        "4. **팀 운영 역량**: 온프레미스는 커널/네트워크/스토리지까지 직접 관리해야 함\n" +
        "5. **스케일링 패턴**: 예측 불가능한 burst → 클라우드, 안정적인 부하 → 온프레미스\n\n" +
        "핵심은 '전부 클라우드로'나 '전부 온프레미스로'가 아니라 **'각 워크로드의 특성에 맞는 환경을 선택'**하는 것입니다.",
      en: "A concise Philosophy answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
];
