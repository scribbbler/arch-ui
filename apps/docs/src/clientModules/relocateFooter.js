/**
 * Moves the site footer inside the doc content column so the layout becomes:
 *   horizontal-flex( sidebar, vertical-flex( main-content, footer ) )
 *
 * Docusaurus renders the footer at Layout level (sibling of .main-wrapper),
 * which means it spans below both sidebar and content. We want it to sit
 * inside the content column instead.
 */

function relocateFooter() {
  if (typeof document === 'undefined') return;

  const footer = document.querySelector('footer.theme-layout-footer');
  if (!footer) return;

  // Only relocate on pages with a sidebar (doc pages)
  const sidebar = document.querySelector('.theme-doc-sidebar-container');
  if (!sidebar) return;

  // Target: the doc item column that contains the article + pagination
  const target =
    document.querySelector('.docItemCol_') ||
    document.querySelector('[class*="docItemCol"]') ||
    document.querySelector('.theme-doc-markdown')?.parentElement;

  if (target && footer.parentElement !== target) {
    target.appendChild(footer);
  }
}

if (typeof window !== 'undefined') {
  // Run on every route change and initial load
  const observer = new MutationObserver(() => relocateFooter());
  const start = () => {
    relocateFooter();
    observer.observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}

export function onRouteDidUpdate() {
  relocateFooter();
}
