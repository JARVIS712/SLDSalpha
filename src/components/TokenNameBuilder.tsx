"use client";

import { useState } from "react";
import { namingCategories, namingRoles, namingModifiers } from "@/data/designTokensGuide";

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function TokenNameBuilder() {
  const [category, setCategory] = useState(namingCategories[0]);
  const [role, setRole] = useState(namingRoles[0]);
  const [modifier, setModifier] = useState(namingModifiers[0]);

  const cssName = `slds-${category}-${role}-${modifier}`;
  const figmaPath = `${titleCase(category)}/Semantic/${titleCase(role)}/${titleCase(modifier)}`;

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-section-alt)] p-5">
      <p className="text-sm text-[var(--color-text-secondary)]">
        Build a token name from its four parts and see the CSS custom property and Figma path it produces.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-3">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">1 · Namespace</span>
          <p className="mt-1 font-mono text-sm text-[var(--color-text-primary)]">slds</p>
        </div>

        <label className="rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-3">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">2 · Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full bg-transparent font-mono text-sm text-[var(--color-text-primary)] focus:outline-none"
          >
            {namingCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-3">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">3 · Role</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full bg-transparent font-mono text-sm text-[var(--color-text-primary)] focus:outline-none"
          >
            {namingRoles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <label className="rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-3">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">4 · Modifier</span>
          <select
            value={modifier}
            onChange={(e) => setModifier(e.target.value)}
            className="mt-1 block w-full bg-transparent font-mono text-sm text-[var(--color-text-primary)] focus:outline-none"
          >
            {namingModifiers.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface-masthead)] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--neutral-400)]">CSS custom property</p>
          <code className="mt-1 block break-all text-sm font-semibold text-[var(--gold-300)]">--{cssName}</code>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">Equivalent Figma path</p>
          <code className="mt-1 block break-all text-sm font-semibold text-[var(--color-text-primary)]">{figmaPath}</code>
        </div>
      </div>
    </div>
  );
}
