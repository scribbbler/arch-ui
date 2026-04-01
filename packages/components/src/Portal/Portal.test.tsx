import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Portal } from './Portal';

/* ─── Portal — rendering ─────────────────────────────────────────────────────── */

describe('Portal — rendering', () => {
  it('renders children into document.body by default', () => {
    render(<Portal><div data-testid="portal-child">hello</div></Portal>);
    const child = screen.getByTestId('portal-child');
    expect(child).toBeInTheDocument();
    expect(document.body.contains(child)).toBe(true);
  });

  it('renders children into a custom container', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    render(
      <Portal container={container}>
        <div data-testid="custom-portal-child">custom</div>
      </Portal>
    );

    const child = screen.getByTestId('custom-portal-child');
    expect(child).toBeInTheDocument();
    expect(container.contains(child)).toBe(true);

    document.body.removeChild(container);
  });

  it('renders nothing when container is null until mounted', () => {
    const { container: renderContainer } = render(
      <Portal container={null}>
        <span data-testid="null-container-child">content</span>
      </Portal>
    );
    // After mounting, content should be in document.body (not inside renderContainer)
    const child = screen.getByTestId('null-container-child');
    expect(child).toBeInTheDocument();
    expect(renderContainer.contains(child)).toBe(false);
  });
});

/* ─── Portal — multiple children ─────────────────────────────────────────────── */

describe('Portal — multiple children', () => {
  it('renders multiple children', () => {
    render(
      <Portal>
        <div data-testid="child-a">A</div>
        <div data-testid="child-b">B</div>
      </Portal>
    );
    expect(screen.getByTestId('child-a')).toBeInTheDocument();
    expect(screen.getByTestId('child-b')).toBeInTheDocument();
  });
});

/* ─── Portal — cleanup ───────────────────────────────────────────────────────── */

describe('Portal — cleanup', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    return () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  });

  it('unmounts portal content when component is unmounted', () => {
    const { unmount } = render(
      <Portal container={container}>
        <div data-testid="unmount-test">content</div>
      </Portal>
    );

    expect(screen.getByTestId('unmount-test')).toBeInTheDocument();
    unmount();
    expect(screen.queryByTestId('unmount-test')).not.toBeInTheDocument();
  });
});
