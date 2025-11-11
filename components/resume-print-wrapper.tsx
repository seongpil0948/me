"use client";

import type { Dictionary } from "@/types/portfolio";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface ResumePrintWrapperProps {
  children: React.ReactNode;
  dict: Dictionary;
}

export function ResumePrintWrapper({
  children,
  dict,
}: ResumePrintWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Resume_${dict.profile.name}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        html, body {
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
          overflow: visible;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  });

  return (
    <>
      <div
        className="no-print"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={handlePrint}
        >
          <svg
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect height="8" width="12" x="6" y="14" />
          </svg>
          {dict.buttons.downloadResume}
        </button>
      </div>
      <div ref={contentRef}>{children}</div>
    </>
  );
}
