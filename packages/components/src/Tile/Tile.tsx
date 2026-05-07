import React, { forwardRef, useCallback } from 'react';
import './Tile.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface TileProps {
  /** Whether the tile is in the selected state. */
  selected?: boolean;
  /** Callback fired when the tile is toggled. Receives the new selected state. */
  onChange?: (selected: boolean) => void;
  /** Disables the tile, preventing interaction. */
  disabled?: boolean;
  /** Tile content. */
  children?: React.ReactNode;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Tile ───────────────────────────────────────────────────────────────────── */

/**
 * Tile
 *
 * A selectable tile/card for option selection. Keyboard accessible with
 * Enter and Space activation.
 *
 * @example
 * <Tile selected={isSelected} onChange={setIsSelected}>
 *   Option A
 * </Tile>
 *
 * @example
 * <Tile selected={false} onChange={handleChange} disabled>
 *   Unavailable option
 * </Tile>
 */
const Tile = forwardRef<HTMLDivElement, TileProps>(
  function Tile({ selected = false, onChange, disabled = false, children, className }, ref) {
    const classes = [
      'arch-tile',
      selected && 'arch-tile--selected',
      disabled && 'arch-tile--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = useCallback(() => {
      if (!disabled && onChange) {
        onChange(!selected);
      }
    }, [disabled, onChange, selected]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onChange?.(!selected);
        }
      },
      [disabled, onChange, selected],
    );

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-pressed={selected}
        aria-disabled={disabled || undefined}
        className={classes}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    );
  },
);

Tile.displayName = 'Tile';

export { Tile };
export default Tile;
