import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from '../Checkbox/Checkbox';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('CheckboxGroup — rendering', () => {
  it('renders without crashing', () => {
    render(
      <CheckboxGroup legend="Options">
        <Checkbox onChange={vi.fn()}>Option A</Checkbox>
      </CheckboxGroup>
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('renders a <fieldset> element', () => {
    render(<CheckboxGroup legend="Options" />);
    const fieldset = screen.getByRole('group');
    expect(fieldset.tagName).toBe('FIELDSET');
  });

  it('renders the legend text', () => {
    render(<CheckboxGroup legend="Choose options" />);
    expect(screen.getByText('Choose options')).toBeInTheDocument();
  });

  it('renders children inside the group', () => {
    render(
      <CheckboxGroup legend="Options">
        <Checkbox onChange={vi.fn()}>Option A</Checkbox>
        <Checkbox onChange={vi.fn()}>Option B</Checkbox>
      </CheckboxGroup>
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('applies a custom className to the fieldset', () => {
    render(<CheckboxGroup legend="Options" className="custom-group" />);
    expect(screen.getByRole('group')).toHaveClass('custom-group');
  });

  it('always applies the arch-checkbox-group class', () => {
    render(<CheckboxGroup legend="Options" />);
    expect(screen.getByRole('group')).toHaveClass('arch-checkbox-group');
  });

  it('forwards a ref to the fieldset element', () => {
    const ref = React.createRef<HTMLFieldSetElement>();
    render(<CheckboxGroup legend="Options" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('FIELDSET');
  });
});

/* ─── Direction ──────────────────────────────────────────────────────────────── */

describe('CheckboxGroup — direction', () => {
  it('renders vertical layout by default', () => {
    const { container } = render(<CheckboxGroup legend="Options" />);
    const items = container.querySelector('.arch-checkbox-group__items');
    expect(items).not.toHaveClass('arch-checkbox-group__items--horizontal');
  });

  it('applies horizontal class when direction is horizontal', () => {
    const { container } = render(
      <CheckboxGroup legend="Options" direction="horizontal" />
    );
    const items = container.querySelector('.arch-checkbox-group__items');
    expect(items).toHaveClass('arch-checkbox-group__items--horizontal');
  });
});

/* ─── Disabled propagation ───────────────────────────────────────────────────── */

describe('CheckboxGroup — disabled propagation', () => {
  it('disables the fieldset when disabled is true', () => {
    render(
      <CheckboxGroup legend="Options" disabled>
        <Checkbox onChange={vi.fn()}>Option A</Checkbox>
      </CheckboxGroup>
    );
    expect(screen.getByRole('group')).toBeDisabled();
  });

  it('disables child checkboxes when group is disabled', () => {
    render(
      <CheckboxGroup legend="Options" disabled>
        <Checkbox onChange={vi.fn()}>Option A</Checkbox>
        <Checkbox onChange={vi.fn()}>Option B</Checkbox>
      </CheckboxGroup>
    );
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((cb) => expect(cb).toBeDisabled());
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('CheckboxGroup — accessibility', () => {
  it('passes axe with multiple checkboxes', async () => {
    const { container } = render(
      <CheckboxGroup legend="Notification preferences">
        <Checkbox onChange={vi.fn()}>Email</Checkbox>
        <Checkbox onChange={vi.fn()}>SMS</Checkbox>
        <Checkbox onChange={vi.fn()}>Push</Checkbox>
      </CheckboxGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when disabled', async () => {
    const { container } = render(
      <CheckboxGroup legend="Disabled group" disabled>
        <Checkbox onChange={vi.fn()}>Option A</Checkbox>
      </CheckboxGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with horizontal direction', async () => {
    const { container } = render(
      <CheckboxGroup legend="Horizontal group" direction="horizontal">
        <Checkbox onChange={vi.fn()}>Option A</Checkbox>
        <Checkbox onChange={vi.fn()}>Option B</Checkbox>
      </CheckboxGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
