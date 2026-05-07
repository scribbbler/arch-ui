import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Layer, LayerManager, useLayerContext } from './Layer';

/* ─── Helper to read context ────────────────────────────────────────────────── */

function ContextReader() {
  const ctx = useLayerContext();
  return <span data-testid="z">{ctx.currentZIndex}</span>;
}

/* ─── Layer — rendering ──────────────────────────────────────────────────────── */

describe('Layer — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<Layer>Content</Layer>);
    expect(container.querySelector('.arch-layer')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Layer><span>Inside layer</span></Layer>);
    expect(screen.getByText('Inside layer')).toBeInTheDocument();
  });

  it('applies the base class', () => {
    const { container } = render(<Layer />);
    expect(container.querySelector('.arch-layer')).toHaveClass('arch-layer');
  });

  it('applies a custom className', () => {
    const { container } = render(<Layer className="my-layer" />);
    expect(container.querySelector('.arch-layer')).toHaveClass('arch-layer', 'my-layer');
  });

  it('sets --arch-layer-z-index CSS variable', () => {
    const { container } = render(<Layer zIndex={50} />);
    const el = container.querySelector('.arch-layer') as HTMLElement;
    expect(el.style.getPropertyValue('--arch-layer-z-index')).toBe('50');
  });

  it('defaults z-index to 0', () => {
    const { container } = render(<Layer />);
    const el = container.querySelector('.arch-layer') as HTMLElement;
    expect(el.style.getPropertyValue('--arch-layer-z-index')).toBe('0');
  });
});

/* ─── Layer — context ────────────────────────────────────────────────────────── */

describe('Layer — context', () => {
  it('provides currentZIndex through context', () => {
    render(
      <Layer zIndex={42}>
        <ContextReader />
      </Layer>
    );
    expect(screen.getByTestId('z')).toHaveTextContent('42');
  });

  it('defaults currentZIndex to 0 without a Layer', () => {
    render(<ContextReader />);
    expect(screen.getByTestId('z')).toHaveTextContent('0');
  });
});

/* ─── LayerManager ───────────────────────────────────────────────────────────── */

describe('LayerManager', () => {
  it('renders children', () => {
    render(
      <LayerManager><span>App</span></LayerManager>
    );
    expect(screen.getByText('App')).toBeInTheDocument();
  });

  it('provides initial context with currentZIndex=0', () => {
    render(
      <LayerManager>
        <ContextReader />
      </LayerManager>
    );
    expect(screen.getByTestId('z')).toHaveTextContent('0');
  });

  it('applies the manager class', () => {
    const { container } = render(<LayerManager>App</LayerManager>);
    expect(container.querySelector('.arch-layer-manager')).toBeInTheDocument();
  });

  it('forwards a ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<LayerManager ref={ref}>App</LayerManager>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('Layer — forwardRef', () => {
  it('forwards a ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Layer ref={ref}>Content</Layer>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
