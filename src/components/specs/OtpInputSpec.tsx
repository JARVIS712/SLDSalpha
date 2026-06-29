"use client";

import React, { useState, useRef, KeyboardEvent, ChangeEvent, ClipboardEvent } from "react";

// ── Code snippet ──────────────────────────────────────────────────────────────

const OTP_INPUT_CODE = `// OtpInput — SLDS token implementation
// 6-cell, auto-advance, SMS autofill
// Borders: default 1px #8e949e · focused 1.5px #ffc700 · error 1.5px #d32f2f · disabled 1px #eceef1
// Radius: 12px (rounded-[12px])
// Sizes:
// - Small:  w-[44px] h-[60px] text-[20px] leading-[28px] tracking-[0px] font-medium
// - Medium: w-[48px] h-[68px] text-[26px] leading-[36px] tracking-[-0.5px] font-bold
// - Large:  w-[56px] h-[80px] text-[26px] leading-[36px] tracking-[-0.5px] font-bold

export type OtpInputSize = "Small" | "Medium" | "Large";
export type OtpInputState = "default" | "error" | "disabled";

export interface OtpInputProps {
  length?: number;
  size?: OtpInputSize;
  state?: OtpInputState;
  value?: string;
  forceFocusedIndex?: number;
  onChange?: (val: string) => void;
  onComplete?: (val: string) => void;
}

export function OtpInput({
  length = 6,
  size = "Medium",
  state = "default",
  value,
  forceFocusedIndex,
  onChange,
  onComplete,
}: OtpInputProps) {
  const [internalState, setInternalState] = useState<string[]>(Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  let currentValue = internalState;
  if (value !== undefined) {
    const vals = value.split("").slice(0, length);
    currentValue = Array(length).fill("");
    vals.forEach((v, i) => (currentValue[i] = v));
  }

  const updateValue = (newArr: string[]) => {
    if (value === undefined) {
      setInternalState(newArr);
    }
    const strVal = newArr.join("");
    onChange?.(strVal);
    if (strVal.length === length) {
      onComplete?.(strVal);
    }
  };

  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
      inputRefs.current[index]?.select();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) {
      const newArr = [...currentValue];
      newArr[index] = "";
      updateValue(newArr);
      return;
    }

    if (val.length === 1 || val.length === 2) {
      const char = val[val.length - 1];
      const newArr = [...currentValue];
      newArr[index] = char;
      updateValue(newArr);

      if (index < length - 1) {
        focusInput(index + 1);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!currentValue[index] && index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!pasted) return;

    const newArr = [...currentValue];
    let iter = 0;
    for (let i = activeIndex ?? 0; i < length && iter < pasted.length; i++) {
      newArr[i] = pasted[iter];
      iter++;
    }
    updateValue(newArr);

    const nextFocus = Math.min((activeIndex ?? 0) + pasted.length, length - 1);
    focusInput(nextFocus);
  };

  const sizeStyles = {
    Small:  "w-[44px] h-[60px] text-[20px] leading-[28px] tracking-[0px] font-medium",
    Medium: "w-[48px] h-[68px] text-[26px] leading-[36px] tracking-[-0.5px] font-bold",
    Large:  "w-[56px] h-[80px] text-[26px] leading-[36px] tracking-[-0.5px] font-bold",
  }[size];

  return (
    <div className="flex items-center gap-[10px]" onPaste={handlePaste}>
      {currentValue.map((char, index) => {
        const isFocused = activeIndex === index || forceFocusedIndex === index;
        const cellState = state === "disabled" ? "disabled" : state === "error" ? "error" : isFocused ? "focused" : "default";
        
        const border = {
          default: "border border-[#8e949e]",
          focused: "border-[1.5px] border-[#ffc700]",
          error: "border-[1.5px] border-[#d32f2f]",
          disabled: "border border-[#eceef1]",
        }[cellState];
        
        const textColor = cellState === "disabled" ? "#b8bdc4" : "#111";

        return (
          <div
            key={index}
            className={\`relative flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-white \${border} \${sizeStyles}\`}
          >
            <input
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              pattern="[0-9]*"
              maxLength={2}
              disabled={state === "disabled"}
              value={char}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="absolute inset-0 flex h-full w-full bg-transparent text-center outline-none selection:bg-transparent"
              style={{
                color: isFocused && !char ? "transparent" : textColor,
                caretColor: isFocused ? "#111" : "transparent"
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
`;

// ── Spec ──────────────────────────────────────────────────────────────────────

export type OtpInputSize = "Small" | "Medium" | "Large";
export type OtpInputState = "default" | "error" | "disabled";

export interface OtpInputProps {
  length?: number;
  size?: OtpInputSize;
  state?: OtpInputState;
  value?: string;
  forceFocusedIndex?: number;
  onChange?: (val: string) => void;
  onComplete?: (val: string) => void;
}

