"use client";
import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

// ── Icons ──────────────────────────────────────────────────────────────────

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
    </svg>
  );
}

function WarningCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M236.8,188.09,149.35,36.22a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z" />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1,12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
      <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
    </svg>
  );
}

// ── Variant config ─────────────────────────────────────────────────────────

type Variant = "success" | "warning" | "error" | "info";

const VARIANT_CONFIG: Record<Variant, {
  bg: string;
  border: string;
  iconColor: string;
  textColor: string;
  Icon: () => React.ReactNode;
  message: string;
  linkLabel: string;
  label: string;
}> = {
  success: {
    bg: "var(--green-100)",
    border: "var(--green-500)",
    iconColor: "var(--green-500)",
    textColor: "var(--color-text-primary)",
    Icon: CheckCircleIcon,
    message: "Your changes have been saved successfully.",
    linkLabel: "View details",
    label: "Success",
  },
  warning: {
    bg: "var(--gold-100)",
    border: "var(--gold-700)",
    iconColor: "var(--gold-700)",
    textColor: "var(--gold-900)",
    Icon: WarningCircleIcon,
    message: "Your session will expire soon. Please save your work.",
    linkLabel: "Save now",
    label: "Warning",
  },
  error: {
    bg: "var(--red-100)",
    border: "var(--red-600)",
    iconColor: "var(--red-600)",
    textColor: "var(--color-text-primary)",
    Icon: XCircleIcon,
    message: "Something went wrong. Please try again later.",
    linkLabel: "Try again",
    label: "Error",
  },
  info: {
    bg: "var(--color-surface-sunken)",
    border: "var(--teal-600)",
    iconColor: "var(--teal-600)",
    textColor: "var(--color-text-primary)",
    Icon: InfoIcon,
    message: "New updates are available. Refresh to see changes.",
    linkLabel: "Refresh",
    label: "Info",
  },
};

// Dark mode token overrides (Figma node 511-1364)
const DARK_VARIANT_CONFIG: Record<Variant, { bg: string; border: string; iconColor: string; textColor: string }> = {
  success: { bg: "var(--dark-subtle-green)", border: "var(--green-300)",  iconColor: "var(--green-300)",  textColor: "var(--color-text-primary)" },
  warning: { bg: "var(--dark-subtle-gold)",  border: "var(--gold-700)",   iconColor: "var(--gold-700)",   textColor: "#ffe880" },
  error:   { bg: "var(--dark-subtle-red)",   border: "var(--red-600)",    iconColor: "var(--red-600)",    textColor: "var(--color-text-primary)" },
  info:    { bg: "#1f2937",                  border: "var(--teal-200)",   iconColor: "var(--teal-200)",   textColor: "var(--color-text-primary)" },
};

const VARIANTS: Variant[] = ["success", "warning", "error", "info"];

// ── Banner component ───────────────────────────────────────────────────────

function NotificationBanner({
  variant,
  message,
  showLink = true,
  onClose,
  darkMode = false,
}: {
  variant: Variant;
  message?: string;
  showLink?: boolean;
  onClose?: () => void;
  darkMode?: boolean;
}) {
  const base = VARIANT_CONFIG[variant];
  const theme = darkMode ? DARK_VARIANT_CONFIG[variant] : base;
  const { Icon } = base;
  return (
    <div
      role="alert"
      className="flex w-full items-start rounded-[var(--radius-lg)] border pl-3 pr-2 py-2 gap-6"
      style={{
        background: theme.bg,
        borderColor: theme.border,
        boxShadow: "0 10px 15px 0 rgba(0,0,0,0.12)",
      }}
    >
      {/* Icon + text */}
      <div className="flex min-w-0 flex-1 items-start gap-2">
        <span className="mt-0.5 shrink-0" style={{ color: theme.iconColor }}>
          <Icon />
        </span>
        <p
          className="text-[14px] leading-[22px] tracking-[0px]"
          style={{ color: theme.textColor }}
        >
          {message ?? base.message}
        </p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        {showLink && (
          <button
            className="h-6 whitespace-nowrap text-[15px] leading-5 underline decoration-solid"
            style={{ color: theme.textColor }}
          >
            {base.linkLabel}
          </button>
        )}
        <button
          aria-label="Dismiss"
          onClick={onClose}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-icon-secondary)] transition-colors hover:bg-black/10"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
}

// ── Code snippet ───────────────────────────────────────────────────────────

