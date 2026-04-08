---
sidebar_label: PIN code
---

# PIN Code

A multi-digit code input with auto-advance between fields. Each input accepts a single character. Supports paste distribution, backspace navigation, and masked display for sensitive codes.

**Status:** Stable

**Common alternative names:** OTP input, verification code, code input, one-time password

---

## Usage

```jsx
import { PinCode } from '@arch-ui/components';

function Example() {
  const [pin, setPin] = React.useState('');

  return <PinCode value={pin} onChange={setPin} />;
}
```

### Six-digit code

```jsx
<PinCode value={code} onChange={setCode} length={6} />
```

### Masked (password) mode

Hide entered digits for sensitive codes like PINs or passwords.

```jsx
<PinCode value={pin} onChange={setPin} mask />
```

### Error state

```jsx
<PinCode value={code} onChange={setCode} error />
```

---

## Sizes

| Size | Input dimensions | Font scale |
|---|---|---|
| `mini` | 28 x 28 px | Paragraph XSmall |
| `compact` | 36 x 36 px | Paragraph Small |
| `default` | 48 x 48 px | Paragraph Medium |
| `large` | 56 x 56 px | Paragraph Large |

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `length` | `number` | `4` | Number of digit fields to render. |
| `value` | `string` | required | Current value string (e.g., `"1234"` or `"12"`). |
| `onChange` | `(value: string) => void` | required | Called when the value changes. |
| `error` | `boolean` | `false` | Shows error state with danger border on all inputs. |
| `disabled` | `boolean` | `false` | Disables all inputs. |
| `size` | `'mini' \| 'compact' \| 'default' \| 'large'` | `'default'` | Size variant controlling input dimensions. |
| `mask` | `boolean` | `false` | Shows dots instead of digits (uses `type="password"`). |
| `placeholder` | `string` | `'○'` | Placeholder character displayed in empty inputs. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the outer wrapper. |

---

## Keyboard behaviour

| Key | Action |
|---|---|
| Digit (0-9) | Enters the digit and auto-advances to the next field |
| Backspace | Clears the current field; if empty, moves to and clears the previous field |
| Arrow Left | Moves focus to the previous field |
| Arrow Right | Moves focus to the next field |
| Paste | Distributes pasted digits across fields, non-digit characters are stripped |

---

## Accessibility

- The root element uses `role="group"` with `aria-label="Pin code input"`.
- Each input has `aria-label="Digit N of M"` describing its position.
- The first input uses `autoComplete="one-time-code"` to trigger browser autofill for OTP codes.
- `inputMode="numeric"` ensures the numeric keyboard appears on mobile devices.
- Error state sets `aria-invalid` on each input.
- Focus is indicated with `color-border-focus` and a 2px outline.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use PinCode for verification codes, OTPs, and short numeric inputs.
- Set `length` to match the expected code length (4 or 6 are most common).
- Use `mask` for sensitive inputs like PINs.

**Don't:**
- Do not use PinCode for general numeric input -- use Input with `type="number"` or Stepper.
- Do not set `length` above 8 -- long codes become hard to manage in individual fields.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-default` | Input background |
| `color-border-default` | Default border |
| `color-border-focus` | Focus border and outline |
| `color-border-danger` | Error state border |
| `color-text-default` | Digit text colour |
| `color-text-placeholder` | Placeholder text |
| `color-background-disabled` | Disabled background |
| `radius-component-md` | Border radius (default, large sizes) |
| `radius-sm` | Border radius (mini, compact sizes) |
