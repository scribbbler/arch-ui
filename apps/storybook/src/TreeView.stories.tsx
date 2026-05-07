import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TreeView } from '@arch-ui/components';

const meta = {
  title: 'Content Display/TreeView',
  component: TreeView,
  argTypes: {
    onToggle: { action: 'onToggle' },
    onSelect: { action: 'onSelect' },
    selectedId: { control: 'text' },
  },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: '1',
    label: 'Documents',
    isExpanded: true,
    children: [
      { id: '1-1', label: 'Resume.pdf' },
      { id: '1-2', label: 'Cover Letter.docx' },
      {
        id: '1-3',
        label: 'Projects',
        isExpanded: false,
        children: [
          { id: '1-3-1', label: 'Project Alpha' },
          { id: '1-3-2', label: 'Project Beta' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Photos',
    isExpanded: false,
    children: [
      { id: '2-1', label: 'Vacation' },
      { id: '2-2', label: 'Family' },
    ],
  },
  { id: '3', label: 'Notes.txt' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const WithSelection: Story = {
  args: {
    items: defaultItems,
    selectedId: '1-1',
  },
  render: function WithSelectionStory(args) {
    const [selectedId, setSelectedId] = useState(args.selectedId);
    return (
      <TreeView
        {...args}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId(id)}
      />
    );
  },
};
