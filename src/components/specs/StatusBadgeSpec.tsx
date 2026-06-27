"use client";
import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

// ── Badge config — exact Figma --badge/* token fallbacks (light + dark) ───────

const BADGE_CONFIG = {
  Success:    { light: { bg: "#e0f2ec", text: "#1faa63" }, dark: { bg: "#062b1a", text: "#5dc896" } },
  Pending:    { light: { bg: "#fff8d6", text: "#b38a00" }, dark: { bg: "#2e2200", text: "#b38a00" } },
  Error:      { light: { bg: "#fdecea", text: "#d32f2f" }, dark: { bg: "#330d0d", text: "#d32f2f" } },
  Info:       { light: { bg: "#f5f6f8", text: "#0d6b7b" }, dark: { bg: "#1f2937", text: "#7dd8e8" } },
  Neutral:    { light: { bg: "#f5f6f8", text: "#676c73" }, dark: { bg: "#1f2937", text: "#b8bdc4" } },
  Draft:      { light: { bg: "#f5f6f8", text: "#676c73" }, dark: { bg: "#2e1800", text: "#b8bdc4" } },
  Submitted:  { light: { bg: "#d0f0f5", text: "#0e9db0" }, dark: { bg: "#0a1733", text: "#67d2e1" } },
  "In Review":{ light: { bg: "#e3edff", text: "#1a56d6" }, dark: { bg: "#0a1733", text: "#93c5fd" } },
  Approved:   { light: { bg: "#e0f2ec", text: "#059669" }, dark: { bg: "#064e3b", text: "#34d399" } },
  Rejected:   { light: { bg: "#fdecea", text: "#d32f2f" }, dark: { bg: "#7f1d1d", text: "#f87171" } },
  Escalated:  { light: { bg: "#fef0e3", text: "#f57c00" }, dark: { bg: "#2e1800", text: "#ffd01a" } },
  "On Hold":  { light: { bg: "#ede9ff", text: "#6747c7" }, dark: { bg: "#1a0f38", text: "#a78bfa" } },
  Archived:   { light: { bg: "#f5f6f8", text: "#b8bdc4" }, dark: { bg: "#111111", text: "#676c73" } },
} as const;

export type BadgeType = keyof typeof BADGE_CONFIG;

// ── StatusBadge component ─────────────────────────────────────────────────────
// px-3 (12px) · py-1 (4px) · rounded-[--radius-xl] (16px, Figma --radius-3xl fallback)
// 15px · font-normal · leading-5 · tracking-0 · whitespace-nowrap
// Colors via inline style — Figma --badge/* tokens not in globals.css

export function StatusBadge({
  type,
  darkMode = false,
}: {
  type: BadgeType;
  darkMode?: boolean;
}) {
  const colors = darkMode ? BADGE_CONFIG[type].dark : BADGE_CONFIG[type].light;
  return (
    <span
      style={{ backgroundColor: colors.bg, color: colors.text }}
      className="inline-flex items-center justify-center rounded-[var(--radius-xl)] px-3 py-1 text-[15px] leading-5 tracking-[0px] whitespace-nowrap"
    >
      {type}
    </span>
  );
}

// ── Grouped for display ───────────────────────────────────────────────────────

const GROUPS: { label: string; types: BadgeType[] }[] = [
  { label: "Semantic states",    types: ["Success", "Pending", "Error", "Info", "Neutral"] },
  { label: "Content & document", types: ["Draft", "Submitted", "Archived"] },
  { label: "Workflow (Dashboard)", types: ["In Review", "Approved", "Rejected", "Escalated", "On Hold"] },
];

// ── Code snippet ──────────────────────────────────────────────────────────────

