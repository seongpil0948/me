import { beforeEach, describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";

import { render, screen } from "../test-utils";

import { ThemeSwitch } from "@/components/theme-switch";
import { DEFAULT_THEME_PREFERENCE, useThemeStore } from "@/lib/theme-store";

describe("ThemeSwitch", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.style.colorScheme = "";
    useThemeStore.setState({
      hydrated: true,
      themePreference: DEFAULT_THEME_PREFERENCE,
    });
  });

  it("should render theme switch", () => {
    render(<ThemeSwitch />);

    // Check if the switch is rendered
    const themeSwitch = screen.getByRole("switch");

    expect(themeSwitch).toBeInTheDocument();
  });

  it("should render with proper structure", () => {
    const { container } = render(<ThemeSwitch />);

    const themeSwitch = screen.getByRole("switch");

    expect(themeSwitch).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should toggle theme using zustand store", async () => {
    render(<ThemeSwitch />);

    await userEvent.click(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    );

    expect(useThemeStore.getState().themePreference).toBe("dark");
  });

  it("should follow system theme when preference is system", () => {
    useThemeStore.setState({ hydrated: true, themePreference: "system" });

    render(<ThemeSwitch />);

    expect(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    ).toBeInTheDocument();
  });
});
