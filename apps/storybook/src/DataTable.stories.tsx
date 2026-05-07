import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '@arch-ui/components';

const sampleColumns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'email', title: 'Email' },
  { key: 'role', title: 'Role', sortable: true },
];

const sampleData = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Engineer' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' },
  { name: 'Carol Williams', email: 'carol@example.com', role: 'Manager' },
  { name: 'David Brown', email: 'david@example.com', role: 'Engineer' },
];

const meta = {
  title: 'Data and Tables/DataTable',
  component: DataTable,
  argTypes: {
    sortable: { control: 'boolean' },
    resizable: { control: 'boolean' },
    loading: { control: 'boolean' },
    emptyMessage: { control: 'text' },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

export const Sortable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    sortable: true,
  },
};

export const Loading: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    emptyMessage: 'No records found.',
  },
};
