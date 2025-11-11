"use client";

import { useRouter, usePathname } from "next/navigation";
import { Select, SelectItem } from "@heroui/select";
import { useIsSSR } from "@react-aria/ssr";

import i18nConfig from "@/i18nConfig";
import { LANGUAGES } from "@/constants/languages";
import { useLocale } from "@/hooks/use-locale";
import { setLocaleCookie, buildLocalePath } from "@/lib/i18n/locale-utils";

/**
 * Language switcher component
 * Allows users to change the application locale
 */
export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const isSSR = useIsSSR();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // Set locale cookie for persistence
    setLocaleCookie(newLocale);

    // Build new path with updated locale
    const newPath = buildLocalePath(pathname, newLocale, i18nConfig.locales);

    // Navigate to new locale
    router.push(newPath);
    router.refresh();
  };

  // Don't render during SSR to avoid hydration mismatch
  if (isSSR) {
    return null;
  }

  return (
    <Select
      aria-label="Language selector"
      className="w-32"
      color="primary"
      selectedKeys={currentLocale ? [currentLocale] : []}
      size="sm"
      variant="bordered"
      onChange={handleChange}
    >
      {LANGUAGES.map((lang) => (
        <SelectItem key={lang.value}>{lang.label}</SelectItem>
      ))}
    </Select>
  );
}
