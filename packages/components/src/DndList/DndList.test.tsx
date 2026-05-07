import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DndList } from './DndList';

const items = [
  { id: '1', label: 'Item A' },
  { id: '2', label: 'Item B' },
  { id: '3', label: 'Item C' },
];

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('DndList — rendering', () => {
  it('renders without crashing', () => {
    render(<DndList items={items} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders a <ul> element', () => {
    render(<DndList items={items} />);
    expect(screen.getByRole('list').tagName).toBe('UL');
  });

  it('renders all items', () => {
    render(<DndList items={items} />);
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
    expect(screen.getByText('Item C')).toBeInTheDocument();
  });

  it('renders the correct number of list items', () => {
    render(<DndList items={items} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('renders empty list when no items provided', () => {
    render(<DndList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('applies a custom className', () => {
    render(<DndList items={items} className="custom" />);
    expect(screen.getByRole('list')).toHaveClass('arch-dnd-list', 'custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLUListElement>();
    render(<DndList ref={ref} items={items} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('UL');
  });
});

/* ─── Drag handles ───────────────────────────────────────────────────────────── */

describe('DndList — drag handles', () => {
  it('renders a drag handle button for each item', () => {
    render(<DndList items={items} />);
    const handles = screen.getAllByLabelText(/^Reorder /);
    expect(handles).toHaveLength(3);
  });

  it('drag handle has aria-roledescription="sortable"', () => {
    render(<DndList items={items} />);
    const handle = screen.getByLabelText('Reorder Item A');
    expect(handle).toHaveAttribute('aria-roledescription', 'sortable');
  });
});

/* ─── Remove button ──────────────────────────────────────────────────────────── */

describe('DndList — removable', () => {
  it('does not show remove buttons by default', () => {
    render(<DndList items={items} />);
    expect(screen.queryByLabelText(/^Remove /)).not.toBeInTheDocument();
  });

  it('shows remove buttons when removable is true', () => {
    render(<DndList items={items} removable />);
    const removeButtons = screen.getAllByLabelText(/^Remove /);
    expect(removeButtons).toHaveLength(3);
  });

  it('calls onChange when remove button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DndList items={items} removable onChange={onChange} />);

    await user.click(screen.getByLabelText('Remove Item B'));
    expect(onChange).toHaveBeenCalledWith([
      { id: '1', label: 'Item A' },
      { id: '3', label: 'Item C' },
    ]);
  });
});

/* ─── Draggable attribute ────────────────────────────────────────────────────── */

describe('DndList — draggable', () => {
  it('each item is draggable', () => {
    render(<DndList items={items} />);
    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((item) => {
      expect(item).toHaveAttribute('draggable', 'true');
    });
  });
});
