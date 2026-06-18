import Link from "next/link";
import { componentCounts, components } from "@/data/components";

const FOUNDATIONS = [
  { href: "/foundations/colour", title: "Colour", desc: "Gold brand palette, semantic tokens, status colours and dark mode." },
  { href: "/foundations/typography", title: "Typography", desc: "Google Sans type scales for mobile and desktop, in English, Sinhala and Tamil." },
  { href: "/foundations/spacing", title: "Spacing & Grid", desc: "A 4px-based spacing scale and responsive grid for mobile, tablet and desktop." },
  { href: "/foundations/elevation", title: "Elevation", desc: "A 6-level shadow scale, focus rings, and z-index stacking order." },
  { href: "/foundations/shape", title: "Shape", desc: "Border radius tokens from sharp tables to fully rounded pills." },
  { href: "/foundations/motion", title: "Motion", desc: "Durations and easing curves that communicate state, not decoration." },
  { href: "/foundations/accessibility", title: "Accessibility", desc: "WCAG 2.1 AA contrast, touch targets, focus management and more." },
];

const PLATFORMS = [
  { key: "mobile", label: "Mobile App", desc: "SLDS native — iOS & Android" },
  { key: "web", label: "Web (PWA)", desc: "SLDS progressive web app" },
  { key: "dashboard", label: "Dashboard", desc: "Internal gov staff & admin portal" },
  { key: "websites", label: "Websites", desc: "Ministry & department landing pages" },
] as const;

export default function Home() {
  return (
    <div>
      <section className="border-b border-[var(--color-border-decorative)] bg-[var(--color-surface-page)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]">
            Version 1.0 · Foundations milestone
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
            The design system for Sri Lanka&rsquo;s government digital services
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            SLDS gives every citizen-facing product — mobile, web, dashboard and ministry
            websites — a shared visual language, reusable components, and accessible-by-default
            design tokens, maintained by ICTA.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/foundations"
              className="inline-flex items-center justify-center rounded-md bg-[var(--color-action-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-action-primary-foreground)] transition-colors hover:bg-[var(--color-action-primary-hover)]"
            >
              Explore Foundations
            </Link>
            <Link
              href="/components"
              className="inline-flex items-center justify-center rounded-md border border-[var(--color-action-secondary-border)] bg-[var(--color-action-secondary)] px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-hover)]"
            >
              Browse Components
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-[var(--color-border-decorative)] pt-10 sm:grid-cols-4">
            <div>
              <dt className="text-sm text-[var(--color-text-secondary)]">Components catalogued</dt>
              <dd className="mt-1 text-3xl font-bold text-[var(--color-text-primary)]">{components.length}</dd>
            </div>
            <div>
              <dt className="text-sm text-[var(--color-text-secondary)]">Planned for v1</dt>
              <dd className="mt-1 text-3xl font-bold text-[var(--color-text-primary)]">{componentCounts.v1}</dd>
            </div>
            <div>
              <dt className="text-sm text-[var(--color-text-secondary)]">Platforms covered</dt>
              <dd className="mt-1 text-3xl font-bold text-[var(--color-text-primary)]">4</dd>
            </div>
            <div>
              <dt className="text-sm text-[var(--color-text-secondary)]">Languages</dt>
              <dd className="mt-1 text-3xl font-bold text-[var(--color-text-primary)]">3</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Foundations</h2>
            <p className="mt-1 text-[var(--color-text-secondary)]">
              The tokens every component is built from.
            </p>
          </div>
          <Link href="/foundations" className="hidden text-sm font-medium text-[var(--color-text-link)] underline sm:block">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FOUNDATIONS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
            >
              <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-icon-action)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--color-border-decorative)] bg-[var(--color-surface-section-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Built for four platforms</h2>
              <p className="mt-1 text-[var(--color-text-secondary)]">
                One token system, adapted per platform sizing and behaviour.
              </p>
            </div>
            <Link href="/components" className="hidden text-sm font-medium text-[var(--color-text-link)] underline sm:block">
              Browse components
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORMS.map((p) => {
              const count = components.filter((c) => c.platforms.includes(p.key)).length;
              return (
                <Link
                  key={p.key}
                  href={`/components?platform=${p.key}`}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
                >
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{p.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{p.desc}</p>
                  <p className="mt-4 text-sm font-medium text-[var(--color-icon-action)]">{count} components →</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius-xl)] bg-[var(--color-surface-masthead)] px-8 py-12 text-center text-[var(--color-text-inverse)] sm:px-16">
          <h2 className="text-2xl font-bold">This is milestone one: Foundations</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--neutral-300)]">
            Colour, typography, spacing, elevation, shape, motion and accessibility are documented in
            full. Component pages are placeholders today — live specs, variants and usage guidance
            ship as each component is designed.
          </p>
        </div>
      </section>
    </div>
  );
}
