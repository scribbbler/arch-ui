import * as React from 'react';
import './Spec.css';

type Manifest = {
  name: string;
  version: string;
  description: string;
  status: string;
  accessibility: {
    role: string;
    keyboardInteraction: string[];
    ariaAttributes: string[];
    notes: string[];
  };
  props: Record<
    string,
    { type: string; default?: string; description: string }
  >;
  variants?: Record<string, string>;
  usage?: { do: string[]; dont: string[] };
  tokens: string[];
};

export function Spec({ manifest }: { manifest: Manifest }) {
  return (
    <div className="arch-spec">
      <header className="arch-spec__header">
        <div>
          <h1 className="arch-spec__title">{manifest.name}</h1>
          <p className="arch-spec__description">{manifest.description}</p>
        </div>
        <div className="arch-spec__meta">
          <span
            className="arch-spec__status"
            data-status={manifest.status}
          >
            {manifest.status}
          </span>
          <span className="arch-spec__version">v{manifest.version}</span>
        </div>
      </header>

      <Section title="API">
        <table className="arch-spec__table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(manifest.props).map(([name, prop]) => (
              <tr key={name}>
                <td>
                  <code>{name}</code>
                </td>
                <td>
                  <code className="arch-spec__type">{prop.type}</code>
                </td>
                <td>
                  {prop.default !== undefined ? (
                    <code>{String(prop.default)}</code>
                  ) : (
                    <span className="arch-spec__muted">—</span>
                  )}
                </td>
                <td>{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {manifest.variants && (
        <Section title="Variants">
          <table className="arch-spec__table">
            <thead>
              <tr>
                <th>Variant</th>
                <th>When to use</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(manifest.variants).map(([name, desc]) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      <Section title="Accessibility">
        <dl className="arch-spec__dl">
          <dt>Role</dt>
          <dd>
            <code>{manifest.accessibility.role}</code>
          </dd>
          <dt>Keyboard</dt>
          <dd>
            {manifest.accessibility.keyboardInteraction.map((k) => (
              <kbd key={k} className="arch-spec__kbd">
                {k}
              </kbd>
            ))}
          </dd>
          <dt>ARIA attributes</dt>
          <dd>
            {manifest.accessibility.ariaAttributes.map((a) => (
              <code key={a} className="arch-spec__chip">
                {a}
              </code>
            ))}
          </dd>
        </dl>
        {manifest.accessibility.notes.length > 0 && (
          <ul className="arch-spec__notes">
            {manifest.accessibility.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        )}
      </Section>

      {manifest.usage && (
        <Section title="Usage">
          <div className="arch-spec__usage">
            <div className="arch-spec__usage-col" data-kind="do">
              <h3>Do</h3>
              <ul>
                {manifest.usage.do.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="arch-spec__usage-col" data-kind="dont">
              <h3>Don't</h3>
              <ul>
                {manifest.usage.dont.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      )}

      <Section title={`Tokens used (${manifest.tokens.length})`}>
        <ul className="arch-spec__tokens">
          {manifest.tokens.map((token) => (
            <li key={token}>
              <code>--{token}</code>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="arch-spec__section">
      <h2 className="arch-spec__section-title">{title}</h2>
      {children}
    </section>
  );
}
