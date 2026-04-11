import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { COMPONENT_COUNT } from '../constants';
import SiteFooter from '../components/SiteFooter';

const categories = [
  {
    title: 'Foundations',
    description:
      'The building blocks of Arch UI. Find out how the system is set up.',
    href: '/foundations',
    image: '/img/landing/foundations.png',
  },
  {
    title: 'Components',
    description:
      'Review specs, guidelines, behaviors, and proper usage for Arch UI components.',
    href: '/components',
    image: '/img/landing/components.png',
  },
  {
    title: 'Patterns',
    description:
      'Review broader design patterns and the module libraries that power them.',
    href: '/patterns/forms',
    image: '/img/landing/patterns.png',
  },
  {
    title: 'Resources & Tools',
    description:
      'Learn how to use Arch UI to design focused and accessible experiences.',
    href: '/intro',
    image: '/img/landing/resources.png',
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
            The design system brands build on. Token-first, agent-ready, and built to be customised rather than simply themed. Any brand. Any scale.
          </p>
        </div>
      </header>

      <main className="arch-categories">
        <div className="arch-categories__grid">
          {categories.map((cat) => (
            <Link key={cat.title} to={useBaseUrl(cat.href)} className="docs-category-card">
              <div className="docs-category-card__icon">
                <img src={useBaseUrl(cat.image)} alt="" />
              </div>
              <h3 className="docs-category-card__title">{cat.title}</h3>
              <p className="docs-category-card__description">{cat.description}</p>
            </Link>
          ))}
        </div>
        <SiteFooter />
      </main>
    </Layout>
  );
}
