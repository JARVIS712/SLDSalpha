"use client";
import React, { useId, useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading, SriLankaFlag, ChevronDown } from "./shared";

// ── Inline SVG icons ──────────────────────────────────────────────────────────

function EnvelopeIcon({ color = "#8e949e" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="16" height="12" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M2 7l8 5 8-5" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon({ color = "#8e949e" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" stroke={color} strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2.5" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function InfoFilledIcon({ color = "#8e949e" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill={color} />
      <rect x="9.25" y="9" width="1.5" height="5" rx="0.75" fill="white" />
      <circle cx="10" cy="6.5" r="0.85" fill="white" />
    </svg>
  );
}

function ContactsIcon({ color = "#8e949e" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function ErrorCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" fill="#d32f2f" />
      <rect x="9.25" y="5.5" width="1.5" height="5" rx="0.75" fill="white" />
      <circle cx="10" cy="13" r="0.9" fill="white" />
    </svg>
  );
}

function SuccessCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" fill="#1faa63" />
      <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


// ── State-driven style maps ───────────────────────────────────────────────────

type InputState = "default" | "focused" | "error" | "disabled";

const BORDER_CLASS: Record<InputState, string> = {
  default:  "border border-solid border-[#8e949e]",
  focused:  "border-[1.5px] border-solid border-[#ffc700]",
  error:    "border-[1.6px] border-solid border-[#d32f2f]",
  disabled: "border-[1.6px] border-solid border-[#eceef1]",
};

const HELP_COLOR: Record<InputState, string> = {
  default:  "#676c73",
  focused:  "#676c73",
  error:    "#d32f2f",
  disabled: "#b8bdc4",
};

const LABEL_COLOR: Record<InputState, string> = {
  default:  "#111",
  focused:  "#111",
  error:    "#111",
  disabled: "#b8bdc4",
};

// Error state: icon stays gray — confirmed from Figma node 416-1988 screenshot
const INFO_ICON_COLOR: Record<InputState, string> = {
  default:  "#8e949e",
  focused:  "#8e949e",
  error:    "#8e949e",
  disabled: "#b8bdc4",
};

// ── TextInput component ───────────────────────────────────────────────────────
// h-52px · rounded-[--radius-lg] (12px, Figma --radius-2xl fallback)
// Icons: 36×36 · rounded-[--radius-md] (8px, Figma --radius-xl fallback)
// Help text: 12px / leading-4 / tracking-0
// state prop can be "focused" for spec/static display; otherwise auto from focus events

interface TextInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  state?: InputState;
  helpText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  showInfo?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  id?: string;
}

