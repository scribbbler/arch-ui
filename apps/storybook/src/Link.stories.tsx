import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@arch-ui/components';

const meta = {
  title: 'Navigation/Link',
  component: Link,
  argTypes: {
    variant: { control: 'select', options: ['default', 'subtle', 'inverse'] },
    external: { control: 'boolean' },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { href: '#', children: 'Default link' },
};

export const Subtle: Story = {
  args: { href: '#', variant: 'subtle', children: 'Subtle link' },
};

export const Inverse: Story = {
  args: { href: '#', variant: 'inverse', children: 'Inverse link' },
  decorators: [
    (Story) => (
      <div style={{ background: '#1a1a2e', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    target: '_blank',
    rel: 'noopener noreferrer',
    children: 'External link',
  },
};

export const ExternalSubtle: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    variant: 'subtle',
    target: '_blank',
    rel: 'noopener noreferrer',
    children: 'External subtle link',
  },
};
