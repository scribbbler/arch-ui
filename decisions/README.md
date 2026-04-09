# Arch — Decision Log

Every significant decision made during the creation and maintenance of Arch lives here as a Markdown Architectural Decision Record (MADR). This includes technical, structural, tooling, and design decisions.

---

## Rules

- **Append only.** Records are never deleted. If a decision changes, a new record supersedes the old one and links back to it.
- **One decision per file.** If a single document covers two decisions, split it.
- **Write the record before implementing.** The decision exists here first, then in code.
- **Numbers are permanent.** Once assigned, a number never changes — even if the decision is superseded.
- **Agents read this folder.** Write clearly. Avoid ambiguity. Prose that requires interpretation will be interpreted incorrectly.

---

## Status Definitions

| Status | Meaning |
|---|---|
| `Proposed` | Under consideration, not yet decided |
| `Accepted` | Active — follow this decision |
| `Deprecated` | Was accepted, no longer applies, no replacement |
| `Superseded` | Replaced by a newer record — link provided |

---

## Folder Structure

As the number of records grows, they move into category subfolders. Numbers remain globally unique across all folders.

```
decisions/
├── foundation/        # Monorepo, tokens, CSS approach, RTL
├── components/        # Manifest, component API patterns, accessibility
├── tooling/           # Style Dictionary, Storybook, Astro, ESLint
└── agent/             # MCP server, llms.txt, Beads
```

For now, all records live at the root. Categorise when the count exceeds 15.

---

## Index

| # | File | Decision | Status |
|---|---|---|---|
| 0001 | `0001-use-pnpm-monorepo.md` | Use pnpm workspaces for monorepo structure | Accepted |
| 0002 | `0002-use-three-layer-token-architecture.md` | Use three-layer token architecture | Accepted |
| 0003 | `0003-use-css-custom-properties.md` | Use CSS custom properties for component styling | Accepted |
| 0004 | `0004-ship-mcp-server-as-first-class.md` | Ship MCP server as a first-class deliverable | Accepted |
| 0005 | `0005-use-component-manifest-as-source-of-truth.md` | Use component manifest JSON as source of truth | Accepted |
| 0006 | `0006-use-style-dictionary-for-tokens.md` | Use Style Dictionary for the token pipeline | Accepted |
| 0007 | `0007-use-astro-for-docs.md` | Use Astro for the documentation site | Accepted |
| 0008 | `0008-use-storybook-for-component-explorer.md` | Use Storybook for the component explorer | Accepted |
| 0009 | `0009-use-labels-prop-for-internationalisation.md` | Use a `labels` prop for component string internationalisation | Accepted |
| 0010 | `0010-use-full-word-tshirt-sizing.md` | Use full-word t-shirt sizing for token names | Accepted |

---

## How to Add a New Record

1. Assign the next available number
2. Create the file: `NNNN-verb-noun-describing-decision.md`
3. Use `TEMPLATE.md` — do not invent a new structure
4. Add a row to the index above
5. If it supersedes an existing record, update that record's status to `Superseded` and add the link

**File naming rules:**
- Active voice verb first: `use-`, `adopt-`, `avoid-`, `migrate-to-`
- Lowercase kebab-case
- Concise — the file name should make the decision clear without opening the file

**Claude Code:** before making any decision that changes architecture, token structure, component API, or documentation format — check this index first. If a record exists, follow it. If no record covers the decision you are about to make, create one and flag it for review before proceeding.
