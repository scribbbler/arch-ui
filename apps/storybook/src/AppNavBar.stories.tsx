import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppNavBar } from '@arch-ui/components';

const PlaceholderIcon = () => <span aria-hidden="true">●</span>;

const meta = {
  title: 'Navigation/AppNavBar',
  component: AppNavBar,
  argTypes: {
    title: { control: 'text' },
    items: { control: 'object' },
  },
} satisfies Meta<typeof AppNavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'My Application',
    items: [
      { label: 'Home', href: '#', active: true },
      { label: 'Dashboard', href: '#' },
      { label: 'Settings', href: '#' },
    ],
    userInfo: <span>John Doe</span>,
  },
};

export const WithLogo: Story = {
  args: {
    logo: <PlaceholderIcon />,
    title: 'Acme Corp',
    items: [
      { label: 'Home', href: '#', active: true },
      { label: 'Products', href: '#' },
    ],
  },
};

export const WithActiveItem: Story = {
  args: {
    title: 'App',
    items: [
      { label: 'Home', href: '#' },
      { label: 'Dashboard', href: '#', active: true, icon: <PlaceholderIcon /> },
      { label: 'Reports', href: '#' },
    ],
    userInfo: <span>Jane</span>,
  },
};
