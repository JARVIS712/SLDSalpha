"use client";

import React, { useId, useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading, SpecTable } from "./shared";

type TextAreaState = "default" | "focused" | "error" | "disabled";

const TEXTAREA_BORDER: Record<TextAreaState, { color: string; width: number }> = {
  default: { color: "#8E949E", width: 1 },
  focused: { color: "#FFC700", width: 1.5 },
  error: { color: "#D32F2F", width: 1.5 },
  disabled: { color: "#ECEEF1", width: 1 },
};

const TEXTAREA_LABEL_COLOR: Record<TextAreaState, string> = {
  default: "#111111",
  focused: "#111111",
  error: "#111111",
  disabled: "#B8BDC4",
};

const TEXTAREA_REQUIRED_COLOR: Record<TextAreaState, string> = {
  default: "#D32F2F",
  focused: "#D32F2F",
  error: "#D32F2F",
  disabled: "#B8BDC4",
};

const TEXTAREA_HELP_COLOR: Record<TextAreaState, string> = {
  default: "#676C73",
  focused: "#676C73",
  error: "#D32F2F",
  disabled: "#B8BDC4",
};

const TEXTAREA_COUNT_COLOR: Record<TextAreaState, string> = {
  default: "#676C73",
  focused: "#676C73",
  error: "#676C73",
  disabled: "#B8BDC4",
};

const TEXTAREA_CONTENT_COLOR: Record<TextAreaState, string> = {
  default: "#111111",
  focused: "#111111",
  error: "#111111",
  disabled: "#B8BDC4",
};

const TEXTAREA_PLACEHOLDER_COLOR: Record<TextAreaState, string> = {
  default: "#B8BDC4",
  focused: "#111111",
  error: "#111111",
  disabled: "#B8BDC4",
};

const TEXTAREA_DARK_BORDER: Record<TextAreaState, { color: string; width: number }> = {
  default: { color: "var(--color-border-default)", width: 1 },
  focused: { color: "var(--color-action-primary)", width: 1.5 },
  error: { color: "var(--color-border-error)", width: 1.5 },
  disabled: { color: "var(--color-border-disabled)", width: 1 },
};

const TEXTAREA_DARK_LABEL_COLOR: Record<TextAreaState, string> = {
  default: "var(--color-text-primary)",
  focused: "var(--color-text-primary)",
  error: "var(--color-text-primary)",
  disabled: "var(--color-text-disabled)",
};

const TEXTAREA_DARK_REQUIRED_COLOR: Record<TextAreaState, string> = {
  default: "var(--color-feedback-error)",
  focused: "var(--color-feedback-error)",
  error: "var(--color-feedback-error)",
  disabled: "var(--color-text-disabled)",
};

const TEXTAREA_DARK_HELP_COLOR: Record<TextAreaState, string> = {
  default: "var(--color-text-secondary)",
  focused: "var(--color-text-secondary)",
  error: "var(--color-border-error)",
  disabled: "var(--color-text-disabled)",
};

const TEXTAREA_DARK_COUNT_COLOR: Record<TextAreaState, string> = {
  default: "var(--color-text-secondary)",
  focused: "var(--color-text-secondary)",
  error: "var(--color-text-secondary)",
  disabled: "var(--color-text-disabled)",
};

const TEXTAREA_DARK_CONTENT_COLOR: Record<TextAreaState, string> = {
  default: "var(--color-text-primary)",
  focused: "var(--color-text-primary)",
  error: "var(--color-text-primary)",
  disabled: "var(--color-text-disabled)",
};

const TEXTAREA_DARK_PLACEHOLDER_COLOR: Record<TextAreaState, string> = {
  default: "var(--color-text-disabled)",
  focused: "var(--color-text-primary)",
  error: "var(--color-text-primary)",
  disabled: "var(--color-text-disabled)",
};

interface TextAreaProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  state?: TextAreaState;
  helpText?: string;
  maxLength?: number;
  darkMode?: boolean;
  onChange?: (value: string) => void;
}

