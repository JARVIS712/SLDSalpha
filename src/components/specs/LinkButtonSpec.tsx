"use client";
import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

type Variant = "primary" | "secondary";
const VARIANTS: Variant[] = ["primary", "secondary"];

const VARIANT_LABELS: Record<Variant, string> = { primary: "Primary", secondary: "Secondary" };

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:   "text-[var(--color-text-link)] hover:underline hover:text-[var(--color-text-primary)]",
  secondary: "text-[var(--color-text-secondary)] hover:underline hover:text-[var(--color-text-primary)]",
};

function LiveLinkButton({ variant }: { variant: Variant }) {
  return (
    <button
      className={[
        "inline-flex items-center gap-1 bg-transparent text-[15px] font-normal",
        "transition-colors duration-[var(--duration-fast)] cursor-pointer",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)]",
        VARIANT_CLASSES[variant],
      ].join(" ")}
    >
      Link button
    </button>
  );
}

function StateDemoLink({ variant, state }: { variant: Variant; state: "default" | "hover" | "disabled" }) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 15,
    fontWeight: 400,
    cursor: state === "disabled" ? "not-allowed" : "default",
    userSelect: "none",
    background: "transparent",
    border: "none",
    padding: 0,
  };

  if (state === "disabled") {
    return <span style={{ ...base, color: "var(--color-text-disabled)" }}>Link button</span>;
  }

  const colorMap: Record<Variant, Record<"default" | "hover", string>> = {
    primary: {
      default: "var(--color-text-link)",
      hover:   "var(--color-text-primary)",
    },
    secondary: {
      default: "var(--color-text-secondary)",
      hover:   "var(--color-text-primary)",
    },
  };

  return (
    <span
      style={{
        ...base,
        color: colorMap[variant][state],
        textDecoration: state === "hover" ? "underline" : "none",
      }}
    >
      Link button
    </span>
  );
}

const LINK_BUTTON_CODE = `// Link Button — SLDS token implementation

type Variant = 'primary' | 'secondary';

const variantStyles: Record<Variant, string> = {
  primary:   'text-[var(--color-text-link)] hover:underline hover:text-[var(--color-text-primary)]',
  secondary: 'text-[var(--color-text-secondary)] hover:underline hover:text-[var(--color-text-primary)]',
};

interface LinkButtonProps {
  variant?: Variant;
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

// As a <button> (inline action)
export function LinkButton({ variant = 'primary', disabled, children, onClick }: LinkButtonProps & { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center bg-transparent text-[15px] font-normal',
        'transition-colors duration-[var(--duration-fast)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--gold-500)]',
        disabled
          ? 'text-[var(--color-text-disabled)] cursor-not-allowed'
          : variantStyles[variant],
      ].join(' ')}
    >
      {children}
    </button>
  );
}

// As an <a> (navigation)
export function LinkButtonAnchor({ variant = 'primary', href, children }: LinkButtonProps) {
  return (
    <a
      href={href}
      className={[
        'inline-flex items-center text-[15px] font-normal',
        'transition-colors duration-[var(--duration-fast)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--gold-500)]',
        variantStyles[variant],
      ].join(' ')}
    >
      {children}
    </a>
  );
}`;

export function LinkButtonSpec() {
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
        <div className={[
          "rounded-[var(--radius-xl)] p-6",
          isDark
            ? "dark bg-[var(--color-surface-page)]"
            : "border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)]",
        ].join(" ")}>
          <div className="flex flex-wrap gap-6">
            {VARIANTS.map((v) => (
              <div key={v} className="flex flex-col gap-1">
                <span className="text-xs text-[var(--color-text-tertiary)]">{VARIANT_LABELS[v]}</span>
                <LiveLinkButton variant={v} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--color-text-tertiary)]">
            Hover to see underline. Use as <code className="rounded bg-[var(--color-surface-section-alt)] px-1 py-0.5 text-xs">&lt;button&gt;</code> for actions or <code className="rounded bg-[var(--color-surface-section-alt)] px-1 py-0.5 text-xs">&lt;a&gt;</code> for navigation.
          </p>
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
                {(["default", "hover", "disabled"] as const).map((state) => (
                  <tr key={state}>
                    <td className="py-4 pl-5 pr-4 text-xs font-medium capitalize text-[var(--color-text-secondary)]">{state}</td>
                    {VARIANTS.map((v) => (
                      <td key={v} className="px-4 py-4">
                        <StateDemoLink variant={v} state={state} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Usage */}
      <section>
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { label: "Use Primary", note: "For the main text link action on a page. Uses --color-text-link (gold in dark mode)." },
            { label: "Use Secondary", note: "For lower-emphasis text actions, footnotes, or supplementary links." },
            { label: "Use <button>", note: "When the action doesn't navigate — e.g. toggle, open modal, submit inline." },
            { label: "Use <a>",     note: "When the action navigates to another URL." },
            { label: "Avoid overuse", note: "Use full buttons for primary CTAs. Link buttons suit secondary or inline actions only." },
          ].map(({ label, note }) => (
            <div key={label} className="flex gap-4 px-5 py-4">
              <p className="w-36 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{label}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{note}</p>
            </div>
          ))}
        </Card>
      </section>

      {/* Code */}
      <section>
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={LINK_BUTTON_CODE} />
      </section>

    </div>
  );
}
