"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

type SearchState = "default" | "typing" | "suggestion" | "filled";

function searchTheme(darkMode: boolean) {
  return {
    frame: darkMode ? "var(--color-surface-page)" : "#FFFFFF",
    surface: darkMode ? "var(--color-surface-card)" : "#FAFAFB",
    surfaceHover: darkMode ? "var(--color-surface-hover)" : "#F5F6F8",
    border: darkMode ? "var(--color-border-default)" : "#8E949E",
    focus: darkMode ? "var(--color-action-primary)" : "#FFC700",
    decorative: darkMode ? "var(--color-border-decorative)" : "#DADDE2",
    divider: darkMode ? "var(--color-border-decorative)" : "#E9EAEB",
    text: darkMode ? "var(--color-text-primary)" : "#111111",
    secondary: darkMode ? "var(--color-text-secondary)" : "#676C73",
    placeholder: darkMode ? "var(--color-text-disabled)" : "#B8BDC4",
    buttonBg: darkMode ? "var(--color-action-secondary)" : "#FFFFFF",
    buttonBorder: darkMode ? "var(--color-action-secondary-border)" : "#DADDE2",
    shadow: darkMode
      ? "0 18px 30px -12px rgba(0,0,0,0.55), 0 8px 12px -8px rgba(0,0,0,0.45)"
      : "0 10px 15px -3px rgba(0,0,0,0.12), 0 4px 6px -4px rgba(0,0,0,0.12)",
  };
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m6 6 8 8M14 6l-8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8.25 2.75 2.75 6.25-6.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3.25a4.75 4.75 0 1 1-4.18 2.49" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M3.75 3.75v2.4h2.4" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 5.5v2.75l2 1.15" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClearButton({ darkMode = false }: { darkMode?: boolean }) {
  const theme = searchTheme(darkMode);

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px]">
      <XIcon color={theme.border} />
    </span>
  );
}

function SearchBarField({ state, darkMode = false }: { state: Exclude<SearchState, "suggestion">; darkMode?: boolean }) {
  const theme = searchTheme(darkMode);
  const active = state === "typing";
  const filled = state === "filled";

  if (state === "default") {
    return (
      <div
        className="flex h-[52px] w-[362px] items-center gap-2 overflow-hidden rounded-[12px] border-[1.5px] px-3 py-4"
        style={{ backgroundColor: theme.surface, borderColor: theme.border }}
      >
        <SearchIcon color={theme.border} />
        <span className="text-[15px] leading-5 tracking-[0px]" style={{ color: theme.placeholder }}>Search</span>
      </div>
    );
  }

  return (
    <div
      className="flex h-[52px] w-[362px] items-center justify-between overflow-hidden rounded-[12px] border pl-3 pr-2 py-2"
      style={{
        backgroundColor: theme.surface,
        borderColor: active ? theme.focus : theme.border,
        borderWidth: active ? 1.5 : 1,
      }}
    >
      <span className="flex w-[212px] items-center gap-2">
        <SearchIcon color={theme.border} />
        <span className="truncate text-[15px] leading-5 tracking-[0px]" style={{ color: theme.text }}>
          {filled ? "Driving License" : "Driving Licen|"}
        </span>
      </span>
      {filled ? (
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border"
          style={{ backgroundColor: theme.buttonBg, borderColor: theme.buttonBorder }}
        >
          <XIcon color={theme.text} />
        </span>
      ) : (
        <ClearButton darkMode={darkMode} />
      )}
    </div>
  );
}

function SuggestionRow({
  children,
  highlighted = false,
  icon,
  trailing,
  darkMode = false,
}: {
  children: React.ReactNode;
  highlighted?: boolean;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  darkMode?: boolean;
}) {
  const theme = searchTheme(darkMode);

  return (
    <div
      className={`flex h-[38px] w-full items-center gap-2 ${highlighted ? "justify-between rounded-[8px] py-2 pl-4 pr-2" : "px-4 py-2"}`}
      style={{ backgroundColor: highlighted ? theme.surfaceHover : "transparent", color: theme.text }}
    >
      <span className="flex min-w-0 items-center gap-2">
        {icon}
        <span className="truncate text-sm leading-[22px] tracking-[0px]">{children}</span>
      </span>
      {trailing}
    </div>
  );
}

