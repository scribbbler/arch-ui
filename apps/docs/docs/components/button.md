---
sidebar_position: 1
---

# Button

A polymorphic button component for triggering actions. Supports 6 visual kinds, 4 sizes, 4 shapes, loading state, and icon enhancers.

## When to Use

- Triggering an action (save, submit, delete)
- Navigating when styled as a link (`as="a"`)
- Toggle selection in a ButtonGroup

## Anatomy

```
┌─────────────────────────────────────────┐
│  [startEnhancer]  [label]  [endEnhancer] │
└─────────────────────────────────────────┘
```

- **startEnhancer** — optional icon before the label
- **label** — text content via `children`
- **endEnhancer** — optional icon after the label
- For icon-only buttons, use `shape="circle"` or `shape="square"` with only `startEnhancer`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `kind` | `'primary' \| 'secondary' \| 'tertiary' \| 'dangerPrimary' \| 'dangerSecondary' \| 'dangerTertiary'` | `'primary'` | Visual style |
| `size` | `'mini' \| 'compact' \| 'default' \| 'large'` | `'default'` | Controls height and font |
| `shape` | `'default' \| 'pill' \| 'circle' \| 'square'` | `'default'` | Border radius / fixed dimensions |
| `isSelected` | `boolean` | `false` | Toggle state for ButtonGroup |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `isLoading` | `boolean` | `false` | Shows spinner, disables button |
| `loadingText` | `string` | — | Label shown during loading |
| `startEnhancer` | `ReactNode` | — | Icon before label |
| `endEnhancer` | `ReactNode` | — | Icon after label |
| `fullWidth` | `boolean` | `false` | Stretches to 100% width |
| `as` | `ElementType` | `'button'` | Polymorphic root element |

## Kinds

| Kind | Use for |
|------|---------|
| `primary` | Main action on the page. One per section. |
| `secondary` | Supporting actions alongside a primary. |
| `tertiary` | Low-emphasis actions: cancel, dismiss, back. |
| `dangerPrimary` | Destructive actions: delete, remove. |
| `dangerSecondary` | Destructive but less prominent. |
| `dangerTertiary` | Destructive, minimal emphasis. |

```tsx
<Button kind="primary">Save</Button>
<Button kind="secondary">Cancel</Button>
<Button kind="tertiary">Back</Button>
<Button kind="dangerPrimary">Delete</Button>
```

## Sizes

| Size | Height | Font Scale |
|------|--------|------------|
| `mini` | 28px | Label XSmall (12px) |
| `compact` | 36px | Label Small (14px) |
| `default` | 48px | Label Medium (16px) |
| `large` | 56px | Label Large (18px) |

```tsx
<Button size="mini">Mini</Button>
<Button size="compact">Compact</Button>
<Button size="default">Default</Button>
<Button size="large">Large</Button>
```

## Shapes

| Shape | Radius | Use case |
|-------|--------|----------|
| `default` | 8px | Standard buttons |
| `pill` | 9999px | Softer, rounded style |
| `circle` | 50% | Icon-only, fixed square dims |
| `square` | 4px | Icon-only, sharp corners |

```tsx
<Button shape="pill">Pill Button</Button>
<Button shape="circle" startEnhancer={<PlusIcon />} />
<Button shape="square" startEnhancer={<PlusIcon />} />
```

## States

| State | Visual | ARIA |
|-------|--------|------|
| Default | Base background | — |
| Hover | One shade darker | — |
| Active/Pressed | Two shades darker | — |
| Focus | Inset 2px ring | — |
| Disabled | 50% opacity | `disabled` attribute |
| Loading | Spinner + optional text | `aria-busy="true"` |
| Selected | Active shade | `aria-pressed="true"` |

## Icon-Only Buttons

Use `shape="circle"` or `shape="square"` with `startEnhancer` and no children. Always provide `aria-label`.

```tsx
<Button
  shape="circle"
  kind="tertiary"
  startEnhancer={<CloseIcon />}
  aria-label="Close dialog"
/>
```

## Do

:::tip Do
- Use `primary` for the single most important action
- Use `secondary` or `tertiary` for supporting actions
- Always provide a visible text label — icon-only buttons need `aria-label`
- Use `isLoading` with `loadingText` so users know what's happening
- Use `startEnhancer` for icons that reinforce the label
:::

## Don't

:::danger Don't
- Don't use multiple `primary` buttons in the same section
- Don't use `dangerPrimary` for non-destructive actions
- Don't disable buttons without explaining why
- Don't put interactive elements inside a button
- Don't use `shape="circle"` with text content — it will overflow
:::

## Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Move focus to/from button |
| `Enter` | Activate button |
| `Space` | Activate button |

## Tokens Used

| Token | Purpose |
|-------|---------|
| `--color-action-primary` | Primary background |
| `--color-action-primary-hover` | Primary hover |
| `--color-action-primary-active` | Primary pressed |
| `--color-border-focus` | Focus ring |
| `--typography-scale-label-*-font-size` | Font per size |
| `--radius-md`, `--radius-sm`, `--radius-full` | Border radius |
| `--motion-duration-fast` | Transition speed |
