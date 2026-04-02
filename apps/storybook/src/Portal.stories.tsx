import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Portal } from '@arch-ui/components';

const meta = {
  title: 'Utilities/Portal',
  component: Portal,
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 16, border: '2px dashed #ccc', borderRadius: 8 }}>
      <p>This content is inside the parent container.</p>
      <Portal>
        <div
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            padding: 16,
            background: '#1a1a2e',
            color: '#fff',
            borderRadius: 8,
            zIndex: 9999,
          }}
        >
          Portaled to document.body
        </div>
      </Portal>
    </div>
  ),
};
