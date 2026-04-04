import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@arch-ui/components';

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

const meta = {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'dangerPrimary', 'dangerSecondary', 'dangerTertiary'],
    },
    size: { control: 'select', options: ['mini', 'compact', 'default', 'large'] },
    shape: { control: 'radio', options: ['default', 'pill', 'circle', 'square'] },
    isSelected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    kind: 'primary',
    size: 'default',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Kinds ─────────────────────────────────────────────────────────────────── */

export const Primary: Story = {
  args: { kind: 'primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { kind: 'secondary', children: 'Secondary' },
};

export const Tertiary: Story = {
  args: { kind: 'tertiary', children: 'Tertiary' },
};

export const DangerPrimary: Story = {
  args: { kind: 'dangerPrimary', children: 'Delete' },
};

export const DangerSecondary: Story = {
  args: { kind: 'dangerSecondary', children: 'Delete' },
};

export const DangerTertiary: Story = {
  args: { kind: 'dangerTertiary', children: 'Delete' },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const Mini: Story = {
  args: { size: 'mini', children: 'Mini' },
};

export const Compact: Story = {
  args: { size: 'compact', children: 'Compact' },
};

export const Default: Story = {
  args: { size: 'default', children: 'Default' },
};

export const Large: Story = {
  args: { size: 'large', children: 'Large' },
};

/* ─── Shapes ─────────────────────────────────────────────────────────────────── */

export const Pill: Story = {
  args: { shape: 'pill', children: 'Pill' },
};

export const CircleIcon: Story = {
  args: { shape: 'circle', startEnhancer: <PlusIcon />, children: undefined },
};

export const CircleLabel: Story = {
  args: { shape: 'circle', children: '1' },
};

export const SquareIcon: Story = {
  args: { shape: 'square', startEnhancer: <PlusIcon />, children: undefined },
};

export const SquareLabel: Story = {
  args: { shape: 'square', children: 'A' },
};

/* ─── States ─────────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const Loading: Story = {
  args: { isLoading: true, children: 'Save' },
};

export const LoadingWithText: Story = {
  args: { isLoading: true, loadingText: 'Saving…', children: 'Save' },
};

export const Selected: Story = {
  args: { kind: 'secondary', isSelected: true, children: 'Selected' },
};

/* ─── With Enhancers ─────────────────────────────────────────────────────────── */

export const StartEnhancer: Story = {
  args: { startEnhancer: <PlusIcon />, children: 'Add item' },
};

export const EndEnhancer: Story = {
  args: { endEnhancer: <ArrowIcon />, children: 'Continue' },
};

export const BothEnhancers: Story = {
  args: { startEnhancer: <PlusIcon />, endEnhancer: <ArrowIcon />, children: 'Next' },
};

/* ─── Full Width ─────────────────────────────────────────────────────────────── */

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full Width' },
};

/* ─── Usage Examples (Do/Don't) ──────────────────────────────────────────────── */

export const DoPrimaryWithCancel: Story = {
  name: 'Do: Primary + Tertiary',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button kind="primary">Save</Button>
      <Button kind="tertiary">Cancel</Button>
    </div>
  ),
};

export const DoDangerForDestructive: Story = {
  name: 'Do: Danger for destructive',
  args: { kind: 'dangerPrimary', children: 'Delete account' },
};

export const DontTwoPrimaries: Story = {
  name: "Don't: Two primaries",
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button kind="primary">Save</Button>
      <Button kind="primary">Cancel</Button>
    </div>
  ),
};

export const DontDangerForContinue: Story = {
  name: "Don't: Danger for non-destructive",
  args: { kind: 'dangerPrimary', children: 'Continue' },
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  args: { children: 'Accessible Button' },
  parameters: {
    docs: {
      description: {
        story:
          'Tab to focus, Enter or Space to activate. ' +
          'When loading, aria-busy="true" is set. ' +
          'Disabled uses both disabled attribute and aria-disabled.',
      },
    },
  },
};
