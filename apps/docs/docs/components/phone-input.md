---
sidebar_label: Phone input
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Input and selection</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Phone Input</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A phone number input with a country code selector button and automatic dial code display.
  </p>
</div>

---

## Usage

```jsx
import { PhoneInput } from '@arch-ui/components';

function Example() {
  const [phone, setPhone] = React.useState('');
  const [country, setCountry] = React.useState('US');

  return (
    <PhoneInput
      value={phone}
      onChange={(v) => setPhone(v)}
      country={country}
      onCountryChange={(c) => setCountry(c)}
    />
  );
}
```

### Supported countries

The component ships with dial codes for the following countries:

| Code | Country | Dial code |
|---|---|---|
| US | United States | +1 |
| CA | Canada | +1 |
| GB | United Kingdom | +44 |
| DE | Germany | +49 |
| FR | France | +33 |
| IN | India | +91 |
| JP | Japan | +81 |
| AU | Australia | +61 |
| BR | Brazil | +55 |
| CN | China | +86 |

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
| `value` | `string` | `''` | Phone number value (digits only). |
| `onChange` | `(value: string) => void` | `undefined` | Called when the phone number changes. Receives digits only. |
| `country` | `string` | `'US'` | ISO 2-letter country code. |
| `onCountryChange` | `(country: string) => void` | `undefined` | Called when the country code changes. |
| `disabled` | `boolean` | `false` | Disables the entire component. |
| `size` | `'mini' \| 'compact' \| 'default' \| 'large'` | `'default'` | Size variant controlling height, padding, and font size. |
| `error` | `boolean` | `false` | Shows an error border style on the input. |
| `positive` | `boolean` | `false` | Shows a positive (success) border style on the input. |
| `placeholder` | `string` | `'Phone number'` | Placeholder text for the phone number input. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the outer wrapper. |

---

## Accessibility

- The root element uses `role="group"` with `aria-label="Phone number input"`.
- The country button uses `aria-label` that includes the country code and dial code (e.g., "Country code US +1").
- The phone input uses `aria-label="Phone number"` and `type="tel"` for proper mobile keyboard.
- `inputMode="tel"` ensures the telephone keypad on mobile devices.
- Error state sets `aria-invalid` on the input.
- Focus is indicated with `color-border-focus` and a 2px outline.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use PhoneInput for international phone number collection.
- Pre-select the country based on the user's locale or shipping address.
- Validate the phone number format on the server side since client validation varies by country.

**Don't:**
- Do not use PhoneInput for domestic-only phone numbers where the country is fixed -- use Input with `type="tel"` instead.
- Do not store the dial code and number separately -- combine them for E.164 format storage.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-default` | Input background |
| `color-border-default` | Default border |
| `color-border-focus` | Focus border and outline |
| `color-border-danger` | Error state border |
| `color-border-success` | Positive state border |
| `color-text-placeholder` | Placeholder text |
| `color-background-disabled` | Disabled background |
| `radius-component-md` | Input end corners |
| `radius-none` | Input start corners (adjacent to button) |
