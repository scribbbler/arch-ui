import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '@arch-ui/components';

const meta = {
  title: 'Typography/Paragraph',
  component: Paragraph,
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm', 'xs'] },
    weight: { control: 'select', options: ['regular', 'medium'] },
    truncate: { control: 'boolean' },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleText =
  'The quick brown fox jumps over the lazy dog. This sentence demonstrates paragraph rendering across different sizes.';

export const SizeLarge: Story = {
  args: { size: 'lg', children: sampleText },
};

export const SizeMedium: Story = {
  args: { size: 'md', children: sampleText },
};

export const SizeSmall: Story = {
  args: { size: 'sm', children: sampleText },
};

export const SizeExtraSmall: Story = {
  args: { size: 'xs', children: sampleText },
};

export const WeightMedium: Story = {
  args: { weight: 'medium', children: sampleText },
};

export const Truncated: Story = {
  args: { truncate: true, children: sampleText },
  decorators: [(Story) => <div style={{ maxWidth: 300 }}><Story /></div>],
};
