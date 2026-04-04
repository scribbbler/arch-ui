import * as React from 'react';
import './Spec.css';

type AnatomyPart = {
  name: string;
  description: string;
  required?: boolean;
};

type Manifest = {
  name: string;
  version: string;
  description: string;
  status: string;
  anatomy?: {
    description?: string;
    parts: AnatomyPart[];
  };
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

type VisualExample = {
  label: string;
  example: React.ReactNode;
};

type SpecProps = {
  manifest: Manifest;
  anatomyDiagram?: React.ReactNode;
  examples?: React.ReactNode;
  visualDos?: VisualExample[];
  visualDonts?: VisualExample[];
};

export function Spec({
  manifest,
  anatomyDiagram,
  examples,
  visualDos,
  visualDonts,
}: SpecProps) {
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

      {manifest.anatomy && (
        <Section title="Anatomy">
          {manifest.anatomy.description && (
            <p className="arch-spec__lead">{manifest.anatomy.description}</p>
          )}
          {anatomyDiagram && (
            <div className="arch-spec__anatomy-diagram">{anatomyDiagram}</div>
          )}
          <table className="arch-spec__table">
            <thead>
              <tr>
                <th>Part</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {manifest.anatomy.parts.map((part) => (
                <tr key={part.name}>
                  <td>
                    <code>{part.name}</code>
                  </td>
                  <td>
                    {part.required ? (
                      <span className="arch-spec__badge" data-tone="required">
                        required
                      </span>
                    ) : (
                      <span className="arch-spec__muted">optional</span>
                    )}
                  </td>
                  <td>{part.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {examples && <Section title="Examples">{examples}</Section>}

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

      {(manifest.usage || visualDos || visualDonts) && (
        <Section title="Usage">
          {manifest.usage && (
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
          )}
          {(visualDos || visualDonts) && (
            <div
              className="arch-spec__visual-usage"
              style={{ marginTop: manifest.usage ? '24px' : '0' }}
            >
              {visualDos?.map((item, i) => (
                <VisualExampleCard
                  key={`do-${i}`}
                  tone="do"
                  label={item.label}
                  example={item.example}
                />
              ))}
              {visualDonts?.map((item, i) => (
                <VisualExampleCard
                  key={`dont-${i}`}
                  tone="dont"
                  label={item.label}
                  example={item.example}
                />
              ))}
            </div>
          )}
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

function VisualExampleCard({
  tone,
  label,
  example,
}: {
  tone: 'do' | 'dont';
  label: string;
  example: React.ReactNode;
}) {
  return (
    <div className="arch-spec__visual-card" data-tone={tone}>
      <div className="arch-spec__visual-card-tag">
        {tone === 'do' ? 'Do' : "Don't"}
      </div>
      <div className="arch-spec__visual-card-stage">{example}</div>
      <div className="arch-spec__visual-card-label">{label}</div>
    </div>
  );
}
