"use client";
import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type BSize = "xl" | "lg" | "md" | "sm";
type BState = "default" | "hover" | "focus" | "pressed" | "disabled" | "loading";

const VARIANTS: Variant[] = ["primary", "secondary", "ghost", "destructive"];
const SIZES: BSize[] = ["xl", "lg", "md", "sm"];
const STATES: BState[] = ["default", "hover", "focus", "pressed", "disabled", "loading"];

const VARIANT_LABELS: Record<Variant, string> = {
  primary: "Primary", secondary: "Secondary", ghost: "Ghost", destructive: "Destructive",
};

const SIZE_SPECS: Record<BSize, { label: string; dim: string; icon: number; classes: string }> = {
  xl: { label: "Extra Large", dim: "56px", icon: 24, classes: "size-14" },
  lg: { label: "Large",       dim: "48px", icon: 24, classes: "size-12" },
  md: { label: "Medium",      dim: "36px", icon: 20, classes: "size-9"  },
  sm: { label: "Small",       dim: "28px", icon: 16, classes: "size-7"  },
};

const LIVE_VARIANT_CLASSES: Record<Variant, string> = {
  primary:     "bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)] hover:bg-[var(--color-action-primary-hover)] active:bg-[var(--color-action-primary-pressed)]",
  secondary:   "bg-[var(--color-action-secondary)] text-[var(--color-text-primary)] border-2 border-[var(--color-action-secondary-border)] hover:bg-[var(--color-surface-hover)]",
  ghost:       "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
  destructive: "bg-[var(--red-600)] text-white hover:bg-[var(--red-700)]",
};

function PlusIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg className="animate-spin" width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function LiveIconButton({ variant, size = "md" }: { variant: Variant; size?: BSize }) {
  const s = SIZE_SPECS[size];
  return (
    <button
      aria-label={`${VARIANT_LABELS[variant]} icon button`}
      className={[
        "inline-flex items-center justify-center shrink-0 rounded-[var(--radius-2xl)]",
        "transition-colors duration-[var(--duration-fast)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)]",
        s.classes,
        LIVE_VARIANT_CLASSES[variant],
      ].join(" ")}
    >
      <PlusIcon size={s.icon} />
    </button>
  );
}

function getStateStyle(variant: Variant, state: BState): React.CSSProperties {
  if (state === "disabled" || state === "loading") {
    return { background: "var(--color-action-disabled-bg)", color: "var(--color-action-disabled-fg)", border: "2px solid transparent", cursor: "not-allowed" };
  }
  const active = state === "hover" || state === "pressed";
  const ring: React.CSSProperties = state === "focus" ? { outline: "2px solid var(--gold-500)", outlineOffset: "2px" } : {};
  switch (variant) {
    case "primary":
      return { background: active ? "var(--color-action-primary-hover)" : "var(--color-action-primary)", color: "var(--color-action-primary-foreground)", border: "2px solid transparent", ...ring };
    case "secondary":
      return { background: active ? "var(--color-surface-hover)" : "var(--color-action-secondary)", color: "var(--color-text-primary)", border: "2px solid var(--color-action-secondary-border)", ...ring };
    case "ghost":
      return { background: active ? "var(--color-surface-hover)" : "transparent", color: "var(--color-text-primary)", border: "2px solid transparent", ...ring };
    case "destructive":
      return { background: active ? "var(--red-700)" : "var(--red-600)", color: "#ffffff", border: "2px solid transparent", ...ring };
  }
}

function StateDemoIconButton({ variant, state }: { variant: Variant; state: BState }) {
  const isLoading = state === "loading";
  return (
    <div
      style={{
        ...getStateStyle(variant, state),
        width: 36, height: 36,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-2xl)",
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {isLoading ? <Spinner size={16} /> : <PlusIcon size={18} />}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] ${className}`}>{children}</div>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">{children}</h2>;
}

const ICON_BUTTON_CODE = `// Icon Button — SLDS token implementation

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type Size    = 'xl' | 'lg' | 'md' | 'sm';

const sizeStyles: Record<Size, string> = {
  xl: 'size-14', // 56×56px
  lg: 'size-12', // 48×48px
  md: 'size-9',  // 36×36px
  sm: 'size-7',  // 28×28px
};

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)] hover:bg-[var(--color-action-primary-hover)]',
  secondary:
    'bg-[var(--color-action-secondary)] text-[var(--color-text-primary)] border-2 border-[var(--color-action-secondary-border)] hover:bg-[var(--color-surface-hover)]',
  ghost:
    'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]',
  destructive:
    'bg-[var(--red-600)] text-white hover:bg-[var(--red-700)]',
};

interface IconButtonProps {
  variant?: Variant;
  size?: Size;
  icon: React.ReactNode;
  label: string; // required for aria-label
  disabled?: boolean;
  onClick?: () => void;
}

export function IconButton({ variant = 'primary', size = 'md', icon, label, disabled, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        'inline-flex items-center justify-center shrink-0 rounded-[var(--radius-2xl)]',
        'transition-colors duration-[var(--duration-fast)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--gold-500)]',
        sizeStyles[size],
        disabled
          ? 'bg-[var(--color-action-disabled-bg)] text-[var(--color-action-disabled-fg)] cursor-not-allowed'
          : variantStyles[variant],
      ].join(' ')}
    >
      {icon}
    </button>
  );
}`;

export function IconButtonSpec() {
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
            <div className="flex flex-wrap gap-3">
              {VARIANTS.map((v) => <LiveIconButton key={v} variant={v} size="lg" />)}
            </div>
            <p className="mt-4 text-xs text-[var(--color-text-tertiary)]">
              Icon buttons require an <code className="rounded bg-[var(--color-surface-section-alt)] px-1 py-0.5 text-xs">aria-label</code> for accessibility.
            </p>
          </Card>
        </div>
      </section>

      {/* Variants & States */}
      <section>
        <SectionHeading>Variants &amp; states</SectionHeading>
        <div className="overflow-x-auto">
          <Card>
            <table className="w-full min-w-[520px] text-sm">
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
                        <StateDemoIconButton variant={v} state={state} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <SectionHeading>Sizes</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="w-36 shrink-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{SIZE_SPECS[size].label}</p>
                <p className="mt-0.5 text-xs text-[var(--color-text-tertiary)]">{SIZE_SPECS[size].dim} × {SIZE_SPECS[size].dim}</p>
              </div>
              <div className="flex items-center gap-2">
                {VARIANTS.map((v) => <LiveIconButton key={v} variant={v} size={size} />)}
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* Code */}
      <section>
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={ICON_BUTTON_CODE} />
      </section>

    </div>
  );
}
