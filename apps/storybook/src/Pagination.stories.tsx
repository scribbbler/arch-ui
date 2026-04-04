import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@arch-ui/components';

function PaginationDemo(props: Omit<React.ComponentProps<typeof Pagination>, 'currentPage' | 'onChange'> & { currentPage?: number }) {
  const [page, setPage] = useState(props.currentPage ?? 1);
  return <Pagination {...props} currentPage={page} onChange={setPage} />;
}

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  argTypes: {
    size: { control: 'select', options: ['mini', 'compact', 'default', 'large'] },
  },
  render: (args) => <PaginationDemo {...args} />,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { totalPages: 10 },
};

export const WithFirstLast: Story = {
  args: { totalPages: 20, showFirstLast: true },
};

export const SiblingCountTwo: Story = {
  args: { totalPages: 20, siblingCount: 2 },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const Mini: Story = {
  args: { totalPages: 10, size: 'mini' },
};

export const Compact: Story = {
  args: { totalPages: 10, size: 'compact' },
};

export const SizeDefault: Story = {
  args: { totalPages: 10, size: 'default' },
};

export const Large: Story = {
  args: { totalPages: 10, size: 'large' },
};

export const FewPages: Story = {
  args: { totalPages: 3 },
};
