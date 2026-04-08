---
sidebar_label: Spacing
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<span className="foundation-header__label">Styles</span>

# Spacing

Arch UI spacing tokens create consistent rhythm and density across every layout and component. The system is built on a compact primitive scale and a set of semantic aliases that encode where and how space is applied.

<Tabs>
<TabItem value="overview" label="Overview" default>

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', alignItems: 'flex-end', gap: '8px', flexWrap: 'wrap'}}>
  <div style={{width: '4px', height: '4px', background: '#266EF1', borderRadius: '2px'}} title="4px" />
  <div style={{width: '8px', height: '8px', background: '#266EF1', borderRadius: '2px'}} title="8px" />
  <div style={{width: '12px', height: '12px', background: '#266EF1', borderRadius: '2px'}} title="12px" />
  <div style={{width: '16px', height: '16px', background: '#266EF1', borderRadius: '2px'}} title="16px" />
  <div style={{width: '24px', height: '24px', background: '#266EF1', borderRadius: '3px'}} title="24px" />
  <div style={{width: '32px', height: '32px', background: '#266EF1', borderRadius: '3px'}} title="32px" />
  <div style={{width: '48px', height: '48px', background: '#266EF1', borderRadius: '4px'}} title="48px" />
  <div style={{width: '64px', height: '64px', background: '#266EF1', borderRadius: '4px'}} title="64px" />
  <div style={{width: '96px', height: '96px', background: '#266EF1', borderRadius: '4px'}} title="96px" />
  <div style={{width: '128px', height: '128px', background: '#266EF1', borderRadius: '4px'}} title="128px" />
</div>

**Common alternative names**

Whitespace, padding, margin, gap, gutters

---

## Principles

### Consistency over creativity

Every spacing decision should come from the token scale, not from eyeballing. When every element shares the same increments, layouts feel cohesive even when built by different teams or agents.

### Density is intentional

Tighter spacing communicates grouping; looser spacing communicates separation. The scale provides enough granularity for compact data-rich UIs and enough range for open editorial layouts.

### Semantic over primitive

Whenever possible, use a semantic spacing token (`--spacing-component-*`, `--spacing-inline-*`, `--spacing-layout-*`) instead of a raw primitive. Semantic tokens encode intent, making future density changes possible without touching every component.

---

## Scale

