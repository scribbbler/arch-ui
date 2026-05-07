import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sheet } from '@arch-ui/components';

const meta = {
  title: 'Containers and Layout/Sheet',
  component: Sheet,
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    onClose: { action: 'onClose' },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Sheet Title',
    children: 'This is the sheet content. You can place any elements here.',
  },
  render: function SheetStory(args) {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    return (
      <>
        <button type="button" onClick={() => setIsOpen(true)}>
          Open Sheet
        </button>
        <Sheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  },
};
