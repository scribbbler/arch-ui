---
sidebar_label: Layout grids
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Styles</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Layout grids</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    We use layout grids to ensure that our content aligns properly on the page.
  </p>
</div>

<Tabs>
<TabItem value="usage" label="Usage" default>

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', height: '360px', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
  <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px', maxWidth: '720px', margin: '0 auto', marginBottom: '24px'}}>
    {Array.from({length: 12}).map((_, i) => (
      <div key={i} style={{background: 'rgba(38, 110, 241, 0.12)', borderLeft: '1px solid rgba(38, 110, 241, 0.25)', borderRight: '1px solid rgba(38, 110, 241, 0.25)', height: '120px', borderRadius: '2px'}} />
    ))}
  </div>
  <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px', maxWidth: '720px', margin: '0 auto'}}>
    <div style={{gridColumn: 'span 4', background: 'rgba(38, 110, 241, 0.15)', borderRadius: '4px', height: '80px', border: '1px solid rgba(38, 110, 241, 0.25)'}} />
    <div style={{gridColumn: 'span 8', background: 'rgba(38, 110, 241, 0.15)', borderRadius: '4px', height: '80px', border: '1px solid rgba(38, 110, 241, 0.25)'}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', height: '100%', padding: '8px'}}>
        <div style={{background: 'rgba(38, 110, 241, 0.12)', borderRadius: '4px', border: '1px solid rgba(38, 110, 241, 0.15)'}} />
        <div style={{background: 'rgba(38, 110, 241, 0.12)', borderRadius: '4px', border: '1px solid rgba(38, 110, 241, 0.15)'}} />
        <div style={{background: 'rgba(38, 110, 241, 0.12)', borderRadius: '4px', border: '1px solid rgba(38, 110, 241, 0.15)'}} />
      </div>
    </div>
  </div>
</div>

**Common alternative names**

Layout grids, responsive grids, viewport grids, display grids

---

## Anatomy

The layout grid consists of 3 elements:

### Columns

This is where the content aligns to. Column sizes change based on the size of their container.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0'}}>
  <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px', height: '120px'}}>
    {Array.from({length: 12}).map((_, i) => (
      <div key={i} style={{background: '#6DAAFB', borderRadius: '2px', opacity: 0.6}} />
    ))}
  </div>
</div>

### Gutter

The fixed space between columns. This space remains the same even if the container size changes.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0'}}>
  <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px', height: '120px'}}>
    {Array.from({length: 12}).map((_, i) => (
      <div key={i} style={{background: 'rgba(106, 170, 251, 0.25)', borderRadius: '2px'}} />
    ))}
  </div>
</div>

### Margin

Space between the outer columns and its container. This space remains the same even if the container size changes.

<div style={{background: '#6DAAFB', borderRadius: '12px', padding: '32px 24px', margin: '24px 0', opacity: 0.3}}>
  <div style={{background: '#f3f3f3', borderRadius: '8px', padding: '0 24px'}}>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px', height: '120px'}}>
      {Array.from({length: 12}).map((_, i) => (
        <div key={i} style={{background: 'rgba(106, 170, 251, 0.25)', borderRadius: '2px'}} />
      ))}
    </div>
  </div>
</div>

---

## Usage

### Content

Align content to the columns on the grid. Any cells that do not fit on a single row will wrap to a new row.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0'}}>
  <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px'}}>
    {Array.from({length: 14}).map((_, i) => (
      <div key={i} style={{background: 'rgba(150, 150, 150, 0.4)', borderRadius: '4px', padding: '8px', fontSize: '12px', fontWeight: 600, textAlign: 'center', color: '#555'}}>{i + 1}</div>
    ))}
  </div>
</div>

### Span

Use CSS `grid-column: span N` to specify how many grid columns a cell should span.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0'}}>
  <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px'}}>
      {Array.from({length: 6}).map((_, i) => (
        <div key={i} style={{gridColumn: 'span 2', background: 'rgba(150, 150, 150, 0.4)', borderRadius: '4px', padding: '8px', fontSize: '11px', fontWeight: 600, textAlign: 'center', color: '#555'}}>span 2</div>
      ))}
    </div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px'}}>
      {Array.from({length: 3}).map((_, i) => (
        <div key={i} style={{gridColumn: 'span 4', background: 'rgba(150, 150, 150, 0.4)', borderRadius: '4px', padding: '8px', fontSize: '11px', fontWeight: 600, textAlign: 'center', color: '#555'}}>span 4</div>
      ))}
    </div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px'}}>
      {Array.from({length: 2}).map((_, i) => (
        <div key={i} style={{gridColumn: 'span 6', background: 'rgba(150, 150, 150, 0.4)', borderRadius: '4px', padding: '8px', fontSize: '11px', fontWeight: 600, textAlign: 'center', color: '#555'}}>span 6</div>
      ))}
    </div>
  </div>
</div>

If there aren't enough columns to accommodate the span, it will wrap to the next row.

### Hide

When content should be hidden at certain breakpoints, remove it from the flow entirely. This is useful for responsive layouts where some sections may be hidden on a specific breakpoint.

### Skip

Another common layout scenario is "offsetting" or "skipping" columns. Use `grid-column-start` to move content to a specific column position.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0'}}>
  <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '8px'}}>
    <div style={{gridColumn: '2 / span 2', background: 'rgba(150, 150, 150, 0.4)', borderRadius: '4px', padding: '8px', fontSize: '11px', fontWeight: 600, textAlign: 'center', color: '#555'}}>skip 1</div>
    <div style={{gridColumn: '5 / span 2', background: 'rgba(150, 150, 150, 0.4)', borderRadius: '4px', padding: '8px', fontSize: '11px', fontWeight: 600, textAlign: 'center', color: '#555'}}>skip 1</div>
  </div>
