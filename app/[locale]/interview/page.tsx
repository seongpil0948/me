import type { Metadata } from "next";

import { InterviewQATable } from "@/components/interview/qa-table";
import { interviewQuestions } from "@/data/interview-qa";
import { layoutStyles, spacing } from "@/constants/styles";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Interview Q&A Practice | Seongpil Choi",
  description:
    "Interview preparation Q&A practice page for Seongpil Choi - Platform Lead Engineer",
  robots: "noindex, nofollow",
};

export default function InterviewPage() {
  return (
    <div style={layoutStyles.interviewPage}>
      <div style={layoutStyles.maxWidthContainer}>
        <header style={{ marginBottom: spacing.xl }}>
          <h1 style={layoutStyles.interviewHeader}>Interview Q&A Practice</h1>
          <p style={layoutStyles.interviewDescription}>
            Prepare for technical interviews with categorized questions and
            answers. Click any question to view the full answer in a modal.
          </p>
        </header>

        <InterviewQATable questions={interviewQuestions} />
      </div>
    </div>
  );
}
