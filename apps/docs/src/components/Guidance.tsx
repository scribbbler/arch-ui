import React from 'react';

/**
 * Shared Do / Don't / Caution guidance blocks for Arch UI docs.
 *
 * Use `<Guidance.Grid>` to lay out guidance cards side by side, and
 * `<Guidance.Do>`, `<Guidance.Dont>`, `<Guidance.Caution>` for the
 * individual tinted preview cards. All three share the same shape
 * (preview surface + badge + optional description) so any combination
 * lines up cleanly in the grid.
 *
 * Import from this single file so every page renders guidance identically.
 */

type WithChildren = { children: React.ReactNode };
type BlockProps = WithChildren & { description?: React.ReactNode };

function Grid({ children }: WithChildren): React.ReactElement {
  return <div className="guidance-grid">{children}</div>;
}

function Do({ children, description }: BlockProps): React.ReactElement {
  return (
    <div className="guidance">
      <div className="guidance__preview guidance__preview--do">
        <div className="guidance__card">{children}</div>
      </div>
      <div className="guidance__badge guidance__badge--do">✓ Do</div>
      {description && <p className="guidance__desc">{description}</p>}
    </div>
  );
}

function Dont({ children, description }: BlockProps): React.ReactElement {
  return (
    <div className="guidance">
      <div className="guidance__preview guidance__preview--dont">
        <div className="guidance__card">{children}</div>
      </div>
      <div className="guidance__badge guidance__badge--dont">✕ Don't</div>
      {description && <p className="guidance__desc">{description}</p>}
    </div>
  );
}

function Caution({ children, description }: BlockProps): React.ReactElement {
  return (
    <div className="guidance">
      <div className="guidance__preview guidance__preview--caution">
        <div className="guidance__card">{children}</div>
      </div>
      <div className="guidance__badge guidance__badge--caution">! Caution</div>
      {description && <p className="guidance__desc">{description}</p>}
    </div>
  );
}

const Guidance = { Grid, Do, Dont, Caution };
export default Guidance;
export { Grid, Do, Dont, Caution };
