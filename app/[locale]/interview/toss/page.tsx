import type { Locale } from "../../dictionaries";
import type { Metadata } from "next";

import { Chip } from "@heroui/chip";

import { getDictionary } from "../../dictionaries";

import { tossInterviewQuestions } from "@/data/interview";
import { InterviewTabs } from "@/components/interview/interview-tabs";

export const metadata: Metadata = {
  title: "토스 DevOps Engineer 면접 준비 | Toss Interview Prep",
  description:
    "토스 DevOps Engineer 포지션 면접 준비 자료 - Istio, mTLS, Service Mesh, Kubernetes, AWS 기술 질문 및 회사 문화 질의응답",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function TossInterviewPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

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

      {/* Tabs for different modes */}
      <InterviewTabs dict={dict} questions={tossInterviewQuestions} />
    </div>
  );
}
