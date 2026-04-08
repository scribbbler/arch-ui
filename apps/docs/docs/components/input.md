---
sidebar_label: Input
---

# Input

A single-line text input for collecting short-form user data. Supports multiple sizes, leading/trailing element slots, a clearable mode, and integrates automatically with FormControl for label, error, and helper text wiring.

**Status:** Stable

**Common alternative names:** Text field, text input, form input

---

## Usage

```jsx
import { Input } from '@arch-ui/components';

<Input type="email" placeholder="you@example.com" />
```

### Inside FormControl

When placed inside a FormControl, Input automatically inherits the field id, required state, disabled state, invalid state, and `aria-describedby` wiring.

```jsx
import { FormControl, FormLabel, FormErrorMessage, Input } from '@arch-ui/components';

<FormControl id="email" required invalid={hasError}>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
  <FormErrorMessage>A valid email is required.</FormErrorMessage>
</FormControl>
```

### With leading and trailing elements

Use `leftElement` and `rightElement` to place icons or other decorative content.

```jsx
<Input
  leftElement={<SearchIcon />}
  placeholder="Search..."
/>

<Input
  rightElement={<LockIcon />}
  type="password"
  placeholder="Password"
/>
```

### Clearable

Show a clear button when the input has a value.

```jsx
<Input
  clearable
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search..."
/>
```

---

## Sizes

| Size | Min height | Font scale |
|---|---|---|
| `xs` | 28px | Paragraph XSmall |
| `sm` | 36px | Paragraph Small |
| `md` (default) | 48px | Paragraph Medium |
| `lg` | 56px | Paragraph Large |

```jsx
<Input size="sm" placeholder="Compact input" />
<Input size="lg" placeholder="Large input" />
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'search' \| 'url' \| 'tel'` | `'text'` | HTML input type. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant controlling height, padding, and font size. |
| `leftElement` | `ReactNode` | `undefined` | Node rendered in the leading (inline-start) slot. |
| `rightElement` | `ReactNode` | `undefined` | Node rendered in the trailing (inline-end) slot. |
| `clearable` | `boolean` | `false` | Shows a clear button when the input has a value. |
| `positive` | `boolean` | `false` | Shows a positive (success) border style. |
| `disabled` | `boolean` | `false` | Disables the input. Also inherited from FormControl. |
| `readOnly` | `boolean` | `false` | Makes the input read-only with a subtle background. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the outer wrapper. |

All standard `InputHTMLAttributes` (except `size` and `type`) are also forwarded to the native input.

---

## Accessibility

- Inherits `id`, `aria-invalid`, `aria-required`, and `aria-describedby` from the nearest FormControl.
- Focus is indicated with `color-border-focus` and a 2px outline.
- The clear button uses `aria-label="Clear input"` and is excluded from the tab order to avoid disrupting form navigation.
- Leading and trailing elements are marked `aria-hidden="true"` since they are decorative.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use appropriate `type` values to trigger correct mobile keyboards (e.g., `email`, `tel`, `number`).
- Pair with FormControl for proper labelling and error messaging.
- Use `leftElement` for search icons and `rightElement` for status indicators.

**Don't:**
- Do not use Input for multi-line text -- use Textarea instead.
- Do not place interactive elements in the `leftElement` or `rightElement` slots -- they are decorative.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-default` | Input background |
| `color-border-default` | Default border |
| `color-border-focus` | Focus border and outline |
| `color-border-danger` | Invalid state border |
| `color-border-success` | Positive state border |
| `color-text-placeholder` | Placeholder text |
| `color-background-disabled` | Disabled background |
| `radius-component-md` | Border radius (md, lg sizes) |
| `radius-sm` | Border radius (xs, sm sizes) |
