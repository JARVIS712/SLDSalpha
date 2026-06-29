"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

type UploadState = "default" | "uploading" | "success" | "failed";

function uploadTheme(darkMode: boolean) {
  return {
    frame: darkMode ? "var(--color-surface-page)" : "#FFFFFF",
    surface: darkMode ? "var(--color-surface-card)" : "#FAFAFB",
    border: darkMode ? "var(--color-border-default)" : "#8E949E",
    buttonBg: darkMode ? "var(--color-action-secondary)" : "#FFFFFF",
    buttonBorder: darkMode ? "var(--color-action-secondary-border)" : "#DADDE2",
    text: darkMode ? "var(--color-text-primary)" : "#111111",
    secondary: darkMode ? "var(--color-text-secondary)" : "#676C73",
    required: darkMode ? "var(--color-feedback-error)" : "#D32F2F",
    successBg: darkMode ? "var(--color-feedback-success-subtle)" : "#E0F2EC",
    success: darkMode ? "var(--color-feedback-success)" : "#1FAA63",
    errorBg: darkMode ? "var(--color-feedback-error-subtle)" : "#FDECEA",
    error: darkMode ? "var(--color-feedback-error)" : "#D32F2F",
  };
}

function UploadIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 15V4.75" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="m8 8.75 4-4 4 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.75 14.75v3.5h12.5v-3.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpinnerIcon({ color }: { color: string }) {
  return (
    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.75a8.25 8.25 0 0 1 8.25 8.25" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M18.15 17.5A8.25 8.25 0 1 1 6.5 5.85" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeOpacity="0.35" />
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

function XIcon({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m6 6 8 8M14 6l-8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Label({ darkMode = false }: { darkMode?: boolean }) {
  const theme = uploadTheme(darkMode);

  return (
    <div className="flex h-5 w-full items-start">
      <span className="text-[15px] leading-5 tracking-[0px]" style={{ color: theme.text }}>Upload</span>
      <span className="text-[15px] leading-5 tracking-[0px]" style={{ color: theme.required }}>*</span>
    </div>
  );
}

function FileUploadPreview({ state, darkMode = false }: { state: UploadState; darkMode?: boolean }) {
  const theme = uploadTheme(darkMode);
  const terminal = state === "success" || state === "failed";
  const height = state === "default" ? 88 : 82;
  const contentHeight = state === "default" ? 64 : 58;

  return (
    <div className="flex w-[361px] flex-col gap-1" style={{ height }}>
      <Label darkMode={darkMode} />
      <div
        className={`flex w-full overflow-hidden rounded-[16px] border p-2 ${terminal ? "items-center justify-between" : state === "uploading" ? "items-start gap-3" : "items-center gap-3"}`}
        style={{ height: contentHeight, backgroundColor: theme.surface, borderColor: theme.border }}
      >
        {state === "default" && (
          <>
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border-2"
              style={{ backgroundColor: theme.buttonBg, borderColor: theme.buttonBorder }}
            >
              <UploadIcon color={theme.text} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-[6px]">
              <span className="h-6 text-[15px] leading-5 tracking-[0px] underline underline-offset-2" style={{ color: theme.text }}>
                Upload
              </span>
              <span className="text-xs leading-4 tracking-[0px]" style={{ color: theme.secondary }}>
                PDF, JPEG or PNG less than 5MB
              </span>
            </span>
          </>
        )}

        {state === "uploading" && (
          <>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center">
              <SpinnerIcon color={theme.text} />
            </span>
            <span className="flex w-[149px] flex-col gap-[6px]">
              <span className="truncate text-[15px] leading-5 tracking-[0px]" style={{ color: theme.text }}>
                Birth_certificate.pdf
              </span>
              <span className="text-xs leading-4 tracking-[0px]" style={{ color: theme.secondary }}>72%</span>
            </span>
          </>
        )}

        {terminal && (
          <>
            <span className="flex min-w-0 items-start gap-3">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full p-1"
                style={{
                  backgroundColor: state === "success" ? theme.successBg : theme.errorBg,
                  color: state === "success" ? theme.success : theme.error,
                }}
              >
                {state === "success" ? <CheckIcon color={theme.success} /> : <XIcon color={theme.error} size={16} />}
              </span>
              <span className="flex w-[149px] flex-col gap-[6px]">
                <span className="truncate text-[15px] leading-5 tracking-[0px]" style={{ color: theme.text }}>
                  Birth_certificate.pdf
                </span>
                <span className="text-xs leading-4 tracking-[0px]" style={{ color: state === "failed" ? theme.error : theme.secondary }}>
                  {state === "failed" ? "File size is too big" : "Uploaded"}
                </span>
              </span>
            </span>
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border"
              style={{ backgroundColor: theme.buttonBg, borderColor: theme.buttonBorder }}
            >
              <XIcon color={theme.secondary} />
            </span>
          </>
        )}
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

const FILE_UPLOAD_CODE = `export function FileUpload({ state, fileName, progress, error }: FileUploadProps) {
  return (
    <div className="flex w-[361px] flex-col gap-1">
      <label className="text-[15px] leading-5">Upload<span className="text-[#D32F2F]">*</span></label>
      <div className="rounded-[16px] border border-[#8E949E] bg-[#FAFAFB] p-2">
        {state === "default" && <UploadPrompt />}
        {state === "uploading" && <UploadingFile progress={progress} />}
        {state === "success" && <UploadedFile />}
        {state === "failed" && <UploadError error={error} />}
      </div>
    </div>
  );
}`;

export function FileUploadSpec() {
  const [isDark, setIsDark] = useState(false);
  const theme = uploadTheme(isDark);

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
          <div className="flex w-[393px] flex-col gap-4 rounded-[5px] p-4" style={{ backgroundColor: theme.frame }}>
            <FileUploadPreview state="default" darkMode={isDark} />
            <FileUploadPreview state="uploading" darkMode={isDark} />
            <FileUploadPreview state="success" darkMode={isDark} />
            <FileUploadPreview state="failed" darkMode={isDark} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Component set", "393x414 frame with 16px padding and 16px row gap", "States: Default, Uploading, Success, Failed"],
            ["Default state", "361x88 total; 64px content area", "16px content radius, border #8E949E"],
            ["Uploading state", "361x82 total; 58px content area", "Spinner icon, filename, 72% caption"],
            ["Success state", "Success icon slot 24x24, dismiss button 36x36", "Success bg #E0F2EC, success text/icon"],
            ["Failed state", "Error icon slot 24x24, dismiss button 36x36", "Error bg #FDECEA, error text #D32F2F"],
            ["Typography", "Label 15/20, filename 15/20, caption 12/16", "Google Sans Regular"],
            ["Dark mode", "Uses semantic dark tokens", "Surface, border, text, button, success, and error colors adapt in preview."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Show accepted file types and maximum size before the user selects a file."],
            ["Do", "Keep filename, upload progress, success, and failure states visible in the same field footprint."],
            ["Don't", "Do not rely on color alone for failure; include an error message below the filename."],
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
        <CodeBlock code={FILE_UPLOAD_CODE} />
      </section>
    </div>
  );
}
