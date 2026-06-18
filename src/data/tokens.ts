// Design tokens transcribed from sewa-foundation-guidelines.md (v1.0)
// Primitive token names follow the SLDS naming convention documented in
// slds-design-tokens.md: slds-{category}-{role}-{modifier}. Semantic token
// names (Text/Primary, Surface/Card, Action/Primary, etc.) keep their
// Figma-path display form, as documented on the Token Naming page.

export interface PrimitiveToken {
  token: string;
  hex: string;
  usage: string;
}

export interface PrimitiveFamily {
  name: string;
  description: string;
  tokens: PrimitiveToken[];
}

export const colorPrimitives: PrimitiveFamily[] = [
  {
    name: "Gold",
    description: "Brand / Action / Warning",
    tokens: [
      { token: "slds-color-gold-50", hex: "#FFFEF2", usage: "Near-white warm tint, hover backgrounds on white" },
      { token: "slds-color-gold-100", hex: "#FFF8D6", usage: "Pale cream, subtle warning backgrounds" },
      { token: "slds-color-gold-200", hex: "#FFE880", usage: "Light fill, tag backgrounds" },
      { token: "slds-color-gold-300", hex: "#FFD740", usage: "Medium yellow, chart accent light" },
      { token: "slds-color-gold-400", hex: "#FFD01A", usage: "Vivid yellow, secondary highlight" },
      { token: "slds-color-gold-500", hex: "#FFC700", usage: "Action/Primary — main brand gold" },
      { token: "slds-color-gold-600", hex: "#E0AE00", usage: "Primary hover state" },
      { token: "slds-color-gold-700", hex: "#B38A00", usage: "Primary pressed, warning icons, border focus" },
      { token: "slds-color-gold-800", hex: "#806300", usage: "Dark gold, on-dark text accents" },
      { token: "slds-color-gold-900", hex: "#503D00", usage: "Very dark amber" },
      { token: "slds-color-gold-950", hex: "#2B2100", usage: "Near-black warm" },
    ],
  },
  {
    name: "Neutral",
    description: "UI Structure",
    tokens: [
      { token: "slds-color-neutral-0", hex: "#FFFFFF", usage: "Card surface, page white" },
      { token: "slds-color-neutral-50", hex: "#FAFAFB", usage: "Page background" },
      { token: "slds-color-neutral-100", hex: "#F5F6F8", usage: "Section alt background, sunken" },
      { token: "slds-color-neutral-200", hex: "#ECEEF1", usage: "Disabled background, dividers" },
      { token: "slds-color-neutral-300", hex: "#DADDE2", usage: "Decorative borders" },
      { token: "slds-color-neutral-400", hex: "#B8BDC4", usage: "Disabled foreground, tertiary text" },
      { token: "slds-color-neutral-500", hex: "#8E949E", usage: "Default borders, secondary icons" },
      { token: "slds-color-neutral-600", hex: "#676C73", usage: "Secondary text, strong borders (cool-toned)" },
      { token: "slds-color-neutral-700", hex: "#3F4548", usage: "Dark mode borders" },
      { token: "slds-color-neutral-800", hex: "#212529", usage: "Dark mode card surface" },
      { token: "slds-color-neutral-900", hex: "#111111", usage: "Primary text, masthead" },
      { token: "slds-color-neutral-950", hex: "#030712", usage: "Footer, deepest dark" },
    ],
  },
  {
    name: "Red",
    description: "Feedback — Error",
    tokens: [
      { token: "slds-color-red-100", hex: "#FDECEA", usage: "Errors, destructive, rejected status" },
      { token: "slds-color-red-500", hex: "#DC2626", usage: "Errors, destructive, rejected status" },
      { token: "slds-color-red-700", hex: "#B91C1C", usage: "Errors, destructive, rejected status" },
    ],
  },
  {
    name: "Green",
    description: "Feedback — Success",
    tokens: [
      { token: "slds-color-green-100", hex: "#E0F2EC", usage: "Success, approved status" },
      { token: "slds-color-green-500", hex: "#1FAA63", usage: "Success, approved status" },
      { token: "slds-color-green-700", hex: "#086B53", usage: "Success, approved status" },
    ],
  },
  {
    name: "Teal",
    description: "Feedback — Info / Submitted",
    tokens: [
      { token: "slds-color-teal-100", hex: "#D0F0F5", usage: "Info, submitted status" },
      { token: "slds-color-teal-500", hex: "#0E9DB0", usage: "Info, submitted status" },
      { token: "slds-color-teal-600", hex: "#0D6B7B", usage: "Info, submitted status" },
    ],
  },
  {
    name: "Blue",
    description: "Feedback — Info / In Review",
    tokens: [
      { token: "slds-color-blue-100", hex: "#E3EDFF", usage: "Info text, in-review status" },
      { token: "slds-color-blue-500", hex: "#1A56D6", usage: "Info text, in-review status" },
      { token: "slds-color-blue-700", hex: "#1041A8", usage: "Info text, in-review status" },
    ],
  },
  {
    name: "Orange",
    description: "Feedback — Warning / Escalated",
    tokens: [
      { token: "slds-color-orange-100", hex: "#FEF0E3", usage: "Warning, escalated status" },
      { token: "slds-color-orange-500", hex: "#F97316", usage: "Warning, escalated status" },
      { token: "slds-color-orange-600", hex: "#F57C00", usage: "Warning, escalated status" },
    ],
  },
  {
    name: "Purple",
    description: "On-hold status, DataViz",
    tokens: [
      { token: "slds-color-purple-100", hex: "#EDE9FF", usage: "On-hold status, DataViz" },
      { token: "slds-color-purple-300", hex: "#A78BFA", usage: "On-hold status, DataViz" },
      { token: "slds-color-purple-500", hex: "#6747C7", usage: "On-hold status, DataViz" },
    ],
  },
  {
    name: "Maroon",
    description: "Heritage accent — use sparingly",
    tokens: [{ token: "slds-color-maroon-700", hex: "#7A1240", usage: "Heritage accent — use sparingly" }],
  },
];

