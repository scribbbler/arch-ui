import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Accordion } from './Accordion';

/* ─── Fixtures ───────────────────────────────────────────────────────────────── */

const items = [
  { title: 'Section One', content: <p>Content one</p> },
  { title: 'Section Two', content: <p>Content two</p> },
  { title: 'Section Three', content: <p>Content three</p> },
];

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Accordion — rendering', () => {
  it('renders all section headers', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Section One')).toBeInTheDocument();
    expect(screen.getByText('Section Two')).toBeInTheDocument();
    expect(screen.getByText('Section Three')).toBeInTheDocument();
  });

  it('renders all trigger buttons', () => {
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('renders panels with role="region"', () => {
    render(<Accordion items={items} />);
    const regions = screen.getAllByRole('region');
    expect(regions).toHaveLength(3);
  });

  it('applies custom className', () => {
    const { container } = render(<Accordion items={items} className="my-class" />);
    expect(container.firstChild).toHaveClass('my-class');
  });

  it('forwards ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Accordion items={items} ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Expand / Collapse ──────────────────────────────────────────────────────── */

describe('Accordion — expand and collapse', () => {
  it('starts with all sections collapsed by default', () => {
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('expands defaultExpanded indices on first render', () => {
    render(<Accordion items={items} defaultExpanded={[1]} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands a section when its button is clicked', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses an expanded section when its button is clicked again', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultExpanded={[0]} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
  });

  it('collapses the previously open section when allowMultiple is false (default)', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    await user.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });
});

/* ─── allowMultiple ──────────────────────────────────────────────────────────── */

describe('Accordion — allowMultiple', () => {
  it('keeps multiple sections open when allowMultiple=true', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} allowMultiple />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    await user.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });
});

/* ─── aria-expanded ──────────────────────────────────────────────────────────── */

describe('Accordion — aria-expanded', () => {
  it('sets aria-expanded="false" on all buttons initially', () => {
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('sets aria-expanded="true" on the clicked button', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[2]);
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
  });

  it('aria-controls points to the panel id', () => {
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    const regions = screen.getAllByRole('region');
    buttons.forEach((btn, i) => {
      const controlsId = btn.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
      expect(regions[i].id).toBe(controlsId);
    });
  });

  it('panel aria-labelledby points to the trigger button id', () => {
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    const regions = screen.getAllByRole('region');
    regions.forEach((region, i) => {
      const labelledById = region.getAttribute('aria-labelledby');
      expect(labelledById).toBeTruthy();
      expect(buttons[i].id).toBe(labelledById);
    });
  });
});

/* ─── Keyboard interaction ───────────────────────────────────────────────────── */

describe('Accordion — keyboard', () => {
  it('toggles with Enter key', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();
    await user.keyboard('{Enter}');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles with Space key', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    buttons[1].focus();
    await user.keyboard(' ');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('moves focus to next header with ArrowDown', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();
    await user.keyboard('{ArrowDown}');
    expect(buttons[1]).toHaveFocus();
  });

  it('moves focus to previous header with ArrowUp', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    buttons[1].focus();
    await user.keyboard('{ArrowUp}');
    expect(buttons[0]).toHaveFocus();
  });

  it('wraps ArrowDown from last to first', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    buttons[2].focus();
    await user.keyboard('{ArrowDown}');
    expect(buttons[0]).toHaveFocus();
  });

  it('wraps ArrowUp from first to last', async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();
    await user.keyboard('{ArrowUp}');
    expect(buttons[2]).toHaveFocus();
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Accordion — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(<Accordion items={items} />);
    const results = await axe(container, {
      rules: { 'landmark-unique': { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });

  it('passes axe with an item expanded', async () => {
    const { container } = render(<Accordion items={items} defaultExpanded={[0]} />);
    const results = await axe(container, {
      rules: { 'landmark-unique': { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });

  it('passes axe with allowMultiple and multiple expanded', async () => {
    const { container } = render(
      <Accordion items={items} allowMultiple defaultExpanded={[0, 1]} />
    );
    const results = await axe(container, {
      rules: { 'landmark-unique': { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});

/* ─── Suppress unused import warning ─────────────────────────────────────────── */
void vi;
