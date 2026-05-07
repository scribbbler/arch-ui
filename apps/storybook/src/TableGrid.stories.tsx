import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableGrid, TableGridHeader, TableGridCell } from '@arch-ui/components';

const meta = {
  title: 'Data and Tables/TableGrid',
  component: TableGrid,
  argTypes: {
    columns: { control: 'text' },
  },
} satisfies Meta<typeof TableGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: '1fr 2fr 1fr',
  },
  render: (args) => (
    <TableGrid columns={args.columns}>
      <TableGridHeader>Name</TableGridHeader>
      <TableGridHeader>Description</TableGridHeader>
      <TableGridHeader>Status</TableGridHeader>
      <TableGridCell>Item A</TableGridCell>
      <TableGridCell>A component for displaying tabular data in a grid layout</TableGridCell>
      <TableGridCell>Active</TableGridCell>
      <TableGridCell>Item B</TableGridCell>
      <TableGridCell>Another row of data with a longer description text</TableGridCell>
      <TableGridCell>Inactive</TableGridCell>
      <TableGridCell>Item C</TableGridCell>
      <TableGridCell>A third row for demonstration purposes</TableGridCell>
      <TableGridCell>Pending</TableGridCell>
    </TableGrid>
  ),
};
