import React, { useState } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Drawer } from './Drawer';

/* ─── Setup ──────────────────────────────────────────────────────────────────── */

afterEach(() => {
  document.body.style.overflow = '';
});

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function DrawerFixture({
  initialOpen = false,
  position = 'end' as const,
  size,
}: {
  initialOpen?: boolean;
  position?: 'start' | 'end' | 'top' | 'bottom';
  size?: string;
}) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <div>
      <button data-testid="open-btn" onClick={() => setIsOpen(true)}>Open</button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
        size={size}
        aria-label="Navigation panel"
      >
        <button data-testid="inside-btn">Inside button</button>
        <button data-testid="close-btn" onClick={() => setIsOpen(false)}>Close drawer</button>
      </Drawer>
    </div>
  );
}

/* ─── Drawer — rendering ─────────────────────────────────────────────────────── */

describe('Drawer — rendering', () => {
  it('renders nothing when closed', () => {
    render(<DrawerFixture />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when open', () => {
    render(<DrawerFixture initialOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has role=dialog', () => {
    render(<DrawerFixture initialOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal=true', () => {
    render(<DrawerFixture initialOpen />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('has the correct aria-label', () => {
    render(<DrawerFixture initialOpen />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Navigation panel');
  });

  it('forwards ref to the dialog div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Drawer isOpen onClose={vi.fn()} ref={ref} aria-label="Test drawer">
        <button>btn</button>
      </Drawer>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Drawer — position classes ──────────────────────────────────────────────── */

describe('Drawer — position classes', () => {
  const positions = ['start', 'end', 'top', 'bottom'] as const;

  positions.forEach((pos) => {
    it(`applies arch-drawer--${pos} class for position="${pos}"`, () => {
      render(<DrawerFixture initialOpen position={pos} />);
      expect(screen.getByRole('dialog')).toHaveClass(`arch-drawer--${pos}`);
    });
  });

  it('defaults to position=end', () => {
    render(
      <Drawer isOpen onClose={vi.fn()} aria-label="Default">
        <button>btn</button>
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toHaveClass('arch-drawer--end');
  });
});

/* ─── Drawer — open/close ────────────────────────────────────────────────────── */

describe('Drawer — open/close', () => {
  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<DrawerFixture />);

    await user.click(screen.getByTestId('open-btn'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    render(<DrawerFixture initialOpen />);

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes when close button inside is clicked', async () => {
    const user = userEvent.setup();
    render(<DrawerFixture initialOpen />);

    await user.click(screen.getByTestId('close-btn'));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes on overlay click', async () => {
    const user = userEvent.setup();
    render(<DrawerFixture initialOpen />);

    const overlay = document.querySelector('.arch-overlay');
    expect(overlay).toBeTruthy();
    await user.click(overlay as HTMLElement);

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});

/* ─── Drawer — scroll lock ───────────────────────────────────────────────────── */

describe('Drawer — scroll lock', () => {
  it('adds overflow:hidden to body when open', () => {
    render(<DrawerFixture initialOpen />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('removes overflow:hidden when closed', async () => {
    const user = userEvent.setup();
    render(<DrawerFixture initialOpen />);

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(document.body.style.overflow).not.toBe('hidden');
    });
  });
});

/* ─── Drawer — focus management ──────────────────────────────────────────────── */

describe('Drawer — focus management', () => {
  it('moves focus inside the drawer on open', async () => {
    render(<DrawerFixture initialOpen />);

    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByTestId('inside-btn'));
    });
  });

  it.skip('returns focus to trigger after close', async () => {
    /* requires real browser focus management — jsdom does not reliably restore
       focus to the trigger element after a Portal-rendered drawer closes */
    const user = userEvent.setup();
    render(<DrawerFixture />);

    const openBtn = screen.getByTestId('open-btn');
    openBtn.focus();
    await user.click(openBtn);

    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

    await user.keyboard('{Escape}');
    await waitFor(() => expect(document.activeElement).toBe(openBtn));
  });
});

/* ─── Drawer — accessibility ─────────────────────────────────────────────────── */

describe('Drawer — accessibility', () => {
  it('passes axe for position=end', async () => {
    const { container } = render(<DrawerFixture initialOpen position="end" />);
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for position=start', async () => {
    const { container } = render(<DrawerFixture initialOpen position="start" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for position=top', async () => {
    const { container } = render(<DrawerFixture initialOpen position="top" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for position=bottom', async () => {
    const { container } = render(<DrawerFixture initialOpen position="bottom" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
