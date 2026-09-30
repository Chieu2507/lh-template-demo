/*
 * Load below-the-fold Theme Block modules when their script marker approaches
 * the viewport. Module imports are cached by the browser, so repeated markers
 * for the same carousel runtime resolve to one module evaluation.
 */
(() => {
  const selector = 'script[data-theme-module]';
  const modulePromises = new Map();
  const observedTargets = new WeakSet();

  const importModule = (src) => {
    if (!modulePromises.has(src)) {
      const promise = import(src).catch((error) => {
        modulePromises.delete(src);
        throw error;
      });
      modulePromises.set(src, promise);
    }

    return modulePromises.get(src);
  };

  const load = (script) => {
    if (!script || script.dataset.themeModuleState === 'loading' || script.dataset.themeModuleState === 'loaded') return;

    const src = script.dataset.themeModule;
    if (!src) return;

    script.dataset.themeModuleState = 'loading';
    importModule(src)
      .then(() => {
        script.dataset.themeModuleState = 'loaded';
      })
      .catch(() => {
        script.dataset.themeModuleState = 'error';
      });
  };

  const schedule = (target) => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => loadTarget(target), { timeout: 2000 });
    } else {
      window.setTimeout(() => loadTarget(target), 1000);
    }
  };

  const loadTarget = (target) => {
    target.querySelectorAll?.(selector).forEach(load);
  };

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          loadTarget(entry.target);
        });
      }, { rootMargin: '300px 0px' })
    : null;

  const observe = (script) => {
    if (!script) return;
    const target = script.parentElement || script;
    if (observedTargets.has(target)) return;
    observedTargets.add(target);
    if (observer) observer.observe(target);
    else schedule(target);
  };

  const scan = (root = document) => {
    if (root.matches?.(selector)) observe(root);
    root.querySelectorAll?.(selector).forEach(observe);
  };

  scan();

  if (document.documentElement && typeof MutationObserver === 'function') {
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === 1) scan(node);
        });
      });
    });
    mutationObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  const loadEditorTarget = (event) => {
    const target = event.target;
    scan(target);
    target.querySelectorAll?.(selector).forEach(load);
  };

  document.addEventListener('shopify:section:load', loadEditorTarget);
  document.addEventListener('shopify:section:select', loadEditorTarget);
  document.addEventListener('shopify:block:select', loadEditorTarget);
})();
