const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {loadLiquid, stripShopifyMetadata} = require('./helpers/liquid-engine.cjs');
const scale = ['display', 'xl', 'lg', 'md', 'sm', 'xs'];

test('all section/block size selectors use visual sizes instead of HTML heading names', () => {
  for (const dir of ['blocks', 'sections']) {
    for (const name of fs.readdirSync(dir).filter(n => n.endsWith('.liquid'))) {
      const source = fs.readFileSync(`${dir}/${name}`, 'utf8');
      const match = source.match(/{% schema %}([\s\S]*?){% endschema %}/);
      if (!match) continue;
      for (const setting of JSON.parse(match[1]).settings || []) {
        if (setting.type !== 'select' || !/size/.test(setting.id)) continue;
        assert.ok(!setting.options.some(o => /^(h[1-6]|heading_[1-6])$/.test(o.value)), `${dir}/${name}: ${setting.id}`);
      }
    }
  }
});

test('article title renders each visual size and preserves the independent HTML tag', async () => {
  const Liquid = loadLiquid();
  const engine = new Liquid({fs: {resolve: (_root, name) => path.resolve('snippets', name + '.liquid'), exists: async () => true, readFile: async file => stripShopifyMetadata(fs.readFileSync(file, 'utf8'))}});
  const source = stripShopifyMetadata(fs.readFileSync('blocks/blog-meta.liquid', 'utf8'));
  for (const [index, size] of scale.entries()) {
    for (const saved of [size, `h${index + 1}`, `heading_${index + 1}`]) {
      const html = await engine.parseAndRender(source, {block: {settings: {title_size: saved, html_title_tag: 'h3'}}, article: {title: 'Article'}});
      assert.match(html, new RegExp(`<h3 class="article-blog-meta__title heading-text heading-${size}">Article</h3>`));
    }
  }
});

test('previous/next navigation actually consumes its selected title size', async () => {
  const Liquid = loadLiquid();
  const engine = new Liquid({fs: {resolve: (_root, name) => path.resolve('snippets', name + '.liquid'), exists: async () => true, readFile: async file => stripShopifyMetadata(fs.readFileSync(file, 'utf8'))}});
  const source = stripShopifyMetadata(fs.readFileSync('blocks/previous-and-next-posts.liquid', 'utf8'));
  for (const size of scale) {
    const html = await engine.parseAndRender(source, {block: {settings: {title_size: size}}, blog: {next_article: {url: '/next'}}});
    assert.ok(html.includes(`--article-pagination-title-size:var(--font-heading-${size})`));
    assert.match(html, /href="\/next"/);
  }
});
