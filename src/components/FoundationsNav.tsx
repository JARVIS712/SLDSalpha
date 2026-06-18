"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/foundations", label: "Overview" },
  {
    href: "/foundations/design-tokens",
    label: "Design Tokens",
    children: [
      { href: "/foundations/design-tokens", label: "Overview" },
      { href: "/foundations/design-tokens/architecture", label: "Token Architecture" },
      { href: "/foundations/design-tokens/naming", label: "Token Naming" },
    ],
  },
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
        const sectionActive = link.children ? pathname.startsWith(link.href) : active;
        return (
          <div key={link.href}>
            <Link
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
            {link.children && sectionActive && (
              <div className="ml-3 mt-0.5 space-y-0.5 border-l border-[var(--color-border-decorative)] pl-3">
                {link.children.map((child) => {
                  const childActive = pathname === child.href;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      aria-current={childActive ? "page" : undefined}
                      className={`block rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                        childActive
                          ? "bg-[var(--gold-100)] font-medium text-[var(--gold-800)]"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
                      }`}
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
