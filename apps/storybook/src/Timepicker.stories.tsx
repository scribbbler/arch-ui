import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Timepicker } from '@arch-ui/components';

function TimepickerDemo(props: React.ComponentProps<typeof Timepicker>) {
  const [value, setValue] = useState<string | null>(props.value ?? null);
  return <Timepicker {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: 'Input and Selection/Timepicker',
  component: Timepicker,
  render: (args) => <TimepickerDemo {...args} />,
  argTypes: {
    format: { control: 'select', options: ['12', '24'] },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['compact', 'default', 'large'] },
  },
} satisfies Meta<typeof Timepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Select time',
  },
};

export const Format24: Story = {
  args: {
    format: '24',
    'aria-label': 'Select time',
  },
};

export const CustomStep: Story = {
  args: {
    step: 15,
    'aria-label': 'Select time',
  },
};
