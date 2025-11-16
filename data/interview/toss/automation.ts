import type { InterviewQuestion } from "@/types/portfolio";

/**
 * 자동화 및 개발자 경험 개선 관련 질문 (ID 115)
 * - DevEx (Developer Experience) 개선 사례
 * - CI/CD 최적화
 * - 셀프서비스 도구
 */
export const tossAutomationQuestions: InterviewQuestion[] = [
  {
    id: 115,
    category1: "Infrastructure",
    category2: "Automation",
    question:
      "개발자 경험 개선을 위해 어떤 자동화나 툴을 만들어본 경험이 있나요?",
    answer:
      "개발자들이 테스트 환경 받으려고 3-4시간씩 기다리는 게 가장 답답했어요. 인프라팀에 요청하면 수동 설정으로 시간이 오래 걸렸거든요.\n\n" +
      "Terraform 모듈로 셀프서비스 환경을 만들었어요. create-sandbox.sh 스크립트로 브랜치와 사용 시간만 지정하면 격리된 VPC, ECS Task, RDS 스냅샷이 자동 생성되고 24시간 후 자동 정리됩니다. 환경 생성 시간이 3-4시간에서 5분으로 줄었어요.\n\n" +
      "CI/CD 파이프라인도 2시간 걸리던 걸 12분으로 단축했습니다. Frontend와 Backend 병렬 빌드, Docker 레이어 캐싱, 조건부 배포로 개선했죠. 자동화는 시간을 줄이는 것보다 개발자의 몰입을 방해하지 않게 하는 게 더 중요하다고 배웠어요.",
  },
];
