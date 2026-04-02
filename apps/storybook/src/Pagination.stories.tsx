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

export const SiblingCountThree: Story = {
  args: { totalPages: 30, siblingCount: 3, showFirstLast: true },
};

export const FewPages: Story = {
  args: { totalPages: 3 },
};
