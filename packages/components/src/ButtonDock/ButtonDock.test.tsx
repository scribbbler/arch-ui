import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ButtonDock } from './ButtonDock';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('ButtonDock — rendering', () => {
  it('renders without crashing', () => {
    render(<ButtonDock primaryAction={<button>Save</button>} />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders primaryAction', () => {
    render(<ButtonDock primaryAction={<button>Save</button>} />);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders secondaryAction', () => {
    render(<ButtonDock secondaryAction={<button>Draft</button>} />);
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('renders dismissAction', () => {
    render(<ButtonDock dismissAction={<a href="/cancel">Cancel</a>} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders all three actions together', () => {
    render(
      <ButtonDock
        primaryAction={<button>Save</button>}
        secondaryAction={<button>Draft</button>}
        dismissAction={<a href="/cancel">Cancel</a>}
      />
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Draft')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('does not render slots when actions are not provided', () => {
    const { container } = render(<ButtonDock />);
    expect(container.querySelector('.arch-button-dock__primary')).toBeNull();
    expect(container.querySelector('.arch-button-dock__secondary')).toBeNull();
    expect(container.querySelector('.arch-button-dock__dismiss')).toBeNull();
  });

  it('applies a custom className', () => {
    render(<ButtonDock className="custom" primaryAction={<button>Save</button>} />);
    expect(screen.getByRole('contentinfo')).toHaveClass('custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ButtonDock ref={ref} primaryAction={<button>Save</button>} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Position ───────────────────────────────────────────────────────────────── */

describe('ButtonDock — position', () => {
  it('defaults to fixed position class', () => {
    render(<ButtonDock primaryAction={<button>Save</button>} />);
    expect(screen.getByRole('contentinfo')).toHaveClass('arch-button-dock--fixed');
  });

  it('applies sticky position class', () => {
    render(<ButtonDock position="sticky" primaryAction={<button>Save</button>} />);
    expect(screen.getByRole('contentinfo')).toHaveClass('arch-button-dock--sticky');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('ButtonDock — accessibility', () => {
  it('has role contentinfo', () => {
    render(<ButtonDock primaryAction={<button>Save</button>} />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('passes axe with default props', async () => {
    const { container } = render(
      <ButtonDock primaryAction={<button>Save</button>} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
