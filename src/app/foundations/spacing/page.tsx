import type { Metadata } from "next";
import { PageHeader, Section, DataTable } from "@/components/Foundation";
import { spacingScale, gridBreakpoints } from "@/data/tokens";

export const metadata: Metadata = { title: "Spacing & Grid" };

export default function SpacingPage() {
  const maxPx = 160;
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing & Grid"
        description="All values live in the Spacing variable collection. Use these tokens for padding, margin, and gap — never arbitrary values."
      />

      <Section title="Spacing scale">
        <div className="space-y-3">
          {spacingScale.map((s) => {
            const px = parseInt(s.value, 10);
            return (
              <div key={s.token} className="flex items-center gap-4">
                <code className="w-24 shrink-0 text-xs text-[var(--color-text-secondary)]">{s.token}</code>
                <span className="w-14 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{s.value}</span>
                <div className="h-3 flex-1 max-w-md rounded bg-[var(--color-surface-section-alt)]">
                  <div
                    className="h-3 rounded bg-[var(--gold-500)]"
                    style={{ width: `${Math.min(100, (px / maxPx) * 100)}%` }}
                  />
                </div>
                <span className="hidden text-xs text-[var(--color-text-tertiary)] sm:block">{s.use}</span>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Grid" description="Responsive grid breakpoints used across SLDS surfaces.">
        <DataTable
          headers={["Breakpoint", "Columns", "Gutter", "Margin", "Max content width"]}
          rows={gridBreakpoints.map((g) => [g.breakpoint, g.columns, g.gutter, g.margin, g.maxWidth])}
        />
      </Section>
    </div>
  );
}
