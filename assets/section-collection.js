if (!customElements.get('collection-sort-select')) {
  class CollectionSortSelect extends HTMLElement {
    connectedCallback() {
      this.select = this.querySelector('[data-collection-sort-native]');
      this.trigger = this.querySelector('[data-collection-sort-trigger]');
      this.value = this.querySelector('[data-collection-sort-value]');
      this.listbox = this.querySelector('[data-collection-sort-listbox]');
      this.options = Array.from(this.querySelectorAll('[data-collection-sort-option]'));
      if (!this.select || !this.trigger || !this.value || !this.listbox || !this.options.length) return;

      this.onTriggerClick = () => this.toggle();
      this.onTriggerKeydown = (event) => {
        if (event.key === 'Escape') { event.preventDefault(); this.close(true); return; }
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        this.open();
        const selectedIndex = this.options.findIndex((option) => option.getAttribute('aria-selected') === 'true');
        const targetIndex = event.key === 'ArrowUp' || event.key === 'End'
          ? this.options.length - 1
          : event.key === 'Home'
            ? 0
            : Math.max(selectedIndex, 0);
        this.options[targetIndex]?.focus();
      };
      this.onListboxClick = (event) => {
        const option = event.target.closest('[data-collection-sort-option]');
        if (option) this.choose(option);
      };
      this.onListboxKeydown = (event) => {
        const currentIndex = this.options.indexOf(document.activeElement);
        if (event.key === 'Escape') {
          event.preventDefault();
          this.close(true);
          return;
        }
        if (event.key === 'Tab') {
          this.close();
          return;
        }
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

        event.preventDefault();
        let nextIndex = currentIndex;
        if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % this.options.length;
        if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + this.options.length) % this.options.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = this.options.length - 1;
        this.options[nextIndex]?.focus();
      };
      this.onDocumentClick = (event) => {
        if (!this.contains(event.target)) this.close();
      };
      this.onSelectChange = () => this.sync();

      this.trigger.addEventListener('click', this.onTriggerClick);
      this.trigger.addEventListener('keydown', this.onTriggerKeydown);
      this.listbox.addEventListener('click', this.onListboxClick);
      this.listbox.addEventListener('keydown', this.onListboxKeydown);
      this.select.addEventListener('change', this.onSelectChange);
      document.addEventListener('click', this.onDocumentClick);
      this.sync();
    }

    disconnectedCallback() {
      window.clearTimeout(this.closeTimer);
      this.menuAnimation?.cancel();
      this.trigger?.removeEventListener('click', this.onTriggerClick);
      this.trigger?.removeEventListener('keydown', this.onTriggerKeydown);
      this.listbox?.removeEventListener('click', this.onListboxClick);
      this.listbox?.removeEventListener('keydown', this.onListboxKeydown);
      this.select?.removeEventListener('change', this.onSelectChange);
      document.removeEventListener('click', this.onDocumentClick);
    }

    toggle() {
      if (this.trigger.getAttribute('aria-expanded') !== 'true') {
        this.open();
      } else {
        this.close();
      }
    }

    motionOptions() {
      const style = getComputedStyle(this);
      const duration = style.getPropertyValue('--motion-duration-slow').trim() || '300ms';
      return {
        duration: parseFloat(duration) * (duration.endsWith('ms') ? 1 : 1000),
        easing: style.getPropertyValue('--motion-ease-standard').trim() || 'ease'
      };
    }

    open() {
      window.clearTimeout(this.closeTimer);
      this.menuAnimation?.cancel();
      this.listbox.hidden = false;
      this.listbox.inert = false;
      this.trigger.setAttribute('aria-expanded', 'true');
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.menuAnimation = this.listbox.animate(
          [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }],
          this.motionOptions()
        );
      }
    }

    close(returnFocus = false) {
      if (this.trigger.getAttribute('aria-expanded') !== 'true') return;
      this.menuAnimation?.cancel();
      this.listbox.inert = true;
      this.trigger.setAttribute('aria-expanded', 'false');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) this.listbox.hidden = true;
      else {
        this.menuAnimation = this.listbox.animate(
          [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-8px)' }],
          { ...this.motionOptions(), fill: 'forwards' }
        );
        this.closeTimer = window.setTimeout(() => { this.listbox.hidden = true; this.menuAnimation?.cancel(); }, this.motionOptions().duration);
      }
      if (returnFocus) this.trigger.focus();
    }

    choose(option) {
      this.select.value = option.dataset.value;
      this.sync();
      this.close(true);
      this.select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    sync() {
      const selectedOption = this.options.find((option) => option.dataset.value === this.select.value);
      if (!selectedOption) return;
      const selectedLabel = selectedOption.querySelector('span')?.textContent.trim() || '';
      this.value.textContent = this.dataset.staticLabel || selectedLabel;
      this.trigger.title = selectedLabel;
      this.options.forEach((option) => {
        option.setAttribute('aria-selected', String(option === selectedOption));
      });
    }
  }

  customElements.define('collection-sort-select', CollectionSortSelect);
}

