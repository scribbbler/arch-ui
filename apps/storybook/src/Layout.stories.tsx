import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Layout, LayoutHeader, LayoutSidebar, LayoutContent, LayoutFooter } from '@arch-ui/components';

const meta = {
  title: 'Containers and Layout/Layout',
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

const sectionStyle = (bg: string): React.CSSProperties => ({
  padding: '16px',
  backgroundColor: bg,
  color: 'var(--color-text-default)',
});

export const Default: Story = {
  render: () => (
    <Layout>
      <LayoutHeader>
        <div style={sectionStyle('var(--color-background-secondary)')}>Header</div>
      </LayoutHeader>
      <LayoutSidebar>
        <div style={sectionStyle('var(--color-background-tertiary)')}>Sidebar</div>
      </LayoutSidebar>
      <LayoutContent>
        <div style={sectionStyle('var(--color-background-primary)')}>Main Content</div>
      </LayoutContent>
      <LayoutFooter>
        <div style={sectionStyle('var(--color-background-secondary)')}>Footer</div>
      </LayoutFooter>
    </Layout>
  ),
};

export const NoSidebar: Story = {
  render: () => (
    <Layout>
      <LayoutHeader>
        <div style={sectionStyle('var(--color-background-secondary)')}>Header</div>
      </LayoutHeader>
      <LayoutContent>
        <div style={sectionStyle('var(--color-background-primary)')}>
          Main Content (full width, no sidebar)
        </div>
      </LayoutContent>
      <LayoutFooter>
        <div style={sectionStyle('var(--color-background-secondary)')}>Footer</div>
      </LayoutFooter>
    </Layout>
  ),
};
