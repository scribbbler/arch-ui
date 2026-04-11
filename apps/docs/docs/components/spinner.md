---
sidebar_label: Spinner
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>INDICATORS AND STATUS</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Spinner</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A circular loading indicator for indeterminate async operations, rendered as a rotating partial ring.
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

Loader, Loading indicator, Activity indicator

---

Usage guidelines coming soon.

</TabItem>
<TabItem value="specs" label="Specs">

Specs coming soon.

</TabItem>
<TabItem value="content" label="Content">

Content guidelines coming soon.

</TabItem>
<TabItem value="changelog" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
<TabItem value="code" label="Code">

---

## Usage

```jsx
import { Spinner } from '@arch-ui/components';

function Example() {
  return <Spinner />;
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Diameter of the spinner. `xs` = 16px, `sm` = 20px, `md` = 32px, `lg` = 48px. |
| `aria-label` | `string` | `'Loading'` | Accessible label announced by screen readers. |
| `labels` | `Partial<SpinnerLabels>` | `undefined` | Override default labels for internationalisation. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the root element. |

All standard `span` HTML attributes are also supported via rest props.

---

## Sizes

Choose a size that fits the context. Use `xs` or `sm` inline with text or inside buttons, and `md` or `lg` for standalone loading states.

```jsx
<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

---

## Custom label

Override the default "Loading" label to describe the specific operation. This is announced by screen readers.

```jsx
<Spinner aria-label="Saving changes" />
<Spinner aria-label="Fetching results" size="lg" />
```

---

## Internationalisation

Use the `labels` prop to override the default loading text for non-English locales. The `labels` object accepts a `loading` key.

```jsx
<Spinner labels={{ loading: 'Cargando' }} />
```

When both `aria-label` and `labels.loading` are provided, `aria-label` takes precedence.

---

## Inline usage

Spinner works well inside buttons or alongside text to indicate an in-progress action.

```jsx
<Button disabled>
  <Spinner size="xs" aria-label="Submitting" />
  Submitting...
</Button>
```

---

## Accessibility

- Spinner uses `role="status"` which creates a live region. Screen readers will announce the `aria-label` when the Spinner appears in the DOM.
- Always provide a meaningful `aria-label` that describes the operation in progress.
- When `prefers-reduced-motion: reduce` is active, the rotation animation stops. The partial ring remains visible as a static indicator.

</TabItem>
</Tabs>
