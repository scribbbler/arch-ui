import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/Radio',
  component: Radio,
  decorators: [
    (Story) => (
      <RadioGroup legend="Demo group" name="demo" value="a" onChange={() => {}}>
        <Story />
      </RadioGroup>
    ),
  ],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 'a', children: 'Option A' },
};

export const Selected: Story = {
  args: { value: 'a', children: 'Selected option' },
};

export const Disabled: Story = {
  args: { value: 'b', disabled: true, children: 'Disabled option' },
};

export const Accessibility: Story = {
  args: { value: 'a', children: 'Focus me with Tab, navigate with arrows' },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Arrow Up/Down/Left/Right` to move selection within the group. ' +
          'Only the selected (or first) radio is in the tab order. ' +
          'A real `<input type="radio">` is rendered for native screen reader support. ' +
          'Focus indicator appears via `:focus-visible` using `var(--color-border-focus)`.',
      },
    },
  },
};
