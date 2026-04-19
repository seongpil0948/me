"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "dark" | "light";
export type ThemePreference = ThemeMode | "system";

export const DEFAULT_THEME: ThemeMode = "dark";
export const DEFAULT_THEME_PREFERENCE: ThemePreference = "system";
export const THEME_STORAGE_KEY = "theme-storage";
export const SYSTEM_THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export function getSystemTheme(): ThemeMode {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return DEFAULT_THEME;
  }

  return window.matchMedia(SYSTEM_THEME_MEDIA_QUERY).matches ? "dark" : "light";
}

export function resolveTheme(
  themePreference: ThemePreference,
  systemTheme: ThemeMode = DEFAULT_THEME,
): ThemeMode {
  return themePreference === "system" ? systemTheme : themePreference;
}

export function subscribeToSystemTheme(onStoreChange: () => void): () => void {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return () => {};
  }

  const mediaQueryList = window.matchMedia(SYSTEM_THEME_MEDIA_QUERY);
  const listener = () => onStoreChange();

  mediaQueryList.addEventListener("change", listener);

  return () => {
    mediaQueryList.removeEventListener("change", listener);
  };
}

interface ThemeState {
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  setTheme: (themePreference: ThemePreference) => void;
  themePreference: ThemePreference;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      setHydrated: (hydrated) => set({ hydrated }),
      setTheme: (themePreference) => set({ themePreference }),
      themePreference: DEFAULT_THEME_PREFERENCE,
      toggleTheme: () => {
        const currentTheme = resolveTheme(
          get().themePreference,
          getSystemTheme(),
        );

        set({ themePreference: currentTheme === "light" ? "dark" : "light" });
      },
    }),
    {
      migrate: (persistedState) => {
        if (
          persistedState &&
          typeof persistedState === "object" &&
          "theme" in persistedState
        ) {
          const legacyTheme = persistedState.theme;

          if (legacyTheme === "light" || legacyTheme === "dark") {
            return { themePreference: legacyTheme };
          }
        }

        return persistedState;
      },
      name: THEME_STORAGE_KEY,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) => ({ themePreference: state.themePreference }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 2,
    },
  ),
);
