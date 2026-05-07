import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SystemBanner } from '@arch-ui/components';

const meta = {
  title: 'Messaging/SystemBanner',
  component: SystemBanner,
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'error'],
    },
    actionLabel: { control: 'text' },
    onAction: { action: 'onAction' },
    onClose: { action: 'onClose' },
  },
} satisfies Meta<typeof SystemBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'A new version of the application is available.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Scheduled maintenance on Saturday 10 pm \u2013 2 am UTC.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Service degradation detected. Some features may be unavailable.',
  },
};

export const WithAction: Story = {
  args: {
    variant: 'info',
    children: 'A new version is available.',
    actionLabel: 'Update now',
  },
};
