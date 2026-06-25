"use client";
import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading, CaretLeft, CaretRight } from "./shared";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type BSize = "xl" | "lg" | "md" | "sm";
type BState = "default" | "hover" | "focus" | "pressed" | "disabled" | "loading";

const VARIANTS: Variant[] = ["primary", "secondary", "ghost", "destructive"];
const SIZES: BSize[] = ["xl", "lg", "md", "sm"];
const STATES: BState[] = ["default", "hover", "focus", "pressed", "disabled", "loading"];

const VARIANT_LABELS: Record<Variant, string> = {
  primary: "Primary", secondary: "Secondary", ghost: "Ghost", destructive: "Destructive",
};

const SIZE_SPECS: Record<BSize, { label: string; height: string; font: string; padding: string; radius: string; iconSize: number; classes: string }> = {
  xl: { label: "Extra Large", height: "56px", font: "17px", padding: "16px", radius: "12px", iconSize: 20, classes: "h-14 px-4 text-[17px] gap-2 min-w-[120px] rounded-[var(--radius-lg)]" },
  lg: { label: "Large",       height: "48px", font: "16px", padding: "16px", radius: "12px", iconSize: 18, classes: "h-12 px-4 text-[16px] gap-2 min-w-[108px] rounded-[var(--radius-lg)]" },
  md: { label: "Medium",      height: "36px", font: "14px", padding: "12px", radius: "8px",  iconSize: 16, classes: "h-9  px-3 text-sm  gap-1.5 min-w-[96px]  rounded-[var(--radius-md)]"  },
  sm: { label: "Small",       height: "28px", font: "12px", padding: "8px",  radius: "8px",  iconSize: 14, classes: "h-7  px-2.5 text-xs gap-1 min-w-[80px]   rounded-[var(--radius-md)]"  },
};

const LIVE_VARIANT_CLASSES: Record<Variant, string> = {
  primary:     "bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)] hover:bg-[var(--color-action-primary-hover)] active:bg-[var(--color-action-primary-pressed)]",
  secondary:   "bg-[var(--color-action-secondary)] text-[var(--color-action-secondary-foreground)] border-2 border-[var(--color-action-secondary-border)] hover:bg-[var(--color-action-secondary-hover)]",
  ghost:       "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]",
  destructive: "bg-[var(--red-600)] text-white hover:bg-[var(--red-700)]",
};

const BTN_BASE = "inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors duration-[var(--duration-fast)]";
const FOCUS_RING = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)]";

