import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabsMotion } from '@arch-ui/components';

const sampleTabs = [
  { key: 'tab1', label: 'Overview' },
  { key: 'tab2', label: 'Settings' },
  { key: 'tab3', label: 'Activity' },
];

const meta = {
  title: 'Navigation/TabsMotion',
  component: TabsMotion,
  argTypes: {
    fill: { control: 'select', options: ['fixed', 'intrinsic'] },
  },
} satisfies Meta<typeof TabsMotion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    activeKey: 'tab1',
    onChange: () => {},
  },
  render: function Render(args) {
    const [activeKey, setActiveKey] = useState(args.activeKey);
    return <TabsMotion {...args} activeKey={activeKey} onChange={setActiveKey} />;
  },
};

export const Fixed: Story = {
  args: {
    tabs: sampleTabs,
    activeKey: 'tab1',
    fill: 'fixed',
    onChange: () => {},
  },
  render: function Render(args) {
    const [activeKey, setActiveKey] = useState(args.activeKey);
    return <TabsMotion {...args} activeKey={activeKey} onChange={setActiveKey} />;
  },
};

export const Intrinsic: Story = {
  args: {
    tabs: sampleTabs,
    activeKey: 'tab1',
    fill: 'intrinsic',
    onChange: () => {},
  },
  render: function Render(args) {
    const [activeKey, setActiveKey] = useState(args.activeKey);
    return <TabsMotion {...args} activeKey={activeKey} onChange={setActiveKey} />;
  },
};
