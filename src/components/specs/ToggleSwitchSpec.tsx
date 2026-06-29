"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

type ToggleVariant =
  | "default"
  | "default-focus"
  | "checked"
  | "checked-focus"
  | "disabled-default"
  | "disabled-checked";

function toggleTheme(darkMode: boolean) {
  return {
    frame: darkMode ? "var(--color-surface-page)" : "#FFFFFF",
    trackOff: darkMode ? "var(--color-action-disabled-bg)" : "#ECEEF1",
    trackOn: darkMode ? "var(--color-action-primary)" : "#FFC700",
    thumb: darkMode ? "var(--color-surface-card)" : "#FAFAFB",
    thumbDisabled: darkMode ? "var(--color-action-disabled-fg)" : "#B8BDC4",
    focus: "0 0 6px 0 var(--gold-200), 0 0 0 3px var(--gold-300)",
    thumbShadow: darkMode ? "0 10px 15px -3px rgba(0,0,0,0.35)" : "0 10px 15px -3px rgba(0,0,0,0.12)",
  };
}

function ToggleMark({ variant, darkMode = false }: { variant: ToggleVariant; darkMode?: boolean }) {
  const theme = toggleTheme(darkMode);
  const checked = variant === "checked" || variant === "checked-focus" || variant === "disabled-checked";
  const focused = variant === "default-focus" || variant === "checked-focus";
  const disabled = variant === "disabled-default" || variant === "disabled-checked";

  return (
    <span
      className={`flex h-7 w-[50.4px] shrink-0 items-center overflow-hidden rounded-full px-1 ${checked ? "justify-end" : "justify-start"}`}
      style={{
        backgroundColor: checked && !disabled ? theme.trackOn : theme.trackOff,
        boxShadow: focused ? theme.focus : "none",
      }}
      aria-hidden="true"
    >
      <span
        className="h-[22.4px] w-[22.4px] rounded-full"
        style={{
          backgroundColor: disabled ? theme.thumbDisabled : theme.thumb,
          boxShadow: disabled ? "none" : theme.thumbShadow,
        }}
      />
    </span>
  );
}

const VARIANTS: { key: ToggleVariant; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "default-focus", label: "Default focus" },
  { key: "checked", label: "Checked" },
  { key: "checked-focus", label: "Checked focus" },
  { key: "disabled-default", label: "Disabled default" },
  { key: "disabled-checked", label: "Disabled checked" },
];

function ToggleComponentSet({ darkMode = false }: { darkMode?: boolean }) {
  const theme = toggleTheme(darkMode);

  return (
    <div
      className="flex h-[295px] w-[82.4px] flex-col gap-[19px] rounded-[5px] border border-dashed p-4"
      style={{ backgroundColor: theme.frame, borderColor: darkMode ? "var(--color-border-focus)" : "#8A38F5" }}
    >
      {VARIANTS.map(({ key }) => (
        <ToggleMark key={key} variant={key} darkMode={darkMode} />
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
          <ToggleMark variant={key} darkMode={darkMode} />
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

const TOGGLE_CODE = `export function Toggle({ checked, disabled, focused }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className="flex h-7 w-[50.4px] items-center rounded-full px-1"
    >
      <span className="h-[22.4px] w-[22.4px] rounded-full" />
    </button>
  );
}`;

export function ToggleSwitchSpec() {
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
            <ToggleComponentSet darkMode={isDark} />
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
            ["Component set", "82.4x295 frame with 16px padding", "Six states: Default, Default focus, Checked, Checked focus, Disabled default, Disabled checked"],
            ["Track", "50.4x28, full radius, 4px horizontal padding", "Off/disabled #ECEEF1; checked #FFC700"],
            ["Thumb", "22.4x22.4, full radius", "Default #FAFAFB with floating shadow; disabled #B8BDC4"],
            ["Checked state", "Thumb aligns to the right edge inside 4px padding", "Track fill #FFC700"],
            ["Focus", "Gold focus ring around the full track", "0 0 0 3px #FFD740 plus 0 0 6px #FFE880"],
            ["Dark mode", "Uses semantic dark tokens", "Track, thumb, disabled, selected, focus ring, and thumb shadow adapt in preview."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Use toggles for immediate on/off settings that save without a separate submit action."],
            ["Do", "Pair every toggle with a visible label that describes the setting."],
            ["Don't", "Do not use toggles inside long forms where changes are applied only after Submit; use Checkbox instead."],
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
        <CodeBlock code={TOGGLE_CODE} />
      </section>
    </div>
  );
}
