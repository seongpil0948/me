/**
 * Type definitions for internationalization (i18n)
 */

import type { Locale } from "@/app/[locale]/dictionaries";

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
