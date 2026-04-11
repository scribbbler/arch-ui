---
sidebar_label: Textarea
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>INPUT AND SELECTION</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Textarea</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A multi-line text input with auto-resize, clearable mode, and FormControl integration.
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

Text area, multi-line input, comment box

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
import { Textarea } from '@arch-ui/components';

<Textarea rows={5} placeholder="Leave a comment..." aria-label="Comment" />
```

### Inside FormControl

```jsx
import { FormControl, FormLabel, FormHelperText, Textarea } from '@arch-ui/components';

<FormControl id="bio" required>
  <FormLabel>Bio</FormLabel>
  <Textarea rows={4} autoResize />
  <FormHelperText>Tell us a little about yourself.</FormHelperText>
</FormControl>
```

### Auto-resize

When `autoResize` is enabled, the textarea grows to fit its content. The manual resize handle is hidden.

```jsx
<Textarea autoResize placeholder="Start typing..." />
```

### Clearable

Show a clear button in the top-right corner when the textarea has content.

```jsx
<Textarea
  clearable
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Write a message..."
/>
```

---

## Sizes

| Size | Font scale |
|---|---|
| `xs` | Paragraph XSmall |
| `sm` | Paragraph Small |
| `md` (default) | Paragraph Medium |
| `lg` | Paragraph Large |

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `rows` | `number` | `3` | Initial visible number of text lines. |
| `resize` | `'none' \| 'vertical' \| 'both'` | `'vertical'` | CSS resize behaviour. Overridden to `'none'` when `autoResize` is true. |
| `autoResize` | `boolean` | `false` | Grows the textarea to fit content by setting height to `scrollHeight`. |
| `clearable` | `boolean` | `false` | Shows a clear button when the textarea has content. |
| `positive` | `boolean` | `false` | Shows a positive (success) border style. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant controlling padding and font size. |
| `disabled` | `boolean` | `false` | Disables the textarea. Also inherited from FormControl. |
| `readOnly` | `boolean` | `false` | Makes the textarea read-only. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the textarea element. |

All standard `TextareaHTMLAttributes` (except `size`) are also forwarded.

---

## Accessibility

- Inherits `id`, `aria-invalid`, `aria-required`, and `aria-describedby` from the nearest FormControl.
- Focus is indicated with `color-border-focus` and a 2px outline.
- The clear button uses `aria-label="Clear textarea"` and is excluded from the tab order.
- Disabled state sets `cursor: not-allowed` and disables resize.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use Textarea for multi-line content entry (comments, descriptions, messages).
- Use `autoResize` for chat-style inputs where the field should grow with content.
- Pair with FormControl for proper labelling and validation.

**Don't:**
- Do not use Textarea for single-line fields -- use Input instead.
- Do not set `rows` to 1 -- use Input for single-line input.
- Do not combine `autoResize` with a manual `resize` value -- `autoResize` forces `resize: none`.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-default` | Textarea background |
| `color-border-default` | Default border |
| `color-border-focus` | Focus border and outline |
| `color-border-danger` | Invalid state border |
| `color-border-success` | Positive state border |
| `color-text-placeholder` | Placeholder text |
| `color-background-disabled` | Disabled background |
| `radius-component-md` | Border radius (md, lg sizes) |
| `radius-sm` | Border radius (xs, sm sizes) |

</TabItem>
</Tabs>
