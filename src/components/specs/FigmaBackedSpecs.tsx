"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

function ModeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
    >
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}

function SpecHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center justify-between gap-3">{children}</div>;
}

function SpecTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-decorative)]">
              {headers.map((header) => (
                <th key={header} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-decorative)]">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-5 py-4 align-top text-[var(--color-text-secondary)]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Guidance({ items }: { items: { label: "Do" | "Don't"; note: string }[] }) {
  return (
    <Card className="divide-y divide-[var(--color-border-decorative)]">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4 px-5 py-3">
          <span className={`w-12 shrink-0 text-xs font-semibold uppercase tracking-wide ${item.label === "Do" ? "text-[var(--green-600)]" : "text-[var(--red-600)]"}`}>
            {item.label}
          </span>
          <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{item.note}</p>
        </div>
      ))}
    </Card>
  );
}

function Spinner({ size = 32, label }: { size?: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[var(--color-text-secondary)]" role="status" aria-live="polite">
      <span
        aria-hidden="true"
        className="inline-block animate-spin rounded-full border-2 border-[var(--color-border-decorative)] border-t-[var(--color-action-primary)]"
        style={{ width: size, height: size }}
      />
      {label && <span className="text-sm">{label}</span>}
    </span>
  );
}

const LOADING_SPINNER_CODE = `export function LoadingSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <span role="status" aria-live="polite" className="inline-flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border-decorative)] border-t-[var(--color-action-primary)]"
      />
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
    </span>
  );
}`;

