---
sidebar_label: Corner Radius
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<span className="foundation-header__label">Styles</span>

# Corner Radius

Corner radius controls the roundness of element edges. A consistent radius scale creates visual cohesion, reinforces hierarchy, and helps users distinguish between interactive and static surfaces.

<Tabs>
<TabItem value="overview" label="Overview" default>

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-end'}}>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '80px', height: '80px', background: '#0a0a0a', borderRadius: '0px'}} />
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '10px'}}>none</div>
    <div style={{fontSize: '12px', color: '#727272'}}>0px</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '80px', height: '80px', background: '#0a0a0a', borderRadius: '2px'}} />
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '10px'}}>xs</div>
    <div style={{fontSize: '12px', color: '#727272'}}>2px</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '80px', height: '80px', background: '#0a0a0a', borderRadius: '4px'}} />
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '10px'}}>sm</div>
    <div style={{fontSize: '12px', color: '#727272'}}>4px</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '80px', height: '80px', background: '#0a0a0a', borderRadius: '8px'}} />
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '10px'}}>md</div>
    <div style={{fontSize: '12px', color: '#727272'}}>8px</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '80px', height: '80px', background: '#0a0a0a', borderRadius: '12px'}} />
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '10px'}}>lg</div>
    <div style={{fontSize: '12px', color: '#727272'}}>12px</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '80px', height: '80px', background: '#0a0a0a', borderRadius: '16px'}} />
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '10px'}}>xl</div>
    <div style={{fontSize: '12px', color: '#727272'}}>16px</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '80px', height: '80px', background: '#0a0a0a', borderRadius: '24px'}} />
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '10px'}}>2xl</div>
    <div style={{fontSize: '12px', color: '#727272'}}>24px</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '80px', height: '80px', background: '#0a0a0a', borderRadius: '9999px'}} />
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '10px'}}>full</div>
    <div style={{fontSize: '12px', color: '#727272'}}>9999px</div>
  </div>
</div>

**Common alternative names**

Border radius, rounded corners, rounding

---

## Principles

### Consistency over creativity

Every rounded corner in the system should come from the radius scale. Ad-hoc values fragment the visual language and create subtle misalignments that erode trust in the interface.

### Radius follows size

Larger elements use larger radii. A small badge uses `--radius-xs`, while a full-width card uses `--radius-lg` or `--radius-xl`. This proportional relationship keeps corners looking balanced at every scale.

### Sharp has meaning

A radius of `none` (0px) is intentional, not a default. Use it when you want an element to feel structural, rigid, or boundary-defining -- such as table cells, dividers, or full-bleed containers.

---

## The scale

Arch UI provides eight primitive radius values that form a linear progression. The scale deliberately avoids odd or arbitrary values so that corners remain visually harmonious when elements sit side by side.

| Token | CSS variable | Value | Typical use |
|---|---|---|---|
| `radius.none` | `--radius-none` | 0px | Tables, dividers, full-bleed panels |
| `radius.xs` | `--radius-xs` | 2px | Badges, inline tags, small indicators |
| `radius.sm` | `--radius-sm` | 4px | Inputs, small buttons, tooltips |
| `radius.md` | `--radius-md` | 8px | Cards, dialogs, dropdowns |
| `radius.lg` | `--radius-lg` | 12px | Large cards, modals, image containers |
| `radius.xl` | `--radius-xl` | 16px | Hero sections, feature panels |
| `radius.2xl` | `--radius-2xl` | 24px | Marketing surfaces, large callouts |
| `radius.full` | `--radius-full` | 9999px | Pills, avatars, circular buttons |

---

## Nesting and inset radius

When an element with rounded corners contains a child that also has rounded corners, the inner radius should be smaller than the outer radius to maintain even visual spacing between the edges.

