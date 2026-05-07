import React, { forwardRef } from 'react';
import './MapMarker.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type MapMarkerSize = 'sm' | 'md' | 'lg';
export type MapMarkerVariant = 'default' | 'active' | 'muted';

export interface MapMarkerProps {
  /** Text label displayed on or near the marker. */
  label?: string;
  /** Controls the marker size. Defaults to 'md'. */
  size?: MapMarkerSize;
  /** Visual variant of the marker. Defaults to 'default'. */
  variant?: MapMarkerVariant;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── MapMarker ──────────────────────────────────────────────────────────────── */

/**
 * MapMarker
 *
 * A map pin/marker component for location indicators.
 *
 * @example
 * <MapMarker label="HQ" size="lg" variant="active" />
 *
 * @example
 * <MapMarker label="Branch" variant="muted" />
 */
const MapMarker = forwardRef<HTMLDivElement, MapMarkerProps>(function MapMarker(
  { label, size = 'md', variant = 'default', className },
  ref
) {
  const classes = [
    'arch-map-marker',
    `arch-map-marker--${size}`,
    `arch-map-marker--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} role="img" aria-label={label || 'Map marker'}>
      <div className="arch-map-marker__pin">
        <div className="arch-map-marker__head">
          {label && <span className="arch-map-marker__label">{label}</span>}
        </div>
        <div className="arch-map-marker__tail" aria-hidden="true" />
      </div>
    </div>
  );
});

export { MapMarker };
export default MapMarker;
