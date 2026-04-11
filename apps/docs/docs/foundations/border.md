---
sidebar_label: Border
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Guidance from '@site/src/components/Guidance';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>STYLES</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Border</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A constrained set of width and color tokens that define element edges, separate content areas, and communicate interactivity.
  </p>
</div>

<Tabs>
<TabItem value="usage" label="Usage" default>

<div className="border-hero">
  <div className="border-hero__sample" style={{borderBottom: '1px solid #dddddd', padding: '16px 0'}}>
    <span style={{fontSize: '13px', color: '#727272', fontWeight: 500}}>thin / default</span>
    <span style={{fontSize: '13px', color: '#a6a6a6', float: 'right'}}>1px</span>
  </div>
  <div className="border-hero__sample" style={{borderBottom: '2px solid #dddddd', padding: '16px 0'}}>
    <span style={{fontSize: '13px', color: '#727272', fontWeight: 500}}>medium / strong</span>
    <span style={{fontSize: '13px', color: '#a6a6a6', float: 'right'}}>2px</span>
  </div>
  <div className="border-hero__sample" style={{borderBottom: '4px solid #dddddd', padding: '16px 0'}}>
    <span style={{fontSize: '13px', color: '#727272', fontWeight: 500}}>thick</span>
    <span style={{fontSize: '13px', color: '#a6a6a6', float: 'right'}}>4px</span>
  </div>
</div>

**Common alternative names**

Stroke, outline, rule, divider, separator

---

## Principles

### Borders are structural, not decorative

Borders should communicate meaning — grouping related content, separating distinct regions, or indicating interactivity. Avoid using borders purely for visual embellishment. Every border should serve a clear purpose in the layout.

---

### Use the minimum weight that works

Start with the default (thin) border weight. Only reach for stronger weights when you need to convey emphasis or create a clear visual hierarchy. Heavier borders draw attention, so use them sparingly to preserve their impact.

---

### Pair width and color intentionally

A border's weight and color work together to set its visual prominence. A thin border in a subtle color recedes into the background, while a thick border in a strong color demands attention. Match the combination to the element's importance in the hierarchy.

---

## Anatomy

Arch UI borders are defined by two properties, each controlled by tokens:

<div className="border-anatomy">
  <div className="border-anatomy__row">
    <span className="border-anatomy__label">Width</span>
    <span className="border-anatomy__desc">The thickness of the border line. Controlled by <code>--border-width-*</code> tokens. Ranges from 0px (none) to 4px (thick).</span>
  </div>
  <div className="border-anatomy__row">
    <span className="border-anatomy__label">Color</span>
    <span className="border-anatomy__desc">The colour of the border line. Controlled by <code>--color-border-*</code> tokens. Adapts automatically between light and dark themes.</span>
  </div>
</div>

Border style is always `solid` in Arch UI. We do not provide tokens for dashed or dotted borders because they introduce visual noise and have inconsistent rendering across browsers.

---

## Usage

### Separating content regions

Use `--border-width-default` with `--color-border-default` to create subtle dividers between content areas — for example, between list items, table rows, or sidebar and main content.

---

### Defining container boundaries

Use `--border-width-default` with `--color-border-subtle` for card and container outlines. The subtle color keeps the border from competing with the content inside.

---

### Communicating emphasis

Use `--border-width-strong` with `--color-border-strong` when a border needs to stand out — for example, an active tab indicator, a selected state, or a section header underline.

---

### Focus indicators

Every interactive element must have a visible focus ring. Use `--color-border-focus` for focus outlines to ensure accessibility compliance.

---

### Feedback states

Use semantic border color tokens to communicate validation states:

| State | Token | When to use |
|---|---|---|
| Danger | `--color-border-danger` | Validation errors, destructive action boundaries |
| Success | `--color-border-success` | Confirmed inputs, success states |
| Warning | `--color-border-warning` | Caution indicators, partial validation |

---

<Guidance.Grid>
  <Guidance.Do description="Use border tokens for all border widths and colours. Tokens adapt to themes automatically and keep the system consistent.">
    <code>border: var(--border-width-default) solid var(--color-border-default);</code>
  </Guidance.Do>
  <Guidance.Dont description="Hardcode pixel values or hex colours for borders. Raw values break theming and drift from the design system over time.">
    <code>border: 1px solid #e5e5e5;</code>
  </Guidance.Dont>
</Guidance.Grid>

<Guidance.Grid>
  <Guidance.Do description="Default to --border-width-default (1px) for most UI borders. Only escalate to strong or thick when the design requires emphasis.">
    <code>border-width: var(--border-width-default);</code>
  </Guidance.Do>
  <Guidance.Dont description="Use thick borders (4px) as a default container boundary. Heavy borders create visual clutter and reduce the prominence of intentional emphasis.">
    <code>border-width: var(--border-width-thick);</code>
  </Guidance.Dont>
</Guidance.Grid>

