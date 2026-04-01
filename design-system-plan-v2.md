# Design System — Complete Build Plan for Claude Code
# Version 2 — Supersedes design-system-claude-code-plan.md

---

## How to Read This Document

Every item is tagged:
- `[v0.1]` — Must ship before any public release. Non-negotiable.
- `[v0.2]` — Ship in second release. Important but not blocking.
- `[deferred]` — Explicitly out of scope until community demand warrants it.

Do not implement deferred items. Do not skip v0.1 items to get to v0.2.

---

## Stack (Locked — See ADR-001 through ADR-008)

| Layer | Tool | Version |
|---|---|---|
| Monorepo | pnpm workspaces | latest |
| Components | React + TypeScript | React 19, TS 5.x |
| Styling | CSS custom properties | native |
| Token pipeline | Style Dictionary | v4 |
| Component explorer | Storybook | v8 |
| Docs site | Astro | v5 |
| MCP server | Node.js + `@modelcontextprotocol/sdk` | latest |
| Unit tests | Vitest + Testing Library | latest |
| A11y tests | axe-core via vitest-axe | latest |
| Visual regression | Playwright | latest |
| Linting | ESLint + custom `eslint-plugin-arch` | latest |
| Versioning | changesets | latest |
| Task tracking | Beads (`bd`) | latest |

---

## Monorepo Structure

```
design-system/
├── packages/
│   ├── tokens/                  # Style Dictionary source + all outputs
│   ├── components/              # React component library
│   ├── icons/                   # SVG icon set + React wrappers
│   ├── mcp-server/              # MCP server for agent consumption
│   └── eslint-plugin-arch/        # Custom lint rules
├── apps/
│   ├── docs/                    # Astro documentation site
│   └── storybook/               # Storybook component explorer
├── decisions/                   # ADR folder
├── docs/                        # Internal build docs (not the public site)
├── .github/workflows/           # CI/CD
├── CLAUDE.md                    # Agent operating manual
├── AGENTS.md                    # Alias — same content as CLAUDE.md for other agents
├── llms.txt                     # Agent entry point (public)
├── pnpm-workspace.yaml
└── README.md
```

---

## Phase 0 — Repository Scaffold `[v0.1]`

### 0.1 — Init

```bash
mkdir design-system && cd design-system
git init
pnpm init
```

`pnpm-workspace.yaml`:
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

Root scripts: `dev`, `build`, `test`, `lint`, `tokens:build`, `changeset`.

### 0.2 — ESLint + Prettier

Configure at root. All packages inherit. No warnings — everything error or off. Add `eslint-plugin-arch` as a local package from the start even if rules are empty — the import chain needs to exist.

### 0.3 — TypeScript

Single `tsconfig.base.json` at root. Each package extends it. Strict mode on. No implicit any. No unused variables.

### 0.4 — CLAUDE.md and AGENTS.md

Copy `/docs/CLAUDE.md` to repo root. Create `AGENTS.md` as a symlink or identical copy — some agent tools look for AGENTS.md, others CLAUDE.md.

Add to CLAUDE.md (append, do not replace):
```
Reference documents:
- /docs/token-naming.md — before touching any token
- /docs/versioning-and-breaking-changes.md — before any rename or removal
- /docs/testing-strategy.md — before marking any component done
- /docs/session-handoff-protocol.md — start and end of every session
- /docs/accessibility-guidelines.md — before writing any component
- /decisions/README.md — before making any architectural decision
```

### 0.5 — Beads init

```bash
bd init
echo "Use 'bd' for task tracking. Run 'bd quickstart' at session start." >> CLAUDE.md
```

Create Beads epics from this document's phases before starting any implementation.

### 0.6 — CI

`.github/workflows/ci.yml`: runs on every PR. Steps: install, lint, tokens:build, test, build. Must pass before merge.

`.github/workflows/publish.yml`: runs on merge to main. Uses changesets to version and publish packages.

---

## Phase 1 — Token Package `[v0.1]` `packages/tokens`

Read `/docs/token-naming.md` before creating any token.

### 1.1 — Directory Structure

```
packages/tokens/src/
├── primitive/
│   ├── color.json
│   ├── spacing.json
│   ├── radius.json
│   ├── typography.json
│   ├── shadow.json
│   ├── motion.json
│   ├── z-index.json
│   └── border-width.json
├── semantic/
│   ├── color.json           # Light mode defaults
│   ├── color-dark.json      # Dark mode overrides
│   ├── color-hc.json        # High contrast overrides [v0.2]
│   ├── spacing.json
│   ├── radius.json
│   ├── typography.json
│   ├── shadow.json
│   ├── motion.json
│   ├── z-index.json
│   └── border-width.json
└── component/
    └── [one file per component]
```

### 1.2 — Primitive Tokens (Seed Values)

**Color** — Full scale for: gray (50–950), blue, green, red, yellow, orange, purple, teal. Each step as hex. 10 steps minimum per hue.

**Spacing** — Steps: 0, 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128. Stored as numbers (px value without unit).

**Radius** — none (0), xs (2), sm (4), md (8), lg (12), xl (16), 2xl (24), full (9999). In px.

