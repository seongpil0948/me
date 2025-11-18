"use client";

import type { InterviewQuestion } from "@/types/portfolio";
import type { Dictionary } from "@/types/i18n";

import { Card, CardBody } from "@heroui/card";
import { Tab, Tabs } from "@heroui/tabs";

import { QATable } from "./qa-table";
import { QuizMode } from "./quiz-mode";

interface InterviewTabsProps {
  dict: Dictionary;
  questions: InterviewQuestion[];
}

export function InterviewTabs({ dict, questions }: InterviewTabsProps) {
  return (
    <Tabs aria-label="Interview modes" size="lg" variant="underlined">
      <Tab key="table" title={`📋 ${dict.interview.tableView}`}>
        <Card>
          <CardBody>
            <QATable questions={questions} />
          </CardBody>
        </Card>
      </Tab>

      <Tab key="quiz" title={`🎯 ${dict.interview.practice}`}>
        <QuizMode
          dict={dict}
          questions={questions}
          title={dict.interview.quiz.title}
        />
      </Tab>
    </Tabs>
  );
}
