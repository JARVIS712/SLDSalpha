import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border-decorative)] bg-[var(--color-surface-footer)] text-[var(--color-text-inverse)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div>
            <Image src="/slds-logo.svg" alt="" width={54} height={40} />
          </div>
          <p className="mt-4 max-w-sm text-sm text-[var(--neutral-400)]">
            The shared design system for Sri Lanka&rsquo;s government digital services — maintained by GovTech Sri Lanka.
            One visual language across mobile, web, dashboard, and ministry websites.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-400)]">System</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/foundations" className="hover:text-[var(--gold-300)]">
                Foundations
              </Link>
            </li>
            <li>
              <Link href="/components" className="hover:text-[var(--gold-300)]">
                Components
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-400)]">Resources</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--neutral-400)]">
            <li>Figma file: FicNTPKmH6HF7KZaZYRDKG</li>
            <li>Version 1.0 · June 2026</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-[var(--neutral-500)] sm:px-6 lg:px-8">
        © {new Date().getFullYear()} GovTech Sri Lanka. Built with SLDS.
      </div>
    </footer>
  );
}
