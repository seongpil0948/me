import { describe, it, expect } from "vitest";

import { render, screen } from "../test-utils";

import { ThemeSwitch } from "@/components/theme-switch";

describe("ThemeSwitch", () => {
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
});
