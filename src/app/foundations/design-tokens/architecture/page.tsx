import type { Metadata } from "next";
import { PageHeader, Section, DataTable, Callout } from "@/components/Foundation";
import { DesignTokensTabs } from "@/components/DesignTokensTabs";
import { TokenResolver } from "@/components/TokenResolver";
import {
  tokenTiers,
  whenToUseEach,
  tokenCategories,
  tokenScales,
  changeImpact,
} from "@/data/designTokensGuide";

export const metadata: Metadata = { title: "Token Architecture" };

export default function TokenArchitecturePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations · Design Tokens"
        title="Token Architecture"
        description="How SLDS design tokens are organised — token tiers, categories, scales, and the flow that connects them."
      />

      <DesignTokensTabs />

      <Section
        title="Token tiers"
        description="SLDS organises tokens in a three-tier architecture. Each tier references the tier below it, so a single change cascades through the system: Raw value → Primitive → Semantic → Component."
      >
        <DataTable
          headers={["Tier", "Also called", "Description"]}
          rows={tokenTiers.map((t) => [<strong key="t">{t.tier}</strong>, t.also, t.description])}
        />
      </Section>

      <Section
        title="Try it — resolve a token through every tier"
        description="Pick a semantic token and toggle Light/Dark mode to see exactly how it resolves, from raw hex value up to the CSS custom property a component reads."
      >
        <TokenResolver />
      </Section>

      <Section title="Example: primary button background">
        <pre className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-sunken)] p-4 text-xs leading-6 text-[var(--color-text-secondary)]">
{`Raw value        #FFC700
     ↑ alias
Primitive        Gold/500
     ↑ alias
Semantic         Action/Primary
     ↑ alias
Component        slds-btn-primary-bg`}
        </pre>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
          A change at the primitive layer (Gold/500 = #FFC700) propagates upward through all aliases
          automatically.
        </p>
      </Section>

      <Section title="When to use each tier">
        <DataTable headers={["Situation", "Use"]} rows={whenToUseEach.map((w) => [w.situation, <strong key="u">{w.use}</strong>])} />
      </Section>

      <Section title="Token categories" description="SLDS tokens group into the following categories, each covering one design dimension.">
        <DataTable
          headers={["Category", "What it covers", "Examples"]}
          rows={tokenCategories.map((c) => [<strong key="c">{c.category}</strong>, c.covers, <code key="e" className="text-xs">{c.examples}</code>])}
        />
      </Section>

      <Section title="Token scales" description="SLDS uses several scale patterns. Each reflects how values within a category relate to each other.">
        <DataTable
          headers={["Scale", "Applies to", "Example"]}
          rows={tokenScales.map((s) => [<strong key="s">{s.scale}</strong>, s.appliesTo, <code key="e" className="text-xs">{s.example}</code>])}
        />
      </Section>

      <Section
        title="Responsive tokens"
        description="Typography tokens are split into two collections — Typography / Mobile (390px) and Typography / Desktop (1440px). The token name describes the role; the resolved value differs per collection. Switch a frame's collection to get the correct scale — no token renaming needed."
      >
        <Callout>Responsive mapping is not a separate token type. The name stays the same; only the resolved value changes.</Callout>
      </Section>

      <Section title="Token change impact" description="Before adding, modifying, or removing a token, understand the blast radius.">
        <div className="space-y-4">
          {changeImpact.map((c) => (
            <div key={c.action} className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5">
              <h3 className="font-semibold text-[var(--color-text-primary)]">{c.action}</h3>
              <dl className="mt-3 space-y-2 text-sm leading-6">
                <div>
                  <dt className="inline font-medium text-[var(--color-text-primary)]">Impact: </dt>
                  <dd className="inline text-[var(--color-text-secondary)]">{c.impact}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-[var(--color-text-primary)]">Risk: </dt>
                  <dd className="inline text-[var(--color-text-secondary)]">{c.risk}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-[var(--color-text-primary)]">Criteria: </dt>
                  <dd className="inline text-[var(--color-text-secondary)]">{c.criteria}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-[var(--color-text-primary)]">Process: </dt>
                  <dd className="inline text-[var(--color-text-secondary)]">{c.process}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
