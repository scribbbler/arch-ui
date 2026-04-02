import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, Radio } from '@arch-ui/components';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
  },
  args: {
    legend: 'Preferred size',
    name: 'size',
    value: 'md',
    direction: 'vertical',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const RadioOptions = () => (
  <>
    <Radio value="sm">Small</Radio>
    <Radio value="md">Medium</Radio>
    <Radio value="lg">Large</Radio>
  </>
);

/* ─── Default ────────────────────────────────────────────────────────────────── */

export const Default: Story = {
  args: { children: <RadioOptions /> },
};

/* ─── Horizontal ─────────────────────────────────────────────────────────────── */

export const Horizontal: Story = {
  args: { direction: 'horizontal', children: <RadioOptions /> },
};

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { disabled: true, children: <RadioOptions /> },
};

/* ─── With One Disabled Option ───────────────────────────────────────────────── */

export const PartiallyDisabled: Story = {
  args: {
    children: (
      <>
        <Radio value="sm">Small</Radio>
        <Radio value="md" disabled>Medium (unavailable)</Radio>
        <Radio value="lg">Large</Radio>
      </>
    ),
  },
};

/* ─── Controlled ─────────────────────────────────────────────────────────────── */

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('md');
    return (
      <RadioGroup legend="Controlled size" name="ctrl-size" value={value} onChange={setValue}>
        <Radio value="sm">Small</Radio>
        <Radio value="md">Medium</Radio>
        <Radio value="lg">Large</Radio>
      </RadioGroup>
    );
  },
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  args: { children: <RadioOptions /> },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Tab` moves focus into and out of the group. ' +
          '`Arrow Up/Down/Left/Right` cycle focus and selection through enabled options. ' +
          'Disabled radios are skipped during arrow key navigation. ' +
          'Uses a native `<fieldset>` with `role="radiogroup"` and a `<legend>` for accessible grouping.',
      },
    },
  },
};
