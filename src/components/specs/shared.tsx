import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-base font-semibold text-[var(--color-text-primary)]">{children}</h2>;
}

export function CaretLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CaretRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Spec table (identical across all spec files) ──────────────────────────────
export function SpecTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
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

// ── Base dark/light token map — spread into per-spec theme functions ──────────
export function specTheme(darkMode: boolean) {
  return {
    frame:       darkMode ? "var(--color-surface-page)" : "#FFFFFF",
    surface:     darkMode ? "var(--color-surface-card)" : "#FFFFFF",
    text:        darkMode ? "var(--color-text-primary)" : "#111111",
    secondary:   darkMode ? "var(--color-text-secondary)" : "#676C73",
    border:      darkMode ? "var(--color-border-default)" : "#8E949E",
    placeholder: darkMode ? "var(--color-text-disabled)" : "#B8BDC4",
    disabled:    darkMode ? "var(--color-text-disabled)" : "#B8BDC4",
    focus:       darkMode ? "var(--color-action-primary)" : "#FFC700",
    error:       darkMode ? "var(--color-feedback-error)" : "#D32F2F",
    shadow:      darkMode
      ? "0 18px 30px -12px rgba(0,0,0,0.55), 0 8px 12px -8px rgba(0,0,0,0.45)"
      : "0 10px 15px -3px rgba(0,0,0,0.12), 0 4px 6px -4px rgba(0,0,0,0.12)",
  };
}

// ── Shared SVG icons ──────────────────────────────────────────────────────────

export function SearchIcon({ color = "#8e949e" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.25" stroke={color} strokeWidth="1.5" />
      <path d="m13 13 3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function XIcon({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m6 6 8 8M14 6l-8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 16×16 checkmark for list items / select / file upload
export function SmallCheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8.25 2.75 2.75 6.25-6.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Chevron pointing down (caret)
export function ChevronDown({ color = "#8e949e", size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 7.5 10 12.5 15 7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Sri Lanka flag (phone/country picker)
export function SriLankaFlag({ disabled = false }: { disabled?: boolean }) {
  return (
    <span
      className={`relative h-[15px] w-[21px] shrink-0 overflow-hidden rounded-[2px] ${disabled ? "opacity-45" : ""}`}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[#8D153A]" />
      <span className="absolute left-0 top-0 h-full w-[7px] bg-[#FFB700]" />
      <span className="absolute left-[2px] top-[2px] h-[11px] w-[2px] bg-[#00534E]" />
      <span className="absolute left-[5px] top-[2px] h-[11px] w-[2px] bg-[#EB7400]" />
      <span className="absolute left-[9px] top-[2px] h-[11px] w-[10px] border border-[#FFB700]" />
      <span className="absolute left-[12px] top-[4px] h-[7px] w-[4px] rounded-full bg-[#FFB700]" />
    </span>
  );
}
