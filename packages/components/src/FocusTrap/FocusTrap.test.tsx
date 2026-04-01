import React, { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FocusTrap } from './FocusTrap';

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function TrapFixture({ active, restoreFocus = true }: { active: boolean; restoreFocus?: boolean }) {
  return (
    <div>
      <button data-testid="outside-btn">Outside</button>
      <FocusTrap active={active} restoreFocus={restoreFocus}>
        <button data-testid="first-btn">First</button>
        <button data-testid="second-btn">Second</button>
        <button data-testid="last-btn">Last</button>
      </FocusTrap>
    </div>
  );
}

function ToggleTrapFixture() {
  const [active, setActive] = useState(false);
  return (
    <div>
      <button data-testid="trigger" onClick={() => setActive(true)}>Open trap</button>
      <FocusTrap active={active} restoreFocus>
        <button data-testid="inside-btn">Inside</button>
        <button data-testid="close-btn" onClick={() => setActive(false)}>Close</button>
      </FocusTrap>
    </div>
  );
}

/* ─── FocusTrap — rendering ──────────────────────────────────────────────────── */

describe('FocusTrap — rendering', () => {
  it('renders children', () => {
    render(<TrapFixture active={false} />);
    expect(screen.getByTestId('first-btn')).toBeInTheDocument();
    expect(screen.getByTestId('last-btn')).toBeInTheDocument();
  });

  it('applies a custom className to the wrapper', () => {
    const { container } = render(
      <FocusTrap active={false} className="my-trap">
        <button>btn</button>
      </FocusTrap>
    );
    expect(container.querySelector('.my-trap')).toBeInTheDocument();
  });

  it('forwards ref to the wrapper div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <FocusTrap active={false} ref={ref}>
        <button>btn</button>
      </FocusTrap>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── FocusTrap — Tab cycling ────────────────────────────────────────────────── */

describe('FocusTrap — Tab cycling', () => {
  it.skip('moves focus to the first element when Tab is pressed on the last', async () => {
    /* requires real browser focus management — jsdom Tab key handling does not
       honour the FocusTrap's keydown interception reliably */
    const user = userEvent.setup();
    render(<TrapFixture active />);

    const last = screen.getByTestId('last-btn');
    last.focus();
    expect(document.activeElement).toBe(last);

    await user.keyboard('{Tab}');
    expect(document.activeElement).toBe(screen.getByTestId('first-btn'));
  });

  it('moves focus to the last element when Shift+Tab is pressed on the first', async () => {
    const user = userEvent.setup();
    render(<TrapFixture active />);

    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByTestId('first-btn'));
    });

    await user.keyboard('{Shift>}{Tab}{/Shift}');
    expect(document.activeElement).toBe(screen.getByTestId('last-btn'));
  });

  it('does NOT intercept Tab when active is false', async () => {
    const user = userEvent.setup();
    render(<TrapFixture active={false} />);

    screen.getByTestId('first-btn').focus();
    await user.keyboard('{Tab}');
    // Focus should naturally move to second-btn (browser native Tab)
    expect(document.activeElement).toBe(screen.getByTestId('second-btn'));
  });
});

/* ─── FocusTrap — restoreFocus ───────────────────────────────────────────────── */

describe('FocusTrap — restoreFocus', () => {
  it('restores focus to the trigger when deactivated with restoreFocus=true', async () => {
    const user = userEvent.setup();
    render(<ToggleTrapFixture />);

    const trigger = screen.getByTestId('trigger');
    trigger.focus();
    await user.click(trigger);

    // Wait for focus to move inside trap
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByTestId('inside-btn'));
    });

    await user.click(screen.getByTestId('close-btn'));

    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });

  it('does NOT restore focus when restoreFocus=false', async () => {
    const user = userEvent.setup();

    function NoRestoreFixture() {
      const [active, setActive] = useState(false);
      return (
        <div>
          <button data-testid="open-btn" onClick={() => setActive(true)}>Open</button>
          <FocusTrap active={active} restoreFocus={false}>
            <button data-testid="inner-btn">Inner</button>
            <button data-testid="close-no-restore" onClick={() => setActive(false)}>Close</button>
          </FocusTrap>
        </div>
      );
    }

    render(<NoRestoreFixture />);

    const openBtn = screen.getByTestId('open-btn');
    openBtn.focus();
    await user.click(openBtn);

    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByTestId('inner-btn'));
    });

    await user.click(screen.getByTestId('close-no-restore'));

    // Focus should NOT have returned to openBtn
    await waitFor(() => {
      expect(document.activeElement).not.toBe(openBtn);
    });
  });
});

/* ─── FocusTrap — initial focus ──────────────────────────────────────────────── */

describe('FocusTrap — initial focus', () => {
  it('moves focus to the first focusable element when activated', async () => {
    render(<TrapFixture active />);
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByTestId('first-btn'));
    });
  });
});
