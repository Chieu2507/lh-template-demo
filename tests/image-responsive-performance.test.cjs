const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { loadLiquid, stripShopifyMetadata } = require('./helpers/liquid-engine.cjs');
const Liquid = loadLiquid();
const engine = new Liquid({fs: {
  resolve: (_root, name) => path.resolve('snippets', name + '.liquid'),
  exists: async () => true,
  readFile: async file => stripShopifyMetadata(fs.readFileSync(file, 'utf8')),
}});
engine.registerFilter('image_url', (image, ...params) => '/' + image.src + '?' + params.map(([k,v]) => `${k}=${v}`).join('&'));
engine.registerFilter('image_tag', (url, ...params) => `<img src="${url}" ${params.map(([k,v]) => `${k}="${v}"`).join(' ')}>`);
const source = stripShopifyMetadata(fs.readFileSync('blocks/image.liquid','utf8'));
const image = {src:'logo.png', width:800, height:400};

test('bounded image sizes match the saved desktop/mobile max-width without changing box widths', async () => {
  const html = await engine.parseAndRender(source, {section:{index:11},block:{settings:{image,width_desktop:'fit',width_mobile:'fit',limit_width_desktop:true,max_width_desktop:160,limit_width_mobile:true,max_width_mobile:128}}});
  assert.match(html, /sizes="\(min-width: 768px\) min\(100vw, 160px\), min\(100vw, 128px\)"/);
});

test('custom percentage image boxes produce valid viewport-based source sizes', async () => {
  const html = await engine.parseAndRender(source, {section:{index:1},block:{settings:{image,width_desktop:'custom',width_custom_desktop:50,width_mobile:'custom',width_custom_mobile:80}}});
  assert.match(html, /sizes="\(min-width: 768px\) 50vw, 80vw"/);
  assert.match(html, /--size-style-width: 50%/);
});

test('mobile sources use width descriptors and an explicit high priority overrides below-fold defaults', async () => {
  const shared = stripShopifyMetadata(fs.readFileSync('snippets/image.liquid','utf8'));
  const html = await engine.parseAndRender(shared, {section:{index:5},image,mobile_image:{src:'mobile.png'},widths:'200,400',sizes:'128px',fetchpriority:'high'});
  assert.match(html, /mobile.png\?width=200 200w/);
  assert.match(html, /mobile.png\?width=400 400w/);
  assert.match(html, /<source[^>]*sizes="128px"/);
  assert.match(html, /fetchpriority="high"/);
});

 test('below-fold shared images get low priority unless explicitly overridden', async () => {
  const shared = stripShopifyMetadata(fs.readFileSync('snippets/image.liquid','utf8'));
  const html = await engine.parseAndRender(shared, {section:{index:5},image,fetchpriority:''});
  assert.match(html, /fetchpriority="low"/);
 });