export function TextInput({
  label,
  required = false,
  placeholder = "",
  value,
  defaultValue,
  onChange,
  state: forcedState,
  helpText,
  leadingIcon,
  trailingIcon,
  showInfo = true,
  maxLength,
  showCharCount = false,
  id: externalId,
}: TextInputProps) {
  const autoId = useId();
  const inputId = externalId ?? autoId;
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  const currentValue = value !== undefined ? value : internalValue;

  const state: InputState =
    forcedState === "focused" ? "focused" :
    forcedState === "error"   ? "error"   :
    forcedState === "disabled"? "disabled":
    isFocused                 ? "focused" : "default";

  const isDisabled = state === "disabled";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
  };

  return (
    <div className="flex w-full flex-col gap-1.5">

      {/* Label + input grouped with 4px gap (Figma --spacing-xs) */}
      <div className="flex w-full flex-col gap-1">
        {/* Label row */}
        {label && (
          <div className="flex items-baseline gap-0.5">
            <label
              htmlFor={inputId}
              className="text-[15px] leading-5 tracking-[0px]"
              style={{ color: LABEL_COLOR[state] }}
            >
              {label}
            </label>
            {required && (
              <span className="text-[15px] leading-5" style={{ color: isDisabled ? "#b8bdc4" : "#d32f2f" }} aria-hidden="true">
                *
              </span>
            )}
          </div>
        )}

        {/* Input field — px-3 = 12px (Figma --spacing-lg) */}
        <div
          className={[
            "flex h-[52px] w-full items-center overflow-hidden rounded-[var(--radius-lg)] bg-white px-3 py-2",
            BORDER_CLASS[state],
          ].join(" ")}
        >
        {/* Leading icon */}
        {leadingIcon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)]">
            {leadingIcon}
          </div>
        )}

        {/* Native input — outline suppressed via inline style; border lives on the parent div */}
        <input
          id={inputId}
          type="text"
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          disabled={isDisabled}
          maxLength={maxLength}
          onFocus={() => !forcedState && setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="min-w-0 flex-1 bg-transparent px-2 text-[15px] leading-5 tracking-[0px] placeholder:text-[#b8bdc4] disabled:cursor-not-allowed disabled:opacity-100"
          style={{
            outline: "none",
            boxShadow: "none",
            color: isDisabled ? "#b8bdc4" : "#111",
          }}
        />

        {/* Trailing icon */}
        {trailingIcon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)]">
            {trailingIcon}
          </div>
        )}

        {/* Info icon */}
        {showInfo && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)]">
            <InfoFilledIcon color={INFO_ICON_COLOR[state]} />
          </div>
        )}
        </div>
      </div>{/* end label+input group */}

      {/* Help text + char count row */}
      {(helpText || (showCharCount && maxLength)) && (
        <div className="flex items-start justify-between gap-2">
          {helpText && (
            <p
              className="flex-1 text-[12px] leading-4 tracking-[0px]"
              style={{ color: HELP_COLOR[state] }}
            >
              {helpText}
            </p>
          )}
          {showCharCount && maxLength && (
            <p className="shrink-0 text-[12px] leading-4 tracking-[0px]" style={{ color: HELP_COLOR[state] }}>
              {currentValue.length}/{maxLength}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export interface PhoneNumberInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  state?: "default" | "focused" | "error" | "disabled";
  helpText?: string;
}

export function PhoneNumberInput({
  label = "Mobile Number",
  required = false,
  placeholder = "77 123 4567",
  value,
  defaultValue,
  onChange,
  state: forcedState,
  helpText,
}: PhoneNumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  const currentValue = value !== undefined ? value : internalValue;

  const state =
    forcedState === "focused" ? "focused" :
    forcedState === "error"   ? "error"   :
    forcedState === "disabled"? "disabled":
    isFocused                 ? "focused" : "default";

  const isDisabled = state === "disabled";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
  };

  const border = {
    default:  "border border-[#8e949e]",
    focused:  "border-[1.5px] border-[#ffc700]",
    error:    "border-[1.5px] border-[#d32f2f]",
    disabled: "border border-[#eceef1]",
  }[state];

  const helpColor  = { default: "#676c73", focused: "#676c73", error: "#d32f2f", disabled: "#b8bdc4" }[state];
  const labelColor = state === "disabled" ? "#b8bdc4" : "#111";

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex w-full flex-col gap-1">
        {label && (
          <div className="flex items-start text-[15px] leading-5 font-normal tracking-[0px]">
            <span style={{ color: labelColor }}>{label}</span>
            {required && <span className="text-[#d32f2f]">*</span>}
          </div>
        )}

        <div className={`flex h-[52px] w-full shrink-0 items-center justify-between overflow-hidden rounded-[12px] bg-white px-2 py-2 ${border}`}>
          <div className="flex shrink-0 items-center">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[8px]">
              <SriLankaFlag />
            </div>
            <div className="flex shrink-0 items-center justify-center px-1">
              <span className="text-[15px] font-normal leading-5 tracking-[0px]" style={{ color: labelColor }}>+94</span>
            </div>
            <div className="flex h-[28px] w-[20px] shrink-0 items-center justify-center overflow-hidden rounded-[8px]">
              <ChevronDown color={state === "disabled" ? "#b8bdc4" : "#111"} size={16} />
            </div>
          </div>

          <input
            type="tel"
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            disabled={isDisabled}
            onFocus={() => !forcedState && setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="min-w-[1px] flex-1 bg-transparent px-2 text-[15px] leading-5 tracking-[0px] outline-none placeholder:text-[#b8bdc4] disabled:cursor-not-allowed disabled:opacity-100"
            style={{ color: isDisabled ? "#b8bdc4" : "#111" }}
          />

          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[8px]">
            {state === "error" ? (
              <ErrorCircleIcon />
            ) : currentValue ? (
              <SuccessCheckIcon />
            ) : (
              <ContactsIcon color={state === "disabled" ? "#b8bdc4" : "#8e949e"} />
            )}
          </div>
        </div>
      </div>
      {helpText && (
        <div className="flex w-full shrink-0 items-center">
          <p className="flex-1 text-[12px] leading-4 tracking-[0px]" style={{ color: helpColor }}>
            {helpText}
          </p>
        </div>
      )}
    </div>
  );
}

const PHONE_INPUT_CODE = `// PhoneNumberInput — SLDS token implementation
// Built with a Sri Lankan flag (+94) prefix and validation states.

export interface PhoneNumberInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  state?: "default" | "focused" | "error" | "disabled";
  helpText?: string;
}

export function PhoneNumberInput({
  label = "Mobile Number",
  required = false,
  placeholder = "77 123 4567",
  value,
  defaultValue,
  onChange,
  state: forcedState,
  helpText,
}: PhoneNumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  const currentValue = value !== undefined ? value : internalValue;

  const state =
    forcedState === "focused" ? "focused" :
    forcedState === "error"   ? "error"   :
    forcedState === "disabled"? "disabled":
    isFocused                 ? "focused" : "default";

  const isDisabled = state === "disabled";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
  };

  const border = {
    default:  "border border-[#8e949e]",
    focused:  "border-[1.5px] border-[#ffc700]",
    error:    "border-[1.5px] border-[#d32f2f]",
    disabled: "border border-[#eceef1]",
  }[state];

  const helpColor  = { default: "#676c73", focused: "#676c73", error: "#d32f2f", disabled: "#b8bdc4" }[state];
  const labelColor = state === "disabled" ? "#b8bdc4" : "#111";

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex w-full flex-col gap-1">
        {label && (
          <div className="flex items-start text-[15px] leading-5 font-normal tracking-[0px]">
            <span style={{ color: labelColor }}>{label}</span>
            {required && <span className="text-[#d32f2f]">*</span>}
          </div>
        )}

        <div className={\`flex h-[52px] w-full shrink-0 items-center justify-between overflow-hidden rounded-[12px] bg-white px-2 py-2 \${border}\`}>
          <div className="flex shrink-0 items-center">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[8px]">
              <SriLankaFlag />
            </div>
            <div className="flex shrink-0 items-center justify-center px-1">
              <span className="text-[15px] font-normal leading-5 tracking-[0px]" style={{ color: labelColor }}>+94</span>
            </div>
            <div className="flex h-[28px] w-[20px] shrink-0 items-center justify-center overflow-hidden rounded-[8px]">
              <ChevronDown color={state === "disabled" ? "#b8bdc4" : "#111"} size={16} />
            </div>
          </div>

          <input
            type="tel"
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            disabled={isDisabled}
            onFocus={() => !forcedState && setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="min-w-[1px] flex-1 bg-transparent px-2 text-[15px] leading-5 tracking-[0px] outline-none placeholder:text-[#b8bdc4] disabled:cursor-not-allowed disabled:opacity-100"
            style={{ color: isDisabled ? "#b8bdc4" : "#111" }}
          />

          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[8px]">
            {state === "error" ? (
              <ErrorCircleIcon />
            ) : currentValue ? (
              <SuccessCheckIcon />
            ) : (
              <ContactsIcon color={state === "disabled" ? "#b8bdc4" : "#8e949e"} />
            )}
          </div>
        </div>
      </div>
      {helpText && (
        <div className="flex w-full shrink-0 items-center">
          <p className="flex-1 text-[12px] leading-4 tracking-[0px]" style={{ color: helpColor }}>
            {helpText}
          </p>
        </div>
      )}
    </div>
  );
}`;

// ── Code snippet ──────────────────────────────────────────────────────────────

const INPUT_CODE = `// TextInput — SLDS token implementation
// Borders: default 1px #8e949e · focused 1.5px #ffc700 · error 1.6px #d32f2f · disabled 1.6px #eceef1
// h-[52px] · rounded-[--radius-lg] (12px) · icons: 36×36 · rounded-[--radius-md] (8px)

type InputState = "default" | "focused" | "error" | "disabled";

interface TextInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  state?: InputState;    // "focused" for static/spec display; omit for interactive use
  helpText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  showInfo?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

export function TextInput({ label, required, placeholder, value, onChange, state: forcedState, helpText, leadingIcon, trailingIcon, showInfo = true, maxLength, showCharCount }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const state: InputState =
    forcedState === "focused"  ? "focused"  :
    forcedState === "error"    ? "error"    :
    forcedState === "disabled" ? "disabled" :
    isFocused ? "focused" : "default";

  const border = {
    default:  "border border-[#8e949e]",
    focused:  "border-[1.5px] border-[#ffc700]",
    error:    "border-[1.6px] border-[#d32f2f]",
    disabled: "border-[1.6px] border-[#eceef1]",
  }[state];

  const helpColor  = { default: "#676c73", focused: "#676c73", error: "#d32f2f", disabled: "#b8bdc4" }[state];
  const labelColor = state === "disabled" ? "#b8bdc4" : "#111";

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <div className="flex items-baseline gap-0.5">
          <label className="text-[15px] leading-5 tracking-[0px]" style={{ color: labelColor }}>{label}</label>
          {required && <span style={{ color: "#d32f2f" }} aria-hidden="true">*</span>}
        </div>
      )}

      <div className={\`flex h-[52px] w-full items-center overflow-hidden rounded-[var(--radius-lg)] bg-white px-2 py-2 \${border}\`}>
        {leadingIcon && <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)]">{leadingIcon}</div>}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          disabled={state === "disabled"}
          maxLength={maxLength}
          onFocus={() => !forcedState && setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="min-w-0 flex-1 bg-transparent px-2 text-[15px] leading-5 tracking-[0px] outline-none disabled:cursor-not-allowed"
          style={{ color: "#111" }}
        />
        {trailingIcon && <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)]">{trailingIcon}</div>}
        {showInfo && <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)]"><InfoFilledIcon /></div>}
      </div>

      {(helpText || (showCharCount && maxLength)) && (
        <div className="flex items-start justify-between gap-2">
          {helpText && <p className="flex-1 text-[12px] leading-4 tracking-[0px]" style={{ color: helpColor }}>{helpText}</p>}
          {showCharCount && maxLength && <p className="shrink-0 text-[12px] leading-4 tracking-[0px]" style={{ color: helpColor }}>{(value?.length ?? 0)}/{maxLength}</p>}
        </div>
      )}
    </div>
  );
}

// Usage
<TextInput label="Email" required placeholder="info@example.com" helpText="We'll never share your email." />
<TextInput label="Email" required state="error" helpText="Please enter a valid email address." />
<TextInput label="Email" required state="disabled" helpText="Contact admin to update." />`;

// ── Spec ──────────────────────────────────────────────────────────────────────

// Figma-accurate state display (confirmed from nodes 416-1962, 416-1988, 498-240):
// Focused  — gold border, cursor "|" in #111 (not placeholder), help text gray
// Error    — red border, placeholder shows in #b8bdc4, help text red (#d32f2f)
// Disabled — faint border, value text #b8bdc4, label+asterisk+help all #b8bdc4
const STATES: { label: string; state: InputState; helpText: string; placeholder?: string; value?: string }[] = [
  { label: "Default",  state: "default",  helpText: "Help Text",  placeholder: "info@example.com" },
  { label: "Focused",  state: "focused",  helpText: "Help Text",  value: "|" },
  { label: "Error",    state: "error",    helpText: "Help Text",  placeholder: "info@example.com" },
  { label: "Disabled", state: "disabled", helpText: "Help Text",  value: "info@example.com" },
];

export function TextInputSpec() {
  const [demoValue, setDemoValue] = useState("");
  const [demoError, setDemoError] = useState(false);
  const [showLeading, setShowLeading] = useState(true);
  const [showTrailing, setShowTrailing] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [showCharCount, setShowCharCount] = useState(false);

  const demoState: InputState | undefined = demoError ? "error" : undefined;

  return (
    <div className="space-y-14">

      {/* ── Interactive demo ──────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Leading icon",  checked: showLeading,  set: setShowLeading },
            { label: "Trailing icon", checked: showTrailing, set: setShowTrailing },
            { label: "Info button",   checked: showInfo,     set: setShowInfo },
            { label: "Char count",    checked: showCharCount,set: setShowCharCount },
            { label: "Error state",   checked: demoError,    set: setDemoError },
          ].map(({ label, checked, set }) => (
            <label key={label} className="flex cursor-pointer items-center gap-2 text-xs text-[var(--color-text-secondary)]">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => set(e.target.checked)}
                className="accent-[var(--color-action-primary)]"
              />
              {label}
            </label>
          ))}
        </div>

        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-page)] p-6">
          <div className="mx-auto max-w-[361px]">
            <TextInput
              label="Email"
              required
              placeholder="info@example.com"
              value={demoValue}
              onChange={setDemoValue}
              state={demoState}
              helpText={demoError ? "Please enter a valid email address." : "We'll never share your email."}
              leadingIcon={showLeading ? <EnvelopeIcon /> : undefined}
              trailingIcon={showTrailing ? <EyeIcon /> : undefined}
              showInfo={showInfo}
              maxLength={80}
              showCharCount={showCharCount}
            />
          </div>
        </div>
      </section>

      {/* ── All states ────────────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>All states</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {STATES.map(({ label, state, helpText, placeholder, value }) => (
            <div key={state} className="flex flex-col gap-2">
              <p className="text-xs font-medium text-[var(--color-text-tertiary)]">{label}</p>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-page)] p-5">
                <TextInput
                  label="Email"
                  required
                  placeholder={placeholder}
                  value={value}
                  state={state}
                  helpText={helpText}
                  leadingIcon={<EnvelopeIcon color={state === "disabled" ? "#b8bdc4" : "#8e949e"} />}
                  showInfo
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Variants ──────────────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Variants</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">

          {/* No icons */}
          <div className="flex flex-col gap-2 px-5 py-4">
            <p className="text-xs font-medium text-[var(--color-text-tertiary)]">No icons</p>
            <div className="max-w-[361px]">
              <TextInput label="Full name" placeholder="Janaka Perera" helpText="Enter your full legal name." showInfo={false} />
            </div>
          </div>

          {/* With trailing icon (password reveal) */}
          <div className="flex flex-col gap-2 px-5 py-4">
            <p className="text-xs font-medium text-[var(--color-text-tertiary)]">With trailing icon — password reveal</p>
            <div className="max-w-[361px]">
              <TextInput label="Password" required placeholder="••••••••" trailingIcon={<EyeIcon />} showInfo={false} />
            </div>
          </div>

          {/* Character count */}
          <div className="flex flex-col gap-2 px-5 py-4">
            <p className="text-xs font-medium text-[var(--color-text-tertiary)]">Character count</p>
            <div className="max-w-[361px]">
              <TextInput
                label="Short bio"
                placeholder="Tell us about yourself…"
                helpText="Keep it brief."
                showInfo={false}
                maxLength={100}
                showCharCount
              />
            </div>
          </div>

          {/* Optional field (no asterisk) */}
          <div className="flex flex-col gap-2 px-5 py-4">
            <p className="text-xs font-medium text-[var(--color-text-tertiary)]">Optional field</p>
            <div className="max-w-[361px]">
              <TextInput label="Middle name" placeholder="Optional" helpText="Leave blank if not applicable." showInfo={false} />
            </div>
          </div>

        </Card>
      </section>

      {/* ── Phone Number Input Variant ────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Phone Number Input variant</SectionHeading>
        <p className="text-sm text-[var(--color-text-secondary)]">
          A specialized text input for capturing mobile phone numbers, featuring a country selector flag dropdown, prefix country code (+94), and trailing status indicators (Contacts list icon by default, checkmark on valid input, and error icon on invalid entry).
        </p>
        <Card className="p-6">
          <div className="mx-auto max-w-[361px]">
            <PhoneNumberInput
              required
              label="Mobile Number"
              helpText="Enter your mobile number without the leading 0 (e.g., 77 123 4567)."
            />
          </div>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Default state", state: "default" as InputState, value: "", help: "Help Text" },
            { label: "Focused state", state: "focused" as InputState, value: "712 345 678", help: "Help Text" },
            { label: "Filled state", state: "default" as InputState, value: "712 345 678", help: "Help Text" },
            { label: "Error state", state: "error" as InputState, value: "", help: "Error Text" },
            { label: "Disabled state", state: "disabled" as InputState, value: "712 345 678", help: "Help Text" },
          ].map(({ label, state, value, help }) => (
            <div key={label} className="flex flex-col gap-2">
              <p className="text-xs font-medium text-[var(--color-text-tertiary)]">{label}</p>
              <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-page)] p-5">
                <PhoneNumberInput
                  label="Mobile Number"
                  required
                  value={value}
                  state={state}
                  helpText={help}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Anatomy & tokens ─────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { layer: "Outer gap",        token: "gap-1.5 (6px) between label and input — Figma --space/sm" },
            { layer: "Label",            token: "15px · leading-5 · tracking-0 · color #111 (disabled: #b8bdc4)" },
            { layer: "Required mark",    token: "* · color #d32f2f — Figma --input/error-text" },
            { layer: "Input height",     token: "h-[52px]" },
            { layer: "Input radius",     token: "rounded-[var(--radius-lg)] — 12px (Figma --radius-2xl fallback 12px)" },
            { layer: "Input bg",         token: "bg-white — Figma --surface/s0" },
            { layer: "Border default",   token: "1px · #8e949e — Figma --input/border/default" },
            { layer: "Border focused",   token: "1.5px · #ffc700 — Figma --input/border/focused (gold-500)" },
            { layer: "Border error",     token: "1.6px · #d32f2f — Figma --input/border/error" },
            { layer: "Border disabled",  token: "1.6px · #eceef1 — Figma --input/border/disabled" },
            { layer: "Input text",       token: "15px · leading-5 · tracking-0 · color #111" },
            { layer: "Placeholder",      token: "#b8bdc4 — Figma --input/placeholder" },
            { layer: "Icon slot",        token: "36×36px · rounded-[var(--radius-md)] (8px, Figma --radius-xl fallback 8px)" },
            { layer: "Info icon",        token: "Filled circle · color #8e949e (all states) · #b8bdc4 disabled — stays gray even in error state" },
            { layer: "Help text",        token: "12px · leading-4 · tracking-0 · default/focused #676c73 · error #d32f2f · disabled #b8bdc4" },
          ].map(({ layer, token }) => (
            <div key={layer} className="flex gap-4 px-5 py-3">
              <p className="w-36 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{layer}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{token}</p>
            </div>
          ))}
        </Card>
      </section>

      {/* ── Usage ─────────────────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { label: "Do",    note: "Always include a visible label. Never rely on placeholder text as a substitute — placeholders disappear on input and harm accessibility." },
            { label: "Do",    note: "Mark required fields with * and explain the convention once per form ('Fields marked * are required')." },
            { label: "Do",    note: "Show the error state only after the user has interacted with the field (on blur or on submit), not while typing." },
            { label: "Do",    note: "Use help text to explain format, constraints, or examples — e.g. 'NIC format: 123456789V or 199012345678'." },
            { label: "Do",    note: "Show character count when there is a meaningful limit that users need to manage — profile bios, SMS fields, short descriptions." },
            { label: "Don't", note: "Don't use placeholder text as a label. Placeholders are for example values only (e.g. 'info@example.com', not 'Email address')." },
            { label: "Don't", note: "Don't disable fields unless the user genuinely cannot edit them. Prefer read-only display patterns if the value should be visible." },
            { label: "Don't", note: "Don't show the error border without also showing error help text. The color alone is not accessible — text is required." },
            { label: "Don't", note: "Don't stack multiple icons on the same side. The info button always sits in the trailing position — leading and trailing icon share the remaining slots." },
          ].map(({ label, note }, i) => (
            <div key={i} className="flex gap-4 px-5 py-3">
              <span className={`shrink-0 text-xs font-semibold uppercase tracking-wide ${label === "Do" ? "text-[var(--green-600)]" : "text-[var(--red-600)]"}`}>
                {label}
              </span>
              <p className="text-sm text-[var(--color-text-secondary)]">{note}</p>
            </div>
          ))}
        </Card>
      </section>

      {/* ── Code ──────────────────────────────────────────────────────────── */}

      <section className="space-y-4">
        <SectionHeading>Code — Text Input</SectionHeading>
        <CodeBlock code={INPUT_CODE} />
      </section>

      <section className="space-y-4">
        <SectionHeading>Code — Phone Number Input</SectionHeading>
        <CodeBlock code={PHONE_INPUT_CODE} />
      </section>

    </div>
  );
}