export interface SemanticToken {
  token: string;
  light: string;
  dark: string;
  usage: string;
}

export interface SemanticGroup {
  name: string;
  tokens: SemanticToken[];
}

export const semanticColors: SemanticGroup[] = [
  {
    name: "Text",
    tokens: [
      { token: "Text/Primary", light: "#111111", dark: "#FFFFFF", usage: "Body copy, headings" },
      { token: "Text/Secondary", light: "#676C73", dark: "#B8BDC4", usage: "Supporting text, subtitles" },
      { token: "Text/Tertiary", light: "#B8BDC4", dark: "#676C73", usage: "Placeholder, metadata" },
      { token: "Text/Disabled", light: "#B8BDC4", dark: "#3F4548", usage: "Disabled labels" },
      { token: "Text/Inverse", light: "#FFFFFF", dark: "#111111", usage: "Text on dark surfaces" },
      { token: "Text/Link", light: "#111111", dark: "#FFD740", usage: "Hyperlinks" },
    ],
  },
  {
    name: "Surface",
    tokens: [
      { token: "Surface/Page", light: "#FAFAFB", dark: "#111111", usage: "Root page background" },
      { token: "Surface/Card", light: "#FFFFFF", dark: "#212529", usage: "Cards, panels, modals" },
      { token: "Surface/Hover", light: "#F5F6F8", dark: "#212529", usage: "Row hover, menu hover" },
      { token: "Surface/Sunken", light: "#F5F6F8", dark: "#111111", usage: "Inset areas, code blocks" },
      { token: "Surface/Section Alt", light: "#F5F6F8", dark: "#212529", usage: "Alternating sections" },
      { token: "Surface/Masthead", light: "#111111", dark: "#111111", usage: "Top navigation bar" },
      { token: "Surface/Footer", light: "#111111", dark: "#030712", usage: "Page footer" },
      { token: "Surface/Brand", light: "#FFC700", dark: "#FFC700", usage: "Gold brand surfaces" },
      { token: "Surface/Inverse", light: "#111111", dark: "#FFFFFF", usage: "Inverse surfaces" },
    ],
  },
  {
    name: "Action",
    tokens: [
      { token: "Action/Primary", light: "#FFC700", dark: "#FFC700", usage: "Primary button background" },
      { token: "Action/Primary Foreground", light: "#111111", dark: "#111111", usage: "Label on primary button" },
      { token: "Action/Primary Hover", light: "#E0AE00", dark: "#FFD740", usage: "Primary hover" },
      { token: "Action/Primary Pressed", light: "#E0AE00", dark: "#FFD740", usage: "Primary pressed" },
      { token: "Action/Secondary", light: "#FFFFFF", dark: "#212529", usage: "Secondary button background" },
      { token: "Action/Secondary Border", light: "#111111", dark: "#DADDE2", usage: "Secondary button border" },
      { token: "Action/Disabled Background", light: "#ECEEF1", dark: "#212529", usage: "Disabled background" },
      { token: "Action/Disabled Foreground", light: "#B8BDC4", dark: "#676C73", usage: "Disabled label/icon" },
    ],
  },
  {
    name: "Border",
    tokens: [
      { token: "Border/Default", light: "#8E949E", dark: "#3F4548", usage: "Input borders, card outlines" },
      { token: "Border/Decorative", light: "#DADDE2", dark: "#212529", usage: "Dividers, separators" },
      { token: "Border/Focus", light: "#B38A00", dark: "#B38A00", usage: "Focus ring" },
      { token: "Border/Error", light: "#D32F2F", dark: "#F47272", usage: "Invalid input border" },
      { token: "Border/Disabled", light: "#ECEEF1", dark: "#3F4548", usage: "Disabled input" },
      { token: "Border/Strong", light: "#676C73", dark: "#8E949E", usage: "Prominent borders, table rules" },
    ],
  },
  {
    name: "Icon",
    tokens: [
      { token: "Icon/Primary", light: "#111111", dark: "#FFFFFF", usage: "Default icons" },
      { token: "Icon/Secondary", light: "#8E949E", dark: "#B8BDC4", usage: "Subdued icons" },
      { token: "Icon/Action", light: "#B38A00", dark: "#B38A00", usage: "Action/interactive icons" },
      { token: "Icon/Inverse", light: "#FFFFFF", dark: "#111111", usage: "Icons on dark backgrounds" },
    ],
  },
  {
    name: "Feedback",
    tokens: [
      { token: "Feedback/Error", light: "#D32F2F", dark: "#F47272", usage: "Error icon" },
      { token: "Feedback/Error Subtle", light: "#FDECEA", dark: "#330D0D", usage: "Error banner background" },
      { token: "Feedback/Error Text", light: "#D32F2F", dark: "#F47272", usage: "Error message text" },
      { token: "Feedback/Warning", light: "#B38A00", dark: "#B38A00", usage: "Warning icon" },
      { token: "Feedback/Warning Subtle", light: "#FFF8D6", dark: "#2E2200", usage: "Warning banner background" },
      { token: "Feedback/Warning Text", light: "#503D00", dark: "#FFE880", usage: "Warning message text" },
      { token: "Feedback/Success", light: "#086B53", dark: "#5DC896", usage: "Success icon" },
      { token: "Feedback/Success Subtle", light: "#E0F2EC", dark: "#062B1A", usage: "Success banner background" },
      { token: "Feedback/Info", light: "#0D6B7B", dark: "#7DD8E8", usage: "Info icon" },
      { token: "Feedback/Info Subtle", light: "#E3EDFF", dark: "#0A1733", usage: "Info banner background" },
      { token: "Feedback/Info Text", light: "#1041A8", dark: "#93C5FD", usage: "Info message text" },
    ],
  },
];

