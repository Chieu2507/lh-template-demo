const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {loadLiquid,stripShopifyMetadata}=require('./helpers/liquid-engine.cjs');
const root=path.join(__dirname,'..');
const Liquid=loadLiquid();
const engine=new Liquid({root:path.join(root,'snippets'),extname:'.liquid'});
engine.registerTag('doc',{parse(token,tokens){while(tokens.length){if(tokens.shift().name==='enddoc')break;}},render(){return '';}});
const extract=(s,t)=>(s.match(new RegExp('{% '+t+' %}([\\s\\S]*?){% end'+t+' %}'))||[])[1]||'';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
for(const contract of require('./fixtures/elara-legacy-contract.json')){
 test(`${contract.file}: existing markup, styling and runtime remain unchanged`,async()=>{
  const text=fs.readFileSync(path.join(root,contract.file),'utf8');
  const schema=JSON.parse(extract(text,'schema'));
  assert.equal(schema.settings.find(s=>s.id==='use_elara_layout').default,false);
  for(const preset of schema.presets||[])assert.equal(preset.settings.use_elara_layout,true);
  assert.equal(hash(extract(text,'stylesheet').slice(0,contract.cssLength)),contract.cssHash);
  assert.equal(hash(extract(text,'javascript').slice(0,contract.jsLength)),contract.jsHash);
  const source=stripShopifyMetadata(text).replace(/{% javascript %}[\s\S]*?{% endjavascript %}/g,'').replace(/{% content_for 'blocks' %}/g,'{{ children }}');
  for(const fixture of contract.fixtures){
   const context={block:{id:'qa',settings:fixture.settings,shopify_attributes:'data-shopify-editor-block="qa"'},section:{id:'qa',settings:fixture.settings},request:{design_mode:false},children:'<div>Saved content</div>'};
   assert.equal((await engine.parseAndRender(source,context)).replace(/\s+/g,' ').trim(),fixture.html);
  }
 });
}
