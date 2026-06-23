// Sinhala/Tamil font-size deltas, extracted from the Typography/Mobile Figma
// variable collection (English.tokens.json / Sinhala.tokens.json / Tamil.tokens.json).
// English values match src/data/tokens.ts typeScaleMobile exactly.

export interface ScriptSizeRow {
  role: string;
  token: string;
  en: number;
  si: number;
  ta: number;
  featured: boolean;
}

export const scriptComparisonMobile: ScriptSizeRow[] = [
  { role: "Deck Heading 1", token: "slds-font-mobile-deck-heading-1", en: 88, si: 85, ta: 85, featured: false },
  { role: "Deck Heading 2", token: "slds-font-mobile-deck-heading-2", en: 72, si: 69, ta: 69, featured: false },
  { role: "Deck Heading 3", token: "slds-font-mobile-deck-heading-3", en: 56, si: 53, ta: 53, featured: false },
  { role: "Deck Heading 4", token: "slds-font-mobile-deck-heading-4", en: 44, si: 41, ta: 41, featured: false },
  { role: "Display 1", token: "slds-font-mobile-display-1", en: 36, si: 33, ta: 33, featured: false },
  { role: "Heading 1", token: "slds-font-mobile-heading-1", en: 20, si: 17, ta: 17, featured: true },
  { role: "Heading 2", token: "slds-font-mobile-heading-2", en: 22, si: 19, ta: 19, featured: true },
  { role: "Heading 3", token: "slds-font-mobile-heading-3", en: 26, si: 23, ta: 23, featured: false },
  { role: "Heading 4", token: "slds-font-mobile-heading-4", en: 30, si: 27, ta: 27, featured: false },
  { role: "Title 1", token: "slds-font-mobile-title-1", en: 17, si: 14, ta: 14, featured: false },
  { role: "Body 1", token: "slds-font-mobile-body-1", en: 15, si: 14, ta: 14, featured: true },
  { role: "Body 2", token: "slds-font-mobile-body-2", en: 17, si: 14, ta: 14, featured: true },
  { role: "Caption 1", token: "slds-font-mobile-caption-1", en: 12, si: 9, ta: 9, featured: true },
  { role: "Caption 2", token: "slds-font-mobile-caption-2", en: 14, si: 11, ta: 11, featured: false },
  { role: "Overline", token: "slds-font-mobile-overline", en: 12, si: 9, ta: 9, featured: true },
];
