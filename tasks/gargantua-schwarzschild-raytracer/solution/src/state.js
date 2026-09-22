export const STORAGE_KEY = 'gargantua.state.v1';
export const QUALITY = {
  standard: { scale: 0.7, dpr: 1.25, steps: 200, step: 0.055, crossings: 3, bloomLevels: 3 },
  high: { scale: 0.9, dpr: 1.5, steps: 360, step: 0.035, crossings: 5, bloomLevels: 4 },
  cinematic: { scale: 1, dpr: 2, steps: 640, step: 0.022, crossings: 7, bloomLevels: 5 },
};
export const PRESETS = [
  { name: 'The approach', note: 'A familiar impossibility', distance: 24, azimuth: 0, elevation: 8, fov: 42 },
  { name: 'Above the disk', note: 'An ocean of falling light', distance: 25, azimuth: 65, elevation: 36, fov: 48 },
  { name: 'Polar orbit', note: 'The geometry of silence', distance: 28, azimuth: 135, elevation: 83, fov: 47 },
  { name: 'At the edge', note: 'Where light goes around', distance: 16, azimuth: 210, elevation: -12, fov: 57 },
];
export const DEBUG = ['Final composite', 'Integration steps', 'Ray termination', 'Horizon capture mask', 'Disk intersection coordinates', 'Disk crossing order', 'Redshift / Doppler factor', 'Lensed sky coordinates', 'Stars & galaxy only', 'Linear HDR · log luminance'];
// Single schema drives validation and the 21 actual controls. Distances are r_s.
export const PARAMETERS = [
  ['fov','Field of view',20,85,1,42,'°','Camera'],
  ['distance','Camera distance',12,60,0.1,24,'rₛ','Camera'],
  ['azimuth','Azimuth',0,360,1,0,'°','Camera'],
  ['elevation','Elevation',-85,85,1,8,'°','Camera'],
  ['timeScale','Time rate',0,3,0.05,1,'×','Camera'],
  ['innerRadius','Inner radius',3,7,0.05,3,'rₛ','Accretion disk'],
  ['outerRadius','Outer radius',5,14,0.1,10,'rₛ','Accretion disk'],
  ['thickness','Half thickness',0.025,0.5,0.005,0.085,'rₛ','Accretion disk'],
  ['temperature','Temperature',2500,18000,100,6800,'K','Accretion disk'],
  ['emission','Emission',0,6,0.05,1.85,'×','Accretion disk'],
  ['orbitalSpeed','Orbital velocity',0,1.5,0.05,1,'×','Accretion disk'],
  ['turbulence','Turbulence',0,1,0.01,0.65,'','Accretion disk'],
  ['turbulenceSpeed','Turbulence rate',0,2,0.05,0.6,'×','Accretion disk'],
  ['starDensity','Star density',0,2,0.05,0.8,'×','Deep space'],
  ['galaxy','Galaxy luminance',0,2,0.05,0.55,'×','Deep space'],
  ['bloom','Bloom strength',0,1.5,0.01,0.4,'','Optics'],
  ['bloomThreshold','Bloom threshold',0.2,4,0.05,1.0,'','Optics'],
  ['exposure','Exposure',0.2,3,0.05,1,'×','Optics'],
  ['vignette','Vignette',0,0.8,0.01,0.25,'','Optics'],
  ['grain','Film grain',0,0.08,0.001,0.012,'','Optics'],
  ['dispersion','Chromatic dispersion',0,0.004,0.0001,0.0005,'','Optics'],
];
export function defaults(mobile = false) {
  return { version: 1, params: Object.fromEntries(PARAMETERS.map(p => [p[0],p[5]])), quality: mobile ? 'standard' : 'high', preset: 0, debug: 0, hud: true, panel: false, playing: false, capture: false, time: 0 };
}
export const validIndex = (v,max) => Number.isInteger(v) && v >= 0 && v <= max;
export const validTime = v => typeof v === 'number' && Number.isFinite(v) && v >= 0;
export function sanitize(input, mobile = false) {
  const d = defaults(mobile);
  if (!input || input.version !== 1) return d;
  for (const [key,,min,max] of PARAMETERS) {
    const v = input.params?.[key];
    if (typeof v === 'number' && Number.isFinite(v)) d.params[key] = Math.max(min,Math.min(max,v));
  }
  d.params.outerRadius = Math.max(d.params.outerRadius, d.params.innerRadius + 0.5);
  if (Object.hasOwn(QUALITY,input.quality)) d.quality=input.quality;
  if (validIndex(input.preset,3)) d.preset=input.preset;
  if (validIndex(input.debug,9)) d.debug=input.debug;
  for (const key of ['hud','panel','playing']) if(typeof input[key]==='boolean') d[key]=input[key];
  if (validTime(input.time)) d.time=input.time;
  return d;
}
export function initialState(search, saved, mobile = false) {
  const query = new URLSearchParams(search);
  const capture = query.get('capture') === '1';
  let parsed; try { parsed = JSON.parse(saved); } catch { /* corrupt storage uses defaults */ }
  const d = defaults(capture ? false : mobile);
  const s = capture ? d : sanitize(parsed,mobile);
  if (query.has('quality')) s.quality=Object.hasOwn(QUALITY,query.get('quality')) ? query.get('quality') : d.quality;
  if (query.has('preset')) {
    const raw=query.get('preset'); s.preset=/^[0-3]$/.test(raw) ? Number(raw) : d.preset;
    for(const key of ['distance','azimuth','elevation','fov']) s.params[key]=PRESETS[s.preset][key];
  }
  if (query.has('debug')) s.debug=/^[0-9]$/.test(query.get('debug')) ? Number(query.get('debug')) : 0;
  if (query.has('hud')) s.hud=query.get('hud')==='0' ? false : true;
  if (capture || query.has('time')) {
    const value=query.get('time'); const n=value?.trim() ? Number(value) : 0;
    s.time=validTime(n) ? n : 0;
  }
  s.capture=capture;
  if(capture) s.playing=false;
  return s;
}
export function createStore(search=location.search, mobile=innerWidth<600) {
  let saved; try { saved=localStorage.getItem(STORAGE_KEY); } catch { /* privacy mode remains usable */ }
  let state=initialState(search,saved,mobile);
  const listeners=new Set();
  function publish(persist=true) {
    if(persist && !state.capture) {
      try { localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); } catch { /* storage quota never breaks rendering */ }
    }
    for(const cb of listeners) cb(state);
  }
  return {
    get:()=>state,
    snapshot:()=>structuredClone(state),
    subscribe(cb){listeners.add(cb); return ()=>listeners.delete(cb);},
    update(patch,persist=true){state={...state,...patch};publish(persist);},
    param(key,value){
      const spec=PARAMETERS.find(p=>p[0]===key);
      if(!spec || typeof value!=='number' || !Number.isFinite(value)) return null;
      const params={...state.params,[key]:Math.max(spec[2],Math.min(spec[3],value))};
      if(key==='innerRadius') params.outerRadius=Math.max(params.outerRadius,params.innerRadius+0.5);
      if(key==='outerRadius') params.innerRadius=Math.min(params.innerRadius,params.outerRadius-0.5);
      state={...state,params,playing:['distance','azimuth','elevation','fov'].includes(key)?false:state.playing};publish();return this.snapshot();
    },
    preset(index){if(!validIndex(index,3)) return null;const params={...state.params};for(const k of ['distance','azimuth','elevation','fov'])params[k]=PRESETS[index][k];state={...state,params,preset:index,playing:false};publish();return this.snapshot();},
    quality(level){if(!Object.hasOwn(QUALITY,level))return null;this.update({quality:level});return this.snapshot();},
    debug(index){if(!validIndex(index,9))return null;this.update({debug:index});return this.snapshot();},
    time(seconds){if(!validTime(seconds))return null;this.update({time:seconds});return this.snapshot();},
    reset(){const capture=state.capture;state=defaults(capture?false:mobile);state.capture=capture;publish();return this.snapshot();},
  };
}
