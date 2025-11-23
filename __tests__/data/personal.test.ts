import { describe, it, expect } from "vitest";

import { personalInfo, summaryStats } from "@/data/personal";

describe("personal data", () => {
  describe("personalInfo", () => {
    it("should have name in multiple languages", () => {
      expect(personalInfo.name).toHaveProperty("ko");
      expect(personalInfo.name).toHaveProperty("en");
      expect(typeof personalInfo.name.ko).toBe("string");
      expect(typeof personalInfo.name.en).toBe("string");
      expect(personalInfo.name.ko.length).toBeGreaterThan(0);
      expect(personalInfo.name.en.length).toBeGreaterThan(0);
    });

    it("should have valid contact information", () => {
      expect(personalInfo.contact).toHaveProperty("email");
      expect(personalInfo.contact).toHaveProperty("phone");
      expect(personalInfo.contact).toHaveProperty("github");
      expect(personalInfo.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(personalInfo.contact.github).toMatch(/^https?:\/\//);
    });

    it("should have location in multiple languages", () => {
      expect(personalInfo.location).toHaveProperty("ko");
      expect(personalInfo.location).toHaveProperty("en");
      expect(personalInfo.location).toHaveProperty("zh");
      expect(typeof personalInfo.location.ko).toBe("string");
      expect(typeof personalInfo.location.en).toBe("string");
      expect(typeof personalInfo.location.zh).toBe("string");
    });

    it("should have education information", () => {
      expect(personalInfo.education).toHaveProperty("school");
      expect(personalInfo.education).toHaveProperty("degree");
      expect(personalInfo.education).toHaveProperty("major");
      expect(personalInfo.education).toHaveProperty("period");
      expect(personalInfo.education.school).toHaveProperty("ko");
      expect(personalInfo.education.school).toHaveProperty("en");
      expect(personalInfo.education.school).toHaveProperty("zh");
    });
  });

  describe("summaryStats", () => {
    it("should have numeric performance metrics", () => {
      expect(typeof summaryStats.errorDetectionReduction).toBe("number");
      expect(typeof summaryStats.costSavings).toBe("number");
      expect(typeof summaryStats.projectRevenue).toBe("number");
      expect(summaryStats.errorDetectionReduction).toBeGreaterThan(0);
      expect(summaryStats.costSavings).toBeGreaterThan(0);
    });

    it("should have string metrics", () => {
      expect(typeof summaryStats.logRetentionExpansion).toBe("string");
      expect(typeof summaryStats.dailyMessages).toBe("string");
      expect(summaryStats.logRetentionExpansion.length).toBeGreaterThan(0);
      expect(summaryStats.dailyMessages.length).toBeGreaterThan(0);
    });
  });
});
