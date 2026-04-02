import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '@arch-ui/components';

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    level: { control: 'select', options: [1, 2, 3, 4, 5, 6] },
    size: {
      control: 'select',
      options: ['display-2xl', 'display-xl', 'display-lg', 'display-md', 'display-sm', 'text-xl'],
    },
    weight: { control: 'select', options: ['semibold', 'bold', 'extrabold'] },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Level1: Story = {
  args: { level: 1, children: 'Heading Level 1' },
};

export const Level2: Story = {
  args: { level: 2, children: 'Heading Level 2' },
};

export const Level3: Story = {
  args: { level: 3, children: 'Heading Level 3' },
};

export const Level4: Story = {
  args: { level: 4, children: 'Heading Level 4' },
};

export const Level5: Story = {
  args: { level: 5, children: 'Heading Level 5' },
};

export const Level6: Story = {
  args: { level: 6, children: 'Heading Level 6' },
};

export const CustomSize: Story = {
  args: {
    level: 3,
    size: 'display-2xl',
    children: 'h3 with display-2xl size',
  },
};

export const WeightSemibold: Story = {
  args: { level: 2, weight: 'semibold', children: 'Semibold Heading' },
};

export const WeightExtrabold: Story = {
  args: { level: 2, weight: 'extrabold', children: 'Extrabold Heading' },
};