A good rule of thumb: **inner radius = outer radius - padding**.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap'}}>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '160px', height: '120px', background: '#fff', borderRadius: '16px', padding: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'stretch'}}>
      <div style={{flex: 1, background: '#0a0a0a', borderRadius: '8px'}} />
    </div>
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '12px', color: '#06C167'}}>Correct</div>
    <div style={{fontSize: '12px', color: '#727272'}}>Outer 16px, inner 8px (16 - 8 padding)</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '160px', height: '120px', background: '#fff', borderRadius: '16px', padding: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'stretch'}}>
      <div style={{flex: 1, background: '#0a0a0a', borderRadius: '16px'}} />
    </div>
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '12px', color: '#DE1135'}}>Incorrect</div>
    <div style={{fontSize: '12px', color: '#727272'}}>Same radius creates uneven gaps</div>
  </div>
</div>

---

## The `full` value

`--radius-full` uses `9999px` rather than `50%` because percentage-based radii behave differently on non-square elements. A percentage radius on a rectangle produces an elliptical curve, while a large pixel value creates a consistent pill shape regardless of the element's aspect ratio.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', justifyContent: 'center', gap: '32px', alignItems: 'center', flexWrap: 'wrap'}}>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '48px', height: '48px', background: '#0a0a0a', borderRadius: '9999px'}} />
    <div style={{fontSize: '12px', color: '#727272', marginTop: '8px'}}>Avatar (square)</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '120px', height: '40px', background: '#0a0a0a', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 500}}>Button</div>
    <div style={{fontSize: '12px', color: '#727272', marginTop: '8px'}}>Pill button</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '64px', height: '28px', background: '#0a0a0a', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 500}}>Tag</div>
    <div style={{fontSize: '12px', color: '#727272', marginTop: '8px'}}>Pill tag</div>
  </div>
</div>

</TabItem>
<TabItem value="usage" label="Usage">

<h2>Semantic component tokens</h2>

Arch UI provides a semantic layer of radius tokens scoped to components. These alias back to the primitive scale, giving you a stable API that can be re-themed without changing component code.

| Token | CSS variable | Resolves to | Value |
|---|---|---|---|
| `radius.component.sm` | `--radius-component-sm` | `--radius-sm` | 4px |
| `radius.component.md` | `--radius-component-md` | `--radius-md` | 8px |
| `radius.component.lg` | `--radius-component-lg` | `--radius-lg` | 12px |
| `radius.component.full` | `--radius-component-full` | `--radius-full` | 9999px |

Use component tokens when styling components. Use primitive tokens only in one-off layouts or exploratory design work.

<h2>Choosing the right radius</h2>

The radius you apply should relate to the element's size and role in the interface. Smaller, denser elements feel best with tighter corners, while larger containers benefit from more generous rounding.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0'}}>
  <div style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px', margin: '0 auto'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '28px', height: '28px', background: '#0a0a0a', borderRadius: '2px', flexShrink: 0}} />
      <div style={{fontSize: '14px'}}><strong>Compact elements</strong> — badges, tags, small icons: use <code>--radius-xs</code> or <code>--radius-sm</code></div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '48px', height: '36px', background: '#0a0a0a', borderRadius: '8px', flexShrink: 0}} />
      <div style={{fontSize: '14px'}}><strong>Medium elements</strong> — inputs, buttons, dropdowns: use <code>--radius-component-sm</code> or <code>--radius-component-md</code></div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '80px', height: '56px', background: '#0a0a0a', borderRadius: '12px', flexShrink: 0}} />
      <div style={{fontSize: '14px'}}><strong>Large containers</strong> — cards, modals, panels: use <code>--radius-component-lg</code> or <code>--radius-xl</code></div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '48px', height: '48px', background: '#0a0a0a', borderRadius: '9999px', flexShrink: 0}} />
      <div style={{fontSize: '14px'}}><strong>Circular / pill shapes</strong> — avatars, pill buttons: use <code>--radius-component-full</code></div>
    </div>
  </div>
</div>

<h2>Do / Don't</h2>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong> use tokens from the radius scale for all corner rounding.

```css
.card {
  border-radius: var(--radius-component-lg);
}
```

  </div>
  <div className="dont-block">
    <strong>Don't</strong> use arbitrary pixel values or hardcoded radii.

```css
.card {
  border-radius: 10px;
}
```

  </div>
</div>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong> reduce inner radius when nesting rounded elements.

