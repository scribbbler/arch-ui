import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './visual-tests',
  outputDir: './test-results',
  snapshotDir: './visual-tests/__snapshots__',
  use: {
    baseURL: 'file://' + process.cwd() + '/storybook-static',
    browserName: 'chromium',
    screenshot: 'only-on-failure',
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', viewport: { width: 1280, height: 720 } },
    },
  ],
});
