import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Overlay } from '@arch-ui/components';

const meta = {
  title: 'Utilities/Overlay',
  component: Overlay,
  argTypes: {
    transparent: { control: 'boolean' },
  },
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Visible: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <p>Content behind the overlay.</p>
        <Story />
      </div>
    ),
  ],
};

export const Transparent: Story = {
  args: { transparent: true },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <p>Content behind a transparent overlay (click detection without dimming).</p>
        <Story />
      </div>
    ),
  ],
};
