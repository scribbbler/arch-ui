/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Arch Design System',
  tagline: '58 components, Uber Base aligned, with MCP server for AI agents',
  url: process.env.DOCS_URL || 'https://arch-ui.dev',
  baseUrl: process.env.DOCS_BASE_URL || '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
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
          { type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Docs' },
          { href: 'http://localhost:6006', label: 'Storybook', position: 'right' },
          { href: 'https://github.com/your-org/arch-ui', label: 'GitHub', position: 'right' },
        ],
      },
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
