import type { InterviewQuestion } from "@/types/portfolio";

/**
 * Operations & Management 질문들
 * ID: 32, 33, 36, 39, 63
 */
export const infraOperationsQuestions: InterviewQuestion[] = [
  {
    id: 32,
    category1: "Infrastructure",
    category2: "Redis",
    question: "Redis 클러스터링과 최적화 경험은 어떤가요?",
    answer:
      "Redis 운영에서 가장 어려웠던 것은 '기술 지표'를 넘어 '비즈니스 지표'를 수집하는 거였어요. Redis Exporter나 OTEL로는 서버 수준 메트릭만 나오니까, 정작 필요한 건 API별 캐시 히트율인데 말이죠.\n\n" +
      "문제 상황: ₩500B 이커머스에서 Redis를 세션 저장과 API 캐싱으로 사용했어요. Backend API 팀에서 DB 성능 개선을 위해 캐싱 전략을 추진하면서 '사일로별, 모듈별 Redis 캐싱 히트율을 보여달라'고 요청했어요. 예를 들어 '상품 목록 API의 캐싱 효과가 얼마나 되나?' 같은 비즈니스 질문에 답해야 했죠.\n\n" +
      "가장 고민했던 것은 비즈니스 컨텍스트가 포함된 캐싱 지표 수집이었습니다. " +
      "Backend API 팀에서 DB 쿼리 최적화와 캐싱 전략으로 성능 개선을 추진하면서 " +
      "사일로별, 모듈별 Redis 캐싱 히트율 지표를 요청했습니다. " +
      "Redis Exporter, OTEL Redis Receiver, OTEL/JMX Java Agent를 검토했지만, " +
      "이들은 컴퓨팅 자원 지표만 제공하고 애플리케이션과 이커머스 비즈니스 지표는 커스터마이징이 필요했습니다.\n\n" +
      "해결 방법으로 별도 Signal SDK를 제작했습니다. " +
      "FE/BE 애플리케이션에서 경로별 캐싱 시도율, 히트율, 미스율을 직접 측정하도록 했습니다. " +
      "단순히 Redis 서버의 전체 히트율이 아니라, 상품 목록 API는 85%, 장바구니 API는 92%, " +
      "주문 조회 API는 78%처럼 비즈니스 의미가 있는 세밀한 지표를 확보했습니다. " +
      "이를 통해 어떤 API의 캐싱 전략이 효과적이고 어디에 개선이 필요한지 명확히 파악할 수 있었습니다.\n\n" +
      "Prometheus exporter와 Signal SDK를 조합하여 실시간 모니터링을 구축했습니다. " +
      "인프라 레벨 메트릭과 애플리케이션 레벨 비즈니스 지표를 함께 추적하여 " +
      "캐시 워밍 전략으로 cold start 문제를 해결했습니다.\n\n" +
      "메모리 최적화를 통해 비용 효율성을 개선했습니다. " +
      "Hash compression으로 작은 객체들을 압축하고, " +
      "String interning으로 중복 문자열을 제거했습니다. " +
      "메모리 사용량을 40% 절감하면서도 성능 저하 없이 운영했습니다.\n\n" +
      "Connection Pooling으로 리소스 사용을 최적화했습니다. " +
      "애플리케이션별로 connection pool 크기를 조정하고, " +
      "idle timeout과 max lifetime을 설정하여 connection leak을 방지했습니다. " +
      "동시 연결 수를 50% 줄이면서도 처리량은 유지했습니다.\n\n" +
      "Redis Cluster 샤딩 전략을 구현했습니다. " +
      "16,384개 hash slot을 6개 노드에 균등 분배하고, " +
      "consistent hashing으로 노드 추가/제거 시 데이터 재분배를 최소화했습니다. " +
      "resharding 과정에서 서비스 중단 없이 확장했습니다.\n\n" +
      "데이터 지속성을 요구사항에 맞게 조정했습니다. " +
      "세션 데이터는 RDB snapshot만으로 충분했지만, " +
      "결제 관련 데이터는 AOF with fsync=always로 무손실을 보장했습니다. " +
      "성능과 durability의 trade-off를 비즈니스 중요도에 따라 조정했습니다.\n\n" +
      "Pipeline과 Bulk Operations로 네트워크 오버헤드를 줄였습니다. " +
      "개별 명령어 대신 batch로 처리하여 latency를 70% 감소시켰습니다. " +
      "Lua script를 활용한 atomic operation으로 race condition을 방지했습니다.\n\n" +
      "모니터링과 알림 시스템을 구축했습니다. " +
      "메모리 사용률, 명령어 처리 시간, 복제 지연을 실시간 추적하고, " +
      "임계값 초과 시 자동 스케일링을 트리거했습니다. " +
      "Redis INFO 명령어 기반의 custom metrics를 Grafana로 시각화했습니다.\n\n" +
      "결과적으로 Redis 응답시간을 P95 기준 5ms 이내로 유지하고, " +
      "99.9% 가용성을 달성했으며, 캐시 효율성으로 DB 부하를 80% 감소시켰습니다.",
  },
  {
    id: 13,
    category1: "Infrastructure",
    category2: "Cost Optimization",
    question: "클라우드 비용 최적화를 어떻게 접근하나요?",
    answer:
      "클라우드 비용 최적화에서 가장 큰 충격은 '이건 누가 써요?' 라는 질문에 대답하지 못한다는 것이었어요. 비용이 갑자기 5배 뛰었는데 어느 팀의 어떤 서비스인지 모르니 비난받기도 하고, 추적하기도 힘들었죠.\n\n" +
      "문제 상황: 월 AWS 비용이 처음엔 1,000달러였는데, 6개월 후 5,000달러가 됐어요. 다들 '저희가 쓴 게 아니에요'라고만 하더라고요. Cost Explorer를 열어보니 EC2, S3, RDS가 분산되어 있는데 누가 어떤 목적으로 만들었는지 정보가 없었죠. 태그도 없고, 명명 규칙도 제각각이고.\n\n" +
      "Reserved Instance와 Savings Plans 전략을 수립했습니다. " +
      "과거 12개월 사용 패턴을 분석하여 안정적인 workload는 RI로 전환하고, " +
      "변동성이 큰 워크로드는 Compute Savings Plans을 적용했습니다. " +
      "1년 term으로 30% 비용 절감을 달성했습니다.\n\n" +
      "Auto Scaling 정책을 비용 효율적으로 튜닝했습니다. " +
      "CPU 기반에서 복합 지표(CPU + Memory + Request Count) 기반으로 전환하여 " +
      "over-provisioning을 방지했습니다. " +
      "예측 기반 스케일링으로 트래픽 급증에 선제적으로 대응했습니다.\n\n" +
      "S3 Storage Class 최적화로 스토리지 비용을 줄였습니다. " +
      "액세스 패턴을 분석하여 30일 후 Standard-IA, 90일 후 Glacier, " +
      "7년 후 Deep Archive로 자동 이동하는 Lifecycle 정책을 설정했습니다. " +
      "스토리지 비용을 50% 절감했습니다.\n\n" +
      "Spot Instance 활용으로 컴퓨팅 비용을 대폭 줄였습니다. " +
      "fault-tolerant한 batch job은 100% Spot으로 전환하고, " +
      "mixed instance type으로 interruption 위험을 분산했습니다. " +
      "컴퓨팅 비용을 70% 절감했습니다.\n\n" +
      "CloudWatch와 Lambda를 활용한 자동화된 비용 제어를 구현했습니다. " +
      "개발/테스트 환경은 업무시간 외 자동 종료하고, " +
      "월 예산 초과 시 알림과 함께 non-critical 리소스를 자동 중단했습니다. " +
      "human error로 인한 예상치 못한 비용 폭증을 방지했습니다.\n\n" +
      "Data Transfer 비용 최적화를 위해 CDN과 VPC Endpoint를 활용했습니다. " +
      "정적 콘텐츠는 CloudFront로 캐싱하여 origin 요청을 90% 감소시키고, " +
      "S3 VPC Endpoint로 NAT Gateway를 거치지 않는 직접 연결을 구현했습니다.\n\n" +
      "FinOps 문화를 조직에 정착시켰습니다. " +
      "개발팀별로 월간 cost review를 실시하고, " +
      "cost-aware architecture decision을 장려했습니다. " +
      "비용 최적화를 개발 프로세스에 통합하여 지속가능한 개선을 만들었습니다.\n\n" +
      "결과적으로 월 AWS 비용을 5,000달러에서 2,500달러로 50% 절감하고, " +
      "성능 저하 없이 운영 효율성을 유지했으며, " +
      "비용 예측 정확도를 95%로 향상시켰습니다.",
  },
  {
    id: 64,
    category1: "Infrastructure",
    category2: "Security",
    question: "인프라 보안에 대한 접근 방식은 무엇인가요?",
    answer:
      "인프라 보안에서 가장 무서웠던 순간은 GitHub Private Repo에서 '.env 파일에 DB 패스워드가 하드코딩되어 있다'는 보고를 받았을 때였어요. 다행히 Private Repo였지만, '만약 누군가 토큰을 훔쳤다면?' 하는 상상만 해도 등가류가 숰었죠.\n\n" +
      "문제 상황: 10년된 레거시 코드베이스에서 DB 패스워드, API 키, 제3자 서비스 토큰이 소스코드에 그대로 녹아있었어요. application.properties에 spring.datasource.password=prod1234! 이런 식으로요. '어차피 Private Repo인데 무슨 문제예요?'라는 반응도 있었죠.\n\n" +
      "Identity and Access Management를 최소 권한 원칙으로 설계했습니다. " +
      "각 서비스별로 필요한 최소 권한만 부여하고, " +
      "IAM Policy Simulator로 권한을 검증했습니다. " +
      "Assume Role을 활용한 temporary credentials로 장기간 키 노출을 방지했습니다.\n\n" +
      "Secrets Management를 중앙화했습니다. " +
      "AWS Secrets Manager와 Parameter Store를 활용하여 " +
      "DB 비밀번호, API 키를 암호화 저장하고, " +
      "자동 로테이션으로 정기적으로 갱신했습니다. " +
      "소스코드에 하드코딩된 시크릿을 완전히 제거했습니다.\n\n" +
      "암호화를 전구간에 적용했습니다. " +
      "Data at Rest는 KMS로 암호화하고, " +
      "Data in Transit는 TLS 1.3을 강제했습니다. " +
      "Database 레벨 암호화와 application 레벨 field 암호화를 병행했습니다.\n\n" +
      "Container Security를 강화했습니다. " +
      "Base image 취약점 스캔을 CI/CD에 통합하고, " +
      "non-root user로 실행하며, read-only file system을 적용했습니다. " +
      "Pod Security Standards로 privileged container를 차단했습니다.\n\n" +
      "로깅과 감사를 강화했습니다. " +
      "CloudTrail로 모든 API 호출을 로깅하고, " +
      "GuardDuty로 위협을 탐지하며, Security Hub로 보안 상태를 중앙화했습니다. " +
      "SIEM 시스템과 연동하여 실시간 위협 분석을 수행했습니다.\n\n" +
      "Compliance 자동화를 구축했습니다. " +
      "AWS Config Rules로 보안 정책 준수를 자동 검사하고, " +
      "위반 시 자동 remediation을 수행했습니다. " +
      "SOC 2, ISO 27001 요구사항을 Infrastructure as Code로 구현했습니다.\n\n" +
      "Incident Response 절차를 수립했습니다. " +
      "보안 사고 탐지부터 격리, 조사, 복구까지의 playbook을 자동화하고, " +
      "정기적인 tabletop exercise로 대응 역량을 검증했습니다. " +
      "forensic analysis를 위한 증거 보전 절차도 구축했습니다.\n\n" +
      "결과적으로 보안 인시던트를 zero로 유지하고, " +
      "컴플라이언스 준수율을 99%로 달성했으며, " +
      "보안 취약점 해결 시간을 평균 24시간 이내로 단축했습니다.",
  },
  {
    id: 39,
    category1: "Infrastructure",
    category2: "Disaster Recovery",
    question: "Describe your experience with disaster recovery planning.",
    answer:
      "재해 복구 계획에서 가장 중요한 것은 RTO/RPO 목표 설정과 정기적인 DR 테스트입니다.\n\n" +
      "비즈니스 영향도 분석부터 시작했습니다. " +
      "각 서비스의 다운타임이 비즈니스에 미치는 영향을 분석하여 " +
      "Critical 시스템은 RTO 30분/RPO 5분, Important 시스템은 RTO 4시간/RPO 1시간, " +
      "일반 시스템은 RTO 24시간/RPO 4시간으로 차등 설정했습니다.\n\n" +
      "Multi-Region 아키텍처를 구현했습니다. " +
      "Primary Region(us-east-1)과 DR Region(us-west-2)으로 구성하고, " +
      "RDS Cross-Region Automated Backups와 S3 Cross-Region Replication으로 " +
      "데이터 복제를 자동화했습니다. Route 53 Health Check로 자동 failover를 구현했습니다.\n\n" +
      "데이터베이스 복제 전략을 비즈니스 요구사항에 맞게 설계했습니다. " +
      "Mission-critical DB는 synchronous replication으로 zero data loss를 보장하고, " +
      "일반 DB는 asynchronous replication으로 비용과 성능을 최적화했습니다. " +
      "Read Replica를 DR 용도로 활용했습니다.\n\n" +
      "Infrastructure as Code로 DR 환경을 구축했습니다. " +
      "Terraform으로 전체 인프라를 코드화하여 " +
      "DR 발생 시 15분 내에 전체 환경을 재구축할 수 있도록 했습니다. " +
      "Blue-Green deployment 패턴으로 zero-downtime failover를 구현했습니다.\n\n" +
      "데이터 백업 전략을 3-2-1 규칙으로 설계했습니다. " +
      "3개 복사본을 만들고, 2개 다른 미디어에 저장하며, 1개는 offsite에 보관했습니다. " +
      "자동화된 백업 검증으로 corrupt backup을 사전에 감지했습니다.\n\n" +
      "정기적인 DR 테스트를 분기별로 실시했습니다. " +
      "Full DR Test는 연 2회, Partial Test는 분기별로 수행하여 " +
      "실제 장애 상황을 시뮬레이션했습니다. " +
      "테스트 결과를 바탕으로 절차를 지속적으로 개선했습니다.\n\n" +
      "Communication Plan과 Escalation Matrix를 수립했습니다. " +
      "장애 레벨별로 통보 대상과 절차를 명확히 하고, " +
      "status page와 customer communication template을 준비했습니다. " +
      "War room 운영 절차와 역할 분담도 사전에 정의했습니다.\n\n" +
      "비용 효율적인 DR 전략으로 Pilot Light 패턴을 적용했습니다. " +
      "평상시에는 최소한의 인프라만 유지하다가 " +
      "DR 발동 시 Auto Scaling으로 full capacity로 확장했습니다. " +
      "DR 유지 비용을 70% 절감했습니다.\n\n" +
      "결과적으로 실제 DR 상황에서 RTO 25분을 달성하고, " +
      "데이터 손실 없이 서비스를 복구했으며, " +
      "고객 영향을 최소화하는 seamless failover를 구현했습니다.",
  },
  {
    id: 76,
    category1: "Infrastructure",
    category2: "Cost Optimization",
    question: "인프라 비용 모니터링에 어떤 전략을 사용하나요?",
    answer:
      "인프라 비용 모니터링에서 가장 중요한 것은 실시간 가시성과 예측적 알림입니다.\n\n" +
      "태깅 전략을 체계적으로 수립했습니다. " +
      "Environment(prod/staging/dev), Team(backend/frontend/data), Project, CostCenter 태그를 " +
      "모든 리소스에 일관되게 적용하여 비용 책임 소재를 명확히 했습니다. " +
      "태깅 컴플라이언스를 자동화된 정책으로 강제했습니다.\n\n" +
      "실시간 비용 대시보드를 구축했습니다. " +
      "AWS Cost Explorer API와 Billing API를 활용하여 " +
      "일일/주간/월간 비용 추세를 Grafana로 시각화했습니다. " +
      "서비스별, 팀별 비용 breakdown과 예산 대비 실적을 실시간으로 표시했습니다.\n\n" +
      "비용 이상 탐지 알고리즘을 개발했습니다. " +
      "과거 30일 평균 대비 20% 초과 시 경고, 50% 초과 시 critical alert을 발생시켰습니다. " +
      "계절성과 이벤트를 고려한 adaptive threshold로 false positive를 줄였습니다.\n\n" +
      "예산 기반 알림 시스템을 구축했습니다. " +
      "팀별 월간 예산을 설정하고 80% 사용 시 경고, 95% 사용 시 팀장에게 알림, " +
      "100% 초과 시 non-critical 리소스를 자동 중단하는 단계적 대응을 구현했습니다.\n\n" +
      "리소스 사용률 추적으로 낭비 요소를 식별했습니다. " +
      "CPU 사용률 5% 미만이 7일 지속되는 EC2, " +
      "connection이 없는 RDS, traffic이 없는 Load Balancer를 자동 탐지하여 " +
      "cleanup 후보로 제안했습니다.\n\n" +
      "Reserved Instance 최적화를 자동화했습니다. " +
      "RI 사용률과 Coverage를 모니터링하고, " +
      "unutilized RI를 다른 인스턴스 타입으로 교환하거나 " +
      "마켓플레이스에서 판매하는 권장사항을 제공했습니다.\n\n" +
      "Chargeback 시스템을 구현했습니다. " +
      "각 팀의 실제 리소스 사용량을 측정하여 " +
      "공정한 비용 배분을 수행했습니다. " +
      "shared 리소스는 사용 비율에 따라 proportional allocation했습니다.\n\n" +
      "예측적 비용 분석을 제공했습니다. " +
      "과거 사용 패턴과 계획된 프로젝트를 기반으로 " +
      "향후 3-6개월 비용을 예측하고 예산 계획을 지원했습니다. " +
      "machine learning 모델로 예측 정확도를 90%까지 향상시켰습니다.\n\n" +
      "결과적으로 비용 가시성을 100% 확보하고, " +
      "예상치 못한 비용 증가를 사전에 99% 방지했으며, " +
      "팀별 비용 의식을 높여 자발적 최적화 문화를 만들었습니다.",
  },
  {
    id: 131,
    category1: "Infrastructure/Operations",
    category2: "Redis Migration",
    question:
      "Redis v5에서 v7 LTS로 무중단 마이그레이션할 때 Dual-Write 전략을 사용했다고 하셨는데, 데이터 정합성은 어떻게 보장하고 언제 레거시 시스템을 비활성화할 수 있었나요?",
    answer:
      "Redis 마이그레이션에서 가장 어려웠던 부분은 '백업/복구 정책이 제대로 작동하지 않는다'는 현실을 마주한 것이었습니다.\n\n" +
      "당시 상황을 먼저 말씀드리면, Redis는 세션 관리와 장바구니등 성능 개선의 핵심 요소로 사용되고 있었고, 서비스 중단 없이 v5에서 v7로 전환해야 했습니다. 처음엔 단순하게 생각했어요. 공식 문서대로 AOF/RDB 백업 방식을 쓰면 되겠지 싶었죠.\n\n" +
      "그런데 막상 해보니 큰 문제가 있었습니다. AOF와 RDB 백업 정책이 제대로 관리되지 않아서 실제 복구 시 작동하지 않았어요. 백업 파일은 있는데, 데이터 타입별로 복원이 안 되는 거죠. String, Hash, Set, Sorted Set이 섞여 있는데 일괄 복구가 깨지는 상황이었습니다.\n\n" +
      "결국 Dual-Write 방식을 선택했고, 제가 직접 스크립트를 작성해서 진행했습니다.\n\n" +
      "첫 번째로 한 일은 두 Redis 클러스터(v5, v7)를 동시에 운영하는 거였어요. 애플리케이션에서 Write 요청이 오면 v5와 v7 양쪽에 모두 쓰도록 했습니다. 복잡한 로직은 아니었고, Redis 클라이언트 설정에서 endpoint 두 개를 지정하고 순차적으로 write하는 정도였죠.\n\n" +
      "두 번째는 동기화 스크립트였습니다. 기존 v5에 있던 데이터를 v7로 옮겨야 했는데, 데이터 타입별로 처리가 달랐어요. Python으로 간단한 스크립트를 작성했습니다. SCAN으로 키를 순회하면서 TYPE 명령어로 데이터 타입을 확인하고, String이면 GET→SET, Hash면 HGETALL→HMSET, Set이면 SMEMBERS→SADD 이런 식으로 타입별 복사 로직을 만들었습니다. TTL도 같이 복사해야 했기 때문에 TTL 명령어로 남은 시간을 확인하고 EXPIRE로 동일하게 설정했죠.\n\n" +
      "세 번째는 검증 작업이었습니다. 동기화 스크립트를 돌린 후 v5와 v7의 데이터가 정말 같은지 확인해야 했어요. 매시간 크론잡으로 샘플링 스크립트를 돌렸습니다. 무작위로 키 몇천 개를 뽑아서 v5와 v7의 값을 비교하고, 다르면 Slack으로 알림이 오도록 했죠. 생각보다 불일치가 많이 발생했는데, 대부분 TTL 차이나 Dual-Write 중 한쪽이 실패한 경우였어요.\n\n" +
      "네 번째가 제일 힘들었던 백업 작업이었습니다. AOF/RDB가 믿을 수 없다는 걸 알았기 때문에, 별도 백업 스크립트를 만들어야 했어요. 데이터 타입별로 JSON 형태로 덤프하는 스크립트를 작성했습니다. 예를 들어 String은 key와 value를 JSON으로, Hash는 key와 field-value 쌍을 JSON으로 저장했죠. 이 JSON 파일을 S3에 업로드하고, 복구 스크립트도 따로 만들었습니다. JSON을 읽어서 데이터 타입에 맞게 Redis 명령어를 실행하는 거였어요.\n\n" +
      "실제로 이 백업 스크립트가 한 번 빛을 발했습니다. v7로 전환하는 중에 실수로 데이터를 날린 적이 있었는데, S3에 있던 JSON 백업 파일로 5분 만에 복구했어요. AOF/RDB였으면 복구 자체가 불가능했을 겁니다.\n\n" +
      "레거시 시스템 비활성화는 생각보다 간단했습니다. v7로 Read/Write를 모두 전환하고 2주간 문제가 없으면 v5를 종료하기로 했어요. 실제로는 3주 정도 두 클러스터를 병행 운영하다가, 확신이 서고 나서 v5를 내렸습니다. 다만 v5 스냅샷은 S3에 한 달간 보관했죠. 혹시 모를 롤백 상황을 대비해서요.\n\n" +
      "결과적으로 무중단 마이그레이션에 성공했고, v7의 성능 개선도 체감할 수 있었습니다. 하지만 가장 큰 교훈은, '공식 백업 방식이 항상 작동한다고 믿으면 안 된다'는 것이었어요. 특히 오래된 시스템일수록 설정이 꼬여 있거나 관리가 안 되는 경우가 많습니다. 직접 스크립트로 제어할 수 있는 방법을 만들어두는 게 안전합니다.\n\n" +
      "지금 생각해보면 Dual-Write 방식이 복잡해 보이지만, 실제로는 '두 군데 쓰고, 동기화하고, 검증하고, 백업한다'는 단순한 작업의 반복이었습니다. 다만 그 각각을 믿을 수 있게 만드는 게 핵심이었죠.",
  },
  {
    id: 132,
    category1: "Infrastructure/Operations",
    category2: "Cost Optimization",
    question:
      "인프라 비용 50% 절감을 달성했습니다. EC2 라이트사이징과 S3 스토리지 최적화를 어떻게 진행했나요?",
    answer:
      "인프라 비용 절감에서 가장 어려웠던 부분은 '이게 정말 안 쓰는 거 맞나?'라는 확신을 갖는 것이었습니다.\n\n" +
      "당시 상황을 먼저 말씀드리면, 10년 이상 운영된 시스템이다 보니 누가 왜 만들었는지 모르는 리소스들이 많았어요. EC2로 구동 중인 Redmine, Bastion, 그리고 POC 프로젝트로 보이는 인스턴스들이 여기저기 흩어져 있었습니다. 문제는 '이거 내리면 누군가 쓰고 있을까봐' 두려워서 아무도 손을 못 대고 있었다는 거죠. 거기다 RDS는 필요 이상으로 높은 스펙으로 프로비저닝되어 있었습니다.\n\n" +
      "첫 번째로 한 일은 CloudWatch 메트릭 수집이었습니다. 모든 EC2와 RDS의 사용률 데이터를 4주간 모았어요. CPU, Memory, Network, Disk I/O를 5분 단위로 수집했습니다. 단순히 평균값만 보는 게 아니라, 피크 타임의 최대값도 함께 봤죠. 혹시 야간이나 주말에 배치 작업이 돌아갈 수도 있으니까요.\n\n" +
      "데이터를 보니 명확해졌습니다. Redmine 서버는 CPU 평균 5%, 피크 타임에도 15%밖에 안 썼어요. Bastion 서버는 하루에 몇 번 SSH 접속하는 게 전부였고요. 그래서 이 두 서버는 과감하게 다운그레이드했습니다. t3.large에서 t3.small로 내렸는데, 실제 사용에는 전혀 문제가 없었죠.\n\n" +
      "미사용 인스턴스 처리가 더 조심스러웠습니다. 메트릭상으로는 거의 idle 상태인데, 혹시 누군가 쓰고 있을까봐 불안했거든요. 그래서 이렇게 진행했어요. 먼저 인스턴스를 정지(stop)시키고 1주일 기다렸습니다. Slack에 공지도 올리고, 혹시 문제가 있으면 연락 달라고 했죠. 1주일 동안 아무도 연락이 없으면, 그때 완전히 제거(terminate)했습니다. 결과적으로 6개 인스턴스를 내릴 수 있었어요.\n\n" +
      "RDS는 좀 더 신중하게 접근했습니다. db.r5.2xlarge로 운영 중이었는데, 실제 사용률을 보니 CPU 10%, 메모리 30% 수준이었어요. 하지만 프로덕션 DB라서 바로 다운그레이드하기엔 리스크가 컸습니다. 그래서 Read Replica를 먼저 작은 인스턴스로 만들어서 테스트했어요. 성능에 문제가 없다는 걸 확인한 후에, Primary도 db.r5.xlarge로 한 단계 낮췄습니다. 그것만으로도 월 비용이 40% 줄었죠.\n\n" +
      "S3 최적화도 중요했습니다. 데이터를 크게 세 가지로 분류했어요.\n\n" +
      "첫째, 장기 보관 데이터였습니다. OpenTelemetry Metric, Trace, Log 같은 관측성 데이터는 규제나 분석 목적으로 오래 보관해야 했어요. 이런 건 30일 후 S3 Standard-IA로, 90일 후 Glacier로 자동 이동하도록 Lifecycle 정책을 설정했습니다. 자주 접근하지 않는 데이터는 저렴한 스토리지에 두는 거죠.\n\n" +
      "둘째, 단기 디버깅 데이터였습니다. 개발 중에 생성되는 테스트 로그나 임시 파일들은 7일 후 자동 삭제되도록 했어요. 디버깅이 끝나면 필요 없는 데이터인데, 계속 쌓여서 비용만 발생하고 있었거든요.\n\n" +
      "셋째, 워크플로우 간 전달용 휘발 데이터였습니다. Airflow DAG 사이에서 중간 결과를 주고받는 용도의 데이터는 24시간 후 삭제했습니다. 한 번 쓰고 버리는 데이터인데 무기한 보관할 이유가 없었죠.\n\n" +
      "이 정책들을 적용한 후 S3 비용이 월 800달러에서 300달러로 62% 감소했습니다. 특히 Glacier 이동만으로도 스토리지 비용의 절반을 아낄 수 있었어요.\n\n" +
      "전체적으로 월 AWS 비용이 5,000달러에서 2,500달러로 50% 절감되었습니다. EC2 다운그레이드와 미사용 인스턴스 제거로 1,500달러, RDS 최적화로 700달러, S3 Lifecycle 정책으로 500달러를 줄였죠. 나머지 800달러는 EBS 볼륨 정리, 사용하지 않는 EIP 해제, 오래된 스냅샷 삭제 같은 자잘한 것들이었어요.\n\n" +
      "가장 큰 교훈은, 비용 절감의 핵심은 '용기'라는 것이었습니다. 데이터는 명확하게 보여주는데, 막상 실행하려면 '혹시 문제가 생기면 어쩌지?'라는 두려움 때문에 못 하게 되거든요. 그래서 저는 단계적 접근을 택했어요. Stop → 1주일 대기 → Terminate 이런 식으로 안전장치를 두고 진행하니 심리적 부담이 줄었습니다.\n\n" +
      "지금은 매달 비용 리포트를 보면서 불필요한 리소스가 없는지 체크하고 있어요. 한 번 정리했다고 끝이 아니라, 지속적으로 관리해야 비용이 다시 늘어나지 않더라고요.",
  },
  {
    id: 133,
    category1: "Infrastructure/Operations",
    category2: "API Gateway",
    question:
      "Nginx 대신 APISIX를 중앙 API 게이트웨이로 도입한 기술적 이유는 무엇인가요? Spring Cloud Eureka와 어떻게 연동했고, API 지연시간을 40% 감소시킨 구체적인 방법은?",
    answer:
      "APISIX 도입 결정은 레거시 시스템의 근본적인 문제를 해결하기 위한 선택이었습니다.\n\n" +
      "당시 상황을 먼저 설명하겠습니다. 기존 Nginx는 10년간 사용되면서 설정 파일이 2,000줄이 넘었고, 정규표현식이 중첩되어 있어서 새로운 라우팅 규칙을 추가할 때마다 side effect가 발생했습니다. 더 큰 문제는 동적 설정 변경이 불가능했다는 것이죠. 서비스 라우팅을 바꾸려면 nginx.conf를 수정하고, syntax check 후 reload해야 했는데, 이 과정에서 실수로 잘못된 설정을 반영하면 전체 트래픽이 차단되는 위험이 있었어요.\n\n" +
      "APISIX를 선택한 이유는 세 가지 핵심 요구사항을 충족했기 때문입니다.\n\n" +
      "첫째, 동적 라우팅과 Hot Reload였습니다. APISIX는 etcd를 백엔드로 사용해서 설정 변경을 실시간으로 반영할 수 있습니다. Admin API로 라우팅 규칙을 추가하면 1-2초 내에 모든 APISIX 노드에 전파되죠. Nginx처럼 reload가 필요 없으니 connection drop도 없었습니다.\n\n" +
      "둘째, 플러그인 기반 확장성이었습니다. Rate Limiting, CORS, JWT 인증, Circuit Breaker를 Lua 플러그인으로 쉽게 추가할 수 있었어요. Nginx에서는 이런 기능들을 직접 구현하거나 서드파티 모듈을 컴파일해야 했는데, APISIX는 built-in 플러그인 50개 이상을 제공했습니다.\n\n" +
      "셋째, Service Discovery 통합이었습니다. Nginx는 upstream 서버를 정적으로 설정해야 했지만, APISIX는 Eureka, Consul, Nacos를 네이티브로 지원했습니다. 우리 환경은 Spring Cloud Eureka를 이미 사용하고 있었기 때문에 이 통합이 결정적이었죠.\n\n" +
      "Spring Cloud Eureka와의 연동 과정을 구체적으로 설명하겠습니다.\n\n" +
      "첫 번째 단계는 APISIX Discovery 플러그인 설정이었습니다. APISIX의 config.yaml에 Eureka 서버 URL과 polling interval을 설정했어요. 30초마다 Eureka에서 서비스 목록을 가져오도록 했습니다.\n\n" +
      "두 번째는 Route 설정이었습니다. 예를 들어 product-service라는 마이크로서비스가 있다면, APISIX Admin API로 이렇게 설정했습니다.\n\n" +
      "uri는 /api/products/*, upstream은 service_name=product-service, discovery_type=eureka로 지정했죠. 그러면 APISIX가 자동으로 Eureka에서 product-service의 인스턴스 목록을 조회하고, 로드밸런싱을 수행합니다.\n\n" +
      "세 번째는 Health Check 통합이었습니다. Eureka의 Health Status와 APISIX의 Health Check를 연동해서, Eureka에서 DOWN 상태인 인스턴스는 APISIX가 자동으로 트래픽을 보내지 않도록 했습니다. 이를 위해 Eureka의 /actuator/health endpoint를 APISIX Healthcheck 플러그인에 등록했죠.\n\n" +
      "네 번째는 Graceful Shutdown 구현이었습니다. Spring Boot 서비스가 종료될 때, Eureka에서 먼저 deregister하고 30초 대기 후 실제 종료되도록 했어요. APISIX가 Eureka에서 서비스가 사라진 것을 감지하고 트래픽을 끊기까지 시간 차를 고려한 거죠. 이렇게 해서 배포 시 502 Bad Gateway 에러를 zero로 만들었습니다.\n\n" +
      "API 지연시간 40% 감소의 구체적인 방법을 설명하겠습니다.\n\n" +
      "첫 번째는 Connection Pooling과 Keepalive였습니다. Nginx는 upstream connection을 매번 새로 맺었는데, APISIX는 upstream과의 connection을 pool로 관리하고 keepalive를 사용했습니다. HTTP handshake 오버헤드가 사라지면서 latency가 20ms 감소했어요.\n\n" +
      "두 번째는 Intelligent Load Balancing이었습니다. Nginx는 Round Robin만 지원했지만, APISIX는 Least Connection과 Consistent Hashing을 지원했습니다. 특히 Cache 친화적인 API는 Consistent Hashing으로 같은 요청이 항상 같은 backend로 가도록 해서 cache hit rate를 높였죠. 이것만으로 평균 응답시간이 15ms 줄었습니다.\n\n" +
      "세 번째는 Request Aggregation이었습니다. 프론트엔드에서 여러 API를 순차 호출하던 것을 APISIX의 BatchRequest 플러그인으로 한 번에 묶어서 보냈어요. 예를 들어 상품 상세 페이지에서 product-info, reviews, recommendations 3개 API를 호출하던 것을 하나의 batch request로 처리했습니다. 네트워크 왕복 횟수가 줄어서 total latency가 40ms 감소했죠.\n\n" +
      "네 번째는 Response Caching이었습니다. APISIX의 Proxy Cache 플러그인으로 자주 요청되는 API 응답을 캐싱했어요. 상품 목록처럼 변경이 드문 데이터는 5분간 캐싱해서, cache hit 시 backend를 거치지 않고 APISIX에서 바로 응답했습니다. Backend CPU 부하도 줄고 응답시간도 80%가량 빨라졌죠.\n\n" +
      "다섯 번째는 Circuit Breaker와 Timeout 튜닝이었습니다. Nginx 시절엔 backend가 느려지면 gateway도 같이 느려졌는데, APISIX에서는 연속 5회 실패 시 Circuit Open, 30초간 트래픽 차단, 이후 Half-Open으로 전환하는 정책을 설정했습니다. 장애 서비스가 전체 시스템을 느리게 만드는 것을 방지한 거죠.\n\n" +
      "마지막으로 모니터링 개선이었습니다. APISIX의 Prometheus 플러그인으로 경로별, 메서드별, 상태코드별 메트릭을 수집하고 Grafana로 시각화했어요. P50, P90, P99 latency를 실시간으로 보면서 bottleneck을 찾고 개선했습니다. 예를 들어 특정 API의 P99가 1초를 넘으면 해당 backend 팀에 알림이 가도록 했죠.\n\n" +
      "결과적으로 평균 API 지연시간이 100ms에서 60ms로 40% 감소했고, P99 latency는 500ms에서 200ms로 대폭 개선되었습니다. 더 중요한 것은, 동적 설정 변경으로 배포 없이 라우팅을 수정할 수 있게 되어 운영 민첩성이 크게 향상되었다는 점입니다.\n\n" +
      "핵심 교훈은, API Gateway는 단순한 프록시가 아니라 성능과 안정성의 핵심 계층이라는 것입니다. 적절한 기술 선택과 세심한 튜닝으로 큰 개선을 만들 수 있습니다.",
  },
  {
    id: 1001,
    category1: "Infrastructure/Operations",
    category2: "CI/CD",
    question:
      "Jenkins 기반 ECS 배포 파이프라인을 구축하셨는데, CloudFormation 대신 Jenkins를 선택한 이유가 무엇인가요?",
    answer:
      "'AWS Native로 완전 자동화하자'는 목표로 CodePipeline을 주로 활용해  모놀리식 CloudFormation 스택으로 관리했죠.\n\n" +
      "문제는 CodeBuild에서 생성한 **동적 이미지 태그**를 CloudFormation 템플릿에 주입하기엔 제한적이었어요" +
      "Parameter Store, Lambda 를 고려했지만, CloudFormation은 Parameter 값 변경을 Change Set으로 인식하지 않는등 관리형 서비스 장점을 가져갈 수 가 없었어요.\n\n" +
      "Drift 문제가 있었는데. 장애 대응 때 팀원이 콘솔에서 보안 그룹을 급하게 수정하면, CloudFormation 템플릿과 실제 리소스 상태가 달라지면서. 그 상태에서 ECS Task Definition만 업데이트하려 해도 'Drift detected' 에러로 배포가 완전히 막혔습니다.\n\n" +
      "작은 프로젝트라 인프라 수정은 콘솔에서 빠르게 하는 게 현실적인데, CloudFormation은 그런 유연성을 허용하지 않았어요. 매번 템플릿을 동기화하는 것도 부담이었고요.\n\n" +
      "결국 '모든 걸 IaC로 관리하겠다'는 이상주의를 버렸습니다. CloudFormation으로 프로비저닝된 인프라는 VPC 단위로 격리하고, **신규 앱 배포만 Jenkins로 분리**했어요.\n\n" +
      "Jenkins 파이프라인에서 AWS CLI로 직접 제어하니 훨씬 간단해졌죠. Task Definition 만 신규로 배포한후  스크립트도 대폭 줄었습니다 또 줄인 포인트가 있는데.\n\n" +
      "첫 번째는 이미지 빌드 시간 단축이었습니다. 빌드 캐시, Multi-stage build를 사용했고.\n\n" +
      "두번째는 웹훅 트리거 활용입니다. 배포 자체는 민감하지만 병목은 주로 이미지빌드에 있습니다. 푸시 시점에 웹훅으로 빌드만 먼저 시작하고, 수동 승인으로 배포를 진행하도록 했어요.\n\n" +
      "세 번째는 Health Check 튜닝이었습니다. 신규 테스크로 트래픽 이전전에 시간이 오래 소요되는 걸 확인했어요, Health Check 간격, Threshold를  낮추고 안정화 대기 시간을 줄였습니다.\n\n" +
      "네 번째는 Mail 통합이었습니다. 배포 실패 시 어디서 멈췄는지 찾기 어려웠는데, AWS SNS로 유관자에게 알림을 보내 MTTI 자체를 줄였습니다.\n\n" +
      "**결과와 트레이드오프**\n\n" +
      "Drift로 인한 배포 차단이 zero가 되었습니다. 롤백 시간도 30초로 줄었고요.\n\n" +
      "물론 트레이드오프는 있었어요. CloudFormation의 선언적 관리를 포기했고, 인프라와 애플리케이션 배포가 분리되었죠. 하지만 작은 팀에서 빠른 배포가 더 중요했기 때문에 현실적인 선택이었다고 생각합니다.\n\n" +
      "**CloudFormation/CodePipeline에 대한 회고**\n\n" +
      "CodeBuild 자체는 좋았어요. 빌드 환경이 격리되고, 테스트도 가능하고, 이미지 생성기 자체로 로그도 깔끔했죠. 하지만 CodePipeline과 CloudFormation 조합은 개발자 경험이 좋지 않았습니다. 특히 동적 값 주입과 Drift 처리가 너무 경직되어 있었어요.\n\n" +
      "Terraform이었으면 좀 더 유연했을 것 같긴 해요. `local-exec` provisioner로 동적 처리도 가능하고, State 관리도 더 명확하니까요. 하지만 당시엔 팀 역량과 러닝 커브를 고려해서 익숙한 Jenkins를 선택했습니다.\n\n" +
      "**향후 계획**\n\n" +
      "사실 IaC 쪽은 더 많은 경험을 해보고 싶어요. Terraform으로 전체 인프라를 다시 설계해보거나, GitOps 방식의 ArgoCD 같은 것도 도전해보고 싶습니다. 특히 멀티 클러스터 환경에서 IaC를 어떻게 관리하는지 궁금하거든요.\n\n" +
      "다만 지금은 '작동하는 시스템'이 우선이었고, Jenkins가 그 목표를 달성했습니다. 완벽한 IaC보다 팀이 유지보수 가능한 복잡도가 더 중요했어요.",
  },
];
