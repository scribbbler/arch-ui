import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '@arch-ui/components';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Enable notifications',
    size: 'md',
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const SizeSmall: Story = {
  args: { size: 'sm', children: 'Small toggle' },
};

export const SizeMedium: Story = {
  args: { size: 'md', children: 'Medium toggle' },
};

/* ─── States ─────────────────────────────────────────────────────────────────── */

export const Unchecked: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled toggle' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, children: 'Disabled on' },
};

/* ─── Without Label ──────────────────────────────────────────────────────────── */

export const WithoutLabel: Story = {
  args: { children: undefined, 'aria-label': 'Dark mode' },
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  args: { children: 'Focus me with Tab' },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Space` to toggle on/off, `Tab`/`Shift+Tab` to move focus. ' +
          'Renders `<input type="checkbox" role="switch">` so assistive technology announces on/off state via `aria-checked`. ' +
          'Thumb position (not colour alone) communicates state. ' +
          '`prefers-reduced-motion` is respected. ' +
          'Focus indicator is a 2px outline on the track using `var(--color-border-focus)`.',
      },
    },
  },
};
