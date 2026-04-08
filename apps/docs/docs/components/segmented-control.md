---
sidebar_label: Segmented control
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Input and selection</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Segmented Control</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A horizontal set of mutually exclusive options for switching between views or modes.
  </p>
</div>

---

## Usage

```jsx
import { SegmentedControl } from '@arch-ui/components';

function Example() {
  const [activeId, setActiveId] = React.useState('week');

  return (
    <SegmentedControl
      options={[
        { label: 'Day', id: 'day' },
        { label: 'Week', id: 'week' },
        { label: 'Month', id: 'month' },
      ]}
      activeId={activeId}
      onChange={setActiveId}
    />
  );
}
```

### Full width

Stretch the control to fill its container. Each segment shares equal width.

```jsx
<SegmentedControl
  fullWidth
  options={[
    { label: 'List', id: 'list' },
    { label: 'Grid', id: 'grid' },
  ]}
  activeId={view}
  onChange={setView}
/>
```

---

## Sizes

| Size | Min height | Font scale |
|---|---|---|
| `mini` | 28px | Label XSmall |
| `compact` | 36px | Label Small |
| `default` | 48px | Label Medium |
| `large` | 56px | Label Large |

```jsx
<SegmentedControl size="compact" options={options} activeId={id} onChange={setId} />
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `{ label: string; id: string }[]` | required | Array of segment options. |
| `activeId` | `string` | required | The id of the currently active segment. |
| `onChange` | `(id: string) => void` | required | Called when the user selects a segment. |
| `size` | `'mini' \| 'compact' \| 'default' \| 'large'` | `'default'` | Size variant. |
| `disabled` | `boolean` | `false` | Disables the entire control. |
| `fullWidth` | `boolean` | `false` | Stretches the control to full container width. |
| `className` | `string` | `undefined` | Additional class names applied to the root element. |

---

## Accessibility

- Uses `role="radiogroup"` on the root element with each segment as `role="radio"`.
- Arrow keys (left/right, up/down) move between segments. Home and End jump to first/last.
- Only the active segment is in the tab order (`tabIndex=0`); others use `tabIndex=-1`.
- The active segment is indicated by `aria-checked="true"`.
- Focus is indicated with a visible outline using `color-border-focus`.
- The component is `forwardRef` compatible.

---

## Best practices

**Do:**
- Use SegmentedControl for 2-5 options where the user switches between views.
- Keep labels short -- one or two words.
- Use `fullWidth` in narrow containers like cards or sidebars.

**Don't:**
- Do not use for more than 5 options -- use Tabs or a Select instead.
- Do not use for form value selection where the result is submitted -- use Radio or Select.
- Do not mix with navigation links -- SegmentedControl is for toggling views within a page.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-muted` | Control track background |
| `color-background-default` | Active segment background |
| `color-text-subtle` | Inactive segment text |
| `color-text-default` | Active segment text |
| `color-action-ghost-hover` | Hover background for inactive segments |
| `shadow-xs` | Active segment elevation |
| `color-border-focus` | Focus outline |
| `radius-md` | Control track corner radius |
| `radius-sm` | Segment corner radius |
