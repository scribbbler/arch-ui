import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';

/* ─── Smoke ─────────────────────────────────────────────────────────────────── */

describe('ButtonGroup — smoke', () => {
  it('renders without crashing', () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});

/* ─── Rendering ─────────────────────────────────────────────────────────────── */

describe('ButtonGroup — rendering', () => {
  it('renders all child buttons', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>,
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
    expect(screen.getByText('Three')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(
      <ButtonGroup className="my-group">
        <Button>A</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveClass('arch-button-group', 'my-group');
  });
});

/* ─── Mode prop ─────────────────────────────────────────────────────────────── */

describe('ButtonGroup — mode', () => {
  it('defaults to radio mode', () => {
    // Radio mode is default — just verify it renders without error
    render(
      <ButtonGroup selected={0}>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('accepts checkbox mode', () => {
    render(
      <ButtonGroup mode="checkbox" selected={[0, 1]}>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});

/* ─── Interactivity ─────────────────────────────────────────────────────────── */

describe('ButtonGroup — interactivity', () => {
  it('fires onChange with the clicked index', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <ButtonGroup onChange={onChange}>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    );
    await user.click(screen.getByText('B'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChange = vi.fn();
    render(
      <ButtonGroup onChange={onChange} disabled>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    );
    await user.click(screen.getByText('A'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

/* ─── Disabled ──────────────────────────────────────────────────────────────── */

describe('ButtonGroup — disabled', () => {
  it('applies the disabled class', () => {
    render(
      <ButtonGroup disabled>
        <Button>A</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toHaveClass('arch-button-group--disabled');
  });
});

/* ─── Accessibility ─────────────────────────────────────────────────────────── */

describe('ButtonGroup — a11y', () => {
  it('has role="group"', () => {
    render(
      <ButtonGroup>
        <Button>A</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────────── */

describe('ButtonGroup — forwardRef', () => {
  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ButtonGroup ref={ref}>
        <Button>A</Button>
      </ButtonGroup>,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
