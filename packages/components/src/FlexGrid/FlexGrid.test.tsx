import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlexGrid, FlexGridItem } from './FlexGrid';

/* ─── FlexGrid — rendering ───────────────────────────────────────────────────── */

describe('FlexGrid — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<FlexGrid />);
    expect(container.querySelector('.arch-flex-grid')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <FlexGrid>
        <FlexGridItem>Content</FlexGridItem>
      </FlexGrid>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<FlexGrid className="custom" />);
    expect(container.firstChild).toHaveClass('arch-flex-grid', 'custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FlexGrid ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── FlexGridItem — rendering ───────────────────────────────────────────────── */

describe('FlexGridItem — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<FlexGridItem />);
    expect(container.querySelector('.arch-flex-grid__item')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<FlexGridItem>Cell content</FlexGridItem>);
    expect(screen.getByText('Cell content')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<FlexGridItem className="custom" />);
    expect(container.firstChild).toHaveClass('arch-flex-grid__item', 'custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FlexGridItem ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── FlexGridItem — span ────────────────────────────────────────────────────── */

describe('FlexGridItem — span', () => {
  it('defaults to span of 12', () => {
    const { container } = render(<FlexGridItem />);
    const item = container.firstChild as HTMLElement;
    expect(item.style.getPropertyValue('--arch-flex-grid-item-span')).toBe('12');
  });

  it('sets span=6 via CSS variable', () => {
    const { container } = render(<FlexGridItem span={6} />);
    const item = container.firstChild as HTMLElement;
    expect(item.style.getPropertyValue('--arch-flex-grid-item-span')).toBe('6');
  });

  it('sets span=4 via CSS variable', () => {
    const { container } = render(<FlexGridItem span={4} />);
    const item = container.firstChild as HTMLElement;
    expect(item.style.getPropertyValue('--arch-flex-grid-item-span')).toBe('4');
  });
});

/* ─── FlexGrid with items ────────────────────────────────────────────────────── */

describe('FlexGrid — with FlexGridItem children', () => {
  it('renders multiple FlexGridItem children', () => {
    render(
      <FlexGrid>
        <FlexGridItem span={6}>Left</FlexGridItem>
        <FlexGridItem span={6}>Right</FlexGridItem>
      </FlexGrid>
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });
});
