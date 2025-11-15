import type { QuizSettings, QuizState } from "@/types/quiz";

import { useCallback, useEffect, useState } from "react";

import {
  cleanupOldQuizData,
  QUIZ_DEFAULTS,
  QUIZ_STORAGE_KEYS,
} from "@/constants/quiz";

/**
 * Load quiz state from localStorage
 */
function loadQuizState(totalQuestions: number): Partial<QuizState> {
  try {
    const stored = localStorage.getItem(QUIZ_STORAGE_KEYS.state);

    if (!stored) return {};

    const state: QuizState = JSON.parse(stored);

    return {
      currentIndex: Math.min(state.currentIndex, totalQuestions - 1),
      showAnswer: state.showAnswer,
      viewedQuestionIds: state.viewedQuestionIds,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Failed to load quiz state:", error);

    return {};
  }
}

/**
 * Save quiz state to localStorage
 */
function saveQuizState(
  currentIndex: number,
  showAnswer: boolean,
  viewedQuestionIds: number[],
): void {
  try {
    const state: QuizState = {
      currentIndex,
      showAnswer,
      viewedQuestionIds,
      questionOrder: [],
      lastUpdated: Date.now(),
    };

    localStorage.setItem(QUIZ_STORAGE_KEYS.state, JSON.stringify(state));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Failed to save quiz state:", error);
  }
}

/**
 * Load quiz settings from localStorage
 */
function loadQuizSettings(): Partial<QuizSettings> {
  try {
    const stored = localStorage.getItem(QUIZ_STORAGE_KEYS.settings);

    if (!stored) return {};

    return JSON.parse(stored);
  } catch {
    return {};
  }
}

/**
 * Save quiz settings to localStorage
 */
function saveQuizSettings(
  selectedCategory: string,
  shuffleEnabled: boolean,
): void {
  try {
    const settings: QuizSettings = { selectedCategory, shuffleEnabled };

    localStorage.setItem(QUIZ_STORAGE_KEYS.settings, JSON.stringify(settings));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Failed to save quiz settings:", error);
  }
}

/**
 * Hook for managing quiz state with localStorage persistence
 * Automatically cleans up data older than 7 days
 */
export function useQuizState(totalQuestions: number) {
  // Use lazy initialization to load from localStorage only once
  const [currentIndex, setCurrentIndex] = useState(() => {
    cleanupOldQuizData();
    const loaded = loadQuizState(totalQuestions);

    return loaded.currentIndex ?? 0;
  });

  const [showAnswer, setShowAnswer] = useState(() => {
    const loaded = loadQuizState(totalQuestions);

    return loaded.showAnswer ?? false;
  });

  const [viewedQuestionIds, setViewedQuestionIds] = useState<Set<number>>(
    () => {
      const loaded = loadQuizState(totalQuestions);

      return new Set(loaded.viewedQuestionIds ?? []);
    },
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveQuizState(currentIndex, showAnswer, Array.from(viewedQuestionIds));
  }, [currentIndex, showAnswer, viewedQuestionIds]);

  const markAsViewed = useCallback((questionId: number) => {
    setViewedQuestionIds((prev) => new Set([...Array.from(prev), questionId]));
  }, []);

  const resetState = useCallback(() => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setViewedQuestionIds(new Set());
    localStorage.removeItem(QUIZ_STORAGE_KEYS.state);
  }, []);

  return {
    currentIndex,
    markAsViewed,
    resetState,
    setCurrentIndex,
    setShowAnswer,
    showAnswer,
    viewedQuestionIds,
  };
}

/**
 * Hook for managing quiz settings with localStorage persistence
 */
export function useQuizSettings() {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const loaded = loadQuizSettings();

    return loaded.selectedCategory ?? QUIZ_DEFAULTS.SELECTED_CATEGORY;
  });

  const [shuffleEnabled, setShuffleEnabled] = useState(() => {
    const loaded = loadQuizSettings();

    return loaded.shuffleEnabled ?? QUIZ_DEFAULTS.SHUFFLE_ENABLED;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    saveQuizSettings(selectedCategory, shuffleEnabled);
  }, [selectedCategory, shuffleEnabled]);

  return {
    selectedCategory,
    setSelectedCategory,
    setShuffleEnabled,
    shuffleEnabled,
  };
}
