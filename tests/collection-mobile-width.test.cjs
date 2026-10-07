const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../assets/product-collection-carousel.js'), 'utf8');
const context = vm.createContext({});
vm.runInContext(source.slice(source.indexOf('const instances'), source.indexOf('const getAutoplaySettings')) + '\nthis.options = buildOptions;', context);
function options(dataset) {
  return context.options({ dataset, querySelector: () => null }, {});
}
test('fixed-width collection cards use measured slide widths only on mobile', () => {
  const result = options({ swiperCardWidthMobile: '256', swiperColumnsMobile: '1', swiperColumnsTablet: '4', swiperColumnsDesktop: '4', swiperGapMobile: '12', swiperGapTablet: '20', swiperGapDesktop: '28' });
  assert.equal(result.slidesPerView, 'auto');
  assert.equal(result.spaceBetween, 12);
  assert.equal(result.breakpoints[768].slidesPerView, 4);
  assert.equal(result.breakpoints[768].spaceBetween, 20);
  assert.equal(result.breakpoints[1150].slidesPerView, 4);
  assert.equal(result.breakpoints[1150].spaceBetween, 28);
});
test('existing column-based product carousels retain their fractional preview', () => {
  assert.equal(options({ swiperColumnsMobile: '2', swiperNextSlidePreviewMobile: 'true' }).slidesPerView, 2.2);
  assert.equal(options({ swiperColumnsMobile: '2', swiperCardWidthMobile: '0' }).slidesPerView, 2);
});
