import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import {
  DiscordIcon,
  GithubIcon,
  MoonFilledIcon,
  SunFilledIcon,
  TwitterIcon,
} from "@/components/icons";

describe("Icons", () => {
  describe("GithubIcon", () => {
    it("should render with default size", () => {
      const { container } = render(<GithubIcon />);
      const svg = container.querySelector("svg");

      expect(svg).toBeInTheDocument();
    });

    it("should render with custom size", () => {
      const { container } = render(<GithubIcon size={32} />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "32");
      expect(svg).toHaveAttribute("height", "32");
    });

    it("should prioritize size over width/height when size is provided", () => {
      const { container } = render(
        <GithubIcon height={48} size={32} width={48} />,
      );
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "32");
      expect(svg).toHaveAttribute("height", "32");
    });

    it("should use default size when no props provided", () => {
      const { container } = render(<GithubIcon />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("MoonFilledIcon", () => {
    it("should render moon icon", () => {
      const { container } = render(<MoonFilledIcon />);
      const svg = container.querySelector("svg");

      expect(svg).toBeInTheDocument();
    });

    it("should accept custom size", () => {
      const { container } = render(<MoonFilledIcon size={24} />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });

    it("should use default size when no size prop", () => {
      const { container } = render(<MoonFilledIcon />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });

  describe("SunFilledIcon", () => {
    it("should render sun icon", () => {
      const { container } = render(<SunFilledIcon />);
      const svg = container.querySelector("svg");

      expect(svg).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<SunFilledIcon className="custom-class" />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveClass("custom-class");
    });

    it("should accept custom size", () => {
      const { container } = render(<SunFilledIcon size={28} />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "28");
      expect(svg).toHaveAttribute("height", "28");
    });
  });

  describe("DiscordIcon", () => {
    it("should render discord icon", () => {
      const { container } = render(<DiscordIcon />);
      const svg = container.querySelector("svg");

      expect(svg).toBeInTheDocument();
    });

    it("should render with custom size", () => {
      const { container } = render(<DiscordIcon size={36} />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "36");
      expect(svg).toHaveAttribute("height", "36");
    });
  });

  describe("TwitterIcon", () => {
    it("should render twitter icon", () => {
      const { container } = render(<TwitterIcon />);
      const svg = container.querySelector("svg");

      expect(svg).toBeInTheDocument();
    });

    it("should render with custom size", () => {
      const { container } = render(<TwitterIcon size={30} />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "30");
      expect(svg).toHaveAttribute("height", "30");
    });
  });
});
