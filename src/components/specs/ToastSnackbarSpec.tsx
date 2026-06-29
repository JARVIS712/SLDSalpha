"use client";
import React, { useState, useRef } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

// ── Toast component ────────────────────────────────────────────────────────

function Toast({
  title,
  description,
  actionLabel,
  onAction,
  visible,
  animKey,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  visible: boolean;
  animKey: number;
}) {
  return (
    <div
      className="w-full transition-all duration-300 ease-out"
      style={{
        transform: visible ? "translateY(0)" : "translateY(12px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        className="flex w-full items-center gap-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-card)] pl-4 pr-4 py-3 overflow-hidden"
        style={{ boxShadow: "0 10px 15px 0 rgba(0,0,0,0.12)" }}
      >
        {/* Text */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-[14px] leading-[22px] tracking-[0px] text-[var(--color-text-primary)]">
            {title}
          </p>
          {description && (
            <p className="text-[12px] leading-[18px] tracking-[0.2px] text-[var(--color-text-secondary)]">
              {description}
            </p>
          )}
        </div>
        {/* Action button */}
        {actionLabel && (
          <button
            onClick={onAction}
            className="h-7 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-action-primary)] px-2 py-1 text-[15px] leading-5 tracking-[0px] text-[var(--color-action-primary-foreground)] whitespace-nowrap"
          >
            {actionLabel}
          </button>
        )}
        {/* Close button (no icon — text-only dismiss in Figma, omitted per design) */}
      </div>
      {/* Auto-dismiss progress — resets via key */}
      {visible && (
        <div className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-[var(--color-border-decorative)]">
          <div
            key={animKey}
            className="h-full bg-[var(--color-action-primary)] origin-left"
            style={{ animation: "snack-progress 4s linear forwards" }}
          />
        </div>
      )}
    </div>
  );
}

// ── Static example (no timer — for tables/cards) ───────────────────────────

function ToastExample({
  title,
  description,
  actionLabel,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
}) {
  return (
    <div
      className="flex w-full items-center gap-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-card)] pl-4 pr-4 py-3"
      style={{ boxShadow: "0 10px 15px 0 rgba(0,0,0,0.12)" }}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[14px] leading-[22px] tracking-[0px] text-[var(--color-text-primary)]">{title}</p>
        {description && (
          <p className="text-[12px] leading-[18px] tracking-[0.2px] text-[var(--color-text-secondary)]">{description}</p>
        )}
      </div>
      {actionLabel && (
        <button className="h-7 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-action-primary)] px-2 py-1 text-[15px] leading-5 tracking-[0px] text-[var(--color-action-primary-foreground)] whitespace-nowrap">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ── Code snippet ───────────────────────────────────────────────────────────

const TOAST_CODE = `// Toast / Snackbar — SLDS token implementation
// Appears at the bottom of the screen; auto-dismisses after 4s.
// Optional description and action button.

interface ToastProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  visible: boolean;
}

export function Toast({ title, description, actionLabel, onAction, onDismiss, visible }: ToastProps) {
  // Auto-dismiss: caller passes a timer; this component only handles display.
  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 transition-all duration-300"
      style={{ transform: visible ? "translateY(0)" : "translateY(12px)", opacity: visible ? 1 : 0 }}
      role="status"
      aria-live="polite"
    >
      <div
        className={[
          "flex w-full items-center gap-4",
          "rounded-[var(--radius-lg)]",          // 12px
          "bg-[var(--color-surface-card)]",       // white light · dark surface dark
          "pl-4 pr-4 py-3",                       // 16px · 12px
        ].join(" ")}
        style={{ boxShadow: "0 10px 15px 0 rgba(0,0,0,0.12)" }}
      >
        {/* Text */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-[14px] leading-[22px] tracking-[0px] text-[var(--color-text-primary)]">
            {title}
          </p>
          {description && (
            <p className="text-[12px] leading-[18px] tracking-[0.2px] text-[var(--color-text-secondary)]">
              {description}
            </p>
          )}
        </div>

        {/* Optional action button */}
        {actionLabel && (
          <button
            onClick={onAction}
            className={[
              "h-7 shrink-0 px-2 py-1",
              "rounded-[var(--radius-md)]",                    // 8px — Figma: --radius-xl,8px fallback
              "bg-[var(--color-action-primary)]",              // gold-500 · #ffc700
              "text-[var(--color-action-primary-foreground)]", // neutral-900 · #111
              "text-[15px] leading-5 tracking-[0px] whitespace-nowrap",
            ].join(" ")}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// Usage — wire auto-dismiss in the parent:
function useToast() {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  function show() {
    clearTimeout(timer.current);
    setVisible(true);
    timer.current = setTimeout(() => setVisible(false), 4000);
  }
  function dismiss() {
    clearTimeout(timer.current);
    setVisible(false);
  }
  return { visible, show, dismiss };
}`;

// ── Main spec ──────────────────────────────────────────────────────────────

const ACTION_LABELS = ["Undo", "Retry", "View", "Save"];

export function ToastSnackbarSpec() {
  const [isDark, setIsDark] = useState(false);
  const [showDesc, setShowDesc] = useState(true);
  const [showAction, setShowAction] = useState(true);
  const [actionIdx, setActionIdx] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function trigger() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setAnimKey((k) => k + 1);
    setToastVisible(true);
    timerRef.current = setTimeout(() => setToastVisible(false), 4000);
  }
  function dismiss() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToastVisible(false);
  }

  const configs = [
    { title: "Title only",                    description: undefined, actionLabel: undefined },
    { title: "Title + description",           description: "Enter the description text", actionLabel: undefined },
    { title: "Title + action",                description: undefined, actionLabel: "Undo" },
    { title: "Title + description + action",  description: "Enter the description text", actionLabel: "Undo" },
  ];

  return (
    <div className="space-y-12">
      <style>{`@keyframes snack-progress { from { width: 100% } to { width: 0% } }`}</style>

      {/* Live preview */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <SectionHeading>Live preview</SectionHeading>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
          >
            {isDark ? "☀ Light mode" : "☾ Dark mode"}
          </button>
        </div>

        <div className={isDark ? "dark rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface-page)]" : "rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border-decorative)]"}>
          {/* Simulated phone content area */}
          <div className="relative flex min-h-[360px] flex-col bg-[var(--color-surface-page)]">
            {/* Controls bar */}
            <div className="flex flex-wrap items-center gap-3 border-b border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-5 py-3">
              <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                <input
                  type="checkbox"
                  checked={showDesc}
                  onChange={(e) => setShowDesc(e.target.checked)}
                  className="accent-[var(--color-action-primary)]"
                />
                Description
              </label>
              <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                <input
                  type="checkbox"
                  checked={showAction}
                  onChange={(e) => setShowAction(e.target.checked)}
                  className="accent-[var(--color-action-primary)]"
                />
                Action button
              </label>
              {showAction && (
                <select
                  value={actionIdx}
                  onChange={(e) => setActionIdx(Number(e.target.value))}
                  className="rounded-[var(--radius-sm)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-2 py-0.5 text-xs text-[var(--color-text-primary)]"
                >
                  {ACTION_LABELS.map((l, i) => (
                    <option key={l} value={i}>{l}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Fake content */}
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-8">
              <div className="w-full max-w-xs space-y-2">
                {[64, 48, 56].map((w, i) => (
                  <div key={i} className="h-3 rounded-full bg-[var(--color-surface-section-alt)]" style={{ width: `${w}%` }} />
                ))}
              </div>
              <button
                onClick={trigger}
                disabled={toastVisible}
                className="mt-4 rounded-[var(--radius-lg)] bg-[var(--color-action-primary)] px-5 py-2 text-sm font-semibold text-[var(--color-action-primary-foreground)] disabled:opacity-50 transition-opacity"
              >
                {toastVisible ? "Toast visible…" : "Show toast"}
              </button>
              {toastVisible && (
                <p className="text-xs text-[var(--color-text-tertiary)]">Auto-dismisses in 4s · progress bar below</p>
              )}
            </div>

            {/* Toast anchored to bottom of container */}
            <div className="px-4 pb-4">
              <Toast
                title="Title Text"
                description={showDesc ? "Enter the description text" : undefined}
                actionLabel={showAction ? ACTION_LABELS[actionIdx] : undefined}
                onAction={dismiss}
                visible={toastVisible}
                animKey={animKey}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Configurations */}
      <section>
        <SectionHeading>Configurations</SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2">
          {configs.map(({ title, description, actionLabel }) => (
            <Card key={title} className="overflow-hidden">
              <div className="border-b border-[var(--color-border-decorative)] px-5 py-3">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{title}</p>
              </div>
              <div className="bg-[var(--color-surface-section-alt)] px-5 py-4">
                <ToastExample
                  title="Title Text"
                  description={description}
                  actionLabel={actionLabel}
                />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* States */}
      <section>
        <SectionHeading>Behaviour</SectionHeading>
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-decorative)]">
                <th className="py-3 pl-5 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">State</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-decorative)]">
              {[
                { state: "Entering",   desc: "Slides up 12px + fades in over 300ms. Triggered by the action that caused the toast (save, undo, network event)." },
                { state: "Visible",    desc: "Fully visible for 4 000ms. User can tap the action button or swipe down to dismiss early. No close button — always auto-dismisses." },
                { state: "Dismissing", desc: "Slides down 12px + fades out over 300ms after 4s, or immediately after the user acts on the action button." },
              ].map(({ state, desc }) => (
                <tr key={state}>
                  <td className="py-4 pl-5 pr-4 align-top text-xs font-medium text-[var(--color-text-secondary)] whitespace-nowrap">{state}</td>
                  <td className="px-4 py-4 align-top text-xs text-[var(--color-text-secondary)]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* Anatomy */}
      <section>
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { prop: "Background",      value: "--color-surface-card (white light · dark surface in dark mode)" },
            { prop: "Border-radius",   value: "--radius-lg (12px)" },
            { prop: "Padding",         value: "16px left · 16px right · 12px vertical" },
            { prop: "Gap",             value: "16px between text column and action button" },
            { prop: "Shadow",          value: "0 10px 15px 0 rgba(0,0,0,0.12) — Elevation/3 · Floating" },
            { prop: "Title",           value: "--color-text-primary · 14px · leading-[22px] · tracking-0 — Body 2" },
            { prop: "Description",     value: "--color-text-secondary · 12px · leading-[18px] · tracking-[0.2px] — Caption 1" },
            { prop: "Action button bg",    value: "--color-action-primary (gold-500 · #ffc700)" },
            { prop: "Action button text",  value: "--color-action-primary-foreground (neutral-900 · #111111)" },
            { prop: "Action button height",value: "28px · --radius-md (8px) · px-8px · 15px / leading-5 / tracking-0" },
            { prop: "Position",        value: "Fixed · bottom-4 · left-4 · right-4 · z-50 (in production)" },
            { prop: "Auto-dismiss",    value: "4 000ms on mobile. No persistent close button." },
            { prop: "Animation",       value: "translateY(12px)→0 + opacity 0→1 · 300ms ease-out on enter · reverse on dismiss" },
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
            { label: "Do",    note: "Use toasts for transient, low-priority feedback — confirmation of an action (saved, sent, deleted)." },
            { label: "Do",    note: "Keep the title to one short sentence. If more context is needed, add a description (12px caption)." },
            { label: "Do",    note: "Use the action button for a single reversible action — 'Undo', 'Retry', 'View'. Max one action." },
            { label: "Do",    note: "Use role=\"status\" and aria-live=\"polite\" so screen readers announce it without interrupting." },
            { label: "Do",    note: "Auto-dismiss after 4s on mobile. On web/dashboard, extend to 6s if the user has reduced-motion preference." },
            { label: "Don't", note: "Don't use a toast for errors that require user action — use a Notification Banner or Alert Dialog instead." },
            { label: "Don't", note: "Don't show more than one toast at a time — queue them and show the next after the current dismisses." },
            { label: "Don't", note: "Don't put critical information in a toast — it disappears and the user may miss it." },
            { label: "Don't", note: "Don't place a toast behind a bottom sheet, modal, or keyboard — always the topmost layer (z-50+)." },
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
        <CodeBlock code={TOAST_CODE} />
      </section>

    </div>
  );
}
