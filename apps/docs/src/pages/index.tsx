import React from 'react';
import Layout from '@theme/Layout';
import SiteFooter from '../components/SiteFooter';
import { CategoryCardGrid } from '../components/CategoryCard';
import { topLevelCategories } from '../data/categories';

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
        <CategoryCardGrid items={topLevelCategories} />
        <SiteFooter />
      </main>
    </Layout>
  );
}
