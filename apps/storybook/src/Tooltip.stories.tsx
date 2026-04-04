import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@arch-ui/components';

const meta = {
  title: 'Messaging/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <div style={{ padding: '6rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    content: 'Tooltip on top',
    position: 'top',
    children: <button>Hover me</button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    position: 'bottom',
    children: <button>Hover me</button>,
  },
};

export const Start: Story = {
  args: {
    content: 'Tooltip on start',
    position: 'start',
    children: <button>Hover me</button>,
  },
};

export const End: Story = {
  args: {
    content: 'Tooltip on end',
    position: 'end',
    children: <button>Hover me</button>,
  },
};

export const NoDelay: Story = {
  args: {
    content: 'Instant tooltip',
    position: 'top',
    delay: 0,
    children: <button>Hover me (no delay)</button>,
  },
};

export const LongDelay: Story = {
  args: {
    content: 'Delayed tooltip',
    position: 'top',
    delay: 1000,
    children: <button>Hover me (1s delay)</button>,
  },
};
