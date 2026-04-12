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
      "on-premises 환경에서 kubeadm으로 3-node 클러스터를 구축하고 POC를 진행하면서, 그리고 EKS 마이그레이션을 위한 아키텍처 설계를 하면서 겪은 주요 도전들을 공유하겠습니다. " +
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
    id: 313,
    category1: "Infrastructure",
    category2: "Kubernetes",
    question:
      "온프레미스 Kubernetes 클러스터를 직접 구축·운영한 경험을 설명해주세요. Kubespray, Cilium, Rook-Ceph를 선택한 이유는 무엇인가요?",
    answer:
      "IDC 이전 과정에서 Docker 기반 레거시 시스템을 Kubernetes로 전환하면서, 직접 온프레미스 HA 클러스터를 처음부터 설계하고 구축했습니다.\n\n" +
      "**클러스터 구성**\n\n" +
      "6노드 구성입니다:\n" +
      "- Control Plane 3대 (Stacked etcd, 로컬 nginx LB로 API 서버 이중화)\n" +
      "- Worker 3대 (각각 Ceph OSD 로 raw 디스크 /dev/sdb 사용)\n" +
      "- Ubuntu 24.04 LTS, containerd 2.2.1 (초기 CRI-O 1.35.0에서 2026-03-31 마이그레이션)\n\n" +
      "**Kubespray를 선택한 이유**\n\n" +
      "kubeadm을 직접 사용하는 방법도 있지만, 6노드 HA 클러스터를 반복 재현 가능하게 배포하려면 Ansible 기반 IaC가 필수였어요. Kubespray는 etcd 클러스터링, Control Plane HA, Worker 노드 등록을 inventory 파일 하나로 선언적으로 관리할 수 있어서 선택했습니다. 핵심 원칙은 '업스트림 Kubespray 소스는 건드리지 않고, `inventory/group_vars`에서만 오버라이드'예요. 이렇게 하면 Kubespray 버전업이 쉽죠.\n\n" +
      "**Cilium을 CNI로 선택한 이유**\n\n" +
      "이 선택이 가장 중요했어요. Calico, Flannel도 고려했지만 Cilium을 선택한 이유는:\n\n" +
      "1. **kube-proxy 완전 대체**: eBPF 기반으로 kube-proxy 없이 서비스 라우팅을 처리해요. 커널 레벨에서 패킷을 처리하니 latency가 낮고, CPU 오버헤드도 줄어들죠.\n" +
      "2. **Hubble 네트워크 가시성**: 어떤 Pod가 어디와 통신하는지 flow 단위로 관찰할 수 있어요. 온프레미스에서 네트워크 이슈 디버깅이 훨씬 쉬워졌습니다.\n" +
      "3. **Gateway API 지원**: shop.co.kr, *.shop.co.kr, dwoong.com 도메인의 인그레스를 Gateway API로 관리해요. cert-manager + Let's Encrypt DNS-01(Route53)으로 TLS를 자동화했죠.\n" +
      "4. **NetworkPolicy 고도화**: eBPF 기반 L7 정책으로 HTTP 메서드, 경로 단위 세밀한 제어가 가능해요.\n\n" +
      "**Rook-Ceph를 스토리지로 선택한 이유**\n\n" +
      "온프레미스에서 StatefulSet을 운영하려면 분산 스토리지가 필수예요. NFS는 SPOF 리스크가 있고, hostPath는 노드 고정이라 이동성이 없죠. Rook-Ceph를 선택한 이유:\n\n" +
      "1. **3가지 StorageClass 제공**: `ceph-block`(RWO, RBD), `ceph-filesystem`(RWX, CephFS), `local-path`(노드 로컬). 워크로드 특성에 맞게 선택 가능\n" +
      "2. **자동 복제**: Worker 3대에 걸쳐 자동으로 데이터를 복제해서, 노드 1대 장애에도 데이터 손실 없음\n" +
      "3. **Kubernetes Native**: Operator 기반으로 Kubernetes가 직접 Ceph를 관리해요. 별도 관리 서버가 필요 없습니다\n\n" +
      "운영 중 가장 주의해야 할 것은 OSD에 사용하는 디스크입니다. 반드시 raw 디스크(/dev/sdb)를 써야 하고, 이미 포맷된 디스크는 사용하면 안 돼요. `scripts/fix-containerd-overlayfs.sh`처럼 containerd의 overlayfs 이미지가 stale 상태가 되는 문제도 간헐적으로 발생했는데, 모니터링 스크립트를 만들어 주기적으로 체크하고 있습니다.\n\n" +
      "**AWS Cognito OIDC 멀티 테넌트 인증**\n\n" +
      "클러스터 API 서버에 OIDC Provider로 AWS Cognito를 연결했어요. 개발자마다 Cognito로 인증 후 kubeconfig를 발급받는 방식입니다. 스크립트로 자동화했고 (`scripts/auth/create-kubeconfig.sh`), RBAC으로 네임스페이스 단위 권한을 관리해요.\n\n" +
      "**운영 성과**\n\n" +
      "이 클러스터 위에서 Airflow, Kafka, GitLab, ClickHouse, APISIX Gateway 등 10개 이상의 핵심 워크로드를 운영하고 있습니다. Argo CD로 GitOps 배포를 표준화하고, Jenkins로 CI 파이프라인을 운영하면서 신규 서비스 온보딩이 크게 빨라졌어요.",
  },
  {
    id: 314,
    category1: "Infrastructure",
    category2: "AWS",
    question:
      "EKS 클러스터에서 Cilium Gateway API + NLB + External DNS를 통합한 경험을 설명해주세요.",
    answer:
      "EKS 클러스터(theshop-eks-general, K8s 1.34, Seoul ap-northeast-2)에서 인터넷 → NLB → Cilium Gateway → HTTPRoute → 서비스 흐름을 직접 설계·운영했습니다.\n\n" +
      "**아키텍처 결정: Cilium Gateway API vs Nginx Ingress**\n\n" +
      "기존에는 Nginx Ingress를 사용했는데, EKS로 옮기면서 Cilium을 CNI로 채택한 김에 Cilium의 Gateway API 컨트롤러도 함께 사용하기로 결정했어요. 이유:\n\n" +
      "1. **단일 eBPF 데이터플레인**: Cilium CNI + Cilium Gateway가 같은 eBPF 맵을 공유해서 오버헤드가 적어요\n" +
      "2. **Hubble 통합 관측**: Gateway를 통과하는 모든 트래픽을 Hubble로 flow 단위로 관찰 가능\n" +
      "3. **Gateway API 표준**: Ingress 대신 Kubernetes 표준 Gateway API 사용\n\n" +
      "**NLB 연동 핵심 포인트**\n\n" +
      "가장 많이 실수하는 부분이에요. Gateway 리소스에서 NLB 어노테이션 위치가 중요합니다:\n\n" +
      "```yaml\nspec:\n  infrastructure:\n    annotations:  # ← 여기! metadata가 아닌 spec.infrastructure.annotations\n      service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: \"instance\"  # ip 아닌 instance 필수!\n      service.beta.kubernetes.io/aws-load-balancer-type: \"external\"\n      service.beta.kubernetes.io/aws-load-balancer-ssl-cert: \"<ACM_ARN>\"\n```\n\n" +
      "`nlb-target-type: ip`로 설정하면 Target Group이 아예 비어서 트래픽이 안 들어와요. `instance` 타입이어야 NLB가 노드 IP로 라우팅합니다.\n\n" +
      "**External DNS로 Route53 자동화**\n\n" +
      "HTTPRoute에 hostname을 지정하면 External DNS가 자동으로 Route53 레코드를 생성해요:\n\n" +
      "```yaml\nhostnames:\n  - my-app.shop.co.kr  # ← External DNS가 이 값으로 Route53 A 레코드 자동 생성\n```\n\n" +
      "Pod Identity로 IAM 역할을 부여해서 External DNS가 Route53을 수정할 수 있게 했어요. IRSA 대신 Pod Identity를 사용한 이유는 관리가 단순하고, 노드 간 역할 공유 없이 Pod 단위 권한 격리가 가능하기 때문입니다.\n\n" +
      "**GitOps CI/CD**\n\n" +
      "흐름: GitLab CI → ECR push → Argo CD Image Updater 감지 → Helm Chart 태그 자동 커밋 → Argo CD Sync\n\n" +
      "- dev: Image Updater가 ECR 변경을 감지해서 자동 배포\n" +
      "- prd: PR 생성 후 관리자 수동 Sync 승인\n\n" +
      "**운영 중 겪은 주요 장애**\n\n" +
      "Spot 노드 인터럽션 이슈(2026-03-07)가 있었어요. Spot 인스턴스를 사용하던 GitLab, ClickHouse가 인터럽션으로 Pod가 종료됐는데, EBS PV의 AZ가 새 노드 AZ와 달라서 재마운트가 안 됐습니다. 이후 critical stateful 워크로드(GitLab, ClickHouse, Scouter)는 별도 On-Demand 전용 NodeGroup으로 분리하고, PV nodeAffinity와 NodeGroup AZ를 반드시 일치시키는 정책을 수립했어요.",
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
    id: 315,
    category1: "Infrastructure",
    category2: "IaC",
    question:
      "Terraform으로 멀티 어카운트 AWS 인프라를 관리한 경험을 설명해주세요. S3+DynamoDB 상태 백엔드 설계와 Jenkins CI/CD 파이프라인 구축 경험이 궁금합니다.",
    answer:
      "**배경: 콘솔 수동 작업의 한계**\n\n" +
      "EKS + 온프레미스 클러스터를 운영하면서 AWS 콘솔로 ECR, Security Group, Cognito를 관리하다 보니 세 가지 문제가 반복됐어요:\n" +
      "1. '이 Security Group은 누가 언제 왜 만들었지?' — 이력 추적 불가\n" +
      "2. PRD 환경에 DEV 설정을 실수로 적용하는 사고 위험\n" +
      "3. 새로운 환경을 만들 때마다 콘솔 클릭 반복 — 재현성 없음\n\n" +
      "그래서 shop-iac 프로젝트로 AWS 인프라를 Terraform IaC로 전환했습니다.\n\n" +
      "**계정 분리 아키텍처**\n\n" +
      "```\nDEV 계정 (008971653402)  PRD 계정 (725129837589)\n───────────────────────  ──────────────────────────\nS3: shop-iac-tfstate      S3: shop-iac-prd-tfstate\nDynamoDB: lock table      DynamoDB: lock table\nECR repos (3개)           ECR repos (3개)\n                          Security Groups\n                          Cognito User Pool\n```\n\n" +
      "DEV와 PRD가 완전히 다른 계정이라 상태 파일도, 자격증명도 절대 공유되지 않아요. 각 환경은 `aws-accounts/dev/`, `aws-accounts/prd/`로 완전히 분리되어 있고, 각자 독립된 `terraform.tf`(S3 백엔드)와 `providers.tf`를 갖습니다.\n\n" +
      "**S3 + DynamoDB 상태 백엔드 설계**\n\n" +
      "상태 백엔드는 한 번만 수동으로 부트스트랩해요(`backend/dev/`, `backend/prd/`). 이후 모든 환경 리소스는 이 백엔드를 참조합니다:\n" +
      "- S3 버킷: 버전닝 + AES256 암호화 + MFA Delete, `prevent_destroy = true` 필수\n" +
      "- DynamoDB: PAY_PER_REQUEST 빌링, `LockID` 파티션 키, `prevent_destroy = true`\n" +
      "- `.terraform.lock.hcl` 커밋 필수, `terraform.tfstate` 루트에 절대 커밋 불가\n\n" +
      "**Jenkins CI/CD 파이프라인**\n\n" +
      "파이프라인 흐름:\n" +
      "`Checkout → Setup Terraform → Prepare AWS Profile → Init → Validate → Plan → Plan Review → [Destroy Guard] → Approval → Apply`\n\n" +
      "핵심 안전 장치 3가지:\n\n" +
      "1. **Destroy Guard 스테이지**: Plan 결과를 파싱해서 삭제 리소스가 1개라도 있으면 `🚨 DESTROY detected` Slack 긴급 알림 + 별도 수동 승인 요구. 표준 Approval 스테이지와 분리되어 이중 확인이 필요해요.\n\n" +
      "2. **단일 자격증명 주입**: `TARGET_ENV` 파라미터(dev/prd)에 따라 Jenkins 자격증명 중 하나만 주입해요. `withCredentials`로 `$WORKSPACE/.aws/config`와 `$WORKSPACE/.aws/credentials`를 임시 생성하고, 빌드 종료 시 `cleanWs`로 완전 삭제. 교차 계정 오염을 원천 방지합니다.\n\n" +
      "3. **항상 Approval 필수**: Apply 전 관리자(admin) 승인 스테이지가 항상 있어요. `⏳ Awaiting approval` Slack 알림을 보내서 팀이 인지하게 합니다. 자동 Apply는 절대 없습니다.\n\n" +
      "**리소스 수명주기 관리**\n\n" +
      "데이터 손실이 발생하면 복구 불가한 리소스에는 반드시 `prevent_destroy = true`를 적용해요:\n" +
      "- S3 상태 버킷 (상태 파일 삭제 = 모든 IaC 이력 손실)\n" +
      "- DynamoDB 락 테이블\n" +
      "- ECR 레포 (이미지 삭제 = 롤백 불가)\n" +
      "- Cognito User Pool (OIDC 이슈어 변경 = 클러스터 인증 전체 파괴)\n\n" +
      "**Import 워크플로우**\n\n" +
      "콘솔에서 이미 만들어진 리소스를 Terraform으로 가져올 때:\n" +
      "1. `aws-accounts/<env>/NNN_*.tf`에 리소스 정의 작성\n" +
      "2. `imports/` 디렉토리에 import 블록 작성\n" +
      "3. `terraform plan -generate-config-out=generated.tf`로 실제 속성 확인 후 삭제\n" +
      "4. Plan 결과가 **import only, zero create, zero destroy**인지 확인 후 apply\n" +
      "5. `imports/` 파일은 감사 기록으로 영구 보존\n\n" +
      "**운영 성과와 교훈**\n\n" +
      "이 파이프라인 도입 후 '누가 이 리소스 만들었지?' 질문이 사라졌어요. 모든 변경이 git 커밋으로 추적되고, PR 리뷰를 통해 변경 의도가 문서화됩니다.\n\n" +
      "핵심 교훈: Terraform은 '인프라를 코드로 쓰는 것'이 아니라 '감사 가능하고 재현 가능한 상태 관리'입니다. Destroy Guard 하나가 실수로 ECR 레포를 삭제하는 사고를 막을 수 있어요. 인프라 규모가 작아도 처음부터 IaC로 관리하는 게 맞다고 생각합니다.",
  },
];
