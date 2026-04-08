---
sidebar_label: Elevation
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>STYLES</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Elevation</h1>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Shadow and z-index tokens that create depth, direct attention, and communicate hierarchy between surfaces.
  </p>
</div>

<Tabs>
<TabItem value="overview" label="Overview" default>

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', justifyContent: 'center', gap: '32px', alignItems: 'flex-end', flexWrap: 'wrap'}}>
  <div style={{width: '120px', height: '120px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600}}>xs</div>
  <div style={{width: '120px', height: '120px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px hsla(0, 0%, 0%, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600}}>sm</div>
  <div style={{width: '120px', height: '120px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px hsla(0, 0%, 0%, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600}}>md</div>
  <div style={{width: '120px', height: '120px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 16px hsla(0, 0%, 0%, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600}}>lg</div>
  <div style={{width: '120px', height: '120px', background: '#fff', borderRadius: '8px', boxShadow: '0 8px 24px hsla(0, 0%, 0%, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600}}>xl</div>
  <div style={{width: '120px', height: '120px', background: '#fff', borderRadius: '8px', boxShadow: '0 16px 48px hsla(0, 0%, 0%, 0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600}}>2xl</div>
</div>

**Common alternative names**

Box shadow, drop shadow, depth, layer, z-index

---

## Principles

### Depth communicates hierarchy

Elevation is not decorative. Each shadow level signals how far a surface sits above the page. Higher elements demand more attention and take priority in the reading order.

### Less shadow, more intent

Overusing shadow flattens the hierarchy it is meant to create. Reserve higher elevations for elements that genuinely float above content — modals, popovers, tooltips — and keep most surfaces at ground level or subtle lift.

### Consistent stacking

Z-index values are tokenised with wide gaps between layers. This eliminates the "z-index arms race" where competing values spiral out of control. Every component category has a dedicated stacking lane.

---

## Shadow scale

Arch UI provides a six-step primitive shadow scale, from barely-there (`xs`) to dramatic (`2xl`). Each step roughly doubles the blur radius and offset of the one before it.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0'}}>
  <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
      <div style={{width: '64px', height: '48px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', flexShrink: 0}} />
      <div>
        <div style={{fontSize: '14px', fontWeight: 600}}>shadow-xs</div>
        <code style={{fontSize: '12px'}}>0 1px 2px 0 rgba(0,0,0,0.05)</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
      <div style={{width: '64px', height: '48px', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px hsla(0, 0%, 0%, 0.16)', flexShrink: 0}} />
      <div>
        <div style={{fontSize: '14px', fontWeight: 600}}>shadow-sm</div>
        <code style={{fontSize: '12px'}}>0 1px 4px hsla(0,0%,0%,0.16)</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
      <div style={{width: '64px', height: '48px', background: '#fff', borderRadius: '6px', boxShadow: '0 2px 8px hsla(0, 0%, 0%, 0.16)', flexShrink: 0}} />
      <div>
        <div style={{fontSize: '14px', fontWeight: 600}}>shadow-md</div>
        <code style={{fontSize: '12px'}}>0 2px 8px hsla(0,0%,0%,0.16)</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
      <div style={{width: '64px', height: '48px', background: '#fff', borderRadius: '6px', boxShadow: '0 4px 16px hsla(0, 0%, 0%, 0.16)', flexShrink: 0}} />
      <div>
        <div style={{fontSize: '14px', fontWeight: 600}}>shadow-lg</div>
        <code style={{fontSize: '12px'}}>0 4px 16px hsla(0,0%,0%,0.16)</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
      <div style={{width: '64px', height: '48px', background: '#fff', borderRadius: '6px', boxShadow: '0 8px 24px hsla(0, 0%, 0%, 0.16)', flexShrink: 0}} />
      <div>
        <div style={{fontSize: '14px', fontWeight: 600}}>shadow-xl</div>
        <code style={{fontSize: '12px'}}>0 8px 24px hsla(0,0%,0%,0.16)</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
      <div style={{width: '64px', height: '48px', background: '#fff', borderRadius: '6px', boxShadow: '0 16px 48px hsla(0, 0, 0, 0.22)', flexShrink: 0}} />
      <div>
        <div style={{fontSize: '14px', fontWeight: 600}}>shadow-2xl</div>
        <code style={{fontSize: '12px'}}>0 16px 48px hsla(0,0%,0%,0.22)</code>
      </div>
    </div>
  </div>
</div>

---

## Special shadows

In addition to the scale, Arch UI provides directional and inset shadows for specific layout needs.

### Inner shadow

An inset shadow used for pressed states, input fields, or recessed surfaces.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', justifyContent: 'center'}}>
  <div style={{width: '200px', height: '80px', background: '#fff', borderRadius: '8px', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600}}>shadow-inner</div>
</div>

| Token | Value |
|---|---|
| `--shadow-inner` | `inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)` |

### Directional shadows

Directional shadows cast upward or downward, useful for sticky headers, bottom sheets, and docked panels.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap'}}>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '140px', height: '80px', background: '#fff', borderRadius: '8px', boxShadow: '0px -4px 16px rgba(0, 0, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>shallow-above</div>
    <div style={{fontSize: '12px', color: '#727272', marginTop: '8px'}}>Sticky footer</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '140px', height: '80px', background: '#fff', borderRadius: '8px', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>shallow-below</div>
    <div style={{fontSize: '12px', color: '#727272', marginTop: '8px'}}>Sticky header</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '140px', height: '80px', background: '#fff', borderRadius: '8px', boxShadow: '0px -16px 48px rgba(0, 0, 0, 0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>deep-above</div>
    <div style={{fontSize: '12px', color: '#727272', marginTop: '8px'}}>Bottom sheet</div>
  </div>
  <div style={{textAlign: 'center'}}>
    <div style={{width: '140px', height: '80px', background: '#fff', borderRadius: '8px', boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>deep-below</div>
    <div style={{fontSize: '12px', color: '#727272', marginTop: '8px'}}>Docked panel</div>
  </div>
</div>

| Token | Value | Use case |
|---|---|---|
| `--shadow-shallow-above` | `0px -4px 16px rgba(0, 0, 0, 0.12)` | Sticky footers, bottom-docked toolbars |
| `--shadow-shallow-below` | `0px 4px 16px rgba(0, 0, 0, 0.12)` | Sticky headers, top nav bars |
| `--shadow-deep-above` | `0px -16px 48px rgba(0, 0, 0, 0.22)` | Bottom sheets, drawers sliding up |
| `--shadow-deep-below` | `0px 16px 48px rgba(0, 0, 0, 0.22)` | Top drawers, docked panels |

</TabItem>

<TabItem value="usage" label="Usage">

<h2>Semantic shadow tokens</h2>

Semantic tokens give shadows a role rather than a size. Use these in component CSS instead of primitive tokens — they alias into the scale, so if shadow intensities change globally, every component updates automatically.

| Semantic token | Resolves to | Intended use |
|---|---|---|
| `--shadow-component-sm` | `--shadow-sm` | Subtle card lift, default resting state |
| `--shadow-component-md` | `--shadow-md` | Hover states, active cards, raised sections |
| `--shadow-overlay` | `--shadow-xl` | Modals, dialogs, overlays |

```css
/* Correct — semantic token */
.card {
  box-shadow: var(--shadow-component-sm);
}
.card:hover {
  box-shadow: var(--shadow-component-md);
}

/* Incorrect — raw primitive */
.card {
  box-shadow: var(--shadow-sm);
}
```

<h2>Choosing the right shadow level</h2>

| Surface type | Recommended token | Why |
|---|---|---|
| Page content (flat) | None | Ground-level surfaces need no shadow |
| Cards at rest | `--shadow-component-sm` | Subtle lift to separate from background |
| Cards on hover | `--shadow-component-md` | Increased depth signals interactivity |
| Dropdowns and menus | `--shadow-overlay` | Must feel clearly above page content |
| Modals and dialogs | `--shadow-overlay` | Floating layer with scrim backdrop |
| Tooltips | `--shadow-component-md` | Small surface, moderate lift is enough |
| Sticky headers | `--shadow-shallow-below` | Directional shadow avoids visible edges on sides |
| Bottom sheets | `--shadow-deep-above` | Strong upward shadow for dramatic entrance |

<h2>Shadow and motion</h2>

When an element changes elevation — for example a card lifting on hover — transition the `box-shadow` property to make the change feel physical.

```css
.card {
  box-shadow: var(--shadow-component-sm);
  transition: box-shadow 200ms ease-out;
}

.card:hover {
  box-shadow: var(--shadow-component-md);
}
```

Avoid animating shadows on elements that do not change elevation. Shadow transitions have a rendering cost and should only fire when the depth relationship genuinely changes.

<h2>Do / Don't</h2>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Use semantic tokens (<code>--shadow-component-sm</code>, <code>--shadow-overlay</code>) so shadow intensity can be tuned globally.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Hardcode <code>box-shadow</code> values or use primitives like <code>--shadow-md</code> directly in component CSS.</p>
  </div>
</div>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Use directional shadows (<code>--shadow-shallow-below</code>) on sticky elements so shadow only casts in the scroll direction.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Apply an omnidirectional shadow like <code>--shadow-lg</code> on a sticky header — it creates unwanted glow on the sides.</p>
  </div>
</div>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Limit elevation changes to meaningful state shifts — hover, focus, expansion.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Add shadows to every surface. When everything is elevated, nothing stands out.</p>
  </div>
</div>

</TabItem>

<TabItem value="z-index" label="Z-Index">

<h2>Z-index layering</h2>

Z-index controls stacking order when elements overlap. Arch UI defines a fixed set of z-index tokens with generous gaps between tiers, so components never compete for position.

<div style={{background: '#000', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', color: '#fff', fontFamily: "'Inter', system-ui, sans-serif"}}>
  <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '100%', background: 'rgba(109, 170, 251, 0.15)', border: '1px solid rgba(109, 170, 251, 0.4)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between'}}>
        <span><strong>tooltip</strong> — Tooltip overlays</span>
        <code>700</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '96%', background: 'rgba(109, 170, 251, 0.13)', border: '1px solid rgba(109, 170, 251, 0.35)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '2%'}}>
        <span><strong>toast</strong> — Notification toasts</span>
        <code>600</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '92%', background: 'rgba(109, 170, 251, 0.11)', border: '1px solid rgba(109, 170, 251, 0.3)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '4%'}}>
        <span><strong>popover</strong> — Popovers and floating panels</span>
        <code>500</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '88%', background: 'rgba(109, 170, 251, 0.09)', border: '1px solid rgba(109, 170, 251, 0.25)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '6%'}}>
        <span><strong>modal</strong> — Dialogs and modals</span>
        <code>400</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '84%', background: 'rgba(109, 170, 251, 0.07)', border: '1px solid rgba(109, 170, 251, 0.2)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '8%'}}>
        <span><strong>overlay</strong> — Scrims and backdrops</span>
        <code>300</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '80%', background: 'rgba(109, 170, 251, 0.05)', border: '1px solid rgba(109, 170, 251, 0.15)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '10%'}}>
        <span><strong>sticky</strong> — Sticky headers and footers</span>
        <code>200</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '76%', background: 'rgba(109, 170, 251, 0.03)', border: '1px solid rgba(109, 170, 251, 0.1)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '12%'}}>
        <span><strong>dropdown</strong> — Dropdown menus</span>
        <code>100</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '72%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '14%'}}>
        <span><strong>raised</strong> — Slightly above content</span>
        <code>10</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '68%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '16%'}}>
        <span><strong>base</strong> — Default document flow</span>
        <code>0</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
      <div style={{width: '64%', background: 'rgba(222, 17, 53, 0.08)', border: '1px solid rgba(222, 17, 53, 0.2)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '18%'}}>
        <span><strong>hide</strong> — Visually hidden</span>
        <code>-1</code>
      </div>
    </div>
  </div>
</div>

<h2>Primitive z-index tokens</h2>

These are the raw stacking values. Use them only when building new layout primitives or utilities.

| Token | Value | Purpose |
|---|---|---|
| `--z-hide` | `-1` | Visually hidden elements that must sit behind content |
| `--z-base` | `0` | Default stacking — normal document flow |
| `--z-raised` | `10` | Slightly above siblings (e.g. a focused card) |
| `--z-dropdown` | `100` | Dropdown menus and select lists |
| `--z-sticky` | `200` | Sticky headers, footers, sidebars |
| `--z-overlay` | `300` | Overlay scrims and backdrops |
| `--z-modal` | `400` | Modal dialogs |
| `--z-popover` | `500` | Popovers, floating panels |
| `--z-toast` | `600` | Toast notifications |
| `--z-tooltip` | `700` | Tooltip overlays (always on top) |

<h2>Semantic z-index tokens</h2>

Semantic tokens alias the primitives and should be used in component CSS. They carry intent, making code self-documenting.

| Token | Resolves to | Use in component CSS |
|---|---|---|
| `--z-semantic-dropdown` | `--z-dropdown` (100) | `Select`, `Combobox`, `MenuButton` |
| `--z-semantic-sticky` | `--z-sticky` (200) | `StickyHeader`, `Dock` |
| `--z-semantic-overlay` | `--z-overlay` (300) | `Overlay`, `Scrim` |
| `--z-semantic-modal` | `--z-modal` (400) | `Modal`, `Dialog`, `Drawer` |
| `--z-semantic-popover` | `--z-popover` (500) | `Popover`, `FloatingPanel` |
| `--z-semantic-toast` | `--z-toast` (600) | `Toast`, `Snackbar` |
| `--z-semantic-tooltip` | `--z-tooltip` (700) | `Tooltip` |

```css
/* Correct — semantic z-index */
.modal-backdrop {
  z-index: var(--z-semantic-overlay);
}
.modal-dialog {
  z-index: var(--z-semantic-modal);
}

/* Incorrect — magic number */
.modal-dialog {
  z-index: 9999;
}
```

<h2>Why wide gaps?</h2>

Each tier is separated by 100 (or more at the low end). This leaves room for sub-layers within a tier without colliding with the next. For example, a dropdown's arrow indicator at `z-index: calc(var(--z-semantic-dropdown) + 1)` will never reach `--z-sticky` at 200.

If you find yourself needing more than a handful of sub-layers within a single tier, that is a signal the component structure should be flattened rather than stacked deeper.

<h2>Stacking contexts</h2>

Remember that `z-index` only works within a stacking context. A `z-index: 700` tooltip inside a `z-index: 100` dropdown will not float above a `z-index: 400` modal. Key rules:

- **Creating a stacking context**: `position` + `z-index`, `transform`, `opacity < 1`, `filter`, `will-change`, and `isolation: isolate` all create new stacking contexts.
- **Keep contexts flat**: Avoid nesting stacking contexts unnecessarily. Portals (rendering at the document root) are the preferred pattern for modals, toasts, and tooltips.
- **Use portals for high-tier elements**: Any component using `--z-semantic-modal` or above should render via a portal to escape parent stacking contexts.

</TabItem>

<TabItem value="tokens" label="Token Reference">

<h2>All shadow tokens</h2>

### Primitive shadow scale

| Token | CSS variable | Value |
|---|---|---|
| shadow-xs | `--shadow-xs` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` |
| shadow-sm | `--shadow-sm` | `0 1px 4px hsla(0, 0%, 0%, 0.16)` |
| shadow-md | `--shadow-md` | `0 2px 8px hsla(0, 0%, 0%, 0.16)` |
| shadow-lg | `--shadow-lg` | `0 4px 16px hsla(0, 0%, 0%, 0.16)` |
| shadow-xl | `--shadow-xl` | `0 8px 24px hsla(0, 0%, 0%, 0.16)` |
| shadow-2xl | `--shadow-2xl` | `0 16px 48px hsla(0, 0%, 0%, 0.22)` |

### Special shadows

| Token | CSS variable | Value |
|---|---|---|
| shadow-inner | `--shadow-inner` | `inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)` |
| shadow-shallow-above | `--shadow-shallow-above` | `0px -4px 16px rgba(0, 0, 0, 0.12)` |
| shadow-shallow-below | `--shadow-shallow-below` | `0px 4px 16px rgba(0, 0, 0, 0.12)` |
| shadow-deep-above | `--shadow-deep-above` | `0px -16px 48px rgba(0, 0, 0, 0.22)` |
| shadow-deep-below | `--shadow-deep-below` | `0px 16px 48px rgba(0, 0, 0, 0.22)` |

### Semantic shadow tokens

| Token | CSS variable | Resolves to |
|---|---|---|
| shadow-component-sm | `--shadow-component-sm` | `{shadow.sm}` |
| shadow-component-md | `--shadow-component-md` | `{shadow.md}` |
| shadow-overlay | `--shadow-overlay` | `{shadow.xl}` |

<h2>All z-index tokens</h2>

### Primitive z-index

| Token | CSS variable | Value |
|---|---|---|
| z-hide | `--z-hide` | `-1` |
| z-base | `--z-base` | `0` |
| z-raised | `--z-raised` | `10` |
| z-dropdown | `--z-dropdown` | `100` |
| z-sticky | `--z-sticky` | `200` |
| z-overlay | `--z-overlay` | `300` |
| z-modal | `--z-modal` | `400` |
| z-popover | `--z-popover` | `500` |
| z-toast | `--z-toast` | `600` |
| z-tooltip | `--z-tooltip` | `700` |

### Semantic z-index

| Token | CSS variable | Resolves to |
|---|---|---|
| z-semantic-dropdown | `--z-semantic-dropdown` | `{z.dropdown}` (100) |
| z-semantic-sticky | `--z-semantic-sticky` | `{z.sticky}` (200) |
| z-semantic-overlay | `--z-semantic-overlay` | `{z.overlay}` (300) |
| z-semantic-modal | `--z-semantic-modal` | `{z.modal}` (400) |
| z-semantic-popover | `--z-semantic-popover` | `{z.popover}` (500) |
| z-semantic-toast | `--z-semantic-toast` | `{z.toast}` (600) |
| z-semantic-tooltip | `--z-semantic-tooltip` | `{z.tooltip}` (700) |

</TabItem>
</Tabs>
