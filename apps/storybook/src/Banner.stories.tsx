import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from '@arch-ui/components';

const meta = {
  title: 'Feedback/Banner',
  component: Banner,
  args: {
    children: 'This is a banner message.',
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { variant: 'info', children: 'New features are available. Check the changelog.' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Deployment completed successfully.' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Scheduled maintenance on Saturday 10 pm - 2 am UTC.' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Service outage detected. Our team is investigating.' },
};

export const WithOnClose: Story = {
  args: {
    variant: 'info',
    children: 'We use cookies to improve your experience.',
    onClose: () => {},
  },
};

export const WithoutOnClose: Story = {
  args: {
    variant: 'warning',
    children: 'This banner cannot be dismissed.',
  },
};

export const Accessibility: Story = {
  name: 'Accessibility',
  args: {
    variant: 'danger',
    children: 'Danger and warning banners use role="alert" (assertive). Success and info use role="status" (polite). The dismiss button is reachable via Tab and activated with Enter or Space.',
    onClose: () => {},
  },
};
