"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage, type Language } from "@/components/LanguageContext";

const NAV_LINKS = [
  { href: "/foundations", label: "Foundations" },
  { href: "/components", label: "Components" },
];

const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "si", label: "සිංහල" },
  { code: "ta", label: "தமிழ்" },
];

export function SiteHeader() {
  const { language, setLanguage } = useLanguage();
  return (
    <header className="sticky top-0 z-[100] border-b border-[var(--color-border-decorative)] bg-[var(--color-surface-page)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-surface-page)]/80">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/slds-logo.svg" alt="" width={28} height={33} priority />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">SLDS</span>
            <span className="text-[11px] text-[var(--color-text-tertiary)]">Design System</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-[var(--color-border-decorative)] px-3 py-1 text-xs text-[var(--color-text-tertiary)] sm:inline-flex">
            v1.0 · Foundations
          </span>
          <nav aria-label="Language" className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
            {LANGUAGE_OPTIONS.map((opt, i) => (
              <span key={opt.code} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden="true">·</span>}
                <button
                  className={`rounded px-2 py-1 transition-colors ${
                    language === opt.code
                      ? "font-medium text-[var(--color-text-primary)]"
                      : "hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
                  }`}
                  type="button"
                  aria-pressed={language === opt.code}
                  onClick={() => setLanguage(opt.code)}
                >
                  {opt.label}
                </button>
              </span>
            ))}
          </nav>
        </div>
      </div>
      <nav aria-label="Primary" className="flex items-center gap-1 overflow-x-auto border-t border-[var(--color-border-decorative)] px-4 py-2 sm:hidden">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
