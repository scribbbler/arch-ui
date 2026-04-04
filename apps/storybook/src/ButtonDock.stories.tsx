import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonDock, Button, Link } from '@arch-ui/components';

const meta = {
  title: 'Containers and Layout/ButtonDock',
  component: ButtonDock,
  argTypes: {
    position: { control: 'select', options: ['fixed', 'sticky'] },
  },
  args: {
    position: 'fixed',
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ButtonDock>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Default ────────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => (
    <div style={{ minHeight: '200vh', padding: '2rem' }}>
      <p>Scroll down to see the ButtonDock fixed to the bottom.</p>
      <ButtonDock
        {...args}
        primaryAction={<Button kind="primary">Submit</Button>}
      />
    </div>
  ),
};

/* ─── WithSecondary ──────────────────────────────────────────────────────────── */

export const WithSecondary: Story = {
  render: (args) => (
    <div style={{ minHeight: '200vh', padding: '2rem' }}>
      <p>ButtonDock with primary and secondary actions.</p>
      <ButtonDock
        {...args}
        primaryAction={<Button kind="primary">Save</Button>}
        secondaryAction={<Button kind="secondary">Save Draft</Button>}
      />
    </div>
  ),
};

/* ─── WithDismiss ────────────────────────────────────────────────────────────── */

export const WithDismiss: Story = {
  render: (args) => (
    <div style={{ minHeight: '200vh', padding: '2rem' }}>
      <p>ButtonDock with primary, secondary, and dismiss actions.</p>
      <ButtonDock
        {...args}
        primaryAction={<Button kind="primary">Confirm</Button>}
        secondaryAction={<Button kind="secondary">Back</Button>}
        dismissAction={<Link href="#">Cancel</Link>}
      />
    </div>
  ),
};

/* ─── Sticky ─────────────────────────────────────────────────────────────────── */

export const Sticky: Story = {
  args: {
    position: 'sticky',
  },
  render: (args) => (
    <div style={{ height: '400px', overflow: 'auto', border: '1px solid #ccc' }}>
      <div style={{ minHeight: '800px', padding: '2rem' }}>
        <p>Scroll inside this container to see the sticky ButtonDock.</p>
        <div style={{ height: '600px' }} />
        <ButtonDock
          {...args}
          primaryAction={<Button kind="primary">Submit</Button>}
          secondaryAction={<Button kind="secondary">Cancel</Button>}
        />
      </div>
    </div>
  ),
};
