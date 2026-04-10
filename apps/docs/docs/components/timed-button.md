---
sidebar_label: Timed button
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>BUTTONS</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Timed button</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Timed buttons are used as a variation of our rectangle buttons. The main difference is that, unlike standard ones, timed buttons auto-advance the user after a finite amount of time (usually a few seconds).
  </p>
</div>

<Tabs>
<TabItem value="usage" label="Usage" default>

<div className="doc-hero doc-hero--dark">
  <div style={{width: '280px', background: '#fff', borderRadius: '16px', padding: '24px', textAlign: 'center'}}>
    <div style={{fontSize: '14px', fontWeight: 600, marginBottom: '8px'}}>Confirm action</div>
    <div style={{fontSize: '13px', color: '#727272', marginBottom: '20px'}}>This action will proceed automatically when the timer expires.</div>
    <div style={{background: '#000', color: '#fff', borderRadius: '8px', padding: '14px', fontSize: '14px', fontWeight: 600, position: 'relative', overflow: 'hidden'}}>
      Confirm (0:10)
      <div style={{position: 'absolute', left: 0, bottom: 0, height: '3px', width: '60%', background: 'rgba(255,255,255,0.3)', borderRadius: '0 2px 2px 0'}} />
    </div>
    <div style={{fontSize: '14px', color: '#282828', marginTop: '12px', cursor: 'pointer'}}>No thanks</div>
  </div>
</div>

**Common alternative names**

Timer button, countdown button, offer button, auto-advance timer

---

## Anatomy

The timed button closely follows the anatomy of a standard Arch UI rectangle button. The two main differences are that the timed button includes a second label for the timer and an overlay to indicate timer progress. All of the elements below are required. An optional leading and trailing icon can be added as well.

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '48px 32px', margin: '24px 0', display: 'flex', justifyContent: 'center'}}>
  <div style={{position: 'relative', display: 'inline-block'}}>
    <div style={{background: '#000', color: '#fff', borderRadius: '8px', padding: '14px 48px', fontSize: '14px', fontWeight: 600, position: 'relative', overflow: 'hidden'}}>
      Label (0:00)
      <div style={{position: 'absolute', left: 0, bottom: 0, height: '3px', width: '40%', background: 'rgba(255,255,255,0.3)'}} />
    </div>
    <div style={{position: 'absolute', top: '-24px', left: '30%', fontSize: '11px', color: '#DE1135', fontWeight: 600}}>Label<br/><span style={{fontSize: '10px', fontWeight: 400}}>(Required)</span></div>
    <div style={{position: 'absolute', top: '-24px', right: '15%', fontSize: '11px', color: '#DE1135', fontWeight: 600}}>Timer<br/><span style={{fontSize: '10px', fontWeight: 400}}>(Required)</span></div>
    <div style={{position: 'absolute', bottom: '-24px', left: '-20px', fontSize: '11px', color: '#DE1135', fontWeight: 600}}>Timer progress<br/><span style={{fontSize: '10px', fontWeight: 400}}>(Required)</span></div>
    <div style={{position: 'absolute', bottom: '-24px', right: '-30px', fontSize: '11px', color: '#DE1135', fontWeight: 600}}>Base container<br/><span style={{fontSize: '10px', fontWeight: 400}}>(Required)</span></div>
  </div>
</div>

### Iconography

Icons can be placed in leading, trailing, or both positions.

<div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '24px 0'}}>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '80px 16px 16px', display: 'flex', justifyContent: 'center'}}>
      <div style={{background: '#000', color: '#fff', borderRadius: '8px', padding: '12px 20px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px'}}>
        <span>&#9829;</span> Label (0:00)
      </div>
    </div>
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '8px'}}>Leading</div>
  </div>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '80px 16px 16px', display: 'flex', justifyContent: 'center'}}>
      <div style={{background: '#000', color: '#fff', borderRadius: '8px', padding: '12px 20px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px'}}>
        Label (0:00) <span>&#8594;</span>
      </div>
    </div>
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '8px'}}>Trailing</div>
  </div>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '80px 16px 16px', display: 'flex', justifyContent: 'center'}}>
      <div style={{background: '#000', color: '#fff', borderRadius: '8px', padding: '12px 20px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px'}}>
        <span>&#9829;</span> Label (0:00) <span>&#8594;</span>
      </div>
    </div>
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '8px'}}>Leading and trailing</div>
  </div>
</div>

---

## Usage

Timed buttons should be used sparingly to notify users that the current screen requires their immediate and timely attention.

### Optional actions

<div style={{background: '#FFF3DD', borderRadius: '8px', padding: '16px 20px', margin: '24px 0', fontSize: '14px'}}>
  <strong>If misused, timed buttons can cause more harm than good.</strong><br/>
  Ensure usage of these buttons is tied only to optional flows and actions and not interacting with them will cause no degradation in the overall quality of our products, services, or experiences.
