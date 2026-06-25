"use client";
import { useState } from "react";

export function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--neutral-700)] bg-[var(--neutral-900)]">
      <div className="flex items-center justify-between border-b border-[var(--neutral-800)] px-4 py-2">
        <span className="text-xs text-[var(--neutral-500)]">{language}</span>
        <button
          onClick={copy}
          className="rounded px-2 py-0.5 text-xs text-[var(--neutral-400)] transition-colors hover:bg-[var(--neutral-800)] hover:text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code className="text-[var(--neutral-200)]">{code}</code>
      </pre>
    </div>
  );
}
