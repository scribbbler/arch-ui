import React, { forwardRef } from 'react';
import './List.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type ListVariant = 'bullet' | 'number' | 'none';
export type ArtworkSize = 'small' | 'medium' | 'large';
export type ListItemShape = 'default' | 'round';

export interface ListProps {
  /** Visual style of list markers. Defaults to 'none'. */
  variant?: ListVariant;
  /** Override the rendered element. Auto-selects based on variant when omitted. */
  as?: 'ul' | 'ol';
  /** List content. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface ListItemProps {
  /** Icon or image rendered on the left. */
  artwork?: React.ReactNode;
  /** Size of the artwork container. Defaults to 'medium'. */
  artworkSize?: ArtworkSize;
  /** Shape of the artwork container. 'round' adds border-radius. Defaults to 'default'. */
  shape?: ListItemShape;
  /** Action or info rendered on the right. */
  endEnhancer?: React.ReactNode;
  /** Whether this is a sublist item (indented). */
  sublist?: boolean;
  /** Click handler — makes the item interactive. */
  onClick?: (e: React.SyntheticEvent) => void;
  /** Item content. Use ListItemLabel for structured content. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface ListItemLabelProps {
  /** Primary label text. */
  children: React.ReactNode;
  /** Secondary description below the label. */
  description?: React.ReactNode;
  /** Whether this is inside a sublist item. */
  sublist?: boolean;
  /** Additional CSS class names. */
  className?: string;
}

export interface ListHeadingProps {
  /** Heading text. */
  heading: React.ReactNode;
  /** Sub-heading text. */
  subHeading?: React.ReactNode;
  /** Content on the right side. */
  endEnhancer?: React.ReactNode;
  /** Description below the endEnhancer. */
  endEnhancerDescription?: React.ReactNode;
  /** Max lines for heading text. Defaults to 1. */
  maxLines?: 1 | 2;
  /** Additional CSS class names. */
  className?: string;
}

export interface DescriptionListProps {
  children?: React.ReactNode;
  className?: string;
}

export interface DescriptionTermProps {
  children?: React.ReactNode;
  className?: string;
}

export interface DescriptionDetailProps {
  children?: React.ReactNode;
  className?: string;
}

/* ─── List ───────────────────────────────────────────────────────────────────── */

/**
 * List
 *
 * A semantic list component. Use with ListItem for rich list rows (artwork,
 * label, description, endEnhancer) or simple children for plain lists.
 *
 * @example
 * <List>
 *   <ListItem artwork={<UserIcon />} endEnhancer={<ChevronRightIcon />}>
 *     <ListItemLabel description="Software Engineer">Jane Doe</ListItemLabel>
 *   </ListItem>
 * </List>
 */
const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  function List({ variant = 'none', as, children, className }, ref) {
    const Tag = as ?? (variant === 'number' ? 'ol' : 'ul');
    const classes = ['arch-list', `arch-list--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <Tag ref={ref as any} className={classes}>
        {children}
      </Tag>
    );
  }
);

/* ─── ListItem ──────────────────────────────────────────────────────────────── */

/**
 * ListItem
 *
 * A rich list row with optional artwork on the left, content in the middle,
 * and an endEnhancer on the right. Matches Base Web ListItem pattern.
 *
 * @example
 * <ListItem
 *   artwork={<Avatar name="Jane" size="small" />}
 *   endEnhancer={<span>3m ago</span>}
 * >
 *   <ListItemLabel description="Sent you a message">Jane Doe</ListItemLabel>
 * </ListItem>
 */
const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { artwork, artworkSize = 'medium', shape = 'default', endEnhancer, sublist = false, onClick, children, className },
  ref
) {
  const isInteractive = Boolean(onClick);
  const classes = [
    'arch-list-item',
    sublist && 'arch-list-item--sublist',
    isInteractive && 'arch-list-item--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const artworkClasses = [
    'arch-list-item__artwork',
    `arch-list-item__artwork--${artworkSize}`,
    shape === 'round' && 'arch-list-item__artwork--round',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li
      ref={ref}
      className={classes}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {artwork && (
        <div className={artworkClasses} aria-hidden="true">
          {artwork}
        </div>
      )}
      <div className={`arch-list-item__content${sublist ? ' arch-list-item__content--sublist' : ''}`}>
        {children}
      </div>
      {endEnhancer && (
        <div className="arch-list-item__end-enhancer">
          {endEnhancer}
        </div>
      )}
    </li>
  );
});

/* ─── ListItemLabel ─────────────────────────────────────────────────────────── */

/**
 * ListItemLabel
 *
 * Content block for ListItem — renders a primary label and optional description.
 */
const ListItemLabel = forwardRef<HTMLDivElement, ListItemLabelProps>(
  function ListItemLabel({ children, description, sublist = false, className }, ref) {
    const classes = ['arch-list-item-label', sublist && 'arch-list-item-label--sublist', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes}>
        <div className="arch-list-item-label__content">{children}</div>
        {description && (
          <div className="arch-list-item-label__description">{description}</div>
        )}
      </div>
    );
  }
);

/* ─── ListHeading ───────────────────────────────────────────────────────────── */

/**
 * ListHeading
 *
 * A heading row for list sections — renders heading, optional sub-heading,
 * and optional end content.
 */
const ListHeading = forwardRef<HTMLLIElement, ListHeadingProps>(
  function ListHeading({ heading, subHeading, endEnhancer, endEnhancerDescription, maxLines = 1, className }, ref) {
    const classes = ['arch-list-heading', className].filter(Boolean).join(' ');

    return (
      <li ref={ref} className={classes}>
        <div className="arch-list-heading__start">
          <div className={`arch-list-heading__heading${maxLines === 1 ? ' arch-list-heading__heading--clamp' : ''}`}>
            {heading}
          </div>
          {subHeading && (
            <div className="arch-list-heading__subheading">{subHeading}</div>
          )}
        </div>
        {(endEnhancer || endEnhancerDescription) && (
          <div className="arch-list-heading__end">
            {endEnhancer && <div>{endEnhancer}</div>}
            {endEnhancerDescription && (
              <div className="arch-list-heading__end-description">{endEnhancerDescription}</div>
            )}
          </div>
        )}
      </li>
    );
  }
);

/* ─── DescriptionList ───────────────────────────────────────────────────────── */

const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  function DescriptionList({ children, className }, ref) {
    const classes = ['arch-description-list', className].filter(Boolean).join(' ');
    return <dl ref={ref} className={classes}>{children}</dl>;
  }
);

const DescriptionTerm = forwardRef<HTMLElement, DescriptionTermProps>(
  function DescriptionTerm({ children, className }, ref) {
    const classes = ['arch-description-term', className].filter(Boolean).join(' ');
    return <dt ref={ref as any} className={classes}>{children}</dt>;
  }
);

const DescriptionDetail = forwardRef<HTMLElement, DescriptionDetailProps>(
  function DescriptionDetail({ children, className }, ref) {
    const classes = ['arch-description-detail', className].filter(Boolean).join(' ');
    return <dd ref={ref as any} className={classes}>{children}</dd>;
  }
);

/* ─── Display names ─────────────────────────────────────────────────────────── */

List.displayName = 'List';
ListItem.displayName = 'ListItem';
ListItemLabel.displayName = 'ListItemLabel';
ListHeading.displayName = 'ListHeading';
DescriptionList.displayName = 'DescriptionList';
DescriptionTerm.displayName = 'DescriptionTerm';
DescriptionDetail.displayName = 'DescriptionDetail';

export { List, ListItem, ListItemLabel, ListHeading, DescriptionList, DescriptionTerm, DescriptionDetail };
export default List;
