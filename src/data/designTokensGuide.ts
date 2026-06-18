// Content transcribed from slds-design-tokens.md — the SLDS Design Tokens guide.

export const tokenTiers = [
  {
    tier: "Raw value",
    also: "Hard-coded value",
    description: "The literal value: #FFC700, 16px, 0.25. Never used directly in components. Lives inside primitive tokens only.",
  },
  {
    tier: "Primitive token",
    also: "Global / Core token",
    description: "Foundational named values — the complete colour ramps, spacing scale, type scale, and so on. The source of truth for raw values. Referenced only by semantic tokens, never by components.",
  },
  {
    tier: "Semantic token",
    also: "Alias token",
    description: "Named decisions that describe UI roles, not raw values. Tells you what the token is for (Action/Primary, Text/Secondary, Surface/Card). References primitive tokens and switches value per mode (Light/Dark, language).",
  },
  {
    tier: "Component token",
    also: "Component hook",
    description: "Scoped tokens that connect a specific component property to a semantic or primitive token. Used only when a component genuinely needs a value no semantic token covers.",
  },
];

export const whenToUseEach = [
  { situation: "Building a component or layout", use: "Semantic token" },
  { situation: "Creating a new semantic alias", use: "Primitive token as the alias target" },
  { situation: "Documenting the colour palette or scale", use: "Primitive token" },
  { situation: "A specific component property has no matching semantic token", use: "Component token" },
  { situation: "Inside CSS variable declarations", use: "Semantic token name as the custom property" },
  { situation: "Never", use: "Raw hex / pixel values directly in component styles" },
];

export const tokenCategories = [
  { category: "Colour", covers: "Backgrounds, surfaces, text, borders, feedback, status, interactive states", examples: "Color/Semantic/Action/Primary, Color/Primitive/Gold/500" },
  { category: "Typography", covers: "Font size, line height, font weight, letter spacing", examples: "Typography/Mobile/Font Size/body_1, Typography/Desktop/Line Height/heading_1" },
  { category: "Spacing", covers: "Padding, gap, margin", examples: "space-16, space-24, space-48" },
  { category: "Border Radius", covers: "Corner rounding", examples: "radius-sm, radius-md, radius-full" },
  { category: "Elevation", covers: "Shadow offset, blur, spread, opacity; z-index", examples: "Elevation/Shadow/2/Blur, Elevation/z-modal" },
  { category: "Motion", covers: "Animation duration, easing curves", examples: "Motion/Duration/Normal, Motion/Easing/Decelerate" },
];

export const tokenScales = [
  { scale: "Numeric", appliesTo: "Spacing, colour ramp steps, opacity", example: "space-16, Gold/500, opacity-50" },
  { scale: "Size", appliesTo: "Border radius, type sizes, icon sizes", example: "radius-md, font-size-body-md" },
  { scale: "Level", appliesTo: "Elevation shadows, z-index", example: "Elevation/1 · Raised, z-modal" },
  { scale: "Ratio", appliesTo: "Line height", example: "line-height-body (1.6×)" },
  { scale: "Categorical", appliesTo: "Font weight, colour roles, surface roles", example: "font-weight-bold, Surface/Card, Text/Secondary" },
  { scale: "Positional", appliesTo: "Directional padding or layout", example: "space-inline, space-block" },
];

export const changeImpact = [
  {
    action: "Adding tokens",
    impact: "Low to medium. New tokens increase the library's flexibility but have no immediate effect until used.",
    risk: "Token bloat when added without a clear need. Teams need guidance on when to use it.",
    criteria: "The token must solve a real design need, align with the existing scale, and not duplicate an existing token.",
    process: "Identify the gap → propose name, value, and use case → review → document → implement.",
  },
  {
    action: "Modifying tokens",
    impact: "High, especially for primitive and semantic tokens. Every component, frame, and export that uses the token inherits the change.",
    risk: "Visual regressions if dependencies are unclear. May become a breaking change for external consumers.",
    criteria: "Use for accessibility improvements, brand alignment, or correcting a scale inconsistency.",
    process: "Audit token usage in Figma and code → propose change with before/after comparison → test in staging → release with migration notes.",
  },
  {
    action: "Removing tokens",
    impact: "Medium to high. Breaks any component or style still referencing the token.",
    risk: "Production failures if the token is still active in shipped code.",
    criteria: "Only remove when the token is unused, redundant, or no longer aligned with the system.",
    process: "Mark deprecated → announce with a transition period → remove only after all references are cleared.",
  },
];

export const namingPositions = [
  { position: 1, name: "Namespace", description: "Always slds — identifies the Sri Lanka Design System (SLDS)." },
  { position: 2, name: "Category", description: "The design dimension: color, font, space, radius, elevation, motion, z." },
  { position: 3, name: "Role", description: "The UI role or property: action, text, surface, border, feedback, body, heading, padding, shadow." },
  { position: 4, name: "Modifier", description: "The state, scale, or variant: primary, default, hover, focus, error, sm, md, lg, 500, light, dark." },
];

export const primitiveAnatomyExamples = [
  { name: "slds-color-gold-500", value: "#FFC700" },
  { name: "slds-color-neutral-100", value: "#F5F6F8" },
  { name: "slds-space-16", value: "16px" },
  { name: "slds-radius-md", value: "8px" },
  { name: "slds-font-size-body-md", value: "15px (mobile) / 16px (desktop)" },
  { name: "slds-font-weight-medium", value: "500" },
  { name: "slds-motion-duration-normal", value: "200ms" },
  { name: "slds-z-modal", value: "300" },
];