export function LoadingSpinnerSpec() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SpecHeader>
          <SectionHeading>Live preview</SectionHeading>
          <ModeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </SpecHeader>
        <div className={`${isDark ? "dark bg-[var(--color-surface-page)]" : "bg-[var(--color-surface-card)]"} rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] p-8`}>
          <div className="flex flex-wrap items-center gap-8">
            <Spinner size={24} label="Loading" />
            <Spinner size={32} label="Fetching records" />
            <Spinner size={44} />
          </div>
        </div>
      </section>
      <section className="space-y-4">
        <SectionHeading>Variants &amp; states</SectionHeading>
        <SpecTable
          headers={["Variant", "Use", "Token notes"]}
          rows={[
            ["Small", "Inline validation, compact table cells, secondary loading states.", "24px indicator · 2px stroke"],
            ["Medium", "Default screen-level and card-level loading.", "32px indicator · gold active stroke"],
            ["Large", "Mobile pull areas and empty panels while first content loads.", "44px indicator · optional visible label"],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Guidance
          items={[
            { label: "Do", note: "Pair long-running spinners with visible text so screen reader and low-vision users know what is loading." },
            { label: "Do", note: "Use skeleton loaders when the layout is known; use spinner when progress is brief or indeterminate." },
            { label: "Don't", note: "Do not block the whole page when only one table, card, or panel is loading." },
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={LOADING_SPINNER_CODE} />
      </section>
    </div>
  );
}

function BottomSheetPreview({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <div className="relative mx-auto h-[560px] max-w-[320px] overflow-hidden rounded-[32px] border border-[var(--color-border-decorative)] bg-[var(--color-surface-page)] shadow-[var(--shadow-lg)]">
      <div className="border-b border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-5 py-4 text-center text-sm font-semibold text-[var(--color-text-primary)]">
        Service details
      </div>
      <div className="space-y-3 p-5">
        {["Application status", "Required documents", "Appointment details", "Payment receipt"].map((item) => (
          <div key={item} className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-4 text-sm text-[var(--color-text-secondary)]">
            {item}
          </div>
        ))}
        <button
          onClick={() => onOpenChange(true)}
          className="mt-3 h-12 w-full rounded-[var(--radius-lg)] bg-[var(--color-action-primary)] px-4 text-sm font-semibold text-[var(--color-action-primary-foreground)]"
        >
          Open actions
        </button>
      </div>
      {open && (
        <div className="absolute inset-0 flex items-end bg-black/35" onClick={() => onOpenChange(false)}>
          <div className="w-full rounded-t-[24px] bg-[var(--color-surface-card)] p-4 shadow-[var(--shadow-xl)]" onClick={(event) => event.stopPropagation()}>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[var(--color-border-default)]" />
            <h3 className="text-base font-semibold text-[var(--color-text-primary)]">Case actions</h3>
            <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">Choose the next action for this application.</p>
            <div className="mt-5 grid gap-2">
              {["Upload document", "Book appointment", "Contact support"].map((item) => (
                <button key={item} className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] px-4 py-3 text-left text-sm font-medium text-[var(--color-text-primary)]">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const BOTTOM_SHEET_CODE = `export function BottomSheet({ open, children, onClose }: BottomSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className="w-full rounded-t-[24px] bg-[var(--color-surface-card)] p-4 shadow-[var(--shadow-xl)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[var(--color-border-default)]" />
        {children}
      </div>
    </div>
  );
}`;

export function BottomSheetSpec() {
  const [open, setOpen] = useState(true);
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <BottomSheetPreview open={open} onOpenChange={setOpen} />
      </section>
      <section className="space-y-4">
        <SectionHeading>Anatomy &amp; behaviour</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Notes"]}
          rows={[
            ["Scrim", "Black at 35-40% opacity", "Dismisses the sheet when tapping outside."],
            ["Container", "Full width mobile sheet · rounded top 24px", "Anchored to bottom; content scrolls inside when needed."],
            ["Drag handle", "40px x 4px pill", "Visual affordance only unless native drag is implemented."],
            ["Focus", "Trap focus while open", "Restore focus to the trigger on close."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Guidance
          items={[
            { label: "Do", note: "Use for mobile action pickers, short forms, filters, and contextual options." },
            { label: "Do", note: "Keep destructive actions separated and clearly labelled." },
            { label: "Don't", note: "Do not use a bottom sheet for critical blocking confirmation; use Alert Dialog instead." },
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={BOTTOM_SHEET_CODE} />
      </section>
    </div>
  );
}

function Toggle({ checked, disabled = false, onChange }: { checked: boolean; disabled?: boolean; onChange?: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={[
        "relative inline-flex h-8 w-14 items-center rounded-full border transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)]",
        checked ? "border-[var(--color-action-primary)] bg-[var(--color-action-primary)]" : "border-[var(--color-border-default)] bg-[var(--color-surface-card)]",
        disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer",
      ].join(" ")}
    >
      <span
        className={[
          "absolute h-6 w-6 rounded-full bg-white shadow-[var(--shadow-sm)] transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}

const TOGGLE_CODE = `export function Toggle({ checked, onChange, disabled }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className="relative inline-flex h-8 w-14 items-center rounded-full"
    >
      <span className={checked ? "translate-x-6" : "translate-x-1"} />
    </button>
  );
}`;

export function ToggleSwitchSpec() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <Card className="p-6">
          <label className="flex max-w-md items-center justify-between gap-6">
            <span>
              <span className="block text-sm font-medium text-[var(--color-text-primary)]">SMS notifications</span>
              <span className="block text-sm text-[var(--color-text-secondary)]">Receive updates when your application status changes.</span>
            </span>
            <Toggle checked={checked} onChange={() => setChecked(!checked)} />
          </label>
        </Card>
      </section>
      <section className="space-y-4">
        <SectionHeading>States</SectionHeading>
        <SpecTable
          headers={["State", "Preview", "Use"]}
          rows={[
            ["Off", <Toggle key="off" checked={false} />, "Default boolean value is false."],
            ["On", <Toggle key="on" checked />, "Use gold fill for selected/on."],
            ["Disabled off", <Toggle key="disabled-off" checked={false} disabled />, "Unavailable permission or locked setting."],
            ["Disabled on", <Toggle key="disabled-on" checked disabled />, "Enabled but not user-editable."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Guidance
          items={[
            { label: "Do", note: "Use toggles only for immediate on/off settings that save without a separate submit action." },
            { label: "Do", note: "Provide a visible label; the switch alone is not enough context." },
            { label: "Don't", note: "Do not use toggles inside long forms where changes are only saved after Submit; use checkbox instead." },
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={TOGGLE_CODE} />
      </section>
    </div>
  );
}

function RadioMark({ checked, disabled = false }: { checked: boolean; disabled?: boolean }) {
  return (
    <span
      className={[
        "flex h-5 w-5 items-center justify-center rounded-full border",
        checked ? "border-[var(--color-action-primary)]" : "border-[var(--color-border-default)]",
        disabled ? "opacity-45" : "",
      ].join(" ")}
      aria-hidden="true"
    >
      {checked && <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-action-primary)]" />}
    </span>
  );
}

const RADIO_CODE = `export function RadioGroup({ value, options, onChange }: RadioGroupProps) {
  return options.map((option) => (
    <label key={option.value} className="flex items-start gap-3">
      <input
        type="radio"
        className="sr-only"
        checked={value === option.value}
        onChange={() => onChange(option.value)}
      />
      <span aria-hidden="true" className="h-5 w-5 rounded-full border" />
      <span>{option.label}</span>
    </label>
  ));
}`;

export function RadioButtonSpec() {
  const [selected, setSelected] = useState("online");
  const options = [
    { value: "online", label: "Online appointment", description: "Meet a support officer through video call." },
    { value: "branch", label: "Visit service centre", description: "Book a time at your nearest office." },
    { value: "phone", label: "Phone callback", description: "Receive a callback within two working days." },
  ];
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <Card className="p-6">
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-text-primary)]">Choose appointment type</legend>
            {options.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] p-4 hover:bg-[var(--color-surface-hover)]">
                <input className="sr-only" type="radio" checked={selected === option.value} onChange={() => setSelected(option.value)} />
                <RadioMark checked={selected === option.value} />
                <span>
                  <span className="block text-sm font-medium text-[var(--color-text-primary)]">{option.label}</span>
                  <span className="block text-sm text-[var(--color-text-secondary)]">{option.description}</span>
                </span>
              </label>
            ))}
          </fieldset>
        </Card>
      </section>
      <section className="space-y-4">
        <SectionHeading>States</SectionHeading>
        <SpecTable
          headers={["State", "Preview", "Notes"]}
          rows={[
            ["Unselected", <RadioMark key="unselected" checked={false} />, "Default option state."],
            ["Selected", <RadioMark key="selected" checked />, "Gold inner dot and border."],
            ["Disabled", <RadioMark key="disabled" checked={false} disabled />, "Reduce opacity and remove pointer interaction."],
            ["Disabled selected", <RadioMark key="disabled-selected" checked disabled />, "Preserve selected value while signalling locked state."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Guidance
          items={[
            { label: "Do", note: "Use radio buttons when users must pick exactly one option from a visible list." },
            { label: "Do", note: "Use fieldset and legend for grouped options." },
            { label: "Don't", note: "Do not use radio buttons for independent yes/no settings; use checkbox or toggle." },
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={RADIO_CODE} />
      </section>
    </div>
  );
}

type ChipVariant = "image" | "icon" | "removable" | "label";

function Chip({ variant }: { variant: ChipVariant }) {
  const hasLeadingImage = variant === "image";
  const hasLeadingIcon = variant === "icon";
  const hasRemove = variant !== "label";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full bg-[#F5F6F8] text-[15px] leading-5 text-[#111111]",
        hasLeadingImage ? "h-8 gap-3 py-1 pl-1 pr-2" : "h-7 gap-1 px-2 py-1",
      ].join(" ")}
    >
      {hasLeadingImage && (
        <span
          aria-hidden="true"
          className="h-6 w-6 rounded-full bg-[linear-gradient(135deg,#FFC700,#E3EDFF)]"
        />
      )}
      {hasLeadingIcon && <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center text-base leading-none">+</span>}
      <span>Label</span>
      {hasRemove && <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center text-sm leading-none">x</span>}
    </span>
  );
}

const CHIP_CODE = `export function TagChip({ children, selected, dismissible }: TagChipProps) {
  return (
    <span className="inline-flex h-7 items-center gap-1 rounded-full bg-[#F5F6F8] px-2 py-1 text-[15px] leading-5 text-[#111111]">
      {children}
      {dismissible && <button aria-label="Remove">x</button>}
    </span>
  );
}`;

export function TagChipSpec() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <Card className="p-6">
          <div className="flex flex-wrap gap-2">
            <Chip variant="image" />
            <Chip variant="icon" />
            <Chip variant="removable" />
            <Chip variant="label" />
          </div>
        </Card>
      </section>
      <section className="space-y-4">
        <SectionHeading>Variants</SectionHeading>
        <SpecTable
          headers={["Variant", "Preview", "Use"]}
          rows={[
            ["Image + Label + Remove", <Chip key="image" variant="image" />, "32px height, avatar slot, label, and remove affordance."],
            ["Icon + Label + Remove", <Chip key="icon" variant="icon" />, "28px height with a 20px leading icon and 16px remove icon."],
            ["Label + Remove", <Chip key="remove" variant="removable" />, "Applied filters that can be removed."],
            ["Label", <Chip key="label" variant="label" />, "Compact categorisation or metadata."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Guidance
          items={[
            { label: "Do", note: "Keep chip labels short, usually one or two words." },
            { label: "Do", note: "Use dismissible chips to show active filters." },
            { label: "Don't", note: "Do not use chips as primary calls to action; use buttons." },
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={CHIP_CODE} />
      </section>
    </div>
  );
}

type ServiceCardState = "default" | "hover" | "selected" | "active";

const SERVICE_CARD_STATE_STYLES: Record<ServiceCardState, string> = {
  default: "bg-[var(--color-surface-page)]",
  hover: "bg-[var(--color-surface-hover)]",
  selected: "bg-[var(--blue-100)]",
  active: "bg-[var(--color-action-primary)]",
};

function ServiceIcon() {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M9 6.5h12l4 4V25a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2Z" fill="#6F4FD8" />
        <path d="M21 6.5v5h5" fill="#A996F2" />
        <path d="M11 13h10M11 17h10M11 21h7" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6 9.5 19 5l2 5.6-12.8 4.5L6 9.5Z" fill="#D9D3FA" opacity=".75" />
      </svg>
    </span>
  );
}

function SuccessBadge() {
  return (
    <span className="inline-flex h-7 shrink-0 items-center rounded-[var(--radius-xl)] bg-[var(--green-100)] px-3 text-[15px] leading-5 text-[var(--green-500)]">
      Success
    </span>
  );
}

function ServiceCard({
  state = "default",
  title = "Service Name",
  description = "Enter the description text",
}: {
  state?: ServiceCardState;
  title?: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      className={[
        "flex h-[58px] w-full max-w-[400px] items-center gap-4 px-4 py-2 pr-2 text-left transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-600)]",
        SERVICE_CARD_STATE_STYLES[state],
      ].join(" ")}
    >
      <span className="flex min-w-0 flex-1 items-center gap-3">
        <ServiceIcon />
        <span className="min-w-0">
          <span className="block truncate text-[15px] leading-5 text-[var(--color-text-primary)]">{title}</span>
          <span className="block truncate text-[14px] leading-[22px] text-[var(--color-text-secondary)]">{description}</span>
        </span>
      </span>
      <SuccessBadge />
    </button>
  );
}

const SERVICE_CARD_CODE = `type ServiceCardState = "default" | "hover" | "selected" | "active";

export function ServiceCard({ state = "default", title, description, status }: ServiceCardProps) {
  return (
    <button className="flex h-[58px] w-full max-w-[400px] items-center gap-4 px-4 py-2 pr-2 text-left">
      <span className="flex min-w-0 flex-1 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[15px] leading-5 text-[var(--color-text-primary)]">{title}</span>
          <span className="block truncate text-[14px] leading-[22px] text-[var(--color-text-secondary)]">{description}</span>
        </span>
      </span>
      <StatusBadge type={status} />
    </button>
  );
}`;

export function ServiceCardSpec() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview - Figma states</SectionHeading>
        <Card className="p-6">
          <div className="w-full max-w-[400px] divide-y divide-transparent">
            {(["default", "hover", "selected", "active"] as ServiceCardState[]).map((state) => (
              <div key={state} className="py-2">
                <p className="mb-2 text-xs font-semibold capitalize text-[var(--color-text-tertiary)]">{state}</p>
                <ServiceCard state={state} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Variants</SectionHeading>
        <SpecTable
          headers={["State", "Background", "Figma notes"]}
          rows={[
            ["Default", "#FAFAFB / Surface Page", "Base row state."],
            ["Hover", "#F5F6F8 / Surface Hover", "Pointer hover and keyboard preselection."],
            ["Selected", "#E3EDFF / Blue 100", "Selected but not currently active."],
            ["Active", "#FFC700 / Action Primary", "Current active service or pressed selected state."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Anatomy &amp; tokens</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token / value"]}
          rows={[
            ["Container", "400 x 58px row, horizontal layout", "padding-left 16, padding-right 8, padding-y 8, gap 16"],
            ["Icon tile", "40 x 40px white square", "radius-md / 8px"],
            ["Icon slot", "32 x 32px", "Replaceable image/icon slot"],
            ["Title", "15px / 20px Google Sans Regular", "Text/Primary"],
            ["Description", "14px / 22px Google Sans Regular", "Text/Secondary"],
            ["Badge", "Success status badge", "80 x 28px, radius-xl, green subtle"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Guidance
          items={[
            { label: "Do", note: "Use Service Card for compact service lists in mobile, web, and ministry-site entry points." },
            { label: "Do", note: "Keep the title and description short enough to fit one line each at 400px width." },
            { label: "Do", note: "Use the badge for service availability or workflow status, not decorative labels." },
            { label: "Don't", note: "Do not place multiple actions inside the card; the entire row is the primary action." },
            { label: "Don't", note: "Do not change the active state to a non-SLDS colour. Active is the primary gold state." },
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={SERVICE_CARD_CODE} />
      </section>
    </div>
  );
}

type AvatarSize = 20 | 24 | 32 | 40 | 48 | 56;
type AvatarType = "image" | "text" | "icon";

const AVATAR_SIZES: AvatarSize[] = [20, 24, 32, 40, 48, 56];

const AVATAR_TEXT_STYLES: Record<AvatarSize, { fontSize: number; fontWeight: number; lineHeight: string }> = {
  20: { fontSize: 12, fontWeight: 400, lineHeight: "16px" },
  24: { fontSize: 12, fontWeight: 400, lineHeight: "16px" },
  32: { fontSize: 15, fontWeight: 400, lineHeight: "20px" },
  40: { fontSize: 17, fontWeight: 500, lineHeight: "24px" },
  48: { fontSize: 22, fontWeight: 500, lineHeight: "28px" },
  56: { fontSize: 26, fontWeight: 700, lineHeight: "32px" },
};

const AVATAR_ICON_SIZES: Record<AvatarSize, number> = {
  20: 14,
  24: 16,
  32: 20,
  40: 24,
  48: 24,
  56: 28,
};

const AVATAR_IMAGE_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23d7e2da'/%3E%3Cstop offset='1' stop-color='%2314211c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='80' height='80' fill='url(%23g)'/%3E%3Ccircle cx='41' cy='29' r='13' fill='%23f0c7a8'/%3E%3Cpath d='M20 78c4-20 14-30 22-30s19 10 22 30z' fill='%23111111'/%3E%3Cpath d='M28 27c2-11 9-17 18-14 7 2 10 8 8 16-8-5-16-4-26-2z' fill='%2361442f'/%3E%3C/svg%3E";

function UserIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 21c1.6-5 4.3-7.5 8-7.5S18.4 16 20 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Avatar({
  size,
  type,
  name = "Lanka",
  src = AVATAR_IMAGE_SRC,
}: {
  size: AvatarSize;
  type: AvatarType;
  name?: string;
  src?: string;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const textStyle = AVATAR_TEXT_STYLES[size];

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)]"
      style={{ width: size, height: size }}
      aria-label={type === "image" ? name : undefined}
    >
      {type === "image" ? (
        <span
          aria-hidden="true"
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url("${src}")` }}
        />
      ) : type === "text" ? (
        <span
          style={{
            fontSize: textStyle.fontSize,
            fontWeight: textStyle.fontWeight,
            lineHeight: textStyle.lineHeight,
          }}
        >
          {initials}
        </span>
      ) : (
        <UserIcon size={AVATAR_ICON_SIZES[size]} />
      )}
    </span>
  );
}

