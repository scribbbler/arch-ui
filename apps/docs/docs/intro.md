---
slug: /intro
sidebar_position: 1
---

# Arch Design System

A React component library with 58 components, aligned with Uber Base Web. Built for teams that want accessible, themeable UI primitives with first-class AI agent support.

## Quick Start

```bash
pnpm add @arch-ui/components @arch-ui/tokens
```

```tsx
import '@arch-ui/tokens/css';
import { Button } from '@arch-ui/components';

<Button kind="primary" onClick={handleSave}>Save</Button>
```

## What's Included

| Package | Contents |
|---------|----------|
| `@arch-ui/tokens` | 400+ CSS custom properties — colors (Uber Base palette), typography, spacing, shadows |
| `@arch-ui/components` | 58 React components with full a11y and RTL support |
| `@arch-ui/icons` | 43 Material Design Icons with React wrappers |
| `@arch-ui/mcp-server` | MCP server with 10 tools for AI agent consumption |

## Design Principles

- **Token-driven** — every visual value comes from a CSS custom property
- **Accessible** — WCAG 2.1 AA, keyboard navigation, screen reader support
- **Composable** — small components that compose into complex UIs
- **Agent-friendly** — MCP server + llms.txt for AI consumption
