import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '@arch-ui/components';

const CircleSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const meta = {
  title: 'Utilities/Icon',
  component: Icon,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'text' },
    title: { control: 'text' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    children: <CircleSvg />,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: <CircleSvg />,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: <CircleSvg />,
  },
};

export const WithTitle: Story = {
  args: {
    size: 'md',
    title: 'Circle icon',
    children: <CircleSvg />,
  },
};
