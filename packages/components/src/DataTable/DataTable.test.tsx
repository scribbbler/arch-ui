import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from './DataTable';

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email' },
];

const data = [
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
];

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('DataTable — rendering', () => {
  it('renders without crashing', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });

  it('renders the correct number of rows', () => {
    render(<DataTable columns={columns} data={data} />);
    const tbody = screen.getByRole('table').querySelector('tbody');
    const rows = tbody!.querySelectorAll('tr');
    expect(rows).toHaveLength(2);
  });

  it('applies a custom className', () => {
    const { container } = render(<DataTable columns={columns} data={data} className="custom" />);
    expect(container.firstChild).toHaveClass('arch-data-table', 'custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<DataTable ref={ref} columns={columns} data={data} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Empty state ────────────────────────────────────────────────────────────── */

describe('DataTable — empty state', () => {
  it('shows empty message when data is empty', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="No results" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders empty cell spanning all columns', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="No results" />);
    const cell = screen.getByText('No results');
    expect(cell).toHaveAttribute('colspan', String(columns.length));
  });
});

/* ─── Loading state ──────────────────────────────────────────────────────────── */

describe('DataTable — loading state', () => {
  it('sets aria-busy on the table when loading', () => {
    render(<DataTable columns={columns} data={data} loading />);
    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');
  });

  it('renders loading overlay when loading', () => {
    const { container } = render(<DataTable columns={columns} data={data} loading />);
    expect(container.querySelector('.arch-data-table__loading')).toBeInTheDocument();
  });

  it('does not show loading overlay when not loading', () => {
    const { container } = render(<DataTable columns={columns} data={data} />);
    expect(container.querySelector('.arch-data-table__loading')).not.toBeInTheDocument();
  });
});

/* ─── Sorting ────────────────────────────────────────────────────────────────── */

describe('DataTable — sorting', () => {
  it('renders sort buttons for sortable columns when sortable is enabled', () => {
    render(<DataTable columns={columns} data={data} sortable />);
    const nameHeader = screen.getByText('Name').closest('button');
    expect(nameHeader).toBeInTheDocument();
  });

  it('does not render sort buttons when sortable is false', () => {
    render(<DataTable columns={columns} data={data} />);
    const nameHeader = screen.getByText('Name');
    expect(nameHeader.closest('button')).not.toBeInTheDocument();
  });
});

/* ─── Resizable ──────────────────────────────────────────────────────────────── */

describe('DataTable — resizable', () => {
  it('applies resizable class when resizable is true', () => {
    const { container } = render(<DataTable columns={columns} data={data} resizable />);
    expect(container.firstChild).toHaveClass('arch-data-table--resizable');
  });
});
