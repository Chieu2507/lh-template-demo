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

test('image ratios determine height and ignore obsolete saved Fill settings', async () => {
  for (const [desktopRatio, mobileRatio, expectedDesktop, expectedMobile] of [
    ['auto', 'auto', 'auto', 'auto'],
    ['square', 'auto', '100%', 'auto'],
    ['auto', 'custom', 'auto', '100%']
  ]) {
    const html = await engine.parseAndRender(source, {section:{index:5},block:{settings:{image,image_ratio_desktop:desktopRatio,image_ratio_mobile:mobileRatio,height_desktop:'fill',height_mobile:'fill'}}});
    assert.ok(html.includes(`--image-block-image-height: ${expectedDesktop};`));
    assert.ok(html.includes(`--image-block-image-height-mobile: ${expectedMobile};`));
    assert.doesNotMatch(html, /image-block--height-fill/);
  }
  const schema = JSON.parse(fs.readFileSync('blocks/image.liquid','utf8').match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
  assert.ok(!schema.settings.some(setting => ['height_desktop', 'height_mobile'].includes(setting.id)));
});
