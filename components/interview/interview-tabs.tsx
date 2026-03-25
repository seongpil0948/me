"use client";

import type { InterviewQuestion } from "@/types/portfolio";
import type { Dictionary } from "@/types/i18n";

import { Card, CardContent, Tabs } from "@heroui/react";

import { QATable } from "./qa-table";
import { QuizMode } from "./quiz-mode";

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
          <CardContent>
            <QATable questions={questions} />
          </CardContent>
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
