import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { ProgressSteps } from './ProgressSteps';
import type { ProgressStep } from './ProgressSteps';

const STEPS: ProgressStep[] = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Payment', description: 'Enter payment details' },
  { label: 'Review' },
];

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('ProgressSteps — rendering', () => {
  it('renders without crashing', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders an <ol> element', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} />);
    expect(screen.getByRole('list').tagName).toBe('OL');
  });

  it('renders the correct number of list items', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders step labels', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
  });

  it('renders step description when provided', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} />);
    expect(screen.getByText('Create your account')).toBeInTheDocument();
  });

  it('does not render description when omitted', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} />);
    const reviewItem = screen.getAllByRole('listitem')[2];
    expect(within(reviewItem).queryByText(/description/i)).not.toBeInTheDocument();
  });

  it('applies the arch-progress-steps base class', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} />);
    expect(screen.getByRole('list')).toHaveClass('arch-progress-steps');
  });

  it('applies a custom className', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} className="my-steps" />);
    expect(screen.getByRole('list')).toHaveClass('my-steps');
  });

  it('forwards ref to the <ol> element', () => {
    const ref = React.createRef<HTMLOListElement>();
    render(<ProgressSteps ref={ref} steps={STEPS} currentStep={0} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('OL');
  });
});

/* ─── Step states ────────────────────────────────────────────────────────────── */

describe('ProgressSteps — step states', () => {
  it('marks step before currentStep as completed', () => {
    render(<ProgressSteps steps={STEPS} currentStep={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('arch-progress-steps__step--completed');
  });

  it('marks step at currentStep as current', () => {
    render(<ProgressSteps steps={STEPS} currentStep={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveClass('arch-progress-steps__step--current');
  });

  it('marks step after currentStep as upcoming', () => {
    render(<ProgressSteps steps={STEPS} currentStep={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items[2]).toHaveClass('arch-progress-steps__step--upcoming');
  });

  it('all steps are upcoming when currentStep=0 except the first', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('arch-progress-steps__step--current');
    expect(items[1]).toHaveClass('arch-progress-steps__step--upcoming');
    expect(items[2]).toHaveClass('arch-progress-steps__step--upcoming');
  });

  it('all steps are completed except the last when currentStep equals last index', () => {
    render(<ProgressSteps steps={STEPS} currentStep={2} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('arch-progress-steps__step--completed');
    expect(items[1]).toHaveClass('arch-progress-steps__step--completed');
    expect(items[2]).toHaveClass('arch-progress-steps__step--current');
  });

  it('shows checkmark in completed step circle', () => {
    render(<ProgressSteps steps={STEPS} currentStep={2} />);
    const items = screen.getAllByRole('listitem');
    const completedCircle = items[0].querySelector('.arch-progress-steps__circle');
    expect(completedCircle?.textContent).toBe('✓');
  });

  it('shows step number in current and upcoming circles', () => {
    render(<ProgressSteps steps={STEPS} currentStep={1} />);
    const items = screen.getAllByRole('listitem');
    const currentCircle = items[1].querySelector('.arch-progress-steps__circle');
    const upcomingCircle = items[2].querySelector('.arch-progress-steps__circle');
    expect(currentCircle?.textContent).toBe('2');
    expect(upcomingCircle?.textContent).toBe('3');
  });
});

/* ─── Orientation ────────────────────────────────────────────────────────────── */

describe('ProgressSteps — orientation', () => {
  it('applies arch-progress-steps--horizontal class by default', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} />);
    expect(screen.getByRole('list')).toHaveClass('arch-progress-steps--horizontal');
  });

  it('applies arch-progress-steps--horizontal when orientation="horizontal"', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} orientation="horizontal" />);
    expect(screen.getByRole('list')).toHaveClass('arch-progress-steps--horizontal');
  });

  it('applies arch-progress-steps--vertical when orientation="vertical"', () => {
    render(<ProgressSteps steps={STEPS} currentStep={0} orientation="vertical" />);
    expect(screen.getByRole('list')).toHaveClass('arch-progress-steps--vertical');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('ProgressSteps — accessibility', () => {
  it('sets aria-current="step" on the current step', () => {
    render(<ProgressSteps steps={STEPS} currentStep={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
  });

  it('does NOT set aria-current on completed steps', () => {
    render(<ProgressSteps steps={STEPS} currentStep={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).not.toHaveAttribute('aria-current');
  });

  it('does NOT set aria-current on upcoming steps', () => {
    render(<ProgressSteps steps={STEPS} currentStep={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items[2]).not.toHaveAttribute('aria-current');
  });

  it('passes axe for horizontal orientation', async () => {
    const { container } = render(
      <ProgressSteps steps={STEPS} currentStep={1} orientation="horizontal" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for vertical orientation', async () => {
    const { container } = render(
      <ProgressSteps steps={STEPS} currentStep={1} orientation="vertical" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when all steps are completed', async () => {
    const { container } = render(
      <ProgressSteps steps={STEPS} currentStep={2} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
