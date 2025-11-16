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
      "토스 JD를 보고 제가 가장 집중해온 두 가지 문제가 정확히 일치한다고 느꼈습니다. 첫째는 '장애 발생 시 근본 원인을 파악할 수 있는 직관적 메트릭 도출', 둘째는 '개발자의 배포 운영 관점에서 필요한 요구를 미리 파악하고 도와줄 수 있는' 능력입니다.\n\n" +
      "**문제 상황: 18시간 동안 원인 모를 장애**\n\n" +
      "현재 회사에 합류했을 때 가장 충격적이었던 것은, 10년 넘게 운영된 5000억 규모 이커머스 플랫폼에 모니터링이 전혀 없다는 점이었습니다. 장애가 발생하면 개발자들이 각 서버의 로그를 18시간씩 수동으로 뒤지며 원인을 찾았고, 심지어 기획자가 먼저 장애를 발견하는 경우도 있었습니다. '이게 에러의 원인인 것 같아요'라는 추측성 대화가 반복되었죠.\n\n" +
      "**의사결정 과정: 왜 OpenTelemetry였나**\n\n" +
      "모니터링 도구를 도입하기 위해 세 가지 옵션을 검토했습니다. Datadog 같은 상용 솔루션은 즉시 사용 가능하지만 연간 수천만 원의 비용이 부담이었고, Prometheus만으로는 분산 시스템의 전체 흐름을 추적하기 어려웠습니다. 최종적으로 OpenTelemetry를 선택한 이유는 벤더 중립적이고, W3C 표준을 따르며, 클라이언트부터 Backend, Kafka까지 전체 흐름을 하나의 Trace ID로 연결할 수 있기 때문이었습니다.\n\n" +
      "**실행 과정과 예상외 문제**\n\n" +
      "하지만 도입 과정이 순탄하지는 않았습니다. Kafka를 통한 비동기 경계에서 Trace Context가 끊기는 문제가 발생했어요. 표준 W3C Trace Context는 HTTP 헤더 기반이라 Kafka에서는 작동하지 않았고, Kafka Headers에 traceparent를 직접 주입하는 방식으로 해결했습니다. 이 과정에서 OpenTelemetry 오픈소스에 AWS SDK와 컨테이너 환경 관련 이슈를 기여하기도 했습니다.\n\n" +
      "**결과와 학습**\n\n" +
      "결과적으로 MTTI가 18시간에서 10분으로 99% 감소했고, 개발자들이 Grafana에서 Trace ID를 따라가며 어느 서비스의 어느 API에서 문제가 발생했는지 즉시 확인할 수 있게 되었습니다. 이 경험을 통해 배운 것은, 단순히 도구를 도입하는 것이 아니라 '비즈니스 메트릭과 인프라 메트릭을 어떻게 연결할 것인가'라는 본질적인 질문이 더 중요하다는 점입니다.\n\n" +
      "이 과정에서 OpenTelemetry 오픈소스에 AWS SDK 및 컨테이너 환경 관련 이슈를 직접 기여하기도 했습니다.\n\n" +
      "현재 APISIX Gateway를 운영하며 동적 라우팅, Rate Limiting, RBAC 패턴을 프로덕션에 적용한 경험이 있습니다." +
      "'개발자의 배포/운영 관점에서 필요한 요구를 미리 파악하고 도와줄 수 있는' 역량은 제가 가장 중요하게 생각하는 DevOps의 본질입니다. 저는 개발자 샌드박스 환경을 직접 관리하며 VDI와 같이 개발자들이 서버에서 작업할 공간을 제공했으며, CI/CD 파이프라인을 Jenkins로 구성하며 배포 시간을 2시간에서(블루그린 배포가 수동(스위치 수동 다운ifdown lo:0) 이었음) 12분으로 90% 개선했습니다." +
      "Cloud 네트워킹(Cross-AZ, Private Link, VPC Peering) 관련 네트워킹 분야에도 관심이 많고 Network 자격증을 , 쿠버네티스도, 리눅스 모니터링 모두 관심을 갖고 자격증도 취득했습니다. 이 능력들이 토스의 DevOps 팀에 큰 도움이 될 것이라 확신합니다.\n\n" +
      "**이 포지션에 지원한 이유**는 토스 JD를 보니 제가 경험한 대부분의 영역과 일치했기 때문입니다. SRE, 서버, 프론트엔드, 기획팀 등 전 분야의 팀원들과 소통하며 협업해온 경험이 있고, 모니터링 시스템 구축, 클라우드 인프라 최적화, 대용량 데이터 핸들링까지 실무에서 직접 다뤄왔습니다. 특히 토스의 관측성 플랫폼과 분산 시스템 운영 환경에서 제 경험을 100% 발휘하며 기여할 수 있을 것 같아 지원하게 되었습니다.",
  },
  {
    id: 202,
    category1: "General",
    category2: "Self Introduction",
    question:
      "당신의 강점 3가지를 토스 JD(Kubernetes, Root Cause Analysis, 개발자 경험 개선)에 연결하여 설명해주세요.",
    answer:
      "제 강점은 토스 JD의 세 가지 요구사항과 정확히 연결됩니다. Observability를 통한 근본 원인 분석, Cross-functional 협업 능력, 그리고 네트워킹 전문성 기반의 빠른 학습 능력입니다.\n\n" +
      "**첫째, 장애 원인 18시간 → 10분으로 단축한 Observability 전문성**\n\n" +
      "합류 당시 회사의 가장 큰 문제는 10년 된 레거시 시스템에 모니터링이 전무했다는 것입니다. 장애가 발생하면 개발자들이 18시간 동안 각 서버의 로그를 수동으로 뒤지며 '이게 원인인 것 같아요'라는 추측성 대화만 반복했죠. 세 가지 옵션을 검토했습니다. Datadog은 즉시 사용 가능하지만 연간 수천만 원의 비용이 부담이었고, Prometheus만으로는 분산 시스템의 전체 흐름을 추적하기 어려웠습니다. OpenTelemetry를 선택한 이유는 벤더 중립적이고, 클라이언트부터 Backend, Kafka까지 전체 흐름을 하나의 Trace ID로 연결할 수 있기 때문이었습니다.\n\n" +
      "도입 과정이 순탄하지는 않았습니다. Kafka를 통한 비동기 경계에서 Trace Context가 끊기는 문제가 발생했어요. 표준 W3C Trace Context는 HTTP 헤더 기반이라 Kafka에서는 작동하지 않았고, Kafka Headers에 traceparent를 직접 주입하는 방식으로 해결했습니다. 결과적으로 MTTI가 18시간에서 10분으로 99% 감소했고, 개발자들이 Grafana에서 Trace ID를 따라가며 어느 서비스의 어느 API에서 문제가 발생했는지 즉시 확인할 수 있게 되었습니다. 토스의 Istio 환경에서도 이 경험을 살려 SRE 팀의 MTTI를 더욱 줄이는 데 기여하고 싶습니다.\n\n" +
      "**둘째, FE/BE/Infra를 넘나드는 Cross-functional 협업**\n\n" +
      "Frontend(React/Vue), Backend(Go/Python/Spring), Infrastructure(K8s/AWS)를 모두 경험했기 때문에 각 팀의 언어로 소통할 수 있습니다. 실제 사례로 Frontend 팀이 '페이지가 느려요'라고 했을 때, 일반적인 DevOps라면 CDN 캐시 설정만 확인하겠지만, 저는 Chrome DevTools로 Waterfall을 분석해 WebP 변환을 제안하고 Lambda@Edge로 실시간 이미지 최적화를 구현했습니다. 결과적으로 Core Web Vitals LCP가 3초에서 0.8초로 개선됐죠.\n\n" +
      "Backend 팀이 'DB 부하가 높아요'라고 했을 때도, 단순히 RDS 스펙 업그레이드를 제안하는 게 아니라 슬로우 쿼리를 분석해 N+1 문제를 발견하고 GraphQL DataLoader 패턴을 제안했습니다. DB CPU를 80%에서 30%로 줄이고 비용도 절감했어요. 토스처럼 여러 계열사가 협업하는 환경에서, 저는 기술 스택이 다른 팀들 사이의 '공통 언어'를 만들어 협업 효율을 높일 수 있습니다.\n\n" +
      "**셋째, AWS Networking Specialty 기반의 네트워크 전문성**\n\n" +
      "AWS Advanced Networking Specialty를 보유하고 Site-to-Site VPN 1.25Gbps 구성, Multi-AZ 고가용성 설계를 직접 했습니다. 실제로 간헐적 Connection Timeout 문제를 tcpdump로 패킷 추적해 NAT Gateway의 포트 고갈임을 밝혀내고, Connection pooling을 최적화해 Timeout을 5%에서 0.01%로 줄인 경험이 있습니다. 토스의 멀티 클러스터 GSLB 아키텍처나 Istio mTLS 환경에서 발생할 수 있는 복잡한 네트워크 이슈를 빠르게 진단하고 해결할 수 있습니다.\n\n" +
      "또한 CKA 자격증 기반으로 Kubernetes CNI 네트워킹과 NetworkPolicy를 이해하고 있고, 현재 APISIX Gateway를 운영하며 Envoy 기반 트래픽 제어를 경험하고 있습니다. APISIX와 Istio 모두 Envoy를 데이터 플레인으로 사용하기 때문에 트래픽 제어의 본질은 동일합니다. 제 학습 속도를 고려하면 입사 후 1-2개월 내에 Istio 운영에도 실질적으로 기여할 수 있다고 자신합니다.",
  },

  // Gap 보완
  {
    id: 203,
    category1: "General",
    category2: "Gap Analysis",
    question:
      "Istio 프로덕션 경험이 없는데, 어떻게 토스에서 빠르게 기여할 수 있나요?",
    answer:
      "네, 솔직히 말씀드리면 Istio를 프로덕션에서 직접 운영해본 경험은 없습니다. 하지만 빠르게 학습하고 기여할 수 있는 구체적인 이유가 있습니다.\n\n" +
      "**전이 가능한 경험: APISIX에서 배운 것**\n\n" +
      "현재 APISIX Gateway를 운영하고 있는데, Istio와 같은 Envoy 기반입니다. 트래픽 제어의 본질은 동일해요. Rate Limiting을 예로 들면, APISIX에서는 lua 스크립트로 구현했고, Istio에서는 EnvoyFilter로 하지만 결국 Envoy의 rate_limit 필터를 설정하는 것입니다. Circuit Breaker, Retry 정책, Timeout 설정도 마찬가지입니다.\n\n" +
      "작년에 컨테이너 인프라를 EKS로 이관하는 방안을 검토하면서, Istio Ambient Mode와 Gateway API를 직접 평가해봤습니다. 당시 두 기술 모두 성숙도가 부족했고, 우리 회사처럼 인프라 인력이 제한적인 환경에서는 APISIX와 ECS 조합이 더 적합하다고 판단해 그쪽으로 설계를 진행했습니다. 하지만 이 과정에서 Istio의 mTLS, VirtualService, DestinationRule, AuthorizationPolicy 같은 핵심 개념은 이미 학습했습니다.\n\n" +
      "**학습 능력 입증: 빠른 적응 경험**\n\n" +
      "CKA를 1개월 만에 취득했고, AWS DevOps Professional을 2개월 만에 땄습니다. LG와 협업할 때 SSE(Server-Sent Events) 프로토콜을 2주 만에 학습해서 프로덕션에 적용했던 경험도 있습니다. 새로운 기술을 빠르게 마스터하는 것에는 자신 있습니다.\n\n" +
      "**구체적인 학습 계획**\n\n" +
      "면접 후 2주 동안 로컬 Kubernetes에 Istio를 설치하고 mTLS STRICT 모드로 Bookinfo 샘플을 배포하며 실습할 계획입니다. 토스의 SLASH 23 발표도 다시 보면서 Proxy Protocol로 클라이언트 IP를 보존하는 방법, GSLB를 활용한 멀티 클러스터 트래픽 분산 같은 고급 활용 사례도 공부하고 있습니다.\n\n" +
      "**즉시 기여 가능한 영역**\n\n" +
      "Istio 학습 중에도 제 전문성으로 즉시 기여할 수 있는 부분이 있습니다. Istio 메트릭을 OpenTelemetry로 통합하고 더 직관적인 Grafana 대시보드를 개발하는 것, AWS 비용 최적화 기회를 발굴하는 것, GitOps 파이프라인을 개선하는 것 등입니다.\n\n" +
      "입사 후 1-2개월 내에 토스의 Istio 운영에 실질적으로 기여할 수 있다고 자신합니다. Istio 자체는 Gap이지만, Istio를 빠르게 마스터할 수 있는 기반은 탄탄합니다.",
  },

  // 기술 문화
  {
    id: 204,
    category1: "General",
    category2: "Company Culture",
    question: "토스 DevOps 위클리에서 어떤 기여를 하고 싶나요?",
    answer:
      "경수님이 블로그에서 말씀하신 '내가 경험하지 못한 부분들을 듣고, 같은 실수를 하지 않도록 서로 배워간다'는 부분이 정말 와닿았습니다. 제가 추구하는 지식 공유 문화와 정확히 일치하거든요.\n\n" +
      "입사 초기부터 바로 공유할 수 있는 건 OpenTelemetry 관련 경험입니다. MTTI를 18시간에서 10분으로 줄인 과정, 특히 Kafka 같은 비동기 경계에서 Trace Context를 어떻게 전파했는지 실패담까지 솔직하게 나누고 싶어요. 처음에 Kafka Headers에 traceparent를 주입하는 방식을 몰라서 한참 헤맸던 경험도 있고요. Istio 메트릭을 OpenTelemetry로 통합하는 방법도 토스 환경에 맞게 제안할 수 있을 것 같습니다.\n\n" +
      "블로그에서 AWS 비용 리뷰 미팅을 하신다고 봤는데, 저도 S3 Lifecycle 정책으로 50% 비용을 절감한 경험이나 Athena 쿼리 최적화 노하우를 공유하고 싶어요. Airflow 5노드 HA 클러스터 운영하면서 200개 넘는 DAGs를 관리한 이야기나, Redis v5에서 v7로 무중단 마이그레이션할 때 Dual-Write 전략을 쓴 것도 도움이 될 것 같고요.\n\n" +
      "입사 후 1-2개월 동안 Istio를 학습하면서는 'APISIX 경험자의 Istio 러닝 커브'를 공유하고 싶습니다. 공식 문서를 보면서 '아, 이 부분은 설명이 부족하네' 싶었던 부분들을 정리해서 나중에 입사하시는 분들께 도움이 되었으면 좋겠어요. 몇 개월 지나면 AuthorizationPolicy 설계 패턴이나 EnvoyFilter 커스터마이징 같은 실전 노하우도 나눌 수 있을 것 같고, 나중에는 금융권 보안 요구사항과 DevOps 생산성을 어떻게 균형 잡았는지 같은 종합적인 인사이트도 공유할 수 있을 거예요.\n\n" +
      "반대로 저도 위클리에서 정말 많이 배우고 싶습니다. 재성님, 경수님, 준영님의 DC/OS에서 Kubernetes로 마이그레이션하신 이야기가 너무 궁금해요. 특히 Envoy를 직접 빌드하는 대신 새 컴포넌트를 개발하기로 결정하신 과정이나, VictoriaMetrics를 검토했다가 결국 안 쓰기로 한 이유 같은 것들요. 전자금융감독규정 스터디 내용도 배우고 싶고, 토스/토스뱅크/토스증권처럼 여러 계열사 간에 인프라를 어떻게 공유하는지도 정말 궁금합니다.\n\n" +
      "위클리에서는 이해 안 되는 부분 있으면 적극적으로 질문하고, 제가 시도했다가 실패한 경험도 솔직하게 공유하려고 합니다. 주관적인 의견보다는 메트릭으로 뒷받침하는 스타일로 기여하고 싶고요. 입사 6개월 후에 다른 계열사 DevOps 분들이 '최성필님 발표에서 도움 많이 받았어요'라고 말씀해주시면 정말 뿌듯할 것 같습니다.",
  },

  // 역질문
  {
    id: 205,
    category1: "General",
    category2: "Reverse Questions",
    question: "면접관님께 드리고 싶은 질문이 있나요?",
    answer:
      "네, 가장 궁금한 것부터 여쭤보고 싶습니다.\n\n" +
      "**첫째, Istio 경험이 없는 신규 입사자를 위한 온보딩 프로세스가 어떻게 되나요?**\n\n" +
      "제 Gap을 얼마나 빨리 메울 수 있을지가 가장 궁금합니다. 멘토링 시스템이나 Pair Programming 같은 방식이 있는지, 그리고 토스는 여러 계열사의 클러스터를 운영 중인데 Istio 버전 업그레이드는 어떤 전략으로 진행하시는지도 궁금해요. Canary 배포나 Blue-Green 방식을 사용하시나요?\n\n" +
      "**둘째, 제 OpenTelemetry 전문성을 어디에 기여할 수 있을까요?**\n\n" +
      "블로그에서 Istio Telemetry 커스터마이징을 언급하신 걸 봤는데, OpenTelemetry 통합은 어느 정도 진행되었는지 궁금합니다. 제가 오픈소스에도 기여하고 있는데, 업무 시간에 오픈소스 기여를 할 수 있는 정책이 있나요? 토스가 공식적으로 스폰서하는 오픈소스 프로젝트도 있는지 궁금합니다.\n\n" +
      "**셋째, 실험 문화가 구체적으로 얼마나 열려 있나요?**\n\n" +
      "준영님이 VictoriaMetrics 실험에서 '논리가 충분하면 영향도 큰 작업도 시도 가능'하다고 하셨는데, 실제로 실험이 실패했을 때 팀 분위기는 어떤지 궁금합니다. 실패를 학습으로 받아들이는 문화가 확실한가요? 제가 작년에 Istio Ambient Mode를 평가했을 때는 미성숙했는데, 현재는 많이 안정화되었거든요. 토스에서도 Sidecar에서 Ambient로 전환을 고려 중이신지, 있다면 어떤 장단점을 평가하고 계신지 궁금합니다.\n\n" +
      "**추가로 궁금한 것들**\n\n" +
      "DevOps 위클리는 구체적으로 어떤 형식으로 진행되는지, 발표 자료를 준비하는지 자유 토론 형식인지 궁금하고, 경수님이 '운영해야 하는 쿠버네티스 클러스터가 계속 늘어난다'고 하셨는데 현재 몇 개 클러스터를 운영 중이고 어떤 도구로 중앙 집중식 관리를 하시는지도 알고 싶습니다. 또 재성님이 전자금융감독규정 스터디를 하셨다고 하셨는데, 구체적으로 어떤 규정이 DevOps 업무에 가장 큰 영향을 미치는지, 그리고 그것을 극복한 좋은 사례가 있는지도 궁금해요.\n\n" +
      "마지막으로, 제가 합류한다면 첫 3개월 동안 어떤 목표를 달성하기를 기대하시는지, 그리고 6개월 후에는 어떤 수준의 기여를 기대하시는지 알고 싶습니다. SLASH 같은 컨퍼런스에서 발표할 기회가 DevOps 팀원에게도 열려 있다면, 제가 OpenTelemetry나 Observability 주제로 발표해보고 싶습니다.",
  },

  // 실전 장애 대응 & 코드 레벨 경험
  {
    id: 206,
    category1: "Infrastructure",
    category2: "Incident Response",
    question:
      "실제 장애 상황에서 어떻게 대응했고, 결과적으로 어떤 개선을 이끌어냈는지 알려주세요.",
    answer:
      "최근 주문, 멤버 서비스에서 컨테이너가 간헐적으로 좀비 상태가 되는 현상이 발생했습니다.\n\n" +
      "**문제 파악**\n\n" +
      "컨테이너 로그를 확인해보니 프로세스가 OOM(Out of Memory)으로 종료되고 있었어요. 평소에 마운트시켜두었던 Heap dump를 분석하여 백엔드 팀원들과 공유했습니다.\n\n" +
      "**근본 원인**\n\n" +
      "분석 결과 두 가지 문제를 발견했어요. 첫째, Java Heap 메모리 중 템플릿 엑셀 기능에서 메모리 누수가 발생하고 있었습니다. 둘째, Java Heap 최대치가 컨테이너 limit보다 낮게 설정되어 있었죠.\n\n" +
      "**해결 및 개선**\n\n" +
      "백엔드 팀과 협업해서 메모리 누수를 수정하고, Heap 설정을 컨테이너 리소스에 맞게 조정했습니다. 이후 컨테이너 헬스체크뿐 아니라 힙메모리가 90% 이상 5분 이상 지속되면 백엔드 파트 및 플랫폼 지원 파트에 알림이 가도록 모니터링을 강화했어요.\n\n" +
      "결과적으로 동일 유형의 OOM 장애는 사라졌고, 메모리 관련 이슈를 사전에 감지할 수 있는 체계가 구축됐습니다.",
  },
  {
    id: 207,
    category1: "Infrastructure",
    category2: "Code Level Contribution",
    question:
      "오픈소스나 내부 인프라를 어떻게 수정하고 확장했는지 코드 레벨의 설명이 있다면 좋아요.",
    answer:
      "두 가지 OpenTelemetry 오픈소스 기여 사례를 말씀드리겠습니다.\n\n" +
      "**사례 1: OpenTelemetry JavaScript - ECS Fargate Container ID 추출 버그 수정 (PR #2855)**\n\n" +
      "AWS ECS Fargate가 cgroup 명명 규칙을 `/ecs/<taskId>/<taskId>-<containerId>` 형식으로 변경했는데, 기존 로직은 마지막 64자만 잘라내서 Container ID가 중간에 잘리는 문제가 있었어요. Datadog 같은 Observability 벤더들이 완전한 `taskId-containerId` 포맷을 요구하는데, 제대로 전달되지 않았죠.\n\n" +
      "TypeScript로 새로운 `_extractContainerIdFromLine()` 메서드를 추가해서 Docker, containerd, CRI-O 등 다양한 컨테이너 런타임 포맷을 처리하도록 개선했습니다. 정규식 패턴 `[a-zA-Z0-9\\-_]+`로 유연하게 검증하고, 레거시 64자 로직도 fallback으로 유지해 하위 호환성을 보장했어요.\n\n" +
      "3개월간 Maintainer 리뷰를 받으며 코드 개선을 반복했고, 최종적으로 2024년 9월에 머지됐습니다. 이후 관련 이슈 리포트가 사라졌어요.\n\n" +
      "**사례 2: OpenTelemetry Collector - AWS SDK v2 마이그레이션 (PR #40123)**\n\n" +
      "AWS SDK Go v1이 2025년 7월 31일에 지원 종료 예정이어서 `internal/aws/awsutil` 모듈을 v2로 마이그레이션하는 작업을 진행했습니다. 단순 버전 업그레이드가 아니라 partition, STS 관련 로직을 개선하고 기존 유닛 테스트를 모두 v2에 맞게 변환했어요.\n\n" +
      "의존하는 awsxray exporter, awsemf exporter, awscontainerinsight receiver 등 여러 컴포넌트도 함께 업데이트했고, Go context 전파 방식을 개선해서 새로운 context를 정의하는 대신 기존 context를 전달하도록 수정했습니다.\n\n" +
      "Maintainer에게 '정말 운이 좋았다'고 말씀드릴 정도로 세심한 코드 리뷰를 받았고, 2024년 6월에 머지됐습니다. 243줄 추가, 473줄 삭제로 코드 품질도 향상됐어요.\n\n" +
      "**배운 점**\n\n" +
      "오픈소스 기여는 문제를 명확히 정의하고 재현 가능한 테스트 케이스를 만들면 Maintainer들이 적극적으로 도와줍니다. 첫 기여였지만 커뮤니티의 도움 덕분에 성공할 수 있었어요.",
  },
];
