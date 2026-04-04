import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PinCode } from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/PinCode',
  component: PinCode,
  args: {
    value: '',
    length: 4,
    size: 'default',
  },
  render: function PinCodeStory(args) {
    const [value, setValue] = useState(args.value ?? '');
    return <PinCode {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof PinCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SixDigit: Story = {
  args: { length: 6 },
};

export const Masked: Story = {
  args: { mask: true },
};

export const Error: Story = {
  args: { error: true, value: '12' },
};

export const Disabled: Story = {
  args: { disabled: true, value: '1234' },
};

export const Sizes: Story = {
  render: function SizesStory() {
    const [v1, setV1] = useState('');
    const [v2, setV2] = useState('');
    const [v3, setV3] = useState('');
    const [v4, setV4] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <PinCode value={v1} onChange={setV1} size="mini" />
        <PinCode value={v2} onChange={setV2} size="compact" />
        <PinCode value={v3} onChange={setV3} size="default" />
        <PinCode value={v4} onChange={setV4} size="large" />
      </div>
    );
  },
};
