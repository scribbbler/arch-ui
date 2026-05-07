import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tile } from '@arch-ui/components';

const meta = {
  title: 'Content Display/Tile',
  component: Tile,
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Tile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tile',
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    children: 'Selected Tile',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Tile',
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div style={{ padding: '16px' }}>
        <strong>Tile Title</strong>
        <p>This tile contains descriptive text to demonstrate content rendering inside a Tile.</p>
      </div>
    ),
  },
};
