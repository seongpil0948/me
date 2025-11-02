"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import i18nConfig from "@/i18nConfig";
import { getLocaleFromPathname } from "@/lib/i18n/locale-utils";

/**
 * Custom hook to get current locale from URL pathname
 * @returns Current locale code
 */
export function useLocale(): string {
  const pathname = usePathname();

  const locale = useMemo(
    () =>
      getLocaleFromPathname(
        pathname,
        i18nConfig.locales,
        i18nConfig.defaultLocale,
      ),
    [pathname],
  );

  return locale;
}