export interface StatusToken {
  status: string;
  color: string;
  colorAlias: string;
  bg: string;
  bgAlias: string;
}

export const statusBadges: StatusToken[] = [
  { status: "Approved", color: "#059669", colorAlias: "slds-color-green-600", bg: "#E0F2EC", bgAlias: "slds-color-green-100" },
  { status: "Submitted", color: "#0E9DB0", colorAlias: "slds-color-teal-500", bg: "#D0F0F5", bgAlias: "slds-color-teal-100" },
  { status: "In Review", color: "#1A56D6", colorAlias: "slds-color-blue-500", bg: "#E3EDFF", bgAlias: "slds-color-blue-100" },
  { status: "On Hold", color: "#6747C7", colorAlias: "slds-color-purple-500", bg: "#EDE9FF", bgAlias: "slds-color-purple-100" },
  { status: "Escalated", color: "#F57C00", colorAlias: "slds-color-orange-600", bg: "#FEF0E3", bgAlias: "slds-color-orange-100" },
  { status: "Rejected", color: "#D32F2F", colorAlias: "slds-color-red-600", bg: "#FDECEA", bgAlias: "slds-color-red-100" },
  { status: "Draft", color: "#676C73", colorAlias: "slds-color-neutral-600", bg: "#F5F6F8", bgAlias: "slds-color-neutral-100" },
  { status: "Archived", color: "#B8BDC4", colorAlias: "slds-color-neutral-400", bg: "#F5F6F8", bgAlias: "slds-color-neutral-100" },
];

