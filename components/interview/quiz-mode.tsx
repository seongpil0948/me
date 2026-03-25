"use client";

import type { InterviewQuestion } from "@/types/portfolio";
import type { Dictionary } from "@/types/i18n";
import type { QuizProgress } from "@/types/quiz";
import type { Key } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo } from "react";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Chip,
  Label,
  ListBox,
  ProgressBar,
  Select,
  Separator,
} from "@heroui/react";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { useKeyboardNav } from "@/hooks/use-keyboard-nav";
import { useQuizSettings, useQuizState } from "@/hooks/use-quiz-state";
import { QUIZ_ANIMATION, QUIZ_DEFAULTS } from "@/constants/quiz";
import {
  extractCategories,
  filterQuestionsByCategory,
  getRandomIndex,
  shuffleQuestions,
} from "@/lib/skill-utils";

interface QuizModeProps {
  dict: Dictionary;
  questions: InterviewQuestion[];
  title?: string;
}

export function QuizMode({ dict, questions, title }: QuizModeProps) {
  const {
    currentIndex,
    markAsViewed,
    setCurrentIndex,
    setShowAnswer,
    showAnswer,
    viewedQuestionIds,
  } = useQuizState(questions.length);

  const { selectedCategory, setSelectedCategory } = useQuizSettings();

  // Extract unique categories
  const categories = useMemo(() => extractCategories(questions), [questions]);

  // Filter questions by category
  const filteredQuestions = useMemo(
    () => filterQuestionsByCategory(questions, selectedCategory),
    [questions, selectedCategory],
  );

  // Shuffle questions once when category changes
  const shuffledQuestions = useMemo(
    () => shuffleQuestions(filteredQuestions, selectedCategory.length),
    [filteredQuestions, selectedCategory],
  );

  const currentQuestion = shuffledQuestions[currentIndex];

  // Reset when category changes
  useEffect(() => {
    setCurrentIndex(0);
    setShowAnswer(false);
  }, [selectedCategory, setCurrentIndex, setShowAnswer]);

  // Mark question as viewed
  useEffect(() => {
    if (currentQuestion) {
      markAsViewed(currentQuestion.id);
    }
  }, [currentQuestion, markAsViewed]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setCurrentIndex(0);
      setShowAnswer(false);
    }
  }, [currentIndex, shuffledQuestions.length, setCurrentIndex, setShowAnswer]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  }, [currentIndex, setCurrentIndex, setShowAnswer]);

  const handleRandomQuestion = useCallback(() => {
    const randomIndex = getRandomIndex(shuffledQuestions.length);

    setCurrentIndex(randomIndex);
    setShowAnswer(false);
  }, [shuffledQuestions.length, setCurrentIndex, setShowAnswer]);

  const toggleAnswer = useCallback(() => {
    setShowAnswer((prev) => !prev);
  }, [setShowAnswer]);

  // Keyboard navigation
  useKeyboardNav({
    enabled: true,
    onNext: handleNext,
    onPrevious: handlePrevious,
    onToggle: toggleAnswer,
  });

  // Calculate progress
  const progress: QuizProgress = useMemo(
    () => ({
      currentProgress:
        ((currentIndex + 1) / shuffledQuestions.length) * 100 || 0,
      totalQuestions: shuffledQuestions.length,
      viewedCount: viewedQuestionIds.size,
    }),
    [currentIndex, shuffledQuestions.length, viewedQuestionIds.size],
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Infrastructure":
        return "accent" as const;
      case "Frontend":
        return "warning" as const;
      case "Backend":
        return "success" as const;
      default:
        return "default" as const;
    }
  };

  if (!currentQuestion) {
    return (
      <Card>
        <CardContent>
          <p className="text-center text-default-500">
            {dict.common.loading}...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 items-start justify-between sm:flex-row sm:items-center">
        <h2 className="font-nanum-myeongjo text-2xl font-bold">
          {title || dict.interview.quiz.title}
        </h2>
        <Select
          className="max-w-xs"
          placeholder={dict.interview.settings.allCategories}
          selectedKey={selectedCategory}
          variant="secondary"
          onSelectionChange={(key: Key | null) => {
            if (typeof key === "string") {
              setSelectedCategory(key || "all");
            }
          }}
        >
          <Label>{dict.interview.settings.category}</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {categories.map((category) => (
                <ListBox.Item
                  key={category}
                  id={category}
                  textValue={
                    category === "all"
                      ? dict.interview.settings.allCategories
                      : category
                  }
                >
                  {category === "all"
                    ? dict.interview.settings.allCategories
                    : category}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-default-500">
          <span>
            {dict.interview.quiz.progress}: {currentIndex + 1} /{" "}
            {shuffledQuestions.length}
          </span>
          <span>
            {dict.interview.stats.viewedQuestions}: {viewedQuestionIds.size}
            {dict.common.language === "ko" ? "개" : ""}
          </span>
        </div>
        <ProgressBar
          aria-label={`${dict.interview.quiz.progress}: ${currentIndex + 1} / ${shuffledQuestions.length}`}
          className="max-w-full"
          color="accent"
          value={progress.currentProgress}
        />
      </div>

      {/* Question Card with Animation */}
      <AnimatePresence mode="wait">
        <motion.div key={currentQuestion.id} {...QUIZ_ANIMATION.card}>
          <Card style={{ minHeight: `${QUIZ_DEFAULTS.MIN_CARD_HEIGHT}px` }}>
            <CardHeader>
              <div className="flex w-full items-center justify-between">
                <div className="flex gap-2">
                  {currentQuestion.category1 && (
                    <Chip color={getCategoryColor(currentQuestion.category1)} size="sm" variant="soft">
                      {currentQuestion.category1}
                    </Chip>
                  )}
                  {currentQuestion.category2 && (
                    <Chip color="default" size="sm" variant="secondary">
                      {currentQuestion.category2}
                    </Chip>
                  )}
                </div>
                <Chip size="sm" variant="secondary">
                  Q{currentQuestion.id}
                </Chip>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="py-8">
              <div className="space-y-6">
                {/* Question */}
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {dict.interview.quiz.question}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </div>

                {/* Answer Toggle Button */}
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant={showAnswer ? "secondary" : "primary"}
                    onClick={toggleAnswer}
                  >
                    {showAnswer
                      ? dict.interview.quiz.hideAnswer
                      : dict.interview.quiz.showAnswer}
                  </Button>
                </div>

                {/* Answer with Animation */}
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div {...QUIZ_ANIMATION.answer}>
                      <Separator className="my-4" />
                      <h3 className="mb-2 text-xl font-semibold">
                        {dict.interview.quiz.answer}
                      </h3>
                      <MarkdownRenderer>
                        {currentQuestion.answer}
                      </MarkdownRenderer>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>

            <Separator />

            <CardFooter>
              <div className="flex w-full items-center justify-between">
                <Button
                  isDisabled={currentIndex === 0}
                  variant="secondary"
                  onClick={handlePrevious}
                >
                  ← {dict.interview.quiz.previousQuestion}
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleRandomQuestion}
                >
                  🎲 {dict.interview.quiz.randomQuestion}
                </Button>

                <Button variant="secondary" onClick={handleNext}>
                  {dict.interview.quiz.nextQuestion} →
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Stats Card */}
      <Card>
        <CardContent>
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-primary">
                {shuffledQuestions.length}
              </p>
              <p className="text-sm text-default-500">
                {dict.interview.stats.totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {viewedQuestionIds.size}
              </p>
              <p className="text-sm text-default-500">
                {dict.interview.stats.viewedQuestions}
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {shuffledQuestions.length - viewedQuestionIds.size}
              </p>
              <p className="text-sm text-default-500">
                {dict.interview.stats.remainingQuestions}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keyboard Shortcuts Hint */}
      <Card className="bg-default-50">
        <CardContent className="py-3">
          <p className="text-center text-sm text-default-500">
            💡 Tip: Use{" "}
            <kbd className="px-2 py-1 bg-default-200 rounded">←</kbd>{" "}
            <kbd className="px-2 py-1 bg-default-200 rounded">→</kbd> arrow keys
            to navigate,{" "}
            <kbd className="px-2 py-1 bg-default-200 rounded">Space</kbd> to
            toggle answer
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
