import type { LocalizedInterviewQuestion } from "@/types/portfolio";

/**
 * Wipro 2차 임원 면접 전용 Q&A
 * JD: Cloud DevOps/SRE Engineer (Harman/Samsung, Seongnam-si)
 *
 * ID 범위: 501–530
 * 임원용: 결론(변화) → 문제 → 행동 → 결과(숫자) → 교훈/확장성
 */
export const wiproQuestions: LocalizedInterviewQuestion[] = [
  // ── 1세트: 기본 임원 면접 15문 ──────────────────────────────────────────

  {
    id: 501,
    category1: "General",
    category2: "Self Introduction",
    priority: "high",
    question: {
      ko: "간단하게 본인 소개와 지금까지의 커리어 경로를 말씀해 주세요.",
      en: "Please give a brief self-introduction and walk through your career path so far.",
    },
    answer: {
      ko:
        "7년 동안 플랫폼 운영에서 가장 중요한 목표를 하나로 잡아왔습니다. MTBF를 늘리고 MTTR을 줄이는 구조를 만드는 것입니다.\n\n" +
        "커리어는 풀스택 개발자로 시작했고, 지금은 재직 중인 회사에서 IDC와 Cloud를 함께 담당하고 있습니다. Kubernetes, Docker, daemon 기반 시스템까지 운영 범위를 넓혀서 보고 있고, EKS와 온프레미스 클러스터를 동시에 운영하면서 배포와 모니터링 체계를 표준화해왔습니다.\n\n" +
        "가용성 설계에서는 최소 3개 이상 프로세스를 기본으로 두고, Pod Anti-Affinity와 PDB를 적용해 서로 다른 AZ에 분산되도록 운영합니다. 덕분에 특정 AZ 장애가 나도 서비스가 끊기지 않게 만들 수 있었고, 장애 대응도 사람이 감에 의존하지 않도록 런북 기반으로 바꿨습니다.\n\n" +
        "가장 큰 성과는 모니터링 플랫폼 도입으로 평균 장애 복구 시간을 18시간에서 10분으로 줄인 경험입니다. 이 방식은 글로벌 엔터프라이즈 환경에서도 바로 적용 가능한 운영 원칙이라고 생각합니다.",
      en: "Over 7 years I've focused on one goal: increasing MTBF and reducing MTTR. I started as a full-stack developer and grew into platform operations, now running EKS and on-premises Kubernetes simultaneously. I standardized deployment and monitoring pipelines from scratch. For availability I run a minimum of three replicas with Pod Anti-Affinity and PDB for cross-AZ distribution. My biggest impact was designing an observability platform that cut MTTI from 18 hours to 10 minutes. That architecture translates directly to global enterprise environments.",
    },
  },
  {
    id: 502,
    category1: "General",
    category2: "Company Interest",
    priority: "high",
    question: {
      ko: "이번 Cloud DevOps/SRE Engineer 포지션에 지원한 가장 큰 이유는 무엇인가요?",
      en: "What is the main reason you applied for this Cloud DevOps/SRE Engineer position?",
    },
    answer: {
      ko:
        "사용자의 요청부터 답변까지 모든 데이터를 분석하고 서비스에 안정성을 보장하는 일은 너무 매력적이라고 생각합니다.\n\n" +
        "제가 만들어온 운영 구조는 일 10만명의 데이터를 안정적으로 처리하지만 더 큰 규모에서도 통하는지 직접 검증하고 싶었습니다.\n\n" +
        "지금까지 EKS, CI/CD, Observability 플랫폼을 국내 단일 서비스 환경에서 처음부터 구축해왔습니다. 그 경험이 한 서비스 안에 머무는 것은 아쉬운 부분이었습니다.\n\n" +
        "글로벌 고객사를 대상으로 멀티 계정, 멀티 리전 환경을 운영하는 이 포지션은 규모 자체가 다른 환경에서 제가 만들어온 방식을 검증하고 확장할 수 있는 기회라고 판단했습니다.\n\n" +
        "또 한 가지는 Java/Spring 환경입니다. 현재 운영하는 서비스도 Spring Boot 기반이라 JVM 튜닝과 APM 구성까지 경험이 있어서, 이곳 환경에도 곧바로 기여할 수 있다고 판단했습니다.",
      en: "Analyzing data end-to-end from user request to response while guaranteeing stability is exactly the work I find most compelling. My platform reliably handles 100K daily users, and I want to validate these same principles at a larger scale. I've built EKS, CI/CD, and Observability stacks end-to-end in a single domestic service — and I'm ready to see how far they travel. Multi-account, multi-region operations for global customers is a fundamentally different scale, and that's the environment where I want to extend what I've built. The Java/Spring stack is also directly relevant — our current service runs Spring Boot, so I can contribute immediately.",
    },
  },
  {
    id: 503,
    category1: "General",
    category2: "Company Interest",
    priority: "high",
    question: {
      ko: "Wipro에 지원한 동기는 무엇이며, 특히 Wipro의 어떤 점이 매력적으로 느껴졌나요?",
      en: "What motivated you to apply to Wipro, and what aspects of Wipro did you find most attractive?",
    },
    answer: {
      ko:
        "글로벌 엔터프라이즈 환경에서 DevOps를 해보고 싶다는 생각이 있었고, Wipro는 그 경험을 제공할 수 있는 회사라고 판단했습니다.\n\n" +
        "스타트업과 이커머스를 거치면서 기술적 기반은 충분히 쌓았다고 생각합니다. 지금 필요한 다음 단계는 65개국에 분산된 팀과 함께 운영하는 경험입니다.\n\n" +
        "Harman 프로젝트가 특히 매력적이었습니다. 커넥티드 디바이스 인프라는 이커머스와는 안정성 요구 수준이 다릅니다. 그 환경에서 SRE로 일하면서 배울 수 있는 것들이 많다고 봤습니다.\n\n" +
        "Azure나 GCP 경험을 넓히고 싶기도 했는데, Wipro처럼 다양한 클라우드를 다루는 환경이 그 기회를 줄 수 있다고 생각했습니다.\n\n" +
        "영어로 협업하는 환경에서 대규모 사용자 문제를 직접 풀 수 있다는 점에서 Wipro에 지원하게 됐습니다.",
      en: "I've been looking for a place to take DevOps to the global enterprise level, and Wipro is where that becomes real. Startups and e-commerce have built a solid technical foundation — the next step is operating alongside teams distributed across 65 countries. The Harman project stood out specifically: connected device infrastructure has fundamentally different reliability requirements than e-commerce. I also want to broaden cloud exposure beyond AWS into Azure and GCP, and Wipro's multi-cloud client base provides exactly that. Working in English on large-scale user problems is what brought me to this application.",
    },
  },
  {
    id: 504,
    category1: "Infrastructure",
    category2: "AWS",
    priority: "high",
    question: {
      ko: "지금까지 AWS 기반 인프라를 운영하면서 가장 큰 도전이었던 프로젝트는 무엇이었고, 어떻게 극복했나요?",
      en: "What was the most challenging project while operating AWS-based infrastructure, and how did you overcome it?",
    },
    answer: {
      ko:
        "EKS에서 Stateful 워크로드가 AZ를 넘어가지 못하는 구조적 문제를 해결한 경험이 있습니다.\n\n" +
        "GitLab이 Spot 인스턴스 인터럽션으로 AZ를 이동해야 할 때, EBS PV가 기존 AZ에 고정되어 있어 재마운트가 안 됐습니다. 서비스가 중단됐고, 처음에는 원인 파악도 쉽지 않았습니다.\n\n" +
        "EFS로 교체하는 안을 먼저 검토했지만, GitLab이 NFS 성능에 민감하고 비용 부담도 있어서 제외했습니다. 대신 GitLab, ClickHouse처럼 Stateful 성격이 강한 워크로드만 On-Demand 전용 NodeGroup으로 분리하고, PV와 NodeGroup의 AZ를 명시적으로 맞춰 설계했습니다.\n\n" +
        "PodDisruptionBudget을 추가해서 노드 교체 중에도 최소 서비스는 유지하게 했고, Argo CD Health Check를 강화해 PV가 Bound 상태가 될 때까지 배포 완료로 처리하지 않도록 했습니다.\n\n" +
        "이 사건이 계기가 되어 Stateful/Stateless NodeGroup 분리를 클러스터 설계 표준으로 명문화했습니다.",
      en: "The toughest structural problem I solved on EKS was Stateful workloads being unable to cross AZ boundaries. When GitLab needed to move AZs after a Spot interruption, its EBS PV was pinned to the original AZ and couldn't remount — the service went down. I ruled out EFS due to NFS performance sensitivity and cost. Instead I separated Stateful workloads into dedicated On-Demand NodeGroups and explicitly aligned PV and NodeGroup AZs. I added PodDisruptionBudgets for minimum availability during node replacements and strengthened Argo CD Health Checks to hold completion status until PVs reached Bound state. This became the foundation for a cluster design standard: explicit Stateful/Stateless NodeGroup separation.",
    },
  },
  {
    id: 505,
    category1: "Infrastructure",
    category2: "EKS",
    priority: "high",
    question: {
      ko: "Kubernetes(EKS) 환경에서 Multi-Cluster 또는 Multi-Account 구조를 설계/운영한 경험이 있으신가요? 구체적인 사례를 들어주세요.",
      en: "Do you have experience designing or operating a Multi-Cluster or Multi-Account structure in a Kubernetes (EKS) environment? Please share a specific example.",
    },
    answer: {
      ko:
        "EKS와 온프레미스 Kubernetes를 함께 운영하는 하이브리드 멀티 클러스터 환경을 설계하고 운영해왔습니다.\n\n" +
        "역할 분리는 명확하게 했습니다. EKS는 AWS 서비스와 깊은 통합이 필요한 워크로드, 온프레미스는 IDC 내 Oracle DB와 인접해야 하거나 Ceph 스토리지를 직접 다뤄야 하는 워크로드를 담당합니다.\n\n" +
        "운영하면서 가장 어려운 부분은 Stateful 워크로드의 AZ 고정 문제였습니다. GitLab이 Spot 인터럽션으로 AZ를 이동해야 할 때 EBS PV가 원래 AZ에 고정되어 재마운트가 되지 않는 상황이 발생했습니다. EFS 전환은 NFS 성능 민감도와 비용 문제로 제외하고, 대신 Stateful 워크로드를 On-Demand 전용 NodeGroup으로 분리하고 PV와 NodeGroup의 AZ를 명시적으로 일치시켜 해결했습니다.\n\n" +
        "배포 파이프라인도 환경마다 달랐던 걸 GitLab CI에서 ECR로 push하고 Argo CD가 클러스터에 동기화하는 단일 흐름으로 통일했습니다. 운영 복잡도가 크게 줄었습니다.\n\n" +
        "AWS 계정은 이미 DEV(008971653402)와 PRD(725129837589)로 완전 분리해 Terraform shop-iac 프로젝트로 관리하고 있습니다. ECR, Security Group, Cognito를 선언적으로 코드화하고, Jenkins 파이프라인에 Destroy Guard와 Slack 승인을 연동해 운영 중입니다.",
      en: "I've designed and operated a hybrid multi-cluster environment running EKS and on-premises Kubernetes simultaneously. EKS handles workloads needing deep AWS integration; on-premises handles workloads adjacent to IDC Oracle databases or directly managing Ceph storage. The hardest problem was Stateful AZ pinning — EBS PVs stuck to original AZs after Spot interruptions. I resolved it by separating Stateful workloads into On-Demand NodeGroups with explicitly matched AZs. I also unified the deployment pipeline into a single flow: GitLab CI pushes to ECR, Argo CD syncs to each cluster. AWS accounts are already fully split into DEV and PRD, managed declaratively via Terraform shop-iac with Jenkins Destroy Guard and Slack approval gates.",
    },
  },
  {
    id: 506,
    category1: "Infrastructure",
    category2: "CI/CD",
    priority: "high",
    question: {
      ko: "CI/CD 파이프라인(GitHub, Jenkins, ArgoCD, GitOps, Helm 등)을 구축하거나 대규모로 개선한 경험을 말씀해 주세요.",
      en: "Please describe your experience building or significantly improving a CI/CD pipeline (GitHub, Jenkins, ArgoCD, GitOps, Helm, etc.).",
    },
    answer: {
      ko:
        "레거시 수동 배포 환경을 완전 자동화된 GitOps 체계로 전환한 경험이 있습니다.\n\n" +
        "기존 환경은 Nexus에 저장된 latest 태그 이미지를 Jenkins가 수동으로 배포하는 구조였습니다. latest 태그는 덮어써지기 때문에 어느 버전이 운영 중인지 추적할 수 없었고, 배포 이력은 Slack 메시지에만 남았습니다. 롤백이 필요한 상황에서는 이전 이미지를 찾는 것부터 다시 시작해야 했고, 평균 30분 이상이 소요됐습니다.\n\n" +
        "전환의 핵심은 두 가지였습니다. 먼저 이미지 관리를 Nexus latest에서 ECR 시맨틱 버전 태그로 바꿨습니다. GitLab CI가 커밋마다 고유 태그로 이미지를 빌드해 ECR에 푸시하고, Argo CD Image Updater가 최신 태그를 감지해 Helm values를 자동으로 갱신합니다. 모든 배포 이력이 Git commit으로 남습니다.\n\n" +
        "롤백은 Git revert 한 번으로 끝납니다. Argo CD가 이전 커밋 상태로 클러스터를 자동 복원하기 때문에 실제 소요 시간은 1분 이내입니다. ECR 수명 주기 정책으로 최근 5개 릴리즈 이미지를 항상 보존하도록 설정해 언제든 안전하게 되돌릴 수 있는 기반도 갖췄습니다.\n\n" +
        "배포 빈도는 월 2~3회에서 하루 1~2회로 늘었고, 사람이 배포 과정에 개입하는 단계를 완전히 제거했습니다. 배포 안정성은 개인의 숙련도가 아니라 구조에서 나온다는 것을 이 전환으로 확신하게 됐습니다.",
      en: "I migrated a legacy manual deployment environment to fully automated GitOps. The original setup used Jenkins to manually deploy latest-tagged images from Nexus — no version tracking, deployment history only in Slack, rollbacks averaging 30+ minutes of hunting for previous images. The transformation: I moved image management to ECR semantic version tags. GitLab CI builds a unique-tagged image per commit; Argo CD Image Updater detects the latest tag and auto-updates Helm values. Rollback is a single Git revert — Argo CD restores the cluster to the previous commit state in under 1 minute. ECR lifecycle policies preserve the last 5 releases at all times. Deployment frequency went from 2–3 times a month to 1–2 times daily, with zero human intervention in the pipeline.",
    },
  },
  {
    id: 507,
    category1: "Infrastructure",
    category2: "Incident Management",
    priority: "high",
    question: {
      ko: "Production 환경에서 발생한 장애를 Troubleshooting한 가장 인상 깊었던 사례를 들려주세요. (Root Cause Analysis와 재발 방지 조치 포함)",
      en: "Please share the most memorable incident you troubleshot in a Production environment, including Root Cause Analysis and preventive measures.",
    },
    answer: {
      ko:
        "두 가지 사례를 말씀드리겠습니다. 하나는 간헐적 재현 장애, 다른 하나는 프로세스 전반에 걸친 메모리 누수였습니다.\n\n" +
        "**첫 번째: S3 이미지 업로드 하루 1회 간헐적 실패**\n\n" +
        "Next.js 프론트엔드에서 Spring 백엔드를 통해 AWS SDK로 S3에 상품 이미지를 업로드하는 기능이 하루에 한 번 꼴로 실패했습니다. 재현도 잘 안 됐고, 에러 로그에는 단순한 SDK 예외만 찍혔습니다.\n\n" +
        "우선 실패 시점의 패턴을 분석했습니다. 업타임이 길어진 시점에 집중되는 것을 확인하고 SDK 클라이언트 생성 방식을 살펴봤더니 요청마다 new 로 인스턴스를 생성하고 있었습니다. AWS SDK는 내부적으로 자격증명과 HTTP 연결 풀을 관리하는데, 클라이언트를 싱글톤으로 두지 않으면 연결 풀이 고갈되거나 자격증명 갱신 타이밍이 어긋날 수 있습니다.\n\n" +
        "SDK 클라이언트를 애플리케이션 시작 시점에 한 번만 생성하는 싱글톤으로 변경했고, 이후 동일 장애는 발생하지 않았습니다. 재발 방지로 SDK 클라이언트 생성 패턴을 코드 리뷰 체크리스트에 추가했습니다.\n\n" +
        "**두 번째: 대용량 엑셀 다운로드 시 메모리 누수로 인한 서버 OOM**\n\n" +
        "특정 API 호출 후 시간이 지나면 서버 메모리가 점진적으로 증가해 결국 OOM으로 재시작되는 현상이 반복됐습니다. 대용량 데이터 다운로드 요청 직후 메모리 급증이 관측되는 것을 Grafana에서 확인했습니다.\n\n" +
        "jmap으로 Heap Dump를 추출하고 Eclipse MAT으로 분석했습니다. 특정 엑셀 템플릿 라이브러리가 POI XSSFWorkbook 객체를 요청 완료 후에도 GC가 회수하지 못하는 상태로 남겨두고 있었습니다. 내부적으로 스타일 오브젝트를 정적 캐시에 누적하는 구조였고, 요청 수에 비례해 메모리가 증가하는 패턴이었습니다.\n\n" +
        "원인과 Heap Dump 분석 결과를 정리해 프로덕트 팀에 전달했고, 해당 라이브러리를 스트리밍 방식의 SXSSFWorkbook으로 교체하는 것으로 결론이 났습니다. 교체 후 동일 부하에서 메모리 점유가 70% 수준으로 안정화됐습니다. 재발 방지로 대용량 처리 API에 대한 메모리 사용률 알림을 Prometheus에 추가했습니다.",
      en: "Two cases: an intermittent failure and a memory leak. Case 1 — S3 product image upload failing ~once daily. The failure correlated with long uptimes; examining SDK instantiation revealed a new client instance being created per request. AWS SDK internally manages credential refresh and HTTP connection pooling — without a singleton, connection pools exhaust or credential refresh timing drifts. Switching to a singleton client created once at startup eliminated the issue. Case 2 — Server OOM on large Excel downloads. Heap Dump via jmap analyzed in Eclipse MAT revealed a POI XSSFWorkbook template library accumulating style objects in a static cache proportional to request count. I documented the root cause analysis and handed it to the product team; they replaced it with streaming SXSSFWorkbook, stabilizing memory at ~70% under the same load. Prometheus memory alerts were added for large-data APIs.",
    },
  },
  {
    id: 508,
    category1: "Infrastructure",
    category2: "IaC",
    priority: "high",
    question: {
      ko: "Infrastructure as Code(Terraform, Helm, CloudFormation)로 인프라를 관리한 경험 중 가장 효과적이었던 사례는 무엇인가요?",
      en: "What was the most effective use case of managing infrastructure with Infrastructure as Code (Terraform, Helm, CloudFormation)?",
    },
    answer: {
      ko:
        "Terraform으로 AWS 멀티 계정 구조를 코드로 관리한 shop-iac 프로젝트가 가장 효과적이었습니다.\n\n" +
        "이전에는 ECR 레포지토리, Security Group, Cognito User Pool을 AWS 콘솔에서 직접 만들었습니다. 'ECR 목록이 어떻게 되지?', '이 Security Group은 누가 왜 만들었지?' 같은 질문이 반복됐고, 변경 이력이 전혀 없어 감사나 장애 대응 때마다 시간을 낭비했습니다.\n\n" +
        "DEV(008971653402)와 PRD(725129837589) 계정을 디렉토리 수준부터 완전히 분리하고, 각각 독립된 S3 백엔드와 DynamoDB 락 테이블을 사용하도록 설계했습니다. ECR 레포지토리 6개, Security Group, Cognito를 선언적으로 코드화하고, `prevent_destroy = true`를 핵심 리소스에 필수 적용했습니다.\n\n" +
        "배포 안전성은 Jenkins 파이프라인으로 강화했습니다. Plan 결과를 파싱해 삭제 리소스가 하나라도 감지되면 Slack 긴급 알림과 별도 수동 승인을 요구하는 Destroy Guard를 만들었고, Apply는 항상 저장된 Plan 파일 기준으로만 실행됩니다. 자동 Apply는 없습니다.\n\n" +
        "클러스터 서비스 배포 쪽은 Helm으로 관리합니다. shop-ai-chart 하나로 orchestrator, meeting_agent, recommend_agent, customer_service_agent 4개 컴포넌트를 values 파일 분기만으로 DEV/PRD에 동일하게 배포합니다. GitLab/Airflow/ClickHouse도 같은 방식입니다.\n\n" +
        "이 구조 덕분에 모든 인프라 변경이 PR 기록으로 남고, 신규 리소스 추가는 코드 작성과 PR 승인으로 끝납니다. 콘솔에서 무언가를 만드는 사람이 없어졌습니다.",
      en: "The shop-iac Terraform project managing AWS multi-account infrastructure as code has been the most effective IaC work I've done. Previously, ECR repos, Security Groups, and Cognito User Pools were created through the console with no change history — audits and incident response wasted time every time. I separated DEV and PRD accounts at the directory level, each with independent S3 backends and DynamoDB lock tables. Six ECR repos, Security Groups, and Cognito are declaratively codified with prevent_destroy applied to critical resources. A Jenkins Destroy Guard parses plan output and requires Slack notification plus manual approval if any deletion is detected — Apply runs only against a saved plan file. Helm manages cluster service deployments: shop-ai-chart deploys four AI agent components via values file branching. Every change has a PR record; nobody creates resources through the console anymore.",
    },
  },
  {
    id: 509,
    category1: "Infrastructure",
    category2: "Cost Optimization",
    priority: "medium",
    question: {
      ko: "비용 최적화(Cost Optimization) 또는 Security Automation을 위해 스크립트나 도구를 개발/운영한 경험이 있나요?",
      en: "Do you have experience developing or operating scripts or tools for Cost Optimization or Security Automation?",
    },
    answer: {
      ko:
        "비용 구조를 능동적으로 개선한 경험을 세 가지로 정리할 수 있습니다.\n\n" +
        "첫 번째는 Karpenter를 활용한 EKS 컴퓨팅 비용 최적화입니다. 기존 고정 On-Demand 노드 구성에서 Karpenter NodePool로 전환해 Spot 인스턴스를 우선 사용하도록 설정했습니다. Spot 인터럽션 시 자동으로 다른 인스턴스 타입으로 교체하는 failover 구성을 함께 적용해 안정성을 유지하면서 컴퓨팅 비용을 절감했습니다. Stateful 워크로드만 On-Demand NodeGroup으로 분리해 인터럽션 리스크를 차단했습니다.\n\n" +
        "두 번째는 S3 스토리지 클래스 최적화입니다. 관측성 플랫폼에서 수집되는 로그와 트레이스 데이터가 S3에 대량으로 누적되면서 스토리지 비용이 빠르게 증가했습니다. 접근 패턴을 분석하니 데이터의 대부분이 초기 며칠만 집중 조회되고 이후 거의 접근이 없었습니다. General Purpose에서 S3 Intelligent-Tiering으로 전환해 비용을 줄였습니다.\n\n" +
        "세 번째는 CloudWatch 로그 수집 비용 이상 감지 자동화입니다. CloudWatch Log Ingestion 비용이 예측 범위를 벗어나는 달이 생기면서, AWS Budgets와 Cost Explorer를 조합해 일별 로그 수집량 급증을 감지하면 Slack으로 알림이 오는 구조를 만들었습니다. 이상 감지 후 확인해보면 특정 서비스의 로그 레벨이 DEBUG로 배포된 경우가 많았고, 알림 덕분에 당일 조치가 가능해졌습니다.",
      en: "I've improved cost structure across three areas. First, EKS compute via Karpenter: transitioned fixed On-Demand nodes to NodePools preferring Spot, with automatic failover to alternative instance types on interruption. Stateful workloads stay in On-Demand NodeGroups to eliminate interruption risk. Second, S3 storage class optimization: observability data access pattern analysis showed heavy access in the first few days then near-zero afterward — transitioning to S3 Intelligent-Tiering reduced storage costs significantly. Third, CloudWatch Log Ingestion cost anomaly detection: I combined AWS Budgets with Cost Explorer to trigger Slack alerts on daily ingestion spikes. Most anomalies turned out to be services deployed with DEBUG log levels — same-day remediation became possible.",
    },
  },
  {
    id: 510,
    category1: "Observability",
    category2: "Monitoring",
    priority: "high",
    question: {
      ko: "DataDog, Grafana, Prometheus 등 모니터링 시스템을 구축하고 Alerting/Observability를 강화한 경험이 있으신가요?",
      en: "Do you have experience building monitoring systems like DataDog, Grafana, or Prometheus and strengthening Alerting/Observability?",
    },
    answer: {
      ko:
        "장애 탐지 시간을 18시간에서 10분으로 줄이는 관측성 플랫폼을 단독으로 설계하고 전사에 도입했습니다.\n\n" +
        "도입 전에는 장애가 나면 개발자들이 각자 서버 로그를 뒤지는 방식이었습니다. Trace, Metric, Log가 각각 다른 도구에 분산돼 있어서 원인 파악에 평균 18시간이 걸렸습니다.\n\n" +
        "OpenTelemetry Collector로 세 신호를 수집하고 Grafana에서 Trace ID로 묶어볼 수 있는 구조를 만들었습니다. DataDog도 검토했지만 장기적인 비용과 데이터 소유권 문제로 오픈소스 스택을 선택했습니다.\n\n" +
        "성능 검증은 운영 지표만 보지 않고 스트레스 테스트까지 포함했습니다. 애플리케이션은 Grafana k6로 주요 API 시나리오를 만들어 부하를 단계적으로 올렸고, Linux 레벨은 stress-ng와 vmstat, iostat로 CPU steal, run queue, IO wait를 함께 관찰했습니다. 이 과정을 통해 병목이 애플리케이션인지 OS 레벨인지 빠르게 분리할 수 있었습니다.\n\n" +
        "구축 과정에서 AWS CloudWatch Exporter와 OTel Collector에서 예상과 다른 동작을 발견했습니다. 공식 문서와 소스 코드를 직접 분석해 원인을 파악했고, 설정 조정과 커스텀 파이프라인 구성으로 해결했습니다. 이 과정에서 각 컴포넌트의 내부 동작을 깊이 이해하게 됐고, 플랫폼 안정성을 높이는 데 도움이 됐습니다.\n\n" +
        "지금은 알림이 먼저 오고, Trace를 열면 어느 서비스의 어느 구간에서 문제가 발생했는지 10분 안에 특정할 수 있습니다. 팀이 장애를 대하는 방식 자체가 달라졌습니다.",
      en: "I single-handedly designed and deployed an observability platform organization-wide, reducing incident detection time from 18 hours to 10 minutes. Before the platform, engineers each dug through their own server logs; Trace, Metric, and Log lived in separate tools. I unified all three signals via OpenTelemetry Collector and built a Grafana structure where everything correlates via Trace ID. DataDog was evaluated but ruled out for long-term cost and data ownership reasons. Performance validation included stress testing: Grafana k6 for API load scenarios, stress-ng and vmstat/iostat for OS-level bottleneck identification. When AWS CloudWatch Exporter and OTel Collector exhibited unexpected behavior, I analyzed documentation and source code to identify root causes and resolved them through configuration adjustments. Today alerts fire first, and a Trace identifies the responsible service and span within 10 minutes.",
    },
  },
  {
    id: 511,
    category1: "General",
    category2: "Global Team",
    priority: "medium",
    question: {
      ko: "글로벌 팀(해외 엔지니어들과 협업)에서 DevOps/SRE 업무를 수행한 경험은 어떤가요? 어려웠던 점과 극복 방법은?",
      en: "What has your experience been performing DevOps/SRE work in a global team with overseas engineers? What were the challenges and how did you overcome them?",
    },
    answer: {
      ko:
        "직접적인 글로벌 조직 협업 경험은 오픈소스 기여 활동을 통해 쌓았습니다.\n\n" +
        "관측성 플랫폼을 구축하는 과정에서 AWS SDK와 모니터링 관련 오픈소스에서 예상과 다른 동작을 만날 때마다 공식 문서와 소스 코드를 직접 분석해 원인을 파악하고 설정 수준에서 해결했습니다. 이 과정이 라이브러리 내부 동작을 깊이 이해하는 계기가 됐고, 이후 유사 문제를 빠르게 진단하는 기반이 됐습니다.\n\n" +
        "개인적으로도 이 역량을 강화하려고 작년 말부터 영어 스피킹 학원을 꾸준히 다니고 있습니다. 기술 영어를 읽는 수준을 넘어서, 회의에서 맥락을 정확히 설명하고 합의를 이끌어내는 수준으로 끌어올리는 게 목표입니다.\n\n" +
        "기술 영어는 이미 실무에서 쓰고 있습니다. AWS 공식 문서, OTel 스펙, Kubernetes enhancement proposal을 일상적으로 읽고, GitHub 이슈와 Stack Overflow에서 영문 컨텍스트를 직접 파악해 문제를 해결해왔습니다. 말하기 쪽은 현재 스피킹 훈련을 병행하면서 끌어올리고 있고, 실무 투입에 문제없는 수준을 목표로 하고 있습니다.",
      en: "My global technical collaboration experience has come through working with open-source tooling and international technical communities. When unexpected behaviors appeared in AWS SDK and monitoring-related open-source components, I analyzed official documentation and source code directly each time, resolving issues at the configuration level. This deepened my understanding of library internals and built a fast-diagnosis foundation. On the language side, I've been attending English speaking classes consistently since late last year — the goal is moving beyond reading technical English to explaining context precisely and driving consensus in meetings. Technical English is already daily work: AWS docs, OTel specs, Kubernetes Enhancement Proposals, GitHub issues, and Stack Overflow are all part of my routine.",
    },
  },
  {
    id: 512,
    category1: "Infrastructure",
    category2: "Cloud Native",
    priority: "medium",
    question: {
      ko: "Cloud-Native 사고방식(Self-healing, Automation, Containerization)에 대해 본인이 중요하다고 생각하는 점과 실제 적용 사례를 말씀해 주세요.",
      en: "What do you consider most important about the Cloud-Native mindset (Self-healing, Automation, Containerization), and what are some real-world applications?",
    },
    answer: {
      ko:
        "Cloud-Native의 본질은 운영자 없이도 시스템이 안전한 상태로 돌아올 수 있는 구조라고 생각합니다.\n\n" +
        "실제로 가장 체감이 컸던 건 Kubernetes Probe 설정이었습니다. JVM 서비스에 Startup Probe를 별도로 설정하지 않으면, 기동 중에 Liveness Probe가 Pod를 kill하는 상황이 반복됩니다. 세 Probe를 서비스 특성에 맞게 분리 설정한 후 새벽 장애 호출이 80% 이상 줄었습니다.\n\n" +
        "자동화 측면에서는 Karpenter와 HPA를 조합해서 세일 이벤트 때 트래픽이 4배 급증해도 수동 개입 없이 자동 확장되게 만들었습니다. 담당자가 새벽에 콘솔 열고 노드 추가하던 작업이 없어졌습니다.\n\n" +
        "컨테이너 이미지는 보안 자동화와 함께 관리합니다. 빌드 시 이미지 스캔을 실행해서 HIGH 이상 취약점이 있으면 파이프라인 자체가 실패합니다.\n\n" +
        "Cloud-Native는 슬로건이 아니라, 사람이 없어도 시스템이 작동한다는 신뢰를 만드는 과정입니다.",
      en: "Cloud-Native fundamentally means the system returns to a safe state without an operator. The most tangible example was Kubernetes Probe configuration: without a separate Startup Probe for JVM services, Liveness Probe kills the Pod during initialization — restart cycles repeat. After separating the three Probes based on each service's characteristics, late-night incident calls dropped by 80%. On automation, combining Karpenter with HPA eliminated manual node additions during 4x traffic spikes from sales events. Container images are managed alongside security automation: a vulnerability scan runs at build time and the pipeline fails on any HIGH or above CVE. Cloud-Native isn't a slogan — it's the process of building confidence that systems operate even when nobody is watching.",
    },
  },
  {
    id: 513,
    category1: "General",
    category2: "Trends",
    priority: "medium",
    question: {
      ko: "향후 2~3년 안에 DevOps/SRE 분야에서 가장 중요한 트렌드나 변화는 무엇이라고 보시나요? 본인은 어떻게 대비하고 계신가요?",
      en: "What do you see as the most important trends in the DevOps/SRE field over the next 2–3 years, and how are you preparing?",
    },
    answer: {
      ko:
        "Platform Engineering과 AI-Assisted Operations, 두 가지가 SRE의 역할을 근본적으로 바꿀 것이라고 봅니다.\n\n" +
        "Platform Engineering은 SRE가 인프라를 직접 관리하는 것에서 개발자가 셀프서비스로 인프라를 쓸 수 있는 플랫폼을 만드는 역할로 전환되는 흐름입니다. 저는 Argo CD와 Helm Chart 라이브러리를 기반으로 소규모 IDP(internal develop platform)를 이미 구현해봤습니다.\n\n" +
        "AI-Assisted Operations는 현재 직접 실험하고 있습니다. 알림이 너무 많으면 오히려 대응이 느려진다는 문제를 먼저 풀었습니다. 사내 EKS에서 Bedrock 기반 AI 에이전트 플랫폼을 활용해 알림·지표를 통합 분석하고, P1은 즉시 알림은 AWS SNS ➔ Lambda ➔ Monitoring LLM API 호출, P2는 주기적 스캔 후 통합 1회 알림으로 분리했습니다. 온콜 담당자가 받는 알림 수를 줄이되 정말 중요한 신호만 전달되도록 설계했습니다. Instruction + script + AI agent + skill을 결합한 AX 구조 위에서 LLM이 진단 스크립트를 직접 호출해 초기 원인과 권장 조치를 함께 포스팅합니다.\n\n" +
        "여기서 중요한 건 AI가 실행하는 것이 아니라 진단하는 역할에 집중해야 한다는 점입니다. 자동화 범위를 잘못 설정하면 장애를 키울 수 있습니다.\n\n" +
        "MCP로 운영 도구를 LLM에 연결하는 구조를 지금도 실험하고 있고, 이 경험이 Wipro 입사 후 바로 쓰일 수 있다고 봅니다.",
      en: "Platform Engineering and AI-Assisted Operations are the two forces reshaping SRE. Platform Engineering shifts SRE from directly managing infrastructure to building the self-service platform developers use. I've already implemented a small-scale IDP based on Argo CD and Helm Chart libraries. For AI-Assisted Operations, I'm actively experimenting now: on EKS with Bedrock-based AI agent infrastructure, I built alert consolidation that sends P1 alerts immediately via SNS → Lambda → LLM API and consolidates P2 alerts into a single periodic notification — reducing on-call alert volume while preserving signal quality. An AX pipeline of Instruction + script + AI agent + skill has the LLM call diagnostic scripts directly and post root cause and recommended actions. The critical principle: AI diagnoses, humans decide. I'm also experimenting with MCP to connect operational tools directly to LLM context.",
    },
  },
  {
    id: 514,
    category1: "General",
    category2: "Leadership",
    priority: "medium",
    question: {
      ko: "팀원(주니어 포함)을 멘토링하거나, 기술적인 리더십을 발휘했던 경험을 구체적으로 들려주세요.",
      en: "Please share a specific experience where you mentored team members (including juniors) or demonstrated technical leadership.",
    },
    answer: {
      ko:
        "팀 전체의 장애 대응 방식을 바꾼 경험이 기술 리더십이라고 부를 수 있을 것 같습니다.\n\n" +
        "OpenTelemetry를 도입하려 했을 때 백엔드 팀은 성능 영향을 우려했고, 인프라 팀은 추가 운영 부담을 걱정했습니다. 말로 설득하는 것보다 증거를 먼저 만드는 쪽을 택했습니다. Java, JavaScript, Python 세 언어로 직접 POC를 구현해서 CPU 오버헤드가 1% 미만임을 실측으로 보여줬습니다.\n\n" +
        "이후 팀원들이 직접 Span을 찍어보는 2시간 핸즈온 세션을 진행했습니다. '직접 해보니까 왜 필요한지 알겠다'는 반응이 나오면서 2주 안에 저항이 없어졌습니다.\n\n" +
        "신입 엔지니어 멘토링도 했습니다. AWS 자격증 스터디를 함께 했고, 제가 처음 EKS를 배울 때 헤맸던 부분들을 정리해서 공유했습니다. 6개월 후 그 멤버가 SysOps 자격증을 취득했습니다.\n\n" +
        "기술 리더십은 권한이 아니라 '직접 경험하게 만드는 것'에서 나온다고 생각합니다.",
      en: "The experience that best fits 'technical leadership' is changing how the entire team handles incidents. When I proposed OpenTelemetry adoption, the backend team worried about performance overhead and infra team worried about operational burden. Instead of arguing, I built proof: a working POC across Java, JavaScript, and Python showing less than 1% CPU overhead from direct measurement. I then ran a 2-hour hands-on session where team members added their own Spans — resistance disappeared within two weeks. For junior mentoring, I ran an AWS certification study group and documented the EKS areas that had taken me the longest to learn. Six months later that engineer passed the SysOps certification. Technical leadership comes from making people experience things directly, not from authority.",
    },
  },
  {
    id: 515,
    category1: "General",
    category2: "Contribution",
    priority: "high",
    question: {
      ko: "이 포지션에서 본인이 Wipro에 가장 크게 기여할 수 있는 부분은 무엇이라고 생각하시나요?",
      en: "What do you think is the area where you can contribute most to Wipro in this position?",
    },
    answer: {
      ko:
        "세 가지 영역에서 직접적으로 기여할 수 있습니다.\n\n" +
        "첫째는 관측성 기반 장애 대응 속도 단축입니다. OpenTelemetry 기반 플랫폼을 처음부터 설계해 MTTI를 18시간에서 10분으로 줄인 경험이 있습니다. Trace, Metric, Log를 단일 Trace ID로 묶고 Loki, Tempo, Prometheus, ClickHouse를 연동한 구조입니다. 이 설계를 Wipro 고객사 환경에 이식할 수 있습니다.\n\n" +
        "둘째는 AI 기반 운영 자동화입니다. 현재 EKS에서 AWS Bedrock + ADK-Go + MCP/A2A 프로토콜 기반 멀티 에이전트 플랫폼을 직접 운영하고 있습니다. 알림·지표를 통합 분석해 P1은 즉시, P2는 주기 스캔 후 통합 1회만 발송하는 알림 노이즈 감소 구조를 적용했고, Instruction + script + AI agent + skill을 결합한 AX 파이프라인으로 LLM이 진단 스크립트를 직접 호출해 초기 원인과 권장 조치를 온콜 담당자에게 전달합니다. 이 구조는 Wipro 고객사 환경에서도 MTTR을 실질적으로 줄이는 데 바로 적용 가능합니다.\n\n" +
        "셋째는 GitOps 기반 배포 체계 개선입니다. Nexus latest 태그 수동 배포에서 ECR 시맨틱 태그 + Argo CD Image Updater 완전 자동화로 전환해 롤백 시간을 30분에서 1분으로 줄이고, ECR 수명 주기 정책으로 최근 5개 릴리즈를 항상 보존하는 백업 체계를 구축했습니다.\n\n" +
        "글로벌 엔터프라이즈 스케일은 처음이지만, 이 세 가지 구조는 규모가 달라져도 원칙이 동일하게 작동합니다.",
      en: "Three areas for direct contribution. First, observability-driven incident response: I designed an OTel platform from scratch reducing MTTI from 18 hours to 10 minutes — Trace, Metric, Log under a single Trace ID with Loki, Tempo, Prometheus, and ClickHouse. That architecture is portable to Wipro client environments. Second, AI-driven operational automation: I operate a multi-agent platform on EKS using AWS Bedrock, ADK-Go, and MCP/A2A protocols. P1 triggers immediate consolidated alerts; P2 runs periodic scan-then-consolidate. An AX pipeline of Instruction + script + AI agent + skill has the LLM call diagnostic scripts and deliver root cause and recommended actions to on-call engineers — immediately applicable to reducing client MTTR. Third, GitOps deployment modernization: migrated from Nexus latest-tag manual deployments to ECR semantic-tag + Argo CD full automation, cutting rollback time from 30 minutes to under 1 minute.",
    },
  },

  // ── 2세트: 심층 임원 면접 15문 ──────────────────────────────────────────

  {
    id: 516,
    category1: "Infrastructure",
    category2: "Incident Management",
    priority: "high",
    question: {
      ko: "프로덕션 환경, 특히 멀티 클러스터나 멀티 계정 환경에서 발생한 가장 치명적인 장애 상황에 대해 말씀해 주십시오. 당시 어떻게 문제를 해결했으며, 이후 조직의 프로세스나 시스템에 어떤 '근본적인 변화'를 가져왔습니까?",
      en: "Describe the most critical incident in a production environment — especially in a multi-cluster or multi-account setup — how you resolved it, and what fundamental changes it drove in your organization's processes.",
    },
    answer: {
      ko:
        "새벽 배포 중 EKS 노드 전체가 NotReady로 전환되어 10분간 서비스가 완전히 중단된 경험이 있습니다.\n\n" +
        "당시 배포 파이프라인이 실행되면서 Karpenter가 노드를 대규모로 프로비저닝했는데, NodePool에 상한이 없다 보니 수십 대가 한꺼번에 요청됐고 EC2 용량 부족으로 모두 NotReady 상태가 됐습니다. 운영 중이던 Pod들이 재스케줄링되면서 서비스가 멈췄습니다.\n\n" +
        "즉각 조치로 NodePool에 maxNodes 제한을 추가하고, 단일 인스턴스 타입 의존에서 벗어나도록 여러 타입을 지정했습니다.\n\n" +
        "이후 세 가지를 바꿨습니다. 새벽 시간대 배포를 막는 Change Freeze Window 정책을 도입했고, 배포 전 Karpenter 상태를 확인하는 단계를 CI에 추가했습니다. 그리고 분기마다 노드 강제 제거 시나리오를 실제로 테스트하는 게임데이를 운영하기 시작했습니다.\n\n" +
        "사건 자체보다 더 중요한 건 이후 팀이 '다음 장애를 미리 설계하는 문화'를 갖게 됐다는 점입니다.",
      en: "During a predawn deployment, every EKS node went NotReady for 10 minutes taking the entire service down. The deployment triggered Karpenter to provision nodes at scale, but with no NodePool upper bound, dozens were requested simultaneously — EC2 capacity limits left all of them NotReady, and running Pods rescheduled with the service stopped. Immediate fix: added maxNodes cap and specified multiple instance types. Three process changes followed: a Change Freeze Window policy blocking predawn deployments, a Karpenter state verification step in CI pre-deployment, and a quarterly game day testing forced node eviction scenarios. The more important outcome was cultural — the team started designing for the next failure before it happened.",
    },
  },
  {
    id: 517,
    category1: "Infrastructure",
    category2: "EKS",
    priority: "high",
    question: {
      ko: "JD에서 강조하고 있는 'Self-healing(자가 복구)' 시스템에 대한 본인만의 정의는 무엇입니까? 또한 이를 EKS 환경에서 어떻게 완벽하게 구현할 수 있다고 생각하십니까?",
      en: "How do you define a 'Self-healing' system as emphasized in the JD, and how do you implement it fully in an EKS environment?",
    },
    answer: {
      ko:
        "Self-healing은 사람이 개입하기 전에 시스템이 스스로 안전한 상태로 돌아가는 능력이라고 정의합니다.\n\n" +
        "EKS에서는 이걸 Pod, Node, 서비스 세 레이어에서 동시에 구현해야 합니다.\n\n" +
        "Pod 레이어에서 가장 효과적이었던 건 Startup Probe를 Liveness Probe와 분리한 것입니다. JVM 서비스는 기동이 느려서, 둘을 같이 쓰면 초기화 중에 Pod가 계속 재시작되는 문제가 생깁니다. 분리 설정 후 새벽 장애 호출이 80% 줄었습니다.\n\n" +
        "Node 레이어에서는 Karpenter disruption 정책과 PodDisruptionBudget을 조합해서 노드가 교체되는 동안에도 최소 서비스를 보장합니다.\n\n" +
        "서비스 레이어에서는 Istio의 Retry와 Timeout으로 의존 서비스 장애가 전파되지 않게 합니다.\n\n" +
        "다만 '완벽한' Self-healing은 없습니다. 시스템이 복구됐더라도 왜 복구가 필요했는지 사람이 분석하고 재발을 막는 루프가 함께 있어야 진짜 의미가 있다고 생각합니다.",
      en: "Self-healing is the ability of a system to return to a safe state before human intervention is needed. In EKS this requires simultaneous implementation at three layers: Pod, Node, and service. At the Pod layer, separating Startup Probe from Liveness Probe for JVM services — combined they cause restart loops during initialization; separate they reduced late-night incident calls by 80%. At the Node layer, Karpenter disruption policies combined with PodDisruptionBudgets guarantee minimum availability during node replacement. At the service layer, Istio Retry and Timeout policies prevent dependency failures from propagating. That said, there's no 'perfect' self-healing — automated recovery must be paired with human root cause analysis to prevent recurrence. That loop is what makes self-healing meaningful.",
    },
  },
  {
    id: 518,
    category1: "Infrastructure",
    category2: "Cost Optimization",
    priority: "high",
    question: {
      ko: "클라우드 환경에서 리소스 보안과 비용 최적화를 자동화하기 위해 스크립트를 작성해 본 경험이 있습니까? 기술적인 개선이 실제 회사의 비즈니스(수익이나 비용)에 어떤 영향을 미쳤나요?",
      en: "Do you have experience scripting resource security and cost optimization automation in a cloud environment? How did the technical improvement impact business outcomes?",
    },
    answer: {
      ko:
        "비용과 보안 대응을 자동화해서 월 청구액을 20% 줄이고, 보안 이슈 대응 시간을 4시간에서 5분으로 단축했습니다.\n\n" +
        "두 가지 문제가 있었습니다. 개발 리소스가 방치되어 월말 청구가 예측 불가능했고, GuardDuty에서 이상이 탐지돼도 대응이 느렸습니다.\n\n" +
        "비용 쪽은 EventBridge와 Lambda를 조합해서 필수 태그가 없는 리소스를 72시간 후 자동 중지하고 담당자에게 알림을 보내는 파이프라인을 만들었습니다. 보안 쪽은 GuardDuty High Finding이 발생하면 해당 IP를 Security Group에서 즉시 차단하게 했습니다.\n\n" +
        "6개월 후 청구액이 20% 줄었습니다. 숫자보다 더 의미 있었던 건 팀 전체가 리소스에 비용 책임 의식을 갖게 됐다는 변화였습니다.\n\n" +
        "한 가지 배운 점은, Stateful 리소스는 자동 삭제 대신 알림 방식으로 제한해야 한다는 것입니다. 자동화 범위를 잘못 설정하면 데이터 손실로 이어질 수 있습니다.",
      en: "I automated cost and security response, reducing monthly cloud spend by 20% and cutting security issue response time from 4 hours to 5 minutes. For cost: EventBridge + Lambda auto-stopped resources missing required tags after 72 hours and notified owners. For security: GuardDuty High Findings triggered immediate Security Group IP blocking. Six months later the bill was 20% lower. The more significant change was the team developing cost accountability for cloud resources — previously treated as someone else's concern. Lesson learned: Stateful resources need alert-based handling rather than auto-deletion; getting automation boundaries wrong causes data loss.",
    },
  },
  {
    id: 519,
    category1: "General",
    category2: "Trade-offs",
    priority: "high",
    question: {
      ko: "하만(Harman)이나 삼성전자와 같은 글로벌 엔터프라이즈 환경에서는 보안과 규제가 매우 엄격합니다. DevOps가 추구하는 '배포의 속도(Agility)'와 엔터프라이즈의 '보안/규정 준수(Compliance)' 사이의 충돌이 발생할 때, 이를 어떻게 조율하시겠습니까?",
      en: "In a global enterprise environment like Harman or Samsung, security and compliance are strict. When DevOps 'Agility' conflicts with enterprise 'Compliance', how do you reconcile them?",
    },
    answer: {
      ko:
        "속도와 보안은 트레이드오프가 아닙니다. 보안 검증을 사람의 판단에서 파이프라인 자동화로 옮기면 둘 다 얻을 수 있습니다.\n\n" +
        "실제로 GitLab CI에 이미지 스캔을 강제화했습니다. HIGH 이상 취약점이 있으면 파이프라인 자체가 실패해서 배포가 안 됩니다. 처음엔 개발팀의 불만이 있었는데, 시간이 지나면서 '보안팀 심사를 2주 기다리는 것보다 내가 5분 안에 고치는 게 낫다'는 반응으로 바뀌었습니다.\n\n" +
        "Compliance 측면에서는 OPA나 Kyverno로 정책을 코드화하면 수동 감사 대신 자동화된 증거를 제출할 수 있습니다.\n\n" +
        "트레이드오프가 불가피할 때는 위험도를 정량화해서 어떤 위험을 감수하고 어떤 비즈니스 가치를 얻는지 명시적인 의사결정 기록을 남깁니다.\n\n" +
        "엔터프라이즈에서 DevSecOps가 실패하는 건 대부분 기술 문제가 아니라 '보안은 느리다'는 인식 때문입니다. 자동화가 그 인식을 바꿉니다.",
      en: "Speed and security are not a trade-off — moving security validation from human judgment to pipeline automation lets you achieve both. I made image scanning mandatory in GitLab CI: HIGH or above vulnerabilities fail the pipeline and block deployment. Initial pushback from developers shifted over time to 'fixing it myself in 5 minutes beats waiting 2 weeks for a security review.' For compliance, codifying policies with OPA or Kyverno enables automated evidence submission instead of manual audits. When a trade-off is unavoidable, I quantify the risk and leave an explicit decision record: what risk is accepted and what business value justifies it. Most DevSecOps failures in enterprise are not technical — they're the perception that security means slow. Automation changes that perception.",
    },
  },
  {
    id: 520,
    category1: "Infrastructure",
    category2: "IaC",
    priority: "medium",
    question: {
      ko: "현재는 AWS가 주력이지만, 미래에는 Azure나 GCP를 함께 써야 할 수도 있습니다. IaC를 활용하여 클라우드 제공업체에 대한 종속성(Vendor Lock-in)을 어떻게 최소화하시겠습니까?",
      en: "AWS is your primary cloud today, but Azure or GCP may be added in the future. How would you use IaC to minimize vendor lock-in?",
    },
    answer: {
      ko:
        "Lock-in을 완전히 없애는 건 현실적이지 않습니다. 그보다는 Provider 의존 코드를 모듈 경계 안에 가두는 것이 실질적인 전략입니다.\n\n" +
        "Terraform에서 AWS 전용 리소스는 특정 모듈 안에만 두고, Kubernetes 수준의 추상화는 Provider 중립적으로 유지합니다. 이렇게 하면 클라우드를 전환할 때 수정이 필요한 범위가 모듈 내부로 제한됩니다.\n\n" +
        "어떤 서비스는 Lock-in을 감수하는 게 맞기도 합니다. AWS Bedrock처럼 경쟁 우위가 명확한 서비스는 굳이 추상화할 필요가 없습니다. 반면 스토리지나 메시지 큐는 Kubernetes 네이티브 솔루션으로 이식성을 확보하는 편이 유리합니다.\n\n" +
        "중요한 건 어느 레이어에서 Lock-in을 허용할지 팀이 명시적으로 합의해두는 것입니다. 암묵적인 Lock-in이 나중에 더 큰 마이그레이션 비용이 됩니다.\n\n" +
        "Azure나 GCP가 추가되는 상황이 온다면 Terraform 모듈 인터페이스 표준화부터 시작하겠습니다.",
      en: "Eliminating lock-in entirely isn't realistic. The practical strategy is containing provider-specific code within module boundaries. In Terraform, AWS-specific resources belong only inside designated modules while Kubernetes-level abstractions stay provider-neutral. Some lock-in is correct to accept — AWS Bedrock has clear competitive advantages and abstracting it adds complexity without value. Storage and message queues benefit from Kubernetes-native solutions that preserve portability. The most important thing is the team explicitly agreeing on which layers lock-in is acceptable at. Implicit lock-in becomes the most expensive migration later. If Azure or GCP is added, I'd start by standardizing Terraform module interfaces.",
    },
  },
  {
    id: 521,
    category1: "Observability",
    category2: "Monitoring",
    priority: "high",
    question: {
      ko: "전통적인 '모니터링'과 최신 트렌드인 '관측성(Observability)'의 차이는 무엇이라고 생각하며, 시스템 내부의 상태를 추론하기 위해 어떤 지표를 가장 중요하게 보십니까?",
      en: "What is the difference between traditional 'Monitoring' and modern 'Observability', and which metrics do you consider most important for inferring a system's internal state?",
    },
    answer: {
      ko:
        "모니터링은 알려진 장애를 감지하고, 관측성은 알려지지 않은 문제까지 추론할 수 있는 것입니다.\n\n" +
        "모니터링은 'CPU가 80%를 넘으면 알림'처럼 미리 정의한 조건을 체크합니다. 관측성은 '특정 사용자 세그먼트에서만 왜 느린지'처럼 사전에 정의하지 않은 질문에도 답할 수 있어야 합니다. 이걸 가능하게 하는 게 Trace ID로 Metric, Log, Trace를 연결하는 구조입니다.\n\n" +
        "가장 중요하게 보는 지표는 인프라는 USE, 서비스는 RED 방법론을 기준으로 합니다. 특히 Duration의 P99와 P50 차이가 갑자기 벌어지면 tail latency 문제의 신호입니다.\n\n" +
        "실제 경험에서 CPU가 정상인데 서비스가 느린 경우, Kafka Consumer Lag과 JVM GC Pause Time이 원인인 경우가 많았습니다. 이 두 지표를 핵심 알림 항목으로 추가한 후 원인 파악 시간이 크게 줄었습니다.",
      en: "Monitoring detects known failures; Observability lets you reason about unknown problems. Monitoring checks predefined conditions — 'alert when CPU exceeds 80%.' Observability should answer questions you didn't define in advance: 'why is it slow only for a specific user segment?' The structure enabling this is connecting Metric, Log, and Trace under a single Trace ID. For metrics I use USE methodology for infrastructure and RED for services. The P99-to-P50 latency ratio is especially important — a sudden widening signals tail latency problems. From experience, when CPU is normal but the service is slow, Kafka Consumer Lag and JVM GC Pause Time are the most common root causes. Adding both as core alert signals significantly reduced time-to-diagnosis.",
    },
  },
  {
    id: 522,
    category1: "General",
    category2: "DevEx",
    priority: "medium",
    question: {
      ko: "SRE/DevOps 팀은 단순히 인프라를 지키는 문지기가 아닙니다. 개발자들이 인프라나 배포에 대한 부담 없이 비즈니스 로직(코드)에만 집중할 수 있도록 조직에 어떤 기술적/문화적 기여를 할 수 있습니까?",
      en: "The SRE/DevOps team is not just an infrastructure gatekeeper. What technical and cultural contributions can you make so developers can focus solely on business logic?",
    },
    answer: {
      ko:
        "SRE의 역할은 개발자의 인지 부하를 줄이는 것이라고 생각합니다.\n\n" +
        "기술적으로 가장 임팩트가 컸던 건 셀프서비스 배포 환경입니다. Argo CD와 GitOps 구조를 도입하면서 개발자가 Git에 merge하면 자동으로 배포되게 만들었습니다. 리소스 요청량만 values.yaml에 적으면 배포가 되는 구조라, 인프라를 몰라도 개발자가 독립적으로 배포할 수 있게 됐습니다.\n\n" +
        "문화적으로는 Blameless Postmortem이 가장 중요합니다. 장애 후 담당자를 탓하는 분위기에서는 개발자가 배포를 두려워하게 됩니다. 장애를 학습의 기회로 전환하는 프로세스를 만들면 배포 속도가 높아집니다.\n\n" +
        "Instruction 기반 운영 지식 관리도 중요합니다. 기존 Runbook을 prompt-friendly한 Instruction 형식으로 전환하고, script + AI agent + skill을 연결하면 개발자가 SRE에게 묻지 않아도 AI가 안내하는 절차를 따라 스스로 해결할 수 있게 됩니다.\n\n" +
        "역설적으로 SRE가 잘하면 SRE 없이도 돌아가는 시스템이 만들어집니다. 그게 성공입니다.",
      en: "SRE's role is reducing developer cognitive load. The highest-impact technical change was self-service deployment: after Argo CD and GitOps adoption, a merge to Git triggers automatic deployment — developers specify only resource requests in values.yaml without needing infrastructure knowledge. Culturally, Blameless Postmortem is the most important lever: blame after incidents makes developers afraid to deploy, but converting incidents into learning opportunities raises deployment velocity. Managing operational knowledge as Instructions also matters — converting Runbooks to prompt-friendly Instructions and connecting them with script + AI agent + skill lets developers follow AI-guided procedures to resolve issues without asking SRE. Paradoxically, SRE doing its job well creates a system that runs without SRE intervention.",
    },
  },
  {
    id: 523,
    category1: "Backend",
    category2: "Performance",
    priority: "medium",
    question: {
      ko: "Java나 Spring Framework 환경에서 인프라 리소스는 정상인데 서비스 응답 속도만 느려지는 병목 현상이 발생했습니다. 어떤 방식으로 원인을 추적하시겠습니까?",
      en: "In a Java/Spring environment, infrastructure looks healthy but service response time is slow. How would you trace the root cause?",
    },
    answer: {
      ko:
        "인프라가 정상인데 서비스가 느리면, 먼저 Distributed Trace를 열어 어느 구간에서 시간이 오래 걸리는지 확인합니다.\n\n" +
        "특정 서비스의 Span Duration이 길다면 JVM 지표를 봅니다. Full GC가 주기적으로 발생하고 있으면 Stop-the-World가 원인일 가능성이 높습니다. Heap 크기 조정이나 G1GC 파라미터 튜닝이 필요합니다.\n\n" +
        "GC가 정상이라면 Thread Pool을 확인합니다. Tomcat Thread Pool이 포화 상태라면 새 요청이 큐에서 기다리게 됩니다. Thread Dump를 떠서 BLOCKED 상태인 스레드를 찾습니다.\n\n" +
        "그 다음은 DB입니다. Trace의 DB Span Duration과 Slow Query Log를 함께 봅니다. N+1 쿼리나 인덱스 누락이 원인인 경우가 많습니다.\n\n" +
        "마지막으로 Kafka, Redis, 외부 API 응답 시간을 Trace에서 확인합니다. 이 순서로 접근하면 대부분의 케이스에서 원인을 특정할 수 있었습니다.",
      en: "When infrastructure is healthy but the service is slow, I open a Distributed Trace first to find which span is consuming the time. If a specific service's Span Duration is long, I check JVM metrics — periodic Full GC indicates Stop-the-World as the cause, requiring Heap size adjustment or G1GC tuning. If GC is normal, I check the Thread Pool: a saturated Tomcat Thread Pool queues new requests — take a Thread Dump to find BLOCKED threads. Next is DB: compare DB Span Duration in the Trace against the Slow Query Log. N+1 queries and missing indexes are the most common causes. Finally, check Kafka, Redis, and external API response times in the Trace. This sequence identifies the root cause in the majority of cases.",
    },
  },
  {
    id: 524,
    category1: "General",
    category2: "Career",
    priority: "high",
    question: {
      ko: "그동안 쌓아오신 7년 이상의 엔지니어링 경력 동안 가장 크게 패러다임을 바꿨던 본인만의 기술적 '혁신'은 무엇이며, 우리 회사에 합류한다면 향후 3년 내에 어떤 변화를 만들어내고 싶습니까?",
      en: "What was the most paradigm-shifting technical innovation in your 7+ year career, and what changes would you drive within 3 years of joining?",
    },
    answer: {
      ko:
        "가장 큰 패러다임 전환은 팀이 장애를 다루는 방식을 바꾼 것입니다. '장애가 나면 찾는다'에서 '시스템이 먼저 말한다'로요.\n\n" +
        "OpenTelemetry 기반 관측성 플랫폼을 혼자 설계하고 전사 도입해서 MTTI를 18시간에서 10분으로 줄였습니다. 도구 교체가 아니라, 팀이 알 수 없는 것을 인식하는 방법 자체가 달라진 경험이었습니다.\n\n" +
        "저는 사이드 프로젝트나 신규 과제를 설명할 때도 항상 같은 구조를 씁니다. 먼저 어떤 문제를 해결하려고 시작했는지 말하고, 다음에 실제 수치 하나로 효과를 증명하고, 마지막에 의도적으로 포기한 범위를 밝힙니다. 이 구조가 있어야 기술 전시가 아니라 비즈니스 문제 해결 경험으로 전달된다고 믿습니다.\n\n" +
        "Wipro에서 3년 안에 만들고 싶은 변화는 두 가지입니다.\n\n" +
        "하나는 AI-Assisted Incident Response입니다. Runbook을 Instruction 형태로 재구성하고, script + AI agent + skill을 결합한 AX 구조로 전환하는 것입니다. 알림이 오면 LLM이 Instruction prompt를 읽고 진단 스크립트를 직접 실행해 초기 원인과 권장 조치를 제안하며, 온콜 담당자가 승인한 후 실행됩니다. MTTR 50% 단축이 목표입니다.\n\n" +
        "다른 하나는 Self-service Developer Platform입니다. 새 서비스를 5분 안에 프로비저닝할 수 있는 구조를 만들어 SRE가 병목이 되는 상황을 없애고 싶습니다. 둘 다 소규모로는 이미 구현해본 경험이 있습니다.",
      en: "The biggest paradigm shift was changing how the team deals with incidents — from 'find the problem when it breaks' to 'the system tells you first.' I designed an OTel-based observability platform alone and rolled it out organization-wide, reducing MTTI from 18 hours to 10 minutes. When I describe any project or initiative I use the same structure: what problem I was solving, one real metric demonstrating the effect, and the scope I intentionally left out. Two changes I want to drive at Wipro within 3 years: First, AI-Assisted Incident Response — restructuring operational knowledge as Instructions combined with script + AI agent + skill, where LLM executes diagnostic scripts and proposes root cause and actions; on-call engineer approves before execution; MTTR 50% reduction target. Second, Self-service Developer Platform — new service provisioned in 5 minutes, eliminating SRE as bottleneck. Both already implemented at small scale.",
    },
  },
  {
    id: 525,
    category1: "General",
    category2: "Leadership",
    priority: "medium",
    question: {
      ko: "수동 배포나 기존 레거시 시스템에 익숙한 팀원들에게 새로운 CI/CD 파이프라인이나 자동화 도구를 도입하려고 할 때, 이들의 거부감을 어떻게 극복하고 설득하시겠습니까?",
      en: "When introducing a new CI/CD pipeline or automation tools to team members accustomed to manual or legacy workflows, how do you overcome resistance and drive adoption?",
    },
    answer: {
      ko:
        "설득보다 직접 경험하게 만드는 것이 훨씬 효과적이었습니다.\n\n" +
        "Argo CD를 도입할 때 팀원들의 반응은 두 가지였습니다. 새로운 걸 또 배워야 한다는 피로감, 그리고 기존 방식이 더 익숙하다는 저항이었습니다.\n\n" +
        "그래서 팀원들이 가장 싫어하던 문제를 먼저 해결했습니다. 새벽 배포 실패를 다음 날 아침에야 발견하는 상황이 반복됐는데, Argo CD Health Check와 Slack 알림만 먼저 붙여서 '오늘 아침에 문제를 빠르게 찾았다'는 경험을 만들었습니다. 그 경험 하나가 거부감을 많이 낮췄습니다.\n\n" +
        "그 다음 파일럿 팀과 함께 서비스 하나에 전체 구조를 적용했습니다. 다른 팀이 그 팀의 결과를 보고 스스로 도입을 요청해왔습니다.\n\n" +
        "레거시 방식은 전환 기간 동안 유지했습니다. 긴급 상황에서 옵션이 없으면 팀이 자동화를 신뢰하지 않습니다.",
      en: "Making people experience things directly is far more effective than persuasion. When introducing Argo CD, I started by solving the problem the team hated most: predawn deployment failures discovered the next morning. I attached just the Argo CD Health Check and Slack notification first — creating the experience of 'we caught a problem early this morning.' That single experience reduced resistance significantly. I then worked with a pilot team to apply the full structure to one service; other teams saw the results and requested it themselves. The legacy deployment method was kept available during the transition — without an escape option in emergencies, the team won't trust the automation.",
    },
  },
  {
    id: 526,
    category1: "General",
    category2: "Global Team",
    priority: "medium",
    question: {
      ko: "전 세계에 분산된 인력과 글로벌하게 협업합니다. 시간대와 문화가 다른 팀과 대규모 마이그레이션 프로젝트를 진행할 때, 의사소통의 오류를 줄이고 프로젝트를 성공적으로 완수하는 당신만의 노하우는 무엇입니까?",
      en: "You collaborate with globally distributed teams. When running a large-scale migration with teams across time zones and cultures, how do you minimize communication errors and ensure project success?",
    },
    answer: {
      ko:
        "글로벌 협업에서 가장 중요한 원칙은 동기 회의보다 비동기 문서를 우선시하는 것입니다.\n\n" +
        "시차보다 더 큰 병목은 맥락 단절입니다. 어떤 결정이 왜 내려졌는지 기록이 없으면 같은 논의가 반복됩니다. 이걸 막기 위해 모든 의사결정은 ADR로 남기는 방식을 정착시켜왔습니다.\n\n" +
        "운영 지식을 Instruction 형태로 관리하는 것도 중요합니다. 기존 Runbook을 prompt-friendly한 Instruction으로 전환하고 script + AI agent + skill과 연결해두면, 인도 팀이 한국 팀에게 실시간으로 묻지 않아도 AI가 절차를 안내해 스스로 대응할 수 있습니다. 위험 작업은 항상 Rollback Plan을 Instruction에 포함해 문서화한 후 진행합니다.\n\n" +
        "오버랩 시간은 블로커 해결에만 집중합니다. 나머지는 비동기로 진행해도 프로젝트가 멈추지 않는 구조를 만드는 게 글로벌 협업의 핵심이라고 생각합니다.",
      en: "The most important principle in global collaboration is prioritizing asynchronous documentation over synchronous meetings. The bigger bottleneck isn't time zones — it's context fragmentation. Without records of why decisions were made, the same discussions repeat. I've built the habit of leaving all decisions as ADRs. Managing operational knowledge as Instructions is equally important: converting Runbooks to prompt-friendly Instructions and connecting them with script + AI agent + skill means team members can follow AI-guided procedures without real-time cross-timezone help. High-risk operations always include Rollback Plans documented in the Instruction before execution. Overlap time is reserved exclusively for blocker resolution — everything else proceeds asynchronously.",
    },
  },
  {
    id: 527,
    category1: "Infrastructure",
    category2: "Architecture",
    priority: "high",
    question: {
      ko: "만약 오늘 당장 기존 모놀리식(Monolithic) 시스템을 마이크로서비스(MSA) 기반의 EKS로 전환하는 프로젝트의 리드로 임명된다면, 초기 30일 동안 가장 집중할 3가지는 무엇이며, 그 과정에서 피할 수 없는 '트레이드오프(Trade-off)'는 무엇이라고 생각하십니까?",
      en: "If appointed today as lead for a Monolithic-to-MSA/EKS migration, what 3 things would you focus on in the first 30 days, and what unavoidable trade-offs do you foresee?",
    },
    answer: {
      ko:
        "초기 30일은 만드는 것보다 파악하는 것에 집중합니다.\n\n" +
        "첫 번째는 의존성 매핑입니다. 모놀리스 안에서 어떤 모듈이 독립적으로 분리 가능한지를 먼저 봐야 합니다. 분리 경계를 잘 찾는 것이 MSA 전환의 절반입니다.\n\n" +
        "두 번째는 EKS 기반 환경 구축입니다. 네트워크, 클러스터, CI/CD, 관측성 스택을 Terraform으로 코드화해서 팀이 실제 배포를 시작할 수 있는 기반을 만듭니다. 이게 없으면 서비스 분리 작업을 시작할 수가 없습니다.\n\n" +
        "세 번째는 팀 역량 평가입니다. Kubernetes와 컨테이너에 익숙한 인원이 몇 명인지, 지금 바로 시작하면 어디서 막힐지를 먼저 파악합니다.\n\n" +
        "피할 수 없는 트레이드오프는 분산 시스템의 복잡도입니다. 모놀리스에서 메서드 호출이던 것이 MSA에서는 네트워크 호출이 됩니다. 분산 트랜잭션, 서비스 간 장애 전파, 네트워크 레이턴시가 새로운 문제로 등장합니다. 팀이 이 복잡도를 감당할 준비가 됐는지 확인하지 않고 전환을 시작하면 중간에 멈추는 상황이 옵니다.",
      en: "The first 30 days are about understanding, not building. First: dependency mapping — identifying which modules can actually be separated independently. Finding the right separation boundaries is half the battle. Second: establishing the EKS foundation — network, cluster, CI/CD, and observability stack codified in Terraform so the team has a real deployment environment to start. Without this, service separation work can't begin. Third: team capability assessment — how many engineers are familiar with Kubernetes and containers, and where will the work stall immediately. The unavoidable trade-off is distributed system complexity: monolith method calls become network calls. Distributed transactions, cross-service failure propagation, and network latency emerge as new problems. Starting migration without confirming the team can handle that complexity is the fastest path to getting stuck halfway.",
    },
  },
  {
    id: 528,
    category1: "Infrastructure",
    category2: "AI/ML",
    priority: "medium",
    question: {
      ko: "AI 워크로드를 EKS 기반의 사내 AI/ML 플랫폼(예: AWS Bedrock 연동 등)에서 운영할 때, 일반적인 웹 애플리케이션과 비교하여 리소스 프로비저닝이나 모니터링 측면에서 어떤 차별점을 두고 아키텍처를 설계해야 한다고 생각하십니까?",
      en: "When operating AI workloads on an EKS-based AI/ML platform (e.g., AWS Bedrock), what architectural differences are needed in resource provisioning and monitoring compared to typical web applications?",
    },
    answer: {
      ko:
        "AI 워크로드는 자원 사용이 불규칙하고 극단적이라는 점에서 웹 애플리케이션과 근본적으로 다릅니다. 현재 EKS에서 Bedrock 기반 AI 에이전트 플랫폼을 운영하면서 직접 확인한 내용입니다.\n\n" +
        "LLM API 응답은 2~30초까지 편차가 큽니다. 일반 웹 API 기준으로 Timeout과 HPA를 설정하면 안 됩니다. HPA 기준을 CPU가 아니라 Request Queue 길이 기반으로 설정해야 하고, Timeout도 훨씬 길게 잡아야 합니다.\n\n" +
        "모니터링도 달라집니다. 일반 서비스의 RED 지표에 더해 Token Usage와 Model Latency per token을 추가했습니다. 특정 쿼리가 비용을 폭발시키는 패턴을 조기에 잡기 위해서입니다.\n\n" +
        "GPU 워크로드는 비용 관리가 별도 과제입니다. 추론 서비스는 Karpenter로 유휴 시 자동 축소하고, 학습 잡은 배치로 실행해서 상시 가동을 피합니다. 자체 모델을 서빙하는 경우엔 GPU 메모리 사용률도 별도 모니터링 항목이 됩니다.",
      en: "AI workloads are fundamentally different because resource consumption is irregular and extreme — observed directly operating a Bedrock-based AI agent platform on EKS. LLM API responses vary from 2 to 30 seconds; Timeout and HPA configured for standard web API baselines don't work. HPA scaling should be based on request queue depth rather than CPU, and Timeouts must be significantly longer. Monitoring adds Token Usage and Model Latency per token as primary signals to catch query patterns causing cost explosions early. For GPU workloads: inference services use Karpenter for auto-scaling with multiple instance types to handle Spot capacity shortages; training jobs run as batches with checkpoint-based restart to avoid always-on capacity. When self-serving models, GPU memory utilization is a separate monitoring dimension.",
    },
  },
  {
    id: 529,
    category1: "Infrastructure",
    category2: "AI/ML",
    priority: "medium",
    question: {
      ko: "DevOps 운영 프로세스에 생성형 AI나 에이전트 기술(MCP, ADK 등)을 결합하여 운영 효율성을 높이거나 장애 대응 시간(MTTR)을 단축할 수 있는 SRE 관점의 기술적 전략은 무엇입니까?",
      en: "From an SRE perspective, what technical strategies combine generative AI or agent technologies (MCP, ADK, etc.) with DevOps operations to improve efficiency or reduce MTTR?",
    },
    answer: {
      ko:
        "AI를 운영에 결합할 때 원칙은 자동 실행이 아니라 자동 진단 후 사람의 승인입니다.\n\n" +
        "현재 구성 중인 구조를 설명하면, Runbook을 Instruction으로 전환해 script + AI agent + skill을 연결한 AX 파이프라인입니다. Prometheus 알림이 오면 Webhook이 LLM을 트리거하고, LLM은 Instruction prompt를 읽어 진단 스크립트를 직접 호출합니다. 실행 결과와 최근 유사 인시던트를 종합해 예상 원인과 권장 조치를 Slack에 포스팅하고, 온콜 담당자가 승인하면 그때 자동화된 조치가 실행됩니다.\n\n" +
        "MCP를 쓰면 LLM이 Kubernetes API나 Grafana 같은 운영 도구를 직접 읽을 수 있어서 진단 정확도가 올라갑니다.\n\n" +
        "자동 실행 범위는 위험이 낮은 조치, 예를 들어 Pod Restart나 Cache Flush 정도로 제한합니다. DB 재시작이나 트래픽 전환은 반드시 사람이 확인해야 합니다. LLM이 틀린 진단을 자신 있게 말하는 게 가장 큰 위험이기 때문입니다.\n\n" +
        "온콜 담당자가 새벽에 로그를 뒤지는 초기 진단 시간을 줄이는 것만으로도 MTTR이 크게 단축됩니다.",
      en: "The core principle: automatic diagnosis, human approval before execution. The structure I'm building is an AX pipeline converting operational knowledge to Instructions connected with script + AI agent + skill. A Prometheus alert fires → Webhook triggers LLM → LLM reads Instruction prompt and calls diagnostic scripts directly → combines execution results with recent similar incidents → posts expected root cause and recommended actions to Slack → on-call engineer approves → automated action executes. Using MCP, the LLM reads Kubernetes API state and Grafana data directly, improving diagnostic accuracy. Auto-execution scope is limited to low-risk actions: Pod Restart or Cache Flush. DB restarts or traffic switching require human confirmation. Eliminating the time on-call engineers spend manually digging through logs for initial diagnosis alone significantly reduces MTTR.",
    },
  },
  {
    id: 530,
    category1: "Infrastructure",
    category2: "Cost Optimization",
    priority: "medium",
    question: {
      ko: "AI/ML 모델 서빙 및 데이터 학습 환경은 막대한 컴퓨팅 비용을 수반합니다. 클라우드 환경에서 이러한 고비용 AI 워크로드의 성능을 보장하면서도 인프라 비용을 최적화하기 위해 어떠한 클라우드 네이티브 전략을 취하시겠습니까?",
      en: "AI/ML model serving and training incur enormous compute costs. What cloud-native strategies would you use to optimize infrastructure costs while maintaining performance?",
    },
    answer: {
      ko:
        "AI 워크로드 비용 최적화는 상시 가동이 필요한 것과 배치로 처리할 수 있는 것을 분리하는 데서 시작합니다.\n\n" +
        "추론 서비스는 SLA가 있어 꺼둘 수 없습니다. Karpenter로 트래픽에 따라 GPU 노드를 자동 확장하되, 여러 인스턴스 타입을 지정해서 Spot 용량 부족에 대비합니다.\n\n" +
        "학습 잡은 최적화 여지가 큽니다. Spot 인스턴스로 실행하고 체크포인트 기반 재시작 구조를 만들면 인터럽션이 발생해도 처음부터 다시 돌리지 않아도 됩니다.\n\n" +
        "모델 양자화로 GPU 메모리 사용량을 줄이면 같은 GPU에서 더 많은 요청을 처리할 수 있어서 단위 비용이 내려갑니다.\n\n" +
        "LLM API 비용은 토큰 수에 비례하기 때문에 Gateway 레벨에서 Max Token과 Rate Limit 정책을 설정하면 비정상적으로 긴 컨텍스트가 비용을 폭발시키는 걸 막을 수 있습니다.\n\n" +
        "이 전략을 조합하면 성능을 유지하면서 AI 워크로드 비용을 40~60% 수준으로 줄일 수 있습니다.",
      en: "Optimizing AI workload costs starts with separating always-on from batchable. Inference services have SLAs — they can't be stopped; Karpenter auto-scales GPU nodes with traffic, specifying multiple instance types to handle Spot shortages. Training jobs: run on Spot with checkpoint-based restart so interruption doesn't require starting over. Model quantization reduces GPU memory footprint, allowing more requests per GPU and lowering per-unit cost. LLM API costs scale with token count — setting Max Token and Rate Limit policies at the gateway level prevents abnormally long contexts from causing cost explosions. Combining these strategies can realistically reduce AI workload costs to 40–60% of baseline while maintaining performance targets.",
    },
  },
];
