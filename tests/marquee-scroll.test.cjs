const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('blocks/marquee.liquid', 'utf8').match(/{% javascript %}([\s\S]*?){% endjavascript %}/)[1];
function fixture({staticMode=false,reduced=false}={}) {
  const callbacks=new Map(),events=new Map(),frames=[];
  const style={values:{},setProperty(k,v){this.values[k]=v;},getPropertyValue(k){return this.values[k]||'';},removeProperty(k){delete this.values[k];}};
  const animation={animationName:'marquee-scroll-left',currentTime:5000,effect:{getComputedTiming:()=>({duration:28000})}};
  const track={children:[],style,appendChild(fragment){this.children.push(...fragment.children);},querySelectorAll(){return this.children.filter(x=>x.hasAttribute('data-marquee-clone'));},getAnimations:()=>[animation]};
  function item() { const attrs=new Set();return {hasAttribute:k=>attrs.has(k),setAttribute:k=>attrs.add(k),removeAttribute:k=>attrs.delete(k),matches:()=>false,querySelector:()=>null,querySelectorAll:()=>[],classList:{remove(){}},getBoundingClientRect:()=>({width:1000}),cloneNode:()=>item(),dataset:new Proxy({}, {set(o,k,v){if(k==='marqueeClone')attrs.add('data-marquee-clone');o[k]=v;return true;}}),remove(){track.children=track.children.filter(x=>x!==this);}}; }
  track.children.push(item());
  const viewport={clientWidth:500,getBoundingClientRect:()=>({top:100,bottom:544})};
  const classes=new Set(staticMode?['marquee--static']:[]);
  const marquee={querySelector:s=>s.includes('track')?track:viewport,closest:()=>null,matches:()=>true,querySelectorAll:()=>[],classList:{contains:k=>classes.has(k),add:k=>classes.add(k),remove:k=>classes.delete(k)}};
  const media={matches:reduced,addEventListener(k,f){events.set('motion',f);}};
  const window={scrollY:0,innerHeight:1080,matchMedia:()=>media,addEventListener(k,f){callbacks.set(k,f);},removeEventListener(k,f){if(callbacks.get(k)===f)callbacks.delete(k);}};
  const document={readyState:'complete',querySelectorAll:()=>[marquee],addEventListener(k,f){events.set(k,f);},createDocumentFragment:()=>({children:[],appendChild(x){this.children.push(x);}})};
  class Observer {observe(){} disconnect(){}}
  vm.runInNewContext(source,{window,document,Node:{ELEMENT_NODE:1},MutationObserver:Observer,ResizeObserver:Observer,getComputedStyle:()=>({columnGap:'16px'}),requestAnimationFrame:f=>{frames.push(f);return frames.length;},cancelAnimationFrame(){}});
  return {callbacks,events,marquee,animation,window,flush(){while(frames.length)frames.shift()();}};
}
test('Gallery placement receives shared scroll response and reversible phase change',()=>{
 const f=fixture();assert.ok(f.callbacks.has('scroll'));
 const before=f.animation.currentTime;f.window.scrollY=50;f.callbacks.get('scroll')();f.flush();assert.ok(f.animation.currentTime>before);
 const down=f.animation.currentTime;f.window.scrollY=0;f.callbacks.get('scroll')();f.flush();assert.ok(f.animation.currentTime<down);
});
test('static marquee and reduced motion do not install scroll response',()=>{
 for(const options of [{staticMode:true},{reduced:true}])assert.equal(fixture(options).callbacks.has('scroll'),false);
});
test('section unload removes Gallery scroll response and repeated load keeps one listener',()=>{
 const f=fixture();const original=f.callbacks.get('scroll');f.events.get('shopify:section:load')({target:f.marquee});assert.equal(f.callbacks.get('scroll'),original);
 f.events.get('shopify:section:unload')({target:f.marquee});assert.equal(f.callbacks.has('scroll'),false);
 f.events.get('shopify:section:load')({target:f.marquee});assert.ok(f.callbacks.has('scroll'));
});
