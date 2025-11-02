/**
 * Utility functions for internationalization (i18n) and locale management
 */

/**
 * Extract locale from pathname
 * @param pathname - Current URL pathname
 * @param locales - Array of supported locale codes
 * @param defaultLocale - Fallback locale if none found in pathname
 * @returns The detected locale code
 */
export function getLocaleFromPathname(
  pathname: string,
  locales: string[],
  defaultLocale: string,
): string {
  const segments = pathname.split("/").filter(Boolean);

  return segments.length > 0 && locales.includes(segments[0])
    ? segments[0]
    : defaultLocale;
}

/**
 * Set locale cookie in browser
 * @param locale - Locale code to store
 * @param maxAge - Cookie max age in seconds (default: 1 year)
 */
export function setLocaleCookie(
  locale: string,
  maxAge: number = 31536000,
): void {
  if (typeof document === "undefined") return;

  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${maxAge}; SameSite=Strict`;
}

/**
 * Build new pathname with different locale
 * @param pathname - Current URL pathname
 * @param newLocale - Target locale code
 * @param locales - Array of supported locale codes
 * @returns New pathname with updated locale
 */
export function buildLocalePath(
  pathname: string,
  newLocale: string,
  locales: string[],
): string {
  const segments = pathname.split("/");
  const localeIndex = segments.findIndex((segment) =>
    locales.includes(segment),
  );

  if (localeIndex !== -1) {
    segments.splice(localeIndex, 1);
  }

  return `/${newLocale}${segments.join("/")}`;
}

/**
 * Remove locale prefix from pathname
 * @param pathname - Current URL pathname
 * @param locales - Array of supported locale codes
 * @returns Pathname without locale prefix
 */
export function removeLocaleFromPathname(
  pathname: string,
  locales: string[],
): string {
  const segments = pathname.split("/").filter(Boolean);
  const localeIndex = segments.findIndex((segment) =>
    locales.includes(segment),
  );

  if (localeIndex !== -1) {
    segments.splice(localeIndex, 1);
  }

  return `/${segments.join("/")}`;
}
