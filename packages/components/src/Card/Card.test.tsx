import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Card — rendering', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders as a div by default', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="my-class">Content</Card>);
    expect(container.firstChild).toHaveClass('my-class');
  });

  it('always has the arch-card base class', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('arch-card');
  });

  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).not.toBeNull();
  });
});

/* ─── Padding token ──────────────────────────────────────────────────────────── */

describe('Card — padding', () => {
  it('sets CSS custom property for padding using the token name', () => {
    const { container } = render(
      <Card padding="spacing-component-lg">Content</Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card.style.getPropertyValue('--arch-card-padding')).toBe(
      'var(--spacing-component-lg)'
    );
  });

  it('defaults to spacing-component-md', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.getPropertyValue('--arch-card-padding')).toBe(
      'var(--spacing-component-md)'
    );
  });
});

/* ─── Clickable — role=button ────────────────────────────────────────────────── */

describe('Card — clickable with role=button', () => {
  it('has role="button" when clickable and no href', () => {
    render(<Card clickable onClick={vi.fn()}>Card</Card>);
    expect(screen.getByRole('button', { name: 'Card' })).toBeInTheDocument();
  });

  it('is focusable with tabIndex=0', () => {
    render(<Card clickable onClick={vi.fn()}>Card</Card>);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<Card clickable onClick={handler}>Card</Card>);
    await user.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('fires onClick when Enter is pressed', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<Card clickable onClick={handler}>Card</Card>);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('fires onClick when Space is pressed', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<Card clickable onClick={handler}>Card</Card>);
    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('has the arch-card--clickable class', () => {
    render(<Card clickable onClick={vi.fn()}>Card</Card>);
    expect(screen.getByRole('button')).toHaveClass('arch-card--clickable');
  });
});

/* ─── Clickable — link ───────────────────────────────────────────────────────── */

describe('Card — clickable link', () => {
  it('renders as an <a> when clickable and href is provided', () => {
    render(
      <Card clickable href="/details">
        Link card
      </Card>
    );
    const link = screen.getByRole('link', { name: 'Link card' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  it('sets href on the anchor element', () => {
    render(
      <Card clickable href="/details">
        Link card
      </Card>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/details');
  });
});

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

describe('Card — sub-components', () => {
  it('renders CardHeader with correct class', () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    expect(container.firstChild).toHaveClass('arch-card__header');
  });

  it('renders CardBody with correct class', () => {
    const { container } = render(<CardBody>Body</CardBody>);
    expect(container.firstChild).toHaveClass('arch-card__body');
  });

  it('renders CardFooter with correct class', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    expect(container.firstChild).toHaveClass('arch-card__footer');
  });

  it('CardHeader forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardHeader ref={ref}>Header</CardHeader>);
    expect(ref.current).not.toBeNull();
  });

  it('CardBody forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardBody ref={ref}>Body</CardBody>);
    expect(ref.current).not.toBeNull();
  });

  it('CardFooter forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardFooter ref={ref}>Footer</CardFooter>);
    expect(ref.current).not.toBeNull();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Card — accessibility', () => {
  it('passes axe for default card', async () => {
    const { container } = render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body content</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for clickable button card', async () => {
    const { container } = render(
      <Card clickable onClick={vi.fn()}>
        <CardBody>Clickable</CardBody>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for clickable link card', async () => {
    const { container } = render(
      <Card clickable href="/page">
        <CardBody>Go to page</CardBody>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
