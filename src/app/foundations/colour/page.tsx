import type { Metadata } from "next";
import { PageHeader, Section, Swatch, DataTable, Callout } from "@/components/Foundation";
import { colorPrimitives, semanticColors, statusBadges, dataViz } from "@/data/tokens";

export const metadata: Metadata = { title: "Colour" };

export default function ColourPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Colour"
        description="Two Figma variable collections power the colour system: Color / Primitive (75 tokens, alias targets only) and Color / Semantic (75 tokens with Light, Dark, and High Contrast modes). Always use semantic tokens in components."
      />

      <Callout tone="warning">
        The primary action colour is <strong>Gold (#FFC700)</strong> — the GovTech Sri Lanka brand colour. It
        is not blue. All primary buttons, focus rings, and interactive highlights use Gold.
      </Callout>

      <div className="h-10" />

      <Section title="Primitive colour families" description="Raw colour values. Never use directly in UI — alias targets only.">
        <div className="space-y-10">
          {colorPrimitives.map((family) => (
            <div key={family.name}>
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                {family.name} <span className="font-normal text-[var(--color-text-tertiary)]">— {family.description}</span>
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {family.tokens.map((t) => (
                  <Swatch key={t.token} name={t.token} hex={t.hex} usage={t.usage} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Semantic tokens" description="What components reference. Resolves to the correct value in Light, Dark, and (where confirmed) High Contrast mode automatically.">
        <div className="space-y-8">
          {semanticColors.map((group) => (
            <div key={group.name}>
              <h3 className="mb-3 font-semibold text-[var(--color-text-primary)]">{group.name}</h3>
              <DataTable
                headers={["Token", "Light", "Dark", "High Contrast", "Usage"]}
                rows={group.tokens.map((t) => [
                  <code key="t" className="text-xs">{t.token}</code>,
                  <span key="l" className="inline-flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded border border-[var(--color-border-decorative)]" style={{ backgroundColor: t.light }} />
                    {t.light}
                  </span>,
                  <span key="d" className="inline-flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded border border-[var(--color-border-decorative)]" style={{ backgroundColor: t.dark }} />
                    {t.dark}
                  </span>,
                  t.highContrast ? (
                    <span key="hc" className="inline-flex items-center gap-2">
                      <span className="inline-block h-4 w-4 rounded border border-[var(--color-border-decorative)]" style={{ backgroundColor: t.highContrast }} />
                      {t.highContrast}
                    </span>
                  ) : (
                    <span key="hc" className="text-[var(--color-text-tertiary)]">Pending</span>
                  ),
                  t.usage,
                ])}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Status — badges & workflow" description="The 8-state status matrix used by Status Badge and Workflow Status Bar.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statusBadges.map((s) => (
            <span
              key={s.status}
              className="inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-medium"
              style={{ backgroundColor: s.bg, color: s.color }}
            >
              {s.status}
            </span>
          ))}
        </div>
      </Section>

      <Section title="DataViz — 8-colour palette" description="Designed to be readable for deuteranopia (red-green colour blindness). DataViz/1 (Gold) is for graphical marks only — never use it for text labels.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {dataViz.map((d) => (
            <div key={d.index} className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-decorative)]">
              <div className="h-14 w-full" style={{ backgroundColor: d.light }} />
              <div className="p-2 text-center">
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">DataViz/{d.index}</p>
                <p className="text-[10px] text-[var(--color-text-tertiary)]">{d.alias}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Dark mode">
        <p className="max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
          Dark mode is a variable mode on the Color / Semantic collection. All 75 semantic tokens have
          Dark values — never override fills manually for dark mode.
        </p>
      </Section>

      <Section
        title="High Contrast mode"
        description="A third variable mode — High Contrast — is available on the Color/Semantic collection. It targets WCAG AAA (≥7:1) contrast on white for all colour tokens."
      >
        <p className="max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
          Apply it at the root frame or container level using the variable mode selector (or the{" "}
          <code className="font-mono text-xs">forced-colors: active</code> /{" "}
          <code className="font-mono text-xs">prefers-contrast: more</code> CSS media queries in code).
        </p>

        <h3 className="mb-3 mt-5 font-semibold text-[var(--color-text-primary)]">Key decisions in High Contrast mode</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--color-text-secondary)]">
          <li>All surfaces → white (#FFFFFF), differentiated by black borders.</li>
          <li>All text and icons → pure black (#000000), no intermediate grays.</li>
          <li><code className="font-mono text-xs">Border/Focus</code> → black (#000000) for maximum visibility.</li>
          <li>Gold primary button (#FFC700) retained — black text on gold = 9.2:1.</li>
          <li>All feedback and status colours use their darkest accessible shade (≥7:1 on white).</li>
          <li>DataViz series: each colour family uses its darkest shade for distinguishability without hue alone.</li>
        </ul>

        <div className="mt-4">
          <Callout>
            In code, map the High Contrast mode to <code className="font-mono text-xs">forced-colors: active</code> and{" "}
            <code className="font-mono text-xs">prefers-contrast: more</code> media queries. Tokens marked{" "}
            <span className="text-[var(--color-text-tertiary)]">Pending</span> in the semantic table above are still
            being confirmed for this mode.
          </Callout>
        </div>
      </Section>
    </div>
  );
}