The primitive scale starts at 0 and progresses through 25 fixed values up to 128px. Steps are tighter at the small end (where single-pixel differences matter inside components) and wider at the large end (where layout-level gaps don't need fine granularity).

| Range | Steps | Purpose |
|-------|-------|---------|
| 0 -- 2 px | 0, 1, 2 | Hairline adjustments, borders, optical corrections |
| 4 -- 14 px | 4, 6, 8, 10, 12, 14 | Inner component padding, icon-to-label gaps |
| 16 -- 24 px | 16, 18, 20, 22, 24 | Standard component padding, field heights |
| 28 -- 48 px | 28, 32, 36, 40, 48 | Card padding, section separators |
| 56 -- 128 px | 56, 64, 80, 96, 112, 128 | Page-level layout spacing |

<div style={{background: '#f3f3f3', borderRadius: '8px', padding: '24px', margin: '24px 0', overflowX: 'auto'}}>
  <div style={{display: 'flex', alignItems: 'flex-end', gap: '12px'}}>
    {[0,1,2,4,6,8,10,12,14,16,18,20,22,24,28,32,36,40,48,56,64,80,96,112,128].map(v => (
      <div key={v} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'}}>
        <div style={{width: '16px', height: `${Math.max(v, 2)}px`, background: v === 0 ? 'transparent' : '#266EF1', borderRadius: '2px', border: v === 0 ? '1px dashed #999' : 'none'}} />
        <span style={{fontSize: '11px', color: '#727272', fontWeight: 600}}>{v}</span>
      </div>
    ))}
  </div>
</div>

---

## Usage

### Padding vs margin

Use **padding** to create space inside a container -- the breathing room around content. Use **margin** (or `gap`) to create space between sibling elements. In Arch UI components, prefer CSS `gap` on flex and grid containers over margin; it avoids collapsed-margin surprises and is easier to override with a single token.

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

Semantic component tokens (`--spacing-component-*`) control the internal padding and gaps of individual components -- buttons, inputs, cards, and dialogs. They follow a t-shirt size progression:

| Token | Value | Typical use |
|-------|-------|-------------|
| `--spacing-component-xs` | 4 px | Tight icon padding, badge insets |
| `--spacing-component-sm` | 8 px | Compact button padding, input padding-inline |
| `--spacing-component-md` | 12 px | Default internal padding |
| `--spacing-component-lg` | 16 px | Card body padding, dialog content area |
| `--spacing-component-xl` | 24 px | Large cards, hero sections inside components |

### Inline spacing

Inline tokens (`--spacing-inline-*`) handle the horizontal gaps between elements that sit on the same line -- icon + label, avatar + name, tag + tag.

| Token | Value | Typical use |
|-------|-------|-------------|
| `--spacing-inline-xs` | 2 px | Sub-pixel optical gaps |
| `--spacing-inline-sm` | 4 px | Icon-to-label gap (small) |
| `--spacing-inline-md` | 8 px | Icon-to-label gap (default), chip gap |
| `--spacing-inline-lg` | 12 px | Adjacent buttons, wider inline groups |

### Layout spacing

Layout tokens control page-level structure -- the gutter around content, the gap between major sections, and the gap between content blocks within a section.

| Token | Value | Typical use |
|-------|-------|-------------|
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

---

## Best practices

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
<TabItem value="tokens" label="Tokens">

<h2>Primitive tokens</h2>

Primitive spacing tokens map directly to fixed pixel values. They form the raw scale that semantic tokens reference. Use primitives only when no semantic token matches your use case.

| Token | Value | Preview |
|-------|-------|---------|
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

<h2>Semantic tokens -- Component</h2>

Component tokens define the internal spacing of UI elements. They alias to primitives so a global density change only requires updating these mappings.

| Token | Value | Resolves to | Preview |
|-------|-------|-------------|---------|
| `--spacing-component-xs` | 4 px | `--spacing-4` | <div style={{display:'inline-block', width:'4px', height:'16px', background:'#06C167'}} /> |
| `--spacing-component-sm` | 8 px | `--spacing-8` | <div style={{display:'inline-block', width:'8px', height:'16px', background:'#06C167'}} /> |
| `--spacing-component-md` | 12 px | `--spacing-12` | <div style={{display:'inline-block', width:'12px', height:'16px', background:'#06C167'}} /> |
| `--spacing-component-lg` | 16 px | `--spacing-16` | <div style={{display:'inline-block', width:'16px', height:'16px', background:'#06C167'}} /> |
| `--spacing-component-xl` | 24 px | `--spacing-24` | <div style={{display:'inline-block', width:'24px', height:'16px', background:'#06C167'}} /> |

<h2>Semantic tokens -- Inline</h2>

Inline tokens control horizontal gaps between adjacent elements on the same line.

| Token | Value | Resolves to | Preview |
|-------|-------|-------------|---------|
| `--spacing-inline-xs` | 2 px | `--spacing-2` | <div style={{display:'inline-block', width:'2px', height:'16px', background:'#F5A623'}} /> |
| `--spacing-inline-sm` | 4 px | `--spacing-4` | <div style={{display:'inline-block', width:'4px', height:'16px', background:'#F5A623'}} /> |
| `--spacing-inline-md` | 8 px | `--spacing-8` | <div style={{display:'inline-block', width:'8px', height:'16px', background:'#F5A623'}} /> |
| `--spacing-inline-lg` | 12 px | `--spacing-12` | <div style={{display:'inline-block', width:'12px', height:'16px', background:'#F5A623'}} /> |

<h2>Semantic tokens -- Layout</h2>

Layout tokens govern page-level structure: gutters, section gaps, and content gaps.

| Token | Value | Resolves to | Preview |
|-------|-------|-------------|---------|
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

To change the density of every component in the system, update the semantic-to-primitive mapping -- no component CSS needs to change.

</TabItem>
</Tabs>