const BADGE_CODE = `// StatusBadge — SLDS token implementation
// Colors use Figma's --badge/* semantic token fallbacks (inline styles)
// Pass darkMode prop when rendering inside a dark surface

const BADGE_CONFIG = {
  Success:    { light: { bg: "#e0f2ec", text: "#1faa63" }, dark: { bg: "#062b1a", text: "#5dc896" } },
  Pending:    { light: { bg: "#fff8d6", text: "#b38a00" }, dark: { bg: "#2e2200", text: "#b38a00" } },
  Error:      { light: { bg: "#fdecea", text: "#d32f2f" }, dark: { bg: "#330d0d", text: "#d32f2f" } },
  Info:       { light: { bg: "#f5f6f8", text: "#0d6b7b" }, dark: { bg: "#1f2937", text: "#7dd8e8" } },
  Neutral:    { light: { bg: "#f5f6f8", text: "#676c73" }, dark: { bg: "#1f2937", text: "#b8bdc4" } },
  Draft:      { light: { bg: "#f5f6f8", text: "#676c73" }, dark: { bg: "#2e1800", text: "#b8bdc4" } },
  Submitted:  { light: { bg: "#d0f0f5", text: "#0e9db0" }, dark: { bg: "#0a1733", text: "#67d2e1" } },
  "In Review":{ light: { bg: "#e3edff", text: "#1a56d6" }, dark: { bg: "#0a1733", text: "#93c5fd" } },
  Approved:   { light: { bg: "#e0f2ec", text: "#059669" }, dark: { bg: "#064e3b", text: "#34d399" } },
  Rejected:   { light: { bg: "#fdecea", text: "#d32f2f" }, dark: { bg: "#7f1d1d", text: "#f87171" } },
  Escalated:  { light: { bg: "#fef0e3", text: "#f57c00" }, dark: { bg: "#2e1800", text: "#ffd01a" } },
  "On Hold":  { light: { bg: "#ede9ff", text: "#6747c7" }, dark: { bg: "#1a0f38", text: "#a78bfa" } },
  Archived:   { light: { bg: "#f5f6f8", text: "#b8bdc4" }, dark: { bg: "#111111", text: "#676c73" } },
} as const;

type BadgeType = keyof typeof BADGE_CONFIG;

export function StatusBadge({ type, darkMode = false }: { type: BadgeType; darkMode?: boolean }) {
  const colors = darkMode ? BADGE_CONFIG[type].dark : BADGE_CONFIG[type].light;
  return (
    <span
      style={{ backgroundColor: colors.bg, color: colors.text }}
      className="inline-flex items-center justify-center rounded-[var(--radius-xl)] px-3 py-1 text-[15px] leading-5 tracking-[0px] whitespace-nowrap"
    >
      {type}
    </span>
  );
}

// Usage
<StatusBadge type="Approved" />
<StatusBadge type="Pending" darkMode={isDark} />`;

// ── Sample table rows for "in context" demo ───────────────────────────────────

const SAMPLE_ROWS: { name: string; ref: string; badge: BadgeType }[] = [
  { name: "Birth Certificate Request",    ref: "REF-00412", badge: "Approved"  },
  { name: "National ID Renewal",          ref: "REF-00387", badge: "In Review" },
  { name: "Land Registry Update",         ref: "REF-00394", badge: "Pending"   },
  { name: "Driving Licence Application",  ref: "REF-00401", badge: "Draft"     },
  { name: "Passport Renewal",             ref: "REF-00378", badge: "Rejected"  },
  { name: "Business Registration",        ref: "REF-00366", badge: "Submitted" },
];

// ── Spec ──────────────────────────────────────────────────────────────────────

