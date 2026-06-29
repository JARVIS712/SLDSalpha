"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, SectionHeading } from "./shared";

type DropdownState = "default" | "filling" | "selected";
type DropdownListItemState = "default" | "hover" | "focused" | "disabled";
type DropdownListItemType = "default" | "select";

function dropdownTheme(darkMode: boolean) {
  return {
    frame: darkMode ? "var(--color-surface-page)" : "#FAFAFB",
    surface: darkMode ? "var(--color-surface-card)" : "#FAFAFB",
    surfaceSelected: darkMode ? "var(--color-surface-hover)" : "#F5F6F8",
    border: darkMode ? "var(--color-border-default)" : "#8E949E",
    menuBorder: darkMode ? "var(--color-border-decorative)" : "#DADDE2",
    text: darkMode ? "var(--color-text-primary)" : "#111111",
    secondary: darkMode ? "var(--color-text-secondary)" : "#676C73",
    placeholder: darkMode ? "var(--color-text-disabled)" : "#B8BDC4",
    disabled: darkMode ? "var(--color-text-disabled)" : "#B8BDC4",
    checkboxBorder: darkMode ? "var(--color-border-default)" : "#8E949E",
    checkboxDisabledFill: darkMode ? "var(--color-surface-disabled)" : "#ECEEF1",
    checkboxDisabledBorder: darkMode ? "var(--color-border-disabled)" : "#B8BDC4",
    selectedFill: darkMode ? "var(--color-action-primary)" : "#FFC700",
    selectedCheck: darkMode ? "var(--color-action-primary-foreground)" : "#FDFDFD",
    required: darkMode ? "var(--color-feedback-error)" : "#D32F2F",
    shadow: darkMode
      ? "0 18px 30px -12px rgba(0,0,0,0.55), 0 8px 12px -8px rgba(0,0,0,0.45)"
      : "0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)",
  };
}

function ArrowCounterClockwiseIcon({ color = "#111111" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6.25 4.25H3.75V1.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.95 4.25A5 5 0 1 1 3 7.18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon({ color = "#8E949E" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 7.5 10 12.5 15 7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ color = "#8E949E" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.25" stroke={color} strokeWidth="1.5" />
      <path d="m13 13 3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ color = "#111111" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m3.5 8.25 2.75 2.75 6.25-6.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SelectCheckbox({
  checked = false,
  disabled = false,
  darkMode = false,
}: {
  checked?: boolean;
  disabled?: boolean;
  darkMode?: boolean;
}) {
  const theme = dropdownTheme(darkMode);

  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] border-[1.5px]"
      style={{
        backgroundColor: checked ? theme.selectedFill : disabled ? theme.checkboxDisabledFill : "transparent",
        borderColor: checked ? "transparent" : disabled ? theme.checkboxDisabledBorder : theme.checkboxBorder,
      }}
    >
      {checked && <CheckIcon color={theme.selectedCheck} />}
    </span>
  );
}

function DropdownListItem({
  state,
  type = "default",
  darkMode = false,
  label = "List item",
  width = 240,
}: {
  state: DropdownListItemState;
  type?: DropdownListItemType;
  darkMode?: boolean;
  label?: string;
  width?: number;
}) {
  const theme = dropdownTheme(darkMode);
  const isHover = state === "hover";
  const isFocused = state === "focused";
  const isDisabled = state === "disabled";
  const textColor = isDisabled ? theme.disabled : theme.text;
  const iconColor = isDisabled && darkMode ? theme.disabled : theme.text;

  return (
    <div
      className={`flex h-[38px] items-center gap-2 ${isHover ? "justify-between rounded-[8px] py-2 pl-4 pr-2" : "justify-start px-4 py-2"}`}
      style={{
        width,
        backgroundColor: isHover ? theme.surfaceSelected : "transparent",
        color: textColor,
      }}
    >
      <span className="flex min-w-0 items-center gap-2">
        {type === "select" ? (
          <SelectCheckbox checked={isFocused} disabled={isDisabled} darkMode={darkMode} />
        ) : (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center">
            <ArrowCounterClockwiseIcon color={iconColor} />
          </span>
        )}
        <span className={`truncate text-sm leading-[22px] tracking-[0px] ${isFocused ? "font-medium" : "font-normal"}`} style={{ color: textColor }}>
          {label}
        </span>
      </span>
      {isHover && type === "default" && (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center">
          <CheckIcon color={theme.text} />
        </span>
      )}
    </div>
  );
}

