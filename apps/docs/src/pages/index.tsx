import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

const categories = [
  {
    title: 'Foundations',
    description:
      'The building blocks of Arch UI. Explore tokens, typography, colors, spacing, and the design principles behind the system.',
    href: '/foundations/tokens',
    icon: (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
        <rect x="50" y="10" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
        <rect x="10" y="50" width="30" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
        <rect x="50" y="50" width="60" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
        <rect x="90" y="10" width="20" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Components',
    description:
      'Review specs, guidelines, behaviors, and proper usage for all 58 components in the Arch UI library.',
    href: '/components',
    icon: (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="100" height="30" rx="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="40" r="8" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="36" x2="90" y2="36" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="44" x2="75" y2="44" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Patterns',
    description:
      'Review broader design patterns and the composition strategies that bring components together.',
    href: '/patterns/forms',
    icon: (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="5" width="45" height="70" rx="4" stroke="currentColor" strokeWidth="2" />
        <rect x="65" y="5" width="45" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
        <rect x="65" y="45" width="45" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="20" x2="45" y2="20" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="40" x2="45" y2="40" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Resources & Tools',
    description:
      'Storybook explorer, MCP server for AI agents, and developer tooling to work with the design system.',
    href: '/intro',
    icon: (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="100" height="60" rx="4" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="25" x2="110" y2="25" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="17" r="3" fill="currentColor" />
        <circle cx="30" cy="17" r="3" fill="currentColor" />
        <circle cx="40" cy="17" r="3" fill="currentColor" />
        <line x1="20" y1="38" x2="60" y2="38" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="48" x2="80" y2="48" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="58" x2="50" y2="58" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function Home(): React.ReactElement {
  return (
    <Layout title="Arch Design System" description="A design system for building consistent interfaces">
      <header className="arch-hero">
        <div className="arch-hero__grid" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="arch-hero__grid-line" />
          ))}
        </div>
        <div className="arch-hero__content">
          <h1 className="arch-hero__title">Arch Design System</h1>
          <p className="arch-hero__version">Work in progress</p>
          <p className="arch-hero__description">
            A token-driven, accessible React component library with 58 components.
            Built for teams that want consistent UI primitives with first-class
            AI agent support via MCP server and component manifests.
          </p>
        </div>
      </header>

      <main className="arch-categories">
        <div className="arch-categories__grid">
          {categories.map((cat) => (
            <Link key={cat.title} to={useBaseUrl(cat.href)} className="arch-card">
              <div className="arch-card__icon">{cat.icon}</div>
              <h3 className="arch-card__title">{cat.title}</h3>
              <p className="arch-card__description">{cat.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
