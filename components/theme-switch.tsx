"use client";

import { FC, useSyncExternalStore } from "react";
import { Switch } from "@heroui/react";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import {
  DEFAULT_THEME,
  resolveTheme,
  subscribeToSystemTheme,
  useThemeStore,
  getSystemTheme,
} from "@/lib/theme-store";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const hydrated = useThemeStore((state) => state.hydrated);
  const themePreference = useThemeStore((state) => state.themePreference);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    () => DEFAULT_THEME,
  );

  const isSelected =
    resolveTheme(hydrated ? themePreference : DEFAULT_THEME, systemTheme) ===
    "light";

  return (
    <button
      aria-label={`Switch to ${isSelected ? "dark" : "light"} mode`}
      className={clsx("inline-flex items-center px-px transition-opacity hover:opacity-80", className)}
      type="button"
      onClick={toggleTheme}
    >
      <Switch isReadOnly isSelected={isSelected} />
      <span className="ml-2 text-muted">
        {isSelected ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
      </span>
    </button>
  );
};
