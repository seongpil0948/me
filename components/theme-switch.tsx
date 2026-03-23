"use client";

import { FC, useEffect, useState } from "react";
import { Switch } from "@heroui/react";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

type Theme = "light" | "dark";

const THEME_KEY = "theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (() => {
      try {
        return localStorage.getItem(THEME_KEY);
      } catch {
        return null;
      }
    })();
    const current =
      stored === "light" || stored === "dark"
        ? stored
        : document.documentElement.classList.contains("light")
          ? "light"
          : "dark";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current);
     
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";

    setTheme(next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <div
        className={clsx(
          "inline-flex items-center px-px w-[58px] h-6",
          className,
        )}
      />
    );
  }

  const isLight = theme === "light";

  return (
    <button
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className={clsx(
        "inline-flex items-center px-px transition-opacity hover:opacity-80",
        className,
      )}
      type="button"
      onClick={toggle}
    >
      <Switch isReadOnly isSelected={isLight} />
      <span className="ml-2 text-muted">
        {isLight ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
      </span>
    </button>
  );
};
