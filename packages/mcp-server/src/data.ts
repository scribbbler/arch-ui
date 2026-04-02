/**
 * Data loader for the MCP server.
 * Reads token JSON and component manifests from the built output.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..', '..');

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface TokenEntry {
  $value: string;
  $type: string;
  path: string[];
  original?: string;
}

export interface ComponentManifest {
  name: string;
  version?: string;
  description: string;
  category?: string;
  status?: string;
  accessibility?: {
    role?: string;
    keyboardInteraction?: string[];
    ariaAttributes?: string[];
    notes?: string[];
  };
  props?: Record<string, {
    type: string;
    default?: string;
    description: string;
    required?: boolean;
  }>;
  subComponents?: Record<string, unknown>;
  subcomponents?: Record<string, unknown>;
  variants?: Record<string, string>;
  sizes?: Record<string, string>;
  usage?: {
    do?: string[];
    dont?: string[];
    doNot?: string[];
  };
  tokens?: string[];
  [key: string]: unknown;
}

/* ─── State ──────────────────────────────────────────────────────────────────── */

let tokens: Record<string, TokenEntry> = {};
let components: Record<string, ComponentManifest> = {};

/* ─── Loaders ────────────────────────────────────────────────────────────────── */

function loadTokens(): void {
  const tokensPath = resolve(REPO_ROOT, 'packages/tokens/build/json/tokens.json');
  const raw = readFileSync(tokensPath, 'utf-8');
  tokens = JSON.parse(raw);
}

function loadComponents(): void {
  const componentsDir = resolve(REPO_ROOT, 'packages/components/src');
  components = {};

  const dirs = readdirSync(componentsDir).filter((d) => {
    const fullPath = join(componentsDir, d);
    return statSync(fullPath).isDirectory();
  });

  for (const dir of dirs) {
    const manifestPath = join(componentsDir, dir, `${dir}.manifest.json`);
    try {
      const raw = readFileSync(manifestPath, 'utf-8');
      const manifest: ComponentManifest = JSON.parse(raw);
      components[manifest.name.toLowerCase()] = manifest;
    } catch {
      // No manifest for this component — skip
    }
  }
}

/* ─── Public API ─────────────────────────────────────────────────────────────── */

export function loadAll(): void {
  loadTokens();
  loadComponents();
}

export function getTokens(): Record<string, TokenEntry> {
  return tokens;
}

export function getComponents(): Record<string, ComponentManifest> {
  return components;
}

/** Levenshtein distance for fuzzy matching. */
export function levenshtein(a: string, b: string): number {
  const la = a.length;
  const lb = b.length;
  const dp: number[][] = Array.from({ length: la + 1 }, () =>
    Array.from({ length: lb + 1 }, () => 0),
  );

  for (let i = 0; i <= la; i++) dp[i][0] = i;
  for (let j = 0; j <= lb; j++) dp[0][j] = j;

  for (let i = 1; i <= la; i++) {
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }

  return dp[la][lb];
}
