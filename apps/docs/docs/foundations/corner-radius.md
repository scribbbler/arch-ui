---
sidebar_label: Corner radius
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Styles</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Corner radius</h1>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Arch UI allows for rounded corners to a variety of components. For simple reference, the metric values for corner radius are 16, 12, 8, and 4. These radius metrics are dependent on the size of the component that it is applied to.
  </p>
</div>

<Tabs>
<TabItem value="usage" label="Usage" default>

<div className="doc-hero doc-hero--dark">
  <div style={{width: '280px', height: '280px', border: '1px solid #555', borderRadius: '16px', position: 'relative'}}>
    <div style={{position: 'absolute', top: '20px', left: '20px', width: '8px', height: '8px', border: '1px solid #fff', borderRadius: '50%'}} />
    <div style={{position: 'absolute', top: '20px', right: '20px', width: '8px', height: '8px', border: '1px solid #fff', borderRadius: '50%'}} />
    <div style={{position: 'absolute', bottom: '20px', left: '20px', width: '8px', height: '8px', border: '1px solid #fff', borderRadius: '50%'}} />
    <div style={{position: 'absolute', bottom: '20px', right: '20px', width: '8px', height: '8px', border: '1px solid #fff', borderRadius: '50%'}} />
    <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: '24px'}}>
      <div style={{width: '60px', height: '60px', border: '1px solid #555', borderRadius: '12px'}} />
      <div style={{width: '60px', height: '60px', border: '1px solid #555', borderRadius: '50%'}} />
    </div>
  </div>
</div>

**Common alternative names**

Border radius, bevel, rounded corners

---

## Radius values

The footprint of a component determines its radius values. Larger components that contain other components can have a greater corner radius. Each Arch UI component comes with the appropriate corner radius already applied. This guide provides insight into how radius values are applied in the Arch UI library.

| Corner radius value | Used for |
|---|---|
| 16px | Large container components like sheets and dialogs |
| 12px (default) | Medium components like cards, snack bars, banners |
| 8px | Medium or small components that often live inside others, like buttons or nested components |
| 4px | Small components like tags |

---

