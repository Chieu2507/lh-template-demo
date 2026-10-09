const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

test('shared Swiper library has no network dependencies and registers its modules', async () => {
  const source = fs.readFileSync('assets/swiper-runtime-12.2.0.js', 'utf8');
  assert.doesNotMatch(source, /\bimport\s*(?:\(|["'{*])/);
  const library = await import(pathToFileURL(path.resolve('assets/swiper-runtime-12.2.0.js')).href);
  for (const name of ['A11y', 'EffectFade', 'Pagination', 'Swiper', 'Thumbs', 'createSwiperCarousel', 'destroySwiperCarousel', 'bindSwiperAutoplay', 'bindSwiperControls']) assert.equal(typeof library[name], 'function');
  const { Swiper, A11y, EffectFade, Pagination, Thumbs } = library;
  const swiper = new Swiper({ init: false, effect: 'fade', modules: [A11y, EffectFade, Pagination, Thumbs] });
  assert.equal(swiper.params.a11y.enabled, true);
  assert.equal(swiper.params.fadeEffect.crossFade, false);
  assert.equal(swiper.params.pagination.type, 'bullets');
  assert.equal(swiper.params.thumbs.swiper, null);
});
