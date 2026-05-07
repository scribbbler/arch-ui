import React, { forwardRef } from 'react';
import { Tag, type TagVariant } from '../Tag';
import { Button } from '../Button';
import './TagGroup.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface TagItem {
  /** Unique identifier for the tag. */
  id: string;
  /** Display label for the tag. */
  label: string;
  /** Optional variant for the tag. */
  variant?: TagVariant;
}

export interface TagGroupProps {
  /** Array of tag items to render. */
  tags: TagItem[];
  /** Callback fired when a tag's remove button is clicked. Receives the tag id. */
  onRemove?: (id: string) => void;
  /** Callback fired when the add button is clicked. Renders an add button when provided. */
  onAdd?: () => void;
  /** Label text for the add button. Defaults to 'Add'. */
  addLabel?: string;
  /** When true, all tags and buttons are disabled. Defaults to false. */
  disabled?: boolean;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Add icon ───────────────────────────────────────────────────────────────── */

function AddIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 2v8M2 6h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * TagGroup
 *
 * A container for managing a set of Tags with add and remove capabilities.
 * Renders tags in a wrapping flex layout with an optional add button.
 *
 * @example
 * <TagGroup
 *   tags={[{ id: '1', label: 'React' }, { id: '2', label: 'TypeScript', variant: 'info' }]}
 *   onRemove={(id) => handleRemove(id)}
 *   onAdd={() => setShowPicker(true)}
 *   addLabel="Add tag"
 * />
 */
const TagGroup = forwardRef<HTMLDivElement, TagGroupProps>(function TagGroup(
  {
    tags,
    onRemove,
    onAdd,
    addLabel = 'Add',
    disabled = false,
    className,
  },
  ref
) {
  const classes = [
    'arch-tag-group',
    disabled && 'arch-tag-group--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Tag group"
      aria-disabled={disabled || undefined}
      className={classes}
    >
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          variant={tag.variant}
          onRemove={
            onRemove && !disabled ? () => onRemove(tag.id) : undefined
          }
        >
          {tag.label}
        </Tag>
      ))}
      {onAdd && (
        <Button
          kind="tertiary"
          size="compact"
          className="arch-tag-group__add"
          onClick={onAdd}
          disabled={disabled}
          startEnhancer={<AddIcon />}
        >
          {addLabel}
        </Button>
      )}
    </div>
  );
});

export { TagGroup };
export default TagGroup;
