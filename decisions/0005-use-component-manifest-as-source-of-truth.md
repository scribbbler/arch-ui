# Use Component Manifest JSON as Source of Truth

**Date:** TBD
**Status:** Accepted
**Deciders:** Saurabh

---

## Context and Problem Statement

Arch serves two distinct audiences: humans reading documentation and agents querying the MCP server. Both need to know a component's variants, states, props, usage rules, accessibility requirements, and related components. If this information lives only in MDX docs, agents cannot reliably consume it. If it lives only in TypeScript types, humans cannot read it without a build step and agents still miss usage rules. Where should component knowledge live so that both audiences get accurate, in-sync information?

---

## Considered Options

- Component manifest JSON — a structured file per component, all others derived from it
- TypeScript types as source of truth — derive docs and MCP responses from types
- MDX documentation as source of truth — derive everything from written docs
- Storybook CSF metadata — use argTypes and story metadata as the authority

---

## Decision Outcome

**Chosen: Component manifest JSON.**

Every component has a `[Component].manifest.json` file. Documentation pages and MCP server responses are both generated from this file. The manifest is always written first — before TSX, before CSS, before stories. It is validated against `manifest.schema.json` in CI on every PR.

### Positive Consequences
- Single source prevents documentation and MCP server from drifting out of sync
- JSON is equally readable by humans, agents, build scripts, and linters
- Manifest-first forces the component contract to be defined before implementation — reduces rework
- CI can validate manifests against a JSON schema, catching missing fields before they ship
- Agents get structured, typed data from the MCP server rather than parsed prose

### Negative Consequences
- Adding a new component requires writing the manifest before any code — some contributors find this unfamiliar
- The manifest schema is now a public API — schema changes are breaking changes requiring migration
- Two files to keep in sync per component (manifest + TSX) rather than one — mitigated by CI validation

---

## Pros and Cons of the Options

### Component manifest JSON
- Pro: Machine-readable and human-readable without a build step
- Pro: Single source that multiple consumers (docs, MCP, Storybook badge) derive from
- Pro: JSON Schema validation is simple and fast in CI
- Pro: Agents can query structured data directly rather than parsing prose
- Con: An extra file per component that contributors must learn to write
- Con: Schema changes are breaking changes

### TypeScript types as source of truth
- Pro: Already exists — props are already typed
- Con: Types cover props only — variants, usage rules, do/don't guidance, accessibility notes, and related components are not expressible in types alone
- Con: Would require a separate prose document for the non-type information, creating two sources that will drift
- Verdict: Rejected. Types are necessary but not sufficient

### MDX documentation as source of truth
- Pro: Human-readable, easy to write
- Con: Not machine-readable without fragile custom parsing
- Con: Agents would need to parse natural language to extract structured information — error-prone
- Con: Build scripts generating token tables or status pages would need to parse markdown
- Verdict: Rejected. Wrong direction for an agent-first system

### Storybook CSF metadata
- Pro: Already part of the workflow — stories must be written anyway
- Pro: `argTypes` covers props reasonably well
- Con: Does not cover usage rules, do/don't guidance, or accessibility notes
- Con: Storybook is a dev dependency — the manifest would not be available in production or to agents without running Storybook
- Con: Still requires a separate source for the information not covered by argTypes
- Verdict: Rejected. Covers too little of the required information surface

---

## Revisit Conditions

If a widely adopted standard component metadata spec emerges that tooling adopts broadly — similar to how OpenAPI standardised API docs — evaluate migrating to it and update this decision. The manifest schema should map cleanly to any such standard.
