import React, { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Popover } from './Popover';

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function PopoverFixture({
  initialOpen = false,
  content = <div><button>Action</button></div>,
}: {
  initialOpen?: boolean;
  content?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <div>
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={content}
      >
        <button data-testid="trigger" onClick={() => setIsOpen((o) => !o)}>
          Toggle
        </button>
      </Popover>
    </div>
  );
}

/* ─── Popover — rendering ────────────────────────────────────────────────────── */

describe('Popover — rendering', () => {
  it('renders the trigger', () => {
    render(<PopoverFixture />);
    expect(screen.getByTestId('trigger')).toBeInTheDocument();
  });

  it('does not render popover content when closed', () => {
    render(<PopoverFixture />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders popover content when open', () => {
    render(<PopoverFixture initialOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('sets aria-modal on the dialog', () => {
    render(<PopoverFixture initialOpen />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });
});

/* ─── Popover — open/close ───────────────────────────────────────────────────── */

describe('Popover — open/close', () => {
  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<PopoverFixture />);

    await user.click(screen.getByTestId('trigger'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('trigger has aria-expanded=true when open', () => {
    render(<PopoverFixture initialOpen />);
    expect(screen.getByTestId('trigger')).toHaveAttribute('aria-expanded', 'true');
  });

  it('trigger has aria-expanded=false when closed', () => {
    render(<PopoverFixture />);
    expect(screen.getByTestId('trigger')).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    render(<PopoverFixture initialOpen />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes on outside click (overlay click)', async () => {
    const user = userEvent.setup();
    render(<PopoverFixture initialOpen />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const overlay = document.querySelector('.arch-overlay');
    if (overlay) {
      await user.click(overlay as HTMLElement);
    }

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

/* ─── Popover — focus management ─────────────────────────────────────────────── */

describe('Popover — focus management', () => {
  it('moves focus inside popover on open', async () => {
    render(<PopoverFixture initialOpen content={<button data-testid="popover-btn">Inner</button>} />);

    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByTestId('popover-btn'));
    });
  });

  it.skip('returns focus to trigger on close', async () => {
    /* requires real browser focus management — jsdom does not reliably restore
       focus to the trigger element after a Portal-rendered popover closes */
    const user = userEvent.setup();

    function FocusRestoreFixture() {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <Popover
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          content={<button>Inner</button>}
        >
          <button data-testid="focus-trigger" onClick={() => setIsOpen(true)}>Open</button>
        </Popover>
      );
    }

    render(<FocusRestoreFixture />);
    const trigger = screen.getByTestId('focus-trigger');
    trigger.focus();
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });
});

/* ─── Popover — accessibility ─────────────────────────────────────────────────── */

describe('Popover — accessibility', () => {
  it('passes axe when closed', async () => {
    const { container } = render(<PopoverFixture />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when open', async () => {
    const { container } = render(
      <PopoverFixture initialOpen content={<button>Action</button>} />
    );
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
