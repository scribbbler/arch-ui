import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TableGrid, TableGridHeader, TableGridCell } from './TableGrid';

/* ─── Smoke ─────────────────────────────────────────────────────────────────── */

describe('TableGrid — smoke', () => {
  it('renders without crashing', () => {
    render(<TableGrid columns="1fr 1fr" />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});

/* ─── Rendering ─────────────────────────────────────────────────────────────── */

describe('TableGrid — rendering', () => {
  it('applies the columns value as a CSS custom property', () => {
    render(<TableGrid columns="1fr 2fr 1fr" />);
    const grid = screen.getByRole('grid');
    expect(grid.style.getPropertyValue('--arch-table-grid-columns')).toBe('1fr 2fr 1fr');
  });

  it('renders children', () => {
    render(
      <TableGrid columns="1fr">
        <TableGridHeader>Name</TableGridHeader>
        <TableGridCell>Alice</TableGridCell>
      </TableGrid>,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('applies a custom className to the root element', () => {
    render(<TableGrid columns="1fr" className="my-grid" />);
    expect(screen.getByRole('grid')).toHaveClass('arch-table-grid', 'my-grid');
  });
});

/* ─── Sub-components ────────────────────────────────────────────────────────── */

describe('TableGridHeader', () => {
  it('renders with columnheader role', () => {
    render(
      <TableGrid columns="1fr">
        <TableGridHeader>Heading</TableGridHeader>
      </TableGrid>,
    );
    expect(screen.getByRole('columnheader')).toBeInTheDocument();
    expect(screen.getByRole('columnheader')).toHaveClass('arch-table-grid__header');
  });

  it('applies a custom className', () => {
    render(
      <TableGrid columns="1fr">
        <TableGridHeader className="custom">H</TableGridHeader>
      </TableGrid>,
    );
    expect(screen.getByRole('columnheader')).toHaveClass('custom');
  });
});

describe('TableGridCell', () => {
  it('renders with gridcell role', () => {
    render(
      <TableGrid columns="1fr">
        <TableGridCell>Data</TableGridCell>
      </TableGrid>,
    );
    expect(screen.getByRole('gridcell')).toBeInTheDocument();
    expect(screen.getByRole('gridcell')).toHaveClass('arch-table-grid__cell');
  });

  it('applies a custom className', () => {
    render(
      <TableGrid columns="1fr">
        <TableGridCell className="custom">D</TableGridCell>
      </TableGrid>,
    );
    expect(screen.getByRole('gridcell')).toHaveClass('custom');
  });
});

/* ─── Accessibility ─────────────────────────────────────────────────────────── */

describe('TableGrid — a11y', () => {
  it('has role="grid" on the root element', () => {
    render(<TableGrid columns="1fr 1fr" />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────────── */

describe('TableGrid — forwardRef', () => {
  it('forwards ref on TableGrid', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TableGrid ref={ref} columns="1fr" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('forwards ref on TableGridHeader', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <TableGrid columns="1fr">
        <TableGridHeader ref={ref}>H</TableGridHeader>
      </TableGrid>,
    );
    expect(ref.current).not.toBeNull();
  });

  it('forwards ref on TableGridCell', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <TableGrid columns="1fr">
        <TableGridCell ref={ref}>C</TableGridCell>
      </TableGrid>,
    );
    expect(ref.current).not.toBeNull();
  });
});
