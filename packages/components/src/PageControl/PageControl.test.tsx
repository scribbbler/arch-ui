import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageControl } from './PageControl';

const defaultProps = {
  numPages: 5,
  currentPage: 0,
  onChange: vi.fn(),
};

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('PageControl — rendering', () => {
  it('renders without crashing', () => {
    render(<PageControl {...defaultProps} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders the correct number of dots', () => {
    render(<PageControl {...defaultProps} />);
    expect(screen.getAllByRole('tab')).toHaveLength(5);
  });

  it('applies the base class', () => {
    render(<PageControl {...defaultProps} />);
    expect(screen.getByRole('tablist')).toHaveClass('arch-page-control');
  });

  it('applies a custom className', () => {
    render(<PageControl {...defaultProps} className="my-control" />);
    expect(screen.getByRole('tablist')).toHaveClass('arch-page-control', 'my-control');
  });

  it('applies sm size class', () => {
    render(<PageControl {...defaultProps} size="sm" />);
    expect(screen.getByRole('tablist')).toHaveClass('arch-page-control--sm');
  });
});

/* ─── Active dot ─────────────────────────────────────────────────────────────── */

describe('PageControl — active dot', () => {
  it('marks the active dot with aria-selected=true', () => {
    render(<PageControl {...defaultProps} currentPage={2} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
  });

  it('marks non-active dots with aria-selected=false', () => {
    render(<PageControl {...defaultProps} currentPage={2} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[3]).toHaveAttribute('aria-selected', 'false');
  });

  it('applies active class to the current page dot', () => {
    render(<PageControl {...defaultProps} currentPage={1} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveClass('arch-page-control__dot--active');
  });

  it('sets tabIndex=0 on active dot and -1 on others', () => {
    render(<PageControl {...defaultProps} currentPage={3} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[3]).toHaveAttribute('tabindex', '0');
    expect(tabs[0]).toHaveAttribute('tabindex', '-1');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('PageControl — accessibility', () => {
  it('has aria-label on the root tablist', () => {
    render(<PageControl {...defaultProps} />);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'Page navigation');
  });

  it('each dot has an aria-label with page number', () => {
    render(<PageControl {...defaultProps} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-label', 'Page 1');
    expect(tabs[4]).toHaveAttribute('aria-label', 'Page 5');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('PageControl — interactivity', () => {
  it('calls onChange when a dot is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PageControl numPages={5} currentPage={0} onChange={onChange} />);

    await user.click(screen.getAllByRole('tab')[3]);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange on ArrowRight key', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PageControl numPages={3} currentPage={0} onChange={onChange} />);

    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('calls onChange on ArrowLeft key (wraps to last)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PageControl numPages={3} currentPage={0} onChange={onChange} />);

    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith(2);
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('PageControl — forwardRef', () => {
  it('forwards a ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<PageControl ref={ref} {...defaultProps} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
