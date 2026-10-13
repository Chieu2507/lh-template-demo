const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('assets/header.js','utf8');
const start = source.indexOf('  const positionHeaderLocalization =');
const end = source.indexOf('  const synchronizeSubmenuOffsets',start);
function position({viewport=1000,inner=viewport,panelWidth=250,anchor=950,parentLeft=anchor,offset=0,visualWidth=viewport,open=true}) {
 const panel={style:{setProperty(){}},offsetParent:{clientLeft:0,getBoundingClientRect:()=>({left:parentLeft})},getClientRects:()=>[{}],getBoundingClientRect:()=>({width:panelWidth})};
 const details={open,style:{setProperty(){}},getBoundingClientRect:()=>({left:anchor,width:66})};
 vm.runInNewContext(source.slice(start,end)+'; positionHeaderLocalization(details,panel);',{details,panel,document:{documentElement:{clientWidth:viewport}},window:{innerWidth:inner,visualViewport:{offsetLeft:offset,width:visualWidth}},Math});
 return panel.style.left===undefined?undefined:parentLeft+parseFloat(panel.style.left);
}
test('right edge uses the measured popup width and excludes scrollbar space',()=>assert.equal(position({viewport:980,inner:1000,panelWidth:310,anchor:940}),662));
test('left edge retains a screen gutter',()=>assert.equal(position({anchor:0}),8));
test('offset containing block is converted back to local coordinates',()=>assert.equal(position({anchor:950,parentLeft:700}),742));
test('visual viewport after zoom is respected',()=>assert.equal(position({viewport:1200,visualWidth:600,offset:100,anchor:900}),442));
test('closed details are not positioned using a guessed size',()=>assert.equal(position({open:false}),undefined));
