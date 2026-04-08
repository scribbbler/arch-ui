/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  foundations: [
    {
      type: 'category',
      label: 'About Arch UI',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'foundations/index',
          label: 'Welcome',
        },
        'intro',
        'foundations/faqs',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/theming',
        'getting-started/dark-mode',
        'getting-started/rtl',
        'getting-started/agent-usage',
      ],
    },
    {
      type: 'category',
      label: 'Styles',
      collapsed: false,
      items: [
        'foundations/tokens',
        'foundations/color',
        'foundations/typography',
        'foundations/spacing',
        'foundations/layout-grids',
        'foundations/corner-radius',
        'foundations/border',
        'foundations/elevation',
      ],
    },
    {
      type: 'category',
      label: 'Expression',
      items: [
        'foundations/icons',
        'foundations/motion',
      ],
    },
    {
      type: 'category',
      label: 'Accessibility',
      items: [
        'foundations/accessibility',
        'foundations/alt-text',
        'foundations/a11y-first',
        'foundations/screen-readers',
        'foundations/text-resizing',
      ],
    },
  ],

  components: [
    {
      type: 'doc',
      id: 'components/index',
      label: 'Overview',
    },
    'components/changelog',
    'components/status',
    {
      type: 'category',
      label: 'Version guides',
      items: ['components/version-guides'],
    },
    {
      type: 'category',
      label: 'Buttons',
      items: [
        'components/button',
        'components/button-dock',
        'components/button-group',
        'components/sliding-button',
        'components/timed-button',
      ],
    },
    {
      type: 'category',
      label: 'Input and selection',
      items: [
        'components/check',
        'components/date-picker',
        'components/file-upload',
        'components/menu',
        'components/radio',
        'components/segmented-control',
        'components/slider',
        'components/star-rating',
        'components/stepper',
        'components/switch',
        'components/toggle',
        'components/time-picker',
        {
          type: 'category',
          label: 'Form fields',
          items: [
            'components/select',
            'components/text-field',
            'components/input',
            'components/textarea',
            'components/combobox',
            'components/checkbox',
            'components/pin-code',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Indicators and status',
      items: [
        'components/badge',
        'components/empty-state',
        'components/placeholder',
        'components/progress-bar',
        'components/skeleton',
        'components/spinner',
        'components/tag',
        'components/tooltip',
      ],
    },
    {
      type: 'category',
      label: 'Content display',
      items: [
        'components/accordion',
        'components/avatar',
        'components/list',
        'components/table',
      ],
    },
    {
      type: 'category',
      label: 'Messaging',
      items: ['components/alert', 'components/banner', 'components/toast'],
    },
    {
      type: 'category',
      label: 'Containers and layout',
      items: ['components/modal', 'components/drawer', 'components/popover', 'components/card', 'components/divider'],
    },
    {
      type: 'category',
      label: 'Navigation',
      items: ['components/tabs', 'components/pagination', 'components/breadcrumbs', 'components/link'],
    },
    {
      type: 'category',
      label: 'Data and tables',
      items: [
        'components/payment-card',
        'components/phone-input',
      ],
    },
  ],

  patterns: [
    'patterns/forms',
    'patterns/data-tables',
    'patterns/loading-states',
    'patterns/error-handling',
  ],
};

module.exports = sidebars;
