import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToast } from '@arch-ui/components';

/* --- Standalone Toast stories --- */

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  args: {
    title: 'Notification',
    onClose: () => {},
    duration: 0,
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'default', title: 'Update available', description: 'A new version is ready.' },
};

export const Success: Story = {
  args: { variant: 'success', title: 'Saved', description: 'Your changes have been saved.' },
};

export const Warning: Story = {
  args: { variant: 'warning', title: 'Slow connection', description: 'Retrying automatically.' },
};

export const Danger: Story = {
  args: { variant: 'danger', title: 'Upload failed', description: 'File size exceeds the limit.' },
};

export const TitleOnly: Story = {
  args: { variant: 'success', title: 'Copied to clipboard' },
};

/* --- ToastProvider + useToast pattern --- */

function ToastTriggerDemo() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <button type="button" onClick={() => toast({ title: 'Default toast', variant: 'default' })}>
        Default
      </button>
      <button type="button" onClick={() => toast({ title: 'Success', description: 'Operation completed.', variant: 'success' })}>
        Success
      </button>
      <button type="button" onClick={() => toast({ title: 'Warning', description: 'Check your input.', variant: 'warning' })}>
        Warning
      </button>
      <button type="button" onClick={() => toast({ title: 'Error', description: 'Something went wrong.', variant: 'danger' })}>
        Danger
      </button>
      <button type="button" onClick={() => toast({ title: 'Persistent', description: 'This will not auto-dismiss.', duration: 0 })}>
        Persistent
      </button>
    </div>
  );
}

export const WithProvider: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <ToastTriggerDemo />
    </ToastProvider>
  ),
  args: {} as any,
  parameters: {
    docs: {
      description: {
        story: 'Wrap your app in ToastProvider and use the useToast() hook to trigger toasts imperatively. Click the buttons to see toasts appear.',
      },
    },
  },
};

export const Accessibility: Story = {
  args: {
    variant: 'danger',
    title: 'Keyboard & screen reader notes',
    description: 'Danger toasts use role="alert" with aria-live="assertive". Others use role="status" with aria-live="polite". aria-atomic="true" ensures full announcement. The dismiss button is focusable via Tab.',
    duration: 0,
  },
};
