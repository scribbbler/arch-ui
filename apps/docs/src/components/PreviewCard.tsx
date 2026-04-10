import React from 'react';

/**
 * Reusable preview card pattern for Arch UI docs.
 *
 * Use `<PreviewGrid>` to lay out a responsive grid of cards, and
 * `<PreviewCard>` for each card. Every card in a row stretches to match
 * the tallest sibling automatically.
 *
 * Layout:
 *   ┌────────────────┐
 *   │                │  ← gray preview area (children)
 *   │   children     │
 *   │                │
 *   ├────────────────┤
 *   │ Label          │  ← bold title
 *   │ Description…   │  ← muted description
 *   └────────────────┘
 */

type PreviewGridProps = {
  columns?: 2 | 3 | 4;
  children: React.ReactNode;
};

type PreviewCardProps = {
  label: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
};

export function PreviewGrid({
  columns = 2,
  children,
}: PreviewGridProps): React.ReactElement {
  return (
    <div className={`preview-grid preview-grid--cols-${columns}`}>{children}</div>
  );
}

export function PreviewCard({
  label,
  description,
  children,
}: PreviewCardProps): React.ReactElement {
  return (
    <div className="preview-card">
      <div className="preview-card__surface">
        <div className="preview-card__inner">{children}</div>
      </div>
      <div className="preview-card__label">{label}</div>
      {description && <p className="preview-card__desc">{description}</p>}
    </div>
  );
}

const Preview = { Grid: PreviewGrid, Card: PreviewCard };
export default Preview;