const BANNER_CODE = `// Notification Banner — SLDS token implementation
// 4 variants: success · warning · error · info
// Separate token maps for light and dark mode.

type Variant = "success" | "warning" | "error" | "info";
type ThemeTokens = { bg: string; border: string; iconColor: string; textColor: string };

const LIGHT_TOKENS: Record<Variant, ThemeTokens> = {
  success: { bg: "var(--green-100)",             border: "var(--green-500)",  iconColor: "var(--green-500)",  textColor: "var(--color-text-primary)" },
  warning: { bg: "var(--gold-100)",              border: "var(--gold-700)",   iconColor: "var(--gold-700)",   textColor: "var(--gold-900)" },
  error:   { bg: "var(--red-100)",               border: "var(--red-600)",    iconColor: "var(--red-600)",    textColor: "var(--color-text-primary)" },
  info:    { bg: "var(--color-surface-sunken)",  border: "var(--teal-600)",   iconColor: "var(--teal-600)",   textColor: "var(--color-text-primary)" },
};

const DARK_TOKENS: Record<Variant, ThemeTokens> = {
  success: { bg: "var(--dark-subtle-green)",  border: "var(--green-300)",  iconColor: "var(--green-300)",  textColor: "var(--color-text-primary)" },
  warning: { bg: "var(--dark-subtle-gold)",   border: "var(--gold-700)",   iconColor: "var(--gold-700)",   textColor: "#ffe880" },
  error:   { bg: "var(--dark-subtle-red)",    border: "var(--red-600)",    iconColor: "var(--red-600)",    textColor: "var(--color-text-primary)" },
  info:    { bg: "#1f2937",                   border: "var(--teal-200)",   iconColor: "var(--teal-200)",   textColor: "var(--color-text-primary)" },
};

interface NotificationBannerProps {
  variant: Variant;
  message: string;
  linkLabel?: string;
  onLinkClick?: () => void;
  onClose?: () => void;
}

export function NotificationBanner({
  variant,
  message,
  linkLabel,
  onLinkClick,
  onClose,
}: NotificationBannerProps) {
  const t = TOKENS[variant];
  return (
    <div
      role="alert"
      className="flex w-full items-start rounded-[var(--radius-lg)] border pl-3 pr-2 py-2 gap-6"
      style={{ background: t.bg, borderColor: t.border, boxShadow: "0 10px 15px 0 rgba(0,0,0,0.12)" }}
    >
      {/* Left: icon + message */}
      <div className="flex min-w-0 flex-1 items-start gap-2">
        <span className="mt-0.5 shrink-0" style={{ color: t.iconColor }}>
          <VariantIcon variant={variant} size={24} />   {/* 24×24 filled icon */}
        </span>
        <p className="text-[14px] leading-[22px] tracking-[0px]" style={{ color: t.textColor }}>
          {message}
        </p>
      </div>

      {/* Right: optional link + dismiss */}
      <div className="flex shrink-0 items-center gap-2">
        {linkLabel && (
          <button
            onClick={onLinkClick}
            className="h-6 text-[15px] leading-5 underline whitespace-nowrap"
            style={{ color: "var(--color-text-primary)" }}
          >
            {linkLabel}
          </button>
        )}
        <button
          aria-label="Dismiss"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-icon-secondary)] hover:bg-black/10"
        >
          <XIcon size={16} />
        </button>
      </div>
    </div>
  );
}`;

// ── Main spec ──────────────────────────────────────────────────────────────

