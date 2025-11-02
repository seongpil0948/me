import { describe, it, expect } from "vitest";
import {
  cssColors,
  spacing,
  borderRadius,
  fontSize,
  commonStyles,
} from "@/constants/styles";

describe("styles constants", () => {
  describe("cssColors", () => {
    it("should have all color variables", () => {
      expect(cssColors).toHaveProperty("primary");
      expect(cssColors).toHaveProperty("textPrimary");
      expect(cssColors).toHaveProperty("background");
      expect(cssColors.primary).toContain("var(--color-");
      expect(cssColors.textPrimary).toContain("var(--color-");
    });

    it("should reference CSS variables", () => {
      Object.values(cssColors).forEach((value) => {
        expect(value).toMatch(/^var\(--color-[\w-]+\)$/);
      });
    });
  });

  describe("spacing", () => {
    it("should have spacing values", () => {
      expect(spacing).toHaveProperty("xs");
      expect(spacing).toHaveProperty("sm");
      expect(spacing).toHaveProperty("md");
      expect(spacing).toHaveProperty("lg");
      expect(spacing).toHaveProperty("xl");
    });

    it("should have valid pixel values", () => {
      Object.values(spacing).forEach((value) => {
        expect(value).toMatch(/^\d+px$/);
      });
    });
  });

  describe("borderRadius", () => {
    it("should have border radius values", () => {
      expect(borderRadius).toHaveProperty("sm");
      expect(borderRadius).toHaveProperty("md");
      expect(borderRadius).toHaveProperty("lg");
      expect(borderRadius).toHaveProperty("full");
    });

    it("should have valid values", () => {
      expect(borderRadius.full).toBe("9999px");
      expect(borderRadius.sm).toMatch(/^\d+px$/);
    });
  });

  describe("fontSize", () => {
    it("should have font size values", () => {
      expect(fontSize).toHaveProperty("xs");
      expect(fontSize).toHaveProperty("sm");
      expect(fontSize).toHaveProperty("base");
      expect(fontSize).toHaveProperty("lg");
    });

    it("should have valid pixel values", () => {
      Object.values(fontSize).forEach((value) => {
        expect(value).toMatch(/^\d+px$/);
      });
    });
  });

  describe("commonStyles", () => {
    it("should have button styles", () => {
      expect(commonStyles.button).toHaveProperty("primary");
      expect(commonStyles.button).toHaveProperty("secondary");
      expect(commonStyles.button.primary).toHaveProperty("backgroundColor");
      expect(commonStyles.button.primary).toHaveProperty("color");
    });

    it("should have card styles", () => {
      expect(commonStyles.card).toHaveProperty("backgroundColor");
      expect(commonStyles.card).toHaveProperty("borderRadius");
      expect(commonStyles.card).toHaveProperty("padding");
    });

    it("should have heading styles", () => {
      expect(commonStyles.heading).toHaveProperty("color");
      expect(commonStyles.heading).toHaveProperty("fontWeight");
    });

    it("should have text styles", () => {
      expect(commonStyles.text).toHaveProperty("primary");
      expect(commonStyles.text).toHaveProperty("secondary");
      expect(commonStyles.text).toHaveProperty("tertiary");
    });
  });
});
