import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimezonePicker } from '@arch-ui/components';

function TimezonePickerDemo(props: React.ComponentProps<typeof TimezonePicker>) {
  const [value, setValue] = useState<string | null>(props.value ?? null);
  return <TimezonePicker {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: 'Input and Selection/TimezonePicker',
  component: TimezonePicker,
  render: (args) => <TimezonePickerDemo {...args} />,
  argTypes: {
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['compact', 'default', 'large'] },
  },
} satisfies Meta<typeof TimezonePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Select timezone',
  },
};

export const WithValue: Story = {
  args: {
    value: 'America/New_York',
    'aria-label': 'Select timezone',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Select timezone',
  },
};
