"use client";
import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";

// ── Internal button used inside the dock ────────────────────────────────────
type DockVariant = "primary" | "secondary" | "ghost";

const DOCK_BTN_CLASSES: Record<DockVariant, string> = {
  primary:   "bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)] hover:bg-[var(--color-action-primary-hover)]",
  secondary: "bg-[var(--color-action-secondary)] text-[var(--color-text-primary)] border-2 border-[var(--color-action-secondary-border)] hover:bg-[var(--color-surface-hover)]",
  ghost:     "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
};

function DockButton({ variant, label }: { variant: DockVariant; label: string }) {
  return (
    <button
      className={[
        "flex h-14 w-full items-center justify-center rounded-[var(--radius-2xl)]",
        "text-[17px] font-medium transition-colors duration-[var(--duration-fast)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)]",
        DOCK_BTN_CLASSES[variant],
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ── Button Dock container ────────────────────────────────────────────────────
interface ButtonDockProps {
  primary?: string;
  secondary?: string;
  ghost?: string;
}

function ButtonDock({ primary = "Primary action", secondary, ghost }: ButtonDockProps) {
  return (
    <div className="flex w-full max-w-[393px] flex-col gap-3 p-4 bg-[var(--color-surface-page)]">
      {primary   && <DockButton variant="primary"   label={primary}   />}
      {secondary && <DockButton variant="secondary" label={secondary} />}
      {ghost     && <DockButton variant="ghost"     label={ghost}     />}
    </div>
  );
}

// ── Config examples ──────────────────────────────────────────────────────────
const CONFIGS = [
  {
    title: "3 buttons — Primary + Secondary + Ghost",
    desc:  "Full hierarchy: confirm action, alternative, and an escape hatch.",
    props: { primary: "Save changes", secondary: "Save as draft", ghost: "Discard" },
  },
  {
    title: "2 buttons — Primary + Secondary",
    desc:  "Standard confirm/cancel pattern. Most common configuration.",
    props: { primary: "Continue", secondary: "Go back" },
  },
  {
    title: "2 buttons — Primary + Ghost",
    desc:  "Use when the secondary action is very low emphasis.",
    props: { primary: "Submit application", ghost: "Maybe later" },
  },
  {
    title: "1 button — Primary only",
    desc:  "Single clear action with no alternatives.",
    props: { primary: "Get started" },
  },
] as const;

// ── Shared UI helpers ────────────────────────────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">{children}</h2>;
}

// ── Code snippet ─────────────────────────────────────────────────────────────
const DOCK_CODE = `// Button Dock — SLDS token implementation
// A vertical stack of full-width XL buttons, used at the bottom
// of a screen or form section (Mobile App, Web PWA).

const dockButtonStyles = {
  primary:
    'bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)] hover:bg-[var(--color-action-primary-hover)]',
  secondary:
    'bg-[var(--color-action-secondary)] text-[var(--color-text-primary)] border-2 border-[var(--color-action-secondary-border)] hover:bg-[var(--color-surface-hover)]',
  ghost:
    'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]',
};

type DockVariant = 'primary' | 'secondary' | 'ghost';

interface DockButtonProps {
  variant: DockVariant;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

function DockButton({ variant, label, onClick, disabled }: DockButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'flex h-14 w-full items-center justify-center rounded-[var(--radius-2xl)]',
        'text-[17px] font-medium transition-colors duration-[var(--duration-fast)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--gold-500)]',
        disabled
          ? 'bg-[var(--color-action-disabled-bg)] text-[var(--color-action-disabled-fg)] cursor-not-allowed'
          : dockButtonStyles[variant],
      ].join(' ')}
    >
      {label}
    </button>
  );
}

interface ButtonDockProps {
  primary:    { label: string; onClick?: () => void; disabled?: boolean };
  secondary?: { label: string; onClick?: () => void; disabled?: boolean };
  ghost?:     { label: string; onClick?: () => void; disabled?: boolean };
}

// Wrap this in a safe-area-inset container on mobile
export function ButtonDock({ primary, secondary, ghost }: ButtonDockProps) {
  return (
    <div className="flex w-full flex-col gap-3 p-4 bg-[var(--color-surface-page)]">
      <DockButton variant="primary"   {...primary}    />
      {secondary && <DockButton variant="secondary" {...secondary} />}
      {ghost     && <DockButton variant="ghost"     {...ghost}     />}
    </div>
  );
}

// Usage
<ButtonDock
  primary={{   label: "Save changes",  onClick: handleSave    }}
  secondary={{ label: "Save as draft", onClick: handleDraft   }}
  ghost={{     label: "Discard",       onClick: handleDiscard }}
/>`;

// ── Main spec component ──────────────────────────────────────────────────────
export function ButtonDockSpec() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="space-y-12">

      {/* Live Preview */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <SectionHeading>Live preview</SectionHeading>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
          >
            {isDark ? "☀ Light mode" : "☾ Dark mode"}
          </button>
        </div>
        <div className={isDark ? "dark" : ""}>
          <Card className="overflow-hidden">
            <div className="flex items-center justify-center p-8 bg-[var(--color-surface-page)]">
              <ButtonDock
                primary="Save changes"
                secondary="Save as draft"
                ghost="Discard"
              />
            </div>
            <p className="border-t border-[var(--color-border-decorative)] px-5 py-3 text-xs text-[var(--color-text-tertiary)] bg-[var(--color-surface-card)]">
              Full-width XL buttons, stacked vertically. Always Primary first, Ghost last.
            </p>
          </Card>
        </div>
      </section>

      {/* Configurations */}
      <section>
        <SectionHeading>Configurations</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {CONFIGS.map((cfg) => (
            <Card key={cfg.title} className="overflow-hidden">
              <div className="flex justify-center bg-[var(--color-surface-section-alt)] px-6 py-6">
                <ButtonDock {...cfg.props} />
              </div>
              <div className="border-t border-[var(--color-border-decorative)] px-5 py-4">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{cfg.title}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">{cfg.desc}</p>
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
            { prop: "Button size",    value: "Extra Large only · 56px height" },
            { prop: "Button width",   value: "Full-width (w-full) — stretches to container" },
            { prop: "Gap",            value: "--space-12 · 12px between buttons" },
            { prop: "Padding",        value: "--space-16 · 16px around the dock" },
            { prop: "Border radius",  value: "--radius-2xl · 24px per button" },
            { prop: "Order",          value: "Primary → Secondary → Ghost (top to bottom)" },
            { prop: "Max buttons",    value: "3 — one per variant" },
            { prop: "Platform",       value: "Mobile App, Web (PWA)" },
          ].map(({ prop, value }) => (
            <div key={prop} className="flex gap-4 px-5 py-3">
              <p className="w-36 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{prop}</p>
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
            { label: "Do",     note: "Use at the bottom of a screen or form section as the primary action area." },
            { label: "Do",     note: "Keep button labels short and action-oriented: 'Submit', 'Save', 'Continue'." },
            { label: "Do",     note: "Add safe-area-inset-bottom padding on mobile to avoid home indicator overlap." },
            { label: "Don't",  note: "Don't use more than 3 buttons — more than 3 choices overwhelms users." },
            { label: "Don't",  note: "Don't put two Primary buttons in the same dock." },
            { label: "Don't",  note: "Don't use Button Dock for inline page actions — use regular Buttons there." },
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
        <CodeBlock code={DOCK_CODE} />
      </section>

    </div>
  );
}
