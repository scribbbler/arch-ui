import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '@arch-ui/components';

function DialogDemo(props: React.ComponentProps<typeof Dialog>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <Dialog
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      />
    </>
  );
}

const meta = {
  title: 'Containers and Layout/Dialog',
  component: Dialog,
  render: (args) => <DialogDemo {...args} />,
  argTypes: {
    title: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    variant: { control: 'select', options: ['default', 'danger'] },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    title: 'Confirm action',
    children: 'Are you sure you want to proceed?',
    onClose: () => {},
    onConfirm: () => {},
  },
};

export const DangerVariant: Story = {
  args: {
    isOpen: false,
    title: 'Delete item?',
    children: 'This action cannot be undone.',
    variant: 'danger',
    confirmLabel: 'Delete',
    onClose: () => {},
    onConfirm: () => {},
  },
};
