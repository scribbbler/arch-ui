---
sidebar_label: Layout Grids
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>STYLES</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Layout Grids</h1>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Structural scaffolding of columns, gutters, and margins that keeps interfaces consistent across screen sizes.
  </p>
</div>

<Tabs>
<TabItem value="overview" label="Overview" default>

<div style={{background: '#0a0a0a', borderRadius: '12px', padding: '48px 40px', margin: '24px 0', overflow: 'hidden', position: 'relative'}}>
  <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px', maxWidth: '720px', margin: '0 auto'}}>
    {Array.from({length: 12}).map((_, i) => (
      <div key={i} style={{background: 'rgba(106, 170, 251, 0.15)', borderLeft: '1px solid rgba(106, 170, 251, 0.3)', borderRight: '1px solid rgba(106, 170, 251, 0.3)', height: '120px', borderRadius: '2px'}} />
    ))}
  </div>
  <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '720px', margin: '16px auto 0', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'}}>
    <span>Margin</span>
    <span>12 Columns + Gutters</span>
    <span>Margin</span>
  </div>
</div>

**Common alternative names**

Grid system, column grid, responsive grid, page grid

---

## Principles

### Consistency over creativity

A shared grid means every page in the system feels like it belongs. When teams diverge on column counts or gutter widths, the product feels fragmented. The grid is the one thing everyone agrees on.

### Content drives the breakpoint

We do not design for devices — we design for content. Our breakpoints exist where the layout needs to change, not where a particular phone screen ends. This keeps the system future-proof as device sizes evolve.

### Spacing from tokens, always

Gutters and margins are not arbitrary pixel values. They reference our semantic spacing tokens, so when spacing scales change across the system, grids update in lockstep with every other element.

---

## Anatomy

A layout grid is made up of three parts that work together to constrain content placement.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '40px 32px', margin: '24px 0'}}>
  <div style={{maxWidth: '600px', margin: '0 auto'}}>
    <div style={{display: 'flex', alignItems: 'stretch', height: '100px', position: 'relative'}}>
      <div style={{width: '32px', background: 'rgba(222, 17, 53, 0.12)', border: '1px dashed rgba(222, 17, 53, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#de1135', writingMode: 'vertical-lr'}}>M</div>
      <div style={{flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '0 12px'}}>
        <div style={{background: 'rgba(38, 110, 241, 0.12)', border: '1px dashed rgba(38, 110, 241, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#266EF1'}}>Col</div>
        <div style={{background: 'rgba(38, 110, 241, 0.12)', border: '1px dashed rgba(38, 110, 241, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#266EF1'}}>Col</div>
        <div style={{background: 'rgba(38, 110, 241, 0.12)', border: '1px dashed rgba(38, 110, 241, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#266EF1'}}>Col</div>
        <div style={{background: 'rgba(38, 110, 241, 0.12)', border: '1px dashed rgba(38, 110, 241, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#266EF1'}}>Col</div>
      </div>
      <div style={{width: '32px', background: 'rgba(222, 17, 53, 0.12)', border: '1px dashed rgba(222, 17, 53, 0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#de1135', writingMode: 'vertical-lr'}}>M</div>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '12px', fontWeight: 600}}>
      <span style={{color: '#de1135'}}>Margin</span>
      <span style={{color: '#266EF1'}}>Columns</span>
      <span style={{color: '#727272'}}>Gutters (between columns)</span>
      <span style={{color: '#de1135'}}>Margin</span>
    </div>
  </div>
</div>

| Part | Purpose | Token |
|---|---|---|
| **Columns** | Vertical divisions that content aligns to. Content spans one or more columns. | — |
| **Gutters** | The fixed space between columns. Provides breathing room so adjacent content does not collide. | `--spacing-layout-content-gap` (24px) |
| **Margins** | The outer padding on both sides of the grid. Keeps content from touching the screen edge. | `--spacing-layout-page-gutter` (16px) |

---

## Grid specifications

Arch UI defines four responsive grid configurations. Column count, gutter width, and margin width all adapt at each breakpoint.

### Breakpoint overview

