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
   * Rendered with `object-fit: contain` on a dark surface.
   */
  image: string;
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

// Intentionally empty for now. The homepage continues to use its existing
// inline rendering until card artwork is uploaded to
// `static/img/top-level/`. When those assets land, populate this array and
// switch `src/pages/index.tsx` to `<CategoryCardGrid items={topLevelCategories} />`.
export const topLevelCategories: Category[] = [];

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

// Intentionally empty for now. These will be populated when:
//  1. Card artwork is uploaded to `static/img/components/`, and
//  2. Either dedicated category landing pages exist (preferred) or
//     `descriptionOverride` values are authored here.
// Until then, `docs/components/index.mdx` keeps its existing inline rendering.
export const componentCategories: ComponentCategory[] = [];
