import type { Metadata } from "next";
import { PageHeader, Section, DataTable } from "@/components/Foundation";
import { DesignTokensTabs } from "@/components/DesignTokensTabs";
import { TokenNameBuilder } from "@/components/TokenNameBuilder";
import {
  namingPositions,
  primitiveAnatomyExamples,
  semanticAnatomyExamples,
  componentAnatomyExamples,
  namingPrinciples,
  figmaVsCss,
} from "@/data/designTokensGuide";

export const metadata: Metadata = { title: "Token Naming" };

export default function TokenNamingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations · Design Tokens"
        title="Token Naming"
        description="How SLDS names design tokens — the structure, the principles behind it, and worked examples for each tier."
      />

      <DesignTokensTabs />

      <Section
        title="Naming convention"
        description="SLDS tokens are named in up to four ordered parts: namespace, category, role, and modifier. Each part narrows the meaning, reading from the broadest context down to a specific attribute."
      >
        <pre className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-sunken)] p-4 text-center text-sm leading-6 text-[var(--color-text-primary)]">
{`slds — [category] — [role] — [modifier]
 1          2           3           4`}
        </pre>
        <div className="mt-4">
          <DataTable
            headers={["Position", "Name", "Description"]}
            rows={namingPositions.map((p) => [<strong key="p">{p.position}</strong>, <code key="n" className="text-xs">{p.name}</code>, p.description])}
          />
        </div>
      </Section>

      <Section title="Build a token name" description="Pick a category, role, and modifier to see the resulting CSS custom property and Figma path.">
        <TokenNameBuilder />
      </Section>

      <Section title="Anatomy by token tier">
        <div className="space-y-8">
          <div>
            <h3 className="mb-3 font-semibold text-[var(--color-text-primary)]">Primitive token</h3>
            <p className="mb-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
              Identifies a foundation scale and a step within it. The raw value lives here.
            </p>
            <DataTable
              headers={["Token", "Value"]}
              rows={primitiveAnatomyExamples.map((p) => [<code key="t" className="text-xs">{p.name}</code>, p.value])}
            />
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-[var(--color-text-primary)]">Semantic token</h3>
            <p className="mb-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
              Names a UI role and the property it controls. References a primitive token. Resolves
              differently per mode.
            </p>
            <DataTable
              headers={["Token", "Primitive", "Light", "Dark"]}
              rows={semanticAnatomyExamples.map((s) => [
                <code key="t" className="text-xs">{s.token}</code>,
                s.primitive,
                <span key="l" className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3.5 w-3.5 rounded border border-[var(--color-border-decorative)]" style={{ backgroundColor: s.light }} />
                  {s.light}
                </span>,
                <span key="d" className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3.5 w-3.5 rounded border border-[var(--color-border-decorative)]" style={{ backgroundColor: s.dark }} />
                  {s.dark}
                </span>,
              ])}
            />
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-[var(--color-text-primary)]">Component token</h3>
            <p className="mb-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
              Scoped to a specific component. References semantic or primitive tokens.
            </p>
            <DataTable
              headers={["Token", "References"]}
              rows={componentAnatomyExamples.map((c) => [<code key="t" className="text-xs">{c.token}</code>, <code key="r" className="text-xs">{c.references}</code>])}
            />
          </div>
        </div>
      </Section>

      <Section title="Naming principles" description="Five principles guide every token name in SLDS.">
        <div className="space-y-4">
          {namingPrinciples.map((p) => (
            <div key={p.title} className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5">
              <h3 className="font-semibold text-[var(--color-text-primary)]">{p.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">{p.description}</p>
              {(p.good || p.bad) && (
                <div className="mt-3 space-y-1.5 font-mono text-xs">
                  {p.good && (
                    <p className="whitespace-pre-line text-[var(--green-700)]">
                      ✅ {p.good}
                    </p>
                  )}
                  {p.bad?.map((b) => (
                    <p key={b} className="text-[var(--red-600)]">
                      ❌ {b}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Figma variable names vs CSS custom properties"
        description="Token names in Figma use slash-separated paths to create nested groups. The same token in CSS uses double-dash custom properties."
      >
        <DataTable
          headers={["Figma variable", "CSS custom property"]}
          rows={figmaVsCss.map((f) => [<code key="f" className="text-xs">{f.figma}</code>, <code key="c" className="text-xs">{f.css}</code>])}
        />
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
          The rule: Figma groups use <code className="font-mono text-xs">/</code>, CSS uses{" "}
          <code className="font-mono text-xs">--slds-</code> prefix + <code className="font-mono text-xs">-</code> separators. Convert
          mechanically; do not invent different names for the same token.
        </p>
      </Section>

      <Section title="Worked example — primary button, hover state" description="Tracing a single interaction state from raw value to component.">
        <pre className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-sunken)] p-4 text-xs leading-6 text-[var(--color-text-secondary)]">
{`Raw value
  #E0AE00

Primitive
  Color/Primitive/Gold/600  →  #E0AE00

Semantic
  Color/Semantic/Action/Primary Hover  →  Gold/600  →  #E0AE00

Component
  slds-btn-primary-hover-bg  →  Action/Primary Hover  →  Gold/600  →  #E0AE00`}
        </pre>
        <p className="mb-2 mt-4 text-sm font-medium text-[var(--color-text-primary)]">In code:</p>
        <pre className="overflow-x-auto rounded-[var(--radius-lg)] bg-[var(--color-surface-masthead)] p-4 text-xs leading-6 text-[var(--neutral-200)]">
{`:root {
  --slds-color-gold-600: #E0AE00;
  --slds-color-action-primary-hover: var(--slds-color-gold-600);
}

.slds-btn--primary:hover {
  background-color: var(--slds-color-action-primary-hover);
}`}
        </pre>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
          If the brand gold changes, only the primitive <code className="font-mono text-xs">--slds-color-gold-600</code> value needs
          updating. Everything above it inherits the change automatically.
        </p>
      </Section>
    </div>
  );
}
