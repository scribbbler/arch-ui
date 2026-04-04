import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
} from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/FormControl',
  component: FormControl,
  argTypes: {
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
} satisfies Meta<typeof FormControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'email',
    children: (
      <>
        <FormLabel>Email address</FormLabel>
        <Input type="email" placeholder="you@example.com" />
      </>
    ),
  },
};

export const WithHelperText: Story = {
  args: {
    id: 'email-helper',
    children: (
      <>
        <FormLabel>Email address</FormLabel>
        <Input type="email" placeholder="you@example.com" />
        <FormHelperText>We will never share your email.</FormHelperText>
      </>
    ),
  },
};

export const WithError: Story = {
  args: {
    id: 'email-error',
    invalid: true,
    children: (
      <>
        <FormLabel>Email address</FormLabel>
        <Input type="email" placeholder="you@example.com" />
        <FormErrorMessage>A valid email is required.</FormErrorMessage>
      </>
    ),
  },
};

export const Required: Story = {
  args: {
    id: 'name-required',
    required: true,
    children: (
      <>
        <FormLabel>Full name</FormLabel>
        <Input placeholder="Jane Smith" />
        <FormHelperText>Required field.</FormHelperText>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    id: 'name-disabled',
    disabled: true,
    children: (
      <>
        <FormLabel>Username</FormLabel>
        <Input placeholder="disabled" disabled />
      </>
    ),
  },
};
