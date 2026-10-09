const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { loadLiquid, stripShopifyMetadata } = require('./helpers/liquid-engine.cjs');
const engine = new (loadLiquid())({ fs: {
  resolve: (_root, file) => path.resolve('snippets', file + '.liquid'),
  exists: async () => true,
  readFile: async file => stripShopifyMetadata(fs.readFileSync(file, 'utf8')),
} });
engine.registerFilter('asset_url', name => `/assets/${name}?v=1`);
engine.registerFilter('stylesheet_tag', url => `<link rel="stylesheet" href="${url}">`);
const source = stripShopifyMetadata(fs.readFileSync('snippets/component-stylesheet.liquid', 'utf8'));
const render = (section_index, design_mode = false, page_type = 'product') => engine.parseAndRender(source, {
  filename: 'card.css', section_index, request: { design_mode, page_type },
});

test('first template sections and unknown/group placement keep blocking styles', async () => {
  for (const index of [undefined, 0, 1, 2]) {
    const html = await render(index);
    assert.match(html, /<link rel="stylesheet" href="\/assets\/card.css\?v=1">/);
    assert.doesNotMatch(html, /media="print"|onload=|<noscript>/);
  }
});
test('later storefront components load without blocking and retain no-JS fallback', async () => {
  const html = await render(3);
  assert.match(html, /media="print" onload="this.media='all'"/);
  assert.match(html, /<noscript><link rel="stylesheet" href="\/assets\/card.css\?v=1"><\/noscript>/);
});
test('editor rerenders always receive synchronous styles even late in the template', async () => {
  const html = await render(12, true);
  assert.match(html, /<link rel="stylesheet" href="\/assets\/card.css\?v=1">/);
  assert.doesNotMatch(html, /media="print"|onload=|<noscript>/);
});
test('late home components request the shared bundle instead of duplicate stylesheet links', async () => {
  const html = await render(3, false, 'index');
  assert.match(html, /<!-- deferred-template-components -->/);
  assert.doesNotMatch(html, /<link|<noscript>/);
  const editor = await render(3, true, 'index');
  assert.match(editor, /<link rel="stylesheet" href="\/assets\/card.css\?v=1">/);
  assert.doesNotMatch(editor, /deferred-template-components/);
});

test('shared hero styles remain critical and the home bundle is discovered in the head', () => {
  const hero = fs.readFileSync('sections/hero.liquid', 'utf8');
  assert.match(hero, /\{% stylesheet %\}[\s\S]*\.hero__surface/);
  assert.doesNotMatch(hero, /component-sections-hero\.css/);
  const layout = fs.readFileSync('layout/theme.liquid', 'utf8');
  const bundleAt = layout.indexOf("filename: 'deferred-template-components.css'");
  assert.ok(bundleAt > 0 && bundleAt < layout.indexOf('</head>'));
  assert.equal(layout.split("filename: 'deferred-template-components.css'").length - 1, 1);
});
