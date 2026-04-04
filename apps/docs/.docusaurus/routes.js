import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'f67'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '98d'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'be2'),
            routes: [
              {
                path: '/changelog',
                component: ComponentCreator('/changelog', 'da8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/accordion',
                component: ComponentCreator('/components/accordion', 'aef'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/alert',
                component: ComponentCreator('/components/alert', 'fdc'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/avatar',
                component: ComponentCreator('/components/avatar', 'b23'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/badge',
                component: ComponentCreator('/components/badge', '51f'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/banner',
                component: ComponentCreator('/components/banner', 'a51'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/breadcrumbs',
                component: ComponentCreator('/components/breadcrumbs', '866'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/button',
                component: ComponentCreator('/components/button', '92c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/button-dock',
                component: ComponentCreator('/components/button-dock', '291'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/button-group',
                component: ComponentCreator('/components/button-group', 'a28'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/card',
                component: ComponentCreator('/components/card', '4a6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/checkbox',
                component: ComponentCreator('/components/checkbox', '67e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/combobox',
                component: ComponentCreator('/components/combobox', '09a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/divider',
                component: ComponentCreator('/components/divider', 'b09'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/drawer',
                component: ComponentCreator('/components/drawer', '690'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/file-upload',
                component: ComponentCreator('/components/file-upload', '701'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/input',
                component: ComponentCreator('/components/input', '2c7'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/link',
                component: ComponentCreator('/components/link', 'a91'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/list',
                component: ComponentCreator('/components/list', 'bfe'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/modal',
                component: ComponentCreator('/components/modal', 'e99'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/pagination',
                component: ComponentCreator('/components/pagination', 'b3d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/payment-card',
                component: ComponentCreator('/components/payment-card', '421'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/phone-input',
                component: ComponentCreator('/components/phone-input', 'aa5'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/pin-code',
                component: ComponentCreator('/components/pin-code', 'a89'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/popover',
                component: ComponentCreator('/components/popover', '1e2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/progress-bar',
                component: ComponentCreator('/components/progress-bar', '71c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/radio',
                component: ComponentCreator('/components/radio', 'eba'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/segmented-control',
                component: ComponentCreator('/components/segmented-control', '0c0'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/select',
                component: ComponentCreator('/components/select', '2f2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/skeleton',
                component: ComponentCreator('/components/skeleton', 'e8c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/slider',
                component: ComponentCreator('/components/slider', '6cb'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/spinner',
                component: ComponentCreator('/components/spinner', '9b0'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/stepper',
                component: ComponentCreator('/components/stepper', '223'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/table',
                component: ComponentCreator('/components/table', 'cbf'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/tabs',
                component: ComponentCreator('/components/tabs', 'd98'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/tag',
                component: ComponentCreator('/components/tag', '14d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/textarea',
                component: ComponentCreator('/components/textarea', 'f67'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/toast',
                component: ComponentCreator('/components/toast', 'f17'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/toggle',
                component: ComponentCreator('/components/toggle', 'e6c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/components/tooltip',
                component: ComponentCreator('/components/tooltip', 'e29'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/foundations/accessibility',
                component: ComponentCreator('/foundations/accessibility', '8f1'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/foundations/color',
                component: ComponentCreator('/foundations/color', '99c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/foundations/icons',
                component: ComponentCreator('/foundations/icons', 'd66'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/foundations/spacing',
                component: ComponentCreator('/foundations/spacing', '61a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/foundations/tokens',
                component: ComponentCreator('/foundations/tokens', '72b'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/foundations/typography',
                component: ComponentCreator('/foundations/typography', '272'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/getting-started/agent-usage',
                component: ComponentCreator('/getting-started/agent-usage', '2e9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/getting-started/dark-mode',
                component: ComponentCreator('/getting-started/dark-mode', 'e84'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/getting-started/installation',
                component: ComponentCreator('/getting-started/installation', 'e0c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/getting-started/rtl',
                component: ComponentCreator('/getting-started/rtl', 'a28'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/getting-started/theming',
                component: ComponentCreator('/getting-started/theming', '90b'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/patterns/data-tables',
                component: ComponentCreator('/patterns/data-tables', 'dff'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/patterns/error-handling',
                component: ComponentCreator('/patterns/error-handling', 'c31'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/patterns/forms',
                component: ComponentCreator('/patterns/forms', '824'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/patterns/loading-states',
                component: ComponentCreator('/patterns/loading-states', 'ae4'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/',
                component: ComponentCreator('/', '7da'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
