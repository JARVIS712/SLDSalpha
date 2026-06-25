"use client";
import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

// ── Circle icon (leading / trailing placeholder, 20px) ─────────────────────

function CircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

// ── Tab Element ────────────────────────────────────────────────────────────

interface TabDef {
  label: string;
  badge?: number;
  leadingIcon?: boolean;
}

function TabElement({
  tab,
  isActive,
  onClick,
}: {
  tab: TabDef;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={[
        "flex shrink-0 items-center gap-[3px] rounded-[var(--radius-lg)] px-3 py-1 transition-all",
        isActive
          ? "bg-[var(--color-surface-page)] [filter:drop-shadow(0px_1px_1px_rgba(0,0,0,0.05))]"
          : "bg-transparent",
      ].join(" ")}
    >
      {tab.leadingIcon && (
        <span className="text-[var(--color-icon-secondary)]">
          <CircleIcon />
        </span>
      )}
      <span className="p-1 text-[17px] leading-6 tracking-[0px] text-[var(--color-text-primary)] whitespace-nowrap">
        {tab.label}
      </span>
      {tab.badge != null && (
        <span className="flex min-w-[16px] max-w-[34px] items-center justify-center rounded-full bg-[var(--blue-100)] px-2 text-[14px] leading-5 tracking-[0px] text-[var(--blue-500)]">
          {tab.badge}
        </span>
      )}
    </button>
  );
}

// ── Tab Strip ──────────────────────────────────────────────────────────────

function TabStrip({
  tabs,
  activeIndex,
  onTabChange,
}: {
  tabs: TabDef[];
  activeIndex: number;
  onTabChange?: (i: number) => void;
}) {
  return (
    <div
      role="tablist"
      className="flex items-center gap-2 rounded-[var(--radius-xl)] bg-[var(--color-surface-sunken)] p-1"
    >
      {tabs.map((tab, i) => (
        <TabElement
          key={tab.label}
          tab={tab}
          isActive={i === activeIndex}
          onClick={() => onTabChange?.(i)}
        />
      ))}
    </div>
  );
}

// ── Code snippet ───────────────────────────────────────────────────────────

const TAB_CODE = `// Tabs / Tab Strip — SLDS token implementation
// Segmented pill tabs for within-page section switching.
// Active tab: surface-page bg + elevation shadow. Default: transparent.

interface TabDef {
  label: string;
  badge?: number;
  leadingIcon?: boolean;
}

interface TabStripProps {
  tabs: TabDef[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}

export function TabStrip({ tabs, activeIndex, onTabChange }: TabStripProps) {
  return (
    <div
      role="tablist"
      className={[
        "flex items-center gap-2 p-1",
        "rounded-[var(--radius-xl)]",        // 16px — strip container
        "bg-[var(--color-surface-sunken)]",  // Neutral/100 · #f5f6f8
      ].join(" ")}
    >
      {tabs.map((tab, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={tab.label}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(i)}
            className={[
              "flex shrink-0 items-center gap-[3px] px-3 py-1 transition-all",
              "rounded-[var(--radius-lg)]",   // 12px — individual tab
              isActive
                ? "bg-[var(--color-surface-page)] [filter:drop-shadow(0px_1px_1px_rgba(0,0,0,0.05))]"
                : "bg-transparent",
            ].join(" ")}
          >
            {tab.leadingIcon && (
              <span className="text-[var(--color-icon-secondary)]">
                <YourIcon size={20} />
              </span>
            )}
            <span className="p-1 text-[17px] leading-6 tracking-[0px] text-[var(--color-text-primary)] whitespace-nowrap">
              {tab.label}
            </span>
            {tab.badge != null && (
              <span className={[
                "flex min-w-[16px] max-w-[34px] items-center justify-center",
                "rounded-full px-2 text-[14px] leading-5 tracking-[0px]",
                "bg-[var(--blue-100)] text-[var(--blue-500)]",
              ].join(" ")}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}`;

// ── Demo data sets ─────────────────────────────────────────────────────────

const TABS_BASIC: TabDef[] = [
  { label: "All" },
  { label: "Active" },
  { label: "Closed" },
];

const TABS_BADGE: TabDef[] = [
  { label: "Inbox", badge: 4 },
  { label: "Sent" },
  { label: "Drafts", badge: 2 },
  { label: "Archive" },
];

const TABS_ICON: TabDef[] = [
  { label: "Overview", leadingIcon: true },
  { label: "Details", leadingIcon: true },
  { label: "History", leadingIcon: true },
];

const TABS_MIXED: TabDef[] = [
  { label: "All", badge: 12 },
  { label: "Pending", badge: 3, leadingIcon: true },
  { label: "Approved" },
];

// ── Main spec ──────────────────────────────────────────────────────────────