</div>

### Fixed-width content

You can specify content to have a fixed arbitrary width. The space of this element and the content next to it will be as wide as the gutter of its parent. The rest of the content will remain aligned to the outer grid. This is useful for things like a side-nav component.

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Align content to the columns. Place elements within column boundaries so the vertical rhythm of the grid is visible.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Align content to the gutters. Gutters are reserved to provide space between content blocks.</p>
  </div>
</div>

#### Exceptions

Intrinsic width items like tags and pill buttons don't need to span all the columns in a layout. Keep them at the default width.

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Keep intrinsic width components at their default width even if they do not span the columns.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Stretch intrinsic width components to fill a grid. Not every piece of content needs to span the columns.</p>
  </div>
</div>

---

## Behavior

You can set the layout grid to behave in different ways.

### Fluid

By default, the layout grid will take the container's full width. Columns stretch proportionally to fill the available space while gutters and margins remain fixed.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0'}}>
  <div style={{border: '2px solid #266EF1', borderRadius: '8px', padding: '12px', position: 'relative'}}>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px', height: '60px'}}>
      {Array.from({length: 12}).map((_, i) => (
        <div key={i} style={{background: 'rgba(38, 110, 241, 0.15)', borderRadius: '2px'}} />
      ))}
    </div>
    <div style={{textAlign: 'center', marginTop: '8px', fontSize: '12px', color: '#266EF1', fontWeight: 600}}>&#x2194; fluid</div>
  </div>
</div>

### Fixed

You can give the layout grid a fixed size, which will place it either centred or left/right aligned to the container. Margins become `auto` on large screens.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', margin: '24px 0'}}>
  <div style={{border: '2px solid #ccc', borderRadius: '8px', padding: '12px 48px', position: 'relative'}}>
    <div style={{border: '2px solid #266EF1', borderRadius: '6px', padding: '8px'}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px', height: '60px'}}>
        {Array.from({length: 12}).map((_, i) => (
          <div key={i} style={{background: 'rgba(38, 110, 241, 0.15)', borderRadius: '2px'}} />
        ))}
      </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '8px'}}>
      <span style={{fontSize: '11px', color: '#999'}}>flexible</span>
      <span style={{fontSize: '11px', color: '#266EF1', fontWeight: 600}}>&#x1F512; fixed</span>
      <span style={{fontSize: '11px', color: '#999'}}>flexible</span>
    </div>
  </div>
</div>

