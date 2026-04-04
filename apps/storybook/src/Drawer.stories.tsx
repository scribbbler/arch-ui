import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '@arch-ui/components';

function DrawerDemo(props: React.ComponentProps<typeof Drawer>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      <Drawer {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '1rem' }}>
          <h2>Drawer Content</h2>
          <p>This is the drawer panel content.</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Drawer>
    </>
  );
}

const meta = {
  title: 'Containers and Layout/Drawer',
  component: Drawer,
  render: (args) => <DrawerDemo {...args} />,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const End: Story = {
  args: { position: 'end', 'aria-label': 'Navigation drawer' },
};

export const Start: Story = {
  args: { position: 'start', 'aria-label': 'Navigation drawer' },
};

export const Top: Story = {
  args: { position: 'top', size: '12rem', 'aria-label': 'Top drawer' },
};

export const Bottom: Story = {
  args: { position: 'bottom', size: '12rem', 'aria-label': 'Bottom drawer' },
};

export const CustomSize: Story = {
  args: { position: 'end', size: '30rem', 'aria-label': 'Wide drawer' },
};
