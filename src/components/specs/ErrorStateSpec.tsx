"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

// ── Variant config ────────────────────────────────────────────────────────────
// Illustrations saved to /public/illustrations/ (downloaded from Figma)

const VARIANTS = {
  maintenance: {
    illustration: "/illustrations/error-maintenance.svg",
    code: null,
    title: "System is down for Maintenance",
    body: "We promise, we'll be right back!",
    cta: null,
  },
  "404": {
    illustration: "/illustrations/error-404.svg",
    code: "404",
    title: "Page not found",
    body: "Sorry we were unable to find that page",
    cta: "Go to Home",
  },
  "500": {
    illustration: "/illustrations/error-500.svg",
    code: "500",
    title: "This page isn't working",
    body: "We apologise and are fixing the problem. Please try again later.",
    cta: "Go to Home",
  },
  "401": {
    illustration: "/illustrations/error-401.svg",
    code: "401",
    title: "Unauthorized",
    body: "Something has gone wrong on the app's server",
    cta: "Go to Home",
  },
} as const;

type ErrorVariant = keyof typeof VARIANTS;

// ── ErrorState component ──────────────────────────────────────────────────────
// Container: flex-col items-center px-10
//   Error variants: gap-6 (24px) between text block and CTA
//   Maintenance: gap-0 (no CTA)
// Text block: gap-1.5 (6px) px-8 text-center
// Illustration: 216×180px
// Error code: 36px / leading-[44px] / tracking-[-2px] / --color-text-tertiary
// Title: 17px font-medium leading-6 / --color-text-primary
// Body: 14px leading-5 / --color-text-secondary
// CTA: secondary button h-12 border-2 rounded-[--radius-lg] (12px)

interface ErrorStateProps {
  variant: ErrorVariant;
  onHome?: () => void;
}

function ErrorState({ variant, onHome }: ErrorStateProps) {
  const cfg = VARIANTS[variant];
  const hasCta = cfg.cta !== null;

  return (
    <div
      className={[
        "flex w-full max-w-[393px] flex-col items-center px-10",
        hasCta ? "gap-6" : "gap-0",
      ].join(" ")}
    >
      {/* Text block ─────────────────────────────────────────────────────────── */}
      <div className="flex w-full flex-col items-center gap-1.5 px-8 text-center">
        {/* Illustration slot + optional error code */}
        <div className="flex flex-col items-center gap-0">
          <Image
            src={cfg.illustration}
            alt=""
            width={216}
            height={180}
            className="h-[180px] w-[216px] shrink-0 object-contain"
          />
          {cfg.code && (
            <p className="text-[36px] font-medium leading-[44px] tracking-[-2px] text-[var(--color-text-tertiary)]">
              {cfg.code}
            </p>
          )}
        </div>

        {/* Title */}
        <p className="text-[17px] font-medium leading-6 tracking-[0px] text-[var(--color-text-primary)]">
          {cfg.title}
        </p>

        {/* Body */}
        <p className="text-[14px] leading-5 tracking-[0px] text-[var(--color-text-secondary)]">
          {cfg.body}
        </p>
      </div>

      {/* CTA ─────────────────────────────────────────────────────────────────── */}
      {hasCta && (
        <button
          onClick={onHome}
          className="h-12 rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] bg-[var(--color-action-secondary)] px-4 text-[17px] font-medium leading-6 tracking-[0px] text-[var(--color-text-primary)]"
        >
          {cfg.cta}
        </button>
      )}
    </div>
  );
}

// ── Code snippet ──────────────────────────────────────────────────────────────

const ERROR_STATE_CODE = `const VARIANTS = {
  maintenance: {
    illustration: "/illustrations/error-maintenance.svg",
    code: null,
    title: "System is down for Maintenance",
    body: "We promise, we'll be right back!",
    cta: null,
  },
  "404": {
    illustration: "/illustrations/error-404.svg",
    code: "404",
    title: "Page not found",
    body: "Sorry we were unable to find that page",
    cta: "Go to Home",
  },
  "500": {
    illustration: "/illustrations/error-500.svg",
    code: "500",
    title: "This page isn't working",
    body: "We apologise and are fixing the problem. Please try again later.",
    cta: "Go to Home",
  },
  "401": {
    illustration: "/illustrations/error-401.svg",
    code: "401",
    title: "Unauthorized",
    body: "Something has gone wrong on the app's server",
    cta: "Go to Home",
  },
} as const;

type ErrorVariant = keyof typeof VARIANTS;

interface ErrorStateProps {
  variant: ErrorVariant;
  onHome?: () => void;
}

export function ErrorState({ variant, onHome }: ErrorStateProps) {
  const cfg = VARIANTS[variant];
  const hasCta = cfg.cta !== null;

  return (
    <div className={\`flex w-full max-w-[393px] flex-col items-center px-10 \${hasCta ? "gap-6" : "gap-0"}\`}>
      <div className="flex w-full flex-col items-center gap-1.5 px-8 text-center">
        <div className="flex flex-col items-center">
          <img src={cfg.illustration} alt="" width={216} height={180} className="h-[180px] w-[216px] object-contain" />
          {cfg.code && (
            <p className="text-[36px] font-medium leading-[44px] tracking-[-2px] text-[var(--color-text-tertiary)]">
              {cfg.code}
            </p>
          )}
        </div>
        <p className="text-[17px] font-medium leading-6 tracking-[0px] text-[var(--color-text-primary)]">
          {cfg.title}
        </p>
        <p className="text-[14px] leading-5 tracking-[0px] text-[var(--color-text-secondary)]">
          {cfg.body}
        </p>
      </div>
      {hasCta && (
        <button
          onClick={onHome}
          className="h-12 rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] bg-[var(--color-action-secondary)] px-4 text-[17px] font-medium leading-6 tracking-[0px] text-[var(--color-text-primary)]"
        >
          {cfg.cta}
        </button>
      )}
    </div>
  );
}

// Usage — drop inside your error boundary or page component
<ErrorState variant="404" onHome={() => router.push("/")} />
<ErrorState variant="500" onHome={() => router.push("/")} />
<ErrorState variant="401" onHome={() => router.push("/")} />
<ErrorState variant="maintenance" />`;

