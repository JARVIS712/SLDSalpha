"use client";
import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

// ── Illustration SVGs ────────────────────────────────────────────────────────

function FolderIllustration() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="h-full w-full" aria-hidden="true">
      <rect x="14" y="62" width="152" height="106" rx="14" fill="#c9cdd5" />
      <path d="M14 62 Q14 48 26 48 H70 Q82 48 88 62 H14Z" fill="#c9cdd5" />
      <rect x="22" y="70" width="136" height="98" rx="11" fill="#e4e7ed" />
      <rect x="46" y="104" width="88" height="6" rx="3" fill="#c9cdd5" />
      <rect x="54" y="118" width="72" height="6" rx="3" fill="#c9cdd5" />
      <circle cx="138" cy="72" r="22" fill="#1f2937" />
      <rect x="128" y="70" width="20" height="5" rx="2.5" fill="white" />
      <rect x="135.5" y="62.5" width="5" height="20" rx="2.5" fill="white" />
    </svg>
  );
}

function SearchIllustration() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="h-full w-full" aria-hidden="true">
      <circle cx="80" cy="82" r="54" fill="#e4e7ed" />
      <circle cx="80" cy="82" r="38" fill="#f2f4f7" />
      <circle cx="80" cy="82" r="38" stroke="#c9cdd5" strokeWidth="6" />
      <rect x="118" y="118" width="48" height="14" rx="7" fill="#c9cdd5" transform="rotate(40 118 118)" />
      <text x="80" y="100" textAnchor="middle" fill="#9ca3af" fontSize="40" fontFamily="sans-serif" fontWeight="700">?</text>
    </svg>
  );
}

function BellIllustration() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="h-full w-full" aria-hidden="true">
      <path d="M90 28 C60 28 42 54 42 82 L42 118 L138 118 L138 82 C138 54 120 28 90 28Z" fill="#e4e7ed" />
      <circle cx="90" cy="26" r="10" fill="#c9cdd5" />
      <path d="M68 118 Q68 140 90 140 Q112 140 112 118Z" fill="#c9cdd5" />
      <rect x="58" y="90" width="64" height="8" rx="4" fill="#c9cdd5" />
      <rect x="66" y="106" width="48" height="8" rx="4" fill="#c9cdd5" />
    </svg>
  );
}

function InboxIllustration() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="h-full w-full" aria-hidden="true">
      <rect x="20" y="52" width="140" height="100" rx="12" fill="#e4e7ed" />
      <path d="M20 80 L90 112 L160 80" stroke="#c9cdd5" strokeWidth="6" fill="none" strokeLinejoin="round" />
      <path d="M20 80 L20 52 Q20 42 30 42 H150 Q160 42 160 52 L160 80 L90 112 Z" fill="#f2f4f7" stroke="#c9cdd5" strokeWidth="4" />
      <rect x="56" y="64" width="68" height="6" rx="3" fill="#c9cdd5" />
      <rect x="64" y="78" width="52" height="6" rx="3" fill="#c9cdd5" />
    </svg>
  );
}

// ── EmptyState component ────────────────────────────────────────────────────
// Container: flex-col gap-3 items-center · max-w-[361px]
// Text block: gap-6 · inner text gap-1.5 px-8 text-center
// CTA: h-12 rounded-[--radius-lg] primary button

