import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@arch-ui/components';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: 100, alignItems: 'stretch' }}>
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>
    ),
  ],
};

export const WithLabel: Story = {
  args: { label: 'or' },
};

export const WithLongLabel: Story = {
  args: { label: 'continue with' },
};
