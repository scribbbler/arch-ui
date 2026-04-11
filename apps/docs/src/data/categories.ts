/**
 * Single source of truth for docs category cards.
 *
 * Cards appear in several places (homepage, foundations index, components
 * index, future "related" sections). Every appearance of a given card must
 * render identical content — so title, destination, image, and description
 * are defined exactly once, here.
 *
 * Descriptions are deliberately NOT duplicated in this file. Each card points
 * at a destination doc via `docId`; `<CategoryCard />` reads that doc's
 * `description` frontmatter at render time (exposed via `customFields.docFrontmatter`
 * in `docusaurus.config.js`). Edit the destination page's frontmatter and every
 * card pointing at it updates automatically.
 *
 * `descriptionOverride` exists only for cards whose destination does not yet
 * have its own dedicated page (e.g. component category cards — category pages
 * haven't been built yet). Prefer adding the destination page over using the
 * override.
 */

export interface Category {
  /** Stable identifier for the card. */
  id: string;
  /** Display title. Shown on the card face. */
  title: string;
  /** Link target. */
  href: string;
  /**
   * Public asset path for the card's illustration, e.g. '/img/foundations/styles/design_tokens.png'.
   * Rendered with `object-fit: contain` on a dark surface. Optional: cards
   * without an image render a solid black media block, which acts as an
   * intentional placeholder until artwork is uploaded.
   */
  image?: string;
  /**
   * Doc id relative to `apps/docs/docs/` (no extension). When set, the card's
   * description is read from that doc's frontmatter at render time.
   */
  docId?: string;
  /**
   * Fallback description used only when `docId` is unset or the target doc has
   * no `description` frontmatter. Avoid where possible.
   */
  descriptionOverride?: string;
}

/**
 * Extends `Category` with a list of constituent component IDs. Used today to
 * keep category membership co-located with the card definition; when a proper
 * `/components/categories/[id]` landing page is built, that page will read
 * `members` from here and the card's `href` can flip to the new category page.
 */
export interface ComponentCategory extends Category {
  members: string[];
}

/* ------------------------------------------------------------------ */
/* Top-level cards (homepage)                                          */
/* ------------------------------------------------------------------ */

// Cards without `image` render a solid black placeholder. Drop files into
// `static/img/top-level/` and set the `image` field to replace the placeholder.
export const topLevelCategories: Category[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    href: '/foundations',
    docId: 'foundations/index',
  },
  {
    id: 'components',
    title: 'Components',
    href: '/components',
    docId: 'components/index',
  },
  {
    id: 'patterns',
    title: 'Patterns',
    href: '/patterns/forms',
    descriptionOverride:
      'Review broader design patterns and the module libraries that power them.',
  },
  {
    id: 'resources',
    title: 'Resources & Tools',
    href: '/intro',
    descriptionOverride:
      'Learn how to use Arch UI to design focused and accessible experiences.',
  },
];

/* ------------------------------------------------------------------ */
/* Foundation cards                                                    */
/* ------------------------------------------------------------------ */

export const foundationCategories: Category[] = [
  {
    id: 'tokens',
    title: 'Design tokens',
    href: '/foundations/tokens',
    image: '/img/foundations/styles/design_tokens.png',
    docId: 'foundations/tokens',
  },
  {
    id: 'color',
    title: 'Color',
    href: '/foundations/color',
    image: '/img/foundations/styles/colors.png',
    docId: 'foundations/color',
  },
  {
    id: 'typography',
    title: 'Typography',
    href: '/foundations/typography',
    image: '/img/foundations/styles/typography.png',
    docId: 'foundations/typography',
  },
  {
    id: 'icons',
    title: 'Icons',
    href: '/foundations/icons',
    image: '/img/foundations/styles/icons.png',
    docId: 'foundations/icons',
  },
  {
    id: 'spacing',
    title: 'Spacing',
    href: '/foundations/spacing',
    image: '/img/foundations/styles/spacing.png',
    docId: 'foundations/spacing',
  },
  {
    id: 'layout-grids',
    title: 'Layout grids',
    href: '/foundations/layout-grids',
    image: '/img/foundations/styles/layout_grids.png',
    docId: 'foundations/layout-grids',
  },
  {
    id: 'corner-radius',
    title: 'Corner radius',
    href: '/foundations/corner-radius',
    image: '/img/foundations/styles/corner_radius.png',
    docId: 'foundations/corner-radius',
  },
  {
    id: 'elevation',
    title: 'Elevation',
    href: '/foundations/elevation',
    image: '/img/foundations/styles/elevation.png',
    docId: 'foundations/elevation',
  },
  {
    id: 'motion',
    title: 'Motion',
    href: '/foundations/motion',
    image: '/img/foundations/styles/motion.png',
    docId: 'foundations/motion',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    href: '/foundations/accessibility',
    image: '/img/foundations/styles/accessibility.png',
    docId: 'foundations/accessibility',
  },
];

