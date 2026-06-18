import type { Metadata } from "next";
import { PageHeader, Section, DataTable } from "@/components/Foundation";
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

      <Section title="Duration scale">
        <DataTable headers={["Token", "Value", "Usage"]} rows={motionDurations.map((d) => [<code key="t" className="text-xs">{d.token}</code>, d.value, d.usage])} />
      </Section>

      <Section title="Easing curves">
        <DataTable headers={["Token", "Curve", "Usage"]} rows={motionEasings.map((e) => [<code key="t" className="text-xs">{e.token}</code>, <code key="c" className="text-xs">{e.curve}</code>, e.usage])} />
      </Section>

      <Section title="Motion rules">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--color-text-secondary)]">
          <li>Always respect <code className="font-mono">prefers-reduced-motion</code>. Fall back to slds-motion-duration-instant when active.</li>
          <li>Entering elements use Decelerate easing. Exiting elements use Accelerate easing.</li>
          <li>Never animate layout-affecting properties (width, height, top, left). Use transform and opacity only.</li>
          <li>Limit concurrent animations to one or two elements at a time.</li>
          <li>Avoid cascading entrance animations on page load.</li>
        </ul>
      </Section>
    </div>
  );
}
