import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Pagination } from './Pagination';

/* ─── Controlled wrapper ─────────────────────────────────────────────────────── */

function ControlledPagination({
  totalPages = 10,
  initialPage = 1,
  onChange,
  ...props
}: Partial<React.ComponentProps<typeof Pagination>> & {
  totalPages?: number;
  initialPage?: number;
  onChange?: (page: number) => void;
}) {
  const [page, setPage] = useState(initialPage);
  return (
    <Pagination
      totalPages={totalPages}
      currentPage={page}
      onChange={(p) => {
        setPage(p);
        onChange?.(p);
      }}
      {...props}
    />
  );
}

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Pagination — rendering', () => {
  it('renders a nav element with aria-label="Pagination"', () => {
    render(<ControlledPagination />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });

  it('renders page number buttons', () => {
    render(<ControlledPagination totalPages={5} initialPage={1} />);
    expect(screen.getByRole('button', { name: 'Go to page 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to page 5' })).toBeInTheDocument();
  });

  it('renders previous and next buttons', () => {
    render(<ControlledPagination />);
    expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to next page' })).toBeInTheDocument();
  });

  it('does not render first/last buttons by default', () => {
    render(<ControlledPagination />);
    expect(screen.queryByRole('button', { name: 'Go to first page' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Go to last page' })).not.toBeInTheDocument();
  });

  it('renders first and last buttons when showFirstLast=true', () => {
    render(<ControlledPagination showFirstLast />);
    expect(screen.getByRole('button', { name: 'Go to first page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to last page' })).toBeInTheDocument();
  });

  it('applies a custom className to the nav element', () => {
    render(<ControlledPagination className="my-pagination" />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toHaveClass('my-pagination');
  });

  it('forwards a ref to the nav element', () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onChange={() => undefined}
        ref={ref}
      />
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('NAV');
  });
});

/* ─── Current page ───────────────────────────────────────────────────────────── */

describe('Pagination — current page', () => {
  it('current page button has aria-current="page"', () => {
    render(<ControlledPagination totalPages={5} initialPage={3} />);
    expect(screen.getByRole('button', { name: 'Go to page 3' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('non-current page buttons do not have aria-current', () => {
    render(<ControlledPagination totalPages={5} initialPage={1} />);
    expect(screen.getByRole('button', { name: 'Go to page 2' })).not.toHaveAttribute(
      'aria-current'
    );
  });
});

/* ─── Prev/next disabled at boundaries ───────────────────────────────────────── */

describe('Pagination — boundary disabled states', () => {
  it('previous button is aria-disabled on page 1', () => {
    render(<ControlledPagination initialPage={1} />);
    expect(
      screen.getByRole('button', { name: 'Go to previous page' })
    ).toHaveAttribute('aria-disabled', 'true');
  });

  it('next button is aria-disabled on the last page', () => {
    render(<ControlledPagination totalPages={5} initialPage={5} />);
    expect(
      screen.getByRole('button', { name: 'Go to next page' })
    ).toHaveAttribute('aria-disabled', 'true');
  });

  it('previous button is not aria-disabled when past page 1', () => {
    render(<ControlledPagination totalPages={5} initialPage={2} />);
    expect(
      screen.getByRole('button', { name: 'Go to previous page' })
    ).not.toHaveAttribute('aria-disabled');
  });

  it('next button is not aria-disabled before the last page', () => {
    render(<ControlledPagination totalPages={5} initialPage={4} />);
    expect(
      screen.getByRole('button', { name: 'Go to next page' })
    ).not.toHaveAttribute('aria-disabled');
  });

  it('first button is aria-disabled on page 1 when showFirstLast=true', () => {
    render(<ControlledPagination initialPage={1} showFirstLast />);
    expect(
      screen.getByRole('button', { name: 'Go to first page' })
    ).toHaveAttribute('aria-disabled', 'true');
  });

  it('last button is aria-disabled on the last page when showFirstLast=true', () => {
    render(<ControlledPagination totalPages={5} initialPage={5} showFirstLast />);
    expect(
      screen.getByRole('button', { name: 'Go to last page' })
    ).toHaveAttribute('aria-disabled', 'true');
  });
});

/* ─── Ellipsis ───────────────────────────────────────────────────────────────── */

describe('Pagination — ellipsis', () => {
  it('shows ellipsis when there is a gap after page 1', () => {
    // totalPages=20, currentPage=10 — gap at start and end
    render(<ControlledPagination totalPages={20} initialPage={10} siblingCount={1} />);
    const ellipses = document.querySelectorAll('.arch-pagination__ellipsis');
    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });

  it('does not show ellipsis when all pages fit', () => {
    // 5 pages always fit without ellipsis
    render(<ControlledPagination totalPages={5} initialPage={3} />);
    const ellipses = document.querySelectorAll('.arch-pagination__ellipsis');
    expect(ellipses).toHaveLength(0);
  });

  it('ellipsis spans are aria-hidden', () => {
    render(<ControlledPagination totalPages={20} initialPage={10} siblingCount={1} />);
    const ellipses = document.querySelectorAll('.arch-pagination__ellipsis');
    ellipses.forEach((el) => expect(el).toHaveAttribute('aria-hidden', 'true'));
  });

  it('shows end ellipsis when near the start', () => {
    render(<ControlledPagination totalPages={20} initialPage={1} siblingCount={1} />);
    const ellipses = document.querySelectorAll('.arch-pagination__ellipsis');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('shows start ellipsis when near the end', () => {
    render(<ControlledPagination totalPages={20} initialPage={20} siblingCount={1} />);
    const ellipses = document.querySelectorAll('.arch-pagination__ellipsis');
    expect(ellipses.length).toBeGreaterThan(0);
  });
});

/* ─── onChange fires ─────────────────────────────────────────────────────────── */

describe('Pagination — onChange', () => {
  it('calls onChange when a page button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ControlledPagination totalPages={5} initialPage={1} onChange={handleChange} />);
    await user.click(screen.getByRole('button', { name: 'Go to page 3' }));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange with next page when next is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ControlledPagination totalPages={5} initialPage={2} onChange={handleChange} />);
    await user.click(screen.getByRole('button', { name: 'Go to next page' }));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange with previous page when prev is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ControlledPagination totalPages={5} initialPage={3} onChange={handleChange} />);
    await user.click(screen.getByRole('button', { name: 'Go to previous page' }));
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('does not call onChange when clicking the current page', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ControlledPagination totalPages={5} initialPage={3} onChange={handleChange} />);
    await user.click(screen.getByRole('button', { name: 'Go to page 3' }));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when prev is disabled (page 1)', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ControlledPagination totalPages={5} initialPage={1} onChange={handleChange} />);
    await user.click(
      screen.getByRole('button', { name: 'Go to previous page' })
    ).catch(() => { /* pointer-events:none may prevent event */ });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('calls onChange with page 1 when first button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <ControlledPagination
        totalPages={10}
        initialPage={5}
        showFirstLast
        onChange={handleChange}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Go to first page' }));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('calls onChange with totalPages when last button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <ControlledPagination
        totalPages={10}
        initialPage={5}
        showFirstLast
        onChange={handleChange}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Go to last page' }));
    expect(handleChange).toHaveBeenCalledWith(10);
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Pagination — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(
      <Pagination totalPages={10} currentPage={1} onChange={() => undefined} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe on page 5 of 10', async () => {
    const { container } = render(
      <Pagination totalPages={10} currentPage={5} onChange={() => undefined} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe on the last page', async () => {
    const { container } = render(
      <Pagination totalPages={10} currentPage={10} onChange={() => undefined} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with showFirstLast enabled', async () => {
    const { container } = render(
      <Pagination
        totalPages={10}
        currentPage={5}
        onChange={() => undefined}
        showFirstLast
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with siblingCount=2', async () => {
    const { container } = render(
      <Pagination
        totalPages={20}
        currentPage={10}
        onChange={() => undefined}
        siblingCount={2}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
