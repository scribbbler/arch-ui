import React from 'react';
import './StatusBadge.css';

/**
 * Docs-only status badge rendered next to page titles and (optionally)
 * inside component/foundation listings. The status vocabulary is fixed —
 * anything outside the union falls back to the `draft` visual so unknown
 * values are visible but never mis-styled.
 */

export type StatusBadgeStatus = 'Draft' | 'Beta' | 'Stable' | 'Deprecated';

type StatusBadgeProps = {
  status: StatusBadgeStatus | string;
  className?: string;
};

const KNOWN: Record<StatusBadgeStatus, string> = {
  Draft: 'draft',
  Beta: 'beta',
  Stable: 'stable',
  Deprecated: 'deprecated',
};

export default function StatusBadge({ status, className }: StatusBadgeProps): React.ReactElement {
  const variant = KNOWN[status as StatusBadgeStatus] ?? 'draft';
  const classes = ['arch-status-badge', `arch-status-badge--${variant}`];
  if (className) classes.push(className);
  return <span className={classes.join(' ')}>{status}</span>;
}