const AVATAR_CODE = `type AvatarSize = 20 | 24 | 32 | 40 | 48 | 56;
type AvatarType = "image" | "text" | "icon";

const textStyles = {
  20: { fontSize: 12, fontWeight: 400, lineHeight: "16px" },
  24: { fontSize: 12, fontWeight: 400, lineHeight: "16px" },
  32: { fontSize: 15, fontWeight: 400, lineHeight: "20px" },
  40: { fontSize: 17, fontWeight: 500, lineHeight: "24px" },
  48: { fontSize: 22, fontWeight: 500, lineHeight: "28px" },
  56: { fontSize: 26, fontWeight: 700, lineHeight: "32px" },
};

const iconSizes = { 20: 14, 24: 16, 32: 20, 40: 24, 48: 24, 56: 28 };

export function Avatar({ size = 40, type = "text", name, src }: AvatarProps) {
  const initials = getInitials(name);
  return (
    <span
      className="inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--color-action-primary)] text-[var(--color-action-primary-foreground)]"
      style={{ width: size, height: size }}
    >
      {type === "image" && <img src={src} alt="" className="h-full w-full object-cover" />}
      {type === "text" && <span style={textStyles[size]}>{initials}</span>}
      {type === "icon" && <UserIcon size={iconSizes[size]} />}
    </span>
  );
}`;

