import type { InterviewQuestion } from "@/types/portfolio";

/**
 * 토스 DevOps Engineer - Istio & Service Mesh 관련 질문
 * ID 범위: 101-105, 113
 */
export const tossIstioQuestions: InterviewQuestion[] = [
  {
    id: 101,
    category1: "Infrastructure",
    category2: "Istio",
    question: "Istio의 mTLS (Mutual TLS)가 무엇이고, 왜 금융권에서 중요한가요?",
    answer:
      "금융권 경험은 없지만, APISIX Gateway를 2년 운영하면서 mTLS의 필요성을 느꼈고, Istio와 Kubernetes의 mTLS 자동화 기능에 큰 매력을 느껴 Ambient Mode POC를 진행하며 개념을 깊이 이해하게 되었습니다.\n\n" +
      "**APISIX 운영하며 느낀 보안 개선 포인트**\n\n" +
      "APISIX에서 RBAC 기반 인증/인가를 운영했는데, Gateway 레벨에서만 보안을 강제할 수 있었습니다. Gateway를 통과한 후 내부 서비스 간 통신은 평문 HTTP였고, 인증서를 수동으로 관리해야 해서 만료 시 장애 리스크가 있었으며, 서비스 단위로 세밀한 TLS 정책을 적용할 수 없었습니다. 당장 큰 문제는 아니었지만, 보안 측면에서 개선 여지가 있다고 생각했습니다.\n\n" +
      "**Istio mTLS 자동화에 매력을 느낀 이유**\n\n" +
      "그러다가 Istio와 Kubernetes의 mTLS 자동화 기능을 알게 되었는데, 정말 매력적이었습니다. 첫째, 인증서 자동 발급과 Rotation입니다. Citadel(현 istiod)이 모든 서비스의 인증서를 자동으로 발급하고, 90일마다 자동 갱신하며, 서비스 재시작 없이 적용되는 것이 놀라웠습니다. APISIX에서는 인증서 만료 전에 수동으로 갱신하고 Gateway를 재시작해야 했거든요. 둘째, Zero Trust 아키텍처입니다. 모든 서비스 간 통신이 자동으로 암호화되고, Service Account 기반 양방향 인증으로 신원을 보장하며, 명시적으로 허용하지 않은 통신은 차단되는 구조가 이상적이라고 생각했습니다. 셋째, 운영 복잡도 제거입니다. 개발자가 TLS 설정을 신경 쓸 필요 없이 Istio가 투명하게 처리하고, PeerAuthentication 정책으로 서비스별 mTLS 모드를 제어하며, 레거시 시스템은 PERMISSIVE 모드로 점진적 마이그레이션이 가능한 점이 매력적이었습니다.\n\n" +
      "**Istio Ambient Mode POC 진행과 결과**\n\n" +
      "이런 기능들에 끌려서 Istio Ambient Mode POC를 진행했습니다. 고민했던 것은 세 가지였어요. 첫째는 성능 임팩트입니다. TLS handshake가 P99 지연시간에 얼마나 영향을 줄지, 일일 20-50M 메시지를 처리하는 환경에서 CPU 오버헤드가 감당 가능한지 측정하고 싶었습니다. 둘째는 실제 운영 가능성입니다. 300개 서비스의 인증서 rotation이 정말 문제없이 작동하는지, 장애 시나리오를 검증하고 싶었습니다. 셋째는 디버깅 난이도입니다. 암호화된 트래픽에서도 Envoy 로그와 메트릭으로 충분히 트러블슈팅이 가능한지 확인하고 싶었습니다.\n\n" +
      "결국 POC는 실패했습니다. Ambient Mode가 당시 Beta 단계라 production ready가 아니었고, 팀 내 Kubernetes 전문성이 제한적이며, ECS Fargate에서 EKS로 마이그레이션 비용이 컸기 때문입니다. 하지만 이 과정에서 mTLS 아키텍처와 Istio 설계 원리를 깊이 이해하게 되었습니다.\n\n" +
      "**금융권에서 mTLS가 중요한 이유 (토스 사례 기반)**\n\n" +
      "토스 블로그를 보면 100% mTLS를 강제한다고 밝혔는데, 금융권에서 중요한 이유가 세 가지입니다. 첫째는 Zero Trust 보안 모델입니다. 전통적 보안은 네트워크 경계에만 방화벽을 두지만 내부망은 신뢰하는데, 이는 내부자 공격이나 악성코드 확산에 취약합니다. mTLS는 모든 서비스 간 통신을 암호화하고 양방향 인증을 해서 네트워크 스니핑을 방지하고, 서비스 신원을 보장하며, Man-in-the-Middle 공격을 차단합니다.\n\n" +
      "둘째는 규제 준수입니다. 금융권은 전자금융감독규정에 따라 개인정보와 거래 데이터를 암호화해야 하고, 내부 통신도 암호화 대상입니다. 감사 시 암호화 증빙을 제출해야 하는데, Istio는 자동으로 모든 트래픽을 암호화하고 메트릭을 수집해서 compliance 입증이 쉽습니다. 셋째는 운영 자동화입니다. 수동 인증서 관리는 human error가 발생하기 쉬운데, Istio는 자동 인증서 발급과 rotation을 하고, 서비스 재시작 없이 인증서를 갱신하며, 만료 전 자동 갱신으로 장애를 방지합니다.\n\n" +
      "**APISIX vs Istio mTLS 차이**\n\n" +
      "제가 2년간 운영한 APISIX는 Gateway 레벨에서만 TLS를 처리하고, 내부 서비스 간 통신은 평문이며, 인증서를 수동으로 관리해야 하고, 서비스 단위 mTLS 제어가 불가능했습니다. 반면 Istio는 모든 Pod 간 통신에 자동 mTLS를 적용하고, Citadel이 인증서를 자동 발급 및 rotation하며, PeerAuthentication으로 서비스별 정책을 설정하고, AuthorizationPolicy로 세밀한 접근 제어를 합니다.\n\n" +
      "토스 같은 금융 환경에서는 계열사 간 통신(토스뱅크, 토스증권, 토스페이먼츠)을 보호하고, 마이데이터 기관과 연동 시 금융위 규정을 준수하며, 내부 마이크로서비스 간 Zero Trust를 구현하기 위해 mTLS가 필수적입니다.\n\n" +
      "**배운 교훈과 토스 기여 가능성**\n\n" +
      "POC가 실패했지만 mTLS가 단순 암호화가 아니라 Zero Trust 아키텍처의 핵심이라는 것을 배웠고, Service Mesh 없이는 대규모 환경에서 운영이 거의 불가능하다는 것을 체감했습니다. 토스 입사 시 저의 강점은 Istio 아키텍처를 이미 평가하고 이해했고, mTLS의 장점과 한계를 실전 검토로 체득했으며, APISIX 운영 경험으로 Gateway vs Service Mesh 차이를 명확히 알고, 실패한 POC도 솔직하게 공유하며 배운 점을 설명할 수 있다는 것입니다.",
  },
  {
    id: 102,
    category1: "Infrastructure",
    category2: "Istio",
    question:
      "Istio Ambient Mode를 평가하셨는데, 결과는 어땠나요? Sidecar 방식과 어떤 차이가 있나요?",
    answer:
      "Istio Ambient Mode POC는 제가 작년에 시도했던 가장 야심찬 프로젝트였는데 결국 실패로 끝났습니다. 하지만 이 실패가 제게 Istio와 Service Mesh에 대한 깊은 이해를 가져다주었고, 토스 같은 환경에서 왜 Istio가 필수인지 확신하게 되었습니다.\n\n" +
      "Ambient Mode를 선택한 이유는 세 가지였습니다. " +
      "첫째는 리소스 효율성입니다. 기존 Sidecar 방식은 모든 Pod마다 Envoy 컨테이너가 추가되어 300개 서비스 기준으로 CPU 150 cores와 메모리 300GB가 추가로 필요한데 AWS 비용으로 월 2000달러가 증가하고 Pod 시작 시간이 5-10초 늘어나며 리소스 낭비가 심했습니다. " +
      "Ambient Mode는 Sidecar가 없어서 리소스 오버헤드가 80% 감소하고 Pod 시작이 즉시 가능하며 비용이 월 400달러로 절감됩니다. " +
      "둘째는 운영 단순화입니다. Sidecar는 애플리케이션 배포 시마다 Envoy 버전 관리가 필요하고 istio-injection label 관리가 복잡하며 Sidecar 장애 시 애플리케이션도 멈춥니다. " +
      "Ambient Mode는 애플리케이션과 프록시가 분리되어 독립적으로 업그레이드 가능하고 프록시 장애가 앱에 영향을 주지 않으며 개발자가 Istio를 의식할 필요가 없습니다. " +
      "셋째는 점진적 도입입니다. 전체 클러스터를 한 번에 Istio로 전환하는 것은 리스크가 크므로 namespace별로 단계적 적용이 가능하고 문제 발생 시 빠른 롤백이 가능하며 성능 영향을 실시간으로 측정할 수 있습니다.\n\n" +
      "POC 진행 과정에서 첫 주에는 EKS 클러스터 생성을 하고 Terraform으로 VPC, Subnet, NAT Gateway를 구성하며 EKS 1.28 클러스터를 배포하고 Fargate 프로파일을 설정했습니다. " +
      "두 번째 주에는 Istio Ambient Mode 설치를 하는데 istioctl로 ambient profile을 설치하고 ztunnel DaemonSet이 각 노드에 배포되며 Waypoint Proxy를 L7 처리용으로 구성했습니다. " +
      "세 번째 주에는 테스트 애플리케이션 배포로 APISIX Gateway를 Istio Gateway로 마이그레이션하고 기존 ECS 서비스를 EKS Pod로 전환하며 mTLS 통신을 검증했습니다. " +
      "네 번째 주에는 성능 및 안정성 테스트를 해서 부하 테스트로 P99 latency를 측정하고 장애 주입 테스트로 Circuit Breaker를 검증하며 모니터링 대시보드를 구축했습니다.\n\n" +
      "실패한 이유는 다섯 가지였습니다. " +
      "첫째는 생태계 미성숙입니다. Ambient Mode가 당시 Beta 단계여서 프로덕션 레퍼런스가 거의 없었고 공식 문서가 불완전해서 에러 메시지 해석이 어려웠으며 커뮤니티 지원이 제한적이어서 Stack Overflow에 답변이 없었습니다. " +
      "둘째는 Gateway API 통합 이슈입니다. Kubernetes Gateway API와의 호환성 문제가 있었고 VirtualService를 HTTPRoute로 변환 시 기능 손실이 있었으며 트러블슈팅에 일주일이 소요되었습니다. " +
      "셋째는 성능 이슈입니다. 예상과 달리 P99 latency가 30ms 증가했고 ztunnel의 CPU 사용률이 예상보다 높았으며 대용량 트래픽에서 안정성이 검증되지 않았습니다. " +
      "넷째는 팀 역량 부족입니다. Kubernetes 전문가가 팀에 없어서 Istio 디버깅 능력이 부족했고 Envoy 로그 분석을 할 수 없었으며 문제 발생 시 외부 컨설팅이 필요했습니다. " +
      "다섯째는 마이그레이션 비용입니다. 기존 ECS 워크로드 300개를 EKS로 이전하는 작업량이 방대했고 APISIX 설정을 Istio로 변환하는 작업이 복잡했으며 CI CD 파이프라인 전면 재작성이 필요했습니다.\n\n" +
      "최종 결정과 배운 점으로 4주 POC 후 팀 회의를 거쳐 ECS Fargate와 APISIX 유지를 결정했는데 이유는 안정성이 우선이고 팀 규모가 2-3명으로 제한적이며 비즈니스 가치 대비 마이그레이션 리스크가 크다는 것이었습니다. " +
      "하지만 이 과정에서 Istio 아키텍처를 완전히 이해하게 되었고 Service Mesh의 가치를 체감했으며 mTLS와 Zero Trust 개념을 체화했고 실패한 POC도 귀중한 학습 경험이라는 것을 깨달았습니다.\n\n" +
      "토스 환경과의 연결점으로 토스는 성숙한 DevOps 팀이 있어서 제가 겪은 팀 역량 문제가 없고 이미 EKS와 Kubernetes를 운영 중이라 마이그레이션 비용이 없으며 금융권 규제로 mTLS가 필수라서 Service Mesh 도입이 불가피하고 대규모 트래픽으로 Ambient Mode의 리소스 효율성이 큰 가치를 가집니다.\n\n" +
      "토스 입사 시 강점은 Ambient Mode를 직접 평가한 경험이 있어서 Sidecar vs Ambient 트레이드오프를 이해하고 POC 실패 경험으로 리스크 관리 능력을 입증했으며 Istio 아키텍처를 이론이 아닌 실전으로 학습했고 토스의 Istio 운영 환경에 빠르게 적응 가능하다는 것입니다. " +
      "핵심 철학은 실패한 POC도 성공이며 무엇이 작동하지 않는지 아는 것이 무엇이 작동하는지 아는 것만큼 중요하고 기술 선택은 팀 상황과 비즈니스 맥락에 달려 있다는 것입니다.",
  },
  {
    id: 103,
    category1: "Infrastructure",
    category2: "Istio",
    question:
      "Istio AuthorizationPolicy를 사용하여 서비스 간 접근 제어를 구현하는 방법과, 실제 금융 서비스에 적용한다면 어떤 정책을 설계하겠습니까?",
    answer:
      "금융권 핵심 API인 /send-money 같은 경로는 누가 접근할 수 있는지 명확히 정의되어야 합니다. 제가 APISIX에서 RBAC를 운영할 때 가장 큰 문제는 Gateway 레벨에서만 제어가 가능해서 내부 서비스 간 호출은 신뢰 기반이었다는 것입니다. 만약 공격자가 Gateway를 우회하면 전체 시스템이 노출되는 구조였습니다.\n\n" +
      "Istio AuthorizationPolicy는 이 문제를 근본적으로 해결합니다. 각 서비스 입구에서 인가 정책을 강제하므로 Gateway를 우회해도 서비스가 요청을 거부하고, Service Account 기반 신원 확인으로 IP 스푸핑이 불가능하며, Default Deny 원칙으로 명시적으로 허용하지 않은 모든 접근을 차단합니다.\n\n" +
      "금융 서비스 정책 설계 사례로 송금 API 보호를 들 수 있습니다. " +
      "계층 1로 Service Account를 확인해서 payment namespace의 payment-service만 허용하고, " +
      "계층 2로 HTTP Method는 POST만 허용하며, " +
      "계층 3으로 Path는 /send-money만 허용하고, " +
      "계층 4로 JWT Claims의 role이 authenticated-user인지 확인합니다.\n\n" +
      "핵심 설계 원칙은 세 가지입니다. " +
      "Principle 1은 Fail-Safe by Default인데 위험한 접근은 ALLOW만 나열해서 정책 누락 시 모든 접근을 허용하는 것이고, " +
      "안전한 접근은 Default DENY에 필요한 것만 ALLOW해서 정책 누락 시 접근을 차단하는 것입니다. " +
      "Principle 2는 Identity-Based로 IP 기반이 아닌 이유는 Kubernetes Pod IP가 재시작 시 변경되고, " +
      "IP 스푸핑 공격이 가능하며, Service Account는 불변이고 mTLS로 검증되기 때문입니다. " +
      "Principle 3은 Defense in Depth 다층 방어로 " +
      "계층 1은 Service Account로 누가인지 확인하고, " +
      "계층 2는 HTTP Method로 어떻게 접근하는지 확인하며, " +
      "계층 3은 Path로 어디에 접근하는지 확인하고, " +
      "계층 4는 JWT Claims로 무슨 권한이 있는지 확인합니다.\n\n" +
      "APISIX vs Istio 실전 비교를 하면 " +
      "정책 위치는 APISIX가 Gateway 중앙 집중인 반면 Istio는 각 서비스 입구에 분산되고, " +
      "내부 통신은 APISIX가 신뢰 기반으로 미보호인 반면 Istio는 mTLS와 인가를 통합하며, " +
      "배포 영향은 APISIX가 Gateway 재시작이 필요한 반면 Istio는 서비스별 독립 배포가 가능하고, " +
      "스케일은 APISIX가 Gateway 병목인 반면 Istio는 서비스별 병렬 처리가 가능하며, " +
      "세밀도는 APISIX가 경로 수준인 반면 Istio는 Service Account와 JWT를 사용하고, " +
      "감사는 APISIX가 수동 로그 분석인 반면 Istio는 Envoy가 자동 기록합니다.\n\n" +
      "제가 APISIX에서 구현했던 방식은 RBAC Plugin을 사용해서 authenticated-user role에 " +
      "/send-money path와 POST method를 허용하는 규칙을 정의했는데 " +
      "한계는 모든 정책이 Gateway에 집중되어 단일 장애점이 되고, " +
      "내부 서비스 간 호출은 여전히 신뢰 기반이며, " +
      "Gateway bypass 공격 시 전체 시스템이 노출됩니다.\n\n" +
      "Istio의 Zero Trust 완성은 세 가지 방식입니다. " +
      "첫째는 서비스별 독립 정책으로 k8s/payment/authz-policy.yaml은 Payment 팀이 소유하고, " +
      "k8s/user/authz-policy.yaml은 User 팀이 소유하며, " +
      "k8s/order/authz-policy.yaml은 Order 팀이 소유해서 " +
      "각 팀이 자신의 서비스 정책을 관리하고 Gateway 팀의 병목을 제거하며 GitOps로 버전 관리합니다. " +
      "둘째는 내부 통신도 인가가 필수인데 Backend가 Database를 호출할 때도 인가 검사를 해서 " +
      "오직 허가된 서비스만 DB에 접근하도록 payment와 order namespace만 허용합니다. " +
      "셋째는 감사 추적 자동화로 누가 어떤 정책으로 차단되었는지 Envoy 로그에 자동 기록하고, " +
      "금융 규제인 전자금융감독규정을 준수하며, 보안 사고 시 즉시 추적 가능합니다.\n\n" +
      "토스 환경 적용 시나리오로 계열사 간 API 호출 제어를 하면 " +
      "토스뱅크만 토스증권 API 호출이 가능하도록 toss-securities namespace에 " +
      "toss-bank namespace와 account-service principal만 허용하고 " +
      "/api/securities/* path로 제한합니다.\n\n" +
      "배운 교훈은 Gateway는 외부 방어선이고 AuthorizationPolicy는 내부 방어선이며 금융권은 둘 다 필요하다는 것입니다. " +
      "토스 입사 시 강점은 APISIX RBAC 2년 운영으로 Istio 설계 패턴을 빠르게 이해하고, " +
      "Zero Trust 철학을 완전히 습득했으며, " +
      "금융 규제인 접근 로그와 감사 추적 맥락을 이해하고, " +
      "Default Deny 원칙을 체화했다는 것입니다. " +
      "핵심 철학은 보안 정책은 누가 막을 것인가가 아니라 왜 허용하는가를 먼저 정의해야 하고 " +
      "Default Deny는 기술이 아니라 사고방식이라는 것입니다.",
  },
  {
    id: 104,
    category1: "Infrastructure",
    category2: "Istio",
    question:
      "Istio Envoy Proxy의 역할과 커스터마이징이 필요한 상황을 설명해주세요.",
    answer:
      "토스 블로그에서 읽은 Envoy를 직접 빌드할지 새 컴포넌트를 만들지 고민하는 내용이 정말 인상 깊었습니다. 저도 비슷한 결정의 순간이 있었습니다. " +
      "Envoy는 단순한 프록시가 아니라 프로그래밍 가능한 데이터 플레인입니다. 많은 사람들이 Envoy를 Nginx의 고급 버전 정도로 생각하는데 실제로는 훨씬 더 유연한 시스템입니다.\n\n" +
      "제가 APISIX Gateway를 2년 운영하면서 느낀 근본적 문제가 세 가지 있었습니다. 첫째는 정적 설정의 한계입니다. " +
      "APISIX upstream 설정에서 노드 주소와 timeout을 정의하면 설정 변경 시 Gateway를 재시작해야 하고, " +
      "트래픽 증가 시 timeout 조정이 전체 서비스에 영향을 주며, A/B 테스트 설정 롤백이 복잡했습니다. " +
      "둘째는 Circuit Breaker가 없어서 장애 서비스가 있어도 Gateway가 계속 트래픽을 전송하고, " +
      "Backend가 500 에러를 반환해도 계속 재시도해서 전체 시스템이 cascading failure로 이어지며, " +
      "수동으로 upstream을 제거해야 했습니다. " +
      "셋째는 Observability가 제한적이어서 기본 메트릭만 제공되고, 커스텀 메트릭 추가가 어려우며, " +
      "P50, P90, P99 분위수를 직접 계산해야 했습니다.\n\n" +
      "Envoy가 해결하는 방식은 세 가지입니다. " +
      "첫째는 xDS API로 동적 설정을 하는 것인데 Istio Control Plane이 동적으로 설정을 푸시하면 Envoy는 재시작 없이 즉시 적용해서 " +
      "Pod 추가나 삭제 시 자동 반영되고, Canary 배포 가중치를 실시간으로 조정하며, Zero-downtime으로 설정을 변경합니다. " +
      "둘째는 지능적 Circuit Breaker로 DestinationRule의 outlierDetection을 설정하면 " +
      "consecutive5xxErrors가 5번 발생하면 30초 동안 해당 서비스를 격리하고, maxEjectionPercent로 최대 50%까지만 격리해서 " +
      "장애 서비스가 자동 격리되어 전체 시스템을 보호하고, 수동 개입이 불필요하며, 장애 복구 시 자동으로 트래픽이 재개됩니다. " +
      "셋째는 Rich Observability로 Envoy가 기본 제공하는 메트릭인 " +
      "envoy_cluster_upstream_rq_total은 요청 수를 추적하고, " +
      "envoy_cluster_upstream_rq_time_bucket은 지연시간 히스토그램을 제공하며, " +
      "envoy_cluster_upstream_cx_connect_fail은 연결 실패를 기록하고, " +
      "envoy_cluster_outlier_detection_ejections는 Circuit breaker 발동을 추적하며, " +
      "envoy_cluster_lb_healthy_panic는 모든 endpoint 장애를 알려줘서 " +
      "이 메트릭들로 MTTI를 18시간에서 10분으로 단축할 수 있었습니다.\n\n" +
      "토스의 Envoy 커스터마이징 실전 사례 중 첫 번째는 Istio 1.7 Telemetry Deprecation입니다. " +
      "문제 상황은 Istio 1.7부터 Mixer가 제거되어 기존 커스텀 메트릭 수집이 불가능해지고 수백 개 서비스 대시보드가 멈출 위기였습니다. " +
      "토스의 의사결정 과정에서 Option A는 Envoy를 직접 빌드하는 것이었는데 Envoy를 fork해서 custom filter를 추가하고 bazel로 빌드했지만 " +
      "Envoy 빌드 시간이 1시간 이상 걸리고, Upstream 업데이트 추적이 어려우며, 보안 패치 지연 리스크가 있고, 팀 내 Envoy와 C++ 전문가가 부족했습니다. " +
      "Option B는 새 컴포넌트를 개발하는 것으로 최종 선택했는데 Envoy metrics를 읽어서 변환하는 별도 서비스를 만들면 " +
      "Envoy upstream을 그대로 사용해서 보안 패치를 즉시 적용하고, Go 언어로 빠르게 개발하며, 팀이 이해하고 유지보수할 수 있었습니다. " +
      "토스의 회고는 더 빠르게 새 컴포넌트 방향으로 판단했으면 좋았을 것이라는 내용이었습니다.\n\n" +
      "두 번째 사례는 무중단 클러스터 전환입니다. Active-Active 이중화 데이터센터에서 한쪽 점검이 필요한 상황에서 " +
      "토스는 EnvoyFilter를 사용해서 configPatches로 NETWORK_FILTER에 적용하고 " +
      "HttpConnectionManager의 common_http_protocol_options에서 max_connection_duration을 300초로 설정하면 " +
      "클라이언트가 5분 내에 자연스럽게 새 커넥션을 생성하고, GSLB가 정상 클러스터로 라우팅하며, 트랜잭션 실패가 제로가 됩니다.\n\n" +
      "제 OpenTelemetry 커스터마이징 경험에서 유사한 사례는 AWS SDK Context Propagation 버그였는데 " +
      "AWS API 호출 시 Trace Context가 손실되었습니다. s3Client.GetObject를 호출하면 ctx의 trace ID가 AWS SDK 내부에서 사라지는 문제였는데 " +
      "제 해결책은 OpenTelemetry Exporter를 직접 수정하는 것이었습니다. " +
      "awsTracer.Start 함수에서 AWS SDK Context를 OTEL Context로 변환하면 AWS context에서 trace context를 추출해서 전파할 수 있었고 " +
      "결과로 AWS API 호출도 분산 추적에 포함되고, Upstream에 PR을 제출해서 머지되었으며, 커뮤니티 전체가 혜택을 받았습니다.\n\n" +
      "토스 vs 제 접근을 비교하면 문제는 토스가 Istio Telemetry Deprecation이고 저는 OTEL AWS 버그였으며, " +
      "첫 시도는 토스가 Envoy 빌드였고 저는 코드 우회였으며, " +
      "피벗은 토스가 새 컴포넌트였고 저는 Upstream 수정이었으며, " +
      "결과는 토스가 내부 솔루션이고 저는 커뮤니티 기여였으며, " +
      "교훈은 토스가 빠른 피벗이 중요하다는 것이고 저는 장기 유지보수가 중요하다는 것이었습니다. " +
      "공통점은 오픈소스를 두려워하지 않고 직접 수정하고, 실패를 인정하고 빠르게 방향을 전환하며, " +
      "할 수 있는가보다 유지 가능한가를 고민한다는 것입니다.\n\n" +
      "Envoy 커스터마이징이 필요한 네 가지 상황은 " +
      "첫째 레거시 시스템 통합으로 기존 프로토콜이 HTTP나 gRPC가 아닐 때 금융권 특수 메시징 프로토콜을 Envoy Wasm 플러그인으로 해결하고, " +
      "둘째 극한 성능 최적화로 HFT 고빈도 거래 시스템에서 마이크로초 단위 지연시간이 요구될 때 버퍼 크기와 커넥션 풀을 튜닝하며, " +
      "셋째 고급 라우팅 로직으로 비즈니스 규칙 기반 라우팅이 필요할 때 사용자 등급별 서버 분리를 Lua 스크립트나 Wasm으로 구현하고, " +
      "넷째 커스텀 Observability로 금융 거래 추적, 사기 탐지 메트릭, 규제 준수 로그를 수집합니다.\n\n" +
      "배운 교훈은 오픈소스 fork는 마지막 수단이고 가능하면 플러그인이나 설정으로 해결하며 " +
      "어쩔 수 없이 수정한다면 upstream에 기여하여 미래를 대비한다는 것입니다. " +
      "토스 입사 시 강점은 Envoy 아키텍처를 이해하고 APISIX와 Nginx를 2년 운영했으며, " +
      "Go 언어 오픈소스 수정 경험으로 OTEL에 기여했고, " +
      "빠른 해결 vs 장기 유지보수 트레이드오프를 체득했으며, " +
      "토스의 Envoy 커스터마이징 전략에 즉시 기여할 수 있다는 것입니다. " +
      "핵심 철학은 오픈소스를 사용할 때는 기여자 마인드로 접근하고 " +
      "문제 발견 시 우리 팀만의 해결이 아니라 커뮤니티 전체의 해결을 목표로 한다는 것입니다.",
  },
  {
    id: 105,
    category1: "Infrastructure",
    category2: "Istio",
    question:
      "Istio를 사용한 Multi-cluster 환경에서 트래픽 분산 및 장애 조치를 어떻게 구현하나요?",
    answer:
      "토스는 Active-Active 이중화 데이터센터로 운영하고 있습니다. " +
      "트래픽 분산은 세 가지 방법을 사용합니다. " +
      "첫째, GSLB인 Global Server Load Balancing은 DNS 기반으로 클러스터 간 트래픽을 분배하고 " +
      "헬스체크 기반으로 자동 failover를 수행하는데 토스는 트래픽 불균형 문제를 GSLB로 해결했습니다. " +
      "둘째, Istio Multi-Primary 모델은 각 클러스터가 독립적으로 서비스를 운영하고 " +
      "Service Discovery를 공유해서 cross-cluster 통신을 하며 mTLS로 클러스터 간 안전한 통신을 보장합니다. " +
      "셋째, Gateway 분리는 토스가 내부망, 계열사, 마이데이터, 사용자 API 각각 별도 Gateway를 운영해서 " +
      "트래픽 성격별로 격리하여 장애 영향 범위를 최소화하는 방식입니다.\n\n" +
      "장애 조치 프로세스는 두 가지 시나리오가 있습니다. " +
      "점검 시나리오에서는 EnvoyFilter로 커넥션 수명을 제한해서 클라이언트가 자연스럽게 다른 클러스터로 재연결하도록 하여 " +
      "무중단 클러스터 전환을 구현합니다. " +
      "장애 시나리오에서는 GSLB 헬스체크가 실패를 감지하면 DNS 레벨에서 자동으로 정상 클러스터로 라우팅하고 " +
      "Istio Circuit Breaker로 장애 전파를 차단합니다.\n\n" +
      "제 경험과 연결하면 Site-to-Site VPN을 1.25Gbps로 구성한 경험이 있고, " +
      "Multi-AZ ECS Fargate 배포로 HA를 구현했으며, " +
      "AWS Advanced Networking Specialty로 DNS와 로드밸런싱을 깊이 이해하고 있고, " +
      "Redis Sentinel HA 클러스터를 운영하면서 자동 failover를 경험했습니다.",
  },
  {
    id: 113,
    category1: "Infrastructure",
    category2: "Istio",
    question:
      "Istio Proxy Protocol을 사용하여 mTLS 환경에서 클라이언트 IP를 보존하는 방법을 설명해주세요.",
    answer:
      "mTLS 통신은 암호화되어 있어 L7 프록시 장비가 요청자의 실제 IP를 볼 수 없습니다. " +
      "이는 보안 감사, 로깅, IP 기반 접근 제어에 문제를 일으킵니다. " +
      "Proxy Protocol은 암호화 전에 TCP 커넥션 시작 부분에 클라이언트 IP 정보를 헤더로 추가하는 프로토콜입니다.\n\n" +
      "Istio에서 구성하는 방법은 세 단계입니다. " +
      "첫째 Gateway에 Proxy Protocol 수신 설정을 하고, " +
      "둘째 앞단 Load Balancer인 AWS NLB에서 proxy-protocol 애노테이션을 설정하며, " +
      "셋째 EnvoyFilter로 X-Forwarded-For 헤더를 설정하면 " +
      "애플리케이션은 X-Forwarded-For 헤더로 실제 클라이언트 IP를 획득하고, " +
      "보안 로그에 정확한 접속 IP를 기록하며, " +
      "IP 기반 Rate Limiting이나 Geoblocking이 가능해집니다.\n\n" +
      "제 경험과의 연결은 AWS Advanced Networking Specialty로 Proxy Protocol과 X-Forwarded-For 원리를 깊이 이해하고, " +
      "APISIX Gateway에서 X-Real-IP 헤더 처리를 구현한 경험이 있으며, " +
      "Site-to-Site VPN에서 네트워크 레벨 IP 라우팅 설정을 경험했습니다. " +
      "토스 환경 적용으로는 계열사와 마이데이터 외부 기관과의 mTLS 통신에서 Proxy Protocol로 IP 보존 문제를 해결했는데 " +
      "이는 금융 규제의 접속 로그 요구사항 준수에 필수적입니다.",
  },
];
