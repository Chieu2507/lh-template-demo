class ComparisonTableTooltip extends HTMLElement {
  connectedCallback() {
    if (this.abortController) return;

    this.abortController = new AbortController();
    this.trigger = this.querySelector('[data-comparison-table-tooltip-trigger]');
    this.dialog = this.querySelector('[data-comparison-table-tooltip-dialog]');
    this.overlay = window.ThemeOverlay?.get(this.dialog);

    this.trigger?.addEventListener('click', () => {
      if (window.ThemeOverlay?.mobile?.matches) this.overlay?.open({ opener: this.trigger });
    }, { signal: this.abortController.signal });
  }

  disconnectedCallback() {
    this.overlay?.destroy();
    this.abortController?.abort();
    this.abortController = null;
    this.overlay = null;
  }
}

if (!customElements.get('comparison-table-tooltip')) {
  customElements.define('comparison-table-tooltip', ComparisonTableTooltip);
}

(() => {
  const controllerKey = '__comparisonTableRowsController';
  const rowSelector = '.comparison-table__row[data-comparison-table-row]';

  const normalize = (value) => String(value || '').replace(/\uFEFF/g, '').trim();

  const updateTable = (table) => {
    table.querySelectorAll('.comparison-table__col--data').forEach((column) => {
      column.style.removeProperty('z-index');
    });

    const featureRows = [...table.querySelectorAll(`.comparison-table__col--feature ${rowSelector}`)];
    let lastFeatureRow = 0;

    featureRows.forEach((featureRow) => {
      const rowIndex = Number(featureRow.dataset.comparisonTableRow);
      const hasFeature =
        normalize(featureRow.dataset.comparisonTableFeatureLabel) !== '' ||
        normalize(featureRow.dataset.comparisonTableFeatureTooltip) !== '';
      if (hasFeature && Number.isInteger(rowIndex)) {
        lastFeatureRow = Math.max(lastFeatureRow, rowIndex);
      }
    });

    table.querySelectorAll(rowSelector).forEach((row) => {
      const rowIndex = Number(row.dataset.comparisonTableRow);
      row.hidden = !Number.isInteger(rowIndex) || rowIndex < 1 || rowIndex > lastFeatureRow;
    });

    table.querySelectorAll('.comparison-table__col').forEach((column) => {
      let ariaRowIndex = 2;
      column.querySelectorAll(rowSelector).forEach((row) => {
        if (!row.hidden) {
          row.setAttribute('aria-rowindex', String(ariaRowIndex));
          ariaRowIndex += 1;
        }
      });
    });

  };

  const updateTables = (root = document) => {
    if (!root.querySelectorAll) return;

    root.querySelectorAll('.comparison-table__scroll--with-feature').forEach(updateTable);
  };

  const scheduleUpdate = (root = document) => {
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(() => updateTables(root));
    } else {
      window.setTimeout(() => updateTables(root), 0);
    }
  };

  if (window[controllerKey]) {
    window[controllerKey].update = updateTables;
    updateTables();
    scheduleUpdate();
    return;
  }

  window[controllerKey] = { update: updateTables };
  updateTables();
  scheduleUpdate();

  document.addEventListener('shopify:section:load', (event) => scheduleUpdate(event.target));
  document.addEventListener('shopify:block:select', (event) => scheduleUpdate(event.target));
})();
