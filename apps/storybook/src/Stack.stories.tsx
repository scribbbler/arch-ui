import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Box } from '@arch-ui/components';

const meta = {
  title: 'Containers and Layout/Stack',
  component: Stack,
  argTypes: {
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'space-between'] },
    direction: { control: 'select', options: ['column', 'column-reverse'] },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Placeholder = ({ label }: { label: string }) => (
  <Box padding="spacing-component-sm" background="color-surface-secondary" border="color-border-default">
    {label}
  </Box>
);

export const Default: Story = {
  args: {
    gap: 'spacing-component-md',
    children: (
      <>
        <Placeholder label="Item 1" />
        <Placeholder label="Item 2" />
        <Placeholder label="Item 3" />
      </>
    ),
  },
};

export const SmallGap: Story = {
  args: {
    gap: 'spacing-component-xs',
    children: (
      <>
        <Placeholder label="Item 1" />
        <Placeholder label="Item 2" />
        <Placeholder label="Item 3" />
      </>
    ),
  },
};

export const LargeGap: Story = {
  args: {
    gap: 'spacing-layout-lg',
    children: (
      <>
        <Placeholder label="Item 1" />
        <Placeholder label="Item 2" />
        <Placeholder label="Item 3" />
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
        <Box padding="spacing-component-sm" background="color-surface-secondary">Short</Box>
        <Box padding="spacing-component-sm" background="color-surface-secondary">A longer item</Box>
        <Box padding="spacing-component-sm" background="color-surface-secondary">Mid</Box>
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
        <Placeholder label="Top" />
        <Placeholder label="Bottom" />
      </>
    ),
  },
  decorators: [(Story) => <div style={{ height: 300 }}><Story /></div>],
};
