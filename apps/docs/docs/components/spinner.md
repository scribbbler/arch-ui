---
sidebar_label: Spinner
---

# Spinner

A circular loading indicator for indeterminate async operations. Spinner is rendered as a rotating partial ring and announces its loading state to screen readers via `role="status"`. It respects `prefers-reduced-motion` by stopping the animation and showing a static partial ring.

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
