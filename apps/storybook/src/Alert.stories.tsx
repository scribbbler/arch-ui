import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@arch-ui/components';

const meta = {
  title: 'Messaging/Alert',
  component: Alert,
  args: {
    description: 'This is an alert message.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { variant: 'info', title: 'Information', description: 'This is an informational alert.' },
};

export const Success: Story = {
  args: { variant: 'success', title: 'Success', description: 'Your changes have been saved.' },
};

export const Warning: Story = {
  args: { variant: 'warning', title: 'Warning', description: 'This action cannot be undone.' },
};

export const Danger: Story = {
  args: { variant: 'danger', title: 'Error', description: 'Something went wrong. Please try again.' },
};

export const WithoutTitle: Story = {
  args: { variant: 'info', description: 'A description-only alert without a title.' },
};

export const WithOnClose: Story = {
  args: {
    variant: 'success',
    title: 'Saved',
    description: 'Your profile has been updated.',
    onClose: () => {},
  },
};

export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'Custom icon',
    description: 'This alert uses a custom icon.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1l2 5h5l-4 3.5 1.5 5L8 11.5 3.5 14.5 5 9.5 1 6h5z" fill="currentColor" />
      </svg>
    ),
  },
};

export const NoIcon: Story = {
  args: {
    variant: 'warning',
    title: 'No icon',
    description: 'This alert has its icon suppressed.',
    icon: null,
  },
};

export const Accessibility: Story = {
  name: 'Accessibility',
  args: {
    variant: 'danger',
    title: 'Keyboard & screen reader notes',
    description: 'Danger/warning alerts use role="alert" (assertive). Success/info use role="status" (polite). The dismiss button is focusable via Tab and activated with Enter or Space.',
    onClose: () => {},
  },
};
