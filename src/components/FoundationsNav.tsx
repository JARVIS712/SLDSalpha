"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/foundations", label: "Overview" },
  { href: "/foundations/colour", label: "Colour" },
  { href: "/foundations/typography", label: "Typography" },
  { href: "/foundations/spacing", label: "Spacing & Grid" },
  { href: "/foundations/elevation", label: "Elevation" },
  { href: "/foundations/shape", label: "Shape" },
  { href: "/foundations/motion", label: "Motion" },
  { href: "/foundations/accessibility", label: "Accessibility" },
];

export function FoundationsNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Foundations" className="space-y-0.5">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-[var(--gold-100)] text-[var(--gold-800)]"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
