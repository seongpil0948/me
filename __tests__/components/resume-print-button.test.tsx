import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test-utils";
import { userEvent } from "@testing-library/user-event";
import ResumePrintButton from "@/components/resume-print-button";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("ResumePrintButton", () => {
  it("should render with Korean label", () => {
    render(<ResumePrintButton label="이력서 PDF 다운로드" locale="ko" />);

    const button = screen.getByRole("button", { name: "이력서 PDF 다운로드" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("이력서 PDF 다운로드");
  });

  it("should render with English label", () => {
    render(<ResumePrintButton label="Download Resume PDF" locale="en" />);

    const button = screen.getByRole("button", { name: "Download Resume PDF" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Download Resume PDF");
  });

  it("should navigate to correct locale resume page on click", async () => {
    render(<ResumePrintButton label="Download" locale="ko" />);

    const button = screen.getByRole("button", { name: "Download" });
    await userEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/ko/resume");
  });

  it("should navigate to English resume page on click", async () => {
    mockPush.mockClear();
    render(<ResumePrintButton label="Download" locale="en" />);

    const button = screen.getByRole("button", { name: "Download" });
    await userEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/en/resume");
  });
});
