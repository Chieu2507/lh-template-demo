const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function lifecycle() {
  const source = fs.readFileSync('assets/slideshow.js', 'utf8');
  const listeners = new Map();
  const calls = [];
  const states = new WeakMap();
  const context = {
    selector: '[data-slideshow]', states,
    init: root => { if (!states.has(root)) { calls.push(['init', root]); states.set(root, root.state); } },
    destroy: root => { calls.push(['destroy', root]); states.delete(root); },
    document: { readyState: 'loading', addEventListener: (name, fn) => listeners.set(name, fn) },
  };
  const code = source.slice(source.indexOf('const initWithin =')).replace(
    'export { initWithin as initializeThemeModule };', 'globalThis.initializeThemeModule = initWithin;');
  vm.runInNewContext(code, context);
  return { ...context, calls, listeners };
}
function root() {
  return { matches: s => s === '[data-slideshow]', querySelectorAll: () => [], state: {} };
}

test('cached module initializes replacement slideshow markup without hiding the section', () => {
  const h = lifecycle();
  const original = root(), replacement = root();
  h.initializeThemeModule(original);
  h.initializeThemeModule(original);
  h.initializeThemeModule(replacement);
  assert.deepEqual(h.calls, [['init', original], ['init', replacement]]);
  const section = fs.readFileSync('sections/slideshow.liquid', 'utf8');
  assert.match(section, /<script[^>]+src="{{ 'slideshow.js' \| asset_url }}"[^>]+data-theme-module="{{ 'slideshow.js' \| asset_url }}"/);
});

test('editor section load cleans the old instance when the root is reused', () => {
  const h = lifecycle(), reused = root();
  h.initializeThemeModule(reused);
  h.listeners.get('shopify:section:load')({ target: reused });
  assert.deepEqual(h.calls, [['init', reused], ['destroy', reused], ['init', reused]]);
});

for (const manual of [false, true]) {
  test(`editor selection uses the logical slide and zero-duration transition (${manual ? 'manual' : 'Swiper'} loop)`, () => {
    const h = lifecycle(), r = root();
    // Swiper can reorder DOM slides. Saved logical index remains 2.
    const selected = { dataset: { swiperSlideIndex: '2' } };
    const moves = [];
    r.state = {
      carousel: { querySelectorAll: () => [selected, {}] },
      swiper: { params: { loop: true }, slideTo: (...args) => moves.push(['slideTo', ...args]), slideToLoop: (...args) => moves.push(['slideToLoop', ...args]) },
      manualLoop: manual ? { originalIndex: index => index + 3 } : null,
    };
    const target = { closest: s => s === '[data-slideshow]' ? r : selected };
    h.listeners.get('shopify:block:select')({ target });
    assert.deepEqual(moves, [manual ? ['slideTo', 3, 0] : ['slideToLoop', 2, 0]]);
    assert.equal(h.states.get(r), r.state);
  });
}
