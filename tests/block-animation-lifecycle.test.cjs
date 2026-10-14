const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('simultaneously visible blocks reveal by visual row and then left to right', () => {
  const source = fs.readFileSync('assets/block-animations.js', 'utf8');
  const make = (name, top, left, visible = true) => ({name,visible,matches:()=>false,getBoundingClientRect:()=>({top,left})});
  const elements = [make('bottom',250,10),make('right',104,500),make('hidden',0,0,false),make('left',100,10)];
  const nodes = new Map(elements.map(element=>[element,{played:false}]));
  const calls = [];
  const context = {nodes,cardSelector:'',active:element=>element.visible,inView:()=>true,show:element=>{
    const state=nodes.get(element);
    if (!state.played) {calls.push([element.name,state.entranceDelay]);state.played=true;}
  }};
  vm.runInNewContext(source.slice(source.indexOf('  const revealVisible ='),source.indexOf('  const observer ='))+'\nrevealVisible();',context);
  assert.deepEqual(calls,[['left',0],['right',120],['bottom',240]]);
  const later=make('later',400,20);
  nodes.set(later,{played:false});
  vm.runInNewContext('revealVisible();',context);
  assert.deepEqual(calls[3],['later',0]);
});

function fixture({delay = 150, type = 'slide-bottom', parentType, preserveOpacity = false, switching = false, rowDelay = 0, motionDuration = 500, motionDistance = 50} = {}) {
  let changed;
  let motionChanged;
  const classes = new Set();
  const played = [];
  const slideClasses = new Set(['swiper-slide-active']);
  const slide = { classList: { contains: c => slideClasses.has(c) }, matches: s => s.includes('.slideshow__swiper .swiper-slide'), contains: e => e === block,
    isConnected: true, getClientRects: () => [{}], closest: s => s === '.slideshow__swiper .swiper-slide' ? slide : null };
  const viewport = { getBoundingClientRect: () => ({ top: 100, bottom: 920, left: 0, right: 1920 }) };
  const block = {
    dataset: { blockAnimation: type, animationDelay: String(delay), animationPreserveOpacity: String(preserveOpacity), animationStagger:switching ? '150' : '0', animationRowDelay:String(rowDelay), animationTabDelay:String(rowDelay) }, isConnected: true,
    parentElement: { closest: () => parentType ? {dataset: {blockAnimation: parentType}} : null },
    querySelector: () => type === 'rotate-words' ? {} : null,
    querySelectorAll: selector => selector === '.reveal-word' ? [{animate: (...args) => block.animate(...args)}] : [],
    classList: { add: c => classes.add(c), remove: c => classes.delete(c) },
    closest: s => s === '[data-collection-tab-panel]' && switching ? viewport : s === '.slideshow' ? viewport : s === '.slideshow__swiper .swiper-slide' ? slide : null,
    matches: () => true,
    getClientRects: () => [{}], getBoundingClientRect: () => ({ top: 700, bottom: 750, left: 0, right: 300 }),
    animate: (frames, options) => { const animation = { finished: new Promise(() => {}), cancel: () => { animation.cancelled = true; } }; played.push({ frames, options, animation }); return animation; },
  };
  const document = {
    body: { dataset: {} }, addEventListener() {},
    querySelectorAll: s => s === '[data-block-animation], [data-component-reveal]' ? [block] : [],
  };
  const context = {
    window: {}, document, innerWidth: 1920, innerHeight: 450,
    matchMedia: () => ({ matches: false, addEventListener(event, callback) { motionChanged = callback; } }),
    getComputedStyle: () => ({ getPropertyValue: key => key === '--tab-card-duration' ? String(motionDuration) : key === '--tab-card-distance' ? String(motionDistance) : '' }),
    IntersectionObserver: class { observe() {} unobserve() {} },
    MutationObserver: class { constructor(fn) { changed = fn; } observe() {} },
  };
  vm.runInNewContext(fs.readFileSync('assets/block-animations.js', 'utf8'), context);
  return { block, slide, played, classes, slideClasses, changed: records => changed(records), motionChanged: () => motionChanged() };
}

test('changing reduced-motion preference cancels entrances and leaves content visible', () => {
  const h = fixture();
  h.classes.add('reveal-pending');
  h.motionChanged();
  assert.equal(h.played[0].animation.cancelled, true);
  assert.equal(h.classes.has('reveal-pending'), false);
  assert.equal(h.played.length, 1);
});

test('word rotation remains active inside a sliding card without nesting another card slide', () => {
  const words = fixture({type:'rotate-words',parentType:'slide-bottom'});
  assert.equal(words.played.length, 1);
  assert.match(words.played[0].frames[0].transform, /rotateX/);
  assert.equal(fixture({type:'slide-bottom',parentType:'slide-bottom'}).played.length, 0);
});

