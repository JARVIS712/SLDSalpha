"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

type CheckboxSize = "large" | "default";
type CheckboxVariant =
  | "unchecked"
  | "unchecked-focused"
  | "checked"
  | "checked-focused"
  | "unchecked-disabled"
  | "checked-disabled"
  | "indeterminate-focused"
  | "indeterminate";

function checkboxTheme(darkMode: boolean) {
  return {
    frame: darkMode ? "var(--color-surface-page)" : "#FFFFFF",
    surface: darkMode ? "var(--color-surface-card)" : "#FDFDFD",
    border: darkMode ? "var(--color-border-default)" : "#8E949E",
    selected: darkMode ? "var(--color-action-primary)" : "#FFC700",
    selectedIcon: darkMode ? "var(--color-action-primary-foreground)" : "#FFFFFF",
    disabledFill: darkMode ? "var(--color-action-disabled-bg)" : "#ECEEF1",
    disabledBorder: darkMode ? "var(--color-border-disabled)" : "#B8BDC4",
    disabledIcon: darkMode ? "var(--color-action-disabled-fg)" : "#B8BDC4",
    focus: "0 0 6px 0 var(--gold-200), 0 0 0 3px var(--gold-300)",
  };
}

function CheckIcon({ color, size }: { color: string; size: CheckboxSize }) {
  const strokeWidth = size === "large" ? 2.5 : 2;

  return (
    <svg width="75%" height="75%" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="m4 9.25 3 3 7-7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MinusIcon({ color, size }: { color: string; size: CheckboxSize }) {
  const strokeWidth = size === "large" ? 2.5 : 2;

  return (
    <svg width="75%" height="75%" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 9h8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

function CheckboxMark({
  size,
  variant,
  darkMode = false,
}: {
  size: CheckboxSize;
  variant: CheckboxVariant;
  darkMode?: boolean;
}) {
  const theme = checkboxTheme(darkMode);
  const dimension = size === "large" ? 24 : 16;
  const radius = size === "large" ? 6 : 4;
  const borderWidth = size === "large" ? 1.5 : 1;
  const checked = variant.includes("checked") || variant.includes("indeterminate");
  const disabled = variant.includes("disabled");
  const focused = variant.includes("focused");
  const indeterminate = variant.includes("indeterminate");

  const fill = checked ? (disabled ? theme.disabledFill : theme.selected) : focused ? theme.surface : "transparent";
  const borderColor = checked && !disabled ? theme.selected : disabled ? theme.disabledBorder : theme.border;
  const iconColor = disabled ? theme.disabledIcon : theme.selectedIcon;

  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden"
      style={{
        width: dimension,
        height: dimension,
        borderRadius: radius,
        backgroundColor: fill,
        border: `${checked && !focused && !disabled ? 0 : borderWidth}px solid ${borderColor}`,
        boxShadow: focused ? theme.focus : "none",
      }}
    >
      {checked && (indeterminate ? <MinusIcon color={iconColor} size={size} /> : <CheckIcon color={iconColor} size={size} />)}
    </span>
  );
}

const VARIANTS: { key: CheckboxVariant; label: string }[] = [
  { key: "unchecked", label: "Unchecked" },
  { key: "unchecked-focused", label: "Unchecked focused" },
  { key: "checked", label: "Checked" },
  { key: "checked-focused", label: "Checked focused" },
  { key: "unchecked-disabled", label: "Unchecked disabled" },
  { key: "checked-disabled", label: "Checked disabled" },
  { key: "indeterminate-focused", label: "Indeterminate focused" },
  { key: "indeterminate", label: "Indeterminate" },
];

function CheckboxComponentSet({ darkMode = false }: { darkMode?: boolean }) {
  const theme = checkboxTheme(darkMode);

  return (
    <div
      className="flex h-[396px] w-[90px] flex-col gap-6 rounded-[5px] border border-dashed p-[16px_17px]"
      style={{ backgroundColor: theme.frame, borderColor: darkMode ? "var(--color-border-focus)" : "#8A38F5" }}
    >
      {VARIANTS.map(({ key }) => (
        <div key={key} className="flex h-6 items-center gap-4">
          <CheckboxMark size="large" variant={key} darkMode={darkMode} />
          <CheckboxMark size="default" variant={key} darkMode={darkMode} />
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
            <CheckboxMark size="large" variant={key} darkMode={darkMode} />
            <CheckboxMark size="default" variant={key} darkMode={darkMode} />
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

const CHECKBOX_CODE = `export function Checkbox({ checked, disabled, focused, indeterminate, size = "large" }: CheckboxProps) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[6px] border-[1.5px] border-[#8E949E]"
      aria-checked={indeterminate ? "mixed" : checked}
      role="checkbox"
    >
      {checked && (indeterminate ? <MinusIcon /> : <CheckIcon />)}
    </span>
  );
}`;

export function CheckboxSpec() {
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
            <CheckboxComponentSet darkMode={isDark} />
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
            ["Component set", "90x396 frame with two columns", "Large 24x24 and Default 16x16"],
            ["Large checkbox", "24x24, 6px radius, 1.5px stroke", "Border #8E949E"],
            ["Default checkbox", "16x16, 4px radius, 1px stroke", "Border #8E949E"],
            ["Selected", "Gold fill with check or minus icon", "Fill #FFC700"],
            ["Disabled", "Disabled fill and border with muted icon", "Fill #ECEEF1, border/icon #B8BDC4"],
            ["Focus", "Gold focus ring around the control", "0 0 0 3px #FFD740 plus 0 0 6px #FFE880"],
            ["Dark mode", "Uses semantic dark tokens", "Border, surface, selected fill, disabled fill, and icon contrast adapt in preview."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Use checkbox for independent yes/no choices or selecting multiple items."],
            ["Do", "Use indeterminate state when a parent option controls a mixed child selection."],
            ["Don't", "Do not use checkbox for mutually exclusive choices; use Radio Button instead."],
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
        <CodeBlock code={CHECKBOX_CODE} />
      </section>
    </div>
  );
}
