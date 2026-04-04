/**
 * Visual regression tests for Arch UI components.
 *
 * These tests load each component story from the built Storybook static output
 * and take screenshots for comparison. Run after `storybook build`.
 *
 * Usage: npx playwright test --config=playwright.config.ts
 */

import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface StoryEntry {
  id: string;
  title: string;
  name: string;
  type: string;
}

// Load the story index from the built Storybook
const indexPath = resolve(__dirname, '../storybook-static/index.json');
let stories: StoryEntry[] = [];

try {
  const index = JSON.parse(readFileSync(indexPath, 'utf-8'));
  const entries = index.entries ?? index.stories ?? {};
  stories = Object.values(entries).filter(
    (entry: unknown) => (entry as StoryEntry).type === 'story',
  ) as StoryEntry[];
} catch {
  // Storybook not built — tests will be skipped
}

// Take a screenshot of each story
for (const story of stories) {
  test(`visual: ${story.title} — ${story.name}`, async ({ page }) => {
    const iframePath = resolve(
      __dirname,
      `../storybook-static/iframe.html?id=${story.id}&viewMode=story`,
    );
    await page.goto(`file://${iframePath}`);

    // Wait for the story to render
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot(`${story.id}.png`, {
      fullPage: true,
    });
  });
}

// Fallback test if no stories are found
if (stories.length === 0) {
  test('storybook must be built before visual regression tests', () => {
    test.skip(true, 'Storybook static output not found. Run `storybook build` first.');
  });
}
