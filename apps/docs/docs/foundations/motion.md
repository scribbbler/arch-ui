---
sidebar_label: Motion
title: Motion
description: Tokenised duration and easing values that communicate relationships, provide feedback, and guide attention cohesively.
eyebrow: Expression
status: Draft
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Guidance from '@site/src/components/Guidance';
import PageHeader from '@site/src/components/PageHeader';

<PageHeader />

<Tabs>
<TabItem value="usage" label="Usage" default>

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', height: '360px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px'}}>
  <div style={{width: '48px', height: '48px', borderRadius: '8px', background: '#266EF1', animation: 'arch-motion-demo-slide 2s ease-in-out infinite'}}>
  </div>
  <div style={{width: '48px', height: '48px', borderRadius: '50%', background: '#6DAAFB', animation: 'arch-motion-demo-pulse 2s ease-out infinite'}}>
  </div>
  <div style={{width: '48px', height: '48px', borderRadius: '8px', background: '#A9C8FC', animation: 'arch-motion-demo-rotate 2s ease-in-out infinite'}}>
  </div>
</div>

<style>{`
@keyframes arch-motion-demo-slide {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
@keyframes arch-motion-demo-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}
@keyframes arch-motion-demo-rotate {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
}
`}</style>

**Common alternative names**

Animation, transitions, timing, easing

---

## Principles

### Purposeful, not decorative

Every animation must serve a function: confirming an action, revealing content, or directing focus. If an animation does not help the user understand what happened or what to do next, remove it.

### Fast by default

Users should never feel like they are waiting for an animation to finish. Most interactions use `--motion-duration-fast` (100ms) or `--motion-duration-normal` (200ms). Reserve longer durations for complex transitions that involve spatial rearrangement.

### Respect user preferences

Arch UI honours `prefers-reduced-motion: reduce` at the token level. When reduced motion is active, all duration tokens above `instant` resolve to `0ms`, effectively disabling animations without any code changes from consumers.

---

## Duration

Duration tokens control how long a transition takes. Shorter durations feel snappy and responsive; longer durations give the eye time to follow larger movements.

| Token | CSS variable | Value | Use case |
|---|---|---|---|
| `motion.duration.instant` | `--motion-duration-instant` | `0ms` | Immediate state changes with no perceptible transition |
| `motion.duration.fast` | `--motion-duration-fast` | `100ms` | Micro-interactions: button press, checkbox toggle, icon swap |
| `motion.duration.normal` | `--motion-duration-normal` | `200ms` | Default for most transitions: hover states, colour changes, opacity fades |
| `motion.duration.slow` | `--motion-duration-slow` | `300ms` | Medium transitions: dropdown open, accordion expand, tooltip appear |
| `motion.duration.slower` | `--motion-duration-slower` | `500ms` | Complex transitions: page-level reveals, panel slides, staggered lists |

### Duration visualised

