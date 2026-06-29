"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

type InputState = "default" | "focused" | "error" | "disabled";

function inputAffixTheme(darkMode: boolean) {
  return {
    frame: darkMode ? "var(--color-surface-page)" : "#FFFFFF",
    surface: darkMode ? "var(--color-surface-card)" : "#FFFFFF",
    border: darkMode ? "var(--color-border-default)" : "#8E949E",
    focus: darkMode ? "var(--color-action-primary)" : "#FFC700",
    error: darkMode ? "var(--color-feedback-error)" : "#D32F2F",
    disabledBorder: darkMode ? "var(--color-border-disabled)" : "#ECEEF1",
    text: darkMode ? "var(--color-text-primary)" : "#111111",
    secondary: darkMode ? "var(--color-text-secondary)" : "#676C73",
    disabled: darkMode ? "var(--color-text-disabled)" : "#B8BDC4",
    placeholder: darkMode ? "var(--color-text-disabled)" : "#B8BDC4",
  };
}

function InputAffixPreview({ state, darkMode = false }: { state: InputState; darkMode?: boolean }) {
  const theme = inputAffixTheme(darkMode);
  const disabled = state === "disabled";
  const error = state === "error";
  const focused = state === "focused";
  const color = disabled ? theme.disabled : theme.text;
  const borderColor = error ? theme.error : focused ? theme.focus : disabled ? theme.disabledBorder : theme.border;
  const helpColor = error ? theme.error : disabled ? theme.disabled : theme.secondary;

  return (
    <div className="flex h-[98px] w-[361px] flex-col items-start gap-[6px]">
      <div className="flex w-full flex-col items-start gap-1">
        <div className="flex h-5 w-full items-start text-[15px] leading-5 tracking-[0px]" style={{ color }}>
          <span>Input</span>
          <span style={{ color: disabled ? theme.disabled : theme.error }}>*</span>
        </div>
        <div
          className="flex h-[52px] w-full items-center justify-between overflow-hidden rounded-[12px] border px-2 py-2"
          style={{ backgroundColor: theme.surface, borderColor }}
        >
          <span className="flex shrink-0 items-center px-1">
            <span className="text-[15px] leading-5 tracking-[0px]" style={{ color }}>LKR</span>
          </span>
          <span className="flex min-w-0 flex-1 items-center justify-center px-2">
            <span className="min-w-0 flex-1 text-[15px] leading-5 tracking-[0px]" style={{ color: theme.placeholder }}>
              0000
            </span>
          </span>
          <span className="flex shrink-0 items-center px-1">
            <span className="text-[15px] leading-5 tracking-[0px]" style={{ color }}>KG</span>
          </span>
        </div>
      </div>
      <div className={`flex w-full items-center justify-center ${error ? "border" : ""}`} style={{ borderColor: error ? theme.error : "transparent" }}>
        <p className="min-w-0 flex-1 text-xs leading-4 tracking-[0px]" style={{ color: helpColor }}>
          Help Text
        </p>
      </div>
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

const INPUT_AFFIX_CODE = `export function InputWithPrefixSuffix({ value, state }: InputWithPrefixSuffixProps) {
  return (
    <div className="flex w-[361px] flex-col gap-[6px]">
      <label className="text-[15px] leading-5">Input<span className="text-[#D32F2F]">*</span></label>
      <div className="flex h-[52px] items-center rounded-[12px] border border-[#8E949E] bg-white px-2">
        <span className="px-1">LKR</span>
        <input className="flex-1 px-2" placeholder="0000" value={value} />
        <span className="px-1">KG</span>
      </div>
      <p className="text-xs leading-4">Help Text</p>
    </div>
  );
}`;

export function InputPrefixSuffixSpec() {
  const [isDark, setIsDark] = useState(false);
  const theme = inputAffixTheme(isDark);

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
        <Card className={`${isDark ? "dark bg-[var(--color-surface-page)]" : ""} overflow-x-auto p-4`}>
          <div className="flex w-[1560px] gap-7 rounded-[5px] p-5" style={{ backgroundColor: theme.frame }}>
            <InputAffixPreview state="default" darkMode={isDark} />
            <InputAffixPreview state="focused" darkMode={isDark} />
            <InputAffixPreview state="error" darkMode={isDark} />
            <InputAffixPreview state="disabled" darkMode={isDark} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Component set", "1560x138 frame; four 361x98 variants", "Default, Focused, Error, Disabled"],
            ["Container", "361px wide, 6px outer gap", "Label, 52px field, 16px help text"],
            ["Input field", "361x52, 12px radius, 8px horizontal padding", "Surface white, border #8E949E"],
            ["Affixes", "Prefix and suffix use 4px horizontal padding", "Prefix LKR, suffix KG, 15px / 20px"],
            ["Focused", "Same layout, focused border", "Border #FFC700"],
            ["Error", "Error border and help text", "Border/text #D32F2F"],
            ["Disabled", "Muted label, affixes, border, and help text", "Text #B8BDC4, border #ECEEF1"],
            ["Dark mode", "Uses semantic dark tokens", "Surface, label, placeholder, border, focus, error, and disabled colors adapt."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Use prefixes and suffixes for fixed units such as currency, weight, or measurement."],
            ["Do", "Keep affixes short so the editable value has enough space."],
            ["Don't", "Do not place essential instructions only inside the placeholder; use help text for guidance."],
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
        <CodeBlock code={INPUT_AFFIX_CODE} />
      </section>
    </div>
  );
}
