import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AspectRatioBox } from './AspectRatioBox';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('AspectRatioBox — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<AspectRatioBox />);
    expect(container.querySelector('.arch-aspect-ratio-box')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <AspectRatioBox>
        <img alt="Hero" src="hero.jpg" />
      </AspectRatioBox>
    );
    expect(screen.getByAltText('Hero')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<AspectRatioBox className="custom" />);
    expect(container.firstChild).toHaveClass('arch-aspect-ratio-box', 'custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AspectRatioBox ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Aspect ratio ───────────────────────────────────────────────────────────── */

describe('AspectRatioBox — aspect ratio', () => {
  it('defaults to aspect ratio of 1', () => {
    const { container } = render(<AspectRatioBox />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--arch-aspect-ratio')).toBe('1');
  });

  it('sets 16/9 aspect ratio via CSS variable', () => {
    const { container } = render(<AspectRatioBox aspectRatio={16 / 9} />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--arch-aspect-ratio')).toBe(String(16 / 9));
  });

  it('sets 4/3 aspect ratio via CSS variable', () => {
    const { container } = render(<AspectRatioBox aspectRatio={4 / 3} />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--arch-aspect-ratio')).toBe(String(4 / 3));
  });

  it('renders an inner wrapper element', () => {
    const { container } = render(<AspectRatioBox>Content</AspectRatioBox>);
    expect(container.querySelector('.arch-aspect-ratio-box__inner')).toBeInTheDocument();
  });
});
