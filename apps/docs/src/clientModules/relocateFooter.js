/**
 * Moves the site footer inside the doc content column so the layout becomes:
 *   horizontal-flex( sidebar, vertical-flex( main-content, footer ) )
 *
 * Docusaurus renders the footer at Layout level (sibling of .main-wrapper).
 * We use a persistent MutationObserver to move it inside the doc content column
 * whenever it appears, so SPA navigation works without needing a hard refresh.
 */

function tryRelocate() {
  if (typeof document === 'undefined') return;

  const footer = document.querySelector('footer.theme-layout-footer');
  if (!footer) return;

  // Only relocate on pages with a sidebar (doc pages)
  const sidebar = document.querySelector('.theme-doc-sidebar-container');
  if (!sidebar) return;

  // Target: the doc item column that contains the article + pagination
  const target =
    document.querySelector('[class*="docItemCol"]') ||
    document.querySelector('.theme-doc-markdown')?.parentElement;
  if (!target) return;

  if (footer.parentElement !== target) {
    target.appendChild(footer);
  }
}

if (typeof window !== 'undefined') {
  const run = () => {
    tryRelocate();
    // Persistent observer: re-run whenever React mutates the DOM
    const observer = new MutationObserver(() => tryRelocate());
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}

export function onRouteDidUpdate() {
  // Also run on each route change as a belt-and-braces measure
  requestAnimationFrame(() => tryRelocate());
}
