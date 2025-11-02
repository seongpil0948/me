import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  buildLocalePath,
  getLocaleFromPathname,
  removeLocaleFromPathname,
  setLocaleCookie,
} from "@/lib/i18n/locale-utils";

describe("locale-utils", () => {
  describe("getLocaleFromPathname", () => {
    it("should extract locale from path", () => {
      expect(getLocaleFromPathname("/ko/about", ["ko", "en", "zh"], "ko")).toBe(
        "ko"
      );
      expect(
        getLocaleFromPathname("/en/contact", ["ko", "en", "zh"], "ko")
      ).toBe("en");
      expect(
        getLocaleFromPathname("/zh/profile", ["ko", "en", "zh"], "ko")
      ).toBe("zh");
    });

    it("should return default locale for invalid locale", () => {
      expect(
        getLocaleFromPathname("/invalid/path", ["ko", "en", "zh"], "ko")
      ).toBe("ko");
    });

    it("should return default locale for root path", () => {
      expect(getLocaleFromPathname("/", ["ko", "en", "zh"], "ko")).toBe("ko");
    });

    it("should return default locale for empty segments", () => {
      expect(getLocaleFromPathname("", ["ko", "en", "zh"], "en")).toBe("en");
    });
  });

  describe("buildLocalePath", () => {
    it("should build path with new locale", () => {
      expect(buildLocalePath("/ko/about", "en", ["ko", "en", "zh"])).toBe(
        "/en/about"
      );
      expect(buildLocalePath("/en/contact", "zh", ["ko", "en", "zh"])).toBe(
        "/zh/contact"
      );
    });

    it("should handle root path", () => {
      expect(buildLocalePath("/", "ko", ["ko", "en", "zh"])).toBe("/ko/");
      expect(buildLocalePath("", "en", ["ko", "en", "zh"])).toBe("/en");
    });

    it("should handle path without locale", () => {
      expect(buildLocalePath("/about", "ko", ["ko", "en", "zh"])).toBe(
        "/ko/about"
      );
      expect(buildLocalePath("/contact/form", "en", ["ko", "en", "zh"])).toBe(
        "/en/contact/form"
      );
    });

    it("should replace existing locale", () => {
      expect(buildLocalePath("/ko/about/team", "zh", ["ko", "en", "zh"])).toBe(
        "/zh/about/team"
      );
    });
  });

  describe("removeLocaleFromPathname", () => {
    it("should remove locale from pathname", () => {
      expect(removeLocaleFromPathname("/ko/about", ["ko", "en", "zh"])).toBe(
        "/about"
      );
      expect(removeLocaleFromPathname("/en/contact", ["ko", "en", "zh"])).toBe(
        "/contact"
      );
    });

    it("should handle path without locale", () => {
      expect(removeLocaleFromPathname("/about", ["ko", "en", "zh"])).toBe(
        "/about"
      );
      expect(removeLocaleFromPathname("/", ["ko", "en", "zh"])).toBe("/");
    });

    it("should handle nested paths", () => {
      expect(
        removeLocaleFromPathname("/ko/about/team", ["ko", "en", "zh"])
      ).toBe("/about/team");
    });
  });

  describe("setLocaleCookie", () => {
    let documentCookieSpy: any;

    beforeEach(() => {
      documentCookieSpy = vi.spyOn(document, "cookie", "set");
    });

    afterEach(() => {
      documentCookieSpy.mockRestore();
    });

    it("should set locale cookie with default maxAge", () => {
      setLocaleCookie("ko");

      expect(document.cookie).toContain("NEXT_LOCALE=ko");
    });

    it("should set locale cookie with custom maxAge", () => {
      setLocaleCookie("en", 86400);

      expect(document.cookie).toContain("NEXT_LOCALE=en");
    });
  });
});