function TextArea({
  label = "Description",
  required = true,
  placeholder = "Description placeholder",
  defaultValue = "",
  value,
  state: forcedState,
  helpText = "Help Text",
  maxLength = 300,
  darkMode = false,
  onChange,
}: TextAreaProps) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const state: TextAreaState =
    forcedState === "focused" ? "focused" :
    forcedState === "error" ? "error" :
    forcedState === "disabled" ? "disabled" :
    isFocused ? "focused" : "default";
  const isDisabled = state === "disabled";
  const displayHelp = state === "error" ? "Error Text" : helpText;
  const border = darkMode ? TEXTAREA_DARK_BORDER[state] : TEXTAREA_BORDER[state];
  const labelColor = darkMode ? TEXTAREA_DARK_LABEL_COLOR[state] : TEXTAREA_LABEL_COLOR[state];
  const requiredColor = darkMode ? TEXTAREA_DARK_REQUIRED_COLOR[state] : TEXTAREA_REQUIRED_COLOR[state];
  const helpColor = darkMode ? TEXTAREA_DARK_HELP_COLOR[state] : TEXTAREA_HELP_COLOR[state];
  const countColor = darkMode ? TEXTAREA_DARK_COUNT_COLOR[state] : TEXTAREA_COUNT_COLOR[state];
  const contentColor = darkMode ? TEXTAREA_DARK_CONTENT_COLOR[state] : TEXTAREA_CONTENT_COLOR[state];
  const placeholderColor = darkMode ? TEXTAREA_DARK_PLACEHOLDER_COLOR[state] : TEXTAREA_PLACEHOLDER_COLOR[state];
  const surfaceColor = darkMode ? "var(--color-surface-card)" : "#FFFFFF";

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (value === undefined) setInternalValue(event.target.value);
    onChange?.(event.target.value);
  }

  return (
    <div className="flex w-[361px] flex-col gap-1.5">
      <div className="flex w-[361px] flex-col gap-1">
        <div className="flex h-5 w-[361px] items-start">
          <label htmlFor={id} className="text-[15px] leading-5 tracking-[0px]" style={{ color: labelColor }}>
            {label}
          </label>
          {required && (
            <span className="text-[15px] leading-5 tracking-[0px]" style={{ color: requiredColor }} aria-hidden="true">
              *
            </span>
          )}
        </div>

        <div
          className="flex h-32 w-[361px] flex-col justify-between rounded-[12px] p-2"
          style={{
            backgroundColor: surfaceColor,
            borderColor: border.color,
            borderStyle: "solid",
            borderWidth: border.width,
          }}
        >
          <div className="h-24 w-[345px] px-1">
            <textarea
              id={id}
              disabled={isDisabled}
              maxLength={maxLength}
              placeholder={placeholder}
              value={currentValue}
              onChange={handleChange}
              onFocus={() => !forcedState && setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="h-full w-[337px] resize-none bg-transparent p-0 text-[15px] leading-5 tracking-[0px] outline-none disabled:cursor-not-allowed disabled:opacity-100"
              style={{
                color: contentColor,
                caretColor: state === "focused" ? contentColor : "auto",
              }}
            />
            <style jsx>{`
              textarea::placeholder {
                color: ${placeholderColor};
                opacity: 1;
              }
            `}</style>
          </div>
          <div className="flex h-4 w-full justify-end">
            <span className="text-xs leading-4 tracking-[0px]" style={{ color: countColor }}>
              {currentValue.length}/{maxLength}
            </span>
          </div>
        </div>
      </div>

      <p className="h-4 w-[361px] text-xs leading-4 tracking-[0px]" style={{ color: helpColor }}>
        {displayHelp}
      </p>
    </div>
  );
}

