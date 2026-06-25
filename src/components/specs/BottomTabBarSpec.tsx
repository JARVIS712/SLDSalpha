"use client";
import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

// ── Icons (filled = active, outline = default) ─────────────────────────────

function HomeIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" fill="currentColor" opacity="0.25" />
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 10a6 6 0 1 0-12 0c0 3.5-2 5-2 5h16s-2-1.5-2-5z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 10a6 6 0 1 0-12 0c0 3.5-2 5-2 5h16s-2-1.5-2-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PersonIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GridIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ── Tab data ───────────────────────────────────────────────────────────────

interface TabDef {
  label: string;
  badge?: number;
  Icon: React.FC<{ filled: boolean }>;
}

const TABS: TabDef[] = [
  { label: "Home",   Icon: HomeIcon },
  { label: "Search", Icon: SearchIcon },
  { label: "Inbox",  Icon: BellIcon, badge: 2 },
  { label: "Profile", Icon: PersonIcon },
  { label: "More",   Icon: GridIcon },
];

// ── Bottom Tab Bar component ───────────────────────────────────────────────

function BottomTabBar({
  activeIndex,
  onTabChange,
}: {
  activeIndex: number;
  onTabChange?: (i: number) => void;
}) {
  return (
    <nav className="flex w-full border-t border-[var(--color-border-decorative)] bg-[var(--color-surface-page)] backdrop-blur-[6px]">
      {TABS.map((tab, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={tab.label}
            onClick={() => onTabChange?.(i)}
            aria-current={isActive ? "page" : undefined}
            aria-label={tab.label}
            className="flex flex-1 flex-col items-center py-1.5 gap-0.5 min-w-0 transition-colors"
          >
            <div className="relative flex h-8 w-14 items-center justify-center rounded-2xl">
              <span className={isActive ? "text-[var(--color-icon-primary)]" : "text-[var(--color-icon-secondary)]"}>
                <tab.Icon filled={isActive} />
              </span>
              {tab.badge != null && (
                <span className="absolute right-[14px] top-0.5 flex min-w-[16px] max-w-[34px] items-center justify-center rounded-full bg-[var(--blue-100)] px-1 text-[10px] leading-[16px] font-medium text-[var(--blue-500)]">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={[
              "text-[12px] leading-[18px] tracking-[0.2px]",
              isActive ? "text-[var(--color-text-primary)] font-medium" : "text-[var(--color-text-secondary)]",
            ].join(" ")}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// ── Single tab demo for states table ──────────────────────────────────────

function DemoTab({ tab, isActive, hasBadge = false }: { tab: TabDef; isActive: boolean; hasBadge?: boolean }) {
  return (
    <div className="inline-flex flex-col items-center py-1.5 gap-0.5 w-[80px]">
      <div className="relative flex h-8 w-14 items-center justify-center rounded-2xl">
        <span className={isActive ? "text-[var(--color-icon-primary)]" : "text-[var(--color-icon-secondary)]"}>
          <tab.Icon filled={isActive} />
        </span>
        {hasBadge && (
          <span className="absolute right-[14px] top-0.5 flex min-w-[16px] items-center justify-center rounded-full bg-[var(--blue-100)] px-1 text-[10px] leading-[16px] font-medium text-[var(--blue-500)]">
            2
          </span>
        )}
      </div>
      <span className={[
        "text-[12px] leading-[18px] tracking-[0.2px]",
        isActive ? "text-[var(--color-text-primary)] font-medium" : "text-[var(--color-text-secondary)]",
      ].join(" ")}>
        {tab.label}
      </span>
    </div>
  );
}

// ── Code snippet ───────────────────────────────────────────────────────────

const TAB_BAR_CODE = `// Bottom Tab Bar — SLDS token implementation
// Mobile App only. 5 tabs max. Active tab uses filled icon + gold accent.
// Add safe-area-inset-bottom padding to avoid home indicator overlap.

interface TabDef {
  label: string;
  badge?: number;
  Icon: React.FC<{ filled: boolean }>;
}

interface BottomTabBarProps {
  tabs: TabDef[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}

export function BottomTabBar({ tabs, activeIndex, onTabChange }: BottomTabBarProps) {
  return (
    <nav
      className={[
        'flex w-full border-t border-[var(--color-border-decorative)]',
        'bg-[var(--color-surface-page)] backdrop-blur-[6px]',
        'pb-[env(safe-area-inset-bottom)]', // iOS home indicator
      ].join(' ')}
    >
      {tabs.map((tab, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={tab.label}
            onClick={() => onTabChange(i)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={tab.label}
            className='flex flex-1 flex-col items-center py-1.5 gap-0.5 min-w-0 transition-colors'
          >
            <div className='relative flex h-8 w-14 items-center justify-center rounded-2xl'>
              <span className={isActive
                ? 'text-[var(--color-icon-primary)]'
                : 'text-[var(--color-icon-secondary)]'
              }>
                <tab.Icon filled={isActive} />
              </span>
              {tab.badge != null && (
                <span className='absolute right-[14px] top-0.5 flex min-w-[16px] max-w-[34px] items-center justify-center rounded-full bg-[var(--blue-100)] px-1 text-[10px] leading-[16px] font-medium text-[var(--blue-500)]'>
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={[
              'text-[12px] leading-[18px] tracking-[0.2px]',
              isActive
                ? 'text-[var(--color-text-primary)] font-medium'
                : 'text-[var(--color-text-secondary)]',
            ].join(' ')}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}`;

// ── Main spec ──────────────────────────────────────────────────────────────

export function BottomTabBarSpec() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-12">

      {/* Live Preview */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <SectionHeading>Live preview</SectionHeading>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
          >
            {isDark ? "☀ Light mode" : "☾ Dark mode"}
          </button>
        </div>
        <div className={[
          "rounded-[var(--radius-xl)] overflow-hidden",
          isDark
            ? "dark bg-[var(--color-surface-page)]"
            : "border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)]",
        ].join(" ")}>
          {/* Simulated phone screen */}
          <div className="flex flex-col">
            <div className="flex-1 px-6 py-10 flex items-center justify-center min-h-[120px]">
              <p className="text-sm text-[var(--color-text-tertiary)]">
                Tap a tab to change active state
              </p>
            </div>
            <BottomTabBar activeIndex={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      </section>

      {/* States */}
      <section>
        <SectionHeading>States</SectionHeading>
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-decorative)]">
                <th className="py-3 pl-5 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">State</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Example</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-decorative)]">
              <tr>
                <td className="py-4 pl-5 pr-4 text-xs font-medium text-[var(--color-text-secondary)]">Active</td>
                <td className="px-4 py-4"><DemoTab tab={TABS[0]} isActive /></td>
                <td className="px-4 py-4 text-xs text-[var(--color-text-secondary)]">Filled icon in icon-primary · label in text-primary · indicates current screen</td>
              </tr>
              <tr>
                <td className="py-4 pl-5 pr-4 text-xs font-medium text-[var(--color-text-secondary)]">Default</td>
                <td className="px-4 py-4"><DemoTab tab={TABS[1]} isActive={false} /></td>
                <td className="px-4 py-4 text-xs text-[var(--color-text-secondary)]">Outline icon in text-secondary · label in text-secondary · inactive screen</td>
              </tr>
              <tr>
                <td className="py-4 pl-5 pr-4 text-xs font-medium text-[var(--color-text-secondary)]">Badge</td>
                <td className="px-4 py-4"><DemoTab tab={TABS[2]} isActive={false} hasBadge /></td>
                <td className="px-4 py-4 text-xs text-[var(--color-text-secondary)]">Numeric badge on unread count · max display 99+ · blue pill top-right of icon</td>
              </tr>
              <tr>
                <td className="py-4 pl-5 pr-4 text-xs font-medium text-[var(--color-text-secondary)]">Active + Badge</td>
                <td className="px-4 py-4"><DemoTab tab={TABS[2]} isActive hasBadge /></td>
                <td className="px-4 py-4 text-xs text-[var(--color-text-secondary)]">Badge persists on active tab — content is unread even though the tab is open</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Full bar configs */}
      <section>
        <SectionHeading>Tab count configurations</SectionHeading>
        <div className="space-y-4">
          {[5, 4, 3].map((count) => (
            <Card key={count} className="overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--color-border-decorative)]">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{count} tabs</p>
                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                  {count === 5 ? "Maximum — use when all sections are equally important" :
                   count === 4 ? "Common — drop the lowest-priority section" :
                   "Minimal — only the three core destinations"}
                </p>
              </div>
              <div className="bg-[var(--color-surface-section-alt)]">
                <nav className="flex w-full border-t border-[var(--color-border-decorative)] bg-[var(--color-surface-page)]">
                  {TABS.slice(0, count).map((tab, i) => (
                    <div key={tab.label} className="flex flex-1 flex-col items-center py-1.5 gap-0.5 min-w-0">
                      <div className="relative flex h-8 w-14 items-center justify-center rounded-2xl">
                        <span className={i === 0 ? "text-[var(--color-icon-primary)]" : "text-[var(--color-icon-secondary)]"}>
                          <tab.Icon filled={i === 0} />
                        </span>
                      </div>
                      <span className={["text-[12px] leading-[18px] tracking-[0.2px]", i === 0 ? "text-[var(--color-text-primary)] font-medium" : "text-[var(--color-text-secondary)]"].join(" ")}>
                        {tab.label}
                      </span>
                    </div>
                  ))}
                </nav>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Anatomy */}
      <section>
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { prop: "Height",          value: "64px (6px top pad + 32px icon row + 18px label + 6px bottom pad + safe area)" },
            { prop: "Icon size",       value: "24×24px" },
            { prop: "Icon container",  value: "56×32px · rounded-2xl (16px)" },
            { prop: "Label",           value: "12px · tracking 0.2px · Caption 1" },
            { prop: "Tab count",       value: "3–5 tabs · equal flex-1 width · no fewer, no more" },
            { prop: "Background",      value: "--color-surface-page · backdrop-blur-[6px]" },
            { prop: "Border",          value: "1px solid --color-border-decorative · top only" },
            { prop: "Active icon",     value: "--color-icon-primary (neutral-900 · #111111)" },
            { prop: "Default icon",    value: "--color-icon-secondary (neutral-500 · #8e949e)" },
            { prop: "Active label",    value: "--color-text-primary · font-medium" },
            { prop: "Default label",   value: "--color-text-secondary · font-normal" },
            { prop: "Badge bg",        value: "--blue-100 (#e3edff)" },
            { prop: "Badge text",      value: "--blue-500 (#1a56d6)" },
            { prop: "Safe area",       value: "pb-[env(safe-area-inset-bottom)] · required on iOS" },
            { prop: "Platform",        value: "Mobile App only" },
          ].map(({ prop, value }) => (
            <div key={prop} className="flex gap-4 px-5 py-3">
              <p className="w-40 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{prop}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{value}</p>
            </div>
          ))}
        </Card>
      </section>

      {/* Usage */}
      <section>
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            { label: "Do",    note: "Use 3–5 tabs for the app's top-level destinations only." },
            { label: "Do",    note: "Keep labels short (1–2 words) and describe the destination, not an action." },
            { label: "Do",    note: "Add pb-[env(safe-area-inset-bottom)] for iPhone home indicator clearance." },
            { label: "Do",    note: "Use numeric badges for unread counts. Cap display at 99+." },
            { label: "Don't", note: "Don't use more than 5 tabs — hide lower-priority sections behind a 'More' tab." },
            { label: "Don't", note: "Don't use on web or dashboard — use Sidebar Navigation or Tab Strip instead." },
            { label: "Don't", note: "Don't hide the tab bar when scrolling — it must always be reachable." },
            { label: "Don't", note: "Don't use icon-only tabs without labels — labels are required for accessibility." },
          ].map(({ label, note }, i) => (
            <div key={i} className="flex gap-4 px-5 py-3">
              <span className={`shrink-0 text-xs font-semibold uppercase tracking-wide ${label === "Do" ? "text-[var(--green-600)]" : "text-[var(--red-600)]"}`}>
                {label}
              </span>
              <p className="text-sm text-[var(--color-text-secondary)]">{note}</p>
            </div>
          ))}
        </Card>
      </section>

      {/* Code */}
      <section>
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={TAB_BAR_CODE} />
      </section>

    </div>
  );
}
