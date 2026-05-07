import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Datepicker } from '@arch-ui/components';

function DatepickerDemo(props: React.ComponentProps<typeof Datepicker>) {
  const [value, setValue] = useState<Date | null>(props.value ?? null);
  return <Datepicker {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: 'Input and Selection/Datepicker',
  component: Datepicker,
  render: (args) => <DatepickerDemo {...args} />,
  argTypes: {
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['compact', 'default', 'large'] },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Select date',
  },
};

export const WithValue: Story = {
  args: {
    value: new Date(2025, 5, 15),
    'aria-label': 'Select date',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Select date',
  },
};

export const Compact: Story = {
  args: {
    size: 'compact',
    'aria-label': 'Select date',
  },
};
