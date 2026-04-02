import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '@arch-ui/components';

const sampleItems = [
  { title: 'What is Arch UI?', content: 'Arch UI is a design system for building consistent interfaces.' },
  { title: 'How do I install it?', content: 'Run pnpm add @arch-ui/components to get started.' },
  { title: 'Is it accessible?', content: 'Yes, all components follow WAI-ARIA authoring practices.' },
];

const meta = {
  title: 'Disclosure/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { items: sampleItems },
};

export const Multiple: Story = {
  args: { items: sampleItems, allowMultiple: true },
};

export const DefaultExpanded: Story = {
  args: { items: sampleItems, defaultExpanded: [0] },
};

export const MultipleDefaultExpanded: Story = {
  args: { items: sampleItems, allowMultiple: true, defaultExpanded: [0, 2] },
};
