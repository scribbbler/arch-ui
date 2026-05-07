import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { LocaleProvider, useLocale } from './LocaleProvider';
import en_US from './en_US';

/* ─── useLocale defaults ────────────────────────────────────────────────────── */

describe('useLocale — defaults', () => {
  it('returns en_US defaults without a provider', () => {
    const { result } = renderHook(() => useLocale());
    expect(result.current).toEqual(en_US);
  });

  it('returns the correct accordion.collapse string', () => {
    const { result } = renderHook(() => useLocale());
    expect(result.current.accordion.collapse).toBe('Collapse');
  });

  it('returns the correct accordion.expand string', () => {
    const { result } = renderHook(() => useLocale());
    expect(result.current.accordion.expand).toBe('Expand');
  });

  it('returns the correct dialog strings', () => {
    const { result } = renderHook(() => useLocale());
    expect(result.current.dialog.close).toBe('Close');
    expect(result.current.dialog.confirm).toBe('Confirm');
    expect(result.current.dialog.cancel).toBe('Cancel');
  });
});

/* ─── LocaleProvider with partial overrides ─────────────────────────────────── */

describe('LocaleProvider — partial overrides', () => {
  it('merges a partial override into en_US defaults', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LocaleProvider locale={{ dialog: { close: 'Cerrar' } }}>{children}</LocaleProvider>
    );

    const { result } = renderHook(() => useLocale(), { wrapper });
    // Overridden value
    expect(result.current.dialog.close).toBe('Cerrar');
    // Non-overridden values remain default
    expect(result.current.dialog.confirm).toBe('Confirm');
    expect(result.current.dialog.cancel).toBe('Cancel');
  });

  it('preserves unrelated locale sections', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LocaleProvider locale={{ alert: { close: 'Dismiss' } }}>{children}</LocaleProvider>
    );

    const { result } = renderHook(() => useLocale(), { wrapper });
    expect(result.current.alert.close).toBe('Dismiss');
    // Unrelated sections are untouched
    expect(result.current.accordion.collapse).toBe('Collapse');
    expect(result.current.pagination.next).toBe('Next');
  });
});

/* ─── Nested providers ──────────────────────────────────────────────────────── */

describe('LocaleProvider — nested', () => {
  it('inner provider merges over outer provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LocaleProvider locale={{ dialog: { close: 'Outer close' } }}>
        <LocaleProvider locale={{ dialog: { confirm: 'Inner confirm' } }}>
          {children}
        </LocaleProvider>
      </LocaleProvider>
    );

    const { result } = renderHook(() => useLocale(), { wrapper });
    // Outer override persists
    expect(result.current.dialog.close).toBe('Outer close');
    // Inner override applied
    expect(result.current.dialog.confirm).toBe('Inner confirm');
    // Default still present
    expect(result.current.dialog.cancel).toBe('Cancel');
  });
});

/* ─── Integration with components ───────────────────────────────────────────── */

describe('LocaleProvider — integration', () => {
  function LocaleConsumer() {
    const locale = useLocale();
    return <span data-testid="close-label">{locale.modal.close}</span>;
  }

  it('provides locale values to consumer components', () => {
    render(
      <LocaleProvider locale={{ modal: { close: 'Schliessen' } }}>
        <LocaleConsumer />
      </LocaleProvider>,
    );
    expect(screen.getByTestId('close-label')).toHaveTextContent('Schliessen');
  });

  it('uses defaults when no override is provided', () => {
    render(<LocaleConsumer />);
    expect(screen.getByTestId('close-label')).toHaveTextContent('Close');
  });
});
