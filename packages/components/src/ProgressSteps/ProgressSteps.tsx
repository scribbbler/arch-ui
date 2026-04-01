import React, { forwardRef } from 'react';
import './ProgressSteps.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export interface ProgressStep {
  /** Visible label for the step. Keep short for horizontal orientation. */
  label: string;
  /** Optional supporting description shown beneath the label. */
  description?: string;
}

export type ProgressStepsOrientation = 'horizontal' | 'vertical';

export interface ProgressStepsProps extends React.HTMLAttributes<HTMLOListElement> {
  /** Ordered array of step descriptors. */
  steps: ProgressStep[];
  /** Zero-based index of the active step. */
  currentStep: number;
  /** Layout direction. Defaults to 'horizontal'. */
  orientation?: ProgressStepsOrientation;
  /** Additional CSS class names applied to the root <ol> element. */
  className?: string;
}

/* ─── Helpers ─────────────────────────────────────────────────────────────────── */

function getStepState(
  index: number,
  currentStep: number
): 'completed' | 'current' | 'upcoming' {
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'current';
  return 'upcoming';
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * ProgressSteps
 *
 * A step indicator for multi-step flows. Renders an ordered list of steps
 * with completed/current/upcoming visual states and connecting lines.
 *
 * @example
 * <ProgressSteps
 *   steps={[{ label: 'Account' }, { label: 'Payment' }, { label: 'Review' }]}
 *   currentStep={1}
 * />
 */
const ProgressSteps = forwardRef<HTMLOListElement, ProgressStepsProps>(
  function ProgressSteps(
    {
      steps,
      currentStep,
      orientation = 'horizontal',
      className,
      ...rest
    },
    ref
  ) {
    const classes = [
      'arch-progress-steps',
      `arch-progress-steps--${orientation}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <ol {...rest} ref={ref} className={classes}>
        {steps.map((step, index) => {
          const state = getStepState(index, currentStep);
          const stepClasses = [
            'arch-progress-steps__step',
            `arch-progress-steps__step--${state}`,
          ].join(' ');

          return (
            <li
              key={index}
              className={stepClasses}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              <div className="arch-progress-steps__body">
                <span className="arch-progress-steps__circle" aria-hidden="true">
                  {state === 'completed' ? '✓' : index + 1}
                </span>
                <span className="arch-progress-steps__text">
                  <span className="arch-progress-steps__label">{step.label}</span>
                  {step.description !== undefined && (
                    <span className="arch-progress-steps__description">
                      {step.description}
                    </span>
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
);

export { ProgressSteps };
export default ProgressSteps;
