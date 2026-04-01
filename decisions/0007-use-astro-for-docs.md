# Use Astro for the Documentation Site

**Date:** 2026-04-01
**Status:** Accepted
**Deciders:** Saurabh

---

## Context and Problem Statement

Arch needs a public documentation site that renders component pages auto-generated from manifests, token reference pages from JSON, and hand-written guides in MDX. The site must be fast, support MDX, and allow embedding interactive React component previews where needed — without shipping a full React runtime for static content pages. What framework should power the documentation site?

---

## Considered Options

- Astro v5 — content-focused static site framework with island architecture
- Next.js — React meta-framework with SSR and SSG
- Docusaurus — documentation-focused React framework by Meta
- VitePress — Vite-powered static site generator for documentation

---

## Decision Outcome

**Chosen: Astro v5.**

The docs site lives at `apps/docs/`. Astro renders static HTML by default and hydrates React components only where interactivity is needed (island architecture). MDX pages are authored in `src/pages/`. Component pages are auto-generated from manifests by a build script.

### Positive Consequences
- Static HTML by default — fastest possible page loads for documentation
- Island architecture means React previews hydrate only where needed — minimal client JS
- Native MDX support without additional configuration
- Can embed Storybook iframes for interactive component demos
- Content collections work well for auto-generated pages from manifests

### Negative Consequences
- Contributors working on docs need to learn Astro's `.astro` component syntax
- Less ecosystem momentum than Next.js — fewer community plugins
- Interactive React islands require explicit `client:` directives — easy to forget

---

## Pros and Cons of the Options

### Astro v5
- Pro: Zero client JS by default — optimal for documentation
- Pro: Island architecture — React only where needed
- Pro: Native MDX and content collections
- Con: Smaller ecosystem than Next.js
- Con: New syntax for contributors unfamiliar with Astro

### Next.js
- Pro: Largest React framework ecosystem
- Pro: Familiar to most React developers
- Con: Ships React runtime for every page — overkill for static documentation
- Con: App Router complexity adds overhead for a content site
- Verdict: Rejected. Over-engineered for a primarily static documentation site

### Docusaurus
- Pro: Purpose-built for documentation — opinionated structure
- Pro: MDX support, versioning, search built-in
- Con: Heavily opinionated — difficult to customise layout for auto-generated pages
- Con: Ships full React runtime
- Verdict: Rejected. Too opinionated for a site that needs custom auto-generation from manifests

### VitePress
- Pro: Fast, Vite-powered, good developer experience
- Con: Vue-based — Arch components are React, creating a framework mismatch for interactive previews
- Verdict: Rejected. Framework mismatch makes embedding React component previews awkward

---

## Revisit Conditions

If Astro's development stalls or a documentation-specific framework emerges that natively supports manifest-driven page generation, evaluate switching. If the site needs full SSR capabilities (user accounts, dynamic content), re-evaluate Next.js.
