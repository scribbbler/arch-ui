import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '@arch-ui/components';

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Widget' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Dashboard' },
    ],
  },
};

export const DeepNesting: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Sub-category', href: '/category/sub' },
      { label: 'Product', href: '/category/sub/product' },
      { label: 'Details' },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Widget' },
    ],
    separator: '>',
  },
};

export const ArrowSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile' },
    ],
    separator: '\u2192',
  },
};
