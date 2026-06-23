"use client";

import { useState } from "react";
import { useLanguage, type Language } from "@/components/LanguageContext";
import { scriptComparisonMobile, type ScriptSizeRow } from "@/data/scriptComparison";

const COLUMNS: { code: Language; label: string; sample: string; px: (r: ScriptSizeRow) => number }[] = [
  { code: "en", label: "English", sample: "Aa", px: (r) => r.en },
  { code: "si", label: "Sinhala", sample: "අආ", px: (r) => r.si },
  { code: "ta", label: "Tamil", sample: "அஆ", px: (r) => r.ta },
];

function Cell({ row, col, active }: { row: ScriptSizeRow; col: (typeof COLUMNS)[number]; active: boolean }) {
  const px = col.px(row);
  const delta = px - row.en;
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border p-4 text-center transition-colors ${
        active
          ? "border-[var(--gold-500)] bg-[var(--gold-50)] ring-1 ring-[var(--gold-500)]"
          : "border-[var(--color-border-decorative)] bg-[var(--color-surface-card)]"
      }`}
    >
      <span className="leading-none text-[var(--color-text-primary)]" style={{ fontSize: `${px}px` }}>
        {col.sample}
      </span>
      <span className="font-mono text-xs text-[var(--color-text-primary)]">{px}px</span>
      {delta !== 0 ? (
        <span className="rounded-full bg-[var(--color-surface-section-alt)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-text-secondary)]">
          {delta}px
        </span>
      ) : (
        <span className="text-[11px] text-[var(--color-text-tertiary)]">baseline</span>
      )}
    </div>
  );
}

export function ScriptComparison() {
  const { language } = useLanguage();
  const [showFull, setShowFull] = useState(false);

  const rows = scriptComparisonMobile.filter((r) => showFull || r.featured);

  return (
    <div>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.token} className="rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-section-alt)] p-4">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="font-semibold text-[var(--color-text-primary)]">{row.role}</h3>
              <code className="text-xs text-[var(--color-text-tertiary)]">{row.token}</code>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {COLUMNS.map((col) => (
                <Cell key={col.code} row={row} col={col} active={language === col.code} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setShowFull((v) => !v)}
        className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border-decorative)] px-3.5 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
        aria-expanded={showFull}
      >
        {showFull ? "Show fewer roles" : "Show full scale (all 15 mobile styles)"}
        <span aria-hidden="true">{showFull ? "↑" : "↓"}</span>
      </button>
    </div>
  );
}
