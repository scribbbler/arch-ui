# Ship MCP Server as a First-Class Deliverable

**Date:** 2026-04-01
**Status:** Accepted
**Deciders:** Saurabh

---

## Context and Problem Statement

Arch is designed to be consumed by both human developers and AI agents. Agents need structured, queryable access to component metadata, token values, usage rules, and patterns. A static documentation site serves humans well but is not reliably consumable by agents — they need an API-like interface. How should Arch expose its knowledge to agents as a first-class deliverable alongside the component library?

---

## Considered Options

- MCP server — a Model Context Protocol server shipping as an npm package
- REST API — a traditional HTTP API serving component and token data
- Static JSON files — pre-built JSON files served from a CDN
- `llms.txt` only — a single text file at the repo root with system context

---

## Decision Outcome

**Chosen: MCP server as a first-class npm package (`@arch-ui/mcp-server`).**

The MCP server reads from built token JSON and component manifests at startup. It exposes structured tools (`get_component`, `find_component`, `list_components`, `get_token`, `list_tokens`, `get_pattern`, `validate_usage`, `get_token_alias_chain`, `list_deprecated`) via stdio transport. Agents connect to it as an MCP tool provider.

### Positive Consequences
- Agents get structured, typed responses rather than parsing prose or HTML
- The MCP protocol is becoming a standard for agent tool integration — aligns with the ecosystem direction
- The server derives all data from manifests and token JSON — no separate data to maintain
- `validate_usage` lets agents check their work before outputting code

### Negative Consequences
- The MCP server is an additional package to maintain and version
- MCP is still an emerging protocol — breaking changes in the SDK are possible
- Requires agents to have MCP client support (increasingly common but not universal)

---

## Pros and Cons of the Options

### MCP server
- Pro: Structured tool interface designed for agent consumption
- Pro: Can validate agent-generated code against component manifests
- Pro: Derives data from existing build artefacts — no separate data source
- Con: Additional package to maintain
- Con: MCP protocol is still maturing

### REST API
- Pro: Universally accessible — any HTTP client can call it
- Con: Requires hosting infrastructure — adds operational burden
- Con: Not designed for agent tool integration — agents would need to parse HTTP responses
- Verdict: Rejected. Over-engineered for a design system that ships as npm packages

### Static JSON files
- Pro: Zero runtime — just files on a CDN
- Con: No query interface — agents must download everything and filter locally
- Con: No validation tool — agents cannot check their work
- Verdict: Rejected. Insufficient for the agent interaction model

### `llms.txt` only
- Pro: Zero infrastructure — a single file at the repo root
- Con: Unstructured text — agents must parse natural language
- Con: Cannot cover the full surface area of component metadata
- Verdict: Complementary, not sufficient. `llms.txt` is shipped alongside the MCP server as an entry point, not a replacement

---

## Revisit Conditions

If the MCP protocol is superseded by a widely adopted alternative agent tool protocol, migrate the server to that protocol. If agent tool integration shifts entirely to static file-based approaches, evaluate whether the server is still needed.
