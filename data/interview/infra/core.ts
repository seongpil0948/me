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
      "당시 저희는 프로젝트가 속한 네임스페이스 내 권한만 받았어요. ResourceQuota 안에서 직접 Deployment를 조절하고, Gateway class를 할당받아 베스천 서버 내에서 개발했죠. 제한된 권한이었지만 이게 오히려 좋은 학습 기회였어요. '왜 RBAC이 필요한지', '왜 NetworkPolicy로 네임스페이스를 격리해야 하는지'를 몸소 체험했거든요.\n\n" +
      "이 프로젝트에서 Cluster Operator 직무 분들과 긴밀하게 협업했는데, 이때부터 인프라에 본격적인 관심을 갖고 탐구하기 시작했습니다. '왜 Pod가 갑자기 재시작되지?', '왜 Ingress가 502 에러를 내지?'같은 문제들을 Cluster Operator분들께 여쭤보면서 kubectl describe, kubectl logs, kubectl get events 같은 디버깅 방법을 배웠어요.\n\n" +
      "프로덕션 배포를 팀원들에게 전파하기 위해 직접 POC를 진행했습니다. 사내 3개 서버에 kubeadm을 따라 설치하고, Calico로 네트워킹을 구성하고, Contour를 Ingress Controller로, NFS를 PersistentVolume으로 사용하는 클러스터를 구축했어요. 완벽하진 않았지만, 팀원들이 '아, Kubernetes가 이렇게 동작하는구나'를 직접 체험할 수 있었죠.\n\n" +
      "최근 다시 Kubernetes를 깊이 들여다보면서 안정성이 정말 높아졌다는 걸 느꼈어요. 특히 재성님이 강연해주신 CPU 쓰로틀링과 eBPF 관련 내용이 엄청 흥미로웠습니다. 좀 더 찾아보니 Cilium이 정말 미쳤더라고요. 특히 Connectivity Test 기능은 충격적이었어요.\n\n" +
      "사실 온프레미스 인프라를 관리하면서 테스트 자동화가 정말 어려웠거든요. DNS 문제, 외부 연동업체 연결 문제가 끊임없이 발생했는데, 수동으로 하나하나 확인하려면 시간이 너무 오래 걸렸어요. Cilium의 Connectivity Test는 이런 네트워크 연결성을 자동으로 검증해주는데, 이게 제가 정말 원했던 거였습니다. 게다가 General Purpose한 점도 놀라웠어요. CNI의 경계를 넘어서 네트워크 관측성, 보안 정책, 로드밸런싱까지 커버하더라고요.\n\n" +
      "제 이후 커리어는 이 분야로 결심했습니다. eBPF 기반 네트워킹과 관측성이요. 정확히 어떤 툴로 eBPF를 활용하고 계신지도 정말 궁금합니다. Cilium 외에도 Pixie, Falco 같은 도구들이 있던데, 프로덕션에서 실제로 어떤 조합이 효과적인지 배우고 싶어요.\n\n" +
      "이 경험에서 배운 핵심 교훈은 세 가지입니다.\n\n" +
      "첫째, Kubernetes는 단순한 오케스트레이션 도구가 아니라 '운영 철학'이라는 점입니다. Declarative Configuration, Self-Healing, Horizontal Scaling 같은 개념들이 인프라를 바라보는 관점을 완전히 바꿔놨어요.\n\n" +
      "둘째, RBAC과 NetworkPolicy로 멀티 테넌시를 구현하는 방법을 배웠습니다. 토스처럼 여러 계열사가 하나의 클러스터를 공유하는 환경에서는 네임스페이스 격리와 권한 관리가 필수인데, 이미 실무에서 경험해봤기 때문에 빠르게 적응할 수 있을 것 같아요.\n\n" +
      "셋째, 이론과 실습의 차이를 체감했습니다. 공식 문서에는 'kubectl apply -f'만 하면 된다고 나와 있지만, 실제로는 DNS가 안 되거나, StorageClass가 없거나, CNI가 충돌하거나 하는 문제들이 끊임없이 발생하더라고요. 이런 엣지 케이스를 직접 해결해본 경험이, 프로덕션 장애 대응에서 큰 힘이 될 것 같습니다.\n\n" +
      "토스 입사 시, 이미 Kubernetes 표준화가 잘 되어 있을 텐데, 제 경험을 살려서 신규 서비스 온보딩을 더 자동화하고, eBPF 기반 네트워크 관측성 강화, Cilium 같은 차세대 CNI 도입 검토 같은 부분에 기여하고 싶습니다.",
  },
  {
    id: 10,
    category1: "Infrastructure",
    category2: "Kubernetes",
    question: "Kubernetes 운영에서 가장 어려웠던 점과 해결 방법은 무엇인가요?",
    answer:
      "Kubernetes 운영에서 가장 어려운 것은 네트워크 디버깅과 리소스 경합입니다.\n\n" +
      "EKS 클러스터 운영 경험 100개 이상의 Pod를 관리하면서 겪은 주요 도전들을 공유하겠습니다. " +
      "네트워크 문제 해결에서 Pod 간 통신 장애 시 가장 효과적인 디버깅 순서를 확립했습니다. " +
      "kubectl exec로 Pod-to-Pod 연결성을 확인하고, DNS Resolution 문제를 검증하며, CNI 네트워크 상태를 점검합니다.\n\n" +
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
    question: "AWS 경험과 자격증에 대해 설명해주세요.",
    answer:
      "AWS 아키텍처 설계에서 가장 어려웠던 것은 EKS vs ECS 선택이었어요. 기술적으론 EKS가 더 나았지만, 팀 상황을 고려하니 ECS가 현실적이었죠.\n\n" +
      "문제 상황: ₩500B 이커머스 플랫폼을 컨테이너 환경으로 마이그레이션해야 했어요. 당시 DevOps 2-3명이 전체 인프라를 담당하고 있었고, Kubernetes 경험은 제한적이었죠.\n\n" +
      "EKS vs ECS 고민 과정:\n\n" +
      "처음엔 EKS가 확실히 매력적이었어요. Istio로 Service Mesh 구성할 수 있고, Kubernetes 표준 생태계를 쓸 수 있고, Ambient Mode로 리소스 효율성도 높일 수 있잖아요. CKA 자격증도 있었고요.\n\n" +
      "하지만 현실적인 장벽들이 많았어요:\n\n" +
      "첫째, 팀 숙련도. Kubernetes 자체는 어느 정도 알지만, 프로덕션 운영은 다르더라고요. Istio 운영 숙련도 쌓는 데만 최소 6개월은 필요했어요. 그 시간이 우리에겐 없었죠. 레거시 마이그레이션과 데이터 플랫폼 구축이 더 급했거든요.\n\n" +
      "둘째, 기술 성숙도 리스크. Istio Ambient Mode가 Beta 단계였고, Gateway API와의 통합에 엣지 케이스가 많았어요. 레퍼런스도 거의 없었죠. '우리가 first mover가 되어야 하나?'라는 고민이 컸습니다.\n\n" +
      "셋째, 운영 복잡도. EKS는 Control Plane만 관리형이고, Worker Node는 직접 관리해야 해요. 패치, 보안, 스케일링 모두 우리 몫이죠. 반면 ECS Fargate는 완전 서버리스라 패치 걱정이 없었어요.\n\n" +
      "최종 선택: ECS Fargate\n\n" +
      "결국 ECS Fargate를 선택했어요. 이유는:\n\n" +
      "1. 관리 오버헤드 최소화: Worker Node 없이 컨테이너만 배포\n" +
      "2. 비용 효율성: 초 단위 과금, 유휴 리소스 제로\n" +
      "3. AWS 생태계 통합: S3, RDS, Glue, Athena와 이미 깊이 통합되어 있었어요\n" +
      "4. 빠른 학습 곡선: 팀이 2주 만에 프로덕션 배포 가능했어요\n\n" +
      "물론 단점도 명확했어요. Kubernetes 생태계의 풍부한 도구들을 못 쓰고, 디버깅이 어렵고, Sidecar 패턴 구현이 제한적이었죠.\n\n" +
      "Multi-AZ 고가용성 설계:\n\n" +
      "AZ-1a에 ECS Fargate Primary 클러스터, AZ-1b에 Secondary, AZ-1c에 Standby를 배치했어요. ALB가 Health Check로 자동 라우팅하고, RDS는 Multi-AZ로 구성했습니다. Redis는 3개 Node로 Sentinel 구성해서 자동 장애 조치가 가능했죠.\n\n" +
      "실제 장애 경험에서 배운 것:\n\n" +
      "한번은 AZ-1a에서 AWS 네트워크 장애가 발생했어요. 다행히 ALB가 자동으로 AZ-1b로 트래픽을 전환해서 서비스는 유지됐죠. 이때 Multi-AZ 설계의 진가를 느꼈습니다.\n\n" +
      "S3 + Athena 데이터 레이크 비용 최적화:\n\n" +
      "처음엔 모든 로그를 S3 Standard에 저장했는데, 월 5,000달러가 나왔어요. 'Lifecycle Policy를 써보자'고 해서 30일 후 Standard-IA, 90일 후 Glacier, 7년 후 Deep Archive로 자동 이동하게 했죠. 월 비용이 2,500달러로 50% 절감됐어요.\n\n" +
      "Athena 쿼리 최적화도 중요했어요. 처음엔 Parquet 파일만 썼는데, 파티션 프로젝션을 추가하니까 10TB 스캔이 100GB로 줄었어요. 쿼리 시간도 5분에서 10초로 단축됐죠.\n\n" +
      "AWS 인증 취득 과정에서 배운 점:\n\n" +
      "DevOps Professional을 준비하면서 CodePipeline, CodeBuild를 공부했는데, 실무에서는 GitHub Actions + AWS CLI가 훨씬 유연하더라고요. 이론과 실무의 차이를 느꼈죠.\n\n" +
      "Advanced Networking Specialty에서는 VPN, Direct Connect, Transit Gateway의 실전 활용법을 배웠어요. 특히 Site-to-Site VPN 설계할 때 큰 도움이 됐습니다.\n\n" +
      "운영 성과:\n\n" +
      "가용성 99.9%에서 99.95%로 개선, 월 인프라 비용 2,500달러 유지, Auto Scaling으로 트래픽 5배 증가에도 안정적 대응.\n\n" +
      "핵심 교훈은, 최신 기술이 항상 정답은 아니라는 거예요. EKS가 기술적으로 더 나아도, 팀 상황과 비즈니스 우선순위를 고려하면 ECS가 더 현명한 선택일 수 있죠. 토스 입사 후에는 이미 Kubernetes가 표준화되어 있고 DevOps 팀이 성숙해 있으니, 그때는 EKS의 진가를 발휘할 수 있을 것 같습니다.",
  },
  {
    id: 14,
    category1: "Infrastructure",
    category2: "IaC",
    question: "Infrastructure as Code 경험에 대해 설명해주세요.",
    answer:
      "IaC에서 가장 어려웠던 것은 State Drift와 의존성 순환이었어요. 클릭 몇 번이면 끝날 걸 코드로 하니까 오히려 복잡해 보였죠.\n\n" +
      "문제 상황: Terraform 도입 초기에 '왜 굳이 이렇게까지 해야 하나?'는 질문을 많이 받았어요. AWS 콘솔에서 클릭 몇 번이면 VPC 만들어지는데, Terraform 코드 100줄 짜는게 효율적이냐는 거죠.\n\n" +
      "그러다가 실제 장애를 겪었어요:\n\n" +
      "어느 날 Security Group 규칙이 사라졌어요. 누가 콘솔에서 '잠깐 테스트하려고' 수정했다가 복구를 안 한 거죠. 문제는 어떤 규칙이 원래 있었는지 아무도 모른다는 거였어요. 백업도 없었고요. 그때부터 'IaC는 선택이 아니라 필수구나'를 깨달았습니다.\n\n" +
      "Terraform State 관리의 현실:\n\n" +
      "처음엔 로컬에 state 파일을 두었어요. 근데 팀원이 동시에 apply하다가 state 충돌이 나서 리소스가 꼬였죠. S3 backend + DynamoDB locking으로 바꿨는데, 이번엔 다른 문제가 생겼어요.\n\n" +
      "10분 이상 terraform apply가 실행되면 lock timeout이 나서 수동으로 DynamoDB 테이블에 가서 lock을 지워야 했어요. CI/CD 파이프라인에서 특히 자주 발생했죠. lock-timeout을 20분으로 늘리고, 장시간 실행되는 작업은 별도 workspace로 분리했습니다.\n\n" +
      "State Drift 감지 자동화:\n\n" +
      "개발자들이 급하게 콘솔에서 수정하는 일이 계속 생기더라고요. terraform plan 하면 차이가 나는데, 아무도 안 봐요. 그래서 매주 금요일 자동으로 terraform plan을 돌려서 drift가 있으면 Slack으로 알림 보내게 했어요. '이거 콘솔에서 누가 수정했어요?'라고요.\n\n" +
      "의존성 지옥 해결:\n\n" +
      "가장 힘들었던 게 순환 의존성이었어요. ECS 클러스터를 만들려면 VPC가 필요하고, VPC를 만들려면 Subnet이 필요하고, Subnet을 만들려면... 이렇게 꼬리에 꼬리를 물더라고요. 한 번 apply에 모든 걸 만들려다가 실패하고, 단계별로 쪼개서 apply 했어요.\n\n" +
      "모듈 설계 실수와 개선:\n\n" +
      "처음엔 모든 걸 변수로 받으려고 했어요. vpc_cidr, subnet_cidrs, availability_zones, nat_gateway_count... 변수만 30개 넘어가니까 쓰는 사람도 헷갈리더라고요. \n\n" +
      "컨벤션 기반으로 바꿨어요. environment와 service_name만 받고, 내부적으로 naming convention을 자동 적용하는 거죠. dev-api-vpc, prod-web-subnet-a 이런 식으로요. 훨씬 깔끔해졌습니다.\n\n" +
      "GitOps 통합:\n\n" +
      "terraform plan 결과를 PR 코멘트에 자동으로 추가했어요. 변경사항을 한눈에 볼 수 있으니까 코드 리뷰가 훨씬 쉬워졌죠. 실수로 프로덕션 리소스를 삭제하려는 PR이 올라오면 바로 눈에 띄었어요.\n\n" +
      "6개월 운영 후 Best Practices:\n\n" +
      "1. 환경별 workspace 분리: dev, staging, prod 각각 독립\n" +
      "2. validation 블록으로 잘못된 입력 방지: CIDR 범위 검증, 네이밍 규칙 체크\n" +
      "3. provider 버전 고정: AWS provider 업데이트로 갑자기 문법 바뀌는 일 방지\n" +
      "4. terraform import로 기존 리소스 점진적 IaC화: 한꺼번에 안 하고 하나씩\n\n" +
      "가장 큰 성과는 신뢰였어요. 이제 누구라도 terraform apply만 하면 동일한 인프라가 생성되니까, '내 로컬에서는 되는데요?'같은 말이 사라졌죠.\n\n" +
      "핵심 교훈은, Terraform은 단순히 인프라를 코드로 만드는 도구가 아니라 인프라 거버넌스 시스템이라는 거예요. 코드 리뷰, 승인 프로세스, 변경 이력 관리까지 포함해야 진정한 가치를 얻을 수 있습니다.",
  },
];