test('all active slideshow contents reveal even below the editor viewport', () => {
  const h = fixture();
  assert.equal(h.played.length, 1);
  assert.equal(h.classes.has('reveal-pending'), false);
  assert.equal(h.played[0].frames[0].transform, 'translateY(32px)');
});

test('zero and 75ms delays remain distinct instead of collapsing to 150ms', () => {
  assert.equal(fixture({delay:0}).played[0].options.delay, 0);
  assert.equal(fixture({delay:75}).played[0].options.delay, 75);
});

test('hero media stays opaque while moving and fade never writes a slide transform', () => {
  const hero = fixture({delay:0,type:'slide-left',preserveOpacity:true});
  assert.equal(hero.played[0].frames[0].opacity, 1);
  assert.equal(hero.played[0].frames[0].transform, 'translateX(-32px)');
  const fade = fixture({type:'fade'});
  assert.ok(fade.played[0].frames.every(frame => frame.transform === undefined));
});

test('changing an existing block animation cancels and replays without toggling section visibility', () => {
  const h = fixture();
  h.block.dataset.blockAnimation = 'fade';
  h.changed([{ type: 'attributes', attributeName: 'data-block-animation', target: h.block }]);
  assert.equal(h.played[0].animation.cancelled, true);
  assert.equal(h.played.length, 2);
  assert.equal(h.played[1].frames[0].transform, undefined);
  h.block.dataset.animationDelay = '450';
  h.changed([{ type: 'attributes', attributeName: 'data-animation-delay', target: h.block }]);
  assert.equal(h.played.length, 3);
  assert.equal(h.played[2].options.delay, 450);
  h.block.dataset.blockAnimation = 'none';
  h.changed([{ type: 'attributes', attributeName: 'data-block-animation', target: h.block }]);
  assert.equal(h.played[2].animation.cancelled, true);
  assert.equal(h.classes.has('reveal-pending'), false);
});

test('deactivation resets contents and the next activation replays them', () => {
  const h = fixture();
  h.slideClasses.clear();
  h.changed([{ type: 'attributes', attributeName: 'class', target: h.slide }]);
  assert.equal(h.classes.has('reveal-pending'), true);
  assert.equal(h.played[0].animation.cancelled, true);
  h.slideClasses.add('swiper-slide-active');
  h.changed([{ type: 'attributes', attributeName: 'class', target: h.slide }]);
  assert.equal(h.played.length, 2);
  assert.equal(h.classes.has('reveal-pending'), false);
});

 test('tab-switch card motion starts immediately with responsive duration, distance and row delay', () => {
  const first=fixture({delay:0,switching:true});
  assert.equal(first.played[0].options.delay,0);
  assert.equal(first.played[0].options.duration,500);
  assert.equal(first.played[0].options.easing,'ease');
  assert.equal(first.played[0].frames[0].transform,'translateY(50px)');
  const mobile=fixture({delay:0,switching:true,rowDelay:50,motionDuration:300,motionDistance:30});
  assert.equal(mobile.played[0].options.delay,50);
  assert.equal(mobile.played[0].options.duration,300);
  assert.equal(mobile.played[0].frames[0].transform,'translateY(30px)');
});

test('collection tab list reveals together and ignores horizontal clipping of carousel cards', () => {
  const h=fixture({delay:0,switching:true,rowDelay:300});
  h.block.getBoundingClientRect=()=>({top:100,bottom:200,left:2100,right:2400});
  h.slideClasses.clear();h.changed([{type:'attributes',attributeName:'class',target:h.slide}]);
  h.slideClasses.add('swiper-slide-active');h.changed([{type:'attributes',attributeName:'class',target:h.slide}]);
  assert.equal(h.played.length,2);assert.equal(h.played[1].options.delay,300);
  assert.equal(h.played[1].options.easing,'ease');
});

test('each tab card has one delayed animation coupling opacity and translation from start to finish', () => {
  const h=fixture({delay:0,switching:true,rowDelay:200});
  assert.equal(h.played.length,1);
  const {frames,options}=h.played[0];
  assert.equal(options.delay,200);assert.equal(options.fill,'backwards');
  assert.equal(frames[0].opacity,0);assert.equal(frames[0].transform,'translateY(50px)');
  assert.equal(frames[1].opacity,1);assert.equal(frames[1].transform,'none');
});

test('Shopify-minified CSS seconds preserve the same card timing as local milliseconds', () => {
  for (const [duration, expected] of [['500ms',500],['.5s',500],['300ms',300],['.3s',300],['1s',1000],['0ms',0]]) {
    const h=fixture({delay:0,switching:true,motionDuration:duration});
    assert.equal(h.played[0].options.duration,expected,duration);
  }
});
