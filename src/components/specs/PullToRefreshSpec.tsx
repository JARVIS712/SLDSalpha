"use client";
import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

// ── SpinnerGap icon (Phosphor · Outline · Regular · 24px) ─────────────────

function Spinner({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      aria-hidden
      style={{ animation: "ptr-spin 0.8s linear infinite" }}
    >
      <path
        d="M128,32A96,96,0,1,0,224,128"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}

// ── Pull-to-Refresh strip ──────────────────────────────────────────────────

type PTRState = "collapsed" | "loading" | "done";

function PullToRefreshStrip({ state }: { state: PTRState }) {
  const visible = state === "loading";
  return (
    <div
      className="w-full overflow-hidden transition-all duration-300"
      style={{ height: visible ? "52px" : "0px" }}
    >
      <div
        className="flex w-full items-center justify-center gap-1 p-4"
        style={{
          background: "var(--color-surface-sunken)",
          backdropFilter: "blur(6px)",
        }}
      >
        <span className="text-[var(--color-text-secondary)]">
          <Spinner size={20} />
        </span>
        <p
          className="text-[15px] leading-[20px] tracking-[0px] text-[var(--color-text-secondary)]"
          aria-live="polite"
        >
          Loading...
        </p>
      </div>
    </div>
  );
}

// ── Code snippet ───────────────────────────────────────────────────────────

const PTR_CODE = `// Pull-to-Refresh — SLDS token implementation
// Mobile only. Appears above content when user pulls down.
// Height transitions: 0px → 52px (loading) → 0px (done).

type PTRState = "collapsed" | "loading" | "done";

export function PullToRefreshStrip({ state }: { state: PTRState }) {
  const visible = state === "loading";
  return (
    <div
      className="w-full overflow-hidden transition-all duration-300"
      style={{ height: visible ? "52px" : "0px" }}
    >
      <div
        className={[
          "flex w-full items-center justify-center gap-1 p-4",
          "bg-[var(--color-surface-sunken)] backdrop-blur-[6px]",
        ].join(" ")}
      >
        <span className="text-[var(--color-text-secondary)]">
          <SpinnerGapIcon size={24} />  {/* 24×24 SpinnerGap — Phosphor Outline/Regular */}
        </span>
        <p
          className="text-[15px] leading-[20px] text-[var(--color-text-secondary)]"
          aria-live="polite"
        >
          Loading...
        </p>
      </div>
    </div>
  );
}

// Usage — wire to native scroll/touch events:
// 1. On touchstart: record startY
// 2. On touchmove: if scrollTop === 0 && deltaY > threshold → set state="loading"
// 3. After data fetch resolves: set state="done", then "collapsed" after 300ms`;

// ── Main spec ──────────────────────────────────────────────────────────────

export function PullToRefreshSpec() {
  const [isDark, setIsDark] = useState(false);
  const [ptrState, setPtrState] = useState<PTRState>("collapsed");

  function triggerRefresh() {
    if (ptrState !== "collapsed") return;
    setPtrState("loading");
    setTimeout(() => {
      setPtrState("done");
      setTimeout(() => setPtrState("collapsed"), 300);
    }, 2000);
  }

  // Reset when switching dark/light so animation is visible again
  useEffect(() => {
    setPtrState("collapsed");
  }, [isDark]);

  const stateLabel: Record<PTRState, string> = {
    collapsed: "Collapsed",
    loading: "Loading…",
    done: "Done",
  };

  return (
    <div className="space-y-12">

      {/* keyframe for the spinner */}
      <style>{`@keyframes ptr-spin { to { transform: rotate(360deg); } }`}</style>

      {/* Live Preview */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <SectionHeading>Live preview</SectionHeading>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
            >
              {isDark ? "☀ Light mode" : "☾ Dark mode"}
            </button>
          </div>
        </div>

        <div className={isDark ? "dark rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface-page)]" : "rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border-decorative)]"}>
          {/* Simulated phone view */}
          <div className="flex flex-col">
            <PullToRefreshStrip state={ptrState} />
            {/* Fake content */}
            <div className="flex flex-col divide-y divide-[var(--color-border-decorative)] bg-[var(--color-surface-card)]">
              {["Latest applications", "Pending documents", "Recent activity"].map((item) => (
                <div key={item} className="flex items-center gap-3 px-5 py-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-[var(--color-surface-section-alt)]" />
                  <div className="flex flex-col gap-1">
                    <div className="h-3 w-32 rounded-full bg-[var(--color-surface-section-alt)]" />
                    <div className="h-2.5 w-20 rounded-full bg-[var(--color-surface-section-alt)]" />
                  </div>
                </div>
              ))}
            </div>
            {/* Trigger */}
            <div className="flex items-center justify-between border-t border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-5 py-3">
              <span className="text-xs text-[var(--color-text-secondary)]">
                State: <strong className="text-[var(--color-text-primary)]">{stateLabel[ptrState]}</strong>
              </span>
              <button
                onClick={triggerRefresh}
                disabled={ptrState !== "collapsed"}
                className="rounded-[var(--radius-md)] bg-[var(--color-action-primary)] px-4 py-1.5 text-xs font-semibold text-[var(--color-action-primary-foreground)] disabled:opacity-40 transition-opacity"
              >
                ↓ Pull to refresh
              </button>
            </div>
          </div>
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
                <td className="py-4 pl-5 pr-4 align-top text-xs font-medium text-[var(--color-text-secondary)]">Collapsed</td>
                <td className="px-4 py-4 align-top">
                  <div className="w-full max-w-[260px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-decorative)]">
                    <div className="h-0 w-full" />
                    <div className="px-4 py-2 text-xs text-[var(--color-text-tertiary)] italic">— hidden, h-0 —</div>
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-xs text-[var(--color-text-secondary)]">
                  Default resting state. Height is 0, nothing rendered. Triggered when content is at top and user begins pulling down.
                </td>
              </tr>
              <tr>
                <td className="py-4 pl-5 pr-4 align-top text-xs font-medium text-[var(--color-text-secondary)]">Loading</td>
                <td className="px-4 py-4 align-top">
                  <div className="w-full max-w-[260px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-decorative)]">
                    <div
                      className="flex w-full items-center justify-center gap-1 p-4"
                      style={{ background: "var(--color-surface-sunken)" }}
                    >
                      <span className="text-[var(--color-text-secondary)]"><Spinner size={20} /></span>
                      <p className="text-[15px] leading-[20px] text-[var(--color-text-secondary)]">Loading...</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-xs text-[var(--color-text-secondary)]">
                  Animated spinner + "Loading..." label. Height expands to 52px. Shown while data fetch is in progress.
                </td>
              </tr>
              <tr>
                <td className="py-4 pl-5 pr-4 align-top text-xs font-medium text-[var(--color-text-secondary)]">Done</td>
                <td className="px-4 py-4 align-top">
                  <div className="w-full max-w-[260px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-decorative)]">
                    <div className="h-0 w-full" />
                    <div className="px-4 py-2 text-xs text-[var(--color-text-tertiary)] italic">— collapses to h-0 —</div>
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-xs text-[var(--color-text-secondary)]">
                  Triggered after fetch resolves. Strip animates height back to 0px over 300ms, then unmounts.
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Anatomy */}
      <section>
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { prop: "Height (loading)",   value: "52px (16px padding top + 20px content + 16px padding bottom)" },
            { prop: "Height (collapsed)", value: "0px — transition-all duration-300" },
            { prop: "Background",         value: "--color-surface-sunken (neutral-100 · #f5f6f8) · backdrop-blur-[6px]" },
            { prop: "Spinner",            value: "24×24px · SpinnerGap (Phosphor, Outline/Regular) · color: --color-text-secondary" },
            { prop: "Label",              value: '"Loading..." · 15px · leading-[20px] · tracking-[0px]' },
            { prop: "Label color",        value: "--color-text-secondary (neutral-600 · #676c73)" },
            { prop: "Gap",                value: "4px between spinner and label" },
            { prop: "Padding",            value: "16px all sides" },
            { prop: "Transition",         value: "height 300ms · overflow-hidden on wrapper" },
            { prop: "Platform",           value: "Mobile only — wire to touchstart/touchmove scroll events" },
          ].map(({ prop, value }) => (
            <div key={prop} className="flex gap-4 px-5 py-3">
              <p className="w-44 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{prop}</p>
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
            { label: "Do",    note: "Place the strip immediately above the scroll content so it appears to push content down as it expands." },
            { label: "Do",    note: "Only trigger loading when the user pulls past a threshold (≥ 60px) — avoid accidental triggers on small pulls." },
            { label: "Do",    note: "Collapse the strip after the data fetch resolves, even on error — give user feedback via a toast instead." },
            { label: "Do",    note: "Use aria-live=\"polite\" on the label so screen readers announce the loading state." },
            { label: "Don't", note: "Don't use pull-to-refresh on web or dashboard — use a manual refresh button or auto-polling instead." },
            { label: "Don't", note: "Don't keep the strip visible after loading completes — always animate it back to h-0." },
            { label: "Don't", note: "Don't block the UI — content underneath should remain visible and the strip sits above it." },
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
        <CodeBlock code={PTR_CODE} />
      </section>

    </div>
  );
}
