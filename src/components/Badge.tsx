import { ReactNode } from "react";

type Tone = "gold" | "neutral" | "green" | "blue" | "outline";

const TONE_CLASSES: Record<Tone, string> = {
  gold: "bg-[var(--gold-100)] text-[var(--gold-800)]",
  neutral: "bg-[var(--color-surface-section-alt)] text-[var(--color-text-secondary)]",
  green: "bg-[var(--green-100)] text-[var(--green-700)]",
  blue: "bg-[var(--blue-100)] text-[var(--blue-700)]",
  outline: "border border-[var(--color-border-default)] text-[var(--color-text-secondary)]",
};

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
