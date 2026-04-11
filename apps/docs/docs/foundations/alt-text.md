---
sidebar_label: Alternative text
hide_title: true
---

import Guidance from '@site/src/components/Guidance';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>ACCESSIBILITY</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Alternative text</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    How to write effective alt text that conveys an image's purpose, not just its appearance.
  </p>
</div>

---

## The decision tree

Not every image needs the same treatment. Use this decision tree to determine the right approach:

1. **Is the image purely decorative?** (borders, spacers, background patterns) → Mark it as decorative with `alt=""`
2. **Does the image contain text?** → The alt text should include that text
3. **Is the image a link or button?** → The alt text should describe the destination or action
4. **Is the image informative?** → The alt text should convey the same information as the image
5. **Is the image complex?** (charts, diagrams, infographics) → Provide a short alt text and a longer description nearby

---

## Writing effective alt text

### Be specific, not generic

Describe what the image actually shows, not what type of content it is.

<Guidance.Grid>
  <Guidance.Do description='Describe what the image actually shows.'>
    <code>alt="Bar chart showing 45% increase in user signups from January to March 2024"</code>
  </Guidance.Do>
  <Guidance.Dont description='Generic descriptions that add no information.'>
    <code>alt="Chart"</code> or <code>alt="Image of a chart"</code>
  </Guidance.Dont>
</Guidance.Grid>

### Describe function, not appearance

When an image serves a functional purpose (link, button), describe what it does rather than what it looks like.

<Guidance.Grid>
  <Guidance.Do description="Describe what the image does.">
    <code>alt="Download invoice as PDF"</code>
  </Guidance.Do>
  <Guidance.Dont description="Describe what the image looks like.">
    <code>alt="Blue arrow pointing down icon"</code>
  </Guidance.Dont>
</Guidance.Grid>

### Keep it concise

Alt text should typically be one sentence or less. Screen reader users navigate quickly and verbose alt text slows them down. Aim for under 125 characters.

<Guidance.Grid>
  <Guidance.Do description="One short sentence is enough.">
    <code>alt="Team celebrating product launch in the office"</code>
  </Guidance.Do>
  <Guidance.Dont description="Verbose alt text slows down screen reader users. Aim for under 125 characters.">
    <code>alt="A group of approximately twelve people standing in a modern office space with glass walls and wooden floors, smiling and clapping their hands while confetti falls from the ceiling during what appears to be a product launch celebration"</code>
  </Guidance.Dont>
</Guidance.Grid>

### Do not start with "Image of" or "Photo of"

Screen readers already announce the element as an image. Prefixing alt text with "image of" creates redundancy: users hear "image, image of a cat" instead of "image, orange tabby cat sleeping on a keyboard."

---

## Decorative images

Decorative images serve no informational purpose. They exist for visual interest only, and must be hidden from screen readers to avoid cluttering the experience with meaningless announcements.

### How to mark an image as decorative

```jsx
// HTML img element — use empty alt attribute
<img src="/decorative-border.svg" alt="" />

// CSS background image — already hidden from screen readers
// No additional markup needed

// React component with aria-hidden
<div aria-hidden="true">
  <DecorativeIllustration />
</div>
```

The `alt=""` attribute (empty string) is intentional. It tells screen readers to skip this image entirely. Omitting the `alt` attribute altogether is different: screen readers may announce the file name instead, which is worse than silence.

### Common decorative images

- Background patterns and textures
- Divider lines and visual spacers
- Brand illustrations used alongside text that conveys the same meaning
- Avatar placeholder graphics
- Icon images where adjacent text already describes the action

---

## Icons

Icons in Arch UI fall into two categories:

### Standalone icons (meaningful)

An icon that is the only content in a button or link needs alt text describing its action.

```jsx
// Icon-only button — needs an accessible label
<button aria-label="Close dialog">
  <CloseIcon aria-hidden="true" />
</button>

// Icon link — needs an accessible label
<a href="/settings" aria-label="Settings">
  <GearIcon aria-hidden="true" />
</a>
```

Note that the icon itself is marked `aria-hidden="true"` — the label lives on the interactive parent element, not on the SVG.

### Accompanying icons (decorative)

An icon that appears next to text describing the same concept is decorative and should be hidden.

```jsx
// Icon with adjacent text — icon is decorative
<button>
  <SaveIcon aria-hidden="true" />
  Save changes
</button>

// Status indicator with text — icon is decorative
<span>
  <CheckCircleIcon aria-hidden="true" />
  Upload complete
</span>
```

---

## Complex images

Charts, diagrams, infographics, and data visualizations cannot be fully described in a short alt text. For these, use a layered approach:

### Short alt text + long description

```jsx
<figure>
  <img
    src="/revenue-chart.png"
    alt="Quarterly revenue chart showing steady growth. Full data in table below."
  />
  <figcaption>
    <details>
      <summary>View chart data as a table</summary>
      <table>
        <thead>
          <tr><th>Quarter</th><th>Revenue</th></tr>
        </thead>
        <tbody>
          <tr><td>Q1 2024</td><td>$2.4M</td></tr>
          <tr><td>Q2 2024</td><td>$3.1M</td></tr>
          <tr><td>Q3 2024</td><td>$3.8M</td></tr>
          <tr><td>Q4 2024</td><td>$4.2M</td></tr>
        </tbody>
      </table>
    </details>
  </figcaption>
</figure>
```

This pattern provides a quick summary for users who want to move on, while making the full data available for users who need it.

---

## Form inputs and labels

Form controls are not images, but they follow the same principle: every control needs a text alternative that describes its purpose.

```jsx
// Every input needs a label
<label htmlFor="email">Email address</label>
<input id="email" type="email" />

// If a visible label is not possible, use aria-label
<input type="search" aria-label="Search products" placeholder="Search..." />

// Group related controls with fieldset and legend
<fieldset>
  <legend>Notification preferences</legend>
  <label><input type="checkbox" /> Email notifications</label>
  <label><input type="checkbox" /> SMS notifications</label>
  <label><input type="checkbox" /> Push notifications</label>
</fieldset>
```

---

## Testing alt text

### Automated checks

axe-core catches missing `alt` attributes and empty `aria-label` values, but it cannot evaluate whether alt text is *meaningful*. Automated tools flag the presence of alt text, not its quality.

### Manual review

Ask these questions during code review:

1. **If the image were removed, would you lose information?** If yes, the alt text must convey that information.
2. **Does the alt text make sense out of context?** Screen reader users may navigate by image list, so each alt text should stand on its own.
3. **Is the alt text free of redundancy?** No "image of," no repeating adjacent text.
4. **For complex images, is a long description available?** Alt text alone is not enough for charts and diagrams.

### Screen reader test

Navigate the page using VoiceOver or NVDA and listen to how images are announced. Does the announcement give you enough information to understand the content without seeing it? If not, revise the alt text.
