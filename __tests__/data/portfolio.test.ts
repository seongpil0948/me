import { describe, it, expect } from "vitest";
import {
  skills,
  certifications,
  experiences,
  portfolioLinks,
} from "@/data/portfolio";

describe("portfolio data", () => {
  describe("skills", () => {
    it("should have valid skill entries", () => {
      expect(skills.length).toBeGreaterThan(0);

      skills.forEach((skill) => {
        expect(skill).toHaveProperty("name");
        expect(skill).toHaveProperty("level");
        expect(typeof skill.name).toBe("string");
        expect(typeof skill.level).toBe("number");
        expect(skill.level).toBeGreaterThanOrEqual(0);
        expect(skill.level).toBeLessThanOrEqual(100);
      });
    });

    it("should contain key skills", () => {
      const skillNames = skills.map((s) => s.name.toLowerCase());

      expect(skillNames.some((name) => name.includes("kubernetes"))).toBe(true);
      expect(skillNames.some((name) => name.includes("aws"))).toBe(true);
      expect(skillNames.some((name) => name.includes("react"))).toBe(true);
    });
  });

  describe("certifications", () => {
    it("should have valid certification entries", () => {
      expect(certifications.length).toBeGreaterThan(0);

      certifications.forEach((cert) => {
        expect(cert).toHaveProperty("name");
        expect(cert).toHaveProperty("org");
        expect(cert).toHaveProperty("date");
        expect(typeof cert.name).toBe("string");
        expect(typeof cert.org).toBe("string");
        expect(typeof cert.date).toBe("string");
      });
    });

    it("should contain AWS certifications", () => {
      const awsCerts = certifications.filter((cert) =>
        cert.name.includes("AWS"),
      );

      expect(awsCerts.length).toBeGreaterThan(0);
    });

    it("should contain Linux Foundation certifications", () => {
      const lfCerts = certifications.filter(
        (cert) => cert.org === "The Linux Foundation",
      );

      expect(lfCerts.length).toBeGreaterThan(0);
    });
  });

  describe("experiences", () => {
    it("should have valid experience entries", () => {
      expect(experiences.length).toBeGreaterThan(0);

      experiences.forEach((exp) => {
        expect(exp).toHaveProperty("company");
        expect(exp).toHaveProperty("position");
        expect(exp).toHaveProperty("period");
        expect(exp).toHaveProperty("description");
        expect(exp).toHaveProperty("achievements");
        expect(exp).toHaveProperty("technologies");
        expect(Array.isArray(exp.achievements.ko)).toBe(true);
        expect(exp.achievements.ko.length).toBeGreaterThan(0);
        expect(Array.isArray(exp.achievements.en)).toBe(true);
        expect(exp.achievements.en.length).toBeGreaterThan(0);
        expect(Array.isArray(exp.achievements.zh)).toBe(true);
        expect(exp.achievements.zh.length).toBeGreaterThan(0);
        expect(Array.isArray(exp.technologies)).toBe(true);
        expect(exp.technologies.length).toBeGreaterThan(0);
      });
    });

    it("should be ordered by most recent first", () => {
      expect(experiences[0].company).toContain("대웅");
    });
  });

  describe("portfolioLinks", () => {
    it("should have valid portfolio link entries", () => {
      expect(portfolioLinks.length).toBeGreaterThan(0);

      portfolioLinks.forEach((link) => {
        expect(link).toHaveProperty("name");
        expect(link).toHaveProperty("url");
        expect(typeof link.name).toBe("string");
        expect(typeof link.url).toBe("string");
        expect(link.url).toMatch(/^https?:\/\//);
      });
    });

    it("should contain GitHub link", () => {
      const githubLink = portfolioLinks.find((link) =>
        link.name.toLowerCase().includes("github"),
      );

      expect(githubLink).toBeDefined();
      expect(githubLink?.url).toContain("github.com");
    });
  });
});