if (!customElements.get('collection-price-range')) {
  class CollectionPriceRange extends HTMLElement {
    connectedCallback() {
      this.slider = this.querySelector('[data-price-range-slider]');
      this.minRange = this.querySelector('[data-price-range-min]');
      this.maxRange = this.querySelector('[data-price-range-max]');
      this.minNumber = this.querySelector('[data-price-number-min]');
      this.maxNumber = this.querySelector('[data-price-number-max]');
      if (!this.slider || !this.minRange || !this.maxRange || !this.minNumber || !this.maxNumber) return;

      this.onInput = (event) => {
        if (event.target === this.minRange || event.target === this.maxRange) {
          this.syncNumbersFromRanges(event.target);
          return;
        }

        if (event.target === this.minNumber || event.target === this.maxNumber) {
          this.syncRangesFromNumbers(event.target);
        }
      };

      this.addEventListener('input', this.onInput);
      this.syncRangesFromNumbers();
    }

    disconnectedCallback() {
      this.removeEventListener('input', this.onInput);
    }

    limits() {
      return {
        lower: Number(this.minRange.min) || 0,
        upper: Number(this.maxRange.max) || 0
      };
    }

    syncNumbersFromRanges(changedRange) {
      const { lower, upper } = this.limits();
      let minValue = Number(this.minRange.value);
      let maxValue = Number(this.maxRange.value);

      if (minValue > maxValue) {
        if (changedRange === this.minRange) {
          minValue = maxValue;
          this.minRange.value = String(minValue);
        } else {
          maxValue = minValue;
          this.maxRange.value = String(maxValue);
        }
      }

      this.minNumber.value = minValue <= lower ? '' : String(minValue);
      this.maxNumber.value = maxValue >= upper ? '' : String(maxValue);
      this.updateTrack(minValue, maxValue);
    }

    syncRangesFromNumbers(changedNumber) {
      const { lower, upper } = this.limits();
      let minValue = this.minNumber.value === '' ? lower : Number(this.minNumber.value);
      let maxValue = this.maxNumber.value === '' ? upper : Number(this.maxNumber.value);

      minValue = Math.min(Math.max(Math.round(minValue), lower), upper);
      maxValue = Math.min(Math.max(Math.round(maxValue), lower), upper);

      if (minValue > maxValue) {
        if (changedNumber === this.minNumber) {
          minValue = maxValue;
          this.minNumber.value = String(minValue);
        } else {
          maxValue = minValue;
          this.maxNumber.value = String(maxValue);
        }
      }

      if (this.minNumber.value !== '') this.minNumber.value = String(minValue);
      if (this.maxNumber.value !== '') this.maxNumber.value = String(maxValue);
      this.minRange.value = String(minValue);
      this.maxRange.value = String(maxValue);
      this.updateTrack(minValue, maxValue);
    }

    updateTrack(minValue, maxValue) {
      const { lower, upper } = this.limits();
      const range = upper - lower || 1;
      const minPosition = ((minValue - lower) / range) * 100;
      const maxPosition = ((maxValue - lower) / range) * 100;
      this.slider.style.setProperty('--main-collection-price-min', `${minPosition}%`);
      this.slider.style.setProperty('--main-collection-price-max', `${maxPosition}%`);
    }
  }

  customElements.define('collection-price-range', CollectionPriceRange);
}

