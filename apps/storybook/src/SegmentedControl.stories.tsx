import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from '@arch-ui/components';

const sampleOptions = [
  { label: 'Day', id: 'day' },
  { label: 'Week', id: 'week' },
  { label: 'Month', id: 'month' },
];

function SegmentedControlDemo(
  props: Omit<React.ComponentProps<typeof SegmentedControl>, 'onChange'> & {
    onChange?: React.ComponentProps<typeof SegmentedControl>['onChange'];
  }
) {
  const [activeId, setActiveId] = useState(props.activeId ?? props.options[0]?.id ?? '');
  return <SegmentedControl {...props} activeId={activeId} onChange={setActiveId} />;
}

const meta = {
  title: 'Buttons/SegmentedControl',
  component: SegmentedControl,
  render: (args) => <SegmentedControlDemo {...args} />,
  argTypes: {
    size: { control: 'select', options: ['mini', 'compact', 'default', 'large'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    options: sampleOptions,
    activeId: 'week',
    size: 'default',
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Default ────────────────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    activeId: 'week',
  },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      {(['mini', 'compact', 'default', 'large'] as const).map((size) => (
        <SegmentedControlDemo
          key={size}
          options={[
            { label: 'Day', id: 'day' },
            { label: 'Week', id: 'week' },
            { label: 'Month', id: 'month' },
          ]}
          activeId="week"
          size={size}
        />
      ))}
    </div>
  ),
};

/* ─── Full Width ─────────────────────────────────────────────────────────────── */

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    activeId: 'day',
  },
};

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    disabled: true,
    activeId: 'week',
  },
};
