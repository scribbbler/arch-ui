import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@arch-ui/components';

const meta = {
  title: 'Indicators and Status/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { variant: 'text' },
};

export const Circular: Story = {
  args: { variant: 'circular', width: '40px' },
};

export const Rectangular: Story = {
  args: { variant: 'rectangular', width: '100%', height: '120px' },
};

export const CustomDimensions: Story = {
  args: { variant: 'rectangular', width: '200px', height: '80px' },
};

export const NotAnimated: Story = {
  args: { variant: 'text', animated: false },
};

export const TextStack: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  ),
};

export const Accessibility: Story = {
  name: 'Accessibility',
  args: { variant: 'rectangular', width: '100%', height: '100px' },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton is always aria-hidden="true" and purely decorative. Pair with aria-busy="true" on the parent container so screen readers know content is loading. The shimmer animation respects prefers-reduced-motion.',
      },
    },
  },
};
