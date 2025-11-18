/**
 * Type definitions for internationalization (i18n)
 */

import type { getDictionary, Locale } from "@/app/[locale]/dictionaries";

/**
 * Dictionary type automatically inferred from JSON files
 * This uses TypeScript's type inference to get the exact shape of dictionary objects
 */
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

/**
 * Locale-specific parameters for pages and layouts
 */
export interface LocaleParams {
  locale: Locale;
}

/**
 * Standard page props with locale support
 */
export interface PageProps<T extends Record<string, any> = {}> {
  params: Promise<LocaleParams & T>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Layout props with locale support
 */
export interface LayoutProps<T extends Record<string, any> = {}> {
  children: React.ReactNode;
  params: Promise<LocaleParams & T>;
}
