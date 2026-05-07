import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FlexGrid, FlexGridItem } from '@arch-ui/components';

const meta = {
  title: 'Containers and Layout/FlexGrid',
  component: FlexGrid,
} satisfies Meta<typeof FlexGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: '16px',
      backgroundColor: 'var(--color-background-secondary)',
      color: 'var(--color-text-default)',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

export const TwoColumns: Story = {
  render: () => (
    <FlexGrid>
      <FlexGridItem span={6}>
        <Cell>Column 1</Cell>
      </FlexGridItem>
      <FlexGridItem span={6}>
        <Cell>Column 2</Cell>
      </FlexGridItem>
    </FlexGrid>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <FlexGrid>
      <FlexGridItem span={4}>
        <Cell>Column 1</Cell>
      </FlexGridItem>
      <FlexGridItem span={4}>
        <Cell>Column 2</Cell>
      </FlexGridItem>
      <FlexGridItem span={4}>
        <Cell>Column 3</Cell>
      </FlexGridItem>
    </FlexGrid>
  ),
};

export const MixedSpans: Story = {
  render: () => (
    <FlexGrid>
      <FlexGridItem span={8}>
        <Cell>Span 8</Cell>
      </FlexGridItem>
      <FlexGridItem span={4}>
        <Cell>Span 4</Cell>
      </FlexGridItem>
      <FlexGridItem span={3}>
        <Cell>Span 3</Cell>
      </FlexGridItem>
      <FlexGridItem span={6}>
        <Cell>Span 6</Cell>
      </FlexGridItem>
      <FlexGridItem span={3}>
        <Cell>Span 3</Cell>
      </FlexGridItem>
    </FlexGrid>
  ),
};
