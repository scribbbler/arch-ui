import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageControl } from '@arch-ui/components';

const meta = {
  title: 'Navigation/PageControl',
  component: PageControl,
  argTypes: {
    numPages: { control: 'number' },
    currentPage: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof PageControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    numPages: 5,
    currentPage: 0,
    onChange: () => {},
  },
  render: function Render(args) {
    const [page, setPage] = useState(args.currentPage);
    return <PageControl {...args} currentPage={page} onChange={setPage} />;
  },
};

export const FivePages: Story = {
  args: {
    numPages: 5,
    currentPage: 2,
    size: 'md',
    onChange: () => {},
  },
  render: function Render(args) {
    const [page, setPage] = useState(args.currentPage);
    return <PageControl {...args} currentPage={page} onChange={setPage} />;
  },
};
