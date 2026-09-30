import { writeFileSync, unlinkSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const session='gpt61-four-candidates';
async function cmd(action,args={}) { const file=resolve(`.bridge-${crypto.randomUUID()}.json`);writeFileSync(file,JSON.stringify({action,args,session}));try{const r=await fetch('http://127.0.0.1:10086/command',{method:'POST',headers:{'Content-Type':'application/json'},body:await (await import('node:fs/promises')).readFile(file)});const j=await r.json();assert.equal(j.ok,true,JSON.stringify(j));return j.data;}finally{unlinkSync(file);}}
await cmd('close_tab');await cmd('navigate',{url:'http://127.0.0.1:4171',newTab:true});
await cmd('cdp',{method:'Emulation.setDeviceMetricsOverride',params:{width:1440,height:900,deviceScaleFactor:1,mobile:false}});
await cmd('cdp',{method:'Emulation.setFocusEmulationEnabled',params:{enabled:true}});
await cmd('cdp',{method:'Page.addScriptToEvaluateOnNewDocument',params:{source:"(()=>{window.__errors=[];window.addEventListener('error',e=>__errors.push(e.message));window.addEventListener('unhandledrejection',e=>__errors.push(String(e.reason)));const previous=console.error;console.error=(...a)=>{__errors.push(a.join(' '));previous(...a)};})();"}});
await cmd('navigate',{url:'http://127.0.0.1:4171'});
const wait=ms=>new Promise(r=>setTimeout(r,ms));for(let attempt=0;attempt<40;attempt++){await wait(500);if((await cmd('evaluate',{code:'document.documentElement.dataset.ready === "true"'})).value)break;}
let state=(await cmd('evaluate',{code:'JSON.stringify({state:window.__DIORAMA__.getState(),errors:window.__errors,ui:document.querySelectorAll("button,input,select").length})'})).value;state=JSON.parse(state);assert.equal(state.state.ready,true);assert.deepEqual(state.errors,[]);assert.equal(state.ui,0);
mkdirSync('evidence',{recursive:true});await cmd('screenshot',{path:resolve('evidence/01-overview.png')});
await cmd('cdp',{method:'Emulation.setFocusEmulationEnabled',params:{enabled:true}});
await cmd('cdp',{method:'Input.dispatchMouseEvent',params:{type:'mousePressed',x:730,y:460,button:'left',buttons:1,clickCount:1}});
for(let i=1;i<=8;i++)await cmd('cdp',{method:'Input.dispatchMouseEvent',params:{type:'mouseMoved',x:730+i*18,y:460-i*3,button:'left',buttons:1}});
await cmd('cdp',{method:'Input.dispatchMouseEvent',params:{type:'mouseReleased',x:874,y:436,button:'left',buttons:0,clickCount:1}});await wait(600);
const orbit=JSON.parse((await cmd('evaluate',{code:'JSON.stringify(window.__DIORAMA__.getState())'})).value);assert.notDeepEqual(orbit.camera,state.state.camera);await cmd('screenshot',{path:resolve('evidence/02-orbit.png')});
await cmd('cdp',{method:'Input.dispatchMouseEvent',params:{type:'mouseWheel',x:740,y:450,deltaY:-320,deltaX:0}});await wait(500);
const zoom=JSON.parse((await cmd('evaluate',{code:'JSON.stringify(window.__DIORAMA__.getState())'})).value);assert.notDeepEqual(zoom.camera,orbit.camera);await cmd('screenshot',{path:resolve('evidence/03-detail.png')});
await cmd('cdp',{method:'Emulation.setDeviceMetricsOverride',params:{width:390,height:844,deviceScaleFactor:2,mobile:true}});await wait(500);await cmd('screenshot',{path:resolve('evidence/04-mobile.png')});
await cmd('cdp',{method:'Emulation.setDeviceMetricsOverride',params:{width:1440,height:900,deviceScaleFactor:1,mobile:false}});await cmd('navigate',{url:'http://127.0.0.1:4171'});await wait(600);for(let i=0;i<6;i++)await wait(10000);
const final=JSON.parse((await cmd('evaluate',{code:'JSON.stringify({errors:__errors,state:__DIORAMA__.getState(),requests:performance.getEntriesByType("resource").map(r=>r.name)})'})).value);assert.deepEqual(final.errors,[]);assert.ok(final.requests.every(u=>u.startsWith('http://127.0.0.1:4171')));
await cmd('cdp',{method:'Emulation.setFocusEmulationEnabled',params:{enabled:false}});writeFileSync('evidence/e2e.json',JSON.stringify({checks:['ready','no UI','orbit via real pointer','wheel zoom','mobile DPR 2','local assets','no console errors'],initial:state,orbit,zoom,final},null,2));console.log('PASS: production ready, UI absent, orbit, zoom, mobile, local assets and console checks');
