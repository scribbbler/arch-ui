import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '@arch-ui/components';

const sampleText = 'The quick brown fox jumps over the lazy dog. Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed.';

const meta = {
  title: 'Typography/Paragraph',
  component: Paragraph,
  argTypes: {
    size: { control: 'select', options: ['large', 'medium', 'small', 'xsmall'] },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: { size: 'large', children: sampleText },
};

export const Medium: Story = {
  args: { size: 'medium', children: sampleText },
};

export const Small: Story = {
  args: { size: 'small', children: sampleText },
};

export const XSmall: Story = {
  args: { size: 'xsmall', children: sampleText },
};

export const Truncated: Story = {
  args: { truncate: true, children: sampleText },
};
