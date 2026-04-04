import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@arch-ui/components';

const meta = {
  title: 'Containers and Layout/Box',
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Default Box' },
};

export const WithPadding: Story = {
  args: {
    padding: 'spacing-layout-md',
    children: 'Padded box',
  },
};

export const WithBackground: Story = {
  args: {
    padding: 'spacing-layout-md',
    background: 'color-surface-secondary',
    children: 'Box with background',
  },
};

export const WithBorder: Story = {
  args: {
    padding: 'spacing-layout-md',
    border: 'color-border-default',
    radius: 'border-radius-md',
    children: 'Box with border and radius',
  },
};

export const WithShadow: Story = {
  args: {
    padding: 'spacing-layout-md',
    shadow: 'shadow-md',
    radius: 'border-radius-md',
    children: 'Box with shadow',
  },
};

export const WithDirectionalPadding: Story = {
  args: {
    paddingX: 'spacing-layout-lg',
    paddingY: 'spacing-layout-sm',
    background: 'color-surface-secondary',
    children: 'Asymmetric padding',
  },
};

export const AsSection: Story = {
  args: {
    as: 'section',
    padding: 'spacing-layout-md',
    border: 'color-border-default',
    children: 'Rendered as <section>',
  },
};
