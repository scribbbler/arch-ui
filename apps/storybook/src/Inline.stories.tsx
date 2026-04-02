import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Inline, Box } from '@arch-ui/components';

const meta = {
  title: 'Layout/Inline',
  component: Inline,
  argTypes: {
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'space-between'] },
    wrap: { control: 'boolean' },
  },
} satisfies Meta<typeof Inline>;

export default meta;
type Story = StoryObj<typeof meta>;

const Tag = ({ children }: { children: React.ReactNode }) => (
  <Box padding="spacing-component-xs" background="color-surface-secondary" border="color-border-default" radius="border-radius-sm">
    {children}
  </Box>
);

export const Default: Story = {
  args: {
    gap: 'spacing-component-md',
    children: (
      <>
        <Tag>Alpha</Tag>
        <Tag>Beta</Tag>
        <Tag>Gamma</Tag>
      </>
    ),
  },
};

export const SmallGap: Story = {
  args: {
    gap: 'spacing-component-xs',
    children: (
      <>
        <Tag>One</Tag>
        <Tag>Two</Tag>
        <Tag>Three</Tag>
        <Tag>Four</Tag>
      </>
    ),
  },
};

export const CenterAligned: Story = {
  args: {
    gap: 'spacing-component-md',
    align: 'center',
    children: (
      <>
        <Box padding="spacing-component-xs" background="color-surface-secondary">Small</Box>
        <Box padding="spacing-component-md" background="color-surface-secondary">Taller</Box>
        <Box padding="spacing-component-xs" background="color-surface-secondary">Small</Box>
      </>
    ),
  },
};

export const SpaceBetween: Story = {
  args: {
    gap: 'spacing-component-md',
    justify: 'space-between',
    children: (
      <>
        <Tag>Left</Tag>
        <Tag>Right</Tag>
      </>
    ),
  },
};

export const Wrapping: Story = {
  args: {
    gap: 'spacing-component-sm',
    wrap: true,
    children: (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <Tag key={i}>Item {i + 1}</Tag>
        ))}
      </>
    ),
  },
};

export const NoWrap: Story = {
  args: {
    gap: 'spacing-component-sm',
    wrap: false,
    children: (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <Tag key={i}>Item {i + 1}</Tag>
        ))}
      </>
    ),
  },
};
