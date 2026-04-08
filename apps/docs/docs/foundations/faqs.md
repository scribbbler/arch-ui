---
sidebar_label: FAQs
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>RESOURCES</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Frequently Asked Questions</h1>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Answers to the most common questions about working with Arch UI.
  </p>
</div>

---

## When should I use tokens instead of hardcoded values?

**Always.** Every color, spacing value, font size, shadow, and border radius in a component must reference a design token through `var(--token-name)`. Hardcoded hex values, pixel sizes, or named colors are not permitted in component CSS.

This rule exists because tokens are the single mechanism for theming, dark mode, and future brand changes. A hardcoded `#266EF1` cannot respond to a theme switch; `var(--color-content-brand)` can.

If you need a value that does not have a corresponding token, do not invent one or hardcode the value. Instead, add the token to `packages/tokens/src/semantic/`, rebuild the token output with `pnpm build`, and then reference it. See the [Design Tokens](/docs/foundations/tokens) page for naming conventions and tier structure.

---

## How do I request a new component?

1. **Check existing components first.** The component you need may already exist under a different name, or an existing component may accept props that cover your use case.
2. **File a request.** Open an issue describing the use case, the expected API (props), and any accessibility requirements. Include screenshots or mockups if possible.
3. **Review the ADR process.** Components that introduce new patterns or architectural decisions require an ADR in the `/decisions/` directory before implementation begins.

New components follow the standard lifecycle: manifest first, then implementation, then tests, then documentation.

---

## How can I contribute to Arch UI?

Contributions follow this workflow:

1. **Pick an open issue** or file a new one describing the change.
2. **Read the relevant guidelines** before writing code — `/docs/token-naming.md` for tokens, `/docs/accessibility-guidelines.md` for components, and `/decisions/README.md` for architectural questions.
3. **Write the manifest first** if you are adding or modifying a component. The manifest JSON defines the component API and is consumed by tooling.
4. **Run `pnpm test` and `pnpm build`** before submitting. All tests must pass and the build must succeed.
5. **Use conventional commits** — `feat(button): add loading state`, `fix(tokens): correct shadow alias`, etc.

Every interactive element must have a `:focus-visible` style using `var(--color-border-focus)`, and every component must be `forwardRef` compatible.

---

## What browsers does Arch UI support?

Arch UI targets modern evergreen browsers:

| Browser | Minimum version |
|---|---|
| Chrome | Last 2 major versions |
| Firefox | Last 2 major versions |
| Safari | Last 2 major versions |
| Edge | Last 2 major versions |

Internet Explorer is not supported. CSS custom properties (design tokens) and modern layout features like `gap` in flexbox are used throughout, which limits compatibility to browsers released in the last two years.

---

## How does versioning work?

Arch UI follows [semantic versioning](https://semver.org/):

- **Patch** (0.0.x) — Bug fixes, typo corrections, internal refactors with no API change.
- **Minor** (0.x.0) — New components, new tokens, new props added to existing components. Fully backward compatible.
- **Major** (x.0.0) — Breaking changes such as renamed props, removed components, or restructured token names.

Breaking changes are prefixed with `!` in the commit scope and include a `BREAKING CHANGE:` footer explaining the migration path. Before any breaking change ships, an ADR must be approved in `/decisions/`.

Token renames are treated as breaking changes because they affect every consumer that references the old name.

---

## Can I use individual packages without the full system?

Yes. Arch UI is a monorepo with independent packages:

| Package | What it provides |
|---|---|
| `@arch-ui/tokens` | CSS custom properties and JSON token output — no React dependency |
| `@arch-ui/icons` | SVG icon React components — depends on React only |
| `@arch-ui/components` | Full component library — depends on tokens and React |

You can install `@arch-ui/tokens` alone if you only need the design language without the React components.

---

## Where do I find the source of truth for a component's API?

The **manifest JSON** file inside each component folder is the canonical API reference. For example, `packages/components/src/Button/Button.manifest.json` defines the Button's props, variants, and usage rules. Documentation pages and Storybook stories are generated or informed by these manifests — they are not the source of truth themselves.

---

## What icon library does Arch UI use?

Arch UI uses a curated subset of [Material Design Icons](https://pictogrammers.com/library/mdi/) (`@mdi/svg`), wrapped as typed React components in the `@arch-ui/icons` package. The set currently includes 43 icons. See the [Icons](/docs/foundations/icons) page for the full list, sizing specs, and accessibility guidance.

---

## How do I report a bug?

Open an issue with:

1. **What you expected** to happen.
2. **What actually happened**, including any error messages or screenshots.
3. **Steps to reproduce** — a minimal code snippet or Storybook link is ideal.
4. **Environment details** — browser, OS, and package versions.

If the bug is in a token value, include the token name and the computed CSS value you observed.