if (!customElements.get('collection-description')) {
  class CollectionDescription extends HTMLElement {
    connectedCallback() {
      this.content = this.querySelector('[data-collection-description]');
      this.toggle = this.querySelector('[data-collection-description-toggle]');
      if (!this.content || !this.toggle) return;

      this.classList.add('is-enhanced');
      this.syncOverflow = () => {
        this.content.classList.add('main-collection__description--collapsed');
        const isOverflowing = this.content.scrollHeight > this.content.clientHeight + 1;
        this.toggle.hidden = !isOverflowing;
        if (!isOverflowing) this.content.classList.remove('main-collection__description--collapsed');
      };

      this.onToggle = () => {
        const isExpanded = this.toggle.getAttribute('aria-expanded') === 'true';
        this.toggle.setAttribute('aria-expanded', String(!isExpanded));
        this.content.classList.toggle('main-collection__description--collapsed', isExpanded);
        this.toggle.textContent = isExpanded ? this.toggle.dataset.moreLabel : this.toggle.dataset.lessLabel;
      };
      this.onResize = () => {
        window.clearTimeout(this.resizeTimer);
        this.resizeTimer = window.setTimeout(this.syncOverflow, 100);
      };
      this.toggle.addEventListener('click', this.onToggle);
      window.addEventListener('resize', this.onResize);
      this.syncOverflow();
    }

    disconnectedCallback() {
      if (this.toggle && this.onToggle) this.toggle.removeEventListener('click', this.onToggle);
      if (this.onResize) window.removeEventListener('resize', this.onResize);
      window.clearTimeout(this.resizeTimer);
    }
  }

  customElements.define('collection-description', CollectionDescription);
}

