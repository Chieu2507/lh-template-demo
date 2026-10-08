const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {loadLiquid,stripShopifyMetadata}=require('./helpers/liquid-engine.cjs');
test('shared image always passes an alt attribute, including unlabelled decorative images',async()=>{
 const Liquid=loadLiquid();const engine=new Liquid();const seen=[];
 engine.registerFilter('image_url',()=>'/image.jpg');
 engine.registerFilter('image_tag',(_url,...args)=>{const alt=args.find(a=>Array.isArray(a)&&a[0]==='alt');seen.push(alt?.[1]);return '<img>';});
 const source=stripShopifyMetadata(fs.readFileSync('snippets/image.liquid','utf8'));
 for(const context of [{image:{src:'a.jpg'}},{image:{src:'a.jpg',alt:'Nursery toys'}},{image:{src:'a.jpg'},alt:'Paper plane illustration'}])await engine.parseAndRender(source,context);
 assert.deepEqual(seen,['','Nursery toys','Paper plane illustration']);
});
