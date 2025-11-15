/**
 * Quiz mode types and interfaces
 */

export interface QuizState {
  currentIndex: number;
  showAnswer: boolean;
  viewedQuestionIds: number[]; // Store as array for JSON serialization
  questionOrder: number[];
  lastUpdated: number; // timestamp for 7-day cleanup
}

export interface QuizSettings {
  selectedCategory: string;
  shuffleEnabled: boolean;
}

export interface QuizProgress {
  totalQuestions: number;
  viewedCount: number;
  currentProgress: number; // percentage
}
