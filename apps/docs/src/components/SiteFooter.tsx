import React from 'react';

/**
 * Static site footer used at the bottom of every doc page and the landing page.
 * Rendered inside the main content column so it sits below the article, with
 * the sidebar extending full height alongside it.
 */
export default function SiteFooter(): React.ReactElement {
  return (
    <footer className="site-footer">
      <div className="site-footer__links">
        <a className="site-footer__link" href="/">
          Arch UI
        </a>
        <a className="site-footer__link" href="/foundations/accessibility">
          Accessibility
        </a>
        <a
          className="site-footer__link"
          href="https://github.com/scribbbler/arch-ui"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="site-footer__link"
          href="https://scribbbler.github.io/arch-ui/storybook/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Storybook
        </a>
      </div>
      <div className="site-footer__copyright">© 2026 Arch UI</div>
    </footer>
  );
}