</div>

### Use cases

| Use case | Description |
|---|---|
| **Timed offers** | Help users make a decision between two products, tradeoff between speed and cost, etc. |
| **Focus on tasks at hand** | Increase user productivity by enabling quick auto-confirmation on actions that are extremely familiar, have a low learning curve and a low decline/dropoff rate. |
| **Timeout to limit actions** | Timed buttons can be used to limit the number of times a user can take a certain action. |
| **Buffer to reverse action** | Allow users, who realize they made a mistake or change their mind, to cancel an action within a certain amount of time after it has been triggered. |

### Continuous transparency

Use the provided numerical countdown to reinforce how much time a user has left to take action and ensure all users can comprehend it (including screen readers).

<div style={{background: '#FFF3DD', borderRadius: '8px', padding: '16px 20px', margin: '24px 0', fontSize: '14px'}}>
  <strong>This is especially important for accessibility.</strong><br/>
  Users with cognitive disabilities find it even harder to decide when time limits are unclear. Users with visual impairments cannot see the visual affordance, so the remaining explicit time makes this button accessible to them with a screen reader.
</div>

<div className="do-dont-grid">
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Solely use visual indicators to communicate time sensitivity — this is challenging for users with cognitive disabilities and vision impairments.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Use two-line layouts for the timer label. Two-line layouts are strictly reserved for localisation and dynamic type and should not be used otherwise.</p>
  </div>
</div>

### Asking for more time

We highly encourage thinking about ways to enable users to set their preferences when it comes to time — whether that's asking for extended timers or disabling them completely.

**Explicit action** — One way to allow for more time is to present a visible trigger to extend the remaining time.

**Setting preferences** — Users should be able to set a preference on a product or system level to define their needs when it comes to time. Consider using a regular button the first time you introduce a new experience (FTUX) and give them the option to save their preference for next time. During their next session, switch out the preferred choice to use a timed button to auto-advance them.

---

## Behavior

### States

| State | Description |
|---|---|
| **Preloading** | An interim state when the content within the element is being loaded. Uses a placeholder component. |
| **Enabled** | The timed button is counting down right away in the enabled state before a user interacts with it. |
| **Pressed / Mousedown** | Text and icons use inverse primary. Container uses inverse primary + 20% white overlay. |
| **Focus** | Text and icons use inverse primary. Container uses inverse primary. Outline: 3px focus border. |
| **Disabled** | Text and icons use disabled content color. Container uses disabled background. |
| **Loading** | Container uses inverse primary. Spinner matches icon size for large button. |

### Moving forward/backward in the flow

When a user navigates forward through a timed flow, the timer begins immediately. If a user navigates backward to a previous step, the timer should reset to its original duration.

### Proactive versus timeout interaction

Users can tap or click a timed button or do nothing as the timer completes. Both result in the timed button's action being executed.

**Proactive** — If a user wants to proactively choose the auto-advance action before the timer ends, they can tap the button at any point during the countdown.

**Timeout** — If a user does not interact with the timed button, the action will be executed automatically when the countdown reaches zero.

### Motion and timing

When using timed buttons, ensure that the larger UI presentation layer they are part of is on the screen long enough for all users to decide and acknowledge the change.

<div style={{background: '#FFF3DD', borderRadius: '8px', padding: '16px 20px', margin: '24px 0', fontSize: '14px'}}>
  <strong>Timing is crucial for users with disabilities,</strong> where having a shorter timer can contribute to a negative experience.
</div>

| Use case | Why more time is needed |
|---|---|
| People with physical disabilities | Often need more time to react, interact with screens, and complete activities. |
| People with low vision | Need more time to locate things on the screen and to read them. |
| People who are blind and using a screen reader | May often need more time to have things read out loud, orient themselves, understand screen layouts, find information, and operate controls. |
| People who are deaf and communicate in sign language | May need more time to read the information when it's printed in text because their first language might be sign language. |
| People with cognitive or language limitations | Need more time to read and to understand and process. |

<div className="do-dont-grid">
  <div className="do-block">
    <strong>Do</strong>
    <p>Keep the button and its container for at least 15–20 seconds to ensure users have enough time to read and process.</p>
  </div>
  <div className="dont-block">
    <strong>Don't</strong>
    <p>Use a timer of under 10 seconds — this is way too short and will most likely cause a spike in errors and unhappy users.</p>
  </div>
</div>

#### Timing presets

