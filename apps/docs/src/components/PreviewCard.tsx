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
  /** Number of columns. Use `1` for a full-width preview. */
  columns?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
};

type PreviewCardProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** When true, removes the white inner card background so the demo sits
   *  directly on the gray surface. Useful for annotated specs where the
   *  demo component (sheet, dialog) provides its own background. */
  bare?: boolean;
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
  bare,
  children,
}: PreviewCardProps): React.ReactElement {
  const hasText = label != null || description != null;
  const cardClass = [
    'preview-card',
    hasText ? '' : 'preview-card--no-text',
  ]
    .filter(Boolean)
    .join(' ');
  const innerClass = [
    'preview-card__inner',
    bare ? 'preview-card__inner--bare' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cardClass}>
      <div className="preview-card__surface">
        <div className={innerClass}>{children}</div>
      </div>
      {label != null && <div className="preview-card__label">{label}</div>}
      {description != null && <p className="preview-card__desc">{description}</p>}
    </div>
  );
}

const Preview = { Grid: PreviewGrid, Card: PreviewCard };
export default Preview;
