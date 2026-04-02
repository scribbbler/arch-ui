import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '@arch-ui/components';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  argTypes: {
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    maxSize: { control: 'number' },
  },
  args: {
    children: (
      <p>
        Drag and drop files here or <strong>browse</strong>
      </p>
    ),
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Default ────────────────────────────────────────────────────────────────── */

export const Default: Story = {};

/* ─── Accept Filter ──────────────────────────────────────────────────────────── */

export const AcceptImages: Story = {
  args: {
    accept: 'image/*',
    children: (
      <>
        <p>
          Drag and drop images here or <strong>browse</strong>
        </p>
        <p>PNG, JPG, GIF accepted</p>
      </>
    ),
  },
};

export const AcceptPDF: Story = {
  args: {
    accept: '.pdf',
    children: (
      <>
        <p>
          Drag and drop PDF here or <strong>browse</strong>
        </p>
        <p>Only .pdf files</p>
      </>
    ),
  },
};

/* ─── Max Size ───────────────────────────────────────────────────────────────── */

export const WithMaxSize: Story = {
  args: {
    maxSize: 5 * 1024 * 1024,
    children: (
      <>
        <p>
          Drag and drop files here or <strong>browse</strong>
        </p>
        <p>Max 5 MB per file</p>
      </>
    ),
  },
};

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <p>File upload is disabled</p>,
  },
};

/* ─── Multiple ───────────────────────────────────────────────────────────────── */

export const Multiple: Story = {
  args: {
    multiple: true,
    children: (
      <>
        <p>
          Drag and drop multiple files here or <strong>browse</strong>
        </p>
        <p>Select as many files as needed</p>
      </>
    ),
  },
};

/* ─── Combined Props ─────────────────────────────────────────────────────────── */

export const ImageUploadWithLimits: Story = {
  args: {
    accept: 'image/*',
    multiple: true,
    maxSize: 2 * 1024 * 1024,
    children: (
      <>
        <p>
          Drag and drop images here or <strong>browse</strong>
        </p>
        <p>PNG, JPG up to 2 MB each. Multiple files allowed.</p>
      </>
    ),
  },
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  args: {
    children: <p>Tab to focus, Space or Enter to open file dialog</p>,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Tab` to focus the hidden file input, `Space`/`Enter` to open the native file dialog. ' +
          'The label wraps the input so clicking the visible drop zone activates the dialog. ' +
          'Disabled state removes the input from keyboard navigation. ' +
          'When files are rejected (e.g. exceeding `maxSize`), an error message is announced via `role="alert"`. ' +
          'Focus indicator is applied via `:focus-visible` on the hidden input, with a visible outline on the drop zone.',
      },
    },
  },
};