export interface DataVizToken {
  index: number;
  light: string;
  dark: string;
  alias: string;
}

export const dataViz: DataVizToken[] = [
  { index: 1, light: "#FFC700", dark: "#FFD01A", alias: "slds-color-gold-500 · slds-color-gold-400" },
  { index: 2, light: "#1A56D6", dark: "#93C5FD", alias: "slds-color-blue-500 · slds-color-blue-300" },
  { index: 3, light: "#DC2626", dark: "#F87171", alias: "slds-color-red-500 · slds-color-red-400" },
  { index: 4, light: "#0E9DB0", dark: "#67D2E1", alias: "slds-color-teal-500 · slds-color-teal-300" },
  { index: 5, light: "#6747C7", dark: "#A78BFA", alias: "slds-color-purple-500 · slds-color-purple-300" },
  { index: 6, light: "#F97316", dark: "#FB923C", alias: "slds-color-orange-500 · slds-color-orange-400" },
  { index: 7, light: "#059669", dark: "#34D399", alias: "slds-color-green-600 · slds-color-green-400" },
  { index: 8, light: "#676C73", dark: "#B8BDC4", alias: "slds-color-neutral-600 · slds-color-neutral-400" },
];

export interface TypeStyle {
  name: string;
  size: string;
  lineHeight: string;
  weight: string;
  letterSpacing: string;
  usage: string;
}

