"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

type ComboBoxState = "default" | "filling" | "selected";

function comboTheme(darkMode: boolean) {
  return {
    frame: darkMode ? "var(--color-surface-page)" : "#FAFAFB",
    surface: darkMode ? "var(--color-surface-card)" : "#FAFAFB",
    surfaceHover: darkMode ? "var(--color-surface-hover)" : "#F5F6F8",
    border: darkMode ? "var(--color-border-default)" : "#8E949E",
    decorative: darkMode ? "var(--color-border-decorative)" : "#DADDE2",
    text: darkMode ? "var(--color-text-primary)" : "#111111",
    secondary: darkMode ? "var(--color-text-secondary)" : "#676C73",
    placeholder: darkMode ? "var(--color-text-disabled)" : "#B8BDC4",
    required: darkMode ? "var(--color-feedback-error)" : "#D32F2F",
    chip: darkMode ? "var(--color-surface-hover)" : "#F5F6F8",
    selected: darkMode ? "var(--color-action-primary)" : "#FFC700",
    selectedCheck: darkMode ? "var(--color-action-primary-foreground)" : "#FFFFFF",
    shadow: darkMode
      ? "0 18px 30px -12px rgba(0,0,0,0.55), 0 8px 12px -8px rgba(0,0,0,0.45)"
      : "0 10px 15px -3px rgba(0,0,0,0.12), 0 4px 6px -4px rgba(0,0,0,0.12)",
  };
}

function CaretDownIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 7.5 10 12.5 15 7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.25" stroke={color} strokeWidth="1.5" />
      <path d="m13 13 3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function XIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m4.75 4.75 6.5 6.5M11.25 4.75l-6.5 6.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="m4 9.25 3 3 7-7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ComboCheckbox({ checked = false, darkMode = false }: { checked?: boolean; darkMode?: boolean }) {
  const theme = comboTheme(darkMode);

  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] border-[1.5px]"
      style={{
        backgroundColor: checked ? theme.selected : "transparent",
        borderColor: checked ? "transparent" : theme.border,
      }}
    >
      {checked && <CheckIcon color={theme.selectedCheck} />}
    </span>
  );
}

function Chip({ label, darkMode = false }: { label: string; darkMode?: boolean }) {
  const theme = comboTheme(darkMode);

  return (
    <span
      className="flex h-8 shrink-0 items-center gap-1 rounded-full px-2 py-1"
      style={{ backgroundColor: theme.chip, color: theme.text }}
    >
      <span className="text-[15px] leading-5 tracking-[0px]">{label}</span>
      <XIcon color={theme.text} />
    </span>
  );
}

function Field({ state, darkMode = false }: { state: ComboBoxState; darkMode?: boolean }) {
  const theme = comboTheme(darkMode);
  const isSelected = state === "selected";
  const isFilling = state === "filling";

  return (
    <div className="flex w-[361px] flex-col gap-1">
      <div className="flex h-5 w-full items-start">
        <span className="text-[15px] leading-5 tracking-[0px]" style={{ color: theme.text }}>District</span>
        <span className="text-[15px] leading-5 tracking-[0px]" style={{ color: theme.required }}>*</span>
      </div>
      <div
        className="flex h-[52px] w-[361px] items-center justify-between overflow-hidden rounded-[12px] border px-2 py-2"
        style={{ backgroundColor: theme.surface, borderColor: theme.border }}
      >
        <div className={`flex min-w-0 flex-1 items-center px-2 ${isSelected ? "gap-2" : "justify-center"}`}>
          {isSelected ? (
            <>
              <Chip label="Colombo" darkMode={darkMode} />
              <Chip label="Jaffna" darkMode={darkMode} />
            </>
          ) : (
            <span
              className="min-w-0 flex-1 text-[15px] leading-5 tracking-[0px]"
              style={{ color: isFilling ? theme.text : theme.placeholder }}
            >
              {isFilling ? "Col|" : "Select district"}
            </span>
          )}
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px]">
          <CaretDownIcon color={theme.border} />
        </span>
      </div>
    </div>
  );
}

function ComboRow({
  label,
  checked = false,
  highlighted = false,
  darkMode = false,
}: {
  label: string;
  checked?: boolean;
  highlighted?: boolean;
  darkMode?: boolean;
}) {
  const theme = comboTheme(darkMode);

  return (
    <div
      className={`flex w-full items-center gap-2 ${highlighted ? "h-[38px] rounded-[8px] py-2 pl-4 pr-2" : "h-11 px-4 py-3"}`}
      style={{ backgroundColor: highlighted ? theme.surfaceHover : "transparent", color: theme.text }}
    >
      <ComboCheckbox checked={checked} darkMode={darkMode} />
      <span className={`tracking-[0px] ${highlighted ? "text-sm leading-[22px]" : "text-sm leading-5"}`}>{label}</span>
    </div>
  );
}

