"use client";

import { useState } from "react";

const ROWS = [
  { token: "Surface/Card", cssVar: "--color-surface-card" },
  { token: "Text/Primary", cssVar: "--color-text-primary" },
  { token: "Text/Secondary", cssVar: "--color-text-secondary" },
  { token: "Action/Primary", cssVar: "--color-action-primary" },
];

export function ThemeTokenDemo() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-section-alt)] p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">
          The same component, the same token names — only the mode changes.
        </p>
        <div className="inline-flex rounded-md border border-[var(--color-border-default)] p-0.5 text-sm">
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`rounded px-3 py-1 font-medium capitalize transition-colors ${
                mode === m ? "bg-[var(--gold-500)] text-[var(--neutral-900)]" : "text-[var(--color-text-secondary)]"
              }`}
            >
              {m} mode
            </button>
          ))}
        </div>
      </div>

      <div className={mode === "dark" ? "dark" : ""}>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-6 transition-colors">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Card surface</h3>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Styled with Surface/Card, Text/Primary and Text/Secondary — nothing here was rewritten for dark mode.
          </p>
          <button
            type="button"
            className="mt-4 rounded-md bg-[var(--color-action-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-action-primary-foreground)]"
          >
            Action/Primary button
          </button>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ROWS.map((r) => (
          <div key={r.token} className={mode === "dark" ? "dark" : ""}>
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-2">
              <dt className="font-mono text-[10px] text-[var(--color-text-tertiary)]">{r.token}</dt>
              <dd className="mt-1 flex items-center gap-1.5">
                <span
                  className="h-3.5 w-3.5 rounded-sm border border-[var(--color-border-decorative)]"
                  style={{ backgroundColor: `var(${r.cssVar})` }}
                />
                <span className="text-xs text-[var(--color-text-primary)]">{r.cssVar}</span>
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
