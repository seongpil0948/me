"use client";

import type { InterviewQuestion } from "@/types/portfolio";
import type { Dictionary } from "@/types/i18n";

import dynamic from "next/dynamic";

// React Aria collection-based components (Table, Dropdown, Tabs) require
// client-side rendering; disable SSR to avoid prerender errors.
const InterviewTabs = dynamic(
  () =>
    import("@/components/interview/interview-tabs").then(
      (m) => m.InterviewTabs,
    ),
  { ssr: false },
);

interface InterviewTabsClientProps {
  dict: Dictionary;
  questions: InterviewQuestion[];
}

export function InterviewTabsClient({
  dict,
  questions,
}: InterviewTabsClientProps) {
  return <InterviewTabs dict={dict} questions={questions} />;
}
