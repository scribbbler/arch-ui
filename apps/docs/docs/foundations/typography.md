---
sidebar_label: Typography
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<span className="foundation-header__label">Styles</span>

# Typography

Arch UI typography is flexible and modular and can be used in various ways. Below are the principles behind how our type system was created and examples of how it can be used.

<Tabs>
<TabItem value="overview" label="Overview" default>

<div className="type-hero">
  <div className="type-hero__sample" style={{fontSize: '96px', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.05em'}}>
    Display
  </div>
  <div className="type-hero__sample" style={{fontSize: '40px', fontWeight: 700, lineHeight: 1.2}}>
    Heading
  </div>
  <div className="type-hero__sample" style={{fontSize: '18px', fontWeight: 500, lineHeight: 1.4}}>
    Label
  </div>
  <div className="type-hero__sample" style={{fontSize: '16px', fontWeight: 400, lineHeight: 1.5}}>
    Paragraph
  </div>
</div>

**Common alternative names**

Type styles, labels, text styles, type, font

---

## Principles

### Go big

We prioritize larger font sizes because legibility and accessibility matter. Our type scale starts at 12px and reaches up to 96px for display text, giving content the space to breathe.

### Less is more

We optimize for fewer style options, so there's no decision paralysis when choosing the right type of style. We include a simple set of text styles to provide the right balance of control and creative freedom.

### Simple semantics

Our semantic groupings give you guidance on how the style can be used while not being overly prescriptive. Four roles — Display, Heading, Label, Paragraph — cover every use case.

---

## Anatomy

### Roles

Type styles are defined based on four roles — Display, Heading, Label, and Paragraph.

<div className="type-roles-grid">
  <div className="type-role-card">
    <div className="type-role-card__preview">
      <div style={{fontSize: '24px', fontWeight: 700, lineHeight: 1.3}}>
        We build interfaces that work for everyone. 0123456789
      </div>
    </div>
    <div className="type-role-card__label">Display</div>
    <p className="type-role-card__desc">The largest text on the screen is reserved for short, important text or numerals.</p>
  </div>
  <div className="type-role-card">
    <div className="type-role-card__preview">
      <div style={{fontSize: '20px', fontWeight: 700, lineHeight: 1.4}}>
        We build interfaces that work for everyone. 0123456789
      </div>
    </div>
    <div className="type-role-card__label">Heading</div>
    <p className="type-role-card__desc">Used to break up content into sections and provide a clear hierarchy of information.</p>
  </div>
  <div className="type-role-card">
    <div className="type-role-card__preview">
      <div style={{fontSize: '16px', fontWeight: 500, lineHeight: 1.4}}>
        We build interfaces that work for everyone. 0123456789
      </div>
    </div>
    <div className="type-role-card__label">Label</div>
    <p className="type-role-card__desc">A short phrase or sentence that provides context or information about a specific block of text.</p>
  </div>
  <div className="type-role-card">
    <div className="type-role-card__preview">
      <div style={{fontSize: '16px', fontWeight: 400, lineHeight: 1.5}}>
        We build interfaces that work for everyone. 0123456789
      </div>
    </div>
    <div className="type-role-card__label">Paragraph</div>
    <p className="type-role-card__desc">Longer blocks of text, used for mostly text-based content.</p>
  </div>
</div>

---

## Scale

**Modular scale**

Our type sizes create a visual rhythm and harmony. The scale provides a set of harmonious and hierarchical type sizes, starting with a base of 14px. We've chosen a key set of sizes from this scale that work well across interfaces.

**Line height**

Proper line height is achieved by pairing each font size with a specific line height value. This ensures all type aligns with our 4px baseline grid.

<div className="type-scale-visual">
  <span style={{fontSize: '12px'}}>12</span>
  <span style={{fontSize: '14px'}}>14</span>
  <span style={{fontSize: '16px'}}>16</span>
  <span style={{fontSize: '18px'}}>18</span>
  <span style={{fontSize: '20px', fontWeight: 700}}>20</span>
  <span style={{fontSize: '24px', fontWeight: 700}}>24</span>
  <span style={{fontSize: '28px', fontWeight: 700}}>28</span>
  <span style={{fontSize: '32px', fontWeight: 700}}>32</span>
  <span style={{fontSize: '36px', fontWeight: 700}}>36</span>
  <span style={{fontSize: '40px', fontWeight: 700}}>40</span>
  <span style={{fontSize: '44px', fontWeight: 700}}>44</span>
  <span style={{fontSize: '52px', fontWeight: 700}}>52</span>
  <span style={{fontSize: '64px', fontWeight: 700}}>…</span>
  <span style={{fontSize: '80px', fontWeight: 700}}>96</span>
</div>

---

## Size

Within our roles, we use four key sizes to ensure a clear typographic scale and rhythm. We also support additional sizes exclusively for creating more visual emphasis on an interface.

<div className="type-naming-diagram">
  <span style={{fontSize: '36px', fontWeight: 700}}>Display • Small</span>
  <div className="type-naming-diagram__labels">
    <span style={{color: '#de1135'}}>Role</span>
    <span style={{color: '#de1135'}}>Size</span>
  </div>
</div>

| Size | Paragraph | Label | Heading | Display |
|---|---|---|---|---|
| XSmall | Yes | Yes | Yes | Yes |
| Small | Yes | Yes | Yes | Yes |
| Medium | Yes | Yes | Yes | Yes |
| Large | Yes | Yes | Yes | Yes |
| XLarge | No | No | Yes | No |
| XXLarge | No | No | Yes | No |

---

## Fonts

The default font family that Arch UI uses is **Inter**. It comes with three distinct typeface stacks — **Sans**, **Serif**, and **Mono**.

They are all used in different sizes and weights throughout our typography tokens.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '24px 0'}}>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '8px', padding: '32px 16px', textAlign: 'center', marginBottom: '8px'}}>
      <span style={{fontSize: '20px', fontWeight: 500, fontFamily: "'Inter', system-ui, sans-serif"}}>Inter Sans</span>
    </div>
    <strong>Inter (Sans)</strong>
  </div>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '8px', padding: '32px 16px', textAlign: 'center', marginBottom: '8px'}}>
      <span style={{fontSize: '20px', fontWeight: 500, fontFamily: "Georgia, Cambria, serif"}}>Georgia Serif</span>
    </div>
    <strong>Georgia (Serif)</strong>
  </div>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '8px', padding: '32px 16px', textAlign: 'center', marginBottom: '8px'}}>
      <span style={{fontSize: '20px', fontWeight: 500, fontFamily: "ui-monospace, SFMono-Regular, monospace"}}>SF Mono</span>
    </div>
    <strong>Monospace</strong>
  </div>
