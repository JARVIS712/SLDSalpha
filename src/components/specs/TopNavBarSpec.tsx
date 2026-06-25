"use client";
import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading, CaretLeft } from "./shared";

// ── Icons ──────────────────────────────────────────────────────────────────

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Stepper ────────────────────────────────────────────────────────────────

function Stepper({ step, total = 6 }: { step: number; total?: number }) {
  return (
    <div className="flex w-full items-center gap-2 px-4 py-1">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-full"
          style={{
            background: i < step
              ? "var(--gold-500)"
              : "var(--color-surface-sunken)",
          }}
        />
      ))}
    </div>
  );
}

// ── Top Nav Bar ────────────────────────────────────────────────────────────

type NavState = "default" | "progress";

function TopNavBar({
  title = "Page Title",
  showBack = true,
  showTrailing = true,
  state = "default",
  step = 3,
  totalSteps = 6,
  trailingIcon = "menu",
}: {
  title?: string;
  showBack?: boolean;
  showTrailing?: boolean;
  state?: NavState;
  step?: number;
  totalSteps?: number;
  trailingIcon?: "menu" | "close";
}) {
  return (
    <nav
      className="flex w-full items-start justify-between gap-0 border-b border-[var(--color-border-decorative)] bg-[var(--color-surface-page)] p-2"
      style={{ backdropFilter: "blur(6px)" }}
    >
      {/* Leading button */}
      {showBack ? (
        <button
          aria-label="Go back"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] text-[var(--color-icon-primary)] transition-colors hover:bg-[var(--color-surface-hover)]"
        >
          <CaretLeft size={24} />
        </button>
      ) : (
        <div className="h-12 w-12 shrink-0" />
      )}

      {/* Content */}
      <div className="flex min-h-12 flex-1 flex-col justify-center px-1 py-2">
        {state === "default" ? (
          <p className="text-xl font-medium leading-7 tracking-[0px] text-[var(--color-text-primary)]">
            {title}
          </p>
        ) : (
          <Stepper step={step} total={totalSteps} />
        )}
      </div>

      {/* Trailing button */}
      {showTrailing ? (
        <button
          aria-label={trailingIcon === "menu" ? "Open menu" : "Close"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] text-[var(--color-icon-primary)] transition-colors hover:bg-[var(--color-surface-hover)]"
        >
          {trailingIcon === "menu" ? <MenuIcon /> : <CloseIcon />}
        </button>
      ) : (
        <div className="h-12 w-12 shrink-0" />
      )}
    </nav>
  );
}

// ── Code snippet ───────────────────────────────────────────────────────────

const NAV_CODE = `// Top Navigation Bar — SLDS token implementation
// Mobile only. Two states: Default (title) and Progress (step indicator).
// Always pair with pb-[env(safe-area-inset-top)] on iOS if using edge-to-edge.

interface TopNavBarProps {
  title?: string;
  showBack?: boolean;
  showTrailing?: boolean;
  state?: "default" | "progress";
  step?: number;         // active steps (progress state)
  totalSteps?: number;   // total steps (progress state)
}

export function TopNavBar({
  title = "Page Title",
  showBack = true,
  showTrailing = true,
  state = "default",
  step = 1,
  totalSteps = 6,
}: TopNavBarProps) {
  return (
    <nav
      className={[
        "flex w-full items-start justify-between gap-0 p-2",
        "border-b border-[var(--color-border-decorative)]",
        "bg-[var(--color-surface-page)] backdrop-blur-[6px]",
      ].join(" ")}
    >
      {/* Leading button — 48×48 touch target */}
      {showBack ? (
        <button
          aria-label="Go back"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] text-[var(--color-icon-primary)] hover:bg-[var(--color-surface-hover)]"
        >
          <CaretLeftIcon size={24} />
        </button>
      ) : (
        <div className="h-12 w-12 shrink-0" />
      )}

      {/* Content */}
      <div className="flex min-h-12 flex-1 flex-col justify-center px-1 py-2">
        {state === "default" ? (
          <p className="text-xl font-medium leading-7 tracking-[0px] text-[var(--color-text-primary)]">
            {title}
          </p>
        ) : (
          // Progress stepper: active = gold-500, track = surface-sunken
          <div className="flex w-full items-center gap-2 px-4 py-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full"
                style={{ background: i < step ? "var(--gold-500)" : "var(--color-surface-sunken)" }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trailing button */}
      {showTrailing ? (
        <button
          aria-label="Open menu"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] text-[var(--color-icon-primary)] hover:bg-[var(--color-surface-hover)]"
        >
          <MenuIcon size={24} />
        </button>
      ) : (
        <div className="h-12 w-12 shrink-0" />
      )}
    </nav>
  );
}`;

