import type { Locale } from "../dictionaries";
import type { Metadata } from "next";

import { getDictionary } from "../dictionaries";

import { InterviewTabs } from "@/components/interview/interview-tabs";
import { interviewQuestions } from "@/data/interview";
import { layoutStyles, spacing } from "@/constants/styles";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Interview Q&A Practice | Seongpil Choi",
  description:
    "Interview preparation Q&A practice page for Seongpil Choi - Platform Lead Engineer",
  robots: "noindex, nofollow",
};

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div style={layoutStyles.interviewPage}>
      <div style={layoutStyles.maxWidthContainer}>
        <header style={{ marginBottom: spacing.xl }}>
          <h1 style={layoutStyles.interviewHeader}>{dict.interview.title}</h1>
          <p style={layoutStyles.interviewDescription}>
            Prepare for technical interviews with categorized questions and
            answers. Click any question to view the full answer in a modal.
          </p>
        </header>

        <InterviewTabs dict={dict} questions={interviewQuestions} />
      </div>
    </div>
  );
}
