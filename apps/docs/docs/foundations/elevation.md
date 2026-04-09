---
sidebar_label: Elevation
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Styles</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Elevation</h1>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Elevation provides cues about the surface depth and stacking order of elements in an experience.
  </p>
</div>

<Tabs>
<TabItem value="usage" label="Usage" default>

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', justifyContent: 'center', gap: '32px', alignItems: 'flex-end', flexWrap: 'wrap'}}>
  <div style={{width: '120px', height: '120px', background: '#fff', borderRadius: '8px', boxShadow: '0px -4px 16px rgba(0, 0, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>Shallow</div>
  <div style={{width: '120px', height: '120px', background: '#fff', borderRadius: '8px', boxShadow: '0px -16px 48px rgba(0, 0, 0, 0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>Deep</div>
</div>

**Common alternative names**

Shadows, shadow tokens, surface tokens, depth, z-index

---

## Usage

A component's elevation is communicated with a shadow. This is determined by its elevation (z-index) and its relationship to other surfaces. Some everyday use cases for shadows are:

- Elements laid on top of a map
- A sheet overlaying a map
- A dialog overlaying a screen
- A snackbar overlapping content on a screen
- A button dock with content overflowing behind it

Don't use shadows to distinguish a component's boundary unless it is elevated above the main surface. For example, don't use a shadow around a banner or card; use color or borders instead.

Shadows shouldn't be used to indicate that something is tappable or can be scrolled but can be used to indicate a component is being dragged or picked up from its original position.

<div style={{background: '#FFF3DD', borderRadius: '8px', padding: '16px 20px', margin: '24px 0', fontSize: '14px'}}>
  Shadows should NOT flip in dark mode.
</div>

---

## Types

### Shallow

Shallow shadows are used for most use cases. They provide subtle depth for sticky headers, footers, and docked toolbars.

<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', margin: '24px 0'}}>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px'}}>
      <div style={{width: '200px', height: '140px', background: '#fff', borderRadius: '8px', boxShadow: '0px -4px 16px rgba(0, 0, 0, 0.12)'}} />
    </div>
    <div style={{marginTop: '12px'}}>
      <div style={{fontSize: '14px', fontWeight: 600}}>Shallow above</div>
      <div style={{fontSize: '13px', color: '#727272', marginTop: '4px'}}>Shadow</div>
      <div style={{fontSize: '13px'}}>0px -4px 16px 0px rgba(0, 0, 0, 0.12)</div>
    </div>
  </div>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px'}}>
      <div style={{width: '200px', height: '140px', background: '#fff', borderRadius: '8px', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)'}} />
    </div>
    <div style={{marginTop: '12px'}}>
      <div style={{fontSize: '14px', fontWeight: 600}}>Shallow below</div>
      <div style={{fontSize: '13px', color: '#727272', marginTop: '4px'}}>Shadow</div>
      <div style={{fontSize: '13px'}}>0px 4px 16px 0px rgba(0, 0, 0, 0.12)</div>
    </div>
  </div>
</div>

| Token | Value | Use case |
|---|---|---|
| `--shadow-shallow-above` | `0px -4px 16px rgba(0, 0, 0, 0.12)` | Sticky footers, bottom-docked toolbars |
| `--shadow-shallow-below` | `0px 4px 16px rgba(0, 0, 0, 0.12)` | Sticky headers, top nav bars |

### Deep

Deep shadows are available when you have a component with a darker background. It's difficult for the eye to distinguish a shadow behind darker elements, for example, on a Snackbar or Tooltip.

<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', margin: '24px 0'}}>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px'}}>
      <div style={{width: '200px', height: '140px', background: '#fff', borderRadius: '8px', boxShadow: '0px -16px 48px rgba(0, 0, 0, 0.22)'}} />
    </div>
    <div style={{marginTop: '12px'}}>
      <div style={{fontSize: '14px', fontWeight: 600}}>Deep above</div>
      <div style={{fontSize: '13px', color: '#727272', marginTop: '4px'}}>Shadow</div>
      <div style={{fontSize: '13px'}}>0px -16px 48px 0px rgba(0, 0, 0, 0.22)</div>
    </div>
  </div>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px'}}>
      <div style={{width: '200px', height: '140px', background: '#fff', borderRadius: '8px', boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.22)'}} />
    </div>
    <div style={{marginTop: '12px'}}>
      <div style={{fontSize: '14px', fontWeight: 600}}>Deep below</div>
      <div style={{fontSize: '13px', color: '#727272', marginTop: '4px'}}>Shadow</div>
      <div style={{fontSize: '13px'}}>0px 16px 48px 0px rgba(0, 0, 0, 0.22)</div>
    </div>
  </div>
</div>

| Token | Value | Use case |
|---|---|---|
| `--shadow-deep-above` | `0px -16px 48px rgba(0, 0, 0, 0.22)` | Bottom sheets, drawers sliding up |
| `--shadow-deep-below` | `0px 16px 48px rgba(0, 0, 0, 0.22)` | Top drawers, docked panels |

---

## Shadow scale

In addition to directional shadows, Arch UI provides a six-step primitive shadow scale from barely-there (`xs`) to dramatic (`2xl`). Each step roughly doubles the blur radius and offset of the one before it.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', justifyContent: 'center', gap: '32px', alignItems: 'flex-end', flexWrap: 'wrap'}}>
  <div style={{width: '100px', height: '100px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>xs</div>
  <div style={{width: '100px', height: '100px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px hsla(0, 0%, 0%, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>sm</div>
  <div style={{width: '100px', height: '100px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px hsla(0, 0%, 0%, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>md</div>
  <div style={{width: '100px', height: '100px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 16px hsla(0, 0%, 0%, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>lg</div>
  <div style={{width: '100px', height: '100px', background: '#fff', borderRadius: '8px', boxShadow: '0 8px 24px hsla(0, 0%, 0%, 0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>xl</div>
  <div style={{width: '100px', height: '100px', background: '#fff', borderRadius: '8px', boxShadow: '0 16px 48px hsla(0, 0%, 0%, 0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>2xl</div>
</div>

### Choosing the right shadow level

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

### Inner shadow

An inset shadow used for pressed states, input fields, or recessed surfaces.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', justifyContent: 'center'}}>
  <div style={{width: '200px', height: '80px', background: '#fff', borderRadius: '8px', boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600}}>shadow-inner</div>
</div>

### Shadow and motion

Avoid animating shadows on elements that do not change elevation. Shadow transitions have a rendering cost and should only fire when the depth relationship genuinely changes.

---

## Z-index layering

Z-index controls stacking order when elements overlap. Arch UI defines a fixed set of z-index tokens with generous gaps between tiers, so components never compete for position.

<div style={{background: '#000', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', color: '#fff'}}>
  <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{width: '100%', background: 'rgba(109, 170, 251, 0.15)', border: '1px solid rgba(109, 170, 251, 0.4)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between'}}>
        <span><strong>tooltip</strong> — Tooltip overlays</span>
        <code>700</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{width: '96%', background: 'rgba(109, 170, 251, 0.13)', border: '1px solid rgba(109, 170, 251, 0.35)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '2%'}}>
        <span><strong>toast</strong> — Notification toasts</span>
        <code>600</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{width: '92%', background: 'rgba(109, 170, 251, 0.11)', border: '1px solid rgba(109, 170, 251, 0.3)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '4%'}}>
        <span><strong>popover</strong> — Popovers and floating panels</span>
        <code>500</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{width: '88%', background: 'rgba(109, 170, 251, 0.09)', border: '1px solid rgba(109, 170, 251, 0.25)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '6%'}}>
        <span><strong>modal</strong> — Dialogs and modals</span>
        <code>400</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{width: '84%', background: 'rgba(109, 170, 251, 0.07)', border: '1px solid rgba(109, 170, 251, 0.2)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '8%'}}>
        <span><strong>overlay</strong> — Scrims and backdrops</span>
        <code>300</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{width: '80%', background: 'rgba(109, 170, 251, 0.05)', border: '1px solid rgba(109, 170, 251, 0.15)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '10%'}}>
        <span><strong>sticky</strong> — Sticky headers and footers</span>
        <code>200</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{width: '76%', background: 'rgba(109, 170, 251, 0.03)', border: '1px solid rgba(109, 170, 251, 0.1)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '12%'}}>
        <span><strong>dropdown</strong> — Dropdown menus</span>
        <code>100</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{width: '72%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '14%'}}>
        <span><strong>raised</strong> — Slightly above content</span>
        <code>10</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{width: '68%', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '16%'}}>
        <span><strong>base</strong> — Default document flow</span>
        <code>0</code>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{width: '64%', background: 'rgba(222, 17, 53, 0.08)', border: '1px solid rgba(222, 17, 53, 0.2)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginLeft: '18%'}}>
        <span><strong>hide</strong> — Visually hidden</span>
        <code>-1</code>
      </div>
    </div>
  </div>
</div>

### Stacking contexts

Remember that `z-index` only works within a stacking context. A `z-index: 700` tooltip inside a `z-index: 100` dropdown will not float above a `z-index: 400` modal. Key rules:

- **Creating a stacking context**: `position` + `z-index`, `transform`, `opacity < 1`, `filter`, `will-change`, and `isolation: isolate` all create new stacking contexts.
- **Keep contexts flat**: Avoid nesting stacking contexts unnecessarily. Portals (rendering at the document root) are the preferred pattern for modals, toasts, and tooltips.
- **Use portals for high-tier elements**: Any component using `--z-semantic-modal` or above should render via a portal to escape parent stacking contexts.

---

## Do / Don't

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
    <p>Use semantic z-index tokens (<code>--z-semantic-modal</code>) and render high-tier elements via portals.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Use magic numbers like <code>z-index: 9999</code>. They bypass the layering system and create stacking conflicts.</p>
  </div>
</div>

</TabItem>
<TabItem value="tokens" label="Tokens">

<h2>Shadow tokens</h2>

### Primitive shadow scale

| Token | CSS variable | Value |
|---|---|---|
| shadow-xs | `--shadow-xs` | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` |
| shadow-sm | `--shadow-sm` | `0 1px 4px hsla(0, 0%, 0%, 0.16)` |
| shadow-md | `--shadow-md` | `0 2px 8px hsla(0, 0%, 0%, 0.16)` |
| shadow-lg | `--shadow-lg` | `0 4px 16px hsla(0, 0%, 0%, 0.16)` |
| shadow-xl | `--shadow-xl` | `0 8px 24px hsla(0, 0%, 0%, 0.16)` |
| shadow-2xl | `--shadow-2xl` | `0 16px 48px hsla(0, 0%, 0%, 0.22)` |

### Directional and special shadows

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

<h2>Z-index tokens</h2>

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

| Token | CSS variable | Resolves to | Use in component CSS |
|---|---|---|---|
| z-semantic-dropdown | `--z-semantic-dropdown` | `{z.dropdown}` (100) | `Select`, `Combobox`, `MenuButton` |
| z-semantic-sticky | `--z-semantic-sticky` | `{z.sticky}` (200) | `StickyHeader`, `Dock` |
| z-semantic-overlay | `--z-semantic-overlay` | `{z.overlay}` (300) | `Overlay`, `Scrim` |
| z-semantic-modal | `--z-semantic-modal` | `{z.modal}` (400) | `Modal`, `Dialog`, `Drawer` |
| z-semantic-popover | `--z-semantic-popover` | `{z.popover}` (500) | `Popover`, `FloatingPanel` |
| z-semantic-toast | `--z-semantic-toast` | `{z.toast}` (600) | `Toast`, `Snackbar` |
| z-semantic-tooltip | `--z-semantic-tooltip` | `{z.tooltip}` (700) | `Tooltip` |

</TabItem>
<TabItem value="code" label="Code">

<h2>Shadow transitions</h2>

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

</TabItem>
<TabItem value="status" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
</Tabs>
