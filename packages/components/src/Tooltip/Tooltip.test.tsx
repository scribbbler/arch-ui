import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Tooltip } from './Tooltip';

/* ─── Setup ──────────────────────────────────────────────────────────────────── */

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

/* ─── Tooltip — rendering ────────────────────────────────────────────────────── */

describe('Tooltip — rendering', () => {
  it('renders the trigger child', () => {
    render(
      <Tooltip content="Save">
        <button>Save</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders the tooltip element with role=tooltip', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('renders tooltip with hidden class initially', () => {
    render(
      <Tooltip content="Hidden">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip')).toHaveClass('arch-tooltip--hidden');
  });

  it('sets aria-describedby on trigger pointing to tooltip id', () => {
    render(
      <Tooltip content="Description">
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    const tooltip = screen.getByRole('tooltip');
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
  });
});

/* ─── Tooltip — hover behaviour ──────────────────────────────────────────────── */

describe('Tooltip — hover behaviour', () => {
  it('shows the tooltip after the delay on mouseenter', () => {
    render(
      <Tooltip content="Hover tooltip" delay={300}>
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });
    const tooltip = screen.getByRole('tooltip');

    fireEvent.mouseEnter(trigger);
    expect(tooltip).toHaveClass('arch-tooltip--hidden');

    act(() => { vi.advanceTimersByTime(300); });
    expect(tooltip).toHaveClass('arch-tooltip--visible');
  });

  it('hides the tooltip immediately on mouseleave', () => {
    render(
      <Tooltip content="Hover tooltip" delay={300}>
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });
    const tooltip = screen.getByRole('tooltip');

    fireEvent.mouseEnter(trigger);
    act(() => { vi.advanceTimersByTime(300); });
    expect(tooltip).toHaveClass('arch-tooltip--visible');

    fireEvent.mouseLeave(trigger);
    expect(tooltip).toHaveClass('arch-tooltip--hidden');
  });

  it('does not show tooltip if mouseleave before delay', () => {
    render(
      <Tooltip content="Hover tooltip" delay={300}>
        <button>Quick hover</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Quick hover' });
    const tooltip = screen.getByRole('tooltip');

    fireEvent.mouseEnter(trigger);
    act(() => { vi.advanceTimersByTime(100); });
    fireEvent.mouseLeave(trigger);
    act(() => { vi.advanceTimersByTime(300); });

    expect(tooltip).toHaveClass('arch-tooltip--hidden');
  });
});

/* ─── Tooltip — focus behaviour ──────────────────────────────────────────────── */

describe('Tooltip — focus behaviour', () => {
  it('shows the tooltip on focus after delay', () => {
    render(
      <Tooltip content="Focus tooltip" delay={300}>
        <button>Focus me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Focus me' });
    const tooltip = screen.getByRole('tooltip');

    fireEvent.focus(trigger);
    act(() => { vi.advanceTimersByTime(300); });
    expect(tooltip).toHaveClass('arch-tooltip--visible');
  });

  it('hides the tooltip on blur', () => {
    render(
      <Tooltip content="Focus tooltip" delay={300}>
        <button>Focus me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Focus me' });
    const tooltip = screen.getByRole('tooltip');

    fireEvent.focus(trigger);
    act(() => { vi.advanceTimersByTime(300); });
    expect(tooltip).toHaveClass('arch-tooltip--visible');

    fireEvent.blur(trigger);
    expect(tooltip).toHaveClass('arch-tooltip--hidden');
  });
});

/* ─── Tooltip — accessibility ────────────────────────────────────────────────── */

describe('Tooltip — accessibility', () => {
  it('passes axe when hidden', async () => {
    vi.useRealTimers();
    const { container } = render(
      <Tooltip content="Accessible tooltip">
        <button>Trigger</button>
      </Tooltip>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    vi.useFakeTimers();
  });

  it('passes axe when visible', async () => {
    vi.useRealTimers();

    const { container } = render(
      <Tooltip content="Visible tooltip" delay={0}>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: 'Trigger' });
    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveClass('arch-tooltip--visible');
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    vi.useFakeTimers();
  });
});
