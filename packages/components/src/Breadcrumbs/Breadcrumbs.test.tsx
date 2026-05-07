import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Breadcrumbs } from './Breadcrumbs';

/* ─── Fixtures ───────────────────────────────────────────────────────────────── */

const defaultItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Widget' },
];

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Breadcrumbs — rendering', () => {
  it('renders a nav element with aria-label="Breadcrumbs navigation"', () => {
    render(<Breadcrumbs items={defaultItems} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumbs navigation' })).toBeInTheDocument();
  });

  it('renders all item labels', () => {
    render(<Breadcrumbs items={defaultItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Widget')).toBeInTheDocument();
  });

  it('renders intermediate items as links with correct hrefs', () => {
    render(<Breadcrumbs items={defaultItems} />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/');

    const productsLink = screen.getByRole('link', { name: 'Products' });
    expect(productsLink).toHaveAttribute('href', '/products');
  });

  it('renders a single item as the current page (no link)', () => {
    render(<Breadcrumbs items={[{ label: 'Home' }]} />);
    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('applies a custom className to the nav element', () => {
    render(<Breadcrumbs items={defaultItems} className="my-breadcrumbs" />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumbs navigation' })).toHaveClass('my-breadcrumbs');
  });

  it('forwards a ref to the nav element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Breadcrumbs items={defaultItems} ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('NAV');
  });

  it('renders an ordered list inside the nav', () => {
    render(<Breadcrumbs items={defaultItems} />);
    const nav = screen.getByRole('navigation', { name: 'Breadcrumbs navigation' });
    expect(nav.querySelector('ol')).toBeInTheDocument();
  });
});

/* ─── Last item / current page ───────────────────────────────────────────────── */

describe('Breadcrumbs — current page item', () => {
  it('last item has aria-current="page"', () => {
    render(<Breadcrumbs items={defaultItems} />);
    const currentEl = screen.getByText('Widget');
    expect(currentEl).toHaveAttribute('aria-current', 'page');
  });

  it('last item is rendered as a span, not a link', () => {
    render(<Breadcrumbs items={defaultItems} />);
    const currentEl = screen.getByText('Widget');
    expect(currentEl.tagName).toBe('SPAN');
  });

  it('last item does not receive an href even when one is provided', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Current', href: '/current' },
    ];
    render(<Breadcrumbs items={items} />);
    // Last item should be a span not an anchor
    const currentEl = screen.getByText('Current');
    expect(currentEl.tagName).toBe('SPAN');
    expect(currentEl).not.toHaveAttribute('href');
  });
});

/* ─── Separator ──────────────────────────────────────────────────────────────── */

describe('Breadcrumbs — separator', () => {
  it('renders the default "/" separator between items', () => {
    render(<Breadcrumbs items={defaultItems} />);
    const separators = document.querySelectorAll('.arch-breadcrumbs__separator');
    // n-1 separators for n items
    expect(separators).toHaveLength(defaultItems.length - 1);
    separators.forEach((sep) => expect(sep.textContent).toBe('/'));
  });

  it('renders a custom separator', () => {
    render(<Breadcrumbs items={defaultItems} separator=">" />);
    const separators = document.querySelectorAll('.arch-breadcrumbs__separator');
    separators.forEach((sep) => expect(sep.textContent).toBe('>'));
  });

  it('renders a ReactNode separator', () => {
    render(
      <Breadcrumbs
        items={defaultItems}
        separator={<span data-testid="sep-icon">›</span>}
      />
    );
    const icons = screen.getAllByTestId('sep-icon');
    expect(icons).toHaveLength(defaultItems.length - 1);
  });

  it('separators are aria-hidden', () => {
    render(<Breadcrumbs items={defaultItems} />);
    const separators = document.querySelectorAll('.arch-breadcrumbs__separator');
    separators.forEach((sep) =>
      expect(sep).toHaveAttribute('aria-hidden', 'true')
    );
  });

  it('does not render a separator before the first item', () => {
    render(<Breadcrumbs items={defaultItems} />);
    const listItems = document.querySelectorAll('.arch-breadcrumbs__item');
    // First list item should not contain a separator
    expect(
      listItems[0].querySelector('.arch-breadcrumbs__separator')
    ).not.toBeInTheDocument();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Breadcrumbs — accessibility', () => {
  it('passes axe with multiple items', async () => {
    const { container } = render(<Breadcrumbs items={defaultItems} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with a single item', async () => {
    const { container } = render(
      <Breadcrumbs items={[{ label: 'Home' }]} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with a custom separator', async () => {
    const { container } = render(
      <Breadcrumbs items={defaultItems} separator="›" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