</TabItem>
<TabItem value="tokens" label="Tokens">

<h2>Border width tokens</h2>

Border width tokens control the thickness of border lines. They are split into two tiers: **primitive** tokens that define the raw values, and **semantic** tokens that assign meaning.

<h2>Primitive tokens</h2>

Primitive tokens hold the actual pixel values. Do not reference these directly in component CSS — use semantic tokens instead.

<div className="border-token-table">

| Token | Value | Preview |
|---|---|---|
| `--border-width-none` | 0px | <span className="border-token-preview" style={{borderBottomWidth: '0px'}}></span> |
| `--border-width-thin` | 1px | <span className="border-token-preview" style={{borderBottomWidth: '1px'}}></span> |
| `--border-width-medium` | 2px | <span className="border-token-preview" style={{borderBottomWidth: '2px'}}></span> |
| `--border-width-thick` | 4px | <span className="border-token-preview" style={{borderBottomWidth: '4px'}}></span> |

</div>

<h2>Semantic tokens</h2>

Semantic tokens reference primitives and carry intent. Use these in component styles.

<div className="border-token-table">

| Token | Resolves to | Value | Preview |
|---|---|---|---|
| `--border-width-default` | `--border-width-thin` | 1px | <span className="border-token-preview" style={{borderBottomWidth: '1px'}}></span> |
| `--border-width-strong` | `--border-width-medium` | 2px | <span className="border-token-preview" style={{borderBottomWidth: '2px'}}></span> |

</div>

<h2>Border color tokens</h2>

Border color tokens control the colour of borders. They adapt automatically between light and dark themes.

<h2>Semantic border colors</h2>

| Token | Light value | Dark value | Purpose |
|---|---|---|---|
| `--color-border-default` | #dddddd | #5e5e5e | Standard container and divider borders |
| `--color-border-subtle` | #e8e8e8 | #4b4b4b | Low-emphasis borders that recede visually |
| `--color-border-strong` | #a6a6a6 | #868686 | High-emphasis borders for active or selected states |
| `--color-border-focus` | #068bee | #6daafb | Focus ring for interactive elements (a11y required) |
| `--color-border-danger` | #f83446 | #fc7f79 | Error and destructive action borders |
| `--color-border-success` | #009a51 | #06c167 | Success and confirmation borders |
| `--color-border-warning` | #b97502 | #d79900 | Warning and caution borders |
| `--color-border-disabled` | #dddddd | #5e5e5e | Borders on disabled elements |

<h2>Feedback border colors</h2>

These tokens are used for feedback container backgrounds (alerts, banners) where the border is softer than the semantic border colour above.

| Token | Light value | Dark value |
|---|---|---|
| `--color-feedback-danger-border` | #ffd2cd | #950f22 |
| `--color-feedback-success-border` | #b1eac2 | #166c3b |
| `--color-feedback-warning-border` | #ffd688 | #6b4100 |
| `--color-feedback-info-border` | #cddeff | #175bcc |

<h2>Token tier diagram</h2>

The border width system follows the same two-tier architecture as all Arch UI tokens:

<div className="token-tier-diagram">
  <div className="token-tier-diagram__content">
    <div className="token-tier-diagram__tree">
      <div>
        <div className="token-tier-diagram__node"><code>border.width.thin</code> → 1px</div>
        <div className="token-tier-diagram__branches">
          <div className="token-tier-diagram__branch">
            <div className="token-tier-diagram__leaves">
              <div className="token-tier-diagram__node"><code>border.width.default</code></div>
            </div>
          </div>
        </div>
        <div style={{marginTop: '16px'}} className="token-tier-diagram__node"><code>border.width.medium</code> → 2px</div>
        <div className="token-tier-diagram__branches">
          <div className="token-tier-diagram__branch">
            <div className="token-tier-diagram__leaves">
              <div className="token-tier-diagram__node"><code>border.width.strong</code></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="token-tier-diagram__labels">
      <span className="token-tier-diagram__label">primitive</span>
      <span className="token-tier-diagram__label token-tier-diagram__label--component">semantic</span>
    </div>
  </div>
</div>

</TabItem>
<TabItem value="code" label="Code">

<h2>Separating content regions</h2>

```css
.list-item {
  border-bottom: var(--border-width-default) solid var(--color-border-default);
}
```

<h2>Defining container boundaries</h2>

```css
.card {
  border: var(--border-width-default) solid var(--color-border-subtle);
}
```

<h2>Communicating emphasis</h2>

```css
.tab--active {
  border-bottom: var(--border-width-strong) solid var(--color-border-strong);
}
```

<h2>Focus indicators</h2>

```css
.button:focus-visible {
  outline: var(--border-width-strong) solid var(--color-border-focus);
  outline-offset: 2px;
}
```

<h2>Feedback states</h2>

```css
.input--error {
  border: var(--border-width-default) solid var(--color-border-danger);
}
```

</TabItem>
<TabItem value="status" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
</Tabs>
