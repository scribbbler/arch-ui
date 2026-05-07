import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TableSemantic } from './TableSemantic';

/* ─── Smoke ─────────────────────────────────────────────────────────────────── */

describe('TableSemantic — smoke', () => {
  it('renders without crashing', () => {
    render(<TableSemantic />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});

/* ─── Rendering ─────────────────────────────────────────────────────────────── */

describe('TableSemantic — rendering', () => {
  it('renders a <table> element', () => {
    render(<TableSemantic />);
    expect(screen.getByRole('table').tagName).toBe('TABLE');
  });

  it('renders children', () => {
    render(
      <TableSemantic>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
      </TableSemantic>,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<TableSemantic className="my-table" />);
    expect(screen.getByRole('table')).toHaveClass('arch-table-semantic', 'my-table');
  });
});

/* ─── Variants / Classes ────────────────────────────────────────────────────── */

describe('TableSemantic — variants', () => {
  it('applies the striped class when striped=true', () => {
    render(<TableSemantic striped />);
    expect(screen.getByRole('table')).toHaveClass('arch-table-semantic--striped');
  });

  it('does not apply the striped class by default', () => {
    render(<TableSemantic />);
    expect(screen.getByRole('table')).not.toHaveClass('arch-table-semantic--striped');
  });

  it('applies the hoverable class when hoverable=true', () => {
    render(<TableSemantic hoverable />);
    expect(screen.getByRole('table')).toHaveClass('arch-table-semantic--hoverable');
  });

  it('does not apply the hoverable class by default', () => {
    render(<TableSemantic />);
    expect(screen.getByRole('table')).not.toHaveClass('arch-table-semantic--hoverable');
  });
});

/* ─── Sizes ─────────────────────────────────────────────────────────────────── */

describe('TableSemantic — sizes', () => {
  const sizes = ['compact', 'default', 'spacious'] as const;

  sizes.forEach((size) => {
    it(`applies the "${size}" size class`, () => {
      render(<TableSemantic size={size} />);
      expect(screen.getByRole('table')).toHaveClass(`arch-table-semantic--${size}`);
    });
  });

  it('defaults to size="default"', () => {
    render(<TableSemantic />);
    expect(screen.getByRole('table')).toHaveClass('arch-table-semantic--default');
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────────── */

describe('TableSemantic — forwardRef', () => {
  it('forwards ref to the <table> element', () => {
    const ref = React.createRef<HTMLTableElement>();
    render(<TableSemantic ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('TABLE');
  });
});
