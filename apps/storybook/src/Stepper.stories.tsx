import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/Stepper',
  component: Stepper,
  args: {
    value: 1,
    size: 'default',
  },
  render: function StepperStory(args) {
    const [value, setValue] = useState(args.value ?? 1);
    return <Stepper {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMinMax: Story = {
  args: { min: 0, max: 10, value: 5 },
};

export const CustomStep: Story = {
  args: { step: 5, value: 10, min: 0, max: 100 },
};

export const Disabled: Story = {
  args: { disabled: true, value: 3 },
};

export const Sizes: Story = {
  render: function SizesStory() {
    const [v1, setV1] = useState(1);
    const [v2, setV2] = useState(2);
    const [v3, setV3] = useState(3);
    const [v4, setV4] = useState(4);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <Stepper value={v1} onChange={setV1} size="mini" />
        <Stepper value={v2} onChange={setV2} size="compact" />
        <Stepper value={v3} onChange={setV3} size="default" />
        <Stepper value={v4} onChange={setV4} size="large" />
      </div>
    );
  },
};
