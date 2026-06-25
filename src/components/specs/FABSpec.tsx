"use client";
import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";

type Variant = "primary" | "secondary" | "destructive";
type BState = "default" | "hover" | "focus" | "pressed" | "disabled" | "loading";

const VARIANTS: Variant[] = ["primary", "secondary", "destructive"];
const STATES: BState[] = ["default", "hover", "focus", "pressed", "disabled", "loading"];

const VARIANT_LABELS: Record<Variant, string> = {
  primary: "Primary", secondary: "Secondary", destructive: "Destructive",
};

const LIVE_VARIANT_CLASSES: Record<Variant, string> = {
  primary:     "bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)] hover:bg-[var(--color-action-primary-hover)] active:bg-[var(--color-action-primary-pressed)]",
  secondary:   "bg-[var(--color-action-secondary)] text-[var(--color-action-secondary-foreground)] border-2 border-[var(--color-action-secondary-border)] hover:bg-[var(--color-action-secondary-hover)]",
  destructive: "bg-[var(--red-600)] text-white hover:bg-[var(--red-700)]",
};

// FAB uses radius-full (fully circular) and shadow-lg
const FAB_BASE = [
  "inline-flex size-14 shrink-0 items-center justify-center rounded-full",
  "shadow-[var(--shadow-lg)] transition-[background-color,box-shadow] duration-[var(--duration-fast)]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)]",
].join(" ");

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      <path d="M17.5 10a7.5 7.5 0 0 0-7.5-7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LiveFAB({ variant }: { variant: Variant }) {
  return (
    <button aria-label={`${VARIANT_LABELS[variant]} floating action button`} className={`${FAB_BASE} ${LIVE_VARIANT_CLASSES[variant]}`}>
      <PlusIcon />
    </button>
  );
}

function getStateStyle(variant: Variant, state: BState): React.CSSProperties {
  if (state === "disabled" || state === "loading") {
    return { background: "var(--color-action-disabled-bg)", color: "var(--color-action-disabled-fg)", border: "2px solid transparent", cursor: "not-allowed", boxShadow: "none" };
  }
  const active = state === "hover" || state === "pressed";
  const ring: React.CSSProperties = state === "focus" ? { outline: "2px solid var(--gold-500)", outlineOffset: "2px" } : {};
  const shadow = "0px 10px 15px -3px rgba(0,0,0,0.12)";
  switch (variant) {
    case "primary":
      return { background: active ? "var(--color-action-primary-hover)" : "var(--color-action-primary)", color: "var(--color-action-primary-foreground)", border: "2px solid transparent", boxShadow: shadow, ...ring };
    case "secondary":
      return { background: active ? "var(--color-action-secondary-hover)" : "var(--color-action-secondary)", color: "var(--color-action-secondary-foreground)", border: "2px solid var(--color-action-secondary-border)", boxShadow: shadow, ...ring };
    case "destructive":
      return { background: active ? "var(--red-700)" : "var(--red-600)", color: "#ffffff", border: "2px solid transparent", boxShadow: shadow, ...ring };
  }
}

function StateDemoFAB({ variant, state }: { variant: Variant; state: BState }) {
  return (
    <div
      style={{
        ...getStateStyle(variant, state),
        width: 56, height: 56,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "9999px",
        userSelect: "none", flexShrink: 0,
      }}
    >
      {state === "loading" ? <Spinner /> : <PlusIcon />}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] ${className}`}>{children}</div>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">{children}</h2>;
}

const FAB_CODE = `// Floating Action Button — SLDS token implementation
// FAB is always fully circular (radius-full) with elevation/shadow.
// Mobile only: one FAB per screen for the single primary action.

type Variant = 'primary' | 'secondary' | 'destructive';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)] hover:bg-[var(--color-action-primary-hover)]',
  secondary:
    'bg-[var(--color-action-secondary)] text-[var(--color-action-secondary-foreground)] border-2 border-[var(--color-action-secondary-border)] hover:bg-[var(--color-action-secondary-hover)]',
  destructive:
    'bg-[var(--red-600)] text-white hover:bg-[var(--red-700)]',
};

interface FABProps {
  variant?: Variant;
  icon: React.ReactNode;
  label: string; // required aria-label
  disabled?: boolean;
  onClick?: () => void;
}

export function FAB({ variant = 'primary', icon, label, disabled, onClick }: FABProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        'inline-flex size-14 items-center justify-center rounded-full',
        'shadow-[var(--shadow-lg)] transition-[background-color,box-shadow]',
        'duration-[var(--duration-fast)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--gold-500)]',
        disabled
          ? 'bg-[var(--color-action-disabled-bg)] text-[var(--color-action-disabled-fg)] shadow-none cursor-not-allowed'
          : variantStyles[variant],
      ].join(' ')}
    >
      {icon}
    </button>
  );
}`;

export function FABSpec() {
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
          <Card className="p-6">
            <div className="flex flex-wrap items-end gap-4">
              {VARIANTS.map((v) => (
                <div key={v} className="flex flex-col items-center gap-2">
                  <LiveFAB variant={v} />
                  <span className="text-xs text-[var(--color-text-tertiary)]">{VARIANT_LABELS[v]}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[var(--color-text-tertiary)]">
              FAB is always 56×56px, fully circular, with Elevation/3 shadow. Mobile-only pattern.
            </p>
          </Card>
        </div>
      </section>

      {/* Variants & States */}
      <section>
        <SectionHeading>Variants &amp; states</SectionHeading>
        <div className="overflow-x-auto">
          <Card>
            <table className="w-full min-w-[400px] text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-decorative)]">
                  <th className="py-3 pl-5 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">State</th>
                  {VARIANTS.map((v) => (
                    <th key={v} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">{VARIANT_LABELS[v]}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-decorative)]">
                {STATES.map((state) => (
                  <tr key={state}>
                    <td className="py-4 pl-5 pr-4 text-xs font-medium capitalize text-[var(--color-text-secondary)]">{state}</td>
                    {VARIANTS.map((v) => (
                      <td key={v} className="px-4 py-4">
                        <StateDemoFAB variant={v} state={state} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Anatomy */}
      <section>
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { prop: "Size",       value: "56×56px (fixed — no other sizes)" },
            { prop: "Shape",      value: "rounded-full · --radius-full · 9999px" },
            { prop: "Shadow",     value: "--shadow-lg · 0 10px 15px -3px rgba(0,0,0,0.12)" },
            { prop: "Icon",       value: "24×24px, centred" },
            { prop: "Placement",  value: "Fixed, bottom-right, above navigation bar" },
            { prop: "Platform",   value: "Mobile App only" },
            { prop: "Ghost variant", value: "Not supported — FAB must have visible surface" },
          ].map(({ prop, value }) => (
            <div key={prop} className="flex gap-4 px-5 py-3">
              <p className="w-36 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{prop}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{value}</p>
            </div>
          ))}
        </Card>
      </section>

      {/* Code */}
      <section>
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={FAB_CODE} />
      </section>

    </div>
  );
}
