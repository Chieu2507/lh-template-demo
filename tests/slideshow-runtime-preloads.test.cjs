const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { loadLiquid, stripShopifyMetadata } = require('./helpers/liquid-engine.cjs');
const Liquid = loadLiquid();
const engine = new Liquid();
engine.registerFilter('asset_url', file => `/assets/${file}?v=123`);
const source = stripShopifyMetadata(fs.readFileSync('snippets/slideshow-runtime-preloads.liquid', 'utf8'));
test('preloads match the complete static import graph and preserve entry version', async () => {
  const html = await engine.parseAndRender(source);
  const urls = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  assert.ok(urls.includes('/assets/slideshow.js?v=123'));
  const visited = new Set();
  function walk(file) {
    if (visited.has(file)) return;
    visited.add(file);
    const code = fs.readFileSync(path.join('assets', file), 'utf8');
    for (const match of code.matchAll(/(?:from\s*|import\s*)["']\.\/([^"']+)["']/g)) {
      assert.ok(urls.includes(`/assets/${match[1]}`), `Missing exact import URL for ${match[1]}`);
      walk(match[1]);
    }
  }
  walk('slideshow.js');
  assert.equal(new Set(urls).size, urls.length);
});
test('runtime preloads share the first viewport image preload guard', () => {
  const caller = fs.readFileSync('blocks/slideshow-slide.liquid', 'utf8');
  const guard = caller.match(/{% if slide_image_loading == 'eager' and section.index == 1[^%]*%}([\s\S]*?){% endif %}/);
  assert.ok(guard);
  assert.ok(guard[1].includes("render 'slideshow-runtime-preloads'"));
  assert.equal((caller.match(/render 'slideshow-runtime-preloads'/g) || []).length, 1);
});
