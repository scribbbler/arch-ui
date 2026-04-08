---
sidebar_label: Payment card
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Input and selection</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Payment Card</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A credit card number input that auto-formats with spaces and detects the card type from the first digits.
  </p>
</div>

<Tabs>
<TabItem value="usage" label="Usage" default>

<div style={{background: '#F3F3F3', borderRadius: '12px', padding: '32px', margin: '24px 0', display: 'flex', justifyContent: 'center'}}>
  <div style={{background: '#282828', borderRadius: '12px', padding: '40px', maxWidth: '600px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', color: '#fff', fontSize: '14px', opacity: 0.5}}>
    Preview coming soon
  </div>
</div>

**Common alternative names**

Credit card input, card number field

---

Usage guidelines coming soon.

</TabItem>
<TabItem value="specs" label="Specs">

Specs coming soon.

</TabItem>
<TabItem value="content" label="Content">

Content guidelines coming soon.

</TabItem>
<TabItem value="changelog" label="Status & Changelog">

Status & changelog coming soon.

</TabItem>
<TabItem value="code" label="Code">

## Usage

```jsx
import { PaymentCard } from '@arch-ui/components';

function Example() {
  const [cardNumber, setCardNumber] = React.useState('');

  return (
    <PaymentCard
      value={cardNumber}
      onChange={(v) => setCardNumber(v)}
    />
  );
}
```

### Card type detection

The component automatically detects the card type from the first digit:

| First digit | Card type | Max digits | Grouping |
|---|---|---|---|
| 4 | Visa | 16 | 4-4-4-4 |
| 5 | Mastercard | 16 | 4-4-4-4 |
| 3 | Amex | 15 | 4-6-5 |
| 6 | Discover | 16 | 4-4-4-4 |

The card type label appears in the leading indicator slot. The `onChange` callback always receives digits only (no spaces).

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
| `value` | `string` | `''` | Card number value (digits only). |
| `onChange` | `(value: string) => void` | `undefined` | Called when the card number changes. Receives digits only. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `size` | `'mini' \| 'compact' \| 'default' \| 'large'` | `'default'` | Size variant controlling height, padding, and font size. |
| `error` | `boolean` | `false` | Shows an error border style. |
| `positive` | `boolean` | `false` | Shows a positive (success) border style. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the outer wrapper. |

---

## Accessibility

- The input uses `aria-label="Credit card number"` for screen reader context.
- `inputMode="numeric"` ensures the numeric keyboard on mobile devices.
- `autoComplete="cc-number"` enables browser autofill for saved card details.
- Error state sets `aria-invalid` on the input.
- The card type indicator is marked `aria-hidden="true"` since it is informational.
- Focus is indicated with `color-border-focus` and a 2px outline.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use PaymentCard for credit/debit card number entry in checkout flows.
- Validate the card number using the Luhn algorithm before submission.
- Combine with separate fields for expiry date, CVV, and cardholder name.

**Don't:**
- Do not use PaymentCard for generic number input -- use Input with `type="number"`.
- Do not store raw card numbers -- use a payment processor tokenisation API.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-default` | Input background |
| `color-border-default` | Default border |
| `color-border-focus` | Focus border and outline |
| `color-border-danger` | Error state border |
| `color-border-success` | Positive state border |
| `color-text-subtle` | Card type indicator colour |
| `color-background-disabled` | Disabled background |
| `radius-component-md` | Border radius (default, large sizes) |
| `radius-sm` | Border radius (mini, compact sizes) |

</TabItem>
</Tabs>
