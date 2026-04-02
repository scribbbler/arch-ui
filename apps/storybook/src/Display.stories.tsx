import type { Meta, StoryObj } from '@storybook/react';
import { Display } from '@arch-ui/components';

const meta = {
  title: 'Typography/Display',
  component: Display,
  argTypes: {
    size: {
      control: 'select',
      options: ['display-2xl', 'display-xl', 'display-lg', 'display-md', 'display-sm'],
    },
    weight: { control: 'select', options: ['semibold', 'bold', 'extrabold'] },
  },
} satisfies Meta<typeof Display>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Size2XL: Story = {
  args: { size: 'display-2xl', children: 'Display 2XL' },
};

export const SizeXL: Story = {
  args: { size: 'display-xl', children: 'Display XL' },
};

export const SizeLG: Story = {
  args: { size: 'display-lg', children: 'Display LG' },
};

export const SizeMD: Story = {
  args: { size: 'display-md', children: 'Display MD' },
};

export const SizeSM: Story = {
  args: { size: 'display-sm', children: 'Display SM' },
};

export const WeightSemibold: Story = {
  args: { weight: 'semibold', children: 'Semibold Display' },
};

export const WeightExtrabold: Story = {
  args: { weight: 'extrabold', children: 'Extrabold Display' },
};
