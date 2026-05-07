import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppShell, SideNavigation } from '@arch-ui/components';

const sampleItems = [
  { itemId: 'home', title: 'Home' },
  { itemId: 'dashboard', title: 'Dashboard' },
  { itemId: 'settings', title: 'Settings' },
  { itemId: 'profile', title: 'Profile' },
];

const meta = {
  title: 'Containers and Layout/AppShell',
  component: AppShell,
  argTypes: {
    collapsed: { control: 'boolean' },
    sidebarWidth: { control: 'text' },
    collapsedWidth: { control: 'text' },
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collapsed: false,
    sidebar: (
      <SideNavigation items={sampleItems} activeItemId="home" />
    ),
    children: (
      <div style={{ padding: '24px' }}>
        <h1>Page Content</h1>
        <p>This is the main content area of the application.</p>
      </div>
    ),
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    sidebar: (
      <SideNavigation items={sampleItems} activeItemId="home" collapsed />
    ),
    children: (
      <div style={{ padding: '24px' }}>
        <h1>Page Content</h1>
        <p>The sidebar is collapsed in this view.</p>
      </div>
    ),
  },
};