export function StatusBadgeSpec() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="space-y-14">

      {/* ── All variants ─────────────────────────────────────────────────── */}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading>All variants</SectionHeading>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
          >
            {isDark ? "☀ Light mode" : "☾ Dark mode"}
          </button>
        </div>

        {/* Preview area — surface-page (white) so Info/Neutral/Draft/Archived badges are visible */}
        <div
          style={isDark ? { backgroundColor: "#111" } : undefined}
          className={[
            "rounded-[var(--radius-xl)] p-6",
            isDark
              ? "border border-[#2a2a2a]"
              : "border border-[var(--color-border-decorative)] bg-[var(--color-surface-page)]",
          ].join(" ")}
        >
          <div className="space-y-6">
            {GROUPS.map(({ label, types }) => (
              <div key={label}>
                <p
                  className="mb-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: isDark ? "#676c73" : "var(--color-text-tertiary)" }}
                >
                  {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <StatusBadge key={type} type={type} darkMode={isDark} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── In context ───────────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>In context — service applications table</SectionHeading>
        <Card>
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[var(--color-border-decorative)] px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Service</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Reference</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Status</p>
          </div>
          <div className="divide-y divide-[var(--color-border-decorative)]">
            {SAMPLE_ROWS.map(({ name, ref, badge }) => (
              <div key={ref} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-3">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{name}</p>
                <p className="font-mono text-xs text-[var(--color-text-tertiary)]">{ref}</p>
                <StatusBadge type={badge} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ── Anatomy & tokens ─────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>

        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { prop: "Padding",       value: "px-3 (12px) · py-1 (4px)" },
            { prop: "Border-radius", value: "rounded-[var(--radius-xl)] — 16px (Figma --radius-3xl fallback 16px)" },
            { prop: "Typography",    value: "15px · font-normal · leading-5 (20px) · tracking-0 · whitespace-nowrap" },
            { prop: "Colors",        value: "Inline style via BADGE_CONFIG light/dark pairs — Figma --badge/* fallbacks" },
            { prop: "Display",       value: "inline-flex · items-center · justify-center" },
          ].map(({ prop, value }) => (
            <div key={prop} className="flex gap-4 px-5 py-3">
              <p className="w-36 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{prop}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{value}</p>
            </div>
          ))}
        </Card>

        {/* Colour reference table — light + dark side by side */}
        <p className="mt-2 text-sm font-medium text-[var(--color-text-secondary)]">Colour reference — light / dark</p>
        <Card>
          <div className="grid grid-cols-[140px_1fr_1fr] gap-3 border-b border-[var(--color-border-decorative)] px-5 py-2">
            {["Variant", "Light", "Dark"].map((h) => (
              <p key={h} className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">{h}</p>
            ))}
          </div>
          <div className="divide-y divide-[var(--color-border-decorative)]">
            {(Object.keys(BADGE_CONFIG) as BadgeType[]).map((type) => {
              const { light, dark } = BADGE_CONFIG[type];
              return (
                <div key={type} className="grid grid-cols-[140px_1fr_1fr] items-center gap-3 px-5 py-2.5">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{type}</p>
                  {/* Light cell */}
                  <div className="flex flex-col gap-1">
                    <StatusBadge type={type} darkMode={false} />
                    <p className="font-mono text-[10px] text-[var(--color-text-tertiary)]">
                      bg {light.bg} · text {light.text}
                    </p>
                  </div>
                  {/* Dark cell */}
                  <div className="flex flex-col gap-1">
                    <StatusBadge type={type} darkMode={true} />
                    <p className="font-mono text-[10px] text-[var(--color-text-tertiary)]">
                      bg {dark.bg} · text {dark.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      {/* ── Usage ─────────────────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { label: "Do",    note: "Use semantic states (Success, Pending, Error) for system-generated status. Use workflow states (In Review, Approved, Rejected) for human-assigned case status on Dashboard." },
            { label: "Do",    note: "Pass darkMode prop when rendering inside a dark surface so badge colors switch to their dark variants." },
            { label: "Do",    note: "Use Archived for soft-deleted or closed records — it is visually de-emphasised to signal low importance." },
            { label: "Do",    note: "On Mobile and Web: use only the 7 core states — Success, Pending, Error, Info, Neutral, Draft, Submitted. Escalated, On Hold, and the full workflow set are Dashboard-only." },
            { label: "Don't", note: "Don't create ad-hoc badge colors. All 13 variants are defined — pick the closest semantic match." },
            { label: "Don't", note: "Don't use Error for workflow rejection — use Rejected. Error is for system failures (network errors, validation failures)." },
            { label: "Don't", note: "Don't truncate the badge label — all labels are 1–2 words by design. Never clip with overflow-hidden or max-width." },
            { label: "Don't", note: "Don't use multiple badges on the same item. One status per record." },
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

      {/* ── Code ──────────────────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={BADGE_CODE} />
      </section>

    </div>
  );
}
