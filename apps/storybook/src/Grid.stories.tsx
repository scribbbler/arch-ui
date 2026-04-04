import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid, Box } from '@arch-ui/components';

const meta = {
  title: 'Containers and Layout/Grid',
  component: Grid,
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Cell = ({ children }: { children: React.ReactNode }) => (
  <Box padding="spacing-component-sm" background="color-surface-secondary" border="color-border-default" radius="border-radius-sm">
    {children}
  </Box>
);

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: 'spacing-component-md',
    children: (
      <>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
        <Cell>4</Cell>
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    gap: 'spacing-component-md',
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <Cell key={i}>Cell {i + 1}</Cell>
        ))}
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: 'spacing-component-sm',
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <Cell key={i}>{i + 1}</Cell>
        ))}
      </>
    ),
  },
};

export const AutoFill: Story = {
  args: {
    columns: 'auto',
    gap: 'spacing-component-md',
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <Cell key={i}>Auto {i + 1}</Cell>
        ))}
      </>
    ),
  },
};

export const Responsive: Story = {
  args: {
    columns: { base: 1, sm: 2, md: 3, lg: 4 },
    gap: 'spacing-component-md',
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <Cell key={i}>Item {i + 1}</Cell>
        ))}
      </>
    ),
  },
};

export const DifferentRowAndColGap: Story = {
  args: {
    columns: 3,
    rowGap: 'spacing-layout-md',
    colGap: 'spacing-component-sm',
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <Cell key={i}>Cell {i + 1}</Cell>
        ))}
      </>
    ),
  },
};
