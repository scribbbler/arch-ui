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
      type: 'category',
      label: 'Buttons',
      items: ['components/button', 'components/button-group', 'components/button-dock'],
    },
    {
      type: 'category',
      label: 'Input and Selection',
      items: ['components/input', 'components/select', 'components/combobox', 'components/textarea', 'components/checkbox', 'components/radio', 'components/toggle', 'components/slider', 'components/stepper', 'components/pin-code', 'components/phone-input', 'components/payment-card', 'components/segmented-control', 'components/file-upload'],
    },
    {
      type: 'category',
      label: 'Navigation',
      items: ['components/tabs', 'components/pagination', 'components/breadcrumbs', 'components/link'],
    },
    {
      type: 'category',
      label: 'Messaging',
      items: ['components/alert', 'components/banner', 'components/toast', 'components/tooltip'],
    },
    {
      type: 'category',
      label: 'Containers and Layout',
      items: ['components/modal', 'components/drawer', 'components/popover', 'components/card', 'components/divider'],
    },
    {
      type: 'category',
      label: 'Content Display',
      items: ['components/accordion', 'components/avatar', 'components/table', 'components/list'],
    },
    {
      type: 'category',
      label: 'Indicators',
      items: ['components/badge', 'components/tag', 'components/spinner', 'components/skeleton', 'components/progress-bar'],
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
