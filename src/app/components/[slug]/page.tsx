import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { components, getComponentBySlug, PLATFORM_LABELS } from "@/data/components";
import { Badge } from "@/components/Badge";
import { ButtonSpec } from "@/components/specs/ButtonSpec";
import { ButtonDockSpec } from "@/components/specs/ButtonDockSpec";
import { IconButtonSpec } from "@/components/specs/IconButtonSpec";
import { LinkButtonSpec } from "@/components/specs/LinkButtonSpec";
import { FABSpec } from "@/components/specs/FABSpec";
import { BottomTabBarSpec } from "@/components/specs/BottomTabBarSpec";
import { TopNavBarSpec } from "@/components/specs/TopNavBarSpec";
import { PullToRefreshSpec } from "@/components/specs/PullToRefreshSpec";
import { TabStripSpec } from "@/components/specs/TabStripSpec";
import { NotificationBannerSpec } from "@/components/specs/NotificationBannerSpec";
import { ToastSnackbarSpec } from "@/components/specs/ToastSnackbarSpec";

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponentBySlug(slug);
  return { title: component ? component.name : "Component" };
}

type SpecComponent = () => React.ReactNode;

const SPEC_REGISTRY: Record<string, SpecComponent> = {
  "button-primary":       ButtonSpec,
  "button-secondary":     ButtonSpec,
  "button-tertiary-ghost": ButtonSpec,
  "button-destructive":   ButtonSpec,
  "button-group":         ButtonDockSpec,
  "button-icon":          IconButtonSpec,
  "button-text-link":     LinkButtonSpec,
  "floating-action-button-fab": FABSpec,
  "bottom-tab-bar":             BottomTabBarSpec,
  "top-navigation-bar":         TopNavBarSpec,
  "pull-to-refresh":            PullToRefreshSpec,
  "tabs-tab-strip":             TabStripSpec,
  "notification-banner":        NotificationBannerSpec,
  "toast-snackbar":             ToastSnackbarSpec,
};

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = getComponentBySlug(slug);
  if (!component) notFound();

  const related = components
    .filter((c) => c.category === component.category && c.slug !== component.slug)
    .slice(0, 6);

  const SpecComponent = SPEC_REGISTRY[component.slug] as SpecComponent | undefined;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--color-text-secondary)]">
        <Link href="/components" className="hover:text-[var(--color-text-primary)] hover:underline">
          Components
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-[var(--color-text-tertiary)]">{component.category}</span>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-[var(--color-text-primary)]">{component.name}</span>
      </nav>

      <header className="mb-8 flex flex-col gap-4 border-b border-[var(--color-border-decorative)] pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--gold-700)]">{component.category}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{component.name}</h1>
          {component.notes && <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)]">{component.notes}</p>}
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
          {component.status === "v1" ? (
            <Badge tone="green">v1 — current build</Badge>
          ) : (
            <Badge tone="gold">Planned for v1.1–v1.2</Badge>
          )}
          {component.exclusive && <Badge tone="blue">Platform-exclusive</Badge>}
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Available on</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {component.platforms.map((p) => (
            <Badge key={p} tone="outline">
              {PLATFORM_LABELS[p]}
            </Badge>
          ))}
        </div>
      </section>

      {SpecComponent ? (
        <section className="mb-10">
          <SpecComponent />
        </section>
      ) : (
        <section className="mb-10 flex min-h-[280px] flex-col items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-[var(--color-border-default)] bg-[var(--color-surface-section-alt)] p-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-card)] text-xl">
            🧩
          </span>
          <h2 className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]">Live spec coming soon</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">
            Anatomy, variants, states, props/usage guidance and code will be published here as{" "}
            {component.name} is designed and built, following the SLDS component build order.
          </p>
        </section>
      )}

      {related.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
            More in {component.category}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/components/${c.slug}`}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-4 text-sm font-medium text-[var(--color-text-primary)] transition-shadow hover:shadow-[var(--shadow-md)]"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
