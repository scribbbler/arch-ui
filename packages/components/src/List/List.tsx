import React, { forwardRef } from 'react';
import './List.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type ListVariant = 'bullet' | 'number' | 'none';

export interface ListProps {
  /** Visual style of list markers. Defaults to 'bullet'. */
  variant?: ListVariant;
  /**
   * CSS custom property name (without '--') for the gap between items.
   * Defaults to 'spacing-component-xs'.
   */
  spacing?: string;
  /** Override the rendered element. Auto-selects based on variant when omitted. */
  as?: 'ul' | 'ol';
  /** List content. Use ListItem sub-component. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface ListItemProps {
  /** Item content. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface DescriptionListProps {
  /** DescriptionTerm and DescriptionDetail pairs. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface DescriptionTermProps {
  /** Term content. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface DescriptionDetailProps {
  /** Detail / definition content. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── List ───────────────────────────────────────────────────────────────────── */

/**
 * List
 *
 * A token-driven list component supporting bullet, number, and no-marker
 * variants. Use ListItem for individual entries.
 *
 * @example
 * <List variant="bullet">
 *   <ListItem>First item</ListItem>
 *   <ListItem>Second item</ListItem>
 * </List>
 */
const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  function List(
    { variant = 'bullet', spacing = 'spacing-component-xs', as, children, className },
    ref
  ) {
    const Tag = as ?? (variant === 'number' ? 'ol' : 'ul');

    const classes = [
      'arch-list',
      `arch-list--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const style = {
      '--arch-list-spacing': `var(--${spacing})`,
    } as React.CSSProperties;

    return (
      <Tag
        ref={ref as React.Ref<HTMLUListElement>}
        className={classes}
        style={style}
      >
        {children}
      </Tag>
    );
  }
);

/* ─── ListItem ───────────────────────────────────────────────────────────────── */

/**
 * ListItem
 *
 * A single list entry. Renders as a <li> element.
 */
const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { children, className },
  ref
) {
  const classes = ['arch-list-item', className].filter(Boolean).join(' ');
  return (
    <li ref={ref} className={classes}>
      {children}
    </li>
  );
});

/* ─── DescriptionList ────────────────────────────────────────────────────────── */

/**
 * DescriptionList
 *
 * A semantic <dl> element for term-definition or key-value content.
 *
 * @example
 * <DescriptionList>
 *   <DescriptionTerm>Author</DescriptionTerm>
 *   <DescriptionDetail>Jane Smith</DescriptionDetail>
 * </DescriptionList>
 */
const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  function DescriptionList({ children, className }, ref) {
    const classes = ['arch-description-list', className].filter(Boolean).join(' ');
    return (
      <dl ref={ref} className={classes}>
        {children}
      </dl>
    );
  }
);

/* ─── DescriptionTerm ────────────────────────────────────────────────────────── */

/**
 * DescriptionTerm
 *
 * Renders a <dt> element inside a DescriptionList.
 */
const DescriptionTerm = forwardRef<HTMLElement, DescriptionTermProps>(
  function DescriptionTerm({ children, className }, ref) {
    const classes = ['arch-description-term', className].filter(Boolean).join(' ');
    return (
      <dt ref={ref as React.Ref<HTMLElement>} className={classes}>
        {children}
      </dt>
    );
  }
);

/* ─── DescriptionDetail ──────────────────────────────────────────────────────── */

/**
 * DescriptionDetail
 *
 * Renders a <dd> element inside a DescriptionList.
 */
const DescriptionDetail = forwardRef<HTMLElement, DescriptionDetailProps>(
  function DescriptionDetail({ children, className }, ref) {
    const classes = ['arch-description-detail', className].filter(Boolean).join(' ');
    return (
      <dd ref={ref as React.Ref<HTMLElement>} className={classes}>
        {children}
      </dd>
    );
  }
);

export { List, ListItem, DescriptionList, DescriptionTerm, DescriptionDetail };
export default List;
