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

test('lazy shared images use rendered width and retain a fallback, eager images keep explicit sizes', async () => {
  const shared = stripShopifyMetadata(fs.readFileSync('snippets/image.liquid','utf8'));
  const lazy = await engine.parseAndRender(shared, {section:{index:6},image,sizes:'100vw',loading:'lazy'});
  assert.match(lazy, /sizes="auto, 100vw"/);
  assert.match(lazy, /loading="lazy"/);
  const eager = await engine.parseAndRender(shared, {section:{index:6},image,sizes:'380px',loading:'eager'});
  assert.match(eager, /sizes="380px"/);
  assert.ok(!eager.includes('auto, 380px'));
});

test('product primary and hover images both expose a full set of smaller candidates', async () => {
  const card = stripShopifyMetadata(fs.readFileSync('snippets/product-card-image.liquid','utf8'));
  const html = await engine.parseAndRender(card, {image,secondary_image:{...image,src:'hover.png'},width:800,height:800,crop:'center',url:'/products/toy'});
  const imgs = html.match(/<img[^>]*>/g);
  assert.equal(imgs.length,2);
  for (const img of imgs) assert.match(img, /widths="160, 240, 320, 400, 480, 640, 800"/);
});

test('mobile srcset ends at the actual source width and never declares upscaled candidates', async () => {
  const shared = stripShopifyMetadata(fs.readFileSync('snippets/image.liquid','utf8'));
  for (const width of [480, 120]) {
    const html = await engine.parseAndRender(shared, {section:{index:5},image,mobile_image:{src:'optimized.webp',width},widths:'200,400,600,800',sizes:'100vw'});
    const srcset = html.match(/<source[^>]*srcset="([^"]+)"/)[1];
    const candidates = [...srcset.matchAll(/width=(\d+)\s+(\d+)w/g)];
    assert.ok(candidates.length);
    assert.ok(candidates.every(m => +m[1] === +m[2] && +m[1] <= width));
    assert.equal(+candidates.at(-1)[1], width);
    assert.doesNotMatch(srcset.trim(), /,$/);
  }
});

test('optional card thumbnail preserves variant-specific images and the original hover image', async () => {
  const card = fs.readFileSync('snippets/product-card.liquid','utf8');
  const kernel = card.match(/{% liquid[\s\S]*?%}/)[0] + '{{ card_image.src }}|{{ secondary_image.src }}';
  const main = {id:1,src:'full.webp'}, hover = {id:2,src:'hover.webp'}, other = {id:3,src:'other-color.webp'};
  for (const [selected, thumbnail, expected] of [[main,{src:'small.webp'},'small.webp'],[main,null,'full.webp'],[other,{src:'small.webp'},'other-color.webp']]) {
    const product = {featured_image:main,selected_or_first_available_variant:{id:11,featured_image:selected},images:[main,hover],metafields:{custom:{card_thumbnail:{value:{preview_image:thumbnail}}}}};
    const html = await engine.parseAndRender(kernel,{product,settings:{}});
    assert.match(html,new RegExp(expected.replace('.','\\.')));
    if(selected===main) assert.match(html,/\|hover\.webp/);
  }
});

test('auto image height fills only the requested device and fixed ratios ignore saved Fill', async () => {
  for (const [desktopRatio, mobileRatio, expectedDesktop, expectedMobile] of [
    ['auto','auto',true,false], ['square','auto',false,false], ['auto','custom',true,false]
  ]) {
    const html = await engine.parseAndRender(source, {section:{index:5},block:{settings:{image,image_ratio_desktop:desktopRatio,image_ratio_mobile:mobileRatio,height_desktop:'fill',height_mobile:'auto'}}});
    assert.equal(/image-block--height-fill(?:\s|\")/.test(html), expectedDesktop);
    assert.equal(html.includes('image-block--height-fill-mobile'), expectedMobile);
  }
  const mobile = await engine.parseAndRender(source, {section:{index:5},block:{settings:{image,image_ratio_desktop:'auto',image_ratio_mobile:'auto',height_desktop:'auto',height_mobile:'fill'}}});
  assert.match(mobile,/image-block--height-fill-mobile/);
  assert.match(mobile,/--image-block-image-height: auto/);
});
