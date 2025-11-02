/**
 * Supported languages configuration for the application
 */

export const LANGUAGES = [
  { value: "ko", label: "한국어", nativeName: "Korean", flag: "🇰🇷" },
  { value: "en", label: "English", nativeName: "English", flag: "🇺🇸" },
  { value: "zh", label: "中文", nativeName: "Chinese", flag: "🇨🇳" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["value"];
export type Language = (typeof LANGUAGES)[number];
