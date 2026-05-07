import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MapMarker } from '@arch-ui/components';

const meta = {
  title: 'Content Display/MapMarker',
  component: MapMarker,
  argTypes: {
    label: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'active', 'muted'],
    },
  },
} satisfies Meta<typeof MapMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'HQ',
  },
};

export const Active: Story = {
  args: {
    label: 'Selected',
    variant: 'active',
  },
};

export const Muted: Story = {
  args: {
    label: 'Closed',
    variant: 'muted',
  },
};

export const Small: Story = {
  args: {
    label: 'S',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Main Office',
    size: 'lg',
  },
};
