import type { Metadata } from "next";
import { PageHeader, Section, Callout } from "@/components/Foundation";
import { typeScaleMobile, typeScaleDesktop, type TypeStyle } from "@/data/tokens";
import { ScriptComparison } from "@/components/ScriptComparison";

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
        Aa අආ அஆ
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

      <div className="h-4" />

      <Callout tone="warning">
        <strong>Font status:</strong> Google Sans glyph coverage for Sinhala and Tamil scripts is currently
        being confirmed. The font packaging approach and any fallback strategy will be documented once
        validated with the development team. Until confirmed, treat Sinhala and Tamil rendering in
        production as provisional.
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

      <Section title="Multi-script scaling strategy">
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
          Tamil and Sinhala glyphs are physically larger than their Latin equivalents at the same point
          size. To preserve UI layout integrity when switching scripts, SLDS applies a modulated scaling
          approach.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
          When the frame language mode is set to Sinhala or Tamil, the Typography variable collection
          resolves to slightly reduced font sizes compared to the English values. This prevents layout
          reflow and overflow when switching between scripts.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5">
            <h3 className="font-semibold text-[var(--color-text-primary)]">In Figma</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Set language at the frame level via the variable mode selector (English / Sinhala / Tamil).
              Never override the font family or size manually — always switch the mode.
            </p>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-decorative)] bg-[var(--color-surface-card)] p-5">
            <h3 className="font-semibold text-[var(--color-text-primary)]">In code</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Apply the language mode class or CSS custom property at the root container level. Typography
              tokens resolve automatically.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Callout tone="warning">
            Google Sans glyph coverage for Sinhala and Tamil is pending final confirmation. Font packaging
            approach and exact scaling ratios will be documented once confirmed with the development team.
            This section will be updated.
          </Callout>
        </div>
      </Section>

      <Section
        title="Script comparison"
        description="The same font-size token resolves to a different pixel value depending on the active language mode. Sinhala and Tamil glyphs occupy more vertical space at the same point size, so the token values are reduced for those scripts to maintain consistent line rhythm and layout density."
      >
        <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
          Values are read from the <code className="font-mono text-xs">Typography/Mobile</code> Figma variable
          collection. Use the language switcher in the header to highlight the active column.
        </p>
        <ScriptComparison />
      </Section>

      <Section title="Usage rules">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--color-text-secondary)]">
          <li>Never go below 12px for any visible text.</li>
          <li>Overline text uses sentence case — do not apply all-caps or text-transform: uppercase.</li>
          <li>Use Body 1 as the default for running paragraph text.</li>
          <li>Deck Heading styles (88–44px) are reserved for full-bleed hero / campaign screens — never use inside standard page layouts.</li>
          <li>Use heading hierarchy H1 → H2 → H3 → H4 in order. Do not skip levels.</li>
          <li>Set language mode at the frame level via Figma variable modes — do not override font family manually.</li>
        </ul>
      </Section>
    </div>
  );
}