</div>

| Token | Stack |
|---|---|
| `--typography-family-sans` | 'Inter', system-ui, -apple-system, sans-serif |
| `--typography-family-serif` | Georgia, Cambria, 'Times New Roman', Times, serif |
| `--typography-family-mono` | ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace |

---

## Weights

| Token | Value | Use case |
|---|---|---|
| `--typography-weight-regular` | 400 | Paragraph text, descriptions |
| `--typography-weight-medium` | 500 | Labels, buttons, form fields |
| `--typography-weight-semibold` | 600 | Emphasis, sub-headings |
| `--typography-weight-bold` | 700 | Headings, display text |
| `--typography-weight-extrabold` | 800 | Hero text, marketing |

</TabItem>
<TabItem value="tokens" label="Tokens">

## Display

| Scale | Font size | Line height | Weight | Letter spacing | Token prefix |
|---|---|---|---|---|---|
| XSmall | 36px | 44px | 700 | -0.025em | `--typography-scale-display-xsmall-*` |
| Small | 44px | 52px | 700 | -0.025em | `--typography-scale-display-small-*` |
| Medium | 52px | 64px | 700 | -0.05em | `--typography-scale-display-medium-*` |
| Large | 96px | 112px | 700 | -0.05em | `--typography-scale-display-large-*` |

