import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Inline } from './Inline';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Inline — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<Inline />);
    expect(container.querySelector('.arch-inline')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Inline><span>Child 1</span><span>Child 2</span></Inline>);
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('renders a <div> by default', () => {
    const { container } = render(<Inline>Content</Inline>);
    expect(container.querySelector('.arch-inline')?.tagName).toBe('DIV');
  });

  it('applies the base class', () => {
    const { container } = render(<Inline />);
    expect(container.querySelector('.arch-inline')).toHaveClass('arch-inline');
  });

  it('applies a custom className', () => {
    const { container } = render(<Inline className="my-inline" />);
    expect(container.querySelector('.arch-inline')).toHaveClass('arch-inline', 'my-inline');
  });
});

/* ─── Polymorphic "as" prop ──────────────────────────────────────────────────── */

describe('Inline — as prop', () => {
  it('renders as a <ul> when as="ul"', () => {
    const { container } = render(<Inline as="ul" />);
    expect(container.querySelector('.arch-inline')?.tagName).toBe('UL');
  });

  it('renders as a <nav> when as="nav"', () => {
    const { container } = render(<Inline as="nav" />);
    expect(container.querySelector('.arch-inline')?.tagName).toBe('NAV');
  });
});

/* ─── CSS custom properties ──────────────────────────────────────────────────── */

describe('Inline — CSS variables', () => {
  it('sets --inline-gap when gap is provided', () => {
    const { container } = render(<Inline gap="spacing-200" />);
    const el = container.querySelector('.arch-inline') as HTMLElement;
    expect(el.style.getPropertyValue('--inline-gap')).toBe('var(--spacing-200)');
  });

  it('sets --inline-align when align is provided', () => {
    const { container } = render(<Inline align="center" />);
    const el = container.querySelector('.arch-inline') as HTMLElement;
    expect(el.style.getPropertyValue('--inline-align')).toBe('center');
  });

  it('sets --inline-justify when justify is provided', () => {
    const { container } = render(<Inline justify="space-between" />);
    const el = container.querySelector('.arch-inline') as HTMLElement;
    expect(el.style.getPropertyValue('--inline-justify')).toBe('space-between');
  });

  it('sets --inline-wrap to nowrap when wrap=false', () => {
    const { container } = render(<Inline wrap={false} />);
    const el = container.querySelector('.arch-inline') as HTMLElement;
    expect(el.style.getPropertyValue('--inline-wrap')).toBe('nowrap');
  });

  it('does not set --inline-wrap when wrap=true (default)', () => {
    const { container } = render(<Inline />);
    const el = container.querySelector('.arch-inline') as HTMLElement;
    expect(el.style.getPropertyValue('--inline-wrap')).toBe('');
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('Inline — forwardRef', () => {
  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Inline ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
