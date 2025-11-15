import type { InterviewQuestion } from "@/types/portfolio";

/**
 * 금융 규제 대응 관련 질문 (ID 117-118)
 * - 전자금융감독규정 준수
 * - EKS 네트워킹 보안
 */
export const tossComplianceQuestions: InterviewQuestion[] = [
  {
    id: 117,
    category1: "Infrastructure",
    category2: "Compliance",
    question:
      "금융권에서 전자금융감독규정 등의 제약사항이 DevOps 업무에 어떤 영향을 미치나요?",
    answer:
      "금융 규제는 제약이 아니라 더 높은 보안 목표입니다. 전자금융감독규정의 핵심 요구사항은 첫째 접근 통제로 모든 시스템 접근에 대한 인증과 인가 로그를 5년 보관하고, 특권 계정 사용 시 승인 절차가 필수이며, 개발과 운영, 감사 권한을 완전 분리하는 업무 분리가 필요합니다. Kubernetes RBAC과 감사 로그를 ConfigMap의 audit-policy로 설정하여 apps 그룹의 deployments와 services 리소스에 대해 production 네임스페이스에서 RequestResponse 레벨 감사를 적용합니다.\n\n둘째, 데이터 보호로 개인정보 및 금융정보를 암호화 저장과 전송하고, 데이터 접근 시 목적을 명시하고 로깅하며, 데이터 보관과 파기 정책을 준수합니다. Istio mTLS로 모든 서비스 간 통신을 암호화하고, Sealed Secrets로 K8s Secret을 암호화 저장하며, Vault로 동적 credential을 관리합니다. SealedSecret로 db-credentials를 encryptedData에 암호화된 password로 저장합니다.\n\n셋째, 시스템 보안으로 보안 패치를 30일 이내에 적시 적용하고, 취약점 스캔을 정기 실시하며, 비인가 소프트웨어 설치를 차단합니다. Falco로 런타임 보안을 감시하고, Trivy로 컨테이너 이미지 취약점을 스캔하며, OPA Gatekeeper로 정책 기반 보안을 강제합니다. Kyverno ClusterPolicy로 Pod 리소스에 대해 privileged containers를 허용하지 않도록 securityContext의 privileged를 false로 검증합니다.\n\n넷째, 장애 대응으로 보안 사고 시 24시간 내 신고하고, 장애 대응 절차를 문서화하며, 복구 계획을 정기 테스트합니다.\n\n실제 적용 사례로 보안과 생산성 균형이 있습니다. 프로덕션 접근 시 승인 절차로 장애 대응이 지연되는 문제를 Break-glass 절차와 사후 감사로 해결했습니다. 긴급 시 임시 권한을 자동 부여하고 24시간 후 자동 회수하며, 모든 액션을 로깅하고 사후 리뷰합니다. CI/CD 보안 강화로 ArgoCD Application의 syncPolicy를 manual로 설정하여 자동 배포를 금지하고, syncOptions에서 CreateNamespace를 false로 설정하여 네임스페이스 생성을 금지합니다.\n\n컴플라이언스 자동화로 ComplianceChecker 클래스에서 5년 로그 보관을 check_data_retention으로 확인하고, 접근 로그 무결성을 check_access_logs로 검증하며, 데이터 암호화 상태를 check_encryption으로 확인합니다.\n\n토스는 보안엔지니어분들과 최대한 협업하면서 해결하고, 더 편리하고 안전하게 만들 방법이 없을지 치열하게 고민하고 개선한다고 했습니다. 제 기여 방향은 보안을 개발 프로세스에 자연스럽게 내재화하는 DevSecOps 통합, 수동 체크를 자동화로 대체하는 자동화된 컴플라이언스, 보안 정책이 생산성을 해치지 않도록 UX를 개선하는 개발자 친화적 접근입니다. 핵심 철학은 규제는 제약이 아니라 더 견고한 시스템을 만들어가는 가이드라인이며, DevOps 플랫폼에서 보안을 더 높이기 위한 새로운 목표에 가깝다는 것입니다.",
  },
  {
    id: 118,
    category1: "Infrastructure",
    category2: "EKS-Networking",
    question:
      "EKS 클러스터 API 서버에 내부/외부에서 접근할 때 패킷 흐름과 네트워킹 구성을 설명해주세요.",
    answer:
      "EKS Cluster Endpoint 접근 방식은 3가지입니다. 첫째 Public Endpoint Only 기본값으로 Kubernetes API 서버가 퍼블릭 인터넷에 노출되고, CIDR 블록으로 접근을 제한할 수 있으며 2025년부터 IPv6 CIDR도 지원합니다. VPC 외부에서 kubectl 명령을 실행할 수 있습니다. 패킷 흐름은 개발자 로컬 PC에서 Internet Gateway를 거쳐 EKS Public Endpoint인 eks.{region}.amazonaws.com으로 들어가 EKS Control Plane의 AWS 관리 VPC에 도달합니다.\n\n둘째, Public과 Private Endpoint 하이브리드로 외부 접근은 Public Endpoint를 통해 CIDR 제한으로 접근하고, 내부 접근은 VPC 내부에서 Private Endpoint를 통해 직접 접근합니다. VPC 내부 패킷 흐름은 EKS Node Worker에서 VPC Private Subnet을 거쳐 ENI Elastic Network Interface로 들어가 10.x.x.x의 EKS Private Endpoint를 통해 PrivateLink로 EKS Control Plane에 도달합니다. 핵심은 PrivateLink 사용으로 VPC 내부 트래픽이 인터넷을 거치지 않는다는 것입니다.\n\n셋째, Private Endpoint Only 최고 보안으로 Public 접근을 완전 차단하고 VPN 또는 Direct Connect를 통해서만 접근 가능합니다. 금융권 필수 구성으로 외부 노출이 제로입니다. 온프레미스에서 EKS로의 패킷 흐름은 온프레미스 개발자에서 AWS Direct Connect 또는 VPN을 거쳐 Transit Gateway로 Multi-VPC를 연결하고, VPC Private Subnet을 거쳐 EKS Private Endpoint를 통해 EKS Control Plane에 도달합니다.\n\n2025년 새 기능인 Dual-Stack Endpoint IPv6 지원으로 새 IPv6 클러스터 엔드포인트는 Public Endpoint가 eks-cluster.{region}.api.aws이고 IPv4는 54.x.x.x, IPv6는 2600:1f18:xxxx::1입니다. Private Endpoint는 {cluster-id}.{region}.eks.amazonaws.com이고 IPv4는 10.x.x.x, IPv6는 fd00:ec2::xxxx의 VPC 내부입니다. IPv6 접근 제어는 2025년 6월 출시로 aws eks update-cluster-config로 IPv4와 IPv6 CIDR을 둘 다 설정할 수 있습니다.\n\n금융권 보안 강화 설정으로 토스 환경을 추정하면 eksctl ClusterConfig로 toss-prod-cluster를 ap-northeast-2 리전에 배포하고, vpc의 clusterEndpoints에서 publicAccess를 false로 설정하여 Public 접근을 완전 차단하고, privateAccess를 true로 설정하여 Private만 허용하며, PrivateLink VPC Endpoint를 자동 생성합니다. Control Plane Security Group의 ingress에서 tcp 프로토콜의 443 포트로 10.0.0.0/8 내부망만 허용하여 특정 VPN Gateway IP만 접근 가능하게 합니다.\n\nAWS Networking Specialty 지식과 제 경험으로 첫째 VPC PrivateLink 아키텍처를 이해합니다. AWS Advanced Networking Specialty 자격증으로 PrivateLink 내부 동작 원리를 숙지하고, ENI와 Route Table, DNS resolution 흐름을 완벽히 이해합니다. 둘째, Site-to-Site VPN 구축 경험으로 온프레미스와 AWS 간 IPsec VPN 터널을 구성하고, BGP 라우팅으로 동적 경로를 전파했으며, 이 경험이 EKS Private Endpoint 접근에 직접 적용됩니다. 셋째, Multi-AZ HA 설계로 EKS Control Plane의 AWS Managed VPC에서 각 AZ에 PrivateLink로 ENI를 배포하여 고가용성을 보장합니다.\n\n토스 환경 적용 포인트는 첫째 계열사 간 VPC Peering과 Private Endpoint로 토스뱅크와 토스증권 등 각자의 VPC에서 EKS Private Endpoint를 VPC Peering으로 공유하고 Transit Gateway로 중앙 집중식 라우팅합니다. 둘째, 금융 규제 준수로 Public Endpoint를 완전 비활성화하고 모든 API 호출이 내부망을 통과하도록 감사 로그를 남기며, Network ACL로 계층적 방어를 합니다. 셋째, 2024년 12월 출시 EKS Hybrid Nodes로 온프레미스 서버를 EKS 클러스터 노드로 등록하고 Private Endpoint를 통해 Control Plane에 접근하는 하이브리드 클라우드를 구성합니다.",
  },
];
