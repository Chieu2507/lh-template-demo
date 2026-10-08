import { Pagination } from './swiper-loader.js';
import { createSwiperCarousel, destroySwiperCarousel } from './swiper-carousel.js';

const instances = new WeakMap();
const rootsWithin = (root) => [
  ...(root.matches?.('[data-icon-text-cards-carousel]') ? [root] : []),
  ...root.querySelectorAll('[data-icon-text-cards-carousel]'),
];
const value = (root, key, fallback) => {
  const number = Number(root.dataset[key]);
  return Number.isFinite(number) ? number : fallback;
};

export const initializeThemeModule = (scope = document) => {
  rootsWithin(scope).forEach((root) => {
    if (instances.has(root)) return;
    const source = root.querySelector('.icon-text-cards__content');
    const carousel = root.querySelector('[data-icon-cards-carousel]');
    const viewport = carousel.querySelector('[data-swiper-carousel]');
    const wrapper = viewport.querySelector('.swiper-wrapper');
    const cards = [...source.children].filter((node) => node.classList.contains('group'));
    if (!cards.length) return;
    const moved = cards.map((card) => {
      const anchor = document.createComment('icon card');
      card.before(anchor);
      const slide = document.createElement('div');
      slide.className = 'carousel-slide swiper-slide';
      slide.append(card);
      wrapper.append(slide);
      return { card, anchor, slide };
    });
    source.classList.remove('icon-text-cards__content--grid');
    carousel.hidden = false;
    const pagination = carousel.querySelector('[data-icon-cards-pagination]');
    const swiper = createSwiperCarousel(viewport, {
      modules: pagination ? [Pagination] : [],
      slidesPerView: value(carousel, 'columnsMobile', 1),
      spaceBetween: value(carousel, 'gapMobile', 16),
      speed: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 400,
      breakpoints: {
        768: { slidesPerView: value(carousel, 'columnsTablet', 2), spaceBetween: value(carousel, 'gapTablet', 20) },
        1150: { slidesPerView: value(carousel, 'columnsDesktop', 4), spaceBetween: value(carousel, 'gapDesktop', 32) },
      },
      controls: { scope: carousel, previous: '[data-swiper-previous]', next: '[data-swiper-next]' },
      ...(pagination ? { pagination: {
        el: pagination,
        type: carousel.dataset.paginationType === 'progress_bar' ? 'progressbar' : 'bullets',
        clickable: true,
        renderBullet: (index, className) => `<button type="button" class="${className}" aria-label="${carousel.dataset.paginationLabel.replace('[index]', index + 1).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')}"></button>`,
      } } : {}),
    });
    instances.set(root, { swiper, viewport, source, carousel, moved });
  });
};

document.addEventListener('shopify:section:unload', (event) => {
  rootsWithin(event.target).forEach((root) => {
    const state = instances.get(root);
    if (!state) return;
    destroySwiperCarousel(state.viewport);
    state.moved.forEach(({ card, anchor, slide }) => { anchor.replaceWith(card); slide.remove(); });
    state.source.classList.add('icon-text-cards__content--grid');
    state.carousel.hidden = true;
    instances.delete(root);
  });
});
document.addEventListener('shopify:block:select', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const root = target?.closest('[data-icon-text-cards-carousel]');
  if (!root) return;
  initializeThemeModule(root);
  const state = instances.get(root);
  const slide = target.closest('.swiper-slide');
  if (state?.swiper && slide) {
    const index = [...state.swiper.slides].indexOf(slide);
    if (index >= 0) state.swiper.slideTo(index, 0);
  }
});
