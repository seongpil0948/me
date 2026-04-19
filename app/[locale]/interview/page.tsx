import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { getDictionary, hasLocale } from "../dictionaries";

import { InterviewTabsClient } from "@/components/interview/interview-tabs-client";
import { interviewQuestions } from "@/data/interview";
import { layoutStyles, spacing } from "@/constants/styles";
import { localizeQuestions } from "@/lib/i18n/locale-utils";

export const metadata: Metadata = {
  title: "Interview Q&A Practice | Seongpil Choi",
  description:
    "Interview preparation Q&A practice page for Seongpil Choi - Platform Lead Engineer",
  robots: "noindex, nofollow",
};

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const questions = localizeQuestions(interviewQuestions, locale);

  return (
    <div style={layoutStyles.interviewPage}>
      <div style={layoutStyles.maxWidthContainer}>
        <header style={{ marginBottom: spacing.xl }}>
          <h1 style={layoutStyles.interviewHeader}>{dict.interview.title}</h1>
          <p style={layoutStyles.interviewDescription}>
            {dict.interview.description}
          </p>
        </header>

        <InterviewTabsClient dict={dict} questions={questions} />
      </div>
    </div>
  );
}
