import type { InterviewQuestion } from "@/types/portfolio";

/**
 * Soft Skills & Philosophy 질문들
 * ID: 75 및 기타 소프트 스킬 관련 질문들
 */
export const infraSoftSkillsQuestions: InterviewQuestion[] = [
  {
    id: 75,
    category1: "Infrastructure",
    category2: "Philosophy",
    question: "인프라 엔지니어링에 대한 철학은 무엇인가요?",
    answer:
      "장애 대응하면서 로그 18시간 뒤지던 경험이 제일 힘들었어요. '이건 엔지니어링이 아니라 운에 맡기는 거구나'라고 느꼈죠. 그때부터 Observability를 최우선으로 두게 되었습니다. 측정할 수 없으면 개선할 수 없거든요.\n\n" +
      "Infrastructure as Code도 필수라고 봐요. 수동 설정은 결국 누군가 실수하게 되어 있어요. 클릭보다는 코드로, 문서보다는 실행 가능한 스크립트로 지식을 전달해야 합니다.\n\n" +
      "장애 대응 방식도 바뀌었어요. 처음엔 '누가 실수했나'를 찾았는데, 지금은 '왜 시스템이 이런 실수를 허용했나'를 먼저 봅니다. 사람은 실수하게 되어 있으니 시스템이 방어해야 하죠.\n\n" +
      "신기술 도입할 때는 '운영 복잡도가 얼마나 증가하나'를 먼저 따져봐요. EKS vs ECS 선택할 때도 기술적으론 EKS가 나았지만 팀 상황에서는 ECS가 현실적이었거든요.",
  },
];
