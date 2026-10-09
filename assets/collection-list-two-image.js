import { createSwiperCarousel, destroySwiperCarousel } from './swiper-runtime-12.2.0.js';

const instances = new WeakMap();

const initialize = (section) => {
  if (!section || instances.has(section)) return;
  const root = section.querySelector('.collection-two-image');
  const items = [...section.querySelectorAll('[data-collection-two-image-item]')];
  if (!root || !items.length) return;
  const controller = new AbortController();
  const mobile = window.matchMedia('(max-width: 767.98px)');
  const desktop = window.matchMedia('(min-width: 1150px)');
  let swiper = null;
  const activate = (id) => {
    const selected = items.find((item) => item.dataset.collectionItemId === id) || items[0];
    items.forEach((item) => { item.dataset.active = String(item === selected); });
    if (mobile.matches && swiper) swiper.slideTo(items.indexOf(selected));
  };
  items.forEach((item) => {
    const link = item.querySelector('[data-collection-two-image-link]');
    link?.addEventListener('pointerenter', () => {
      if (desktop.matches) activate(item.dataset.collectionItemId);
    }, { signal: controller.signal });
    link?.addEventListener('focus', () => activate(item.dataset.collectionItemId), { signal: controller.signal });
  });
  const updateLayout = () => {
    if (mobile.matches && !swiper) {
      swiper = createSwiperCarousel(root, { slidesPerView: 'auto', spaceBetween: Number.parseFloat(getComputedStyle(section).getPropertyValue('--collection-list-two-image-gap-mobile')) || 16 });
    } else if (!mobile.matches && swiper) {
      destroySwiperCarousel(root);
      swiper = null;
    }
  };
  mobile.addEventListener('change', updateLayout, { signal: controller.signal });
  section.addEventListener('collection-list-two-image:activate', (event) => activate(event.detail?.id), { signal: controller.signal });
  activate(items[0].dataset.collectionItemId);
  root.dataset.ready = 'true';
  updateLayout();
  instances.set(section, { destroy() { controller.abort(); destroySwiperCarousel(root); delete root.dataset.ready; } });
};

const destroy = (section) => {
  instances.get(section)?.destroy();
  instances.delete(section);
};
const initializeRoot = (root = document) => {
  if (root.matches?.('[data-collection-list-two-image]')) initialize(root);
  root.querySelectorAll?.('[data-collection-list-two-image]').forEach(initialize);
};
const destroyRoot = (root) => {
  if (root.matches?.('[data-collection-list-two-image]')) destroy(root);
  root.querySelectorAll?.('[data-collection-list-two-image]').forEach(destroy);
};
document.addEventListener('shopify:section:load', (event) => initializeRoot(event.target));
document.addEventListener('shopify:section:unload', (event) => destroyRoot(event.target));
document.addEventListener('shopify:block:select', (event) => {
  const item = event.target.closest?.('[data-collection-two-image-item]');
  const section = item?.closest('[data-collection-list-two-image]');
  if (section) section.dispatchEvent(new CustomEvent('collection-list-two-image:activate', { detail: { id: item.dataset.collectionItemId } }));
});
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => initializeRoot(), { once: true }) : initializeRoot();
