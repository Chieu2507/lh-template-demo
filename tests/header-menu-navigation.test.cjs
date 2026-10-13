const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('assets/header.js', 'utf8');
const start = source.indexOf('\n(() => {\n  const instances = new Map();');
const script = source.slice(start, source.lastIndexOf('\n(() => {'));
function setup(step) {
  const events = {};
  const previous = {addEventListener(n,f){this[n]=f;}};
  const next = {addEventListener(n,f){this[n]=f;}};
  const navigation = {hidden:true,querySelector(s){return s.includes('prev') ? previous : next;}};
  const items = [0,120,280,450,700,850].map(offsetLeft=>({offsetLeft}));
  const viewport = {scrollLeft:0,clientWidth:600,scrollWidth:1200,
    querySelectorAll:()=>items,querySelector:()=>({}),
    addEventListener(n,f){this[n]=f;},
    scrollTo({left}){this.scrollLeft=Math.max(0,Math.min(left,this.scrollWidth-this.clientWidth));this.scroll();}};
  const menu = {dataset:{menuScrollStep:String(step)},querySelector:s=>s.includes('viewport')?viewport:navigation,querySelectorAll:()=>[]};
  const bottom = {querySelectorAll:()=>[menu]};
  const document = {querySelectorAll:()=>[bottom],addEventListener(n,f){events[n]=f;}};
  vm.runInNewContext(script,{document,AbortController,ResizeObserver:class{observe(){} disconnect(){}},window:{matchMedia:()=>({matches:true})}});
  return {previous,next,navigation,viewport,events,bottom};
}
for (const [step,position] of [[1,120],[2,280],[3,450]]) test(`menu advances ${step} variable-width items and returns to the start`,()=>{
  const r=setup(step); assert.equal(r.previous.disabled,true); assert.equal(r.navigation.hidden,false);
  r.next.click(); assert.equal(r.viewport.scrollLeft,position); assert.equal(r.previous.disabled,false);
  r.previous.click(); assert.equal(r.viewport.scrollLeft,0); assert.equal(r.previous.disabled,true);
});
test('next stops at the viewport end and controls hide when content fits',()=>{
  const r=setup(3);r.next.click();r.next.click();assert.equal(r.viewport.scrollLeft,600);assert.equal(r.next.disabled,true);
  r.viewport.clientWidth=1200;r.viewport.scrollLeft=0;r.viewport.scroll();assert.equal(r.navigation.hidden,true);
});
