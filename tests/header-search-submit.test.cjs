const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('assets/header.js','utf8');
const script = source.slice(source.lastIndexOf('\n(() => {'));
function submit(term, category) {
  const handlers = {}; const input = { value:term, name:'q', removeAttribute(key){delete this[key];} }; const query={value:''}; const children=[];
  const form={ querySelector(selector){ if(selector==='[data-header-search-category]')return {value:category}; if(selector==='input[type="search"]')return input; if(selector==='[data-header-search-query]')return query; return children.find(x=>x.name==='type'); },append(x){children.push(x);} };
  vm.runInNewContext(script,{document:{querySelectorAll:()=>[],addEventListener(name,fn){handlers[name]=fn;},createElement:()=>({})},window:{addEventListener(){},matchMedia:()=>({matches:false})}});
  handlers.submit({target:{closest:()=>form}});
  return {input,query,children};
}
test('All categories retains the raw query and submits exactly one q field',()=>{
 const r=submit('red OR blue','');assert.equal(r.query.value,'red OR blue');assert.equal(r.query.name,'q');assert.equal(r.input.name,undefined);assert.equal(r.children.length,0);
});
test('category constraint groups OR terms and escapes quotes and backslashes',()=>{
 const r=submit('red OR blue','Laptop "Pro"\\Series');assert.equal(r.query.value,'(red OR blue) AND product_type:"Laptop \\"Pro\\"\\\\Series"');assert.equal(r.children[0].value,'product');
});
test('a category can be searched without a text term',()=>assert.equal(submit('  ','Audio').query.value,'product_type:"Audio"'));
