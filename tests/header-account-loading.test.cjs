const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('assets/header.js', 'utf8');
const body = source.slice(source.indexOf('  const initializeAccountSheets ='), source.indexOf('  const initializeHeaders ='));
function fixture(defined = true) {
  const clicks = []; const frames = []; let handler; let mounted = false; let listeners = 0;
  const trigger = { focus() {}, click() { clicks.push('open'); } };
  const account = { isConnected: true, shadowRoot: { querySelector: () => trigger }, setAttribute() {}, addEventListener() {} };
  const link = { attributes: [], href: '/account/login', addEventListener(_name, fn) { handler = fn; listeners++; }, querySelector: () => ({ content: { firstElementChild: { cloneNode: () => account } } }), replaceWith() { mounted = true; } };
  const header = { querySelectorAll: s => s === '[data-deferred-account]' ? (mounted ? [] : [link]) : (mounted ? [account] : []) };
  const context = { window: { customElements: { get: () => defined }, location: { assign: () => clicks.push('fallback') } }, performance: { now: () => 0 }, accountElements: new WeakSet(), deferredAccounts: new WeakSet(), requestAnimationFrame: fn => frames.push(fn), openAccountSheets: new Set() };
  vm.runInNewContext(body + '\nthis.initialize = initializeAccountSheets;', context);
  context.initialize(header); context.initialize(header);
  return { clicks, frames, listeners, mounted: () => mounted, click: (options = {}) => { let prevented = false; handler({ ...options, preventDefault() { prevented = true; }, stopPropagation() {} }); return prevented; } };
}
test('account stays inert until requested, initializes once, then opens its native dialog', () => {
  const f = fixture(); assert.equal(f.mounted(), false); assert.equal(f.listeners, 1);
  assert.equal(f.click(), true); assert.equal(f.mounted(), true); assert.equal(f.clicks.length, 0);
  f.frames.shift()(); assert.deepEqual(f.clicks, ['open']);
});
test('modifier clicks and unavailable Shopify component preserve normal account navigation', () => {
  const f = fixture(); assert.equal(f.click({ ctrlKey: true }), false); assert.equal(f.mounted(), false);
  const unavailable = fixture(false); assert.equal(unavailable.click(), false); assert.equal(unavailable.mounted(), false);
});
