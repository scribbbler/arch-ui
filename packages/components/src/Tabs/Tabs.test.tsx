import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Tabs } from './Tabs';
import type { TabItem } from './Tabs';

/* ─── Fixtures ───────────────────────────────────────────────────────────────── */

const defaultTabs: TabItem[] = [
  { label: 'Alpha', value: 'alpha', content: <p>Alpha panel content</p> },
  { label: 'Beta', value: 'beta', content: <p>Beta panel content</p> },
  { label: 'Gamma', value: 'gamma', content: <p>Gamma panel content</p> },
];

const tabsWithDisabled: TabItem[] = [
  { label: 'One', value: 'one', content: <p>One panel</p> },
  { label: 'Two', value: 'two', content: <p>Two panel</p>, disabled: true },
  { label: 'Three', value: 'three', content: <p>Three panel</p> },
];

/* ─── Controlled wrapper ─────────────────────────────────────────────────────── */

function ControlledTabs({
  tabs = defaultTabs,
  initialValue = 'alpha',
  onChange,
  ...props
}: Partial<React.ComponentProps<typeof Tabs>> & {
  tabs?: TabItem[];
  initialValue?: string;
  onChange?: (value: string) => void;
}) {
  const [active, setActive] = useState(initialValue);
  return (
    <Tabs
      tabs={tabs}
      activeValue={active}
      onChange={(v) => {
        setActive(v);
        onChange?.(v);
      }}
      {...props}
    />
  );
}

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('Tabs — rendering', () => {
  it('renders a tablist', () => {
    render(<ControlledTabs />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders all tab buttons', () => {
    render(<ControlledTabs />);
    expect(screen.getByRole('tab', { name: 'Alpha' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Beta' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Gamma' })).toBeInTheDocument();
  });

  it('renders the active panel content', () => {
    render(<ControlledTabs />);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getByText('Alpha panel content')).toBeInTheDocument();
  });

  it('does not render inactive panel content', () => {
    render(<ControlledTabs />);
    expect(screen.queryByText('Beta panel content')).not.toBeInTheDocument();
  });

  it('applies a custom className to the root element', () => {
    const { container } = render(<ControlledTabs className="my-tabs" />);
    expect(container.firstChild).toHaveClass('my-tabs');
  });

  it('forwards a ref to the root div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Tabs
        tabs={defaultTabs}
        activeValue="alpha"
        onChange={() => undefined}
        ref={ref}
      />
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Active tab ─────────────────────────────────────────────────────────────── */

describe('Tabs — active tab', () => {
  it('active tab has aria-selected="true"', () => {
    render(<ControlledTabs initialValue="beta" />);
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('inactive tabs have aria-selected="false"', () => {
    render(<ControlledTabs initialValue="alpha" />);
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
    expect(screen.getByRole('tab', { name: 'Gamma' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('active tab has tabIndex=0, others have tabIndex=-1', () => {
    render(<ControlledTabs initialValue="alpha" />);
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('tabindex', '-1');
  });

  it('panel has aria-labelledby pointing to the active tab id', () => {
    render(<ControlledTabs initialValue="alpha" />);
    const panel = screen.getByRole('tabpanel');
    const tabId = screen.getByRole('tab', { name: 'Alpha' }).id;
    expect(panel).toHaveAttribute('aria-labelledby', tabId);
  });

  it('active tab aria-controls points to the panel id', () => {
    render(<ControlledTabs initialValue="alpha" />);
    const tab = screen.getByRole('tab', { name: 'Alpha' });
    const panelId = tab.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId as string)).toBeInTheDocument();
  });
});

/* ─── Click to change tab ────────────────────────────────────────────────────── */

describe('Tabs — click interaction', () => {
  it('calls onChange with the tab value when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ControlledTabs onChange={handleChange} />);
    await user.click(screen.getByRole('tab', { name: 'Beta' }));
    expect(handleChange).toHaveBeenCalledWith('beta');
  });

  it('switches the displayed panel on click', async () => {
    const user = userEvent.setup();
    render(<ControlledTabs />);
    await user.click(screen.getByRole('tab', { name: 'Beta' }));
    expect(screen.getByText('Beta panel content')).toBeInTheDocument();
    expect(screen.queryByText('Alpha panel content')).not.toBeInTheDocument();
  });
});

/* ─── Keyboard navigation ────────────────────────────────────────────────────── */

describe('Tabs — keyboard navigation (horizontal)', () => {
  it('ArrowRight moves focus and activates the next tab', async () => {
    const user = userEvent.setup();
    render(<ControlledTabs orientation="horizontal" />);
    const alphaTab = screen.getByRole('tab', { name: 'Alpha' });
    alphaTab.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveFocus();
  });

  it('ArrowLeft moves focus to the previous tab', async () => {
    const user = userEvent.setup();
    render(<ControlledTabs initialValue="beta" orientation="horizontal" />);
    const betaTab = screen.getByRole('tab', { name: 'Beta' });
    betaTab.focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveFocus();
  });

  it('ArrowRight wraps from last tab to first', async () => {
    const user = userEvent.setup();
    render(<ControlledTabs initialValue="gamma" orientation="horizontal" />);
    const gammaTab = screen.getByRole('tab', { name: 'Gamma' });
    gammaTab.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveFocus();
  });

  it('ArrowLeft wraps from first tab to last', async () => {
    const user = userEvent.setup();
    render(<ControlledTabs initialValue="alpha" orientation="horizontal" />);
    const alphaTab = screen.getByRole('tab', { name: 'Alpha' });
    alphaTab.focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Gamma' })).toHaveFocus();
  });

  it('Home key moves focus to the first enabled tab', async () => {
    const user = userEvent.setup();
    render(<ControlledTabs initialValue="gamma" orientation="horizontal" />);
    const gammaTab = screen.getByRole('tab', { name: 'Gamma' });
    gammaTab.focus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveFocus();
  });

  it('End key moves focus to the last enabled tab', async () => {
    const user = userEvent.setup();
    render(<ControlledTabs initialValue="alpha" orientation="horizontal" />);
    const alphaTab = screen.getByRole('tab', { name: 'Alpha' });
    alphaTab.focus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Gamma' })).toHaveFocus();
  });
});

describe('Tabs — keyboard navigation (vertical)', () => {
  it('ArrowDown moves focus to the next tab', async () => {
    const user = userEvent.setup();
    render(<ControlledTabs orientation="vertical" />);
    const alphaTab = screen.getByRole('tab', { name: 'Alpha' });
    alphaTab.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveFocus();
  });

  it('ArrowUp moves focus to the previous tab', async () => {
    const user = userEvent.setup();
    render(<ControlledTabs initialValue="beta" orientation="vertical" />);
    const betaTab = screen.getByRole('tab', { name: 'Beta' });
    betaTab.focus();
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveFocus();
  });
});

/* ─── Disabled tabs ──────────────────────────────────────────────────────────── */

describe('Tabs — disabled tabs', () => {
  it('disabled tab has aria-disabled="true"', () => {
    render(<ControlledTabs tabs={tabsWithDisabled} initialValue="one" />);
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it('disabled tab is skipped during ArrowRight keyboard navigation', async () => {
    const user = userEvent.setup();
    render(
      <ControlledTabs
        tabs={tabsWithDisabled}
        initialValue="one"
        orientation="horizontal"
      />
    );
    const oneTab = screen.getByRole('tab', { name: 'One' });
    oneTab.focus();
    await user.keyboard('{ArrowRight}');
    // Two is disabled, so focus should land on Three
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();
  });

  it('clicking a disabled tab does not call onChange', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <ControlledTabs
        tabs={tabsWithDisabled}
        initialValue="one"
        onChange={handleChange}
      />
    );
    await user.click(screen.getByRole('tab', { name: 'Two' })).catch(() => {
      /* pointer-events:none may prevent the click */
    });
    expect(handleChange).not.toHaveBeenCalledWith('two');
  });
});

/* ─── Variants ───────────────────────────────────────────────────────────────── */

describe('Tabs — variants', () => {
  it('applies the line variant class by default', () => {
    const { container } = render(<ControlledTabs />);
    expect(container.firstChild).toHaveClass('arch-tabs--line');
  });

  it('applies the enclosed variant class', () => {
    const { container } = render(<ControlledTabs variant="enclosed" />);
    expect(container.firstChild).toHaveClass('arch-tabs--enclosed');
  });
});

/* ─── Orientation ────────────────────────────────────────────────────────────── */

describe('Tabs — orientation', () => {
  it('applies horizontal orientation class by default', () => {
    const { container } = render(<ControlledTabs />);
    expect(container.firstChild).toHaveClass('arch-tabs--horizontal');
  });

  it('applies vertical orientation class', () => {
    const { container } = render(<ControlledTabs orientation="vertical" />);
    expect(container.firstChild).toHaveClass('arch-tabs--vertical');
  });

  it('tablist has correct aria-orientation for vertical', () => {
    render(<ControlledTabs orientation="vertical" />);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('Tabs — accessibility', () => {
  it('passes axe with default props', async () => {
    const { container } = render(<ControlledTabs />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with enclosed variant', async () => {
    const { container } = render(<ControlledTabs variant="enclosed" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with vertical orientation', async () => {
    const { container } = render(<ControlledTabs orientation="vertical" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe with disabled tabs', async () => {
    const { container } = render(
      <ControlledTabs tabs={tabsWithDisabled} initialValue="one" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