export function TabStripSpec() {
  const [isDark, setIsDark] = useState(false);
  const [activeBasic, setActiveBasic] = useState(0);
  const [activeBadge, setActiveBadge] = useState(0);
  const [activeIcon, setActiveIcon] = useState(0);
  const [activeMixed, setActiveMixed] = useState(0);

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
        <div className={isDark ? "dark rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface-page)] p-6 space-y-4" : "rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-6 space-y-4"}>
          <TabStrip tabs={TABS_BASIC} activeIndex={activeBasic} onTabChange={setActiveBasic} />
          <TabStrip tabs={TABS_BADGE} activeIndex={activeBadge} onTabChange={setActiveBadge} />
          <TabStrip tabs={TABS_ICON} activeIndex={activeIcon} onTabChange={setActiveIcon} />
          <TabStrip tabs={TABS_MIXED} activeIndex={activeMixed} onTabChange={setActiveMixed} />
        </div>
      </section>

      {/* States */}
      <section>
        <SectionHeading>Tab element states</SectionHeading>
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
                <td className="py-4 pl-5 pr-4 align-middle text-xs font-medium text-[var(--color-text-secondary)]">Active</td>
                <td className="px-4 py-4 align-middle">
                  <div className="inline-flex rounded-[var(--radius-xl)] bg-[var(--color-surface-sunken)] p-1">
                    <TabElement tab={{ label: "Label", badge: 2 }} isActive />
                  </div>
                </td>
                <td className="px-4 py-4 align-middle text-xs text-[var(--color-text-secondary)]">
                  surface-page background + drop-shadow(0 1px 1px rgba(0,0,0,0.05)). Indicates the currently visible panel.
                </td>
              </tr>
              <tr>
                <td className="py-4 pl-5 pr-4 align-middle text-xs font-medium text-[var(--color-text-secondary)]">Default</td>
                <td className="px-4 py-4 align-middle">
                  <div className="inline-flex rounded-[var(--radius-xl)] bg-[var(--color-surface-sunken)] p-1">
                    <TabElement tab={{ label: "Label", badge: 2 }} isActive={false} />
                  </div>
                </td>
                <td className="px-4 py-4 align-middle text-xs text-[var(--color-text-secondary)]">
                  Transparent background, no shadow. Readable against the sunken container. Same text color as active.
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Configurations */}
      <section>
        <SectionHeading>Tab configurations</SectionHeading>
        <div className="space-y-3">
          {[
            {
              label: "Label only",
              desc: "Minimal — label text is enough to identify the tab.",
              tabs: [{ label: "All" }, { label: "Active" }, { label: "Closed" }],
              active: 0,
            },
            {
              label: "Label + badge",
              desc: "Shows a count badge beside the label — use for unread or pending counts.",
              tabs: [{ label: "Inbox", badge: 4 }, { label: "Sent" }, { label: "Drafts", badge: 2 }],
              active: 0,
            },
            {
              label: "Icon + label",
              desc: "Leading icon reinforces the tab category when icons have clear meaning.",
              tabs: [{ label: "Overview", leadingIcon: true }, { label: "Details", leadingIcon: true }, { label: "History", leadingIcon: true }],
              active: 0,
            },
            {
              label: "Icon + label + badge",
              desc: "Full configuration — all three elements combined.",
              tabs: [{ label: "Tasks", leadingIcon: true, badge: 7 }, { label: "Done", leadingIcon: true }, { label: "Flagged", leadingIcon: true, badge: 1 }],
              active: 0,
            },
          ].map(({ label, desc, tabs, active }) => (
            <Card key={label} className="overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--color-border-decorative)]">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{label}</p>
                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{desc}</p>
              </div>
              <div className="flex items-center bg-[var(--color-surface-section-alt)] px-5 py-4">
                <div className="inline-flex rounded-[var(--radius-xl)] bg-[var(--color-surface-sunken)] p-1">
                  {tabs.map((tab, i) => (
                    <TabElement key={tab.label} tab={tab} isActive={i === active} />
                  ))}
                </div>
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
            { prop: "Strip background",    value: "--color-surface-sunken (neutral-100 · #f5f6f8)" },
            { prop: "Strip border-radius", value: "--radius-xl (16px)" },
            { prop: "Strip padding",       value: "4px all sides" },
            { prop: "Strip gap",           value: "8px between tabs" },
            { prop: "Active tab bg",       value: "--color-surface-page (neutral-50 · #fafafb)" },
            { prop: "Active tab shadow",   value: "drop-shadow(0px 1px 1px rgba(0,0,0,0.05)) — Elevation/1 · Raised" },
            { prop: "Default tab bg",      value: "transparent" },
            { prop: "Tab border-radius",   value: "--radius-lg (12px)" },
            { prop: "Tab padding",         value: "12px horizontal · 4px vertical" },
            { prop: "Tab gap",             value: "3px between icon / label / badge" },
            { prop: "Label (both states)", value: "--color-text-primary (neutral-900 · #111111) · 17px · leading-6 · tracking-0" },
            { prop: "Icon size",           value: "20×20px · --color-icon-secondary" },
            { prop: "Badge background",    value: "--blue-100 (#e3edff)" },
            { prop: "Badge text",          value: "--blue-500 (#1a56d6) · 14px · leading-5" },
            { prop: "Badge padding",       value: "8px horizontal · rounded-full" },
          ].map(({ prop, value }) => (
            <div key={prop} className="flex gap-4 px-5 py-3">
              <p className="w-44 shrink-0 text-sm font-medium text-[var(--color-text-primary)]">{prop}</p>
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
            { label: "Do",    note: "Use the tab strip for within-page section switching — not for top-level app navigation (that's Bottom Tab Bar)." },
            { label: "Do",    note: "Keep labels short (1–2 words). The strip should not need to scroll horizontally if possible." },
            { label: "Do",    note: "Use role=\"tablist\" on the strip and role=\"tab\" + aria-selected on each button for accessibility." },
            { label: "Do",    note: "Show badge counts for real-time unread or pending numbers only — don't use decoratively." },
            { label: "Don't", note: "Don't use more than 5 tabs in a single strip — truncate with a 'More' overflow if needed." },
            { label: "Don't", note: "Don't use trailing icons — the design only supports leading icons." },
            { label: "Don't", note: "Don't mix icon and no-icon tabs in the same strip — either all tabs have icons or none do." },
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
        <CodeBlock code={TAB_CODE} />
      </section>

    </div>
  );
}
