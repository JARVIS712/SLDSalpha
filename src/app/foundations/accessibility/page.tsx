import type { Metadata } from "next";
import { PageHeader, Section, DataTable } from "@/components/Foundation";
import { contrastRequirements, contrastPairs } from "@/data/tokens";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Accessibility"
        description="Every Sewa surface is built to meet WCAG 2.1 AA as a baseline, not an afterthought."
      />

      <Section title="Colour contrast (WCAG 2.1 AA)">
        <DataTable
          headers={["Context", "Minimum ratio", "Notes"]}
          rows={contrastRequirements.map((c) => [c.context, <strong key="r">{c.minRatio}</strong>, c.notes])}
        />
      </Section>

      <Section title="Verified token pairs">
        <DataTable
          headers={["Foreground", "Background", "Ratio", "Result"]}
          rows={contrastPairs.map((c) => [
            <code key="f" className="text-xs">{c.fg}</code>,
            <code key="b" className="text-xs">{c.bg}</code>,
            c.ratio,
            <span key="res" className={`font-semibold ${c.result === "AAA" ? "text-[var(--green-700)]" : "text-[var(--blue-700)]"}`}>
              ✅ {c.result}
            </span>,
          ])}
        />
      </Section>

      <Section title="Touch targets">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--color-text-secondary)]">
          <li>Minimum touch target: 44 × 44px (WCAG 2.5.5).</li>
          <li>Minimum spacing between adjacent targets: 8px.</li>
          <li>Interactive inline text links are exempt if identifiable in context.</li>
        </ul>
      </Section>

      <Section title="Focus management">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--color-text-secondary)]">
          <li>Every interactive element must have a visible focus indicator — use the Focus/Default effect style (Gold ring).</li>
          <li>Focus order must follow logical reading order (left → right, top → bottom for LTR).</li>
          <li>Modal dialogs must trap focus while open and restore focus to the trigger on close.</li>
          <li>Keyboard shortcuts must not override browser or OS shortcuts.</li>
        </ul>
      </Section>

      <Section title="Typography minimums">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--color-text-secondary)]">
          <li>Minimum body text: 15px mobile / 16px desktop (Mobile/Body 1, Desktop/Body 1).</li>
          <li>Line height for body text: minimum 1.4× the font size. All Sewa body styles meet this.</li>
          <li>Do not use text smaller than 12px for any visible UI element.</li>
          <li>Avoid justified text alignment — it creates uneven word spacing that reduces readability.</li>
        </ul>
      </Section>

      <Section title="Imagery & icons">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--color-text-secondary)]">
          <li>Decorative images: use empty <code className="font-mono">alt=&quot;&quot;</code> attribute.</li>
          <li>Informative icons: must have an accessible label (<code className="font-mono">aria-label</code> or adjacent visible text).</li>
          <li>Never use colour alone to convey meaning — always pair with a label, icon, or pattern.</li>
        </ul>
      </Section>
    </div>
  );
}
