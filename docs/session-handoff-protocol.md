# Session Handoff Protocol

Claude Code operates within a context window. When a session ends, context is lost. This protocol ensures that the next session — whether seconds or weeks later — can resume without ambiguity.

This is not optional. An incomplete handoff means the next session starts blind and makes guesses.

---

## End of Every Session

Before closing a session, do all of the following in order:

### 1. Commit all work
```bash
git add .
git commit -m "type(scope): description"
```
Do not leave uncommitted changes. If work is incomplete, commit with `WIP:` prefix and a note in the commit body describing exactly what is incomplete and what the next step is.

### 2. Run the build
```bash
pnpm build
```
If the build fails, fix it before ending the session. Do not leave a broken build for the next session.

### 3. Run tests
```bash
pnpm test
```
If tests fail, fix them or — if genuinely out of scope — file a Beads issue with `blocks: [current issue]` and note the failure explicitly.

### 4. Update Beads
For every Beads issue worked on this session:
- Close completed issues with a one-sentence summary of what was done
- Update in-progress issues with current status and what remains
- File new issues for any discovered work with `discovered-from: [current issue id]`

### 5. Write a session summary
File a Beads message on the active epic:

```
Session [date]:
- Completed: [list what was finished]
- In progress: [list what is partially done and where it was left]
- Blocked: [list anything that cannot proceed and why]
- Next: [the single most important thing the next session should start with]
- Decisions made: [any decisions, even small ones, with brief reasoning]
```

### 6. Update llms.txt if needed
If a new component was added, a token was renamed, or any public-facing interface changed — update `llms.txt` before ending the session. Do not defer this.

---

## Start of Every Session

Before writing any code:

### 1. Load task state
```bash
bd quickstart
```

### 2. Read the last session summary
Find the most recent session summary in Beads messages on the active epic. This is your starting point.

### 3. Check git log
```bash
git log --oneline -10
```
Understand what was committed last. Do not rely on memory.

### 4. Confirm the build passes
```bash
pnpm build && pnpm test
```
If it fails, this is the first task — fix it before doing anything else.

### 5. Confirm the next task with the user
State what you understand the next task to be based on the session summary and Beads. Wait for confirmation before starting.

---

## Handling an Orphaned Session

If you start a session and find:
- No session summary in Beads
- Uncommitted changes
- A failing build

Do the following in order:
1. Run `git diff` and `git status` to understand the state
2. Run `pnpm build` and `pnpm test` to understand what is broken
3. Write a recovery summary: what you found, what state the project is in
4. Ask the user how to proceed before touching anything

Do not silently clean up or assume intent. Always surface the state and confirm.

---

## Context Window Management

If a session is running long and context is filling up:

1. Prioritise finishing the current atomic task before context runs out
2. Write the end-of-session summary early — do not wait for the last minute
3. Commit what is done
4. File Beads issues for what remains
5. End the session cleanly

A clean incomplete session is better than a rushed complete one with missing handoff.

---

## What Counts as a Decision (Must Be Recorded)

During sessions, decisions happen constantly. These must be recorded — either in an ADR or in the session summary:

- Choosing between two implementation approaches
- Deviating from the plan for any reason
- Adding a dependency not in the original stack
- Skipping a step in a phase and why
- Choosing a token name that required judgment
- Any prop API decision not explicitly specified in the plan

Small decisions go in the session summary. Architectural decisions get an ADR.