function DropdownField({ state, darkMode = false }: { state: DropdownState; darkMode?: boolean }) {
  const theme = dropdownTheme(darkMode);
  const content = state === "default" ? "Select district" : state === "filling" ? "Col|" : "Colombo";
  const contentColor = state === "default" ? theme.placeholder : theme.text;

  return (
    <div className="flex w-[361px] flex-col gap-1">
      <div className="flex h-5 w-[361px] items-start">
        <span className="text-[15px] leading-5 tracking-[0px]" style={{ color: theme.text }}>District</span>
        <span className="text-[15px] leading-5 tracking-[0px]" style={{ color: theme.required }}>*</span>
      </div>
      <div
        className="flex h-[52px] w-[361px] items-center justify-between gap-2.5 rounded-[12px] border p-2"
        style={{ backgroundColor: theme.surface, borderColor: theme.border }}
      >
        <div className="flex h-5 w-[309px] items-center px-2">
          <span className="truncate text-[15px] leading-5 tracking-[0px]" style={{ color: contentColor }}>
            {content}
          </span>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px]">
          <ChevronDownIcon color={theme.placeholder} />
        </span>
      </div>
    </div>
  );
}

function DropdownMenu({ selected = false, darkMode = false }: { selected?: boolean; darkMode?: boolean }) {
  const theme = dropdownTheme(darkMode);
  const items = ["Batticaloa", "Colombo", "Galle", "Gampaha"];

  return (
    <div
      className="flex h-[234px] w-[362px] flex-col rounded-[16px] border py-2"
      style={{ backgroundColor: theme.surface, borderColor: theme.menuBorder, boxShadow: theme.shadow }}
    >
      <div className="flex h-[218px] w-[362px] flex-col items-center gap-1 px-2">
        <div
          className="flex h-11 w-[346px] items-center gap-2 rounded-[12px] border-[1.5px] px-3 py-3"
          style={{ backgroundColor: theme.surface, borderColor: theme.menuBorder }}
        >
          <SearchIcon color={theme.placeholder} />
          <span className="text-[15px] leading-5" style={{ color: theme.placeholder }}>Search</span>
        </div>
        <div className="flex w-[346px] flex-col">
          {items.map((item) => {
            const isSelected = item === "Colombo";
            return (
              <div
                key={item}
                className={`flex w-[346px] items-center ${isSelected ? "h-[38px] justify-between rounded-[8px] py-2 pl-4 pr-2" : "h-11 justify-start px-4 py-3"}`}
                style={{ backgroundColor: isSelected ? theme.surfaceSelected : "transparent", color: theme.text }}
              >
                <span className={`${item === "Gampaha" ? "text-[15px]" : "text-sm"} leading-5 tracking-[0px]`}>{item}</span>
                {selected && isSelected && <CheckIcon color={theme.text} />}
                {!selected && isSelected && <CheckIcon color={theme.text} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DropdownPreview({ state, darkMode = false }: { state: DropdownState; darkMode?: boolean }) {
  const theme = dropdownTheme(darkMode);
  return (
    <div className="flex w-[361px] flex-col gap-1.5">
      <DropdownField state={state} darkMode={darkMode} />
      {state === "default" ? (
        <p className="h-4 w-[361px] text-xs leading-4 tracking-[0px]" style={{ color: theme.secondary }}>Help Text</p>
      ) : (
        <DropdownMenu selected={state === "selected"} darkMode={darkMode} />
      )}
    </div>
  );
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

const SELECT_DROPDOWN_CODE = `export function SelectDropdown({ value, query, open }: SelectDropdownProps) {
  return (
    <div className="flex w-[361px] flex-col gap-1.5">
      <label className="text-[15px] leading-5 text-[#111111]">District<span className="text-[#D32F2F]">*</span></label>
      <button className="flex h-[52px] items-center justify-between rounded-[12px] border border-[#8E949E] bg-[#FAFAFB] p-2">
        <span className="px-2 text-[15px] leading-5">{value || query || "Select district"}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <div className="h-[234px] w-[362px] rounded-[16px] border border-[#DADDE2] bg-[#FAFAFB] py-2 shadow-lg">
          <div className="mx-2 flex h-11 items-center gap-2 rounded-[12px] border-[1.5px] border-[#DADDE2] px-3">
            <SearchIcon />
            <span className="text-[15px] leading-5 text-[#B8BDC4]">Search</span>
          </div>
          {["Batticaloa", "Colombo", "Galle", "Gampaha"].map((item) => (
            <div key={item} className="mx-2 flex h-11 items-center px-4 text-sm leading-5">{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}`;

export function SelectDropdownSpec() {
  const [isDark, setIsDark] = useState(false);
  const theme = dropdownTheme(isDark);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SectionHeading>Live preview</SectionHeading>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </div>
        <Card className={`${isDark ? "dark bg-[var(--color-surface-page)]" : ""} p-4`}>
          <div className="flex w-full max-w-[393px] flex-col items-center gap-5 rounded-[5px] p-4" style={{ backgroundColor: theme.frame }}>
            <DropdownPreview state="default" darkMode={isDark} />
            <DropdownPreview state="filling" darkMode={isDark} />
            <DropdownPreview state="selected" darkMode={isDark} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Dropdown list item variants</SectionHeading>
        <Card className={`${isDark ? "dark bg-[var(--color-surface-page)]" : ""} p-4`}>
          <div
            className="grid gap-6 rounded-[5px] border p-5 md:grid-cols-2"
            style={{
              backgroundColor: isDark ? "var(--color-surface-card)" : "#FFFFFF",
              borderColor: isDark ? "var(--color-border-focus)" : "#8A38F5",
            }}
          >
            {([
              ["Type=Default", "default"],
              ["Type=Select", "select"],
            ] as const).map(([title, type]) => (
              <div key={type} className="space-y-3">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
                <div className="flex flex-col gap-6">
                  {(["default", "hover", "focused", "disabled"] as DropdownListItemState[]).map((state) => (
                    <div key={state} className="space-y-1">
                      <p className="text-xs font-medium capitalize text-[var(--color-text-tertiary)]">{state}</p>
                      <DropdownListItem state={state} type={type} darkMode={isDark} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Figma details</SectionHeading>
        <SpecTable
          headers={["Part", "Spec", "Token values"]}
          rows={[
            ["Component set", "393x802 frame with 16px padding and 20px gap", "Variants: Default, Filling, Variant3 selected"],
            ["Closed field", "361x98 total; input container 361x76", "Label + 52px control + 16px help text"],
            ["Control", "361x52, 12px radius, 8px padding", "Fill #FAFAFB, border #8E949E"],
            ["Label", "15px / 20px Google Sans Regular", "Text #111111, required #D32F2F"],
            ["Placeholder", "15px / 20px", "#B8BDC4"],
            ["Open menu", "362x234, 16px radius, 8px vertical padding", "Fill #FAFAFB, border #DADDE2, drop shadow"],
            ["Search bar", "346x44, 12px radius, 12px padding", "Border #DADDE2 at 1.5px"],
            ["List rows", "346px wide; default 44px, selected 38px", "Selected row #F5F6F8, 8px radius, check icon right"],
            ["_dropdown list item", "240x38 row, 8px vertical padding, 16px side padding", "Default, Hover, Focused, Disabled states for Default and Select types"],
            ["List item hover", "8px radius, right padding 8px, check icon on default type", "Hover fill #F5F6F8"],
            ["Select checkbox", "24x24, 6px radius, 1.5px stroke", "Default stroke #8E949E; focused fill #FFC700 with white check; disabled fill #ECEEF1 and stroke #B8BDC4"],
            ["Dark mode", "Uses semantic dark tokens", "Surface, text, border, placeholder, selected row, and shadow adapt in preview."],
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading>Usage guidelines</SectionHeading>
        <Card className="divide-y divide-[var(--color-border-decorative)]">
          {[
            ["Do", "Use Dropdown for required single-choice fields with a compact number of options."],
            ["Do", "Use the searchable open state when options exceed the visible list or users know the district name."],
            ["Don't", "Do not use Dropdown for free text; use Text Input or Text Area instead."],
          ].map(([label, note]) => (
            <div key={note} className="flex gap-4 px-5 py-3">
              <span className={`w-12 shrink-0 text-xs font-semibold uppercase tracking-wide ${label === "Do" ? "text-[var(--green-600)]" : "text-[var(--red-600)]"}`}>
                {label}
              </span>
              <p className="text-sm leading-6 text-[var(--color-text-secondary)]">{note}</p>
            </div>
          ))}
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeading>Code</SectionHeading>
        <CodeBlock code={SELECT_DROPDOWN_CODE} />
      </section>
    </div>
  );
}
