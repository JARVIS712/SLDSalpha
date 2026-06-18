import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/Foundation";

export const metadata: Metadata = { title: "Foundations" };

const PRINCIPLES = [
  { title: "Accessible by default", desc: "Every decision — colour, type size, touch target — meets WCAG 2.1 AA minimum. Disabled states are the only exemption." },
  { title: "Trust through consistency", desc: "Citizens expect government services to look and feel reliable. Consistency builds confidence." },
  { title: "Flat over decorative", desc: "Prefer flat surfaces. Shadows and motion are used sparingly to communicate meaning, not aesthetics." },
  { title: "Language-aware", desc: "All type tokens support English, Sinhala, and Tamil via variable modes. Never hard-code a font family." },
  { title: "Token-first", desc: "Reference named tokens, not raw hex values or pixel measurements. Theming, dark mode and future updates work automatically." },
];

const SECTIONS = [
  { href: "/foundations/colour", title: "Colour", desc: "62 primitives, 73 semantic tokens, light + dark modes." },
  { href: "/foundations/typography", title: "Typography", desc: "Google Sans across mobile (15 styles) and desktop (12 styles)." },
  { href: "/foundations/spacing", title: "Spacing & Grid", desc: "14-step spacing scale, responsive grid breakpoints." },
  { href: "/foundations/elevation", title: "Elevation", desc: "6-level shadow scale, focus rings, z-index order." },
  { href: "/foundations/shape", title: "Shape", desc: "7 border-radius tokens from sharp to fully rounded." },
  { href: "/foundations/motion", title: "Motion", desc: "6 durations, 4 easing curves for state changes." },
  { href: "/foundations/accessibility", title: "Accessibility", desc: "Contrast, touch targets, focus order, imagery rules." },
];

export default function FoundationsOverview() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations · v1.0"
        title="Foundations"
        description="SLDS is the design system for Sri Lanka's government digital services, maintained by ICTA. Three-tier token architecture — Primitive → Semantic → Component. Always reference semantic tokens in components; never use primitive tokens directly in UI."
      />

      <Section title="Design principles">
        <div className="grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5">
              <h3 className="font-semibold text-[var(--color-text-primary)]">{p.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sections">
        <div className="grid gap-4 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5 transition-shadow hover:shadow-[var(--shadow-md)]"
            >
              <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-icon-action)]">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{s.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
