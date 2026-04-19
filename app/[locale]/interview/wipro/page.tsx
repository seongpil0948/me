import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, hasLocale } from "../../dictionaries";

import { InterviewTabsClient } from "@/components/interview/interview-tabs-client";
import { wiproQuestions } from "@/data/interview";
import { layoutStyles, spacing } from "@/constants/styles";
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
    <div style={layoutStyles.interviewPage}>
      <div style={layoutStyles.maxWidthContainer}>
        <header style={{ marginBottom: spacing.xl }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            <Link
              href={`/${locale}/interview`}
              style={{
                fontSize: "14px",
                color: "#6b7280",
                textDecoration: "none",
              }}
            >
              ← 전체 Q&A
            </Link>
          </div>

          <h1 style={layoutStyles.interviewHeader}>
            Wipro 2차 임원 면접 — Cloud DevOps/SRE Engineer
          </h1>

          <p
            style={{
              ...layoutStyles.interviewDescription,
              marginBottom: "8px",
            }}
          >
            Harman/Samsung 프로젝트 기반 임원 면접 전용 연습 페이지입니다.
            두괄식(결론 → 근거 → 사례) 구조로 답변하는 연습을 하세요.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            {[
              "Set 1: 기본 임원 면접 15문 (501–515)",
              "Set 2: 심층 질문 15문 (516–530)",
              `총 ${wiproQuestions.length}문항`,
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "12px",
                  padding: "2px 10px",
                  borderRadius: "999px",
                  background: "#f3f4f6",
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                }}
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
