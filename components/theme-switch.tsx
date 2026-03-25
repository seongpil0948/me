"use client";

import { FC, useEffect, useState } from "react";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch: server doesn't know the stored theme
  const isSelected = mounted ? theme === "light" : false;

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <button
      aria-label={`Switch to ${isSelected ? "dark" : "light"} mode`}
      className={clsx("inline-flex items-center px-px transition-opacity hover:opacity-80", className)}
      type="button"
      onClick={onChange}
    >
      <Switch isReadOnly isSelected={isSelected} />
      <span className="ml-2 text-muted">
        {isSelected ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
      </span>
    </button>
  );
};
