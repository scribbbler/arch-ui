import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from '@arch-ui/components';

const sampleOptions = [
  { id: 'us', label: 'United States' },
  { id: 'ca', label: 'Canada' },
  { id: 'uk', label: 'United Kingdom' },
  { id: 'de', label: 'Germany' },
  { id: 'fr', label: 'France' },
  { id: 'jp', label: 'Japan' },
  { id: 'au', label: 'Australia' },
  { id: 'br', label: 'Brazil' },
  { id: 'in', label: 'India' },
  { id: 'mx', label: 'Mexico' },
];

const disabledOptions = [
  { id: 'us', label: 'United States' },
  { id: 'ca', label: 'Canada' },
  { id: 'uk', label: 'United Kingdom', disabled: true },
  { id: 'de', label: 'Germany' },
  { id: 'fr', label: 'France', disabled: true },
];

const meta = {
  title: 'Input and Selection/Combobox',
  component: Combobox,
  argTypes: {
    size: { control: 'select', options: ['mini', 'compact', 'default', 'large'] },
    multi: { control: 'boolean' },
    creatable: { control: 'boolean' },
    clearable: { control: 'boolean' },
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    positive: { control: 'boolean' },
  },
  args: {
    options: sampleOptions,
    size: 'default',
    placeholder: 'Select a country...',
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Default ────────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    return (
      <Combobox
        {...args}
        value={value}
        onChange={(v) => setValue(v as string)}
        inputValue={inputValue}
        onInputChange={setInputValue}
      />
    );
  },
};

/* ─── MultiSelect ────────────────────────────────────────────────────────────── */

export const MultiSelect: Story = {
  args: {
    multi: true,
    placeholder: 'Select countries...',
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    return (
      <Combobox
        {...args}
        value={value}
        onChange={(v) => setValue(v as string[])}
        inputValue={inputValue}
        onInputChange={setInputValue}
      />
    );
  },
};

/* ─── Creatable ──────────────────────────────────────────────────────────────── */

export const Creatable: Story = {
  args: {
    creatable: true,
    placeholder: 'Select or create...',
  },
  render: (args) => {
    const [options, setOptions] = useState(sampleOptions);
    const [value, setValue] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    return (
      <Combobox
        {...args}
        options={options}
        value={value}
        onChange={(v) => setValue(v as string)}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onCreate={(label) => {
          const id = label.toLowerCase().replace(/\s+/g, '-');
          setOptions((prev) => [...prev, { id, label }]);
          setValue(id);
        }}
      />
    );
  },
};

/* ─── Searchable ─────────────────────────────────────────────────────────────── */

export const Searchable: Story = {
  args: {
    searchable: true,
    placeholder: 'Type to search...',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    return (
      <Combobox
        {...args}
        value={value}
        onChange={(v) => setValue(v as string)}
        inputValue={inputValue}
        onInputChange={setInputValue}
      />
    );
  },
};

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Combobox
      {...args}
      value="us"
      inputValue=""
      onChange={() => {}}
      onInputChange={() => {}}
    />
  ),
};

/* ─── Error ──────────────────────────────────────────────────────────────────── */

export const Error: Story = {
  args: {
    error: true,
    placeholder: 'Please select a country',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    return (
      <Combobox
        {...args}
        value={value}
        onChange={(v) => setValue(v as string)}
        inputValue={inputValue}
        onInputChange={setInputValue}
      />
    );
  },
};

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const SizeMini: Story = {
  args: { size: 'mini' },
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    return (
      <Combobox
        {...args}
        value={value}
        onChange={(v) => setValue(v as string)}
        inputValue={inputValue}
        onInputChange={setInputValue}
      />
    );
  },
};

export const SizeCompact: Story = {
  args: { size: 'compact' },
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    return (
      <Combobox
        {...args}
        value={value}
        onChange={(v) => setValue(v as string)}
        inputValue={inputValue}
        onInputChange={setInputValue}
      />
    );
  },
};

export const SizeDefault: Story = {
  args: { size: 'default' },
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    return (
      <Combobox
        {...args}
        value={value}
        onChange={(v) => setValue(v as string)}
        inputValue={inputValue}
        onInputChange={setInputValue}
      />
    );
  },
};

export const SizeLarge: Story = {
  args: { size: 'large' },
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    return (
      <Combobox
        {...args}
        value={value}
        onChange={(v) => setValue(v as string)}
        inputValue={inputValue}
        onInputChange={setInputValue}
      />
    );
  },
};
