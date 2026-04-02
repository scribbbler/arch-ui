import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@arch-ui/components';

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExtraSmall: Story = {
  args: { size: 'xs' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const CustomAriaLabel: Story = {
  args: { size: 'md', 'aria-label': 'Saving changes' },
};

export const Accessibility: Story = {
  name: 'Accessibility',
  args: { size: 'lg', 'aria-label': 'Loading dashboard data' },
  parameters: {
    docs: {
      description: {
        story: 'Spinner uses role="status" so screen readers announce the aria-label without interrupting. The default label is "Loading". Provide a descriptive label when context requires it. Animation is disabled when prefers-reduced-motion is active.',
      },
    },
  },
};
