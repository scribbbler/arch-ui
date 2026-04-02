import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { SkipNav } from './SkipNav';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('SkipNav — rendering', () => {
  it('renders a link element', () => {
    render(<SkipNav />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders default text', () => {
    render(<SkipNav />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('links to #main-content by default', () => {
    render(<SkipNav />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '#main-content');
  });

  it('accepts a custom targetId', () => {
    render(<SkipNav targetId="content" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '#content');
  });

  it('renders custom children as link text', () => {
    render(<SkipNav>Aller au contenu</SkipNav>);
    expect(screen.getByText('Aller au contenu')).toBeInTheDocument();
  });

  it('applies the arch-skip-nav class', () => {
    render(<SkipNav />);
    expect(screen.getByRole('link')).toHaveClass('arch-skip-nav');
  });

  it('applies a custom className', () => {
    render(<SkipNav className="custom" />);
    expect(screen.getByRole('link')).toHaveClass('arch-skip-nav', 'custom');
  });

  it('forwards ref to the anchor element', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(<SkipNav ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('A');
  });
});

/* ─── Labels (i18n) ─────────────────────────────────────────────────────────── */

describe('SkipNav — labels (i18n)', () => {
  it('uses default label text', () => {
    render(<SkipNav />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('accepts a custom label via labels prop', () => {
    render(<SkipNav labels={{ skipToContent: 'Aller au contenu principal' }} />);
    expect(screen.getByText('Aller au contenu principal')).toBeInTheDocument();
  });

  it('children take precedence over labels prop', () => {
    render(
      <SkipNav labels={{ skipToContent: 'Via labels' }}>Via children</SkipNav>
    );
    expect(screen.getByText('Via children')).toBeInTheDocument();
    expect(screen.queryByText('Via labels')).not.toBeInTheDocument();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('SkipNav — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(<SkipNav />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with custom labels', async () => {
    const { container } = render(
      <SkipNav labels={{ skipToContent: 'Aller au contenu' }} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
