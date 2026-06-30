"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading, SpecTable, specTheme, XIcon, SriLankaFlag } from "./shared";

type PhoneState = "default" | "focused" | "filled" | "error" | "disabled";

function phoneTheme(darkMode: boolean) {
  return {
    ...specTheme(darkMode),
    disabledBorder: darkMode ? "var(--color-border-disabled)" : "#ECEEF1",
    icon:           darkMode ? "var(--color-icon-secondary)" : "#8E949E",
    success:        darkMode ? "var(--color-feedback-success)" : "#1FAA63",
  };
}

function CaretDownIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6 8 10l4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" fill={color} />
      <path d="m6.75 10.15 2.1 2.1 4.45-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XCircleIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" fill={color} />
      <path d="m7.5 7.5 5 5M12.5 7.5l-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneNumberPreview({ state, darkMode = false }: { state: PhoneState; darkMode?: boolean }) {
  const theme = phoneTheme(darkMode);
  const disabled = state === "disabled";
  const error = state === "error";
  const focused = state === "focused";
  const filled = state === "filled" || state === "focused" || state === "error" || state === "disabled";
  const labelColor = disabled ? theme.disabled : theme.text;
  const borderColor = error ? theme.error : focused ? theme.focus : disabled ? theme.disabledBorder : theme.border;
  const helpColor = error ? theme.error : disabled ? theme.disabled : theme.secondary;

  return (
    <div className="flex h-[98px] w-[361px] flex-col items-start gap-[6px]">
      <div className="flex w-full flex-col items-start gap-1">
        <div className="flex h-5 w-full items-start text-[15px] leading-5 tracking-[0px]" style={{ color: labelColor }}>
          <span>Mobile Number</span>
          <span style={{ color: disabled ? theme.disabled : theme.error }}>*</span>
        </div>
        <div
          className="flex h-[52px] w-full items-center justify-between overflow-hidden rounded-[12px] border px-2 py-2"
          style={{
            backgroundColor: theme.surface,
            borderColor,
            borderWidth: focused || error ? 1.5 : 1,
          }}
        >
          <div className="flex shrink-0 items-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-[8px]">
              <SriLankaFlag disabled={disabled} />
            </span>
            <span className="flex items-center justify-center px-1 text-[15px] leading-5 tracking-[0px]" style={{ color: disabled ? theme.disabled : theme.text }}>
              +94
            </span>
            <span className="flex h-7 w-5 items-center justify-center rounded-[8px]">
              <CaretDownIcon color={disabled ? theme.disabled : theme.icon} />
            </span>
          </div>
          <span className="flex min-w-0 flex-1 items-center justify-center px-2">
            <span className="min-w-0 flex-1 text-[15px] leading-5 tracking-[0px]" style={{ color: filled ? (disabled ? theme.placeholder : theme.text) : theme.placeholder }}>
              {filled ? "712 345 678" : "77 123 4567"}
            </span>
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px]">
            {state === "filled" ? <CheckCircleIcon color={theme.success} /> : state === "error" ? <XCircleIcon color={theme.error} /> : <XIcon color={disabled ? theme.disabled : theme.icon} />}
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

const PHONE_INPUT_CODE = `export function PhoneNumberInput({ value, state }: PhoneNumberInputProps) {
  return (
    <div className="flex w-[361px] flex-col gap-[6px]">
      <label className="text-[15px] leading-5">Mobile Number<span className="text-[#D32F2F]">*</span></label>
      <div className="flex h-[52px] items-center rounded-[12px] border border-[#8E949E] bg-white px-2 py-2">
        <button type="button" aria-label="Country code">🇱🇰 +94</button>
        <input inputMode="tel" placeholder="77 123 4567" value={value} />
        <button type="button" aria-label="Clear phone number"><XIcon /></button>
      </div>
      <p className="text-xs leading-4">Help Text</p>
    </div>
  );
}`;

export function PhoneNumberInputSpec() {
  const [isDark, setIsDark] = useState(false);
  const theme = phoneTheme(isDark);

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
          <div className="flex w-[1957px] gap-7 rounded-[5px] p-5" style={{ backgroundColor: theme.frame }}>
            <PhoneNumberPreview state="default" darkMode={isDark} />
            <PhoneNumberPreview state="focused" darkMode={isDark} />
            <PhoneNumberPreview state="filled" darkMode={isDark} />
            <PhoneNumberPreview state="error" darkMode={isDark} />
            <PhoneNumberPreview state="disabled" darkMode={isDark} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Component set", "1957x138 frame; five 361x98 variants", "Default, Focused, Filled, Error, Disabled"],
            ["Container", "361px wide, 6px outer gap", "Label, 52px field, 16px help text"],
            ["Country control", "36px flag button, +94 label, 20px caret button", "Sri Lanka default"],
            ["Input field", "361x52, 12px radius, 8px padding", "Default border #8E949E"],
            ["Focused", "Focused border", "Border #FFC700 at 1.5px"],
            ["Filled", "Success trailing icon", "CheckCircle in success green"],
            ["Error", "Error border, error help text, error trailing icon", "Border/text #D32F2F"],
            ["Disabled", "Muted label, border, flag, value, icons, and help text", "Text #B8BDC4, border #ECEEF1"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={PHONE_INPUT_CODE} />
      </section>
    </div>
  );
}
