import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@arch-ui/components';

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
  </svg>
);

const meta = {
  title: 'Buttons/IconButton',
  component: IconButton,
  argTypes: {
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'dangerPrimary', 'dangerSecondary', 'dangerTertiary'],
    },
    size: { control: 'select', options: ['mini', 'compact', 'default', 'large'] },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
  args: {
    'aria-label': 'Close',
    icon: <CloseIcon />,
    kind: 'primary',
    size: 'default',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Kinds ─────────────────────────────────────────────────────────────────── */

export const Primary: Story = {
  args: { kind: 'primary' },
};

export const Secondary: Story = {
  args: { kind: 'secondary' },
};

export const Tertiary: Story = {
  args: { kind: 'tertiary' },
};

export const DangerPrimary: Story = {
  args: { kind: 'dangerPrimary', 'aria-label': 'Delete' },
};

export const DangerSecondary: Story = {
  args: { kind: 'dangerSecondary', 'aria-label': 'Delete' },
};

export const DangerTertiary: Story = {
  args: { kind: 'dangerTertiary', 'aria-label': 'Delete' },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const Mini: Story = {
  args: { size: 'mini' },
};

export const Compact: Story = {
  args: { size: 'compact' },
};

export const Default: Story = {
  args: { size: 'default' },
};

export const Large: Story = {
  args: { size: 'large' },
};

/* ─── States ─────────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { disabled: true },
};

export const Loading: Story = {
  args: { isLoading: true },
};
