# Use a `labels` prop for component string internationalisation

**Date:** 2026-04-02
**Status:** Accepted
**Deciders:** Saurabh

---

## Context and Problem Statement

Several components contain hardcoded English strings — aria-labels, error messages, and default text. These strings are not overridable, which blocks internationalisation and prevents consumers from adjusting accessible labels to match their application's voice.

How should we make user-facing strings in components externalisable without adding a full i18n framework dependency?

---

## Considered Options

- Option A — `labels` prop with per-component defaults in a constants file
- Option B — React context-based i18n provider
- Option C — Accept individual string props (e.g. `closeLabel`, `dismissLabel`)

---

## Decision Outcome

**Chosen: Option A — `labels` prop with defaults in a constants file.**

Each component that contains user-facing strings exports a `ComponentLabels` type and a `DEFAULT_LABELS` constant from a `Component.labels.ts` file. The component accepts an optional `labels?: Partial<ComponentLabels>` prop and merges it with defaults. This keeps the API simple, avoids framework lock-in, and follows the pattern prescribed in the build plan.

### Positive Consequences
- Zero runtime overhead — no context providers or lookups
- Tree-shakeable — unused defaults are eliminated
- Consistent pattern across all components
- Consumers can override individual strings without providing all of them

### Negative Consequences
- Each component that needs i18n has an additional file and prop
- Dynamic strings (e.g. `goToPage(n)`) use callback functions in the labels object, which is slightly less ergonomic than template strings

---

## Pros and Cons of the Options

### Option A
- Pro: No additional dependencies
- Pro: Fully typed — consumers get autocomplete for available labels
- Pro: Partial overrides supported via spread
- Con: Requires a labels file per component

### Option B
- Pro: Single override point for all components
- Con: Adds coupling between components and a provider
- Con: Over-engineered for the current scale
- Verdict: Deferred — can be layered on top of Option A later if needed

### Option C
- Pro: Explicit individual props
- Con: Pollutes the prop interface with many string props
- Con: Inconsistent naming across components
- Verdict: Does not scale

---

## Revisit Conditions

If the design system grows to 50+ externalisable strings, consider a lightweight context provider that accepts a labels dictionary and distributes it to components via context. Option A's per-component constants files make this migration straightforward.

---
