import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/Foundation";
import { DesignTokensTabs } from "@/components/DesignTokensTabs";
import { ThemeTokenDemo } from "@/components/ThemeTokenDemo";

export const metadata: Metadata = { title: "Design Tokens" };

export default function DesignTokensOverviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations · Design Tokens"
        title="Design Tokens"
        description="What design tokens are, and why SLDS uses them across colour, typography, spacing, shape, elevation, and motion."
      />

      <DesignTokensTabs />

      <Section title="What are design tokens?">
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
          Design tokens are shared names for the visual decisions in SLDS. They cover things like
          colours, text sizes, spacing, border radius, shadow, and motion timing. When a designer or
          developer uses a token, they apply the same design decision everywhere — without needing to
          know or manually copy the raw value behind it.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
          <a href="/foundations/design-tokens/architecture" className="font-medium text-[var(--color-text-link)] underline">
            Token architecture
          </a>{" "}
          shows how tokens are organised across layers.{" "}
          <a href="/foundations/design-tokens/naming" className="font-medium text-[var(--color-text-link)] underline">
            Token naming
          </a>{" "}
          shows how each token name is structured.
        </p>
      </Section>

      <Section
        title="Why SLDS uses tokens"
        description="SLDS uses tokens to keep government digital products consistent as the system grows. Tokens give design and code a shared way to refer to visual decisions — colour, spacing, typography, shape — so teams don't recreate them in each product or component."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Easier system updates</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              When a token value changes, every component that uses it receives the update
              automatically. This lets SLDS improve accessibility, adjust brand colours, or refine type
              scales without touching each component individually.
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              For example, changing <code className="font-mono text-xs">slds-color-gold-500</code> from{" "}
              <code className="font-mono text-xs">#F0B41E</code> to{" "}
              <code className="font-mono text-xs">#FFC700</code> (the true ICTA brand yellow)
              automatically updated every component that references{" "}
              <code className="font-mono text-xs">Action/Primary</code> — buttons, focus rings, selected
              states — in a single operation.
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Clearer design intent</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Tokens make every styling decision inside a component named and explicit. A button may
              look simple, but its background, label colour, typography, padding, border, and shape are
              all controlled by separate named tokens.
            </p>
            <pre className="mt-3 overflow-x-auto rounded-[var(--radius-md)] bg-[var(--color-surface-sunken)] p-3 text-[11px] leading-5 text-[var(--color-text-secondary)]">
{`slds-btn-primary-bg         → Action/Primary       → slds-color-gold-500     → #FFC700
slds-btn-primary-fg         → Action/Primary FG    → slds-color-neutral-900  → #111111
slds-btn-primary-hover-bg   → Action/Primary Hover → slds-color-gold-600     → #E0AE00
slds-btn-padding-y          → slds-space-12        → 12px
slds-btn-padding-x          → slds-space-24        → 24px
slds-btn-border-radius      → slds-radius-md       → 8px`}
            </pre>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5 sm:col-span-2">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Theme switching without component changes</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
              A semantic token resolves to different primitive values in Light and Dark mode. The
              component keeps the same token name — only the resolved value changes. Toggle the demo
              below: the card and button code never changes, only the mode does.
            </p>
            <div className="mt-4">
              <ThemeTokenDemo />
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Language-aware typography</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Typography tokens are variable-mode–driven. The same token name (
              <code className="font-mono text-xs">Typography/Mobile/Font Size/body_1</code>) resolves to
              the correct typeface for English, Sinhala, or Tamil, controlled by the frame&rsquo;s
              variable mode — not by overriding font families manually.
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5">
            <h3 className="font-semibold text-[var(--color-text-primary)]">Responsive scaling</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Some tokens resolve to different values at different breakpoints. A heading token keeps
              the same name but outputs a larger size at desktop than at mobile. This lives in the
              Typography variable collections (Mobile vs Desktop), not in separate token names.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
          Together, these qualities mean that improvements to SLDS reach every product that uses its
          tokens. Update a primitive, and every semantic alias and component token that references it
          inherits the change.
        </p>
      </Section>
    </div>
  );
}
