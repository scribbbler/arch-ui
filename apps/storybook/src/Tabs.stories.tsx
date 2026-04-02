import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '@arch-ui/components';

const sampleTabs = [
  { label: 'Overview', value: 'overview', content: <p>Overview panel content.</p> },
  { label: 'Settings', value: 'settings', content: <p>Settings panel content.</p> },
  { label: 'Billing', value: 'billing', content: <p>Billing panel content.</p> },
];

const tabsWithDisabled = [
  { label: 'Overview', value: 'overview', content: <p>Overview panel content.</p> },
  { label: 'Settings', value: 'settings', content: <p>Settings panel content.</p>, disabled: true },
  { label: 'Billing', value: 'billing', content: <p>Billing panel content.</p> },
];

function TabsDemo(props: Omit<React.ComponentProps<typeof Tabs>, 'activeValue' | 'onChange'> & { activeValue?: string }) {
  const [active, setActive] = useState(props.activeValue ?? props.tabs[0]?.value ?? '');
  return <Tabs {...props} activeValue={active} onChange={setActive} />;
}

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  render: (args) => <TabsDemo {...args} />,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {
  args: { tabs: sampleTabs, variant: 'line' },
};

export const Enclosed: Story = {
  args: { tabs: sampleTabs, variant: 'enclosed' },
};

export const Vertical: Story = {
  args: { tabs: sampleTabs, variant: 'line', orientation: 'vertical' },
};

export const VerticalEnclosed: Story = {
  args: { tabs: sampleTabs, variant: 'enclosed', orientation: 'vertical' },
};

export const WithDisabledTab: Story = {
  args: { tabs: tabsWithDisabled, variant: 'line' },
};
