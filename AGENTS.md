# CLAUDE.md — Operating Manual for Claude Code

This file is read at the start of every session. Follow it without exception.

---

## Start of Session Protocol

Run these steps before writing any code:

1. `bd quickstart` — load current task state from Beads
2. Read `/decisions/README.md` — check the ADR index
3. Read `/packages/tokens/build/json/tokens.json` — load current token names into context
4. Check `git status` — understand what was in progress
5. Ask: "What should I work on?" — do not assume, do not infer from git history alone

Do not begin implementation until you have confirmed the active task with the user.

---

## Non-Negotiable Rules

These apply to every file, every session, with no exceptions:

### Tokens
- Never use a hex value, pixel value, or named colour directly in component CSS
- Every style value must be `var(--token-name)`
- Before using a token, verify it exists in `packages/tokens/build/json/tokens.json`
- If you need a value that has no token, stop — add the token to `src/semantic/` first, rebuild tokens, then use it
- Never invent a token name. Follow the naming convention in `/docs/token-naming.md`

### Components
- Write the manifest JSON before writing any TSX
- Never import from another component's folder directly — use the barrel `index.ts`
- Every interactive element needs `:focus-visible` using `var(--color-border-focus)`
- Every component must be `forwardRef` compatible
- No inline styles anywhere

### Decisions
- Before making any architectural, API, or structural decision — check `/decisions/README.md`
- If an ADR exists for the decision, follow it
- If no ADR exists, create one and flag it for review before proceeding
- Do not make undocumented decisions silently

### Tests
- Do not mark a task complete if tests are failing
- Do not skip writing tests to save time — this creates maintenance debt agents cannot see
- Run `pnpm test` before closing any Beads issue

---

## When to Stop and Ask

Stop immediately and ask the user before proceeding if:

- A change would affect more than one package simultaneously
- You are about to rename a token that is already in use
- A component API change would break existing prop interfaces
- The right approach is genuinely ambiguous after checking ADRs
- You discover an inconsistency in existing code that was not the task you were given
- A dependency needs to be added that is not already in the stack decisions

Do not resolve these silently. Do not pick the "most likely" option and continue.

---

## End of Session Protocol

Before ending any session:

1. Close completed Beads issues with a summary of what was done
2. Create Beads issues for any discovered work (use `discovered-from` dependency type)
3. Run `pnpm build` — confirm it passes
4. Run `pnpm test` — confirm it passes
5. Commit all work with a conventional commit message (see below)
6. Write a one-paragraph session summary as a Beads message on the active epic

Do not end a session with uncommitted work or failing tests.

---

## Commit Message Format

Use conventional commits. Format: `type(scope): description`

| Type | When to use |
|---|---|
| `feat` | New component, token, or MCP tool |
| `fix` | Bug fix in existing component or token |
| `docs` | Documentation or manifest changes only |
| `refactor` | Code change with no behaviour change |
| `test` | Adding or fixing tests |
| `chore` | Build config, CI, tooling |
| `deprecate` | Marking something for removal |
| `break` | Breaking change — use sparingly, see breaking change policy |

Scope is the package or component name: `feat(button): add loading state`, `fix(tokens): correct shadow alias chain`

Breaking changes: add `!` after scope and a `BREAKING CHANGE:` footer. Example:
```
feat(button)!: rename variant prop to intent

BREAKING CHANGE: The `variant` prop has been renamed to `intent` to align with token naming. Update all Button usages.
```

---

## File Ownership Map

If you are unsure which file to edit, use this:

| What you want to change | Where it lives |
|---|---|
| A token value | `packages/tokens/src/semantic/` or `primitive/` |
| A component's visual behaviour | `packages/components/src/[Component]/[Component].css` |
| A component's API (props) | `packages/components/src/[Component]/[Component].tsx` AND manifest |
| A component's usage rules | `packages/components/src/[Component]/[Component].manifest.json` |
| What agents know about a component | Same manifest |
| What the MCP server returns | `packages/mcp-server/src/tools/` |
| A doc page | `apps/docs/src/pages/` — but check if it is auto-generated first |
| The agent entry point | `llms.txt` at repo root |
| An architectural decision | `/decisions/ADR-NNN-*.md` |

---

## Discovered Work

If you find a bug, inconsistency, or missing piece while working on something else:

1. Do not fix it immediately — it is out of scope
2. File a Beads issue with `discovered-from: [current issue id]`
3. Note it in a comment if it is in the same file
4. Continue the original task

This keeps sessions focused and ensures discovered work is not lost.

---

## Package Responsibility Map

| Package | What it owns | What it must not do |
|---|---|---|
| `@arch-ui/tokens` | All token values and outputs | Import from components |
| `@arch-ui/components` | All React components and manifests | Hardcode any values |
| `@arch-ui/icons` | SVG icon set and React wrappers | Define tokens |
| `@arch-ui/mcp-server` | MCP tools and data loading | Contain component logic |
| `apps/docs` | Documentation site | Be the source of truth for anything |
| `apps/storybook` | Component explorer | Duplicate manifest content |