function ComboMenu({ state, darkMode = false }: { state: "filling" | "selected"; darkMode?: boolean }) {
  const theme = comboTheme(darkMode);
  const selected = state === "selected";

  return (
    <div
      className="flex w-[362px] flex-col overflow-hidden rounded-[16px] border py-2"
      style={{ backgroundColor: theme.surface, borderColor: theme.decorative, boxShadow: theme.shadow }}
    >
      <div className="flex w-full flex-col items-center justify-center gap-1 px-2">
        <div
          className="flex h-11 w-full items-center gap-2 rounded-[12px] border-[1.5px] px-3 py-3"
          style={{ backgroundColor: theme.surface, borderColor: theme.decorative }}
        >
          <SearchIcon color={theme.border} />
          <span className="text-[15px] leading-5 tracking-[0px]" style={{ color: theme.placeholder }}>Search</span>
        </div>
        <div className="flex w-full flex-col">
          <ComboRow label="Batticaloa" darkMode={darkMode} />
          <ComboRow label="Colombo" checked={selected} highlighted darkMode={darkMode} />
          <ComboRow label="Galle" darkMode={darkMode} />
          <ComboRow label={selected ? "Jaffna" : "Gampaha"} checked={selected} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

function ComboBoxPreview({ state, darkMode = false }: { state: ComboBoxState; darkMode?: boolean }) {
  const theme = comboTheme(darkMode);

  return (
    <div className="flex w-[361px] flex-col gap-1.5">
      <Field state={state} darkMode={darkMode} />
      {state === "default" ? (
        <p className="h-4 w-full text-xs leading-4 tracking-[0px]" style={{ color: theme.secondary }}>Help Text</p>
      ) : (
        <ComboMenu state={state} darkMode={darkMode} />
      )}
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

const COMBO_BOX_CODE = `export function ComboBox({ value, query, selectedItems, open }: ComboBoxProps) {
  return (
    <div className="flex w-[361px] flex-col gap-1.5">
      <label className="text-[15px] leading-5 text-[#111111]">District<span className="text-[#D32F2F]">*</span></label>
      <button className="flex h-[52px] items-center justify-between rounded-[12px] border border-[#8E949E] bg-[#FAFAFB] p-2">
        <span className="px-2 text-[15px] leading-5">{query || value || "Select district"}</span>
        <CaretDownIcon />
      </button>
      {open && (
        <div className="w-[362px] rounded-[16px] border border-[#DADDE2] bg-[#FAFAFB] py-2 shadow-lg">
          <SearchInput />
          {items.map((item) => <ComboBoxOption key={item} selected={selectedItems.includes(item)}>{item}</ComboBoxOption>)}
        </div>
      )}
    </div>
  );
}`;

export function ComboBoxSpec() {
  const [isDark, setIsDark] = useState(false);
  const theme = comboTheme(isDark);

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
          <div className="flex w-[393px] flex-col gap-5 rounded-[5px] p-4" style={{ backgroundColor: theme.frame }}>
            <ComboBoxPreview state="default" darkMode={isDark} />
            <ComboBoxPreview state="filling" darkMode={isDark} />
            <ComboBoxPreview state="selected" darkMode={isDark} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Component set", "393x802 frame with 16px padding and 20px gap", "States: Default, Filling, Variant3 selected"],
            ["Field", "361x52 control, 12px radius, 8px padding", "Fill #FAFAFB, border #8E949E"],
            ["Label", "15px / 20px Google Sans Regular", "Text #111111, required #D32F2F"],
            ["Open menu", "362px wide, 16px radius, 8px vertical padding", "Fill #FAFAFB, border #DADDE2, floating shadow"],
            ["Search bar", "Full-width within 8px menu padding, 44px high", "Border #DADDE2 at 1.5px, placeholder #B8BDC4"],
            ["Options", "Default rows 44px; highlighted row 38px", "Hover fill #F5F6F8, checkbox 24x24 with 6px radius"],
            ["Selected option", "Checkbox fill #FFC700 with white check", "Selected labels stay #111111"],
            ["Selected field", "Uses removable chips inside the 52px field", "Chip fill #F5F6F8, 9999px radius"],
            ["Dark mode", "Uses semantic dark tokens", "Surface, border, text, chip, hover, selected, and shadow adapt in preview."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Use combo box when users need to search within long option lists."],
            ["Do", "Use chips for multi-select values when selected options must remain visible."],
            ["Don't", "Do not use combo box for short fixed choices; use Select or Radio Button instead."],
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
        <CodeBlock code={COMBO_BOX_CODE} />
      </section>
    </div>
  );
}
