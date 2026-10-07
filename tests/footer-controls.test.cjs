const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {loadLiquid,stripShopifyMetadata} = require('./helpers/liquid-engine.cjs');
const Liquid=loadLiquid();
const os=require('node:os');const path=require('node:path');
test('social library renders every registered brand and keeps Heroicons separate', async()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'social-icon-test-'));
 fs.writeFileSync(path.join(root,'social-icon.liquid'),stripShopifyMetadata(fs.readFileSync('snippets/social-icon.liquid','utf8')));
 const engine=new Liquid({root:[root], extname:'.liquid'});
 const source=stripShopifyMetadata(fs.readFileSync('snippets/icon.liquid','utf8'));
 for(const icon of ['instagram','pinterest','x','facebook','tiktok','youtube','linkedin']){
  const html=await engine.parseAndRender(source,{library:'social',source:'library',icon,url:'https://example.com',label:icon});
  assert.match(html,/social-links__icon/);assert.match(html,/aria-label=/);assert.doesNotMatch(html,/M13.5 4.5 21 12/);
 }
 for(const icon of ['envelope','phone']){
  const html=await engine.parseAndRender(source,{library:'heroicons',source:'library',icon});
  assert.match(html,/stroke-linecap="round"/);assert.doesNotMatch(html,/social-links__icon/);
 }
});
test('one or multiple published languages use the same interactive selector',async()=>{
 const engine=new Liquid();engine.registerTag('render',{render:()=>''});
 const source=stripShopifyMetadata(fs.readFileSync('blocks/localization.liquid','utf8')).replace(/{% form[^%]*%}/g,'<form>').replace(/{% endform %}/g,'</form>');
 const context={block:{settings:{show_country_selector:false,show_language_selector:true}},localization:{language:{endonym_name:'English'},available_languages:[{iso_code:'en',endonym_name:'English'}],available_countries:[]}};
 let html=await engine.parseAndRender(source,context);assert.match(html,/header-localization__details--language/);assert.match(html,/name="language_code"/);assert.match(html,/value="en"/);
 context.localization.available_languages.push({iso_code:'fr',endonym_name:'Français'});
 html=await engine.parseAndRender(source,context);assert.match(html,/header-localization__details--language/);assert.match(html,/Français/);
 context.localization.available_languages.pop();
 context.block.settings.show_language_selector=false;html=await engine.parseAndRender(source,context);assert.doesNotMatch(html,/header-localization__details--language/);
});
