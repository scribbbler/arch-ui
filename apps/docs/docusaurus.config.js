const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Walks a docs directory at build time and returns a map from relative doc id
 * (e.g. "foundations/tokens") to that file's frontmatter. Exposed to the client
 * via `customFields.docFrontmatter` so shared components like `<CategoryCard />`
 * and `<PageHeader />` can render content from a single source (the page's
 * frontmatter) without duplicating it in data modules or JSX.
 */
function loadDocFrontmatter(rootDir) {
  const result = {};
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.mdx?$/.test(entry.name)) continue;
      const raw = fs.readFileSync(full, 'utf8');
      const { data } = matter(raw);
      const id = path
        .relative(rootDir, full)
        .replace(/\\/g, '/')
        .replace(/\.(md|mdx)$/, '');
      result[id] = data;
    }
  };
  walk(rootDir);
  return result;
}

const docFrontmatter = loadDocFrontmatter(path.join(__dirname, 'docs'));

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Arch Design System',
  tagline: '58 components, with MCP server for AI agents',
  url: process.env.DOCS_URL || 'https://arch-ui.dev',
  baseUrl: process.env.DOCS_BASE_URL || '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  customFields: {
    docFrontmatter,
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          breadcrumbs: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Arch UI',
        items: [
          { type: 'docSidebar', sidebarId: 'foundations', position: 'left', label: 'Foundations' },
          { type: 'docSidebar', sidebarId: 'components', position: 'left', label: 'Components' },
          { type: 'docSidebar', sidebarId: 'patterns', position: 'left', label: 'Patterns' },
          { href: 'https://scribbbler.github.io/arch-ui/storybook/', label: 'Storybook', position: 'right' },
          { href: 'https://github.com/scribbbler/arch-ui', label: 'GitHub', position: 'right' },
        ],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),
};

module.exports = config;

