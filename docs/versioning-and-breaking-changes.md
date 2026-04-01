# Versioning and Breaking Change Policy

Design systems have a different definition of "breaking" than regular libraries. This document defines it precisely so Claude Code never makes a breaking change accidentally.

---

## Version Format

All packages use semantic versioning: `MAJOR.MINOR.PATCH`

| Bump | When |
|---|---|
| PATCH | Bug fixes, typo corrections in docs, non-visual internal refactors |
| MINOR | New components, new tokens, new variants, new props (backward compatible) |
| MAJOR | Breaking changes (see full list below) |

Packages are versioned independently using changesets. A token change and a component change in the same PR get separate changeset entries.

---

## What Counts as a Breaking Change

### Token breaking changes
- Renaming a token (even if the value stays the same)
- Deleting a token
- Changing a primitive token's value when it affects semantic tokens used in components
- Changing the alias chain (e.g. a semantic token now points to a different primitive)
- Restructuring the token file hierarchy

### Component breaking changes
- Renaming a prop
- Removing a prop
- Changing a prop's type (e.g. `string` to `enum`)
- Changing a prop's default value in a way that changes visual output
- Renaming a variant value (e.g. `variant="primary"` to `intent="primary"`)
- Removing a component entirely
- Changing a component's DOM structure in a way that breaks CSS selectors

### MCP server breaking changes
- Renaming a tool
- Removing a tool
- Changing a tool's input schema
- Changing a tool's output schema

### Documentation breaking changes
- Docs do not have breaking changes — they are never versioned independently

---

## What is NOT a Breaking Change

These do not require a major bump:

- Adding a new token (brands are unaffected — they only override, not enumerate)
- Adding a new prop with a default value
- Adding a new component
- Adding a new variant to an existing component
- Changing a token's value within the same intent (e.g. adjusting a colour for accessibility)
- Adding a new MCP tool
- Fixing a bug even if some users were relying on the buggy behaviour
- Visual micro-adjustments (< 2px, < 5% opacity) to fix rendering inconsistencies

---

## Deprecation Process

Never remove something without a deprecation period. The minimum is one minor version.

### Step 1 — Mark as deprecated
- Add `"status": "deprecated"` to the component manifest
- Add a `@deprecated` JSDoc comment to the component
- Add a console warning in development: `console.warn('[DS] ComponentName is deprecated. Use NewComponent instead.')`
- Update the ADR if there is one, or create a new ADR documenting the reason

### Step 2 — Update documentation
- Mark the component/token page with a deprecation notice
- Link to the replacement
- Add to changelog

### Step 3 — Remove (next major version only)
- Removal only happens in a MAJOR version bump
- A `BREAKING CHANGE:` footer in the commit is required
- Update `llms.txt` to remove the component/token reference
- Update the MCP server to return a helpful error if queried

---

## Changeset Workflow

After every PR that changes package behaviour:

```bash
pnpm changeset
```

Select the affected packages, choose the bump level, write a one-sentence summary. This generates a changeset file that is committed with the PR. On merge to main, the publish workflow reads changesets and bumps versions automatically.

Claude Code: you are responsible for creating the changeset file for every PR you open. Do not leave this for a human to do.

---

## Token Rename Protocol

Token renames are the highest-risk operation in this system. Every component, every brand's override file, and the MCP server may reference the old name.

Before renaming a token:

1. Search the entire codebase for the old token name
2. List every file that uses it
3. Create an ADR for the rename with justification
4. Add the new name and keep the old name as an alias for one version cycle
5. Update all internal usages to the new name in the same PR
6. In the next major version, remove the alias
7. Update `llms.txt` and the MCP server in the same PR

Never rename a token and remove the old name in a single step.
