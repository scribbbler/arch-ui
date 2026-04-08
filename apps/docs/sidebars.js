/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation', 'getting-started/theming', 'getting-started/dark-mode', 'getting-started/rtl', 'getting-started/agent-usage'],
    },
    {
      type: 'category',
      label: 'Foundations',
      link: { type: 'doc', id: 'foundations/index' },
      items: ['foundations/tokens', 'foundations/color', 'foundations/typography', 'foundations/spacing', 'foundations/icons', 'foundations/accessibility'],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
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
    },
    {
      type: 'category',
      label: 'Patterns',
      items: ['patterns/forms', 'patterns/data-tables', 'patterns/loading-states', 'patterns/error-handling'],
    },
    'changelog',
  ],
};

module.exports = sidebars;
