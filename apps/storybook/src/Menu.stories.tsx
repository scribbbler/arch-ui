import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from '@arch-ui/components';

const PlaceholderIcon = () => <span aria-hidden="true">●</span>;

const meta = {
  title: 'Input and Selection/Menu',
  component: Menu,
  argTypes: {
    items: { control: 'object' },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Edit' },
      { label: 'Duplicate' },
      { label: 'Archive' },
      { label: 'Delete' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Edit', icon: <PlaceholderIcon /> },
      { label: 'Copy', icon: <PlaceholderIcon /> },
      { label: 'Move', icon: <PlaceholderIcon /> },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      { label: 'Edit' },
      { label: 'Duplicate' },
      { label: 'Delete', disabled: true },
    ],
  },
};

export const WithDivider: Story = {
  args: {
    items: [
      { label: 'Edit' },
      { label: 'Duplicate' },
      { label: '', divider: true },
      { label: 'Delete' },
    ],
  },
};