// ── Main spec ──────────────────────────────────────────────────────────────

export function TopNavBarSpec() {
  const [isDark, setIsDark] = useState(false);
  const [previewState, setPreviewState] = useState<NavState>("default");
  const [previewStep, setPreviewStep] = useState(3);

  return (
    <div className="space-y-12">

      {/* Live Preview */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <SectionHeading>Live preview</SectionHeading>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewState(previewState === "default" ? "progress" : "default")}
              className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
            >
              {previewState === "default" ? "Progress mode" : "Default mode"}
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
            >
              {isDark ? "☀ Light mode" : "☾ Dark mode"}
            </button>
          </div>
        </div>
        <div className={isDark ? "dark rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface-page)]" : "rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border-decorative)]"}>
          <TopNavBar
            state={previewState}
            step={previewStep}
            totalSteps={6}
          />
          {previewState === "progress" && (
            <div className="flex items-center justify-center gap-3 border-t border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-4 py-3">
              <span className="text-xs text-[var(--color-text-secondary)]">Step {previewStep} of 6</span>
              <button
                onClick={() => setPreviewStep(Math.max(0, previewStep - 1))}
                disabled={previewStep === 0}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border-decorative)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)] disabled:opacity-40 hover:bg-[var(--color-surface-hover)]"
              >← Back</button>
              <button
                onClick={() => setPreviewStep(Math.min(6, previewStep + 1))}
                disabled={previewStep === 6}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border-decorative)] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)] disabled:opacity-40 hover:bg-[var(--color-surface-hover)]"
              >Next →</button>
            </div>
          )}
        </div>
      </section>

      {/* States */}
      <section>
        <SectionHeading>States</SectionHeading>
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-decorative)]">
                <th className="py-3 pl-5 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">State</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Example</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-decorative)]">
              <tr>
                <td className="py-4 pl-5 pr-4 align-top text-xs font-medium text-[var(--color-text-secondary)]">Default</td>
                <td className="px-4 py-4 align-top">
                  <div className="w-full max-w-[300px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-decorative)]">
                    <TopNavBar state="default" />
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-xs text-[var(--color-text-secondary)]">Back arrow · page title · trailing action icon. Standard navigation pattern.</td>
              </tr>
              <tr>
                <td className="py-4 pl-5 pr-4 align-top text-xs font-medium text-[var(--color-text-secondary)]">Progress</td>
                <td className="px-4 py-4 align-top">
                  <div className="w-full max-w-[300px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-decorative)]">
                    <TopNavBar state="progress" step={3} totalSteps={6} />
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-xs text-[var(--color-text-secondary)]">Step indicator replaces title. Gold segments = completed, muted = remaining. Used in multi-step flows.</td>
              </tr>
              <tr>
                <td className="py-4 pl-5 pr-4 align-top text-xs font-medium text-[var(--color-text-secondary)]">No back</td>
                <td className="px-4 py-4 align-top">
                  <div className="w-full max-w-[300px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-decorative)]">
                    <TopNavBar state="default" showBack={false} />
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-xs text-[var(--color-text-secondary)]">Root screen or first step — no back navigation available. Space reserved to keep title alignment.</td>
              </tr>
              <tr>
                <td className="py-4 pl-5 pr-4 align-top text-xs font-medium text-[var(--color-text-secondary)]">Close</td>
                <td className="px-4 py-4 align-top">
                  <div className="w-full max-w-[300px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-decorative)]">
                    <TopNavBar state="default" trailingIcon="close" />
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-xs text-[var(--color-text-secondary)]">Modal or overlay context — close icon replaces hamburger menu to dismiss the screen.</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Progress step configs */}
      <section>
        <SectionHeading>Progress indicator — step positions</SectionHeading>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <Card key={s} className="overflow-hidden">
              <div className="flex items-center gap-4 px-5 py-3 border-b border-[var(--color-border-decorative)]">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">Step {s} of 6</p>
              </div>
              <div className="bg-[var(--color-surface-section-alt)]">
                <TopNavBar state="progress" step={s} totalSteps={6} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Anatomy */}
      <section>
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { prop: "Height",            value: "64px (8px padding + 48px content + 8px padding)" },
            { prop: "Padding",           value: "8px all sides" },
            { prop: "Button size",       value: "48×48px touch target · rounded-[--radius-lg] (12px)" },
            { prop: "Icon size",         value: "24×24px" },
            { prop: "Title",             value: "20px · font-medium · leading-[28px] · tracking-[0px]" },
            { prop: "Background",        value: "--color-surface-page (neutral-50 · #fafafb) · backdrop-blur-[6px]" },
            { prop: "Border",            value: "1px solid --color-border-decorative (neutral-300 · #dadde2) · bottom only" },
            { prop: "Title color",       value: "--color-text-primary (neutral-900 · #111111)" },
            { prop: "Icon color",        value: "--color-icon-primary (neutral-900 · #111111)" },
            { prop: "Progress active",   value: "--gold-500 (#ffc700)" },
            { prop: "Progress track",    value: "--color-surface-sunken (neutral-100 · #f5f6f8)" },
            { prop: "Progress height",   value: "6px · rounded-full · 8px gap between segments" },
            { prop: "Platform",          value: "Mobile only" },
          ].map(({ prop, value }) => (
            <div key={prop} className="flex gap-4 px-5 py-3">
              <p className="w-40 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{prop}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{value}</p>
            </div>
          ))}
        </Card>
      </section>

      {/* Usage */}
      <section>
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { label: "Do",    note: "Use the Default state for all standard in-app navigation with a clear page title." },
            { label: "Do",    note: "Switch to Progress state for multi-step flows — it keeps the user oriented without showing a step number." },
            { label: "Do",    note: "Replace the trailing hamburger with a Close icon when the screen is a modal or overlay." },
            { label: "Do",    note: "Omit the back arrow on root screens where there is no previous screen to return to." },
            { label: "Don't", note: "Don't put multiple trailing actions in the top bar — use a single icon or move actions to a sheet." },
            { label: "Don't", note: "Don't use this component on web or dashboard — use the Sidebar or Top Header Bar instead." },
            { label: "Don't", note: "Don't skip the backdrop-blur — it provides the visual separation needed when content scrolls under the bar." },
            { label: "Don't", note: "Don't use more than 6 steps in the progress indicator — it becomes unreadable on small screens." },
          ].map(({ label, note }, i) => (
            <div key={i} className="flex gap-4 px-5 py-3">
              <span className={`shrink-0 text-xs font-semibold uppercase tracking-wide ${label === "Do" ? "text-[var(--green-600)]" : "text-[var(--red-600)]"}`}>
                {label}
              </span>
              <p className="text-sm text-[var(--color-text-secondary)]">{note}</p>
            </div>
          ))}
        </Card>
      </section>

      {/* Code */}
      <section>
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={NAV_CODE} />
      </section>

    </div>
  );
}