export function AvatarSpec() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview - Figma variant matrix</SectionHeading>
        <Card className="p-6">
          <div className="grid max-w-[360px] grid-cols-[72px_72px_72px_72px] items-center gap-x-5 gap-y-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Size</span>
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Image</span>
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Text</span>
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Icon</span>
            {AVATAR_SIZES.map((size) => (
              <React.Fragment key={size}>
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">{size}px</span>
                <Avatar size={size} type="image" name="Lanka user" />
                <Avatar size={size} type="text" name="Lanka" />
                <Avatar size={size} type="icon" />
              </React.Fragment>
            ))}
          </div>
        </Card>
      </section>
      <section className="space-y-4">
        <SectionHeading>Variants</SectionHeading>
        <SpecTable
          headers={["Variant", "Values", "Figma details"]}
          rows={[
            ["Size", "20, 24, 32, 40, 48, 56px", "Each avatar is a fixed square with radius-full."],
            ["Type", "Image, Text, Icon", "Figma component set variants: Type=Image, Type=Text, Type=Icon."],
            ["Text fallback", "LK initials", "Gold background #FFC700 with #111111 text."],
            ["Icon fallback", "User outline", "Icon sizes: 14, 16, 20, 24, 24, 28px."],
            ["Image", "Cropped circular photo", "Image fill clips to the same circular avatar mask."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Text scale</SectionHeading>
        <SpecTable
          headers={["Avatar", "Font size", "Weight"]}
          rows={AVATAR_SIZES.map((size) => [
            `${size}px`,
            `${AVATAR_TEXT_STYLES[size].fontSize}px / ${AVATAR_TEXT_STYLES[size].lineHeight}`,
            AVATAR_TEXT_STYLES[size].fontWeight === 700 ? "Bold" : AVATAR_TEXT_STYLES[size].fontWeight === 500 ? "Medium" : "Regular",
          ])}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Guidance
          items={[
            { label: "Do", note: "Use Image when a verified user or officer photo is available." },
            { label: "Do", note: "Use Text fallback for accounts without a profile image; keep initials to two letters." },
            { label: "Do", note: "Use Icon fallback for anonymous, system, or not-yet-identified users." },
            { label: "Don't", note: "Do not invent extra avatar sizes. The Figma component set defines six supported sizes." },
            { label: "Don't", note: "Do not assign random per-user colors; use the SLDS gold fallback consistently." },
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={AVATAR_CODE} />
      </section>
    </div>
  );
}

const DIVIDER_CODE = `export function Divider({ orientation = "horizontal" }: DividerProps) {
  return <hr className="w-full border-0 border-t border-[#DADDE2]" />;
}`;

export function DividerSpec() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <Card className="p-6">
          <div className="space-y-8">
            <hr className="w-full max-w-[373px] border-0 border-t border-[#DADDE2]" />
            <div className="flex w-full max-w-[373px] items-center">
              <hr className="flex-1 border-0 border-t border-[#DADDE2]" />
              <button className="mx-0 inline-flex h-7 items-center justify-center rounded-[8px] px-2 py-1 text-[15px] leading-5 text-[#111111]">
                <span aria-hidden="true" className="mr-1 flex h-4 w-4 items-center justify-center">+</span>
                Button
              </button>
              <hr className="flex-1 border-0 border-t border-[#DADDE2]" />
            </div>
          </div>
        </Card>
      </section>
      <section className="space-y-4">
        <SectionHeading>Variants</SectionHeading>
        <SpecTable
          headers={["Variant", "Spec", "Use"]}
          rows={[
            ["Default", "373px horizontal line, 1px #DADDE2", "Separates list groups and mobile content blocks."],
            ["With Button", "142px line, 89x28 button, 142px line", "Breaks sections while preserving a compact inline action."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Guidance
          items={[
            { label: "Do", note: "Use dividers to clarify grouping, not as decoration." },
            { label: "Do", note: "Use semantic markup: hr for horizontal separation, role separator for vertical." },
            { label: "Don't", note: "Do not stack dividers inside cards when spacing alone can separate content." },
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={DIVIDER_CODE} />
      </section>
    </div>
  );
}

function ListItemIcon() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[#111111]" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 4.75h7.75L18 8v11.25H7V4.75Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14.5 4.75V8.5H18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9.5 12h6M9.5 15h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function SelectionListItem({
  state,
  badge = "Success",
}: {
  state: ServiceCardState;
  badge?: string;
}) {
  return (
    <div
      className={[
        "flex h-[58px] w-full max-w-[400px] items-center justify-between gap-4 px-4 py-2 pr-2 text-left",
        SERVICE_CARD_STATE_STYLES[state],
      ].join(" ")}
    >
      <span className="flex h-[42px] w-[211px] min-w-0 items-center gap-3">
        <ListItemIcon />
        <span className="flex h-[42px] w-[159px] min-w-0 flex-col justify-center">
          <span className="block truncate text-[15px] leading-5 text-[#111111]">Service Name</span>
          <span className="block truncate text-sm leading-[22px] text-[#676C73]">Description</span>
        </span>
      </span>
      <span className="flex h-9 w-[124px] shrink-0 items-center gap-2">
        <span className="inline-flex h-7 w-20 items-center justify-center rounded-full bg-[#E0F2EC] px-3 py-1 text-[15px] leading-5 text-[#1FAA63]">{badge}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-[8px] text-[20px] leading-none text-[#111111]">&gt;</span>
      </span>
    </div>
  );
}

const LIST_ITEM_CODE = `export function ListItem({ title, description, selected, onClick }: ListItemProps) {
  return (
    <button className="flex h-[58px] w-full items-center justify-between gap-4 px-4 py-2 pr-2 text-left" onClick={onClick}>
      <span className="flex h-[42px] min-w-0 items-center gap-3">
        <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center text-[#111111]">Icon</span>
        <span className="min-w-0">
          <span className="block text-[15px] leading-5">{title}</span>
          <span className="block text-sm leading-[22px]">{description}</span>
        </span>
      </span>
    </button>
  );
}`;

export function ListItemSpec() {
  const rows = [
    { state: "default" as const },
    { state: "hover" as const },
    { state: "selected" as const },
    { state: "active" as const },
  ];
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <Card className="p-0">
          <div className="w-full max-w-[432px] space-y-4 p-4">
            {rows.map((row) => (
              <SelectionListItem key={row.state} state={row.state} />
            ))}
          </div>
        </Card>
      </section>
      <section className="space-y-4">
        <SectionHeading>Variants</SectionHeading>
        <SpecTable
          headers={["Variant", "Use", "Notes"]}
          rows={[
            ["Default", "#FAFAFB background", "400x58 row with 16px left padding, 8px right padding."],
            ["Hover", "#F5F6F8 background", "Use for pointer hover and pre-press feedback."],
            ["Selected", "#E3EDFF background", "Use when the row is chosen but not currently pressed."],
            ["Active", "#FFC700 background", "Use for active navigation or pressed state."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Guidance
          items={[
            { label: "Do", note: "Use one primary row action; avoid several buttons inside the same list item." },
            { label: "Do", note: "Keep the title one line when possible and put supporting detail in the description." },
            { label: "Don't", note: "Do not make the row look selected unless it actually changes list state." },
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={LIST_ITEM_CODE} />
      </section>
    </div>
  );
}

function IconCardPreview() {
  return (
    <div className="flex h-[158px] w-[150px] flex-col items-center justify-between rounded-[12.4138px] border border-[#DADDE2] bg-white px-3 pb-2 pt-3">
      <div className="flex h-[74px] w-[126px] flex-col items-start gap-1">
        <span className="w-[91px] text-left text-[15px] leading-5 text-[#111111]">Name</span>
        <span className="w-[91px] text-left text-xs leading-4 text-[#676C73]">Description</span>
      </div>
      <div className="flex h-16 w-[126px] items-center justify-end">
        <IconCardArtwork />
      </div>
    </div>
  );
}

function IconCardArtwork() {
  return (
    <svg className="h-16 w-16 shrink-0" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="10" y="7" width="36" height="48" rx="7" fill="#E3EDFF" />
      <path d="M36 7h2.5L46 14.5V17H36V7Z" fill="#B7CCFF" />
      <rect x="16" y="21" width="24" height="3" rx="1.5" fill="#1B5FD9" />
      <rect x="16" y="29" width="20" height="3" rx="1.5" fill="#1B5FD9" opacity=".75" />
      <rect x="16" y="37" width="16" height="3" rx="1.5" fill="#1B5FD9" opacity=".5" />
      <circle cx="45" cy="45" r="11" fill="#FFC700" />
      <path d="M40.5 45.5 43.5 48.5 50 41.5" stroke="#111111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 11.5c6-3.5 13.5-4 20.5-1" stroke="white" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const ICON_CARD_CODE = `export function IconCard({ name, description, icon }: IconCardProps) {
  return (
    <button className="flex h-[158px] w-[150px] flex-col items-center justify-between rounded-[12.4138px] border border-[#DADDE2] bg-white px-3 pb-2 pt-3">
      <span className="flex h-[74px] w-[126px] flex-col items-start gap-1">
        <span className="block w-[91px] text-left text-[15px] leading-5 text-[#111111]">{name}</span>
        <span className="block w-[91px] text-left text-xs leading-4 text-[#676C73]">{description}</span>
      </span>
      <span className="flex h-16 w-[126px] items-center justify-end">{icon}</span>
    </button>
  );
}`;

export function IconCardSpec() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <Card className="p-6">
          <IconCardPreview />
        </Card>
      </section>
      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Notes"]}
          rows={[
            ["Container", "150x158px, 12.4px radius, #DADDE2 border", "Mobile service category grid tile."],
            ["Padding", "12px top/left/right, 8px bottom", "Centered child containers with left-aligned text and right-aligned image slot."],
            ["Text container", "126x74px, vertical, 4px gap, left aligned", "Figma keeps the text block fixed even when labels are short."],
            ["Title", "91x20px, 15px / 20px, Google Sans Regular, #111111", "Keep concise for small mobile cards."],
            ["Description", "91x16px, 12px / 16px, #676C73", "Optional supporting line."],
            ["Icon slot", "64x64px image fill, aligned right inside a 126x64 container", "Use product/service imagery or approved icon assets."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Guidance
          items={[
            { label: "Do", note: "Use icon cards for compact service categories where the image helps recognition." },
            { label: "Do", note: "Keep the card label short enough to fit comfortably in the fixed 150px width." },
            { label: "Don't", note: "Do not put long descriptions, badges, or multiple actions inside an icon card." },
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={ICON_CARD_CODE} />
      </section>
    </div>
  );
}

export interface SummaryItem {
  label: string;
  value?: React.ReactNode;
  badge?: string;
}

function SummaryBadge({ type, darkMode = false }: { type: string; darkMode?: boolean }) {
  const b = type.toLowerCase();
  let bg = "#F5F6F8";
  let text = "#676C73";
  
  if (darkMode) {
    bg = "#1F2937";
    text = "#B8BDC4";
    if (b === "success") {
      bg = "#062B1A";
      text = "#5DC896";
    } else if (b === "in review" || b === "pending") {
      bg = "#0A1733";
      text = "#93C5FD";
    }
  } else {
    if (b === "success") {
      bg = "#E0F2EC";
      text = "#1FAA63";
    } else if (b === "in review" || b === "pending") {
      bg = "#E3EDFF";
      text = "#1A56D6";
    }
  }
  
  return (
    <span
      style={{ backgroundColor: bg, color: text }}
      className="inline-flex items-center justify-center rounded-full px-3 py-1 text-[15px] font-normal leading-5 whitespace-nowrap"
    >
      {type}
    </span>
  );
}

export function SummaryList({ items, darkMode = false }: { items: SummaryItem[]; darkMode?: boolean }) {
  return (
    <dl 
      className="w-full max-w-[400px] overflow-hidden rounded-[12px] border border-[var(--color-border-decorative)] divide-y divide-[var(--color-border-decorative)]"
      style={{
        backgroundColor: darkMode ? "var(--neutral-900)" : "var(--neutral-50)"
      }}
    >
      {items.map((item, index) => (
        <div className="flex min-h-[72px] w-full items-center px-3 py-2" key={index}>
          <div className="min-w-0 space-y-1">
            <dt className="text-sm leading-[22px] text-[var(--color-text-secondary)]">{item.label}</dt>
            <dd className="text-[15px] leading-5 text-[var(--color-text-primary)]">
              {item.badge ? <SummaryBadge type={item.badge} darkMode={darkMode} /> : item.value}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

const SUMMARY_LIST_CODE = `export interface SummaryItem {
  label: string;
  value?: React.ReactNode;
  badge?: string;
}

function SummaryBadge({ type, darkMode = false }: { type: string; darkMode?: boolean }) {
  const b = type.toLowerCase();
  let bg = "#F5F6F8";
  let text = "#676C73";
  
  if (darkMode) {
    bg = "#1F2937";
    text = "#B8BDC4";
    if (b === "success") {
      bg = "#062B1A";
      text = "#5DC896";
    } else if (b === "in review" || b === "pending") {
      bg = "#0A1733";
      text = "#93C5FD";
    }
  } else {
    if (b === "success") {
      bg = "#E0F2EC";
      text = "#1FAA63";
    } else if (b === "in review" || b === "pending") {
      bg = "#E3EDFF";
      text = "#1A56D6";
    }
  }
  
  return (
    <span
      style={{ backgroundColor: bg, color: text }}
      className="inline-flex items-center justify-center rounded-full px-3 py-1 text-[15px] font-normal leading-5 whitespace-nowrap"
    >
      {type}
    </span>
  );
}

export function SummaryList({ items, darkMode = false }: { items: SummaryItem[]; darkMode?: boolean }) {
  return (
    <dl 
      className="w-full max-w-[400px] overflow-hidden rounded-[12px] border border-[var(--color-border-decorative)] divide-y divide-[var(--color-border-decorative)]"
      style={{
        backgroundColor: darkMode ? "var(--neutral-900)" : "var(--neutral-50)"
      }}
    >
      {items.map((item, index) => (
        <div className="flex min-h-[72px] w-full items-center px-3 py-2" key={index}>
          <div className="min-w-0 space-y-1">
            <dt className="text-sm leading-[22px] text-[var(--color-text-secondary)]">{item.label}</dt>
            <dd className="text-[15px] leading-5 text-[var(--color-text-primary)]">
              {item.badge ? <SummaryBadge type={item.badge} darkMode={darkMode} /> : item.value}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}`;

export function SummaryListSpec() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SpecHeader>
          <SectionHeading>Live preview</SectionHeading>
          <ModeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </SpecHeader>
        <div className={`${isDark ? "dark bg-[var(--color-surface-page)]" : "bg-[var(--color-surface-card)]"} flex justify-start rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] p-8`}>
          <SummaryList
            darkMode={isDark}
            items={[
              { label: "Application ID", value: "APP-2026-001234" },
              { label: "Submitted date", value: "28th June 2026" },
              { label: "Current status", badge: "In Review" },
            ]}
          />
        </div>
      </section>
      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Notes"]}
          rows={[
            ["Container", "400px wide, 12px radius, border-[var(--color-border-decorative)]", "Rows are stacked with 1px dividers."],
            ["Row", "72px height, 12px horizontal padding, 8px vertical padding", "Background #FAFAFB / dark:bg-[var(--neutral-900)]."],
            ["Label", "14px / 22px, [var(--color-text-secondary)]", "Use sentence case labels."],
            ["Value", "15px / 20px, [var(--color-text-primary)]", "May be plain text or a status badge."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={SUMMARY_LIST_CODE} />
      </section>
    </div>
  );
}

type ProcessState = "success" | "failed" | "pending" | "draft";
const PROCESS_STATE_STYLES: Record<ProcessState, string> = {
  success: "bg-[#E0F2EC] text-[#1FAA63]",
  failed: "bg-[#FDECEA] text-[#D32F2F]",
  pending: "bg-[#FFF8D6] text-[#B38A00]",
  draft: "bg-[#F5F6F8] text-[#676C73]",
};

function ProcessSlot({ state, children }: { state: ProcessState; children: React.ReactNode }) {
  return <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] text-[17px] font-medium leading-6 ${PROCESS_STATE_STYLES[state]}`}>{children}</span>;
}

function ProcessRow({ number, state, title, description }: { number: number; state: ProcessState; title: string; description: string }) {
  return (
    <div className="flex min-h-[62px] w-full gap-4 bg-[#FAFAFB] px-3 py-2">
      <ProcessSlot state={state}>{number}</ProcessSlot>
      <div className="min-w-0 space-y-1">
        <p className="text-[15px] leading-5 text-[#111111]">{title}</p>
        <p className="text-sm leading-[22px] text-[#676C73]">{description}</p>
      </div>
    </div>
  );
}

const PROCESS_LIST_CODE = `export function ProcessList({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="overflow-hidden rounded-[12px] border border-[#DADDE2]">
      {steps.map((step, index) => (
        <li className="flex gap-4 bg-[#FAFAFB] px-3 py-2" key={step.title}>
          <span className="flex h-10 w-10 items-center justify-center rounded-[8px]">{index + 1}</span>
          <span>
            <span className="block text-[15px] leading-5 text-[#111111]">{step.title}</span>
            <span className="block text-sm leading-[22px] text-[#676C73]">{step.description}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}`;

export function ProcessListSpec() {
  const steps = [
    { state: "success" as const, title: "Prepare documents", description: "Gather all required identification and supporting files" },
    { state: "success" as const, title: "Submit application", description: "Upload documents through the online portal" },
    { state: "pending" as const, title: "Verification in progress", description: "Our team reviews your documents (2-5 business days)" },
    { state: "draft" as const, title: "Receive approval", description: "Notification sent via email and SMS" },
  ];
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <Card className="p-4">
          <div className="w-full max-w-[400px] overflow-hidden rounded-[12px] border border-[#DADDE2]">
            {steps.map((step, index) => (
              <React.Fragment key={step.title}>
                <ProcessRow number={index + 1} {...step} />
                {index < steps.length - 1 && <hr className="border-0 border-t border-[#DADDE2]" />}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </section>
      <section className="space-y-4">
        <SectionHeading>Status slots</SectionHeading>
        <SpecTable
          headers={["State", "Preview", "Tokens"]}
          rows={[
            ["Success", <ProcessSlot key="success" state="success">1</ProcessSlot>, "#E0F2EC background, #1FAA63 text"],
            ["Failed", <ProcessSlot key="failed" state="failed">1</ProcessSlot>, "#FDECEA background, #D32F2F text"],
            ["Pending", <ProcessSlot key="pending" state="pending">1</ProcessSlot>, "#FFF8D6 background, #B38A00 text"],
            ["Draft", <ProcessSlot key="draft" state="draft">1</ProcessSlot>, "#F5F6F8 background, #676C73 text"],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={PROCESS_LIST_CODE} />
      </section>
    </div>
  );
}

const ACCORDION_CODE = `export function AccordionItem({ title, children, open }: AccordionItemProps) {
  return (
    <div className="rounded-[12px] bg-[#FAFAFB]">
      <button className="flex h-11 w-full items-center justify-between px-3 py-1">
        <span className="text-[15px] leading-5 text-[#111111]">{title}</span>
        <span aria-hidden="true">v</span>
      </button>
      {open && <div className="m-3 mt-0 rounded-[8px] bg-[#F5F6F8] p-2 text-sm leading-[22px] text-[#676C73]">{children}</div>}
    </div>
  );
}`;

export function AccordionSpec() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <Card className="space-y-6 p-4">
          <div className="flex h-11 w-full max-w-[400px] items-center justify-between rounded-[12px] bg-[#FAFAFB] px-3 py-1">
            <span className="text-[15px] leading-5 text-[#111111]">Accordion Name</span>
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-[8px]">v</span>
          </div>
          <div className="w-full max-w-[400px] rounded-[12px] bg-[#FAFAFB] p-3 pt-2">
            <div className="flex h-9 items-center justify-between">
              <span className="text-[15px] leading-5 text-[#111111]">Accordion Name</span>
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-[8px]">^</span>
            </div>
            <div className="mt-2 rounded-[8px] bg-[#F5F6F8] p-2 text-sm leading-[22px] text-[#676C73]">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices.
            </div>
          </div>
        </Card>
      </section>
      <section className="space-y-4">
        <SectionHeading>Figma variants</SectionHeading>
        <SpecTable
          headers={["Variant", "Spec", "Notes"]}
          rows={[
            ["Collapse", "400x44, 12px radius, #FAFAFB", "Horizontal layout with 12px side padding and 36px toggle button."],
            ["Expand", "400x168, 8px gap, 12px radius", "Header plus 376x104 content container in #F5F6F8."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={ACCORDION_CODE} />
      </section>
    </div>
  );
}

const STEP_INDICATOR_CODE = `export function StepIndicator({ current = 3, total = 6 }: StepIndicatorProps) {
  return (
    <div className="flex h-[14px] w-full max-w-[393px] items-center gap-2 px-4 py-1">
      {Array.from({ length: total }).map((_, index) => (
        <span className={index < current ? "bg-[#FFC700]" : "bg-[#F5F6F8]"} />
      ))}
    </div>
  );
}`;

export function StepIndicatorSpec() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <Card className="p-6">
          <div className="flex h-[14px] w-full max-w-[393px] items-center gap-2 px-4 py-1" aria-label="Step 3 of 6">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <span key={index} className={`h-1.5 flex-1 rounded-full ${index < 3 ? "bg-[#FFC700]" : "bg-[#F5F6F8]"}`} />
            ))}
          </div>
        </Card>
      </section>
      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Notes"]}
          rows={[
            ["Container", "393x14px, horizontal, 8px gap", "16px side padding and 4px vertical padding."],
            ["Segment", "54x6px, full pill radius", "Completed segments use #FFC700; incomplete use #F5F6F8."],
            ["Count", "6 segments in the provided component", "Expose current and total as props when implementing."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={STEP_INDICATOR_CODE} />
      </section>
    </div>
  );
}

function TooltipBox({ variant, arrowAlign = "right" }: { variant: "action" | "description" | "title"; arrowAlign?: "left" | "right" }) {
  const isAction = variant === "action";
  const isTitleOnly = variant === "title";
  
  const align = isTitleOnly ? "left" : arrowAlign;
  const containerClass = align === "right" ? "items-end" : "items-start";
  const arrowClass = align === "right" ? "mr-8" : "ml-4";
  
  return (
    <div className={`flex flex-col ${containerClass} ${isTitleOnly ? "w-[72px]" : "w-full max-w-[320px]"}`}>
      <div className={`${arrowClass} h-1.5 w-7 overflow-hidden`}>
        <div className="h-3 w-3 rotate-45 rounded-[1px] bg-[#111111]" />
      </div>
      <div className={`w-full rounded-[8px] bg-[#111111] text-white ${isTitleOnly ? "px-3 py-2 text-center" : "p-3"}`}>
        <div className={isTitleOnly ? "" : "space-y-0.5 text-left"}>
          <div className="flex items-start justify-between gap-2">
            <p className={isTitleOnly ? "w-full text-sm leading-5" : "text-[17px] font-medium leading-6"}>{isTitleOnly ? "Title" : "Tooltip Title"}</p>
            {isAction && (
              <button type="button" aria-label="Close" className="text-white opacity-70 hover:opacity-100 transition-opacity">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {!isTitleOnly && <p className="text-sm leading-5 opacity-90">Enter the description text</p>}
          {isAction && (
            <div className="mt-2 flex h-7 items-center justify-between">
              <span className="text-sm leading-5 opacity-70">1 of 5</span>
              <button className="h-7 rounded-[8px] border border-[#DADDE2] bg-white px-2 py-1 text-[15px] leading-5 text-[#111111] hover:bg-neutral-100 transition-colors">Action</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const TOOLTIP_CODE = `export interface TooltipProps {
  title: string;
  description?: string;
  arrowAlign?: "left" | "right";
}

export function Tooltip({ title, description, arrowAlign = "right" }: TooltipProps) {
  const containerClass = arrowAlign === "right" ? "items-end" : "items-start";
  const arrowClass = arrowAlign === "right" ? "mr-8" : "ml-4";
  
  return (
    <div className={\`flex w-[320px] flex-col \${containerClass}\`}>
      <div className={\`\${arrowClass} h-1.5 w-7 overflow-hidden\`}>
        <div className="h-3 w-3 rotate-45 rounded-[1px] bg-[#111111]" />
      </div>
      <div className="w-full rounded-[8px] bg-[#111111] p-3 text-white text-left">
        <p className="text-[17px] font-medium leading-6">{title}</p>
        {description && <p className="text-sm leading-5 mt-0.5">{description}</p>}
      </div>
    </div>
  );
}`;

export function TooltipSpec() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <Card className="space-y-5 p-6">
          <TooltipBox variant="action" />
          <TooltipBox variant="description" />
          <TooltipBox variant="title" />
        </Card>
      </section>
      <section className="space-y-4">
        <SectionHeading>Figma variants</SectionHeading>
        <SpecTable
          headers={["Variant", "Spec", "Notes"]}
          rows={[
            ["Action Tooltip", "320x106, 12px padding, action row", "Includes title, close icon, description, progress text, and button."],
            ["Title + Description", "320x76, #111111 surface", "Use for explanatory help text."],
            ["Title", "72x42, 8px vertical padding, 12px horizontal padding", "Use only for short labels."],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={TOOLTIP_CODE} />
      </section>
    </div>
  );
}

type NoteTone = "info" | "warning" | "success" | "neutral";
const NOTE_TONES: Record<NoteTone, string> = {
  info: "border-[var(--color-feedback-info)] bg-[var(--color-feedback-info-subtle)]",
  warning: "border-[var(--color-feedback-warning)] bg-[var(--color-feedback-warning-subtle)]",
  success: "border-[var(--color-feedback-success)] bg-[var(--color-feedback-success-subtle)]",
  neutral: "border-[var(--color-border-strong)] bg-[var(--color-surface-section-alt)]",
};

function InfoNote({ tone, title, children }: { tone: NoteTone; title: string; children: React.ReactNode }) {
  return (
    <div className={`border-l-4 p-4 ${NOTE_TONES[tone]}`}>
      <p className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">{children}</p>
    </div>
  );
}

const INFO_NOTE_CODE = `export function InsetText({ tone = "info", title, children }: InsetTextProps) {
  return (
    <div className="border-l-4 p-4">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6">{children}</p>
    </div>
  );
}`;

export function InsetTextSpec() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <SectionHeading>Live preview</SectionHeading>
        <div className="space-y-3">
          <InfoNote tone="info" title="Before you apply">You need your national identity card number and a valid mobile number.</InfoNote>
          <InfoNote tone="warning" title="Service delay">Appointments may take longer during public holidays.</InfoNote>
          <InfoNote tone="success" title="Application saved">You can return to this draft from your dashboard.</InfoNote>
        </div>
      </section>
      <section className="space-y-4">
        <SectionHeading>Variants</SectionHeading>
        <SpecTable
          headers={["Variant", "Use", "Token family"]}
          rows={[
            ["Info", "Helpful non-critical context.", "Feedback/Info"],
            ["Warning", "Important caution before proceeding.", "Feedback/Warning"],
            ["Success", "Positive confirmation in content flow.", "Feedback/Success"],
            ["Neutral", "Editorial note or supporting detail.", "Border/Strong + Section Alt"],
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Guidance
          items={[
            { label: "Do", note: "Use inset text inside long-form pages where users need context before a task." },
            { label: "Do", note: "Use warning tone only when ignoring the note could cause user error." },
            { label: "Don't", note: "Do not use this component for global system outages; use Notification Banner." },
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={INFO_NOTE_CODE} />
      </section>
    </div>
  );
}