export function NotificationBannerSpec() {
  const [isDark, setIsDark] = useState(false);
  const [dismissed, setDismissed] = useState<Set<Variant>>(new Set());

  function dismiss(v: Variant) {
    setDismissed((prev) => new Set([...prev, v]));
  }
  function reset() {
    setDismissed(new Set());
  }

  const allDismissed = dismissed.size === VARIANTS.length;

  return (
    <div className="space-y-12">

      {/* Live preview */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <SectionHeading>Live preview</SectionHeading>
          <div className="flex items-center gap-2">
            {dismissed.size > 0 && (
              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
              >
                Reset
              </button>
            )}
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
            >
              {isDark ? "☀ Light mode" : "☾ Dark mode"}
            </button>
          </div>
        </div>

        <div className={isDark
          ? "dark rounded-[var(--radius-xl)] bg-[var(--color-surface-page)] p-6 space-y-3"
          : "rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-6 space-y-3"
        }>
          {allDismissed ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <p className="text-sm text-[var(--color-text-secondary)]">All banners dismissed.</p>
              <button
                onClick={reset}
                className="rounded-[var(--radius-md)] bg-[var(--color-action-primary)] px-4 py-1.5 text-xs font-semibold text-[var(--color-action-primary-foreground)]"
              >
                Reset
              </button>
            </div>
          ) : (
            VARIANTS.map((v) =>
              dismissed.has(v) ? null : (
                <NotificationBanner
                  key={v}
                  variant={v}
                  onClose={() => dismiss(v)}
                  darkMode={isDark}
                />
              )
            )
          )}
        </div>
      </section>

      {/* Variants table */}
      <section>
        <SectionHeading>Variants</SectionHeading>
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-decorative)]">
                <th className="py-3 pl-5 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Variant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Example</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">When to use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-decorative)]">
              {VARIANTS.map((v) => {
                const cfg = VARIANT_CONFIG[v];
                return (
                  <tr key={v}>
                    <td className="py-4 pl-5 pr-4 align-top text-xs font-medium text-[var(--color-text-secondary)]">{cfg.label}</td>
                    <td className="px-4 py-4 align-top">
                      <NotificationBanner variant={v} showLink={false} />
                    </td>
                    <td className="px-4 py-4 align-top text-xs text-[var(--color-text-secondary)]">
                      {v === "success" && "Positive outcome confirmation — form saved, action completed, upload finished."}
                      {v === "warning" && "Non-blocking risk or upcoming issue — session expiry, unsaved changes, quota near limit."}
                      {v === "error" && "Action failed or system problem requiring user attention — server error, validation failure."}
                      {v === "info" && "Neutral update or guidance — new feature, refresh required, policy change."}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </section>

      {/* With / without link */}
      <section>
        <SectionHeading>With and without link button</SectionHeading>
        <div className="space-y-3">
          <Card className="overflow-hidden">
            <div className="border-b border-[var(--color-border-decorative)] px-5 py-4">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">With link button</p>
              <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">Use when there is a clear next action the user can take.</p>
            </div>
            <div className="bg-[var(--color-surface-section-alt)] px-5 py-4 space-y-3">
              {VARIANTS.map((v) => (
                <NotificationBanner key={v} variant={v} showLink />
              ))}
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div className="border-b border-[var(--color-border-decorative)] px-5 py-4">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">Without link button</p>
              <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">Use when the banner is purely informational — no action available.</p>
            </div>
            <div className="bg-[var(--color-surface-section-alt)] px-5 py-4 space-y-3">
              {VARIANTS.map((v) => (
                <NotificationBanner key={v} variant={v} showLink={false} />
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Anatomy */}
      <section>
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { prop: "Border-radius",         value: "--radius-lg (12px)" },
            { prop: "Padding",               value: "12px left · 8px right · 8px vertical" },
            { prop: "Shadow",                value: "0 10px 15px 0 rgba(0,0,0,0.12) — Elevation/3 · Floating" },
            { prop: "Border",                value: "1px solid — variant border color" },
            { prop: "Gap (left → right)",    value: "24px between icon+text and action area · 8px within each group" },
            { prop: "Icon size",             value: "24×24px · filled variant · color matches border" },
            { prop: "Message",               value: "14px · leading-[22px] · tracking-[0px] — Desktop/Body 2" },
            { prop: "Success (light)",        value: "bg --green-100 · border --green-500 · icon --green-500 · text --color-text-primary" },
            { prop: "Warning (light)",        value: "bg --gold-100 · border --gold-700 · icon --gold-700 · text --gold-900" },
            { prop: "Error (light)",          value: "bg --red-100 · border --red-600 · icon --red-600 · text --color-text-primary" },
            { prop: "Info (light)",           value: "bg --color-surface-sunken · border --teal-600 · icon --teal-600 · text --color-text-primary" },
            { prop: "Success (dark)",         value: "bg --dark-subtle-green (#062b1a) · border --green-300 (#5dc896) · icon --green-300" },
            { prop: "Warning (dark)",         value: "bg --dark-subtle-gold (#2e2200) · border --gold-700 (#b38a00) · text #ffe880" },
            { prop: "Error (dark)",           value: "bg --dark-subtle-red (#330d0d) · border --red-600 (#d32f2f) · icon --red-600" },
            { prop: "Info (dark)",            value: "bg #1f2937 · border --teal-200 (#7dd8e8) · icon --teal-200" },
            { prop: "Link button",           value: "--color-text-primary · 15px · underline · height 24px" },
            { prop: "Close button",          value: "28×28px · --radius-md (8px) · icon 16×16px X · --color-icon-secondary" },
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
            { label: "Do",    note: "Always include the close button — users must be able to dismiss the banner." },
            { label: "Do",    note: "Keep the message concise — one sentence describing what happened and what to do next." },
            { label: "Do",    note: "Use role=\"alert\" so screen readers announce the banner immediately on appearance." },
            { label: "Do",    note: "Show banners at the top of the content area, below the navigation bar." },
            { label: "Do",    note: "Use the warning variant for recoverable risks; error for failures that block the user's task." },
            { label: "Don't", note: "Don't stack more than 2 banners at once — consolidate or use a Toast for transient messages." },
            { label: "Don't", note: "Don't use banners for global site alerts — use System / Announcement Banner for that." },
            { label: "Don't", note: "Don't auto-dismiss a banner — unlike toasts, banners are persistent until the user acts." },
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
        <CodeBlock code={BANNER_CODE} />
      </section>

    </div>
  );
}
