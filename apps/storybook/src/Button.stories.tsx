import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@arch-ui/components';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'link'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Variants ───────────────────────────────────────────────────────────────── */

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link action' },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const SizeSmall: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const SizeMedium: Story = {
  args: { size: 'md', children: 'Medium' },
};

export const SizeLarge: Story = {
  args: { size: 'lg', children: 'Large' },
};

/* ─── States ─────────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const Loading: Story = {
  args: { loading: true, children: 'Save' },
};

export const LoadingWithText: Story = {
  args: { loading: true, loadingText: 'Saving…', children: 'Save' },
};

/* ─── With Icons ─────────────────────────────────────────────────────────────── */

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.97-2.97H3a.75.75 0 0 1 0-1.5h8.19L8.22 4.03a.75.75 0 0 1 0-1.06Z" />
  </svg>
);

export const WithLeftIcon: Story = {
  args: { leftIcon: <PlusIcon />, children: 'Add item' },
};

export const WithRightIcon: Story = {
  args: { rightIcon: <ArrowIcon />, children: 'Continue' },
};

export const WithBothIcons: Story = {
  args: { leftIcon: <PlusIcon />, rightIcon: <ArrowIcon />, children: 'Next' },
};

/* ─── Full Width ─────────────────────────────────────────────────────────────── */

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full Width' },
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  args: { children: 'Accessible Button' },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Tab` to focus, `Enter` or `Space` to activate. ' +
          'Focus is indicated by a 2px outline using `var(--color-border-focus)`. ' +
          'When loading, `aria-busy="true"` is set and the button is disabled. ' +
          'Disabled state uses both `disabled` attribute and `aria-disabled`.',
      },
    },
  },
};
