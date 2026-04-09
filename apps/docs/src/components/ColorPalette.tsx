import React from 'react';
import primitiveColors from '../../../../packages/tokens/src/primitive/color.json';
import semanticColors from '../../../../packages/tokens/src/semantic/color.json';
import semanticColorsDark from '../../../../packages/tokens/src/semantic/color-dark.json';

const colors = primitiveColors.color;

function contrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#282828' : '#fff';
}

function resolveRef(ref: string): string {
  // Resolve "{color.blue.600}" → "#266EF1"
  const path = ref.replace(/[{}]/g, '').split('.');
  let val: any = primitiveColors;
  for (const key of path) {
    val = val?.[key];
  }
  return val?.$value || ref;
}

/** Renders a full hue ramp (50–900) from primitive tokens */
export function ColorRamp({ hue }: { hue: string }) {
  const palette = colors[hue];
  if (!palette) return <p>Unknown hue: {hue}</p>;

  const steps = Object.entries(palette)
    .map(([step, token]: [string, any]) => ({ step, value: token.$value }))
    .sort((a, b) => Number(b.step) - Number(a.step));

  return (
    <div style={{ display: 'flex', gap: '4px', margin: '16px 0', flexWrap: 'wrap' }}>
      {steps.map(({ step, value }) => (
        <div key={step} style={{ textAlign: 'center', flex: '1 1 0', minWidth: '60px' }}>
          <div
            style={{
              background: value,
              borderRadius: '8px',
              padding: '24px 8px',
              color: contrastColor(value),
              fontSize: '11px',
              fontWeight: 500,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            <div>{hue}{step}</div>
            <div style={{ opacity: 0.8 }}>{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Renders all primitive color ramps */
export function AllColorRamps() {
  const hues = Object.keys(colors).filter((k) => typeof colors[k] === 'object');
  return (
    <>
      {hues.map((hue) => (
        <div key={hue}>
          <h3>{hue.charAt(0).toUpperCase() + hue.slice(1)}</h3>
          <ColorRamp hue={hue} />
        </div>
      ))}
      <div style={{ display: 'flex', gap: '16px', margin: '16px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              background: '#000000',
              borderRadius: '8px',
              padding: '24px 16px',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 500,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            <div>black</div>
            <div style={{ opacity: 0.8 }}>#000000</div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '8px',
              padding: '24px 16px',
              color: '#282828',
              fontSize: '11px',
              fontWeight: 500,
              fontFamily: 'ui-monospace, monospace',
              border: '1px solid #e8e8e8',
            }}
          >
            <div>white</div>
            <div style={{ opacity: 0.8 }}>#FFFFFF</div>
          </div>
        </div>
      </div>
    </>
  );
}

/** Renders a semantic token table for a category */
export function SemanticTokenTable({ category }: { category: string }) {
  const lightTokens = semanticColors.color[category];
  const darkTokens = semanticColorsDark.color[category];

  if (!lightTokens) return <p>Unknown category: {category}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th>Light</th>
          <th>Dark</th>
          <th>Use case</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(lightTokens).map(([name, token]: [string, any]) => {
          const lightRef = token.$value;
          const darkRef = darkTokens?.[name]?.$value;
          const lightResolved = lightRef.startsWith('{') ? resolveRef(lightRef) : lightRef;
          const darkResolved = darkRef?.startsWith('{') ? resolveRef(darkRef) : darkRef;

          return (
            <tr key={name}>
              <td>
                <code>--color-{category}-{name}</code>
              </td>
              <td>
                <span
                  style={{
                    display: 'inline-block',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: lightResolved,
                    border: '1px solid rgba(0,0,0,0.1)',
                    verticalAlign: 'middle',
                    marginRight: '6px',
                  }}
                />
                {lightResolved}
              </td>
              <td>
                {darkResolved && (
                  <>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: darkResolved,
                        border: '1px solid rgba(0,0,0,0.1)',
                        verticalAlign: 'middle',
                        marginRight: '6px',
                      }}
                    />
                    {darkResolved}
                  </>
                )}
              </td>
              <td>{name.replace(/-/g, ' ')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** Renders a color swatch with label */
export function ColorSwatch({ color, label }: { color: string; label?: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        background: color,
        border: '1px solid rgba(0,0,0,0.1)',
        verticalAlign: 'middle',
        marginRight: label ? '6px' : 0,
      }}
    />
  );
}
