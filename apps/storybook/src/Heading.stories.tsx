import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '@arch-ui/components';

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    level: { control: 'select', options: [1, 2, 3, 4, 5, 6] },
    size: {
      control: 'select',
      options: ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Level1: Story = {
  args: { level: 1, children: 'Heading Level 1 — 40px' },
};

export const Level2: Story = {
  args: { level: 2, children: 'Heading Level 2 — 36px' },
};

export const Level3: Story = {
  args: { level: 3, children: 'Heading Level 3 — 32px' },
};

export const Level4: Story = {
  args: { level: 4, children: 'Heading Level 4 — 28px' },
};

export const Level5: Story = {
  args: { level: 5, children: 'Heading Level 5 — 24px' },
};

export const Level6: Story = {
  args: { level: 6, children: 'Heading Level 6 — 20px' },
};

export const CustomSize: Story = {
  args: {
    level: 3,
    size: 'xxlarge',
    children: 'h3 with xxlarge size (40px)',
  },
};
