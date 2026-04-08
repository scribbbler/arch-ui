---
sidebar_label: Toggle
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Input and selection</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Toggle</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A binary on/off toggle that slides between two positions to communicate state without relying on colour alone.
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

Switch, on/off toggle, binary toggle

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
import { Toggle } from '@arch-ui/components';

function Example() {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <Toggle
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
    >
      Enable notifications
    </Toggle>
  );
}
```

### Without label text

When no visible label is provided, use `aria-label` for screen reader context.

```jsx
<Toggle
  aria-label="Dark mode"
  checked={isDark}
  onChange={(e) => setIsDark(e.target.checked)}
/>
```

### Inside FormControl

```jsx
import { FormControl, Toggle } from '@arch-ui/components';

<FormControl id="notifications" disabled>
  <Toggle>Enable notifications</Toggle>
</FormControl>
```

---

## Sizes

| Size | Track dimensions | Thumb diameter |
|---|---|---|
| `xs` | 28 x 14 px | 10px |
| `sm` | 38 x 20 px | 16px |
| `md` (default) | 44 x 24 px | 20px |

```jsx
<Toggle size="sm">Compact toggle</Toggle>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `undefined` | Whether the toggle is in the on (checked) state. |
| `disabled` | `boolean` | `false` | Disables the toggle. Also inherited from FormControl. |
| `onChange` | `(e: ChangeEvent) => void` | `undefined` | Called when the checked state changes. |
| `children` | `ReactNode` | `undefined` | Optional label text rendered beside the track. |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | Size variant controlling track and thumb dimensions. |
| `className` | `string` | `undefined` | Additional CSS class names for the wrapper. |

All standard `InputHTMLAttributes` (except `size` and `type`) are also forwarded.

---

## Accessibility

- Uses `role="switch"` on the underlying checkbox input for correct screen reader semantics.
- `aria-checked` reflects the current on/off state.
- Focus-visible is relayed from the hidden input to the visual track.
- The thumb position communicates state without relying on colour alone.
- Minimum touch target of 44px is enforced on the wrapper.
- Respects `prefers-reduced-motion` by disabling thumb and track transitions.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use Toggle for settings that take effect immediately (e.g., enable/disable a feature).
- Always provide either a visible label via `children` or an `aria-label`.
- Use the appropriate size for the context -- `sm` for dense UIs, `md` for standard forms.

**Don't:**
- Do not use Toggle for form fields that require a submit action -- use Checkbox instead.
- Do not use Toggle for multi-option selection -- use Checkbox or Radio.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-muted` | Track background (off state) |
| `color-action-primary` | Track background (on state) |
| `color-action-primary-hover` | Track hover colour (on state) |
| `color-background-default` | Thumb colour |
| `color-border-default` | Track border (off state) |
| `color-border-focus` | Focus outline |
| `color-text-default` | Label text colour |

</TabItem>
</Tabs>