interface EmptyStateProps {
  illustration?: React.ReactNode;
  title: string;
  body?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

function EmptyState({ illustration, title, body, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <div className="flex w-full max-w-[361px] flex-col items-center gap-3">
      {illustration && (
        <div className="h-[180px] w-[181px] shrink-0">
          {illustration}
        </div>
      )}
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-1.5 px-8 text-center">
          <p className="text-[17px] font-medium leading-6 tracking-[0px] text-[var(--color-text-primary)]">
            {title}
          </p>
          {body && (
            <p className="text-[14px] leading-5 tracking-[0px] text-[var(--color-text-secondary)]">
              {body}
            </p>
          )}
        </div>
        {ctaLabel && (
          <button
            onClick={onCta}
            className="h-12 rounded-[var(--radius-lg)] bg-[var(--color-action-primary)] px-4 text-[17px] font-medium leading-6 tracking-[0px] text-[var(--color-action-primary-foreground)]"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Code snippet ─────────────────────────────────────────────────────────────

const EMPTY_STATE_CODE = `interface EmptyStateProps {
  illustration?: React.ReactNode;
  title: string;
  body?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export function EmptyState({ illustration, title, body, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <div className="flex w-full max-w-[361px] flex-col items-center gap-3">
      {illustration && (
        <div className="h-[180px] w-[181px] shrink-0">
          {illustration}
        </div>
      )}
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-1.5 px-8 text-center">
          <p className="text-[17px] font-medium leading-6 tracking-[0px] text-[var(--color-text-primary)]">
            {title}
          </p>
          {body && (
            <p className="text-[14px] leading-5 tracking-[0px] text-[var(--color-text-secondary)]">
              {body}
            </p>
          )}
        </div>
        {ctaLabel && (
          <button
            onClick={onCta}
            className="h-12 rounded-[var(--radius-lg)] bg-[var(--color-action-primary)] px-4 text-[17px] font-medium leading-6 tracking-[0px] text-[var(--color-action-primary-foreground)]"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// Usage
<EmptyState
  illustration={<FolderIllustration />}
  title="No documents added yet"
  body="Your uploaded documents will appear here once added."
  ctaLabel="Add Document"
  onCta={handleAdd}
/>`;

// ── Scenarios for static preview grid ───────────────────────────────────────

const SCENARIOS = [
  {
    id: "documents",
    illustration: <FolderIllustration />,
    title: "No documents added yet",
    body: "Your uploaded documents will appear here once added.",
    ctaLabel: "Add Document",
  },
  {
    id: "search",
    illustration: <SearchIllustration />,
    title: "No results found",
    body: "Try adjusting your search or clearing your filters.",
    ctaLabel: "Clear filters",
  },
  {
    id: "notifications",
    illustration: <BellIllustration />,
    title: "You're all caught up",
    body: "New notifications will appear here when they arrive.",
    ctaLabel: undefined,
  },
  {
    id: "inbox",
    illustration: <InboxIllustration />,
    title: "Your inbox is empty",
    body: "Messages from your team will show up here.",
    ctaLabel: "Compose message",
  },
] as const;

// ── Spec ─────────────────────────────────────────────────────────────────────

export function EmptyStateSpec() {
  const [isDark, setIsDark] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);
  const [ctaClicked, setCtaClicked] = useState(false);

  const scenario = SCENARIOS[activeScenario];

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

        {/* Scenario picker */}
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setActiveScenario(i); setCtaClicked(false); }}
              className={[
                "rounded-[var(--radius-md)] border px-3 py-1 text-xs font-medium transition-colors",
                i === activeScenario
                  ? "border-[var(--color-action-primary)] bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)]"
                  : "border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] text-[var(--color-text-secondary)]",
              ].join(" ")}
            >
              {s.title.split(" ").slice(0, 2).join(" ")}…
            </button>
          ))}
        </div>

        {/* Demo stage */}
        <div
          className={[
            "flex min-h-[420px] items-center justify-center rounded-[var(--radius-xl)] p-10",
            isDark
              ? "dark bg-[var(--color-surface-page)]"
              : "border border-[var(--color-border-decorative)] bg-[var(--color-surface-section-alt)]",
          ].join(" ")}
        >
          {ctaClicked ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-2xl">✓</p>
              <p className="text-sm text-[var(--color-text-secondary)]">CTA tapped - &quot;{scenario.ctaLabel}&quot;</p>
              <button
                onClick={() => setCtaClicked(false)}
                className="text-xs underline text-[var(--color-text-tertiary)]"
              >
                Reset
              </button>
            </div>
          ) : (
            <EmptyState
              illustration={scenario.illustration}
              title={scenario.title}
              body={scenario.body}
              ctaLabel={scenario.ctaLabel}
              onCta={() => setCtaClicked(true)}
            />
          )}
        </div>
      </section>

      {/* ── All scenarios grid ────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>All scenarios</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {SCENARIOS.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-center rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-section-alt)] p-8"
            >
              <EmptyState
                illustration={s.illustration}
                title={s.title}
                body={s.body}
                ctaLabel={s.ctaLabel}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── No-illustration variant ───────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Text-only variant</SectionHeading>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Omit the illustration prop for inline or compact empty states.
        </p>
        <div className="flex items-center justify-center rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-section-alt)] p-10">
          <EmptyState
            title="Nothing here yet"
            body="Items you save will appear in this list."
            ctaLabel="Get started"
          />
        </div>
      </section>

      {/* ── Anatomy & tokens ─────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { layer: "Container",          token: "flex-col · items-center · gap-3 (12px) · max-w-[361px]" },
            { layer: "Illustration slot",  token: "180 × 181 px · shrink-0 · accepts any React node · optional" },
            { layer: "Text block gap",     token: "gap-6 (24px) between text group and CTA — Figma --spacing-3xl" },
            { layer: "Title/body gap",     token: "gap-1.5 (6px) — Figma --spacing-sm" },
            { layer: "Text padding",       token: "px-8 (32px) horizontal · text-center" },
            { layer: "Title",              token: "17px · font-medium · leading-6 · tracking-0 · --color-text-primary" },
            { layer: "Body",               token: "14px · font-normal · leading-5 · tracking-0 · --color-text-secondary · optional" },
            { layer: "CTA button",         token: "h-12 (48px) · rounded-[--radius-lg] (12px) · px-4 · 17px font-medium" },
            { layer: "CTA bg",             token: "--color-action-primary (gold-500 · #ffc700)" },
            { layer: "CTA text",           token: "--color-action-primary-foreground (#111)" },
          ].map(({ layer, token }) => (
            <div key={layer} className="flex gap-4 px-5 py-3">
              <p className="w-36 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{layer}</p>
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
            { label: "Do",    note: "Use an illustration that matches the context — folders for files, envelopes for inbox, magnifier for search results." },
            { label: "Do",    note: "Keep the title short (4–6 words) and the body to one sentence. The user already knows why it's empty." },
            { label: "Do",    note: "Only include a CTA when there's a direct, obvious action the user can take from here." },
            { label: "Do",    note: "Use the text-only variant inside tables, lists, or panels where an illustration would overwhelm the surrounding UI." },
            { label: "Don't", note: "Don't say 'No data'. Always be specific — 'No documents added yet', 'No notifications', etc." },
            { label: "Don't", note: "Don't include more than one CTA. If recovery requires multiple steps, describe them in the body text." },
            { label: "Don't", note: "Don't use the empty state as a loading state — use a Skeleton or Spinner while content is fetching." },
            { label: "Don't", note: "Don't change the illustration slot size (180×181px). Scale your artwork to fit rather than resizing the slot." },
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
        <CodeBlock code={EMPTY_STATE_CODE} />
      </section>

    </div>
  );
}