### Hybrid

You can combine multiple behaviours on a single screen. For example, a fixed sidebar alongside a fluid content area.

---

## Breakpoints

A container's horizontal size defines which layout grid it should be using. When a container reaches a certain different size a new layout grid will be applied. We're calling the sizes where this happens a breakpoint.

Resizing a container past a breakpoint will update its layout grid.

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

### Content

As the layout grid changes at breakpoints, the content adjusts to the new grid. Elements that span a fraction of the desktop grid should reorganise to span proportionally more columns on smaller grids — or stack vertically when appropriate.

| Desktop (12 cols) | Tablet (8 cols) | Mobile (4 cols) |
|---|---|---|
| 3 of 12 (25%) | 4 of 8 (50%) | 4 of 4 (100%) |
| 4 of 12 (33%) | 4 of 8 (50%) | 4 of 4 (100%) |
| 6 of 12 (50%) | 8 of 8 (100%) | 4 of 4 (100%) |
| 8 of 12 (67%) | 8 of 8 (100%) | 4 of 4 (100%) |
| 12 of 12 (100%) | 8 of 8 (100%) | 4 of 4 (100%) |

### Responsive content

All the properties you have available to position your content are responsive. They will accept multiple values that will be executed on the different breakpoints.

**Span** — Multiple span values will change the number of columns a cell spans at every breakpoint.

**Hide** — Setting the span to 0 will hide the cell. You can use this to show and hide a navigational element at certain screen sizes.

**Skip** — You can do the same for offset. A cell can have a span of 3 columns but a different skip for each breakpoint.

---

## Sub-grids

In order to sub-divide areas of the grid, you can use sub-grids — areas on your base grid that use a separate grid. A column region can itself contain a sub-grid. When nesting, the inner grid uses the parent column's width as its total width and applies the same gutter value.

For this, for every grid breakpoint, we provide a version with the margins removed, making it easier to align to the rest of the content. Like the base layout grid, the width of these areas dictates which grid to use.

---

## Maximum content width

On large screens (1240px and above), the grid stops expanding. Content locks to a maximum width of **1200px** and centres itself horizontally. Margins become `auto`, preventing ultra-wide layouts from stretching content to the point of poor readability.

---

## Do / Don't

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
    <p>Use a mobile-first approach: start with 4 columns and layer on complexity at wider breakpoints.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Design desktop-first and try to cram 12 columns of content into a 4-column mobile layout as an afterthought.</p>
  </div>
</div>

</TabItem>
<TabItem value="tokens" label="Tokens">

<h2>Layout spacing tokens</h2>

These are the layout-related spacing tokens available in the system. All are defined in `packages/tokens/src/semantic/spacing.json`.

<h3>Semantic tokens</h3>

| Token | CSS variable | Value | Purpose |
|---|---|---|---|
| spacing-layout-page-gutter | `--spacing-layout-page-gutter` | 16px | Page-edge margins on mobile; small-screen gutters |
| spacing-layout-content-gap | `--spacing-layout-content-gap` | 24px | Gap between content blocks; desktop gutters |
| spacing-layout-section-gap | `--spacing-layout-section-gap` | 48px | Vertical space between major page sections |

<h3>Primitive tokens used by the grid</h3>

| Token | CSS variable | Value | Grid role |
|---|---|---|---|
| spacing-16 | `--spacing-16` | 16px | Mobile gutter and margin |
| spacing-24 | `--spacing-24` | 24px | Desktop gutter, tablet margin |
| spacing-32 | `--spacing-32` | 32px | Tablet landscape margin |
| spacing-48 | `--spacing-48` | 48px | Section gap between page regions |

<h2>Breakpoint reference</h2>

| Name | Min width | Max width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| xs | 0px | 599px | 4 | 16px | 16px |
| sm | 600px | 904px | 8 | 16px | 24px |
| md | 905px | 1239px | 12 | 24px | 32px |
| lg | 1240px | — | 12 | 24px | auto |

</TabItem>
<TabItem value="code" label="Code">

<h2>Implementation</h2>

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

</TabItem>
<TabItem value="status-changelog" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
</Tabs>
