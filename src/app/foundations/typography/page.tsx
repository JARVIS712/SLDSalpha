import type { Metadata } from "next";
import { PageHeader, Section, Callout } from "@/components/Foundation";
import { typeScaleMobile, typeScaleDesktop, type TypeStyle } from "@/data/tokens";

export const metadata: Metadata = { title: "Typography" };

function Specimen({ style }: { style: TypeStyle }) {
  const isDefault = style.usage.includes("default");
  return (
    <div
      className={`flex flex-col gap-3 border-b border-[var(--color-border-decorative)] py-5 last:border-0 sm:flex-row sm:items-baseline sm:justify-between ${
        isDefault ? "rounded-[var(--radius-md)] bg-[var(--gold-50)] px-4" : ""
      }`}
    >
      <p
        className="text-[var(--color-text-primary)]"
        style={{
          fontSize: style.size,
          lineHeight: style.lineHeight,
          fontWeight: style.weight === "Bold" ? 700 : style.weight === "Medium" ? 500 : 400,
          letterSpacing: style.letterSpacing === "0" ? "normal" : style.letterSpacing,
        }}
      >
        SLDS Aa සිංහල தமிழ்
      </p>
      <div className="shrink-0 text-xs text-[var(--color-text-secondary)] sm:text-right">
        <p className="font-mono font-medium text-[var(--color-text-primary)]">{style.name}</p>
        <p>
          {style.size} / {style.lineHeight} · {style.weight} · {style.letterSpacing}
        </p>
        <p className="text-[var(--color-text-tertiary)]">{style.usage}</p>
      </div>
    </div>
  );
}

export default function TypographyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="Google Sans is the primary typeface for all UI text — variable-driven across three language modes: English, Sinhala, and Tamil. Swap font via Edit → Replace Fonts when working with Sinhala or Tamil layouts."
      />

      <Callout>
        Web fallback stack: <code className="font-mono">Google Sans, -apple-system, BlinkMacSystemFont, &apos;Segoe UI&apos;, Roboto, sans-serif</code>
      </Callout>

      <div className="h-10" />

      <Section title="Mobile type scale" description="390px viewport — 15 styles. Default body style is highlighted.">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-5">
          {typeScaleMobile.map((s) => (
            <Specimen key={s.name} style={s} />
          ))}
        </div>
      </Section>

      <Section title="Desktop type scale" description="1440px canvas — 12 styles. Default body style is highlighted.">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] px-5">
          {typeScaleDesktop.map((s) => (
            <Specimen key={s.name} style={s} />
          ))}
        </div>
      </Section>

      <Section title="Usage rules">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--color-text-secondary)]">
          <li>Never go below 12px for any visible text.</li>
          <li>Overline text must always be uppercase.</li>
          <li>Use Body 1 as the default for running paragraph text.</li>
          <li>Deck Heading styles (88–44px) are reserved for full-bleed hero / campaign screens — never use inside standard page layouts.</li>
          <li>Use heading hierarchy H1 → H2 → H3 → H4 in order. Do not skip levels.</li>
          <li>Set language mode at the frame level via Figma variable modes — do not override font family manually.</li>
        </ul>
      </Section>
    </div>
  );
}
