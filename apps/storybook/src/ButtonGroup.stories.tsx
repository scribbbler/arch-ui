import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup, Button } from '@arch-ui/components';

function ButtonGroupDemo(
  props: Omit<React.ComponentProps<typeof ButtonGroup>, 'onChange'> & {
    onChange?: React.ComponentProps<typeof ButtonGroup>['onChange'];
  }
) {
  const [selected, setSelected] = useState<number | number[]>(props.selected ?? 0);

  const handleChange = (_event: React.MouseEvent, index: number) => {
    if (props.mode === 'checkbox') {
      setSelected((prev) => {
        const arr = Array.isArray(prev) ? prev : [];
        return arr.includes(index) ? arr.filter((i) => i !== index) : [...arr, index];
      });
    } else {
      setSelected(index);
    }
  };

  return (
    <ButtonGroup {...props} selected={selected} onChange={handleChange}>
      {props.children}
    </ButtonGroup>
  );
}

const meta = {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
  render: (args) => <ButtonGroupDemo {...args} />,
  argTypes: {
    mode: { control: 'radio', options: ['radio', 'checkbox'] },
    size: { control: 'select', options: ['mini', 'compact', 'default', 'large'] },
    shape: { control: 'radio', options: ['default', 'pill', 'circle', 'square'] },
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'dangerPrimary', 'dangerSecondary', 'dangerTertiary'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    kind: 'secondary',
    size: 'default',
    mode: 'radio',
    children: (
      <>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </>
    ),
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Default ────────────────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    selected: 0,
  },
};

/* ─── Radio Mode ─────────────────────────────────────────────────────────────── */

export const RadioMode: Story = {
  args: {
    mode: 'radio',
    selected: 1,
    children: (
      <>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </>
    ),
  },
};

/* ─── Checkbox Mode ──────────────────────────────────────────────────────────── */

export const CheckboxMode: Story = {
  args: {
    mode: 'checkbox',
    selected: [0, 2],
    children: (
      <>
        <Button>Bold</Button>
        <Button>Italic</Button>
        <Button>Underline</Button>
      </>
    ),
  },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      {(['mini', 'compact', 'default', 'large'] as const).map((size) => (
        <ButtonGroupDemo key={size} size={size} selected={0} kind="secondary">
          <Button>{size}</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroupDemo>
      ))}
    </div>
  ),
};

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    disabled: true,
    selected: 1,
    children: (
      <>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </>
    ),
  },
};
