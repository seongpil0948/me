"use client";

import type { ReactNode } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  children: string;
  className?: string;
}

export function MarkdownRenderer({
  children,
  className,
}: MarkdownRendererProps) {
  return (
    <div
      className={className}
      style={{
        fontSize: "15px",
        lineHeight: "1.8",
        color: "#34495e",
      }}
    >
      <ReactMarkdown
        components={{
          // Customize strong (bold) text
          strong: ({ children }: { children?: ReactNode }) => (
            <strong style={{ fontWeight: "700", color: "#1a202c" }}>
              {children}
            </strong>
          ),
          // Customize inline code and code blocks
          code: ({
            children,
            className,
          }: {
            children?: ReactNode;
            className?: string;
          }) => {
            // Check if it's a code block (has language class)
            const isCodeBlock = className?.startsWith("language-");

            if (isCodeBlock) {
              return (
                <pre
                  style={{
                    backgroundColor: "#1e293b",
                    color: "#e2e8f0",
                    padding: "16px",
                    borderRadius: "8px",
                    overflow: "auto",
                    marginBottom: "12px",
                  }}
                >
                  <code style={{ fontSize: "0.9em" }}>{children}</code>
                </pre>
              );
            }

            return (
              <code
                style={{
                  backgroundColor: "#f4f4f5",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "0.9em",
                  fontFamily: "monospace",
                }}
              >
                {children}
              </code>
            );
          },
          // Customize unordered lists
          ul: ({ children }: { children?: ReactNode }) => (
            <ul
              style={{
                marginLeft: "20px",
                marginBottom: "12px",
                marginTop: "8px",
              }}
            >
              {children}
            </ul>
          ),
          // Customize ordered lists
          ol: ({ children }: { children?: ReactNode }) => (
            <ol
              style={{
                marginLeft: "20px",
                marginBottom: "12px",
                marginTop: "8px",
              }}
            >
              {children}
            </ol>
          ),
          // Customize list items
          li: ({ children }: { children?: ReactNode }) => (
            <li style={{ marginBottom: "4px" }}>{children}</li>
          ),
          // Customize paragraphs
          p: ({ children }: { children?: ReactNode }) => (
            <p style={{ marginBottom: "12px", lineHeight: "1.8" }}>
              {children}
            </p>
          ),
          // Customize headings
          h1: ({ children }: { children?: ReactNode }) => (
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "700",
                marginTop: "16px",
                marginBottom: "12px",
                color: "#1a202c",
              }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }: { children?: ReactNode }) => (
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginTop: "16px",
                marginBottom: "10px",
                color: "#1a202c",
              }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }: { children?: ReactNode }) => (
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "700",
                marginTop: "14px",
                marginBottom: "8px",
                color: "#1a202c",
              }}
            >
              {children}
            </h3>
          ),
          // Customize blockquotes
          blockquote: ({ children }: { children?: ReactNode }) => (
            <blockquote
              style={{
                borderLeft: "4px solid #e2e8f0",
                paddingLeft: "16px",
                marginLeft: "0",
                marginBottom: "12px",
                color: "#718096",
                fontStyle: "italic",
              }}
            >
              {children}
            </blockquote>
          ),
          // Customize links
          a: ({ children, href }: { children?: ReactNode; href?: string }) => (
            <a
              href={href}
              rel="noopener noreferrer"
              style={{
                color: "#3182ce",
                textDecoration: "underline",
              }}
              target="_blank"
            >
              {children}
            </a>
          ),
        }}
        remarkPlugins={[remarkGfm]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
