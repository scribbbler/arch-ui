import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SideNavigation } from '@arch-ui/components';

const PlaceholderIcon = () => <span aria-hidden="true">●</span>;

const meta = {
  title: 'Navigation/SideNavigation',
  component: SideNavigation,
  argTypes: {
    activeItemId: { control: 'text' },
    collapsed: { control: 'boolean' },
  },
} satisfies Meta<typeof SideNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeItemId: 'home',
    items: [
      { itemId: 'home', title: 'Home', icon: <PlaceholderIcon /> },
      { itemId: 'dashboard', title: 'Dashboard', icon: <PlaceholderIcon /> },
      { itemId: 'settings', title: 'Settings', icon: <PlaceholderIcon /> },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    activeItemId: 'inbox',
    items: [
      { itemId: 'inbox', title: 'Inbox', icon: <PlaceholderIcon />, badge: 12 },
      { itemId: 'sent', title: 'Sent', icon: <PlaceholderIcon />, badge: 0 },
      { itemId: 'drafts', title: 'Drafts', icon: <PlaceholderIcon />, badge: 3 },
    ],
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    activeItemId: 'home',
    items: [
      { itemId: 'home', title: 'Home', icon: <PlaceholderIcon /> },
      { itemId: 'dashboard', title: 'Dashboard', icon: <PlaceholderIcon /> },
      { itemId: 'settings', title: 'Settings', icon: <PlaceholderIcon /> },
    ],
  },
};

export const WithNestedItems: Story = {
  args: {
    activeItemId: 'profile',
    items: [
      { itemId: 'home', title: 'Home', icon: <PlaceholderIcon /> },
      {
        itemId: 'settings',
        title: 'Settings',
        icon: <PlaceholderIcon />,
        subNav: [
          { itemId: 'profile', title: 'Profile' },
          { itemId: 'account', title: 'Account' },
          { itemId: 'billing', title: 'Billing' },
        ],
      },
    ],
  },
};

export const WithHeaderFooter: Story = {
  args: {
    activeItemId: 'home',
    header: <div><strong>Acme Corp</strong></div>,
    footer: <div><small>v1.0.0</small></div>,
    items: [
      { itemId: 'home', title: 'Home', icon: <PlaceholderIcon /> },
      { itemId: 'reports', title: 'Reports', icon: <PlaceholderIcon /> },
    ],
  },
};
