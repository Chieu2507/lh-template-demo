/*
 * Load below-the-fold Theme Block modules when their script marker approaches
 * the viewport. Module imports are cached by the browser, so repeated markers
 * for the same carousel runtime resolve to one module evaluation.
 */
(() => {
  const loaderKey = Symbol.for('theme.moduleLoader');
  if (window[loaderKey]) return;
  window[loaderKey] = true;

  const selector = 'script[data-theme-module]';
  const modules = new Map();
  const observedTargets = new WeakSet();
  const pendingSelections = new WeakMap();
  const replayedSelections = new WeakSet();
  let latestSelection = null;

  const moduleURL = (script) => {
    const source = script.dataset.themeModule?.trim();
    if (!source) throw new TypeError('Missing data-theme-module URL');
    // Resolve Liquid's protocol-relative CDN URLs and relative URLs before
    // importing. Preserve asset version queries and share fragment aliases.
    const url = new URL(source, document.baseURI);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || !/\.(?:js|mjs)$/i.test(url.pathname)) {
      throw new TypeError(`Invalid theme module URL: ${source}`);
    }
    url.hash = '';
    return url.href;
  };

  const setState = (script, state, error) => {
    script.dataset.themeModuleState = state;
    if (error) script.dataset.themeModuleError = String(error.message || error);
    else delete script.dataset.themeModuleError;
  };

  const markMatching = (src, state, error) => {
    document.querySelectorAll(selector).forEach((script) => {
      try {
        if (moduleURL(script) === src) setState(script, state, error);
      } catch {
        // Invalid markers are reported when their own load is requested.
      }
    });
  };

  const reportError = (src, error) => {
    console.error('[Theme modules] Failed to load', src, error);
    document.dispatchEvent(new CustomEvent('theme:module:error', { detail: { url: src, error } }));
  };

  const load = (script) => {
    if (!script?.isConnected) return Promise.resolve();
    let src;
    try {
      src = moduleURL(script);
    } catch (error) {
      setState(script, 'error', error);
      reportError(script.dataset.themeModule, error);
      return Promise.resolve();
    }

    const existing = modules.get(src);
    if (existing) {
      setState(script, existing.state);
      return existing.promise;
    }

    const record = { state: 'loading', promise: null };
    // Store before importing so intersection, mutation and editor callbacks
    // share one attempt. A failed attempt may be retried by a later render.
    modules.set(src, record);
    markMatching(src, 'loading');
    record.promise = import(src).then(() => {
      record.state = 'loaded';
      markMatching(src, 'loaded');
    }, (error) => {
      modules.delete(src);
      markMatching(src, 'error', error);
      reportError(src, error);
    });
    return record.promise;
  };

  const markersWithin = (root) => {
    const scripts = Array.from(root.querySelectorAll?.(selector) || []);
    if (root.matches?.(selector)) scripts.unshift(root);
    return scripts;
  };

  const loadTarget = (target) => {
    if (!observedTargets.has(target)) return;
    observedTargets.delete(target);
    if (!target.isConnected) return;
    markersWithin(target).forEach(load);
  };

  const schedule = (target) => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => loadTarget(target), { timeout: 2000 });
    } else {
      window.setTimeout(() => loadTarget(target), 1000);
    }
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
    if (!script.isConnected) return;
    // Editor sections can be hidden or replaced before they intersect. Load
    // their runtime immediately, including markers added by a re-render.
    if (window.Shopify?.designMode) {
      load(script);
      return;
    }
    try {
      const existing = modules.get(moduleURL(script));
      if (existing) {
        setState(script, existing.state);
        return;
      }
    } catch {
      // Validate and report in load(), without throwing out of scan().
    }
    const target = script.parentElement || script;
    if (observedTargets.has(target)) return;
    observedTargets.add(target);
    if (observer) observer.observe(target);
    else schedule(target);
  };

  const scan = (root = document) => markersWithin(root).forEach(observe);

  const unobserve = (root) => {
    markersWithin(root).forEach((script) => {
      const target = script.parentElement || script;
      observer?.unobserve(target);
      observedTargets.delete(target);
    });
  };

  scan();

  if (document.documentElement && typeof MutationObserver === 'function') {
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === 'attributes') {
          scan(record.target);
          return;
        }
        record.removedNodes.forEach((node) => {
          if (node.nodeType === 1) unobserve(node);
        });
        record.addedNodes.forEach((node) => {
          if (node.nodeType === 1) scan(node);
        });
      });
    });
    mutationObserver.observe(document.documentElement, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['data-theme-module'],
    });
  }

  const loadEditorTarget = (event) => {
    if (event.type === 'shopify:block:select' && !replayedSelections.has(event)) latestSelection = event;
    // Block selection can target a slide, with its marker outside the block.
    const target = event.target.closest?.('.shopify-section') || event.target;
    const scripts = markersWithin(target);
    const needsSelection = event.type === 'shopify:block:select' && !replayedSelections.has(event) && scripts.some((script) => {
      try {
        return modules.get(moduleURL(script))?.state !== 'loaded';
      } catch {
        return false;
      }
    });
    const loads = scripts.map(load);
    if (!needsSelection) return;

    // A lazy module registers its selection listener after this event. Replay
    // only the latest selection once it is ready, so the selected slide opens.
    pendingSelections.set(target, event);
    Promise.all(loads).then(() => {
      if (pendingSelections.get(target) !== event) return;
      pendingSelections.delete(target);
      if (latestSelection !== event) return;
      latestSelection = null;
      if (!event.target.isConnected || !scripts.every((script) => script.dataset.themeModuleState === 'loaded')) return;
      const replay = new CustomEvent(event.type, { bubbles: true, detail: event.detail });
      replayedSelections.add(replay);
      event.target.dispatchEvent(replay);
    });
  };

  document.addEventListener('shopify:section:load', loadEditorTarget);
  document.addEventListener('shopify:section:select', loadEditorTarget);
  document.addEventListener('shopify:block:select', loadEditorTarget);
  document.addEventListener('shopify:block:deselect', (event) => {
    if (latestSelection?.target === event.target) latestSelection = null;
  });
  document.addEventListener('shopify:section:unload', (event) => {
    unobserve(event.target);
    if (pendingSelections.get(event.target) === latestSelection) latestSelection = null;
    pendingSelections.delete(event.target);
  });
})();
