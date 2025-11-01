"use client";

import { useRouter, usePathname } from "next/navigation";
import { Select, SelectItem } from "@heroui/select";
import { useIsSSR } from "@react-aria/ssr";

import i18nConfig from "@/i18nConfig";

export default function LanguageSwitcher() {
  const router = useRouter();
  const currentPathname = usePathname();
  const isSSR = useIsSSR();

  // Extract locale from pathname
  const segments = currentPathname.split("/").filter(Boolean);
  const currentLocale =
    segments.length > 0 && i18nConfig.locales.includes(segments[0])
      ? segments[0]
      : i18nConfig.defaultLocale;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // Set the cookie for locale
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Strict`;

    // Redirect to the new locale path
    const path = currentPathname;

    // Remove the locale from the pathname
    const segments = path.split("/");
    const localeIndex = segments.findIndex((segment) =>
      i18nConfig.locales.includes(segment)
    );

    if (localeIndex !== -1) {
      segments.splice(localeIndex, 1);
    }

    // Build the new path
    const newPath = `/${newLocale}${segments.join("/")}`;

    router.push(newPath);
    router.refresh();
  };

  const languages = [
    { value: "ko", label: "한국어" },
    { value: "en", label: "English" },
    { value: "zh", label: "中文" },
  ];

  if (isSSR) {
    return null;
  }

  return (
    <Select
      aria-label="Language selector"
      className="w-32"
      selectedKeys={currentLocale ? [currentLocale] : []}
      size="sm"
      variant="bordered"
      onChange={handleChange}
    >
      {languages.map((lang) => (
        <SelectItem key={lang.value}>{lang.label}</SelectItem>
      ))}
    </Select>
  );
}
