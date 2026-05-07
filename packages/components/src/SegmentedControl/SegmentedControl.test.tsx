import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { SegmentedControl } from './SegmentedControl';

const defaultOptions = [
  { label: 'Day', id: 'day' },
  { label: 'Week', id: 'week' },
  { label: 'Month', id: 'month' },
];

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('SegmentedControl — rendering', () => {
  it('renders without crashing', () => {
    render(<SegmentedControl options={defaultOptions} activeId="day" onChange={vi.fn()} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders all options as radio buttons', () => {
    render(<SegmentedControl options={defaultOptions} activeId="day" onChange={vi.fn()} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  it('renders option labels', () => {
    render(<SegmentedControl options={defaultOptions} activeId="day" onChange={vi.fn()} />);
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Week')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(
      <SegmentedControl options={defaultOptions} activeId="day" onChange={vi.fn()} className="custom" />
    );
    expect(screen.getByRole('radiogroup')).toHaveClass('custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SegmentedControl ref={ref} options={defaultOptions} activeId="day" onChange={vi.fn()} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Active state ───────────────────────────────────────────────────────────── */

describe('SegmentedControl — active state', () => {
  it('marks the active option with aria-checked', () => {
    render(<SegmentedControl options={defaultOptions} activeId="week" onChange={vi.fn()} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
  });

  it('applies the active segment class to the selected option', () => {
    render(<SegmentedControl options={defaultOptions} activeId="week" onChange={vi.fn()} />);
    expect(screen.getByText('Week').closest('button')).toHaveClass(
      'arch-segmented-control__segment--active'
    );
  });

  it('gives the active option tabIndex 0 and others -1', () => {
    render(<SegmentedControl options={defaultOptions} activeId="month" onChange={vi.fn()} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[2]).toHaveAttribute('tabindex', '0');
    expect(radios[0]).toHaveAttribute('tabindex', '-1');
    expect(radios[1]).toHaveAttribute('tabindex', '-1');
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────────── */

describe('SegmentedControl — disabled', () => {
  it('disables all buttons when disabled', () => {
    render(
      <SegmentedControl options={defaultOptions} activeId="day" onChange={vi.fn()} disabled />
    );
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('applies disabled class to root', () => {
    render(
      <SegmentedControl options={defaultOptions} activeId="day" onChange={vi.fn()} disabled />
    );
    expect(screen.getByRole('radiogroup')).toHaveClass('arch-segmented-control--disabled');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('SegmentedControl — interactivity', () => {
  it('calls onChange when a segment is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SegmentedControl options={defaultOptions} activeId="day" onChange={onChange} />);
    await user.click(screen.getByText('Month'));
    expect(onChange).toHaveBeenCalledWith('month');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('SegmentedControl — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(
      <SegmentedControl options={defaultOptions} activeId="day" onChange={vi.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
