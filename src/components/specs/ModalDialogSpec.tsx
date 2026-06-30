"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading, SpecTable, specTheme } from "./shared";

function dialogTheme(darkMode: boolean) {
  return {
    ...specTheme(darkMode),
    frame:           darkMode ? "var(--color-surface-page)" : "#F5F6F8",
    primaryBg:       darkMode ? "var(--color-action-primary)" : "#FFC700",
    primaryText:     darkMode ? "var(--color-action-primary-foreground)" : "#111111",
    secondaryBg:     darkMode ? "var(--color-action-secondary)" : "#FFFFFF",
    secondaryBorder: darkMode ? "var(--color-action-secondary-border)" : "#DADDE2",
  };
}

function DialogButton({
  children,
  tone,
  darkMode = false,
}: {
  children: React.ReactNode;
  tone: "primary" | "secondary";
  darkMode?: boolean;
}) {
  const theme = dialogTheme(darkMode);
  const primary = tone === "primary";

  return (
    <button
      type="button"
      className="flex h-9 shrink-0 items-center justify-center overflow-hidden rounded-[8px] p-2 text-[15px] leading-5 tracking-[0px]"
      style={{
        backgroundColor: primary ? theme.primaryBg : theme.secondaryBg,
        color: primary ? theme.primaryText : theme.text,
        border: primary ? "1px solid transparent" : `1px solid ${theme.secondaryBorder}`,
      }}
    >
      <span className="px-[6px]">{children}</span>
    </button>
  );
}

function DialogPreview({ darkMode = false }: { darkMode?: boolean }) {
  const theme = dialogTheme(darkMode);

  return (
    <div className="flex min-h-[260px] w-[360px] items-center justify-center rounded-[24px] p-6" style={{ backgroundColor: theme.frame }}>
      <div
        className="flex min-h-[178px] w-[300px] min-w-[300px] flex-col items-center justify-center gap-5 rounded-[12px] py-3 pl-4 pr-4"
        style={{ backgroundColor: theme.surface, boxShadow: theme.shadow }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-dialog-title"
      >
        <div className="flex w-full flex-col items-start justify-center gap-1">
          <h3 id="modal-dialog-title" className="w-full text-[18px] font-medium leading-7 tracking-[0px]" style={{ color: theme.text }}>
            Basic dialog title
          </h3>
          <p className="w-full text-sm leading-[22px] tracking-[0px]" style={{ color: theme.secondary }}>
            A dialog is a modal window that appears in front of app content to provide critical information or ask for a decision
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <button type="button" className="h-6 text-[15px] leading-5 tracking-[0px] underline-offset-2" style={{ color: theme.text }}>
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <DialogButton tone="secondary" darkMode={darkMode}>Cancel</DialogButton>
            <DialogButton tone="primary" darkMode={darkMode}>Continue</DialogButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const MODAL_DIALOG_CODE = `export function ModalDialog({ open, onCancel, onContinue }: ModalDialogProps) {
  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" className="w-[300px] rounded-[12px] bg-white px-4 py-3 shadow-lg">
      <h2 className="text-[18px] font-medium leading-7">Basic dialog title</h2>
      <p className="mt-1 text-sm leading-[22px] text-[#676C73]">
        A dialog is a modal window that appears in front of app content to provide critical information or ask for a decision
      </p>
      <div className="mt-5 flex items-center justify-between">
        <button onClick={onCancel}>Cancel</button>
        <div className="flex gap-2">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
}`;

export function ModalDialogSpec() {
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
          <DialogPreview darkMode={isDark} />
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Container", "300x178 dialog, min width 300px", "Surface white, 12px radius, floating shadow"],
            ["Padding", "16px left/right, 12px vertical", "20px vertical gap between content and actions"],
            ["Title", "18px / 28px, medium", "Text #111111"],
            ["Body", "14px / 22px, regular", "Text #676C73"],
            ["Actions", "Left text action plus secondary and primary 36px buttons", "Secondary border #DADDE2, primary #FFC700"],
            ["Dark mode", "Uses semantic dark tokens", "Surface, text, actions, borders, and shadow adapt."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Use modal dialogs for short decisions that interrupt the current flow."],
            ["Do", "Keep actions concise and put the primary action on the right."],
            ["Don't", "Do not use a modal for long forms or task flows; use a dedicated page or bottom sheet."],
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
        <CodeBlock code={MODAL_DIALOG_CODE} />
      </section>
    </div>
  );
}
