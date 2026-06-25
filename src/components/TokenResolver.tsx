"use client";

import { useState } from "react";
import { semanticAnatomyExamples } from "@/data/designTokensGuide";

function Box({ label, title, sub, hex }: { label: string; title: string; sub?: string; hex?: string }) {
  return (
    <div className="flex min-w-[150px] flex-1 flex-col gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-4">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">{label}</span>
      <div className="flex items-center gap-2">
        {hex && <span className="h-6 w-6 shrink-0 rounded-md border border-[var(--color-border-decorative)]" style={{ backgroundColor: hex }} />}
        <code className="break-all text-xs font-medium text-[var(--color-text-primary)]">{title}</code>
      </div>
      {sub && <span className="font-mono text-[11px] text-[var(--color-text-secondary)]">{sub}</span>}
    </div>
  );
}


const MODES = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "hc", label: "High Contrast" },
] as const;

type Mode = (typeof MODES)[number]["key"];

export function TokenResolver() {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("light");
  const selected = semanticAnatomyExamples[index];

  const hex = mode === "light" ? selected.light : mode === "dark" ? selected.dark : selected.highContrast;
  const primitive =
    mode === "dark" ? selected.primitiveDark ?? selected.primitive : mode === "hc" ? selected.primitiveHC ?? selected.primitive : selected.primitive;
  const cssVar = `--${selected.token.replace(/^slds-/, "slds-")}`;
  const modeLabel = MODES.find((m) => m.key === mode)!.label;

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-section-alt)] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          Resolve token
          <select
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            className="rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-card)] px-2 py-1.5 text-sm text-[var(--color-text-primary)]"
          >
            {semanticAnatomyExamples.map((t, i) => (
              <option key={t.token} value={i}>
                {t.figmaPath}
              </option>
            ))}
          </select>
        </label>

        <div className="inline-flex rounded-md border border-[var(--color-border-default)] p-0.5 text-sm">
          {MODES.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              aria-pressed={mode === m.key}
              className={`whitespace-nowrap rounded px-3 py-1 font-medium transition-colors ${
                mode === m.key ? "bg-[var(--gold-500)] text-[var(--neutral-900)]" : "text-[var(--color-text-secondary)]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        <Box label="Raw value" title={hex} hex={hex} />
        <div className="flex items-center justify-center px-1 text-[var(--color-text-tertiary)]" aria-hidden="true"><span className="hidden text-lg sm:inline">→</span><span className="text-lg sm:hidden">↓</span></div>
        <Box label="Primitive" title={primitive} hex={hex} />
        <div className="flex items-center justify-center px-1 text-[var(--color-text-tertiary)]" aria-hidden="true"><span className="hidden text-lg sm:inline">→</span><span className="text-lg sm:hidden">↓</span></div>
        <Box label="Semantic" title={selected.figmaPath} sub={`${modeLabel} mode`} hex={hex} />
        <div className="flex items-center justify-center px-1 text-[var(--color-text-tertiary)]" aria-hidden="true"><span className="hidden text-lg sm:inline">→</span><span className="text-lg sm:hidden">↓</span></div>
        <Box label="Component (CSS)" title={cssVar} sub={`var(${cssVar})`} hex={hex} />
      </div>

      {(selected.light !== selected.dark || selected.light !== selected.highContrast) && (
        <p className="mt-4 text-xs leading-5 text-[var(--color-text-secondary)]">
          This token resolves to a different primitive in each mode — the name <code className="font-mono">{selected.token}</code> never
          changes in code; only the value it points to does. Try the Light/Dark/High Contrast toggle above.
        </p>
      )}
    </div>
  );
}
