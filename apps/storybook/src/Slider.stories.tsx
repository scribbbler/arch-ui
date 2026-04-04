import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider, FormControl, FormLabel } from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/Slider',
  component: Slider,
  render: (args) => (
    <FormControl>
      <FormLabel>Volume</FormLabel>
      <Slider {...args} />
    </FormControl>
  ),
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  args: {
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
  args: { min: 0, max: 1000, step: 50, defaultValue: 500 },
  render: (args) => (
    <FormControl>
      <FormLabel>Price</FormLabel>
      <Slider {...args} />
    </FormControl>
  ),
};

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 30 },
  render: (args) => (
    <FormControl disabled>
      <FormLabel>Volume</FormLabel>
      <Slider {...args} />
    </FormControl>
  ),
};

/* ─── Controlled with Value Display ──────────────────────────────────────────── */

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <FormControl>
        <FormLabel>Brightness: {value}%</FormLabel>
        <Slider value={value} onChange={setValue} />
      </FormControl>
    );
  },
};

/* ─── Fine-grained Steps ─────────────────────────────────────────────────────── */

export const FineGrainedSteps: Story = {
  args: { min: 0, max: 1, step: 0.01, defaultValue: 0.5 },
  render: (args) => (
    <FormControl>
      <FormLabel>Opacity</FormLabel>
      <Slider {...args} />
    </FormControl>
  ),
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
          'Always associate with a visible label via FormControl and FormLabel.',
      },
    },
  },
};
