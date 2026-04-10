---
sidebar_label: Typography
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>STYLES</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Typography</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Arch typography is flexible and modular and can be used in various ways. Below are the principles behind how our type system was created and examples of how it can be used.
  </p>
</div>

<Tabs>
<TabItem value="usage" label="Usage" default>

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

We prioritize larger font sizes because Arch values legibility and accessibility. We love our type and aren't afraid to let it shine.

### Less is more

We optimize for fewer style options, so there's no decision paralysis when choosing the right type of style. We include a simple set of text styles to provide the right balance of control and creative freedom.

### Simple semantics

Our semantic groupings give you guidance on how the style can be used while not being overly prescriptive.

---

## Anatomy

### Roles

Type styles are defined based on four roles: Display, Heading, Label, and Paragraph.

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

### Scale

**Modular scale**

Much like notes written in this key on a music scale, our type sizes create a visual rhythm and harmony that is as pleasing to the eyes as music is to the ears.

Our scale is modeled after the intervals in a major second musical scale (ratio of 8:9). Songs created with the major second musical scale are upbeat and happy, the feelings we want our design system to evoke. Some common examples are "Happy Birthday" and "Frère Jacques."

Arch UI leverages a modular scale to define a set of harmonious and hierarchical type sizes. It starts with a base font size of 14 and scales by multiplying 1.125 at each interval. We've chosen a key set of sizes from this scale that work well across interfaces.

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
  <span style={{fontSize: '64px', fontWeight: 700}}>...</span>
  <span style={{fontSize: '80px', fontWeight: 700}}>96</span>
</div>

---

**Line height**

Proper line height is achieved by multiplying the type size by 1.45 and rounding to the nearest interval of 4. This ensures all type aligns with our 4 px baseline grid.

<div className="type-line-height-demo">
  <div className="type-line-height-demo__text">
    We build interfaces that work for everyone
  </div>
</div>

---

### Spacing

Calculate the space below a text box by subtracting the font size from the line height, then round the result to a 4-interval. Add an extra line height for spaces below Paragraphs.

`Spacing = (line-height - font-size) rounded to nearest 4`

---

### Size

Within our roles, we use four key sizes to ensure a clear typographic scale and rhythm:

We also support additional sizes exclusively for creating more visual emphasis on an interface.

<div className="type-naming-diagram">
  <span style={{fontSize: '36px', fontWeight: 700}}>Display &bull; Small</span>
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
| X Large | No | No | Yes | No |
| XX Large | No | No | Yes | No |

---

### Fonts

The default font family that Arch UI uses is **Inter**. It comes with three distinct typefaces: **Display**, **Text**, and **Mono**.

They are all used in different sizes and weights throughout our [typography tokens](/foundations/tokens).

<div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '24px 0'}}>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '8px', padding: '32px 16px', textAlign: 'center', marginBottom: '8px'}}>
      <span style={{fontSize: '20px', fontWeight: 700, fontFamily: "'Inter', system-ui, sans-serif"}}>Inter Display</span>
    </div>
    <strong>Inter Display</strong>
  </div>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '8px', padding: '32px 16px', textAlign: 'center', marginBottom: '8px'}}>
      <span style={{fontSize: '20px', fontWeight: 400, fontFamily: "'Inter', system-ui, sans-serif"}}>Inter Text</span>
    </div>
    <strong>Inter Text</strong>
  </div>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '8px', padding: '32px 16px', textAlign: 'center', marginBottom: '8px'}}>
      <span style={{fontSize: '20px', fontWeight: 500, fontFamily: "ui-monospace, SFMono-Regular, monospace"}}>Inter Mono</span>
    </div>
    <strong>Inter Mono</strong>
  </div>
</div>

| Token | Stack |
|---|---|
| `--typography-family-sans` | 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif |
| `--typography-family-serif` | Georgia, Cambria, 'Times New Roman', Times, serif |
| `--typography-family-mono` | ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace |

