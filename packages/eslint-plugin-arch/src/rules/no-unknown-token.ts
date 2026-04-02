/**
 * arch/no-unknown-token
 *
 * Disallows var(--token-name) references where the token name does not exist
 * in the built tokens.json.
 */

import type { Rule } from 'eslint';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const VAR_PATTERN = /var\(--([a-z0-9-]+)\)/g;

let tokenNames: Set<string> | null = null;

function loadTokenNames(): Set<string> {
  if (tokenNames) return tokenNames;

  try {
    // Walk up from this file to find the repo root
    let dir = resolve(import.meta.dirname ?? __dirname, '..');
    for (let i = 0; i < 10; i++) {
      try {
        const tokensPath = resolve(dir, 'packages/tokens/build/json/tokens.json');
        const raw = readFileSync(tokensPath, 'utf-8');
        const tokens = JSON.parse(raw);
        tokenNames = new Set(Object.keys(tokens));
        return tokenNames;
      } catch {
        dir = resolve(dir, '..');
      }
    }
  } catch {
    // Fall through
  }

  tokenNames = new Set();
  return tokenNames;
}

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow var(--token-name) where the token is not in tokens.json.',
    },
    messages: {
      unknownToken:
        'Unknown token "{{name}}". This token does not exist in tokens.json. Check for typos.',
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    if (!filename.endsWith('.css')) return {};

    const knownTokens = loadTokenNames();
    if (knownTokens.size === 0) return {}; // Tokens not built yet

    const sourceCode = context.sourceCode ?? context.getSourceCode();
    const text = sourceCode.getText();
    const lines = text.split('\n');

    let inComment = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Track multi-line comments
      if (line.includes('/*')) inComment = true;
      if (line.includes('*/')) { inComment = false; continue; }
      if (inComment) continue;

      // Skip single-line comments
      const trimmed = line.trim();
      if (trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('//')) continue;

      let match: RegExpExecArray | null;
      VAR_PATTERN.lastIndex = 0;

      while ((match = VAR_PATTERN.exec(line)) !== null) {
        const tokenName = match[1];
        if (!knownTokens.has(tokenName)) {
          context.report({
            loc: { line: i + 1, column: match.index },
            messageId: 'unknownToken',
            data: { name: tokenName },
          });
        }
      }
    }

    return {};
  },
};

export default rule;
