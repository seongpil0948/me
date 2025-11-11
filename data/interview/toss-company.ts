import type { InterviewQuestion } from "@/types/portfolio";

/**
 * 토스 DevOps Engineer 포지션 특화 회사/문화/비즈니스 질문
 */
export const tossCompanyQuestions: InterviewQuestion[] = [
  // 자기소개 & 지원 동기
  {
    id: 201,
    category1: "General",
    category2: "Company Interest",
    question: "토스 DevOps Engineer에 지원한 이유와 기대하는 점은 무엇인가요?",
    answer:
      "저는 지난 3년간 ₩500B 규모 이커머스 플랫폼에서 Platform Lead Engineer로 일하며 일일 2천만~5천만 건의 Kafka 메시지를 처리하는 대규모 시스템을 운영해왔습니다. 그 과정에서 Kubernetes 기반 인프라를 설계하고, Observability 시스템을 구축하며 개발자 경험 개선에 집중해왔는데요. 토스 DevOps 포지션의 JD를 보고 제 경험이 정확히 맞아떨어진다고 느꼈습니다. 특히 세 가지 측면에서 토스에 기여할 수 있다고 생각합니다.\n\n먼저, 토스 JD의 핵심 요구사항인 '장애 발생 시 근본 원인을 파악할 수 있는 직관적 메트릭 도출'이 제가 가장 집중해온 분야입니다. 현재 회사에서 10년 넘게 유지되던 Tomcat, Spring, React, Vue, Kafka로 구성된 레거시 시스템은 모니터링이 전무한 상태였습니다. 개발자들이 장애가 발생하면 어디서부터 봐야 할지 몰라 18시간씩 로그를 뒤지는 상황이 반복됐죠. 이 문제를 해결하기 위해 OpenTelemetry 기반 분산 추적 시스템을 처음부터 설계했습니다. 단순히 도구를 도입하는 것을 넘어, 클라이언트부터 Nginx, Frontend, Backend, Kafka를 거쳐 두 번째 Backend까지 전체 요청 흐름을 단일 Trace ID로 추적할 수 있도록 구성했습니다. 각 서비스의 특성에 맞는 Custom Span을 정의하고, 비즈니스 메트릭(주문 수, 결제 성공률)과 인프라 메트릭(응답 시간, 에러율)을 하나의 대시보드에 통합했습니다. 그 결과 평균 장애 원인 파악 시간(MTTI)이 18시간에서 10분으로 99% 감소했고, 개발자들이 Grafana에서 Trace ID를 따라가며 어느 서비스의 어느 API에서 문제가 발생했는지 즉시 확인할 수 있게 되었습니다. 이 과정에서 OpenTelemetry 오픈소스에 AWS SDK 및 컨테이너 환경 관련 이슈를 직접 기여하기도 했습니다.\n\n두 번째로, 토스가 요구하는 'Kubernetes 및 컨테이너 기반 인프라에서의 네트워크 구조 깊이 이해'에 대해서는 CKA 자격증을 1개월 만에 취득하고 AWS Advanced Networking Specialty까지 보유하고 있습니다. 현재 APISIX Gateway를 Envoy 기반으로 운영하며 동적 라우팅, Rate Limiting, Circuit Breaker 패턴을 프로덕션에 적용한 경험이 있습니다. 작년에는 EKS 환경에서 Istio Ambient Mode와 Gateway API를 직접 평가해봤는데, 당시에는 두 기술의 성숙도가 부족하고 AWS 의존적인 우리 회사 환경에는 APISIX + ECS 조합이 더 적합하다고 판단해 그쪽으로 설계를 진행했습니다. 이 경험을 통해 Istio의 아키텍처와 mTLS, AuthorizationPolicy 같은 핵심 개념은 이미 이해하고 있으며, 토스의 SLASH 23 발표를 보면서 EnvoyFilter 커스터마이징이나 Proxy Protocol 같은 고급 활용 사례도 학습했습니다. 비록 Istio를 프로덕션에서 직접 운영해본 경험은 없지만, APISIX와 Istio 모두 Envoy를 데이터 플레인으로 사용하기 때문에 네트워킹과 트래픽 제어의 본질은 동일하다고 생각합니다.\n\n세 번째로, '개발자의 배포/운영 관점에서 필요한 요구를 미리 파악하고 도와줄 수 있는' 역량은 제가 가장 중요하게 생각하는 DevOps의 본질입니다. 저는 개발자 샌드박스 환경을 Terraform으로 자동화해 환경 설정 시간을 80% 단축시켰고, CI/CD 파이프라인을 CloudFormation으로 재설계해 배포 시간을 2시간에서 12분으로 90% 개선했습니다. 특히 개발자들이 직접 Grafana에서 자신의 서비스 메트릭을 확인하고, Thread Dump나 Profiling 툴을 셀프서비스로 사용할 수 있도록 Observability를 민주화한 경험이 있습니다. 토스 블로그에서 경수님이 말씀하신 '개발자가 비즈니스 로직에만 전념할 수 있도록 도와주는 역할'이 정확히 제가 추구하는 방향입니다.\n\n토스에 합류하면 Istio Service Mesh 전문성을 빠르게 확보하고, 여러 계열사 간 협업 구조에서 통일된 인프라 운영 노하우를 배우고 싶습니다. 또한 전자금융감독규정 같은 금융 규제와 개발자 생산성 사이의 균형을 어떻게 잡는지 직접 경험하며, 토스가 DevOps 업계 표준이 되는 데 기여하고 싶습니다. 제 OpenTelemetry와 Observability 전문성을 토스의 멀티 클러스터 환경에서 더 깊이 있게 발전시키고, DevOps 위클리나 SLASH 같은 컨퍼런스를 통해 커뮤니티에도 기여할 수 있기를 기대합니다.",
  },
  {
    id: 202,
    category1: "General",
    category2: "Self Introduction",
    question:
      "당신의 강점 3가지를 토스 JD(Kubernetes, Root Cause Analysis, 개발자 경험 개선)에 연결하여 설명해주세요.",
    answer:
      "제 강점은 토스 JD의 세 가지 핵심 요구사항과 정확히 연결됩니다. 먼저 Observability 전문성을 통한 근본 원인 분석 능력, 두 번째로 Kubernetes와 네트워킹 기반으로 Istio를 빠르게 습득할 수 있는 역량, 그리고 마지막으로 데이터 기반의 개발자 경험 개선입니다.\\n\\n" +
      "첫 번째 강점은 토스 JD에서 강조하는 '장애 발생 시 근본 원인을 파악할 수 있는 직관적 메트릭 도출' 능력입니다. 현재 회사에 합류했을 때 가장 큰 문제는 10년 넘게 운영되던 Tomcat, Spring, React, Vue, Kafka로 구성된 레거시 시스템에 모니터링이 전혀 없다는 점이었습니다. 개발자들은 장애가 발생하면 어디서부터 조사해야 할지 몰라 각 서버의 로그를 18시간씩 수동으로 뒤지며 원인을 찾아야 했죠. 이 문제를 근본적으로 해결하기 위해 OpenTelemetry 기반 분산 추적 시스템을 설계했습니다. 단순히 오픈소스를 설치하는 수준이 아니라, 각 마이크로서비스의 특성에 맞는 Custom Span을 정의하고, 비즈니스 메트릭(주문 수, 결제 성공률)과 인프라 메트릭(응답 시간, 에러율)을 하나의 대시보드에서 볼 수 있도록 Grafana를 구성했습니다. " +
      "예를 들어 결제 실패가 발생하면, 해당 트랜잭션의 전체 흐름을 Trace ID로 추적하며 어느 서비스의 어느 API에서 지연이 발생했는지 10분 안에 파악할 수 있게 되었습니다. 그 결과 평균 장애 원인 파악 시간이 18시간에서 10분으로 99% 감소했고, 이는 단순히 시간 절약을 넘어 개발자들이 장애 대응 스트레스에서 벗어나 비즈니스 로직 개발에 집중할 수 있게 만들었습니다. 이 과정에서 OpenTelemetry 오픈소스에 AWS SDK와 컨테이너 환경 관련 이슈를 직접 기여하기도 했습니다. 토스에서도 Istio Telemetry 데이터를 OpenTelemetry로 통합하고, SRE 팀이 수동으로 찾던 문제를 자동으로 탐지하는 툴을 개발하는 등 제 경험을 활용할 수 있을 것이라 생각합니다.\\n\\n" +
      "두 번째 강점은 개발자 경험을 넘어 비기술 조직까지 지원하는 데이터 플랫폼을 구축한 경험입니다. 토스 JD에서 강조하는 '개발자의 배포/운영 관점에서 필요한 요구를 미리 파악하고 도와줄 수 있는' 역량을 비즈니스 팀에까지 확장한 사례입니다. 기획팀에서는 매주 MAU, DAU, Retention 같은 사용자 행동 지표를 요청했고, 커머스팀은 CTR과 전환율 같은 이커머스 지표를 필요로 했습니다. 처음에는 엔지니어가 수동으로 SQL 쿼리를 작성해 주간 2-3일을 소비했지만, 이를 자동화하기 위해 AWS Step Functions와 Athena 기반 데이터 파이프라인을 설계했습니다. " +
      "일일 2천만~5천만 건의 Kafka 메시지를 S3에 Parquet 형식으로 저장하고, Lambda 함수가 동적으로 Athena CTAS 쿼리를 생성해 15개 이상의 비즈니스 지표를 자동 집계합니다. 비기술 팀을 위해 Grafana에서 셀프서비스 대시보드를 제공하고, 영문 컬럼명을 한글로 매핑한 가이드 문서도 작성했습니다. 그 결과 엔지니어링 시간이 주간 2-3일에서 0시간으로 단축되었고, 비즈니스 팀이 데이터 기반 의사결정을 실시간으로 할 수 있게 되었습니다. 이 과정에서 처음에는 4개 이상의 Athena 쿼리를 병렬로 실행하다가 S3 throttling 문제를 겪었는데, 배치 전략을 최대 2개 병렬로 조정하고 8개의 순차 배치로 재설계해 해결했습니다. 토스에서도 '개발자 업무 능률을 올리고 행복한 개발을 할 수 있게 장애물을 제거한다'는 철학을 비즈니스 조직에까지 확장하는 데 기여하고 싶습니다.\\n\\n" +
      "세 번째 강점은 Kubernetes와 네트워킹 지식을 기반으로 Istio를 빠르게 습득할 수 있다는 점입니다. 토스 JD에서 요구하는 'K8s 및 컨테이너 기반 인프라에서의 네트워크 구조 깊이 이해'를 위해 CKA 자격증을 1개월 만에 취득했고, AWS Advanced Networking Specialty까지 보유하고 있습니다. 현재는 APISIX Gateway를 Envoy 기반으로 운영하며 동적 라우팅, Rate Limiting, Circuit Breaker를 프로덕션에 적용하고 있습니다. 작년에는 컨테이너 기반 사내 인프라를 EKS로 이관하는 방안을 검토하면서, Istio Ambient Mode와 Gateway API를 직접 평가해봤습니다. " +
      "당시 두 기술 모두 성숙도가 부족했고, 우리 회사처럼 인프라 인력이 제한적이고 AWS에 의존적인 환경에서는 APISIX Gateway와 ECS 조합이 더 적합하다고 판단해 그쪽으로 설계를 진행했습니다. 하지만 이 과정에서 Istio의 mTLS, Sidecar Injection, AuthorizationPolicy, EnvoyFilter 같은 핵심 개념은 이미 학습했고, 토스의 SLASH 23 발표를 통해 Proxy Protocol로 클라이언트 IP를 보존하는 방법이나 GSLB를 활용한 멀티 클러스터 트래픽 분산 같은 고급 활용 사례도 공부했습니다. APISIX와 Istio 모두 Envoy를 데이터 플레인으로 사용하기 때문에, 트래픽 제어와 네트워킹의 본질은 동일하다고 생각합니다. 면접 후 2주 동안 로컬 Kubernetes에 Istio를 설치하고 mTLS STRICT 모드로 Bookinfo 샘플을 배포하며 실습할 계획입니다. 제 학습 속도를 감안하면 입사 후 1-2개월 내에 토스의 Istio 운영에 실질적으로 기여할 수 있다고 자신합니다.\\n\\n" +
      "네 번째 강점은 자동화와 셀프서비스를 통한 개발자 경험 개선입니다. 개발자들이 새로운 기능을 테스트하려면 매번 인프라팀에 환경 생성을 요청해야 했고, 수동 설정 때문에 3-4시간이 소요됐습니다. 이를 해결하기 위해 Terraform으로 샌드박스 환경을 자동화하고, 개발자가 셀프서비스로 격리된 테스트 환경을 생성할 수 있게 만들어 설정 시간을 80% 단축시켰습니다. 또한 기존 CI/CD 파이프라인이 2시간이나 걸려 개발자들이 피드백을 늦게 받는 문제를 CloudFormation으로 재설계해 12분으로 90% 개선했습니다. " +
      "무엇보다 중요하게 생각한 것은 Observability의 민주화입니다. 개발자들이 자신의 서비스 상태를 확인하기 위해 DevOps 팀에 문의하는 대신, Grafana에서 직접 메트릭을 보고 Thread Dump나 Profiling 툴을 셀프서비스로 사용할 수 있도록 했습니다. 토스 블로그에서 경수님이 말씀하신 '개발자가 비즈니스 로직에만 전념할 수 있도록 도와주는 역할'이 정확히 제가 추구하는 방향입니다. 토스에서 더 큰 규모의 개발자 조직을 대상으로 이런 임팩트를 확장하고 싶습니다.",
  },

  // Gap 보완
  {
    id: 203,
    category1: "General",
    category2: "Gap Analysis",
    question:
      "Istio 프로덕션 경험이 없는데, 어떻게 토스에서 빠르게 기여할 수 있나요?",
    answer:
      '**솔직한 Gap 인정:**\n\n네, Istio를 프로덕션에서 직접 운영해본 경험은 없습니다. 하지만 **빠르게 학습하고 기여할 수 있는 탄탄한 기반**이 있습니다.\n\n---\n\n**전이 가능한 기술 스택:**\n\n**1. 네트워킹 기초 (AWS Advanced Networking Specialty)**\n- TLS/SSL 인증서 관리와 mTLS 원리\n- Service Discovery와 로드 밸런싱\n- L4/L7 트래픽 제어 메커니즘\n- VPC 네트워크 설계와 보안 그룹\n\n**2. 유사 기술 운영 경험 (APISIX Gateway)**\n- APISIX도 Envoy 기반 (Istio 데이터 플레인과 동일)\n- 동적 라우팅, Rate Limiting, Circuit Breaker 구현\n- RBAC 기반 인증/인가 (Istio AuthorizationPolicy와 유사)\n- Eureka 서비스 디스커버리 연동\n\n**3. Kubernetes 실전 경험 (CKA + 3년)**\n- CNI 네트워킹, RBAC, Security Context 설정\n- Namespace 기반 격리와 리소스 관리\n- 100+ 컨테이너 프로덕션 운영\n\n**4. Observability 전문성 (OpenTelemetry Contributor)**\n- Istio Telemetry와 OpenTelemetry 통합 지식\n- 분산 추적, 메트릭 수집 아키텍처 이해\n- Grafana, Prometheus 스택 운영\n\n---\n\n**학습 능력 입증:**\n\n- **CKA**: 1개월 만에 취득\n- **AWS DevOps Pro**: 2개월 만에 취득\n- **SSE Protocol**: 2주 만에 프로덕션 적용 (LG IXI Studio)\n- **OpenTelemetry**: 도입 후 수개월 내 오픈소스 기여\n\n**학습 방법론:**\n1. **Official Docs First**: 공식 문서로 개념 정립\n2. **Hands-on Practice**: 로컬 환경에서 직접 실습\n3. **Reference Code**: 오픈소스 코드 분석\n4. **Production Case Study**: 토스 블로그, SLASH 발표 심층 학습\n\n---\n\n**구체적인 Ramp-Up 계획:**\n\n**입사 전 (2주):**\n- ✅ 로컬 K8s에 Istio 설치 후 Bookinfo 샘플 앱 배포\n- ✅ mTLS STRICT 모드 설정 및 트래픽 암호화 확인\n- ✅ AuthorizationPolicy로 경로별 접근 제어 테스트\n- ✅ EnvoyFilter 기본 사용법 실습\n\n**입사 1개월:**\n- 토스 Istio 설정 파일 분석 및 아키텍처 이해\n- 기존 팀원 Shadowing (배포, 장애 대응 관찰)\n- Istio 관련 Runbook 숙지\n- 소규모 설정 변경 작업 수행 (리뷰 후)\n\n**입사 2-3개월:**\n- 독립적으로 Istio 설정 변경 가능\n- 장애 발생 시 1차 트러블슈팅 기여\n- 새로운 서비스 Istio 온보딩 지원\n\n**입사 6개월:**\n- Istio 업그레이드 계획 수립 참여\n- 복잡한 트래픽 정책 설계 및 구현\n- DevOps 위클리에서 Istio 관련 지식 공유\n\n---\n\n**즉시 기여 가능한 영역:**\n\nIstio 학습 중에도 제 전문성으로 즉시 기여 가능:\n\n1. **Observability 고도화**\n   - Istio 메트릭을 OpenTelemetry로 통합\n   - 더 직관적인 Grafana 대시보드 개발\n   - MTTI 추가 감소 방안 제안\n\n2. **CI/CD 파이프라인 개선**\n   - GitOps(ArgoCD) 파이프라인 최적화\n   - 배포 자동화 추가 개선\n\n3. **AWS 인프라 최적화**\n   - 비용 절감 기회 발굴\n   - 네트워킹 구조 개선 제안\n\n---\n\n**결론:**\n\n> "Istio 자체는 Gap이지만, Istio를 빠르게 마스터할 수 있는 기반은 탄탄합니다. 토스의 성숙한 DevOps 팀에서 멘토링을 받으며 1-2개월 내 생산적인 기여가 가능하다고 자신합니다."',
  },

  // 기술 문화
  {
    id: 204,
    category1: "General",
    category2: "Company Culture",
    question: "토스 DevOps 위클리에서 어떤 기여를 하고 싶나요?",
    answer:
      '**위클리 미팅의 가치 이해:**\n\n토스 블로그에서 경수님이 언급한 위클리의 핵심:\n> "내가 경험하지 못한 부분들을 듣고, 같은 실수를 하지 않도록 서로 배워간다"\n\n이것이 바로 제가 추구하는 **지식 공유 문화**입니다.\n\n---\n\n**제가 공유할 수 있는 주제들:**\n\n**1. OpenTelemetry 실전 노하우 (즉시 기여 가능)**\n- "OpenTelemetry로 MTTI 99% 줄인 방법"\n- "Istio 메트릭과 OpenTelemetry 통합 베스트 프랙티스"\n- "AWS 환경에서 OpenTelemetry Collector 최적화"\n- 오픈소스 기여 경험 공유 (AWS, Container 이슈 해결)\n\n**2. AWS 비용 최적화 (제 전문 분야)**\n- "S3 Lifecycle 정책으로 50% 비용 절감"\n- "CloudWatch 메트릭 기반 EC2 Right-sizing"\n- "Data Lake 구축 비용 효율화 (Glue + Athena)"\n\n블로그에서 "AWS 비용 리뷰 미팅"을 언급했는데, 여기에도 기여하고 싶습니다.\n\n**3. 데이터 파이프라인 운영 (Airflow 200+ DAGs)**\n- "Airflow 5노드 HA 클러스터 구성 경험"\n- "DAG 복잡도 관리와 의존성 최적화"\n- "CDC 파이프라인 운영 노하우"\n\n**4. 레거시 마이그레이션 전략**\n- "Oracle/Tomcat → Next.js/Spring 전환 설계"\n- "무중단 Redis v5 → v7 마이그레이션 (Dual-Write 전략)"\n\n---\n\n**입사 후 학습하며 공유할 주제들:**\n\n**1단계 (입사 1-2개월): Istio 학습 과정 공유**\n- "APISIX 경험자의 Istio 러닝 커브"\n- "Istio 공식 문서에서 놓치기 쉬운 부분"\n- "Istio Troubleshooting 초보 가이드"\n\n**2단계 (입사 3-6개월): Istio 실전 노하우**\n- "AuthorizationPolicy 설계 패턴"\n- "EnvoyFilter 커스터마이징 사례"\n- "Multi-cluster Istio 운영 팁"\n\n**3단계 (입사 6개월+): 종합적 인사이트**\n- "토스 인프라에서 배운 Service Mesh 철학"\n- "금융권 보안 요구사항과 DevOps 생산성 균형"\n- "계열사 협업에서의 DevOps 역할"\n\n---\n\n**위클리에서 얻고 싶은 것:**\n\n**1. Istio 실전 경험**\n- 재성님, 경수님, 준영님의 DC/OS → K8s 마이그레이션 스토리\n- Envoy 빌드 대신 새 컴포넌트 개발한 의사결정 과정\n- VictoriaMetrics 검토 후 드랍한 이유\n\n**2. 금융 규제 대응**\n- 전자금융감독규정 스터디 내용\n- 보안과 생산성 균형 잡는 구체적 방법\n- SSO 시스템 개선 사례\n\n**3. 계열사 협업 노하우**\n- 토스, 토스뱅크, 토스증권 간 인프라 공유 방식\n- 각 계열사의 특수성 대응 방법\n- 통일성 있는 아키텍처 유지 전략\n\n---\n\n**기여 스타일:**\n\n경수님이 언급한 것처럼 **"서로 의견 내는 데 열려있는"** 문화를 존중하며:\n\n- **질문 많이 하기**: 이해 안 되는 부분 적극적으로 질문\n- **실패 공유**: 제가 시도했다가 실패한 경험도 솔직하게 공유\n- **데이터 기반**: 주관적 의견보다는 메트릭으로 뒷받침\n- **Action Item**: 단순 공유를 넘어 "우리 이것도 해보면 어떨까?" 제안\n\n---\n\n**목표:**\n\n> "입사 6개월 후, 다른 계열사 DevOps 팀원이 \'최성필님 위클리 발표에서 많이 배웠어요\'라고 말할 수 있는 기여를 하고 싶습니다."',
  },

  // 역질문
  {
    id: 205,
    category1: "General",
    category2: "Reverse Questions",
    question: "면접관님께 드리고 싶은 질문이 있나요?",
    answer:
      '**기술 관련 질문:**\n\n**1. Istio 버전 업그레이드 전략**\n> "토스는 여러 계열사의 클러스터를 운영 중인데, Istio 버전 업그레이드는 어떤 전략으로 진행하나요? Canary 배포나 Blue-Green 방식을 사용하시나요?"\n\n**2. Istio Ambient Mode 재검토 계획**\n> "제가 작년에 Ambient Mode를 평가했을 때는 미성숙했는데, 현재는 많이 안정화되었습니다. 토스에서 Sidecar에서 Ambient로 전환을 고려 중이신가요? 있다면 어떤 장단점을 평가하고 계신가요?"\n\n**3. OpenTelemetry 도입 현황**\n> "블로그에서 Istio Telemetry 커스터마이징을 언급하셨는데, OpenTelemetry 통합은 어느 정도 진행되었나요? 제 OpenTelemetry 전문성을 어디에 기여할 수 있을까요?"\n\n**4. 멀티 클러스터 복잡도 관리**\n> "경수님이 \'운영해야 하는 쿠버네티스 클러스터가 계속 늘어난다\'고 하셨는데, 현재 몇 개 클러스터를 운영 중이고, 어떤 도구로 중앙 집중식 관리를 하시나요? (Rancher, ArgoCD 등)"\n\n---\n\n**문화 관련 질문:**\n\n**5. DevOps 위클리 상세**\n> "위클리 미팅은 구체적으로 어떤 형식으로 진행되나요? 발표 자료를 준비하는지, 자유 토론 형식인지, 그리고 모든 계열사 DevOps가 참여하는지 궁금합니다."\n\n**6. 신규 입사자 온보딩**\n> "Istio 경험이 없는 신규 입사자에게 어떤 온보딩 프로세스가 있나요? 멘토링 시스템이나 Pair Programming 같은 방식이 있나요?"\n\n**7. 실험 문화 (Fail Fast)**\n> "준영님이 VictoriaMetrics 실험에서 \'논리가 충분하면 영향도 큰 작업도 시도 가능\'하다고 하셨는데, 실제로 실험이 실패했을 때 팀 분위기는 어떤가요? 실패를 학습으로 받아들이는 문화가 확실한가요?"\n\n---\n\n**업무 관련 질문:**\n\n**8. 금융 규제와 생산성 균형**\n> "재성님이 전자금융감독규정 스터디를 하셨다고 하셨는데, 구체적으로 어떤 규정이 DevOps 업무에 가장 큰 영향을 미치나요? 그리고 그것을 극복한 좋은 사례가 있을까요?"\n\n**9. On-call 및 장애 대응**\n> "DevOps 팀의 On-call 로테이션은 어떻게 운영되나요? 그리고 장애 발생 시 DevOps와 SRE의 역할 분담은 어떻게 되나요?"\n\n**10. 성과 평가 기준**\n> "DevOps Engineer의 성과는 어떤 지표로 평가되나요? 시스템 안정성(uptime), 배포 빈도, MTTI/MTTR, 개발자 만족도 같은 것들이 있을까요?"\n\n---\n\n**성장 관련 질문:**\n\n**11. 컨퍼런스 발표 기회**\n> "SLASH 같은 컨퍼런스에서 발표할 기회가 DevOps 팀원에게도 열려 있나요? 제가 OpenTelemetry나 Observability 주제로 발표하고 싶은데 가능할까요?"\n\n**12. 오픈소스 기여 지원**\n> "제가 OpenTelemetry 프로젝트에 기여하고 있는데, 업무 시간에 오픈소스 기여를 할 수 있는 정책이 있나요? 그리고 토스가 공식적으로 스폰서하는 오픈소스 프로젝트가 있나요?"\n\n---\n\n**팀 역학 관련 질문:**\n\n**13. DevOps와 SRE 협업**\n> "현수님(SRE)과의 인터뷰에서 DevOps가 SRE 업무를 많이 도와준다고 하셨는데, 구체적으로 어떤 협업이 가장 빈번하고 효과적인가요?"\n\n**14. 리모트 워크 정책**\n> "현재 DevOps 팀의 근무 방식은 어떤가요? 완전 재택, 하이브리드, 또는 사무실 출근이 원칙인가요? 그리고 재택 시 비동기 협업은 어떻게 관리하시나요?"\n\n---\n\n**현실적 질문:**\n\n**15. 첫 3개월 목표**\n> "제가 합류한다면, 첫 3개월 동안 어떤 목표를 달성하기를 기대하시나요? 그리고 6개월 후에는 어떤 수준의 기여를 기대하시나요?"\n\n---\n\n**가장 궁금한 질문 (우선순위):**\n\n만약 시간이 제한적이라면, 가장 궁금한 것은:\n\n1. **Istio 학습 지원 (온보딩)** - 제 Gap을 얼마나 빨리 메울 수 있을지\n2. **OpenTelemetry 기여 기회** - 제 강점을 어디에 활용할 수 있을지\n3. **실험 문화 구체성** - 실제로 새로운 시도가 얼마나 열려 있는지',
  },
];
