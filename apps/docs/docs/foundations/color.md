---
sidebar_label: Color
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>STYLES</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Color</h1>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A two-tier system of primitive palettes and semantic tokens that keeps every surface, text, and border themeable without touching component code.
  </p>
</div>

<Tabs>
<TabItem value="overview" label="Overview" default>

<div className="color-hero">
  <div className="color-hero__swatch" style={{background: '#266EF1'}} />
  <div className="color-hero__swatch" style={{background: '#DE1135'}} />
  <div className="color-hero__swatch" style={{background: '#06C167'}} />
  <div className="color-hero__swatch" style={{background: '#F6BC2F'}} />
  <div className="color-hero__swatch" style={{background: '#A964F7'}} />
  <div className="color-hero__swatch" style={{background: '#01B8CA'}} />
  <div className="color-hero__swatch" style={{background: '#E65300'}} />
  <div className="color-hero__swatch" style={{background: '#E142BC'}} />
  <div className="color-hero__swatch" style={{background: '#77B71C'}} />
  <div className="color-hero__swatch" style={{background: '#C46E00'}} />
</div>

**Common alternative names**

Color palette, colour, theme colors, color tokens

---

## Principles

### Semantic over literal

Every color in the system has a role, not just a value. Instead of reaching for "blue-600", you use `--color-action-primary` — and the system handles what that means in light mode, dark mode, or any future theme. This keeps intent readable and theme switching painless.

### Accessible by default

Our palette was designed so that semantic pairings meet WCAG 2.1 contrast requirements out of the box. Text tokens paired with their corresponding background tokens achieve at least 4.5:1 contrast for normal text. Feedback colors — danger, success, warning, info — are tested in both themes to ensure legibility without relying on color alone.

### Two-tier architecture

Primitive tokens define the raw color ramps (e.g. `--color-blue-600`). Semantic tokens reference primitives and assign them to interface roles (e.g. `--color-action-primary` maps to `--color-blue-600` in light mode). Components only use semantic tokens — this indirection is what makes theming, dark mode, and brand customisation possible without touching component code.

---

## Anatomy

The color system has two layers. Primitives are the full palette of available values. Semantic tokens map those values to roles within the interface.

<div className="color-anatomy">
  <div className="color-anatomy__diagram">
    <div className="color-anatomy__layer">
      <div className="color-anatomy__layer-label">Primitive</div>
      <div className="color-anatomy__layer-tokens">
        <div className="color-anatomy__token">
          <div className="color-anatomy__token-swatch" style={{background: '#266EF1'}} />
          <code>--color-blue-600</code>
        </div>
        <div className="color-anatomy__token">
          <div className="color-anatomy__token-swatch" style={{background: '#DE1135'}} />
          <code>--color-red-600</code>
        </div>
        <div className="color-anatomy__token">
          <div className="color-anatomy__token-swatch" style={{background: '#282828'}} />
          <code>--color-gray-900</code>
        </div>
      </div>
    </div>
    <div className="color-anatomy__layer">
      <div className="color-anatomy__layer-label">Semantic</div>
      <div className="color-anatomy__layer-tokens">
        <div className="color-anatomy__token">
          <div className="color-anatomy__token-swatch" style={{background: '#266EF1'}} />
          <code>--color-action-primary</code>
        </div>
        <div className="color-anatomy__token">
          <div className="color-anatomy__token-swatch" style={{background: '#DE1135'}} />
          <code>--color-action-destructive</code>
        </div>
        <div className="color-anatomy__token">
          <div className="color-anatomy__token-swatch" style={{background: '#282828'}} />
          <code>--color-text-default</code>
        </div>
      </div>
    </div>
  </div>
</div>

### Semantic roles

Semantic tokens are grouped into seven categories. Each category addresses a different part of the interface.

