class MultipleImagesText extends HTMLElement {
  connectedCallback() {
    if (this.controller) return;
    this.controller = new AbortController();
    const { signal } = this.controller;
    this.items = [...this.querySelectorAll('[data-multi-item]')];
    this.images = this.items.map(item => item.querySelector('[data-multi-image]'));
    this.images.forEach(image => { if (image) this.querySelector('[data-multi-images]').append(image); });
    this.index = 0;
    this.classList.add('is-ready');
    this.show(0);
    this.resizeObserver = new ResizeObserver(() => {
      const height = Math.max(0, ...this.images.map(image => image?.offsetHeight || 0));
      this.style.setProperty('--multi-media-height', `${height + 32}px`);
    });
    this.images.forEach(image => { if (image) this.resizeObserver.observe(image); });
    const navigation = this.querySelector('[data-multi-navigation]');
    if (navigation) navigation.hidden = this.items.length < 2;
    this.querySelector('[data-multi-previous]')?.addEventListener('click', () => this.show(this.index - 1, true), { signal });
    this.querySelector('[data-multi-next]')?.addEventListener('click', () => this.show(this.index + 1, true), { signal });
    this.addEventListener('keydown', event => {
      if (!event.target.closest('[data-multi-navigation]')) return;
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      this.show(event.key === 'Home' ? 0 : event.key === 'End' ? this.items.length - 1 : this.index + (event.key === 'ArrowRight' ? 1 : -1), true);
    }, { signal });
    document.addEventListener('shopify:block:select', event => {
      const target = event.target instanceof Element ? event.target : null;
      const owner = target?.closest('[data-multi-item], [data-multi-image]');
      const index = this.items.findIndex(item => item.dataset.itemId === (owner?.dataset.itemId || event.detail?.blockId));
      if (index >= 0) this.show(index);
    }, { signal });
  }

  show(index, announce = false) {
    const count = this.items.length;
    if (!count) return;
    this.index = ((index % count) + count) % count;
    this.items.forEach((item, position) => {
      const active = position === this.index;
      item.classList.toggle('is-active', active);
      item.inert = !active;
      item.setAttribute('aria-hidden', String(!active));
      const image = this.images[position];
      if (!image) return;
      const depth = (position - this.index + count) % count;
      image.classList.toggle('is-active', active);
      image.classList.toggle('is-away', depth > 2);
      image.style.setProperty('--multi-depth', depth);
      image.style.setProperty('--multi-layer', count - depth);
      image.inert = !active;
      image.setAttribute('aria-hidden', String(!active));
    });
    const status = this.querySelector('[data-multi-status]');
    if (announce && status) status.textContent = `${this.index + 1} / ${count}`;
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.controller?.abort();
    this.controller = null;
    this.images?.forEach((image, index) => { if (image) this.items[index]?.prepend(image); });
    this.classList.remove('is-ready');
  }
}
if (!customElements.get('multiple-images-text')) customElements.define('multiple-images-text', MultipleImagesText);
