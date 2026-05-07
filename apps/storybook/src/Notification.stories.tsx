import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from '@arch-ui/components';

const meta = {
  title: 'Messaging/Notification',
  component: Notification,
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    title: { control: 'text' },
    closeable: { control: 'boolean' },
    onClose: { action: 'onClose' },
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational notification.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your session is about to expire.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Something went wrong. Please try again.',
  },
};

export const Closeable: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible',
    children: 'This notification can be closed.',
    closeable: true,
  },
};
