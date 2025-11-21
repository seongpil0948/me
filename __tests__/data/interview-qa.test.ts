import { describe, expect, it } from "vitest";

import { interviewQuestions } from "@/data/interview";

describe("interview data", () => {
  describe("general interview questions", () => {
    it("should have questions", () => {
      expect(interviewQuestions.length).toBeGreaterThan(0);
    });

    it("should have valid question structure", () => {
      interviewQuestions.forEach((q) => {
        expect(q).toHaveProperty("id");
        expect(q).toHaveProperty("category1");
        expect(q).toHaveProperty("category2");
        expect(q).toHaveProperty("question");
        expect(q).toHaveProperty("answer");
        expect(typeof q.id).toBe("number");
        expect(typeof q.category1).toBe("string");
        expect(typeof q.category2).toBe("string");
        expect(typeof q.question).toBe("string");
        expect(typeof q.answer).toBe("string");
      });
    });

    it("should have valid category1 values", () => {
      const validCategories = [
        "General",
        "Infrastructure",
        "Frontend",
        "Backend",
      ];

      interviewQuestions.forEach((q) => {
        expect(validCategories).toContain(q.category1);
      });
    });

    it("should have unique IDs", () => {
      const ids = interviewQuestions.map((q) => q.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have questions and answers with content", () => {
      interviewQuestions.forEach((q) => {
        expect(q.question.length).toBeGreaterThan(0);
        expect(q.answer.length).toBeGreaterThan(0);
      });
    });

    it("should have multiple categories", () => {
      const categories = new Set(interviewQuestions.map((q) => q.category1));

      expect(categories.size).toBeGreaterThan(1);
    });

    it("should have questions in all major categories", () => {
      const categories = interviewQuestions.map((q) => q.category1);

      expect(categories).toContain("General");
      expect(categories).toContain("Infrastructure");
    });
  });

  describe("all questions combined", () => {
    it("should have sufficient total questions", () => {
      expect(interviewQuestions.length).toBeGreaterThan(50);
    });
  });
});
