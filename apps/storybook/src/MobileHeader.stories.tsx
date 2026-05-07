import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MobileHeader } from '@arch-ui/components';

const PlaceholderIcon = () => <span aria-hidden="true">●</span>;

const meta = {
  title: 'Navigation/MobileHeader',
  component: MobileHeader,
  argTypes: {
    title: { control: 'text' },
    backLabel: { control: 'text' },
  },
} satisfies Meta<typeof MobileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Settings',
    onBack: () => {},
  },
};

export const WithAction: Story = {
  args: {
    title: 'Profile',
    onBack: () => {},
    actionIcon: <PlaceholderIcon />,
    onAction: () => {},
  },
};
