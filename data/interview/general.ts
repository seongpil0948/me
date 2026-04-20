import type { LocalizedInterviewQuestion } from "@/types/portfolio";

export const generalQuestions: LocalizedInterviewQuestion[] = [
  // Self Introduction & Career
  {
    id: 2,
    category1: "General",
    category2: "Self Introduction",
    question: {
      ko: "간단히 자기소개를 해주세요.",
      en: "Could you briefly introduce yourself?",
    },
    answer: {
      ko:
        "**7년간** 다양한 규모의 조직과 인프라부터 애플리케이션까지 전 영역을 다루며, 확장 가능한 분산 시스템을 설계하고 운영해왔습니다. 스타트업 풀스택 개발자로 시작해 현재는 연매출 5,000억원 규모의 이커머스 서비스의 플랫폼 지원 및 SRE 업무를 담당하고 있습니다.\n\n" +
        "**주요 작업**으로는 모니터링, 배포, 데이터, 클라우드, DevEx 등 플랫폼 전반의 인프라 관련 업무들을 담당하고 있습니다. 일일 10만 명이 사용하는 서비스와 월 20TB 규모의 데이터레이크, 3TB의 분산 추적 데이터를 안정적으로 구축, 운영하면서 고가용성 환경에서 시스템의 효율성과 신뢰성을 높였습니다. LG, SK 등 다양한 프로젝트에 참여하며 기획자, 디자이너, 개발자 간의 협업 구조를 깊이 이해했고, 이를 통해 단순히 기술을 구현하는 것을 넘어 비즈니스 목표를 실현하는 시스템을 설계하는 역량을 쌓았습니다.\n\n" +
        "**주요 기술 스택**은 인프라 쪽에서 Linux, Kubernetes, AWS 클라우드 네이티브 아키텍처에 관심이 많습니다. 컨테이너 오케스트레이션과 클라우드 인프라에 대한 깊은 관심으로 CKA(Certified Kubernetes Administrator)와 LFCS(Linux Foundation Certified SysOps)를 취득했고, AWS 환경 최적화를 위해 SysOps Administrator, DevOps Professional, Advanced Networking Specialty까지 확보했습니다. 백엔드는 FastAPI, Spring Boot, Gin으로 서비스를 개발하고, Kafka와 Airflow를 활용해 안정적인 메시징 및 데이터 파이프라인을 구축했습니다. 프론트엔드는 React, Vue.js, Flutter로 개발하며 풀스택 경험을 쌓았습니다. GCP, AWS, OpenTelemetry, Grafana 등 여러 환경에서의 관측성 플랫폼 구축에 관심이 많고, 여러 오픈소스 프로젝트에도 기여하고 있습니다.\n\n" +
        "**이 포지션에 지원한 이유**는 JD를 보니 제가 경험한 대부분의 영역과 일치했기 때문입니다. SRE, 서버, 프론트엔드, 기획팀 등 전 분야의 팀원들과 소통하며 협업해온 경험이 있고, 모니터링 시스템 구축, 클라우드 인프라 최적화, 대용량 데이터 핸들링까지 실무에서 직접 다뤄왔습니다. 특히 귀사의 관측성 플랫폼과 분산 시스템 운영 환경에서 제 경험을 100% 발휘하며 기여할 수 있을 것 같아 지원하게 되었습니다.",
      en:
        "Over the last seven years, I have worked across the full stack, from infrastructure to applications, and designed distributed systems in organizations of very different sizes. I started as a startup full-stack engineer and now lead platform and SRE work for an enterprise e-commerce service.\n\n" +
        "My core work spans observability, deployment, data platforms, cloud infrastructure, and developer experience. I have operated high-availability environments at production scale, including large data lake and telemetry workloads, and translated those technical improvements into measurable business outcomes.\n\n" +
        "On the infrastructure side, I focus on Linux, Kubernetes, and AWS cloud-native architecture. I earned CKA, LFCS, AWS SysOps Administrator, AWS DevOps Professional, and AWS Advanced Networking Specialty. I also build backend services with FastAPI, Spring Boot, and Gin, and I have practical experience with Kafka and Airflow pipelines. On the frontend side, I have worked with React, Vue.js, and Flutter.\n\n" +
        "I applied because this role closely matches my hands-on experience. I have worked cross-functionally with SRE, backend, frontend, and planning teams, and I can contribute immediately in observability, cloud optimization, and distributed system operations.",
    },
  },
  {
    id: 4,
    category1: "General",
    category2: "Career Change",
    question: {
      ko: "이직을 결심하게 된 계기는 무엇인가요?",
      en: "What made you decide to change jobs?",
    },
    answer: {
      ko:
        "현재 회사에서 의미 있는 성과를 달성했지만, 더 큰 규모와 깊이의 기술적 도전을 경험하고 싶다는 열망이 커졌습니다.\n\n" +
        "작지 않은 인프라를 운영하며 많은 것을 배웠습니다. OpenTelemetry 기반 관측성 플랫폼을 구축하고, AWS Step Functions + Athena로 데이터 파이프라인을 설계했으며, MTTI를 18시간에서 10분으로 단축하는 성과를 냈죠. 팀원들과 협력하며 안정적인 서비스를 만들어가는 과정이 정말 값진 경험이었습니다.\n\n" +
        "하지만 기술적으로 더 깊이 성장하고 싶다는 갈증이 생겼어요. 커널 레벨 성능 최적화와 eBPF 관측성 관련 세션들을 연달아 듣고, CPU steal 같은 저수준 메트릭으로 문제를 해결하는 접근법에 큰 자극을 받았습니다. 바로 사내 Grafana에 CPU steal 지표를 추가해서 컨테이너 성능 분析에 활용했는데, 그 과정에서 '아, 내가 알고 있는 건 빙산의 일각이구나'를 깨달았습니다.\n\n" +
        "이재성님이 강연 마지막에 하신 말씀이 계속 머릿속을 맴돌았습니다. '더 깊은 세계로 오고 싶다면 우리 팀 DevOps 포지션에 지원해보세요.' 그 순간 저도 모르게 채용 공고를 찾아보고 있더라고요. 그리고 JD를 읽으면서 '이게 바로 내가 가고 싶은 다음 단계구나'를 확신했습니다.\n\n" +
        "현재 환경에서는 중소규모 트래픽(일 10만 이내)을 안정적으로 운영하는 데 집중했다면, 이제는 대규모 분산 시스템(수백만 사용자)에서 극한의 성능 최적화, 멀티 클러스터 운영, Service Mesh 같은 더 복잡한 문제를 다루고 싶습니다. Kubernetes는 작은 규모에서 경험했지만, 수백 개 노드를 운영하고 eBPF로 네트워크를 최적화하며, Istio Ambient Mode 같은 최신 기술을 실전에서 검증하는 환경에서 일하고 싶습니다.\n\n" +
        "현재 팀은 제게 많은 기회를 주었고, 함께 성장한 동료들에게 감사합니다. 하지만 이제는 제가 준비한 기술적 깊이를 더 큰 스케일에서 발휘하고, 업계 최고 수준의 엔지니어들과 함께 일하며 한계를 넓히고 싶습니다. 그 여정의 다음 단계가 바로 이곳이라고 확신합니다.",
      en:
        "I have achieved meaningful results in my current role, but I am now looking for deeper technical challenges at larger scale.\n\n" +
        "I built an OpenTelemetry-based observability platform, designed data pipelines with Step Functions and Athena, and helped reduce incident detection time from hours to minutes. Those projects were highly valuable, but they also made me realize I want to go deeper into performance engineering and large-scale distributed operations.\n\n" +
        "I am especially motivated by environments where multi-cluster operations, service mesh, and advanced networking are part of daily engineering practice. I want to grow by solving harder systems problems with stronger peers.\n\n" +
        "I am grateful for my current team, but this move is about taking the next technical step in my career and contributing at a bigger scale.",
    },
  },
  {
    id: 5,
    category1: "General",
    category2: "Company Interest",
    question: {
      ko: "우리 회사에 지원한 이유는 무엇인가요?",
      en: "Why did you apply to our company?",
    },
    answer: {
      ko:
        "지원 전에 회사를 철저히 조사했고, 세 가지가 저를 끌어당겼습니다.\n\n" +
        "첫째, 기술 스택과 규모입니다. 귀사의 기술 블로그와 엔지니어링 문화를 보니 [Kubernetes/Istio/멀티 클러스터 같은 특정 기술]을 제가 경험하고 싶은 규모로 운영하고 계시더라고요. OpenTelemetry, APISIX Gateway, 클라우드 네이티브를 다룬 제 경험이 잘 맞지만, 귀사 시스템이 제공하는 다음 단계의 복잡성을 해결하고 싶습니다.\n\n" +
        "둘째, 엔지니어링 문화입니다. [주간 기술 공유/오픈소스 기여/무책임 회고 같은 특정 관행]에 대해 읽어보니 지속적인 학습과 지식 공유를 중요하게 여기신다는 게 분명했습니다. 그게 바로 제가 가장 잘 성장하는 환경입니다. 혼자 또는 소수 팀으로 일한 후, 이제 전문가들과 협업하며 집단 경험에서 배우고 싶습니다.\n\n" +
        "셋째, 비즈니스 영향력입니다. [회사의 제품/서비스]는 [수백만 사용자/중요한 금융 거래 등]에 영향을 미칩니다. 그 규모에서 요구되는 안정성과 성능이 흥미로운 기술적 도전을 만들어냅니다. 제 인프라 작업이 그 수준의 비즈니스 영향을 직접 가능하게 만들고 싶습니다.\n\n" +
        "솔직히 현재 역할에서 편하게 있을 수도 있었습니다. 하지만 더 성장하려면 더 큰 도전과 더 강한 팀이 필요한 시점입니다. 귀사는 둘 다 제공하시죠.",
      en:
        "I was drawn to your company for three reasons.\n\n" +
        "First, your technical scope and scale align with where I want to grow. The way your team operates cloud-native systems matches my background in Kubernetes, observability, and platform engineering.\n\n" +
        "Second, your engineering culture emphasizes learning and knowledge sharing. That is the environment where I perform best and keep improving over time.\n\n" +
        "Third, the business impact is meaningful. I want to work on systems where reliability and performance directly affect real users and revenue, and where infrastructure work clearly contributes to product outcomes.\n\n" +
        "In short, your company offers both the technical challenge and the team quality I am looking for in my next step.",
    },
  },
  // {
  //   id: 6,
  //   category1: "General",
  //   category2: "Salary",
  //   question: "What is your current salary?",
  //   answer:
  //     "**Current Compensation:**\n\n- My monthly salary is **3 million Won** (or about **$2,100**)\n- My annual salary is **40 million Won** (or about **$27,500**)\n- I make about **2,100 dollars a month**\n\nI'm open to discussing compensation that reflects my experience, technical capabilities, and the value I can bring to the team.",
  // },
  // {
  //   id: 7,
  //   category1: "General",
  //   category2: "Salary",
  //   question: "What matters to you besides salary?",
  //   answer:
  //     "1. **Technical Challenge**: Large-scale systems, latest tech stack experience\n2. **Growth Environment**: Learning support, conference attendance, certification support\n3. **Team Culture**: Transparency, data-driven decisions, technical discussions\n4. **Work-Life Balance**: Flexible work, remote work availability\n5. **Impact**: Environment where my contributions can make real business impact",
  // },
  {
    id: 8,
    category1: "General",
    category2: "Start Date",
    question: {
      ko: "언제부터 입사 가능한가요?",
      en: "When would you be available to start?",
    },
    answer: {
      ko: "**현재 회사와의 원활한 인수인계**를 우선으로 합니다.\n- **최소 기간**: 제안서 받은 후 약 **1개월**\n- **협의 가능**: 프로젝트 상황에 따라 조정 가능\n- **목표**: 현재 시스템의 안정적인 인수인계와 문서화 완료 후 입사",
      en: "I prioritize a smooth handover with my current team.\n- **Earliest start**: around **one month** after receiving an offer\n- **Flexible**: timeline can be adjusted based on project needs\n- **Goal**: complete stable handover and documentation before joining",
    },
  },

  // Problem Solving
  {
    id: 24,
    category1: "General",
    category2: "Problem Solving",
    question: {
      ko: "가장 어려웠던 기술적 문제는 무엇이고 어떻게 해결했습니까?",
      en: "What was the most difficult technical problem you solved, and how did you solve it?",
    },
    answer: {
      ko:
        "가장 어려웠던 건 통일된 인터페이스와 최소한의 유지보수 기반으로 SLA를 만족하는 모니터링 시스템을 구축하는 것이었습니다. OpenTelemetry를 도입하기로 결정했고, Java, JavaScript, CentOS, Python 모두 POC를 진행하여 팀원들을 대상으로 어떻게 모니터링 시스템을 구축할 것인지 교육을 진행했습니다.\n\n" +
        "이때 설계안과 의사결정 후 제가 전체 구성을 완료하자 모든 애플리케이션에 퍼져나가는 건 순식간이었습니다. Kafka, Airflow 등 유틸성 클러스터의 관측까지 확인했을 때 전 팀원들과 환호성을 질렀어요.\n\n" +
        "**가장 기억에 남는 성과**는 MTTI(Mean Time To Identify)를 18시간에서 10분으로 99% 단축한 것입니다. 이전에는 장애가 발생하면 개발자들이 각 서버의 로그를 18시간씩 수동으로 뒤지며 원인을 찾았는데, OpenTelemetry 도입 후에는 Grafana에서 Trace ID를 따라가며 어느 서비스의 어느 API에서 문제가 발생했는지 즉시 확인할 수 있게 되었습니다.",
      en:
        "The hardest problem was building a unified monitoring platform that could meet SLA expectations while staying maintainable for a small platform team.\n\n" +
        "I chose OpenTelemetry, ran cross-language POCs, and created a rollout pattern that teams could adopt without heavy migration friction. After the architecture and operational standards were defined, adoption spread quickly across services, including utility clusters like Kafka and Airflow.\n\n" +
        "The most meaningful outcome was reducing MTTI from about 18 hours to around 10 minutes. Before that, engineers manually searched logs across many servers during incidents. After the rollout, we could follow Trace IDs in Grafana and identify the failing service and API path in minutes.",
    },
  },
  {
    id: 25,
    category1: "General",
    category2: "Data-Driven",
    question: {
      ko: "데이터 기반 의사결정 경험이 있습니까?",
      en: "Do you have experience making data-driven decisions?",
    },
    answer: {
      ko:
        "당연합니다. 저는 직감이나 트렌드로 인프라 결정을 내리지 않습니다. 모든 주요 결정은 데이터로 뒷받침됩니다.\n\n" +
        "**개발자 샌드박스 서버 지표 기반 증설**\n\n" +
        "개발자들이 '샌드박스가 너무 느려요'라고 불평했는데, 막연히 서버를 증설하는 대신 먼저 데이터를 수집했습니다. CPU, 메모리, 디스크 I/O를 2주간 모니터링했습니다.\n\n" +
        "결과는 의외였습니다. CPU는 평균 30%밖에 안 쓰는데, 메모리가 80% 이상 사용되고 있었습니다. 특히 오전 10시~12시에 Docker 이미지 빌드가 몰리면서 메모리 부족으로 스왑이 발생했습니다. 이 데이터를 개발팀과 공유하며 협의했고, 서버 성격에 따라 적절히 CPU와 메모리 비율을 조정해서 증설했습니다.\n\n" +
        "Build 서버는 메모리 중심으로, API 서버는 CPU 중심으로 리소스를 배분했고, 결과적으로 빌드 시간은 평균 8분에서 2분으로 75% 단축됐습니다.\n\n" +
        "**500 에러와 레이턴시 기반 해결 우선순위 API 추출**\n\n" +
        "프로덕션에서 여러 API가 간헐적으로 500 에러를 내고 있었는데, 어떤 것부터 해결해야 할지 우선순위가 불명확했습니다. OpenTelemetry 데이터를 분석해서 각 API의 에러율과 P99 레이턴시를 수치화했습니다.\n\n" +
        "데이터 기반 우선순위: 1) 결제 API - 에러율 5%, P99 레이턴시 8초 (비즈니스 영향 최대), 2) 주문 조회 API - 에러율 3%, P99 레이턴시 5초, 3) 장바구니 API - 에러율 1%, P99 레이턴시 2초.\n\n" +
        "백엔드 팀에 이 데이터를 전달하며 '결제 API부터 해결하면 매출 손실을 즉시 막을 수 있다'고 설득했고, 실제로 결제 API 개선 후 일 매출이 15% 증가했습니다.\n\n" +
        "**S3 비용 최적화**\n\n" +
        "CloudWatch, S3 Dashboard 지표를 분석해서 비효율적인 라이프사이클 정책을 발견했습니다. 실제 접근 패턴 기반의 데이터 주도 보존 규칙을 구현해서 운영에 영향 없이 월 비용을 50% 절감했습니다—$5K에서 $2.5K로.\n\n" +
        "제 철학은 간단합니다: 최적화 전에 측정하고, 리소스 요청 전에 데이터로 증명하고, 결과를 추적해서 결정을 검증합니다. 그렇게 신뢰를 얻고 안정적인 결과를 제공합니다.",
      en:
        "Yes, data-driven decision making is one of my core working principles. I avoid infrastructure decisions based on intuition alone and validate major changes with metrics first.\n\n" +
        "For example, when developers asked for more sandbox capacity, I first measured CPU, memory, and disk behavior. The bottleneck was memory pressure, not CPU, so we changed resource ratios by workload type instead of scaling blindly. That reduced build time significantly.\n\n" +
        "In production incident prioritization, I ranked APIs by error rate and tail latency to focus engineering effort where business impact was highest.\n\n" +
        "My rule is simple: measure before optimizing, prove before requesting resources, and track outcomes after rollout.",
    },
  },
  {
    id: 26,
    category1: "General",
    category2: "Failure",
    question: {
      ko: "실패 경험과 그로부터 배운 것은 무엇인가요?",
      en: "Can you share a failure experience and what you learned from it?",
    },
    answer: {
      ko:
        "제 가장 큰 실패는 Inoutbox 스타트업 시절이었습니다. '완벽한' 기술 아키텍처를 구축하는 데 집착했습니다—마이크로서비스, 제대로 된 CI/CD, 포괄적인 테스팅, 모든 것을요. '아직 준비가 안됐다'며 계속 출시를 미뤘죠." +
        "가혹한 현실은 훨씬 더 단순한 제품을 가진 경쟁자가 먼저 출시해서 우리 타겟 시장을 선점했을 때 찾아왔어요. 우리는 더 나은 기술을 가지고 있었지만, 그들은 사용자를 가지고 있었습니다. 고통스러운 교훈을 배웠습니다: 사용자 없는 완벽한 기술은 무가치하다는 것을요" +
        "뭐가 잘못됐을까요? 아직 존재하지도 않는 문제를 해결하려 했습니다. 없는 규모를 위해 구축했고, 아무도 눈치채지 못할 성능을 최적화했습니다. 한편 실제 고객 문제는 해결되지 않았습니다, 제가 인프라를 완벽하게 만드느라 너무 바빴습니다." +
        "그 경험이 제 프로젝트 접근 방식을 근본적으로 바꿨어요. 이제는 MVP를 먼저 생각합니다—완벽한 제품보다 빠른 검증이요. 빠르게 작동하는 걸 사용자 앞에 내놓고, 실제 피드백을 기반으로 반복 개선하는 거죠. 기술은 비즈니스 문제를 해결하는 수단이지, 목표 자체가 아니입니다." +
        "이 교훈은 idstrust에서 저에게 큰 도움이 됐습니다. 관측성 플랫폼을 구축할 때, 첫날부터 완벽한 시스템을 만들려 하지 않았습니다. 한 서비스에서 시작해서 일주일 내에 가치를 증명한 다음 확장했습니다. 데이터 레이크가 필요했을 때는 포괄적인 분석 플랫폼이 아니라 가장 많이 요청된 상위 10개 메트릭에 먼저 집중했습니다." +
        "빠른 POC → 검증 → 점진적 개선. 그게 지금 제 접근 방식이고, 더 적은 리스크로 더 나은 결과를 가져다줍니다. 실패는 실용주의가 완벽주의를 매번 이긴다는 걸 가르쳐줬어요.",
      en:
        "My biggest failure happened at an early startup where I focused too much on building a perfect architecture before launch.\n\n" +
        "While we were refining technical quality, a competitor shipped a simpler product first and captured users. That taught me that perfect technology without market validation has little value.\n\n" +
        "Since then, I prioritize fast MVP validation, real user feedback, and iterative improvement.",
    },
  },

  // Collaboration & Communication
  {
    id: 27,
    category1: "General",
    category2: "Cross Functional",
    question: {
      ko: "크로스 팀 협업 경험은 어떤가요?",
      en: "What has your cross-functional collaboration experience been like?",
    },
    answer: {
      ko:
        "클라이언트, 기획, 마케팅, 백엔드, 프론트엔드 등 다양한 팀과 협업했고, 성공적인 협업을 위해서는 각 팀의 언어와 우선순위를 이해하는 것이 중요하다는 걸 배웠습니다.\n\n" +
        "Abacus에서 LG 프로젝트의 프론트엔드 프로젝트 리더를 맡았을 때, 세 가지 관점을 조율해야 했습니다. LG 클라이언트의 비즈니스 요구사항, 백엔드 팀의 기술적 제약사항, 그리고 프론트엔드 팀의 구현 현실이었습니다. 매주 기술 용어를 LG 이해관계자들에게 비즈니스 영향으로 번역하고, 양쪽 팀의 니즈를 고려해 백엔드와 API 스펙을 협상하며, 프론트엔드 팀을 기술적 도전 과제들로 안내했습니다.\n\n" +
        "핵심은 선제적 커뮤니케이션이었습니다. 문제가 표면화될 때까지 기다리지 않고 갈등을 예측해서 조기에 해결했습니다. 예를 들어, LG가 대규모 백엔드 변경이 필요한 기능을 요청하면, 먼저 백엔드와 협업해서 대안 접근법을 찾고, 명확한 트레이드오프와 함께 솔루션을 LG에 제시했습니다. 이런 방식으로 모든 측면에서 신뢰를 얻었고, LG의 유일한 기술 파트너가 되어 매출 300% 증가를 이끌었습니다.\n\n" +
        "idstrust에서 데이터 플랫폼을 구축할 때는 다른 협업 기술이 필요했습니다. 기획팀과 마케팅팀은 재방문율, 전환 퍼널, 사용자 행동 같은 비즈니스 인사이트가 필요했지만, SQL이나 인프라가 아닌 비즈니스 메트릭으로 소통했습니다.\n\n" +
        "먼저 두 팀 모두와 인터뷰하면서 어떤 결정을 위해 데이터가 필요한지 물었습니다. 가정하는 대신 '어떤 질문에 답하려고 하습니까? 좋은 결과는 어떤 모습일까요?'라고 질문했습니다. 그 결과 실시간 대시보드나 복잡한 ML 모델이 아니라 특정 질문에 대한 간단하고 신뢰할 수 있는 답변이 필요하다는 걸 알게 됐습니다.\n\n" +
        "그 다음 인프라 팀과 협업해서 S3, Glue, Athena를 사용한 솔루션을 설계했고, 비용, 성능, 유지보수성의 균형을 맞췄습니다. 결과는? 비기술 팀들이 엔지니어를 매번 괴롭히지 않고도 직접 데이터 쿼리를 할 수 있게 됐습니다.\n\n" +
        "제 협업 철학은 간단합니다. 투명성, 책임감, 그리고 공동 성공입니다. 모두가 이해하는 명확한 목표를 설정하고, 약속에 대한 책임을 지며, 선제적으로 소통하고, 승리를 함께 축하하는 겁니다. 다른 사람들의 성공을 도우면, 그들도 당신의 성공을 도와줍니다.",
      en:
        "I have collaborated with client, planning, marketing, backend, and frontend teams, and learned that successful delivery depends on understanding each team's priorities and language.\n\n" +
        "My approach is proactive communication, clear trade-off alignment, and shared ownership of outcomes.",
    },
  },
  {
    id: 28,
    category1: "General",
    category2: "Remote Work",
    question: {
      ko: "원격 근무와 비동기 커뮤니케이션 경험은 어떤가요?",
      en: "What is your experience with remote work and asynchronous communication?",
    },
    answer: {
      ko: "**비동기 커뮤니케이션 도구들:**\n- **Jira**: 모든 작업을 상세한 컨텍스트와 함께 티켓으로 관리\n- **Confluence**: 아키텍처 설계, 의사결정 문서화\n- **Slack**: 실시간 협업, 스레드 기반 토론\n- **GitHub**: PR을 통한 코드 리뷰와 기술 토론\n\n**문서 중심 협업:**\n- 구두 설명 전에 **설계 문서 + 예상 Q&A**를 공유\n- 다른 시간대의 동료들이 검토하고 코멘트할 시간을 확보\n- 번역 도구 없이 영문 기술 문서 읽기 가능",
      en:
        "I work comfortably in remote and async environments using Jira, Confluence, Slack, and GitHub.\n\n" +
        "I prefer document-first collaboration so distributed teams can align without losing context.",
    },
  },
  {
    id: 29,
    category1: "General",
    category2: "Conflict Resolution",
    question: {
      ko: "팀원들과 트러블이 있을 때 어떻게 해결하습니까?",
      en: "How do you handle conflict or friction with teammates?",
    },
    answer: {
      ko:
        "팀 내 갈등은 피하기 어렵지만, 저는 이런 상황을 오히려 더 건강한 관계를 만드는 기회로 봅니다. 프로젝트를 진행하다 보면 일정이나 역할, 우선순위 차이 때문에 갈등이 생길 수 있습니다. 이런 문제를 풀기 위해서는 투명한 의사소통과 서로에 대한 이해가 꼭 필요하다고 생각합니다.\n\n" +
        "감정적인 대립이 나타나면 저는 먼저 한 발짝 물러서서 “우리가 지금 진짜 해결해야 하는 문제는 무엇일까?”를 스스로에게 묻습니다. 예전에 어떤 팀원이 플랫폼 지원 파트가 하는 일이 거의 없다고 오해한 적이 있었습니다. 저는 이 상황을 소통 부족에서 나온 문제라고 보고, 바로 세미나를 열고 그 팀원을 초대해 의견을 들었습니다. 그 과정에서 그분이 실제로 무엇을 걱정하고 무엇이 필요한지, 공적인 자리에서 솔직하게 들을 수 있었습니다." +
        "이후에는 문제를 해결하기 위한 구체적인 움직임을 보여줬고, 우리가 같은 목표를 향하고 있다는 점을 계속 공유했습니다. 상대방의 우려를 진심으로 듣고 공감하니까 자연스럽게 대화가 풀리고 관계도 훨씬 부드러워졌습니다. ",
      en:
        "When conflict appears, I define the core problem first, listen actively, and align on shared goals.\n\n" +
        "I then convert concerns into concrete action items so trust can recover through visible progress.",
    },
  },
  {
    id: 29.5,
    category1: "General",
    category2: "Conflict Resolution",
    question: {
      ko: "팀 내 갈등을 어떻게 해결하습니까?",
      en: "How do you resolve conflict within a team?",
    },
    answer: {
      ko: '**사례: OpenTelemetry 도입 반대**\n\n**(상황)** 일부에서 반대했습니다. "운영 중인 서비스에 에이전트 설치는 위험하다", "급한 비즈니스 기능 개발이 필요하다"\n\n**(실행)**\n1. **데이터 기반 설듍**: 지난달 장애 대응 시간을 비용으로 환산\n2. **리스크 최소화 계획**: 상세한 카나리 배포와 롤백 계획 제시\n3. **빠른 성과 제시**: 1주일 내에 특정 서비스에 적용해 효과 검증\n\n**(결과)** 리더십 설득 성공, OTel 도입 완료, MTTI 18시간→10분 (99%) 단축으로 팀 리소스 확보\n\n**교훈:** 감정이 아닌 **데이터와 논리**에 집중하고, **상대방의 우려를 이해하고 해소**하는 것이 중요합니다',
      en:
        "In one case, teams opposed OpenTelemetry adoption due to perceived risk. I used incident-cost data, a canary rollout plan, and explicit rollback criteria to build confidence.\n\n" +
        "After quick proof on one service, the broader rollout gained support.",
    },
  },

  // Leadership
  {
    id: 30,
    category1: "General",
    category2: "Leadership",
    question: {
      ko: "리더십 경험과 스타일은 어떤가요?",
      en: "Could you describe your leadership experience and style?",
    },
    answer: {
      ko:
        "저는 솔선수범하고 다른 사람들이 따라올 수 있도록 길을 명확하게 만드는 방식으로 리드합니다.\n\n" +
        "제 접근법은 먼저 개척하는 것입니다. 혼자 또는 소규모 팀과 빠른 POC를 만들고, 작동하는 걸 증명한 다음, 다른 사람들을 초대하죠. 이렇게 하면 불확실성과 두려움이 제거됩니다. 사람들은 추상적인 제안보다 구체적인 결과를 볼 때 더 쉽게 따라옵니다.\n\n" +
        "예를 들어, OpenTelemetry 도입을 제안했을 때 위원회부터 시작하지 않았습니다. 한 서비스에 구현하고 99% MTTI 감소를 증명하는 메트릭을 수집한 다음 데이터를 제시했습니다. 증거가 있으니 동의를 얻기가 훨씬 쉬웠습니다.\n\n" +
        "또한 저는 end-to-end 관심을 믿습니다. 요구사항을 벽 너머로 던지지 않아요. 프론트엔드 팀과 일할 때는 그들의 상태 관리 과제를 이해하고, 백엔드 팀과는 데이터베이스 제약사항을 고려하며, 기획 팀과는 사용자 영향을 생각합니다. 이것이 저를 더 효과적인 파트너이자 문제 해결사로 만들어줍니다.\n\n" +
        "제 리더십 스타일은 증상이 아닌 근본 문제를 해결하는 데 집중합니다. 팀이 느린 배포에 불평할 때, CI/CD 파이프라인만 최적화하지 않았습니다. 배포가 느린 이유를 조사했고 진짜 문제는 시스템에 대한 신뢰 부족이라는 걸 발견했습니다. 그래서 먼저 관측성을 구축했고, 그 결과 팀들이 더 자주 배포하는 게 편해졌습니다. 그게 근본 원인을 해결하는 것입니다.\n\n" +
        "멘토링할 때는 빠른 해결책보다 기본기를 강조합니다. AI 시대에는 누구나 코드를 생성할 수 있습니다. 하지만 그 코드가 왜 작동하는지, 실패할 때 어떻게 디버깅하는지, 확장 가능한 시스템을 어떻게 설계하는지 이해하는 것—이런 기본기는 대체될 수 없습니다. 팀원들에게 공식 문서를 읽고, 철저히 조사하고, 강력한 기반을 쌓으라고 권장합니다.\n\n" +
        "또한 권한이 아닌 데이터로 리드합니다. 이해관계자들을 조율할 때 명확한 메트릭과 트레이드오프를 제시합니다. '이걸 달성할 수 있고, 비용은 이만큼이며, 일정은 이렇습니다.' 이런 투명성이 신뢰를 쌓고 의사결정을 정치적이 아닌 협력적으로 만듭니다.\n\n" +
        "리더십은 모든 답을 갖는 것이 아닙니다. 장애물을 제거하고, 컨텍스트를 제공하며, 다른 사람들이 좋은 결정을 내릴 수 있도록 권한을 부여하는 거죠. 그게 제가 추구하는 바입니다.",
      en:
        "My leadership style is proof-first execution: build a small working result, measure impact, and scale with shared ownership.\n\n" +
        "I focus on removing blockers and helping teams make better decisions independently.",
    },
  },
  {
    id: 31,
    category1: "General",
    category2: "Disagreement",
    question: {
      ko: "팀원들과의 의견 차이를 어떻게 처리하습니까?",
      en: "How do you handle disagreements with team members?",
    },
    answer: {
      ko: '1. **경청**: 다른 사람들의 의견과 우려사항을 완전히 이해합니다\n2. **데이터 기반 토론**: 감정이 아닌 객관적인 메트릭으로 논의합니다\n3. **실험**: 두 접근법 모두 작은 규모로 시도한 다음 결과를 비교합니다\n4. **의사결정 문서화**: 어떤 결정을 내렸고 왜 그런 결정을 내렸는지 기록합니다\n\n**핵심:** "누가 옳은가"가 아니라 "비즈니스에 무엇이 최선인가"에 집중합니다',
      en: "I handle disagreements by listening, discussing with objective data, running small experiments, and documenting the final rationale.",
    },
  },

  // Additional General Questions
  {
    id: 42,
    category1: "General",
    category2: "Self Introduction",
    question: {
      ko: "엔지니어로서 가장 큰 강점은 무엇인가요?",
      en: "What is your greatest strength as an engineer?",
    },
    answer: {
      ko:
        "엔지니어로서 가장 큰 강점을 꼽으라면 '보이지 않는 것을 보이게 만드는 능력'이라고 생각합니다.\n\n" +
        "제가 TheShop에 합류했을 때 장애가 나면 15개 서버에 tail -f를 펼쳐놓고 18시간씩 로그를 뒤지는 방식으로 운영했습니다. 처음 이 상황을 봤을 때 '이건 엔지니어링이 아니라 운에 맡기는 거다'라고 느꼈죠. 문제를 찾고 싶은데 도구가 없으면 문제 자체가 안 보이잖아요.\n\n" +
        "그래서 먼저 1개 서비스에 OpenTelemetry를 조용히 붙여봤어요. 별도 승인이나 프로젝트 등록 없이 POC를 만들고, 일주일 후에 MTTD가 18시간에서 10분으로 줄었다는 데이터를 들고 경영진을 찾아갔습니다. '이렇게 하면 좋겠습니다'가 아니라 '이미 검증했고, 증거가 있습니다'라고 말했습니다. 즉시 승인이 났고 전사 확대로 이어졌어요.\n\n" +
        "이게 저의 패턴입니다. 말보다 작동하는 결과물을 먼저 만들고, 데이터로 설득합니다. Redis 캐시 히트율 개선도, Kafka 파티셔닝 최적화도, 모두 POC → 수치 → 설득 순서였습니다. 추상적인 논의보다 구체적인 산출물이 의사결정을 훨씬 빠르게 만들습니다.\n\n" +
        "비기술 이해관계자에게 말할 때는 기술이 아니라 가치로 번역합니다. 'OpenTelemetry 도입'이 아니라 '장애 대응 시간 18시간 → 10분'으로, 'AI 에이전트 플랫폼'이 아니라 '회의록 작성 월 53시간 절감'으로요. 기술 투자를 ROI로 번역하면 승인 속도가 달라지더라고요.\n\n" +
        "지금 다시 한다면 팀원 온보딩을 더 일찍 챙겼을 것 같습니다. 혼자 빠르게 구축하다 보니 중요한 시스템이 제가 없으면 아무도 못 건드리는 상황이 생겼습니다. 인프라에만 Single Point of Failure가 생기는 게 아니더라고요.",
      en:
        "My strongest point is turning invisible operational risk into visible, actionable data.\n\n" +
        "I prove impact quickly with working implementations and measurable outcomes, then scale adoption across teams.",
    },
  },
  {
    id: 43,
    category1: "General",
    category2: "Self Introduction",
    question: {
      ko: "가장 큰 약점은 무엇인가요?",
      en: "What is your biggest weakness?",
    },
    answer: {
      ko:
        "제 약점은 빠르게 실행하려다가 팀원들을 앞서나가는 경향입니다. 지금도 의식적으로 관리하고 있습니다.\n\n" +
        "OpenTelemetry 도입 초기에 이런 실수를 했습니다. POC를 완성하고 바로 전사 도입을 추진했는데, 일부 팀원들이 '갑자기 왜 이걸 배워야 하냐'며 반발했습니다. 제 머릿속엔 이미 전체 그림이 그려져 있었지만, 다른 사람들은 아직 필요성조차 못 느끼고 있었습니다. 결과가 아무리 좋아도 과정에서 사람들이 소외되면 지속되지 않더라고요.\n\n" +
        "그때부터 저는 세 단계를 의식적으로 밟습니다. 작은 POC로 먼저 검증하고, 핵심 이해관계자에게 시연해서 피드백을 받고, 그다음에 점진적 롤아웃으로 팀이 따라올 시간을 줘요. 데이터 파이프라인 구축은 이 방식으로 진행해서 기획팀, 백엔드팀, 경영진 모두가 '우리가 선택한 것'이라는 공감대를 만들었고, 6개월 만에 성공적으로 전사 도입됐습니다.\n\n" +
        "여전히 '이거 지금 바로 하면 3일 안에 끝날 텐데'라는 조급함이 올라올 때가 있습니다. 그럴 때 '혼자 빠르게 가는 것보다 팀과 함께 멀리 가는 게 더 중요하다'는 것을 스스로에게 상기시킵니다.\n\n" +
        "지금 다시 한다면 도입 전에 Why를 먼저 공유했을 것입니다. What(뭘 할 것인지)을 먼저 보여주기 전에 Why(왜 지금 이게 필요한지)부터 팀이 이해하게 만들었으면 훨씬 수월했을 겁니다.",
      en:
        "My weakness is moving too quickly before everyone is fully aligned.\n\n" +
        "I now manage this by explaining the why first and rolling out changes in phases.",
    },
  },
  {
    id: 51,
    category1: "General",
    category2: "Problem Solving",
    question: {
      ko: "완전히 새로운 것을 빠르게 학습해야 했던 경험을 말씀해주세요.",
      en: "Tell me about a time you had to learn something completely new very quickly.",
    },
    answer: {
      ko:
        "LG IXI Studio 프로젝트에 합류했을 때 SSE(Server-Sent Events)를 2주 안에 프로덕션 수준으로 구현해야 했는데, 그때까지 SSE를 써본 적이 없었습니다.\n\n" +
        "처음엔 막막했지만 제 학습 순서는 항상 비슷합니다. 공식 문서를 먼저 파고들고, 가장 단순한 프로토타입을 직접 만들어보고, 실제 코드에서 패턴을 찾는 것입니다. MDN의 SSE 스펙 문서를 읽고, Node.js 백엔드와 Vue.js 클라이언트에서 각각 가장 작은 구현부터 만들었습니다. 연결 유지, 재연결 로직, 에러 처리를 하나씩 실험하면서 엣지 케이스를 파악했습니다.\n\n" +
        "가장 까다로웠던 건 AI 모델의 스트리밍 응답을 끊김 없이 프론트엔드까지 전달하는 부분이었습니다. 응답이 글자 단위로 오는 특성상 버퍼링을 어떻게 처리하느냐가 UX에 직접 영향을 줬습니다. 최종적으로 2주 만에 프로덕션 배포를 완료했고, 실시간 AI 스트리밍이 안정적으로 동작했습니다.\n\n" +
        "이 경험 이후 새로운 기술을 학습하는 사이클이 명확해졌어요. 공식 문서 → 가장 단순한 POC → 엣지 케이스 실험 → 실제 코드 적용. 이 사이클로 3년 안에 CKA, AWS DevOps Pro, OpenTelemetry 기여까지 도달했습니다.\n\n" +
        "지금 다시 한다면 처음부터 재연결 로직을 더 견고하게 설계했을 것입니다. 프로덕션에서 네트워크 불안정이 생겼을 때 클라이언트 재연결이 일부 케이스에서 실패하는 걸 나중에 발견했습니다.",
      en:
        "I had to learn SSE quickly under a strict delivery deadline.\n\n" +
        "I used a repeatable cycle: official docs, minimal proof, edge-case validation, and production rollout.",
    },
  },
  {
    id: 52,
    category1: "General",
    category2: "Problem Solving",
    question: {
      ko: "복잡한 프로덕션 이슈를 디버깅할 때 어떻게 접근하습니까?",
      en: "How do you approach debugging complex production issues?",
    },
    answer: {
      ko:
        "프로덕션 디버깅에서 가장 중요한 건 침착하게 증거를 따라가는 것입니다.\n\n" +
        "TheShop에서 기억에 남는 케이스는 결제 API에서 간헐적으로 500 에러가 발생한 건데, 특정 시간대에만 재현되고 재현율도 5% 수준이라 잡기가 까다로웠어요. 먼저 '최근에 뭐가 바뀌었나'부터 시작했는데, 마침 그 전날 신규 기능 배포가 있었습니다.\n\n" +
        "OpenTelemetry Trace에서 결제 서비스의 응답 시간이 특정 요청에서만 3-4초로 튀는 패턴을 발견했습니다. Trace를 따라가니 DB 쿼리에서 커넥션을 기다리는 구간이 길었고, 거기서 Connection Pool 고갈 가설을 세웠습니다. hikaricp.connections.pending 메트릭을 보니 특정 시간대에 5 이상으로 치솟는 게 확인됐습니다.\n\n" +
        "신규 기능 코드를 보니 특정 조건에서 DB 쿼리를 N+1로 호출하는 로직이 있었습니다. 즉시 임시 조치로 Connection Pool 크기를 늘려서 증상을 완화하고, 근본 원인인 쿼리를 최적화했습니다. 이후 CI/CD에 쿼리 성능 테스트를 추가해서 같은 문제가 재발하지 않도록 했습니다.\n\n" +
        "저는 항상 '배포 이력 확인 → Trace로 느린 구간 특정 → 메트릭으로 가설 검증 → 코드 공범 찾기' 순서를 따라요. 추측으로 시작하면 시간이 배로 걸리더라고요.\n\n" +
        "지금 다시 한다면 Trace 기반 디버깅을 첫 날부터 팀 표준으로 만들었을 것입니다. 처음엔 로그만 보던 팀원들이 Trace 분석 방법을 배운 후에 평균 디버깅 시간이 확연히 줄었습니다.",
      en: "For production incidents, I follow an evidence path: recent change history, trace bottlenecks, metric validation, and code-level confirmation.",
    },
  },
  {
    id: 77,
    category1: "General",
    category2: "Communication",
    question: {
      ko: "비기술 이해관계자에게 기술 개념을 어떻게 설명하습니까?",
      en: "How do you explain technical concepts to non-technical stakeholders?",
    },
    answer: {
      ko: '**커뮤니케이션 전략:**\n\n**1. 비즈니스 영향으로 시작:**\n❌ "OpenTelemetry로 분산 추적을 구현해야 합니다"\n✅ "버그 수정 시간을 18시간에서 10분으로 줄여서 장애당 엔지니어링 시간을 8시간 절약할 수 있습니다"\n\n**2. 비유 사용:**\n- **분산 추적**: 택배 GPS 추적처럼, 요청이 어디서 잘못되는지 정확히 볼 수 있습니다\n- **캐싱**: 자주 쓰는 문서를 서랍장이 아니라 책상에 두는 것과 같습니다\n- **로드 밸런싱**: 마트에서 긴 줄 하나보다 여러 계산대를 운영하는 것과 같습니다\n\n**3. 시각 자료:**\n- 명확한 흐름을 보여주는 아키텍처 다이어그램\n- 변경 전/후 메트릭 비교\n- 비용 분석 차트\n- 타임라인 시각화\n\n**4. 기술이 아닌 결과에 집중:**\n- "CI/CD 파이프라인"이 아니라 "더 빠른 기능 제공"\n- "Kubernetes HA 클러스터"가 아니라 "99.9% 가동 시간"\n- "EC2 라이트사이징"이 아니라 "50% 비용 절감"\n\n**5. 질문 예상:**\n- 비용/편익 분석 준비\n- 리스크 완화 계획 보유\n- 유사한 성공 사례 제시\n- 현실적인 일정 제공\n\n**실제 사례 - 데이터 레이크 프레젠테이션:**\n기획팀에게: "현재는 최근 7일 데이터만 볼 수 있습니다. 데이터 레이크로 10년치 히스토리를 분석해서 트렌드, 계절성, 고객 행동을 파악하고 더 나은 비즈니스 결정을 내릴 수 있습니다. 비용: 월 $2K. 가치: 더 나은 예측과 전략."',
      en: "I explain technical concepts by translating them into business impact, clear trade-offs, and measurable outcomes.",
    },
  },
  {
    id: 78,
    category1: "General",
    category2: "Communication",
    question: {
      ko: "동료에게 어려운 피드백을 해야 했던 상황을 설명해주세요.",
      en: "Describe a situation where you had to give difficult feedback to a colleague.",
    },
    answer: {
      ko: '**상황:**\n주니어 엔지니어가 적절한 테스트 없이 PR을 반복적으로 제출해서 프로덕션 버그를 발생시키고 여러 차례 리뷰 사이클이 필요했습니다.\n\n**접근 방법:**\n\n**1. 구체적인 사례 준비:**\n- 문제가 있는 최근 PR 3-4개 수집\n- 영향 기록: 롤백, 고객 불만, 낭비된 리뷰 시간\n- 메트릭 수집: 평균 PR 수정 횟수, 버그 발생률\n\n**2. 비공개 1:1 대화:**\n- 긍정적으로 시작: 열심히 일하고 빠르게 전달하는 점 인정\n- 감정적이지 않게 객관적으로 데이터 제시\n- 성격이 아닌 행동에 집중\n- 개방형 질문: "철저한 테스트를 방해하는 것이 무엇인가요?"\n\n**3. 근본 원인 이해:**\n- 발견: 빠르게 전달해야 한다는 압박감을 느낌\n- 테스팅 모범 사례에 대한 이해 부족\n- 효과적인 테스트를 작성하는 방법을 잘 모름\n\n**4. 협력적 해결책:**\n- 명확한 기대치 설정: 모든 PR에 테스트와 로컬 검증 필요\n- 도움 제공: 처음 몇 개 테스트 케이스 작성을 페어링\n- 리소스 공유: 테스팅 가이드, 코드베이스의 예제\n- PR 자체 리뷰를 위한 체크리스트 수립\n\n**5. 후속 조치:**\n- 첫 달 동안 주간 체크인\n- 개선 사항을 공개적으로 축하\n- 진척도에 따라 기대치 조정\n\n**결과:**\n- PR 품질이 크게 향상됨\n- 2개월 내에 버그율 70% 감소\n- 엔지니어가 테스팅에 자신감 획득\n- 솔직한 소통을 통해 관계 강화\n\n**핵심 교훈:**\n**데이터 + 공감 + 지원** = 개선을 이끄는 효과적인 피드백',
      en: "I delivered difficult feedback using concrete examples and impact metrics, then supported improvement through pairing and clear expectations.",
    },
  },
  {
    id: 79,
    category1: "General",
    category2: "Learning",
    question: {
      ko: "가장 영향을 받은 기술 서적이나 리소스는 무엇인가요?",
      en: "Which technical book or resource has influenced you the most?",
    },
    answer: {
      ko: '**가장 영향을 받은 리소스들:**\n\n**1. Martin Kleppmann의 "Designing Data-Intensive Applications":**\n- 분산 시스템에 대한 제 사고방식을 바꿔놓았습니다\n- 시스템 설계에서의 트레이드오프에 대한 이해를 깊게 했습니다\n- Kafka, 데이터 레이크, 캐시 아키텍처에 개념을 적용했습니다\n- 분산 시스템 결정을 위한 주요 참고 자료\n\n**2. Google의 "Site Reliability Engineering":**\n- 제 SRE 철학과 실천 방식을 형성했습니다\n- SLI/SLO 개념을 TheShop 운영에 적용\n- 에러 버짓이 배포 전략에 영향을 줌\n- 온콜 모범 사례 구현\n\n**3. Kubernetes 공식 문서:**\n- CKA 자격증 준비의 기초\n- 프로덕션 운영을 위해 지속적으로 참조\n- 고품질 문서의 가치를 가르쳐줌\n\n**4. AWS Well-Architected Framework:**\n- 클라우드 아키텍처 결정을 안내\n- 비용 최적화 전략에 영향\n- 보안과 안정성 실천 방식을 형성\n\n**5. OpenTelemetry 문서 + 커뮤니티:**\n- 관측성 모범 사례 학습\n- 적극적인 참여가 이해를 형성\n- 기여를 통해 지식이 깊어짐\n\n**학습 철학:**\n- **공식 문서 우선** - 권위 있는 지식을 위해\n- **기본서는 책으로** - 변하지 않는 기초를 위해\n- **블로그/발표는 패턴과** 실제 적용을 위해\n- **오픈소스 코드는** 구현 세부사항을 위해\n- **실습은** 이해를 굳히기 위해',
      en: "The resources that shaped me most are DDIA, Google's SRE book, Kubernetes official docs, AWS Well-Architected guidance, and OpenTelemetry documentation/community.",
    },
  },
  {
    id: 80,
    category1: "General",
    category2: "Career Goals",
    question: {
      ko: "10년 후 자신의 모습을 어떻게 그리고 있습니까?",
      en: "Where do you see yourself in ten years?",
    },
    answer: {
      ko: "**10년 비전:**\n\n**기술 경로 (주요):**\n- **Staff/Principal Engineer** 또는 **Distinguished Engineer** 역할\n- **플랫폼 엔지니어링과 관측성** 분야의 인정받는 전문가\n- 주요 컨퍼런스(KubeCon, AWS re:Invent)의 정기 연사\n- 메인테이너 역할의 중요한 오픈소스 기여\n- 수천 명의 엔지니어에게 도달하는 기술 아티클 발행\n\n**만들고 싶은 영향:**\n1. **업계 영향력:**\n   - 클라우드 네이티브 관측성의 모범 사례 형성\n   - 표준과 명세에 기여\n   - 차세대 플랫폼 엔지니어 멘토링\n\n2. **기술적 우수성:**\n   - 수백만 사용자를 처리하는 시스템 아키텍팅\n   - 이전에 해결되지 않은 인프라 과제 해결\n   - 개발자 경험에 대한 새로운 접근법 개척\n\n3. **지식 공유:**\n   - 플랫폼 엔지니어링에 관한 기술서 집필\n   - 교육 콘텐츠 제작 (블로그, 비디오, 강의)\n   - 더 넓은 커뮤니티에 이익이 되는 도구 구축\n\n**대안 경로 (열려있음):**\n- **기술 리더십**: 적절한 기회가 있다면 VP of Engineering 또는 CTO\n- **컨설팅**: 고성장 기업을 위한 독립 컨설턴트\n- **창업**: 인프라 스타트업의 기술 공동 창업자\n\n**양보할 수 없는 것들:**\n- 기술적 실무 유지 (코드 작성, 문제 해결)\n- 규모 있는 의미 있는 문제 해결\n- 지속적인 학습과 성장\n- 건강한 워라밸\n\n**구축하고 있는 것:**\n기업이 인프라를 수천 명에서 수백만 사용자로 확장해야 할 때 찾는 전문가로서의 명성입니다.",
      en: "A concise Career Goals answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 81,
    category1: "General",
    category2: "Self Introduction",
    question: {
      ko: "다른 지원자와 비교해 당신을 차별화하는 것은 무엇인가요?",
      en: "What differentiates you from other candidates?",
    },
    answer: {
      ko: "**독특한 조합:**\n\n**1. 폭과 깊이:**\n대부분의 엔지니어는 한 분야를 전문으로 합니다. 저는:\n- **인프라**: Kubernetes, AWS, 모니터링, 데이터 파이프라인\n- **백엔드**: Go, Python, Django, Spring Boot\n- **프론트엔드**: React, Vue, Flutter\n- **데이터**: 데이터 레이크, 분석, 관측성\n\n이것이 **end-to-end 플랫폼 책임**과 **크로스 기능 협업**을 가능하게 합니다.\n\n**2. 스타트업부터 엔터프라이즈 경험:**\n- Inoutbox에서 단독 플랫폼 개발 (0→1)\n- Intellisys/Abacus에서 소규모 팀 (1→10)\n- idstrust에서 엔터프라이즈 규모 (5,000억원 매출, 10만 사용자)\n\n모든 단계에서의 도전을 이해하고 어떤 환경에서도 일할 수 있습니다.\n\n**3. 모든 것이 데이터 기반:**\n모든 주요 결정은 메트릭으로 뒷받침됩니다:\n- 99% MTTI 감소 (18시간 → 10분)\n- 50% 비용 절감 ($5K → $2.5K/월)\n- 90% 배포 속도 향상 (2시간 → 12분)\n- 142배 로그 보관 (7일 → 10년)\n\n**4. 직함 없는 검증된 리더십:**\n- 초기 저항에도 불구하고 OpenTelemetry 도입 주도\n- LG 클라이언트 프로젝트의 프로젝트 리더\n- 일 10만 명 이상이 사용하는 시스템 구축\n\n**5. 빠른 기술 습득:**\n- 6개월 만에 CKA, AWS DevOps Pro, LFCS\n- 프로덕션을 위해 2주 만에 SSE 프로토콜 학습\n- 도입 후 몇 달 만에 OpenTelemetry 기여\n\n**6. 비즈니스 영향 집중:**\n단순히 기술을 구축하는 것이 아니라 비즈니스 결과를 이끌어냅니다:\n- 5,000억원 매출을 지원하는 인프라\n- 더 빠른 기능 제공 가능\n- 운영 비용 절감\n- 개발자 생산성 향상\n\n**핵심:**\n저는 **기술적 깊이, 비즈니스 통찰력, 그리고 검증된 실행력**을 규모 있게 제공합니다.",
      en: "A concise Self Introduction answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 83,
    category1: "General",
    category2: "Career Path",
    question: {
      ko: "딥러닝과 AI에 관심을 갖게 된 계기는 무엇이고, 그것이 현재 AI 에이전트 개발로 어떻게 이어졌습니까?",
      en: "What sparked your interest in deep learning and AI, and how did that lead to your current AI agent development work?",
    },
    answer: {
      ko:
        "커리어 초반부터 딥러닝에 강한 관심을 가지고 있었고, 그게 지금의 AI 에이전트 플랫폼 구축으로 자연스럽게 이어졌습니다.\n\n" +
        "**출발점: Intellisys AI 추천 회사 (2020-2022)**\n\n" +
        "첫 직장인 AI 추천 솔루션 회사에서 ML 연구원들과 밀접하게 협업했습니다. 제 역할은 '풀스택 개발자'였지만, AI 연구원들이 개발한 모델을 실제 서비스로 연결하는 작업을 담당했습니다.\n\n" +
        "구체적으로는:\n" +
        "- **추천 엔진 서빙**: n2 알고리즘(ANN) 기반 상품 추천 모델을 FastAPI로 서빙. 사용자 벡터와 상품 벡터의 유사도 계산이 핵심이었는데, 이때 임베딩 개념을 처음 깊이 이해했습니다.\n" +
        "- **NLP 데이터 파이프라인**: 패션 매거진 40개 쇼핑몰 데이터를 수집해 TF-IDF 기반 키워드 추출과 트렌드 분석 파이프라인을 구축했습니다. 텍스트를 벡터로 변환하고 유사도를 계산하는 과정이 흥미로웠습니다.\n" +
        "- **ML 파이프라인**: Argo Workflows + RabbitMQ로 데이터 수집 → 전처리 → 모델 학습 → 배포 전 과정을 자동화했습니다.\n\n" +
        "이때 배운 핵심은 **'AI 모델은 아무리 좋아도 서빙 인프라가 없으면 가치를 못 낸다'**는 것이었습니다. ML 연구원이 만든 모델을 운영 환경에 배포하고, 모니터링하고, 스케일링하는 과정에서 인프라가 얼마나 중요한지 깨달았습니다.\n\n" +
        "**가속: Abacus에서 LG IXI AI 플랫폼 (2023-2024)**\n\n" +
        "LG에서 생성형 AI SaaS 플랫폼(IXI Studio) 프론트엔드 개발을 담당했습니다. SSE로 AI 응답을 실시간 스트리밍하고, AI가 생성한 코드를 CodeMirror 에디터로 편집하는 기능을 구현했습니다.\n\n" +
        "여기서 **'LLM이 어떻게 동작하는지'**를 사용자 관점에서 깊이 이해했습니다. Prompt Engineering이 결과에 미치는 영향, Streaming 응답의 UX, 사용자 인터페이스와 AI 연결 방식을 직접 경험했습니다.\n\n" +
        "**현재: TheShop ADK 기반 멀티 에이전트 플랫폼 (2024-)**\n\n" +
        "Intellisys에서 쌓은 ML 서빙 경험 + IXI에서 배운 LLM 인터페이스 지식이 현재 AI 에이전트 플랫폼 구축에 그대로 연결됩니다.\n\n" +
        "- **임베딩 이해**: Intellisys에서 n2 알고리즘으로 벡터 유사도를 다뤘기 때문에, Amazon Titan 임베딩 + S3 Vector Store 설계가 자연스러웠어요.\n" +
        "- **파이프라인 설계**: Argo Workflows로 ML 파이프라인을 만든 경험이 ADK-Go의 멀티 에이전트 오케스트레이션 설계에 직접 도움이 됐습니다.\n" +
        "- **서빙 인프라**: AI 모델 서빙 경험 덕분에 Bedrock Converse API의 Prompt Caching, 모델 티어 분리(Claude Sonnet/Haiku/Opus)를 비용 효율적으로 설계할 수 있었습니다.\n" +
        "- **A2A/MCP 아키텍처**: ML 마이크로서비스 연동 경험이 에이전트 간 통신 프로토콜 설계에 응용됐습니다.\n\n" +
        "**결론**\n\n" +
        "신입 때의 딥러닝 관심 → 추천 엔진 서빙 실무 → LLM SaaS 인터페이스 개발 → ADK 기반 엔터프라이즈 AI 에이전트. 각 단계가 누적되어 현재에 이르렀습니다. 기술 트렌드를 쫓은 게 아니라, 항상 '실제 비즈니스 문제를 AI로 어떻게 해결할까'에 집중하다 보니 자연스럽게 여기까지 왔어요.",
      en: "A concise Career Path answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 84,
    category1: "General",
    category2: "Achievement",
    question: {
      ko: "Terraform과 Jenkins를 활용한 IaC 파이프라인 구축 경험을 설명해주세요.",
      en: "Please describe your experience building an IaC pipeline with Terraform and Jenkins.",
    },
    answer: {
      ko:
        "**배경: 단일 엔지니어의 AWS 운영 부담**\n\n" +
        "TheShop EKS + 온프레미스 클러스터 운영을 혼자 담당하면서, 팀 Jenkins 표준과 AWS 콘솔 수동 작업이 뒤섞이는 문제가 있었습니다. Security Group을 콘솔에서 만들었다가 나중에 '누가 이거 추가했지?', 'ECR 레포 목록이 어떻게 되지?' 하는 상황이 반복됐습니다. 그래서 shop-iac 프로젝트로 AWS 인프라를 Terraform IaC로 전환했습니다.\n\n" +
        "**아키텍처: DEV/PRD 계정 완전 분리**\n\n" +
        "가장 중요한 설계 원칙은 **환경 간 완전 격리**였습니다:\n\n" +
        "```\nshop-iac/\n├── modules/          # ECR 등 재사용 모듈\n├── backend/dev/      # DEV 상태 백엔드 (S3 + DynamoDB)\n├── backend/prd/      # PRD 상태 백엔드 (S3 + DynamoDB)\n└── aws-accounts/\n    ├── dev/          # DEV 환경 루트 (계정: 008971653402)\n    └── prd/          # PRD 환경 루트 (계정: 725129837589)\n```\n\n" +
        "각 환경은 독립된 S3 버킷과 DynamoDB 락 테이블을 가집니다. 절대 상태 파일이 공유되지 않아요. DEV 실수가 PRD에 영향을 주는 상황을 원천 차단했습니다.\n\n" +
        "**Jenkins CI/CD 파이프라인**\n\n" +
        "표준 흐름: `Checkout → Init → Validate → Plan → Plan Review → Approval → Apply`\n\n" +
        "핵심 안전 장치:\n" +
        "1. **Destroy Guard**: 플랜 결과를 파싱해 삭제 리소스가 1개라도 있으면 Slack 긴급 알림 + 별도 수동 승인 요구\n" +
        "2. **단일 자격증명**: `TARGET_ENV` 파라미터에 따라 DEV/PRD 자격증명 중 하나만 주입 (교차 오염 방지)\n" +
        "3. **항상 승인 필요**: Apply 전 관리자 승인 스테이지 필수. 자동 Apply 없음\n" +
        "4. **Slack 알림**: 빌드 성공/실패/파괴 감지/승인 대기 4단계 모두 알림\n\n" +
        "**관리하는 리소스**\n\n" +
        "- ECR 레포지토리 6개 (agents, postgres-mcp, codesearch-mcp × dev/prd)\n" +
        "- Security Group (PRD 전용)\n" +
        "- Cognito User Pool (클러스터 OIDC 인증, PRD 전용)\n" +
        "- `prevent_destroy = true`를 ECR, Cognito, S3, DynamoDB에 필수 적용\n\n" +
        "**Import 워크플로우**\n\n" +
        "콘솔에서 이미 만들어진 리소스를 Terraform으로 가져올 때는 HashiCorp 권장 방식을 따랐어요:\n" +
        "1. 리소스 정의 작성 → `imports/` 디렉토리에 import 블록 작성\n" +
        "2. `terraform plan -generate-config-out` 으로 속성 확인\n" +
        "3. 플랜 결과가 **import only, zero destroy**인지 확인 후 apply\n" +
        "4. `imports/` 파일은 감사 기록으로 영구 보존\n\n" +
        "**핵심 교훈**\n\n" +
        "IaC는 인프라를 '코드로 표현하는 것'이 아니라 '감사 가능하고 재현 가능한 상태로 관리하는 것'입니다. Destroy Guard 하나가 실수로 ECR 레포를 날리는 사고를 막아줄 수 있습니다. 인프라 규모가 작아도 처음부터 IaC로 가는 게 맞다고 생각합니다.",
      en: "A concise Achievement answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
  {
    id: 82,
    category1: "General",
    category2: "Technology Perspective",
    question: {
      ko: "소프트웨어 엔지니어링에 대한 AI의 영향에 대해 어떻게 생각하습니까?",
      en: "What is your perspective on AI's impact on software engineering?",
    },
    answer: {
      ko: "**AI가 소프트웨어 엔지니어를 완전히 대체할 것이라는 주장에 대해 다소 회의적입니다.**\n\n**도구로서의 AI, 대체자가 아닌:**\n\nAI가 일부 영역에서 필요한 인력을 줄이고 깊은 지식 습득의 장벽을 낮출 것은 분명하지만, **AI는 근본적으로 도구입니다**. 도구의 본질이 변하지 않는 한, AI는 우리가 활용하는 정교하고 의존도 높은 도구일 뿐입니다.\n\n**인간 전문성의 가치:**\n\n우리의 모든 연구, 탐구, 호기심—\n우리가 획득하는 자격증, 쌓는 경험, 축적하는 지식, 그리고 마스터하는 AI 기술—\n**모든 것은 '그 결정적 순간'을 위해 존재합니다.**\n\n**ASAP 순간:**\n\n빡빡한 제약과 제한된 시간 속에서 문제를 해결해야 하는 중요한 순간—\n축적된 지식, 경험, AI 지원, 그리고 팀 시너지가 완벽하게 정렬될 때—\n**바로 그때 우리는 거의 100% 성공을 달성할 수 있습니다.**\n\n**제 경험의 실제 예시:**\n\n1. **프로덕션 장애:** 시스템이 다운되었을 때는 AI가 생성한 가능성이 아니라 즉각적인 패턴 인식이 필요합니다\n2. **아키텍처 결정:** 트레이드오프 이해는 수년간의 운영 경험이 필요합니다\n3. **팀 리더십:** AI는 기술 리더십에 필요한 인간의 판단을 대체할 수 없습니다\n\n**AI 시대에 대한 제 접근법:**\n\n- **AI를 힘의 배수로 수용:** 코드 생성, 문서화, 초기 연구에 AI 활용\n- **상위 레벨 스킬에 집중:** 시스템 사고, 아키텍처 설계, 문제 분해\n- **도메인 전문성 심화:** 인간 판단이 여전히 중요한 영역에 전문화\n- **지속적 적응:** 제 생각은 바뀔 수 있습니다—항상 새로운 현실에 준비하고 적응합니다\n\n**엔지니어가 여전히 필수적인 이유:**\n\n- **컨텍스트 이해:** 비즈니스 요구사항, 시스템 제약, 팀 역학\n- **창의적 문제 해결:** 독특한 도전 과제를 위한 새로운 솔루션\n- **리스크 평가:** 기술적 결정의 함의 이해\n- **종합:** 여러 기술과 요구사항을 일관된 솔루션으로 결합\n\n**핵심:**\n**저는 준비되어 있고, 지속적으로 학습하며, 적응할 준비가 되어 있습니다—왜냐하면 엔지니어링 문제 해결의 기본은 어떤 단일 도구나 기술도 초월하기 때문입니다.**",
      en: "A concise Technology Perspective answer covering real production context, key decision trade-offs, measurable outcomes, and takeaways.",
    },
  },
];
