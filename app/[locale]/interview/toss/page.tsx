import type { Metadata } from "next";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";

import { tossInterviewQuestions } from "@/data/interview";

import { QATable } from "@/components/interview/qa-table";

export const metadata: Metadata = {
  title: "토스 DevOps Engineer 면접 준비 | Toss Interview Prep",
  description:
    "토스 DevOps Engineer 포지션 면접 준비 자료 - Istio, mTLS, Service Mesh, Kubernetes, AWS 기술 질문 및 회사 문화 질의응답",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TossInterviewPage() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="font-nanum-myeongjo text-4xl font-bold">
            토스 DevOps Engineer 면접 준비
          </h1>
          <Chip color="primary" variant="flat">
            2025 신입/경력
          </Chip>
        </div>
        <p className="text-default-500 text-lg">
          Istio, Service Mesh, Kubernetes 전문 DevOps Engineer 포지션 기술 면접
          대비
        </p>
      </div>

      {/* Interview Questions Section */}
      <Card>
        <CardHeader>
          <div className="flex w-full items-center justify-between">
            <h2 className="font-nanum-myeongjo text-2xl font-bold">
              📝 면접 질의응답 ({tossInterviewQuestions.length}개)
            </h2>
            <div className="flex gap-2">
              <Chip color="primary" variant="flat">
                기술 {tossTechQuestionsCount}개
              </Chip>
              <Chip color="secondary" variant="flat">
                회사/문화 {tossCompanyQuestionsCount}개
              </Chip>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <QATable
            companyFilter="toss"
            questions={tossInterviewQuestions}
            title="토스 면접 질의응답"
          />
        </CardBody>
      </Card>
    </div>
  );
}

// Helper to count questions by category
const tossTechQuestionsCount = tossInterviewQuestions.filter(
  (q) => q.id >= 101 && q.id < 200,
).length;
const tossCompanyQuestionsCount = tossInterviewQuestions.filter(
  (q) => q.id >= 201,
).length;
