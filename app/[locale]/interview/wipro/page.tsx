import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, hasLocale } from "../../dictionaries";

import { InterviewTabsClient } from "@/components/interview/interview-tabs-client";
import { wiproQuestions } from "@/data/interview";
import { localizeQuestions } from "@/lib/i18n/locale-utils";

export const metadata: Metadata = {
  title: "Wipro 2차 임원 면접 연습 | Seongpil Choi",
  description:
    "Wipro Cloud DevOps/SRE Engineer 2차 임원 면접 전용 Q&A 연습 페이지",
  robots: "noindex, nofollow",
};

export default async function WiproInterviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const questions = localizeQuestions(wiproQuestions, locale);

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-8">
          <Link
            className="mb-3 inline-flex items-center gap-1 text-sm text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-secondary)]"
            href={`/${locale}/interview`}
          >
            ← 전체 Q&A
          </Link>

          <h1 className="font-nanum-myeongjo mb-2 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
            Wipro 2차 임원 면접 — Cloud DevOps/SRE Engineer
          </h1>

          <p className="mb-3 text-base text-[var(--color-text-secondary)]">
            Harman/Samsung 프로젝트 기반 임원 면접 전용 연습 페이지입니다.
            두괄식(결론 → 근거 → 사례) 구조로 답변하는 연습을 하세요.
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "Set 1: 기본 임원 면접 15문 (501–515)",
              "Set 2: 심층 질문 15문 (516–530)",
              `총 ${wiproQuestions.length}문항`,
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border-primary)] bg-[var(--color-background-secondary)] px-3 py-0.5 text-xs text-[var(--color-text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <InterviewTabsClient dict={dict} questions={questions} />
      </div>
    </div>
  );
}
