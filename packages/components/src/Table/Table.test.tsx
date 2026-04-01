import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from './Table';

/* ─── Fixture ────────────────────────────────────────────────────────────────── */

function BasicTable({ striped = false, bordered = false, size = 'md' as const }) {
  return (
    <Table caption="Monthly revenue" striped={striped} bordered={bordered} size={size}>
      <Thead>
        <Tr>
          <Th scope="col">Month</Th>
          <Th scope="col">Revenue</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>January</Td>
          <Td>$10,000</Td>
        </Tr>
        <Tr>
          <Td>February</Td>
          <Td>$12,000</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th scope="row">Total</Th>
          <Td>$22,000</Td>
        </Tr>
      </Tfoot>
    </Table>
  );
}

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Table — rendering', () => {
  it('renders the table element', () => {
    render(<BasicTable />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders the caption', () => {
    render(<BasicTable />);
    expect(screen.getByText('Monthly revenue')).toBeInTheDocument();
  });

  it('renders header cells', () => {
    render(<BasicTable />);
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  it('renders data cells', () => {
    render(<BasicTable />);
    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('$10,000')).toBeInTheDocument();
  });

  it('renders tfoot', () => {
    const { container } = render(<BasicTable />);
    expect(container.querySelector('tfoot')).toBeInTheDocument();
  });

  it('forwards ref to the table element', () => {
    const ref = React.createRef<HTMLTableElement>();
    render(
      <Table ref={ref} caption="Test table">
        <Tbody>
          <Tr><Td>Cell</Td></Tr>
        </Tbody>
      </Table>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('TABLE');
  });
});

/* ─── Caption ────────────────────────────────────────────────────────────────── */

describe('Table — caption', () => {
  it('renders caption element', () => {
    const { container } = render(<BasicTable />);
    expect(container.querySelector('caption')).toBeInTheDocument();
  });

  it('caption has the correct text', () => {
    const { container } = render(<BasicTable />);
    const caption = container.querySelector('caption');
    expect(caption?.textContent).toBe('Monthly revenue');
  });
});

/* ─── Striped class ──────────────────────────────────────────────────────────── */

describe('Table — striped', () => {
  it('does not have striped class by default', () => {
    render(<BasicTable />);
    expect(screen.getByRole('table')).not.toHaveClass('arch-table--striped');
  });

  it('applies arch-table--striped class when striped=true', () => {
    render(<BasicTable striped />);
    expect(screen.getByRole('table')).toHaveClass('arch-table--striped');
  });
});

/* ─── Bordered class ─────────────────────────────────────────────────────────── */

describe('Table — bordered', () => {
  it('does not have bordered class by default', () => {
    render(<BasicTable />);
    expect(screen.getByRole('table')).not.toHaveClass('arch-table--bordered');
  });

  it('applies arch-table--bordered class when bordered=true', () => {
    render(<BasicTable bordered />);
    expect(screen.getByRole('table')).toHaveClass('arch-table--bordered');
  });
});

/* ─── Size ───────────────────────────────────────────────────────────────────── */

describe('Table — size', () => {
  it('defaults to size md', () => {
    render(<BasicTable />);
    expect(screen.getByRole('table')).toHaveClass('arch-table--md');
  });

  it('applies arch-table--sm class when size=sm', () => {
    render(<BasicTable size="sm" />);
    expect(screen.getByRole('table')).toHaveClass('arch-table--sm');
  });
});

/* ─── Th scope ───────────────────────────────────────────────────────────────── */

describe('Table — Th scope', () => {
  it('Th has scope="col" when specified', () => {
    render(<BasicTable />);
    const colHeaders = screen.getAllByRole('columnheader');
    colHeaders.forEach((th) => {
      expect(th).toHaveAttribute('scope', 'col');
    });
  });

  it('Th has scope="row" when specified', () => {
    render(<BasicTable />);
    const rowHeaders = screen.getAllByRole('rowheader');
    expect(rowHeaders[0]).toHaveAttribute('scope', 'row');
  });
});

/* ─── Sub-component refs ─────────────────────────────────────────────────────── */

describe('Table — sub-component refs', () => {
  it('Thead forwards ref', () => {
    const ref = React.createRef<HTMLTableSectionElement>();
    render(
      <Table caption="Test">
        <Thead ref={ref}><Tr><Th scope="col">H</Th></Tr></Thead>
        <Tbody><Tr><Td>D</Td></Tr></Tbody>
      </Table>
    );
    expect(ref.current?.tagName).toBe('THEAD');
  });

  it('Tbody forwards ref', () => {
    const ref = React.createRef<HTMLTableSectionElement>();
    render(
      <Table caption="Test">
        <Tbody ref={ref}><Tr><Td>D</Td></Tr></Tbody>
      </Table>
    );
    expect(ref.current?.tagName).toBe('TBODY');
  });

  it('Tr forwards ref', () => {
    const ref = React.createRef<HTMLTableRowElement>();
    render(
      <Table caption="Test">
        <Tbody><Tr ref={ref}><Td>D</Td></Tr></Tbody>
      </Table>
    );
    expect(ref.current?.tagName).toBe('TR');
  });

  it('Th forwards ref', () => {
    const ref = React.createRef<HTMLTableCellElement>();
    render(
      <Table caption="Test">
        <Thead><Tr><Th ref={ref} scope="col">H</Th></Tr></Thead>
        <Tbody><Tr><Td>D</Td></Tr></Tbody>
      </Table>
    );
    expect(ref.current?.tagName).toBe('TH');
  });

  it('Td forwards ref', () => {
    const ref = React.createRef<HTMLTableCellElement>();
    render(
      <Table caption="Test">
        <Tbody><Tr><Td ref={ref}>D</Td></Tr></Tbody>
      </Table>
    );
    expect(ref.current?.tagName).toBe('TD');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Table — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(<BasicTable />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with striped=true', async () => {
    const { container } = render(<BasicTable striped />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with bordered=true', async () => {
    const { container } = render(<BasicTable bordered />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with size=sm', async () => {
    const { container } = render(<BasicTable size="sm" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
