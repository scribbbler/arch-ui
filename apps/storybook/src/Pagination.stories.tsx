import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, type PaginationProps } from '@arch-ui/components';

function ControlledPagination(props: PaginationProps) {
  const [page, setPage] = useState(props.currentPage ?? 1);
  return <Pagination {...props} currentPage={page} onChange={(p) => { setPage(p); props.onChange?.(p); }} />;
}

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  argTypes: {
    size: { control: 'select', options: ['mini', 'compact', 'default', 'large'] },
    shape: { control: 'radio', options: ['circle', 'square'] },
    totalPages: { control: 'number' },
    showFirstLast: { control: 'boolean' },
    siblingCount: { control: 'number' },
  },
  args: {
    totalPages: 10,
    currentPage: 1,
    onChange: () => {},
    size: 'compact',
    shape: 'circle',
  },
  render: (args) => <ControlledPagination {...args} />,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Square: Story = {
  args: { shape: 'square' },
};

export const WithFirstLast: Story = {
  args: { totalPages: 20, showFirstLast: true },
};

export const SiblingCountTwo: Story = {
  args: { totalPages: 20, siblingCount: 2 },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const Mini: Story = {
  args: { size: 'mini' },
};

export const Compact: Story = {
  args: { size: 'compact' },
};

export const SizeDefault: Story = {
  args: { size: 'default' },
};

export const Large: Story = {
  args: { size: 'large' },
};

export const FewPages: Story = {
  args: { totalPages: 3 },
};
