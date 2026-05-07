import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MessageCard } from '@arch-ui/components';

const meta = {
  title: 'Messaging/MessageCard',
  component: MessageCard,
  argTypes: {
    heading: { control: 'text' },
    paragraph: { control: 'text' },
    buttonLabel: { control: 'text' },
    image: { control: 'text' },
    onClick: { action: 'onClick' },
  },
} satisfies Meta<typeof MessageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Welcome aboard',
    paragraph: 'We are glad to have you. Here is what to expect next.',
    buttonLabel: 'Get started',
  },
};

export const WithImage: Story = {
  args: {
    image: 'https://placehold.co/600x200',
    heading: 'New feature available',
    paragraph: 'Check out the latest updates we have shipped this week.',
    buttonLabel: 'Learn more',
  },
};
