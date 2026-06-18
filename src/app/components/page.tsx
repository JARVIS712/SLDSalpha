import type { Metadata } from "next";
import { Suspense } from "react";
import { componentCounts } from "@/data/components";
import { ComponentsBrowser } from "@/components/ComponentsBrowser";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--gold-700)]">Components · v1.0</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Components</h1>
        <p className="mt-3 text-base leading-7 text-[var(--color-text-secondary)]">
          {componentCounts.total} components catalogued across Mobile, Web, Dashboard, and Websites —{" "}
          {componentCounts.v1} planned for v1, {componentCounts.postV1} planned for v1.1–v1.2. This
          milestone ships placeholders: specs, variants and code land per the build order as each
          component is designed.
        </p>
      </header>

      <Suspense fallback={null}>
        <ComponentsBrowser />
      </Suspense>
    </div>
  );
}
