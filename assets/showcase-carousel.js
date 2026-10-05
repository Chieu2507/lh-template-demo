import { createSwiperCarousel, destroySwiperCarousel } from './swiper-carousel.js';

const states = new WeakMap();
const selector = '[data-showcase-carousel]';
const wrap = (index, count) => ((index % count) + count) % count;

// A full cycle on each side keeps three-item centered carousels filled at
// both edges. Originals remain the only editable and focusable slide set.
const cloneSlide = (slide, index) => {
  const clone = slide.cloneNode(true);
  clone.dataset.showcaseClone = String(index);
  for (const element of [clone, ...clone.querySelectorAll('*')]) {
    for (const attribute of [...element.attributes]) {
      if (attribute.name === 'id' || attribute.name.startsWith('data-shopify-editor') || attribute.name === 'data-block-id') element.removeAttribute(attribute.name);
    }
  }
  clone.setAttribute('aria-hidden', 'true');
  clone.inert = true;
  return clone;
};

const init = (root) => {
  if (states.has(root)) return;
  const viewport = root.querySelector('[data-swiper-carousel]');
  const wrapper = viewport?.querySelector('.swiper-wrapper');
  if (!wrapper) return;
  const originals = [...wrapper.children].filter((slide) => slide.matches('[data-showcase-item]'));
  const count = originals.length;
  root.dataset.slideCount = String(count);
  if (!count) return;
  const clones = count > 1 ? [
    ...originals.map(cloneSlide), ...originals.map(cloneSlide)
  ] : [];
  if (clones.length) {
    wrapper.prepend(...clones.slice(0, count));
    wrapper.append(...clones.slice(count));
  }
  const offset = clones.length ? count : 0;
  const controller = new AbortController();
  const { signal } = controller;
  const stage = root.querySelector('.showcase-carousel__stage');
  const pagination = root.querySelector('[data-showcase-pagination]');
  const previous = root.querySelector('[data-showcase-previous]');
  const next = root.querySelector('[data-showcase-next]');
  const initial = Math.min(count - 1, Math.max(0, Number(root.dataset.initialSlide || 1) - 1));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(min-width: 1150px) and (hover: hover) and (pointer: fine)');
  let swiper;
  let resetting = false;
  const alignNavigation = () => {
    const media = wrapper.querySelector('.swiper-slide-active .showcase-item__media');
    if (!media || !stage) return;
    const mediaBox = media.getBoundingClientRect();
    const stageBox = stage.getBoundingClientRect();
    root.style.setProperty('--showcase-navigation-y', `${mediaBox.top - stageBox.top + mediaBox.height / 2}px`);
  };
  const current = () => wrap(swiper?.activeIndex ?? initial, count);
  const go = (index, speed = swiper.params.speed) => {
    if (swiper.destroyed || swiper.animating || count < 2) return;
    swiper.slideTo(index, speed);
    if (!speed) restore();
  };
  const step = (direction) => go(swiper.activeIndex + direction);
  const bullets = pagination ? originals.map((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'swiper-pagination-bullet';
    button.setAttribute('aria-label', pagination.dataset.bulletLabel.replace('{{ index }}', String(index + 1)));
    button.setAttribute('aria-controls', viewport.id);
    button.addEventListener('click', () => go(offset + index), { signal });
    pagination.append(button);
    return button;
  }) : [];
  const sync = () => {
    if (!swiper || swiper.destroyed) return;
    const logical = current();
    [...wrapper.children].forEach((slide, index) => slide.setAttribute('aria-label', `${wrap(index, count) + 1} / ${count}`));
    alignNavigation();
    originals.forEach((slide, index) => {
      // Hide only content from focus so media remains selectable in the editor.
      const content = slide.querySelector('.showcase-item__content');
      content.inert = index !== logical;
      content.setAttribute('aria-hidden', String(index !== logical));
    });
    bullets.forEach((button, index) => {
      button.classList.toggle('swiper-pagination-bullet-active', index === logical);
      button.setAttribute('aria-current', String(index === logical));
    });
  };
  const restore = () => {
    if (!swiper || swiper.destroyed || resetting) return;
    if (offset && (swiper.activeIndex < count || swiper.activeIndex >= count * 2)) {
      resetting = true;
      root.classList.add('is-loop-reset');
      swiper.slideTo(offset + current(), 0, false);
      // Commit the equivalent original slide while transitions are disabled.
      // Otherwise the browser batches both class changes and scales it again.
      void viewport.offsetWidth;
      root.classList.remove('is-loop-reset');
      resetting = false;
    }
    sync();
  };
  const gap = () => {
    const style = getComputedStyle(root);
    return Number.parseFloat(style.getPropertyValue(window.innerWidth < 768 ? '--showcase-slide-gap-mobile' : '--showcase-slide-gap')) || 0;
  };
  swiper = createSwiperCarousel(viewport, {
    slidesPerView: 'auto', centeredSlides: true, initialSlide: offset + initial,
    loop: false, speed: reducedMotion.matches ? 0 : 550, spaceBetween: gap(),
    allowTouchMove: count > 1 && !(root.classList.contains('showcase-carousel--navigation-cursor') && finePointer.matches), watchOverflow: count < 2,
    a11y: { slideLabelMessage: '{{index}} / {{slidesLength}}' }
  });
  const updateGap = () => {
    if (swiper.destroyed) return;
    swiper.params.spaceBetween = gap();
    swiper.allowTouchMove = count > 1 && !(root.classList.contains('showcase-carousel--navigation-cursor') && finePointer.matches);
    swiper.update(); restore();
  };
  const updateMotion = () => { swiper.params.speed = reducedMotion.matches ? 0 : 550; };
  swiper.on('slideChange', sync);
  swiper.on('slideChangeTransitionEnd', restore);
  window.addEventListener('resize', updateGap, { signal });
  reducedMotion.addEventListener('change', updateMotion, { signal });
  previous?.addEventListener('click', () => step(-1), { signal });
  next?.addEventListener('click', () => step(1), { signal });
  viewport.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || event.target.matches('input, textarea, select')) return;
    event.preventDefault();
    const rtl = getComputedStyle(root).direction === 'rtl';
    step((event.key === 'ArrowRight' ? 1 : -1) * (rtl ? -1 : 1));
  }, { signal });
  const clearCursor = () => root.classList.remove('is-cursor-active');
  if (root.classList.contains('showcase-carousel--navigation-cursor') && previous && next && count > 1) {
    stage.addEventListener('pointermove', (event) => {
      if (!finePointer.matches || !event.target.closest('.showcase-item__media, .showcase-carousel__arrow') || event.target.closest('a')) { clearCursor(); return; }
      const rect = stage.getBoundingClientRect();
      const x = event.clientX - rect.left;
      root.style.setProperty('--showcase-cursor-x', `${x}px`);
      root.style.setProperty('--showcase-cursor-y', `${event.clientY - rect.top}px`);
      root.dataset.cursorDirection = x < rect.width / 2 ? 'previous' : 'next';
      root.classList.add('is-cursor-active');
    }, { signal });
    stage.addEventListener('pointerleave', clearCursor, { signal });
    finePointer.addEventListener('change', clearCursor, { signal });
    stage.addEventListener('click', (event) => {
      if (!root.classList.contains('is-cursor-active') || event.target.closest('a, button') || !event.target.closest('.showcase-item__media')) return;
      step(root.dataset.cursorDirection === 'previous' ? -1 : 1);
    }, { signal });
  }
  root.addEventListener('shopify:block:select', (event) => {
    const slide = event.target.closest('[data-showcase-item]:not([data-showcase-clone])');
    const index = originals.indexOf(slide);
    if (index >= 0) { swiper.slideTo(offset + index, 0); restore(); }
  }, { signal });
  root.classList.add('is-ready');
  restore();
  const mediaObserver = new ResizeObserver(alignNavigation);
  originals.forEach((slide) => mediaObserver.observe(slide.querySelector('.showcase-item__media')));
  mediaObserver.observe(stage);
  states.set(root, () => {
    controller.abort();
    mediaObserver.disconnect();
    destroySwiperCarousel(viewport);
    clones.forEach((clone) => clone.remove());
    bullets.forEach((button) => button.remove());
    originals.forEach((slide) => { const content = slide.querySelector('.showcase-item__content'); content.inert = false; content.removeAttribute('aria-hidden'); });
    root.classList.remove('is-ready', 'is-cursor-active');
    root.style.removeProperty('--showcase-navigation-y');
    states.delete(root);
  });
};
const within = (scope) => scope.querySelectorAll(selector);
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => within(document).forEach(init), { once: true });
else within(document).forEach(init);
document.addEventListener('shopify:section:load', (event) => within(event.target).forEach(init));
document.addEventListener('shopify:section:unload', (event) => within(event.target).forEach((root) => states.get(root)?.()));
