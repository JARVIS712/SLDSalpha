"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading, SpecTable, specTheme } from "./shared";

function errorSummaryTheme(darkMode: boolean) {
  return {
    ...specTheme(darkMode),
    border: darkMode ? "var(--color-feedback-error)" : "#D32F2F",
    title:  darkMode ? "var(--color-text-primary)" : "#111111",
    link:   darkMode ? "var(--color-feedback-error)" : "#D32F2F",
  };
}

function ErrorSummaryPreview({ darkMode = false }: { darkMode?: boolean }) {
  const theme = errorSummaryTheme(darkMode);

  return (
    <div
      className="flex w-[361px] flex-col items-center justify-center gap-2 overflow-hidden rounded-[12px] border-[1.5px] px-4 py-3"
      style={{ backgroundColor: theme.surface, borderColor: theme.border }}
      role="alert"
      aria-labelledby="error-summary-title"
    >
      <h3
        id="error-summary-title"
        className="w-full text-[18px] font-medium leading-7 tracking-[0px]"
        style={{ color: theme.title }}
      >
        There is a problem
      </h3>
      <div className="flex w-full flex-col items-start gap-1">
        {["Enter your NIC Number correctly", "Enter you Birth date correctly"].map((message) => (
          <a
            key={message}
            href="#"
            className="flex h-6 w-full items-center text-[15px] leading-5 tracking-[0px] underline underline-offset-2"
            style={{ color: theme.link }}
          >
            {message}
          </a>
        ))}
      </div>
    </div>
  );
}

const ERROR_SUMMARY_CODE = `export function ErrorSummary({ errors }: ErrorSummaryProps) {
  return (
    <div role="alert" className="w-[361px] rounded-[12px] border-[1.5px] border-[#D32F2F] bg-white px-4 py-3">
      <h2 className="text-[18px] font-medium leading-7">There is a problem</h2>
      <ul className="mt-2 space-y-1">
        {errors.map((error) => (
          <li key={error.href}>
            <a className="text-[15px] leading-5 text-[#D32F2F] underline" href={error.href}>
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

export function ErrorSummarySpec() {
  const [isDark, setIsDark] = useState(false);
  const theme = errorSummaryTheme(isDark);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SectionHeading>Live preview</SectionHeading>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </div>
        <Card className={`${isDark ? "dark bg-[var(--color-surface-page)]" : ""} overflow-x-auto p-4`}>
          <div className="flex w-[393px] rounded-[5px] p-4" style={{ backgroundColor: theme.frame }}>
            <ErrorSummaryPreview darkMode={isDark} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Component", "361x112 error summary card", "Surface white, error border"],
            ["Container", "12px radius, 1.5px border, 16px horizontal padding, 12px vertical padding", "Border #D32F2F"],
            ["Layout", "Vertical stack with 8px gap", "Title followed by error links"],
            ["Title", "18px / 28px, medium weight", "Text #111111"],
            ["Links", "15px / 20px, underlined, each row 24px high", "Text #D32F2F"],
            ["Dark mode", "Uses semantic dark tokens", "Surface, title, border, and link color adapt in preview."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Place the error summary at the top of a form after validation fails."],
            ["Do", "Link each error directly to the field that needs correction."],
            ["Don't", "Do not replace inline field errors with only the summary; use both."],
          ].map(([label, note]) => (
            <div key={note} className="flex gap-4 px-5 py-3">
              <span className={`w-12 shrink-0 text-xs font-semibold uppercase tracking-wide ${label === "Do" ? "text-[var(--green-600)]" : "text-[var(--red-600)]"}`}>
                {label}
              </span>
              <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{note}</p>
            </div>
          ))}
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={ERROR_SUMMARY_CODE} />
      </section>
    </div>
  );
}
