import type { Metadata } from "next";
import { PageHeader, Section, DataTable } from "@/components/Foundation";
import { elevationScale, focusRings, zIndexScale } from "@/data/tokens";

export const metadata: Metadata = { title: "Elevation" };

export default function ElevationPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Elevation"
        description="Shadows communicate layer depth. Use them to reinforce affordance — not decoration. Prefer flat (level 0) whenever possible. Shadow colour aliases slds-color-neutral-900."
      />

      <Section title="Shadow scale">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {elevationScale.map((e) => (
            <div key={e.level} className="flex flex-col items-center gap-3 text-center">
              <div
                className="h-16 w-16 rounded-[var(--radius-lg)] bg-[var(--color-surface-card)]"
                style={{ boxShadow: e.shadow }}
              />
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">{e.level}</p>
                <p className="font-mono text-[10px] text-[var(--color-text-tertiary)]">{e.cssToken}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <DataTable
            headers={["Level", "Effect style", "CSS token", "When to use"]}
            rows={elevationScale.map((e) => [e.level, e.effectStyle, <code key="c" className="text-xs">{e.cssToken}</code>, e.when])}
          />
        </div>
      </Section>

      <Section title="Focus rings">
        <div className="grid gap-4 sm:grid-cols-3">
          {focusRings.map((f) => (
            <div key={f.name} className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5">
              <div className="mb-4 flex h-16 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-surface-section-alt)]">
                <div
                  className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-surface-card)]"
                  style={{
                    outline: `2px solid ${f.name.includes("Error") ? "var(--red-500)" : f.name.includes("Info") ? "var(--blue-500)" : "var(--gold-500)"}`,
                    outlineOffset: "2px",
                  }}
                />
              </div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">{f.name}</p>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{f.ring}</p>
              <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">{f.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Z-index scale">
        <DataTable headers={["Token", "Value", "Usage"]} rows={zIndexScale.map((z) => [<code key="t" className="text-xs">{z.token}</code>, z.value, z.usage])} />
      </Section>
    </div>
  );
}
