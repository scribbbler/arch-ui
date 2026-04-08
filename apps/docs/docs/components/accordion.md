---
sidebar_label: Accordion
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTENT DISPLAY</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Accordion</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A vertically stacked set of interactive headings that reveal or hide associated content panels.
  </p>
</div>

**Common alternative names:** Expandable, Collapsible, Disclosure

---

## Usage

```jsx
import { Accordion } from '@arch-ui/components';

<Accordion
  items={[
    { title: 'What is arch-ui?', content: 'A design system for building consistent interfaces.' },
    { title: 'How do I install it?', content: 'Run pnpm add @arch-ui/components.' },
    { title: 'Is it accessible?', content: 'Yes. Full keyboard and screen reader support.' },
  ]}
/>
```

### Allow multiple panels open

By default only one panel can be open at a time. Set `allowMultiple` to let users expand several sections simultaneously.

```jsx
<Accordion
  allowMultiple
  items={[
    { title: 'Shipping', content: 'Free shipping on orders over $50.' },
    { title: 'Returns', content: '30-day return policy.' },
    { title: 'Warranty', content: '1-year manufacturer warranty.' },
  ]}
/>
```

### Pre-expanded sections

Use `defaultExpanded` to control which panels are open on first render.

```jsx
<Accordion
  defaultExpanded={[0]}
  items={[
    { title: 'First (open by default)', content: 'This panel starts expanded.' },
    { title: 'Second', content: 'This panel starts collapsed.' },
  ]}
/>
```

### Disabled state

Disable the entire accordion or individual items.

```jsx
// Disable everything
<Accordion disabled items={items} />

// Disable a single item
<Accordion
  items={[
    { title: 'Editable', content: 'You can toggle this.' },
    { title: 'Locked', content: 'Cannot be toggled.', disabled: true },
  ]}
/>
```

---

## Props

### AccordionProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `AccordionItem[]` | **required** | Array of accordion sections. |
| `allowMultiple` | `boolean` | `false` | When true, multiple sections may be open at the same time. |
| `defaultExpanded` | `number[]` | `[]` | Indices of sections expanded on first render. |
| `disabled` | `boolean` | `false` | Disables all accordion panels. |
| `onChange` | `(expandedItems: string[]) => void` | -- | Called when expanded items change. Receives indices of currently expanded items. |
| `className` | `string` | -- | Additional CSS class names. |

### AccordionItem

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | **required** | Header title for the section. |
| `content` | `ReactNode` | **required** | Content rendered inside the expanded panel. |
| `disabled` | `boolean` | `false` | Disables this individual item. |

---

## Keyboard interaction

| Key | Behaviour |
|---|---|
| Enter / Space | Toggle the focused section. |
| Arrow Down | Move focus to the next header. |
| Arrow Up | Move focus to the previous header. |
| Home | Move focus to the first header. |
| End | Move focus to the last header. |

---

## Accessibility

- Each header is a `<button>` inside an `<h3>`, with `aria-expanded` and `aria-controls` linking to its panel.
- Panels use `role="region"` with `aria-labelledby` pointing back to the header.
- Disabled items set `aria-disabled="true"` and remove pointer events.
- The chevron icon rotates 180 degrees when expanded, using `prefers-reduced-motion` to disable the animation when appropriate.