| Category | Purpose | Example token |
|---|---|---|
| **Background** | Page and container fills | `--color-background-default` |
| **Text** | Body copy, labels, links | `--color-text-default` |
| **Action** | Buttons and interactive controls | `--color-action-primary` |
| **Border** | Dividers, outlines, focus rings | `--color-border-default` |
| **Feedback** | Alerts, banners, validation | `--color-feedback-danger-bg` |
| **Surface** | Layered containers (base, raised, overlay) | `--color-surface-raised` |
| **Icon** | Iconography in all states | `--color-icon-default` |

---

## Usage guidelines

### Use semantic tokens, never primitives

Components must always reference semantic tokens. Primitives exist to feed the semantic layer — they should not appear in component CSS. This rule ensures that every component automatically adapts to theme changes.

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p><code>color: var(--color-text-default);</code></p>
    <p><code>background: var(--color-background-subtle);</code></p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p><code>color: #282828;</code></p>
    <p><code>background: var(--color-gray-50);</code></p>
  </div>
</div>

### Match token role to element purpose

Choose tokens that match the semantic role of the element. A background should use a `background` token, not a `surface` token repurposed.

| Element | Correct token | Wrong token |
|---|---|---|
| Page fill | `--color-background-default` | `--color-surface-base` |
| Error message text | `--color-feedback-danger-text` | `--color-text-danger` on a plain background |
| Disabled input border | `--color-border-disabled` | `--color-gray-200` |
| Primary button fill | `--color-action-primary` | `--color-blue-600` |

### Action token patterns

Interactive elements follow a consistent three-state pattern: rest, hover, and active. Each variant (primary, secondary, ghost, destructive) provides all three plus a text color.

```css
.button--primary {
  background: var(--color-action-primary);
  color: var(--color-action-primary-text);
}
.button--primary:hover {
  background: var(--color-action-primary-hover);
}
.button--primary:active {
  background: var(--color-action-primary-active);
}
```

### Feedback tokens come in sets

Each feedback category (danger, success, warning, info) provides a background, text, and border token designed to work together. Always use the complete set.

```css
.alert--danger {
  background: var(--color-feedback-danger-bg);
  color: var(--color-feedback-danger-text);
  border-color: var(--color-feedback-danger-border);
}
```

---

## Dark mode

Arch UI supports light and dark themes through the same semantic token names. When `[data-theme="dark"]` is applied, the token values are remapped to dark-appropriate primitives. No component code changes are needed.

<div className="color-mode-comparison">
  <div className="color-mode-comparison__panel color-mode-comparison__panel--light">
    <div className="color-mode-comparison__label">Light</div>
    <div className="color-mode-comparison__row">
      <div className="color-mode-comparison__swatch" style={{background: '#FFFFFF'}} />
      <span>background-default &rarr; white</span>
    </div>
    <div className="color-mode-comparison__row">
      <div className="color-mode-comparison__swatch" style={{background: '#282828'}} />
      <span>text-default &rarr; gray-900</span>
    </div>
    <div className="color-mode-comparison__row">
      <div className="color-mode-comparison__swatch" style={{background: '#266EF1'}} />
      <span>action-primary &rarr; blue-600</span>
    </div>
    <div className="color-mode-comparison__row">
      <div className="color-mode-comparison__swatch" style={{background: '#DDDDDD'}} />
      <span>border-default &rarr; gray-200</span>
    </div>
  </div>
  <div className="color-mode-comparison__panel color-mode-comparison__panel--dark">
    <div className="color-mode-comparison__label">Dark</div>
    <div className="color-mode-comparison__row">
      <div className="color-mode-comparison__swatch" style={{background: '#282828'}} />
      <span>background-default &rarr; gray-900</span>
    </div>
    <div className="color-mode-comparison__row">
      <div className="color-mode-comparison__swatch" style={{background: '#F3F3F3'}} />
      <span>text-default &rarr; gray-50</span>
    </div>
    <div className="color-mode-comparison__row">
      <div className="color-mode-comparison__swatch" style={{background: '#068BEE'}} />
      <span>action-primary &rarr; blue-500</span>
    </div>
    <div className="color-mode-comparison__row">
      <div className="color-mode-comparison__swatch" style={{background: '#5E5E5E'}} />
      <span>border-default &rarr; gray-700</span>
    </div>
  </div>
