# Testing Strategy

Every layer of the system has a different testing concern. This document defines what to test, how, and what "done" means for each.

---

## Test Types and Tools

| Type | Tool | Runs in |
|---|---|---|
| Unit tests | Vitest | CI on every PR |
| Component behaviour | Vitest + Testing Library | CI on every PR |
| Accessibility | axe-core via `@axe-core/react` | CI on every PR |
| Visual regression | Playwright screenshots | CI on every PR |
| Token validation | Custom JSON schema validator | CI on every PR |
| Manifest validation | JSON Schema (ajv) | CI on every PR |
| MCP tool tests | Vitest | CI on every PR |

---

## Unit Tests — What to Test Per Component

Every component test file must cover:

### Rendering
- Renders without crashing with default props
- Renders each variant without crashing
- Renders each size without crashing
- Snapshot test of default render (update intentionally, never auto-update)

### Props
- Required props produce correct output
- Optional props with defaults render correctly without being passed
- Boolean props toggle the right class or attribute
- Invalid prop values do not crash (TypeScript catches this, but test the boundary)

### Behaviour
- Click handlers fire when not disabled
- Click handlers do not fire when disabled
- Form elements respond to onChange
- Controlled and uncontrolled modes work correctly where applicable

### States
- Disabled state: correct attribute, no interaction
- Loading state: spinner present, button not clickable
- Error state: error styling applied, aria-invalid set

---

## Accessibility Tests — Required for Every Component

Use `@axe-core/react` in tests. Every component test must include:

```typescript
import { axe } from 'jest-axe' // or vitest equivalent

it('has no accessibility violations', async () => {
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

Additionally, test manually checkable items:

- Focus is visible on keyboard navigation (`:focus-visible` exists in CSS — verify the rule exists in the CSS file)
- `aria-label` or `aria-labelledby` present on icon-only elements
- `role` attribute matches manifest definition
- `aria-disabled` set when `disabled` prop is true (not just HTML `disabled`)
- Error messages linked to inputs via `aria-describedby`

---

## Visual Regression Tests — What They Cover

Visual regression tests catch unintended changes to component appearance across the entire component surface.

### Setup
Use Playwright with screenshot comparison. Store baseline screenshots in `tests/visual/snapshots/`. Screenshots are committed to the repo.

### What gets a screenshot
- Every component in every variant (primary, secondary, destructive, ghost, etc.)
- Every size (sm, md, lg)
- Disabled state
- Error state
- Dark mode (using `[data-theme="dark"]`)
- Hover state (use Playwright's `hover()`)
- Focus state (use Playwright's `focus()`)

### Workflow
- On first run, screenshots are generated as baselines
- On subsequent runs, screenshots are diffed against baselines
- A PR that changes visual output will fail the visual test
- Visual changes require explicit approval: update the snapshot intentionally with `pnpm test:visual --update-snapshots` and commit the new baseline

### What visual regression protects against
- A token value change rippling unexpectedly through multiple components
- A CSS specificity bug overriding a component style
- Dark mode tokens not applying correctly
- A new component import accidentally inheriting styles from another component

Claude Code: never auto-update snapshots. Always flag visual diffs to the user for review.

---

## Token Validation Tests

Run a validation script in CI that checks:

1. Every semantic token references a primitive that exists — no dangling aliases
2. Every component token references a semantic token that exists — no dangling aliases
3. No token has a hardcoded value at the semantic or component layer (all values must be alias references)
4. The CSS output file contains a variable for every token in the JSON output
5. The TypeScript output exports a constant for every token in the JSON output

This script lives at `packages/tokens/scripts/validate.ts` and runs as part of `pnpm tokens:build`.

---

## Manifest Validation Tests

Every component manifest is validated against `manifest.schema.json` in CI. Validation checks:

- All required fields are present (name, description, category, status, variants, states, props, usage)
- Usage do/doNot arrays are non-empty
- Every prop has a description
- Props marked required have no default value (or the default is explicitly `null`)
- `relatedComponents` references components that exist in the system

This runs automatically on every PR that touches a `.manifest.json` file.

---

## MCP Server Tests

The MCP server has integration tests that verify each tool returns correctly structured data:

- `get_component("Button")` returns a complete manifest with all required fields
- `find_component("file upload drag and drop")` returns relevant results, not empty
- `get_token("color-action-primary")` returns value, rawValue, type, usage, doNotUse
- `validate_usage("Button", { variant: "invalid" })` returns `valid: false` with errors
- `get_component("nonexistent")` returns an error with a list of similar names, not a crash

---

## Coverage Requirements

| Package | Minimum coverage |
|---|---|
| `@arch-ui/tokens` (validation scripts) | 90% |
| `@arch-ui/components` | 80% statement coverage |
| `@arch-ui/mcp-server` | 85% statement coverage |

Claude Code: do not game coverage by testing implementation details. Cover behaviour.

---

## What is Not Tested Here

- Visual design decisions (whether a colour looks good) — human review
- Whether a component matches its Figma spec exactly — human review
- Browser compatibility beyond what Playwright covers — manual testing on release
- Performance benchmarks — not in scope for v0.1