export const typeScaleMobile: TypeStyle[] = [
  { name: "slds-font-mobile-deck-heading-1", size: "88px", lineHeight: "96px", weight: "Bold", letterSpacing: "−5px", usage: "Hero / splash screens" },
  { name: "slds-font-mobile-deck-heading-2", size: "72px", lineHeight: "80px", weight: "Bold", letterSpacing: "−5px", usage: "Campaign headers" },
  { name: "slds-font-mobile-deck-heading-3", size: "56px", lineHeight: "64px", weight: "Bold", letterSpacing: "−4px", usage: "Large feature titles" },
  { name: "slds-font-mobile-deck-heading-4", size: "44px", lineHeight: "52px", weight: "Bold", letterSpacing: "−4px", usage: "Section titles on landing pages" },
  { name: "slds-font-mobile-display-1", size: "36px", lineHeight: "44px", weight: "Medium", letterSpacing: "−2px", usage: "Page-level display text" },
  { name: "slds-font-mobile-heading-4", size: "30px", lineHeight: "40px", weight: "Bold", letterSpacing: "−0.5px", usage: "Sub-section heading" },
  { name: "slds-font-mobile-heading-3", size: "26px", lineHeight: "36px", weight: "Bold", letterSpacing: "−0.5px", usage: "Card heading" },
  { name: "slds-font-mobile-heading-2", size: "22px", lineHeight: "32px", weight: "Medium", letterSpacing: "0", usage: "Section heading" },
  { name: "slds-font-mobile-heading-1", size: "20px", lineHeight: "28px", weight: "Medium", letterSpacing: "0", usage: "Main page heading" },
  { name: "slds-font-mobile-title-1", size: "17px", lineHeight: "24px", weight: "Medium", letterSpacing: "0", usage: "List item title, modal title" },
  { name: "slds-font-mobile-body-2", size: "17px", lineHeight: "24px", weight: "Regular", letterSpacing: "0", usage: "Longer body copy" },
  { name: "slds-font-mobile-body-1", size: "15px", lineHeight: "20px", weight: "Regular", letterSpacing: "0", usage: "Primary body copy ← default" },
  { name: "slds-font-mobile-caption-2", size: "14px", lineHeight: "20px", weight: "Regular", letterSpacing: "0", usage: "Metadata, timestamps" },
  { name: "slds-font-mobile-caption-1", size: "12px", lineHeight: "16px", weight: "Regular", letterSpacing: "0", usage: "Helper text, form hints" },
  { name: "slds-font-mobile-overline", size: "12px", lineHeight: "16px", weight: "Medium", letterSpacing: "+2px", usage: "Section labels (ALL CAPS)" },
];

export const typeScaleDesktop: TypeStyle[] = [
  { name: "slds-font-desktop-display-1", size: "56px", lineHeight: "68px", weight: "Bold", letterSpacing: "−0.5px", usage: "Hero headline" },
  { name: "slds-font-desktop-display-2", size: "44px", lineHeight: "56px", weight: "Bold", letterSpacing: "−0.3px", usage: "Feature heading" },
  { name: "slds-font-desktop-heading-1", size: "32px", lineHeight: "44px", weight: "Bold", letterSpacing: "−0.3px", usage: "Main page heading" },
  { name: "slds-font-desktop-heading-2", size: "28px", lineHeight: "40px", weight: "Bold", letterSpacing: "−0.2px", usage: "Section heading" },
  { name: "slds-font-desktop-heading-3", size: "24px", lineHeight: "36px", weight: "Medium", letterSpacing: "−0.2px", usage: "Sub-section heading" },
  { name: "slds-font-desktop-heading-4", size: "20px", lineHeight: "32px", weight: "Medium", letterSpacing: "−0.1px", usage: "Card / panel heading" },
  { name: "slds-font-desktop-title-1", size: "18px", lineHeight: "28px", weight: "Medium", letterSpacing: "0", usage: "Modal title, table header" },
  { name: "slds-font-desktop-body-1", size: "16px", lineHeight: "26px", weight: "Regular", letterSpacing: "0", usage: "Primary body copy ← default" },
  { name: "slds-font-desktop-body-2", size: "14px", lineHeight: "22px", weight: "Regular", letterSpacing: "0", usage: "Dense body, sidebar text" },
  { name: "slds-font-desktop-caption-1", size: "12px", lineHeight: "18px", weight: "Regular", letterSpacing: "+0.2px", usage: "Helper text, form hints" },
  { name: "slds-font-desktop-caption-2", size: "11px", lineHeight: "16px", weight: "Regular", letterSpacing: "+0.3px", usage: "Fine print, metadata" },
  { name: "slds-font-desktop-overline", size: "11px", lineHeight: "16px", weight: "Medium", letterSpacing: "+1px", usage: "Section labels (ALL CAPS)" },
];

export interface SpacingToken {
  token: string;
  value: string;
  use: string;
}

