import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TreeView } from './TreeView';
import type { TreeNode } from './TreeView';

const flatItems: TreeNode[] = [
  { id: '1', label: 'Item A' },
  { id: '2', label: 'Item B' },
  { id: '3', label: 'Item C' },
];

const nestedItems: TreeNode[] = [
  {
    id: '1',
    label: 'Root',
    isExpanded: true,
    children: [
      { id: '1-1', label: 'Child A' },
      { id: '1-2', label: 'Child B' },
    ],
  },
  { id: '2', label: 'Sibling' },
];

const collapsedItems: TreeNode[] = [
  {
    id: '1',
    label: 'Root',
    isExpanded: false,
    children: [
      { id: '1-1', label: 'Child A' },
    ],
  },
];

/* ─── Smoke ─────────────────────────────────────────────────────────────────── */

describe('TreeView — smoke', () => {
  it('renders without crashing', () => {
    render(<TreeView items={flatItems} />);
    expect(screen.getByRole('tree')).toBeInTheDocument();
  });
});

/* ─── Rendering ─────────────────────────────────────────────────────────────── */

describe('TreeView — rendering', () => {
  it('renders all top-level items', () => {
    render(<TreeView items={flatItems} />);
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
    expect(screen.getByText('Item C')).toBeInTheDocument();
  });

  it('renders nested children when parent is expanded', () => {
    render(<TreeView items={nestedItems} />);
    expect(screen.getByText('Child A')).toBeInTheDocument();
    expect(screen.getByText('Child B')).toBeInTheDocument();
  });

  it('does not render children when parent is collapsed', () => {
    render(<TreeView items={collapsedItems} />);
    expect(screen.queryByText('Child A')).not.toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<TreeView items={flatItems} className="my-tree" />);
    expect(screen.getByRole('tree')).toHaveClass('arch-tree-view', 'my-tree');
  });
});

/* ─── Selection ─────────────────────────────────────────────────────────────── */

describe('TreeView — selection', () => {
  it('marks a node as selected via selectedId', () => {
    render(<TreeView items={flatItems} selectedId="1" />);
    const treeitems = screen.getAllByRole('treeitem');
    const first = treeitems[0];
    expect(first).toHaveAttribute('aria-selected', 'true');
  });

  it('fires onSelect when a node is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TreeView items={flatItems} onSelect={onSelect} />);
    await user.click(screen.getByText('Item B'));
    expect(onSelect).toHaveBeenCalledWith('2');
  });
});

/* ─── Expand/Collapse ───────────────────────────────────────────────────────── */

describe('TreeView — expand/collapse', () => {
  it('sets aria-expanded=true on expanded parent nodes', () => {
    render(<TreeView items={nestedItems} />);
    const treeitems = screen.getAllByRole('treeitem');
    const root = treeitems[0]; // "Root" node with children
    expect(root).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-expanded=false on collapsed parent nodes', () => {
    render(<TreeView items={collapsedItems} />);
    const root = screen.getByRole('treeitem');
    expect(root).toHaveAttribute('aria-expanded', 'false');
  });

  it('fires onToggle when a parent node is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<TreeView items={nestedItems} onToggle={onToggle} />);
    await user.click(screen.getByText('Root'));
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('does not fire onToggle for leaf nodes', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<TreeView items={nestedItems} onToggle={onToggle} />);
    await user.click(screen.getByText('Sibling'));
    expect(onToggle).not.toHaveBeenCalled();
  });
});

/* ─── Keyboard ──────────────────────────────────────────────────────────────── */

describe('TreeView — keyboard', () => {
  it('fires onSelect on Enter key', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TreeView items={flatItems} onSelect={onSelect} />);
    const nodeContent = screen.getByText('Item A').closest('.arch-tree-view__node-content')!;
    nodeContent.focus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});

/* ─── Accessibility ─────────────────────────────────────────────────────────── */

describe('TreeView — a11y', () => {
  it('has role="tree" on the root element', () => {
    render(<TreeView items={flatItems} />);
    expect(screen.getByRole('tree')).toBeInTheDocument();
  });

  it('uses role="treeitem" for each node', () => {
    render(<TreeView items={flatItems} />);
    expect(screen.getAllByRole('treeitem')).toHaveLength(3);
  });

  it('uses role="group" for nested lists', () => {
    render(<TreeView items={nestedItems} />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────────── */

describe('TreeView — forwardRef', () => {
  it('forwards ref to the root <ul> element', () => {
    const ref = React.createRef<HTMLUListElement>();
    render(<TreeView ref={ref} items={flatItems} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('UL');
  });
});