**Typography** — Font families: sans, mono, serif (optional). Sizes: 11, 12, 13, 14, 15, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64. Weights: 400, 500, 600, 700, 800. Line heights: none (1), tight (1.2), snug (1.375), normal (1.5), relaxed (1.625), loose (2). Letter spacing: tighter, tight, normal, wide, wider.

**Shadow** — xs, sm, md, lg, xl, 2xl, inner. Each as a full box-shadow value.

**Motion** — Durations: instant (0ms), fast (100ms), normal (200ms), slow (300ms), slower (500ms). Easings: linear, ease-in, ease-out, ease-in-out, spring, bounce.

**Z-index** — hide (-1), base (0), raised (10), dropdown (100), sticky (200), overlay (300), modal (400), popover (500), toast (600), tooltip (700).

**Border width** — none (0), thin (1px), medium (2px), thick (4px).

### 1.3 — Semantic Tokens (Light Mode)

**Color — background**
`default`, `subtle`, `muted`, `inverse`, `disabled`, `overlay`

**Color — text**
`default`, `subtle`, `placeholder`, `disabled`, `inverse`, `link`, `link-visited`, `link-hover`, `danger`, `success`, `warning`, `info`

**Color — action**
`primary`, `primary-hover`, `primary-active`, `primary-text`
`secondary`, `secondary-hover`, `secondary-active`, `secondary-text`
`ghost`, `ghost-hover`, `ghost-active`, `ghost-text`
`destructive`, `destructive-hover`, `destructive-active`, `destructive-text`

**Color — border**
`default`, `subtle`, `strong`, `focus`, `danger`, `success`, `warning`, `disabled`

**Color — feedback**
`danger-bg`, `danger-text`, `danger-border`
`success-bg`, `success-text`, `success-border`
`warning-bg`, `warning-text`, `warning-border`
`info-bg`, `info-text`, `info-border`

**Color — surface**
`base`, `raised`, `overlay`, `sunken`

**Color — icon**
`default`, `subtle`, `disabled`, `inverse`, `danger`, `success`, `warning`, `info`

**Spacing — layout** (for page-level spacing)
`page-gutter`, `section-gap`, `content-gap`

**Spacing — component** (for inside components)
`xs`, `sm`, `md`, `lg`, `xl`

**Spacing — inline** (for text/inline spacing)
`xs`, `sm`, `md`, `lg`

**Typography — scale** (complete named scale)
`display-2xl`, `display-xl`, `display-lg`, `display-md`, `display-sm`
`text-xl`, `text-lg`, `text-md`, `text-sm`, `text-xs`
`code-md`, `code-sm`

Each scale item has: `font-size`, `line-height`, `font-weight` default, `letter-spacing`

**Z-index** — semantic aliases: `dropdown`, `sticky`, `overlay`, `modal`, `popover`, `toast`, `tooltip`

### 1.4 — Dark Mode Tokens

`color-dark.json` overrides every semantic color token for dark mode. Outputs as `[data-theme="dark"]` CSS block. Light mode is the default (no selector).

### 1.5 — High Contrast Tokens `[v0.2]`

`color-hc.json` overrides for Windows High Contrast and forced-colors mode. Outputs as `@media (forced-colors: active)` block.

### 1.6 — Motion: Reduced Motion `[v0.1]`

All motion tokens must have a reduced-motion variant. The CSS output must include:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-duration-fast: 0ms;
    --motion-duration-normal: 0ms;
    --motion-duration-slow: 0ms;
    --motion-duration-slower: 0ms;
  }
}
```

This is not optional. Every animation in the system stops when the user has requested reduced motion.

### 1.7 — RTL Support `[v0.1]`

The token system must use CSS logical properties throughout. This means: component CSS must never use `left`, `right`, `margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-left`, `border-right`. Use `inline-start`, `inline-end`, `margin-inline-start`, `margin-inline-end` etc.

Add a lint check to `eslint-plugin-arch`: `arch/no-physical-properties` — errors on left/right directional CSS properties in component files. Exception: `border-left` used as a visual accent (e.g. a left border on a card) is allowed with an inline comment `/* intentional: visual accent */`.

RTL is activated by `dir="rtl"` on the html element. No token changes needed — CSS logical properties handle it automatically.

### 1.8 — Style Dictionary Config

Three output formats:
1. **CSS** → `build/css/tokens.css` with `[data-theme="dark"]` block
2. **JSON** → `build/json/tokens.json` with full alias chain preserved (not just resolved values)
3. **TypeScript** → `build/ts/tokens.ts` with typed constants

### 1.9 — Brand Template

`build/css/brand-template.css` — semantic tokens only, all values blank, every line commented with where it is used. This is what brands fill in to customise the system.

### 1.10 — Validation Script

`scripts/validate.ts` — validates alias chains, no hardcoded values in semantic/component layer, CSS and JSON output are in sync. Runs as part of `tokens:build`.

### 1.11 — Package Exports

```json
{
  "exports": {
    "./css": "./build/css/tokens.css",
    "./brand-template": "./build/css/brand-template.css",
    "./json": "./build/json/tokens.json",
    "./ts": "./build/ts/tokens.ts"
  }
}
```

---

## Phase 2 — Icon Package `[v0.1]` `packages/icons`

### 2.1 — Icon System Spec

All icons are SVG. Grid: 20×20px default. Additional sizes: 16×16, 24×24. Stroke weight: 1.5px at 20px size. Style: outlined, not filled (except filled variants for active/selected states).

Naming convention: `[noun]-[modifier?]` all lowercase kebab. Examples: `arrow-right`, `arrow-left`, `chevron-up`, `check`, `x`, `search`, `user`, `settings`, `trash`, `edit`, `plus`, `minus`, `info`, `warning`, `check-circle`, `x-circle`.

### 2.2 — v0.1 Icon Set (Minimum)

These must be in v0.1 — they are used by other components:

**Directional:** arrow-up, arrow-down, arrow-left, arrow-right, chevron-up, chevron-down, chevron-left, chevron-right

**Actions:** check, x (close), plus, minus, edit, trash, copy, external-link, download, upload, search, filter

**Status:** info, warning, check-circle, x-circle, alert-triangle

**UI:** eye, eye-off, lock, unlock, user, users, settings, menu, more-horizontal, more-vertical, calendar, clock, star, heart, bookmark

**Media:** image, file, folder

RTL: icons that imply direction (arrow-left, arrow-right, chevron-left, chevron-right, external-link) must flip in RTL. Use `[dir="rtl"] { transform: scaleX(-1); }` or CSS logical transforms.

### 2.3 — React Wrappers

Each icon is a React component accepting: `size` (16 | 20 | 24, default 20), `color` (defaults to currentColor), `aria-label` (required for standalone use), `className`.

Icons used decoratively: `aria-hidden="true"` by default when used inside a labelled parent.

---

## Phase 3 — Layout Primitives `[v0.1]` `packages/components`

Layout primitives are not styled components — they are composable layout utilities. They use CSS custom properties for spacing tokens only. No visual styling.

### Box
Generic container with token-based padding, margin, background, border, radius, shadow. All as props mapped to tokens. This is the foundation of every other component's layout. Accept all semantic token names as prop values.

```tsx
<Box padding="spacing-component-md" background="color-surface-raised" radius="radius-component-md">
  ...
