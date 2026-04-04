import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '@arch-ui/components';

const meta = {
  title: 'Indicators and Status/ProgressBar',
  component: ProgressBar,
  args: {
    label: 'Progress',
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ZeroPercent: Story = {
  args: { value: 0, label: 'Upload progress' },
};

export const TwentyFivePercent: Story = {
  args: { value: 25, label: 'Upload progress' },
};

export const FiftyPercent: Story = {
  args: { value: 50, label: 'Upload progress' },
};

export const SeventyFivePercent: Story = {
  args: { value: 75, label: 'Upload progress' },
};

export const Complete: Story = {
  args: { value: 100, label: 'Upload progress' },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Loading data' },
};

export const SizeSmall: Story = {
  args: { value: 60, size: 'sm', label: 'Compact progress' },
};

export const SizeMedium: Story = {
  args: { value: 60, size: 'md', label: 'Default progress' },
};

export const Accessibility: Story = {
  name: 'Accessibility',
  args: { value: 40, label: 'File upload progress' },
  parameters: {
    docs: {
      description: {
        story: 'Uses role="progressbar" with aria-valuemin=0, aria-valuemax=100, and aria-valuenow set to the current value. In indeterminate mode, aria-valuenow is omitted. Always provide a label for the accessible name via the label prop.',
      },
    },
  },
};
