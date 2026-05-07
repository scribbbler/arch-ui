import React, { forwardRef, useCallback } from 'react';
import './TreeView.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface TreeNode {
  /** Unique identifier for the node. */
  id: string;
  /** Display label for the node. */
  label: React.ReactNode;
  /** Optional child nodes. */
  children?: TreeNode[];
  /** Whether the node is currently expanded. */
  isExpanded?: boolean;
}

export interface TreeViewProps {
  /** REQUIRED. Array of tree node objects. */
  items: TreeNode[];
  /** Callback fired when a node's expand/collapse state is toggled. */
  onToggle?: (id: string) => void;
  /** Callback fired when a node is selected. */
  onSelect?: (id: string) => void;
  /** The id of the currently selected node. */
  selectedId?: string;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Internal TreeNodeItem ──────────────────────────────────────────────────── */

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  selectedId?: string;
  onToggle?: (id: string) => void;
  onSelect?: (id: string) => void;
}

function TreeNodeItem({ node, level, selectedId, onToggle, onSelect }: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  const handleToggle = useCallback(() => {
    if (hasChildren && onToggle) {
      onToggle(node.id);
    }
  }, [hasChildren, onToggle, node.id]);

  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect(node.id);
    }
  }, [onSelect, node.id]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleSelect();
        if (hasChildren) {
          handleToggle();
        }
      }
    },
    [handleSelect, handleToggle, hasChildren]
  );

  const classes = [
    'arch-tree-view__node',
    isSelected && 'arch-tree-view__node--selected',
  ]
    .filter(Boolean)
    .join(' ');

  const style = { '--arch-tree-view-level': level } as React.CSSProperties;

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? node.isExpanded : undefined}
      aria-selected={isSelected}
      className={classes}
    >
      <div
        className="arch-tree-view__node-content"
        style={style}
        tabIndex={0}
        onClick={() => {
          handleSelect();
          if (hasChildren) handleToggle();
        }}
        onKeyDown={handleKeyDown}
      >
        {hasChildren && (
          <span className="arch-tree-view__toggle" aria-hidden="true">
            {node.isExpanded ? '\u25BE' : '\u25B8'}
          </span>
        )}
        {!hasChildren && <span className="arch-tree-view__toggle-spacer" />}
        <span className="arch-tree-view__label">{node.label}</span>
      </div>
      {hasChildren && node.isExpanded && (
        <ul role="group" className="arch-tree-view__group">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/* ─── TreeView ───────────────────────────────────────────────────────────────── */

/**
 * TreeView
 *
 * A hierarchical tree structure with expand/collapse.
 *
 * @example
 * <TreeView
 *   items={[
 *     { id: '1', label: 'Root', isExpanded: true, children: [
 *       { id: '1-1', label: 'Child A' },
 *       { id: '1-2', label: 'Child B' },
 *     ]},
 *   ]}
 *   onToggle={(id) => toggle(id)}
 *   onSelect={(id) => select(id)}
 *   selectedId="1-1"
 * />
 */
const TreeView = forwardRef<HTMLUListElement, TreeViewProps>(function TreeView(
  { items, onToggle, onSelect, selectedId, className },
  ref
) {
  const classes = ['arch-tree-view', className].filter(Boolean).join(' ');

  return (
    <ul ref={ref} role="tree" className={classes}>
      {items.map((item) => (
        <TreeNodeItem
          key={item.id}
          node={item}
          level={0}
          selectedId={selectedId}
          onToggle={onToggle}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
});

export { TreeView };
export default TreeView;
