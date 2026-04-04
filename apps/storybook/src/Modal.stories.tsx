import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@arch-ui/components';

function ModalDemo(props: React.ComponentProps<typeof Modal>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader onClose={() => setIsOpen(false)}>Modal Title</ModalHeader>
        <ModalBody>
          <p>This is the modal body content. It can contain any React nodes.</p>
        </ModalBody>
        <ModalFooter>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={() => setIsOpen(false)}>Confirm</button>
        </ModalFooter>
      </Modal>
    </>
  );
}

const meta = {
  title: 'Containers and Layout/Modal',
  component: Modal,
  render: (args) => <ModalDemo {...args} />,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SmallSize: Story = {
  args: { size: 'sm' },
};

export const MediumSize: Story = {
  args: { size: 'md' },
};

export const LargeSize: Story = {
  args: { size: 'lg' },
};

export const ExtraLargeSize: Story = {
  args: { size: 'xl' },
};

export const FullSize: Story = {
  args: { size: 'full' },
};

export const NoCloseOnOverlayClick: Story = {
  args: { closeOnOverlayClick: false },
};

export const NoCloseOnEscape: Story = {
  args: { closeOnEscape: false },
};

export const NoCloseOnOverlayOrEscape: Story = {
  args: { closeOnOverlayClick: false, closeOnEscape: false },
};
