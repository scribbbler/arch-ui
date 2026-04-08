---
sidebar_label: Divider
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTAINERS AND LAYOUT</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Divider</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A semantic separator used to divide sections of content or inline elements.
  </p>
</div>

## Usage

```jsx
import { Divider } from '@arch-ui/components';

function SectionBreak() {
  return (
    <div>
      <p>First section content.</p>
      <Divider />
      <p>Second section content.</p>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the separator. |
| `label` | `string` | -- | Optional text centred along the divider. Only renders when orientation is `'horizontal'`. |
| `className` | `string` | -- | Additional CSS class names. |

Divider also spreads any additional `HTMLAttributes` onto the root element and supports `ref` forwarding.

## Horizontal (default)

The default rendering. Produces a full-width `<hr>` element with `role="separator"`.

```jsx
<Divider />
```

## Vertical

An inline-block separator that aligns with adjacent text or controls. Useful inside toolbars, breadcrumbs, or inline groups.

```jsx
<span>Home</span>
<Divider orientation="vertical" />
<span>Settings</span>
```

## With label

When `label` is provided on a horizontal divider, the component renders as a `<div>` with two decorative lines flanking the label text. The label uses `var(--color-text-subtle)` and medium font weight.

```jsx
<Divider label="or" />
```

## Accessibility

- Renders with `role="separator"` and the appropriate `aria-orientation` value.
- When a label is present, the decorative line spans are marked `aria-hidden="true"` so screen readers only announce the label text.
- The plain horizontal variant renders as a native `<hr>` element; the labelled variant uses a `<div>` to allow the three-part layout.
