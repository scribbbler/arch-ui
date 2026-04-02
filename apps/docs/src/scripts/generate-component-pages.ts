/**
 * Reads all component manifests and generates MDX pages in src/pages/components/.
 * Run as part of the docs build step.
 *
 * Usage: npx tsx src/scripts/generate-component-pages.ts
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const COMPONENTS_DIR = resolve(__dirname, '../../../../packages/components/src');
const OUTPUT_DIR = resolve(__dirname, '../pages/components');

interface Manifest {
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
  usage?: {
    do?: string[];
    dont?: string[];
    doNot?: string[];
  };
  tokens?: string[];
}

function escapeMdx(val: unknown): string {
  return String(val ?? '')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

function loadManifests(): Manifest[] {
  const manifests: Manifest[] = [];
  const dirs = readdirSync(COMPONENTS_DIR).filter((d) =>
    statSync(join(COMPONENTS_DIR, d)).isDirectory(),
  );

  for (const dir of dirs) {
    const manifestPath = join(COMPONENTS_DIR, dir, `${dir}.manifest.json`);
    try {
      const raw = readFileSync(manifestPath, 'utf-8');
      manifests.push(JSON.parse(raw));
    } catch {
      // No manifest — skip
    }
  }

  return manifests.sort((a, b) => a.name.localeCompare(b.name));
}

function generatePropsTable(props: Manifest['props']): string {
  if (!props || Object.keys(props).length === 0) return '';

  let table = `## Props\n\n`;
  table += `| Prop | Type | Default | Description |\n`;
  table += `|---|---|---|---|\n`;

  for (const [name, spec] of Object.entries(props)) {
    const type = escapeMdx((spec.type ?? '—').replace(/\|/g, '\\|'));
    const def = escapeMdx(spec.default ?? '—');
    const desc = escapeMdx((spec.description ?? '').replace(/\|/g, '\\|'));
    table += `| \`${name}\` | \`${type}\` | \`${def}\` | ${desc} |\n`;
  }

  return table;
}

function generateAccessibility(a11y: Manifest['accessibility']): string {
  if (!a11y) return '';

  let section = `## Accessibility\n\n`;

  if (a11y.role) {
    section += `**Role:** \`${a11y.role}\`\n\n`;
  }

  if (a11y.ariaAttributes && a11y.ariaAttributes.length > 0) {
    section += `**ARIA attributes:** ${a11y.ariaAttributes.map((a) => `\`${a}\``).join(', ')}\n\n`;
  }

  if (a11y.keyboardInteraction && a11y.keyboardInteraction.length > 0) {
    section += `**Keyboard interaction:**\n\n`;
    for (const k of a11y.keyboardInteraction) {
      section += `- ${k}\n`;
    }
    section += '\n';
  }

  if (a11y.notes && a11y.notes.length > 0) {
    section += `**Notes:**\n\n`;
    for (const note of a11y.notes) {
      section += `- ${escapeMdx(note)}\n`;
    }
    section += '\n';
  }

  return section;
}

function generateUsage(usage: Manifest['usage']): string {
  if (!usage) return '';

  let section = `## Usage Guidelines\n\n`;

  const doList = usage.do ?? [];
  const dontList = usage.dont ?? usage.doNot ?? [];

  if (doList.length > 0) {
    section += `**Do:**\n\n`;
    for (const item of doList) {
      section += `- ${escapeMdx(item)}\n`;
    }
    section += '\n';
  }

  if (dontList.length > 0) {
    section += `**Don't:**\n\n`;
    for (const item of dontList) {
      section += `- ${escapeMdx(item)}\n`;
    }
    section += '\n';
  }

  return section;
}

function generateTokens(tokens: string[] | undefined): string {
  if (!tokens || !Array.isArray(tokens) || tokens.length === 0) return '';

  let section = `## Tokens Used\n\n`;
  for (const token of tokens) {
    section += `- \`var(--${token})\`\n`;
  }
  section += '\n';

  return section;
}

function generatePage(manifest: Manifest): string {
  const statusClass = manifest.status ?? 'stable';

  let page = `---
layout: ../../layouts/DocsLayout.astro
title: "${manifest.name}"
---

# ${manifest.name}

<span class="status-badge status-badge--${statusClass}">${statusClass}</span>

${escapeMdx(manifest.description)}

`;

  page += generatePropsTable(manifest.props);
  page += generateAccessibility(manifest.accessibility);
  page += generateUsage(manifest.usage);
  page += generateTokens(manifest.tokens ?? []);

  return page;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

mkdirSync(OUTPUT_DIR, { recursive: true });

const manifests = loadManifests();

for (const manifest of manifests) {
  const slug = manifest.name.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const filePath = join(OUTPUT_DIR, `${slug}.mdx`);
  writeFileSync(filePath, generatePage(manifest));
}

// Generate status overview page
let statusPage = `---
layout: ../../layouts/DocsLayout.astro
title: "Component Status"
---

# Component Status

All ${manifests.length} components and their current status.

| Component | Description | Status |
|---|---|---|
`;

for (const m of manifests) {
  const slug = m.name.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const statusClass = m.status ?? 'stable';
  statusPage += `| [${m.name}](/components/${slug}) | ${escapeMdx(m.description.split('.')[0])}. | <span class="status-badge status-badge--${statusClass}">${statusClass}</span> |\n`;
}

writeFileSync(join(OUTPUT_DIR, 'status.mdx'), statusPage);

console.log(`✓ Generated ${manifests.length} component pages + status page`);
