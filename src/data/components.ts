// Component inventory transcribed from Sewa_Component_Inventory_v1.0.md
// Components that recur across multiple platform sections in the source
// document have been merged into a single canonical entry with a combined
// platform list, so each real-world component has exactly one catalog page.

export type Platform = "mobile" | "web" | "dashboard" | "websites";
export type Status = "v1" | "post-v1";

export const PLATFORM_LABELS: Record<Platform, string> = {
  mobile: "Mobile App",
  web: "Web (PWA)",
  dashboard: "Dashboard",
  websites: "Websites",
};

export const CATEGORIES = [
  "Actions",
  "Forms & Inputs",
  "Navigation",
  "Feedback & Status",
  "Display & Data",
  "Overlays",
  "Layout",
  "Data & Analytics",
  "Workflow & Case Management",
  "Hero & Banners",
  "Content Blocks",
  "Cards & Collections",
  "Media",
  "Lists & Data",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface ComponentEntry {
  slug: string;
  name: string;
  category: Category;
  platforms: Platform[];
  status: Status;
  exclusive?: boolean;
  notes: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const raw: Omit<ComponentEntry, "slug">[] = [
  // Actions
  { name: "Button — Primary", category: "Actions", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "44px on web/dashboard, full-width 52px on mobile." },
  { name: "Button — Secondary", category: "Actions", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "Outline style, paired with Primary." },
  { name: "Button — Tertiary (Ghost)", category: "Actions", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "Outlined / low-emphasis action." },
  { name: "Button — Text / Link", category: "Actions", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "No border, no background." },
  { name: "Button — Icon", category: "Actions", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "44×44pt minimum touch target on mobile." },
  { name: "Button — Destructive", category: "Actions", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "Delete / Reject actions. Not used on Websites." },
  { name: "Button Group", category: "Actions", platforms: ["web", "dashboard"], status: "v1", notes: "Paired actions, e.g. Save + Cancel, Approve / Reject inline." },
  { name: "Floating Action Button (FAB)", category: "Actions", platforms: ["mobile"], status: "post-v1", notes: "Single primary action per screen." },
  { name: "Action Menu", category: "Actions", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Kebab / overflow menu for row actions." },
  { name: "Bulk Action Bar", category: "Actions", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Appears when table rows are selected." },

  // Forms & Inputs
  { name: "Text Input", category: "Forms & Inputs", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "Label, helper text, error state, char count." },
  { name: "Password Input", category: "Forms & Inputs", platforms: ["mobile", "web"], status: "v1", notes: "Toggle show / hide." },
  { name: "Phone Number Input", category: "Forms & Inputs", platforms: ["mobile"], status: "v1", notes: "Country code selector; +94 default." },
  { name: "OTP Input", category: "Forms & Inputs", platforms: ["mobile"], status: "v1", notes: "6-cell, auto-advance, SMS autofill." },
  { name: "Textarea", category: "Forms & Inputs", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "Character count. Case notes on Dashboard." },
  { name: "Select / Dropdown", category: "Forms & Inputs", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "Native bottom sheet on mobile." },
  { name: "Combo Box (Searchable)", category: "Forms & Inputs", platforms: ["mobile", "web"], status: "v1", notes: "For long lists — district, service type." },
  { name: "Combo Box (Multi-select)", category: "Forms & Inputs", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Filter by category, status, ministry." },
  { name: "Checkbox", category: "Forms & Inputs", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "Row selection in Dashboard tables, consent on Websites." },
  { name: "Radio Button", category: "Forms & Inputs", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "" },
  { name: "Toggle / Switch", category: "Forms & Inputs", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "Feature flags, enable / disable on Dashboard." },
  { name: "Date Picker", category: "Forms & Inputs", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "Native wheel on iOS, calendar on Android, overlay on web." },
  { name: "Date Range Picker", category: "Forms & Inputs", platforms: ["web", "dashboard"], status: "v1", exclusive: true, notes: "Report date ranges on Dashboard (v1). Search/filter on Web (post-v1)." },
  { name: "Time Picker", category: "Forms & Inputs", platforms: ["web"], status: "post-v1", notes: "Appointment booking." },
  { name: "File Upload", category: "Forms & Inputs", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "Camera + gallery + document picker on mobile; drag & drop multi-file on web." },
  { name: "Search Input", category: "Forms & Inputs", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "Inline in nav bar on mobile; autocomplete on web; site search on Websites." },
  { name: "Input with Prefix / Suffix", category: "Forms & Inputs", platforms: ["mobile", "web"], status: "v1", notes: "E.g. currency prefix LKR, unit suffix kg." },
  { name: "Input Mask", category: "Forms & Inputs", platforms: ["mobile", "web"], status: "v1", notes: "NIC format, phone format." },
  { name: "Character Count", category: "Forms & Inputs", platforms: ["web"], status: "v1", notes: "GOV.UK pattern." },
  { name: "Form Fieldset / Group", category: "Forms & Inputs", platforms: ["mobile", "web"], status: "v1", notes: "Logical grouping for multi-field sections." },
  { name: "Error Summary", category: "Forms & Inputs", platforms: ["mobile", "web"], status: "v1", notes: "Top of form, lists all validation errors; anchor links to fields (GOV.UK pattern)." },
  { name: "Validation (Inline)", category: "Forms & Inputs", platforms: ["web"], status: "v1", notes: "Live field validation on blur." },
  { name: "Range Slider", category: "Forms & Inputs", platforms: ["dashboard"], status: "post-v1", notes: "Statistical threshold controls." },
  { name: "Search with Filters", category: "Forms & Inputs", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Global search + filter chips." },
  { name: "Filter Panel", category: "Forms & Inputs", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Sidebar or top bar — status, date, type filters." },
  { name: "Contact Form", category: "Forms & Inputs", platforms: ["websites"], status: "v1", notes: "Name, email, subject, message, submit." },
  { name: "Newsletter Signup", category: "Forms & Inputs", platforms: ["websites"], status: "post-v1", notes: "Email + consent checkbox." },
  { name: "Feedback Widget", category: "Forms & Inputs", platforms: ["websites"], status: "v1", exclusive: true, notes: "“Was this page helpful?” Yes/No + optional comment." },
  { name: "Cookie Consent", category: "Forms & Inputs", platforms: ["websites"], status: "v1", notes: "" },

  // Navigation
  { name: "Bottom Tab Bar", category: "Navigation", platforms: ["mobile"], status: "v1", notes: "5 tabs max; active icon Icon/Action (Gold/700); 48dp touch targets." },
  { name: "Top Navigation Bar", category: "Navigation", platforms: ["mobile", "web"], status: "v1", notes: "Centred title + back arrow on mobile; logo + links + language switcher on web." },
  { name: "Drawer / Side Menu", category: "Navigation", platforms: ["mobile"], status: "post-v1", notes: "Secondary or ministry-specific navigation." },
  { name: "Pull-to-Refresh", category: "Navigation", platforms: ["mobile"], status: "v1", notes: "Native gesture pattern." },
  { name: "Mobile Navigation (Hamburger)", category: "Navigation", platforms: ["web", "websites"], status: "v1", notes: "Collapses below 768px on web; full-screen overlay on Websites." },
  { name: "Breadcrumb", category: "Navigation", platforms: ["web", "dashboard", "websites"], status: "v1", notes: "Below top nav, current page last. Planned for mobile native." },
  { name: "Tabs / Tab Strip", category: "Navigation", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "Within-page section tabs on web." },
  { name: "Language Selector", category: "Navigation", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "සිංහල / தமிழ் / English — always rendered in its own script." },
  { name: "Skip Link", category: "Navigation", platforms: ["web", "dashboard", "websites"], status: "v1", notes: "Keyboard-only; jumps to main content." },
  { name: "Footer", category: "Navigation", platforms: ["web"], status: "v1", notes: "Ministry info, service links, copyright, accessibility statement." },
  { name: "Cookie Banner", category: "Navigation", platforms: ["web", "websites"], status: "v1", notes: "Per GDPR/PDPA; decline-first default." },
  { name: "Phase / Beta Banner", category: "Navigation", platforms: ["web"], status: "post-v1", notes: "“Beta” or “Pilot” indicator during rollout." },
  { name: "Sidebar Navigation", category: "Navigation", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Collapsible, hierarchical, active state, ministry logo." },
  { name: "Top Header Bar", category: "Navigation", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Logo, user avatar, notification bell, search." },
  { name: "Pagination", category: "Navigation", platforms: ["web", "dashboard", "websites"], status: "v1", notes: "For data tables and long lists." },
  { name: "In-page Navigation", category: "Navigation", platforms: ["dashboard", "websites"], status: "v1", notes: "Sticky left sidebar ToC on long pages (Websites, v1). Long-form case pages on Dashboard (post-v1)." },
  { name: "Masthead", category: "Navigation", platforms: ["websites"], status: "v1", exclusive: true, notes: "Gov.lk identity bar; SL coat of arms; language switcher." },
  { name: "Sticky Header", category: "Navigation", platforms: ["websites"], status: "v1", exclusive: true, notes: "Ministry logo + main nav; scrolls to compact." },
  { name: "Main Navigation", category: "Navigation", platforms: ["websites"], status: "v1", exclusive: true, notes: "Horizontal, max 7 top items, dropdown / mega-menu." },
  { name: "Rich Footer", category: "Navigation", platforms: ["websites"], status: "v1", exclusive: true, notes: "Ministry info, service links, social, copyright, accessibility." },
  { name: "Back to Top", category: "Navigation", platforms: ["websites"], status: "v1", exclusive: true, notes: "Fixed position; appears after scroll." },
  { name: "System / Announcement Banner", category: "Navigation", platforms: ["web", "websites"], status: "v1", notes: "Site-wide notice; maintenance / outage alert on web." },

  // Feedback & Status
  { name: "Notification Banner", category: "Feedback & Status", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "Success / Warning / Error / Info variants." },
  { name: "Toast / Snackbar", category: "Feedback & Status", platforms: ["mobile", "web"], status: "v1", notes: "Bottom of screen; auto-dismiss after 4s on mobile." },
  { name: "Alert Dialog", category: "Feedback & Status", platforms: ["mobile"], status: "v1", notes: "Blocking; requires user action." },
  { name: "Loading Spinner", category: "Feedback & Status", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "" },
  { name: "Skeleton Loader", category: "Feedback & Status", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "Content placeholder while loading." },
  { name: "Progress Bar", category: "Feedback & Status", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "Linear; multi-step forms and uploads." },
  { name: "Status Badge", category: "Feedback & Status", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "7 states on mobile/web; extended to 8 states on Dashboard (adds On Hold)." },
  { name: "Empty State", category: "Feedback & Status", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "Illustration slot, title, CTA." },
  { name: "Error State / Error Page", category: "Feedback & Status", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "Network / server error; 404 and 500 templates on web." },

  // Display & Data
  { name: "Service Card", category: "Display & Data", platforms: ["mobile", "web", "websites"], status: "v1", notes: "Icon + title + subtitle + status badge; wider layout on web; deep-links into Sewa on Websites." },
  { name: "Icon Card", category: "Display & Data", platforms: ["mobile"], status: "v1", notes: "Service category grid tile." },
  { name: "List Item", category: "Display & Data", platforms: ["mobile"], status: "v1", notes: "Leading icon, title, subtitle, trailing icon/badge." },
  { name: "Summary List", category: "Display & Data", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "Read-only label : value pairs for review screens." },
  { name: "Description List", category: "Display & Data", platforms: ["dashboard"], status: "v1", notes: "Compact key-value pairs." },
  { name: "Step Indicator / Stepper", category: "Display & Data", platforms: ["mobile", "web"], status: "v1", notes: "Multi-step form progress; horizontal on web." },
  { name: "Process List", category: "Display & Data", platforms: ["mobile", "web", "websites"], status: "v1", notes: "How-to / what happens next; USWDS-style numbered steps." },
  { name: "Accordion", category: "Display & Data", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "FAQ, collapsible detail." },
  { name: "Tag / Chip", category: "Display & Data", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "Status, category, filter." },
  { name: "Avatar", category: "Display & Data", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "User photo or initials fallback; person card on Websites." },
  { name: "Divider", category: "Display & Data", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "" },
  { name: "Tooltip", category: "Display & Data", platforms: ["mobile", "web", "dashboard"], status: "v1", notes: "Long-press or info icon on mobile; hover + focus on web." },
  { name: "Simple Table", category: "Display & Data", platforms: ["web", "websites"], status: "v1", notes: "Non-sortable, read-only static data." },
  { name: "Collection / News Card", category: "Display & Data", platforms: ["web"], status: "v1", notes: "Article list." },
  { name: "Inset Text", category: "Display & Data", platforms: ["web"], status: "v1", notes: "GOV.UK callout / note box." },
  { name: "Warning Text", category: "Display & Data", platforms: ["web"], status: "v1", notes: "GOV.UK important notice pattern." },
  { name: "Callout / Summary Box", category: "Display & Data", platforms: ["web"], status: "v1", notes: "Key information highlighted." },
  { name: "Panel", category: "Display & Data", platforms: ["web"], status: "v1", notes: "GOV.UK success panel (application complete)." },

  // Overlays
  { name: "Bottom Sheet", category: "Overlays", platforms: ["mobile"], status: "v1", notes: "Primary overlay pattern on mobile." },
  { name: "Modal / Dialog", category: "Overlays", platforms: ["mobile", "web", "dashboard", "websites"], status: "v1", notes: "Full-screen on mobile for critical actions; confirm / form-in-modal on Dashboard; media on Websites." },
  { name: "Drawer / Side Panel", category: "Overlays", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Case detail without a page change." },
  { name: "Popover", category: "Overlays", platforms: ["web", "dashboard"], status: "v1", notes: "Rich tooltip for help text — post-v1 on web, v1 on Dashboard for complex fields." },
  { name: "Confirmation Dialog", category: "Overlays", platforms: ["dashboard"], status: "v1", notes: "Approve / Reject / Delete confirmation." },

  // Layout
  { name: "Dashboard Grid", category: "Layout", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "KPI card rows + chart rows." },
  { name: "Sidebar + Main Layout", category: "Layout", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Fixed sidebar; scrollable main." },
  { name: "Full-width Table View", category: "Layout", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Collapsed sidebar; table uses full width." },
  { name: "Card Grid", category: "Layout", platforms: ["dashboard"], status: "v1", notes: "" },

  // Data & Analytics
  { name: "Data Table", category: "Data & Analytics", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Sortable columns, row selection, sticky header, pagination." },
  { name: "Data Table — Filterable", category: "Data & Analytics", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Column filters." },
  { name: "Data Table — Exportable", category: "Data & Analytics", platforms: ["dashboard"], status: "post-v1", notes: "CSV / Excel export." },
  { name: "KPI / Stat Card", category: "Data & Analytics", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Large number + trend + label." },
  { name: "Bar Chart", category: "Data & Analytics", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Horizontal and vertical; uses DataViz tokens." },
  { name: "Line Chart", category: "Data & Analytics", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Time series." },
  { name: "Pie / Donut Chart", category: "Data & Analytics", platforms: ["dashboard"], status: "post-v1", notes: "Proportional breakdown." },
  { name: "Data Visualisation (Generic)", category: "Data & Analytics", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Container + legend + axis." },
  { name: "Activity Feed / Timeline", category: "Data & Analytics", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Case history, audit log." },
  { name: "Calendar View", category: "Data & Analytics", platforms: ["dashboard"], status: "post-v1", notes: "Appointment management." },

  // Workflow & Case Management
  { name: "Workflow Status Bar", category: "Workflow & Case Management", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Horizontal stepper showing case stage." },
  { name: "Approval Action Panel", category: "Workflow & Case Management", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Approve / Reject / Escalate with mandatory comment." },
  { name: "Comment Thread", category: "Workflow & Case Management", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Officer notes on a case." },
  { name: "Case History", category: "Workflow & Case Management", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "Chronological audit trail." },
  { name: "Priority Indicator", category: "Workflow & Case Management", platforms: ["dashboard"], status: "v1", exclusive: true, notes: "High / Medium / Low label." },
  { name: "Notification Centre", category: "Workflow & Case Management", platforms: ["dashboard"], status: "post-v1", exclusive: true, notes: "Bell dropdown; unread count." },

  // Hero & Banners
  { name: "Hero Banner", category: "Hero & Banners", platforms: ["websites"], status: "v1", exclusive: true, notes: "Full-width; image / video background; headline + CTA; overlay scrim." },
  { name: "Campaign Hero", category: "Hero & Banners", platforms: ["websites"], status: "post-v1", exclusive: true, notes: "Seasonal / event hero with bold colour background." },
  { name: "Announcement Banner", category: "Hero & Banners", platforms: ["websites"], status: "v1", exclusive: true, notes: "Below hero; time-sensitive news." },

  // Content Blocks
  { name: "Rich Text Block", category: "Content Blocks", platforms: ["websites"], status: "v1", exclusive: true, notes: "CMS body copy — headings, lists, links, tables." },
  { name: "Image + Text", category: "Content Blocks", platforms: ["websites"], status: "v1", exclusive: true, notes: "Alternating layout; image left or right." },
  { name: "Pull Quote / Blockquote", category: "Content Blocks", platforms: ["websites"], status: "v1", exclusive: true, notes: "Gold left border; large type." },
  { name: "Statistics Highlight", category: "Content Blocks", platforms: ["websites"], status: "v1", exclusive: true, notes: "Large number + label, e.g. “2.4M citizens served”." },
  { name: "Call to Action Block", category: "Content Blocks", platforms: ["websites"], status: "v1", exclusive: true, notes: "Section with headline + primary + secondary buttons." },
  { name: "Icon List", category: "Content Blocks", platforms: ["websites"], status: "v1", notes: "Feature / benefit list with icons." },
  { name: "Callout / Inset Text", category: "Content Blocks", platforms: ["websites"], status: "v1", notes: "Important note, non-critical info." },
  { name: "Warning / Notice Text", category: "Content Blocks", platforms: ["websites"], status: "v1", notes: "Critical notice." },
  { name: "Numbered / Bullet List", category: "Content Blocks", platforms: ["websites"], status: "v1", notes: "" },
  { name: "Table (Simple)", category: "Content Blocks", platforms: ["websites"], status: "v1", notes: "Static data display." },

  // Cards & Collections
  { name: "News / Article Card", category: "Cards & Collections", platforms: ["websites"], status: "v1", exclusive: true, notes: "Thumbnail + date + headline + excerpt." },
  { name: "Event Card", category: "Cards & Collections", platforms: ["websites"], status: "v1", exclusive: true, notes: "Date block + title + location + CTA." },
  { name: "Minister / Person Card", category: "Cards & Collections", platforms: ["websites"], status: "post-v1", exclusive: true, notes: "Photo + name + title." },
  { name: "Document Download Card", category: "Cards & Collections", platforms: ["websites"], status: "v1", exclusive: true, notes: "File icon + name + size + download button." },
  { name: "Related Links Card", category: "Cards & Collections", platforms: ["websites"], status: "v1", exclusive: true, notes: "Simple list of links with chevrons." },
  { name: "Image Card", category: "Cards & Collections", platforms: ["websites"], status: "v1", exclusive: true, notes: "Photo with caption overlay." },
  { name: "Thumbnail Card", category: "Cards & Collections", platforms: ["websites"], status: "post-v1", exclusive: true, notes: "Small media card for galleries." },

  // Media
  { name: "Responsive Image", category: "Media", platforms: ["websites"], status: "v1", notes: "With caption and alt text." },
  { name: "Image Gallery", category: "Media", platforms: ["websites"], status: "post-v1", exclusive: true, notes: "Grid → lightbox modal." },
  { name: "Video Embed", category: "Media", platforms: ["websites"], status: "post-v1", exclusive: true, notes: "YouTube / Vimeo; privacy-respecting." },
  { name: "Map Embed", category: "Media", platforms: ["websites"], status: "post-v1", exclusive: true, notes: "Office location." },

  // Lists & Data
  { name: "Document List", category: "Lists & Data", platforms: ["websites"], status: "v1", exclusive: true, notes: "Downloadable files with metadata." },
  { name: "Timeline", category: "Lists & Data", platforms: ["websites"], status: "post-v1", exclusive: true, notes: "Policy history, key milestones." },
  { name: "Tag / Keyword List", category: "Lists & Data", platforms: ["websites"], status: "v1", notes: "Article categories." },
];

export const components: ComponentEntry[] = raw.map((c) => ({ ...c, slug: slugify(c.name) }));

export function getComponentBySlug(slug: string): ComponentEntry | undefined {
  return components.find((c) => c.slug === slug);
}

export const componentCounts = {
  total: components.length,
  v1: components.filter((c) => c.status === "v1").length,
  postV1: components.filter((c) => c.status === "post-v1").length,
};
