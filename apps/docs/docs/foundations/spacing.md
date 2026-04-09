---
sidebar_label: Spacing
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Styles</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Spacing</h1>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Arch UI uses standard sizes and spacing created from increments of 4. This provides consistent sizing and components that snap into place.
  </p>
</div>

<Tabs>
<TabItem value="usage" label="Usage" default>

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', alignItems: 'flex-end', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
    <div style={{width: '16px', height: '16px', background: 'rgba(222, 17, 53, 0.2)', borderRadius: '2px'}} />
    <span style={{fontSize: '14px', fontWeight: 700, color: '#DE1135'}}>16</span>
  </div>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
    <div style={{width: '24px', height: '24px', background: 'rgba(222, 17, 53, 0.2)', borderRadius: '2px'}} />
    <span style={{fontSize: '14px', fontWeight: 700, color: '#DE1135'}}>24</span>
  </div>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
    <div style={{width: '36px', height: '36px', background: 'rgba(222, 17, 53, 0.2)', borderRadius: '2px'}} />
    <span style={{fontSize: '14px', fontWeight: 700, color: '#DE1135'}}>36</span>
  </div>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
    <div style={{width: '48px', height: '48px', background: 'rgba(222, 17, 53, 0.2)', borderRadius: '2px'}} />
    <span style={{fontSize: '14px', fontWeight: 700, color: '#DE1135'}}>48</span>
  </div>
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
    <div style={{width: '64px', height: '64px', background: 'rgba(222, 17, 53, 0.2)', borderRadius: '2px'}} />
    <span style={{fontSize: '14px', fontWeight: 700, color: '#DE1135'}}>64</span>
  </div>
</div>

**Common alternative names**

Spacers, sizing units

---

## Anatomy

### Spacing interval

We use an incremental spacing scale with a root of 4 based on a modular scale with a major second ratio (1.125).

All grids, typography, and component constructions leverage this scale to produce a pixel-fitted and harmonious structure. Use this scale to create space between objects in product layouts.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0', overflowX: 'auto'}}>
  <div style={{display: 'flex', justifyContent: 'center', marginBottom: '8px'}}>
    <span style={{fontSize: '13px', fontWeight: 700, color: '#06C167'}}>16</span>
    <span style={{fontSize: '13px', fontWeight: 700, color: '#DE1135', marginLeft: '12px'}}>Core sizes</span>
  </div>
  <div style={{display: 'flex', alignItems: 'flex-end', gap: '6px', justifyContent: 'center'}}>
    {[4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 96, 128].map(v => (
      <div key={v} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'}}>
        <span style={{fontSize: '11px', fontWeight: [16, 24, 36, 48, 64].includes(v) ? 700 : 400, color: [16, 24, 36, 48, 64].includes(v) ? '#DE1135' : '#727272'}}>{v}</span>
        <div style={{width: '16px', height: `${Math.min(v, 80)}px`, background: [16, 24, 36, 48, 64].includes(v) ? 'rgba(222, 17, 53, 0.25)' : 'rgba(222, 17, 53, 0.12)', borderRadius: '2px'}} />
      </div>
    ))}
  </div>
  <div style={{display: 'flex', justifyContent: 'center', marginTop: '8px'}}>
    <span style={{fontSize: '11px', color: '#DE1135', fontWeight: 600}}>Units</span>
    <span style={{fontSize: '11px', color: '#727272', marginLeft: '16px'}}>1 &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; 5x &nbsp; 6x &nbsp; 7x &nbsp; 8x &nbsp; 9x &nbsp; 10x &nbsp; 12x &nbsp; 14x &nbsp; 16x &nbsp; 24x &nbsp; 32x</span>
  </div>
</div>

### Baseline grid

