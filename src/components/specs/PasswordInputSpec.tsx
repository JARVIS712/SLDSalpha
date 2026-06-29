"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

type PasswordState = "default-hidden" | "default-shown" | "focused-hidden" | "focused-shown" | "error-hidden" | "error-shown" | "disabled";

function passwordTheme(darkMode: boolean) {
  return {
    frame: darkMode ? "var(--color-surface-page)" : "#FFFFFF",
    surface: darkMode ? "var(--color-surface-card)" : "#FFFFFF",
    border: darkMode ? "var(--color-border-default)" : "#8E949E",
    focus: darkMode ? "var(--color-action-primary)" : "#FFC700",
    error: darkMode ? "var(--color-feedback-error)" : "#D32F2F",
    disabledBorder: darkMode ? "var(--color-border-disabled)" : "#ECEEF1",
    text: darkMode ? "var(--color-text-primary)" : "#111111",
    secondary: darkMode ? "var(--color-text-secondary)" : "#676C73",
    placeholder: darkMode ? "var(--color-text-disabled)" : "#B8BDC4",
    disabled: darkMode ? "var(--color-text-disabled)" : "#B8BDC4",
    icon: darkMode ? "var(--color-icon-secondary)" : "#8E949E",
  };
}

function EyeIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2.75 10s2.6-4.25 7.25-4.25S17.25 10 17.25 10 14.65 14.25 10 14.25 2.75 10 2.75 10Z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="10" r="1.85" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

function EyeSlashIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m4 3.75 12 12.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.35 6.05A7.5 7.5 0 0 1 10 5.75c4.65 0 7.25 4.25 7.25 4.25a12.4 12.4 0 0 1-2.1 2.35" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.1 13.85a7.6 7.6 0 0 1-2.1.4C5.35 14.25 2.75 10 2.75 10a12 12 0 0 1 2.9-2.95" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PasswordInputPreview({ state, darkMode = false }: { state: PasswordState; darkMode?: boolean }) {
  const theme = passwordTheme(darkMode);
  const disabled = state === "disabled";
  const focused = state.startsWith("focused");
  const error = state.startsWith("error");
  const shown = state.endsWith("shown");
  const labelColor = disabled ? theme.disabled : theme.text;
  const borderColor = error ? theme.error : focused ? theme.focus : disabled ? theme.disabledBorder : theme.border;
  const helpColor = error ? theme.error : disabled ? theme.disabled : theme.secondary;
  const valueColor = focused || error ? theme.text : theme.placeholder;
  const value = disabled ? "Example" : shown ? (focused || error ? "DGH347847#" : "Example") : focused || error ? "●●●●●●●" : "Example";

  return (
    <div className="flex h-[98px] w-[361px] flex-col items-start gap-[6px]">
      <div className="flex w-full flex-col items-start gap-1">
        <div className="flex h-5 w-full items-start text-[15px] leading-5 tracking-[0px]" style={{ color: labelColor }}>
          <span>Password</span>
          <span style={{ color: disabled ? theme.disabled : theme.error }}>*</span>
        </div>
        <div
          className="flex h-[52px] w-full items-center justify-between overflow-hidden rounded-[12px] border py-2"
          style={{
            backgroundColor: theme.surface,
            borderColor,
            borderWidth: error || focused || disabled ? 1.6 : 1,
            paddingLeft: error || disabled ? 12 : 8,
            paddingRight: error || disabled ? 12 : 8,
          }}
        >
          <span className="flex min-w-0 flex-1 items-center justify-center px-2">
            <span className="min-w-0 flex-1 text-[15px] leading-5 tracking-[0px]" style={{ color: disabled ? theme.placeholder : valueColor }}>
              {value}
            </span>
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px]">
            {shown ? <EyeSlashIcon color={theme.icon} /> : <EyeIcon color={theme.icon} />}
          </span>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <p className="min-w-0 flex-1 text-xs leading-4 tracking-[0px]" style={{ color: helpColor }}>
          {error ? "Error Text" : "Help Text"}
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

const PASSWORD_INPUT_CODE = `export function PasswordInput({ value, showPassword, error, disabled }: PasswordInputProps) {
  return (
    <div className="flex w-[361px] flex-col gap-[6px]">
      <label className="text-[15px] leading-5">Password<span className="text-[#D32F2F]">*</span></label>
      <div className="flex h-[52px] items-center rounded-[12px] border border-[#8E949E] bg-white px-2 py-2">
        <input type={showPassword ? "text" : "password"} value={value} disabled={disabled} />
        <button type="button" aria-label={showPassword ? "Hide password" : "Show password"}>
          {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
        </button>
      </div>
      <p className="text-xs leading-4">{error || "Help Text"}</p>
    </div>
  );
}`;

export function PasswordInputSpec() {
  const [isDark, setIsDark] = useState(false);
  const theme = passwordTheme(isDark);

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
          <div className="grid w-[1633px] grid-cols-[361px_361px_361px_361px] gap-x-7 gap-y-[31px] rounded-[5px] p-5" style={{ backgroundColor: theme.frame }}>
            <PasswordInputPreview state="default-hidden" darkMode={isDark} />
            <PasswordInputPreview state="focused-hidden" darkMode={isDark} />
            <PasswordInputPreview state="error-hidden" darkMode={isDark} />
            <PasswordInputPreview state="disabled" darkMode={isDark} />
            <PasswordInputPreview state="default-shown" darkMode={isDark} />
            <PasswordInputPreview state="focused-shown" darkMode={isDark} />
            <PasswordInputPreview state="error-shown" darkMode={isDark} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Component set", "1633x280 frame; seven 361x98 variants", "Default, Focused, Error, Disabled; hidden and shown password states"],
            ["Container", "361px wide, 6px outer gap", "Label, 52px field, 16px help text"],
            ["Input field", "361x52, 12px radius, 8px or 12px horizontal padding", "Surface white, default border #8E949E"],
            ["Toggle icon", "36x36 icon button with 20px Eye or EyeSlash icon", "Eye for hidden, EyeSlash for shown"],
            ["Focused", "Focused border", "Border #FFC700 at 1.5px"],
            ["Error", "Error border and help text", "Border/text #D32F2F at 1.6px"],
            ["Disabled", "Muted label, border, placeholder, and help text", "Text #B8BDC4, border #ECEEF1"],
            ["Dark mode", "Uses semantic dark tokens", "Surface, label, placeholder, icon, border, focus, error, and disabled colors adapt."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Provide a show/hide password control with a clear accessible label."],
            ["Do", "Preserve typed values when toggling between hidden and shown states."],
            ["Don't", "Do not reveal passwords by default or use placeholder text as the only requirement guidance."],
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
        <CodeBlock code={PASSWORD_INPUT_CODE} />
      </section>
    </div>
  );
}
