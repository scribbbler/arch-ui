import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@arch-ui/components';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  args: {
    'aria-label': 'Volume',
    min: 0,
    max: 100,
    step: 1,
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Default ────────────────────────────────────────────────────────────────── */

export const Default: Story = {
  args: { defaultValue: 50 },
};

/* ─── Custom Range ───────────────────────────────────────────────────────────── */

export const CustomMinMaxStep: Story = {
  args: {
    min: 0,
    max: 1000,
    step: 50,
    defaultValue: 500,
    'aria-label': 'Price',
  },
};

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 30 },
};

/* ─── Controlled with Value Display ──────────────────────────────────────────── */

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div>
        <Slider aria-label="Brightness" value={value} onChange={setValue} />
        <p style={{ marginTop: '8px' }}>Value: {value}</p>
      </div>
    );
  },
};

/* ─── Fine-grained Steps ─────────────────────────────────────────────────────── */

export const FineGrainedSteps: Story = {
  args: {
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0.5,
    'aria-label': 'Opacity',
  },
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  args: { defaultValue: 50 },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Arrow Left/Down` decreases by step, `Arrow Right/Up` increases by step, ' +
          '`Home` jumps to min, `End` jumps to max. ' +
          '`aria-valuemin`, `aria-valuemax`, and `aria-valuenow` are provided natively by the range input. ' +
          'Always provide `aria-label` or associate with a visible label. ' +
          'Focus indicator uses a 2px outline with `var(--color-border-focus)`. ' +
          'Thumb meets 44x44px minimum touch target.',
      },
    },
  },
};
