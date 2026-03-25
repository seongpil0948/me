"use client";

import type { Key } from "@heroui/react";

import { Label, ListBox, Select } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";

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

  const handleChange = (key: Key | null) => {
    if (typeof key !== "string") {
      return;
    }

    const newLocale = key;

    // Set locale cookie for persistence
    setLocaleCookie(newLocale);

    // Build new path with updated locale
    const newPath = buildLocalePath(pathname, newLocale, i18nConfig.locales);

    // Navigate to new locale
    router.push(newPath);
    router.refresh();
  };

  return (
    <Select
      aria-label="Language selector"
      className="w-32"
      value={currentLocale}
      variant="primary"
      onChange={handleChange}
    >
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {LANGUAGES.map((lang) => (
            <ListBox.Item key={lang.value} id={lang.value} textValue={lang.label}>
              {lang.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