/* ------------------------------------------------------------------ */
/* Component category cards                                            */
/* ------------------------------------------------------------------ */

// Cards without `image` render a solid black placeholder. Drop files into
// `static/img/components/` and set the `image` field to replace the placeholder.
//
// `href` today points at a representative component in the group. When
// dedicated category landing pages are added under `/components/categories/`,
// switch `href` to those pages and delete the `descriptionOverride` field so
// the description is read from the category page's frontmatter instead.
//
// `members` lists the component IDs that belong to each category — the
// category landing page will read this to render its component list.
export const componentCategories: ComponentCategory[] = [
  {
    id: 'buttons',
    title: 'Buttons',
    href: '/components/button',
    members: ['button', 'button-group', 'button-dock', 'sliding-button', 'timed-button'],
    descriptionOverride:
      'Clickable controls that let people trigger actions, confirm choices, and navigate.',
  },
  {
    id: 'input-and-selection',
    title: 'Input and selection',
    href: '/components/input',
    members: [
      'input',
      'textarea',
      'checkbox',
      'radio',
      'select',
      'combobox',
      'switch',
      'toggle',
      'slider',
      'pin-code',
      'phone-input',
      'date-picker',
      'time-picker',
      'segmented-control',
      'star-rating',
      'file-upload',
    ],
    descriptionOverride:
      'Form controls that let people enter data, choose from options, or toggle settings.',
  },
  {
    id: 'indicator-and-status',
    title: 'Indicator and status',
    href: '/components/badge',
    members: [
      'badge',
      'tag',
      'status',
      'avatar',
      'progress-bar',
      'progress-circle',
      'progress-steps',
      'spinner',
      'skeleton',
      'stepper',
    ],
    descriptionOverride:
      'Compact visuals that communicate state, progress, and counts at a glance.',
  },
  {
    id: 'content-display',
    title: 'Content display',
    href: '/components/accordion',
    members: [
      'accordion',
      'card',
      'tile',
      'list',
      'list-item',
      'draggable-list',
      'divider',
      'empty-state',
      'placeholder',
      'section-heading',
      'tree-view',
      'charts',
    ],
    descriptionOverride:
      'Surfaces for organising, grouping, and laying out content on the page.',
  },
  {
    id: 'messaging',
    title: 'Messaging',
    href: '/components/alert',
    members: [
      'alert',
      'banner',
      'system-banner',
      'snackbar',
      'toast',
      'tooltip',
      'message-card',
      'payment-card',
    ],
    descriptionOverride:
      'Contextual feedback that informs, warns, or confirms user actions.',
  },
  {
    id: 'containers-and-layout',
    title: 'Containers and layout',
    href: '/components/modal',
    members: [
      'modal',
      'modal-full-screen',
      'modal-sheet',
      'sheet',
      'drawer',
      'dialog',
      'popover',
      'menu',
    ],
    descriptionOverride:
      'Overlays and regions that hold focused tasks without leaving the current view.',
  },
  {
    id: 'navigation',
    title: 'Navigation',
    href: '/components/tabs',
    members: [
      'tabs',
      'top-navigation',
      'side-navigation',
      'bottom-navigation',
      'navigation-header',
      'breadcrumbs',
      'pagination',
      'link',
      'page-controls',
    ],
    descriptionOverride:
      'Wayfinding controls that help people move between views and understand where they are.',
  },
  {
    id: 'data-and-tables',
    title: 'Data and tables',
    href: '/components/table',
    members: ['table', 'data-table'],
    descriptionOverride:
      'Structured views for browsing, sorting, and comparing tabular data.',
  },
];
