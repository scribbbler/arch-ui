import type { Meta, StoryObj } from '@storybook/react';
import { Display } from '@arch-ui/components';

const meta = {
  title: 'Typography/Display',
  component: Display,
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'xsmall'],
    },
  },
} satisfies Meta<typeof Display>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: { size: 'large', children: 'Display Large — 96px' },
};

export const Medium: Story = {
  args: { size: 'medium', children: 'Display Medium — 52px' },
};

export const Small: Story = {
  args: { size: 'small', children: 'Display Small — 44px' },
};

export const XSmall: Story = {
  args: { size: 'xsmall', children: 'Display XSmall — 36px' },
};
