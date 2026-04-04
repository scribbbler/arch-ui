import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@arch-ui/components';

const meta = {
  title: 'Typography/Label',
  component: Label,
  argTypes: {
    size: { control: 'select', options: ['large', 'medium', 'small', 'xsmall'] },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: { size: 'large', children: 'Label Large — 18px / 500' },
};

export const Medium: Story = {
  args: { size: 'medium', children: 'Label Medium — 16px / 500' },
};

export const Small: Story = {
  args: { size: 'small', children: 'Label Small — 14px / 500' },
};

export const XSmall: Story = {
  args: { size: 'xsmall', children: 'Label XSmall — 12px / 500' },
};
