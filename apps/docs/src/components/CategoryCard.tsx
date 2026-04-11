import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { Category } from '../data/categories';
import './CategoryCard.css';

/**
 * Shared category card used across the docs (homepage, foundations index,
 * components index, "related" rails). Content comes from a single `Category`
 * record defined in `src/data/categories.ts` — every appearance of a given
 * card renders identically.
 *
 * Description lookup: if the `category` has a `docId`, we read that doc's
 * `description` from `customFields.docFrontmatter` (populated at build time
 * in `docusaurus.config.js` from the source markdown's frontmatter). Editing
 * the destination page's frontmatter updates every card pointing at it.
 * `descriptionOverride` is a fallback for cards without a destination page.
 */

type DocFrontmatterMap = Record<string, { description?: string } | undefined>;

function useCardDescription(category: Category): string {
  const { siteConfig } = useDocusaurusContext();
  const map =
    (siteConfig.customFields?.docFrontmatter as DocFrontmatterMap | undefined) ??
    {};
  if (category.docId) {
    const fm = map[category.docId];
    if (fm?.description) return fm.description;
  }
  return category.descriptionOverride ?? '';
}

export interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps): React.ReactElement {
  const description = useCardDescription(category);
  const imageSrc = useBaseUrl(category.image);
  const href = useBaseUrl(category.href);

  return (
    <Link to={href} className="arch-category-card">
      <div className="arch-category-card__media">
        <img
          className="arch-category-card__image"
          src={imageSrc}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="arch-category-card__body">
        <h3 className="arch-category-card__title">{category.title}</h3>
        {description && (
          <p className="arch-category-card__description">{description}</p>
        )}
      </div>
    </Link>
  );
}

export interface CategoryCardGridProps {
  items: Category[];
}

export function CategoryCardGrid({ items }: CategoryCardGridProps): React.ReactElement {
  return (
    <div className="arch-category-card-grid">
      {items.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  );
}

export default CategoryCard;
