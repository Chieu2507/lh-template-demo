const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function fixture() {
  const source = fs.readFileSync('assets/slideshow.js', 'utf8');
  const clock = source.slice(source.indexOf('const startAutoplay ='), source.indexOf('const bindNavigation ='));
  let frame, observer, reads = 0, moves = 0, disconnected = false;
  const properties = new Map();
  const style = { setProperty: (key, value) => properties.set(key, value), removeProperty: key => properties.delete(key) };
  const svg = { style: { setProperty() {} } };
  const number = { querySelector: () => svg, getAttribute: () => 'true' };
  const pagination = { style, querySelectorAll: () => [number] };
  const root = { dataset: { autoplay: 'true', autoplayDelay: '3000' },
    querySelector: selector => selector === '[data-slideshow-pagination]' ? pagination : null,
    matches: () => false, style: { setProperty() { throw new Error('Clock must not invalidate the entire section'); } } };
  const swiper = { realIndex: 0, on() {}, off() {}, slideNext() { moves++; } };
  const document = { hidden: false, addEventListener() {}, removeEventListener() {} };
  const context = { document, reducedMotion: () => false, isVisible: () => { reads++; return true; },
    IntersectionObserver: class { constructor(callback) { observer = callback; } observe() {} disconnect() { disconnected = true; } },
    window: { requestAnimationFrame: callback => { frame = callback; return 1; }, cancelAnimationFrame() {} } };
  vm.createContext(context);
  const start = vm.runInContext(clock + '\nstartAutoplay;', context);
  const controller = start(root, swiper, null);
  return { tick: time => frame(time), observe: visible => observer([{ isIntersecting: visible }]),
    controller, properties, reads: () => reads, moves: () => moves, disconnected: () => disconnected };
}

test('autoplay paints only controls without repeated layout reads, and still advances on schedule', () => {
  const f = fixture();
  for (let time = 0; time <= 3000; time += 16) f.tick(time);
  f.tick(3000);
  assert.equal(f.reads(), 1);
  assert.equal(f.moves(), 1);
  assert.ok(f.properties.has('--slideshow-autoplay-progress'));
});

test('offscreen slideshow pauses its clock and unload disconnects the observer', () => {
  const f = fixture();
  f.tick(0); f.tick(1000);
  f.observe(false); f.tick(2000); f.tick(10000);
  assert.equal(f.moves(), 0);
  f.observe(true); f.tick(11000); f.tick(13000);
  assert.equal(f.moves(), 1);
  f.controller.destroy();
  assert.equal(f.disconnected(), true);
  assert.equal(f.properties.has('--slideshow-autoplay-progress'), false);
});