| Breakpoint | Range | Columns | Gutter | Margin | Behaviour |
|---|---|---|---|---|---|
| **xs** (Mobile) | 0 – 599px | 4 | 16px | 16px | Fluid — columns stretch |
| **sm** (Tablet portrait) | 600 – 904px | 8 | 16px | 24px | Fluid — columns stretch |
| **md** (Tablet landscape) | 905 – 1239px | 12 | 24px | 32px | Fluid — columns stretch |
| **lg** (Desktop) | 1240px + | 12 | 24px | auto | Fixed max-width, centred |

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0', overflowX: 'auto'}}>
  <div style={{display: 'flex', gap: '24px', alignItems: 'flex-end', minWidth: '600px'}}>
    <div style={{textAlign: 'center'}}>
      <div style={{width: '80px', background: '#fff', borderRadius: '8px', padding: '12px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', height: '60px'}}>
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} style={{background: 'rgba(38, 110, 241, 0.2)', borderRadius: '1px'}} />
          ))}
        </div>
      </div>
      <div style={{fontSize: '11px', fontWeight: 600, marginTop: '8px'}}>Mobile</div>
      <div style={{fontSize: '10px', color: '#727272'}}>4 cols</div>
    </div>
    <div style={{textAlign: 'center'}}>
      <div style={{width: '140px', background: '#fff', borderRadius: '8px', padding: '12px 6px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '2px', height: '70px'}}>
          {Array.from({length: 8}).map((_, i) => (
            <div key={i} style={{background: 'rgba(38, 110, 241, 0.2)', borderRadius: '1px'}} />
          ))}
        </div>
      </div>
      <div style={{fontSize: '11px', fontWeight: 600, marginTop: '8px'}}>Tablet</div>
      <div style={{fontSize: '10px', color: '#727272'}}>8 cols</div>
    </div>
    <div style={{textAlign: 'center'}}>
      <div style={{width: '260px', background: '#fff', borderRadius: '8px', padding: '12px 8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2px', height: '80px'}}>
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} style={{background: 'rgba(38, 110, 241, 0.2)', borderRadius: '1px'}} />
          ))}
        </div>
      </div>
      <div style={{fontSize: '11px', fontWeight: 600, marginTop: '8px'}}>Desktop</div>
      <div style={{fontSize: '10px', color: '#727272'}}>12 cols</div>
    </div>
  </div>
</div>

### Maximum content width

On large screens (1240px and above), the grid stops expanding. Content locks to a maximum width of **1200px** and centres itself horizontally. Margins become `auto`, preventing ultra-wide layouts from stretching content to the point of poor readability.

</TabItem>
<TabItem value="columns" label="Columns">

<h2>Columns</h2>

Columns are the primary building blocks of the grid. Content is placed within columns — never in the gutters or margins.

<h3>Column spanning</h3>