if (!customElements.get('collection-facets')) {
  class CollectionFacets extends HTMLElement {
    connectedCallback() {
      this.classList.add('is-enhanced');
      this.sectionId = this.dataset.sectionId;
      this.dialog = this.querySelector('[data-collection-filter-dialog]');
      this.mountFilterPanel();
      window.__themeAccordionDetailsController?.initializeRoot(this);
      this.filterPanel = this.dialog?.querySelector('.main-collection__filter-form');
      this.backdropPointer = this.dialog?.querySelector('.main-collection__filter-backdrop-pointer');
      this.mobileDialog = window.matchMedia('(max-width: 767.98px)');
      this.desktopLayout = window.matchMedia('(min-width: 1150px)');
      this.onLayoutChange = () => this.syncLayout();
      this.desktopLayout.addEventListener('change', this.onLayoutChange);
      this.syncLayout();
      this.initializeSidebarSticky();
      this.syncColumns();
      this.observePagination();
      this.backdropInteraction = this.dialog && window.SpinelModalBackdropPointer
        ? new window.SpinelModalBackdropPointer({
          root: this.dialog,
          panel: this.filterPanel,
          pointer: this.backdropPointer,
          isOpen: () => this.dialog.open && !this.dialog.classList.contains('is-closing'),
          relativeToRoot: true,
        })
        : null;
      this.onDialogCancel = (event) => {
        event.preventDefault();
        this.closeDialog();
      };
      this.onDialogClose = () => {
        this.hideBackdropPointer();
        if (this.scrollAfterDialogClose) {
          this.scrollAfterDialogClose = false;
          this.scrollToCollectionTop();
        }
      };

      this.sheetGesture = this.dialog && window.ThemeOverlay?.SheetGesture
        ? new window.ThemeOverlay.SheetGesture({
          panel: this.dialog,
          header: this.dialog.querySelector('.main-collection__filter-header'),
          enabled: () => this.dialog.open && this.mobileDialog.matches && this.dialog.dataset.mobileLayout === 'sheet' && !this.dialog.classList.contains('is-closing'),
          close: () => this.closeDialog({ fromGesture: true }),
        }) : null;
      if (this.sheetGesture) this.sheetGesture.scrollTarget = this.dialog.querySelector('.main-collection__filter-body');
      this.resetHandleDrag = () => this.sheetGesture?.reset();

      this.onClick = (event) => {
        const more = event.target.closest('[data-filter-show-more]');
        if (more) {
          this.toggleFilterValues(more);
          return;
        }
        const load = event.target.closest('[data-collection-load-more]');
        if (load) { event.preventDefault(); this.loadMore(load); return; }
        if (event.target.closest('[data-collection-filter-open]')) {
          if (this.dialog?.classList.contains('is-sidebar')) {
            if (this.dialog.dataset.sidebarVisibility !== 'always') {
              if (this.dialog.open) this.dialog.close(); else this.dialog.setAttribute('open', '');
              this.sidebarOpen = this.dialog.open;
            }
          } else if (this.dialog && !this.dialog.open) this.dialog.showModal();
          event.target.closest('[data-collection-filter-open]').setAttribute('aria-expanded', String(Boolean(this.dialog?.open)));
          return;
        }

        if (event.target.closest('[data-collection-filter-close]')) {
          this.closeDialog();
          return;
        }

        if (event.target === this.dialog) {
          this.closeDialog();
          return;
        }

        const link = event.target.closest(
          '.main-collection__active-filters a, .main-collection__filter-footer a, .main-collection__pagination a, .main-collection__empty a'
        );
        if (!link) return;

        event.preventDefault();
        this.render(link.href, {
          reopenDialog: Boolean(link.closest('[data-collection-filter-dialog]'))
        });
      };

      this.onChange = (event) => {
        const control = event.target;
        if (control.matches('[data-collection-columns]')) {
          try { sessionStorage.setItem(`collection-columns-${this.sectionId}-${control.dataset.device}`, control.value); } catch (_) {}
          this.syncColumns(true, control);
          return;
        }
        if (control.matches('[data-collection-sort]')) {
          this.renderFromForm(control.form);
          return;
        }

        if (!control.closest('[data-collection-filter-dialog]')) return;
        if (control.matches('input[type="number"]')) {
          window.clearTimeout(this.priceTimer);
        }
        this.renderFromForm(control.form, { reopenDialog: true, focusControl: control });
      };

      this.onInput = (event) => {
        const control = event.target;
        if (!control.matches('.main-collection__price-filter input')) return;

        window.clearTimeout(this.priceTimer);
        this.priceTimer = window.setTimeout(() => {
          this.renderFromForm(control.form, { reopenDialog: true, focusControl: control });
        }, 450);
      };

      this.onSubmit = (event) => {
        if (!event.target.matches('.main-collection__filter-form, [data-collection-sort-form]')) return;
        event.preventDefault();
        this.renderFromForm(event.target, {
          closeDialog: event.target.matches('.main-collection__filter-form')
        });
      };

      this.onPopState = () => this.render(window.location.href, { updateHistory: false });
      this.onSectionUnload = (event) => {
        if (event.target.contains(this)) this.finishCloseDialog();
      };

      this.addEventListener('click', this.onClick);
      this.addEventListener('change', this.onChange);
      this.addEventListener('input', this.onInput);
      this.addEventListener('submit', this.onSubmit);
      this.dialog?.addEventListener('cancel', this.onDialogCancel);
      this.dialog?.addEventListener('close', this.onDialogClose);
      window.addEventListener('popstate', this.onPopState);
      document.addEventListener('shopify:section:unload', this.onSectionUnload);
    }

    toggleFilterValues(button) {
      const list = this.querySelector(`#${CSS.escape(button.getAttribute('aria-controls'))}`);
      if (!list) return;
      const items = [...list.querySelectorAll('[data-filter-overflow]')];
      const expanded = button.getAttribute('aria-expanded') !== 'true';
      const startHeight = list.getBoundingClientRect().height;
      list._filterAnimations?.forEach(animation => animation.cancel());
      list._filterAnimationId = (list._filterAnimationId || 0) + 1;
      const animationId = list._filterAnimationId;
      items.forEach(item => { item.hidden = !expanded; });
      const endHeight = list.getBoundingClientRect().height;
      button.setAttribute('aria-expanded', String(expanded));
      button.querySelector('.btn__text').textContent = expanded ? button.dataset.lessLabel : button.dataset.moreLabel;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !list.animate) {
        list.style.removeProperty('overflow');
        return;
      }
      // Use the same height easing and content reveal as accordion-details (FAQ).
      items.forEach(item => { item.hidden = false; });
      list.style.overflow = 'hidden';
      const animations = [list.animate(
        [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
        { duration: 250, easing: 'ease', fill: 'both' }
      ), ...items.map(item => item.animate(
        expanded
          ? [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }]
          : [{ opacity: 1 }, { opacity: 0 }],
        { duration: 150, fill: 'both' }
      ))];
      list._filterAnimations = animations;
      Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
        if (list._filterAnimationId !== animationId) return;
        items.forEach(item => { item.hidden = !expanded; });
        animations.forEach(animation => animation.cancel());
        list._filterAnimations = [];
        list.style.removeProperty('overflow');
      });
    }

    disconnectedCallback() {
      this.destroySidebarSticky();
      cancelAnimationFrame(this.collectionScrollFrame);
      this.querySelectorAll('.main-collection__filter-values').forEach(list => {
        list._filterAnimationId = (list._filterAnimationId || 0) + 1;
        list._filterAnimations?.forEach(animation => animation.cancel());
      });
      this.removeEventListener('click', this.onClick);
      this.removeEventListener('change', this.onChange);
      this.removeEventListener('input', this.onInput);
      this.removeEventListener('submit', this.onSubmit);
      this.desktopLayout?.removeEventListener('change', this.onLayoutChange);
      this.sheetGesture?.destroy();
      this.paginationObserver?.disconnect();
      window.__themeAccordionDetailsController?.cleanupRoot(this);
      this.gridAnimations?.forEach(animation => animation.cancel());
      this.dialog?.removeEventListener('cancel', this.onDialogCancel);
      this.dialog?.removeEventListener('close', this.onDialogClose);
      window.removeEventListener('popstate', this.onPopState);
      document.removeEventListener('shopify:section:unload', this.onSectionUnload);
      window.clearTimeout(this.priceTimer);
      this.resetHandleDrag?.();
      this.backdropInteraction?.destroy();
      this.hideBackdropPointer();
      this.finishCloseDialog();
      this.requestController?.abort();
    }

    destroySidebarSticky() {
      window.removeEventListener('scroll', this.onSidebarScroll);
      window.removeEventListener('resize', this.onSidebarScroll);
      this.sidebarResizeObserver?.disconnect();
      this.sidebarMutationObserver?.disconnect();
      cancelAnimationFrame(this.sidebarFrame);
      this.sidebarFrame = 0;
      this.sidebarPositioner?.style.removeProperty('--collection-sidebar-top');
      this.sidebarPositioner?.removeAttribute('data-sticky-state');
      this.sidebarPositioner = null;
      this.sidebarTop = null;
    }

    initializeSidebarSticky() {
      // AJAX can retain the dialog while replacing the wrapper it lives in.
      // Always observe and position the current wrapper, releasing the old one.
      this.destroySidebarSticky();
      this.sidebarPositioner = this.dialog?.closest('.main-collection__filter-panel-positioner');
      if (!this.sidebarPositioner) return;
      this.sidebarScrollY = window.scrollY;
      this.onSidebarScroll = () => {
        if (this.sidebarFrame) return;
        this.sidebarFrame = requestAnimationFrame(() => {
          this.sidebarFrame = 0;
          this.updateSidebarSticky();
        });
      };
      window.addEventListener('scroll', this.onSidebarScroll, { passive: true });
      window.addEventListener('resize', this.onSidebarScroll, { passive: true });
      this.sidebarResizeObserver = new ResizeObserver(this.onSidebarScroll);
      this.sidebarResizeObserver.observe(this.sidebarPositioner);
      this.sidebarResizeObserver.observe(this);
      this.sidebarMutationObserver = new MutationObserver(this.onSidebarScroll);
      this.sidebarMutationObserver.observe(this.dialog, { attributes: true, attributeFilter: ['open', 'class'] });
      this.updateSidebarSticky();
    }

    updateSidebarSticky() {
      const panel = this.sidebarPositioner;
      if (!panel?.isConnected) return;
      const scrollY = window.scrollY;
      const delta = scrollY - this.sidebarScrollY;
      this.sidebarScrollY = scrollY;
      if (!this.desktopLayout.matches || !this.dialog.open || !this.dialog.classList.contains('is-sidebar')) {
        panel.style.removeProperty('--collection-sidebar-top');
        panel.removeAttribute('data-sticky-state');
        this.sidebarTop = null;
        return;
      }

      const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 0;
      const top = headerHeight + 16;
      const bottom = Math.min(top, window.innerHeight - panel.offsetHeight - 16);
      // A tall sidebar travels with the page between its top and bottom stops.
      // On direction changes, retain its document position instead of jumping.
      this.sidebarTop = Math.max(bottom, Math.min(top, (this.sidebarTop ?? top) - delta));
      panel.style.setProperty('--collection-sidebar-top', `${this.sidebarTop}px`);
      panel.dataset.stickyState = this.sidebarTop === top ? 'top' : this.sidebarTop === bottom ? 'bottom' : 'scrolling';
    }

    syncLayout() {
      if (!this.dialog) return;
      const sidebar = this.desktopLayout.matches && this.dialog.dataset.desktopLayout === 'sidebar';
      const wasSidebar = this.dialog.classList.contains('is-sidebar');
      if (sidebar === wasSidebar) return;
      if (this.dialog.open) this.dialog.close();
      this.dialog.classList.toggle('is-sidebar', sidebar);
      if (sidebar) {
        this.dialog.removeAttribute('scroll-lock');
        if (this.sidebarOpen ?? this.dialog.dataset.sidebarVisibility !== 'closed') this.dialog.setAttribute('open', '');
      } else this.dialog.setAttribute('scroll-lock', '');
      this.querySelector('[data-collection-filter-open]')?.setAttribute('aria-expanded', String(this.dialog.open));
    }

    mountFilterPanel() {
      const panel = this.dialog?.closest('.main-collection__filter-panel-positioner');
      if (!panel) return;
      this.querySelectorAll(':scope > .main-collection__filter-panel-positioner').forEach(old => {
        if (old !== panel) old.remove();
      });
      this.insertBefore(panel, this.querySelector('.main-collection__products'));
    }

    syncColumns(animate = false, control = null) {
      const products = this.querySelector('.main-collection__products');
      if (!products) return;
      const items = Array.from(products.querySelectorAll('.main-collection__grid > *'));
      this.gridAnimations?.forEach(animation => animation.cancel());
      const previous = animate ? items.map(item => item.getBoundingClientRect()) : [];
      for (const device of ['desktop', 'mobile']) {
        let value = products.dataset[device === 'desktop' ? 'columnsDesktop' : 'columnsMobile'];
        // Editor settings are authoritative; shoppers keep their chosen view across facet refreshes.
        if (window.Shopify?.designMode) {
          this.editorColumns ||= {};
          if (control) this.editorColumns[control.dataset.device] = control.value;
          value = this.editorColumns[device] || value;
        } else {
          try { value = sessionStorage.getItem(`collection-columns-${this.sectionId}-${device}`) || value; } catch (_) {}
        }
        const permitted = device === 'desktop' ? ['3','4','5'] : ['1','2'];
        if (!permitted.includes(value)) value = permitted[0];
        products.style.setProperty(`--main-collection-columns-${device}`, value);
        if (device === 'desktop') products.style.setProperty('--main-collection-columns-tablet', value);
        this.querySelectorAll(`[data-collection-columns][data-device="${device}"]`).forEach(input => input.checked = input.value === value);
      }
      if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.gridAnimations = items.map((item, index) => {
          const next = item.getBoundingClientRect();
          const before = previous[index];
          return item.animate([
            { transform: `translate(${before.left - next.left}px, ${before.top - next.top}px) scale(${before.width / next.width}, ${before.height / next.height})`, opacity: .65 },
            { transform: 'none', opacity: 1 }
          ], { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' });
        });
      }
    }

    observePagination() {
      this.paginationObserver?.disconnect();
      const link = this.querySelector('[data-pagination-mode="infinite"] [data-collection-load-more]');
      if (!link) return;
      this.paginationObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) this.loadMore(link);
      }, { rootMargin: '300px' });
      this.paginationObserver.observe(link);
    }

    async loadMore(link) {
      if (this.loadingMore) return;
      this.loadingMore = true;
      link.setAttribute('aria-busy', 'true');
      this.paginationObserver?.disconnect();
      try {
        const url = new URL(link.href); url.searchParams.set('section_id', this.sectionId);
        const response = await fetch(url); if (!response.ok) throw new Error('Pagination request failed');
        const html = new DOMParser().parseFromString(await response.text(), 'text/html');
        const next = html.querySelector('collection-facets');
        const grid = this.querySelector('.main-collection__grid');
        const offset = grid.querySelectorAll('.main-collection__product').length;
        next.querySelectorAll('.main-collection__product').forEach((item, index) => {
          item.style.order = (offset + index + 1) * 10;
          grid.append(item);
        });
        const pagination = this.querySelector('.collection-pagination-block');
        const nextPagination = next.querySelector('.collection-pagination-block');
        if (nextPagination) pagination.replaceWith(nextPagination); else pagination.remove();
        grid.dispatchEvent(new CustomEvent('collection:products-loaded', { bubbles: true }));
      } catch (_) { window.location.assign(link.href); }
      finally { this.loadingMore = false; this.observePagination(); }
    }

    hideBackdropPointer() {
      this.backdropInteraction?.hide();
    }

    updateFilterGroups(nextDialog) {
      const currentGroups = Array.from(this.dialog.querySelectorAll('.main-collection__filter-group'));
      const nextGroups = Array.from(nextDialog.querySelectorAll('.main-collection__filter-group'));

      currentGroups.forEach((currentGroup, index) => {
        const nextGroup = nextGroups.find(group => group.dataset.filterKey === currentGroup.dataset.filterKey) || nextGroups[index];
        if (!nextGroup) return;

        const expandedValues = currentGroup.querySelector('[data-filter-show-more]')?.getAttribute('aria-expanded') === 'true';
        currentGroup.querySelectorAll('.main-collection__filter-values').forEach(list => {
          list._filterAnimationId = (list._filterAnimationId || 0) + 1;
          list._filterAnimations?.forEach(animation => animation.cancel());
        });
        window.__themeAccordionDetailsController?.cleanupRoot(currentGroup);
        const currentSummary = currentGroup.firstElementChild;
        const heading = currentSummary.querySelector('[data-filter-heading]');
        const nextHeading = nextGroup.querySelector('[data-filter-heading]');
        if (heading && nextHeading) heading.textContent = nextHeading.textContent;
        Array.from(currentGroup.children).forEach((child) => {
          if (child !== currentSummary) child.remove();
        });
        Array.from(nextGroup.children).forEach((child) => {
          if (child !== nextGroup.firstElementChild) currentGroup.append(child.cloneNode(true));
        });
        if (expandedValues) {
          currentGroup.querySelectorAll('[data-filter-overflow]').forEach(item => { item.hidden = false; });
          const more = currentGroup.querySelector('[data-filter-show-more]');
          if (more) {
            more.setAttribute('aria-expanded', 'true');
            more.querySelector('.btn__text').textContent = more.dataset.lessLabel;
          }
        }
      });
      window.__themeAccordionDetailsController?.initializeRoot(this.dialog);
    }

    closeDialog({ fromGesture = false } = {}) {
      if (!this.dialog?.open || this.dialog.classList.contains('is-sidebar')) return Promise.resolve();
      if (this.closePromise) return this.closePromise;
      if (!fromGesture) this.resetHandleDrag?.();
      this.hideBackdropPointer();

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.dialog.close();
        return Promise.resolve();
      }

      this.dialog.classList.toggle('is-gesture-closing', fromGesture);
      this.dialog.classList.add('is-closing');
      this.closePromise = new Promise((resolve) => {
        this.resolveClose = resolve;
        const gestureDuration = parseFloat(getComputedStyle(this.dialog).transitionDuration) * 1000 || 280;
        this.closeTimer = window.setTimeout(() => this.finishCloseDialog(), fromGesture ? gestureDuration + 16 : 240);
      });
      return this.closePromise;
    }

    finishCloseDialog() {
      window.clearTimeout(this.closeTimer);
      this.closeTimer = null;
      if (this.dialog?.open) this.dialog.close();
      this.dialog?.classList.remove('is-closing', 'is-gesture-closing');
      this.resetHandleDrag?.();
      this.hideBackdropPointer();
      const resolve = this.resolveClose;
      this.resolveClose = null;
      this.closePromise = null;
      resolve?.();
    }

    renderFromForm(form, options = {}) {
      if (!form) return;

      const url = new URL(form.action, window.location.origin);
      const formData = new FormData(form);
      for (const [name, value] of formData.entries()) {
        if (String(value).trim() !== '') url.searchParams.append(name, value);
      }
      url.searchParams.delete('page');

      const focusControl = options.focusControl;
      this.render(url, {
        ...options,
        focusName: focusControl?.name,
        focusValue: focusControl?.value
      });
    }

    scrollToCollectionTop() {
      cancelAnimationFrame(this.collectionScrollFrame);
      this.collectionScrollFrame = requestAnimationFrame(() => {
        this.collectionScrollFrame = 0;
        if (!this.isConnected) return;

        const collection = this.closest('.main-collection');
        if (!collection) return;
        const header = document.querySelector('.header[data-sticky-type]:not([data-sticky-type="none"])');
        const headerHeight = header && getComputedStyle(header).position === 'sticky' ? header.offsetHeight : 0;
        const top = Math.max(0, window.scrollY + collection.getBoundingClientRect().top - headerHeight - 20);
        window.scrollTo({
          top,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
      });
    }

    scrollAfterUpdate() {
      if (this.dialog?.open && !this.dialog.classList.contains('is-sidebar')) {
        this.scrollAfterDialogClose = true;
      } else {
        this.scrollToCollectionTop();
      }
    }

    async render(urlValue, options = {}) {
      const navigationUrl = new URL(urlValue, window.location.origin);
      navigationUrl.searchParams.delete('section_id');
      const requestUrl = new URL(navigationUrl);
      requestUrl.searchParams.set('section_id', this.sectionId);

      const body = this.querySelector('.main-collection__filter-body');
      const dialogScrollTop = body?.scrollTop || 0;
      const keepDialogOpen = !options.closeDialog && this.dialog?.open;
      const closePromise = options.closeDialog ? this.closeDialog() : Promise.resolve();

      this.requestController?.abort();
      const requestController = new AbortController();
      this.requestController = requestController;
      this.setAttribute('aria-busy', 'true');

      try {
        const response = await fetch(requestUrl, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
          signal: requestController.signal
        });
        if (!response.ok) throw new Error(`Collection request failed: ${response.status}`);

        const documentHtml = new DOMParser().parseFromString(await response.text(), 'text/html');
        const nextFacets = documentHtml.querySelector(`collection-facets[data-section-id="${this.sectionId}"]`);
        if (!nextFacets) throw new Error('Collection response did not contain facets');
        if (requestController.signal.aborted || !this.isConnected) return;

        if (options.updateHistory !== false && navigationUrl.href !== window.location.href) {
          window.history.pushState({}, '', navigationUrl);
        }

        await closePromise;

        let renderedFacets = this;
        if (keepDialogOpen) {
          const nextDialog = nextFacets.querySelector('[data-collection-filter-dialog]');
          const currentToolbar = this.querySelector('.main-collection__toolbar');
          const nextToolbar = nextFacets.querySelector('.main-collection__toolbar');
          const currentProducts = this.querySelector('.main-collection__products');
          const nextProducts = nextFacets.querySelector('.main-collection__products');
          if (!nextDialog || !currentToolbar || !nextToolbar || !currentProducts || !nextProducts) {
            throw new Error('Collection response was missing dynamic content');
          }

          // The live dialog must remain connected in its original positioner.
          // Moving a modal dialog removes it from the top layer and restarts its CSS motion.
          nextDialog.closest('.main-collection__filter-panel-positioner')?.remove();
          currentToolbar.replaceWith(nextToolbar);
          this.querySelector('[data-collection-filter-open]')?.setAttribute('aria-expanded', String(this.dialog.open));
          currentProducts.replaceWith(nextProducts);
          window.ThemeAnimations?.init(nextProducts);
          this.syncColumns();
          this.observePagination();
          const currentActiveFilters = this.dialog.querySelector('.main-collection__active-filters');
          const nextActiveFilters = nextDialog.querySelector('.main-collection__active-filters');
          const currentFooter = this.dialog.querySelector('.main-collection__filter-footer');
          const nextFooter = nextDialog.querySelector('.main-collection__filter-footer');

          if (currentActiveFilters && nextActiveFilters) {
            currentActiveFilters.replaceWith(nextActiveFilters);
          } else if (currentActiveFilters) {
            currentActiveFilters.remove();
          } else if (nextActiveFilters) {
            this.dialog.querySelector('.main-collection__filter-body')?.prepend(nextActiveFilters);
          }
          if (currentFooter && nextFooter) currentFooter.replaceWith(nextFooter);
          this.updateFilterGroups(nextDialog);
          this.filterPanel = this.dialog.querySelector('.main-collection__filter-form');
          this.backdropPointer = this.dialog.querySelector('.main-collection__filter-backdrop-pointer');
          if (this.backdropInteraction) {
            this.backdropInteraction.panel = this.filterPanel;
            this.backdropInteraction.pointer = this.backdropPointer;
          }
          this.updateSidebarSticky();
          nextProducts.dispatchEvent(new CustomEvent('collection:products-loaded', { bubbles: true }));

          window.requestAnimationFrame(() => {
            const nextBody = this.dialog.querySelector('.main-collection__filter-body');
            if (nextBody) nextBody.scrollTop = dialogScrollTop;

            if (options.focusName) {
              const matchingControl = Array.from(this.dialog.querySelectorAll('[name]')).find(
                (control) => control.name === options.focusName && control.value === options.focusValue
              );
              matchingControl?.focus({ preventScroll: true });
            }
          });
        } else {
          const replacement = document.createElement('collection-facets');
          for (const attribute of nextFacets.attributes) {
            replacement.setAttribute(attribute.name, attribute.value);
          }
          replacement.classList.remove('is-enhanced');
          replacement.innerHTML = nextFacets.innerHTML;
          replacement.editorColumns = this.editorColumns;
          replacement.sidebarOpen = this.sidebarOpen;
          const nextProducts = replacement.querySelector('.main-collection__products');
          this.replaceWith(replacement);
          window.ThemeAnimations?.init(nextProducts);
          replacement.syncLayout?.();
          replacement.syncColumns?.();
          replacement.observePagination?.();
          nextProducts?.dispatchEvent(new CustomEvent('collection:products-loaded', { bubbles: true }));
          renderedFacets = replacement;
        }
        renderedFacets.scrollAfterUpdate();
      } catch (error) {
        if (error.name === 'AbortError') return;
        window.location.assign(navigationUrl);
      } finally {
        if (this.requestController === requestController) this.removeAttribute('aria-busy');
      }
    }
  }

  customElements.define('collection-facets', CollectionFacets);
}
