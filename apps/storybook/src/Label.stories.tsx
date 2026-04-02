import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@arch-ui/components';

const meta = {
  title: 'Typography/Label',
  component: Label,
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm', 'xs'] },
    weight: { control: 'select', options: ['medium', 'semibold', 'bold'] },
    uppercase: { control: 'boolean' },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Default Label' },
};

export const SizeLarge: Story = {
  args: { size: 'lg', children: 'Large Label' },
};

export const SizeMedium: Story = {
  args: { size: 'md', children: 'Medium Label' },
};

export const SizeSmall: Story = {
  args: { size: 'sm', children: 'Small Label' },
};

export const SizeExtraSmall: Story = {
  args: { size: 'xs', children: 'Extra Small Label' },
};

export const WeightSemibold: Story = {
  args: { weight: 'semibold', children: 'Semibold Label' },
};

export const WeightBold: Story = {
  args: { weight: 'bold', children: 'Bold Label' },
};

export const Uppercase: Story = {
  args: { uppercase: true, children: 'Uppercase Label' },
};
