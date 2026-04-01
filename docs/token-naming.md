# Token Naming Conventions

This document is the authoritative reference for naming tokens. Claude Code must read this before creating any token. Deviation is not permitted — consistency is what makes the system usable by agents and humans alike.

---

## The Three Layers

Every token belongs to exactly one layer. Never skip a layer.

```
Primitive  →  Semantic  →  Component
```

| Layer | File location | Named by | Used by |
|---|---|---|---|
| Primitive | `tokens/src/primitive/` | Literal value | Semantic tokens only |
| Semantic | `tokens/src/semantic/` | Meaning / intent | Component tokens and directly in components |
| Component | `tokens/src/component/` | Component + property | That component's CSS only |

---

## Naming Pattern

All tokens follow this pattern:

```
[category]-[concept]-[variant?]-[state?]
```

In CSS output, tokens are prefixed with `--` and segments are separated by `-`:

```css
--color-action-primary
--color-action-primary-hover
--spacing-component-padding-md
--radius-button
```

---

## Category Reference

Always start with one of these categories. Do not invent new categories.

| Category | Used for |
|---|---|
| `color` | All colour values |
| `spacing` | Margin, padding, gap values |
| `radius` | Border radius |
| `typography` | Font family, size, weight, line height |
| `shadow` | Box shadows |
| `motion` | Duration, easing, delay |
| `size` | Fixed widths, heights, icon sizes |
| `z` | Z-index values |
| `border` | Border width (not colour — that is `color-border-*`) |

---

## Primitive Token Names

Format: `[category]-[scale-name]-[step]`

```
color-gray-50
color-gray-100
color-blue-500
spacing-4
spacing-16
radius-sm
radius-lg
typography-size-14
typography-weight-semibold
shadow-sm
motion-duration-fast
```

Rules:
- Colour steps are numeric: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- Spacing steps are the pixel value as a number: `spacing-4` = 4px
- Named scales (sm, md, lg) only for radius, shadow, and motion — not colour or spacing

---

## Semantic Token Names

Format: `[category]-[concept]-[variant?]-[state?]`

Concept describes intent, not appearance. `color-action-primary` not `color-blue`.

```
color-background-default
color-background-subtle
color-background-inverse
color-text-default
color-text-subtle
color-text-disabled
color-text-danger
color-action-primary
color-action-primary-hover
color-action-secondary
color-action-destructive
color-border-default
color-border-focus
color-border-danger
color-feedback-danger-bg
color-feedback-success-bg
spacing-layout-section
spacing-layout-page
spacing-component-gap-sm
spacing-component-gap-md
spacing-component-padding-sm
spacing-component-padding-md
radius-component-sm
radius-component-md
radius-component-full
shadow-component-sm
shadow-component-md
shadow-overlay
```

Rules:
- Never name a semantic token after its primitive value (`color-blue` is wrong, `color-action-primary` is right)
- States go at the end: `hover`, `focus`, `active`, `disabled`, `error`, `selected`
- Variants go before states: `color-action-primary-hover` not `color-hover-action-primary`

---

## Component Token Names

Format: `[component]-[property]-[variant?]-[state?]`

Component is lowercase, no spaces. Property describes the CSS property it controls.

```
button-bg-default
button-bg-hover
button-bg-disabled
button-text-default
button-text-disabled
button-border-default
button-border-focus
button-radius
button-padding-x-sm
button-padding-x-md
button-padding-x-lg
button-padding-y-sm
button-padding-y-md
input-bg-default
input-bg-error
input-border-default
input-border-focus
input-border-error
input-text-default
input-text-placeholder
input-text-disabled
badge-bg-success
badge-bg-danger
badge-text-success
```

Rules:
- Component tokens reference semantic tokens, never primitives
- If a component token would just alias a semantic token with no customisation benefit, skip it and use the semantic token directly
- `x` and `y` for directional padding/margin: `padding-x` = horizontal, `padding-y` = vertical

---

## What Never to Do

- Do not name a token after a colour: `color-blue`, `color-red-light` — wrong
- Do not use camelCase: `colorActionPrimary` — wrong
- Do not use underscores: `color_action_primary` — wrong
- Do not abbreviate inconsistently: `bg` is acceptable for background, `txt` is not acceptable for text — use `text`
- Do not create a semantic token that is only used once in one component — use a component token instead
- Do not create a primitive token with a semantic name: `color-primary` as a primitive — wrong, that belongs in semantic layer
- Do not skip the semantic layer: component token referencing a primitive directly — wrong

---

## Accepted Abbreviations

These are the only abbreviations permitted. Use the full word for everything else.

| Abbreviation | Full word |
|---|---|
| `bg` | background |
| `sm` | small |
| `md` | medium |
| `lg` | large |
| `xl` | extra large |
| `x` | horizontal (in padding/margin context) |
| `y` | vertical (in padding/margin context) |
| `z` | z-index |

---

## Adding a New Token — Checklist

Before creating a new token, answer these questions:

1. Does a token with this meaning already exist? Check `tokens/build/json/tokens.json` first.
2. Is this a primitive, semantic, or component concern?
3. Does the name follow the pattern for its layer?
4. If semantic: does it reference a primitive, not a hardcoded value?
5. If component: does it reference a semantic token, not a primitive?
6. Is the name describing intent, not appearance?
7. Would another component ever reuse this token? If yes, it should be semantic, not component.

If all seven pass — add the token, rebuild, then use it.
