/**
 * Quiz mode constants
 */

export const QUIZ_STORAGE_KEYS = {
  state: "interview-quiz-state",
  settings: "interview-quiz-settings",
  favorites: "interview-favorites",
} as const;

export const QUIZ_DEFAULTS = {
  // Data retention period in milliseconds (7 days)
  DATA_RETENTION_DAYS: 7,
  DATA_RETENTION_MS: 7 * 24 * 60 * 60 * 1000,

  // Default settings
  SELECTED_CATEGORY: "all",
  SHUFFLE_ENABLED: true,

  // UI defaults
  MIN_CARD_HEIGHT: 400,
  ANIMATION_DURATION: 0.3,
} as const;

export const QUIZ_ANIMATION = {
  // Card transition
  card: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: QUIZ_DEFAULTS.ANIMATION_DURATION, ease: "easeOut" },
  },
  // Answer reveal
  answer: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: QUIZ_DEFAULTS.ANIMATION_DURATION },
  },
} as const;

/**
 * Clean up old quiz data (older than 7 days)
 */
export function cleanupOldQuizData(): void {
  try {
    const stateKey = QUIZ_STORAGE_KEYS.state;
    const stored = localStorage.getItem(stateKey);

    if (!stored) return;

    const state = JSON.parse(stored);
    const now = Date.now();
    const retention = QUIZ_DEFAULTS.DATA_RETENTION_MS;

    if (state.lastUpdated && now - state.lastUpdated > retention) {
      localStorage.removeItem(stateKey);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Failed to cleanup old quiz data:", error);
  }
}
