# Use CSS Custom Properties for Component Styling

**Date:** TBD
**Status:** Accepted
**Deciders:** Saurabh

---

## Context and Problem Statement

Arch components need runtime theming — any brand must be able to swap their entire visual identity by overriding a set of values, with no build step required on their end. The styling approach also needs to work across React and, eventually, other frameworks. What styling approach supports runtime theming, framework portability, and agent-readable token usage with the least overhead?

---

## Considered Options

- CSS custom properties — native browser variables, no runtime
- Styled Components or Emotion — CSS-in-JS with runtime style injection
- Tailwind CSS — utility-class approach with a config-based design scale
- CSS Modules — scoped CSS with build-time class name hashing
- Vanilla Extract — zero-runtime TypeScript-based CSS generation

---

## Decision Outcome

**Chosen: CSS custom properties (CSS variables).**

All component styles use `var(--token-name)` exclusively. No hardcoded values anywhere in component CSS. This is enforced by the `arch/no-hardcoded-values` and `arch/no-unknown-token` ESLint rules.

### Positive Consequences
- Runtime theming works by overriding variables in a single CSS file — no build step for brands
- Framework-agnostic — the same CSS works in React, Vue, Web Components, and plain HTML
- Zero runtime overhead — no style injection, no serialisation, no hydration issues
- Dark mode via `[data-theme="dark"]` selector needs no JavaScript
- Agents can audit token usage by scanning for `var(--token-name)` patterns — impossible with CSS-in-JS objects
- Logical property support (`margin-inline-start` etc.) for RTL works natively

### Negative Consequences
- No TypeScript autocomplete for CSS values in component files — mitigated by typed token exports from Style Dictionary
- Developers who only know CSS-in-JS need to adjust their mental model
- Requires a custom ESLint rule to catch hardcoded values — cannot rely on TypeScript alone

---

## Pros and Cons of the Options

### CSS custom properties
- Pro: Native browser support, universal, zero dependencies
- Pro: Runtime theming without JavaScript
- Pro: Works in any framework or no framework
- Pro: Machine-readable — agents can inspect and validate token usage
- Con: No TypeScript autocomplete for values (only for prop names)

### Styled Components / Emotion
- Con: Runtime style injection has measurable overhead, especially on server render
- Con: Theming requires a React Provider — ties the system to React permanently
- Con: Token values are opaque JS objects, not inspectable without custom tooling
- Con: Hydration mismatch issues in SSR contexts
- Verdict: Rejected. The framework lock-in alone disqualifies it for a brand-agnostic system

### Tailwind CSS
- Con: Utility classes are not token-based — they are a pre-defined scale
- Con: Customisation requires a Tailwind config file, not just a CSS override
- Con: Class names in markup make component APIs harder to read and maintain
- Con: Agents reading component source see class soup, not semantic token usage
- Verdict: Rejected. Good for application development, wrong for a design system primitive layer

### CSS Modules
- Pro: Solves CSS scoping cleanly
- Con: Does not solve theming — still needs CSS custom properties for that
- Con: Adds a build dependency for a problem that BEM naming conventions solve adequately
- Verdict: Rejected. Adds complexity without solving the core theming requirement

### Vanilla Extract
- Pro: Zero-runtime, TypeScript-based, outputs CSS custom properties
- Pro: Type-safe style authoring
- Con: Non-standard build pipeline step — not supported by all bundlers without config
- Con: The type safety benefit is already covered by the TypeScript token export from Style Dictionary
- Con: Adds contributor friction — anyone editing component styles needs to know the Vanilla Extract API
- Verdict: Closest alternative. Ruled out on contributor accessibility grounds and the fact that our token pipeline already provides the type safety argument

---

## Revisit Conditions

If a major framework shift creates SSR requirements that CSS custom properties genuinely cannot meet, revisit. This is unlikely given current browser support and the direction of the web platform.
