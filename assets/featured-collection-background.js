(() => {
  if (customElements.get('lh-collection-background')) return;

  class CollectionBackground extends HTMLElement {
    connectedCallback() {
      if (this.observer) return;
      this.content = this.querySelector('[data-collection-background-content]');
      if (!this.content) return;
      this.observer = new ResizeObserver(() => this.measure());
      this.observer.observe(this.content);
      this.measure();
    }

    measure() {
      if (!this.isConnected || !this.content) return;
      const style = getComputedStyle(this.content);
      // Exclude the mobile inset: percentage height is based on collection
      // content only, so changing the image height cannot resize its reference.
      const height = Math.max(0, this.content.offsetHeight
        - parseFloat(style.paddingTop || 0) - parseFloat(style.paddingBottom || 0));
      const value = `${height}px`;
      if (this.style.getPropertyValue('--collection-content-height') !== value) {
        this.style.setProperty('--collection-content-height', value);
      }
    }

    disconnectedCallback() {
      this.observer?.disconnect();
      this.observer = null;
      this.content = null;
    }
  }
  customElements.define('lh-collection-background', CollectionBackground);
})();