| Preset | Time | Note |
|---|---|---|
| Short | 30 sec | Give the user 30 seconds to read your content and make an informed decision. |
| Medium | 45 sec | Give the user 45 seconds to read your content and make an informed decision. |
| Long | 75 sec | Give the user 75 seconds to read your content and make an informed decision. |
| Custom | 8 sec &le; custom | You can set a custom duration of the timer, with an absolute minimum of 15 seconds, to ensure most users can make an informed decision and read through the content. |

### Breakpoints

Timed buttons should follow the same button breakpoint rules defined in the Button documentation — full-width on mobile, content-width or full-width on desktop depending on the layout context.

---

## Related components

- [Button](/components/button) — Standard rectangle button
- [Button group](/components/button-group) — Group of related buttons
- [Button dock](/components/button-dock) — Fixed bottom container for primary actions
- [Sliding button](/components/sliding-button) — Swipe-to-confirm interaction

</TabItem>
<TabItem value="specs" label="Specs">

<h2>Metrics</h2>

| Property | Value |
|---|---|
| Corner radius | 8px (`--radius-component-medium`) |
| Padding (horizontal) | 16px (`--spacing-component-large`) |
| Padding (vertical) | 16px (`--spacing-component-large`) |
| Text alignment | Centre-aligned |
| Timer progress height | 3px, bottom-aligned |

<h2>Type and color</h2>

| Element | Token |
|---|---|
| Label text | `label-large` / `--color-content-inverse-primary` |
| Container (enabled) | `--color-background-inverse-primary` |
| Container (pressed) | `--color-background-inverse-primary` + 20% `--color-background-primary` overlay |
| Container (disabled) | `--color-background-state-disabled` |
| Text (disabled) | `--color-content-state-disabled` |
| Timer progress bar | `--color-background-primary` at 20% opacity |

<h2>Screen readers</h2>

### VoiceOver

By using the "Updates frequently" trait, VoiceOver will continuously announce the remaining time, increasing announcement frequency as the timer gets closer to 0.

| Property | Value |
|---|---|
| **Voiced preview** | "Label, [time] seconds remaining, Button." |
| Label | Button label text |
| Value | `[time] seconds remaining` |
| Trait | Button, Updates frequently |
| Hint | n/a |

### TalkBack

| Property | Value |
|---|---|
| **Voiced preview** | "Label, Button. Tap to accept" |
| contentDescription | Button label text |
| Role | Button |
| Action | Tap to accept |


</TabItem>
<TabItem value="content" label="Content">

Content guidelines coming soon.

</TabItem>
<TabItem value="changelog" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
<TabItem value="code" label="Code">

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Button label text |
| `duration` | `number` | `30` | Countdown duration in seconds (minimum 15) |
| `onTimeout` | `() => void` | — | Callback when the timer reaches zero |
| `onClick` | `() => void` | — | Callback when the user clicks before timeout |
| `onCancel` | `() => void` | — | Callback when the user cancels (if cancel is available) |
| `kind` | `'primary' \| 'secondary'` | `'primary'` | Visual hierarchy |
| `disabled` | `boolean` | `false` | Disable the button and stop the timer |
| `loading` | `boolean` | `false` | Show loading spinner, pause timer |
| `startEnhancer` | `ReactNode` | — | Leading icon |
| `endEnhancer` | `ReactNode` | — | Trailing icon |
| `size` | `'default' \| 'large' \| 'compact'` | `'default'` | Button size |
| `autoStart` | `boolean` | `true` | Start countdown immediately on mount |

## Basic usage

```jsx
import { TimedButton } from "@arch-ui/components";

<TimedButton
  duration={30}
  onTimeout={() => handleAutoAdvance()}
  onClick={() => handleConfirm()}
>
  Confirm
</TimedButton>
```

## With icons

```jsx
import { TimedButton } from "@arch-ui/components";
import { CheckIcon, ArrowRightIcon } from "@arch-ui/icons";

<TimedButton
  duration={30}
  startEnhancer={<CheckIcon size={20} />}
  endEnhancer={<ArrowRightIcon size={20} />}
  onTimeout={() => handleAutoAdvance()}
>
  Accept offer
</TimedButton>
```

## Keyboard interaction

| Key | Action |
|---|---|
| `Enter` / `Space` | Trigger the button action immediately (proactive) |
| `Escape` | Cancel the timer if a cancel handler is provided |
| `Tab` | Move focus to the next focusable element |

## Accessibility implementation

- The countdown text must be announced to screen readers via `aria-live="polite"` at regular intervals (every 5 seconds for longer timers, every second for the last 3 seconds).
- The button must include `role="timer"` on the countdown element.
- Users must be able to extend or disable timers via preferences (WCAG 2.2.1 Timing Adjustable).
- The timer progress overlay is purely decorative — the numerical countdown is the accessible indicator.

</TabItem>
</Tabs>
