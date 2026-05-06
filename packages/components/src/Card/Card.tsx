import React, { forwardRef } from 'react';
import './Card.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface CardProps {
  /** When true, the card is interactive (clickable). */
  clickable?: boolean;
  /**
   * When provided alongside clickable=true, renders the card as an <a> element.
   * When absent, a clickable card renders as a div with role="button".
   */
  href?: string;
  /** Click handler for cards that trigger actions (no navigation). */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * CSS custom property name (without '--') for the card padding.
   * Must be a valid spacing token. Defaults to 'spacing-component-md'.
   */
  padding?: string;
  /** Card content. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

export interface CardSubProps {
  children?: React.ReactNode;
  className?: string;
}

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

/**
 * CardHeader — a styled header region above the card body.
 */
const CardHeader = forwardRef<HTMLDivElement, CardSubProps>(function CardHeader(
  { children, className },
  ref
) {
  const classes = ['arch-card__header', className].filter(Boolean).join(' ');
  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
});

/**
 * CardBody — the primary content area of the card.
 */
const CardBody = forwardRef<HTMLDivElement, CardSubProps>(function CardBody(
  { children, className },
  ref
) {
  const classes = ['arch-card__body', className].filter(Boolean).join(' ');
  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
});

/**
 * CardFooter — a styled footer region below the card body.
 */
const CardFooter = forwardRef<HTMLDivElement, CardSubProps>(function CardFooter(
  { children, className },
  ref
) {
  const classes = ['arch-card__footer', className].filter(Boolean).join(' ');
  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
});

/* ─── Card ───────────────────────────────────────────────────────────────────── */

/**
 * Card
 *
 * A surface container for grouping related content. Use CardHeader, CardBody,
 * and CardFooter to structure the card's interior.
 *
 * @example
 * <Card>
 *   <CardHeader>Title</CardHeader>
 *   <CardBody>Some content here.</CardBody>
 *   <CardFooter>Footer action</CardFooter>
 * </Card>
 *
 * @example
 * // Clickable link card
 * <Card clickable href="/details">
 *   <CardBody>View details</CardBody>
 * </Card>
 *
 * @example
 * // Clickable action card
 * <Card clickable onClick={handleSelect}>
 *   <CardBody>Select this option</CardBody>
 * </Card>
 */
const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { clickable = false, href, onClick, padding = 'spacing-component-md', children, className },
  ref
) {
  const classes = [
    'arch-card',
    clickable && 'arch-card--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = { '--arch-card-padding': `var(--${padding})` } as React.CSSProperties;

  if (clickable && href) {
    return (
      <a
        ref={ref as any}
        href={href}
        className={classes}
        style={style}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  if (clickable) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as unknown as React.MouseEvent<HTMLElement>);
      }
    };

    return (
      <div
        ref={ref as any}
        role="button"
        tabIndex={0}
        className={classes}
        style={style}
        onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref as any}
      className={classes}
      style={style}
    >
      {children}
    </div>
  );
});

export { Card, CardHeader, CardBody, CardFooter };
export default Card;
