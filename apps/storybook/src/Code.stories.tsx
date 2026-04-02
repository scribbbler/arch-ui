import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Code, Paragraph } from '@arch-ui/components';

const meta = {
  title: 'Typography/Code',
  component: Code,
  argTypes: {
    block: { control: 'boolean' },
    size: { control: 'select', options: ['code-md', 'code-sm'] },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  args: { children: 'const x = 42;' },
  decorators: [
    (Story) => (
      <Paragraph>
        Use <Story /> to declare a variable.
      </Paragraph>
    ),
  ],
};

export const InlineSmall: Story = {
  args: { size: 'code-sm', children: 'npm install' },
};

export const Block: Story = {
  args: {
    block: true,
    children: `function greet(name: string) {\n  return \`Hello, \${name}!\`;\n}`,
  },
};

export const BlockWithLanguage: Story = {
  args: {
    block: true,
    language: 'typescript',
    children: `interface User {\n  id: string;\n  name: string;\n  email: string;\n}`,
  },
};

export const BlockSmall: Story = {
  args: {
    block: true,
    size: 'code-sm',
    children: `console.log("small code block");`,
  },
};
