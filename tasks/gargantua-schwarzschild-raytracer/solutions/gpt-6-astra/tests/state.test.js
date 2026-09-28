import test from 'node:test';
import assert from 'node:assert/strict';
import {defaults,initialState,sanitize,createStore,PARAMETERS,QUALITY,PRESETS} from '../src/state.js';
test('capture ignores saved settings and freezes before render',()=>{
  const saved=defaults();saved.playing=true;saved.params.emission=6;saved.debug=7;
  const s=initialState('?capture=1&quality=cinematic&preset=2&debug=5&time=12.5&hud=0',JSON.stringify(saved));
  assert.equal(s.playing,false);assert.equal(s.time,12.5);assert.equal(s.quality,'cinematic');assert.equal(s.debug,5);assert.equal(s.hud,false);assert.equal(s.params.emission,defaults().params.emission);assert.equal(s.params.elevation,PRESETS[2].elevation);
});
test('invalid URL fields recover independently, with strict preset and debug integers',()=>{
  for(const v of ['-1','1.5','Infinity','NaN','99','1e0','']){
    const s=initialState(`?capture=1&preset=${v}&debug=${v}&quality=bogus&hud=bogus`,null);
    assert.equal(s.preset,0);assert.equal(s.debug,0);assert.equal(s.quality,'high');assert.equal(s.hud,true);
  }
  for(const v of ['-1','Infinity','NaN',''])assert.equal(initialState(`?capture=1&time=${v}`,null).time,0);
});
test('storage migration, bounds and disk annulus invariants',()=>{
  assert.deepEqual(sanitize({version:999}),defaults());
  assert.deepEqual(initialState('', 'broken'),defaults());
  const s=defaults();s.params.innerRadius=7;s.params.outerRadius=5;s.params.exposure=999;s.params.grain=NaN;
  const out=sanitize(s);assert.equal(out.params.outerRadius,7.5);assert.equal(out.params.exposure,3);assert.equal(out.params.grain,defaults().params.grain);
  assert.equal(PARAMETERS.length,21);
});
test('public setters reject illegal input without altering state; reset and persistence work',()=>{
  const records=new Map();globalThis.localStorage={getItem:k=>records.get(k)||null,setItem:(k,v)=>records.set(k,v)};
  const store=createStore('',false),before=store.snapshot();
  for(const v of [-1,4,NaN,'1',null])assert.equal(store.preset(v),null);
  for(const v of [-1,10,1.1,'2'])assert.equal(store.debug(v),null);
  for(const v of [-1,Infinity,NaN,'2',null])assert.equal(store.time(v),null);
  assert.equal(store.quality('toString'),null);assert.deepEqual(store.snapshot(),before);
  store.param('exposure',2);store.quality('cinematic');store.preset(3);store.debug(8);store.update({hud:false});
  const reloaded=createStore('',false);assert.equal(reloaded.get().params.exposure,2);assert.equal(reloaded.get().quality,'cinematic');assert.equal(reloaded.get().debug,8);assert.equal(reloaded.get().hud,false);
  reloaded.reset();assert.deepEqual(reloaded.snapshot(),defaults());
});
test('quality budgets strictly increase',()=>{
  for(const key of ['scale','dpr','steps','crossings','bloomLevels'])assert.ok(QUALITY.standard[key]<QUALITY.high[key]&&QUALITY.high[key]<QUALITY.cinematic[key]);
});