<div style={{display: 'flex', flexDirection: 'column', gap: '12px', margin: '24px 0'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
    <code style={{width: '80px', fontSize: '13px', flexShrink: 0}}>instant</code>
    <div style={{width: '0%', height: '8px', borderRadius: '4px', background: 'var(--ifm-color-primary)', minWidth: '4px'}}></div>
    <span style={{fontSize: '13px', color: '#727272'}}>0ms</span>
  </div>
  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
    <code style={{width: '80px', fontSize: '13px', flexShrink: 0}}>fast</code>
    <div style={{width: '20%', height: '8px', borderRadius: '4px', background: 'var(--ifm-color-primary)'}}></div>
    <span style={{fontSize: '13px', color: '#727272'}}>100ms</span>
  </div>
  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
    <code style={{width: '80px', fontSize: '13px', flexShrink: 0}}>normal</code>
    <div style={{width: '40%', height: '8px', borderRadius: '4px', background: 'var(--ifm-color-primary)'}}></div>
    <span style={{fontSize: '13px', color: '#727272'}}>200ms</span>
  </div>
  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
    <code style={{width: '80px', fontSize: '13px', flexShrink: 0}}>slow</code>
    <div style={{width: '60%', height: '8px', borderRadius: '4px', background: 'var(--ifm-color-primary)'}}></div>
    <span style={{fontSize: '13px', color: '#727272'}}>300ms</span>
  </div>
  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
    <code style={{width: '80px', fontSize: '13px', flexShrink: 0}}>slower</code>
    <div style={{width: '100%', height: '8px', borderRadius: '4px', background: 'var(--ifm-color-primary)'}}></div>
    <span style={{fontSize: '13px', color: '#727272'}}>500ms</span>
  </div>
</div>

### Choosing a duration

Use the smallest duration that still lets the user perceive the change. A good heuristic:

- **Under 100px of movement**: `--motion-duration-fast`
- **100 to 300px of movement**: `--motion-duration-normal` or `--motion-duration-slow`
- **Full-screen or multi-element choreography**: `--motion-duration-slower`

---

## Easing

Easing curves define the acceleration profile of an animation. They are the difference between motion that feels mechanical and motion that feels natural.

### Primitive easing tokens

| Token | CSS variable | Value | Character |
|---|---|---|---|
| `motion.easing.linear` | `--motion-easing-linear` | `linear` | Constant speed, no acceleration. Use for progress bars and looping animations. |
| `motion.easing.ease-in` | `--motion-easing-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Starts slow, accelerates. Elements leaving the viewport. |
| `motion.easing.ease-out` | `--motion-easing-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Starts fast, decelerates. Elements entering the viewport. |
| `motion.easing.ease-in-out` | `--motion-easing-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetrical acceleration. Default for on-screen state changes. |
| `motion.easing.spring` | `--motion-easing-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Slight overshoot. Playful reveals, toasts, popovers. |
| `motion.easing.bounce` | `--motion-easing-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Pronounced overshoot. Attention-grabbing, use sparingly. |

### Easing curves visualised

<div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '24px 0'}}>
  <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '24px 16px', textAlign: 'center'}}>
    <div style={{width: '40px', height: '40px', borderRadius: '8px', background: 'var(--ifm-color-primary)', margin: '0 auto 16px', animation: 'arch-ease-linear 2s linear infinite'}}>
    </div>
    <div style={{fontSize: '13px', fontWeight: 600}}>linear</div>
    <div style={{fontSize: '12px', color: '#727272'}}>Constant speed</div>
  </div>
  <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '24px 16px', textAlign: 'center'}}>
    <div style={{width: '40px', height: '40px', borderRadius: '8px', background: 'var(--ifm-color-primary)', margin: '0 auto 16px', animation: 'arch-ease-inout 2s cubic-bezier(0.4, 0, 0.2, 1) infinite'}}>
    </div>
    <div style={{fontSize: '13px', fontWeight: 600}}>ease-in-out</div>
    <div style={{fontSize: '12px', color: '#727272'}}>Default</div>
  </div>
  <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '24px 16px', textAlign: 'center'}}>
    <div style={{width: '40px', height: '40px', borderRadius: '8px', background: 'var(--ifm-color-primary)', margin: '0 auto 16px', animation: 'arch-ease-spring 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite'}}>
    </div>
    <div style={{fontSize: '13px', fontWeight: 600}}>spring</div>
    <div style={{fontSize: '12px', color: '#727272'}}>Overshoot</div>
  </div>
</div>

<style>{`
@keyframes arch-ease-linear {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}
@keyframes arch-ease-inout {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}
@keyframes arch-ease-spring {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}
`}</style>

---

## Do and Don't

<Guidance.Grid>
  <Guidance.Do description="Use semantic tokens in components so intent is clear and changes propagate automatically.">
    <code>transition: transform var(--motion-duration-fast) var(--motion-semantic-easing-enter);</code>
  </Guidance.Do>
  <Guidance.Dont description="Hardcoding cubic-bezier values or raw millisecond durations bypasses the token system and breaks reduced-motion support.">
    <code>transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);</code>
  </Guidance.Dont>
</Guidance.Grid>

<Guidance.Grid>
  <Guidance.Do description="Prefer transform and opacity for animations. These properties are GPU-composited and do not trigger layout recalculation.">
    <code>transition: transform 200ms, opacity 200ms;</code>
  </Guidance.Do>
  <Guidance.Dont description="Animating width, height, top, left, or margin triggers expensive layout reflows on every frame.">
    <code>transition: width 200ms, margin-left 200ms;</code>
  </Guidance.Dont>
</Guidance.Grid>

<Guidance.Grid>
  <Guidance.Do description="Keep exit animations faster than enter animations. Users want departing UI to get out of the way quickly.">
    <code>transition-duration: var(--motion-duration-fast);</code>
  </Guidance.Do>
  <Guidance.Dont description="Using slower durations for simple hover states feels sluggish. A 500ms delay on a button hover is too slow.">
    <code>transition-duration: var(--motion-duration-slower);</code>
  </Guidance.Dont>
</Guidance.Grid>

<Guidance.Grid>
  <Guidance.Do description="Test with prefers-reduced-motion: reduce enabled. Verify that the interface is still fully usable without any animation.">
    <code>{'@media (prefers-reduced-motion: reduce) { /* no motion */ }'}</code>
  </Guidance.Do>
  <Guidance.Dont description="Don't rely on animation as the only feedback mechanism. Pair motion with a visible state change so reduced-motion users are not left guessing.">
    <code>transform: translateY(-2px); /* only signal */</code>
  </Guidance.Dont>
</Guidance.Grid>

---

## Performance checklist

1. **Animate composited properties only.** `transform`, `opacity`, and `filter` are cheap. Everything else triggers layout or paint.
2. **Use `will-change` sparingly.** Add it right before an animation starts and remove it after. Permanent `will-change` wastes GPU memory.
3. **Avoid animating during scroll.** If you must, use `IntersectionObserver` to trigger animations only when elements enter the viewport.
4. **Cap concurrent animations.** More than three simultaneous animated elements on screen can cause frame drops on lower-end devices.

---

## Accessibility requirements

- All animations must be disabled when `prefers-reduced-motion: reduce` is active. This is handled automatically by the token system.
- No animation should flash more than three times per second (WCAG 2.3.1).
- Content must not require animation to be understood. Animation supplements meaning but never replaces it.
- Auto-playing animations (loading spinners excluded) should pause after 5 seconds or provide a way to stop them (WCAG 2.2.2).

</TabItem>
<TabItem value="tokens" label="Tokens">

<h2>Semantic motion tokens</h2>

Semantic tokens map primitive values to interaction contexts. Use these in component CSS instead of the primitive tokens. They carry intent, making future changes safer.

| Semantic token | CSS variable | Resolves to | When to use |
|---|---|---|---|
| `motion.semantic.duration-instant` | `--motion-semantic-duration-instant` | `--motion-duration-instant` (0ms) | Immediate, no transition |
| `motion.semantic.duration-fast` | `--motion-semantic-duration-fast` | `--motion-duration-fast` (100ms) | Micro-interactions |
| `motion.semantic.duration-normal` | `--motion-semantic-duration-normal` | `--motion-duration-normal` (200ms) | Standard transitions |
| `motion.semantic.duration-slow` | `--motion-semantic-duration-slow` | `--motion-duration-slow` (300ms) | Content reveals |
| `motion.semantic.duration-slower` | `--motion-semantic-duration-slower` | `--motion-duration-slower` (500ms) | Complex choreography |
| `motion.semantic.easing-default` | `--motion-semantic-easing-default` | `--motion-easing-ease-in-out` | On-screen state changes (hover, active, focus) |
| `motion.semantic.easing-enter` | `--motion-semantic-easing-enter` | `--motion-easing-ease-out` | Elements appearing: modals, tooltips, dropdowns |
| `motion.semantic.easing-exit` | `--motion-semantic-easing-exit` | `--motion-easing-ease-in` | Elements disappearing: closing dialogs, removing toasts |

<h2>Why enter uses ease-out and exit uses ease-in</h2>

This is intentional and follows a physical model:

- **Enter (ease-out):** The element arrives quickly then decelerates into its resting position, like a ball rolling to a stop. The user perceives it as responsive.
- **Exit (ease-in):** The element starts slow then accelerates away, like dropping off a shelf. It clears the viewport quickly, getting out of the way.

<h2>Token alias chain</h2>

<div className="token-tier-diagram" style={{margin: '24px 0'}}>
  <div className="token-tier-diagram__content">
    <div className="token-tier-diagram__tree">
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <div className="token-tier-diagram__node"><code>--motion-semantic-easing-default</code></div>
        <div className="token-tier-diagram__node"><code>--motion-semantic-easing-enter</code></div>
        <div className="token-tier-diagram__node"><code>--motion-semantic-easing-exit</code></div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', fontSize: '20px', color: '#999'}}>&#8594;</div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <div className="token-tier-diagram__node"><code>--motion-easing-ease-in-out</code></div>
        <div className="token-tier-diagram__node"><code>--motion-easing-ease-out</code></div>
        <div className="token-tier-diagram__node"><code>--motion-easing-ease-in</code></div>
      </div>
    </div>
    <div className="token-tier-diagram__labels">
      <span className="token-tier-diagram__label">semantic</span>
      <span className="token-tier-diagram__label">primitive</span>
    </div>
  </div>
</div>

</TabItem>
<TabItem value="code" label="Code">

<h2>Using motion tokens in CSS</h2>

Always compose `transition` shorthand from the duration and easing tokens together:

```css
/* Recommended — semantic tokens */
.button {
  transition: background-color var(--motion-semantic-duration-fast) var(--motion-semantic-easing-default);
}

/* Also valid — primitive tokens for one-off cases */
.panel {
  transition: transform var(--motion-duration-slow) var(--motion-easing-ease-out);
}
```

<h2>Enter and exit patterns</h2>

For elements that appear and disappear, use matching semantic easing tokens:

```css
/* Tooltip entering */
.tooltip[data-state="open"] {
  animation: tooltip-enter var(--motion-semantic-duration-normal) var(--motion-semantic-easing-enter);
}

/* Tooltip exiting */
.tooltip[data-state="closed"] {
  animation: tooltip-exit var(--motion-semantic-duration-fast) var(--motion-semantic-easing-exit);
}

@keyframes tooltip-enter {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes tooltip-exit {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(4px);
  }
}
```

<h2>Common patterns</h2>

| Pattern | Duration token | Easing token | Example |
|---|---|---|---|
| Hover state | `--motion-semantic-duration-fast` | `--motion-semantic-easing-default` | Button background change |
| Focus ring | `--motion-semantic-duration-fast` | `--motion-semantic-easing-default` | Input focus outline |
| Dropdown open | `--motion-semantic-duration-normal` | `--motion-semantic-easing-enter` | Select menu appearing |
| Dropdown close | `--motion-semantic-duration-fast` | `--motion-semantic-easing-exit` | Select menu disappearing |
| Modal enter | `--motion-semantic-duration-slow` | `--motion-semantic-easing-enter` | Dialog sliding in |
| Modal exit | `--motion-semantic-duration-normal` | `--motion-semantic-easing-exit` | Dialog fading out |
| Accordion expand | `--motion-semantic-duration-slow` | `--motion-semantic-easing-default` | Content height change |
| Toast appear | `--motion-semantic-duration-normal` | `--motion-semantic-easing-enter` | Notification sliding in |
| Skeleton pulse | `--motion-semantic-duration-slower` | `--motion-easing-linear` | Loading placeholder |

<h2>Reduced motion</h2>

Arch UI automatically respects `prefers-reduced-motion`. When the user has reduced motion enabled, all duration tokens above `instant` resolve to `0ms`:

```css
/* This is handled at the token level — you get it for free.
   The built CSS already includes: */
@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-duration-fast: 0ms;
    --motion-duration-normal: 0ms;
    --motion-duration-slow: 0ms;
    --motion-duration-slower: 0ms;
    --motion-semantic-duration-fast: 0ms;
    --motion-semantic-duration-normal: 0ms;
    --motion-semantic-duration-slow: 0ms;
    --motion-semantic-duration-slower: 0ms;
  }
}
```

Because the tokens themselves change, every component that uses them inherits reduced-motion behaviour with zero additional code.

</TabItem>
<TabItem value="status" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
</Tabs>
