import React from 'react';
import primitiveColors from '../../../../packages/tokens/src/primitive/color.json';
import semanticColors from '../../../../packages/tokens/src/semantic/color.json';
import semanticColorsDark from '../../../../packages/tokens/src/semantic/color-dark.json';

const colors = primitiveColors.color;

function isHex(val: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(val);
}

function srgbToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  if (!isHex(hex)) return 0;
  const r = srgbToLinear(parseInt(hex.slice(1, 3), 16));
  const g = srgbToLinear(parseInt(hex.slice(3, 5), 16));
  const b = srgbToLinear(parseInt(hex.slice(5, 7), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function contrastColor(hex: string): string {
  if (!isHex(hex)) return '#282828';
  const lum = relativeLuminance(hex);
  const whiteContrast = contrastRatio(1, lum);
  const blackContrast = contrastRatio(lum, 0);
  return whiteContrast >= blackContrast ? '#fff' : '#000000';
}

function getContrastInfo(hex: string): { fg: string; ratio: string; altFg: string; altRatio: string } {
  if (!isHex(hex)) return { fg: '#282828', ratio: '', altFg: '#fff', altRatio: '' };
  const lum = relativeLuminance(hex);
  const whiteContrast = contrastRatio(1, lum);
  const blackContrast = contrastRatio(lum, 0);
  if (whiteContrast >= blackContrast) {
    return { fg: '#FFFFFF', ratio: whiteContrast.toFixed(1) + ':1', altFg: '#000000', altRatio: blackContrast.toFixed(1) + ':1' };
  }
  return { fg: '#000000', ratio: blackContrast.toFixed(1) + ':1', altFg: '#FFFFFF', altRatio: whiteContrast.toFixed(1) + ':1' };
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

  const baseStep = '600';

  return (
    <div style={{ display: 'flex', gap: '4px', margin: '16px 0', flexWrap: 'wrap' }}>
      {steps.map(({ step, value }) => {
        const isBase = step === baseStep;
        const { fg, ratio, altFg, altRatio } = getContrastInfo(value);
        return (
          <div key={step} style={{ textAlign: 'center', flex: '0 0 84px', marginBottom: '4px' }}>
            <div
              style={{
                background: value,
                borderRadius: isBase ? '9999px 9999px 0 0' : '8px 8px 0 0',
                width: '84px',
                height: '72px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: fg,
                fontSize: '11px',
                fontWeight: isBase ? 700 : 500,
                fontFamily: 'ui-monospace, monospace',
              }}
            >
              <div>{hue}{step}</div>
              <div>{value}</div>
              {ratio && <div style={{ fontSize: '9px', marginTop: '2px' }}>{ratio}</div>}
            </div>
            {altRatio && (
              <div
                style={{
                  background: value,
                  borderRadius: isBase ? '0 0 9999px 9999px' : '0 0 8px 8px',
                  width: '84px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: altFg,
                  fontSize: '9px',
                  fontWeight: 500,
                  fontFamily: 'ui-monospace, monospace',
                }}
              >
                {altRatio}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Renders all primitive color ramps */
export function AllColorRamps() {
  const hues = Object.keys(colors).filter((k) => typeof colors[k] === 'object' && !colors[k].$value);
  return (
    <>
      <h3>Black & White</h3>
      <div style={{ display: 'flex', gap: '4px', margin: '16px 0', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center', flex: '0 0 84px' }}>
          <div
            style={{
              background: colors.black.$value,
              borderRadius: '8px',
              width: '84px',
              height: '84px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 500,
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            <div>black</div>
            <div style={{ opacity: 0.8 }}>{colors.black.$value}</div>
            <div style={{ fontSize: '9px', marginTop: '2px' }}>21.0:1</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', flex: '0 0 84px' }}>
          <div
            style={{
              background: colors.white.$value,
              borderRadius: '8px',
              width: '84px',
              height: '84px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000',
              fontSize: '11px',
              fontWeight: 500,
              fontFamily: 'ui-monospace, monospace',
              border: '1px solid #e8e8e8',
            }}
          >
            <div>white</div>
            <div style={{ opacity: 0.8 }}>{colors.white.$value}</div>
            <div style={{ fontSize: '9px', marginTop: '2px' }}>21.0:1</div>
          </div>
        </div>
      </div>
      {hues.map((hue) => (
        <div key={hue}>
          <h3>{hue.charAt(0).toUpperCase() + hue.slice(1)}</h3>
          <ColorRamp hue={hue} />
        </div>
      ))}
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
