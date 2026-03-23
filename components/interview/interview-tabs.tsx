"use client";

import type { InterviewQuestion } from "@/types/portfolio";
import type { Dictionary } from "@/types/i18n";

import dynamic from "next/dynamic";
import { Card, Tabs } from "@heroui/react";

const QATable = dynamic(() => import("./qa-table").then((m) => m.QATable), {
  ssr: false,
  loading: () => <div className="p-8 text-center text-muted">Loading...</div>,
});

const QuizMode = dynamic(() => import("./quiz-mode").then((m) => m.QuizMode), {
  ssr: false,
  loading: () => <div className="p-8 text-center text-muted">Loading...</div>,
});

interface InterviewTabsProps {
  dict: Dictionary;
  questions: InterviewQuestion[];
}

export function InterviewTabs({ dict, questions }: InterviewTabsProps) {
  return (
    <Tabs defaultSelectedKey="table" variant="secondary">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Interview modes">
          <Tabs.Tab id="table">
            {`📋 ${dict.interview.tableView}`}
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="quiz">
            {`🎯 ${dict.interview.practice}`}
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>

      <Tabs.Panel id="table">
        <Card>
          <Card.Content>
            <QATable questions={questions} />
          </Card.Content>
        </Card>
      </Tabs.Panel>

      <Tabs.Panel id="quiz">
        <QuizMode
          dict={dict}
          questions={questions}
          title={dict.interview.quiz.title}
        />
      </Tabs.Panel>
    </Tabs>
  );
}
