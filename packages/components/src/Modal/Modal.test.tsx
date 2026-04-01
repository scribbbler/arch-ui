import React, { useState } from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

afterEach(() => {
  document.body.style.overflow = '';
});

function ModalFixture({
  initialOpen = false,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = 'md' as const,
}: {
  initialOpen?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <div>
      <button data-testid="open-btn" onClick={() => setIsOpen(true)}>Open</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEscape={closeOnEscape}
        size={size}
      >
        <ModalHeader onClose={() => setIsOpen(false)}>Dialog title</ModalHeader>
        <ModalBody>
          <p>Modal body content</p>
          <button data-testid="body-btn">Body button</button>
        </ModalBody>
        <ModalFooter>
          <button data-testid="close-footer-btn" onClick={() => setIsOpen(false)}>Close</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

/* ─── Modal — rendering ──────────────────────────────────────────────────────── */

describe('Modal — rendering', () => {
  it('renders nothing when closed', () => {
    render(<ModalFixture />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when open', () => {
    render(<ModalFixture initialOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has role=dialog', () => {
    render(<ModalFixture initialOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal=true', () => {
    render(<ModalFixture initialOpen />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-labelledby pointing to the ModalHeader title', () => {
    render(<ModalFixture initialOpen />);
    const dialog = screen.getByRole('dialog');
    const labelledById = dialog.getAttribute('aria-labelledby');
    expect(labelledById).toBeTruthy();
    const titleEl = document.getElementById(labelledById as string);
    expect(titleEl).toBeTruthy();
    expect(titleEl?.textContent).toBe('Dialog title');
  });

  it('applies size class', () => {
    render(<ModalFixture initialOpen size="lg" />);
    expect(screen.getByRole('dialog')).toHaveClass('arch-modal--lg');
  });

  it('renders ModalHeader, ModalBody, and ModalFooter', () => {
    render(<ModalFixture initialOpen />);
    expect(screen.getByText('Dialog title')).toBeInTheDocument();
    expect(screen.getByText('Modal body content')).toBeInTheDocument();
    expect(screen.getByTestId('close-footer-btn')).toBeInTheDocument();
  });
});

/* ─── Modal — open/close ─────────────────────────────────────────────────────── */

describe('Modal — open/close', () => {
  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<ModalFixture />);

    await user.click(screen.getByTestId('open-btn'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes when close button in header is clicked', async () => {
    const user = userEvent.setup();
    render(<ModalFixture initialOpen />);

    // Use the header close button specifically (aria-label="Close" × glyph)
    const closeBtn = document.querySelector('.arch-modal__close') as HTMLElement;
    expect(closeBtn).toBeTruthy();
    await user.click(closeBtn);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes on Escape key when closeOnEscape=true', async () => {
    const user = userEvent.setup();
    render(<ModalFixture initialOpen closeOnEscape />);

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('does NOT close on Escape when closeOnEscape=false', async () => {
    const user = userEvent.setup();
    render(<ModalFixture initialOpen closeOnEscape={false} />);

    await user.keyboard('{Escape}');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on overlay click when closeOnOverlayClick=true', async () => {
    const user = userEvent.setup();
    render(<ModalFixture initialOpen closeOnOverlayClick />);

    const overlay = document.querySelector('.arch-overlay');
    expect(overlay).toBeTruthy();
    await user.click(overlay as HTMLElement);

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('does NOT close on overlay click when closeOnOverlayClick=false', async () => {
    const user = userEvent.setup();
    render(<ModalFixture initialOpen closeOnOverlayClick={false} />);

    const overlay = document.querySelector('.arch-overlay');
    if (overlay) {
      await user.click(overlay as HTMLElement);
    }

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

/* ─── Modal — scroll lock ────────────────────────────────────────────────────── */

describe('Modal — scroll lock', () => {
  it('adds overflow:hidden to body when open', () => {
    render(<ModalFixture initialOpen />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('removes overflow:hidden from body when closed', async () => {
    const user = userEvent.setup();
    render(<ModalFixture initialOpen />);

    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(document.body.style.overflow).not.toBe('hidden');
    });
  });
});

/* ─── Modal — focus management ───────────────────────────────────────────────── */

describe('Modal — focus management', () => {
  it.skip('moves focus inside the modal on open', async () => {
    /* requires real browser focus management — jsdom does not reliably move
       focus into a Portal-rendered FocusTrap on activation */
    render(<ModalFixture initialOpen />);

    await waitFor(() => {
      const closeBtn = document.querySelector('.arch-modal__close') as HTMLElement;
      expect(document.activeElement).toBe(closeBtn);
    });
  });

  it.skip('returns focus to trigger after close', async () => {
    /* requires real browser focus management — jsdom does not reliably restore
       focus to the trigger element after a Portal-rendered modal closes */
    const user = userEvent.setup();

    render(<ModalFixture />);

    const openBtn = screen.getByTestId('open-btn');
    openBtn.focus();
    await user.click(openBtn);

    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

    await user.keyboard('{Escape}');
    await waitFor(() => expect(document.activeElement).toBe(openBtn));
  });
});

/* ─── Modal — accessibility ──────────────────────────────────────────────────── */

describe('Modal — accessibility', () => {
  it('passes axe when open', async () => {
    const { container } = render(<ModalFixture initialOpen />);
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for size=sm', async () => {
    const { container } = render(<ModalFixture initialOpen size="sm" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for size=full', async () => {
    const { container } = render(<ModalFixture initialOpen size="full" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
