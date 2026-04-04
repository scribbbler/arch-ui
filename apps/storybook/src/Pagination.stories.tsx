import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@arch-ui/components';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  argTypes: {
    size: { control: 'select', options: ['mini', 'compact', 'default', 'large'] },
    shape: { control: 'radio', options: ['default', 'pill', 'circle', 'square'] },
    totalPages: { control: 'number' },
    showFirstLast: { control: 'boolean' },
    siblingCount: { control: 'number' },
  },
  args: {
    totalPages: 10,
    size: 'compact',
    shape: 'default',
  },
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onChange={setPage} />;
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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

/* ─── Shapes ─────────────────────────────────────────────────────────────────── */

export const Pill: Story = {
  args: { shape: 'pill' },
};

export const Circle: Story = {
  args: { shape: 'circle' },
};

export const SquareShape: Story = {
  args: { shape: 'square' },
};

export const FewPages: Story = {
  args: { totalPages: 3 },
};
