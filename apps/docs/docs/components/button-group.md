---
sidebar_label: Button group
---

# Button Group

A group of buttons that function as a single control for toggling between options. Supports single selection (radio mode) and multi-selection (checkbox mode). ButtonGroup clones each child Button, injecting shared sizing, kind, and selection props for a consistent grouped appearance.

**Status:** Stable

**Common alternative names:** Toggle group, segmented button, button toggle

---

## Usage

Wrap `Button` components inside a `ButtonGroup`. The group manages selection state, visual styling, and border-radius so individual buttons merge into a single cohesive row.

```jsx
import { ButtonGroup, Button } from '@arch-ui/components';

function Example() {
  const [selected, setSelected] = React.useState(0);

  return (
    <ButtonGroup selected={selected} onChange={(e, index) => setSelected(index)}>
      <Button>Day</Button>
      <Button>Week</Button>
      <Button>Month</Button>
    </ButtonGroup>
  );
}
```

---

## Selection modes

### Radio (default)

Only one button can be selected at a time. Pass a single `number` as the `selected` prop.

```jsx
<ButtonGroup mode="radio" selected={1} onChange={(e, i) => setSelected(i)}>
  <Button>Small</Button>
  <Button>Medium</Button>
  <Button>Large</Button>
</ButtonGroup>
```

### Checkbox

Multiple buttons can be selected simultaneously. Pass an array of indices as the `selected` prop.

```jsx
function MultiSelect() {
  const [selected, setSelected] = React.useState([0, 2]);

  const handleChange = (e, index) => {
    setSelected(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <ButtonGroup mode="checkbox" selected={selected} onChange={handleChange}>
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>
  );
}
```

---

## Sizes

The `size` prop is applied to all child buttons.

```jsx
<ButtonGroup size="compact" selected={0}>
  <Button>A</Button>
  <Button>B</Button>
  <Button>C</Button>
</ButtonGroup>
```

Available sizes: `mini`, `compact`, `default`, `large`.

---

## Shapes

The `shape` prop controls the border-radius of the group. The first and last children receive appropriate rounding while middle children are squared off.

| Shape | Appearance |
|---|---|
| `default` | Standard rounded corners (`radius-md`) |
| `pill` | Fully rounded ends (`radius-full`) |

```jsx
<ButtonGroup shape="pill" selected={0}>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
```

---

## Disabled state

Setting `disabled` on the group disables all child buttons and reduces opacity.

```jsx
<ButtonGroup disabled selected={0}>
  <Button>A</Button>
  <Button>B</Button>
</ButtonGroup>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `'radio' \| 'checkbox'` | `'radio'` | Selection mode. Radio for single, checkbox for multi-selection. |
| `selected` | `number \| number[]` | -- | Currently selected index (radio) or indices (checkbox). |
| `onChange` | `(event, index) => void` | -- | Called when the user clicks a button. |
| `size` | `'mini' \| 'compact' \| 'default' \| 'large'` | `'default'` | Size applied to all child buttons. |
| `shape` | `'default' \| 'pill' \| 'circle' \| 'square'` | `'default'` | Shape applied to all child buttons. |
| `kind` | `'primary' \| 'secondary' \| 'tertiary' \| 'dangerPrimary' \| 'dangerSecondary' \| 'dangerTertiary'` | `'secondary'` | Visual kind applied to all child buttons. |
| `disabled` | `boolean` | `false` | Disables all buttons in the group. |
| `children` | `ReactNode` | -- | Button elements to render inside the group. |
| `className` | `string` | `undefined` | Additional CSS class names on the root element. |

---

## Accessibility

- The root element uses `role="group"` to associate the buttons semantically.
- Each child Button receives `isSelected`, which sets `aria-pressed` to communicate toggle state.
- When `disabled` is `true`, all child buttons become disabled.
- Keyboard: **Tab** moves focus between buttons; **Enter** or **Space** activates the focused button.

---

## Best practices

**Do:**
- Use for toggle-style selection between a small set of options (2 to 5).
- Use radio mode for mutually exclusive choices, checkbox mode for multi-select.
- Pass only `Button` components as children.

**Don't:**
- Do not mix different component types as children -- only use Button.
- Do not use for navigation -- use Tabs or SegmentedControl instead.
- Do not use more than 5 options -- consider a Select for larger sets.

---

## Design tokens

| Token | Role |
|---|---|
| `color-border-subtle` | Separator between items |
| `radius-md` | Default corner radius |
| `radius-full` | Pill shape corner radius |
| `border-width-default` | Separator width and negative margin |
| `spacing-4` | Separator inset from top/bottom |
