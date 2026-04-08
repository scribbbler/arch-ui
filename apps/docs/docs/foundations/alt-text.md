---
sidebar_label: Alternative Text
---

<span className="foundation-header__label">Accessibility</span>

# Alternative Text

Alternative text makes visual content accessible to people who cannot see it. Screen readers announce alt text in place of images, and it displays when images fail to load. Writing effective alt text is a skill — it requires understanding the image's purpose, not just its appearance.

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

<div className="do-dont-grid">
<div className="do-block">

**Do**

`alt="Bar chart showing 45% increase in user signups from January to March 2024"`

</div>
<div className="dont-block">

**Don't**

`alt="Chart"` or `alt="Image of a chart"`

</div>
</div>

### Describe function, not appearance

When an image serves a functional purpose (link, button), describe what it does rather than what it looks like.

<div className="do-dont-grid">
<div className="do-block">

**Do**

`alt="Download invoice as PDF"`

</div>
<div className="dont-block">

**Don't**

`alt="Blue arrow pointing down icon"`

</div>
</div>

### Keep it concise

Alt text should typically be one sentence or less. Screen reader users navigate quickly and verbose alt text slows them down. Aim for under 125 characters.

<div className="do-dont-grid">
<div className="do-block">

**Do**

`alt="Team celebrating product launch in the office"`

</div>
<div className="dont-block">

**Don't**

`alt="A group of approximately twelve people standing in a modern office space with glass walls and wooden floors, smiling and clapping their hands while confetti falls from the ceiling during what appears to be a product launch celebration"`

</div>
</div>

### Do not start with "Image of" or "Photo of"

Screen readers already announce the element as an image. Prefixing alt text with "image of" creates redundancy: users hear "image, image of a cat" instead of "image, orange tabby cat sleeping on a keyboard."

---

## Decorative images

Decorative images serve no informational purpose — they exist for visual interest only. These must be hidden from screen readers to avoid cluttering the experience with meaningless announcements.

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

The `alt=""` attribute (empty string) is intentional. It tells screen readers to skip this image entirely. Omitting the `alt` attribute altogether is different — screen readers may announce the file name instead, which is worse than silence.

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
2. **Does the alt text make sense out of context?** Screen reader users may navigate by image list — each alt text should stand on its own.
3. **Is the alt text free of redundancy?** No "image of," no repeating adjacent text.
4. **For complex images, is a long description available?** Alt text alone is not enough for charts and diagrams.

### Screen reader test

Navigate the page using VoiceOver or NVDA and listen to how images are announced. Does the announcement give you enough information to understand the content without seeing it? If not, revise the alt text.
