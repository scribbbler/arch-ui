import type { Meta, StoryObj } from '@storybook/react';
import { ProgressSteps } from '@arch-ui/components';

const steps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile' },
  { label: 'Payment', description: 'Add payment method' },
  { label: 'Review', description: 'Confirm details' },
];

const simpleSteps = [
  { label: 'Account' },
  { label: 'Profile' },
  { label: 'Payment' },
  { label: 'Review' },
];

const meta = {
  title: 'Feedback/ProgressSteps',
  component: ProgressSteps,
  args: {
    steps: simpleSteps,
    currentStep: 0,
  },
} satisfies Meta<typeof ProgressSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStep: Story = {
  args: { steps: simpleSteps, currentStep: 0 },
};

export const SecondStep: Story = {
  args: { steps: simpleSteps, currentStep: 1 },
};

export const ThirdStep: Story = {
  args: { steps: simpleSteps, currentStep: 2 },
};

export const AllComplete: Story = {
  args: { steps: simpleSteps, currentStep: 4 },
};

export const WithDescriptions: Story = {
  args: { steps, currentStep: 1 },
};

export const Horizontal: Story = {
  args: { steps: simpleSteps, currentStep: 2, orientation: 'horizontal' },
};

export const Vertical: Story = {
  args: { steps, currentStep: 1, orientation: 'vertical' },
};

export const VerticalLastStep: Story = {
  args: { steps, currentStep: 3, orientation: 'vertical' },
};

export const Accessibility: Story = {
  name: 'Accessibility',
  args: { steps, currentStep: 2, orientation: 'horizontal' },
  parameters: {
    docs: {
      description: {
        story: 'Renders as an <ol> (ordered list) for semantic step sequence. The current step has aria-current="step". Completed steps show a checkmark character to convey state without relying on colour alone. The component is display-only and not interactive.',
      },
    },
  },
};