## Heading

| Scale | Font size | Line height | Weight | Letter spacing | Token prefix |
|---|---|---|---|---|---|
| XSmall | 20px | 28px | 700 | 0em | `--typography-scale-heading-xsmall-*` |
| Small | 24px | 32px | 700 | 0em | `--typography-scale-heading-small-*` |
| Medium | 28px | 36px | 700 | 0em | `--typography-scale-heading-medium-*` |
| Large | 32px | 40px | 700 | 0em | `--typography-scale-heading-large-*` |
| XLarge | 36px | 44px | 700 | 0em | `--typography-scale-heading-xlarge-*` |
| XXLarge | 40px | 52px | 700 | 0em | `--typography-scale-heading-xxlarge-*` |

## Label

| Scale | Font size | Line height | Weight | Letter spacing | Token prefix |
|---|---|---|---|---|---|
| XSmall | 12px | 16px | 500 | 0em | `--typography-scale-label-xsmall-*` |
| Small | 14px | 16px | 500 | 0em | `--typography-scale-label-small-*` |
| Medium | 16px | 20px | 500 | 0em | `--typography-scale-label-medium-*` |
| Large | 18px | 24px | 500 | 0em | `--typography-scale-label-large-*` |

## Paragraph

| Scale | Font size | Line height | Weight | Letter spacing | Token prefix |
|---|---|---|---|---|---|
| XSmall | 12px | 20px | 400 | 0em | `--typography-scale-paragraph-xsmall-*` |
| Small | 14px | 20px | 400 | 0em | `--typography-scale-paragraph-small-*` |
| Medium | 16px | 24px | 400 | 0em | `--typography-scale-paragraph-medium-*` |
| Large | 18px | 28px | 400 | 0em | `--typography-scale-paragraph-large-*` |

## Code

| Scale | Font size | Line height | Weight | Letter spacing | Token prefix |
|---|---|---|---|---|---|
| Small | 12px | 20px | 400 | 0em | `--typography-scale-code-sm-*` |
| Medium | 14px | 20px | 400 | 0em | `--typography-scale-code-md-*` |

</TabItem>
<TabItem value="specs" label="Specs">

## Primitive size tokens

| Token | Value |
|---|---|
| `--typography-size-11` | 11px |
| `--typography-size-12` | 12px |
| `--typography-size-13` | 13px |
| `--typography-size-14` | 14px |
| `--typography-size-15` | 15px |
| `--typography-size-16` | 16px |
| `--typography-size-18` | 18px |
| `--typography-size-20` | 20px |
| `--typography-size-24` | 24px |
| `--typography-size-28` | 28px |
| `--typography-size-32` | 32px |
| `--typography-size-36` | 36px |
| `--typography-size-40` | 40px |
| `--typography-size-44` | 44px |
| `--typography-size-48` | 48px |
| `--typography-size-52` | 52px |
| `--typography-size-56` | 56px |
| `--typography-size-64` | 64px |
| `--typography-size-96` | 96px |

## Line height tokens

| Token | Value |
|---|---|
| `--typography-line-height-16` | 16px |
| `--typography-line-height-20` | 20px |
| `--typography-line-height-24` | 24px |
| `--typography-line-height-28` | 28px |
| `--typography-line-height-32` | 32px |
| `--typography-line-height-36` | 36px |
| `--typography-line-height-40` | 40px |
| `--typography-line-height-44` | 44px |
| `--typography-line-height-52` | 52px |
| `--typography-line-height-64` | 64px |
| `--typography-line-height-112` | 112px |

## Letter spacing tokens

| Token | Value |
|---|---|
| `--typography-letter-spacing-tighter` | -0.05em |
| `--typography-letter-spacing-tight` | -0.025em |
| `--typography-letter-spacing-normal` | 0em |
| `--typography-letter-spacing-wide` | 0.025em |
| `--typography-letter-spacing-wider` | 0.05em |

</TabItem>
</Tabs>
