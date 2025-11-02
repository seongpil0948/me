import { describe, it, expect } from "vitest";
import {
  AppError,
  ValidationError,
  NotFoundError,
  handleError,
} from "@/lib/error-handler";

describe("error-handler", () => {
  describe("AppError", () => {
    it("should create AppError with message", () => {
      const error = new AppError("Test error");

      expect(error.message).toBe("Test error");
      expect(error.name).toBe("AppError");
    });

    it("should create AppError with code and statusCode", () => {
      const error = new AppError("Test error", "TEST_CODE", 400);

      expect(error.code).toBe("TEST_CODE");
      expect(error.statusCode).toBe(400);
    });

    it("should create AppError with context", () => {
      const context = { userId: "123", action: "login" };
      const error = new AppError("Test error", "TEST_CODE", 400, context);

      expect(error.context).toEqual(context);
    });
  });

  describe("ValidationError", () => {
    it("should create ValidationError", () => {
      const error = new ValidationError("Invalid input");

      expect(error.message).toBe("Invalid input");
      expect(error.name).toBe("ValidationError");
      expect(error.code).toBe("VALIDATION_ERROR");
      expect(error.statusCode).toBe(400);
    });
  });

  describe("NotFoundError", () => {
    it("should create NotFoundError", () => {
      const error = new NotFoundError("Resource not found");

      expect(error.message).toBe("Resource not found");
      expect(error.name).toBe("NotFoundError");
      expect(error.code).toBe("NOT_FOUND");
      expect(error.statusCode).toBe(404);
    });
  });

  describe("handleError", () => {
    it("should handle AppError", () => {
      const error = new AppError("Custom error");
      const result = handleError(error);

      expect(result).toBe("Custom error");
    });

    it("should handle standard Error", () => {
      const error = new Error("Standard error");
      const result = handleError(error);

      expect(result).toBe("Standard error");
    });

    it("should handle unknown error with fallback message", () => {
      const result = handleError("Unknown error");

      expect(result).toBe("An unexpected error occurred");
    });

    it("should use custom fallback message", () => {
      const result = handleError("Unknown error", "Custom fallback");

      expect(result).toBe("Custom fallback");
    });
  });
});
