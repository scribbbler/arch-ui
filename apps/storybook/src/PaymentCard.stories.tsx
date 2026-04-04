import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PaymentCard } from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/PaymentCard',
  component: PaymentCard,
  args: {
    size: 'default',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return (
      <PaymentCard
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
} satisfies Meta<typeof PaymentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Visa: Story = {
  args: { value: '4111111111111111' },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return <PaymentCard {...args} value={value} onChange={setValue} />;
  },
};

export const Mastercard: Story = {
  args: { value: '5500000000000004' },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return <PaymentCard {...args} value={value} onChange={setValue} />;
  },
};

export const Amex: Story = {
  args: { value: '340000000000009' },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    return <PaymentCard {...args} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: '4111111111111111' },
};

export const Error: Story = {
  args: { error: true },
  render: (args) => {
    const [value, setValue] = useState('');
    return <PaymentCard {...args} value={value} onChange={setValue} />;
  },
};