:::tip
Looking for our font files? You can download Inter from [Google Fonts](https://fonts.google.com/specimen/Inter). The serif and monospace stacks use system fonts that ship with every major operating system.
:::

---

#### Inter Mono

We've created a sister version of our main typographic styles, which solely uses Inter Mono. It is designed specifically for money and number-related use cases.

<div className="type-mono-hero">
  <span style={{fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace", fontSize: '64px', fontWeight: 700, letterSpacing: '-0.025em'}}>$1,234,567,890</span>
</div>

**Monospaced vs Regular typefaces**

A monospaced font is designed in a way that each character occupies the same amount of space on a horizontal line of text and offers better vertical alignment than proportional numbers.

This makes it perfect for displaying numbers such as the price of a product or a payment balance.

<div className="type-mono-comparison">
  <div className="type-mono-comparison__col">
    <div className="type-mono-comparison__label">Inter</div>
    <div style={{fontFamily: "'Inter', system-ui, sans-serif", fontSize: '32px', fontWeight: 700}}>$11,111</div>
    <div style={{fontFamily: "'Inter', system-ui, sans-serif", fontSize: '32px', fontWeight: 700}}>$99,999</div>
  </div>
  <div className="type-mono-comparison__col">
    <div className="type-mono-comparison__label">Inter Mono</div>
    <div style={{fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace", fontSize: '32px', fontWeight: 700}}>$11,111</div>
    <div style={{fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace", fontSize: '32px', fontWeight: 700}}>$99,999</div>
  </div>
</div>

---

### Ramps

The design system currently supports two typographical ramps, `standard` and `monospaced`. While both ramps leverage the same core sizes to ensure harmony between the styles when displayed alongside each other, they are not meant to be used interchangeably.

<div className="type-ramps-grid">
  <div className="type-ramp-card">
    <div className="type-ramp-card__preview">
      <span style={{fontFamily: "'Inter', system-ui, sans-serif", fontSize: '48px', fontWeight: 700, color: '#fff'}}>Inter</span>
    </div>
    <div className="type-ramp-card__label">Standard</div>
  </div>
  <div className="type-ramp-card">
    <div className="type-ramp-card__preview">
      <span style={{fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace", fontSize: '48px', fontWeight: 700, color: '#fff'}}>Mono</span>
    </div>
    <div className="type-ramp-card__label">Monospaced (Mono)</div>
  </div>
</div>

---

## Usage

### Clear typographic hierarchy

A clear, logical information architecture enhances the readability and scannability of an interface, which can enable users to find important content more quickly.

Typography is a powerful tool that can be used to create this architecture, by visually emphasizing and drawing attention to specific elements of an interface.

<div className="type-hierarchy-hero">
  <div className="type-hierarchy-hero__roles">
    <div style={{fontSize: '36px', fontWeight: 700, color: '#fff'}}>Display</div>
    <div style={{fontSize: '24px', fontWeight: 700, color: '#fff'}}>Heading</div>
    <div style={{fontSize: '16px', fontWeight: 500, color: '#fff'}}>Label</div>
    <div style={{fontSize: '14px', fontWeight: 400, color: '#fff'}}>Paragraph</div>
  </div>
  <div className="type-hierarchy-hero__example">
    <div style={{fontSize: '32px', fontWeight: 700, lineHeight: 1.2, marginBottom: '16px'}}>Your rides</div>
    <div style={{fontSize: '20px', fontWeight: 700, lineHeight: 1.4, marginBottom: '4px'}}>Economy</div>
    <div style={{fontSize: '16px', fontWeight: 500, lineHeight: 1.4, marginBottom: '2px'}}>Premium</div>
    <div style={{fontSize: '14px', fontWeight: 400, color: '#727272', lineHeight: 1.5}}>6 min</div>
  </div>
</div>

---

#### Content hierarchy

Combining the same sizes from each class creates a simple, beautiful hierarchy.

In this example, we're using pairings to combine a heading, label, and paragraph.

<div className="type-content-hierarchy-grid">
  <div className="type-content-hierarchy-card">
    <div className="type-content-hierarchy-card__preview">
      <div className="type-content-hierarchy-card__inner">
        <div style={{fontSize: '20px', fontWeight: 700, lineHeight: 1.4, marginBottom: '4px'}}>Heading XSmall</div>
        <div style={{fontSize: '14px', fontWeight: 500, lineHeight: 1.4, marginBottom: '8px'}}>Label Small</div>
        <div style={{fontSize: '14px', fontWeight: 400, lineHeight: 1.5, color: '#545454'}}>Paragraph Small. We build interfaces that work for everyone. 0123456789</div>
      </div>
    </div>
    <div className="type-content-hierarchy-card__label">Small</div>
  </div>
  <div className="type-content-hierarchy-card">
    <div className="type-content-hierarchy-card__preview">
      <div className="type-content-hierarchy-card__inner">
        <div style={{fontSize: '24px', fontWeight: 700, lineHeight: 1.3, marginBottom: '4px'}}>Heading Small</div>
        <div style={{fontSize: '16px', fontWeight: 500, lineHeight: 1.4, marginBottom: '8px'}}>Label Medium</div>
        <div style={{fontSize: '16px', fontWeight: 400, lineHeight: 1.5, color: '#545454'}}>Paragraph Medium. We build interfaces that work for everyone. 0123456789</div>
      </div>
    </div>
    <div className="type-content-hierarchy-card__label">Medium</div>
  </div>
  <div className="type-content-hierarchy-card">
    <div className="type-content-hierarchy-card__preview">
      <div className="type-content-hierarchy-card__inner">
        <div style={{fontSize: '28px', fontWeight: 700, lineHeight: 1.3, marginBottom: '4px'}}>Heading Medium</div>
        <div style={{fontSize: '18px', fontWeight: 500, lineHeight: 1.4, marginBottom: '8px'}}>Label Large</div>
        <div style={{fontSize: '18px', fontWeight: 400, lineHeight: 1.5, color: '#545454'}}>Paragraph Large. We build interfaces that work for everyone. 0123456789</div>
      </div>
    </div>
    <div className="type-content-hierarchy-card__label">Large</div>
  </div>
</div>

---

### Legibility

**Balancing data density and legibility**

Good paragraph legibility is crucial for users to read and understand the content. When the text is legible, users can quickly scan the content and find the information they need.

You should use **Paragraph Medium (16)** or **Paragraph Large (18)** for multi-line text whenever you can.

<div className="type-do-dont">
  <div>
    <div className="type-do-block__preview">
      <div>
        <p style={{fontSize: '16px', fontWeight: 400, lineHeight: 1.5, margin: 0, marginBottom: '12px'}}>You unlocked a higher level based on your activity and orders in the past 6 months.</p>
        <p style={{fontSize: '16px', fontWeight: 400, lineHeight: 1.5, margin: 0}}>Enjoy your new benefits through April 1, 2026.</p>
      </div>
    </div>
    <div className="type-do-dont__badge type-do-dont__badge--do">&#10003; Do</div>
    <p className="type-do-dont__desc">Use Paragraph Medium or Large for long-form text.</p>
  </div>
  <div>
    <div className="type-dont-block__preview">
      <div>
        <p style={{fontSize: '12px', fontWeight: 400, lineHeight: 1.5, margin: 0, marginBottom: '12px'}}>You unlocked a higher level based on your activity and orders in the past 6 months.</p>
        <p style={{fontSize: '12px', fontWeight: 400, lineHeight: 1.5, margin: 0}}>Enjoy your new benefits through April 1, 2026.</p>
      </div>
    </div>
    <div className="type-do-dont__badge type-do-dont__badge--dont">&#10005; Don't</div>
    <p className="type-do-dont__desc">Don't use Paragraph X Small for long form text. Use it sparingly for things like disclaimer text.</p>
  </div>
</div>

<div className="type-caution">
  <div className="type-caution__badge">! Caution</div>
  <p className="type-caution__desc">Do not use ParagraphX Small at 12 for long-form text on small devices.</p>
  <p className="type-caution__desc">The smaller size can strain the eyes. Use sparingly at a max of 3 lines for items like legal disclaimers.</p>
</div>

---

### Using typography to create emphasis

**Page headers/structure**

**Branded moments**

Use the Inter Display font for large titles and heading text. Don't apply the Inter Display font to most other UI text, like labels, paragraphs, and buttons.

<div className="type-do-dont">
  <div>
    <div className="type-do-block__preview">
      <div>
        <div style={{fontSize: '36px', fontWeight: 700, lineHeight: 1.2, marginBottom: '12px'}}>Premium</div>
        <div style={{background: '#f5a623', borderRadius: '4px', height: '8px', width: '80%'}}></div>
      </div>
    </div>
    <div className="type-do-dont__badge type-do-dont__badge--do">&#10003; Do</div>
    <p className="type-do-dont__desc">Do use the Inter Display font for large titles and heading text.</p>
  </div>
  <div>
    <div className="type-dont-block__preview">
      <div>
        <p style={{fontSize: '24px', fontWeight: 400, lineHeight: 1.4, margin: 0}}>We build interfaces that work for everyone.</p>
      </div>
    </div>
    <div className="type-do-dont__badge type-do-dont__badge--dont">&#10005; Don't</div>
    <p className="type-do-dont__desc">Don't use the Inter Display font for paragraphs.</p>
  </div>
</div>

---

### Component overrides

Default sizes are provided to consolidate the basics of our user interface. When designing default screens, for example, in settings or lists, you should strictly follow the default sizes.

You might use large or small variances whenever you want to create higher contrast.

<div className="type-do-dont">
  <div>
    <div className="type-do-block__preview">
      <div style={{width: '100%'}}>
        <div style={{fontSize: '20px', fontWeight: 700, marginBottom: '16px'}}>Favorites</div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
          <span style={{fontSize: '18px'}}>&#9632;</span>
          <div>
            <div style={{fontSize: '14px', fontWeight: 600}}>Home</div>
            <div style={{fontSize: '12px', color: '#727272'}}>123 Main St.</div>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
          <span style={{fontSize: '18px'}}>&#9632;</span>
          <div>
            <div style={{fontSize: '14px', fontWeight: 600}}>Work</div>
            <div style={{fontSize: '12px', color: '#727272'}}>555 Market St.</div>
          </div>
        </div>
        <div style={{fontSize: '20px', fontWeight: 700, marginBottom: '12px'}}>Other places</div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
          <span style={{fontSize: '18px'}}>&#9632;</span>
          <div>
            <div style={{fontSize: '14px', fontWeight: 600}}>The Bakery</div>
            <div style={{fontSize: '12px', color: '#727272'}}>222 Pan St.</div>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span style={{fontSize: '18px'}}>&#9632;</span>
          <div>
            <div style={{fontSize: '14px', fontWeight: 600}}>Piccino</div>
            <div style={{fontSize: '12px', color: '#727272'}}>222 Lombard St.</div>
          </div>
        </div>
      </div>
    </div>
    <div className="type-do-dont__badge type-do-dont__badge--do">&#10003; Do</div>
    <p className="type-do-dont__desc">Use default sizes for all screens that don't require customization.</p>
  </div>
  <div>
    <div className="type-dont-block__preview">
      <div style={{width: '100%'}}>
        <div style={{fontSize: '12px', color: '#727272', marginBottom: '8px'}}>Favorites</div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e5e5'}}>
          <span style={{fontSize: '24px'}}>&#9679;</span>
          <div>
            <div style={{fontSize: '24px', fontWeight: 700}}>Home</div>
            <div style={{fontSize: '14px', color: '#727272'}}>123 Main St.</div>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
          <span style={{fontSize: '24px'}}>&#9679;</span>
          <div>
            <div style={{fontSize: '24px', fontWeight: 700}}>Work</div>
            <div style={{fontSize: '14px', color: '#727272'}}>555 Market St.</div>
          </div>
        </div>
        <div style={{fontSize: '12px', color: '#727272', marginBottom: '8px', marginTop: '8px'}}>Favorites</div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
          <span style={{fontSize: '18px'}}>&#9632;</span>
          <div>
            <div style={{fontSize: '18px', fontWeight: 700}}>The Bakery</div>
            <div style={{fontSize: '14px', color: '#727272'}}>222 Pan</div>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span style={{fontSize: '18px'}}>&#9632;</span>
          <div>
            <div style={{fontSize: '18px', fontWeight: 700}}>Piccino</div>
            <div style={{fontSize: '14px', color: '#727272'}}>222 Lombard</div>
          </div>
        </div>
      </div>
    </div>
    <div className="type-do-dont__badge type-do-dont__badge--dont">&#10005; Don't</div>
    <p className="type-do-dont__desc">Don't reinvent the wheel and use design cycles to overly design consolidated UI.</p>
  </div>
</div>

---

### Embedded links in a body of text

Links embedded inside a sentence can be unfriendly to screen readers and localization. It's much better to use a link or button below a paragraph. But if you must, you should use an underline to indicate that the text is tappable.

See also [Link versus button](/foundations/accessibility).

<div className="docs-callout">
  Avoid using text color alone because an underline is a more visible, accessible option. Links should use label weight inside paragraph weight blocks of text.
</div>

<div className="type-link-example">
  <div className="type-link-example__card">
    <p style={{fontSize: '14px', lineHeight: 1.6, margin: 0}}>Messages sent using <span style={{textDecoration: 'underline', fontWeight: 500}}>the Dashboard</span> are subject to the <span style={{textDecoration: 'underline', fontWeight: 500}}>Privacy Notice</span>, <span style={{textDecoration: 'underline', fontWeight: 500}}>User Generated Content Terms</span>, and <span style={{textDecoration: 'underline', fontWeight: 500}}>Merchant Terms &amp; Conditions</span>.</p>
  </div>
</div>

---

### Using the Mono ramp

**Metrics**

Use the Mono ramp when designing data-intensive views, tables, and dashboard overviews, where the monospace font has significant benefits in terms of alignment and legibility.

<div className="type-mono-table-demo">
  <table>
    <thead>
      <tr>
        <th>Region</th>
        <th>View options</th>
        <th>Completed</th>
        <th>Health</th>
        <th>C/S</th>
        <th>Efficiency</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Total for US &amp; Canada</strong></td>
        <td><span className="type-mono-table-demo__highlight--green">377.5K</span> <span className="type-mono-table-demo__delta--red">-2.5%</span></td>
        <td><span className="type-mono-table-demo__highlight--green">377.5K</span> <span className="type-mono-table-demo__delta--red">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td><span className="type-mono-table-demo__highlight--green">377.5K</span> <span className="type-mono-table-demo__delta--red">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
      </tr>
      <tr>
        <td>San Francisco</td>
        <td><span className="type-mono-table-demo__highlight--green">377.5K</span> <span className="type-mono-table-demo__delta--red">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
      </tr>
      <tr>
        <td>San Diego</td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td><span className="type-mono-table-demo__highlight--green">377.5K</span> <span className="type-mono-table-demo__delta--red">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
      </tr>
      <tr>
        <td>Los Angeles</td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td><span className="type-mono-table-demo__highlight--green">377.5K</span> <span className="type-mono-table-demo__delta--red">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
      </tr>
      <tr>
        <td>Portland</td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
        <td>377.5K <span className="type-mono-table-demo__delta">-2.5%</span></td>
      </tr>
    </tbody>
  </table>
</div>

<div className="type-do-dont" style={{marginTop: '24px'}}>
  <div>
    <div className="type-do-dont__badge type-do-dont__badge--do">&#10003; Do</div>
    <p className="type-do-dont__desc">Use Mono when displaying a number or amount in isolation — prices, percentages, metrics.</p>
  </div>
  <div>
    <div className="type-do-dont__badge type-do-dont__badge--dont">&#10005; Don't</div>
    <p className="type-do-dont__desc">Do not use Mono for nominal numbers that identify something, such as phone numbers or street addresses.</p>
  </div>
</div>

**Increasing legibility**

In some cases, the mono ramp can be used where the legibility of every individual character is critical — for example, payment codes that users must read and enter manually.

<div className="type-payment-code-demo">
  <div className="type-payment-code-demo__card">
    <div style={{fontSize: '28px', fontWeight: 700, lineHeight: 1.3, marginBottom: '8px'}}>Payment code</div>
    <p style={{fontSize: '16px', lineHeight: 1.5, color: '#545454', margin: '0 0 16px'}}>Use this code when submitting your payment:</p>
    <div className="type-payment-code-demo__code">
      <span style={{fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace", fontSize: '28px', fontWeight: 700, color: '#fff', letterSpacing: '0.05em'}}>4400-1913-0920</span>
    </div>
  </div>
</div>

<div>
  <div className="type-do-dont__badge type-do-dont__badge--do">&#10003; Do</div>
  <p className="type-do-dont__desc">Use Mono for codes, confirmation numbers, and values that need to be read clearly at a glance.</p>
</div>

---

## Weights

| Token | Value | Use case |
|---|---|---|
| `--typography-weight-regular` | 400 | Paragraph text, descriptions |
| `--typography-weight-medium` | 500 | Labels, buttons, form fields |
| `--typography-weight-semibold` | 600 | Emphasis, sub-headings |
| `--typography-weight-bold` | 700 | Headings, display text |
| `--typography-weight-extrabold` | 800 | Hero text, marketing moments |

</TabItem>
<TabItem value="tokens" label="Tokens">

<h2>Display</h2>

| Scale | Font size | Line height | Weight | Letter spacing | Token prefix |
|---|---|---|---|---|---|
| XSmall | 36 px | 44 px | 700 (bold) | -0.025em | `--typography-scale-display-xsmall-*` |
| Small | 44 px | 52 px | 700 (bold) | -0.025em | `--typography-scale-display-small-*` |
| Medium | 52 px | 64 px | 700 (bold) | -0.05em | `--typography-scale-display-medium-*` |
| Large | 96 px | 112 px | 700 (bold) | -0.05em | `--typography-scale-display-large-*` |

Each prefix expands to four tokens: `font-size`, `line-height`, `font-weight`, and `letter-spacing`.

<h2>Heading</h2>

| Scale | Font size | Line height | Weight | Letter spacing | Token prefix |
|---|---|---|---|---|---|
| XSmall | 20 px | 28 px | 700 (bold) | 0em | `--typography-scale-heading-xsmall-*` |
| Small | 24 px | 32 px | 700 (bold) | 0em | `--typography-scale-heading-small-*` |
| Medium | 28 px | 36 px | 700 (bold) | 0em | `--typography-scale-heading-medium-*` |
| Large | 32 px | 40 px | 700 (bold) | 0em | `--typography-scale-heading-large-*` |
| XLarge | 36 px | 44 px | 700 (bold) | 0em | `--typography-scale-heading-xlarge-*` |
| XXLarge | 40 px | 52 px | 700 (bold) | 0em | `--typography-scale-heading-xxlarge-*` |

<h2>Label</h2>

| Scale | Font size | Line height | Weight | Letter spacing | Token prefix |
|---|---|---|---|---|---|
| XSmall | 12 px | 16 px | 500 (medium) | 0em | `--typography-scale-label-xsmall-*` |
| Small | 14 px | 16 px | 500 (medium) | 0em | `--typography-scale-label-small-*` |
| Medium | 16 px | 20 px | 500 (medium) | 0em | `--typography-scale-label-medium-*` |
| Large | 18 px | 24 px | 500 (medium) | 0em | `--typography-scale-label-large-*` |

<h2>Paragraph</h2>

| Scale | Font size | Line height | Weight | Letter spacing | Token prefix |
|---|---|---|---|---|---|
| XSmall | 12 px | 20 px | 400 (regular) | 0em | `--typography-scale-paragraph-xsmall-*` |
| Small | 14 px | 20 px | 400 (regular) | 0em | `--typography-scale-paragraph-small-*` |
| Medium | 16 px | 24 px | 400 (regular) | 0em | `--typography-scale-paragraph-medium-*` |
| Large | 18 px | 28 px | 400 (regular) | 0em | `--typography-scale-paragraph-large-*` |

<h2>Code</h2>

| Scale | Font size | Line height | Weight | Letter spacing | Token prefix |
|---|---|---|---|---|---|
| Small | 12 px | 20 px | 400 (regular) | 0em | `--typography-scale-code-sm-*` |
| Medium | 14 px | 20 px | 400 (regular) | 0em | `--typography-scale-code-md-*` |

Code tokens use `--typography-family-mono` as their font family.

---

<h2>Primitive size tokens</h2>

The raw size scale that semantic tokens reference. These should not be used directly in component CSS — always use a semantic scale token instead.

| Token | Value |
|---|---|
| `--typography-size-11` | 11 px |
| `--typography-size-12` | 12 px |
| `--typography-size-13` | 13 px |
| `--typography-size-14` | 14 px |
| `--typography-size-15` | 15 px |
| `--typography-size-16` | 16 px |
| `--typography-size-18` | 18 px |
| `--typography-size-20` | 20 px |
| `--typography-size-24` | 24 px |
| `--typography-size-28` | 28 px |
| `--typography-size-32` | 32 px |
| `--typography-size-36` | 36 px |
| `--typography-size-40` | 40 px |
| `--typography-size-44` | 44 px |
| `--typography-size-48` | 48 px |
| `--typography-size-52` | 52 px |
| `--typography-size-56` | 56 px |
| `--typography-size-64` | 64 px |
| `--typography-size-96` | 96 px |

<h2>Line height tokens</h2>

Fixed line-height values (in px) are used by semantic scale tokens. Named multipliers are available for custom compositions.

**Fixed values**

| Token | Value |
|---|---|
| `--typography-line-height-16` | 16 px |
| `--typography-line-height-20` | 20 px |
| `--typography-line-height-24` | 24 px |
| `--typography-line-height-28` | 28 px |
| `--typography-line-height-32` | 32 px |
| `--typography-line-height-36` | 36 px |
| `--typography-line-height-40` | 40 px |
| `--typography-line-height-44` | 44 px |
| `--typography-line-height-52` | 52 px |
| `--typography-line-height-64` | 64 px |
| `--typography-line-height-112` | 112 px |

**Named multipliers**

| Token | Value | Description |
|---|---|---|
| `--typography-line-height-none` | 1 | No extra leading |
| `--typography-line-height-tight` | 1.2 | Display and heading text |
| `--typography-line-height-snug` | 1.375 | Compact body text |
| `--typography-line-height-normal` | 1.5 | Default body text |
| `--typography-line-height-relaxed` | 1.625 | Spacious body text |
| `--typography-line-height-loose` | 2 | Maximum breathing room |

<h2>Letter spacing tokens</h2>

| Token | Value | Usage |
|---|---|---|
| `--typography-letter-spacing-tighter` | -0.05em | Display Large, Display Medium |
| `--typography-letter-spacing-tight` | -0.025em | Display Small, Display XSmall |
| `--typography-letter-spacing-normal` | 0em | Headings, Labels, Paragraphs, Code |
| `--typography-letter-spacing-wide` | 0.025em | Uppercase labels, overlines |
| `--typography-letter-spacing-wider` | 0.05em | Wide-set payment codes, allcaps |

<h2>Font weight tokens</h2>

| Token | Value |
|---|---|
| `--typography-weight-regular` | 400 |
| `--typography-weight-medium` | 500 |
| `--typography-weight-semibold` | 600 |
| `--typography-weight-bold` | 700 |
| `--typography-weight-extrabold` | 800 |

<h2>Font family tokens</h2>

| Token | Value |
|---|---|
| `--typography-family-sans` | 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif |
| `--typography-family-serif` | Georgia, Cambria, 'Times New Roman', Times, serif |
| `--typography-family-mono` | ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace |

</TabItem>
<TabItem value="changelog" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
</Tabs>
