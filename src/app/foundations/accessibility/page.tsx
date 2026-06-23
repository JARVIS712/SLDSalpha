import type { Metadata } from "next";
import { PageHeader, Section, DataTable, Callout } from "@/components/Foundation";
import { contrastRequirements, contrastPairs } from "@/data/tokens";

export const metadata: Metadata = { title: "Accessibility" };

const WCAG_22_CRITERIA = [
  { criterion: "Focus Appearance (Minimum)", id: "2.4.11", requirement: "Focus indicator must have a minimum area and contrast ratio — not just “visible”. Gold ring (#B38A00 on white) meets this." },
  { criterion: "Focus Appearance (Enhanced)", id: "2.4.12", requirement: "AAA target — focus indicator fully encloses the component. Aim for this on primary interactive elements." },
  { criterion: "Accessible Authentication (Minimum)", id: "3.3.8", requirement: "Login flows must not require users to solve cognitive function tests (e.g. CAPTCHAs) without an accessible alternative." },
  { criterion: "Accessible Authentication (No Exception)", id: "3.3.9", requirement: "AAA — no cognitive function tests at all in auth flows." },
  { criterion: "Redundant Entry", id: "3.3.7", requirement: "Do not ask users to re-enter information already provided in the same session." },
  { criterion: "Dragging Movements", id: "2.5.7", requirement: "Any drag operation must have a single-pointer alternative (e.g. a button)." },
  { criterion: "Target Size (Minimum)", id: "2.5.8", requirement: "Minimum 24×24px for interactive targets. SLDS uses 44×44px which exceeds this." },
];

export default function AccessibilityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Accessibility"
        description="Every SLDS surface is built to meet WCAG 2.2 AA as a baseline, not an afterthought."
      />

      <Section title="Colour contrast (WCAG 2.2 AA)">
        <DataTable
          headers={["Context", "Minimum ratio", "Notes"]}
          rows={contrastRequirements.map((c) => [c.context, <strong key="r">{c.minRatio}</strong>, c.notes])}
        />
      </Section>

      <Section title="What's new in WCAG 2.2" description="SLDS targets WCAG 2.2 AA. The key additions over 2.1 that affect this design system:">
        <DataTable
          headers={["Criterion", "ID", "Requirement"]}
          rows={WCAG_22_CRITERIA.map((c) => [<strong key="c">{c.criterion}</strong>, <code key="i" className="text-xs">{c.id}</code>, c.requirement])}
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

      <Section title="Reduced motion" description="Motion in SLDS is minimal by default. All animations and transitions must respect the user's OS preference.">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--color-text-secondary)]">
          <li><strong className="text-[var(--color-text-primary)]">Default behaviour:</strong> Use the motion tokens from the Motion foundation (durations 100ms–500ms).</li>
          <li><strong className="text-[var(--color-text-primary)]">Reduced-motion variant (mandatory):</strong> When <code className="font-mono text-xs">prefers-reduced-motion: reduce</code> is active, all durations must fall back to <code className="font-mono text-xs">0ms</code> (instant state change). No exceptions.</li>
          <li>Animated components must document their reduced-motion behaviour in their component spec.</li>
          <li>Never use motion to convey meaning that isn&rsquo;t also communicated through a static visual or label.</li>
        </ul>
        <pre className="mt-4 overflow-x-auto rounded-[var(--radius-lg)] bg-[var(--color-surface-masthead)] p-4 text-xs leading-6 text-[var(--neutral-200)]">
{`@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0ms !important;
    transition-duration: 0ms !important;
  }
}`}
        </pre>
      </Section>

      <Section title="High contrast mode" description="SLDS supports high contrast mode on both Windows (Forced Colors / High Contrast) and macOS (Increase Contrast).">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--color-text-secondary)]">
          <li>Use <code className="font-mono text-xs">forced-colors: active</code> media query to override colour tokens with system colours where needed.</li>
          <li>Never use <code className="font-mono text-xs">background-image</code> to convey interactive state — it is suppressed in forced-colors mode.</li>
          <li>Focus indicators must remain visible in high contrast mode. The Gold focus ring (#B38A00) maps to <code className="font-mono text-xs">Highlight</code> in forced-colors.</li>
          <li>Test all interactive components in both Windows High Contrast Black and High Contrast White.</li>
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
          <li>Line height for body text: minimum 1.4× the font size. All SLDS body styles meet this.</li>
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

      <Section title="Accessibility issue reporting">
        <p className="max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
          A global accessibility issue reporting feature will be built into the Super App, allowing users
          to flag accessibility problems from within the app itself. The UI layout and reporting flow is
          a WAD design deliverable.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
          This will appear as a persistent entry point in the app (e.g. in the settings or help menu) and
          must itself be fully accessible — keyboard navigable, screen-reader labelled, and usable in high
          contrast mode.
        </p>
        <div className="mt-4">
          <Callout tone="warning">Component design: pending (WAD). Expected in a future SLDS component release.</Callout>
        </div>
      </Section>
    </div>
  );
}