export function OtpInput({
  length = 6,
  size = "Medium",
  state = "default",
  value,
  forceFocusedIndex,
  onChange,
  onComplete,
}: OtpInputProps) {
  const [internalState, setInternalState] = useState<string[]>(
    Array(length).fill(""),
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  let currentValue = internalState;
  if (value !== undefined) {
    const vals = value.split("").slice(0, length);
    currentValue = Array(length).fill("");
    vals.forEach((v, i) => (currentValue[i] = v));
  }

  const updateValue = (newArr: string[]) => {
    if (value === undefined) {
      setInternalState(newArr);
    }
    const strVal = newArr.join("");
    onChange?.(strVal);
    if (strVal.length === length) {
      onComplete?.(strVal);
    }
  };

  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
      inputRefs.current[index]?.select();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) {
      const newArr = [...currentValue];
      newArr[index] = "";
      updateValue(newArr);
      return;
    }

    if (val.length === 1 || val.length === 2) {
      const char = val[val.length - 1];
      const newArr = [...currentValue];
      newArr[index] = char;
      updateValue(newArr);

      if (index < length - 1) {
        focusInput(index + 1);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!currentValue[index] && index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!pasted) return;

    const newArr = [...currentValue];
    let iter = 0;
    for (let i = activeIndex ?? 0; i < length && iter < pasted.length; i++) {
      newArr[i] = pasted[iter];
      iter++;
    }
    updateValue(newArr);

    const nextFocus = Math.min((activeIndex ?? 0) + pasted.length, length - 1);
    focusInput(nextFocus);
  };

  const sizeStyles = {
    Small:  "w-[44px] h-[60px] text-[20px] leading-[28px] tracking-[0px] font-medium",
    Medium: "w-[48px] h-[68px] text-[26px] leading-[36px] tracking-[-0.5px] font-bold",
    Large:  "w-[56px] h-[80px] text-[26px] leading-[36px] tracking-[-0.5px] font-bold",
  }[size];

  return (
    <div className="flex items-center gap-[10px]" onPaste={handlePaste}>
      {currentValue.map((char, index) => {
        const isFocused = activeIndex === index || forceFocusedIndex === index;
        const cellState =
          state === "disabled"
            ? "disabled"
            : state === "error"
              ? "error"
              : isFocused
                ? "focused"
                : "default";

        const border = {
          default: "border border-[#8e949e]",
          focused: "border-[1.5px] border-[#ffc700]",
          error: "border-[1.5px] border-[#d32f2f]",
          disabled: "border border-[#eceef1]",
        }[cellState];

        const textColor = cellState === "disabled" ? "#b8bdc4" : "#111";

        return (
          <div
            key={index}
            className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-white ${border} ${sizeStyles}`}
          >
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              pattern="[0-9]*"
              maxLength={2}
              disabled={state === "disabled"}
              value={char}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="absolute inset-0 flex h-full w-full bg-transparent text-center outline-none selection:bg-transparent"
              style={{
                color: isFocused && !char ? "transparent" : textColor,
                caretColor: isFocused ? "#111" : "transparent",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export function OtpInputSpec() {
  const [val, setVal] = useState("");

  return (
    <div className="flex w-full flex-col gap-8 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">OTP Input</h1>
        <p className="text-[var(--color-text-secondary)]">A specialized input for One-Time Passwords, supporting SMS autofill and auto-advancing blocks.</p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Interactive Preview (Medium)</h2>
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 py-16">
          <OtpInput
            size="Medium"
            length={6}
            value={val}
            onChange={setVal}
            onComplete={(v) => console.log("OTP Complete:", v)}
          />
          <div className="mt-4 text-sm text-gray-500">
            Value: {val || "---"}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Sizes</h2>
        <div className="flex flex-col gap-6 rounded-xl border border-gray-200 p-8">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-500">
              Large (w-[56px] h-[80px])
            </span>
            <OtpInput size="Large" length={4} value="12" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-500">
              Medium (w-[48px] h-[68px])
            </span>
            <OtpInput size="Medium" length={4} value="123" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-500">
              Small (w-[44px] h-[60px])
            </span>
            <OtpInput size="Small" length={4} value="1234" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">States</h2>
        <div className="flex flex-col gap-6 rounded-xl border border-gray-200 p-8">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-500">
              Default (Empty)
            </span>
            <OtpInput size="Medium" length={6} value="" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-500">
              Active / Focused State (Gold Border)
            </span>
            <OtpInput size="Medium" length={6} value="12" forceFocusedIndex={2} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-500">
              Filled State
            </span>
            <OtpInput size="Medium" length={6} value="123456" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-500">
              Error State
            </span>
            <OtpInput size="Medium" length={6} value="999" state="error" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-500">
              Disabled State
            </span>
            <OtpInput size="Medium" length={6} value="000" state="disabled" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Code</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-900">
          <pre className="overflow-x-auto p-4 text-sm text-gray-100">
            <code>{OTP_INPUT_CODE}</code>
          </pre>
        </div>
      </section>
    </div>
  );
}
