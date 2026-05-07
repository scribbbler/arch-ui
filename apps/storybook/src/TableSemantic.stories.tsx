import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableSemantic } from '@arch-ui/components';

const meta = {
  title: 'Data and Tables/TableSemantic',
  component: TableSemantic,
  argTypes: {
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['compact', 'default', 'spacious'],
    },
  },
} satisfies Meta<typeof TableSemantic>;

export default meta;
type Story = StoryObj<typeof meta>;

const TableContent = () => (
  <>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Role</th>
        <th scope="col">Department</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alice Johnson</td>
        <td>Engineer</td>
        <td>Platform</td>
      </tr>
      <tr>
        <td>Bob Smith</td>
        <td>Designer</td>
        <td>Product</td>
      </tr>
      <tr>
        <td>Carol Williams</td>
        <td>Manager</td>
        <td>Engineering</td>
      </tr>
      <tr>
        <td>David Brown</td>
        <td>Analyst</td>
        <td>Data</td>
      </tr>
    </tbody>
  </>
);

export const Default: Story = {
  args: {},
  render: (args) => (
    <TableSemantic {...args}>
      <TableContent />
    </TableSemantic>
  ),
};

export const Striped: Story = {
  args: {
    striped: true,
  },
  render: (args) => (
    <TableSemantic {...args}>
      <TableContent />
    </TableSemantic>
  ),
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
  },
  render: (args) => (
    <TableSemantic {...args}>
      <TableContent />
    </TableSemantic>
  ),
};

export const Compact: Story = {
  args: {
    size: 'compact',
    striped: true,
    hoverable: true,
  },
  render: (args) => (
    <TableSemantic {...args}>
      <TableContent />
    </TableSemantic>
  ),
};
