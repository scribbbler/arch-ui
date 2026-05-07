import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from './VisuallyHidden';

/* ─── Smoke ─────────────────────────────────────────────────────────────────── */

describe('VisuallyHidden — smoke', () => {
  it('renders without crashing', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    expect(screen.getByText('Hidden text')).toBeInTheDocument();
  });
});

/* ─── Rendering ─────────────────────────────────────────────────────────────── */

describe('VisuallyHidden — rendering', () => {
  it('renders children', () => {
    render(<VisuallyHidden>Screen reader only</VisuallyHidden>);
    expect(screen.getByText('Screen reader only')).toBeInTheDocument();
  });

  it('renders a <span> by default', () => {
    render(<VisuallyHidden>Text</VisuallyHidden>);
    expect(screen.getByText('Text').tagName).toBe('SPAN');
  });

  it('renders a custom element via the "as" prop', () => {
    render(<VisuallyHidden as="div">Text</VisuallyHidden>);
    expect(screen.getByText('Text').tagName).toBe('DIV');
  });

  it('applies the visually-hidden class', () => {
    render(<VisuallyHidden>Text</VisuallyHidden>);
    expect(screen.getByText('Text')).toHaveClass('arch-visually-hidden');
  });

  it('applies a custom className alongside the base class', () => {
    render(<VisuallyHidden className="extra">Text</VisuallyHidden>);
    const el = screen.getByText('Text');
    expect(el).toHaveClass('arch-visually-hidden');
    expect(el).toHaveClass('extra');
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────────── */

describe('VisuallyHidden — forwardRef', () => {
  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<VisuallyHidden ref={ref}>Text</VisuallyHidden>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
  });
});
