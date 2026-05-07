import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '@arch-ui/components';

function RatingDemo(props: React.ComponentProps<typeof Rating>) {
  const [value, setValue] = useState(props.value ?? 0);
  return <Rating {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: 'Input and Selection/Rating',
  component: Rating,
  render: (args) => <RatingDemo {...args} />,
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 10, step: 0.5 } },
    count: { control: { type: 'number', min: 1, max: 10 } },
    readOnly: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    'aria-label': 'Product rating',
  },
};

export const ReadOnly: Story = {
  args: {
    value: 3.5,
    readOnly: true,
    'aria-label': 'Average rating',
  },
};

export const SmallSize: Story = {
  args: {
    value: 4,
    size: 'sm',
    'aria-label': 'Rating',
  },
};

export const CustomCount: Story = {
  args: {
    value: 7,
    count: 10,
    'aria-label': 'Score',
  },
};
