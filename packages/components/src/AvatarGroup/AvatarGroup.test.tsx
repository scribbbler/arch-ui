import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { AvatarGroup } from './AvatarGroup';
import { Avatar } from '../Avatar';

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function makeAvatars(count: number) {
  return Array.from({ length: count }, (_, i) => (
    <Avatar key={i} name={`Person ${i + 1}`} size="md" />
  ));
}

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('AvatarGroup — rendering', () => {
  it('renders without crashing', () => {
    render(<AvatarGroup>{makeAvatars(3)}</AvatarGroup>);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('renders a <div> root element', () => {
    const { container } = render(<AvatarGroup>{makeAvatars(2)}</AvatarGroup>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('applies a custom className', () => {
    const { container } = render(
      <AvatarGroup className="custom">{makeAvatars(2)}</AvatarGroup>
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AvatarGroup ref={ref}>{makeAvatars(2)}</AvatarGroup>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('renders all children when max is not provided', () => {
    render(<AvatarGroup>{makeAvatars(4)}</AvatarGroup>);
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });
});

/* ─── Max overflow ───────────────────────────────────────────────────────────── */

describe('AvatarGroup — max overflow', () => {
  it('renders only max avatars when children exceed max', () => {
    render(<AvatarGroup max={2}>{makeAvatars(5)}</AvatarGroup>);
    // 2 avatars + 1 overflow badge = 3 role=img elements
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
  });

  it('renders a "+N" overflow badge when children exceed max', () => {
    render(<AvatarGroup max={2}>{makeAvatars(5)}</AvatarGroup>);
    expect(screen.getByText('+3')).toBeInTheDocument();
  });

  it('overflow badge has aria-label with the correct count', () => {
    render(<AvatarGroup max={2}>{makeAvatars(5)}</AvatarGroup>);
    expect(screen.getByRole('img', { name: '3 more' })).toBeInTheDocument();
  });

  it('does NOT render an overflow badge when children count equals max', () => {
    render(<AvatarGroup max={3}>{makeAvatars(3)}</AvatarGroup>);
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it('does NOT render an overflow badge when children count is less than max', () => {
    render(<AvatarGroup max={5}>{makeAvatars(3)}</AvatarGroup>);
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it('renders exactly max avatars when there is overflow', () => {
    render(<AvatarGroup max={3}>{makeAvatars(6)}</AvatarGroup>);
    // 3 avatars visible + 1 overflow badge
    const items = screen.getAllByRole('img');
    // The 3 real avatars + the overflow badge (+3 more)
    expect(items).toHaveLength(4);
  });
});

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

describe('AvatarGroup — sizes', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

  sizes.forEach((size) => {
    it(`applies the "${size}" size class`, () => {
      const { container } = render(
        <AvatarGroup size={size}>{makeAvatars(2)}</AvatarGroup>
      );
      expect(container.firstChild).toHaveClass(`arch-avatar-group--${size}`);
    });
  });

  it('defaults to size="md"', () => {
    const { container } = render(<AvatarGroup>{makeAvatars(2)}</AvatarGroup>);
    expect(container.firstChild).toHaveClass('arch-avatar-group--md');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('AvatarGroup — accessibility', () => {
  it('passes axe with multiple avatars', async () => {
    const { container } = render(
      <AvatarGroup>{makeAvatars(3)}</AvatarGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with overflow badge', async () => {
    const { container } = render(
      <AvatarGroup max={2}>{makeAvatars(5)}</AvatarGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