</Box>
```

### Stack
Vertical flex layout. Props: `gap` (spacing token), `align` (flex align-items), `justify` (flex justify-content), `direction` (column | column-reverse).

### Inline
Horizontal flex layout. Props: `gap`, `align`, `justify`, `wrap` (boolean). Inline components wrap naturally, Stack never does.

### Grid
CSS Grid wrapper. Props: `columns` (1–12 or "auto"), `gap`, `rowGap`, `colGap`. Responsive via `columns` accepting an object: `{ base: 1, md: 2, lg: 3 }`. Uses CSS container queries not viewport breakpoints — this makes components work inside any container.

### VisuallyHidden `[v0.1]`
Hides content visually but keeps it accessible to screen readers. Used for icon labels, skip links, and supplementary context. Zero props beyond `children` and `as`.

### SkipNav `[v0.1]`
Skip-to-main-content link that appears on first tab. Required for keyboard accessibility. Must be the first focusable element in the document.

---

## Phase 4 — Core Components `[v0.1]` `packages/components`

Every component in this phase requires: TSX, CSS (tokens only), manifest JSON, unit tests, a11y tests. No exceptions. Do not mark a component complete until all four exist and pass.

Write manifest before TSX. Read `/docs/accessibility-guidelines.md` before writing any component.

### Typography

**Text**
Renders paragraph or span. Props: `size` (text-xl through text-xs), `weight`, `color` (semantic text token), `truncate` (boolean), `as` (p | span | div | label | etc.). Default: text-md, regular weight, text-default color.

**Heading**
Renders h1–h6. Props: `level` (1–6, controls the HTML element), `size` (display-2xl through text-xl — can be independent of level for visual hierarchy), `weight`, `color`. Never hardcode h1–h6 styles — use the `level` prop.

**Code**
Inline code and code block. Props: `block` (boolean — renders pre+code vs inline code), `language` (for syntax hint, not highlighting — keep it simple), `size`.

**Link**
Anchor tag. Props: `href`, `external` (boolean — adds aria-label and icon), `variant` (default | subtle | inverse). All external links open in same tab by default — let the consumer decide target.

### Form Elements

**FormControl** `[v0.1]`
Wrapper that connects a label, form element, helper text, and error message with the correct ARIA attributes. All form inputs should be used inside FormControl. Props: `id` (auto-generated if not provided), `required`, `disabled`, `invalid`.

**FormLabel** — renders label. Connected to input via FormControl context.
**FormHelperText** — renders helper text. Connected via aria-describedby.
**FormErrorMessage** — renders error message. Replaces helper text when invalid. Connected via aria-describedby.

**Button**
Variants: primary, secondary, ghost, destructive, link. Sizes: sm, md, lg. States: default, hover, focus, active, disabled, loading. Loading state shows Spinner and disables the button. Props: `leftIcon`, `rightIcon`, `fullWidth`, `loading`, `loadingText`. Always renders a `<button>` — if you need a link styled as a button, use the `as` prop.

**IconButton**
Icon-only button. Requires `aria-label` — error without it. Same variants and sizes as Button.

**Input**
Types: text, email, password, number, search, url, tel. States: default, focus, error, disabled, readonly. Props: `leftElement` (icon slot), `rightElement` (icon or action slot), `size` (sm, md, lg).

**Textarea**
States: same as Input. Props: `rows`, `resize` (none | vertical | both), `autoResize` (boolean — grows with content).

**Checkbox**
States: unchecked, checked, indeterminate, disabled. Always renders a real `<input type="checkbox">` for accessibility. The visual element is overlaid via CSS.

**CheckboxGroup**
Groups checkboxes. Renders a fieldset + legend. Props: `legend` (required), `direction` (horizontal | vertical).

**Radio**
Single radio button. Always used inside RadioGroup.

**RadioGroup**
Groups radios. Renders fieldset + legend. Props: `legend` (required), `direction` (horizontal | vertical), `value`, `onChange`.

**Toggle / Switch**
On/off. Renders as `<input type="checkbox" role="switch">`. States: on, off, disabled. Must show on/off state without relying on color alone (position of thumb is the signal).

**Select**
Native `<select>` element styled consistently. Props: `placeholder`, `multiple`, `size`. Do not use custom dropdown for Select — use Dropdown for that. This is the accessible default.

**Slider / Range** `[v0.1]`
Single value and range (two handles). Renders `<input type="range">` under the hood. Props: `min`, `max`, `step`, `value`, `onChange`. Keyboard: arrow keys. Screen reader: announces current value.

**FileUpload** `[v0.1]`
File input with drag-and-drop zone. Props: `accept`, `multiple`, `maxSize`. States: default, dragover, error, uploading. Renders a real `<input type="file">` — the drag zone is a label wrapping it.

### Display Components

**Badge**
Inline label for status or count. Variants: neutral, info, success, warning, danger. Sizes: sm, md. Props: `dot` (boolean — shows dot instead of text for compact display). When showing only a dot, requires `aria-label`.

**Tag**
Removable label. Props: `onRemove` (renders X button when provided), `icon`, `variant`. When removable, X button requires aria-label.

**Avatar**
Image with initials fallback. Sizes: xs (24), sm (32), md (40), lg (48), xl (64), 2xl (96). Props: `src`, `name` (used for initials and alt text), `shape` (circle | square). AvatarGroup stacks multiple avatars with overflow count.

**AvatarGroup**
Wraps multiple Avatars. Props: `max` (number — shows +N for overflow), `size`.

**Divider**
Horizontal (default) or vertical. Props: `orientation`, `label` (optional — renders text in center of divider with decorative lines either side).

### Feedback Components

**Spinner**
Loading indicator. Sizes: xs, sm, md, lg. Must have `aria-label` or `aria-labelledby`. Does not animate when `prefers-reduced-motion` is set.

**Skeleton**
Placeholder for loading content. Variants: text, circular, rectangular. Props: `width`, `height`, `animated` (boolean — off when prefers-reduced-motion). Use to show shape of content before it loads.

**ProgressBar**
Linear progress. Props: `value` (0–100), `indeterminate` (boolean), `size` (sm | md), `label` (accessible label). role="progressbar" with correct aria attributes.

**ProgressSteps**
Step indicator for multi-step flows. Props: `steps` (array of step objects), `currentStep`, `orientation` (horizontal | vertical). Each step: completed, current, upcoming states.

### Overlay Components

**Tooltip**
Non-interactive supplementary content. Positions: top, right, bottom, left with auto-flip. Delay: 300ms on show, 0ms on hide. Must not contain interactive elements — use Popover for that. Triggered by hover and focus.

**Popover**
Interactive overlay. Positions: same as Tooltip. Contains focusable content. Closes on Escape and outside click. Focus is managed — on open focus moves inside, on close focus returns to trigger.

**Modal**
Full overlay dialog. Props: `size` (sm | md | lg | xl | full). Slots: header, body, footer. Focus trap required. Scroll lock on body. Escape closes. Backdrop click closes (configurable). aria-modal="true", role="dialog", aria-labelledby pointing to header.

**Drawer**
Slides in from side. Directions: left, right, top, bottom. Same focus management as Modal. Props: `size` (width/height as token values).

**Overlay / Blanket** `[v0.1]`
Semi-transparent backdrop. Used by Modal and Drawer. Can be used standalone. Props: `transparent` (boolean). Manages z-index via z-index tokens.

### Navigation Components

**Breadcrumbs**
Props: `items` (array of {label, href}), `separator` (icon or character, default "/"). Last item is current page — aria-current="page". Full aria-label="Breadcrumb" on nav element.

**Tabs**
Props: `tabs` (array of {label, value, content, disabled}), `variant` (line | enclosed | soft-rounded), `orientation` (horizontal | vertical). ARIA: role="tablist", role="tab", role="tabpanel", aria-selected, aria-controls.

**Pagination**
Props: `totalPages`, `currentPage`, `onChange`, `showFirstLast` (boolean), `siblingCount` (how many pages to show around current). ARIA: role="navigation" with aria-label="Pagination".

**Link** (see Typography section above — it is both a typography and navigation component)

### Content Components

**Accordion**
Collapsible sections. Props: `items` (array of {title, content}), `allowMultiple` (boolean), `defaultExpanded`. ARIA: role="region" for each panel, aria-expanded, aria-controls. Animated expand/collapse respecting prefers-reduced-motion.

**Card**
Surface container. Props: `clickable` (boolean — makes entire card a button or link), `padding` (spacing token). Slots: header, body, footer. When clickable: role="button" or wraps an anchor — never use div with onClick.

**List**
Ordered and unordered lists with consistent token-based spacing. Variants: bullet, number, none (unstyled). ListItem component. Also: DescriptionList (dl/dt/dd) for key-value display.

**Table** `[v0.1]`
Semantic HTML table. Props: `caption` (required — used as aria-label), `striped`, `bordered`, `size` (sm | md). Components: Table, Thead, Tbody, Tfoot, Tr, Th, Td. Th requires scope attribute.

**Alert / Notification** `[v0.1]`
Inline feedback message. Variants: info, success, warning, danger. Props: `title`, `description`, `onClose` (renders X button when provided), `icon` (defaults to variant icon). role="alert" for danger/warning, role="status" for success/info.

**Banner** `[v0.1]`
Full-width top-of-page message. Same variants as Alert. Renders above page content. Dismissible.

**Toast**
Transient notification. Variants: default, success, warning, danger. Props: `duration` (ms, default 5000, 0 = persistent), `position` (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left). Rendered in a portal. aria-live="polite" for non-critical, aria-live="assertive" for danger. Toast manager: `useToast()` hook for imperative API.

### Utility Components

**Portal** `[v0.1]`
Renders children into a different DOM node (default: document.body). Used by Modal, Drawer, Toast, Popover. Props: `container` (DOM element or ref).

**FocusTrap** `[v0.1]`
Constrains keyboard focus within a container. Used by Modal and Drawer. Props: `active`, `restoreFocus` (boolean — returns focus to trigger on deactivate).

**SkipNav** — see Phase 3 Layout Primitives.

**VisuallyHidden** — see Phase 3 Layout Primitives.

---

## Phase 5 — Composite Components `[v0.2]`

These ship after v0.1 is stable. Do not start until all v0.1 components have passing tests and visual regression baselines.

**Combobox / Autocomplete**
Input + dropdown with filtering. Built from Input + Popover + a scrollable list. Supports: single and multi-select, async options, custom option rendering. ARIA: role="combobox", role="listbox", aria-autocomplete.

**DatePicker**
Calendar picker. Built from Input + Popover + a Calendar grid. Props: `value`, `onChange`, `minDate`, `maxDate`, `disabledDates`, `locale`. Keyboard: arrow keys navigate grid, Enter selects. ARIA: role="dialog" for popover, grid role for calendar.

**TimePicker**
Time input. Props: `value`, `onChange`, `format` (12h | 24h), `step` (minutes).

**ColorPicker** `[deferred]`
Too complex for v0.1 or v0.2. Revisit when there is demand.

**DataTable**
Sortable, filterable, paginated table. Built from Table + Pagination + Input (for search) + Select (for filters). Props: `columns`, `data`, `sortable`, `filterable`, `selectable`, `pagination`. ARIA: aria-sort on sortable columns.

**CommandPalette**
Search + actions overlay. Props: `commands` (array of {label, group, action, shortcut}), `placeholder`. Opens on Cmd+K by default (configurable). ARIA: role="combobox".

**NavigationBar / AppBar**
Top navigation. Slots: logo, nav links, actions. Responsive: collapses to hamburger menu below breakpoint.

**SideNavigation**
Vertical nav with nested sections. Props: `items` (tree structure), `collapsed` (boolean). ARIA: role="navigation" with aria-label.

**TreeView**
Hierarchical list. Props: `nodes` (tree), `selectable`, `multiSelect`, `expandAll`. ARIA: role="tree", role="treeitem", aria-expanded.

**DragAndDropList**
Reorderable list. Built on browser drag API with keyboard alternative (Space to grab, arrows to move, Space to drop). ARIA: aria-grabbed, aria-dropeffect.

**Rating**
Star or icon rating. Props: `value`, `max`, `onChange`, `readOnly`. Renders as a radio group under the hood for accessibility.

**InlineEdit**
Click-to-edit inline text field. Renders as text until clicked, then becomes an Input. Props: `value`, `onConfirm`, `onCancel`.

**Tour / Onboarding Steps**
Guided overlay sequence. Props: `steps` (array of {target, title, content, position}), `onComplete`. Built from Popover.

**EmptyState**
Pattern for zero-data views. Props: `icon`, `title`, `description`, `action` (Button). Not a component per se — a pattern using existing components, but standardised.

---

## Phase 6 — Accessibility Foundations `[v0.1]`

### Create `/docs/accessibility-guidelines.md`

This document is read by Claude Code before every component is written. It must cover:

**Required for every interactive component:**
- Correct ARIA role
- All interactive states communicated via aria attributes (not just visually)
- Keyboard interaction pattern (tab, enter, space, escape, arrow keys where applicable)
- Focus visible style (use `color-border-focus` token, minimum 3:1 contrast ratio)
- Touch target minimum size: 44×44px for any interactive element

**Required for every component:**
- Does not rely on colour alone to communicate state — always combine with icon, text, or pattern
- Supports `prefers-reduced-motion` — no animation when set
- Text meets WCAG AA contrast: 4.5:1 for body text, 3:1 for large text (18px+ or 14px+ bold)
- Non-text contrast meets 3:1 (borders, icons, UI components)

**Required for form elements:**
- Visible label (not just placeholder)
- Error message is announced via aria-live or aria-describedby
- Required fields marked with aria-required="true" and visually
- Invalid fields marked with aria-invalid="true"

**Keyboard patterns reference:**
- Dialog: Tab cycles within, Escape closes, focus returns to trigger
- Tooltip: Escape closes when focused
- Combobox: Arrow keys navigate list, Enter selects, Escape closes
- Tabs: Arrow keys navigate tabs, Tab moves into panel
- Accordion: Enter/Space toggle, arrow keys move between headers
- Menu: Arrow keys navigate items, Escape closes, Tab moves out

**Testing requirements:**
- axe-core passes with zero violations
- Manual keyboard test: all functionality reachable without mouse
- Screen reader test (VoiceOver/NVDA): state changes announced correctly

### Create `/docs/content-guidelines.md` `[v0.2]`

Voice and tone for component text: labels, error messages, empty states, loading messages. Placeholder text conventions. Capitalisation rules. Error message format: what went wrong + how to fix it.

---

## Phase 7 — Internationalisation `[v0.2]`

All user-facing strings in components must be externalisable. No hardcoded English strings inside components.

Implementation:
- Each component that has user-visible strings accepts a `labels` prop for overrides
- Default labels are in English — stored in a constants file per component, not inline
- Example: `Spinner` accepts `labels={{ loading: 'Loading...' }}`
- Example: `Modal` accepts `labels={{ close: 'Close dialog' }}`
- Example: `Pagination` accepts `labels={{ previous: 'Previous', next: 'Next', page: 'Page' }}`

RTL: handled by CSS logical properties (see Phase 1.7). No JavaScript needed.

Date/time formatting: DatePicker accepts a `locale` prop. Pass through to `Intl.DateTimeFormat` — do not build a custom formatter.

---

## Phase 8 — MCP Server `[v0.1]` `packages/mcp-server`

### 8.1 — Setup

```bash
pnpm add @modelcontextprotocol/sdk
```

Entry: `src/index.ts`. stdio transport. Reads data at startup from:
- `packages/tokens/build/json/tokens.json`
- All `*.manifest.json` files in `packages/components/src/`

### 8.2 — Tools

**`get_component`**
Input: `{ name: string }`
Output: complete manifest + ready-to-use code example
Error: list closest matches by Levenshtein distance if not found

**`find_component`**
Input: `{ intent: string }`
Output: ranked matches `[{ name, description, confidence, category }]`
Logic: match against name, description, category, and usage.do strings

**`list_components`**
Input: `{ category?: string, status?: string }`
Output: `[{ name, description, category, status }]`

**`get_token`**
Input: `{ name: string }`
Output: `{ value, rawValue, type, usage, doNotUse }`

**`list_tokens`**
Input: `{ category?: string }`
Output: flat list with values and usage

**`get_pattern`**
Input: `{ name: string }`
Output: pattern with component composition and usage guidance

**`validate_usage`**
Input: `{ component: string, props: Record<string, unknown> }`
Output: `{ valid: boolean, errors: string[], warnings: string[] }`

**`get_token_alias_chain`** ← new, not in v1 plan
Input: `{ name: string }`
Output: full alias chain from component token → semantic token → primitive token → resolved value. Helps agents understand why a value is what it is.

**`list_deprecated`** ← new
Input: none
Output: all deprecated components and tokens with their replacements

### 8.3 — Versioning

MCP server reads from the built output files. If the token build or component manifest changes, the server's data updates on next startup. Add a `reload` tool for development sessions.

### 8.4 — Error Handling

No tool may crash. Every tool wraps in try/catch and returns a structured error: `{ error: string, suggestion?: string }`.

---

## Phase 9 — `llms.txt` `[v0.1]`

Create at repo root. Update on every release. Structure:

```
# Arch Design System

