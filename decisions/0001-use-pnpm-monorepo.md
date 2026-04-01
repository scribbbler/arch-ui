# Use pnpm Workspaces for Monorepo Structure

**Date:** TBD — fill in when repo is initialised
**Status:** Accepted
**Deciders:** Saurabh

---

## Context and Problem Statement

Arch has four independently publishable deliverables: tokens, components, MCP server, and icons. These need separate npm packages and version histories, but share tooling config and depend on each other during development. How should the repository be structured to support both independent publishing and a smooth local development experience?

---

## Considered Options

- pnpm workspaces — single repo, multiple packages managed by pnpm
- npm workspaces — same concept, npm's native implementation
- yarn workspaces — same concept, yarn's implementation
- Turborepo — build orchestration layer on top of a workspace manager
- Polyrepo — separate git repository per package

---

## Decision Outcome

**Chosen: pnpm workspaces.**

Single repo, pnpm manages the workspace. Packages are published independently using changesets.

### Positive Consequences
- Single CI pipeline, one place for contributors to work
- Local package linking without symlink hacks
- Cross-package changes (a token rename, for example) land in a single PR
- Shared ESLint, TypeScript, and Prettier config without duplication

### Negative Consequences
- Contributors must install pnpm — not standard for npm-only developers
- Some CI environments need an explicit pnpm setup step
- Requires changesets for independent package versioning on top of pnpm

---

## Pros and Cons of the Options

### pnpm workspaces
- Pro: Strictest dependency isolation — prevents phantom dependencies
- Pro: Fastest install speed and lowest disk usage of all workspace managers
- Pro: Native `workspace:*` protocol is clean and explicit
- Con: Less familiar than npm for some contributors

### npm workspaces
- Pro: Zero extra install — ships with Node
- Con: No strict isolation — packages can accidentally import undeclared deps
- Con: Slower installs than pnpm at scale

### yarn workspaces
- Pro: Mature and widely used
- Con: yarn v1 vs v2/v3 split causes contributor confusion
- Con: No meaningful isolation improvement over npm

### Turborepo
- Pro: Adds intelligent build caching and parallelisation
- Con: Adds a tool and mental model on top of an already complex setup
- Con: Premature — revisit if build times become a real bottleneck
- Verdict: Deferred. Can be layered on top of pnpm workspaces later without restructuring

### Polyrepo
- Pro: Complete independence — teams can own separate repos with separate pipelines
- Con: Cross-package changes require coordinated PRs across multiple repositories
- Con: No shared tooling without extracting a separate config package
- Verdict: Wrong fit for a small team building a cohesive system

---

## Revisit Conditions

If Arch grows to where separate teams own separate packages and need independent CI and release cadences, evaluate polyrepo at that point. Evaluate Turborepo first if build times degrade before restructuring the repo.
