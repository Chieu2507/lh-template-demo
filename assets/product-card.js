document.addEventListener('click', (event) => {
  const swatch = event.target.closest?.('[data-product-card-swatch][data-product-card-variant-id]');
  if (!swatch) return;

  const card = swatch.closest('[data-product-card]');
  const imageLink = card?.querySelector('.product-card__image-link');
  const image = imageLink?.querySelector('.product-card__image');
  const replacement = swatch.querySelector('template[data-product-card-swatch-image]')?.content.firstElementChild;
  if (!card || !imageLink || !image || !replacement) return;

  event.preventDefault();
  image.replaceWith(replacement.cloneNode(true));

  const url = swatch.getAttribute('href');
  imageLink.setAttribute('href', url);
  card.querySelector('.product-card__title-link')?.setAttribute('href', url);

  for (const selector of ['[data-product-card-quick-add-overlay]', '[data-product-card-quick-view]']) {
    const action = card.querySelector(selector);
    if (!action) continue;
    action.setAttribute('href', url);
    if (action.hasAttribute('data-product-card-quick-add-url')) {
      action.dataset.productCardQuickAddUrl = url;
    }
    if (action.hasAttribute('data-product-card-quick-view-url')) {
      action.dataset.productCardQuickViewUrl = url;
    }
  }

  card.querySelectorAll('[data-product-card-swatch]').forEach((item) => {
    const selected = item === swatch;
    item.classList.toggle('product-card__swatch-link--selected', selected);
    if (selected) {
      item.setAttribute('aria-current', 'true');
      item.setAttribute('data-swatch-selected', '');
    } else {
      item.removeAttribute('aria-current');
      item.removeAttribute('data-swatch-selected');
    }
  });

  card.classList.add('product-card--variant-image-selected');
});
