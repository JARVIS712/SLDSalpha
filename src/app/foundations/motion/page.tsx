import type { Metadata } from "next";
import { PageHeader, Section, DataTable, Callout } from "@/components/Foundation";
import { motionDurations, motionEasings } from "@/data/tokens";

export const metadata: Metadata = { title: "Motion" };

export default function MotionPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Motion"
        description="All values live in the Motion variable collection. Use motion to communicate state changes — not for decoration."
      />

      <Section title="Principle">
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
          Motion in SLDS is <strong className="text-[var(--color-text-primary)]">minimal by default</strong>.
          Every animation must serve a communication purpose — indicating state changes, guiding attention,
          or providing feedback. Motion used purely for decoration is not permitted.
        </p>
        <div className="mt-4">
          <Callout>When in doubt, don&rsquo;t animate. A well-designed layout communicates without motion.</Callout>
        </div>
      </Section>

      <Section title="Duration scale">
        <DataTable headers={["Token", "Value", "Usage"]} rows={motionDurations.map((d) => [<code key="t" className="text-xs">{d.token}</code>, d.value, d.usage])} />
      </Section>

      <Section title="Easing curves">
        <DataTable headers={["Token", "Curve", "Usage"]} rows={motionEasings.map((e) => [<code key="t" className="text-xs">{e.token}</code>, <code key="c" className="text-xs">{e.curve}</code>, e.usage])} />
      </Section>

      <Section title="Motion rules">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--color-text-secondary)]">
          <li><strong className="text-[var(--color-text-primary)]">Reduced motion is mandatory, not optional.</strong> Always respect <code className="font-mono text-xs">prefers-reduced-motion: reduce</code>. When active, all motion must fall back to <code className="font-mono text-xs">slds-motion-duration-instant</code> (0ms) — instant state changes with no transition.</li>
          <li>Every component that uses animation must document its reduced-motion behaviour in its component spec.</li>
          <li>A <strong className="text-[var(--color-text-primary)]">Reduced Motion</strong> variable mode is available in the Motion token collection. Apply it at the root frame/container to switch all duration tokens to 0ms automatically.</li>
          <li>Entering elements use Decelerate easing. Exiting elements use Accelerate easing.</li>
          <li>Never animate layout-affecting properties (width, height, top, left). Use transform and opacity only.</li>
          <li>Limit concurrent animations to one or two elements at a time.</li>
          <li>Avoid cascading entrance animations on page load.</li>
        </ul>
      </Section>
    </div>
  );
}
