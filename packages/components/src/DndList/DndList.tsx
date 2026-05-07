import React, { forwardRef, useState, useCallback } from 'react';
import './DndList.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export interface DndItem {
  /** Unique identifier for the item. */
  id: string;
  /** Content to render as the item label. */
  label: React.ReactNode;
}

export interface DndListProps {
  /** Array of items to render. */
  items?: DndItem[];
  /** Callback fired when items are reordered or removed. */
  onChange?: (items: DndItem[]) => void;
  /** When true, each item shows a remove button. Defaults to false. */
  removable?: boolean;
  /** Additional CSS class names applied to the root wrapper element. */
  className?: string;
}

/* ─── Icons ──────────────────────────────────────────────────────────────────── */

function GripIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor">
      <circle cx="9" cy="6" r="1.5" />
      <circle cx="15" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" />
      <circle cx="15" cy="18" r="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * DndList
 *
 * A drag and drop reorderable list. Renders draggable items with grab handles
 * and optional remove buttons. Uses the native HTML Drag and Drop API.
 *
 * @example
 * <DndList
 *   aria-label="Task priority"
 *   items={tasks}
 *   onChange={setTasks}
 *   removable
 * />
 */
const DndList = forwardRef<HTMLUListElement, DndListProps>(function DndList(
  {
    items = [],
    onChange,
    removable = false,
    className,
    ...rest
  },
  ref
) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const wrapperClasses = ['arch-dnd-list', className]
    .filter(Boolean)
    .join(' ');

  const handleDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      setDragIndex(index);
      e.dataTransfer.effectAllowed = 'move';
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setDragOverIndex(index);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      if (dragIndex === null || dragIndex === dropIndex) {
        setDragIndex(null);
        setDragOverIndex(null);
        return;
      }
      const newItems = [...items];
      const [moved] = newItems.splice(dragIndex, 1);
      newItems.splice(dropIndex, 0, moved);
      onChange?.(newItems);
      setDragIndex(null);
      setDragOverIndex(null);
    },
    [dragIndex, items, onChange]
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);

  const handleRemove = useCallback(
    (index: number) => {
      const newItems = items.filter((_, i) => i !== index);
      onChange?.(newItems);
    },
    [items, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowUp' && index > 0) {
        e.preventDefault();
        const newItems = [...items];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        onChange?.(newItems);
      } else if (e.key === 'ArrowDown' && index < items.length - 1) {
        e.preventDefault();
        const newItems = [...items];
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        onChange?.(newItems);
      } else if (e.key === 'Delete' && removable) {
        e.preventDefault();
        handleRemove(index);
      }
    },
    [items, onChange, removable, handleRemove]
  );

  return (
    <ul ref={ref} className={wrapperClasses} role="list" {...rest}>
      {items.map((item, index) => {
        const isDragging = dragIndex === index;
        const isDragOver = dragOverIndex === index && dragIndex !== index;
        const itemClasses = [
          'arch-dnd-list__item',
          isDragging ? 'arch-dnd-list__item--dragging' : '',
          isDragOver ? 'arch-dnd-list__item--drag-over' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <li
            key={item.id}
            className={itemClasses}
            role="listitem"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            aria-grabbed={isDragging || undefined}
          >
            <button
              type="button"
              className="arch-dnd-list__handle"
              aria-label={`Reorder ${typeof item.label === 'string' ? item.label : 'item'}`}
              aria-roledescription="sortable"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <GripIcon />
            </button>
            <span className="arch-dnd-list__label">{item.label}</span>
            {removable && (
              <button
                type="button"
                className="arch-dnd-list__remove"
                aria-label={`Remove ${typeof item.label === 'string' ? item.label : 'item'}`}
                onClick={() => handleRemove(index)}
              >
                <CloseIcon />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
});

export { DndList };
export default DndList;