function SearchSuggestions({ darkMode = false }: { darkMode?: boolean }) {
  const theme = searchTheme(darkMode);

  return (
    <div className="flex w-[362px] flex-col gap-2">
      <SearchBarField state="typing" darkMode={darkMode} />
      <div
        className="flex max-h-64 w-full flex-col overflow-hidden rounded-[12px] border py-1"
        style={{ backgroundColor: theme.surface, borderColor: theme.decorative, boxShadow: theme.shadow }}
      >
        <div className="flex w-full flex-col px-2 pb-2">
          <SuggestionRow darkMode={darkMode}>Birth Certificate</SuggestionRow>
          <SuggestionRow highlighted trailing={<CheckIcon color={theme.text} />} darkMode={darkMode}>
            Driving License
          </SuggestionRow>
        </div>
        <div className="h-px w-full" style={{ backgroundColor: theme.divider }} />
        <div className="flex w-full items-center px-[6px] pt-px">
          <div className="flex flex-1 overflow-hidden rounded-[6px] px-2 pt-2">
            <span className="text-xs leading-4 tracking-[0px]" style={{ color: theme.secondary }}>RECENT SEARCHES</span>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <SuggestionRow icon={<ClockIcon color={theme.text} />} darkMode={darkMode}>National Identity Card</SuggestionRow>
          <SuggestionRow icon={<ClockIcon color={theme.text} />} darkMode={darkMode}>Birth Certificate</SuggestionRow>
        </div>
      </div>
    </div>
  );
}

function SearchPreview({ state, darkMode = false }: { state: SearchState; darkMode?: boolean }) {
  if (state === "suggestion") return <SearchSuggestions darkMode={darkMode} />;
  return <SearchBarField state={state} darkMode={darkMode} />;
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

const SEARCH_INPUT_CODE = `export function SearchInput({ value, suggestionsOpen }: SearchInputProps) {
  return (
    <div className="w-[362px]">
      <label className="sr-only">Search</label>
      <div className="flex h-[52px] items-center rounded-[12px] border border-[#8E949E] bg-[#FAFAFB] px-3">
        <SearchIcon />
        <input value={value} placeholder="Search" />
        {value && <button aria-label="Clear search"><XIcon /></button>}
      </div>
      {suggestionsOpen && <SearchSuggestions />}
    </div>
  );
}`;

export function SearchInputSpec() {
  const [isDark, setIsDark] = useState(false);
  const theme = searchTheme(isDark);

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
          <div className="flex w-[410px] flex-col gap-8 rounded-[5px] p-6" style={{ backgroundColor: theme.frame }}>
            <SearchPreview state="default" darkMode={isDark} />
            <SearchPreview state="typing" darkMode={isDark} />
            <SearchPreview state="suggestion" darkMode={isDark} />
            <SearchPreview state="filled" darkMode={isDark} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Component set", "410x570 frame with 24px horizontal padding", "States: Default, Typing, Search Suggestion, Filled"],
            ["Search bar", "362x52, 12px radius", "Default border #8E949E at 1.5px; focused border #FFC700"],
            ["Typing state", "Left padding 12px, right padding 8px, clear icon button 36x36", "Value text #111111"],
            ["Suggestion menu", "362x254, max-height 256px, 12px radius", "Fill #FAFAFB, border #DADDE2, floating shadow"],
            ["Suggestion rows", "38px high, 16px left padding", "Hover fill #F5F6F8, selected row check icon"],
            ["Recent searches", "Caption 12/16 section label with clock icons", "Text #676C73 for caption"],
            ["Dark mode", "Uses semantic dark tokens", "Surface, border, focus, text, hover, divider, and shadow adapt in preview."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Use search input for autocomplete, recent searches, and service lookup patterns."],
            ["Do", "Keep selected suggestions visually highlighted and expose a clear action when text is present."],
            ["Don't", "Do not use suggestion menus for irreversible actions; keep rows navigational or query-setting."],
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
        <CodeBlock code={SEARCH_INPUT_CODE} />
      </section>
    </div>
  );
}
