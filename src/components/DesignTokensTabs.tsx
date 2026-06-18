"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/foundations/design-tokens", label: "1. Overview" },
  { href: "/foundations/design-tokens/architecture", label: "2. Token Architecture" },
  { href: "/foundations/design-tokens/naming", label: "3. Token Naming" },
];

export function DesignTokensTabs() {
  const pathname = usePathname();

  return (
    <nav aria-label="Design Tokens sections" className="mb-8 flex flex-wrap gap-2 border-b border-[var(--color-border-decorative)] pb-4">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "bg-[var(--gold-500)] text-[var(--neutral-900)]"
                : "border border-[var(--color-border-decorative)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