export const spacingScale: SpacingToken[] = [
  { token: "slds-space-4", value: "4px", use: "Icon gap, tight inline spacing" },
  { token: "slds-space-8", value: "8px", use: "Badge padding, chip gap" },
  { token: "slds-space-12", value: "12px", use: "Button vertical padding, input padding" },
  { token: "slds-space-16", value: "16px", use: "Card padding (mobile), list item gap" },
  { token: "slds-space-20", value: "20px", use: "Form field gap, section inner padding" },
  { token: "slds-space-24", value: "24px", use: "Card padding (desktop), modal padding" },
  { token: "slds-space-32", value: "32px", use: "Section gap, panel padding" },
  { token: "slds-space-40", value: "40px", use: "Large section gap" },
  { token: "slds-space-48", value: "48px", use: "Component vertical rhythm" },
  { token: "slds-space-64", value: "64px", use: "Page section gap" },
  { token: "slds-space-80", value: "80px", use: "Page horizontal padding (desktop)" },
  { token: "slds-space-96", value: "96px", use: "Large hero padding" },
  { token: "slds-space-120", value: "120px", use: "Generous section breathing room" },
  { token: "slds-space-160", value: "160px", use: "Maximum section vertical padding" },
];

export interface GridBreakpoint {
  breakpoint: string;
  columns: number;
  gutter: string;
  margin: string;
  maxWidth: string;
}

export const gridBreakpoints: GridBreakpoint[] = [
  { breakpoint: "Mobile (≤ 767px)", columns: 4, gutter: "16px", margin: "16px", maxWidth: "100%" },
  { breakpoint: "Tablet (768–1199px)", columns: 8, gutter: "24px", margin: "32px", maxWidth: "100%" },
  { breakpoint: "Desktop (≥ 1200px)", columns: 12, gutter: "24px", margin: "80px", maxWidth: "1440px" },
];

export interface ElevationLevel {
  level: string;
  effectStyle: string;
  cssToken: string;
  shadow: string;
  when: string;
}

export const elevationScale: ElevationLevel[] = [
  { level: "0 · Flat", effectStyle: "Elevation/0 · Flat", cssToken: "slds-shadow-none", shadow: "none", when: "Flat surfaces, disabled states, backgrounds" },
  { level: "1 · Raised", effectStyle: "Elevation/1 · Raised", cssToken: "slds-shadow-sm", shadow: "0 1px 2px 0 rgba(0,0,0,0.05)", when: "Cards, input fields, small dropdowns" },
  { level: "2 · Elevated", effectStyle: "Elevation/2 · Elevated", cssToken: "slds-shadow-md", shadow: "0 4px 6px -1px rgba(0,0,0,0.10)", when: "Dropdown menus, tooltips, popovers" },
  { level: "3 · Floating", effectStyle: "Elevation/3 · Floating", cssToken: "slds-shadow-lg", shadow: "0 10px 15px -3px rgba(0,0,0,0.12)", when: "Modals, date pickers, command palettes" },
  { level: "4 · Overlay", effectStyle: "Elevation/4 · Overlay", cssToken: "slds-shadow-xl", shadow: "0 20px 25px -5px rgba(0,0,0,0.15)", when: "Side drawers, slide-over panels" },
  { level: "5 · Screen", effectStyle: "Elevation/5 · Screen", cssToken: "slds-shadow-2xl", shadow: "0 25px 50px -12px rgba(0,0,0,0.25)", when: "Full-screen overlays, lightboxes" },
];

export const focusRings = [
  { name: "Focus/Default", ring: "slds-color-gold-500 #FFC700 — 2px solid + soft glow", usage: "All interactive elements" },
  { name: "Focus/Error", ring: "slds-color-red-500 #DC2626 — 2px solid + soft glow", usage: "Invalid inputs on focus" },
  { name: "Focus/Info", ring: "slds-color-blue-500 #1A56D6 — 2px solid + soft glow", usage: "Informational interactive elements" },
];

