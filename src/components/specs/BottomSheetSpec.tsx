"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading, SpecTable, specTheme } from "./shared";

function bottomSheetTheme(darkMode: boolean) {
  return {
    ...specTheme(darkMode),
    frame:        darkMode ? "var(--color-surface-page)" : "#F5F6F8",
    sunken:       darkMode ? "var(--color-surface-sunken)" : "#F5F6F8",
    buttonBg:     darkMode ? "var(--color-action-secondary)" : "#FFFFFF",
    buttonBorder: darkMode ? "var(--color-action-secondary-border)" : "#DADDE2",
  };
}

function LanguageButton({ children, darkMode = false }: { children: React.ReactNode; darkMode?: boolean }) {
  const theme = bottomSheetTheme(darkMode);

  return (
    <button
      type="button"
      className="flex h-14 w-full items-center justify-center overflow-hidden rounded-[12px] border-2 p-4 text-[17px] font-medium leading-6 tracking-[0px]"
      style={{
        backgroundColor: theme.buttonBg,
        borderColor: theme.buttonBorder,
        color: theme.text,
      }}
    >
      <span className="px-[6px]">{children}</span>
    </button>
  );
}

export function LanguageSelectorSheetPreview({ darkMode = false }: { darkMode?: boolean }) {
  const theme = bottomSheetTheme(darkMode);

  return (
    <div className="flex min-h-[360px] w-[393px] items-end rounded-[28px] p-4" style={{ backgroundColor: theme.frame }}>
      <div
        className="relative flex h-[276px] w-[361px] flex-col items-center gap-4 overflow-hidden rounded-[24px] px-4 py-6"
        style={{ backgroundColor: theme.surface, boxShadow: theme.shadow }}
      >
        <div className="absolute left-[155px] top-[7px] h-[5px] w-[50px] rounded-full" style={{ backgroundColor: theme.sunken }} />
        <div className="flex h-6 w-full items-center justify-center">
          <h3 className="min-w-0 flex-1 text-center text-[17px] font-medium leading-6 tracking-[0px]" style={{ color: theme.text }}>
            Select Language
          </h3>
        </div>
        <div className="flex w-full flex-col items-start gap-[10px] overflow-hidden">
          <LanguageButton darkMode={darkMode}>English</LanguageButton>
          <LanguageButton darkMode={darkMode}>සිංහල</LanguageButton>
          <LanguageButton darkMode={darkMode}>தமிழ்</LanguageButton>
        </div>
      </div>
    </div>
  );
}

const BOTTOM_SHEET_CODE = `export function BottomSheetLanguageSelector({ open }: BottomSheetProps) {
  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" className="w-[361px] rounded-[24px] bg-white px-4 py-6 shadow-lg">
      <div className="mx-auto h-[5px] w-[50px] rounded-full bg-[#F5F6F8]" />
      <h2 className="mt-3 text-center text-[17px] font-medium leading-6">Select Language</h2>
      <div className="mt-4 grid gap-[10px]">
        {["English", "සිංහල", "தமிழ்"].map((label) => (
          <button key={label} className="h-14 rounded-[12px] border-2 border-[#DADDE2] text-[17px] font-medium">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}`;

export function BottomSheetSpec() {
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
        <Card className={`${isDark ? "dark bg-[var(--color-surface-page)]" : ""} overflow-x-auto p-4`}>
          <LanguageSelectorSheetPreview darkMode={isDark} />
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Container", "361x276 bottom sheet, 24px radius", "Surface/card white, floating shadow"],
            ["Padding", "16px horizontal, 24px vertical, 16px internal gap", "Content width 329px"],
            ["Indicator", "50x5 pill at top, x=155, y=7.1", "Surface sunken #F5F6F8"],
            ["Title", "329x24 centered row", "17px / 24px, medium, text #111111"],
            ["Buttons", "329x56, 12px radius, 2px border, 16px padding", "Secondary background white, border #DADDE2"],
            ["Button spacing", "10px vertical gap", "English, සිංහල, தமிழ்"],
            ["Dark mode", "Uses semantic dark tokens", "Sheet surface, handle, buttons, border, text, and shadow adapt."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Use bottom sheets for short mobile choices that should stay close to the current task."],
            ["Do", "Keep the first action visible without scrolling and preserve accessible dialog semantics."],
            ["Don't", "Do not use bottom sheets for destructive confirmations; use Alert Dialog instead."],
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
        <CodeBlock code={BOTTOM_SHEET_CODE} />
      </section>
    </div>
  );
}
