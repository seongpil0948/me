import type { InterviewQuestion } from "@/types/portfolio";

/**
 * Gateway & API Management 관련 질문 (ID 106-108)
 * - APISIX vs Istio Gateway 비교
 * - AWS LB vs Istio Gateway 역할
 * - Kubernetes Gateway API
 */
export const tossGatewayQuestions: InterviewQuestion[] = [
  {
    id: 106,
    category1: "Infrastructure",
    category2: "Gateway",
    question:
      "APISIX Gateway와 Istio Gateway의 차이점을 설명하고, 각각 어떤 상황에 적합한가요?",
    answer:
      "APISIX Gateway는 Nginx + Lua 기반의 독립형 API Gateway로, 클러스터 외부 또는 경계에서 북남향 트래픽을 처리합니다. 동적 설정과 풍부한 플러그인 생태계가 장점이지만, Service Mesh 기능은 제한적입니다. 반면 Istio Gateway는 Envoy 기반으로 Service Mesh의 일부로 작동하며, 클러스터 내부에서 동서향과 북남향 트래픽을 모두 관리합니다. mTLS 네이티브 지원과 세밀한 트래픽 제어가 강점이지만 학습 곡선이 높고 리소스 오버헤드가 있습니다.\n\nAPISIX는 API Gateway만 필요하고 빠른 구축과 운영 편의성이 중요한 경우에 적합합니다. 기존 Nginx 인프라를 마이그레이션하거나 DevOps 인력이 제한적인 환경에서 효과적입니다. Istio Gateway는 마이크로서비스 간 통신 제어가 필수이고 Zero Trust 보안 모델을 구현해야 하는 금융권처럼 엄격한 보안 요구사항이 있는 Kubernetes 네이티브 환경에 적합합니다.\n\n토스는 100% mTLS 강제가 필요한 계열사 및 마이데이터 통신, 복잡한 마이크로서비스 아키텍처, 금융 규제 준수를 위해 Istio Gateway와 Service Mesh를 선택했습니다. TheShop에서는 AWS 의존적 환경과 제한된 DevOps 인력, EKS Ambient Mode 생태계 미성숙을 고려해 APISIX Gateway와 ECS Fargate를 선택했습니다. Istio 아키텍처를 이해하고 평가한 경험이 있으며, 성숙한 DevOps 팀이 있다면 Istio가 더 적합하다고 판단합니다.",
  },
  {
    id: 107,
    category1: "Infrastructure",
    category2: "Gateway",
    question: "AWS ALB/NLB와 Istio Gateway의 역할 차이를 설명해주세요.",
    answer:
      "AWS ALB는 L7 HTTP/HTTPS 로드밸런서로 AWS 관리형이며 VPC 경계에서 작동합니다. 경로 기반 라우팅, 헬스체크, SSL termination을 제공하지만 Kubernetes 리소스를 직접 인식하지 못하고 동적 설정이 제한적입니다. AWS NLB는 L4 TCP/UDP 로드밸런서로 초고속 트래픽 처리와 정적 IP, PrivateLink를 지원하지만 L7 기능이 없어 경로나 헤더 기반 라우팅이 불가능합니다.\n\nIstio Gateway는 Envoy 기반의 L4-L7 프록시로 Kubernetes 내부에서 Istio Ingress Gateway Pod로 작동합니다. Kubernetes Service와 Pod를 네이티브로 인식하고 mTLS를 자동 적용하며, VirtualService와 연동한 동적 라우팅, 헤더/가중치/미러링 기반의 세밀한 트래픽 제어가 가능합니다.\n\n일반적인 패턴은 외부 트래픽이 NLB 또는 ALB를 거쳐 Istio Gateway로 들어간 후 Service Mesh를 통해 Pods에 도달하는 구조입니다. 토스 패턴으로 추정하면 외부에서는 L4 로드밸런서를 거쳐 트래픽 타입별로 분리된 Istio Gateway로 접근하고, 내부는 Istio Service Mesh로 100% mTLS 통신합니다. TheShop의 현재 아키텍처는 외부 트래픽이 ALB를 거쳐 APISIX Gateway로 들어가 ECS Fargate Tasks에 도달하는 구조로, ALB는 AWS 관리형 L7 라우팅과 SSL termination을, APISIX는 동적 라우팅과 RBAC, Rate limiting을 담당합니다.\n\nAWS LB는 인프라 레벨 로드밸런싱, Istio Gateway는 애플리케이션 레벨 트래픽 제어와 보안을 담당하며, 두 기술은 보완 관계로 함께 사용 가능합니다.",
  },
  {
    id: 108,
    category1: "Infrastructure",
    category2: "Gateway",
    question:
      "Kubernetes Gateway API가 무엇이고, Istio Ingress와 어떤 관계인가요?",
    answer:
      "Kubernetes Gateway API는 Ingress의 차세대 API로 2023년에 GA되었습니다. GatewayClass로 인프라 제공자를 정의하고, Gateway로 리스너 및 프로토콜을 설정하며, HTTPRoute/TCPRoute로 라우팅 규칙을 정의하는 역할 분리 구조를 가집니다. Ingress보다 복잡한 라우팅을 지원하고 다양한 구현체 간 호환성을 제공합니다.\n\nIstio는 Gateway API를 구현체로 지원하여 기존 Istio Gateway와 VirtualService 대신 표준 Gateway API를 사용할 수 있습니다. 하지만 AuthorizationPolicy 같은 Istio 고유 기능은 여전히 Istio CRD가 필요합니다.\n\n작년 사내 컨테이너 인프라 EKS 이관 검토 시 Istio Ambient Mode의 리소스 효율성과 Gateway API의 표준화 및 이식성을 목표로 검토했습니다. 하지만 Ambient Mode와 Gateway API 조합이 프로덕션 ready가 아니었고, 두 기술 간 통합 문서가 부족하며 엣지 케이스가 많아 운영 복잡도가 높았습니다. 신기술 도입 리스크가 기대 효과를 초과한다고 판단했습니다.\n\n최종적으로 APISIX Gateway와 ECS Fargate를 선택했는데, 그 이유는 성숙한 생태계, 팀의 AWS 전문성 활용, 제한된 DevOps 인력으로도 안정 운영이 가능하기 때문입니다. 최신 기술이 항상 최선의 선택은 아니며, 팀 상황과 생태계 성숙도, 운영 역량을 고려해야 합니다. 평가 과정에서 Gateway API와 Istio 아키텍처를 깊이 이해하게 되었습니다.",
  },
];
