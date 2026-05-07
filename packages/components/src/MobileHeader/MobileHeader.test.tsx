import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileHeader } from './MobileHeader';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('MobileHeader — rendering', () => {
  it('renders without crashing', () => {
    render(<MobileHeader />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders a <header> element', () => {
    render(<MobileHeader />);
    expect(screen.getByRole('banner').tagName).toBe('HEADER');
  });

  it('renders the title', () => {
    render(<MobileHeader title="Settings" />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Settings').tagName).toBe('H1');
  });

  it('does not render title when not provided', () => {
    const { container } = render(<MobileHeader />);
    expect(container.querySelector('.arch-mobile-header__title')).not.toBeInTheDocument();
  });

  it('applies the base class', () => {
    render(<MobileHeader />);
    expect(screen.getByRole('banner')).toHaveClass('arch-mobile-header');
  });

  it('applies a custom className', () => {
    render(<MobileHeader className="my-header" />);
    expect(screen.getByRole('banner')).toHaveClass('arch-mobile-header', 'my-header');
  });
});

/* ─── Back button ────────────────────────────────────────────────────────────── */

describe('MobileHeader — back button', () => {
  it('renders back button when onBack is provided', () => {
    render(<MobileHeader onBack={() => {}} />);
    expect(screen.getByLabelText('Back')).toBeInTheDocument();
  });

  it('does not render back button when onBack is not provided', () => {
    render(<MobileHeader />);
    expect(screen.queryByLabelText('Back')).not.toBeInTheDocument();
  });

  it('uses custom backLabel for aria-label', () => {
    render(<MobileHeader onBack={() => {}} backLabel="Go back" />);
    expect(screen.getByLabelText('Go back')).toBeInTheDocument();
  });

  it('fires onBack when the back button is clicked', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    render(<MobileHeader onBack={onBack} />);

    await user.click(screen.getByLabelText('Back'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});

/* ─── Action button ──────────────────────────────────────────────────────────── */

describe('MobileHeader — action button', () => {
  it('renders action button when actionIcon and onAction are provided', () => {
    render(
      <MobileHeader
        actionIcon={<span data-testid="action-icon">X</span>}
        onAction={() => {}}
      />
    );
    expect(screen.getByTestId('action-icon')).toBeInTheDocument();
  });

  it('does not render action button when only actionIcon is provided', () => {
    const { container } = render(
      <MobileHeader actionIcon={<span>X</span>} />
    );
    expect(container.querySelector('.arch-mobile-header__action')).not.toBeInTheDocument();
  });

  it('fires onAction when the action button is clicked', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(
      <MobileHeader
        actionIcon={<span>X</span>}
        onAction={onAction}
      />
    );

    await user.click(screen.getByText('X').closest('button')!);
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('MobileHeader — forwardRef', () => {
  it('forwards a ref to the header element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<MobileHeader ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('HEADER');
  });
});
