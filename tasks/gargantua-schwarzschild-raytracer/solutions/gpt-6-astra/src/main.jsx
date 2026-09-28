import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createStore, PARAMETERS, PRESETS, DEBUG, QUALITY } from './state.js';
import { Raytracer } from './renderer.js';
import './style.css';

const store=createStore();
const groups=[...new Set(PARAMETERS.map(p=>p[7]))];
const qualityNames=Object.keys(QUALITY);
function OrbitGlyph({index=0}){return <svg viewBox="0 0 48 32" aria-hidden="true"><ellipse cx="24" cy="16" rx="20" ry={[5,10,14,7][index]} transform={`rotate(${[0,-24,0,24][index]} 24 16)`}/><circle cx="24" cy="16" r="8"/><circle cx={[42,40,24,6][index]} cy={[16,9,2,9][index]} r="2" className="satellite"/></svg>;}
function App(){
  const [state,setState]=useState(store.snapshot());
  const [status,setStatus]=useState('compiling');
  const [error,setError]=useState('');
  const [stats,setStats]=useState(null);
  const canvas=useRef(),engine=useRef();
  useEffect(()=>store.subscribe(s=>setState(structuredClone(s))),[]);
  useEffect(()=>{
    engine.current=new Raytracer(canvas.current,store,(next,message)=>{setStatus(next);if(message)setError(message);});
    const tracer=engine.current;
    window.__GARGANTUA__=Object.freeze({
      get ready(){return tracer.ready;},
      getState:()=>({...store.snapshot(),ready:tracer.ready,render:tracer.diagnostics()}),
      setQuality:level=>store.quality(level),setPreset:index=>store.preset(index),setDebug:index=>store.debug(index),setTime:seconds=>store.time(seconds),
    });
    const timer=setInterval(()=>setStats(tracer.diagnostics()),1000);
    const keydown=e=>{
      if(e.ctrlKey||e.metaKey||e.altKey||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||e.target.isContentEditable)return;
      const s=store.get();
      if(e.shiftKey&&/^Digit[1-4]$/.test(e.code)){e.preventDefault();store.preset(Number(e.code.at(-1))-1);return;}
      if(!e.shiftKey&&/^Digit[0-9]$/.test(e.code)){e.preventDefault();store.debug(Number(e.code.at(-1)));return;}
      switch(e.code){
        case 'Space':e.preventDefault();if(!s.capture)store.update({playing:!s.playing});break;
        case 'KeyH':store.update({hud:!s.hud});break;
        case 'KeyR':store.reset();break;
        case 'KeyQ':store.quality(qualityNames[(qualityNames.indexOf(s.quality)+1)%3]);break;
        case 'Escape':store.update({panel:false});break;
      }
    };
    window.addEventListener('keydown',keydown);
    return ()=>{clearInterval(timer);window.removeEventListener('keydown',keydown);tracer.dispose();delete window.__GARGANTUA__;};
  },[]);
  const quality=state.quality[0].toUpperCase()+state.quality.slice(1);
  return <main>
    <canvas ref={canvas} className="cosmos" aria-label="Interactive Schwarzschild black hole. Drag to orbit, scroll or pinch to zoom."/>
    {status==='lost'&&<div className="notice" role="status"><strong>Signal interrupted</strong><span>Graphics context lost. Waiting to reconnect… Your observation is preserved.</span></div>}
    {status==='error'&&<div className="notice error" role="alert"><strong>Unable to start this observation</strong><span>{error}</span></div>}
    {status==='compiling'&&<div className="connecting" role="status">Tracing the first light…</div>}
    {state.hud ? <div className="hud">
      <header>
        <div className="brand"><div className="eyebrow"><span className="tiny-cross">+</span> DEEP FIELD OBSERVATORY <span className="divider">/</span> 001</div><h1>GARGANTUA<span>®</span></h1><p>Schwarzschild Black Hole Raytracer</p></div>
        <div className="header-actions"><div className="signal"><i/><span>{state.capture?'FIXED OBSERVATION':'LIVE OBSERVATION'}</span></div><button className="icon-button" aria-label="Hide HUD" title="Hide HUD · H" onClick={()=>store.update({hud:false})}>⌁</button></div>
      </header>
      <div className="side-label">BEYOND THE POINT OF RETURN <span/></div>
      <div className="observation"><span className="section-tag">THE SCHWARZSCHILD SOLUTION</span><h2>Nothing escapes.<br/><em>Except your perspective.</em></h2><div className="readings"><div><small>EVENT HORIZON</small><strong>1.00 <span>rₛ</span></strong></div><div><small>PHOTON SPHERE</small><strong>1.50 <span>rₛ</span></strong></div></div></div>
      <aside className="instrument-controls" aria-label="Observation controls">
        <button className={'panel-toggle '+(state.panel?'active':'')} aria-expanded={state.panel} onClick={()=>store.update({panel:!state.panel})}><span className="sliders-icon">☷</span> Parameters <span className="count">21</span></button>
        <div className="quality-control"><label htmlFor="quality">RENDER QUALITY</label><select id="quality" value={state.quality} onChange={e=>store.quality(e.target.value)}>{qualityNames.map(q=><option key={q} value={q}>{q[0].toUpperCase()+q.slice(1)}</option>)}</select></div>
        <button className="play-button" disabled={state.capture} onClick={()=>store.update({playing:!state.playing})}><span>{state.playing?'Ⅱ':'▷'}</span>{state.capture?'Time locked':state.playing?'Pause cinematic':'Cinematic orbit'}</button>
      </aside>
      {state.panel&&<section className="parameter-panel" aria-label="Parameters"><div className="panel-heading"><div><small>OBSERVATION SETTINGS</small><h3>Fine-tune the impossible.</h3></div><button className="close" aria-label="Close parameters" onClick={()=>store.update({panel:false})}>×</button></div><div className="parameter-scroll">{groups.map(group=><fieldset key={group}><legend>{group}</legend>{PARAMETERS.filter(p=>p[7]===group).map(([key,label,min,max,step,,unit])=><label className="parameter" key={key} htmlFor={key}><span>{label}<output htmlFor={key}>{state.params[key].toFixed(step<.001?4:step<.01?3:step<1?2:0)} <b>{unit}</b></output></span><input id={key} type="range" min={min} max={max} step={step} value={state.params[key]} onChange={e=>store.param(key,Number(e.target.value))}/></label>)}</fieldset>)}<div className="debug-control"><label htmlFor="debug">Diagnostic view</label><select id="debug" value={state.debug} onChange={e=>store.debug(Number(e.target.value))}>{DEBUG.map((d,i)=><option key={d} value={i}>{i} · {d}</option>)}</select></div><button className="reset" onClick={()=>store.reset()}>↺ Reset observation <kbd>R</kbd></button><p className="units-note">Distances in Schwarzschild radii · rₛ = 2GM/c²<br/>A non-rotating black hole. A rotating accretion disk.</p><p className="units-note">0–9 Debug · Shift+1–4 Presets · Space Play/Pause<br/>H Instruments · R Reset · Q Quality · Esc Close</p></div></section>}
      <section className="preset-dock" aria-label="View presets"><div className="dock-heading"><span>CHOOSE YOUR PERSPECTIVE</span><span>SHIFT + 1—4</span></div><div className="presets">{PRESETS.map((p,i)=><button key={p.name} className={state.preset===i?'selected':''} onClick={()=>store.preset(i)} aria-pressed={state.preset===i}><OrbitGlyph index={i}/><span><small>0{i+1}</small><strong>{p.name}</strong></span></button>)}</div></section>
      <footer><div className="footer-left"><span className="status-dot"/>{state.debug===0?'NULL GEODESIC INTEGRATION':`${state.debug} · ${DEBUG[state.debug].toUpperCase()}`}<span className="footer-detail">{quality} · {stats?`${stats.width} × ${stats.height}`:'—'}{!state.capture&&stats?` · ${stats.fps} fps`:''}</span></div><div className="shortcuts"><span>DRAG <b>Orbit</b></span><span>SCROLL <b>Zoom</b></span><span>0–9 <b>Debug</b></span><span>SPACE <b>Play</b></span><span>H <b>HUD</b></span><span>R <b>Reset</b></span><span>Q <b>Quality</b></span></div></footer>
    </div>:(!state.capture&&<button className="restore-hud" onClick={()=>store.update({hud:true})}>Show instruments <kbd>H</kbd></button>)}
  </main>;
}
createRoot(document.getElementById('root')).render(<App/>);
