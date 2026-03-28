"use client";

import { useEffect, useInsertionEffect, useSyncExternalStore } from "react";

import {
  DEFAULT_THEME,
  getSystemTheme,
  resolveTheme,
  subscribeToSystemTheme,
  useThemeStore,
} from "@/lib/theme-store";

export interface ProvidersProps {
  children: React.ReactNode;
}

function HtmlThemeSync() {
  const hydrated = useThemeStore((state) => state.hydrated);
  const themePreference = useThemeStore((state) => state.themePreference);
  useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, () => DEFAULT_THEME);

  useEffect(() => {
    if (!hydrated) {
      void useThemeStore.persist.rehydrate();
    }
  }, [hydrated]);

  useInsertionEffect(() => {
    const resolvedTheme = resolveTheme(
      hydrated ? themePreference : "system",
      getSystemTheme(),
    );
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    root.setAttribute("data-theme", resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  }, [hydrated, themePreference]);

  return null;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <HtmlThemeSync />
      {children}
    </>
  );
}
