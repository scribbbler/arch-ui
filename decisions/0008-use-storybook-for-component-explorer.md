# Use Storybook for the Component Explorer

**Date:** 2026-04-01
**Status:** Accepted
**Deciders:** Saurabh

---

## Context and Problem Statement

Arch components need an interactive development environment where contributors can view all variants, states, sizes, and themes in isolation. This environment also serves as a visual regression testing target and a source for iframe embeds in the documentation site. What tool should provide this component exploration and development experience?

---

## Considered Options

- Storybook v8 — component explorer and workshop
- Ladle — lightweight Storybook alternative by Uber
- Histoire — Vite-native component story tool
- Custom dev app — a bespoke React app for component development

---

## Decision Outcome

**Chosen: Storybook v8.**

The component explorer lives at `apps/storybook/`. Each component has a `[Component].stories.tsx` covering all variants, states, dark mode, RTL, and brand overrides. Global decorators provide theme, direction, and reduced-motion toggles. Component status badges are derived from manifests.

### Positive Consequences
- Industry standard — most React developers already know it
- Rich addon ecosystem: a11y, viewport, controls, actions
- Visual regression testing integrates directly with Storybook via Playwright
- Stories serve as living documentation and iframe embeds for the docs site
- Component status badges can be automated from manifest data

### Negative Consequences
- Large dependency footprint — Storybook pulls in many packages
- Configuration can be complex, especially with custom decorators and addons
- Build times are non-trivial for a large component set

---

## Pros and Cons of the Options

### Storybook v8
- Pro: Industry standard, largest community and addon ecosystem
- Pro: Built-in a11y addon for accessibility checks during development
- Pro: Controls addon generates interactive prop editors from TypeScript types
- Pro: CSF3 format is clean and composable
- Con: Heavy dependency tree
- Con: Build times scale with component count

### Ladle
- Pro: Much lighter than Storybook — faster builds
- Pro: Compatible with CSF format
- Con: Smaller addon ecosystem — missing key addons like a11y and viewport
- Con: Less active community
- Verdict: Rejected. Missing addons that are critical for the Arch development workflow

### Histoire
- Pro: Vite-native, fast hot reload
- Con: Primarily designed for Vue — React support is secondary
- Con: Smaller community and fewer integrations
- Verdict: Rejected. React is not the primary target

### Custom dev app
- Pro: Full control, minimal dependencies
- Con: Must build variant display, state toggles, prop editors, and a11y checks from scratch
- Con: Massive maintenance burden for capabilities that Storybook provides out of the box
- Verdict: Rejected. Not worth the effort when Storybook covers the requirements

---

## Revisit Conditions

If Storybook build times become a material bottleneck (>5 minutes for incremental builds), evaluate Ladle or a custom Vite-based setup. If a lighter tool gains the addon coverage that Storybook provides (especially a11y and visual regression), evaluate switching.