// ── Spec ──────────────────────────────────────────────────────────────────────

const ALL_VARIANTS: { key: ErrorVariant; label: string }[] = [
  { key: "maintenance", label: "Maintenance" },
  { key: "404",         label: "404 — Not found" },
  { key: "500",         label: "500 — Server error" },
  { key: "401",         label: "401 — Unauthorised" },
];

export function ErrorStateSpec() {
  const [isDark, setIsDark] = useState(false);
  const [activeVariant, setActiveVariant] = useState<ErrorVariant>("404");
  const [homeClicked, setHomeClicked] = useState(false);

  return (
    <div className="space-y-14">

      {/* ── Live preview ─────────────────────────────────────────────────── */}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading>Live preview</SectionHeading>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
          >
            {isDark ? "☀ Light mode" : "☾ Dark mode"}
          </button>
        </div>

        {/* Variant picker */}
        <div className="flex flex-wrap gap-2">
          {ALL_VARIANTS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setActiveVariant(key); setHomeClicked(false); }}
              className={[
                "rounded-[var(--radius-md)] border px-3 py-1 text-xs font-medium transition-colors",
                key === activeVariant
                  ? "border-[var(--color-action-primary)] bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)]"
                  : "border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] text-[var(--color-text-secondary)]",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Stage */}
        <div
          className={[
            "flex min-h-[460px] items-center justify-center rounded-[var(--radius-xl)] p-10",
            isDark
              ? "dark bg-[var(--color-surface-page)]"
              : "border border-[var(--color-border-decorative)] bg-[var(--color-surface-section-alt)]",
          ].join(" ")}
        >
          {homeClicked ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-2xl">→</p>
              <p className="text-sm text-[var(--color-text-secondary)]">"Go to Home" tapped</p>
              <button
                onClick={() => setHomeClicked(false)}
                className="text-xs underline text-[var(--color-text-tertiary)]"
              >
                Reset
              </button>
            </div>
          ) : (
            <ErrorState
              variant={activeVariant}
              onHome={() => setHomeClicked(true)}
            />
          )}
        </div>
      </section>

      {/* ── All variants ─────────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>All variants</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {ALL_VARIANTS.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-3">
              <p className="text-xs font-medium text-[var(--color-text-tertiary)]">{label}</p>
              <div className="flex items-center justify-center rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-section-alt)] py-10">
                <ErrorState variant={key} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Anatomy & tokens ─────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { layer: "Outer container",   token: "flex-col · items-center · px-10 (40px) · max-w-[393px] · gap-6 (errors) / gap-0 (maintenance)" },
            { layer: "Text block",        token: "flex-col · items-center · gap-1.5 (6px) · px-8 (32px) · text-center" },
            { layer: "Illustration",      token: "216 × 180 px · object-contain · images in /public/illustrations/" },
            { layer: "Error code",        token: "36px · font-medium · leading-[44px] · tracking-[-2px] · --color-text-tertiary (#b8bdc4)" },
            { layer: "Title",             token: "17px · font-medium · leading-6 · tracking-0 · --color-text-primary" },
            { layer: "Body",              token: "14px · leading-5 · tracking-0 · --color-text-secondary" },
            { layer: "CTA button",        token: "h-12 (48px) · border-2 · border-[--color-border-default] · bg-[--color-action-secondary]" },
            { layer: "CTA radius",        token: "rounded-[--radius-lg] (12px) — Figma --radius-2xl fallback 12px" },
            { layer: "CTA text",          token: "17px · font-medium · leading-6 · tracking-0 · --color-text-primary" },
            { layer: "Maintenance CTA",   token: "None — maintenance state has no call to action" },
          ].map(({ layer, token }) => (
            <div key={layer} className="flex gap-4 px-5 py-3">
              <p className="w-40 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{layer}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{token}</p>
            </div>
          ))}
        </Card>
      </section>

      {/* ── Usage ─────────────────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { label: "Do",    note: "Use 404 for missing pages, 500 for server/network failures, 401 for auth-gated pages, Maintenance for planned downtime." },
            { label: "Do",    note: "Always provide an onHome handler so users have a clear recovery path from 404, 500, and 401 states." },
            { label: "Do",    note: "Use the Maintenance variant without a CTA — returning home won't help if the whole system is down." },
            { label: "Do",    note: "Render Error State inside your error boundary (Next.js error.tsx / React ErrorBoundary) so it captures unexpected runtime errors." },
            { label: "Don't", note: "Don't show an error code for Maintenance — it implies a broken request, not planned downtime." },
            { label: "Don't", note: "Don't use generic copy like 'Something went wrong'. Each variant has specific, approved copy — use it as-is." },
            { label: "Don't", note: "Don't swap illustrations between variants. Each illustration is paired with its error type in the Figma design." },
            { label: "Don't", note: "Don't add secondary CTAs (e.g. 'Contact Support') — keep one escape route. Add support links in the page footer instead." },
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
        <CodeBlock code={ERROR_STATE_CODE} />
      </section>

    </div>
  );
}