function StaticFocusedTextArea({ darkMode = false }: { darkMode?: boolean }) {
  const labelColor = darkMode ? "var(--color-text-primary)" : "#111111";
  const requiredColor = darkMode ? "var(--color-feedback-error)" : "#D32F2F";
  const surfaceColor = darkMode ? "var(--color-surface-card)" : "#FFFFFF";
  const textColor = darkMode ? "var(--color-text-primary)" : "#111111";
  const helpColor = darkMode ? "var(--color-text-secondary)" : "#676C73";
  return (
    <div className="flex w-[361px] flex-col gap-1.5">
      <div className="flex w-[361px] flex-col gap-1">
        <div className="flex h-5 w-[361px] items-start">
          <span className="text-[15px] leading-5" style={{ color: labelColor }}>Description</span>
          <span className="text-[15px] leading-5" style={{ color: requiredColor }}>*</span>
        </div>
        <div className="flex h-32 w-[361px] flex-col justify-between rounded-[12px] border-[1.5px] border-[#FFC700] p-2" style={{ backgroundColor: surfaceColor }}>
          <div className="h-24 w-[345px] px-1">
            <span className="text-[15px] leading-5" style={{ color: textColor }}>|</span>
          </div>
          <div className="flex h-4 w-full justify-end">
            <span className="text-xs leading-4" style={{ color: helpColor }}>0/300</span>
          </div>
        </div>
      </div>
      <p className="h-4 w-[361px] text-xs leading-4" style={{ color: helpColor }}>Help Text</p>
    </div>
  );
}

const TEXTAREA_CODE = `type TextAreaState = "default" | "focused" | "error" | "disabled";

export function TextArea({ label = "Description", required = true, maxLength = 300, state = "default" }: TextAreaProps) {
  return (
    <div className="flex w-[361px] flex-col gap-1.5">
      <div className="flex w-[361px] flex-col gap-1">
        <div className="flex h-5 items-start">
          <label className="text-[15px] leading-5">Description</label>
          {required && <span className="text-[15px] leading-5 text-[#D32F2F]">*</span>}
        </div>
        <div className="flex h-32 flex-col justify-between rounded-[12px] border border-[#8E949E] bg-white p-2">
          <textarea className="h-24 w-[337px] resize-none bg-transparent px-1 text-[15px] leading-5 outline-none" />
          <span className="self-end text-xs leading-4 text-[#676C73]">0/{maxLength}</span>
        </div>
      </div>
      <p className="text-xs leading-4 text-[#676C73]">Help Text</p>
    </div>
  );
}`;

export function TextAreaSpec() {
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
        <Card className={`${isDark ? "dark bg-[var(--color-surface-page)]" : ""} p-5`}>
          <div className="grid gap-7 xl:grid-cols-2">
            <TextArea darkMode={isDark} />
            <StaticFocusedTextArea darkMode={isDark} />
            <TextArea state="error" defaultValue="Description placeholder" darkMode={isDark} />
            <TextArea state="disabled" darkMode={isDark} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Component set", "1568x214 with four 361x174 states", "Default, Focused, Error, Disabled"],
            ["Label", "15px / 20px, Google Sans Regular", "#111111; disabled #B8BDC4"],
            ["Required mark", "15px / 20px, adjacent to label", "#D32F2F; disabled #B8BDC4"],
            ["Textarea content", "361x128, 12px radius, 8px padding", "White fill, border changes by state"],
            ["Border", "Default 1px, focused/error 1.5px", "#8E949E, #FFC700, #D32F2F, disabled #ECEEF1"],
            ["Text area", "345x96 inner frame with 4px horizontal inset", "Placeholder #B8BDC4; value #111111"],
            ["Counter", "Bottom-right 12px / 16px", "0/300, #676C73; disabled #B8BDC4"],
            ["Help text", "361x16, 12px / 16px", "#676C73; error #D32F2F; disabled #B8BDC4"],
            ["Dark mode", "Uses semantic dark tokens", "Surface card, text primary/secondary, disabled, focus, and error border tokens."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Use Text Area for multi-line descriptions, reasons, comments, and application notes."],
            ["Do", "Keep the counter visible when a maximum length is enforced."],
            ["Don't", "Do not use Text Area for short single-line values; use Text Input instead."],
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
        <CodeBlock code={TEXTAREA_CODE} />
      </section>
    </div>
  );
}
