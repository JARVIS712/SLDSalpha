"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  components,
  CATEGORIES,
  PLATFORM_LABELS,
  type Platform,
  type ComponentEntry,
} from "@/data/components";
import { Badge } from "@/components/Badge";

const PLATFORM_KEYS = Object.keys(PLATFORM_LABELS) as Platform[];

function StatusBadge({ status }: { status: ComponentEntry["status"] }) {
  return status === "v1" ? (
    <Badge tone="green">v1</Badge>
  ) : (
    <Badge tone="gold">Planned v1.1–v1.2</Badge>
  );
}

export function ComponentsBrowser() {
  const searchParams = useSearchParams();
  const initialPlatform = searchParams.get("platform");
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<Platform | "all">(
    initialPlatform && PLATFORM_KEYS.includes(initialPlatform as Platform) ? (initialPlatform as Platform) : "all",
  );
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<"all" | "v1" | "post-v1">("all");

  const filtered = useMemo(() => {
    return components.filter((c) => {
      if (platform !== "all" && !c.platforms.includes(platform)) return false;
      if (category !== "all" && c.category !== category) return false;
      if (status !== "all" && c.status !== status) return false;
      if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [platform, category, status, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, ComponentEntry[]>();
    for (const c of filtered) {
      const list = map.get(c.category) ?? [];
      list.push(c);
      map.set(c.category, list);
    }
    return CATEGORIES.filter((cat) => map.has(cat)).map((cat) => ({ category: cat, items: map.get(cat)! }));
  }, [filtered]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components…"
          aria-label="Search components"
          className="w-full rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-page)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none sm:max-w-xs"
        />

        <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          Platform
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform | "all")}
            className="rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-page)] px-2 py-1.5 text-sm text-[var(--color-text-primary)]"
          >
            <option value="all">All platforms</option>
            {PLATFORM_KEYS.map((p) => (
              <option key={p} value={p}>
                {PLATFORM_LABELS[p]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-page)] px-2 py-1.5 text-sm text-[var(--color-text-primary)]"
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "all" | "v1" | "post-v1")}
            className="rounded-md border border-[var(--color-border-default)] bg-[var(--color-surface-page)] px-2 py-1.5 text-sm text-[var(--color-text-primary)]"
          >
            <option value="all">All statuses</option>
            <option value="v1">v1</option>
            <option value="post-v1">Planned (post-v1)</option>
          </select>
        </label>

        <span className="text-sm text-[var(--color-text-tertiary)] sm:ml-auto">
          {filtered.length} of {components.length} components
        </span>
      </div>

      <div className="mt-10 space-y-12">
        {grouped.length === 0 && (
          <p className="text-sm text-[var(--color-text-secondary)]">No components match these filters.</p>
        )}
        {grouped.map(({ category: cat, items }) => (
          <div key={cat}>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{cat}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => (
                <Link
                  key={c.slug}
                  href={`/components/${c.slug}`}
                  className="group flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-4 transition-shadow hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-icon-action)]">
                      {c.name}
                    </h3>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-xs leading-5 text-[var(--color-text-secondary)]">{c.notes || "—"}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {c.platforms.map((p) => (
                      <Badge key={p} tone="outline">
                        {PLATFORM_LABELS[p]}
                      </Badge>
                    ))}
                    {c.exclusive && <Badge tone="blue">Exclusive</Badge>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
