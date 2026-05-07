import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatioBox } from '@arch-ui/components';

const meta = {
  title: 'Containers and Layout/AspectRatioBox',
  component: AspectRatioBox,
  argTypes: {
    aspectRatio: { control: 'number' },
  },
} satisfies Meta<typeof AspectRatioBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const Placeholder = ({ label }: { label: string }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-background-secondary)',
      color: 'var(--color-text-default)',
    }}
  >
    {label}
  </div>
);

export const Square: Story = {
  args: {
    aspectRatio: 1,
    children: <Placeholder label="1:1 Square" />,
  },
};

export const Widescreen: Story = {
  args: {
    aspectRatio: 16 / 9,
    children: <Placeholder label="16:9 Widescreen" />,
  },
};

export const Portrait: Story = {
  args: {
    aspectRatio: 3 / 4,
    children: <Placeholder label="3:4 Portrait" />,
  },
};
