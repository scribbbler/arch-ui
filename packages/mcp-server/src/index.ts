#!/usr/bin/env node

/**
 * @arch-ui/mcp-server
 *
 * MCP server for agent consumption of the Arch Design System.
 * Exposes tools for querying components, tokens, patterns, and validation.
 * Uses stdio transport.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { loadAll } from './data.js';

import * as getComponent from './tools/get-component.js';
import * as findComponent from './tools/find-component.js';
import * as listComponents from './tools/list-components.js';
import * as getToken from './tools/get-token.js';
import * as listTokens from './tools/list-tokens.js';
import * as getPattern from './tools/get-pattern.js';
import * as validateUsage from './tools/validate-usage.js';
import * as getTokenAliasChain from './tools/get-token-alias-chain.js';
import * as listDeprecated from './tools/list-deprecated.js';
import * as reload from './tools/reload.js';

/* ─── Load data ──────────────────────────────────────────────────────────────── */

loadAll();

/* ─── Server setup ───────────────────────────────────────────────────────────── */

const server = new McpServer({
  name: 'arch-ui',
  version: '0.1.0',
});

/* ─── Register tools ─────────────────────────────────────────────────────────── */

server.tool(
  'get_component',
  getComponent.definition.description,
  { name: z.string().describe('Component name (case-insensitive).') },
  async ({ name }) => {
    try {
      const result = getComponent.handler({ name });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: JSON.stringify({ error: String(e) }) }] };
    }
  },
);

server.tool(
  'find_component',
  findComponent.definition.description,
  { intent: z.string().describe('What you want to accomplish.') },
  async ({ intent }) => {
    try {
      const result = findComponent.handler({ intent });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: JSON.stringify({ error: String(e) }) }] };
    }
  },
);

server.tool(
  'list_components',
  listComponents.definition.description,
  {
    category: z.string().optional().describe('Filter by category.'),
    status: z.string().optional().describe('Filter by status.'),
  },
  async ({ category, status }) => {
    try {
      const result = listComponents.handler({ category, status });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: JSON.stringify({ error: String(e) }) }] };
    }
  },
);

server.tool(
  'get_token',
  getToken.definition.description,
  { name: z.string().describe('Token name (e.g. "color-background-default").') },
  async ({ name }) => {
    try {
      const result = getToken.handler({ name });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: JSON.stringify({ error: String(e) }) }] };
    }
  },
);

server.tool(
  'list_tokens',
  listTokens.definition.description,
  { category: z.string().optional().describe('Filter by category (e.g. "color", "spacing").') },
  async ({ category }) => {
    try {
      const result = listTokens.handler({ category });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: JSON.stringify({ error: String(e) }) }] };
    }
  },
);

server.tool(
  'get_pattern',
  getPattern.definition.description,
  { name: z.string().describe('Pattern name (e.g. "form", "dialog").') },
  async ({ name }) => {
    try {
      const result = getPattern.handler({ name });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: JSON.stringify({ error: String(e) }) }] };
    }
  },
);

server.tool(
  'validate_usage',
  validateUsage.definition.description,
  {
    component: z.string().describe('Component name.'),
    props: z.record(z.string(), z.any()).describe('Props to validate.'),
  },
  async ({ component, props }) => {
    try {
      const result = validateUsage.handler({ component, props: props as Record<string, unknown> });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: JSON.stringify({ error: String(e) }) }] };
    }
  },
);

server.tool(
  'get_token_alias_chain',
  getTokenAliasChain.definition.description,
  { name: z.string().describe('Token name (e.g. "color-background-default").') },
  async ({ name }) => {
    try {
      const result = getTokenAliasChain.handler({ name });
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: JSON.stringify({ error: String(e) }) }] };
    }
  },
);

server.tool(
  'list_deprecated',
  listDeprecated.definition.description,
  {},
  async () => {
    try {
      const result = listDeprecated.handler();
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: JSON.stringify({ error: String(e) }) }] };
    }
  },
);

server.tool(
  'reload',
  reload.definition.description,
  {},
  async () => {
    try {
      const result = reload.handler();
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      return { content: [{ type: 'text', text: JSON.stringify({ error: String(e) }) }] };
    }
  },
);

/* ─── Start ──────────────────────────────────────────────────────────────────── */

const transport = new StdioServerTransport();
await server.connect(transport);
