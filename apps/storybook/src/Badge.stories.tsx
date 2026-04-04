import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@arch-ui/components';

const meta = {
  title: 'Indicators and Status/Badge',
  component: Badge,
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Neutral' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'Info' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Warning' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Danger' },
};

export const SizeSmall: Story = {
  args: { size: 'sm', children: '3' },
};

export const SizeMedium: Story = {
  args: { size: 'md', children: 'Default' },
};

export const DotMode: Story = {
  args: { dot: true, variant: 'danger', 'aria-label': 'Error status', children: undefined },
};

export const DotWithLabel: Story = {
  args: { dot: true, variant: 'success', children: 'Online' },
};

export const Accessibility: Story = {
  name: 'Accessibility',
  args: {
    dot: true,
    variant: 'danger',
    'aria-label': 'Unread errors',
    children: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'When using dot mode without children, provide aria-label so screen readers can convey meaning. The component sets role="img" automatically in this case.',
      },
    },
  },
};
