import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from './Menu';
import type { MenuItem } from './Menu';

const items: MenuItem[] = [
  { label: 'Edit' },
  { label: 'Copy' },
  { label: 'Delete', disabled: true },
];

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Menu — rendering', () => {
  it('renders without crashing', () => {
    render(<Menu items={items} />);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders a <ul> element', () => {
    render(<Menu items={items} />);
    expect(screen.getByRole('menu').tagName).toBe('UL');
  });

  it('renders all menu items', () => {
    render(<Menu items={items} />);
    expect(screen.getAllByRole('menuitem')).toHaveLength(3);
  });

  it('renders item labels', () => {
    render(<Menu items={items} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('applies the base class', () => {
    render(<Menu items={items} />);
    expect(screen.getByRole('menu')).toHaveClass('arch-menu');
  });

  it('applies a custom className', () => {
    render(<Menu items={items} className="my-menu" />);
    expect(screen.getByRole('menu')).toHaveClass('arch-menu', 'my-menu');
  });

  it('renders empty when no items', () => {
    render(<Menu />);
    expect(screen.getByRole('menu').children).toHaveLength(0);
  });
});

/* ─── Dividers ───────────────────────────────────────────────────────────────── */

describe('Menu — dividers', () => {
  it('renders a divider as a separator', () => {
    const itemsWithDivider: MenuItem[] = [
      { label: 'Edit' },
      { label: '', divider: true },
      { label: 'Delete' },
    ];
    render(<Menu items={itemsWithDivider} />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('applies divider class', () => {
    const itemsWithDivider: MenuItem[] = [
      { label: '', divider: true },
    ];
    render(<Menu items={itemsWithDivider} />);
    expect(screen.getByRole('separator')).toHaveClass('arch-menu__divider');
  });
});

/* ─── Disabled items ─────────────────────────────────────────────────────────── */

describe('Menu — disabled items', () => {
  it('applies disabled class', () => {
    render(<Menu items={items} />);
    const deleteItem = screen.getByText('Delete').closest('.arch-menu__item');
    expect(deleteItem).toHaveClass('arch-menu__item--disabled');
  });

  it('sets aria-disabled on disabled items', () => {
    render(<Menu items={items} />);
    const deleteItem = screen.getByText('Delete').closest('[role="menuitem"]');
    expect(deleteItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('sets tabIndex=-1 on disabled items', () => {
    render(<Menu items={items} />);
    const deleteItem = screen.getByText('Delete').closest('[role="menuitem"]');
    expect(deleteItem).toHaveAttribute('tabindex', '-1');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('Menu — interactivity', () => {
  it('calls onItemSelect when a non-disabled item is clicked', async () => {
    const user = userEvent.setup();
    const onItemSelect = vi.fn();
    render(<Menu items={items} onItemSelect={onItemSelect} />);

    await user.click(screen.getByText('Edit').closest('[role="menuitem"]')!);
    expect(onItemSelect).toHaveBeenCalledTimes(1);
    expect(onItemSelect).toHaveBeenCalledWith(items[0]);
  });

  it('does not call onItemSelect when a disabled item is clicked', async () => {
    const user = userEvent.setup();
    const onItemSelect = vi.fn();
    render(<Menu items={items} onItemSelect={onItemSelect} />);

    await user.click(screen.getByText('Delete').closest('[role="menuitem"]')!);
    expect(onItemSelect).not.toHaveBeenCalled();
  });

  it('fires onItemSelect on Enter key', async () => {
    const user = userEvent.setup();
    const onItemSelect = vi.fn();
    render(<Menu items={items} onItemSelect={onItemSelect} />);

    const editItem = screen.getByText('Edit').closest('[role="menuitem"]')!;
    editItem.focus();
    await user.keyboard('{Enter}');
    expect(onItemSelect).toHaveBeenCalledTimes(1);
  });

  it('fires onItemSelect on Space key', async () => {
    const user = userEvent.setup();
    const onItemSelect = vi.fn();
    render(<Menu items={items} onItemSelect={onItemSelect} />);

    const copyItem = screen.getByText('Copy').closest('[role="menuitem"]')!;
    copyItem.focus();
    await user.keyboard(' ');
    expect(onItemSelect).toHaveBeenCalledTimes(1);
  });
});

/* ─── Icons ──────────────────────────────────────────────────────────────────── */

describe('Menu — icons', () => {
  it('renders an icon when provided', () => {
    const itemsWithIcon: MenuItem[] = [
      { label: 'Edit', icon: <span data-testid="edit-icon">E</span> },
    ];
    render(<Menu items={itemsWithIcon} />);
    expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('Menu — forwardRef', () => {
  it('forwards a ref to the ul element', () => {
    const ref = React.createRef<HTMLUListElement>();
    render(<Menu ref={ref} items={items} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('UL');
  });
});
