import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@arch-ui/components';

function SampleRows() {
  return (
    <>
      <Tr>
        <Td>January</Td>
        <Td>$12,000</Td>
        <Td>120</Td>
      </Tr>
      <Tr>
        <Td>February</Td>
        <Td>$15,400</Td>
        <Td>154</Td>
      </Tr>
      <Tr>
        <Td>March</Td>
        <Td>$9,800</Td>
        <Td>98</Td>
      </Tr>
    </>
  );
}

function SampleTable(props: React.ComponentProps<typeof Table>) {
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th scope="col">Month</Th>
          <Th scope="col">Revenue</Th>
          <Th scope="col">Orders</Th>
        </Tr>
      </Thead>
      <Tbody>
        <SampleRows />
      </Tbody>
    </Table>
  );
}

const meta = {
  title: 'Data Display/Table',
  component: Table,
  render: (args) => <SampleTable {...args} />,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { caption: 'Monthly sales data' },
};

export const Striped: Story = {
  args: { caption: 'Monthly sales data', striped: true },
};

export const Bordered: Story = {
  args: { caption: 'Monthly sales data', bordered: true },
};

export const StripedAndBordered: Story = {
  args: { caption: 'Monthly sales data', striped: true, bordered: true },
};

export const SmallSize: Story = {
  args: { caption: 'Compact table', size: 'sm' },
};

export const MediumSize: Story = {
  args: { caption: 'Default size table', size: 'md' },
};