// Curated semantic token examples — also powers the interactive resolver.
export const semanticAnatomyExamples = [
  { token: "slds-color-action-primary", figmaPath: "Color/Semantic/Action/Primary", primitive: "Gold/500", light: "#FFC700", dark: "#FFC700" },
  { token: "slds-color-action-primary-hover", figmaPath: "Color/Semantic/Action/Primary Hover", primitive: "Gold/600", light: "#E0AE00", dark: "#FFD740" },
  { token: "slds-color-text-primary", figmaPath: "Color/Semantic/Text/Primary", primitive: "Neutral/900", light: "#111111", dark: "#FFFFFF" },
  { token: "slds-color-text-secondary", figmaPath: "Color/Semantic/Text/Secondary", primitive: "Neutral/600", light: "#676C73", dark: "#B8BDC4" },
  { token: "slds-color-surface-card", figmaPath: "Color/Semantic/Surface/Card", primitive: "Neutral/0", light: "#FFFFFF", dark: "#212529" },
  { token: "slds-color-border-default", figmaPath: "Color/Semantic/Border/Default", primitive: "Neutral/500", light: "#8E949E", dark: "#3F4548" },
  { token: "slds-color-feedback-error", figmaPath: "Color/Semantic/Feedback/Error", primitive: "Red/500", light: "#DC2626", dark: "#DC2626" },
  { token: "slds-color-feedback-success", figmaPath: "Color/Semantic/Feedback/Success", primitive: "Green/600", light: "#059669", dark: "#059669" },
];

export const componentAnatomyExamples = [
  { token: "slds-btn-primary-bg", references: "slds-color-action-primary" },
  { token: "slds-btn-primary-fg", references: "slds-color-text-inverse" },
  { token: "slds-btn-primary-hover-bg", references: "slds-color-action-primary-hover" },
  { token: "slds-btn-border-radius", references: "slds-radius-md" },
  { token: "slds-btn-padding-y", references: "slds-space-12" },
  { token: "slds-btn-padding-x", references: "slds-space-24" },
  { token: "slds-btn-font-size", references: "slds-font-size-body-md" },
  { token: "slds-input-border-color", references: "slds-color-border-default" },
  { token: "slds-input-border-error", references: "slds-color-feedback-error" },
  { token: "slds-input-border-focus", references: "slds-color-action-primary" },
  { token: "slds-badge-approved-bg", references: "slds-color-status-approved-subtle" },
  { token: "slds-badge-approved-fg", references: "slds-color-status-approved" },
];

export const namingPrinciples = [
  {
    title: "Short",
    description: "Keep names compact enough to scan in code, Figma variables, and documentation. Avoid redundant words.",
  },
  {
    title: "Meaningful",
    description: "Name the design decision, not the current value. Use role-based words — action, danger, surface, border, heading, body — not colour names like yellow or dark-grey.",
    good: "slds-color-action-primary   (describes the role)",
    bad: ["slds-color-gold             (describes the colour)", "slds-color-ffc700           (describes the value)"],
  },
  {
    title: "Scalable",
    description: "Choose names that can support more themes, states, and component variants over time without being renamed.",
    good: "slds-color-text-primary      (works across light, dark, any brand colour)",
    bad: ["slds-color-text-black        (breaks if dark mode inverts it)"],
  },
  {
    title: "Flexible",
    description: "Keep shared semantic tokens broad enough for reuse. Add component or context scope only when the decision is genuinely specific.",
    good: "slds-color-border-default    (reusable across inputs, cards, tables)\nslds-input-border-focus      (only when the input border-focus differs from the global focus token)",
    bad: ["slds-input-border-default    (unnecessary if it resolves identically to slds-color-border-default)"],
  },
  {
    title: "Clear",
    description: "Each segment should be understandable without looking up the resolved value. A new team member reading slds-color-feedback-error should know it's the error state colour without checking Figma.",
  },
];

export const figmaVsCss = [
  { figma: "Color/Semantic/Action/Primary", css: "--slds-color-action-primary" },
  { figma: "Color/Semantic/Text/Secondary", css: "--slds-color-text-secondary" },
  { figma: "Color/Semantic/Surface/Card", css: "--slds-color-surface-card" },
  { figma: "Color/Semantic/Feedback/Error", css: "--slds-color-feedback-error" },
  { figma: "Color/Primitive/Gold/500", css: "--slds-color-gold-500" },
  { figma: "Spacing/space-16", css: "--slds-space-16" },
  { figma: "Border Radius/radius-md", css: "--slds-radius-md" },
  { figma: "Elevation/Shadow/2/Blur", css: "--slds-shadow-2-blur" },
  { figma: "Motion/Duration/Normal", css: "--slds-motion-duration-normal" },
  { figma: "Motion/Easing/Standard", css: "--slds-motion-easing-standard" },
];

export const namingCategories = ["color", "font", "space", "radius", "elevation", "motion", "z"];
export const namingRoles = ["action", "text", "surface", "border", "feedback", "body", "heading", "padding", "shadow"];
export const namingModifiers = ["primary", "default", "hover", "focus", "error", "sm", "md", "lg", "500", "light", "dark"];
