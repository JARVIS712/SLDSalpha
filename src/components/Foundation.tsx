import { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--gold-700)]">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{title}</h1>
      <p className="mt-3 text-base leading-7 text-[var(--color-text-secondary)]">{description}</p>
    </header>
  );
}

export function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">{description}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function Swatch({ name, hex, usage }: { name: string; hex: string; usage?: string }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)]">
      <div className="h-20 w-full" style={{ backgroundColor: hex }} />
      <div className="p-3">
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{name}</p>
        <p className="font-mono text-xs text-[var(--color-text-tertiary)]">{hex.toUpperCase()}</p>
        {usage && <p className="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">{usage}</p>}
      </div>
    </div>
  );
}

export function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)]">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-[var(--color-surface-section-alt)]">
            {headers.map((h) => (
              <th key={h} className="border-b border-[var(--color-border-decorative)] px-4 py-3 font-semibold text-[var(--color-text-primary)]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[var(--color-border-decorative)] last:border-0 odd:bg-[var(--color-surface-card)] even:bg-[var(--color-surface-page)]">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top text-[var(--color-text-secondary)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Callout({ tone = "info", children }: { tone?: "info" | "warning"; children: ReactNode }) {
  const styles =
    tone === "warning"
      ? "border-[var(--gold-700)] bg-[var(--gold-50)] text-[var(--gold-900)]"
      : "border-[var(--blue-500)] bg-[var(--blue-100)] text-[var(--blue-700)]";
  return <div className={`rounded-[var(--radius-md)] border-l-4 px-4 py-3 text-sm leading-6 ${styles}`}>{children}</div>;
}
