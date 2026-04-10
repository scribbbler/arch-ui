/**
 * Moves the site footer inside the doc content column so the layout becomes:
 *   horizontal-flex( sidebar, vertical-flex( main-content, footer ) )
 *
 * Docusaurus renders the footer at Layout level (sibling of .main-wrapper),
 * which means it spans below both sidebar and content. We want it to sit
 * inside the content column instead.
 */

function relocateFooter() {
  if (typeof document === 'undefined') return false;

  const footer = document.querySelector('footer.theme-layout-footer');
  if (!footer) return false;

  // Only relocate on pages with a sidebar (doc pages)
  const sidebar = document.querySelector('.theme-doc-sidebar-container');
  if (!sidebar) return true; // nothing to do, but footer exists

  // Target: the doc item column that contains the article + pagination
  const target =
    document.querySelector('[class*="docItemCol"]') ||
    document.querySelector('.theme-doc-markdown')?.parentElement;

  if (!target) return false;

  if (footer.parentElement !== target) {
    target.appendChild(footer);
  }
  return true;
}

/**
 * Tries to relocate the footer, retrying on subsequent animation frames until
 * the target element exists (because React may not have rendered the new page yet).
 */
function relocateWhenReady(attempts = 0) {
  if (relocateFooter()) return;
  if (attempts > 30) return; // give up after ~500ms
  requestAnimationFrame(() => relocateWhenReady(attempts + 1));
}

if (typeof window !== 'undefined') {
  const start = () => relocateWhenReady();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}

export function onRouteDidUpdate() {
  relocateWhenReady();
}
