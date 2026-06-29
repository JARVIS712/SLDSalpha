"use client";

import { useState } from "react";
import { LanguageSelectorSheetPreview } from "@/components/specs/BottomSheetSpec";

export default function LanguageSelectorPage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`${isDark ? "dark" : ""} min-h-[calc(100vh-160px)] bg-[var(--color-surface-page)] px-4 py-10`}>
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--gold-700)]">Onboarding</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Select Language</h1>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="rounded-[var(--radius-md)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </div>

        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-4">
          <LanguageSelectorSheetPreview darkMode={isDark} />
        </div>
      </div>
    </div>
  );
}
