import { describe, expect, it } from "vitest";

import { interviewQuestions } from "@/data/interview";
import { localize, localizeQuestions } from "@/lib/i18n/locale-utils";

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
        expect(typeof q.question.ko).toBe("string");
        expect(typeof q.answer.ko).toBe("string");
      });
    });

    it("should have valid category1 values", () => {
      const validCategories = [
        "General",
        "Infrastructure",
        "Infrastructure/Operations",
        "Observability",
        "Data Pipeline",
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
        expect(q.question.ko.length).toBeGreaterThan(0);
        expect(q.answer.ko.length).toBeGreaterThan(0);
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

  describe("localize helper", () => {
    it("returns ko value when locale is ko", () => {
      const val = { ko: "한국어" };
      expect(localize(val, "ko")).toBe("한국어");
    });

    it("falls back to ko when en is missing", () => {
      const val = { ko: "한국어" };
      expect(localize(val, "en")).toBe("한국어");
    });

    it("returns en value when present", () => {
      const val = { ko: "한국어", en: "English" };
      expect(localize(val, "en")).toBe("English");
    });

    it("localizeQuestions returns InterviewQuestion[] with string fields", () => {
      const localized = localizeQuestions(interviewQuestions, "ko");

      localized.forEach((q) => {
        expect(typeof q.question).toBe("string");
        expect(typeof q.answer).toBe("string");
      });
    });

    it("localizeQuestions ko matches source ko values", () => {
      const localized = localizeQuestions(interviewQuestions, "ko");

      interviewQuestions.forEach((src, i) => {
        expect(localized[i].question).toBe(src.question.ko);
        expect(localized[i].answer).toBe(src.answer.ko);
      });
    });
  });
});
