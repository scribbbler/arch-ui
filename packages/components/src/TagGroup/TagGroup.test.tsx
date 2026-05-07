import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TagGroup } from './TagGroup';

const sampleTags = [
  { id: '1', label: 'React' },
  { id: '2', label: 'TypeScript' },
  { id: '3', label: 'Vitest' },
];

/* ─── Smoke ─────────────────────────────────────────────────────────────────── */

describe('TagGroup — smoke', () => {
  it('renders without crashing', () => {
    render(<TagGroup tags={sampleTags} />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});

/* ─── Rendering ─────────────────────────────────────────────────────────────── */

describe('TagGroup — rendering', () => {
  it('renders all tag labels', () => {
    render(<TagGroup tags={sampleTags} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Vitest')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    render(<TagGroup tags={sampleTags} className="my-group" />);
    expect(screen.getByRole('group')).toHaveClass('arch-tag-group', 'my-group');
  });

  it('renders the add button when onAdd is provided', () => {
    render(<TagGroup tags={sampleTags} onAdd={() => {}} />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('renders custom add label', () => {
    render(<TagGroup tags={sampleTags} onAdd={() => {}} addLabel="Add tag" />);
    expect(screen.getByText('Add tag')).toBeInTheDocument();
  });

  it('does not render add button when onAdd is not provided', () => {
    render(<TagGroup tags={sampleTags} />);
    expect(screen.queryByText('Add')).not.toBeInTheDocument();
  });
});

/* ─── Interactivity ─────────────────────────────────────────────────────────── */

describe('TagGroup — interactivity', () => {
  it('fires onAdd when the add button is clicked', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TagGroup tags={sampleTags} onAdd={onAdd} />);
    await user.click(screen.getByText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});

/* ─── Disabled ──────────────────────────────────────────────────────────────── */

describe('TagGroup — disabled', () => {
  it('applies disabled class when disabled=true', () => {
    render(<TagGroup tags={sampleTags} disabled />);
    expect(screen.getByRole('group')).toHaveClass('arch-tag-group--disabled');
  });

  it('sets aria-disabled on the group', () => {
    render(<TagGroup tags={sampleTags} disabled />);
    expect(screen.getByRole('group')).toHaveAttribute('aria-disabled', 'true');
  });

  it('disables the add button when disabled=true', () => {
    render(<TagGroup tags={sampleTags} onAdd={() => {}} disabled />);
    expect(screen.getByText('Add').closest('button')).toBeDisabled();
  });
});

/* ─── Accessibility ─────────────────────────────────────────────────────────── */

describe('TagGroup — a11y', () => {
  it('has role="group" with aria-label', () => {
    render(<TagGroup tags={sampleTags} />);
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-label', 'Tag group');
  });
});

/* ─── forwardRef ────────────────────────────────────────────────────────────── */

describe('TagGroup — forwardRef', () => {
  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TagGroup ref={ref} tags={sampleTags} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