export const zIndexScale = [
  { token: "slds-z-base", value: 0, usage: "Default stacking context" },
  { token: "slds-z-raised", value: 1, usage: "Slightly elevated cards" },
  { token: "slds-z-dropdown", value: 10, usage: "Dropdown menus, select options" },
  { token: "slds-z-sticky", value: 100, usage: "Sticky headers, fixed navbars" },
  { token: "slds-z-overlay", value: 200, usage: "Modal backdrops" },
  { token: "slds-z-modal", value: 300, usage: "Modal dialogs" },
  { token: "slds-z-toast", value: 400, usage: "Toast notifications" },
  { token: "slds-z-tooltip", value: 500, usage: "Tooltips (always on top)" },
];

export interface RadiusToken {
  token: string;
  value: string;
  usage: string;
}

export const radiusScale: RadiusToken[] = [
  { token: "slds-radius-none", value: "0px", usage: "Tables, full-bleed images, ruler dividers" },
  { token: "slds-radius-sm", value: "4px", usage: "Tags, chips, badges, small buttons" },
  { token: "slds-radius-md", value: "8px", usage: "Inputs, selects, default buttons" },
  { token: "slds-radius-lg", value: "12px", usage: "Cards, list containers, alerts" },
  { token: "slds-radius-xl", value: "16px", usage: "Modals, drawers, large panels" },
  { token: "slds-radius-2xl", value: "24px", usage: "Feature cards, hero cards" },
  { token: "slds-radius-full", value: "9999px", usage: "Pills, avatar circles, toggle switches" },
];

export const motionDurations = [
  { token: "slds-motion-duration-instant", value: "0ms", usage: "No animation — immediate state change" },
  { token: "slds-motion-duration-fast", value: "100ms", usage: "Hover states, icon swaps" },
  { token: "slds-motion-duration-normal", value: "200ms", usage: "Button feedback, focus rings, toggles" },
  { token: "slds-motion-duration-moderate", value: "300ms", usage: "Dropdowns opening, accordion expand" },
  { token: "slds-motion-duration-slow", value: "400ms", usage: "Modals, drawers entering" },
  { token: "slds-motion-duration-deliberate", value: "500ms", usage: "Page transitions, complex reveals" },
];

export const motionEasings = [
  { token: "slds-motion-easing-standard", curve: "cubic-bezier(0.4, 0, 0.2, 1)", usage: "Elements moving within the screen" },
  { token: "slds-motion-easing-decelerate", curve: "cubic-bezier(0, 0, 0.2, 1)", usage: "Elements entering the screen" },
  { token: "slds-motion-easing-accelerate", curve: "cubic-bezier(0.4, 0, 1, 1)", usage: "Elements leaving the screen" },
  { token: "slds-motion-easing-sharp", curve: "cubic-bezier(0.4, 0, 0.6, 1)", usage: "Quick dismissals" },
];

export const contrastPairs = [
  { fg: "Text/Primary #111111", bg: "Surface/Page #FAFAFB", ratio: "~18:1", result: "AAA" },
  { fg: "Action/Primary FG #111111", bg: "Action/Primary #FFC700", ratio: "~9.2:1", result: "AAA" },
  { fg: "Text/Secondary #676C73", bg: "Surface/Page #FAFAFB", ratio: "~4.7:1", result: "AA" },
  { fg: "Feedback/Error #D32F2F", bg: "Surface/Card #FFFFFF", ratio: "~5.1:1", result: "AA" },
  { fg: "Text/Inverse #FFFFFF", bg: "Surface/Masthead #111111", ratio: "~18:1", result: "AAA" },
];

export const contrastRequirements = [
  { context: "Normal text (< 18px regular / < 14px bold)", minRatio: "4.5 : 1", notes: "Body copy, captions, labels" },
  { context: "Large text (≥ 18px regular / ≥ 14px bold)", minRatio: "3 : 1", notes: "Headings, display text" },
  { context: "UI components & graphical objects", minRatio: "3 : 1", notes: "Input borders, icons, chart lines" },
  { context: "Disabled states", minRatio: "Exempt", notes: "Must be visually distinguishable" },
  { context: "Decorative elements", minRatio: "Exempt", notes: "Background patterns, separators" },
];
