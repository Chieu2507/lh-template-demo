/* Shared, delegated enhancement also covers cards inserted by filters/editor. */
(() => {
  const selectSwatch = (swatch) => {
    const card = swatch.closest('[data-product-card]');
    const variantId = swatch.dataset.variantId;
    const template = card?.querySelector(`template[data-product-card-variant="${variantId}"]`);
    if (!template) return false;

    card.querySelectorAll('[data-product-card-swatch]').forEach((option) => {
      const selected = option === swatch;
      option.toggleAttribute('data-swatch-selected', selected);
      option.classList.toggle('product-card__swatch-link--selected', selected);
      if (selected) option.setAttribute('aria-current', 'true');
      else option.removeAttribute('aria-current');
    });

    const content = template.content;
    const price = content.querySelector('.product-card__price');
    if (price) card.querySelector('.product-card__price')?.replaceWith(price.cloneNode(true));
    const image = content.querySelector('.product-card__image');
    if (image) card.querySelector('.product-card__image')?.replaceWith(image.cloneNode(true));

    card.querySelectorAll('.product-card__image-link, .product-card__title-link, [data-product-card-quick-add-overlay], [data-product-card-quick-view]').forEach((link) => {
      link.href = swatch.href;
      if (link.hasAttribute('data-product-card-quick-add-url')) link.dataset.productCardQuickAddUrl = swatch.href;
      if (link.hasAttribute('data-product-card-quick-view-url')) link.dataset.productCardQuickViewUrl = swatch.href;
    });
    // Cards with other options still open the shared picker at this variant.
    // Never convert a color selection into an implicit choice of size.
    const id = card.querySelector('form[action*="/cart/add"] [name="id"]');
    if (id) id.value = variantId;
    return true;
  };

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const swatch = event.target.closest('[data-product-card-swatch][data-variant-id]');
    if (swatch && selectSwatch(swatch)) event.preventDefault();
  });
})();
