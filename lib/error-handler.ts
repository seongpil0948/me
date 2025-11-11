/**
 * Custom error classes and error handling utilities
 */

/**
 * Base application error class
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for validation failures
 */
export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, "VALIDATION_ERROR", 400, context);
    this.name = "ValidationError";
  }
}

/**
 * Error for not found resources
 */
export class NotFoundError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, "NOT_FOUND", 404, context);
    this.name = "NotFoundError";
  }
}

/**
 * Log error with context
 */
export function logError(error: Error, context?: Record<string, any>): void {
  if (process.env.NODE_ENV === "development") {
    /* eslint-disable no-console */
    console.error("❌ Error:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      context,
    });
    /* eslint-enable no-console */
  } else {
    // In production, send to error tracking service (Sentry, etc.)
    /* eslint-disable no-console */
    console.error(error.message);
    /* eslint-enable no-console */
  }
}

/**
 * Safe error handler that prevents app crashes
 */
export function handleError(
  error: unknown,
  fallbackMessage: string = "An unexpected error occurred"
): string {
  if (error instanceof AppError) {
    logError(error, error.context);

    return error.message;
  }

  if (error instanceof Error) {
    logError(error);

    return error.message;
  }

  /* eslint-disable no-console */
  console.error("Unknown error:", error);
  /* eslint-enable no-console */

  return fallbackMessage;
}

/**
 * Async error boundary wrapper
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  errorHandler?: (error: Error) => void
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Error) {
      logError(error);
      errorHandler?.(error);
    }

    return null;
  }
}
