/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Arch Design System',
  tagline: '58 components, with MCP server for AI agents',
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
          { type: 'docSidebar', sidebarId: 'foundations', position: 'left', label: 'Foundations' },
          { type: 'docSidebar', sidebarId: 'components', position: 'left', label: 'Components' },
          { type: 'docSidebar', sidebarId: 'patterns', position: 'left', label: 'Patterns' },
          { href: 'https://scribbbler.github.io/arch-ui/storybook/', label: 'Storybook', position: 'right' },
          { href: 'https://github.com/scribbbler/arch-ui', label: 'GitHub', position: 'right' },
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
        },
        breadcrumbs: false,
      },
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