function Spinner() {
  return (
    <svg className="animate-spin shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d="M12.5 7a5.5 5.5 0 0 0-5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}


function LiveButton({ variant, size = "md" }: { variant: Variant; size?: BSize }) {
  const iconSize = SIZE_SPECS[size].iconSize;
  return (
    <button className={`${BTN_BASE} ${FOCUS_RING} ${SIZE_SPECS[size].classes} ${LIVE_VARIANT_CLASSES[variant]}`}>
      <CaretLeft size={iconSize} />
      {VARIANT_LABELS[variant]}
      <CaretRight size={iconSize} />
    </button>
  );
}

function getStateStyle(variant: Variant, state: BState): React.CSSProperties {
  if (state === "disabled" || state === "loading") {
    return {
      background: "var(--color-action-disabled-bg)",
      color: "var(--color-action-disabled-fg)",
      border: "2px solid transparent",
      cursor: "not-allowed",
    };
  }
  const active = state === "hover" || state === "pressed";
  const focus = state === "focus";
  const ring: React.CSSProperties = focus
    ? { outline: "2px solid var(--gold-500)", outlineOffset: "2px" }
    : {};

  switch (variant) {
    case "primary":
      return {
        background: active ? "var(--color-action-primary-hover)" : "var(--color-action-primary)",
        color: "var(--color-action-primary-foreground)",
        border: "2px solid transparent",
        ...ring,
      };
    case "secondary":
      return {
        background: active ? "var(--color-action-secondary-hover)" : "var(--color-action-secondary)",
        color: "var(--color-action-secondary-foreground)",
        border: "2px solid var(--color-action-secondary-border)",
        ...ring,
      };
    case "ghost":
      return {
        background: active ? "var(--color-surface-hover)" : "transparent",
        color: "var(--color-text-primary)",
        border: "2px solid transparent",
        ...ring,
      };
    case "destructive":
      return {
        background: active ? "var(--red-700)" : "var(--red-600)",
        color: "#ffffff",
        border: "2px solid transparent",
        ...ring,
      };
  }
}

function StateDemoButton({ variant, state }: { variant: Variant; state: BState }) {
  const isLoading = state === "loading";
  return (
    <div
      style={{
        ...getStateStyle(variant, state),
        height: 36,
        minWidth: 96,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-md)",
        fontSize: 14,
        fontWeight: 500,
        gap: 6,
        padding: "0 12px",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {isLoading ? <Spinner /> : <CaretLeft size={16} />}
      <span>{isLoading ? "Loading" : "Button"}</span>
      {!isLoading && <CaretRight size={16} />}
    </div>
  );
}


const BUTTON_CODE = `// Button — SLDS token implementation
// Requires globals.css with SLDS design tokens

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type Size    = 'xl' | 'lg' | 'md' | 'sm';

const sizeStyles: Record<Size, string> = {
  xl: 'h-14 px-4 text-[17px] gap-2 rounded-[var(--radius-lg)]',
  lg: 'h-12 px-4 text-[16px] gap-2 rounded-[var(--radius-lg)]',
  md: 'h-9  px-3 text-sm gap-1.5 rounded-[var(--radius-md)]',
  sm: 'h-7  px-2.5 text-xs gap-1 rounded-[var(--radius-md)]',
};

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)] hover:bg-[var(--color-action-primary-hover)]',
  secondary:
    'bg-[var(--color-action-secondary)] text-[var(--color-action-secondary-foreground)] border-2 border-[var(--color-action-secondary-border)] hover:bg-[var(--color-action-secondary-hover)]',
  ghost:
    'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]',
  destructive:
    'bg-[var(--red-600)] text-white hover:bg-[var(--red-700)]',
};

const disabledStyles =
  'bg-[var(--color-action-disabled-bg)] text-[var(--color-action-disabled-fg)] cursor-not-allowed pointer-events-none';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  leadingIcon,
  trailingIcon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium',
        'transition-colors duration-[var(--duration-fast)] whitespace-nowrap',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--gold-500)]',
        sizeStyles[size],
        isDisabled ? disabledStyles : variantStyles[variant],
        className,
      ].join(' ')}
    >
      {loading ? <LoadingSpinner /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  );
}`;

const TOKEN_ROWS = [
  { token: "--color-action-primary",            light: "#ffc700",  dark: "#ffc700",  usage: "Primary background"     },
  { token: "--color-action-primary-foreground", light: "#111111",  dark: "#111111",  usage: "Primary label"          },
  { token: "--color-action-primary-hover",      light: "#e0ae00",  dark: "#ffd740",  usage: "Primary hover/pressed"  },
  { token: "--color-action-secondary",          light: "#ffffff",  dark: "#ffffff",  usage: "Secondary background"   },
  { token: "--color-action-secondary-border",   light: "#dadde2",  dark: "#374151",  usage: "Secondary border"       },
  { token: "--color-action-disabled-bg",        light: "#eceef1",  dark: "#212529",  usage: "Disabled background"    },
  { token: "--color-action-disabled-fg",        light: "#b8bdc4",  dark: "#676c73",  usage: "Disabled label"         },
  { token: "--red-600",                         light: "#d32f2f",  dark: "#d32f2f",  usage: "Destructive background" },
  { token: "--radius-lg",                       light: "12px",     dark: "12px",     usage: "Border radius — XL, L"  },
  { token: "--radius-md",                       light: "8px",      dark: "8px",      usage: "Border radius — M, S"   },
];

export function ButtonSpec() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="space-y-12">

      {/* ── Live Preview ── */}
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
        <div className={[
          "rounded-[var(--radius-xl)] p-6",
          isDark
            ? "dark bg-[var(--color-surface-page)]"
            : "border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)]",
        ].join(" ")}>
          <div className="flex flex-wrap gap-3">
            {VARIANTS.map((v) => <LiveButton key={v} variant={v} />)}
          </div>
          <p className="mt-4 text-xs text-[var(--color-text-tertiary)]">
            Hover, focus, or click each button to see interaction states.
          </p>
        </div>
      </section>

      {/* ── Variants & States ── */}
      <section>
        <SectionHeading>Variants &amp; states</SectionHeading>
        <div className="overflow-x-auto">
          <Card>
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-decorative)]">
                  <th className="py-3 pl-5 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">State</th>
                  {VARIANTS.map((v) => (
                    <th key={v} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      {VARIANT_LABELS[v]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-decorative)]">
                {STATES.map((state) => (
                  <tr key={state}>
                    <td className="py-4 pl-5 pr-4 text-xs font-medium capitalize text-[var(--color-text-secondary)]">{state}</td>
                    {VARIANTS.map((v) => (
                      <td key={v} className="px-4 py-4">
                        <StateDemoButton variant={v} state={state} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* ── Sizes ── */}
      <section>
        <SectionHeading>Sizes</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="w-36 shrink-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{SIZE_SPECS[size].label}</p>
                <p className="mt-0.5 text-xs text-[var(--color-text-tertiary)]">
                  h {SIZE_SPECS[size].height} · f {SIZE_SPECS[size].font} · px {SIZE_SPECS[size].padding}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <LiveButton variant="primary"   size={size} />
                <LiveButton variant="secondary" size={size} />
                <LiveButton variant="ghost"     size={size} />
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* ── Design Tokens ── */}
      <section>
        <SectionHeading>Design tokens</SectionHeading>
        <div className="overflow-x-auto">
          <Card>
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-decorative)]">
                  {["Token", "Light", "Dark", "Usage"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] first:pl-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-decorative)]">
                {TOKEN_ROWS.map(({ token, light, dark, usage }) => (
                  <tr key={token}>
                    <td className="py-3 pl-5 pr-4">
                      <code className="rounded bg-[var(--color-surface-section-alt)] px-1.5 py-0.5 text-xs text-[var(--color-text-primary)]">{token}</code>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)]">{light}</td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)]">{dark}</td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-tertiary)]">{usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* ── Code ── */}
      <section>
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={BUTTON_CODE} />
      </section>

    </div>
  );
}
