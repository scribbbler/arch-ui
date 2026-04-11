import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import './PageHeader.css';

/**
 * Shared page header for every foundation / component / pattern doc page.
 *
 * Reads the current doc's frontmatter via `useDoc()`, so every value shown in
 * the header (eyebrow, title, status badge, description) lives in exactly one
 * place — the page's own frontmatter. Editing the frontmatter also updates
 * anywhere else that consumes the same fields (e.g. `<CategoryCard />` reads
 * the `description` field at build time via `customFields.docFrontmatter`).
 *
 * Expected frontmatter:
 *   eyebrow?: string          — section label shown above the title, e.g. "STYLES"
 *   title?: string            — page title (falls back to Docusaurus's contentTitle)
 *   description?: string      — one-line intro paragraph
 *   status?: 'Draft' | 'Beta' — optional status badge rendered next to the title
 *
 * Pages that use `<PageHeader />` should keep `hide_title: true` so Docusaurus
 * does not also render its default H1.
 */

type PageHeaderFrontMatter = {
  eyebrow?: string;
  title?: string;
  description?: string;
  status?: string;
};

export default function PageHeader(): React.ReactElement {
  const { frontMatter, contentTitle } = useDoc();
  const fm = frontMatter as PageHeaderFrontMatter;
  const title = fm.title ?? contentTitle ?? '';

  return (
    <header className="arch-page-header">
      {fm.eyebrow && <span className="arch-page-header__eyebrow">{fm.eyebrow}</span>}
      <div className="arch-page-header__title-row">
        <h1 className="arch-page-header__title">{title}</h1>
        {fm.status && (
          <span className="arch-page-header__status">{fm.status}</span>
        )}
      </div>
      {fm.description && (
        <p className="arch-page-header__description">{fm.description}</p>
      )}
    </header>
  );
}