## What this is
[2 sentences — what the system does and who it's for]

## MCP Server
npx @arch-ui/mcp-server
Tools: get_component, find_component, list_components, get_token, list_tokens, get_pattern, validate_usage, get_token_alias_chain, list_deprecated

## Token architecture
Three layers: primitive (raw values) → semantic (intent-based, what brands override) → component (per-component usage). All values are CSS custom properties.

## Customisation
Import @arch-ui/tokens/css, then @arch-ui/tokens/brand-template. Override semantic tokens in brand-template to apply your brand. All components update automatically.

## RTL support
Set dir="rtl" on the html element. All components use CSS logical properties and respond automatically.

## Dark mode
Set data-theme="dark" on the html element or any container.

## Accessibility
All components target WCAG 2.1 AA. Every interactive component has keyboard and screen reader support.

## Components — stable
[one line per component: Name — description]

## Components — beta
[one line per component: Name — description]

## Components — deprecated
[one line per component: Name — use X instead]

## Foundations
Tokens, Grid, Typography, Color, Spacing, Motion, Icons, Accessibility, RTL

## Do not
- Do not use primitive tokens directly in components or application code — use semantic tokens
- Do not import from a component's internal folder — import from the package root
- Do not override component tokens directly in application CSS — override semantic tokens instead
```

---

## Phase 10 — Storybook `[v0.1]` `apps/storybook`

### 10.1 — Setup

```bash
cd apps/storybook
npx storybook@latest init --type react
```

Import `@arch-ui/tokens/css` in `.storybook/preview.ts`.

### 10.2 — Global Decorators

- **Theme switcher** — toolbar toggle for light/dark (`data-theme="dark"`)
- **Direction switcher** — toolbar toggle for LTR/RTL (`dir="rtl"`)
- **Reduced motion toggle** — toolbar toggle that adds class triggering `prefers-reduced-motion` override in CSS
- **Viewport** — built-in Storybook addon, shows at common breakpoints

### 10.3 — Stories Per Component

Each component has one `[Component].stories.tsx`. Stories must cover:
- All variants
- All sizes
- All states (disabled, error, loading, indeterminate where applicable)
- Light and dark mode (via decorator, not separate stories)
- RTL layout
- Brand override story (shows custom CSS variable override in action)
- Accessibility story (documents keyboard interactions inline)

### 10.4 — Component Status Badge

Add a custom Storybook badge showing the component's status from its manifest (`stable` | `beta` | `deprecated`). Automate this from the manifest — do not manually tag stories.

---

## Phase 11 — Documentation Site `[v0.1]` `apps/docs`

### 11.1 — Site Structure

```
apps/docs/src/pages/
├── index.astro                          # Landing page
├── getting-started/
│   ├── installation.mdx
│   ├── theming.mdx                      # 10-minute brand setup
│   ├── dark-mode.mdx
│   ├── rtl.mdx
│   └── agent-usage.mdx                  # MCP server + llms.txt
├── foundations/
│   ├── tokens.mdx
│   ├── color.mdx
│   ├── typography.mdx
│   ├── spacing.mdx
│   ├── motion.mdx
│   ├── icons.mdx
│   ├── grid.mdx
│   └── accessibility.mdx
├── components/
│   └── [auto-generated from manifests]
├── patterns/
│   ├── empty-states.mdx
│   ├── loading-states.mdx
│   ├── forms.mdx
│   ├── data-tables.mdx
│   ├── navigation.mdx
│   └── error-handling.mdx
└── changelog.mdx
```

### 11.2 — Auto-Generated Component Pages

`scripts/generate-component-pages.ts` reads all manifests and generates MDX pages. Each page renders: description, status badge, props table, do/don't, variants preview (iframe from Storybook), accessibility notes, code example. Run as part of build step.

### 11.3 — Token Reference Pages

Token pages render directly from `tokens.json`. Never written by hand. A `TokenTable` Astro component reads the JSON and renders: token name, value, alias (what it points to), usage, preview swatch (for colour/shadow tokens).

### 11.4 — Component Status Page

A single page listing all components with their status, tier, and a link to docs. Auto-generated from all manifests. Shows which components are stable vs beta vs deprecated. This is the public roadmap.

---

## Phase 12 — Custom ESLint Plugin `[v0.1]` `packages/eslint-plugin-arch`

Implement all five rules from `/docs/eslint-rules.md`:
1. `arch/no-hardcoded-values` — no raw hex/px/opacity in component CSS
2. `arch/no-unknown-token` — no `var(--token-name)` where name is not in tokens.json
3. `arch/manifest-required` — every component folder needs a manifest
4. `arch/no-direct-component-import` — must use barrel exports
5. `arch/no-inline-style` — no `style={{}}` object literals
6. `arch/no-physical-properties` — no directional CSS (left/right) — use logical properties `[v0.1]`

---

## Phase 13 — CI/CD `[v0.1]`

### ci.yml (every PR)
1. `pnpm install --frozen-lockfile`
2. `pnpm tokens:build` (includes validation)
3. `pnpm lint` (includes manifest validation)
4. `pnpm test` (unit + a11y tests)
5. `pnpm build` (all packages and apps)
6. Playwright visual regression tests

Visual regression failures block the PR. Do not auto-approve visual diffs.

### publish.yml (merge to main)
1. ci.yml steps
2. `pnpm changeset version`
3. `pnpm publish -r`
4. Deploy `apps/docs` to Vercel/Cloudflare Pages
5. Update `llms.txt` in GitHub Pages or CDN

### changeset.yml (PR comment)
Comment on PRs with "missing changeset" if no changeset file is included and the PR touches a package that would require one. Claude Code: you are responsible for adding the changeset file to every PR. Never skip it.

---

## Complete v0.1 Definition of Done

This is the full checklist. The plan is not complete until every item is checked.

### Repository
- [ ] Monorepo runs: `pnpm install && pnpm build` from root with zero errors
- [ ] `CLAUDE.md` and `AGENTS.md` present at root with all reference document links
- [ ] `llms.txt` present at root with all stable components listed
- [ ] `decisions/` folder with README, template, and ADR-001 through ADR-008 complete
- [ ] Beads initialised with epics for all phases
- [ ] CI passes on the initial commit

### Tokens
- [ ] All primitive token categories complete (color, spacing, radius, typography, shadow, motion, z-index, border-width)
- [ ] All semantic token categories complete including dark mode overrides
- [ ] `prefers-reduced-motion` block in CSS output
- [ ] CSS logical properties rule enforced in ESLint (`arch/no-physical-properties`)
- [ ] Validation script passes with zero errors
- [ ] `brand-template.css` exported with all semantic tokens and usage comments
- [ ] Style Dictionary outputs: CSS, JSON (with alias chain), TypeScript

### Icons
- [ ] All v0.1 icons present as SVG files
- [ ] All React wrappers generated with correct props
- [ ] Directional icons flip in RTL

### Layout Primitives
- [ ] Box, Stack, Inline, Grid components complete with tests
- [ ] VisuallyHidden component complete
- [ ] SkipNav component complete

### Core Components — each of these has TSX + CSS + manifest + unit tests + a11y tests
- [ ] Text
- [ ] Heading
- [ ] Code
- [ ] Link
- [ ] FormControl + FormLabel + FormHelperText + FormErrorMessage
- [ ] Button
- [ ] IconButton
- [ ] Input
- [ ] Textarea
- [ ] Checkbox + CheckboxGroup
- [ ] Radio + RadioGroup
- [ ] Toggle
- [ ] Select
- [ ] Slider
- [ ] FileUpload
- [ ] Badge
- [ ] Tag
- [ ] Avatar + AvatarGroup
- [ ] Divider
- [ ] Spinner
- [ ] Skeleton
- [ ] ProgressBar
- [ ] ProgressSteps
- [ ] Tooltip
- [ ] Popover
- [ ] Modal
- [ ] Drawer
- [ ] Overlay / Blanket
- [ ] Breadcrumbs
- [ ] Tabs
- [ ] Pagination
- [ ] Accordion
- [ ] Card
- [ ] List + ListItem + DescriptionList
- [ ] Table (semantic)
- [ ] Alert / Notification
- [ ] Banner
- [ ] Toast + useToast()
- [ ] Portal
- [ ] FocusTrap

### Quality gates — apply to every component
- [ ] Zero hardcoded values in CSS (ESLint enforced)
- [ ] Zero axe-core violations
- [ ] All states have visual regression baselines
- [ ] Dark mode renders correctly (visual regression)
- [ ] RTL renders correctly (visual regression)
- [ ] Reduced motion: all animations stop
- [ ] Keyboard: all functionality reachable
- [ ] All user-facing strings accept `labels` prop override

### MCP Server
- [ ] All 8 tools implemented and return correctly structured data
- [ ] All 8 tools have integration tests
- [ ] No tool crashes — all wrapped in try/catch
- [ ] `list_deprecated` returns empty array (nothing deprecated yet)
- [ ] `get_token_alias_chain` returns full chain for any token

### Documentation and Tooling
- [ ] Storybook builds with all component stories
- [ ] Every story covers: all variants, all states, dark mode, RTL, brand override
- [ ] Theme switcher, direction switcher, and reduced motion toggle in Storybook toolbar
- [ ] Docs site builds with auto-generated component pages from manifests
- [ ] Token reference pages render from JSON
- [ ] Component status page lists all stable and beta components
- [ ] `getting-started/theming.mdx` — 10-minute brand setup guide complete
- [ ] `getting-started/rtl.mdx` — RTL setup guide complete
- [ ] `getting-started/agent-usage.mdx` — MCP server guide complete
- [ ] `docs/accessibility-guidelines.md` — complete and referenced in CLAUDE.md
- [ ] All 6 ESLint rules implemented and active in CI
- [ ] Manifest schema validation runs in CI

### Publishing
- [ ] All packages have correct `package.json` with `exports`, `peerDependencies`, `sideEffects`
- [ ] changesets configured
- [ ] publish workflow tested in dry-run
- [ ] npm packages are scoped: `@arch-ui/tokens`, `@arch-ui/components`, `@arch-ui/icons`, `@arch-ui/mcp-server`
- [ ] README covers: install, quick start, brand customisation, MCP server, links to docs

---

## What is Explicitly Deferred (Do Not Implement)

These are out of scope until after v0.1 is public and there is community demand:

- ColorPicker component
- RichText / WYSIWYG editor
- Charts / data visualisation components
- Map components
- Video player
- Audio player
- PDF viewer
- Virtual scrolling / windowed lists
- Native iOS/Android tokens (the system is web-only for v0.1)
- Vue or Svelte component wrappers
- Angular component wrappers
- Storybook to Figma sync automation
- AI-powered component generation inside the docs site
- i18n string management service (just the `labels` prop pattern is enough for v0.1)
- High contrast token overrides (in plan as v0.2)
- Content/writing guidelines (in plan as v0.2)

---

## Notes for Claude Code

- **Name decision required before Phase 0.** The system name determines npm scope, Figma library name, docs URL, and llms.txt content. Ask the user to confirm the name before starting.
- **Run `bd quickstart` at the start of every session** — see CLAUDE.md and session-handoff-protocol.md
- **Read `/docs/token-naming.md` before touching any token** — non-negotiable
- **Read `/docs/accessibility-guidelines.md` before writing any component** — non-negotiable
- **Write the manifest before the TSX** — this is the contract that everything else derives from
- **Do not start Phase 4 until Phase 1 validation passes** — the token build is the foundation of everything
- **Do not start Phase 5 (composite) components** — they are v0.2 scope
- **A component is not done until it has: TSX, CSS, manifest, unit tests, a11y tests, and a Storybook story**
- **Never auto-update visual regression snapshots** — always flag to the user
- **File a changeset for every PR that changes a package**
