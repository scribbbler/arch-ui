import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Avatar } from './Avatar';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Avatar — rendering', () => {
  it('renders without crashing', () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
  });

  it('renders the root as a <span>', () => {
    const { container } = render(<Avatar name="Jane Doe" />);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Avatar ref={ref} name="Jane Doe" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SPAN');
  });

  it('applies a custom className', () => {
    const { container } = render(<Avatar name="Jane Doe" className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});

/* ─── Image rendering ────────────────────────────────────────────────────────── */

describe('Avatar — image', () => {
  it('renders an img element when src is provided', () => {
    render(<Avatar src="/avatar.jpg" name="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
  });

  it('sets alt text from the name prop', () => {
    render(<Avatar src="/avatar.jpg" name="Jane Doe" />);
    const img = screen.getByRole('img', { name: 'Jane Doe' });
    expect(img).toHaveAttribute('alt', 'Jane Doe');
  });

  it('applies the image class to the img element', () => {
    const { container } = render(<Avatar src="/avatar.jpg" name="Jane Doe" />);
    const img = container.querySelector('img');
    expect(img).toHaveClass('arch-avatar__image');
  });
});

/* ─── Initials fallback ──────────────────────────────────────────────────────── */

describe('Avatar — initials fallback', () => {
  it('renders initials when no src is provided', () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders a single initial when name has one word', () => {
    render(<Avatar name="Jane" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('uses only first two words for initials', () => {
    render(<Avatar name="Jane Marie Doe" />);
    expect(screen.getByText('JM')).toBeInTheDocument();
  });

  it('root span has role=img with aria-label when showing initials', () => {
    render(<Avatar name="Jane Doe" />);
    const root = screen.getByRole('img', { name: 'Jane Doe' });
    expect(root.tagName).toBe('SPAN');
  });

  it('falls back to initials when image fails to load', () => {
    render(<Avatar src="/bad-url.jpg" name="Jane Doe" />);
    const img = screen.getByRole('img', { name: 'Jane Doe' });
    fireEvent.error(img);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('shows initials container after image error', () => {
    const { container } = render(<Avatar src="/bad-url.jpg" name="Jane Doe" />);
    const img = container.querySelector('img');
    if (img) fireEvent.error(img);
    expect(container.querySelector('.arch-avatar__initials')).toBeInTheDocument();
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('Avatar — sizes', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

  sizes.forEach((size) => {
    it(`applies the "${size}" size class`, () => {
      const { container } = render(<Avatar name="Jane Doe" size={size} />);
      expect(container.firstChild).toHaveClass(`arch-avatar--${size}`);
    });
  });

  it('defaults to size="md"', () => {
    const { container } = render(<Avatar name="Jane Doe" />);
    expect(container.firstChild).toHaveClass('arch-avatar--md');
  });
});

/* ─── Shapes ─────────────────────────────────────────────────────────────────── */

describe('Avatar — shapes', () => {
  it('applies the circle shape class', () => {
    const { container } = render(<Avatar name="Jane Doe" shape="circle" />);
    expect(container.firstChild).toHaveClass('arch-avatar--circle');
  });

  it('applies the square shape class', () => {
    const { container } = render(<Avatar name="Jane Doe" shape="square" />);
    expect(container.firstChild).toHaveClass('arch-avatar--square');
  });

  it('defaults to shape="circle"', () => {
    const { container } = render(<Avatar name="Jane Doe" />);
    expect(container.firstChild).toHaveClass('arch-avatar--circle');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Avatar — accessibility', () => {
  it('passes axe with initials fallback', async () => {
    const { container } = render(<Avatar name="Jane Doe" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with image', async () => {
    const { container } = render(<Avatar src="/avatar.jpg" name="Jane Doe" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for all sizes', async () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    for (const size of sizes) {
      const { container } = render(<Avatar name="Jane Doe" size={size} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('passes axe for square shape', async () => {
    const { container } = render(<Avatar name="Jane Doe" shape="square" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
