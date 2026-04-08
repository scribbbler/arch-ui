---
sidebar_label: Combobox
---

# Combobox

A searchable dropdown select for complex use cases. Supports single and multi-select, creatable options, keyboard navigation, and a portal-rendered dropdown listbox.

**Status:** Stable

**Common alternative names:** Autocomplete, typeahead, searchable select, multi-select

---

## Usage

```jsx
import { Combobox } from '@arch-ui/components';

function Example() {
  const [selected, setSelected] = React.useState('');
  const [search, setSearch] = React.useState('');

  return (
    <Combobox
      options={[
        { id: 'us', label: 'United States' },
        { id: 'ca', label: 'Canada' },
        { id: 'gb', label: 'United Kingdom' },
      ]}
      value={selected}
      onChange={setSelected}
      inputValue={search}
      onInputChange={setSearch}
    />
  );
}
```

### Multi-select

In multi-select mode, selected options appear as removable tags inside the control.

```jsx
<Combobox
  multi
  options={options}
  value={selectedIds}
  onChange={setSelectedIds}
  inputValue={search}
  onInputChange={setSearch}
  placeholder="Select countries..."
/>
```

### Creatable

Allow users to create new options that don't exist in the list.

```jsx
<Combobox
  creatable
  options={options}
  value={selected}
  onChange={setSelected}
  onCreate={(newLabel) => addOption(newLabel)}
  inputValue={search}
  onInputChange={setSearch}
/>
```

---

## Sizes

| Size | Min height | Font scale |
|---|---|---|
| `mini` | 28px | Paragraph XSmall |
| `compact` | 36px | Paragraph Small |
| `default` | 48px | Paragraph Medium |
| `large` | 56px | Paragraph Large |

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `{ id: string; label: string; disabled?: boolean }[]` | required | The list of selectable options. |
| `value` | `string \| string[]` | `undefined` | The currently selected option id(s). |
| `onChange` | `(value: string \| string[]) => void` | `undefined` | Called when the selection changes. |
| `inputValue` | `string` | `''` | Controlled search text value. |
| `onInputChange` | `(value: string) => void` | `undefined` | Called when the search input text changes. |
| `multi` | `boolean` | `false` | Enables multi-select mode with tag display. |
| `creatable` | `boolean` | `false` | Allows creating new options from the search text. |
| `onCreate` | `(value: string) => void` | `undefined` | Called when a new option is created. |
| `clearable` | `boolean` | `true` | Shows a clear button when a selection exists. |
| `searchable` | `boolean` | `true` | Allows typing to filter options. |
| `disabled` | `boolean` | `false` | Disables the combobox. |
| `placeholder` | `string` | `'Select...'` | Placeholder text when no value is selected. |
| `size` | `'mini' \| 'compact' \| 'default' \| 'large'` | `'default'` | Size variant. |
| `positive` | `boolean` | `false` | Shows a positive (success) border style. |
| `error` | `boolean` | `false` | Shows an error border style. |
| `className` | `string` | `undefined` | Additional CSS class names. |

---

## Accessibility

- The input uses `role="combobox"` with `aria-expanded`, `aria-autocomplete="list"`, and `aria-controls` pointing to the listbox.
- The dropdown uses `role="listbox"` with `role="option"` for each item.
- `aria-activedescendant` tracks the currently focused option for screen readers.
- In multi-select mode, the listbox uses `aria-multiselectable`.
- Arrow keys navigate options, Enter selects, Escape closes the dropdown.
- Backspace in multi-select mode removes the last selected tag when the input is empty.
- Disabled options are marked with `aria-disabled` and skipped during keyboard navigation.
- The clear button uses `aria-label="Clear selection"`.
- The dropdown is rendered via Portal to avoid clipping.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use Combobox when the option list is long enough to benefit from search filtering.
- Use `multi` for tag-style multi-selection (e.g., categories, skills).
- Use `creatable` when users should be able to add new values not in the predefined list.
- Provide controlled `inputValue` and `onInputChange` for server-side filtering.

**Don't:**
- Do not use Combobox for short lists of 3-5 options -- use Select or Radio instead.
- Do not use Combobox when the options are static and short -- native Select is simpler and more accessible.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-default` | Control background |
| `color-border-default` | Default border |
| `color-border-focus` | Focus border and outline |
| `color-border-danger` | Error state border |
| `color-border-success` | Positive state border |
| `color-background-disabled` | Disabled control background |
| `color-surface-base` | Dropdown background |
| `color-background-muted` | Focused option highlight |
| `shadow-shallow-above` | Dropdown shadow |
| `z-semantic-dropdown` | Dropdown z-index |
| `radius-component-md` | Control and dropdown corner radius |