```css
.card { border-radius: var(--radius-xl); padding: 8px; }
.card__media { border-radius: var(--radius-md); }
```

  </div>
  <div className="dont-block">
    <strong>Don't</strong> apply the same radius to parent and child when there is padding between them.

```css
.card { border-radius: var(--radius-xl); padding: 8px; }
.card__media { border-radius: var(--radius-xl); }
```

  </div>
</div>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong> use <code>--radius-full</code> for pill shapes across all aspect ratios.

```css
.pill { border-radius: var(--radius-full); }
```

  </div>
  <div className="dont-block">
    <strong>Don't</strong> use <code>50%</code> for pills -- it creates elliptical curves on rectangles.

```css
.pill { border-radius: 50%; }
```

  </div>
</div>

<h2>Mixed-radius corners</h2>

Occasionally a design calls for different radii on different corners -- for example, a card image that is rounded on top but flush on the bottom. Use CSS shorthand to target individual corners while still referencing tokens.

```css
.card__image {
  border-radius: var(--radius-component-lg) var(--radius-component-lg) 0 0;
}
```

When mixing radii, keep each value on-scale. Avoid combining a token value with a custom pixel value in the same shorthand declaration.

</TabItem>
<TabItem value="tokens" label="Tokens">

<h2>Primitive radius tokens</h2>

Primitive tokens define the raw radius values. They form the foundation of the scale and should rarely be referenced directly in component styles.

| CSS variable | Value | Description |
|---|---|---|
| `--radius-none` | 0px | No rounding; sharp corners |
| `--radius-xs` | 2px | Minimal rounding for compact elements |
| `--radius-sm` | 4px | Subtle rounding for small interactive elements |
| `--radius-md` | 8px | Default rounding for mid-size elements |
| `--radius-lg` | 12px | Generous rounding for larger surfaces |
| `--radius-xl` | 16px | Pronounced rounding for feature areas |
| `--radius-2xl` | 24px | Maximum standard rounding |
| `--radius-full` | 9999px | Full pill / circle shape |

<h2>Semantic component tokens</h2>

Component tokens alias to primitives and are the preferred choice for styling Arch UI components. They provide a stable abstraction: if the underlying scale changes, components update automatically.

| CSS variable | Alias | Resolved value |
|---|---|---|
| `--radius-component-sm` | `--radius-sm` | 4px |
| `--radius-component-md` | `--radius-md` | 8px |
| `--radius-component-lg` | `--radius-lg` | 12px |
| `--radius-component-full` | `--radius-full` | 9999px |

<h2>Token alias diagram</h2>

<div className="token-tier-diagram">
  <div className="token-tier-diagram__content">
    <div className="token-tier-diagram__tree">
      <div>
        <div className="token-tier-diagram__node"><code>--radius-sm</code> → 4px</div>
        <div className="token-tier-diagram__node"><code>--radius-md</code> → 8px</div>
        <div className="token-tier-diagram__node"><code>--radius-lg</code> → 12px</div>
        <div className="token-tier-diagram__node"><code>--radius-full</code> → 9999px</div>
      </div>
      <div className="token-tier-diagram__branches">
        <div className="token-tier-diagram__node"><code>--radius-component-sm</code></div>
        <div className="token-tier-diagram__node"><code>--radius-component-md</code></div>
        <div className="token-tier-diagram__node"><code>--radius-component-lg</code></div>
        <div className="token-tier-diagram__node"><code>--radius-component-full</code></div>
      </div>
    </div>
    <div className="token-tier-diagram__labels">
      <span className="token-tier-diagram__label">primitive</span>
      <span className="token-tier-diagram__label token-tier-diagram__label--component">component</span>
    </div>
  </div>
</div>

<h2>Using tokens in code</h2>

```css
/* Preferred: use the semantic component token */
.button {
  border-radius: var(--radius-component-sm);
}

/* Acceptable for one-off layouts */
.hero-banner {
  border-radius: var(--radius-2xl);
}

/* Never do this */
.card {
  border-radius: 8px; /* hardcoded -- use var(--radius-md) */
}
```

</TabItem>
</Tabs>
