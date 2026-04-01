# Use Three-Layer Token Architecture

**Date:** 2026-04-01
**Status:** Accepted
**Deciders:** Saurabh

---

## Context and Problem Statement

Arch needs a token system that supports brand customisation without exposing internal implementation details. Brands should be able to override visual identity by changing a defined set of values, while component authors should be able to reference meaningful names rather than raw values. At the same time, agents need to trace any component's visual output back to the raw value and understand why it looks the way it does. How should tokens be layered to support brand theming, component authoring, and agent traceability?

---

## Considered Options

- Three-layer architecture — primitive → semantic → component
- Two-layer architecture — primitive → semantic only
- Single flat token set — one layer with all tokens
- Figma-style token groups — grouped by component without explicit layering

---

## Decision Outcome

**Chosen: Three-layer architecture (primitive → semantic → component).**

Primitive tokens hold raw values (colours, spacing scales). Semantic tokens reference primitives and express intent (action-primary, background-default). Component tokens reference semantic tokens and are scoped to a single component's CSS. Brands override semantic tokens only — primitives are internal, component tokens are derived.

### Positive Consequences
- Brands override one layer (semantic) and the entire system updates — no per-component overrides needed
- Component authors reference meaningful names, not arbitrary hex values
- Agents can trace any visual output through the full alias chain: component → semantic → primitive → resolved value
- Dark mode, high contrast, and reduced motion are semantic-layer overrides — no component changes needed

### Negative Consequences
- Three layers are more complex than one or two — contributors must understand which layer a token belongs to
- Adding a new semantic token requires understanding the naming convention (see `/docs/token-naming.md`)
- The alias chain must be preserved in build output (JSON), not just resolved — adds Style Dictionary configuration complexity

---

## Pros and Cons of the Options

### Three-layer (primitive → semantic → component)
- Pro: Clear separation of concerns — raw values, intent, and component-specific usage
- Pro: Brand theming targets one layer with predictable results
- Pro: Full traceability for agents and debugging
- Con: More files and more naming decisions than simpler approaches

### Two-layer (primitive → semantic)
- Pro: Simpler — fewer files, fewer decisions
- Con: Components reference semantic tokens directly, which means component-specific overrides require either extra semantic tokens (polluting the semantic namespace) or inline overrides (breaking the token-only rule)
- Verdict: Rejected. The component layer is needed to keep semantic tokens clean and component overrides contained

### Single flat set
- Pro: Simplest possible approach — one file, one namespace
- Con: No theming strategy — brands would need to override hundreds of individual tokens
- Con: No separation between internal values and public API
- Verdict: Rejected. Does not support the brand customisation requirement

### Figma-style token groups
- Pro: Familiar to designers using token plugins
- Con: Grouping by component without explicit layering conflates primitive and semantic concerns
- Con: No clear override strategy for brands
- Verdict: Rejected. Visual grouping does not replace architectural layering

---

## Revisit Conditions

If brand customisation proves to need fewer than 10 semantic overrides consistently, the component layer may be over-engineering — evaluate collapsing to two layers. If the alias chain traceability provided by three layers is not used by agents in practice, simplify.
