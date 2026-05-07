import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DndList } from '@arch-ui/components';

interface DndItem {
  id: string;
  label: React.ReactNode;
}

function DndListDemo(props: React.ComponentProps<typeof DndList>) {
  const [items, setItems] = useState<DndItem[]>(props.items ?? []);
  return <DndList {...props} items={items} onChange={setItems} />;
}

const meta = {
  title: 'Input and Selection/DndList',
  component: DndList,
  render: (args) => <DndListDemo {...args} />,
  argTypes: {
    removable: { control: 'boolean' },
  },
} satisfies Meta<typeof DndList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Reorderable list',
    items: [
      { id: '1', label: 'First item' },
      { id: '2', label: 'Second item' },
      { id: '3', label: 'Third item' },
    ],
  },
};

export const Removable: Story = {
  args: {
    'aria-label': 'Reorderable list',
    removable: true,
    items: [
      { id: '1', label: 'Task A' },
      { id: '2', label: 'Task B' },
      { id: '3', label: 'Task C' },
    ],
  },
};
