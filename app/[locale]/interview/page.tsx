import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { getDictionary, hasLocale } from "../dictionaries";

import { InterviewTabsClient } from "@/components/interview/interview-tabs-client";
import { interviewQuestions } from "@/data/interview";
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
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-8">
          <h1 className="font-nanum-myeongjo mb-2 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
            {dict.interview.title}
          </h1>
          <p className="text-base text-[var(--color-text-secondary)]">
            {dict.interview.description}
          </p>
        </header>

        <InterviewTabsClient dict={dict} questions={questions} />
      </div>
    </div>
  );
}
