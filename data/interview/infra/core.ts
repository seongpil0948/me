import type { InterviewQuestion } from "@/types/portfolio";

/**
 * Core Infrastructure 질문들 (Kubernetes, AWS, IaC)
 * ID: 9, 10, 14
 */
export const infraCoreQuestions: InterviewQuestion[] = [
  {
    id: 9,
    category1: "Infrastructure",
    category2: "Kubernetes",
    question: "Kubernetes 관련 실무 경험을 구체적으로 설명해주세요.",
    answer:
      "Kubernetes와의 첫 만남은 협업 프로젝트에서였어요. LG, SK 같은 대기업과 협업하면서 쿠버네티스 환경에 앱을 배포하는 프로젝트를 리딩했습니다.\n\n" +
      "당시 저희는 프로젝트가 속한 네임스페이스 내 권한만 받았어요. " +
      "ResourceQuota 안에서 직접 Deployment를 조절하고, Gateway class를 할당받아 베스천 서버 내에서 개발했죠. " +
      "제한된 권한이었지만 이게 오히려 좋은 학습 기회였어요. " +
      "'왜 RBAC이 필요한지', '왜 NetworkPolicy로 네임스페이스를 격리해야 하는지'를 몸소 체험했거든요.\n\n" +
      "이 프로젝트에서 Cluster Operator 직무 분들과 긴밀하게 협업했는데, " +
      "이때부터 인프라에 본격적인 관심을 갖고 탐구하기 시작했습니다. " +
      "'왜 Pod가 갑자기 재시작되지?', '왜 Ingress가 502 에러를 내지?'같은 문제들을 Cluster Operator분들께 여쭤보면서 " +
      "kubectl describe, kubectl logs, kubectl get events 같은 디버깅 방법을 배웠어요.\n\n" +
      "프로덕션 배포를 팀원들에게 전파하기 위해 직접 POC를 진행했습니다. " +
      "사내 3개 서버에 kubeadm을 따라 설치하고, Calico로 네트워킹을 구성하고, Contour를 Ingress Controller로, NFS를 PersistentVolume으로 사용하는 클러스터를 구축했어요. " +
      "완벽하진 않았지만, 팀원들이 '아, Kubernetes가 이렇게 동작하는구나'를 직접 체험할 수 있었죠.\n\n" +
      "이 경험에서 배운 핵심 교훈은 세 가지입니다.\n\n" +
      "첫째, Kubernetes는 단순한 오케스트레이션 도구가 아니라 '운영 철학'이라는 점입니다. " +
      "Declarative Configuration, Self-Healing, Horizontal Scaling 같은 개념들이 인프라를 바라보는 관점을 완전히 바꿔놨어요.\n\n" +
      "둘째, RBAC과 NetworkPolicy로 멀티 테넌시를 구현하는 방법을 배웠습니다. " +
      "토스처럼 여러 계열사가 하나의 클러스터를 공유하는 환경에서는 네임스페이스 격리와 권한 관리가 필수인데, " +
      "이미 실무에서 경험해봤기 때문에 빠르게 적응할 수 있을 것 같아요.\n\n" +
      "셋째, 이론과 실습의 차이를 체감했습니다. " +
      "공식 문서에는 'kubectl apply -f'만 하면 된다고 나와 있지만, " +
      "실제로는 DNS가 안 되거나, StorageClass가 없거나, CNI가 충돌하거나 하는 문제들이 끊임없이 발생하더라고요. " +
      "이런 엣지 케이스를 직접 해결해본 경험이, 프로덕션 장애 대응에서 큰 힘이 될 것 같습니다.\n\n" +
      "토스 입사 시, 이미 Kubernetes 표준화가 잘 되어 있을 텐데, " +
      "제 경험을 살려서 신규 서비스 온보딩을 더 자동화하고, ResourceQuota 최적화나 NetworkPolicy 개선 같은 부분에 기여할 수 있을 것 같아요.",
  },
  {
    id: 10,
    category1: "Infrastructure",
    category2: "AWS",
    question: "Please explain your AWS experience and certifications.",
    answer:
      "Kubernetes 운영에서 가장 어려운 것은 네트워크 디버깅과 리소스 경합입니다.\n\n" +
      "EKS 클러스터 운영 경험 100개 이상의 Pod를 관리하면서 겪은 주요 도전들을 공유하겠습니다. " +
      "네트워크 문제 해결에서 Pod 간 통신 장애 시 가장 효과적인 디버깅 순서를 확립했습니다. " +
      "kubectl exec로 Pod-to-Pod 연결성을 확인하고, DNS 해상도 문제를 검증하며, CNI 네트워크 상태를 점검합니다.\n\n" +
      "실제 장애 사례로 Pod Network 파편화 문제가 있었습니다. 특정 Node의 Pod들이 간헐적 connection timeout을 보였는데, " +
      "원인은 AWS ENI 한계였습니다. t3.medium의 경우 6개 ENI에 각각 6개 IP로 최대 36개 Pod만 지원 가능한데 이를 초과했던 것입니다. " +
      "Node 인스턴스 타입을 t3.large로 변경하고 Pod 밀도를 조정하여 해결했습니다.\n\n" +
      "RBAC 보안 설계에서는 최소 권한 원칙을 적용했습니다. 각 서비스가 특정 리소스에만 접근하도록 제한하고, " +
      "ResourceNames로 세밀한 권한 제어를 구현했습니다. Vertical Pod Autoscaler 실전 경험에서는 " +
      "운영 중 자동 조정으로 CPU 사용률을 30%에서 70%로 개선하고 메모리 OOM 킬을 95% 감소시켰습니다.\n\n" +
      "Pod Scheduling 고급 전략으로 Anti-affinity를 사용하여 고가용성을 보장하고, " +
      "nodeAffinity로 compute-optimized 인스턴스에 CPU 집약적 워크로드를 배치했습니다. " +
      "APISIX Gateway와 Kubernetes 통합에서는 Ingress 대신 APISIX CRD를 사용하여 " +
      "rate limiting과 prometheus 플러그인을 적용했습니다.\n\n" +
      "CKA 인증에서 배운 실전 기술로 etcd 백업/복구를 매일 자동화하고, 클러스터 업그레이드는 Rolling update 전략으로 " +
      "노드별 순차 진행했습니다. 6개월 운영 결과 클러스터 가용성 99.9%, Pod 시작 시간 P95 기준 30초 이내, " +
      "노드 CPU 사용률 60-80% 유지를 달성했습니다.\n\n" +
      "핵심 교훈은 Kubernetes는 플랫폼이 아니라 생태계라는 것입니다. " +
      "각 컴포넌트의 상호작용을 이해해야 안정적 운영이 가능합니다.",
  },
  {
    id: 130,
    category1: "Infrastructure",
    category2: "AWS",
    question: "Please explain your AWS experience and certifications.",
    answer:
      "AWS 아키텍처 설계에서 가장 중요한 것은 장애 도메인 분리와 비용 최적화의 균형입니다.\n\n" +
      "Multi-AZ 고가용성 아키텍처를 구성했습니다. AZ-1a에 ECS Fargate Primary, AZ-1b에 Secondary, AZ-1c에 Standby를 배치하고, " +
      "RDS는 Primary와 Replica로, Redis는 3개 Node Sentinel 구성으로 설계했습니다.\n\n" +
      "ECS Fargate vs EKS 선택에서 가장 고민했던 것은 관리 복잡도 vs 제어 권한이었습니다. " +
      "ECS Fargate를 선택한 이유는 서버리스 컨테이너로 패치 관리가 불필요하고 초 단위 과금이 가능했기 때문입니다. " +
      "단점은 Kubernetes 생태계 제약과 디버깅 어려움이었습니다.\n\n" +
      "Site-to-Site VPN 1.25Gbps를 구현하여 온프레미스와 AWS 간 하이브리드 아키텍처를 구축했습니다. " +
      "BGP 라우팅 대신 정적 라우팅을 선택한 이유는 온프레미스 네트워크팀의 BGP 운영 경험 부족과 " +
      "라우팅 테이블 예측 가능성 필요 때문이었습니다. 결과적으로 평균 처리량 800Mbps, 지연시간 P95 기준 15ms를 달성했습니다.\n\n" +
      "S3 Lifecycle 비용 최적화 전략으로 30일 후 Standard IA, 90일 후 Glacier, 7년 후 Deep Archive로 이동하는 정책을 수립했습니다. " +
      "월 스토리지 비용을 5,000달러에서 2,500달러로 50% 절감했습니다.\n\n" +
      "Athena + Glue Data Lake 아키텍처에서 파티션 프로젝션으로 성능을 최적화했습니다. " +
      "10TB 스캔을 100GB 스캔으로 99% 축소하고 쿼리 시간을 5분에서 10초로 단축했습니다. " +
      "CloudFormation Infrastructure as Code로 템플릿 모듈화 전략을 적용하여 " +
      "수동 콘솔 작업 2시간을 자동화 12분으로 90% 시간 단축했습니다.\n\n" +
      "AWS 인증 취득 과정에서 DevOps Professional 핵심 통찰로 CodePipeline보다 GitHub Actions + AWS CLI가 유연하고, " +
      "SysOps Administrator 운영 경험으로 Systems Manager 패치 관리와 CloudTrail + GuardDuty 보안 모니터링을 구축했습니다. " +
      "현재 운영 중인 AWS 아키텍처는 가용성 99.99%, 월 2,500달러 비용 효율성, Auto Scaling으로 트래픽 10배 증가 대응이 가능합니다.\n\n" +
      "핵심 교훈은 AWS는 도구가 아니라 플랫폼이라는 것입니다. " +
      "각 서비스의 한계와 연동 방식을 이해해야 안정적인 운영이 가능합니다.",
  },
  {
    id: 14,
    category1: "Infrastructure",
    category2: "IaC",
    question: "What is your Infrastructure as Code experience?",
    answer:
      "IaC의 가장 큰 함정은 상태 불일치와 의존성 순환입니다. 실제 운영에서 배운 교훈들을 공유하겠습니다.\n\n" +
      "Terraform State 관리의 현실에서 State Drift 문제가 있었습니다. 수동으로 AWS 콘솔에서 수정한 리소스들이 " +
      "terraform plan에서 차이 발생했고, 매주 금요일 상태 검증 자동화를 구축하여 drift 감지 시 Slack 알림을 보내도록 했습니다.\n\n" +
      "Remote State Locking 전략으로 S3 backend + DynamoDB 테이블로 동시 수정을 방지했지만, " +
      "10분 이상 실행 시 lock timeout이 발생하여 수동 해제가 필요했습니다. " +
      "CI/CD에서 lock-timeout을 20분으로 설정하여 해결했습니다.\n\n" +
      "모듈 설계 철학에서는 너무 많은 매개변수보다 컨벤션 기반 설계를 선택했습니다. " +
      "environment와 service_name만 받아 내부적으로 naming convention을 적용하는 방식으로 단순화했습니다.\n\n" +
      "Dependency Hell 해결이 가장 어려웠습니다. EKS 클러스터 → ALB Ingress Controller → Route53 → EKS의 " +
      "순환 의존성으로 apply 실패가 발생했는데, 단계별 apply + data source 활용으로 참조를 분리하여 해결했습니다.\n\n" +
      "GitOps와 통합하여 terraform plan을 JSON으로 변환하고 PR 코멘트에 변경사항 요약을 자동으로 추가했습니다. " +
      "6개월 운영 후 Best Practices로 환경별 workspace 분리, validation 블록으로 잘못된 입력 방지, " +
      "provider 버전 고정, terraform import로 기존 리소스의 점진적 IaC화를 확립했습니다.\n\n" +
      "핵심 깨달음은 Terraform은 도구가 아니라 인프라 거버넌스 시스템이라는 것입니다. " +
      "코드 리뷰, 승인 프로세스, 변경 이력 관리까지 포함해야 진정한 IaC의 가치를 얻을 수 있습니다.",
  },
];
