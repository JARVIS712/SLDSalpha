import type { Metadata } from "next";
import { PageHeader, Section, Callout } from "@/components/Foundation";
import { radiusScale } from "@/data/tokens";

export const metadata: Metadata = { title: "Shape" };

export default function ShapePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Shape (Border Radius)"
        description="All values live in the Border Radius variable collection."
      />

      <Section title="Radius scale">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {radiusScale.map((r) => (
            <div key={r.token} className="flex flex-col items-center gap-3 text-center">
              <div
                className="h-20 w-20 border-2 border-[var(--gold-500)] bg-[var(--gold-50)]"
                style={{ borderRadius: r.value === "9999px" ? "9999px" : r.value }}
              />
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">{r.token}</p>
                <p className="font-mono text-[10px] text-[var(--color-text-tertiary)]">{r.value}</p>
                <p className="mt-1 text-[11px] leading-4 text-[var(--color-text-secondary)]">{r.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Callout tone="warning">
        Larger components use larger radii. Never apply <code className="font-mono">slds-radius-full</code> to
        rectangular containers wider than they are tall.
      </Callout>
    </div>
  );
}
