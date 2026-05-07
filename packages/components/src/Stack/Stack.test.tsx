import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Stack } from './Stack';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Stack — rendering', () => {
  it('renders without crashing', () => {
    render(<Stack>Content</Stack>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Stack>
        <div>Child 1</div>
        <div>Child 2</div>
      </Stack>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('renders as a div by default', () => {
    render(<Stack>Content</Stack>);
    expect(screen.getByText('Content').tagName).toBe('DIV');
  });

  it('renders as a custom element via the as prop', () => {
    render(<Stack as="section">Content</Stack>);
    expect(screen.getByText('Content').tagName).toBe('SECTION');
  });

  it('applies the arch-stack class', () => {
    render(<Stack>Content</Stack>);
    expect(screen.getByText('Content')).toHaveClass('arch-stack');
  });

  it('applies a custom className', () => {
    render(<Stack className="my-stack">Content</Stack>);
    expect(screen.getByText('Content')).toHaveClass('arch-stack', 'my-stack');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<Stack ref={ref}>Content</Stack>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── CSS variable props ─────────────────────────────────────────────────────── */

describe('Stack — CSS variable props', () => {
  it('sets --stack-gap when gap is provided', () => {
    render(<Stack gap="spacing-200">Content</Stack>);
    const el = screen.getByText('Content');
    expect(el.style.getPropertyValue('--stack-gap')).toBe('var(--spacing-200)');
  });

  it('sets --stack-align when align is provided', () => {
    render(<Stack align="center">Content</Stack>);
    const el = screen.getByText('Content');
    expect(el.style.getPropertyValue('--stack-align')).toBe('center');
  });

  it('sets --stack-justify when justify is provided', () => {
    render(<Stack justify="space-between">Content</Stack>);
    const el = screen.getByText('Content');
    expect(el.style.getPropertyValue('--stack-justify')).toBe('space-between');
  });

  it('sets --stack-direction when direction is provided', () => {
    render(<Stack direction="column-reverse">Content</Stack>);
    const el = screen.getByText('Content');
    expect(el.style.getPropertyValue('--stack-direction')).toBe('column-reverse');
  });

  it('does not set CSS variables when optional props are omitted', () => {
    render(<Stack>Content</Stack>);
    const el = screen.getByText('Content');
    expect(el.style.getPropertyValue('--stack-gap')).toBe('');
    expect(el.style.getPropertyValue('--stack-align')).toBe('');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Stack — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(
      <Stack>
        <div>Item</div>
      </Stack>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
