import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FocusTrap } from '@arch-ui/components';

const meta = {
  title: 'Accessibility/FocusTrap',
  component: FocusTrap,
} satisfies Meta<typeof FocusTrap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    active: true,
    children: (
      <div style={{ padding: 24, border: '2px solid #6366f1', borderRadius: 8 }}>
        <p style={{ marginBottom: 12 }}>Focus is trapped within this container. Use Tab to cycle.</p>
        <button type="button" style={{ marginRight: 8 }}>First</button>
        <button type="button" style={{ marginRight: 8 }}>Second</button>
        <button type="button">Third</button>
      </div>
    ),
  },
};

export const Toggleable: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setActive(true)} style={{ marginBottom: 16 }}>
          Activate trap
        </button>
        <FocusTrap active={active}>
          <div style={{ padding: 24, border: active ? '2px solid #6366f1' : '2px dashed #ccc', borderRadius: 8 }}>
            <p style={{ marginBottom: 12 }}>{active ? 'Trap is active' : 'Trap is inactive'}</p>
            <button type="button" style={{ marginRight: 8 }}>Action A</button>
            <button type="button" style={{ marginRight: 8 }}>Action B</button>
            <button type="button" onClick={() => setActive(false)}>Deactivate</button>
          </div>
        </FocusTrap>
      </div>
    );
  },
};
