"use client";
import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

// ── Progress Bar ────────────────────────────────────────────────────────────
// Fill: --green-500 (#1faa63) · Track: --color-surface-sunken (#f5f6f8)
// Height: 6px · rounded-full · label: 15px right-aligned w-40px

function ProgressBar({
  value,
  showLabel = true,
}: {
  value: number;
  showLabel?: boolean;
}) {
  const v = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div className="flex w-full items-center gap-3">
      <div className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-[var(--color-surface-sunken)]">
        <div
          role="progressbar"
          aria-valuenow={v}
          aria-valuemin={0}
          aria-valuemax={100}
          className="absolute inset-y-0 left-0 h-full rounded-full bg-[var(--green-500)] transition-[width] duration-300 ease-out"
          style={{ width: `${v}%` }}
        />
      </div>
      {showLabel && (
        <p className="w-10 shrink-0 text-right text-[15px] leading-5 tracking-[0px] text-[var(--color-text-secondary)]">
          {v}%
        </p>
      )}
    </div>
  );
}

// ── Stepper ─────────────────────────────────────────────────────────────────
// Active: --color-action-primary (gold-500 #ffc700) · Inactive: --color-surface-sunken
// Height: 6px · rounded-full · gap 8px · px-4 py-1

function Stepper({
  step,
  total = 6,
}: {
  step: number;   // number of completed steps (0 = none, total = all done)
  total?: number;
}) {
  return (
    <div className="flex w-full items-center gap-2 px-4 py-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={[
            "h-[6px] min-w-0 flex-1 rounded-full transition-colors duration-200",
            i < step
              ? "bg-[var(--color-action-primary)]"
              : "bg-[var(--color-surface-sunken)]",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

// ── Code snippet ───────────────────────────────────────────────────────────

const PROGRESS_CODE = `// Progress Bar — SLDS token implementation
// Continuous linear bar · 0–100 · green fill · optional % label

interface ProgressBarProps {
  value: number;      // 0–100
  showLabel?: boolean;
}

export function ProgressBar({ value, showLabel = true }: ProgressBarProps) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div className="flex w-full items-center gap-3">
      {/* Track */}
      <div className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-[var(--color-surface-sunken)]">
        {/* Fill */}
        <div
          role="progressbar"
          aria-valuenow={v}
          aria-valuemin={0}
          aria-valuemax={100}
          className="absolute inset-y-0 left-0 h-full rounded-full bg-[var(--green-500)] transition-[width] duration-300"
          style={{ width: \`\${v}%\` }}
        />
      </div>
      {showLabel && (
        <p className="w-10 shrink-0 text-right text-[15px] leading-5 tracking-[0px] text-[var(--color-text-secondary)]">
          {v}%
        </p>
      )}
    </div>
  );
}

// ── Stepper — SLDS token implementation ────────────────────────────────────
// Discrete segments · gold for completed steps · used in multi-step forms

interface StepperProps {
  step: number;    // number of completed segments (0 = none, total = all)
  total?: number;  // default 6
}

export function Stepper({ step, total = 6 }: StepperProps) {
  return (
    <div className="flex w-full items-center gap-2 px-4 py-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={[
            "h-[6px] min-w-0 flex-1 rounded-full transition-colors duration-200",
            i < step
              ? "bg-[var(--color-action-primary)]"   // gold-500 · #ffc700 — completed
              : "bg-[var(--color-surface-sunken)]",  // neutral-100 · #f5f6f8 — pending
          ].join(" ")}
        />
      ))}
    </div>
  );
}`;

// ── Main spec ──────────────────────────────────────────────────────────────

const LEVELS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const TOTAL_OPTIONS = [4, 5, 6, 7];

export function ProgressBarSpec() {
  const [isDark, setIsDark] = useState(false);

  // Progress bar
  const [progress, setProgress] = useState(60);
  const [showLabel, setShowLabel] = useState(true);

  // Stepper
  const [step, setStep] = useState(3);
  const [totalSteps, setTotalSteps] = useState(6);

  return (
    <div className="space-y-14">

      {/* ── Progress Bar ──────────────────────────────────────────────────── */}

      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading>Progress Bar</SectionHeading>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
          >
            {isDark ? "☀ Light mode" : "☾ Dark mode"}
          </button>
        </div>

        {/* Live preview */}
        <div className={isDark ? "dark rounded-[var(--radius-xl)] bg-[var(--color-surface-page)] p-6 space-y-5" : "rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-6 space-y-5"}>
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-1 min-w-[160px] items-center gap-3">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="flex-1 accent-[var(--green-500)]"
              />
              <span className="w-10 shrink-0 text-right text-sm font-medium text-[var(--color-text-primary)]">
                {progress}%
              </span>
            </div>
            <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
              <input
                type="checkbox"
                checked={showLabel}
                onChange={(e) => setShowLabel(e.target.checked)}
                className="accent-[var(--green-500)]"
              />
              Show label
            </label>
          </div>

          {/* Live bar */}
          <ProgressBar value={progress} showLabel={showLabel} />
        </div>

        {/* All levels */}
        <div>
          <p className="mb-3 text-sm font-medium text-[var(--color-text-secondary)]">All levels</p>
          <Card>
            <div className="divide-y divide-[var(--color-border-decorative)]">
              {LEVELS.map((level) => (
                <div key={level} className="flex items-center gap-4 px-5 py-3">
                  <span className="w-8 shrink-0 text-xs text-[var(--color-text-tertiary)]">{level}%</span>
                  <div className="flex-1">
                    <ProgressBar value={level} showLabel={false} />
                  </div>
                  <span className="w-6 shrink-0 text-right text-xs text-[var(--color-text-tertiary)]">
                    {level === 0 ? "—" : level === 100 ? "✓" : ""}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ── Stepper ───────────────────────────────────────────────────────── */}

      <div className="space-y-8">
        <SectionHeading>Stepper</SectionHeading>

        {/* Live preview */}
        <div className={isDark ? "dark rounded-[var(--radius-xl)] bg-[var(--color-surface-page)] p-6 space-y-5" : "rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-6 space-y-5"}>
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Step counter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-text-secondary)]">Step</span>
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] text-sm text-[var(--color-text-primary)] disabled:opacity-30"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium text-[var(--color-text-primary)]">
                {step} / {totalSteps}
              </span>
              <button
                onClick={() => setStep(Math.min(totalSteps, step + 1))}
                disabled={step === totalSteps}
                className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] text-sm text-[var(--color-text-primary)] disabled:opacity-30"
              >
                +
              </button>
            </div>

            {/* Total steps */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-text-secondary)]">Total</span>
              {TOTAL_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => { setTotalSteps(n); setStep(Math.min(step, n)); }}
                  className={[
                    "h-7 w-7 rounded-[var(--radius-md)] text-xs font-medium",
                    n === totalSteps
                      ? "bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)]"
                      : "border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] text-[var(--color-text-secondary)]",
                  ].join(" ")}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Live stepper */}
          <Stepper step={step} total={totalSteps} />
        </div>

        {/* All step states for 6-step */}
        <div>
          <p className="mb-3 text-sm font-medium text-[var(--color-text-secondary)]">All step states (6 steps)</p>
          <Card>
            <div className="divide-y divide-[var(--color-border-decorative)]">
              {[0, 1, 2, 3, 4, 5, 6].map((s) => (
                <div key={s} className="flex items-center gap-4 px-5 py-3">
                  <span className="w-20 shrink-0 text-xs text-[var(--color-text-tertiary)]">
                    {s === 0 ? "Start" : s === 6 ? "Complete" : `Step ${s}`}
                  </span>
                  <div className="flex-1">
                    <Stepper step={s} total={6} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ── Anatomy ───────────────────────────────────────────────────────── */}

      <section>
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>
        <div className="space-y-4">

          {/* Progress Bar tokens */}
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Progress Bar</p>
          <Card className="divide-y divide-[var(--color-border-decorative)]">
            {[
              { prop: "Track color",    value: "--color-surface-sunken (neutral-100 · #f5f6f8)" },
              { prop: "Fill color",     value: "--green-500 (#1faa63) — maps to Figma --progress/fill" },
              { prop: "Height",         value: "6px" },
              { prop: "Border-radius",  value: "rounded-full (9999px) — container + fill both rounded" },
              { prop: "Label",          value: "--color-text-secondary · 15px · leading-5 · tracking-0 · right-aligned · w-40px" },
              { prop: "Gap",            value: "12px between bar and label (gap-3)" },
              { prop: "Animation",      value: "transition-[width] duration-300 ease-out — smooth fill change" },
              { prop: "ARIA",           value: "role=progressbar · aria-valuenow · aria-valuemin=0 · aria-valuemax=100" },
            ].map(({ prop, value }) => (
              <div key={prop} className="flex gap-4 px-5 py-3">
                <p className="w-36 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{prop}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{value}</p>
              </div>
            ))}
          </Card>

          {/* Stepper tokens */}
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Stepper</p>
          <Card className="divide-y divide-[var(--color-border-decorative)]">
            {[
              { prop: "Active fill",    value: "--color-action-primary (gold-500 · #ffc700) — maps to Figma --step/active/background" },
              { prop: "Inactive fill",  value: "--color-surface-sunken (neutral-100 · #f5f6f8)" },
              { prop: "Height",         value: "6px" },
              { prop: "Border-radius",  value: "rounded-full (9999px)" },
              { prop: "Gap",            value: "8px between segments (gap-2)" },
              { prop: "Padding",        value: "16px horizontal · 4px vertical (px-4 py-1)" },
              { prop: "Animation",      value: "transition-colors duration-200 — step advancement" },
              { prop: "Default total",  value: "6 segments (customisable)" },
            ].map(({ prop, value }) => (
              <div key={prop} className="flex gap-4 px-5 py-3">
                <p className="w-36 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{prop}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{value}</p>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* ── Usage ─────────────────────────────────────────────────────────── */}

      <section>
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { label: "Do",    note: "Use Progress Bar for continuous, value-based progress: file uploads, loading tasks, profile completion." },
            { label: "Do",    note: "Use Stepper for multi-step forms or onboarding — each segment represents one discrete step." },
            { label: "Do",    note: "Always include role=\"progressbar\" and aria-valuenow/min/max on the fill element for accessibility." },
            { label: "Do",    note: "Show the percentage label when the exact value helps users (uploads, quota). Hide it for ambient/decorative use." },
            { label: "Do",    note: "Advance the Stepper with each confirmed step completion — never skip steps visually." },
            { label: "Don't", note: "Don't use the Progress Bar as a loading indicator for unknown-duration tasks — use a Spinner instead." },
            { label: "Don't", note: "Don't set a fixed pixel width on the Progress Bar — let it be flex-1 to fill its container." },
            { label: "Don't", note: "Don't use the Stepper with more than 7 steps — segments become too narrow. Consider a numbered list instead." },
            { label: "Don't", note: "Don't animate progress backwards — it implies a regression. If resetting, snap to 0 without transition." },
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

      <section>
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={PROGRESS_CODE} />
      </section>

    </div>
  );
}
