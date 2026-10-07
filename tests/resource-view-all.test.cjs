const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup(url, resource, count = 7, limit = 6, designMode = false) {
  const wrapper = { hidden: true, dataset: { designMode: String(designMode) } };
  const attributes = new Map([['aria-disabled', 'true'], ['tabindex', '-1']]);
  const button = { setAttribute: (k, v) => attributes.set(k, v), removeAttribute: k => attributes.delete(k) };
  const section = {
    querySelectorAll: selector => selector === '[data-view-all-button]' ? [button] : selector === '[data-resource-view-all]' ? [wrapper] : [],
    querySelector: selector => selector === resource ? { dataset: resource === '[data-product-list]' ? { collectionUrl: url, resourceCount: count, resourceLimit: limit } : { blogUrl: url, resourceCount: count, resourceLimit: limit } } : null,
  };
  const events = {};
  const document = { readyState: 'complete', querySelectorAll: () => [section], addEventListener: (name, handler) => events[name] = handler };
  vm.runInNewContext(fs.readFileSync('assets/resource-view-all.js', 'utf8'), { document });
  return { attributes, events, section, wrapper };
}
for (const [resource, url] of [['[data-product-list]', '/collections/new-arrivals-perky'], ['[data-blog-url]', '/blogs/perky']]) {
  test(`View All uses selected resource ${resource} without a Liquid dynamic marker`, () => {
    const { attributes } = setup(url, resource);
    assert.equal(attributes.get('href'), url);
    assert.equal(attributes.has('aria-disabled'), false);
    assert.equal(attributes.has('tabindex'), false);
  });
}
test('editor reload clears a stale link when resource is removed', () => {
  const { attributes, events, section } = setup('/blogs/perky', '[data-blog-url]');
  section.querySelector = () => null;
  events['shopify:section:load']({ target: { querySelectorAll: () => [section] } });
  assert.equal(attributes.has('href'), false);
  assert.equal(attributes.get('aria-disabled'), 'true');
});

for (const resource of ['[data-product-list]', '[data-blog-url]']) {
  for (const [url, count, limit, hidden] of [['', 9, 6, true], ['/resource', 0, 6, true], ['/resource', 5, 6, true], ['/resource', 6, 6, true], ['/resource', 7, 6, false]]) {
    test(`visibility ${resource}: URL ${url}, count ${count}, limit ${limit}`, () => {
      assert.equal(setup(url, resource, count, limit).wrapper.hidden, hidden);
    });
  }
}

for (const [url, count, disabled] of [['', 9, true], ['/blogs/perky', 6, true], ['/blogs/perky', 7, false]]) {
  test(`editor keeps View All visible: URL ${url}, count ${count}`, () => {
    const { wrapper, attributes } = setup(url, '[data-blog-url]', count, 6, true);
    assert.equal(wrapper.hidden, false);
    assert.equal(attributes.get('aria-disabled') === 'true', disabled);
    assert.equal(attributes.has('href'), !disabled);
  });
}
