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

> Naming is inherently complex — you can always reference the naming convention of each token type on its respective documentation page for more details.

There are two main properties when thinking of how we construct the name of a design token, its **Tier** and **Type**.

**Type**

There are established formats and best practices for naming we follow based on the token type (color, typography, sizing, etc.) to ensure high comprehension and usability for designers and developers alike.

**Tier**

Depending on how context specific a design token is, its naming can vary. For our most foundational tier, naming will often consist of the token type, followed by a numeric or ordinal scale. The more narrow the token's intended usage is, the more precise its name will be.

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

---

## Type (optional)

While design tokens can represent any design decision, there are a handful of established token types in W3C that summarize the purpose of the token and are often referenced by our tooling.

| Name | Definition |
|---|---|
| Color | Color values, including both named colors and hexadecimal values. |
| Dimension | Numeric values with units, such as pixels or ems |
| Font family | Font families, such as "Inter" |
| Font-weight | Font weights, such as "bold" or "normal" |
| Duration | Time durations, such as "0.5s" or "2ms" |
| Cubic Bezier | Easing functions with cubic Bezier curves |
| Number | Simple numeric values without units |

---

## Value (required)

A design token's value is the specific data that defines a design property and is associated with a particular token name. Depending on the token and its complexity, there are several types of data supported:

**Data types**

| Data type | Description |
|---|---|
| String | A sequence of characters that can represent text, such as font or color names. |
| Number | A numerical value that can represent various design properties, such as size, spacing, or duration. |
| Color | A value that represents a specific color, typically in hexadecimal or RGB format |
| Boolean | A value that is either true or false, and can be used to represent binary properties such as whether an element is visible or hidden |
| Object | A collection of key/value pairs, which can be used to represent more complex design properties, such as gradients or shadows. |
| Array | A collection of values of the same data type, such as a list of font sizes or spacing values. |

---

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

---

## Composite tokens

The last tier of tokens supported is a composite — a token that combines or derives its value from one or more child tokens. Composite tokens are created by specifying a calculation or formula that references other tokens as input values and uses those values to produce a new output value.

There are two main use cases for composite tokens — supporting calculation-based value reference (such as dynamic sizing of a component) and defining more complex component tier tokens (card, tile, etc.)

**Composite types**

| Type | Definition |
|---|---|
| Stroke | Composite of an array of widths (dashArray) and a string to define the shape (lineCap) property |
| Border | Composite of a color token, width number, and style object (usually a stroke composite) |
| Transition | Composite of duration, delay, and a timing array |
| Shadow | Composite of a color token, X and Y offsets, blur, and spread. |
| Gradient | Composite of color tokens and a finite amount of positions they take. |
| Typography | Composite of a font family, size, weight, letter spacing, and line height. |

**Group vs composite tokens**

Composite tokens are not to be mistaken for group tokens. A group token does not have a value of its own but simply serves as a container or grouping mechanism for related tokens. Group tokens can be used to organize related tokens by category or context, such as color tokens for a specific brand or typography tokens for a specific component.

---

## Description (optional)

Beyond name and value, a design token can have a description property to provide additional information to the user. It's most often used to:

- Provide purpose & context
- Provide usage guidance
- Any relevant design considerations
- Caveats & Limitations

---

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

---

## W3C Definition & Format

"Design tokens are a methodology for expressing design decisions in a platform-agnostic way so that they can be shared across different disciplines, tools, and technologies. They help establish a common vocabulary across organizations." — W3C Design Tokens

> We aim to be as close to the proposed W3C design token format and follow best practices, however, we will be holding off on doing a migration to achieve full compliance until its official release.

---

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

---

## Principles

### Shared language

Design tokens provide a common language between designers and developers. When both disciplines reference `color-action-primary`, there is zero ambiguity about which blue is meant.

### Consistency

Remember that it takes a long time to cement a consistent "feel" with our users, but it takes very little to break it. Design tokens ensure consistency in our design system, connecting each element to a predefined style and, therefore, a design token.

### Reusability

Design tokens provide a predefined set of options that can be applied to multiple use cases across our system, driving system adoption on the subcomponent level.

Using raw values directly in code is poor practice for maintenance and future changes, mainly because we support themes and accessibility features like Dark Mode. Proper tokens allow themes to work seamlessly across multiple platforms.

---

These styles have been defined with a system in mind; the moment you deviate from them, you break this system. By adhering to this system instead, you help consolidate a distinctive look & feel driven by our brand guidelines.

> **It's your job as a designer to reinforce the consolidation of a single voice in every detail of your work.**

---

## What Not to Do

- **Never** use a hex value directly in component CSS — use a token
- **Never** name a semantic token after its appearance — `color-blue` is wrong, `color-action-primary` is right
- **Never** skip the semantic layer — component tokens should not reference primitives directly
- **Never** create a token that is only used once — use the semantic token directly
- **Never** use camelCase or underscores in token names

</TabItem>
</Tabs>
