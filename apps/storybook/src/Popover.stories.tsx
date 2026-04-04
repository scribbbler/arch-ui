import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from '@arch-ui/components';

function PopoverDemo(props: Omit<React.ComponentProps<typeof Popover>, 'children' | 'isOpen' | 'onClose' | 'content'> & { content?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ padding: '6rem', display: 'flex', justifyContent: 'center' }}>
      <Popover
        {...props}
        content={props.content ?? <div style={{ padding: '1rem' }}>Popover content goes here</div>}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <button onClick={() => setIsOpen((o) => !o)}>Toggle Popover</button>
      </Popover>
    </div>
  );
}

const meta = {
  title: 'Containers and Layout/Popover',
  component: Popover,
  render: (args) => <PopoverDemo {...args} />,
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bottom: Story = {
  args: { position: 'bottom' },
};

export const Top: Story = {
  args: { position: 'top' },
};

export const Start: Story = {
  args: { position: 'start' },
};

export const End: Story = {
  args: { position: 'end' },
};