## 16px

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px', margin: '24px 0', display: 'flex', justifyContent: 'center'}}>
  <div style={{background: '#fff', borderRadius: '16px', width: '280px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
    <div style={{fontSize: '16px', fontWeight: 700, marginBottom: '16px'}}>My commute preference</div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e8e8e8'}}>
      <span style={{fontSize: '14px'}}>Walk to pickup</span>
      <span style={{fontSize: '16px'}}>&#9745;</span>
    </div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e8e8e8'}}>
      <span style={{fontSize: '14px'}}>Bike rack</span>
      <span style={{fontSize: '16px'}}>&#9745;</span>
    </div>
    <div style={{marginTop: '16px', background: '#000', color: '#fff', borderRadius: '8px', padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: 600}}>Save</div>
  </div>
</div>

A 16px corner radius is used on large vessel-like containers, such as sheets and dialogs.

---

## 12px

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px', margin: '24px 0', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap'}}>
  <div style={{background: '#fff', borderRadius: '12px', width: '200px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
    <div style={{fontSize: '18px', fontWeight: 700}}>Heading</div>
    <div style={{fontSize: '13px', color: '#727272', marginTop: '4px'}}>Consilio difficultates superare potest esse, immo</div>
    <div style={{fontSize: '12px', color: '#A6A6A6', marginTop: '8px'}}>Label</div>
  </div>
  <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
    <div style={{background: '#266EF1', borderRadius: '12px', padding: '12px 20px', color: '#fff', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px'}}>
      <span>&#9432;</span> Message that takes 2 lines to explain and goes on
      <span style={{marginLeft: 'auto'}}>&#10005;</span>
    </div>
    <div style={{background: '#282828', borderRadius: '12px', padding: '12px 20px', color: '#fff', fontSize: '13px'}}>
      A thing happened
    </div>
  </div>
</div>

The number used most of the time for corner radii is 12px. Medium-sized components like cards, message cards, snack bars, and banners default to this value.

---

## 8px

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px', margin: '24px 0', display: 'flex', justifyContent: 'center'}}>
  <div style={{background: '#000', borderRadius: '8px', padding: '12px 32px', color: '#fff', fontSize: '14px', fontWeight: 600}}>Label</div>
</div>

An 8px radius is used for elements often nested inside others, like buttons.

---

## Nested components

For components with a default corner radius of 12px, their corner radius can be set to 8px when nested inside another component. This subtly creates balance with the parent component.

<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0'}}>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{background: '#fff', borderRadius: '12px', width: '220px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
        <div style={{fontSize: '13px', color: '#727272', marginBottom: '8px'}}>Documents</div>
        <div style={{background: '#F6BC2F', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px'}}>
          <span>&#9888;</span> You have 2 expiring documents
        </div>
        <div style={{fontSize: '13px', marginBottom: '4px'}}>Drivers License</div>
        <div style={{fontSize: '12px', color: '#727272'}}>Expires 8/12/2025 &nbsp; Update</div>
      </div>
    </div>
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '8px'}}>Default 12px corner radius</div>
  </div>
  <div>
    <div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px 24px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{background: '#fff', borderRadius: '12px', width: '220px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
        <div style={{fontSize: '14px', fontWeight: 600, marginBottom: '4px'}}>Vehicle Insurance</div>
        <div style={{fontSize: '12px', color: '#727272', marginBottom: '12px'}}>Progressive gold plan</div>
        <div style={{background: '#F6BC2F', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px'}}>
          <span>&#9888;</span> Expired. Update your plan to drive
        </div>
      </div>
    </div>
    <div style={{fontSize: '13px', fontWeight: 600, marginTop: '8px'}}>Nested 8px corner radius</div>
  </div>
</div>

---

## 4px

<div style={{background: '#f3f3f3', borderRadius: '12px', padding: '32px', margin: '24px 0', display: 'flex', justifyContent: 'center'}}>
  <div style={{background: '#fff', borderRadius: '12px', width: '280px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
    <div style={{width: '100%', height: '140px', background: '#e8e8e8', borderRadius: '8px', marginBottom: '12px'}} />
    <div style={{fontSize: '14px', fontWeight: 600}}>4505 Burgers & BBQ</div>
    <div style={{fontSize: '12px', color: '#727272'}}>$$ Burger American BBQ</div>
    <div style={{display: 'flex', gap: '6px', marginTop: '8px'}}>
      <span style={{fontSize: '11px', border: '1px solid #282828', borderRadius: '4px', padding: '2px 6px'}}>20-25 min</span>
      <span style={{fontSize: '11px', border: '1px solid #282828', borderRadius: '4px', padding: '2px 6px'}}>4.4 (104)</span>
      <span style={{fontSize: '11px', border: '1px solid #282828', borderRadius: '4px', padding: '2px 6px'}}>$0 Delivery fee</span>
    </div>
  </div>
</div>

The radius value of 4 is primarily used on small components like badges.

</TabItem>
<TabItem value="tokens" label="Tokens">

<h2>Primitives</h2>

| Name / Value | CSS variable | Resolved |
|---|---|---|
| 0 (none) | `--radius-none` | 0px |
| 2 (xs) | `--radius-xs` | 2px |
| 4 (sm) | `--radius-sm` | 4px |
| 8 (md) | `--radius-md` | 8px |
| 12 (lg) | `--radius-lg` | 12px |
| 16 (xl) | `--radius-xl` | 16px |
| 24 (2xl) | `--radius-2xl` | 24px |
| 9999 (full) | `--radius-full` | 9999px |

<h2>Semantic</h2>

| CSS variable | Alias | Resolved |
|---|---|---|
| `--radius-component-sm` | `--radius-sm` | 4px |
| `--radius-component-md` | `--radius-md` | 8px |
| `--radius-component-lg` | `--radius-lg` | 12px |
| `--radius-component-full` | `--radius-full` | 9999px |

</TabItem>
<TabItem value="changelog" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
</Tabs>
