---
sidebar_label: Card
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTAINERS AND LAYOUT</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Card</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A surface container for grouping related content and actions with optional header, body, and footer regions.
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

Container, panel, surface

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
import { Card, CardHeader, CardBody, CardFooter } from '@arch-ui/components';

function ProductCard() {
  return (
    <Card>
      <CardHeader>Product details</CardHeader>
      <CardBody>
        <p>Lightweight running shoe with responsive cushioning.</p>
      </CardBody>
      <CardFooter>$129.00</CardFooter>
    </Card>
  );
}
```

---

## Props

### Card

| Prop | Type | Default | Description |
|---|---|---|---|
| `clickable` | `boolean` | `false` | When true, the card becomes interactive (renders as a link or button). |
| `href` | `string` | -- | When provided alongside `clickable`, renders the card as an `<a>` element. |
| `onClick` | `MouseEventHandler` | -- | Click handler for cards that trigger actions without navigation. |
| `padding` | `string` | `'spacing-component-md'` | CSS custom property name (without `--`) for the card padding. Must be a valid spacing token. |
| `children` | `ReactNode` | -- | Card content. |
| `className` | `string` | -- | Additional CSS class names. |

---

### CardHeader / CardBody / CardFooter

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | -- | Section content. |
| `className` | `string` | -- | Additional CSS class names. |

All sub-components and Card itself support `ref` forwarding.

---

## Clickable link card

When the card should navigate to a new page, pass both `clickable` and `href`. The card renders as an anchor element with hover elevation and focus-visible styling.

```jsx
<Card clickable href="/products/shoe-123">
  <CardBody>View product details</CardBody>
</Card>
```

---

## Clickable action card

When the card triggers an action without navigation, pass `clickable` and `onClick`. The card renders as a `div` with `role="button"` and keyboard support for Enter and Space.

```jsx
<Card clickable onClick={() => setSelected('option-a')}>
  <CardBody>Select this option</CardBody>
</Card>
```

---

## Anatomy

- **CardHeader** -- top region separated from the body by a border. Suited for titles, icons, or metadata.
- **CardBody** -- primary content area. Fills available vertical space (`flex: 1`).
- **CardFooter** -- bottom region separated from the body by a border. Suited for actions, prices, or timestamps.

All three sub-components are optional; you can use any combination.

---

## Accessibility

- Static cards render as a plain `<div>`.
- Clickable cards with `href` render as `<a>`, inheriting native link semantics.
- Clickable cards without `href` render as `<div role="button" tabIndex={0}>` with Enter and Space key handling.
- Focus is indicated with a `var(--color-border-focus)` outline via `:focus-visible`.
- Transitions respect `prefers-reduced-motion`.

</TabItem>
</Tabs>
