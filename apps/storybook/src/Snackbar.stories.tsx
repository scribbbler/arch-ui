import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar, SnackbarProvider, useSnackbar } from '@arch-ui/components';

const meta = {
  title: 'Messaging/Snackbar',
  component: Snackbar,
  decorators: [
    (Story) => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    message: { control: 'text' },
    actionLabel: { control: 'text' },
    autoHideDuration: { control: 'number' },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

function SnackbarTrigger({
  message,
  variant,
  actionLabel,
  autoHideDuration,
}: {
  message: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  actionLabel?: string;
  autoHideDuration?: number;
}) {
  const { snackbar } = useSnackbar();
  return (
    <button
      type="button"
      onClick={() =>
        snackbar({
          message,
          variant,
          actionLabel,
          onAction: actionLabel ? () => alert('Action clicked') : undefined,
          autoHideDuration,
        })
      }
    >
      Show Snackbar
    </button>
  );
}

export const Default: Story = {
  args: {
    message: 'This is a default snackbar',
    onClose: () => {},
  },
  render: (args) => <SnackbarTrigger message={args.message} />,
};

export const Success: Story = {
  args: {
    message: 'Item saved successfully',
    variant: 'success',
    onClose: () => {},
  },
  render: (args) => (
    <SnackbarTrigger message={args.message} variant={args.variant} />
  ),
};

export const Warning: Story = {
  args: {
    message: 'Storage is almost full',
    variant: 'warning',
    onClose: () => {},
  },
  render: (args) => (
    <SnackbarTrigger message={args.message} variant={args.variant} />
  ),
};

export const Error: Story = {
  args: {
    message: 'Failed to save changes',
    variant: 'error',
    onClose: () => {},
  },
  render: (args) => (
    <SnackbarTrigger message={args.message} variant={args.variant} />
  ),
};

export const WithAction: Story = {
  args: {
    message: 'Item deleted',
    actionLabel: 'Undo',
    onClose: () => {},
  },
  render: (args) => (
    <SnackbarTrigger
      message={args.message}
      actionLabel={args.actionLabel}
    />
  ),
};
