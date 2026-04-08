---
sidebar_label: Design Tokens
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<span className="foundation-header__label">Styles</span>

# Design Tokens

Tokens are a set of **foundational design** decisions represented as reusable **data**. These tokens are shared across all platforms and control the entire visual part of our design system.

<Tabs>
<TabItem value="usage" label="Usage" default>

## Anatomy

Each design token has a unique name and its corresponding value. This name/value pairing is how it will be known and referenced across all platforms.

<div className="token-anatomy">
  <div className="token-anatomy__card">
    <div className="token-anatomy__row">
      <span className="token-anatomy__label token-anatomy__label--required">Required</span>
      <span className="token-anatomy__key">Name</span>
      <span className="token-anatomy__value">"color-blue-600"</span>
    </div>
    <div className="token-anatomy__row">
      <span className="token-anatomy__label token-anatomy__label--optional">Optional</span>
      <span className="token-anatomy__key">Type</span>
      <span className="token-anatomy__value">$color</span>
    </div>
    <div className="token-anatomy__row">
      <span className="token-anatomy__label token-anatomy__label--required">Required</span>
      <span className="token-anatomy__key">Value</span>
      <span className="token-anatomy__value"><span className="token-anatomy__swatch" style={{background: '#266EF1'}}></span> #266EF1</span>
    </div>
    <div className="token-anatomy__row">
      <span className="token-anatomy__label token-anatomy__label--optional">Optional</span>
      <span className="token-anatomy__key">Description</span>
      <span className="token-anatomy__value">"Primitive, use sparingly"</span>
    </div>
  </div>
</div>

## Name (required)

The most integral part of a design token is its name — it is how it will be known and referenced across all platforms.

All tokens follow this naming pattern:

```
[category]-[concept]-[variant?]-[state?]
```

In CSS output, tokens are prefixed with `--` and segments are separated by `-`:

```css
--color-action-primary
--color-action-primary-hover
--spacing-component-md
--radius-component-sm
```

## The Three Layers

Every token belongs to exactly one layer. Never skip a layer.

```
Primitive  →  Semantic  →  Component
```

| Layer | File location | Named by | Used by |
|---|---|---|---|
| **Primitive** | `tokens/src/primitive/` | Literal value | Semantic tokens only |
| **Semantic** | `tokens/src/semantic/` | Meaning / intent | Component tokens and directly in components |
| **Component** | `tokens/src/component/` | Component + property | That component's CSS only |

### Primitive tokens

Primitive tokens represent raw values. They are named by their literal scale position — never by intent.

```
color-gray-50        → #f3f3f3
color-blue-600       → #266ef1
spacing-4            → 4px
spacing-16           → 16px
radius-sm            → 4px
typography-size-14   → 14px
shadow-sm            → 0 1px 4px ...
motion-duration-fast → 100ms
```

### Semantic tokens

Semantic tokens describe **intent**, not appearance. `color-action-primary` not `color-blue`.

```
color-background-default     → #ffffff
color-text-default           → #282828
color-text-subtle            → #727272
color-action-primary         → #266ef1
color-action-primary-hover   → #175bcc
color-action-destructive     → #de1135
color-border-focus           → #068bee
color-feedback-success-bg    → #eaf6ed
spacing-component-md         → 12px
radius-component-md          → 8px
```

### Component tokens

Component tokens are scoped to a single component. They reference semantic tokens, never primitives.

```
button-bg-default    → {color-action-primary}
button-bg-hover      → {color-action-primary-hover}
button-text-default  → {color-action-primary-text}
input-border-default → {color-border-default}
input-border-focus   → {color-border-focus}
```

## Categories

Always start with one of these categories. Do not invent new categories.

| Category | Used for |
|---|---|
| `color` | All color values |
| `spacing` | Margin, padding, gap values |
| `radius` | Border radius |
| `typography` | Font family, size, weight, line height |
| `shadow` | Box shadows |
| `motion` | Duration, easing, delay |
| `border` | Border width |
| `z` | Z-index values |

## Using Tokens in Code

Import the token CSS at your app's entry point:

```tsx
import '@arch-ui/tokens/css';
```

Then use CSS variables in your styles:

```css
.card {
  background: var(--color-surface-raised);
  border: var(--border-width-default) solid var(--color-border-default);
  border-radius: var(--radius-component-md);
  padding: var(--spacing-component-lg);
  box-shadow: var(--shadow-component-sm);
}

.card:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

## What Not to Do

- **Never** use a hex value directly in component CSS — use a token
- **Never** name a semantic token after its appearance — `color-blue` is wrong, `color-action-primary` is right
- **Never** skip the semantic layer — component tokens should not reference primitives directly
- **Never** create a token that is only used once — use the semantic token directly
- **Never** use camelCase or underscores in token names

</TabItem>
</Tabs>
