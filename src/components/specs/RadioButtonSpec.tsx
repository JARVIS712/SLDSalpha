"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

type RadioSize = "default" | "large";
type RadioVariant =
  | "unselected"
  | "unselected-focused"
  | "selected"
  | "selected-focused"
  | "unselected-disabled"
  | "selected-disabled";

function radioTheme(darkMode: boolean) {
  return {
    frame: darkMode ? "var(--color-surface-page)" : "#FFFFFF",
    controlBg: darkMode ? "var(--color-surface-sunken)" : "#F5F6F8",
    activeBg: darkMode ? "var(--color-surface-card)" : "#FAFAFB",
    border: darkMode ? "var(--color-border-default)" : "#8E949E",
    selected: darkMode ? "var(--color-action-primary)" : "#FFC700",
    disabledFill: darkMode ? "var(--color-action-disabled-bg)" : "#ECEEF1",
    disabledBorder: darkMode ? "var(--color-border-disabled)" : "#B8BDC4",
    disabledDot: darkMode ? "var(--color-action-disabled-fg)" : "#B8BDC4",
    focus: "0 0 6px 0 var(--gold-200), 0 0 0 3px var(--gold-300)",
  };
}

function RadioMark({
  size,
  variant,
  darkMode = false,
}: {
  size: RadioSize;
  variant: RadioVariant;
  darkMode?: boolean;
}) {
  const theme = radioTheme(darkMode);
  const dimension = size === "large" ? 20 : 16;
  const dot = size === "large" ? 8 : 6;
  const selected = variant.includes("selected") && !variant.includes("unselected");
  const disabled = variant.includes("disabled");
  const focused = variant.includes("focused");

  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border"
      style={{
        width: dimension,
        height: dimension,
        backgroundColor: disabled ? theme.disabledFill : selected || focused ? theme.activeBg : theme.controlBg,
        borderColor: disabled ? theme.disabledBorder : selected ? theme.selected : theme.border,
        boxShadow: focused ? theme.focus : "none",
      }}
      aria-hidden="true"
    >
      {selected && (
        <span
          className="rounded-full"
          style={{
            width: dot,
            height: dot,
            backgroundColor: disabled ? theme.disabledDot : theme.selected,
          }}
        />
      )}
    </span>
  );
}

const VARIANTS: { key: RadioVariant; label: string }[] = [
  { key: "unselected", label: "Unselected" },
  { key: "unselected-focused", label: "Unselected focused" },
  { key: "selected", label: "Selected" },
  { key: "selected-focused", label: "Selected focused" },
  { key: "unselected-disabled", label: "Unselected disabled" },
  { key: "selected-disabled", label: "Selected disabled" },
];

function RadioComponentSet({ darkMode = false }: { darkMode?: boolean }) {
  const theme = radioTheme(darkMode);

  return (
    <div
      className="flex h-[216px] w-[79px] flex-col gap-3 rounded-[5px] border border-dashed p-[13px_13px_13px_16px]"
      style={{ backgroundColor: theme.frame, borderColor: darkMode ? "var(--color-border-focus)" : "#8A38F5" }}
    >
      {VARIANTS.map(({ key }) => (
        <div key={key} className="flex h-5 items-center gap-[14px]">
          <RadioMark size="default" variant={key} darkMode={darkMode} />
          <RadioMark size="large" variant={key} darkMode={darkMode} />
        </div>
      ))}
    </div>
  );
}

function VariantRows({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {VARIANTS.map(({ key, label }) => (
        <div
          key={key}
          className="flex items-center justify-between rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-4 py-3"
        >
          <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
          <span className="flex items-center gap-4">
            <RadioMark size="default" variant={key} darkMode={darkMode} />
            <RadioMark size="large" variant={key} darkMode={darkMode} />
          </span>
        </div>
      ))}
    </div>
  );
}

function SpecTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-decorative)]">
              {headers.map((header) => (
                <th key={header} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-decorative)]">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-5 py-4 align-top text-[var(--color-text-secondary)]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

const RADIO_CODE = `export function Radio({ selected, disabled, focused, size = "default" }: RadioProps) {
  return (
    <span
      className="inline-flex rounded-full border border-[#8E949E]"
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
    >
      {selected && <span className="rounded-full bg-[#FFC700]" />}
    </span>
  );
}`;

export function RadioButtonSpec() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SectionHeading>Live preview</SectionHeading>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </div>
        <Card className={`${isDark ? "dark bg-[var(--color-surface-page)]" : ""} p-4`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <RadioComponentSet darkMode={isDark} />
            <div className="min-w-0 flex-1">
              <VariantRows darkMode={isDark} />
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Component set", "79x216 frame with two columns", "Default 16x16 and Large 20x20"],
            ["Default radio", "16x16, full radius, 1px stroke", "Border #8E949E"],
            ["Large radio", "20x20, full radius, 1px stroke", "Border #8E949E"],
            ["Selected", "Gold border with centered dot", "Border/dot #FFC700; active background #FAFAFB"],
            ["Disabled", "Disabled fill, border, and selected dot", "Fill #ECEEF1, border/dot #B8BDC4"],
            ["Focus", "Gold focus ring around the control", "0 0 0 3px #FFD740 plus 0 0 6px #FFE880"],
            ["Dark mode", "Uses semantic dark tokens", "Surface, border, selected fill, disabled fill, and focus ring adapt in preview."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Use radio buttons when users must choose exactly one option from a visible set."],
            ["Do", "Use fieldset and legend for grouped radio options."],
            ["Don't", "Do not use radio buttons for independent yes/no settings; use Checkbox or Toggle instead."],
          ].map(([label, note]) => (
            <div key={note} className="flex gap-4 px-5 py-3">
              <span className={`w-12 shrink-0 text-xs font-semibold uppercase tracking-wide ${label === "Do" ? "text-[var(--green-600)]" : "text-[var(--red-600)]"}`}>
                {label}
              </span>
              <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{note}</p>
            </div>
          ))}
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={RADIO_CODE} />
      </section>
    </div>
  );
}
