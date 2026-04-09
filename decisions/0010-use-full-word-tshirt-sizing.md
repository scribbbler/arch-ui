# Use full-word t-shirt sizing for token names

**Date:** 2026-04-09
**Status:** Accepted
**Deciders:** Saurabh

---

## Context and Problem Statement

Arch UI tokens use t-shirt sizing (xsmall through xxlarge) as a naming convention for scale-based values like shadows, radii, spacing, and typography. However, two conventions exist in the codebase today:

- **Short form**: `xs`, `sm`, `md`, `lg`, `xl`, `2xl` — used by shadow, radius, and spacing component/inline tokens
- **Full words**: `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge` — used by typography semantic tokens (e.g. `heading-xxlarge`, `label-xsmall`)

This inconsistency means developers must remember which convention applies to which category. Documentation also mixes the two, creating confusion.

Categories that use descriptive names (motion: `fast`/`slow`, border-width: `thin`/`thick`) are not affected — those names carry domain-specific meaning and are not part of the t-shirt scale.

How should we standardise t-shirt sizing across all token categories?

---

## Considered Options

- **Option A** — Full words everywhere: `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`
- **Option B** — Short form everywhere: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- **Option C** — Keep the current mix

---

## Decision Outcome

**Chosen: Option A — full words.**

Full words match the Uber Base naming convention that Arch UI uses as its structural reference. They are unambiguous, readable without abbreviation context, and already the convention used by typography — the largest and most complex token category.

### Positive Consequences
- One naming convention to learn and remember
- Matches Uber Base reference, reducing friction when porting patterns
- Typography tokens (the majority) already use this convention — less renaming overall
- Token names are self-documenting: `--shadow-xlarge` is clearer than `--shadow-xl` to new users

### Negative Consequences
- Shadow, radius, and spacing primitive/semantic tokens need renaming (`xs` → `xsmall`, `2xl` → `xxlarge`, etc.)
- Component CSS referencing old token names needs updating
- Documentation pages referencing old names need updating
- Slightly longer token names (e.g. `--shadow-xxlarge` vs `--shadow-2xl`)

---

## Pros and Cons of the Options

### Option A — Full words
- Pro: Matches Uber Base convention
- Pro: Self-documenting, readable without context
- Pro: Typography already uses this — less total renaming
- Pro: No ambiguity about prefix style (`2xl` vs `xxl` vs `xxlarge`)
- Con: Longer CSS variable names
- Con: Requires renaming shadow, radius, spacing tokens

### Option B — Short form
- Pro: Concise, common in utility-first frameworks (Tailwind)
- Pro: Fewer characters in CSS
- Con: Typography would need extensive renaming (`heading-xxlarge` → `heading-2xl`)
- Con: `2xl` prefix is unusual — some developers expect `xxl`
- Con: Does not match Uber Base reference
- Verdict: Ruled out — typography renaming would be more disruptive, and short form conflicts with Uber Base alignment

### Option C — Keep the mix
- Pro: No work required
- Con: Developers must remember which convention each category uses
- Con: Documentation is inconsistent
- Con: New token categories require a decision each time
- Verdict: Ruled out — the inconsistency is a recurring source of confusion

---

## Revisit Conditions

Revisit if Arch UI adopts a utility-class layer (like Tailwind) where short-form names provide a meaningful ergonomic benefit in class names. In that case, the utility layer could use short aliases while the underlying tokens remain full-word.

---

## Migration scope

Tokens to rename:

| Category | Current | New |
|---|---|---|
| shadow | xs, sm, md, lg, xl, 2xl | xsmall, small, medium, large, xlarge, xxlarge |
| radius | xs, sm, md, lg, xl, 2xl | xsmall, small, medium, large, xlarge, xxlarge |
| spacing (semantic component) | xs, sm, md, lg, xl | xsmall, small, medium, large, xlarge |
| spacing (semantic inline) | xs, sm, md, lg | xsmall, small, medium, large |
| shadow (semantic component) | sm, md | small, medium |

Tokens that do NOT change:
- Spacing primitives (numeric: `--spacing-4`, `--spacing-8`, etc.)
- Typography (already uses full words)
- Motion duration (descriptive: `fast`, `slow`, etc.)
- Border width (descriptive: `thin`, `medium`, `thick`)
- Z-index (descriptive: `dropdown`, `modal`, etc.)
- Radius special values: `none`, `full`
