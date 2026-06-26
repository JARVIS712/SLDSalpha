"use client";
import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

// ── Alert Dialog component ─────────────────────────────────────────────────

interface AlertDialogProps {
  title: string;
  body: string;
  cancelLabel?: string;   // optional link button — left side
  declineLabel?: string;  // secondary button
  confirmLabel: string;   // primary button
  onCancel?: () => void;
  onDecline?: () => void;
  onConfirm?: () => void;
  labelledById?: string;
  describedById?: string;
}

function AlertDialog({
  title, body,
  cancelLabel, declineLabel, confirmLabel,
  onCancel, onDecline, onConfirm,
  labelledById = "ad-title",
  describedById = "ad-body",
}: AlertDialogProps) {
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={labelledById}
      aria-describedby={describedById}
      className="flex w-[300px] flex-col gap-5 rounded-[var(--radius-lg)] bg-[var(--color-surface-card)] px-4 py-3"
      style={{ boxShadow: "0 10px 15px 0 rgba(0,0,0,0.12)" }}
    >
      {/* Title + body */}
      <div className="flex flex-col">
        <p
          id={labelledById}
          className="text-[18px] font-medium leading-[28px] tracking-[0px] text-[var(--color-text-primary)]"
        >
          {title}
        </p>
        <p
          id={describedById}
          className="text-[14px] leading-[22px] tracking-[0px] text-[var(--color-text-secondary)]"
        >
          {body}
        </p>
      </div>

      {/* Action row: cancel link (optional) · secondary · primary */}
      <div className="flex items-center justify-between">
        {cancelLabel ? (
          <button
            onClick={onCancel}
            className="h-6 whitespace-nowrap text-[15px] leading-5 tracking-[0px] text-[var(--color-text-primary)] underline"
          >
            {cancelLabel}
          </button>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2">
          {declineLabel && (
            <button
              onClick={onDecline}
              className="flex h-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-action-secondary)] px-2 text-[15px] leading-5 tracking-[0px] text-[var(--color-text-primary)] whitespace-nowrap"
            >
              {declineLabel}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="flex h-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-action-primary)] px-2 text-[15px] leading-5 tracking-[0px] text-[var(--color-action-primary-foreground)] whitespace-nowrap"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Static example (no ARIA ids — for non-interactive display) ─────────────

function AlertDialogStatic({
  title, body, cancelLabel, declineLabel, confirmLabel,
}: {
  title: string;
  body: string;
  cancelLabel?: string;
  declineLabel?: string;
  confirmLabel: string;
}) {
  return (
    <div
      className="flex w-full max-w-[300px] flex-col gap-5 rounded-[var(--radius-lg)] bg-[var(--color-surface-card)] px-4 py-3"
      style={{ boxShadow: "0 10px 15px 0 rgba(0,0,0,0.12)" }}
    >
      <div className="flex flex-col">
        <p className="text-[18px] font-medium leading-[28px] tracking-[0px] text-[var(--color-text-primary)]">{title}</p>
        <p className="text-[14px] leading-[22px] tracking-[0px] text-[var(--color-text-secondary)]">{body}</p>
      </div>
      <div className="flex items-center justify-between">
        {cancelLabel ? (
          <span className="h-6 whitespace-nowrap text-[15px] leading-5 tracking-[0px] text-[var(--color-text-primary)] underline">{cancelLabel}</span>
        ) : <span />}
        <div className="flex items-center gap-2">
          {declineLabel && (
            <span className="flex h-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-action-secondary)] px-2 text-[15px] leading-5 tracking-[0px] text-[var(--color-text-primary)] whitespace-nowrap">
              {declineLabel}
            </span>
          )}
          <span className="flex h-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-action-primary)] px-2 text-[15px] leading-5 tracking-[0px] text-[var(--color-action-primary-foreground)] whitespace-nowrap">
            {confirmLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Code snippet ───────────────────────────────────────────────────────────

const DIALOG_CODE = `// Alert Dialog — SLDS token implementation
// Blocking modal — requires a user choice to dismiss. Mobile only.
// Dialog: --radius-lg (12px). Buttons: --radius-md (8px).

interface AlertDialogProps {
  title: string;
  body: string;
  cancelLabel?: string;   // optional link button on left
  declineLabel?: string;  // secondary button
  confirmLabel: string;   // primary button
  onCancel?: () => void;
  onDecline?: () => void;
  onConfirm?: () => void;
}

export function AlertDialog({
  title, body,
  cancelLabel, declineLabel, confirmLabel,
  onCancel, onDecline, onConfirm,
}: AlertDialogProps) {
  return (
    // Backdrop — rendered by the caller
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-body"
      className={[
        "flex w-[300px] flex-col gap-5",
        "rounded-[var(--radius-lg)]",         // 12px — Figma: --radius-2xl,12px fallback
        "bg-[var(--color-surface-card)]",     // white light · dark surface in dark
        "px-4 py-3",                           // 16px · 12px
      ].join(" ")}
      style={{ boxShadow: "0 10px 15px 0 rgba(0,0,0,0.12)" }}
    >
      {/* Title + body */}
      <div className="flex flex-col">
        <p id="dialog-title" className="text-[18px] font-medium leading-[28px] tracking-[0px] text-[var(--color-text-primary)]">
          {title}
        </p>
        <p id="dialog-body" className="text-[14px] leading-[22px] tracking-[0px] text-[var(--color-text-secondary)]">
          {body}
        </p>
      </div>

      {/* Action row */}
      <div className="flex items-center justify-between">
        {cancelLabel ? (
          <button
            onClick={onCancel}
            className="h-6 text-[15px] leading-5 tracking-[0px] text-[var(--color-text-primary)] underline whitespace-nowrap"
          >
            {cancelLabel}
          </button>
        ) : <span />}

        <div className="flex items-center gap-2">
          {declineLabel && (
            <button
              onClick={onDecline}
              className={[
                "flex h-9 items-center justify-center px-2 whitespace-nowrap",
                "rounded-[var(--radius-md)]",                  // 8px — Figma: --radius-xl,8px fallback
                "border border-[var(--color-border-default)]", // #dadde2
                "bg-[var(--color-action-secondary)]",          // white light · dark
                "text-[15px] leading-5 tracking-[0px] text-[var(--color-text-primary)]",
              ].join(" ")}
            >
              {declineLabel}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={[
              "flex h-9 items-center justify-center px-2 whitespace-nowrap",
              "rounded-[var(--radius-md)]",                        // 8px
              "bg-[var(--color-action-primary)]",                  // gold-500 · #ffc700
              "text-[15px] leading-5 tracking-[0px]",
              "text-[var(--color-action-primary-foreground)]",     // neutral-900 · #111
            ].join(" ")}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// Backdrop + dialog wrapper
export function AlertDialogOverlay({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
      // NOTE: trap focus and handle Escape key in production
    >
      {children}
    </div>
  );
}`;

// ── Demo scenarios ─────────────────────────────────────────────────────────

const SCENARIOS = [
  {
    id: "unsaved",
    label: "Unsaved changes",
    title: "Unsaved Changes",
    body: "You have unsaved changes that will be lost if you leave this page.",
    cancelLabel: "Cancel" as const,
    declineLabel: "Discard",
    confirmLabel: "Save",
  },
  {
    id: "logout",
    label: "Log out",
    title: "Log Out",
    body: "Are you sure you want to log out of your account?",
    cancelLabel: undefined,
    declineLabel: "Stay",
    confirmLabel: "Log Out",
  },
  {
    id: "delete",
    label: "Delete item",
    title: "Delete Item?",
    body: "This item will be permanently deleted and cannot be recovered.",
    cancelLabel: "Cancel" as const,
    declineLabel: "Keep",
    confirmLabel: "Delete",
  },
];

// ── Main spec ──────────────────────────────────────────────────────────────

export function AlertDialogSpec() {
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const scenario = SCENARIOS[scenarioIdx];

  function closeWith(action: string) {
    setOpen(false);
    setLastAction(action);
  }

  return (
    <div className="space-y-12">

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
          {/* Simulated phone content area — relative for absolute backdrop */}
          <div className="relative min-h-[400px]">
            {/* Fake app content */}
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-5 bg-[var(--color-surface-page)] px-6 py-8">
              {/* Scenario picker */}
              <div className="flex flex-wrap justify-center gap-2">
                {SCENARIOS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => { setScenarioIdx(i); setLastAction(null); }}
                    className={[
                      "rounded-[var(--radius-md)] px-3 py-1 text-xs font-medium transition-colors",
                      i === scenarioIdx
                        ? "bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)]"
                        : "border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]",
                    ].join(" ")}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Fake skeleton content */}
              <div className="w-full max-w-xs space-y-2 opacity-40">
                {[80, 60, 70, 50].map((w, i) => (
                  <div key={i} className="h-3 rounded-full bg-[var(--color-surface-section-alt)]" style={{ width: `${w}%` }} />
                ))}
              </div>

              <button
                onClick={() => { setOpen(true); setLastAction(null); }}
                className="rounded-[var(--radius-lg)] bg-[var(--color-action-primary)] px-5 py-2 text-sm font-semibold text-[var(--color-action-primary-foreground)]"
              >
                Open dialog
              </button>

              {lastAction && (
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Chose: <strong className="text-[var(--color-text-primary)]">{lastAction}</strong>
                </p>
              )}
            </div>

            {/* Backdrop + dialog — absolutely positioned within the container */}
            {open && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <AlertDialog
                  title={scenario.title}
                  body={scenario.body}
                  cancelLabel={scenario.cancelLabel}
                  declineLabel={scenario.declineLabel}
                  confirmLabel={scenario.confirmLabel}
                  onCancel={() => closeWith("Cancel")}
                  onDecline={() => closeWith(scenario.declineLabel ?? "Decline")}
                  onConfirm={() => closeWith(scenario.confirmLabel)}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Configurations */}
      <section>
        <SectionHeading>Configurations</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="overflow-hidden">
            <div className="border-b border-[var(--color-border-decorative)] px-5 py-3">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">With cancel link button</p>
              <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">Three choices: Cancel · Decline · Confirm</p>
            </div>
            <div className="flex items-center justify-center bg-[var(--color-surface-section-alt)] p-6">
              <AlertDialogStatic
                title="Alert Title"
                body="Here is a sample alert dialog showcasing interactive buttons for user actions."
                cancelLabel="Cancel"
                declineLabel="Decline"
                confirmLabel="Confirm"
              />
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div className="border-b border-[var(--color-border-decorative)] px-5 py-3">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">Without cancel link button</p>
              <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">Two choices: Decline · Confirm only</p>
            </div>
            <div className="flex items-center justify-center bg-[var(--color-surface-section-alt)] p-6">
              <AlertDialogStatic
                title="Alert Title"
                body="Here is a sample alert dialog showcasing interactive buttons for user actions."
                declineLabel="Decline"
                confirmLabel="Confirm"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Usage examples */}
      <section>
        <SectionHeading>Usage examples</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-3">
          {SCENARIOS.map((s) => (
            <Card key={s.id} className="overflow-hidden">
              <div className="border-b border-[var(--color-border-decorative)] px-5 py-3">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{s.label}</p>
              </div>
              <div className="flex items-center justify-center bg-[var(--color-surface-section-alt)] p-6">
                <AlertDialogStatic
                  title={s.title}
                  body={s.body}
                  cancelLabel={s.cancelLabel}
                  declineLabel={s.declineLabel}
                  confirmLabel={s.confirmLabel}
                />
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
            { prop: "Dialog background",       value: "--color-surface-card (white light · dark surface in dark)" },
            { prop: "Dialog border-radius",    value: "--radius-lg (12px) — Figma: --radius-2xl,12px fallback" },
            { prop: "Dialog padding",          value: "16px horizontal · 12px vertical (px-4 py-3)" },
            { prop: "Dialog gap",              value: "20px between text block and action row (gap-5)" },
            { prop: "Dialog shadow",           value: "0 10px 15px 0 rgba(0,0,0,0.12) — Elevation/3 · Floating" },
            { prop: "Dialog width",            value: "300px fixed (mobile)" },
            { prop: "Title",                   value: "18px · font-medium (500) · leading-[28px] · tracking-0 — Title 1 · --color-text-primary" },
            { prop: "Body",                    value: "14px · regular (400) · leading-[22px] · tracking-0 — Body 2 · --color-text-secondary" },
            { prop: "Cancel link",             value: "h-24px · 15px · leading-5 · underline · --color-text-primary" },
            { prop: "Button height",           value: "36px (h-9) · padding 8px horizontal (px-2)" },
            { prop: "Button border-radius",    value: "--radius-md (8px) — Figma: --radius-xl,8px fallback" },
            { prop: "Secondary button",        value: "bg --color-action-secondary · border --color-border-default (#dadde2) · text --color-text-primary" },
            { prop: "Primary button",          value: "bg --color-action-primary (#ffc700) · text --color-action-primary-foreground (#111)" },
            { prop: "Backdrop",                value: "rgba(0,0,0,0.5) · fixed inset-0 · z-50 · flex items-center justify-center" },
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
            { label: "Do",    note: "Use alert dialogs for blocking decisions — actions that cannot be undone or require explicit user consent." },
            { label: "Do",    note: "Keep the title short (2–4 words) and the body to one or two sentences. State the consequence clearly." },
            { label: "Do",    note: "Label buttons with the action itself: 'Delete', 'Log Out', 'Save' — not 'OK' or 'Yes'." },
            { label: "Do",    note: "Use role=\"alertdialog\", aria-modal=\"true\", aria-labelledby, and aria-describedby for accessibility." },
            { label: "Do",    note: "Trap focus inside the dialog and return focus to the trigger element when dismissed." },
            { label: "Do",    note: "Handle the Escape key — treat it as Cancel / Decline (the safer option)." },
            { label: "Don't", note: "Don't use an alert dialog for notifications or low-stakes confirmations — use a Toast or Notification Banner." },
            { label: "Don't", note: "Don't allow outside-click dismissal — the user must make an explicit choice." },
            { label: "Don't", note: "Don't use more than three actions (Cancel link + Decline + Confirm). If you need more, rethink the flow." },
            { label: "Don't", note: "Don't stack multiple alert dialogs — resolve one before triggering another." },
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
        <CodeBlock code={DIALOG_CODE} />
      </section>

    </div>
  );
}
