import type { Metadata } from "next";

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import Link from "next/link";

import { QATable } from "@/components/interview/qa-table";
import { interviewQuestions } from "@/data/interview";
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

        {/* Company-Specific Interview Links */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="font-semibold text-lg">
                🎯 Company-Specific Interview Prep
              </h2>
              <p className="text-default-500 text-sm">
                Tailored interview questions for specific companies
              </p>
            </div>
            <Link href="/ko/interview/toss">
              <Button color="primary" variant="flat">
                토스 DevOps Engineer 🇰🇷
              </Button>
            </Link>
          </div>
        </Card>

        <QATable questions={interviewQuestions} />
      </div>
    </div>
  );
}