Built off the 4 spacing scale, the vertical grid provides a flexible structure that allows text to flow vertically along its baseline. This creates a consistent vertical rhythm across all product screens. Use multiples of 4 when defining measurements, spacing, and positioning elements.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px', margin: '24px 0'}}>
  <div style={{display: 'flex', flexDirection: 'column', gap: '0px'}}>
    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
      <div key={i} style={{height: '16px', borderTop: '1px solid rgba(222, 17, 53, 0.3)', width: '100%'}} />
    ))}
  </div>
</div>

### Core sizes

While all increments of 4 are available, designers will use a set of five archetype sizes that will cover 90% of their layouts.

> Note that not every asset should be displayed in all sizes. We don't show an xsmall avatar in this example, as its readability would be compromised.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0'}}>
  <div style={{display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap'}}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
      <span style={{fontSize: '14px', fontWeight: 700, color: '#DE1135'}}>64</span>
      <div style={{width: '64px', height: '64px', background: 'rgba(222, 17, 53, 0.2)', borderRadius: '4px'}} />
    </div>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
      <span style={{fontSize: '14px', fontWeight: 700, color: '#DE1135'}}>48</span>
      <div style={{width: '48px', height: '48px', background: 'rgba(222, 17, 53, 0.2)', borderRadius: '4px'}} />
    </div>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
      <span style={{fontSize: '14px', fontWeight: 700, color: '#DE1135'}}>36</span>
      <div style={{width: '36px', height: '36px', background: 'rgba(222, 17, 53, 0.2)', borderRadius: '3px'}} />
    </div>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
      <span style={{fontSize: '14px', fontWeight: 700, color: '#DE1135'}}>24</span>
      <div style={{width: '24px', height: '24px', background: 'rgba(222, 17, 53, 0.2)', borderRadius: '2px'}} />
    </div>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
      <span style={{fontSize: '14px', fontWeight: 700, color: '#DE1135'}}>16</span>
      <div style={{width: '16px', height: '16px', background: 'rgba(222, 17, 53, 0.2)', borderRadius: '2px'}} />
    </div>
  </div>
</div>

---

## Usage

### Padding vs margin

Use **padding** to create space inside a container — the breathing room around content. Use **margin** (or `gap`) to create space between sibling elements. In Arch UI components, prefer CSS `gap` on flex and grid containers over margin; it avoids collapsed-margin surprises and is easier to override with a single token.

```css
/* Padding inside a card */
.card {
  padding: var(--spacing-component-lg);          /* 16px */
}

/* Gap between stacked cards */
.card-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-layout-content-gap);         /* 24px */
}
```

### Component spacing

Semantic component tokens (`--spacing-component-*`) control the internal padding and gaps of individual components — buttons, inputs, cards, and dialogs. They follow a t-shirt size progression:

| Token | Value | Typical use |
|---|---|---|
| `--spacing-component-xs` | 4 px | Tight icon padding, badge insets |
| `--spacing-component-sm` | 8 px | Compact button padding, input padding-inline |
| `--spacing-component-md` | 12 px | Default internal padding |
| `--spacing-component-lg` | 16 px | Card body padding, dialog content area |
| `--spacing-component-xl` | 24 px | Large cards, hero sections inside components |

### Inline spacing

Inline tokens (`--spacing-inline-*`) handle the horizontal gaps between elements that sit on the same line — icon + label, avatar + name, tag + tag.

| Token | Value | Typical use |
|---|---|---|
| `--spacing-inline-xs` | 2 px | Sub-pixel optical gaps |
| `--spacing-inline-sm` | 4 px | Icon-to-label gap (small) |
| `--spacing-inline-md` | 8 px | Icon-to-label gap (default), chip gap |
| `--spacing-inline-lg` | 12 px | Adjacent buttons, wider inline groups |

### Layout spacing

Layout tokens control page-level structure — the gutter around content, the gap between major sections, and the gap between content blocks within a section.

| Token | Value | Typical use |
|---|---|---|
| `--spacing-layout-page-gutter` | 16 px | Left/right page margin on mobile-first layouts |
| `--spacing-layout-content-gap` | 24 px | Gap between content blocks within a section |
| `--spacing-layout-section-gap` | 48 px | Gap between major page sections |

```css
.page {
  padding-inline: var(--spacing-layout-page-gutter);
}

.page__sections {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-layout-section-gap);
}

.section__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-layout-content-gap);
}
```

### Phone layout

All mobile devices, both Android and iOS, follow the same grid system. The only variable height will be the status bar, which changes depending on OS and device.

|  | iOS | Android |
|---|---|---|
| Status bar height | Variable by device | Variable by device |
| Nav bar height | 44 | 48 |
| Left & right margin | 16 | 16 |
| Artwork column (centered in) | 64 | 64 |

---

## Do / Don't

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Use semantic tokens for component and layout spacing. They communicate intent and can be changed globally.</p>
    <code>padding: var(--spacing-component-md);</code>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Hard-code pixel values. They bypass the system and won't respond to future density changes.</p>
    <code>padding: 12px;</code>
  </div>
</div>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Use CSS <code>gap</code> with a spacing token on flex/grid parents to space children evenly.</p>
    <code>gap: var(--spacing-inline-md);</code>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Add margin to individual children to simulate gaps. It creates inconsistencies and requires overrides on first/last child.</p>
    <code>.child &#123; margin-right: 8px; &#125;</code>
  </div>
</div>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Reach for primitive tokens only when no semantic token fits. Document why in a comment.</p>
    <code>/* optical alignment override */
margin-top: var(--spacing-2);</code>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Use primitives for common patterns that already have semantic tokens. It hides the purpose of the value.</p>
    <code>padding: var(--spacing-12);</code>
  </div>
</div>

</TabItem>
<TabItem value="token-mapping" label="Token mapping">

<h2>Primitive tokens</h2>

Primitive spacing tokens map directly to fixed pixel values. They form the raw scale that semantic tokens reference. Use primitives only when no semantic token matches your use case.

| Token | Value | Preview |
|---|---|---|
| `--spacing-0` | 0 px | <div style={{display:'inline-block', width:'0px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-1` | 1 px | <div style={{display:'inline-block', width:'1px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-2` | 2 px | <div style={{display:'inline-block', width:'2px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-4` | 4 px | <div style={{display:'inline-block', width:'4px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-6` | 6 px | <div style={{display:'inline-block', width:'6px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-8` | 8 px | <div style={{display:'inline-block', width:'8px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-10` | 10 px | <div style={{display:'inline-block', width:'10px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-12` | 12 px | <div style={{display:'inline-block', width:'12px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-14` | 14 px | <div style={{display:'inline-block', width:'14px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-16` | 16 px | <div style={{display:'inline-block', width:'16px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-18` | 18 px | <div style={{display:'inline-block', width:'18px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-20` | 20 px | <div style={{display:'inline-block', width:'20px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-22` | 22 px | <div style={{display:'inline-block', width:'22px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-24` | 24 px | <div style={{display:'inline-block', width:'24px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-28` | 28 px | <div style={{display:'inline-block', width:'28px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-32` | 32 px | <div style={{display:'inline-block', width:'32px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-36` | 36 px | <div style={{display:'inline-block', width:'36px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-40` | 40 px | <div style={{display:'inline-block', width:'40px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-48` | 48 px | <div style={{display:'inline-block', width:'48px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-56` | 56 px | <div style={{display:'inline-block', width:'56px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-64` | 64 px | <div style={{display:'inline-block', width:'64px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-80` | 80 px | <div style={{display:'inline-block', width:'80px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-96` | 96 px | <div style={{display:'inline-block', width:'96px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-112` | 112 px | <div style={{display:'inline-block', width:'112px', height:'16px', background:'#266EF1'}} /> |
| `--spacing-128` | 128 px | <div style={{display:'inline-block', width:'128px', height:'16px', background:'#266EF1'}} /> |

<h2>Semantic tokens — Component</h2>

Component tokens define the internal spacing of UI elements. They alias to primitives so a global density change only requires updating these mappings.

| Token | Value | Resolves to | Preview |
|---|---|---|---|
| `--spacing-component-xs` | 4 px | `--spacing-4` | <div style={{display:'inline-block', width:'4px', height:'16px', background:'#06C167'}} /> |
| `--spacing-component-sm` | 8 px | `--spacing-8` | <div style={{display:'inline-block', width:'8px', height:'16px', background:'#06C167'}} /> |
| `--spacing-component-md` | 12 px | `--spacing-12` | <div style={{display:'inline-block', width:'12px', height:'16px', background:'#06C167'}} /> |
| `--spacing-component-lg` | 16 px | `--spacing-16` | <div style={{display:'inline-block', width:'16px', height:'16px', background:'#06C167'}} /> |
| `--spacing-component-xl` | 24 px | `--spacing-24` | <div style={{display:'inline-block', width:'24px', height:'16px', background:'#06C167'}} /> |

<h2>Semantic tokens — Inline</h2>

Inline tokens control horizontal gaps between adjacent elements on the same line.

| Token | Value | Resolves to | Preview |
|---|---|---|---|
| `--spacing-inline-xs` | 2 px | `--spacing-2` | <div style={{display:'inline-block', width:'2px', height:'16px', background:'#F5A623'}} /> |
| `--spacing-inline-sm` | 4 px | `--spacing-4` | <div style={{display:'inline-block', width:'4px', height:'16px', background:'#F5A623'}} /> |
| `--spacing-inline-md` | 8 px | `--spacing-8` | <div style={{display:'inline-block', width:'8px', height:'16px', background:'#F5A623'}} /> |
| `--spacing-inline-lg` | 12 px | `--spacing-12` | <div style={{display:'inline-block', width:'12px', height:'16px', background:'#F5A623'}} /> |

<h2>Semantic tokens — Layout</h2>

Layout tokens govern page-level structure: gutters, section gaps, and content gaps.

| Token | Value | Resolves to | Preview |
|---|---|---|---|
| `--spacing-layout-page-gutter` | 16 px | `--spacing-16` | <div style={{display:'inline-block', width:'16px', height:'16px', background:'#7B61FF'}} /> |
| `--spacing-layout-content-gap` | 24 px | `--spacing-24` | <div style={{display:'inline-block', width:'24px', height:'16px', background:'#7B61FF'}} /> |
| `--spacing-layout-section-gap` | 48 px | `--spacing-48` | <div style={{display:'inline-block', width:'48px', height:'16px', background:'#7B61FF'}} /> |

<h2>Alias chain</h2>

Spacing tokens follow the same two-tier alias pattern as all Arch UI tokens:

<div className="token-tier-diagram">
  <div className="token-tier-diagram__content">
    <div className="token-tier-diagram__tree">
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <div className="token-tier-diagram__node"><code>--spacing-component-md</code></div>
        <div className="token-tier-diagram__node"><code>--spacing-inline-md</code></div>
        <div className="token-tier-diagram__node"><code>--spacing-layout-content-gap</code></div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', fontSize: '20px', color: '#999', padding: '0 8px'}}>&#8594;</div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <div className="token-tier-diagram__node"><code>--spacing-12</code> <span style={{color:'#727272', fontSize:'12px'}}>12 px</span></div>
        <div className="token-tier-diagram__node"><code>--spacing-8</code> <span style={{color:'#727272', fontSize:'12px'}}>8 px</span></div>
        <div className="token-tier-diagram__node"><code>--spacing-24</code> <span style={{color:'#727272', fontSize:'12px'}}>24 px</span></div>
      </div>
    </div>
    <div className="token-tier-diagram__labels">
      <span className="token-tier-diagram__label token-tier-diagram__label--component">semantic</span>
      <span className="token-tier-diagram__label">primitive</span>
    </div>
  </div>
</div>

To change the density of every component in the system, update the semantic-to-primitive mapping — no component CSS needs to change.

</TabItem>
<TabItem value="changelog" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
</Tabs>
