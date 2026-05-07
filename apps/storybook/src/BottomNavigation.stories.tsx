import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomNavigation } from '@arch-ui/components';

const PlaceholderIcon = () => <span aria-hidden="true">●</span>;

const meta = {
  title: 'Navigation/BottomNavigation',
  component: BottomNavigation,
  argTypes: {
    activeKey: { control: 'text' },
  },
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeKey: 'home',
    items: [
      { key: 'home', label: 'Home', icon: <PlaceholderIcon /> },
      { key: 'search', label: 'Search', icon: <PlaceholderIcon /> },
      { key: 'profile', label: 'Profile', icon: <PlaceholderIcon /> },
    ],
  },
};

export const FourItems: Story = {
  args: {
    activeKey: 'home',
    items: [
      { key: 'home', label: 'Home', icon: <PlaceholderIcon /> },
      { key: 'search', label: 'Search', icon: <PlaceholderIcon /> },
      { key: 'notifications', label: 'Alerts', icon: <PlaceholderIcon /> },
      { key: 'profile', label: 'Profile', icon: <PlaceholderIcon /> },
    ],
  },
};
