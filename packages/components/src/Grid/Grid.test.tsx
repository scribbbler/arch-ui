import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Grid — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<Grid />);
    expect(container.querySelector('.arch-grid')).toBeInTheDocument();
  });

  it('renders a <div> by default', () => {
    const { container } = render(<Grid />);
    expect(container.firstChild!.nodeName).toBe('DIV');
  });

  it('renders children', () => {
    render(<Grid><span>Child</span></Grid>);
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<Grid className="custom" />);
    expect(container.firstChild).toHaveClass('arch-grid', 'custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Grid ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Columns ────────────────────────────────────────────────────────────────── */

describe('Grid — columns', () => {
  it('defaults to 1 column', () => {
    const { container } = render(<Grid />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--grid-columns')).toBe('repeat(1, 1fr)');
  });

  it('sets numeric column count', () => {
    const { container } = render(<Grid columns={3} />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--grid-columns')).toBe('repeat(3, 1fr)');
  });

  it('sets auto columns', () => {
    const { container } = render(<Grid columns="auto" />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--grid-columns')).toBe('repeat(auto-fill, minmax(200px, 1fr))');
  });

  it('sets responsive columns via object', () => {
    const { container } = render(<Grid columns={{ base: 1, md: 2, lg: 3 }} />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--grid-columns')).toBe('repeat(1, 1fr)');
    expect(root.style.getPropertyValue('--grid-columns-md')).toBe('repeat(2, 1fr)');
    expect(root.style.getPropertyValue('--grid-columns-lg')).toBe('repeat(3, 1fr)');
  });
});

/* ─── Gap ────────────────────────────────────────────────────────────────────── */

describe('Grid — gap', () => {
  it('sets gap CSS variable when gap is provided', () => {
    const { container } = render(<Grid gap="spacing-300" />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--grid-gap')).toBe('var(--spacing-300)');
  });

  it('sets rowGap CSS variable', () => {
    const { container } = render(<Grid rowGap="spacing-200" />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--grid-row-gap')).toBe('var(--spacing-200)');
  });

  it('sets colGap CSS variable', () => {
    const { container } = render(<Grid colGap="spacing-100" />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--grid-col-gap')).toBe('var(--spacing-100)');
  });
});

/* ─── Polymorphic "as" prop ──────────────────────────────────────────────────── */

describe('Grid — as prop', () => {
  it('renders as a <section> when as="section"', () => {
    const { container } = render(<Grid as="section" />);
    expect(container.firstChild!.nodeName).toBe('SECTION');
  });

  it('renders as a <main> when as="main"', () => {
    const { container } = render(<Grid as="main" />);
    expect(container.firstChild!.nodeName).toBe('MAIN');
  });
});
