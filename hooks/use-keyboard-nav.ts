import { useEffect } from "react";

interface KeyboardNavOptions {
  onNext?: () => void;
  onPrevious?: () => void;
  onToggle?: () => void;
  enabled?: boolean;
}

/**
 * Hook for keyboard navigation in quiz mode
 * - ArrowRight/ArrowLeft: Navigate questions
 * - Space: Toggle answer visibility
 */
export function useKeyboardNav({
  onNext,
  onPrevious,
  onToggle,
  enabled = true,
}: KeyboardNavOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          onNext?.();

          break;
        case "ArrowLeft":
          e.preventDefault();
          onPrevious?.();

          break;
        case " ":
          e.preventDefault();
          onToggle?.();

          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onNext, onPrevious, onToggle]);
}
