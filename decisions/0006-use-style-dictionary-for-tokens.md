# Use Style Dictionary for the Token Pipeline

**Date:** 2026-04-01
**Status:** Accepted
**Deciders:** Saurabh

---

## Context and Problem Statement

Arch tokens are defined in JSON source files across three layers (primitive, semantic, component). These need to be transformed into multiple output formats: CSS custom properties, a flat JSON file with alias chains preserved, and TypeScript typed constants. The transformation must handle dark mode overrides (`[data-theme="dark"]`), reduced motion (`@media (prefers-reduced-motion: reduce)`), and a brand template file. What tool should drive this transformation pipeline?

---

## Considered Options

- Style Dictionary v4 — token transformation pipeline by Amazon
- Custom Node.js scripts — hand-written build scripts
- Theo (Salesforce) — design token transformation tool
- Tokens Studio pipeline — Figma-to-code token pipeline

---

## Decision Outcome

**Chosen: Style Dictionary v4.**

All token source files are authored as JSON in `packages/tokens/src/`. Style Dictionary reads these, resolves alias chains, and outputs CSS, JSON (with alias chain metadata), and TypeScript. Custom formats handle the `[data-theme="dark"]` block, `@media (prefers-reduced-motion: reduce)` block, and the `brand-template.css` output.

### Positive Consequences
- Mature, well-documented tool with a large community
- Custom formats and transforms cover all output requirements including alias chain preservation
- v4 supports the DTCG (Design Tokens Community Group) format — future-proof
- Single config file drives all output formats — no fragmented build scripts

### Negative Consequences
- Custom formats for dark mode, reduced motion, and brand template require non-trivial Style Dictionary configuration
- Style Dictionary's API surface is large — contributors editing the config need to learn it
- The alias chain preservation in JSON output requires a custom format (not built-in)

---

## Pros and Cons of the Options

### Style Dictionary v4
- Pro: Industry standard for design token pipelines
- Pro: Supports DTCG format and custom transforms/formats
- Pro: Active maintenance and large community
- Pro: Handles multi-file token sources and alias resolution natively
- Con: Custom formats add configuration complexity
- Con: v4 introduced breaking changes from v3 — some community resources are outdated

### Custom Node.js scripts
- Pro: Full control — no external dependency
- Con: Must implement alias resolution, format generation, and validation from scratch
- Con: Maintenance burden increases as output formats grow
- Verdict: Rejected. Reinventing what Style Dictionary already does well

### Theo (Salesforce)
- Pro: Simple, focused tool
- Con: Less active maintenance than Style Dictionary
- Con: Fewer output formats supported natively
- Con: No DTCG format support
- Verdict: Rejected. Style Dictionary is the more active and capable choice

### Tokens Studio pipeline
- Pro: Tight Figma integration
- Con: Assumes a Figma-first workflow — Arch is code-first
- Con: Adds a Figma dependency to the build pipeline
- Verdict: Rejected. Wrong workflow direction for a code-first system

---

## Revisit Conditions

If the DTCG specification formalises a reference implementation that supersedes Style Dictionary, evaluate migrating. If Style Dictionary v4 stability issues emerge that block production use, fall back to custom scripts using Style Dictionary's core transforms as a library rather than a framework.