</div>

The general pattern: light mode uses darker primitives for foreground and lighter ones for background, while dark mode inverts this relationship. Accent colors shift toward lighter shades in dark mode to maintain contrast against dark surfaces.

---

## Accessibility

### Contrast requirements

All semantic text-on-background pairings meet WCAG 2.1 AA requirements:

- **Normal text** (below 18px or below 14px bold): 4.5:1 minimum
- **Large text** (18px+ or 14px+ bold): 3:1 minimum
- **UI components and graphical objects**: 3:1 minimum against adjacent colors

### Do not rely on color alone

Color should reinforce meaning, not be the sole indicator. Combine color with text labels, icons, or patterns to ensure information is perceivable by users with color vision deficiencies.

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Use a red border <em>and</em> an error icon <em>and</em> descriptive text for validation errors.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Show a red border as the only indicator that a field is invalid.</p>
  </div>
</div>

### Focus visibility

All interactive elements must show a visible focus indicator using `--color-border-focus`. This token maps to `--color-blue-500` (#068BEE) in light mode and `--color-blue-400` (#6DAAFB) in dark mode, both providing strong contrast against their respective background colors.

```css
:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

</TabItem>
<TabItem value="tokens" label="Tokens">

<h2>Semantic color tokens</h2>

All semantic tokens used by Arch UI components. These tokens change values between light and dark themes while keeping their names constant. Always use these in component CSS — never reference primitives directly.

<h3>Background</h3>

Tokens for page and container fills.

<div className="color-token-group">
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FFFFFF'}} />
    <div className="color-token-row__name"><code>--color-background-default</code></div>
    <div className="color-token-row__value">white</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#F3F3F3'}} />
    <div className="color-token-row__name"><code>--color-background-subtle</code></div>
    <div className="color-token-row__value">gray-50</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#E8E8E8'}} />
    <div className="color-token-row__name"><code>--color-background-muted</code></div>
    <div className="color-token-row__value">gray-100</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#282828'}} />
    <div className="color-token-row__name"><code>--color-background-inverse</code></div>
    <div className="color-token-row__value">gray-900</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#E8E8E8'}} />
    <div className="color-token-row__name"><code>--color-background-disabled</code></div>
    <div className="color-token-row__value">gray-100</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: 'rgba(0,0,0,0.5)'}} />
    <div className="color-token-row__name"><code>--color-background-overlay</code></div>
    <div className="color-token-row__value">rgba(0, 0, 0, 0.5)</div>
  </div>
</div>

<h3>Text</h3>

Tokens for body copy, labels, links, and status text.

<div className="color-token-group">
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#282828'}} />
    <div className="color-token-row__name"><code>--color-text-default</code></div>
    <div className="color-token-row__value">gray-900</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#727272'}} />
    <div className="color-token-row__name"><code>--color-text-subtle</code></div>
    <div className="color-token-row__value">gray-600</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#A6A6A6'}} />
    <div className="color-token-row__name"><code>--color-text-placeholder</code></div>
    <div className="color-token-row__value">gray-400</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#BBBBBB'}} />
    <div className="color-token-row__name"><code>--color-text-disabled</code></div>
    <div className="color-token-row__value">gray-300</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FFFFFF'}} />
    <div className="color-token-row__name"><code>--color-text-inverse</code></div>
    <div className="color-token-row__value">white</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#266EF1'}} />
    <div className="color-token-row__name"><code>--color-text-link</code></div>
    <div className="color-token-row__value">blue-600</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#944DE7'}} />
    <div className="color-token-row__name"><code>--color-text-link-visited</code></div>
    <div className="color-token-row__value">purple-600</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#175BCC'}} />
    <div className="color-token-row__name"><code>--color-text-link-hover</code></div>
    <div className="color-token-row__value">blue-700</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#DE1135'}} />
    <div className="color-token-row__name"><code>--color-text-danger</code></div>
    <div className="color-token-row__value">red-600</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#0E8345'}} />
    <div className="color-token-row__name"><code>--color-text-success</code></div>
    <div className="color-token-row__value">green-600</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#6B4100'}} />
    <div className="color-token-row__name"><code>--color-text-warning</code></div>
    <div className="color-token-row__value">yellow-700</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#266EF1'}} />
    <div className="color-token-row__name"><code>--color-text-info</code></div>
    <div className="color-token-row__value">blue-600</div>
  </div>
</div>

<h3>Action</h3>

Tokens for buttons and interactive controls. Each variant provides rest, hover, active, and text states.

<div className="color-token-group">
  <div className="color-token-group__title">Primary</div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#266EF1'}} />
    <div className="color-token-row__name"><code>--color-action-primary</code></div>
    <div className="color-token-row__value">blue-600</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#175BCC'}} />
    <div className="color-token-row__name"><code>--color-action-primary-hover</code></div>
    <div className="color-token-row__value">blue-700</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#1948A3'}} />
    <div className="color-token-row__name"><code>--color-action-primary-active</code></div>
    <div className="color-token-row__value">blue-800</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FFFFFF'}} />
    <div className="color-token-row__name"><code>--color-action-primary-text</code></div>
    <div className="color-token-row__value">white</div>
  </div>
</div>

<div className="color-token-group">
  <div className="color-token-group__title">Secondary</div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#E8E8E8'}} />
    <div className="color-token-row__name"><code>--color-action-secondary</code></div>
    <div className="color-token-row__value">gray-100</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#DDDDDD'}} />
    <div className="color-token-row__name"><code>--color-action-secondary-hover</code></div>
    <div className="color-token-row__value">gray-200</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#BBBBBB'}} />
    <div className="color-token-row__name"><code>--color-action-secondary-active</code></div>
    <div className="color-token-row__value">gray-300</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#4B4B4B'}} />
    <div className="color-token-row__name"><code>--color-action-secondary-text</code></div>
    <div className="color-token-row__value">gray-800</div>
  </div>
</div>

<div className="color-token-group">
  <div className="color-token-group__title">Ghost</div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: 'transparent', border: '1px dashed #ccc'}} />
    <div className="color-token-row__name"><code>--color-action-ghost</code></div>
    <div className="color-token-row__value">transparent</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#E8E8E8'}} />
    <div className="color-token-row__name"><code>--color-action-ghost-hover</code></div>
    <div className="color-token-row__value">gray-100</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#DDDDDD'}} />
    <div className="color-token-row__name"><code>--color-action-ghost-active</code></div>
    <div className="color-token-row__value">gray-200</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#4B4B4B'}} />
    <div className="color-token-row__name"><code>--color-action-ghost-text</code></div>
    <div className="color-token-row__value">gray-800</div>
  </div>
</div>

<div className="color-token-group">
  <div className="color-token-group__title">Destructive</div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#DE1135'}} />
    <div className="color-token-row__name"><code>--color-action-destructive</code></div>
    <div className="color-token-row__value">red-600</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#BB032A'}} />
    <div className="color-token-row__name"><code>--color-action-destructive-hover</code></div>
    <div className="color-token-row__value">red-700</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#950F22'}} />
    <div className="color-token-row__name"><code>--color-action-destructive-active</code></div>
    <div className="color-token-row__value">red-800</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FFFFFF'}} />
    <div className="color-token-row__name"><code>--color-action-destructive-text</code></div>
    <div className="color-token-row__value">white</div>
  </div>
</div>

<h3>Border</h3>

Tokens for dividers, outlines, and focus rings.

<div className="color-token-group">
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#DDDDDD'}} />
    <div className="color-token-row__name"><code>--color-border-default</code></div>
    <div className="color-token-row__value">gray-200</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#E8E8E8'}} />
    <div className="color-token-row__name"><code>--color-border-subtle</code></div>
    <div className="color-token-row__value">gray-100</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#A6A6A6'}} />
    <div className="color-token-row__name"><code>--color-border-strong</code></div>
    <div className="color-token-row__value">gray-400</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#068BEE'}} />
    <div className="color-token-row__name"><code>--color-border-focus</code></div>
    <div className="color-token-row__value">blue-500</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#F83446'}} />
    <div className="color-token-row__name"><code>--color-border-danger</code></div>
    <div className="color-token-row__value">red-500</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#009A51'}} />
    <div className="color-token-row__name"><code>--color-border-success</code></div>
    <div className="color-token-row__value">green-500</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#B97502'}} />
    <div className="color-token-row__name"><code>--color-border-warning</code></div>
    <div className="color-token-row__value">yellow-500</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#DDDDDD'}} />
    <div className="color-token-row__name"><code>--color-border-disabled</code></div>
    <div className="color-token-row__value">gray-200</div>
  </div>
</div>

<h3>Feedback</h3>

Tokens for alerts, banners, and validation messages. Each feedback category provides a matched set of background, text, and border.

<div className="color-token-group">
  <div className="color-token-group__title">Danger</div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FFF0EE'}} />
    <div className="color-token-row__name"><code>--color-feedback-danger-bg</code></div>
    <div className="color-token-row__value">red-50</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#BB032A'}} />
    <div className="color-token-row__name"><code>--color-feedback-danger-text</code></div>
    <div className="color-token-row__value">red-700</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FFD2CD'}} />
    <div className="color-token-row__name"><code>--color-feedback-danger-border</code></div>
    <div className="color-token-row__value">red-200</div>
  </div>
</div>

<div className="color-token-group">
  <div className="color-token-group__title">Success</div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#EAF6ED'}} />
    <div className="color-token-row__name"><code>--color-feedback-success-bg</code></div>
    <div className="color-token-row__value">green-50</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#166C3B'}} />
    <div className="color-token-row__name"><code>--color-feedback-success-text</code></div>
    <div className="color-token-row__value">green-700</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#B1EAC2'}} />
    <div className="color-token-row__name"><code>--color-feedback-success-border</code></div>
    <div className="color-token-row__value">green-200</div>
  </div>
</div>

<div className="color-token-group">
  <div className="color-token-group__title">Warning</div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FDF2DC'}} />
    <div className="color-token-row__name"><code>--color-feedback-warning-bg</code></div>
    <div className="color-token-row__value">yellow-50</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#6B4100'}} />
    <div className="color-token-row__name"><code>--color-feedback-warning-text</code></div>
    <div className="color-token-row__value">yellow-700</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FFD688'}} />
    <div className="color-token-row__name"><code>--color-feedback-warning-border</code></div>
    <div className="color-token-row__value">yellow-200</div>
  </div>
</div>

<div className="color-token-group">
  <div className="color-token-group__title">Info</div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#EFF4FE'}} />
    <div className="color-token-row__name"><code>--color-feedback-info-bg</code></div>
    <div className="color-token-row__value">blue-50</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#175BCC'}} />
    <div className="color-token-row__name"><code>--color-feedback-info-text</code></div>
    <div className="color-token-row__value">blue-700</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#CDDEFF'}} />
    <div className="color-token-row__name"><code>--color-feedback-info-border</code></div>
    <div className="color-token-row__value">blue-200</div>
  </div>
</div>

<h3>Surface</h3>

Tokens for layered containers that communicate depth.

<div className="color-token-group">
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FFFFFF'}} />
    <div className="color-token-row__name"><code>--color-surface-base</code></div>
    <div className="color-token-row__value">white</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FFFFFF'}} />
    <div className="color-token-row__name"><code>--color-surface-raised</code></div>
    <div className="color-token-row__value">white</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FFFFFF'}} />
    <div className="color-token-row__name"><code>--color-surface-overlay</code></div>
    <div className="color-token-row__value">white</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#F3F3F3'}} />
    <div className="color-token-row__name"><code>--color-surface-sunken</code></div>
    <div className="color-token-row__value">gray-50</div>
  </div>
</div>

<h3>Icon</h3>

Tokens for iconography across all states.

<div className="color-token-group">
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#5E5E5E'}} />
    <div className="color-token-row__name"><code>--color-icon-default</code></div>
    <div className="color-token-row__value">gray-700</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#A6A6A6'}} />
    <div className="color-token-row__name"><code>--color-icon-subtle</code></div>
    <div className="color-token-row__value">gray-400</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#BBBBBB'}} />
    <div className="color-token-row__name"><code>--color-icon-disabled</code></div>
    <div className="color-token-row__value">gray-300</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#FFFFFF'}} />
    <div className="color-token-row__name"><code>--color-icon-inverse</code></div>
    <div className="color-token-row__value">white</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#F83446'}} />
    <div className="color-token-row__name"><code>--color-icon-danger</code></div>
    <div className="color-token-row__value">red-500</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#009A51'}} />
    <div className="color-token-row__name"><code>--color-icon-success</code></div>
    <div className="color-token-row__value">green-500</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#B97502'}} />
    <div className="color-token-row__name"><code>--color-icon-warning</code></div>
    <div className="color-token-row__value">yellow-500</div>
  </div>
  <div className="color-token-row">
    <div className="color-token-row__swatch" style={{background: '#068BEE'}} />
    <div className="color-token-row__name"><code>--color-icon-info</code></div>
    <div className="color-token-row__value">blue-500</div>
  </div>
</div>

</TabItem>
<TabItem value="specs" label="Specs">

<h2>Primitive color palette</h2>

The primitive palette defines every available color value in the system. These tokens are the raw material that semantic tokens reference. Primitives should not be used directly in component CSS — they exist to feed the semantic layer.

Each hue provides a ramp from 50 (lightest) through 900 (darkest). The neutral gray ramp is used most heavily in both themes.

<h3>Gray</h3>

<div className="color-ramp">
  <div className="color-ramp__swatches">
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#F3F3F3'}} />
      <span className="color-ramp__chip-label">50</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#E8E8E8'}} />
      <span className="color-ramp__chip-label">100</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#DDDDDD'}} />
      <span className="color-ramp__chip-label">200</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#BBBBBB'}} />
      <span className="color-ramp__chip-label">300</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#A6A6A6'}} />
      <span className="color-ramp__chip-label">400</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#868686'}} />
      <span className="color-ramp__chip-label">500</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#727272'}} />
      <span className="color-ramp__chip-label">600</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#5E5E5E'}} />
      <span className="color-ramp__chip-label">700</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#4B4B4B'}} />
      <span className="color-ramp__chip-label">800</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#282828'}} />
      <span className="color-ramp__chip-label">900</span>
    </div>
  </div>
</div>

<h3>Blue</h3>

<div className="color-ramp">
  <div className="color-ramp__swatches">
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#EFF4FE'}} />
      <span className="color-ramp__chip-label">50</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#DEE9FE'}} />
      <span className="color-ramp__chip-label">100</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#CDDEFF'}} />
      <span className="color-ramp__chip-label">200</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#A9C9FF'}} />
      <span className="color-ramp__chip-label">300</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#6DAAFB'}} />
      <span className="color-ramp__chip-label">400</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#068BEE'}} />
      <span className="color-ramp__chip-label">500</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#266EF1'}} />
      <span className="color-ramp__chip-label">600</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#175BCC'}} />
      <span className="color-ramp__chip-label">700</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#1948A3'}} />
      <span className="color-ramp__chip-label">800</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#002661'}} />
      <span className="color-ramp__chip-label">900</span>
    </div>
  </div>
</div>

<h3>Red</h3>

<div className="color-ramp">
  <div className="color-ramp__swatches">
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFF0EE'}} />
      <span className="color-ramp__chip-label">50</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFE1DE'}} />
      <span className="color-ramp__chip-label">100</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFD2CD'}} />
      <span className="color-ramp__chip-label">200</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFB2AB'}} />
      <span className="color-ramp__chip-label">300</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FC7F79'}} />
      <span className="color-ramp__chip-label">400</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#F83446'}} />
      <span className="color-ramp__chip-label">500</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#DE1135'}} />
      <span className="color-ramp__chip-label">600</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#BB032A'}} />
      <span className="color-ramp__chip-label">700</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#950F22'}} />
      <span className="color-ramp__chip-label">800</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#520810'}} />
      <span className="color-ramp__chip-label">900</span>
    </div>
  </div>
</div>

<h3>Green</h3>

<div className="color-ramp">
  <div className="color-ramp__swatches">
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#EAF6ED'}} />
      <span className="color-ramp__chip-label">50</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#D3EFDA'}} />
      <span className="color-ramp__chip-label">100</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#B1EAC2'}} />
      <span className="color-ramp__chip-label">200</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#7FD99A'}} />
      <span className="color-ramp__chip-label">300</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#06C167'}} />
      <span className="color-ramp__chip-label">400</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#009A51'}} />
      <span className="color-ramp__chip-label">500</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#0E8345'}} />
      <span className="color-ramp__chip-label">600</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#166C3B'}} />
      <span className="color-ramp__chip-label">700</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#0D572D'}} />
      <span className="color-ramp__chip-label">800</span>
    </div>
  </div>
</div>

<h3>Yellow</h3>

<div className="color-ramp">
  <div className="color-ramp__swatches">
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FDF2DC'}} />
      <span className="color-ramp__chip-label">50</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FBE5B6'}} />
      <span className="color-ramp__chip-label">100</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFD688'}} />
      <span className="color-ramp__chip-label">200</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#F6BC2F'}} />
      <span className="color-ramp__chip-label">300</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#D79900'}} />
      <span className="color-ramp__chip-label">400</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#B97502'}} />
      <span className="color-ramp__chip-label">500</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#845201'}} />
      <span className="color-ramp__chip-label">600</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#6B4100'}} />
      <span className="color-ramp__chip-label">700</span>
    </div>
  </div>
</div>

<h3>Orange</h3>

<div className="color-ramp">
  <div className="color-ramp__swatches">
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFF0E9'}} />
      <span className="color-ramp__chip-label">50</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FEE2D4'}} />
      <span className="color-ramp__chip-label">100</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFD3BC'}} />
      <span className="color-ramp__chip-label">200</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFB48C'}} />
      <span className="color-ramp__chip-label">300</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FC823A'}} />
      <span className="color-ramp__chip-label">400</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#E65300'}} />
      <span className="color-ramp__chip-label">500</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#C54600'}} />
      <span className="color-ramp__chip-label">600</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#A33B04'}} />
      <span className="color-ramp__chip-label">700</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#823006'}} />
      <span className="color-ramp__chip-label">800</span>
    </div>
  </div>
</div>

<h3>Purple</h3>

<div className="color-ramp">
  <div className="color-ramp__swatches">
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#F9F1FF'}} />
      <span className="color-ramp__chip-label">50</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#F2E3FF'}} />
      <span className="color-ramp__chip-label">100</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#EBD5FF'}} />
      <span className="color-ramp__chip-label">200</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#DDB9FF'}} />
      <span className="color-ramp__chip-label">300</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#C490F9'}} />
      <span className="color-ramp__chip-label">400</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#A964F7'}} />
      <span className="color-ramp__chip-label">500</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#944DE7'}} />
      <span className="color-ramp__chip-label">600</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#7C3EC3'}} />
      <span className="color-ramp__chip-label">700</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#633495'}} />
      <span className="color-ramp__chip-label">800</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#3A1659'}} />
      <span className="color-ramp__chip-label">900</span>
    </div>
  </div>
</div>

<h3>Teal</h3>

<div className="color-ramp">
  <div className="color-ramp__swatches">
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#E2F8FB'}} />
      <span className="color-ramp__chip-label">50</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#CDEEF3'}} />
      <span className="color-ramp__chip-label">100</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#B0E7EF'}} />
      <span className="color-ramp__chip-label">200</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#77D5E3'}} />
      <span className="color-ramp__chip-label">300</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#01B8CA'}} />
      <span className="color-ramp__chip-label">400</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#0095A4'}} />
      <span className="color-ramp__chip-label">500</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#007F8C'}} />
      <span className="color-ramp__chip-label">600</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#016974'}} />
      <span className="color-ramp__chip-label">700</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#1A535A'}} />
      <span className="color-ramp__chip-label">800</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#002D33'}} />
      <span className="color-ramp__chip-label">900</span>
    </div>
  </div>
</div>

<h3>Magenta</h3>

<div className="color-ramp">
  <div className="color-ramp__swatches">
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FEEFF9'}} />
      <span className="color-ramp__chip-label">50</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FEDFF3'}} />
      <span className="color-ramp__chip-label">100</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFCEF2'}} />
      <span className="color-ramp__chip-label">200</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFACE5'}} />
      <span className="color-ramp__chip-label">300</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#F877D2'}} />
      <span className="color-ramp__chip-label">400</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#E142BC'}} />
      <span className="color-ramp__chip-label">500</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#CA26A5'}} />
      <span className="color-ramp__chip-label">600</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#A91A90'}} />
      <span className="color-ramp__chip-label">700</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#891869'}} />
      <span className="color-ramp__chip-label">800</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#50003F'}} />
      <span className="color-ramp__chip-label">900</span>
    </div>
  </div>
</div>

<h3>Lime</h3>

<div className="color-ramp">
  <div className="color-ramp__swatches">
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#EEF6E3'}} />
      <span className="color-ramp__chip-label">50</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#DEEEC6'}} />
      <span className="color-ramp__chip-label">100</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#CAE6A0'}} />
      <span className="color-ramp__chip-label">200</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#A6D467'}} />
      <span className="color-ramp__chip-label">300</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#77B71C'}} />
      <span className="color-ramp__chip-label">400</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#5B9500'}} />
      <span className="color-ramp__chip-label">500</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#4F7F06'}} />
      <span className="color-ramp__chip-label">600</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#3F6900'}} />
      <span className="color-ramp__chip-label">700</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#365310'}} />
      <span className="color-ramp__chip-label">800</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#1B2D00'}} />
      <span className="color-ramp__chip-label">900</span>
    </div>
  </div>
</div>

<h3>Amber</h3>

<div className="color-ramp">
  <div className="color-ramp__swatches">
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFF1E1'}} />
      <span className="color-ramp__chip-label">50</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFE4B7'}} />
      <span className="color-ramp__chip-label">100</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFC67C'}} />
      <span className="color-ramp__chip-label">200</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#FFB749'}} />
      <span className="color-ramp__chip-label">300</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#DF9500'}} />
      <span className="color-ramp__chip-label">400</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#C46E00'}} />
      <span className="color-ramp__chip-label">500</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#A95F03'}} />
      <span className="color-ramp__chip-label">600</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#904A07'}} />
      <span className="color-ramp__chip-label">700</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#6B4100'}} />
      <span className="color-ramp__chip-label">800</span>
    </div>
    <div className="color-ramp__chip">
      <div className="color-ramp__chip-swatch" style={{background: '#3E2000'}} />
      <span className="color-ramp__chip-label">900</span>
    </div>
  </div>
</div>

<h3>Additional primitives</h3>

| Token | Value |
|---|---|
| `--color-white` | #FFFFFF |
| `--color-black` | #000000 |

</TabItem>
</Tabs>