Elements span one or more columns depending on their importance and the information density they carry. A card might span 3 of 12 columns on desktop, while a hero image spans all 12.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0'}}>
  <div style={{maxWidth: '600px', margin: '0 auto'}}>
    <div style={{fontSize: '11px', fontWeight: 600, color: '#727272', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>12-column grid — desktop</div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px', marginBottom: '16px'}}>
      {Array.from({length: 12}).map((_, i) => (
        <div key={i} style={{background: 'rgba(38, 110, 241, 0.08)', height: '16px', borderRadius: '2px'}} />
      ))}
    </div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px', marginBottom: '12px'}}>
      <div style={{gridColumn: 'span 12', background: '#266EF1', borderRadius: '6px', padding: '16px', color: '#fff', fontSize: '13px', fontWeight: 600, textAlign: 'center'}}>Full width — 12 columns</div>
    </div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px', marginBottom: '12px'}}>
      <div style={{gridColumn: 'span 8', background: '#266EF1', borderRadius: '6px', padding: '16px', color: '#fff', fontSize: '13px', fontWeight: 600, textAlign: 'center'}}>Primary — 8 cols</div>
      <div style={{gridColumn: 'span 4', background: '#6DAAFB', borderRadius: '6px', padding: '16px', color: '#fff', fontSize: '13px', fontWeight: 600, textAlign: 'center'}}>Sidebar — 4 cols</div>
    </div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px'}}>
      <div style={{gridColumn: 'span 4', background: '#A9C9FF', borderRadius: '6px', padding: '16px', fontSize: '13px', fontWeight: 600, textAlign: 'center'}}>Card — 4 cols</div>
      <div style={{gridColumn: 'span 4', background: '#A9C9FF', borderRadius: '6px', padding: '16px', fontSize: '13px', fontWeight: 600, textAlign: 'center'}}>Card — 4 cols</div>
      <div style={{gridColumn: 'span 4', background: '#A9C9FF', borderRadius: '6px', padding: '16px', fontSize: '13px', fontWeight: 600, textAlign: 'center'}}>Card — 4 cols</div>
    </div>
  </div>
</div>

<h3>Column behaviour across breakpoints</h3>

When the viewport shrinks past a breakpoint, column count decreases. Content that spanned a fraction of the desktop grid should reorganise to span proportionally more columns on smaller grids — or stack vertically when appropriate.

| Desktop (12 cols) | Tablet (8 cols) | Mobile (4 cols) |
|---|---|---|
| 3 of 12 (25%) | 4 of 8 (50%) | 4 of 4 (100%) |
| 4 of 12 (33%) | 4 of 8 (50%) | 4 of 4 (100%) |
| 6 of 12 (50%) | 8 of 8 (100%) | 4 of 4 (100%) |
| 8 of 12 (67%) | 8 of 8 (100%) | 4 of 4 (100%) |
| 12 of 12 (100%) | 8 of 8 (100%) | 4 of 4 (100%) |

<h3>Nesting grids</h3>

A column region can itself contain a sub-grid. When nesting, the inner grid uses the parent column's width as its total width, and applies the same gutter value. This is useful for complex cards or split-panel layouts where inner content needs its own columnar alignment.

</TabItem>
<TabItem value="gutters-margins" label="Gutters & Margins">

<h2>Gutters</h2>

Gutters are the consistent spaces between columns. They prevent adjacent content blocks from touching, giving the layout visual breathing room.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '40px 32px', margin: '24px 0'}}>
  <div style={{maxWidth: '480px', margin: '0 auto'}}>
    <div style={{display: 'flex', alignItems: 'stretch', gap: '0', height: '80px'}}>
      <div style={{flex: 1, background: 'rgba(38, 110, 241, 0.15)', borderRadius: '4px'}} />
      <div style={{width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
        <div style={{position: 'absolute', top: 0, bottom: 0, left: '50%', borderLeft: '1px dashed #de1135'}} />
        <span style={{background: '#f3f3f3', padding: '2px 4px', fontSize: '10px', fontWeight: 700, color: '#de1135', position: 'relative', zIndex: 1}}>24px</span>
      </div>
      <div style={{flex: 1, background: 'rgba(38, 110, 241, 0.15)', borderRadius: '4px'}} />
      <div style={{width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
        <div style={{position: 'absolute', top: 0, bottom: 0, left: '50%', borderLeft: '1px dashed #de1135'}} />
        <span style={{background: '#f3f3f3', padding: '2px 4px', fontSize: '10px', fontWeight: 700, color: '#de1135', position: 'relative', zIndex: 1}}>24px</span>
      </div>
      <div style={{flex: 1, background: 'rgba(38, 110, 241, 0.15)', borderRadius: '4px'}} />
    </div>
    <div style={{textAlign: 'center', marginTop: '12px', fontSize: '12px', fontWeight: 600, color: '#727272'}}>Gutters between columns use <code>--spacing-layout-content-gap</code></div>
  </div>
</div>

<h3>Gutter sizing</h3>

Gutter width is not arbitrary — it maps directly to a semantic spacing token.

| Breakpoint | Gutter token | Resolved value |
|---|---|---|
| xs (Mobile) | `--spacing-layout-page-gutter` | 16px |
| sm (Tablet) | `--spacing-layout-page-gutter` | 16px |
| md (Tablet landscape) | `--spacing-layout-content-gap` | 24px |
| lg (Desktop) | `--spacing-layout-content-gap` | 24px |

Smaller screens use tighter gutters (16px) because horizontal space is scarce. Larger screens use the standard content gap (24px) for comfortable separation.

<h2>Margins</h2>

Margins are the outer padding on the left and right edges of the grid. They prevent content from touching the browser chrome or screen edges.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '40px 32px', margin: '24px 0'}}>
  <div style={{maxWidth: '480px', margin: '0 auto'}}>
    <div style={{display: 'flex', alignItems: 'stretch', height: '80px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', background: '#fff'}}>
      <div style={{width: '32px', background: 'rgba(222, 17, 53, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px dashed rgba(222,17,53,0.3)'}}>
        <span style={{fontSize: '9px', fontWeight: 700, color: '#de1135', writingMode: 'vertical-lr'}}>16px</span>
      </div>
      <div style={{flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', padding: '8px'}}>
        {Array.from({length: 4}).map((_, i) => (
          <div key={i} style={{background: 'rgba(38, 110, 241, 0.12)', borderRadius: '2px'}} />
        ))}
      </div>
      <div style={{width: '32px', background: 'rgba(222, 17, 53, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px dashed rgba(222,17,53,0.3)'}}>
        <span style={{fontSize: '9px', fontWeight: 700, color: '#de1135', writingMode: 'vertical-lr'}}>16px</span>
      </div>
    </div>
    <div style={{textAlign: 'center', marginTop: '12px', fontSize: '12px', fontWeight: 600, color: '#727272'}}>Page margins use <code>--spacing-layout-page-gutter</code></div>
  </div>
</div>

<h3>Margin sizing</h3>

| Breakpoint | Margin | Token |
|---|---|---|
| xs (Mobile) | 16px | `--spacing-layout-page-gutter` |
| sm (Tablet) | 24px | `--spacing-layout-content-gap` |
| md (Tablet landscape) | 32px | `--spacing-32` |
| lg (Desktop) | auto (centred) | — |

On desktop, margins become `auto` because the grid locks to a maximum width and centres itself. The content never stretches beyond 1200px.

</TabItem>
<TabItem value="responsive" label="Responsive Behaviour">

<h2>Responsive behaviour</h2>

Layout grids are not static — they adapt as the viewport changes. Understanding how the grid responds at each breakpoint prevents layout bugs and inconsistent spacing.

<h3>Fluid vs. fixed</h3>

Below the `lg` breakpoint, the grid is **fluid**: columns stretch proportionally to fill the available width while gutters and margins remain fixed. Above `lg`, the grid becomes **fixed**: it locks to a max-width and centres within the viewport.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0'}}>
  <div style={{maxWidth: '560px', margin: '0 auto'}}>
    <div style={{fontSize: '11px', fontWeight: 600, color: '#727272', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Fluid (below 1240px)</div>
    <div style={{border: '2px solid #266EF1', borderRadius: '8px', padding: '12px', marginBottom: '24px', position: 'relative'}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px', height: '40px'}}>
        {Array.from({length: 12}).map((_, i) => (
          <div key={i} style={{background: 'rgba(38, 110, 241, 0.15)', borderRadius: '2px'}} />
        ))}
      </div>
      <div style={{position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#266EF1'}}>&#x2194;</div>
      <div style={{position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#266EF1'}}>&#x2194;</div>
    </div>
    <div style={{fontSize: '11px', fontWeight: 600, color: '#727272', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Fixed (1240px and above)</div>
    <div style={{border: '2px solid #ccc', borderRadius: '8px', padding: '12px 48px', position: 'relative'}}>
      <div style={{border: '2px solid #266EF1', borderRadius: '6px', padding: '8px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px', height: '40px'}}>
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} style={{background: 'rgba(38, 110, 241, 0.15)', borderRadius: '2px'}} />
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50)', fontSize: '10px', color: '#999'}}>auto</div>
      <div style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: '#999'}}>auto</div>
    </div>
  </div>
</div>

<h3>How content reflows</h3>

When the grid transitions from 12 columns to 8 or from 8 to 4, content should reflow rather than simply shrink. Here are the recommended patterns:

**Stacking:** Elements that sit side-by-side on desktop should stack vertically on mobile. A 3-column card row becomes a single-column stack.

**Collapsing:** Sidebars and secondary panels collapse behind a navigation toggle on smaller screens rather than squeezing into fewer columns.

**Prioritising:** On the narrowest screens, consider what content is essential. Navigation, hero content, and primary actions should remain visible; supplementary information can move below the fold.

<h3>Breakpoint reference</h3>

| Token-ready name | Min width | Max width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| xs | 0px | 599px | 4 | 16px | 16px |
| sm | 600px | 904px | 8 | 16px | 24px |
| md | 905px | 1239px | 12 | 24px | 32px |
| lg | 1240px | — | 12 | 24px | auto |

<h3>Vertical spacing between sections</h3>

While the grid handles horizontal layout, vertical rhythm between page sections is controlled by the `--spacing-layout-section-gap` token (48px). Within a section, use `--spacing-layout-content-gap` (24px) for the gap between related content blocks.

| Use case | Token | Value |
|---|---|---|
| Between page sections | `--spacing-layout-section-gap` | 48px |
| Between content blocks within a section | `--spacing-layout-content-gap` | 24px |
| Page edge padding (mobile) | `--spacing-layout-page-gutter` | 16px |

</TabItem>
<TabItem value="usage" label="Usage">

<h2>Usage guidelines</h2>

<h3>Implementation with CSS Grid</h3>

Arch UI layout grids are implemented using CSS Grid. The token-backed approach means you never hardcode pixel values for gutters or margins.

```css
/* Mobile-first fluid grid */
.page-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-layout-page-gutter);       /* 16px */
  padding: 0 var(--spacing-layout-page-gutter); /* 16px margins */
}

/* Tablet — 8 columns, wider margins */
@media (min-width: 600px) {
  .page-grid {
    grid-template-columns: repeat(8, 1fr);
    padding: 0 var(--spacing-layout-content-gap); /* 24px margins */
  }
}

/* Desktop — 12 columns */
@media (min-width: 905px) {
  .page-grid {
    grid-template-columns: repeat(12, 1fr);
    gap: var(--spacing-layout-content-gap);      /* 24px */
    padding: 0 var(--spacing-32);                /* 32px margins */
  }
}

/* Large desktop — fixed max-width, centred */
@media (min-width: 1240px) {
  .page-grid {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
  }
}
```

<h3>Spacing between sections</h3>

```css
.page-section {
  margin-bottom: var(--spacing-layout-section-gap); /* 48px */
}

.section__content-block + .section__content-block {
  margin-top: var(--spacing-layout-content-gap);    /* 24px */
}
```

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Use semantic layout tokens for all grid spacing. This keeps your layout in sync with the rest of the system when token values are updated.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Hardcode pixel values for gutters, margins, or section gaps. Values like <code>padding: 0 16px</code> bypass the token system and will drift over time.</p>
  </div>
</div>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Let content span full columns. Align element edges to column boundaries so the vertical rhythm of the grid is visible.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Place content in the gutters. Gutters are for separation — they should remain empty space between content regions.</p>
  </div>
</div>

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Use a mobile-first approach: start with 4 columns and layer on complexity at wider breakpoints.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Design desktop-first and try to cram 12 columns of content into a 4-column mobile layout as an afterthought.</p>
  </div>
</div>

<h3>Token quick reference</h3>

These are the layout-related spacing tokens available in the system. All are defined in `packages/tokens/src/semantic/spacing.json`.

| Token | Value | Purpose |
|---|---|---|
| `--spacing-layout-page-gutter` | 16px | Page-edge margins on mobile; small-screen gutters |
| `--spacing-layout-content-gap` | 24px | Gap between content blocks; desktop gutters |
| `--spacing-layout-section-gap` | 48px | Vertical space between major page sections |
| `--spacing-16` | 16px | Primitive backing the page gutter |
| `--spacing-24` | 24px | Primitive backing the content gap |
| `--spacing-32` | 32px | Tablet landscape margins |
| `--spacing-48` | 48px | Primitive backing the section gap |

</TabItem>
</Tabs>
